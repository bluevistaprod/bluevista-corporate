/**
 * LE SHOWREEL 2026 — réalisation + bouton de l'accueil. Demande de Giz, 21/08/2026.
 *
 * ⛔⛔ `client: "BLUEVISTA"` EST LE CHAMP QUI COMPTE, et Giz l'a demandé
 * explicitement : « qu'elle ne se mette pas en bas dans l'accueil ». La section
 * « ce qu'on a fait pour eux » prend les 4 dernières réalisations avec le
 * filtre `client != "BLUEVISTA"`. Sans cette valeur exacte — majuscules
 * comprises — notre propre bande démo passerait en tête d'une vitrine censée
 * montrer des projets clients. Les sept showreels précédents la portent tous.
 *
 * ⛔ `language: "fr"` EST L'AUTRE CHAMP QUI COMPTE. La requête de la galerie
 * filtre dessus. Une réalisation sans lui est un document parfaitement valide,
 * sans la moindre erreur, et parfaitement invisible — je m'y suis déjà fait
 * prendre cette semaine.
 *
 * ⚠️ `produit` EST LAISSÉ VIDE, VOLONTAIREMENT. Les sept showreels précédents
 * portent tous « mapping-architectural », ce qui est faux : ce champ sert de
 * FILTRE sur la page réalisations. Recopier la valeur ferait apparaître notre
 * bande démo à quelqu'un qui cherche du mapping architectural. Reprendre une
 * donnée héritée est une chose, en fabriquer une nouvelle qu'on sait fausse en
 * est une autre.
 * 📌 `metier` suit en revanche la série (« evenement », comme 2020→2025) : le
 * choix est arbitraire pour un showreel, mais l'incohérence le serait plus.
 *
 * ⭐ LA DURÉE EST CELLE DE LIVID : 105 secondes, soit 1 min 45. Pas « environ
 * 2 minutes ».
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const RACINE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad";

/* ⭐ L'affiche vient de la VIDÉO ELLE-MÊME (l'oembed de Livid), pas du
   `showreel-hero.mp4` qui traîne dans `public/media/` : celui-ci date du
   11 août, avant que ce film existe. Rien ne disait qu'il s'agissait du même
   montage. */
const affiche = await client.assets.upload(
  "image",
  readFileSync(`${RACINE}/showreel2026.jpg`),
  { filename: "bluevista-showreel-2026.jpg" }
);

let n = 0;
const cle = () => `s${++n}`;
const para = t => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: cle(), text: t, marks: [] }],
});

const SLUG = "bluevista-showreel-2026";

const doc = {
  _type: "realisation",
  _id: `realisation-${SLUG}`,
  titre: "bluevista | Showreel 2026",
  slug: { _type: "slug", current: SLUG },
  /* ⛔ Les deux champs décisifs — voir l'en-tête. */
  client: "BLUEVISTA",
  language: "fr",

  video: "https://livid.com/watch/YxYgFQH38gLW",
  image: { _type: "image", asset: { _type: "reference", _ref: affiche._id } },

  intro:
    "Une année de plus à créer ensemble, et de nouveaux terrains à explorer. Voici, en 1 minute 45, ce que nos équipes ont fabriqué cette année.",
  detail: [
    para(
      "Film d’entreprise, motion design, animation 3D, vidéo mapping, aftermovie, prise de vue par drone, tournage sur fond vert, réalité virtuelle, captation et diffusion en direct : le tout en 1 minute 45. Comme chaque année, toute l’équipe de Bluevista se réjouit de vous offrir le meilleur de ses savoir-faire."
    ),
    para("Bon visionnage de notre showreel 2026."),
  ],

  metier: "evenement",
  /* produit : volontairement absent — voir l'en-tête. */

  titreSeo: "Showreel 2026 — agence vidéo Bluevista | Bluevista",
  descriptionSeo:
    "Le showreel 2026 de Bluevista en 1 minute 45 : film d’entreprise, motion design, animation 3D, vidéo mapping, drone, fond vert, réalité virtuelle et captation en direct.",

  /* ⛔ Le texte est de moi et attend la relecture de Giz. */
  aRelire: true,
};

const existe = await client.fetch(`*[_id==$i][0]._id`, { i: doc._id });
await client.createOrReplace(doc);

/* ── LE CONTRÔLE QUI COMPTE ────────────────────────────────────────────────
   ⛔ On ne se contente pas de créer : on REJOUE la requête de l'accueil pour
   vérifier que le showreel n'y entre pas. C'est la demande explicite de Giz,
   et c'est le genre de chose qu'on croit acquise. */
const quatre = await client.fetch(
  `*[_type == "realisation" && language == "fr" && client != "BLUEVISTA" && defined(image)]
   | order(_createdAt desc)[0...4]{ "s": slug.current, client }`
);

console.log(`${existe ? "♻️ remplacée" : "✅ créée"} : /realisations/${SLUG}/`);
console.log(`   affiche ${affiche.metadata?.dimensions?.width}×${affiche.metadata?.dimensions?.height}, Livid YxYgFQH38gLW (1 min 45)`);
console.log(`\n   les 4 réalisations de l'accueil :`);
quatre.forEach(r => console.log(`     · ${r.s} — ${r.client}`));
const intrus = quatre.some(r => r.s === SLUG);
console.log(`\n   ${intrus ? "⛔ LE SHOWREEL EST DANS L'ACCUEIL" : "✅ le showreel n'est pas dans l'accueil"}`);
