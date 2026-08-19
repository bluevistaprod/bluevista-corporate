/**
 * LES IMAGES D'EN-TÊTE DES PAGES DE SAVOIR-FAIRE.
 *
 * ⛔⛔ LES NEUF PAGES SORTAIENT AVEC UNE PHOTO DE BANQUE, et c'était écrit
 * trois semaines à l'avance dans `_images-provisoires.ts` :
 *   « Sur le site d'une agence de production, une photo de banque est une
 *     contradiction visible : on vend la fabrication d'images en montrant
 *     celles des autres. Le premier client qui reconnaît la photo a compris
 *     quelque chose qu'on ne voulait pas lui dire. »
 * Giz a reconnu la photo. L'avertissement était juste, et personne — moi
 * compris — n'était revenu le lever.
 * 👉 Une image « provisoire » ne se signale jamais d'elle-même. Ce qui la
 * retire, c'est une liste qu'on relit, pas une intention qu'on garde.
 *
 * ⛔ CHAQUE IMAGE EST OUVERTE ET REGARDÉE AVANT D'ÊTRE POSÉE. Sur ce lot,
 * trois candidates ont été écartées à l'œil : un carton-titre « Analyse des
 * causes » (aucune image), une saynète VR sur un tricycle (trop drôle pour un
 * haut de page qui vend), et une vue aérienne de chantier qui disait
 * « drone » sur une page qui ne parle pas de drone.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const HEROS = [
  ["motion-design", "image-f9394ce44ead245e004d3252fdd0eb25a3a209d3-2560x1440-png",
   "Le renard bluevista qui marche dans une ville illustrée — un dessin de la maison, pas une photo qui parlerait de dessin."],
  ["animation-3d", "image-df924a6c177dbdc8aa4c4a3b8ba932dc66ecbea3-1920x1080-png",
   "Le moulin à café SANTOS I-GRIND en rendu 3D, sur fond clair : un vrai produit d'un vrai client, entièrement calculé."],
  ["video-aerienne-drone", "image-c2e4617aaf5f5587b6e16fe4a98439ad1ee282d1-1920x1080-jpg",
   "Carré Sénart la nuit, vu du ciel : la façade en rose et les faisceaux qui partent dans le noir."],
  ["aftermovie-captation-evenementielle", "image-5e8abac9aa484d4863f02865e1ae46cb4a9f227a-1920x1080-png",
   "Un guitariste en plein saut sur scène, contre-jour et fumée — Guitare en Scène."],
];

for (const [slug, ref, vu] of HEROS) {
  const doc = await client.fetch(`*[_type=="page" && language=="fr" && slug.current==$s][0]{_id}`, { s: slug });
  if (!doc) { console.log(`⛔ ${slug} : absente`); continue; }
  await client.patch(doc._id).set({
    image: { _type: "image", asset: { _type: "reference", _ref: ref } },
  }).commit();
  console.log(`✅ ${slug}\n   ${vu}`);
}

console.log(`\n⚠️ Restent sans en-tête propre — aucune candidate n'a passé le regard :`);
console.log(`     live-streaming-webtv · creation-immersive-realite-virtuelle`);
console.log(`     video-corporate-film-dentreprise · studio-fond-vert-compositing`);
