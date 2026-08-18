/**
 * LA PASSE ÉDITORIALE — les 22 actualités qui portent du trafic.
 *
 * ⭐ CE QUE LA PASSE MÉCANIQUE NE POUVAIT PAS FAIRE : découper le récit et lui
 * donner des titres. 61 des 63 articles de l'ancien site n'ont aucun
 * intertitre ; les fabriquer par une règle aurait produit 126 titres creux.
 * Ceux-ci sont écrits en LISANT chaque article.
 *
 * ⛔ ET SURTOUT : CHAQUE MÉDIA EST POSÉ SUR LE BLOC DONT LE TEXTE LE NOMME.
 * C'est la règle qui a coûté le plus cher — la vidéo Cémoi sur un paragraphe
 * de durée de session, la photo NightSwapping sous le texte d'Amplitude. Ici
 * la correspondance est écrite à la main, média par média, et un bloc dont
 * aucune phrase ne justifie une image n'en reçoit pas.
 *
 * ⚠️ LE TEXTE DES PARAGRAPHES N'EST PAS RÉÉCRIT. Il est redécoupé, pas
 * reformulé : la réécriture est un autre chantier, qui passe par Giz.
 *
 * ♻️ Le script relit le document existant, réutilise ses médias déjà
 * téléversés (aucun nouvel envoi) et réécrit le seul champ `blocs`.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

let n = 0;
const cle = () => `e${++n}`;

/** Un paragraphe de texte enrichi, liens posés sur les MOTS. */
function para(morceaux) {
  const markDefs = [];
  const children = morceaux.map(m => {
    if (typeof m === "string") return { _type: "span", _key: cle(), text: m, marks: [] };
    const k = cle();
    markDefs.push({ _type: "link", _key: k, href: m.href });
    return { _type: "span", _key: cle(), text: m.texte, marks: [k] };
  });
  return { _type: "block", _key: cle(), style: "normal", markDefs, children };
}

/**
 * LE PLAN DE CHAQUE ARTICLE.
 * `paras` désigne les paragraphes du document par leur RANG dans le corps
 * repris mécaniquement ; `medias` les désigne par leur rang dans la pile.
 * Les deux sont décidés en lisant l'article, jamais par une règle.
 */
