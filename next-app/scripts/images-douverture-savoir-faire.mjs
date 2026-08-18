/**
 * L'IMAGE D'OUVERTURE DES NEUF PAGES DE SAVOIR-FAIRE — 18/08/2026.
 *
 * ⛔ LE CONSTAT DE GIZ : « la section d'entrée manque d'image… on a de belles
 * images, agrémente un peu non ? ». Le bloc d'entrée était le seul de la page
 * à n'être que du texte, juste après un en-tête lui-même textuel.
 *
 * ⭐ ET LES IMAGES ÉTAIENT DÉJÀ LÀ. Elles dormaient dans les `sections` de
 * l'ancien gabarit : sur `video-mapping`, trois sections portaient une photo
 * et une seule était passée dans les blocs — les deux autres avaient cédé la
 * place à une vidéo. Rien à téléverser, rien à produire : de la matière déjà
 * dans le document, simplement plus affichée.
 *
 * ⚠️ ON NE PREND QUE DES IMAGES QUI RESTENT INUTILISÉES. Reprendre celle d'un
 * bloc qui l'affiche déjà ferait doublon dans la même page — le lecteur y
 * verrait une erreur, pas une intention.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const pages = await client.fetch(
  `*[_type=="page" && language=="fr" && genre=="savoir-faire"]{_id,"slug":slug.current,sections,blocs}|order(slug asc)`
);

const empreinte = i => i?.asset?._ref ?? null;
let posees = 0;
const sans = [];

for (const p of pages) {
  const blocs = p.blocs ?? [];
  const entree = blocs.find(b => b._type === "blocEntree");
  if (!entree) { console.log(`⛔ ${p.slug} : pas de bloc d'entrée`); continue; }
  if (entree.image) { console.log(`↷  ${p.slug} : en a déjà une`); continue; }

  /* Les images déjà visibles quelque part dans la page. */
  const prises = new Set(blocs.flatMap(b => [empreinte(b.image), ...(b.galerie ?? []).map(empreinte)]).filter(Boolean));
  const libre = (p.sections ?? []).map(s => s.image).find(i => empreinte(i) && !prises.has(empreinte(i)));

  if (!libre) { sans.push(p.slug); console.log(`⚠️  ${p.slug} : aucune image disponible`); continue; }

  const neufs = blocs.map(b => (b._type === "blocEntree" ? { ...b, image: libre } : b));
  await client.patch(p._id).set({ blocs: neufs }).commit();
  posees++;
  console.log(`✅ ${p.slug}`);
}

console.log(`\n⭐ ${posees} image(s) d'ouverture posée(s).`);
if (sans.length) {
  console.log(`\n⚠️ ${sans.length} page(s) sans image disponible — leur bloc d'entrée reste en texte seul :`);
  for (const s of sans) console.log(`     ${s}`);
  console.log(`   Il leur faut une photo, elle ne peut pas venir d'ailleurs.`);
}
