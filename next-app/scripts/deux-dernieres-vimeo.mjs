/**
 * LES DEUX DERNIÈRES VIMEO DISPARAISSENT DU SITE — 20/08/2026.
 * Giz a renvoyé les deux films manquants sur Livid ; on les rattache.
 *
 * ⭐ LES DEUX SONT CERTAINES : titre donné par Giz, et durée identique au film
 * Vimeo d'origine (HDI 1:42, ICSI 1:30 pour un Vimeo de 1:30). Aucun
 * rapprochement au jugé.
 *
 * ⚠️ LES DEUX SONT ARRIVÉES EN « PRIVÉE » ET AVEC L'EMBED COUPÉ. C'est l'état
 * par défaut de tout envoi sur Livid — réglé avant d'écrire ici, sinon la page
 * afficherait un lecteur noir en jurant que la vidéo est bien là.
 *
 * ⭐ APRÈS CE SCRIPT, PLUS AUCUNE ADRESSE VIMEO DANS LE SITE.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const A_POSER = [
  { slug: "hdi-demenagement-nouvelle-tour", livid: "jU5IrGOoKULy", titre: "HDI - Déménagement Nouvelle Tour" },
  { slug: "icsi-briefing-debriefing-minute-d-arret", livid: "_m3qzWZUpo-G", titre: "ICSI - Briefing - SEQ03 - Bonnes Pratiques" },
];

for (const x of A_POSER) {
  /* ⛔ On vérifie l'embed AVANT d'écrire : une vidéo rattachée n'est pas une
     vidéo lisible, et c'est exactement l'erreur qui a coûté la page aftermovie. */
  const oe = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${x.livid}`).then(r => r.json());
  if (!oe.thumbnail_url) { console.log(`⛔ ${x.titre} : pas d'affiche renvoyée, on n'écrit rien.`); continue; }

  const img = await fetch(oe.thumbnail_url);
  const a = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), { filename: `affiche-${x.livid}.jpg` });

  const doc = await client.fetch(`*[_type=="realisation" && slug.current==$s][0]{_id}`, { s: x.slug });
  if (!doc) { console.log(`⛔ ${x.slug} introuvable`); continue; }

  await client.patch(doc._id).set({
    video: `https://livid.com/watch/${x.livid}`,
    image: { _type: "image", asset: { _type: "reference", _ref: a._id } },
  }).commit();
  console.log(`✅ ${x.titre} — vidéo Livid + affiche de son propre film.`);
}

/* ── Le contrôle qui clôt le sujet ───────────────────────────────────────── */
const tout = await client.fetch(`*[_type in ["page","realisation","actualite"]]`);
const restes = [...new Set(JSON.stringify(tout).match(/https?:\/\/(?:www\.)?vimeo\.com\/[\w\/]+/g) ?? [])];
console.log(restes.length
  ? `\n⛔ ${restes.length} adresse(s) Vimeo subsistent :\n   ${restes.join("\n   ")}`
  : `\n⭐ Plus aucune adresse Vimeo dans le site.`);
