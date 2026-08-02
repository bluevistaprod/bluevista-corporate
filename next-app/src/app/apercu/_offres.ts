import type { Metier } from "./_plan-du-site";

/**
 * LES NEUF OFFRES — relevées dans le Canva « OFFRES BLUEVISTA 2026 »
 * (DAG1vsaUGy4), lu le 02/08/2026 via le connecteur Canva.
 *
 * Les ACCROCHES sont de Giz, reprises mot pour mot. Les promesses et les
 * issues ont été atténuées sur sa demande — voir plus bas.
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
 * ⚠️ LE TON A ÉTÉ ATTÉNUÉ le 02/08/2026, sur décision de Giz : « elles
 * abusent ». Il a raison, et c'était ma réserve. « Votre événement vit
 * éternellement en ligne », « émergeant transformés et émerveillés »,
 * « bouche-à-oreille viral explosif » : sur une page qui cite l'ONU et
 * l'UNESCO, la promesse trop grande produit l'effet inverse de celui qu'on
 * cherche — elle fait douter du reste, y compris de ce qui est vrai.
 *
 * La règle appliquée : on garde le bénéfice, on retire le superlatif. Une
 * issue client doit être une chose qu'on pourrait vérifier, pas une
 * incantation. « Vos participants repartent avec quelque chose à raconter »
 * se vérifie ; « connexions durables qui transforment spectateurs en
 * ambassadeurs fidèles », non.
 *
 * ⛔ LES ACCROCHES N'ONT PAS BOUGÉ : elles sont justes, courtes, à
 * l'impératif, et c'est le niveau où le superlatif est admis.
 *
 * 📄 Les formulations d'origine du Canva sont conservées mot pour mot dans
 * OFFRES-BLUEVISTA.md, à la racine du dépôt. C'est le document de référence
 * des offres, demandé par Giz : le site en est une vue, pas la source.
 *
 * 📌 « Diffusion et visibilité » : promesse et issue étaient inversées dans
 * le Canva par rapport aux huit autres offres. Remises dans l'ordre, validé
 * par Giz.
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
  /**
   * Les produits concrets. Texte de Giz, remis en forme lisible.
   * `slug` sert de filtre sur la page réalisations : chaque produit devient
   * cliquable et mène aux projets qui l'illustrent. Un produit qu'on ne peut
   * pas illustrer est un produit qu'on ne devrait pas afficher.
   */
  produits: { nom: string; slug: string }[];
  /** L'image de l'offre — la section « ce qu'on produit » était devenue
   *  une liste de mots sans relief. Correction de Giz. */
  image: string;
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
      "Des contenus courts pensés pour les réseaux, avec la stratégie de diffusion qui va avec et l’analyse de ce que chacun a rapporté.",
    issue:
      "Vous existez là où votre audience passe déjà, et vous savez lequel de vos formats fonctionne.",
    produits: [
      { nom: "FOOH", slug: "fooh" },
      { nom: "Motion promo", slug: "motion-promo" },
      { nom: "Packshot réseaux", slug: "packshot" },
      { nom: "Jingles", slug: "jingle" },
      { nom: "Optimisation pour les réseaux", slug: "optimisation-rs" },
    ],
    image: "/media/px-methode-4.jpg",
    competences: ["motion-design"],
  },
  {
    id: "film-com-interne",
    metier: "film",
    nom: "Film de communication interne",
    accroche: "Engagez et impliquez vos collaborateurs",
    promesse:
      "Des vidéos internes faites pour vos équipes et pas pour votre marché, avec le conseil qui décide de ce qu’on dit et de ce qu’on tait.",
    issue:
      "Vos équipes savent où va l’entreprise, et pourquoi. C’est ce qui fait rester les gens.",
    produits: [
      { nom: "Formation", slug: "formation" },
      { nom: "Tutoriel", slug: "tutoriel" },
      { nom: "Lancement de projet", slug: "lancement" },
      { nom: "Film de vœux", slug: "voeux" },
      { nom: "Marque employeur", slug: "marque-employeur" },
    ],
    image: "/media/bv-production.jpg",
    competences: ["studio-fond-vert-compositing", "motion-design"],
  },
  {
    id: "film-com-externe",
    metier: "film",
    nom: "Film de communication externe",
    accroche: "Soignez votre image et gagnez en crédibilité",
    promesse:
      "Des films qui tiennent la comparaison avec ceux de vos concurrents les mieux équipés — de la conception jusqu’à la mesure de ce qu’ils ont produit.",
    issue:
      "Vos interlocuteurs vous prennent au sérieux avant le premier rendez-vous.",
    produits: [
      { nom: "Film corporate", slug: "corporate" },
      { nom: "Film produit", slug: "produit" },
      { nom: "Capsules interviews", slug: "interview" },
      { nom: "Podcasts", slug: "podcast" },
      { nom: "Marque employeur", slug: "marque-employeur" },
    ],
    image: "/media/px-methode-5.jpg",
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
      "Vos participants repartent avec quelque chose à raconter — et ils le racontent.",
    produits: [
      { nom: "Habillage & infodécor", slug: "habillage" },
      { nom: "Vidéos pour convention", slug: "convention" },
      { nom: "Captation multicaméra", slug: "captation" },
      { nom: "Application de salon", slug: "appli-salon" },
      { nom: "Interactivité en salle", slug: "interactivite" },
    ],
    image: "/media/px-cas-worldskills.jpg",
    competences: ["aftermovie-captation-evenementielle"],
  },
  {
    id: "diffusion-visibilite",
    metier: "evenement",
    nom: "Diffusion & visibilité",
    accroche: "Faites durer votre événement dans le temps",
    /* Promesse et issue étaient inversées dans le Canva. Remises dans
       l'ordre des huit autres offres, validé par Giz. */
    promesse:
      "Une diffusion pensée avant l’événement et pas après : ce qui sera filmé, pour qui, et sur quels canaux.",
    issue:
      "Votre événement continue d’exister pour ceux qui n’y étaient pas.",
    produits: [
      { nom: "Aftermovie", slug: "aftermovie" },
      { nom: "Streaming", slug: "streaming" },
      { nom: "Événement hybride", slug: "hybride" },
    ],
    image: "/media/px-pilier-evenementiel.jpg",
    competences: ["live-streaming-webtv", "aftermovie-captation-evenementielle"],
  },
  {
    id: "videomapping",
    metier: "evenement",
    nom: "Vidéomapping",
    accroche: "Marquez les esprits et créez du rêve",
    promesse:
      "Des projections qui font d’un bâtiment ou d’un objet le décor de votre soirée, avec l’écriture avant la technique.",
    issue:
      "Vos invités se souviennent de la soirée, et de qui l’a organisée.",
    produits: [
      { nom: "Mapping architectural", slug: "mapping-architectural" },
      { nom: "Mapping sur table", slug: "mapping-table" },
    ],
    image: "/media/px-mapping.jpg",
    competences: ["video-mapping"],
  },

  // ── IMMERSION ────────────────────────────────────────────────────────
  {
    id: "vr-ar",
    metier: "immersion",
    nom: "Réalité virtuelle & augmentée",
    accroche: "Développez vos ventes avec des expériences innovantes",
    promesse:
      "Des expériences VR et AR conçues à partir de ce que le visiteur doit comprendre, pas à partir du matériel disponible.",
    issue:
      "Vos prospects essaient avant d’acheter, même à des milliers de kilomètres.",
    produits: [
      { nom: "Visite en réalité virtuelle", slug: "visite-vr" },
      { nom: "Formation VR", slug: "formation-vr" },
      { nom: "Expérience gamifiée", slug: "gamification" },
      { nom: "Métavers personnalisé", slug: "metavers" },
    ],
    image: "/media/px-pilier-immersion.jpg",
    competences: ["creation-immersive-realite-virtuelle"],
  },
  {
    id: "salle-immersive",
    metier: "immersion",
    nom: "Salle immersive",
    accroche: "Créez un univers pour une expérience unique",
    promesse:
      "Un espace de votre bâtiment transformé en salle immersive, de la conception à l’installation technique.",
    issue:
      "Vos visiteurs entrent dans votre univers, et y restent plus longtemps que devant un écran.",
    produits: [
      { nom: "Salle immersive", slug: "salle-immersive" },
      { nom: "Showroom mixte", slug: "showroom-mixte" },
    ],
    image: "/media/px-cas-unesco.jpg",
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
      "Vos locaux, vos produits ou votre chantier visitables depuis un navigateur, avec la mesure de ce que les visiteurs y regardent.",
    issue:
      "Vos clients visitent sans prendre l’avion, et vous savez ce qui les a arrêtés.",
    produits: [
      { nom: "Visite virtuelle", slug: "visite-virtuelle" },
      { nom: "Showroom virtuel", slug: "showroom-virtuel" },
    ],
    image: "/media/px-methode-6.jpg",
    competences: [],
  },
];

export const offresDuMetier = (m: Metier) => OFFRES.filter(o => o.metier === m);
