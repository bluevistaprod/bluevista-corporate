/**
 * LE PLAN DU SITE — source unique de vérité, créée le 02/08/2026.
 *
 * ⛔⛔ CE FICHIER EXISTE À CAUSE D'UN CONSTAT QUI A CHANGÉ L'ARCHITECTURE.
 *
 * La maquette partait de trois piliers — Communication & marketing,
 * Événementiel, Immersion. C'est le bon découpage COMMERCIAL, et c'est le
 * repositionnement voulu par Giz. Mais l'inventaire de la Search Console dit
 * autre chose sur l'endroit d'où vient le trafic :
 *
 *   /nos-competences/video-mapping/                    96 clics · 12 984 impr.
 *   /nos-competences/live-streaming-webtv/             85 clics ·  3 785 impr.
 *   /nos-competences/animation-3d/                     24 clics ·  1 908 impr.
 *   /nos-competences/motion-design/                    14 clics ·  9 455 impr.
 *   /nos-competences/aftermovie-captation-evenement/   10 clics ·  7 780 impr.
 *   /studio-animation-3d-lyon/                        159 clics · 15 005 impr.
 *   /studio-animation-3d-paris/                        54 clics · 17 984 impr.
 *   /realisation-film-entreprise-lyon/                 14 clics · 13 952 impr.
 *
 * Autrement dit : hors page d'accueil, la quasi-totalité du trafic entre par
 * des pages de COMPÉTENCE et des pages de VILLE — pas par des pages de
 * métier. Ces URL se positionnent parce que leur adresse, leur titre et leur
 * contenu portent le mot que les gens tapent : « vidéo mapping », « studio
 * animation 3D Lyon ».
 *
 * 👉 Remplacer ces pages par trois pages « pilier » reviendrait à échanger
 * huit expressions de recherche précises contre trois mots génériques.
 * C'est très exactement ce que Giz a interdit depuis le premier jour :
 * « je ne veux pas perdre de points de référencement ».
 *
 * D'OÙ TROIS NIVEAUX, ET NON UN :
 *   ① MÉTIER      — les trois piliers. Nouveaux. Ils portent le
 *                   repositionnement et la conversion.
 *   ② COMPÉTENCE  — une page par savoir-faire, en reprenant les adresses
 *                   existantes. C'est là que vit le référencement.
 *   ③ RÉALISATION — la preuve. Le plus gros volume de contenu du site.
 * Plus les pages de VILLE, qui croisent une compétence et un lieu.
 *
 * La colonne `ancienneUrl` n'est pas décorative : c'est elle qui produira le
 * plan de redirections au moment de la bascule. Toute page qui n'a pas son
 * ancienne adresse ici est une page dont on perdra l'historique.
 */

export type Metier = "film" | "evenement" | "immersion";

export type Competence = {
  /** Le segment d'URL — REPRIS TEL QUEL de l'ancien site. */
  slug: string;
  nom: string;
  /** Le métier auquel elle se rattache. */
  metier: Metier;
  /** Ce que la page doit dire, en une phrase. */
  accroche: string;
  /** Le problème du client qui arrive par cette recherche. */
  probleme: string;
  ce_qu_on_fait: string[];
  image: string;
  /** L'adresse actuelle, à rediriger. */
  ancienneUrl: string;
  /** Clics sur 12 mois — sert à prioriser la rédaction, pas à décorer. */
  clics: number;
};

