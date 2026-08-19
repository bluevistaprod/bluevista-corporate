/**
 * SIX IMAGES D'OUVERTURE PRISES SUR LE CLOUD STORE.
 *
 * ⛔⛔ CHACUNE A ÉTÉ OUVERTE ET REGARDÉE, PAS CHOISIE SUR SON NOM — et cette
 * fois c'est démontré plutôt qu'affirmé, parce que trois noms mentaient :
 *   · `studio_tournage_lyon.jpg` → une cuisine de studio avec un extracteur
 *     de jus SANTOS. C'est un film PRODUIT, pas un film d'entreprise. Écartée.
 *   · `Capture_From_Showreel-1.png` → une « tiny planet » à 360°. Rien à voir
 *     avec le motion design auquel je la destinais : elle part en création
 *     immersive.
 *   · `bluevista-oculus1.jpg` → 433×298 pixels. Nom parfait, image
 *     inutilisable.
 * 👉 Trois noms de fichier sur quinze désignaient autre chose que leur
 * contenu. Un nom n'est pas une donnée, c'est une intention passée.
 *
 * ⚠️ Restent sans image d'ouverture : `video-mapping` et
 * `live-streaming-webtv`, qui en ont déjà une, tirée de leurs propres
 * sections.
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

const RACINE = "/Volumes/Bluevista Cloud Store/SITE WEB/";

/* [page, fichier, nom d'archive, ce que l'image montre — vérifié à l'œil] */
const CHOIX = [
  ["animation-3d", "Photos/COMPETENCES/Competence_3D.png", "animation-3d-photo-vers-3d.png",
   "Des caisses de transport photographiées à gauche, les mêmes en rendu 3D filaire à droite : le passage du réel au calculé, en une image."],
  ["motion-design", "Cisco-01.jpg", "motion-design-globe-anime.jpg",
   "Un globe dessiné en lignes animées sur un dégradé bleu — une image de motion design, pas une photo qui en parlerait."],
  ["video-corporate-film-dentreprise", "Photos/Accueil_Photo-1.jpg", "film-entreprise-equipe-en-tournage.jpg",
   "Deux opérateurs, une caméra sur pied, un changement d'objectif, dans les locaux d'un client. C'est le métier en train de se faire."],
  ["creation-immersive-realite-virtuelle", "Photos/COMPETENCES/Capture_From_Showreel-1.png", "immersion-tiny-planet-360.png",
   "Une « tiny planet » : la projection d'un tournage à 360° sur elle-même. Personne ne confond ça avec une photo ordinaire."],
  ["video-aerienne-drone", "Photos/COMPETENCES/DroneTETRO.jpg", "drone-place-urbaine-evenement.jpg",
   "Une place urbaine vue du ciel, un événement en cours d'installation : l'échelle et l'organisation, illisibles depuis le sol."],
  ["aftermovie-captation-evenementielle", "Aftermovie-1.jpg", "aftermovie-soiree-convention.jpg",
   "La soirée d'une convention Koesio — foule, ballons, lumières. Le même client que la première situation du bloc usages."],
];

for (const [slug, fichier, nom, quoi] of CHOIX) {
  const doc = await client.fetch(
    `*[_type=="page" && language=="fr" && slug.current==$s][0]{_id, blocs}`, { s: slug }
  );
  if (!doc) { console.log(`⛔ ${slug} : page absente`); continue; }
  if (!doc.blocs?.some(b => b._type === "blocEntree")) { console.log(`⛔ ${slug} : pas de bloc d'entrée`); continue; }

  const asset = await client.assets.upload("image", readFileSync(RACINE + fichier), { filename: nom });
  const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  const blocs = doc.blocs.map(b => (b._type === "blocEntree" ? { ...b, image } : b));
  await client.patch(doc._id).set({ blocs }).commit();

  const d = asset.metadata?.dimensions;
  console.log(`✅ ${slug}  ${d?.width}×${d?.height}`);
  console.log(`   ${quoi}`);
}
