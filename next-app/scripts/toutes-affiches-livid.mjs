/**
 * TOUTES LES RÉALISATIONS PASSENT À L'AFFICHE DE LEUR PROPRE FILM.
 *
 * ⛔⛔ POURQUOI ON NE PEUT PAS SE CONTENTER DE CORRIGER LES CAS REPÉRÉS.
 * Le premier passage ne remplaçait que les images EMPRUNTÉES à une autre
 * fiche, détectées par leur nom de fichier. Puis Giz a vu une platine vinyle
 * sur le tutoriel de thermostat ENGIE — un fichier nommé
 * `engie-home-services-video-tuto-thermostat-migo.jpg` qui montrait autre
 * chose. L'import a renommé chaque image d'après sa fiche, quel que soit son
 * contenu : le nom ne prouve donc RIEN.
 * 👉 Sur les 70 fiches déclarées « correctes », impossible de savoir combien
 * mentent. Un contrôle qui ne peut pas répondre à sa propre question doit
 * être remplacé, pas raffiné.
 *
 * ⭐ L'AFFICHE D'UN FILM NE PEUT PAS SE TROMPER DE SUJET : elle est extraite
 * de la vidéo de la fiche. C'est le seul lien qui ne repose sur aucune
 * convention de nommage.
 *
 * ⚠️ CE QU'ON PERD, ET IL FAUT LE DIRE : quelques images choisies à la main
 * étaient peut-être meilleures que le premier plan du film. On échange une
 * qualité incertaine contre une justesse garantie — décision de Giz, prise en
 * connaissance de cause.
 *
 * ♻️ Les fiches sans film Livid sont laissées telles quelles et listées.
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

const fiches = await client.fetch(
  `*[_type=="realisation" && language=="fr"]{_id,"s":slug.current,video,"img":image.asset->originalFilename}|order(s asc)`
);

let posees = 0, deja = 0;
const sans = [];

for (const f of fiches) {
  const sl = slugLivid(f.video);
  if (!sl) { sans.push(f.s); continue; }
  /* Déjà passée au premier tour : son image porte le nom de l'affiche. */
  if (f.img === `${f.s}.jpg` && f.img) { /* on repasse quand même : le nom ne prouve rien */ }
  try {
    const j = await (await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${sl}`)).json();
    if (!j.thumbnail_url) { sans.push(`${f.s} (pas d'affiche)`); continue; }
    const im = await fetch(j.thumbnail_url);
    if (!im.ok) { sans.push(`${f.s} (affiche illisible)`); continue; }
    const asset = await client.assets.upload("image", Buffer.from(await im.arrayBuffer()), {
      filename: `affiche-${f.s}.jpg`,
    });
    await client.patch(f._id).set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
    posees++;
    if (posees % 20 === 0) console.log(`   … ${posees} affiches posées`);
  } catch (e) {
    sans.push(`${f.s} (${e.message})`);
  }
}

console.log(`\n⭐ ${posees} fiches portent désormais l'affiche de leur propre film.`);
if (sans.length) {
  console.log(`\n⚠️ ${sans.length} fiche(s) sans affiche Livid — image inchangée, à regarder à la main :`);
  for (const s of sans) console.log(`     ${s}`);
}