export const COMPETENCES: Competence[] = [
  {
    slug: "video-mapping",
    nom: "Vidéo mapping",
    metier: "immersion",
    accroche:
      "Projeter sur un bâtiment, un objet ou un décor, et faire de sa surface un écran.",
    probleme:
      "Vous avez un lieu fort — une façade, un hall, une machine — et rien qui le mette en scène le soir de votre événement.",
    ce_qu_on_fait: [
      "Relevé et modélisation 3D du support",
      "Écriture et création graphique",
      "Calage optique sur site",
      "Régie et exploitation le jour J",
      "Captation du résultat",
    ],
    image: "/media/px-mapping.jpg",
    ancienneUrl: "/nos-competences/video-mapping/",
    clics: 96,
  },
  {
    slug: "live-streaming-webtv",
    nom: "Live streaming & web TV",
    metier: "evenement",
    accroche:
      "Diffuser en direct, avec la fabrication d’un plateau et la fiabilité d’une régie.",
    probleme:
      "Une partie de votre public ne sera pas dans la salle. S’ils regardent un flux mal réalisé, ils décrochent en quatre minutes.",
    ce_qu_on_fait: [
      "Plateau et habillage graphique",
      "Régie multi-caméra",
      "Diffusion multi-plateformes",
      "Interaction avec le public à distance",
      "Rediffusion et extraits",
    ],
    image: "/media/px-pilier-evenementiel.jpg",
    ancienneUrl: "/nos-competences/live-streaming-webtv/",
    clics: 85,
  },
  {
    slug: "animation-3d",
    nom: "Animation 3D",
    metier: "film",
    accroche:
      "Montrer ce qu’aucune caméra ne peut filmer : l’intérieur, l’invisible, le pas-encore-construit.",
    probleme:
      "Votre produit est technique, enterré, microscopique ou encore à l’état de plan. Le photographier ne sert à rien.",
    ce_qu_on_fait: [
      "Modélisation d’après vos plans ou fichiers CAO",
      "Animation et rendu",
      "Vues en coupe et éclatés techniques",
      "Intégration en prises de vues réelles",
      "Déclinaison en images fixes",
    ],
    image: "/media/px-pilier-communication.jpg",
    ancienneUrl: "/nos-competences/animation-3d/",
    clics: 24,
  },
  {
    slug: "motion-design",
    nom: "Motion design",
    metier: "film",
    accroche:
      "Rendre lisible ce qui est complexe, en quelques secondes et sans plateau.",
    probleme:
      "Vous devez expliquer une offre, un chiffre ou un processus à des gens qui ne vous accorderont pas trois minutes.",
    ce_qu_on_fait: [
      "Écriture et scénarisation",
      "Direction artistique et illustration",
      "Animation et sound design",
      "Voix off et sous-titrage",
      "Formats courts pour les réseaux",
    ],
    image: "/media/px-methode-4.jpg",
    ancienneUrl: "/nos-competences/motion-design/",
    clics: 14,
  },
  {
    slug: "aftermovie-captation-evenementielle",
    nom: "Aftermovie & captation",
    metier: "evenement",
    accroche:
      "Filmer votre événement, et en tirer de quoi communiquer jusqu’au suivant.",
    probleme:
      "Vous investissez des mois dans un événement qui dure une journée, et il n’en reste rien le lendemain.",
    ce_qu_on_fait: [
      "Captation multi-caméra",
      "Interviews de participants sur le vif",
      "Aftermovie monté à chaud",
      "Formats courts et verticaux",
      "Photothèque de l’événement",
    ],
    image: "/media/px-cas-worldskills.jpg",
    ancienneUrl: "/nos-competences/aftermovie-captation-evenementielle/",
    clics: 10,
  },
  {
    slug: "creation-immersive-realite-virtuelle",
    nom: "Réalité virtuelle",
    metier: "immersion",
    accroche:
      "Faire vivre une situation impossible à montrer autrement — et mesurer ce qu’il en reste.",
    probleme:
      "Vous devez faire comprendre un lieu, un risque ou un geste à des gens qui ne peuvent pas s’y rendre.",
    ce_qu_on_fait: [
      "Conception du parcours et du scénario d’usage",
      "Captation 360° ou environnement 3D",
      "Développement de l’application",
      "Installation, casques et exploitation",
      "Statistiques de session",
    ],
    image: "/media/px-pilier-immersion.jpg",
    ancienneUrl: "/nos-competences/creation-immersive-realite-virtuelle/",
    clics: 9,
  },
  {
    slug: "studio-fond-vert-compositing",
    nom: "Studio fond vert & compositing",
    metier: "film",
    accroche: "Détourer, incruster, et poser vos intervenants où vous voulez.",
    probleme:
      "Vous avez besoin d’un décor que vous n’avez pas, ou d’une série de vidéos tournées le même jour dans dix contextes différents.",
    ce_qu_on_fait: [
      "Tournage sur fond vert",
      "Incrustation et compositing",
      "Décors virtuels 3D",
      "Habillage graphique",
      "Série de contenus en une seule journée",
    ],
    image: "/media/bv-production.jpg",
    ancienneUrl: "/nos-competences/studio-fond-vert-compositing/",
    clics: 4,
  },
  {
    slug: "video-aerienne-drone",
    nom: "Vidéo aérienne & drone",
    metier: "film",
    accroche: "Prendre de la hauteur, légalement, y compris en ville.",
    probleme:
      "Votre site, votre chantier ou votre événement ne se comprend qu’à condition de le voir en entier.",
    ce_qu_on_fait: [
      "Pilotes déclarés et scénarios autorisés",
      "Demandes d’autorisation de survol",
      "Prises de vues aériennes 4K",
      "Intérieur au drone léger",
      "Photogrammétrie et modèles 3D",
    ],
    image: "/media/px-methode-2.jpg",
    ancienneUrl: "/nos-competences/video-aerienne-drone/",
    clics: 2,
  },
  {
    slug: "video-corporate-film-dentreprise",
    nom: "Film d’entreprise",
    metier: "film",
    accroche:
      "Le film qui dit qui vous êtes — à vos clients, à vos candidats, à vos équipes.",
    probleme:
      "On vous demande « une vidéo de présentation » sans que personne n’ait tranché à qui elle parle ni ce qu’elle doit obtenir.",
    ce_qu_on_fait: [
      "Cadrage des objectifs et de la cible",
      "Écriture et interviews",
      "Tournage sur vos sites",
      "Montage, habillage, sous-titres",
      "Déclinaisons courtes",
    ],
    image: "/media/px-methode-5.jpg",
    ancienneUrl: "/nos-competences/video-corporate-film-dentreprise/",
    clics: 1,
  },
];