const PLANS = {
  /* 9 clics · 2 727 impressions. ⚠️ Concurrence mesurée avec la page
     savoir-faire « création immersive » : l'actualité est en première page,
     la page savoir-faire en page 3. On garde ici l'angle ÉQUIPEMENT ET
     HISTOIRE, et on renvoie vers la page qui vend. */
  "video-immersive-360": {
    blocs: [
      { surTitre: "Le point de départ", titre: "Six GoPro, et une image reconstituée en 4K", paras: [0, 1], medias: [] },
      { surTitre: "Aujourd’hui", titre: "Une caméra 8K, et jusqu’à 12K en photo", paras: [2], medias: ["image:0"] },
      { surTitre: "Ce que ça permet", titre: "Du survol touristique au cœur de l’orchestre", paras: [3, 4, 5], medias: ["video:*"] },
    ],
    projets: {
      titre: "La vidéo 360 mise au service d’un projet",
      paras: [
        [
          "Une caméra à 360° ne fait pas un film. Ce qui décide, c’est ce qu’on demande au spectateur de faire de sa liberté de regard : chercher, choisir, se repérer.",
        ],
        [
          "Pour ", { texte: "Fibois AURA", href: "https://www.fibois-aura.org/" },
          ", c’était parcourir une filière du bois. Pour ",
          { texte: "Yves Rocher", href: "https://www.yves-rocher.fr/" },
          ", un site de production. Pour ",
          { texte: "Pisten Bully", href: "https://www.pistenbully.com/fr" },
          ", la cabine d’une dameuse en pleine action. Trois lieux qu’on ne visite pas, trois raisons différentes de les montrer en entier.",
        ],
      ],
      boutonLibelle: "Nos projets en réalité virtuelle et 360",
      boutonLien: "/savoir-faire/creation-immersive-realite-virtuelle/",
    },
  },

  /* 9 clics. Un projet, un lieu, un commanditaire — le récit tient tout seul. */
  "motion-design-3d-et-mapping-a-paris-au-musee-rodin": {
    blocs: [
      { surTitre: "Le projet", titre: "Un mapping sur la façade du musée Rodin", paras: [0, 1], medias: [] },
      { surTitre: "Comment on l’a fait", titre: "Trois mois de travail, trente mètres de façade", paras: [2, 3, 4], medias: ["video:*"] },
    ],
    projets: {
      titre: "Le mapping, quand le bâtiment fait partie du message",
      paras: [
        [
          "Projeter sur une façade impose une contrainte que l’écran ne connaît pas : l’image doit épouser une architecture qu’on n’a pas dessinée. Les lignes du bâtiment deviennent celles du film.",
        ],
        [
          "Ce mapping a été commandé par l’agence ",
          { texte: "Thera Conseil", href: "https://thera.fr" },
          " pour les 40 ans de Siparex, sur la façade du ",
          { texte: "musée Rodin", href: "http://www.musee-rodin.fr/" },
          ". Trois mois de production, mêlant animation 3D, tournage sur fond vert et motion design.",
        ],
      ],
      boutonLibelle: "Nos projections sur façade",
      boutonLien: "/savoir-faire/video-mapping/",
    },
  },

  /* 8 clics · cinq photos du même soir : elles font une galerie légitime. */
  "video-mapping-lyon-intercontinental-grand-hotel-dieu": {
    blocs: [
      { surTitre: "Le projet", titre: "Un mapping sous le dôme du Grand Hôtel-Dieu", paras: [0, 1], medias: ["video:*"] },
      { surTitre: "Le récit", titre: "L’univers se construit, puis donne naissance au dôme", paras: [2, 3, 4], medias: ["image:*"] },
    ],
    projets: {
      titre: "Un spectacle produit à plusieurs mains",
      paras: [
        [
          "Un mapping d’inauguration réunit des métiers qui ne travaillent pas ensemble le reste de l’année : production, image, technique de projection, musique.",
        ],
        [
          "Ici, la production était gérée par l’agence ",
          { texte: "TETRO", href: "http://www.tetro.fr/" },
          " et la diffusion par les équipes d’",
          { texte: "Alabama", href: "https://www.alabama-media.com/" },
          ". Deux mois de travail, et une déclinaison sur la façade de l’hôtel pour un second spectacle.",
        ],
      ],
      boutonLibelle: "Nos projections sur façade",
      boutonLien: "/savoir-faire/video-mapping/",
    },
  },

  /* 7 clics · aucune vidéo, deux images de l'animation : elles vont sur le
     paragraphe qui décrit le chantier. */
  "animation-3d-grande-arche-de-la-defense": {
    blocs: [
      { surTitre: "Le projet", titre: "Rendre lisible un chantier qu’on ne peut pas montrer", paras: [0, 1], medias: ["image:*"] },
    ],
    projets: {
      titre: "L’animation 3D technique, quand la photo ne suffit plus",
      paras: [
        [
          "Un chantier de rénovation se raconte mal en images réelles : les étapes se recouvrent, l’essentiel est caché, et le résultat n’existe pas encore. L’animation 3D montre ce qui n’est pas visible — l’ordre des opérations, l’intérieur des structures, l’état final.",
        ],
        [
          "Elle demande en revanche un aller-retour serré entre le bureau d’études et le studio : chaque plan est une affirmation technique, et une erreur de 3D est une erreur de chantier à l’écran.",
        ],
      ],
      boutonLibelle: "Notre studio d’animation 3D",
      boutonLien: "/savoir-faire/animation-3d/",
    },
  },

  /* 5 clics · le showreel : la vidéo est le sujet, les photos en sont des
     extraits — elles forment donc une galerie sous le film. */
  "bluevista-video-showreel-2023": {
    blocs: [
      { surTitre: "L’année en deux minutes", titre: "Ce que l’équipe a produit en 2023", paras: [0, 1], medias: ["video:*"] },
      { surTitre: "Quelques images", titre: "Du mapping d’une salle de yoga au film technique", paras: [2, 3, 4], medias: ["image:*"] },
    ],
  },

  /* 4 clics · l'actualité générique qui tient toute la famille « carte de
     vœux vidéo » (1 905 des 1 988 impressions). ⛔ Elle garde son adresse ET
     ses mots-clés : c'est une décision écrite. */
  "carte-de-voeux-video": {
    blocs: [
      { surTitre: "Le produit", titre: "Un film de fin d’année, et une raison de rappeler ses clients", paras: [0, 1], medias: ["video:*"] },
      { surTitre: "Le calendrier", titre: "Produit vite, diffusé par newsletter", paras: [2, 3, 4], medias: ["image:*"] },
    ],
  },
  /* 3 clics · LPA. ⚠️ Le § « Forts de nos 15 ans d'expérience » est daté
     (on est à 22 depuis 2004) : il sort ici, la réécriture viendra. */
  "50ans-de-lpa-une-histoire-lyonnaise": {
    blocs: [
      { surTitre: "Le projet", titre: "Cinquante ans de stationnement lyonnais, en un film", paras: [0, 1], medias: ["video:*"] },
    ],
    projets: {
      titre: "Le film anniversaire, quand l’archive fait le récit",
      paras: [
        ["Un anniversaire d’entreprise se raconte rarement avec les moyens du présent : l’essentiel est dans les archives, et dans la mémoire des gens qui étaient là."],
        ["Pour ", { texte: "Lyon Parc Auto", href: "https://www.lpa.fr/" }, ", le film assemble reprise graphique, motion design 2D et 3D, et prises de vue réelles construites autour d’interviews. Trois matières pour une seule ligne de temps."],
      ],
      boutonLibelle: "Nos films d’entreprise",
      boutonLien: "/savoir-faire/video-corporate-film-dentreprise/",
    },
  },

  /* 2 clics · ⛔ « 2023 » RETIRÉ DU TITRE : décision écrite. La page dérivait
     vers les recherches de l'année en cours et perdait la famille « carte de
     vœux vidéo », qui appartient à l'actualité générique. Les 4 derniers §
     sont l'argumentaire générique — c'est LUI qui faisait doublon. */
  "koesio-carte-de-voeux-2023": {
    titre: "Koesio — la carte de vœux jouée par les enfants des collaborateurs",
    blocs: [
      { surTitre: "Le projet", titre: "Vingt-cinq enfants, un cyclo blanc, une toile", paras: [0, 1, 2], medias: ["video:*"] },
      { surTitre: "Ce que ça a donné", titre: "Louis Bertignac en live, et un euro reversé par vue", paras: [3, 4, 5], medias: ["image:*"] },
    ],
    projets: {
      titre: "La carte de vœux, le seul film qu’on regarde parce qu’il est daté",
      paras: [
        ["Une carte de vœux vidéo a une fenêtre de deux semaines. C’est sa contrainte et sa force : personne ne la regarde par obligation, et tout le monde la regarde en même temps."],
        [{ texte: "Koesio", href: "https://koesio.com/" }, ", leader français des services numériques de proximité, a choisi de la confier à vingt-cinq enfants de ses collaborateurs. Le film a été diffusé sur ses réseaux et son site, et chaque vue valait un euro versé à l’association Arc En Ciel."],
      ],
      boutonLibelle: "Nos cartes de vœux vidéo",
      boutonLien: "/actualites/carte-de-voeux-video/",
    },
  },

  /* 2 clics · un festival suivi quatre jours d'affilée : le rythme de
     production EST le sujet. */
  "guitare-en-scene-2023": {
    blocs: [
      { surTitre: "Le projet", titre: "Quatre jours de festival, une vidéo par soir", paras: [0, 1, 2], medias: ["video:*"] },
      { surTitre: "Comment on l’a fait", titre: "Deux cadreurs, un monteur, et le montage pendant le concert", paras: [3, 4], medias: ["image:*"] },
    ],
    projets: {
      titre: "Filmer en direct, quand la vidéo doit sortir avant que l’envie retombe",
      paras: [
        ["Un aftermovie livré trois semaines plus tard ne sert plus à rien : l’événement est fini, et l’envie avec. La contrainte vraie, c’est de monter pendant que ça se passe."],
        ["Au festival ", { texte: "Guitare en Scène", href: "https://www.guitare-en-scene.com/" }, ", à Saint-Julien-en-Genevois, les vidéos sont validées le soir même et publiées le lendemain. La même méthode sert les séminaires et les conventions d’entreprise."],
      ],
      boutonLibelle: "Nos aftermovies et captations",
      boutonLien: "/savoir-faire/aftermovie-captation-evenementielle/",
    },
  },

  /* 2 clics · aucune photo de contenu, aucune vidéo Vimeo : le film est sur
     YouTube. L'image d'en-tête porte seule la page, et c'est assumé. */
  "realisation-immersion-360-degres-dameuse-pisten-bully": {
    blocs: [
      { surTitre: "Le projet", titre: "Une nuit dans la cabine d’une dameuse", paras: [0], medias: [] },
      { surTitre: "La diffusion", titre: "Du casque Oculus au QR code", paras: [1, 2], medias: [] },
    ],
    projets: {
      titre: "La vidéo 360, pour les lieux où l’on ne peut pas emmener quelqu’un",
      paras: [
        ["Certains postes de travail ne se visitent pas : ils sont en mouvement, de nuit, ou dangereux. La 360 y remplace la visite — le spectateur choisit où il regarde, et comprend le métier par l’espace plutôt que par le commentaire."],
        ["Ce film a été tourné pour Kässbohrer avec GL Events Audiovisual, dans la station de ", { texte: "Val Thorens", href: "https://www.valthorens.com/" }, ". Il a d’abord été diffusé sous casque au salon ", { texte: "Mountain Planet", href: "https://alpexpo.com/evenements-alpexpo/mountain-planet/" }, ", puis rendu accessible par QR code."],
      ],
      boutonLibelle: "Nos projets immersifs",
      boutonLien: "/savoir-faire/creation-immersive-realite-virtuelle/",
    },
  },

  /* 2 clics · ⚠️ « En 15 ans d'existence » est daté : le § sort ici. */
  "bluevista-le-motion-design": {
    blocs: [
      { surTitre: "Ce que c’est", titre: "De l’animation 2D et 3D, au service d’une explication", paras: [0, 1], medias: ["video:*"] },
      { surTitre: "Comment on l’a fait", titre: "Un storyboard, puis un renard pour l’exemple", paras: [2, 3], medias: ["image:*"] },
    ],
    projets: {
      titre: "Le motion design, quand le sujet n’est pas filmable",
      paras: [
        ["Un service, un flux, une réaction chimique : rien de tout ça ne se filme. Le motion design fabrique ce qu’aucune caméra ne peut cadrer, et c’est sa seule vraie justification — pas le style."],
        ["Il sert aussi à tenir un rythme qu’une prise de vue réelle n’atteint pas : trente secondes pour ce qu’une démonstration met deux minutes à établir."],
      ],
      boutonLibelle: "Notre studio de motion design",
      boutonLien: "/savoir-faire/motion-design/",
    },
  },

  /* 2 clics · le premier essai de 360 aérien, en 2014. Deux photos du vol. */
  "projet-de-realisation-video-360": {
    blocs: [
      { surTitre: "L’essai", titre: "Six GoPro sous un drone, un après-midi de réglages", paras: [0, 1], medias: ["image:*"] },
    ],
    projets: {
      titre: "Le 360 aérien, une contrainte de machine avant d’être une image",
      paras: [
        ["Filmer à 360° depuis un drone pose un problème que le sol ne pose pas : l’appareil qui porte la caméra se voit. Tout le travail consiste à le faire disparaître — pieds rétractables, position du module, réglages refaits vol après vol."],
        ["Ce tournage a été mené pour ", { texte: "EDF", href: "https://www.edf.fr/" }, ", avec un DJI S1000 et l’appui d’", { texte: "Air Libre", href: "https://www.airlibreprod.com/" }, "."],
      ],
      boutonLibelle: "Nos vidéos aériennes par drone",
      boutonLien: "/savoir-faire/video-aerienne-drone/",
    },
  },

  /* 2 clics · cinq ans de collaboration, deux films, un sujet difficile. */
  "barpi-prevention-accidents": {
    blocs: [
      { surTitre: "Le projet", titre: "Décrypter un accident industriel pour éviter le suivant", paras: [0, 1, 2], medias: ["video:*"] },
      { surTitre: "Comment on l’a fait", titre: "Décors recréés en 3D, acteurs incrustés sur fond vert", paras: [3, 4, 5], medias: ["image:*"] },
      { surTitre: "La collaboration", titre: "Présents dès le scénario, pas seulement au tournage", paras: [6, 7], medias: [] },
    ],
    projets: {
      titre: "Le film pédagogique, quand se tromper coûte cher",
      paras: [
        ["Un film de prévention n’a pas le droit d’être approximatif : il décrit des enchaînements réels, et une simplification de trop transforme une leçon en contresens."],
        ["D’où la méthode : comprendre le dossier avant d’écrire, reconstituer les lieux en 3D plutôt que de les évoquer, et habiller le tout en motion design pour que ça reste lisible par quelqu’un qui n’est pas du métier."],
      ],
      boutonLibelle: "Notre studio fond vert et compositing",
      boutonLien: "/savoir-faire/studio-fond-vert-compositing/",
    },
  },

  /* 2 clics · le showroom virtuel : aucune vidéo, quatre vues du parcours. */
  "showroom-virtuel-gf-machining-solutions": {
    blocs: [
      { surTitre: "Le projet", titre: "Un showroom qu’on visite depuis un navigateur", paras: [0], medias: [] },
      { surTitre: "L’expérience", titre: "Chaque machine modélisée, chaque fiche accessible", paras: [1, 2, 3], medias: ["image:*"] },
    ],
    projets: {
      titre: "Le showroom virtuel, pour les produits qu’on ne déplace pas",
      paras: [
        ["Une machine-outil ne va pas au salon : elle pèse des tonnes, elle est immobilisée, et son client est à l’autre bout du monde. Le showroom virtuel la déplace à sa place, sur desktop, tablette et mobile."],
        ["Réalisé pour ", { texte: "GF Machining Solutions", href: "https://www.gfms.com/com/en.html" }, ", en collaboration avec l’agence ", { texte: "Gardeners", href: "https://www.agencegardeners.com/" }, " pour les fiches produit. Vue à 360 degrés, parcours de visite libre."],
      ],
      boutonLibelle: "Nos projets immersifs",
      boutonLien: "/savoir-faire/creation-immersive-realite-virtuelle/",
    },
  },
};

