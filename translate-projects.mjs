import { getDb, getProjects, updateProject } from './server/db.ts';
import { invokeLLM } from './server/_core/llm.ts';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateProject(project) {
  const { id, titleFr, descriptionFr, description2Fr } = project;
  
  if (!descriptionFr) {
    console.log(`Skipping project ${id} - no French description`);
    return null;
  }

  console.log(`\nTranslating project ${id}: ${titleFr}`);

  try {
    // Translate title
    const titleResponse = await invokeLLM({
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate French text to English. Keep the translation concise and professional. Only return the translation, nothing else.'
        },
        {
          role: 'user',
          content: `Translate this French title to English:\n${titleFr}`
        }
      ]
    });
    const titleEn = titleResponse.choices[0].message.content.trim();

    // Translate description
    const descResponse = await invokeLLM({
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate French text to English. Keep the translation concise and professional. Only return the translation, nothing else.'
        },
        {
          role: 'user',
          content: `Translate this French description to English:\n${descriptionFr}`
        }
      ]
    });
    const descriptionEn = descResponse.choices[0].message.content.trim();

    // Translate description2 if exists
    let description2En = null;
    if (description2Fr && description2Fr !== '-') {
      const desc2Response = await invokeLLM({
        messages: [
          {
            role: 'system',
            content: 'You are a professional translator. Translate French text to English. Keep the translation concise and professional. Only return the translation, nothing else.'
          },
          {
            role: 'user',
            content: `Translate this French text to English:\n${description2Fr}`
          }
        ]
      });
      description2En = desc2Response.choices[0].message.content.trim();
    }

    console.log(`✓ Translated: ${titleEn}`);
    
    return {
      id,
      titleEn,
      descriptionEn,
      description2En
    };
  } catch (error) {
    console.error(`✗ Error translating project ${id}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting translation process...');
  
  // Get all projects
  const allProjects = await getProjects('com', 145);
  console.log(`Found ${allProjects.length} projects to translate`);

  const translations = [];
  
  for (let i = 0; i < allProjects.length; i++) {
    const project = allProjects[i];
    const translation = await translateProject(project);
    
    if (translation) {
      translations.push(translation);
    }
    
    // Add delay to avoid rate limiting
    if ((i + 1) % 5 === 0) {
      console.log(`\nProcessed ${i + 1}/${allProjects.length} projects. Waiting...`);
      await sleep(2000);
    }
  }

  console.log(`\n\nTranslation complete! ${translations.length} projects translated.`);
  console.log('\nUpdating database...');

  // Update database
  for (const translation of translations) {
    try {
      await updateProject(translation.id, {
        titleEn: translation.titleEn,
        descriptionEn: translation.descriptionEn,
        description2En: translation.description2En
      });
      
      console.log(`✓ Updated project ${translation.id}`);
    } catch (error) {
      console.error(`✗ Error updating project ${translation.id}:`, error.message);
    }
  }

  console.log('\n✓ All translations updated in database!');
}

main().catch(console.error);
