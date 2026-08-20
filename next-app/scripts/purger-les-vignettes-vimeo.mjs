/**
 * LES DERNIÈRES MINIATURES VIMEO S'EN VONT — ET C'EST L'ERREUR QUE GIZ VOYAIT.
 *
 * ⛔⛔ J'AI ANNONCÉ « PLUS AUCUNE ADRESSE VIMEO DANS LE SITE » ET C'ÉTAIT FAUX.
 * Mon contrôle cherchait `vimeo.com/…`, c'est-à-dire les adresses de LECTURE.
 * Les miniatures vivent sur `i.vimeocdn.com` — un autre domaine, que le motif
 * ne pouvait pas attraper. Vingt-huit valeurs sont passées à travers.
 * 👉 Un contrôle ne prouve que ce qu'il cherche. « Aucun résultat » n'est une
 * bonne nouvelle que si la question était la bonne.
 *
 * ⛔ ONZE D'ENTRE ELLES SONT L'ERREUR QUE SANITY LUI AFFICHE :
 *     « The value of this property must be of type `image` … current value (string) »
 * Le champ `videoAffiche` est passé du type `url` au type `image` en cours de
 * route ; les anciennes valeurs sont restées des chaînes. Sanity refuse de les
 * afficher et propose « reset value » — ce que Giz faisait à la main, page
 * après page, en perdant l'affiche au passage.
 *
 * ⚠️ LES DIX-SEPT AUTRES (`videos[].vignetteUrl`) NE SONT PAS UNE ERREUR mais
 * comptent quand même : elles alimentent le balisage VideoObject envoyé à
 * Google, et une vidéo sans affiche est rejetée du balisage en entier. Elles
 * pointaient vers le CDN de Vimeo, qui mourra avec l'abonnement.
 *
 * ⭐ CE QU'ON POSE À LA PLACE : l'affiche Livid TÉLÉVERSÉE chez nous, et pour
 * `vignetteUrl` l'adresse Sanity de cette même image — absolue, stable, à nous.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const PROJET = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const JEU = process.env.NEXT_PUBLIC_SANITY_DATASET;

const estVieille = v => typeof v === "string" && /vimeocdn|vimeo\.com/.test(v);
const slugDe = u => String(u ?? "").match(/livid\.com\/watch\/([\w-]+)/)?.[1] ?? null;

/** Adresse publique et stable de l'image, telle que Sanity la sert. */
const adresse = ref =>
  `https://cdn.sanity.io/images/${PROJET}/${JEU}/` +
  ref.replace(/^image-/, "").replace(/-(jpg|png|webp)$/, ".$1");

const cache = new Map();
async function posterLivid(slug) {
  if (cache.has(slug)) return cache.get(slug);
  let r = null;
  try {
    const o = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`).then(x => x.json());
    if (o.thumbnail_url) {
      const img = await fetch(o.thumbnail_url);
      if (img.ok) {
        const a = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), { filename: `affiche-${slug}.jpg` });
        r = { ref: a._id, url: adresse(a._id) };
      }
    }
  } catch (e) { console.log(`      ⚠️ ${slug} : ${e.message}`); }
  cache.set(slug, r);
  return r;
}

const docs = await client.fetch(`*[_type=="page" && (
  count(blocs[defined(videoAffiche)]) > 0 || count(videos) > 0
)]{_id, "s":slug.current, blocs, videos}`);

let affiches = 0, vignettes = 0, orphelines = 0;

for (const d of docs) {
  let change = false;

  /* ── Les blocs : le champ image qui contient une chaîne ─────────────── */
  const blocs = [];
  for (const b of d.blocs ?? []) {
    if (!estVieille(b.videoAffiche)) { blocs.push(b); continue; }
    const s = slugDe(b.videoUrl);
    /* ⛔ Sans vidéo Livid en face, on ne devine pas : on RETIRE la chaîne
       fautive (elle n'affiche rien et bloque l'édition) et on le signale. */
    if (!s) {
      const { videoAffiche, ...reste } = b;
      blocs.push(reste); change = true; orphelines++;
      console.log(`   ⚠️ ${d.s} · « ${b.titre ?? "?"} » : chaîne retirée, aucune vidéo Livid pour reposer une affiche`);
      continue;
    }
    const p = await posterLivid(s);
    if (!p) { blocs.push(b); continue; }
    blocs.push({ ...b, videoAffiche: { _type: "image", asset: { _type: "reference", _ref: p.ref } } });
    change = true; affiches++;
  }

  /* ── La liste `videos` : une adresse, mais la nôtre ─────────────────── */
  const videos = [];
  for (const v of d.videos ?? []) {
    if (!estVieille(v.vignetteUrl)) { videos.push(v); continue; }
    const s = slugDe(v.url);
    if (!s) { const { vignetteUrl, ...reste } = v; videos.push(reste); change = true; orphelines++; continue; }
    const p = await posterLivid(s);
    if (!p) { videos.push(v); continue; }
    videos.push({ ...v, vignetteUrl: p.url });
    change = true; vignettes++;
  }

  if (!change) continue;
  await client.patch(d._id).set({ blocs, videos }).commit();
  console.log(`✅ ${d.s}`);
}

console.log(`\n⭐ ${affiches} affiches de bloc remises en vraie image (c'est l'erreur qui bloquait l'édition).`);
console.log(`⭐ ${vignettes} vignettes de balisage passées sur nos propres adresses.`);
if (orphelines) console.log(`⚠️ ${orphelines} valeur(s) retirées sans remplaçante — la vidéo n'est pas sur Livid.`);

/* ── Le contrôle, cette fois posé sur la bonne question ─────────────────── */
const tout = await client.fetch(`*[_type in ["page","realisation","actualite"]]`);
const restes = [...new Set(JSON.stringify(tout).match(/https?:\/\/[\w.-]*vimeo[\w.-]*\.com\/[^"\\]+/g) ?? [])];
console.log(restes.length
  ? `\n⛔ ${restes.length} adresse(s) Vimeo subsistent :\n   ${restes.slice(0, 12).join("\n   ")}`
  : `\n⭐ Plus rien de Vimeo dans le site — ni lecture, ni miniature.`);
