/**
 * TOUTES LES VIDÉOS LIVID DU SITE PEUVENT-ELLES SEULEMENT ÊTRE LUES ?
 *
 * ⛔⛔ CE CONTRÔLE EXISTE PARCE QU'IL A MANQUÉ. En basculant trois vidéos de la
 * page aftermovie sur Livid, j'ai découvert que leur embed était COUPÉ : le
 * film s'affiche dans le catalogue, l'affiche se récupère normalement, l'audit
 * Sanity dit « vidéo présente » — et le lecteur reste noir sur le site.
 * 👉 Une vidéo rattachée n'est pas une vidéo lisible. C'est la même leçon que
 * « un champ rempli n'est pas un champ affiché », d'un cran plus bas.
 *
 * ⚠️ TOUTE VIDÉO NOUVELLEMENT ENVOYÉE SUR LIVID ARRIVE AVEC L'EMBED COUPÉ.
 * Ce n'est donc pas un incident isolé : c'est l'état par défaut. Le contrôle
 * est à relancer avant chaque mise en ligne, et surtout avant le 4 septembre.
 *
 * ♻️ Rejouable. Sans argument, il LIT et n'écrit rien.
 *    node scripts/audit-embed-livid.mjs            → liste ce qui ne jouera pas
 *    node scripts/audit-embed-livid.mjs --corriger → réactive l'embed
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const CORRIGER = process.argv.includes("--corriger");

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

/* ── L'accès à Livid : le même cookie de session que le serveur MCP ──────── */
const COOKIE = JSON.parse(readFileSync(`${homedir()}/.mcp-secrets.json`, "utf8")).LIVID_COOKIE;
if (!COOKIE) throw new Error("LIVID_COOKIE absent de ~/.mcp-secrets.json");

async function livid(method, path, body) {
  const res = await fetch("https://api.livid.com" + path, {
    method,
    headers: {
      Accept: "application/json, text/plain, */*",
      Origin: "https://livid.com",
      Referer: "https://livid.com/",
      Cookie: COOKIE,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401 || res.status === 403) throw new Error("session Livid expirée — relancer le cookie");
  const t = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} ${t.slice(0, 120)}`);
  return t ? JSON.parse(t) : {};
}

/* ── Où vivent les adresses de vidéos : QUATRE endroits, pas un ───────────
   C'est précisément parce que je n'en connaissais que trois que les Vimeo de
   la page aftermovie avaient survécu à la bascule.

   ⛔ L'AFFICHE SE TESTE SUR SA FORME, PAS SUR SA PRÉSENCE : `defined(videoAffiche)`
   répond OUI à une chaîne héritée de Vimeo comme à une vraie image — le contrôle
   validait donc exactement les valeurs qu'il devait attraper, et deux lecteurs
   noirs sont passés. D'où `defined(videoAffiche.asset._ref)`.
   ⚠️ Et aucun commentaire de bloc à l'intérieur d'une requête GROQ : elle ne
   compile plus. Les explications restent ici, dehors. */
const emplacements = await sanity.fetch(`{
  "realisations": *[_type=="realisation" && defined(video)]{"ou":"réalisation", "quoi":titre, "url":video},
  "pagesListe":   *[_type=="page"]{"s":slug.current, videos[]{titre,url}},
  "pagesBlocs":   *[_type=="page"]{"s":slug.current, blocs[defined(videoUrl)]{titre, videoUrl, "affiche": defined(videoAffiche.asset._ref)}},
  "actualites":   *[_type=="actualite"]{"s":slug.current, blocs[]{medias[defined(videoUrl)]{videoUrl}}}
}`);

/** slug Livid → liste des endroits qui s'en servent */
const usages = new Map();
const noter = (url, ou) => {
  const s = String(url ?? "").match(/livid\.com\/watch\/([\w-]+)/)?.[1];
  if (!s) return;
  if (!usages.has(s)) usages.set(s, []);
  usages.get(s).push(ou);
};

for (const r of emplacements.realisations) noter(r.url, `réalisation · ${r.quoi}`);
for (const p of emplacements.pagesListe) for (const v of p.videos ?? []) noter(v.url, `page ${p.s} · liste`);
for (const p of emplacements.pagesBlocs) for (const b of p.blocs ?? []) noter(b.videoUrl, `page ${p.s} · « ${b.titre} »`);
for (const a of emplacements.actualites)
  for (const b of a.blocs ?? []) for (const m of b.medias ?? []) noter(m.videoUrl, `actualité · ${a.s}`);

console.log(`⭐ ${usages.size} vidéos Livid distinctes utilisées sur le site.\n`);

/* ── Les lecteurs noirs : une vidéo lisible mais sans image d'attente ────── */
const sansAffiche = [];
for (const p of emplacements.pagesBlocs)
  for (const b of p.blocs ?? []) if (!b.affiche) sansAffiche.push(`page ${p.s} · « ${b.titre} »`);
if (sansAffiche.length) {
  console.log(`⛔ ${sansAffiche.length} bloc(s) sans image d'affiche — le lecteur sera NOIR :`);
  for (const x of sansAffiche) console.log(`     ${x}`);
  console.log("");
} else console.log(`✅ Tous les blocs vidéo ont une vraie image d'affiche.\n`);

/* ── Le contrôle, une par une ────────────────────────────────────────────── */
const muettes = [];
let lues = 0;
for (const [slug, ou] of usages) {
  try {
    const v = await livid("GET", `/v1/videos/slug/${encodeURIComponent(slug)}`);
    lues++;
    const prive = v.visibility === "private";
    if (v.embedEnabled && !prive) continue;
    muettes.push({ slug, id: v.id, titre: v.title, prive, ou });
  } catch (e) {
    muettes.push({ slug, titre: `(illisible : ${e.message})`, erreur: true, ou });
  }
}

if (!muettes.length) {
  console.log(`✅ Les ${lues} vidéos peuvent être lues sur le site.`);
} else {
  console.log(`⛔ ${muettes.length} vidéo(s) NE JOUERONT PAS dans une page :\n`);
  for (const m of muettes) {
    console.log(`   ${m.prive ? "PRIVÉE     " : m.erreur ? "ILLISIBLE  " : "EMBED COUPÉ"}  ${m.titre}`);
    for (const o of m.ou.slice(0, 4)) console.log(`        ↳ ${o}`);
    if (m.ou.length > 4) console.log(`        ↳ … et ${m.ou.length - 4} autre(s)`);
  }

  if (!CORRIGER) {
    console.log(`\n👉 Relancer avec --corriger pour réactiver l'embed.`);
    /* ⚠️ La visibilité PRIVÉE n'est pas touchée automatiquement : la rendre
       accessible est une décision de publication, pas un réglage technique. */
    if (muettes.some(m => m.prive)) console.log(`   (les vidéos PRIVÉES ne seront pas touchées : c'est une décision, pas un réglage)`);
  } else {
    let reparees = 0;
    for (const m of muettes) {
      if (m.erreur || m.prive || !m.id) continue;
      await livid("PUT", `/v1/videos/id/${m.id}`, { embedEnabled: true });
      const apres = await livid("GET", `/v1/videos/id/${m.id}`); // on relit, on ne suppose pas
      if (apres.embedEnabled) { reparees++; console.log(`   ✅ ${m.titre}`); }
      else console.log(`   ⛔ ${m.titre} — le réglage n'a pas pris`);
    }
    console.log(`\n⭐ ${reparees} vidéo(s) redevenues lisibles sur le site.`);
  }
}
