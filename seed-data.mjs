/**
 * Script de seed pour remplir la base de données avec des données initiales
 * Utilisation: node seed-data.mjs
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Données des projets
const projects = [
  {
    titleFr: "Campagne Publicitaire Stann",
    titleEn: "Stann Advertising Campaign",
    descriptionFr: "Création d'une campagne vidéo complète pour la marque Stann avec motion design innovant",
    descriptionEn: "Complete video campaign creation for Stann brand with innovative motion design",
    sector: "tourisme",
    projectType: "Publicité",
    imageUrl: "/media/fubiztalks1_c5bd604e.jpg",
    videoUrl: "https://vimeo.com/bluevista",
    domain: "com",
    featured: true,
  },
  {
    titleFr: "Showreel 2025",
    titleEn: "Showreel 2025",
    descriptionFr: "Compilation de nos meilleures réalisations de l'année 2025",
    descriptionEn: "Compilation of our best productions from 2025",
    sector: "industrie",
    projectType: "Motion Design",
    imageUrl: "/media/Voeux2020-3_1ba21b96.jpg",
    videoUrl: "https://player.vimeo.com/video/1072209644",
    domain: "com",
    featured: true,
  },
  {
    titleFr: "Vidéo Institutionnelle Bancaire",
    titleEn: "Banking Institutional Video",
    descriptionFr: "Film corporate pour un grand groupe bancaire français",
    descriptionEn: "Corporate film for a major French banking group",
    sector: "bancaire",
    projectType: "Film Corporate",
    imageUrl: "/media/group_dc8b55dd.png",
    videoUrl: "https://vimeo.com/bluevista",
    domain: "com",
    featured: true,
  },
  {
    titleFr: "Animation 3D Produit Pharmaceutique",
    titleEn: "Pharmaceutical Product 3D Animation",
    descriptionFr: "Animation 3D haute résolution pour présentation de molécule pharmaceutique",
    descriptionEn: "High-resolution 3D animation for pharmaceutical molecule presentation",
    sector: "pharmaceutique",
    projectType: "Animation 3D",
    imageUrl: "/media/Logo_BLUEVISTA_2023_00dd6f48.png",
    videoUrl: "https://vimeo.com/bluevista",
    domain: "com",
    featured: false,
  },
];

// Données des témoignages
const testimonials = [
  {
    clientName: "Marie Dupont",
    clientCompany: "Stann Groupe",
    contentFr: "Blue Vista a transformé notre vision en réalité. Leur créativité et professionnalisme sont exceptionnels.",
    contentEn: "Blue Vista transformed our vision into reality. Their creativity and professionalism are exceptional.",
    rating: 5,
    domain: "com",
    featured: true,
    imageUrl: "/media/group-150x150_72b19b4a.png",
    videoUrl: "https://vimeo.com/bluevista",
  },
  {
    clientName: "Jean Martin",
    clientCompany: "Groupe Bancaire XYZ",
    contentFr: "Excellent travail sur notre film corporate. L'équipe a été très réactive et à l'écoute.",
    contentEn: "Excellent work on our corporate film. The team was very responsive and attentive.",
    rating: 5,
    domain: "com",
    featured: true,
    imageUrl: "/media/group-300x300_6433c4c1.png",
    videoUrl: "https://vimeo.com/bluevista",
  },
  {
    clientName: "Sophie Bernard",
    clientCompany: "Pharma Solutions",
    contentFr: "Les animations 3D qu'ils ont créées pour nous sont impressionnantes et très efficaces.",
    contentEn: "The 3D animations they created for us are impressive and very effective.",
    rating: 5,
    domain: "com",
    featured: true,
    imageUrl: "/media/group-150x150_72b19b4a.png",
    videoUrl: "https://vimeo.com/bluevista",
  },
];

// Données des métriques
const metrics = [
  {
    value: "200+",
    labelFr: "Clients Satisfaits",
    labelEn: "Satisfied Clients",
    domain: "com",
  },
  {
    value: "30%",
    labelFr: "Augmentation Ventes",
    labelEn: "Sales Increase",
    domain: "com",
  },
  {
    value: "500+",
    labelFr: "Projets Réalisés",
    labelEn: "Projects Completed",
    domain: "com",
  },
  {
    value: "20+",
    labelFr: "Années d'Expérience",
    labelEn: "Years of Experience",
    domain: "com",
  },
];

try {
  console.log("🌱 Début du seed de la base de données...");

  // Insérer les projets
  console.log("📁 Insertion des projets...");
  for (const project of projects) {
    await connection.execute(
      `INSERT INTO projects (title_fr, title_en, description_fr, description_en, sector, project_type, image_url, video_url, domain, featured, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        project.titleFr,
        project.titleEn,
        project.descriptionFr,
        project.descriptionEn,
        project.sector,
        project.projectType,
        project.imageUrl,
        project.videoUrl,
        project.domain,
        project.featured ? 1 : 0,
      ]
    );
  }
  console.log(`✅ ${projects.length} projets insérés`);

  // Insérer les témoignages
  //
  // ⚠️ La table a changé de forme : elle ne porte plus un texte unique
  // (content_fr / content_en) mais le triptyque problem / solution / result du
  // pipeline de recueil des témoignages. Le texte de démonstration est donc
  // versé dans « result », et les champs devenus obligatoires sont remplis.
  console.log("💬 Insertion des témoignages...");
  for (const testimonial of testimonials) {
    await connection.execute(
      `INSERT INTO testimonials (client_name, client_company, client_email, sector, project_type, problem, solution, result, rating, domain, featured, status, image_url, video_url, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, NOW(), NOW())`,
      [
        testimonial.clientName,
        testimonial.clientCompany,
        testimonial.clientEmail || "demo@bluevistaprod.com",
        testimonial.sector || "communication",
        testimonial.projectType || "Vidéo",
        testimonial.problem || "—",
        testimonial.solution || "—",
        testimonial.contentFr || testimonial.result || "—",
        testimonial.rating,
        testimonial.domain,
        testimonial.featured ? 1 : 0,
        testimonial.imageUrl,
        testimonial.videoUrl || "https://vimeo.com/bluevista",
      ]
    );
  }
  console.log(`✅ ${testimonials.length} témoignages insérés`);

  // Insérer les métriques
  console.log("📊 Insertion des métriques...");
  for (const metric of metrics) {
    await connection.execute(
      `INSERT INTO metrics (value, label_fr, label_en, domain, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [metric.value, metric.labelFr, metric.labelEn, metric.domain]
    );
  }
  console.log(`✅ ${metrics.length} métriques insérées`);

  console.log("🎉 Seed terminé avec succès !");
} catch (error) {
  console.error("❌ Erreur lors du seed:", error);
  process.exit(1);
} finally {
  await connection.end();
}
