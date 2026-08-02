import type { Metier } from "./_plan-du-site";

/**
 * LES NEUF OFFRES — relevées dans le Canva « OFFRES BLUEVISTA 2026 »
 * (DAG1vsaUGy4), lu le 02/08/2026 via le connecteur Canva.
 *
 * ⛔ LES TEXTES SONT DE GIZ, REPRIS MOT POUR MOT. Accroches, promesses et
 * « issues rêvées » ne sont pas reformulés. C'est sa règle depuis le début du
 * chantier : on garde ses textes. Là où j'ai une réserve, elle est écrite en
 * commentaire — pas appliquée en douce.
 *
 * ⛔ CE QUI N'A PAS ÉTÉ REPRIS, ET POURQUOI.
 * Le Canva contient aussi, pour chaque offre, une ligne « business model »
 * (abonnement ? one shot ? packs de prix standards ? remises par packs ?).
 * C'est de la réflexion interne en cours, avec des points d'interrogation
 * partout. Rien de tout cela n'a sa place sur un site public tant qu'une
 * décision n'est pas prise — annoncer un modèle tarifaire hypothétique est
 * pire que de n'en annoncer aucun.
 * Même traitement pour « label google partner / meta partner ??? » : les
 * points d'interrogation sont de Giz, donc la certification n'est pas
 * acquise, donc elle ne s'affiche pas.
 *
 * ⚠️ DEUX RÉSERVES DE FOND, à trancher par Giz :
 *
 * 1. LE REGISTRE. Certaines formules — « votre événement vit éternellement
 *    en ligne », « émergeant transformés et émerveillés », « bouche-à-oreille
 *    viral explosif » — sont d'un cran au-dessus du ton sobre construit sur
 *    le reste du site. Sur une page qui cite l'ONU et l'UNESCO, la promesse
 *    excessive fait le contraire de son effet. Je les ai gardées telles
 *    quelles : c'est son texte, et c'est à lui de décider s'il l'atténue.
 *
 * 2. « Diffusion et visibilité » : dans le Canva, la promesse et l'issue
 *    rêvée semblent inversées par rapport aux huit autres offres. Je les ai
 *    remises dans l'ordre logique — la promesse dit ce que Bluevista fait,
 *    l'issue dit ce que le client obtient. À vérifier.
 */

export type Offre = {
  id: string;
  metier: Metier;
  nom: string;
  /** Le bénéfice, en une phrase à l'impératif. Texte de Giz. */
  accroche: string;
  /** Ce que Bluevista s'engage à faire. Texte de Giz. */
  promesse: string;
  /** Ce que le client obtient au bout. Texte de Giz. */
  issue: string;
  /** Les produits concrets. Texte de Giz, remis en forme lisible. */
  produits: string[];
  /**
   * Les pages de compétence qui portent le référencement de cette offre.
   * C'est ce qui raccroche les nouvelles offres aux anciennes URL — sans ce
   * lien, les deux systèmes vivraient côte à côte sans se parler.
   */
  competences: string[];
};

