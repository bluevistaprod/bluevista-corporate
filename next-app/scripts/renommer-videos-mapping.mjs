/**
 * LES DEUX VIDÉOS « À RENOMMER » DE LA PAGE VIDÉO MAPPING.
 *
 * ⛔ « Vidéo mapping — vidéo 1 (à renommer) » est un nom d'inventaire, pas un
 * titre. Il a été posé quand les vidéos ont été rattachées en masse, faute de
 * savoir ce qu'elles montraient. Il s'affiche SOUS LE LECTEUR, donc il est lu
 * par le visiteur — et par Google, qui en fait le titre du balisage vidéo.
 *
 * ⭐ Le contenu réel a été vérifié sur Livid, pas déduit :
 *   · ZuGVSDFEUBhj → « bluevista | Showreel Mapping », 1 min 18
 *   · pCEDT43AUkMs → « TETRO - Inauguration InterContinental Lyon - Clip
 *     Report », 1 min 46
 * Les noms retenus ici ne sont pas ceux de Livid : un titre interne dit d'où
 * vient le fichier, un titre de page dit au visiteur ce qu'il va voir.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const NOMS = new Map([
  ["ZuGVSDFEUBhj", { titre: "Showreel mapping — façades, dômes et tables", duree: "1 min 18" }],
  ["pCEDT43AUkMs", { titre: "InterContinental Lyon — la soirée d’inauguration", duree: "1 min 46" }],
]);

const slugDe = url => url?.match(/livid\.com\/(?:watch|embed)\/([A-Za-z0-9_-]+)/)?.[1] ?? null;

const doc = await client.fetch(
  `*[_type=="page" && language=="fr" && slug.current=="video-mapping"][0]{_id, blocs, videos}`
);

let n = 0;
const blocs = (doc.blocs ?? []).map(b => {
  const nom = NOMS.get(slugDe(b.videoUrl));
  if (!nom) return b;
  n++;
  return { ...b, videoTitre: nom.titre };
});
const videos = (doc.videos ?? []).map(v => {
  const nom = NOMS.get(slugDe(v.url));
  return nom ? { ...v, titre: nom.titre } : v;
});

await client.patch(doc._id).set({ blocs, videos }).commit();
console.log(`✅ ${n} vidéo(s) renommée(s) dans les blocs, ${videos.length} titres remis à plat.`);
for (const [, v] of NOMS) console.log(`   « ${v.titre} »  ${v.duree}`);
