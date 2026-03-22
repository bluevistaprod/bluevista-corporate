/**
 * i18n configuration and translation system
 * Supports FR/EN with domain-specific content (com vs ch)
 */

export type Language = "fr" | "en";
export type Domain = "com" | "ch";

export const LANGUAGES: Language[] = ["fr", "en"];
export const DOMAINS: Domain[] = ["com", "ch"];
export const DEFAULT_LANGUAGE: Language = "fr";
export const DEFAULT_DOMAIN: Domain = "com";

// Translation keys and types
export const translations = {
  // Navigation
  nav: {
    home: { fr: "Accueil", en: "Home" },
    agency: { fr: "L'Agence", en: "About" },
    offers: { fr: "Offres", en: "Services" },
    portfolio: { fr: "Réalisations", en: "Portfolio" },
    actualites: { fr: "Actualités", en: "News" },
    contact: { fr: "Contact", en: "Contact" },
  },

  // Home page
  home: {
    hero_baseline: {
      fr: "Transformez votre communication en résultats concrets",
      en: "Transform your communication into tangible results",
    },
    hero_cta: { fr: "Découvrez Nos Offres", en: "Discover Our Services" },
    pillars_title: {
      fr: "Nos 3 Piliers Stratégiques",
      en: "Our 3 Strategic Pillars",
    },
    communication_title: {
      fr: "Communication & Marketing",
      en: "Communication & Marketing",
    },
    communication_promise: {
      fr: "Multipliez votre visibilité et boostez vos ventes",
      en: "Multiply your visibility and boost your sales",
    },
    event_title: { fr: "Événementiel", en: "Events" },
    event_promise: {
      fr: "Dynamisez votre événement et impliquez votre audience",
      en: "Energize your event and engage your audience",
    },
    immersion_title: { fr: "Immersion", en: "Immersion" },
    immersion_promise: {
      fr: "Développez vos ventes avec des expériences innovantes",
      en: "Boost your sales with innovative experiences",
    },
    learn_more: { fr: "En Savoir Plus", en: "Learn More" },
    key_metrics: { fr: "Nos Chiffres Clés", en: "Our Key Metrics" },
    testimonials: { fr: "Témoignages Clients", en: "Client Testimonials" },
    latest_projects: {
      fr: "Nos Dernières Réalisations",
      en: "Our Latest Projects",
    },
    quote_cta: { fr: "Demander un Devis", en: "Request a Quote" },
    newsletter_cta: { fr: "S'inscrire à la Newsletter", en: "Subscribe to Newsletter" },
  },

  // Pillars
  pillars: {
    communication: {
      title: { fr: "Communication & Marketing", en: "Communication & Marketing" },
      description: {
        fr: "Nous multiplions votre visibilité en ligne avec des contenus percutants, incluant snack content, podcasts, capsules motion, et stratégies réseaux sociaux pour générer des leads qualifiés et une communauté engagée.",
        en: "We multiply your online visibility with impactful content, including snack content, podcasts, motion capsules, and social media strategies to generate qualified leads and an engaged community.",
      },
      promise: {
        fr: "Des leads qualifiés et une communauté engagée qui en ambassadeurs fidèles boostent vos ventes rapidement.",
        en: "Qualified leads and an engaged community of loyal ambassadors that boost your sales rapidly.",
      },
    },
    events: {
      title: { fr: "Événementiel", en: "Events" },
      description: {
        fr: "Nous dynamisons vos événements avec conception, scénographie, couverture multicam, streaming et diffusion multi-canaux pour étendre la portée et créer des expériences inoubliables.",
        en: "We energize your events with design, scenography, multicam coverage, streaming and multi-channel distribution to extend reach and create unforgettable experiences.",
      },
      promise: {
        fr: "Vos invités vivent un moment magique inoubliable, boostant votre marque comme innovante et générant un bouche-à-oreille viral explosif.",
        en: "Your guests experience an unforgettable magical moment, boosting your brand as innovative and generating explosive word-of-mouth.",
      },
    },
    immersion: {
      title: { fr: "Immersion", en: "Immersion" },
      description: {
        fr: "Nous créons des univers immersifs qui plongent vos prospects dans votre monde, accélérant les décisions d'achat et augmentant vos conversions. Vos visiteurs émergent transformés et émerveillés.",
        en: "We create immersive universes that immerse your prospects in your world, accelerating purchasing decisions and increasing your conversions. Your visitors emerge transformed and amazed.",
      },
      promise: {
        fr: "Vos visiteurs plongent dans votre monde, émergeant transformés et émerveillés. Votre business s'ouvre au monde entier, générant leads globaux et fidélisant clients distants comme s'ils étaient sur place.",
        en: "Your visitors immerse themselves in your world, emerging transformed and amazed. Your business opens to the entire world, generating global leads and retaining distant customers as if they were on-site.",
      },
    },
  },

  // Portfolio filters
  portfolio: {
    title: { fr: "Nos Réalisations", en: "Our Portfolio" },
    filter_all: { fr: "Tous", en: "All" },
    filter_industry: { fr: "Industrie", en: "Industry" },
    filter_banking: { fr: "Bancaire", en: "Banking" },
    filter_pharma: { fr: "Pharmaceutique", en: "Pharma" },
    filter_tourism: { fr: "Tourisme", en: "Tourism" },
  },

  // About
  about: {
    title: { fr: "À Propos", en: "About Us" },
    subtitle: {
      fr: "Découvrez l'histoire et les valeurs de Bluevista Production",
      en: "Discover the story and values of Bluevista Production",
    },
    philosophy: {
      fr: "Notre Philosophie",
      en: "Our Philosophy",
    },
    philosophy_text: {
      fr: "La philosophie de notre agence de communication vidéo est d'appréhender les dernières innovations technologiques afin de les mettre au service de la création et du design. Depuis plus de 20 ans, nous imaginons et réalisons des contenus vidéo variés.",
      en: "The philosophy of our video communication agency is to understand the latest technological innovations in order to put them at the service of creation and design. For over 20 years, we have imagined and created varied video content.",
    },
    philosophy_text_2: {
      fr: "Depuis plus de 20 ans, nous avons eu l'occasion de travailler pour des secteurs très variés : l'industrie, le secteur bancaire, le pharmaceutique ou encore le tourisme. La fidélité de nos clients est notre plus grande fierté.",
      en: "For over 20 years, we have had the opportunity to work for a wide variety of sectors: industry, banking, pharmaceuticals and tourism. The loyalty of our clients is our greatest pride.",
    },
    team: { fr: "Notre Équipe", en: "Our Team" },
    team_description: {
      fr: "L'agence est composée d'une équipe polyvalente de professionnels du secteur audiovisuel et multimédia :",
      en: "The agency is composed of a versatile team of professionals in the audiovisual and multimedia sector:",
    },
    team_description_2: {
      fr: "Notre agence vidéo a la capacité d'adapter aussi bien la taille de ses équipes que leur spécialité via notre réseau de partenaires développé tout au long de notre existence. Ces équipes, c'est avant tout des créatifs qui forment une « boite de prod » complète et réactive.",
      en: "Our video agency has the ability to adapt both the size of its teams and their specialty through our network of partners developed throughout our existence. These teams are above all creatives who form a complete and reactive 'production company'.",
    },
    locations: { fr: "Nos Implantations", en: "Our Locations" },
    headquarters: { fr: "Siège social", en: "Headquarters" },
    lyon: { fr: "Lyon", en: "Lyon" },
    paris: { fr: "Paris", en: "Paris" },
    geneva: { fr: "Genève", en: "Geneva" },
    cameraman: { fr: "Cadreurs", en: "Cameramen" },
    editor: { fr: "Monteurs", en: "Editors" },
    designer: { fr: "Concepteurs", en: "Designers" },
    director: { fr: "Réalisateurs", en: "Directors" },
    graphic_designer: { fr: "Infographistes", en: "Graphic Designers" },
    developer: { fr: "Développeurs", en: "Developers" },
  },

  // Contact & Forms
  contact: {
    title: { fr: "Nous Contacter", en: "Contact Us" },
    form_name: { fr: "Nom", en: "Name" },
    form_email: { fr: "Email", en: "Email" },
    form_phone: { fr: "Téléphone", en: "Phone" },
    form_company: { fr: "Entreprise", en: "Company" },
    form_subject: { fr: "Sujet", en: "Subject" },
    form_message: { fr: "Message", en: "Message" },
    form_submit: { fr: "Envoyer", en: "Send" },
    form_success: {
      fr: "Merci ! Nous avons reçu votre message.",
      en: "Thank you! We received your message.",
    },
    form_error: {
      fr: "Une erreur s'est produite. Veuillez réessayer.",
      en: "An error occurred. Please try again.",
    },
  },

  // Project detail page
  project: {
    notFound: { fr: "Projet non trouvé", en: "Project not found" },
    about: { fr: "À propos du projet", en: "About the project" },
    details: { fr: "Détails du projet", en: "Project details" },
    sector: { fr: "Secteur", en: "Sector" },
    type: { fr: "Type de projet", en: "Project type" },
    year: { fr: "Année", en: "Year" },
    relatedProjects: { fr: "Projets connexes", en: "Related projects" },
    noRelatedProjects: { fr: "Aucun projet connexe", en: "No related projects" },
  },

  // Offers
  offers: {
    title: { fr: "Nos Offres Créatives", en: "Our Creative Services" },
    subtitle: {
      fr: "Trois piliers stratégiques pour transformer votre communication en résultats concrets",
      en: "Three strategic pillars to transform your communication into tangible results",
    },
    communication_title: { fr: "Communication & Marketing", en: "Communication & Marketing" },
    communication_description: {
      fr: "Amplifiez votre visibilité et vos ventes grâce à des contenus vidéo percutants",
      en: "Amplify your visibility and sales with impactful video content",
    },
    event_title: { fr: "Événementiel", en: "Events" },
    event_description: {
      fr: "Captez, diffusez et immortalisez vos événements en haute qualité",
      en: "Capture, broadcast and immortalize your events in high quality",
    },
    immersion_title: { fr: "Immersion & Technologie", en: "Immersion & Technology" },
    immersion_description: {
      fr: "Explorez les frontières de la création avec la réalité virtuelle et le metaverse",
      en: "Explore the frontiers of creation with virtual reality and the metaverse",
    },
    services_included: { fr: "Services inclus", en: "Included Services" },
    benefits: { fr: "Bénéfices", en: "Benefits" },
    request_quote: { fr: "Demander un devis", en: "Request a Quote" },
    creative_process: { fr: "Notre Processus Créatif", en: "Our Creative Process" },
    conception: { fr: "Conception", en: "Design" },
    conception_desc: {
      fr: "Nous écoutons, analysons et créons un concept unique adapté à vos objectifs",
      en: "We listen, analyze and create a unique concept tailored to your objectives",
    },
    preproduction: { fr: "Pré-production", en: "Pre-production" },
    preproduction_desc: {
      fr: "Planning détaillé, casting, repérages et préparation logistique complète",
      en: "Detailed planning, casting, location scouting and complete logistics preparation",
    },
    production: { fr: "Production", en: "Production" },
    production_desc: {
      fr: "Tournage professionnel avec équipes expertes et équipements dernière génération",
      en: "Professional shooting with expert teams and state-of-the-art equipment",
    },
    postproduction: { fr: "Post-production", en: "Post-production" },
    postproduction_desc: {
      fr: "Montage, color grading, effets spéciaux et optimisation pour tous les formats",
      en: "Editing, color grading, special effects and optimization for all formats",
    },
    why_choose_us: { fr: "Pourquoi Choisir Blue Vista ?", en: "Why Choose Blue Vista?" },
    expertise: { fr: "20+ ans d'expertise", en: "20+ years of expertise" },
    expertise_desc: {
      fr: "Depuis 2004, nous créons des contenus vidéo pour les plus grandes marques",
      en: "Since 2004, we have created video content for the biggest brands",
    },
    multiregional: { fr: "Présence multi-régionale", en: "Multi-regional presence" },
    multiregional_desc: {
      fr: "Agences à Lyon, Paris et Genève pour vous servir au plus proche",
      en: "Offices in Lyon, Paris and Geneva to serve you locally",
    },
    technology: { fr: "Technologie de pointe", en: "Cutting-edge technology" },
    technology_desc: {
      fr: "Équipements dernière génération et expertise en technologies émergentes",
      en: "State-of-the-art equipment and expertise in emerging technologies",
    },
    creative_team: { fr: "Équipe créative", en: "Creative Team" },
    creative_team_desc: {
      fr: "Réalisateurs, monteurs, infographistes et développeurs polyvalents",
      en: "Directors, editors, graphic designers and versatile developers",
    },
    measurable_results: { fr: "Résultats mesurables", en: "Measurable Results" },
    measurable_results_desc: {
      fr: "Nos vidéos génèrent +30% de visibilité et augmentent les conversions",
      en: "Our videos generate +30% visibility and increase conversions",
    },
    personalized_approach: { fr: "Approche personnalisée", en: "Personalized Approach" },
    personalized_approach_desc: {
      fr: "Chaque projet est unique et reçoit une attention créative particulière",
      en: "Each project is unique and receives special creative attention",
    },
    ready_to_transform: {
      fr: "Prêt à transformer votre communication ?",
      en: "Ready to transform your communication?",
    },
    contact_for_quote: {
      fr: "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé",
      en: "Contact us to discuss your project and receive a personalized quote",
    },
  },

  // News
  news: {
    title: { fr: "Actualités & Réalisations", en: "News & Projects" },
    subtitle: {
      fr: "Découvrez nos derniers projets, innovations et success stories",
      en: "Discover our latest projects, innovations and success stories",
    },
    all_articles: { fr: "Tous les articles", en: "All articles" },
    read_more: { fr: "Lire la suite", en: "Read more" },
    no_articles: {
      fr: "Aucun article trouvé dans cette catégorie",
      en: "No articles found in this category",
    },
    project_in_mind: { fr: "Vous avez un projet en tête ?", en: "Do you have a project in mind?" },
    contact_us_news: {
      fr: "Contactez-nous pour discuter de votre idée et voir comment nous pouvons la concrétiser",
      en: "Contact us to discuss your idea and see how we can make it happen",
    },
    contact_button: { fr: "Nous Contacter", en: "Contact Us" },
  },

  // Common
  common: {
    backToPortfolio: { fr: "Retour au portfolio", en: "Back to portfolio" },
    contactUs: { fr: "Nous contacter", en: "Contact us" },
  },

  // Footer
  footer: {
    rights: {
      fr: "Tous droits réservés",
      en: "All rights reserved",
    },
    legal: { fr: "Mentions légales", en: "Legal" },
    privacy: { fr: "Confidentialité", en: "Privacy" },
    follow_us: { fr: "Nous suivre", en: "Follow Us" },
  },
};

export type TranslationKey = keyof typeof translations;

/**
 * Get translation value by key and language
 */
export function t(
  key: string,
  language: Language = DEFAULT_LANGUAGE
): string {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value === "object" && value !== null) {
    return value[language] || value["fr"] || key;
  }

  return value || key;
}

/**
 * Get all translations for a key (both languages)
 */
export function tAll(key: string): Record<Language, string> {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value === "object" && value !== null) {
    return {
      fr: value.fr || key,
      en: value.en || key,
    };
  }

  return { fr: key, en: key };
}
