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
    philosophy: {
      fr: "Notre Philosophie",
      en: "Our Philosophy",
    },
    philosophy_text: {
      fr: "La philosophie de notre agence de communication vidéo est d'appréhender les dernières innovations technologiques afin de les mettre au service de la création et du design. Depuis plus de 20 ans, nous imaginons et réalisons des contenus vidéo variés.",
      en: "The philosophy of our video communication agency is to understand the latest technological innovations in order to put them at the service of creation and design. For over 20 years, we have imagined and created varied video content.",
    },
    team: { fr: "Notre Équipe", en: "Our Team" },
    locations: { fr: "Nos Implantations", en: "Our Locations" },
    lyon: { fr: "Lyon", en: "Lyon" },
    paris: { fr: "Paris", en: "Paris" },
    geneva: { fr: "Genève", en: "Geneva" },
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
