/**
 * LA PAGE AFTERMOVIE : TROIS VIDÉOS RESTÉES SUR VIMEO, ET DEUX PROJETS HORS SUJET.
 * Retours de Giz du 20/08/2026, page `aftermovie-captation-evenementielle`.
 *
 * ⛔ TROIS VIMEO ÉTAIENT PASSÉES ENTRE LES MAILLES. La bascule Vimeo → Livid
 * avait été faite sur les ACTUALITÉS et sur les RÉALISATIONS, jamais sur les
 * vidéos rattachées aux pages de savoir-faire — un troisième endroit où vivent
 * des adresses de vidéos, que personne n'avait listé.
 * 👉 Ce script traite la page aftermovie ; les huit autres pages sont vérifiées
 * à la fin, et ce qui reste sur Vimeo est affiché, pas corrigé en silence.
 *
 * ⚠️ AUCUNE DES QUATRE VIDÉOS N'AVAIT D'AFFICHE — pas même celle déjà en Livid.
 * Sans affiche, le lecteur sort son dégradé bleu : c'est le « miniature toute
 * bleue » signalé sur la page mapping. Le même trou, au même endroit.
 *
 * ⛔ LES DEUX PROJETS ÉCARTÉS SONT NOS PROPRES FILMS D'AUTOPROMOTION
 * (« Bluevista Creative — une vraie équipe » #1 et #3). Ce ne sont pas des
 * aftermovies, et ce ne sont pas des commandes clientes : ils occupaient deux
 * places sur six dans une vitrine censée montrer du travail pour d'autres.
 * Le tri automatique les avait remontés parce qu'ils cochent les critères
 * mécaniques (vidéo + client distinct) — il ne sait pas lire un sujet.
 * 👉 On épingle donc les six à la main, et six clients différents.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const PAGE = "page-savoir-faire-aftermovie-captation-evenementielle";

/**
 * LA CORRESPONDANCE, RETROUVÉE PAR LE TITRE EXACT DANS LE CATALOGUE LIVID.
 * Les trois titres sont identiques des deux côtés, au caractère près — aucune
 * approximation, aucun rapprochement « qui ressemble ».
 */
const BASCULE = {
  "https://vimeo.com/608958203/6db6410235": { slug: "Dfq8bDDycykX", titre: "Festival de K After Movie" },
  "https://vimeo.com/743077571/58a2a79036": { slug: "HWwhBx9-fFlP", titre: "CWT | Valrhona 100ans" },
  "https://vimeo.com/743078668/08ca74c552": { slug: "mRUqJosItxmb", titre: "LUDICO - Crouzet 100ans" },
};

/** Les six projets, épinglés dans cet ordre. Six clients, six sujets. */
const PROJETS = [
  "koesio-convention-2024",                       // convention d'entreprise
  "guitare-en-scene-edition-2024-video-evenement", // ⭐ remplace « une vraie équipe #3 »
  "e-xpert-solutions-aftermovie-ecd-2022",        // aftermovie de congrès
  "irisolaris-aftermovie-irisdays-2024",          // aftermovie de convention
  "convention-huawei-video-event",                // ⭐ remplace « une vraie équipe #1 »
  "clip-report-event-massy-grand-ouest",          // captation de soirée
];

/* ── Les affiches : oEmbed puis téléversement ─────────────────────────────
   ⚠️ Jamais un lien vers l'API de Livid dans une page publique : le jour où
   le prestataire change son format d'URL, l'image disparaît sans prévenir. */
const cache = new Map();
async function affiche(slug) {
  if (cache.has(slug)) return cache.get(slug);
  let ref = null;
  try {
    const o = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`);
    const j = await o.json();
    if (j.thumbnail_url) {
      const img = await fetch(j.thumbnail_url);
      if (img.ok) {
        const a = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), {
          filename: `affiche-${slug}.jpg`,
        });
        ref = { _type: "image", asset: { _type: "reference", _ref: a._id } };
      }
    }
  } catch (e) {
    console.log(`   ⚠️  affiche indisponible pour ${slug} : ${e.message}`);
  }
  cache.set(slug, ref);
  return ref;
}

const slugDe = url => url.match(/livid\.com\/watch\/([\w-]+)/)?.[1] ?? null;

/* ── La page aftermovie ───────────────────────────────────────────────────── */
const doc = await client.fetch(`*[_id==$id][0]{_id, videos, blocs}`, { id: PAGE });
if (!doc) throw new Error("page aftermovie introuvable");

/* 1. Le champ `videos` de la page : la liste de référence. */
const videos = [];
for (const v of doc.videos ?? []) {
  const cible = BASCULE[v.url];
  videos.push(cible ? { ...v, url: `https://livid.com/watch/${cible.slug}` } : v);
}

/* 2. Les blocs : c'est CE champ-là qui est affiché. Les deux doivent bouger
      ensemble, sinon la page montre encore Vimeo pendant que l'inventaire dit
      Livid — exactement le genre d'écart qu'on ne voit qu'à l'écran. */
let basculees = 0, posees = 0;
const blocs = [];
for (const b of doc.blocs ?? []) {
  if (!b.videoUrl) { blocs.push(b); continue; }
  const cible = BASCULE[b.videoUrl];
  const url = cible ? `https://livid.com/watch/${cible.slug}` : b.videoUrl;
  if (cible) basculees++;
  const s = slugDe(url);
  let aff = b.videoAffiche;
  if (!aff && s) { aff = await affiche(s); if (aff) posees++; }
  blocs.push({ ...b, videoUrl: url, ...(aff ? { videoAffiche: aff } : {}) });
}

await client.patch(PAGE).set({ videos, blocs, projetsChoisis: PROJETS }).commit();
console.log(`✅ aftermovie : ${basculees} vidéos passées de Vimeo à Livid, ${posees} affiches posées, 6 projets épinglés.`);

/* ── ET LES HUIT AUTRES PAGES ? ───────────────────────────────────────────
   Si trois Vimeo dormaient ici, rien ne dit qu'il n'y en a pas ailleurs. On
   REGARDE, et on affiche — on ne corrige pas à l'aveugle une page que Giz
   n'a pas encore relue. */
console.log(`\n── Contrôle des autres pages ─────────────────────────────`);
const autres = await client.fetch(
  `*[_type=="page" && _id != $id]{"s":slug.current, videos[]{titre,url},
     blocs[defined(videoUrl)]{titre, videoUrl, "aff": defined(videoAffiche)}}`,
  { id: PAGE }
);
let vimeo = 0, sansAffiche = 0;
for (const p of autres) {
  for (const v of p.videos ?? []) if (v.url?.includes("vimeo")) { console.log(`⛔ VIMEO   ${p.s} · liste · ${v.titre}`); vimeo++; }
  for (const b of p.blocs ?? []) {
    if (b.videoUrl.includes("vimeo")) { console.log(`⛔ VIMEO   ${p.s} · bloc « ${b.titre} »`); vimeo++; }
    if (!b.aff) { console.log(`⚠️ SANS AFFICHE  ${p.s} · bloc « ${b.titre} »`); sansAffiche++; }
  }
}
if (!vimeo) console.log(`✅ plus aucune vidéo Vimeo sur les autres pages.`);
if (!sansAffiche) console.log(`✅ toutes les vidéos des autres pages ont leur affiche.`);
