import { config } from 'dotenv';

config();

const DATABASE_URL = process.env.DATABASE_URL;
const BUILT_IN_FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const BUILT_IN_FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!DATABASE_URL || !BUILT_IN_FORGE_API_URL || !BUILT_IN_FORGE_API_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Parse MySQL connection string
function parseConnectionString(url) {
  const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/;
  const match = url.match(regex);
  if (!match) throw new Error('Invalid connection string');
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4]),
    database: match[5],
  };
}

async function getProjectsWithoutTranslations() {
  const config = parseConnectionString(DATABASE_URL);
  
  const mysql = await import('mysql2/promise');
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: { rejectUnauthorized: false },
  });

  const [rows] = await connection.execute(
    'SELECT id, title_fr as titleFr, description_fr as descriptionFr, description2_fr as description2Fr FROM projects WHERE title_en IS NULL OR title_en = "" LIMIT 500'
  );

  await connection.end();
  return rows;
}

async function translateText(text) {
  if (!text || text === '-') return null;

  const response = await fetch(`${BUILT_IN_FORGE_API_URL}/llm/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BUILT_IN_FORGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate French text to English. Keep the translation concise and professional. Only return the translation, nothing else.',
        },
        {
          role: 'user',
          content: `Translate this French text to English:\n${text}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return typeof content === 'string' ? content.trim() : '';
}

async function updateProjectTranslations(projectId, titleEn, descriptionEn, description2En) {
  const config = parseConnectionString(DATABASE_URL);
  
  const mysql = await import('mysql2/promise');
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    ssl: { rejectUnauthorized: false },
  });

  await connection.execute(
    'UPDATE projects SET title_en = ?, description_en = ?, description2_en = ? WHERE id = ?',
    [titleEn, descriptionEn, description2En, projectId]
  );

  await connection.end();
}

async function main() {
  try {
    console.log('Fetching projects without translations...');
    const projects = await getProjectsWithoutTranslations();
    console.log(`Found ${projects.length} projects to translate`);

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`\n[${i + 1}/${projects.length}] Translating project ${project.id}: ${project.titleFr}`);

      try {
        // Translate title
        console.log('  - Translating title...');
        const titleEn = await translateText(project.titleFr);

        // Translate description
        console.log('  - Translating description...');
        const descriptionEn = await translateText(project.descriptionFr);

        // Translate description2
        let description2En = null;
        if (project.description2Fr && project.description2Fr !== '-') {
          console.log('  - Translating description 2...');
          description2En = await translateText(project.description2Fr);
        }

        // Update database
        console.log('  - Updating database...');
        await updateProjectTranslations(project.id, titleEn, descriptionEn, description2En);
        console.log(`  ✓ Project ${project.id} translated successfully`);

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`  ✗ Error translating project ${project.id}:`, error.message);
      }
    }

    console.log('\n✅ Translation complete!');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
