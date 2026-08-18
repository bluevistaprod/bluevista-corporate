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
};

/* ── Application ──────────────────────────────────────────────────────── */
for (const [slug, plan] of Object.entries(PLANS)) {
  const doc = await client.fetch(`*[_id == $id][0]{_id, blocs}`, { id: `actualite-${slug}` });
  if (!doc) { console.log(`⛔ ${slug} : absent`); continue; }

  const source = doc.blocs?.[0] ?? {};
  const paras = source.paragraphes ?? [];
  const medias = source.medias ?? [];
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
