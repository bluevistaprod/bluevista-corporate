/**
 * PAGE DRONE — RETOURS DE GIZ DU 20/08/2026.
 *
 * BLOC 01 — l'image ne montrait pas le chantier TETRO dont parle le texte.
 *   ⭐ Et il y a mieux qu'une image : le show de drones de Carré Sénart EST sur
 *   Livid, et le paragraphe le nomme déjà. On remplace l'image par le film.
 *
 * BLOC 04 — la photogrammétrie disparaît. ⛔ ON N'EN FAIT PAS. Le bloc décrivait
 *   une prestation que Bluevista ne vend pas, avec un vocabulaire technique
 *   crédible — c'est le pire cas de figure : personne ne l'aurait relevé avant
 *   qu'un client la commande. Le survol du parc Eole reste, mais pour ce qu'il
 *   est vraiment : un film de bâtiment.
 *
 * PROJETS — ⛔ LES DEUX ELISTAIR SORTENT. Ce sont des films PRODUIT sur un
 *   drone, pas des films TOURNÉS au drone : le drone y est le sujet, pas
 *   l'outil. Ils étaient pourtant rangés en `produit: drone`, ce qui montre
 *   que ce champ décrit tantôt le sujet, tantôt le moyen.
 *   ⭐ Les six retenus le sont sur PREUVE ÉCRITE : chacun dit noir sur blanc
 *   « plans au drone », « drone fpv » ou « prises de vue en drone » dans sa
 *   propre fiche. Aucun retenu parce que le sujet s'y prêtait.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ID = "page-savoir-faire-video-aerienne-drone";
const SENART = "https://livid.com/watch/yIP7H3BZbZuJ";

let n = 0;
const para = t => ({
  _type: "block", _key: `d${++n}`, style: "normal", markDefs: [],
  children: [{ _type: "span", _key: `ds${n}`, text: t, marks: [] }],
});

async function affiche(slug) {
  const o = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`).then(r => r.json());
  if (!o.thumbnail_url) return null;
  const img = await fetch(o.thumbnail_url);
  if (!img.ok) return null;
  const a = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), { filename: `affiche-${slug}.jpg` });
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
}

/**
 * LES SIX RÉFÉRENCES, ET LA PHRASE QUI LES JUSTIFIE.
 * ⚠️ Quatre clients pour six films : c'est TOUT ce que le catalogue prouve.
 * Compléter avec un septième « qui ferait bien » serait recommencer l'erreur
 * qu'on vient de corriger.
 */
const PROJETS = [
  "tetro-carre-senart-show-drone",          // le titre lui-même
  "irisolaris-presentation-groupe-2024",    // « tournés avec des caméras et drone fpv »
  "sfs-enveloppe-structure",                // « des plans au drone »
  "serl-parc-puy-d-or-video-360-vr",        // « nos prises de vue en Drone »
  "clip-report-event-massy-grand-ouest",    // « avec nos caméras et drone »
  "sfs-ligne-de-vie",                       // « des plans au drone »
];

const doc = await client.fetch(`*[_id==$i][0]{blocs, videos}`, { i: ID });
const affSenart = await affiche("yIP7H3BZbZuJ");

const blocs = doc.blocs.map(b => {
  /* ── BLOC 01 : l'image s'efface devant le film qu'elle prétendait montrer ── */
  if (b.titre === "Le matériel, et pourquoi il est doublé") {
    const { image, ...reste } = b;
    return {
      ...reste,
      videoUrl: SENART,
      videoTitre: "TETRO – Carré Sénart, show de drones",
      ...(affSenart ? { videoAffiche: affSenart } : {}),
    };
  }

  /* ── BLOC 04 : le film de bâtiment remplace la photogrammétrie ─────────── */
  if (b.titre === "La photogrammétrie, quand il faut plus qu’une belle image") {
    return {
      ...b,
      titre: "Filmer un bâtiment, un site, un chantier",
      paragraphes: [
        para("Pour C’PRO, le survol du parc Eole a servi à montrer le bâtiment lui-même : son implantation, son volume, la façon dont il s’inscrit dans ce qui l’entoure. Depuis le sol, ces trois choses ne se voient pas — on ne cadre qu’une façade à la fois."),
        para("C’est le cas le plus fréquent de nos vols : un siège social, une usine, un chantier en cours. Le drone donne le plan qui situe, celui par lequel un film d’entreprise commence presque toujours, et il permet de suivre l’avancement d’un chantier d’un mois sur l’autre depuis exactement le même point de vue."),
      ],
    };
  }

  return b;
});

/* La vidéo de Carré Sénart rejoint la liste de la page — c'est elle qui
   alimente le balisage VideoObject envoyé à Google. */
const videos = [...(doc.videos ?? [])];
if (!videos.some(v => v.url === SENART)) {
  videos.push({
    _key: "vsenart",
    titre: "TETRO – Carré Sénart, show de drones",
    url: SENART,
    ...(affSenart ? {} : {}),
  });
}

await client.patch(ID).set({ blocs, videos, projetsChoisis: PROJETS }).commit();
console.log("✅ Bloc 01 : l’image cède la place au film du show de Carré Sénart.");
console.log("✅ Bloc 04 : la photogrammétrie retirée, remplacée par le film de bâtiment (Eole conservé).");
console.log(`✅ ${PROJETS.length} références épinglées, les deux Elistair écartées.`);