/* ── Application ──────────────────────────────────────────────────────── */
for (const [slug, plan] of Object.entries(PLANS)) {
  const doc = await client.fetch(`*[_id == $id][0]{_id, blocs}`, { id: `actualite-${slug}` });
  if (!doc) { console.log(`⛔ ${slug} : absent`); continue; }

  /* ⛔⛔ ON RELIT TOUS LES BLOCS, PAS LE PREMIER — ET C'EST UNE CORRECTION.
     Première version : `doc.blocs[0]`. Vrai tant que le document sortait de
     la passe mécanique, qui met tout dans un bloc unique. Faux dès la
     DEUXIÈME exécution : le script avait alors lui-même réparti les médias
     dans plusieurs blocs, et n'en retrouvait plus qu'une partie. Résultat
     mesuré : « vidéo immersive 360 » est passée de 5 médias à 0, en silence.
     👉 Un script qui transforme son propre résultat doit savoir relire ce
     qu'il a écrit. Sinon il n'est rejouable qu'une fois — et on ne s'en
     aperçoit qu'après l'avoir rejoué. */
  const source = doc.blocs?.[0] ?? {};
  const paras = (doc.blocs ?? []).flatMap(b => b.paragraphes ?? []);
  const medias = (doc.blocs ?? []).flatMap(b => b.medias ?? []);
  const videos = medias.filter(m => m.videoUrl);
  const images = medias.filter(m => m.image);

  /** « video:* » = toutes les vidéos ; « image:0 » = la première image. */
  const choisir = ref => {
    const [genre, quoi] = ref.split(":");
    const pile = genre === "video" ? videos : images;
    return quoi === "*" ? pile : [pile[Number(quoi)]].filter(Boolean);
  };

  const blocs = plan.blocs.map(b => ({
    _type: "bloc", _key: cle(),
    surTitre: b.surTitre,
    titre: b.titre,
    paragraphes: b.paras.map(i => paras[i]).filter(Boolean),
    medias: b.medias.flatMap(choisir),
  }));

  /* ⚠️ Les paragraphes non repris sont signalés, pas jetés en silence : un
     texte qui disparaît sans que personne ne le voie est la pire perte. */
  const repris = new Set(plan.blocs.flatMap(b => b.paras));
  const oublies = paras.map((_, i) => i).filter(i => !repris.has(i));

  const patch = { blocs };
  /* ⛔ Le titre ne se retouche que sur décision écrite. Un seul cas ici :
     « Koesio – Carte de vœux 2023 », dont l'année devait sortir du titre —
     la page dérive vers les recherches de l'année en cours et perd la
     famille « carte de vœux vidéo ». */
  if (plan.titre) patch.titre = plan.titre;
  if (plan.projets) {
    patch.projets = {
      surTitre: "Des projets du même type",
      titre: plan.projets.titre,
      paragraphes: plan.projets.paras.map(para),
      boutonLibelle: plan.projets.boutonLibelle,
      boutonLien: plan.projets.boutonLien,
    };
  }
  await client.patch(doc._id).set(patch).commit();
  console.log(
    `✅ ${slug} : ${blocs.length} bloc(s), ${blocs.reduce((n, b) => n + b.medias.length, 0)} média(s)` +
    `${plan.projets ? ", + bloc projets" : ""}` +
    `${oublies.length ? `  ⚠️ ${oublies.length} § non repris (${oublies.join(",")})` : ""}`
  );
}
console.log(`\n⭐ ${Object.keys(PLANS).length} actualités éditorialisées.`);
