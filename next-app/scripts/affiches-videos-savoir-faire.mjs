/**
 * LES AFFICHES DES VIDÉOS DES PAGES DE SAVOIR-FAIRE.
 *
 * ⛔ LE SYMPTÔME, REPÉRÉ PAR GIZ : « les vidéos miniatures sont bleues ».
 * Sans affiche, le lecteur sort un dégradé de marque. C'était un choix
 * délibéré — un aplat noir avec un bouton se lit comme une page cassée — mais
 * ce n'était qu'un PIS-ALLER, et il est resté par défaut sur des pages où
 * l'affiche existait pourtant.
 *
 * ⭐ Livid la fournit en 1920×1080 par oEmbed. La même récupération a déjà
 * servi pour les 63 actualités : 68 affiches posées. Les pages de savoir-faire
 * étaient restées en arrière, personne ne les ayant regardées après coup.
 *
 * ⚠️ TÉLÉVERSÉE, pas pointée sur l'API de Livid : une adresse d'API tierce
 * dans une page publique est un lien qui casse le jour où le prestataire
 * change de format d'URL.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const cache = new Map();
async function affiche(slug) {
  if (cache.has(slug)) return cache.get(slug);
  let ref = null;
  try {
    const j = await (await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`)).json();
    if (j.thumbnail_url) {
      const img = await fetch(j.thumbnail_url);
      if (img.ok) {
        const asset = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), {
          filename: `affiche-${slug}.jpg`,
        });
        ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      }
    }
  } catch (e) { console.log(`   ⚠️  ${slug} : ${e.message}`); }
  cache.set(slug, ref);
  return ref;
}

const pages = await client.fetch(
  `*[_type=="page" && language=="fr" && defined(blocs)]{_id,"slug":slug.current,blocs}|order(slug asc)`
);

let posees = 0, sans = 0;
for (const p of pages) {
  let change = false;
  const blocs = [];
  for (const b of p.blocs ?? []) {
    const s = b.videoUrl?.match(/livid\.com\/(?:watch|embed)\/([A-Za-z0-9_-]+)/)?.[1];
    if (!s || b.videoAffiche) { blocs.push(b); continue; }
    const a = await affiche(s);
    if (!a) { sans++; blocs.push(b); continue; }
    blocs.push({ ...b, videoAffiche: a });
    change = true; posees++;
  }
  if (!change) continue;
  await client.patch(p._id).set({ blocs }).commit();
  console.log(`✅ ${p.slug}`);
}
console.log(`\n⭐ ${posees} affiche(s) posée(s).${sans ? `  ⚠️ ${sans} sans affiche disponible.` : ""}`);
