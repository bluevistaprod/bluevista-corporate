/**
 * BASCULER LES VIDÉOS DE VIMEO VERS LIVID — 12/08/2026, feu vert de Giz.
 *
 * La correspondance vient de `INVENTAIRE-VIDEOS-LIVID.csv`, construit dans une
 * autre conversation : 197 des 212 vidéos du site ont leur équivalent Livid,
 * et l'intégration y est désormais activée sur toutes.
 *
 * ⭐ COMMENT LA CORRESPONDANCE A ÉTÉ ÉTABLIE, et pourquoi on peut s'y fier :
 * sur le TITRE NORMALISÉ **et la DURÉE À LA SECONDE**, jamais le titre seul.
 * C'est la durée qui sauve : il existe deux « ABB - AF Contactor » dans Livid,
 * 144 s et 141 s, qui correspondent à deux vidéos différentes du site. Sur le
 * titre seul, une correspondance sur deux aurait été fausse.
 *
 * ⛔⛔ CE QU'AUCUN TEST TECHNIQUE NE VOIT, ET QU'IL FAUT SAVOIR : une vidéo
 * dont l'intégration est désactivée dans Livid répond quand même 200 sur son
 * adresse d'intégration. Le refus est décidé par le lecteur une fois chargé.
 * 👉 On ne peut donc PAS vérifier l'état d'une intégration par une requête.
 * La colonne `livid_embed_actif` de l'inventaire fait foi, parce qu'elle vient
 * de Livid lui-même. Même motif que le HTTP 200 au corps incomplet de Vimeo :
 * un code de retour ne dit pas l'état d'une ressource.
 *
 * ⚠️ CE QUI RESTE EN VIMEO APRÈS CE PASSAGE : les 5 vidéos YouTube (hors
 * périmètre) et les 10 supprimées sur Vimeo, dont le titre est perdu et qui
 * n'ont donc pas pu être rapprochées. Ces pages-là sont déjà cassées
 * aujourd'hui sur le site en ligne.
 *
 * ⚠️ L'IMAGE D'AFFICHE RESTE CELLE DE VIMEO. L'inventaire ne porte pas de
 * miniature Livid. Elle continuera de s'afficher tant que Vimeo vit, et
 * mourra avec lui. À reprendre quand Livid exposera ses miniatures.
 *
 * Usage :  node scripts/basculer-videos-sur-livid.mjs [--pour-de-vrai]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");
const CSV = process.argv.find(a => a.endsWith(".csv"))
  ?? "/Users/giz/Downloads/kjqdshfqs/INVENTAIRE-VIDEOS-LIVID.csv";

const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8")
    .split("\n").filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03`;

const groq = async (q) => {
  const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  u.searchParams.set("query", q);
  const j = await (await fetch(u, { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } })).json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

/* ── La table de correspondance ─────────────────────────────────────────── */
const lignes = fs.readFileSync(CSV, "utf8").split("\n").filter(Boolean).map(l => l.split(";"));
const entete = lignes.shift();
const col = Object.fromEntries(entete.map((c, i) => [c.trim(), i]));
const versLivid = new Map();
for (const l of lignes) {
  const id = (l[col.identifiant] ?? "").trim();
  const url = (l[col.URL_LIVID] ?? "").trim();
  const embed = (l[col.livid_embed_actif] ?? "").trim();
  if (id && url) versLivid.set(id, { url, embed, titre: (l[col.livid_titre] ?? "").trim() });
}
console.log(`\n${versLivid.size} correspondances lues dans ${path.basename(CSV)}`);
const sansEmbed = [...versLivid.values()].filter(v => v.embed !== "oui").length;
if (sansEmbed) console.log(`⛔ ${sansEmbed} ont encore l'intégration coupée — elles ne seront PAS posées.`);

/** L'identifiant Vimeo contenu dans une adresse, jeton compris ou non. */
const idDe = (u) => (u ?? "").match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];

