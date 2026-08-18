/**
 * LES VIDÉOS DES ACTUALITÉS PASSENT DE VIMEO À LIVID.
 *
 * ⭐ LA CORRESPONDANCE N'EST PAS DEVINÉE ICI : elle a été établie ailleurs,
 * vidéo par vidéo, en appariant le titre ET la durée — 66 sur 66 retrouvées,
 * toutes avec l'intégration active. Ce script ne fait qu'appliquer le fichier.
 *
 * ⭐ ET IL POSE L'AFFICHE. Livid expose l'image d'ouverture de chaque film par
 * oEmbed, en 1920×1080. Sans elle, le lecteur sort un dégradé de marque :
 * lisible, mais muet. Avec elle, on voit le film avant de cliquer — ce qui,
 * sur une page qui vend de l'image, n'est pas un détail.
 *
 * ⚠️ L'AFFICHE EST TÉLÉVERSÉE, pas pointée sur Livid. Une adresse d'API tierce
 * dans une page publique, c'est un lien qui casse le jour où le prestataire
 * change de format d'URL — et personne ne le voit venir.
 *
 * ♻️ Rejouable : les images sont dédupliquées par Sanity sur leur empreinte,
 * et une vidéo déjà en Livid est laissée telle quelle.
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

const RACINE = new URL("../../", import.meta.url).pathname;

/* ⚠️ Le fichier a été rempli à la main dans une autre conversation : deux
   titres contiennent des guillemets, donc des champs entre quotes. Un
   `split(";")` naïf les couperait au milieu. */
function lireCsv(texte) {
  const lignes = [];
  for (const ligne of texte.trim().split("\n")) {
    const champs = [];
    let courant = "", dansQuotes = false;
    for (let i = 0; i < ligne.length; i++) {
      const c = ligne[i];
      if (c === '"') { dansQuotes = !dansQuotes; continue; }
      if (c === ";" && !dansQuotes) { champs.push(courant); courant = ""; continue; }
      courant += c;
    }
    champs.push(courant);
    lignes.push(champs);
  }
  const [entete, ...reste] = lignes;
  return reste.map(l => Object.fromEntries(entete.map((c, i) => [c, l[i] ?? ""])));
}

const TABLE = new Map();
for (const r of lireCsv(readFileSync(RACINE + "VIDEOS-ACTUALITES-A-BASCULER.csv", "utf8"))) {
  if (!r.identifiant_vimeo || !r.url_livid) continue;
  TABLE.set(r.identifiant_vimeo, {
    url: r.url_livid,
    slug: r.slug_livid,
    embed: r.embed_actif === "oui",
    duree: r.duree,
  });
}
console.log(`⭐ ${TABLE.size} correspondances lues.\n`);

/* ── Les affiches, récupérées par oEmbed puis téléversées ─────────────── */
const affiches = new Map();
async function affiche(slugLivid) {
  if (affiches.has(slugLivid)) return affiches.get(slugLivid);
  let ref = null;
  try {
    const o = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slugLivid}`);
    const j = await o.json();
    if (j.thumbnail_url) {
      const img = await fetch(j.thumbnail_url);
      if (img.ok) {
        const buf = Buffer.from(await img.arrayBuffer());
        const asset = await client.assets.upload("image", buf, { filename: `affiche-${slugLivid}.jpg` });
        ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      }
    }
  } catch (e) {
    console.log(`      ⚠️  affiche indisponible pour ${slugLivid} (${e.message})`);
  }
  affiches.set(slugLivid, ref);
  return ref;
}

/* ── Sauvegarde avant écriture ────────────────────────────────────────── */
const docs = await client.fetch(`*[_type == "actualite"]{_id, "slug": slug.current, blocs}`);
const { writeFileSync } = await import("node:fs");
writeFileSync(
  new URL("./_sauvegarde-actualites-avant-livid.json", import.meta.url).pathname,
  JSON.stringify(docs, null, 2)
);
console.log("💾 sauvegarde écrite avant toute modification.\n");

let basculees = 0, videosTouchees = 0, avecAffiche = 0;
const introuvables = new Set();

for (const d of docs) {
  let change = false;
  const blocs = [];
  for (const b of d.blocs ?? []) {
    const medias = [];
    for (const m of b.medias ?? []) {
      if (!m.videoUrl) { medias.push(m); continue; }
      const id = m.videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
      if (!id) { medias.push(m); continue; }
      const cible = TABLE.get(id);
      if (!cible) { introuvables.add(`${d.slug} → ${m.videoUrl}`); medias.push(m); continue; }
      const aff = m.videoAffiche ?? (await affiche(cible.slug));
      if (aff && !m.videoAffiche) avecAffiche++;
      medias.push({
        ...m,
        videoUrl: cible.url,
        ...(aff ? { videoAffiche: aff } : {}),
        /* La durée sous la légende : elle dit au lecteur ce qu'il engage. */
        ...(cible.duree && !m.sousLegende ? { sousLegende: `${cible.duree.replace(":", " min ")}` } : {}),
      });
      change = true; videosTouchees++;
    }
    blocs.push({ ...b, medias });
  }
  if (!change) continue;
  await client.patch(d._id).set({ blocs }).commit();
  basculees++;
  console.log(`✅ ${d.slug}`);
}

console.log(`\n⭐ ${videosTouchees} vidéos basculées sur Livid, dans ${basculees} actualités.`);
console.log(`⭐ ${avecAffiche} affiches récupérées et téléversées.`);
if (introuvables.size) {
  console.log(`\n⛔ ${introuvables.size} vidéo(s) sans correspondance — laissées sur Vimeo :`);
  for (const x of introuvables) console.log(`     ${x}`);
}
