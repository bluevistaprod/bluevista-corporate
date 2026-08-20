/**
 * LES RÉFÉRENCES DE LA PAGE FOND VERT — 20/08/2026.
 *
 * ⭐ CE QUE JE NE POUVAIS PAS SAVOIR, ET QUE GIZ A TRANCHÉ. J'avais écarté
 * C'PRO Vœux 2017 et Amplitude Vœux 2018 parce que leur image d'affiche ne
 * montre pas de fond vert — une salle de formation, un bureau. Giz connaît ces
 * films : ils en contiennent bien, ou plutôt son résultat à l'écran.
 * 👉 L'affiche montre le RÉSULTAT du compositing, pas le tournage. Juger un
 * fond vert sur l'image finale, c'est le chercher à l'endroit précis où il a
 * disparu — c'est tout le métier.
 *
 * ⛔⛔ ET JE CRÉE UNE RÉALISATION, CE QUI N'ARRIVE PAS TOUS LES JOURS.
 * Giz demande « un film BARPI ». Les cinq films BARPI existent sur Livid mais
 * AUCUN n'a de réalisation dans Sanity — or la grille de références ne sait
 * afficher que des réalisations. Il fallait donc soit refuser, soit en créer
 * une. Je la crée, et je le dis fort :
 *     ⚠️ le catalogue passe de 145 à 146 réalisations ;
 *     ⚠️ elle apparaîtra AUSSI dans /realisations/ et dans les filtres ;
 *     ⚠️ son texte est court et factuel — c'est un squelette, pas une fiche
 *        rédigée. À reprendre quand Giz passera aux réalisations.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const PAGE = "page-savoir-faire-studio-fond-vert-compositing";
if (await client.fetch(`*[_id=="drafts.${PAGE}"][0]._id`)) {
  console.log("⛔ Brouillon ouvert sur la page fond vert — rien écrit."); process.exit(0);
}

/* ── La réalisation BARPI ────────────────────────────────────────────────
   ⚠️ Vérifié avant d'écrire : visibilité publique, embed actif. */
const SLUG = "icsi-barpi-film-accident";
const LIVID = "TbGWMsxnk9KL";

let doc = await client.fetch(`*[_type=="realisation" && slug.current==$s][0]{_id}`, { s: SLUG });
if (doc) {
  console.log(`⚠️ ${SLUG} existe déjà — on ne la recrée pas.`);
} else {
  /* ⚠️ L'adresse d'affiche de Livid REDIRIGE vers son stockage : sans suivre
     la redirection, on téléverse une page d'erreur en guise d'image. */
  const oe = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${LIVID}`).then(r => r.json());
  const im = await fetch(oe.thumbnail_url, { redirect: "follow" });
  if (!im.ok) throw new Error(`affiche BARPI indisponible (HTTP ${im.status})`);
  const asset = await client.assets.upload("image", Buffer.from(await im.arrayBuffer()), {
    filename: "affiche-icsi-barpi-film-accident.jpg",
  });

  doc = await client.create({
    _type: "realisation",
    _id: `realisation-${SLUG}`,
    titre: "ICSI – BARPI - Film accident",
    slug: { _type: "slug", current: SLUG },
    client: "ICSI",
    /* ⚠️ `produit: fond-vert` par cohérence avec les deux films GF, qui sont
       eux aussi des films promotionnels rangés là parce qu'ils sont tournés
       sur fond vert. La nomenclature de ce champ reste à trancher. */
    produit: "fond-vert",
    video: `https://livid.com/watch/${LIVID}`,
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    intro: "Film de prévention réalisé pour l’ICSI à partir d’un accident industriel recensé par le BARPI, tourné sur fond vert et incrusté dans son décor.",
    /* ⛔ SANS `language`, LA FICHE EST INVISIBLE. La requête des références
       filtre sur `language == "fr"` : un document sans ce champ existe, est
       correct, et ne s'affiche simplement pas. La grille sortait quatre cases
       au lieu de cinq — aucune erreur, juste une absence. Oublié à la création,
       retrouvé en regardant la page.
       ⚠️ `metier` sert aux filtres de /realisations/ : même raison. */
    language: "fr",
    metier: "film",
    /* ⛔ Signale à Giz que la fiche est un squelette écrit par moi. */
    aRelire: true,
  });
  console.log(`✅ réalisation créée : ${doc._id}`);
}

/* ── Les cinq références ─────────────────────────────────────────────────── */
const REFS = [
  "gf-customer-services-video-promotionnelle-3d",  // « tournée en fond vert […] assemblés (compositing) »
  "gf-ds-family-video-corporate-3d-motion-design", // « nous avons tourné sur fond vert et incrusté »
  "c-pro-carte-de-voeux-video-2017",               // ⭐ confirmé par Giz
  "amplitude-carte-de-voeux-video-2018",           // ⭐ confirmé par Giz
  SLUG,                                            // ⭐ BARPI, demandé par Giz
];

/* ⛔ On vérifie que les cinq existent AVANT d'écrire : un slug absent ne fait
   pas d'erreur, il fait juste une case vide dans la grille — le genre de trou
   qu'on ne voit qu'en regardant la page. */
const trouvees = await client.fetch(`*[_type=="realisation" && slug.current in $s].slug.current`, { s: REFS });
const manquantes = REFS.filter(s => !trouvees.includes(s));
if (manquantes.length) {
  console.log(`⛔ slugs introuvables, rien n'est écrit : ${manquantes.join(", ")}`);
  process.exit(1);
}

await client.patch(PAGE).set({ projetsChoisis: REFS }).commit();
console.log(`✅ ${REFS.length} références épinglées sur la page fond vert.`);
console.log(`
⚠️ À SAVOIR : le catalogue passe à ${await client.fetch(`count(*[_type=="realisation"])`)} réalisations.
   La description de référencement de /realisations/ annonce encore « 145 » —
   elle est écrite en dur dans le code, je ne l'ai pas changée sans te demander.`);
