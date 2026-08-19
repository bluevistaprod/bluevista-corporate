/**
 * L'IMAGE DE CHAQUE RÉALISATION, TIRÉE DE SA PROPRE VIDÉO.
 *
 * ⛔⛔ LE DÉFAUT QUE ÇA RÉPARE, ET IL EST ÉNORME.
 * Giz : « on parle de SGS alors qu'on montre une image american vintage ».
 * Mesuré : sur 145 fiches, 70 seulement portent une image à leur propre nom.
 * 64 en portent une EMPRUNTÉE à une autre fiche, et 11 n'en ont aucune. Une
 * seule image — `opiiec-motio-design-site-internet.jpg` — sert sur TREIZE
 * fiches différentes ; `koesio-convention-2024.jpg` sur onze.
 * 👉 Ce n'est pas une approximation, c'est une vignette qui ment sur le
 * projet qu'elle annonce, dans la grille de projets d'une page de vente.
 *
 * ⭐ LA SOURCE JUSTE ÉTAIT DÉJÀ LÀ : 137 des 145 réalisations ont leur film
 * sur Livid, et Livid publie l'image d'ouverture de chaque film en 1920×1080.
 * L'affiche d'une vidéo appartient PAR CONSTRUCTION au projet qu'elle montre :
 * aucune association à deviner, aucun risque de se tromper de client.
 *
 * ⚠️ ON NE TOUCHE PAS AUX 70 FICHES CORRECTES. Une image nommée d'après son
 * propre slug a été posée à sa place ; la remplacer par une image de film
 * serait un appauvrissement, pas une correction.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const slugLivid = u => u?.match(/livid\.com\/(?:watch|embed)\/([A-Za-z0-9_-]+)/)?.[1] ?? null;
const stem = f => (f ?? "").replace(/\.\w+$/, "");

const fiches = await client.fetch(
  `*[_type=="realisation" && language=="fr"]{_id,"s":slug.current,client,video,"img":image.asset->originalFilename}`
);

let posees = 0, sansLivid = [], sansAffiche = [];

for (const f of fiches) {
  /* ⭐ LE TEST QUI DÉSIGNE UNE IMAGE EMPRUNTÉE : son nom de fichier ne
     correspond pas au slug de la fiche qui la porte. Plus précis que
     « partagée » — il attrape aussi les emprunts uniques. */
  const correcte = f.img && stem(f.img) === f.s;
  if (correcte) continue;

  const sl = slugLivid(f.video);
  if (!sl) { sansLivid.push(f.s); continue; }

  try {
    const j = await (await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${sl}`)).json();
    if (!j.thumbnail_url) { sansAffiche.push(f.s); continue; }
    const img = await fetch(j.thumbnail_url);
    if (!img.ok) { sansAffiche.push(f.s); continue; }
    const asset = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), {
      filename: `${f.s}.jpg`,
    });
    await client.patch(f._id).set({
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    }).commit();
    posees++;
    console.log(`✅ ${f.s}${f.img ? `   (portait « ${f.img} »)` : "   (n'avait rien)"}`);
  } catch (e) {
    sansAffiche.push(f.s);
    console.log(`   ⚠️  ${f.s} : ${e.message}`);
  }
}

console.log(`\n⭐ ${posees} images remplacées par l'affiche du film de la fiche.`);
if (sansLivid.length) {
  console.log(`\n⚠️ ${sansLivid.length} fiche(s) sans vidéo Livid — image inchangée :`);
  for (const s of sansLivid) console.log(`     ${s}`);
}
if (sansAffiche.length) {
  console.log(`\n⚠️ ${sansAffiche.length} fiche(s) dont Livid ne donne pas d'affiche :`);
  for (const s of sansAffiche) console.log(`     ${s}`);
}