export const OFFRES: Offre[] = [
  // ── COMMUNICATION & MARKETING ────────────────────────────────────────
  {
    id: "snack-content",
    metier: "film",
    nom: "Snack content & réseaux sociaux",
    accroche: "Multipliez votre visibilité et boostez vos ventes",
    promesse:
      "Nous multiplions votre visibilité en ligne avec des contenus courts, viraux et optimisés pour les réseaux sociaux, incluant stratégie de diffusion et analyse des performances.",
    issue:
      "Votre marque devient un aimant à prospects, générant des leads qualifiés et une communauté engagée qui booste vos ventes rapidement.",
    produits: ["FOOH", "Motion promo", "Packshot RS", "Jingles", "Optimisation SEO pour les réseaux"],
    competences: ["motion-design"],
  },
  {
    id: "film-com-interne",
    metier: "film",
    nom: "Film de communication interne",
    accroche: "Engagez et impliquez vos collaborateurs",
    promesse:
      "Nous engageons et impliquons vos collaborateurs via des vidéos internes personnalisées, avec conseils stratégiques pour renforcer la cohésion et la productivité.",
    issue:
      "Vos équipes sont motivées et alignées, réduisant le turnover et accélérant l’innovation interne pour une entreprise plus agile et performante.",
    produits: ["Formation", "Tutoriel", "Lancement de projet", "Film de vœux", "Marque employeur"],
    competences: ["studio-fond-vert-compositing", "motion-design"],
  },
  {
    id: "film-com-externe",
    metier: "film",
    nom: "Film de communication externe",
    accroche: "Soignez votre image et gagnez en crédibilité",
    promesse:
      "Nous soignons votre image externe avec des films premium qui bâtissent crédibilité et attractivité, de la conception à la mesure d’impact.",
    issue:
      "Votre entreprise attire talents et clients premium, renforçant votre réputation comme leader du marché et décuple vos opportunités business.",
    produits: ["Film corporate", "Film produit", "Capsules interviews", "Podcasts", "Marque employeur"],
    competences: ["video-corporate-film-dentreprise", "animation-3d", "video-aerienne-drone"],
  },

  // ── ÉVÉNEMENTIEL ─────────────────────────────────────────────────────
  {
    id: "conception-scenographie",
    metier: "evenement",
    nom: "Conception, scénographie & couverture",
    accroche: "Dynamisez votre événement et impliquez votre audience",
    promesse:
      "Nous dynamisons votre événement avec des contenus vidéo scénographiés sur mesure.",
    issue:
      "Votre événement captive et unit participants, créant des connexions durables qui transforment spectateurs en ambassadeurs fidèles.",
    produits: [
      "Habillage & infodécor",
      "Vidéos pour convention",
      "Captation multicaméra",
      "Application de salon",
      "Interactivité — sondages en direct, Q&A en réalité augmentée",
    ],
    competences: ["aftermovie-captation-evenementielle"],
  },
  {
    id: "diffusion-visibilite",
    metier: "evenement",
    nom: "Diffusion & visibilité",
    accroche: "Faites durer votre événement dans le temps",
    /* ⚠️ Promesse et issue inversées dans le Canva — remises dans l'ordre
       des huit autres offres. À vérifier avec Giz. */
    promesse:
      "Nous faisons durer votre événement dans le temps avec une diffusion multi-canaux pour étendre la portée.",
    issue:
      "Votre événement vit éternellement en ligne, générant buzz continu et convertissant vues en clients, bien au-delà de la date finale.",
    produits: [
      "Aftermovie",
      "Streaming",
      "Événements hybrides — virtuel et physique",
    ],
    competences: ["live-streaming-webtv", "aftermovie-captation-evenementielle"],
  },
  {
    id: "videomapping",
    metier: "evenement",
    nom: "Vidéomapping",
    accroche: "Marquez les esprits et créez du rêve",
    promesse:
      "Nous marquons les esprits avec des projections mapping immersives et créatives, intégrant stratégie pour créer du rêve et de l’émotion.",
    issue:
      "Vos invités vivent un moment magique inoubliable, boostant votre marque comme innovante et générant un bouche-à-oreille viral explosif.",
    produits: ["Vidéomapping architectural", "Vidéomapping sur table"],
    competences: ["video-mapping"],
  },

  // ── IMMERSION ────────────────────────────────────────────────────────
  {
    id: "vr-ar",
    metier: "immersion",
    nom: "Réalité virtuelle & augmentée",
    accroche: "Développez vos ventes avec des expériences innovantes",
    promesse:
      "Nous développons vos ventes via des expériences VR/AR innovantes et interactives, avec accompagnement stratégique pour une immersion sur mesure.",
    issue:
      "Vos prospects testent vos produits en virtuel, accélérant décisions d’achat et augmentant vos conversions.",
    produits: [
      "Visite en réalité virtuelle",
      "Formation VR",
      "Expériences gamifiées",
      "Métavers personnalisé",
    ],
    competences: ["creation-immersive-realite-virtuelle"],
  },
  {
    id: "salle-immersive",
    metier: "immersion",
    nom: "Salle immersive",
    accroche: "Créez un univers pour une expérience unique",
    promesse:
      "Nous créons un univers immersif unique dans vos espaces, de la conception à l’installation technique, pour une expérience sensorielle qui captive.",
    issue: "Vos visiteurs plongent dans votre monde, émergeant transformés et émerveillés.",
    produits: ["Salle immersive", "Showroom mixte"],
    /* Aucune page de compétence existante : c'est une offre nouvelle, donc
       une page à créer de zéro — sans historique de référencement à protéger,
       mais aussi sans rien pour démarrer. */
    competences: [],
  },
  {
    id: "showroom-virtuel",
    metier: "immersion",
    nom: "Visite & showroom virtuel",
    accroche: "Vos clients chez vous sans se déplacer",
    promesse:
      "Nous amenons vos clients directement chez vous via des visites virtuelles fluides et immersives pour créer de l’engagement et des résultats mesurables.",
    issue:
      "Votre business s’ouvre au monde entier, générant leads globaux et fidélisant clients distants comme s’ils étaient sur place.",
    produits: ["Visite virtuelle", "Showroom virtuel"],
    competences: [],
  },
];

export const offresDuMetier = (m: Metier) => OFFRES.filter(o => o.metier === m);