/**
 * LES PAGES DE VILLE.
 *
 * 227 clics à elles seules, soit davantage que toutes les pages de
 * compétence réunies hors mapping et streaming. Elles répondent à une
 * intention précise — « studio animation 3D lyon » — et ce sont les pages
 * les plus fragiles de la refonte : leur valeur tient à l'adresse et au
 * titre, pas au design.
 *
 * ⛔ NE PAS LES FONDRE dans les pages de compétence, et ne pas se contenter
 * d'y dupliquer le texte de la compétence en changeant le nom de la ville :
 * Google traite ça comme du contenu quasi dupliqué et déclasse l'ensemble.
 * Chacune doit porter des réalisations locales et des mentions de lieux réels.
 */
export type PageVille = {
  slug: string;
  titre: string;
  ville: string;
  competence: string;
  ancienneUrl: string;
  clics: number;
};

export const VILLES: PageVille[] = [
  {
    slug: "studio-animation-3d-lyon",
    titre: "Studio d’animation 3D à Lyon",
    ville: "Lyon",
    competence: "animation-3d",
    ancienneUrl: "/studio-animation-3d-lyon/",
    clics: 159,
  },
  {
    slug: "studio-animation-3d-paris",
    titre: "Studio d’animation 3D à Paris",
    ville: "Paris",
    competence: "animation-3d",
    ancienneUrl: "/studio-animation-3d-paris/",
    clics: 54,
  },
  {
    slug: "realisation-film-entreprise-lyon",
    titre: "Réalisation de film d’entreprise à Lyon",
    ville: "Lyon",
    competence: "video-corporate-film-dentreprise",
    ancienneUrl: "/realisation-film-entreprise-lyon/",
    clics: 14,
  },
  {
    slug: "realisation-video-geneve",
    titre: "Réalisation vidéo à Genève",
    ville: "Genève",
    competence: "video-corporate-film-dentreprise",
    ancienneUrl: "/realisation-video-geneve/",
    clics: 2,
  },
];

/** Les pages fixes, hors arborescence métier. */
export const PAGES_FIXES = [
  { slug: "agence", nom: "L’agence", ancienneUrl: "/agence/", clics: 38 },
  { slug: "realisations", nom: "Réalisations", ancienneUrl: "/nos-realisations/", clics: 15 },
  { slug: "contact", nom: "Contact & devis", ancienneUrl: "/contact-devis/", clics: 17 },
  { slug: "actualites", nom: "Actualités", ancienneUrl: "/actualites/", clics: 0 },
  { slug: "mentions-legales", nom: "Mentions légales", ancienneUrl: "/mentions-legales/", clics: 11 },
];

export const METIERS: { cle: Metier; nom: string; slug: string }[] = [
  { cle: "film", nom: "Communication & marketing", slug: "film" },
  { cle: "evenement", nom: "Événementiel", slug: "evenement" },
  { cle: "immersion", nom: "Immersion", slug: "immersion" },
];

export const competencesDuMetier = (m: Metier) =>
  COMPETENCES.filter(c => c.metier === m).sort((a, b) => b.clics - a.clics);