/* ── Ce qu'il y a à basculer ────────────────────────────────────────────── */
const reals = await groq('*[_type=="realisation" && defined(video)]{_id,titre,video}');
const pages = await groq('*[_type=="page" && count(videos)>0]{_id,titre,"slug":slug.current,videos}');

const mutations = [];
const bilan = { realisations: 0, videosDePage: 0, deja: 0, sansCorrespondance: [], embedCoupe: [] };

for (const r of reals) {
  const id = idDe(r.video);
  if (r.video?.includes("livid.com")) { bilan.deja++; continue; }
  const m = id && versLivid.get(id);
  if (!m) { bilan.sansCorrespondance.push(`réalisation « ${r.titre} »`); continue; }
  if (m.embed !== "oui") { bilan.embedCoupe.push(`réalisation « ${r.titre} »`); continue; }
  mutations.push({ patch: { id: r._id, set: { video: m.url } } });
  bilan.realisations++;
}

for (const p of pages) {
  let touche = false;
  const videos = p.videos.map(v => {
    if (v.url?.includes("livid.com")) { bilan.deja++; return v; }
    const id = idDe(v.url);
    const m = id && versLivid.get(id);
    if (!m) { bilan.sansCorrespondance.push(`${p.slug} — « ${v.titre} »`); return v; }
    if (m.embed !== "oui") { bilan.embedCoupe.push(`${p.slug} — « ${v.titre} »`); return v; }
    touche = true; bilan.videosDePage++;
    /* ⚠️ On garde `vignetteUrl` : c'est la miniature Vimeo, seule affiche
       disponible aujourd'hui. Elle mourra avec Vimeo — à reprendre. */
    return { ...v, url: m.url };
  });
  if (touche) mutations.push({ patch: { id: p._id, set: { videos } } });
}

console.log(`\n${bilan.realisations} réalisations et ${bilan.videosDePage} vidéos de page à basculer.`);
if (bilan.deja) console.log(`   ${bilan.deja} déjà sur Livid.`);
if (bilan.embedCoupe.length) {
  console.log(`\n⛔ ${bilan.embedCoupe.length} laissées sur Vimeo — intégration encore coupée dans Livid :`);
  for (const x of bilan.embedCoupe.slice(0, 10)) console.log(`     ${x}`);
}
if (bilan.sansCorrespondance.length) {
  console.log(`\n⚠️ ${bilan.sansCorrespondance.length} sans équivalent Livid — laissées sur Vimeo :`);
  for (const x of bilan.sansCorrespondance.slice(0, 12)) console.log(`     ${x}`);
}

if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const sauvegarde = path.join(RACINE, "scripts/_sauvegarde-videos-avant-livid.json");
fs.writeFileSync(sauvegarde, JSON.stringify({ reals, pages }, null, 2));
console.log(`\n🛟 Sauvegarde des adresses Vimeo : ${path.relative(RACINE, sauvegarde)}`);

for (let i = 0; i < mutations.length; i += 40) {
  const lot = mutations.slice(i, i + 40);
  const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
    body: JSON.stringify({ mutations: lot }),
  });
  const j = await r.json();
  if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }
}

/* ⛔ LE CONTRÔLE VIENT D'AILLEURS QUE L'ÉCRITURE : on recompte dans Sanity. */
const restantVimeo = await groq('count(*[_type=="realisation" && video match "*vimeo*"])');
const surLivid = await groq('count(*[_type=="realisation" && video match "*livid*"])');
const pagesLivid = await groq('*[_type=="page" && count(videos)>0]{"slug":slug.current,"livid":count(videos[url match "*livid*"]),"vimeo":count(videos[url match "*vimeo*"])}|order(slug asc)');
console.log(`\n✅ réalisations : ${surLivid} sur Livid, ${restantVimeo} encore sur Vimeo.`);
for (const p of pagesLivid) console.log(`   ${p.slug.padEnd(40)} ${p.livid} Livid / ${p.vimeo} Vimeo`);
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
