/**
 * LA PHOTO DU PLATEAU FOND VERT, PRISE SUR LE CLOUD STORE.
 *
 * ⭐ PREMIÈRE IMAGE VENUE DU SERVEUR DE PRODUCTION plutôt que de l'ancien
 * site. Le Cloud Store est monté en SMB sur le Mac : 19 To, dont un dossier
 * « SITE WEB » qui contient 75 images à la racine et un sous-dossier
 * « Photos/COMPETENCES ».
 *
 * ⛔ ELLE A ÉTÉ OUVERTE ET REGARDÉE, pas choisie sur son nom. C'est la règle
 * qui manquait deux fois : la vignette « motion-renard » prise pour une photo
 * de STANN, et les deux vidéos « à renommer ». Un nom de fichier n'est pas une
 * preuve de contenu — `bluevista-oculus1.jpg` en est la démonstration
 * inverse : nom parfait, 433×298 pixels, inutilisable.
 *
 * Ce qu'elle montre : le cyclo vert monté, les barres de LED au plafond, la
 * caméra en place, une intervenante devant le fond et un client assis à côté.
 * 3273×2384. C'est le plateau, pas une image d'illustration.
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

const CHEMIN = "/Volumes/Bluevista Cloud Store/SITE WEB/Fond_Vert-1-Recadre.jpg";
const asset = await client.assets.upload("image", readFileSync(CHEMIN), {
  filename: "plateau-fond-vert-bluevista.jpg",
});
const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };

const doc = await client.fetch(
  `*[_type=="page" && language=="fr" && slug.current=="studio-fond-vert-compositing"][0]{_id, blocs}`
);
const blocs = (doc.blocs ?? []).map(b => (b._type === "blocEntree" ? { ...b, image } : b));
await client.patch(doc._id).set({ blocs }).commit();

console.log(`✅ photo du plateau posée sur studio-fond-vert-compositing`);
console.log(`   ${asset.metadata?.dimensions?.width}×${asset.metadata?.dimensions?.height} · ${Math.round((asset.size ?? 0) / 1024)} Ko`);
