/**
 * CURER LES RÉALISATIONS INVENTÉES DEPUIS /actualites/ — 12/08/2026.
 *
 * ⛔ POURQUOI CE SCRIPT EXISTE.
 * L'import du 02/08 a créé 25 réalisations à partir de pages /actualites/.
 * Leur source est `src/app/apercu/_realisations-migrees.ts`, dont l'en-tête
 * affirmait : « sur les 63 pages /actualites/ mesurables, UNE SEULE était un
 * vrai article ». C'est faux. Relevé le 12/08 sur le contenu réel des 63
 * articles (API WordPress, texte intégral, liens sortants, ligne « Client : »),
 * 25 sont de vrais articles éditoriaux — le premier vol de drone de 2012,
 * l'arrivée des casques Oculus, le motion control Kessler, les showreels.
 *
 * ⭐ LA RÈGLE POSÉE PAR GIZ LE 12/08, ET ELLE TRANCHE TOUT :
 *   « en gros tout ce qui est noté avec le slug actualités est une actualité »
 * Une actualité parle d'un PROJET LARGE — plusieurs vidéos, des photos, une
 * mise en page riche. Une réalisation parle d'un projet. Ce ne sont pas deux
 * rangements du même objet, ce sont deux objets.
 *
 * 👉 Ces 25 documents n'avaient donc pas à exister. Le contenu n'est pas
 * perdu : il vit dans WordPress, et il repartira en actualité.
 *
 * ⚠️ CE QUE CE SCRIPT NE FAIT PAS. Il ne tranche pas si l'un de ces projets
 * mérite AUSSI une réalisation à part entière (Grande Arche, BARPI, Peninsula,
 * GF Machining Solutions…). Cette question est ouverte et revient à Giz. Une
 * réalisation créée à ce titre le sera depuis le projet, jamais depuis
 * l'article.
 *
 * 🛟 La sauvegarde complète des 25 documents est écrite AVANT toute
 * suppression, à côté de ce script. Sans elle, on ne lance rien.
 *
 * Usage :  node scripts/curer-realisations-inventees.mjs [--pour-de-vrai]
 * Sans le drapeau, le script ne fait que lire et montrer ce qu'il ferait.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");

const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8")
    .split("\n")
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_TOKEN;
const API = `https://${projectId}.api.sanity.io/v2023-05-03`;

const requete = async (q, params = {}) => {
  const u = new URL(`${API}/data/query/${dataset}`);
  u.searchParams.set("query", q);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(`$${k}`, JSON.stringify(v));
  const r = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
  const j = await r.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

/* La liste ne se tape pas à la main : elle se relit dans le fichier qui a
   produit l'import. C'est la seule source qui dise avec certitude quelles
   réalisations viennent d'un article. */
const source = fs.readFileSync(path.join(RACINE, "src/app/apercu/_realisations-migrees.ts"), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`\n${slugs.length} réalisations issues de /actualites/ d'après _realisations-migrees.ts`);

const docs = await requete(
  `*[_type == "realisation" && slug.current in $s]{ _id, titre, client, "slug": slug.current, "entrants": count(*[references(^._id)]) }`,
  { s: slugs }
);
console.log(`${docs.length} retrouvées dans Sanity\n`);

const manquantes = slugs.filter(s => !docs.some(d => d.slug === s));
if (manquantes.length) console.log(`⚠️  déjà absentes : ${manquantes.join(", ")}\n`);

for (const d of docs) {
  console.log(`  ${d.slug.padEnd(58)} client « ${d.client} »${d.entrants ? `  ⚠️ ${d.entrants} lien(s) entrant(s)` : ""}`);
}

/* ⛔ LES GROUPES DE TRADUCTION. Sanity refuse de supprimer un document encore
   référencé. Le plugin d'internationalisation crée un `translation.metadata`
   par groupe ; celui qui ne pointerait plus que vers des documents supprimés
   n'a plus d'objet et part avec eux.
   ⚠️ UN GROUPE PEUT POINTER VERS UNE ADRESSE QUI NE RÉSOUT PLUS. Cas rencontré
   le 12/08 : le groupe Funseaker déclarait une version suisse qui n'existe
   qu'à l'état de BROUILLON (`drafts.…`). La référence vise l'identifiant
   publié, qui lui n'existe pas — le groupe paraît donc « à moitié plein »
   alors qu'il est vide. Un lien mort compte comme supprimé. */
const idsSupprimes = new Set(docs.map(d => d._id.replace(/^drafts\./, "")));
const groupes = await requete(
  `*[_type == "translation.metadata" && count(translations[value._ref in $ids]) > 0]{
     _id, "refs": translations[].value._ref, "vivants": translations[defined(value->_id)].value._ref }`,
  { ids: [...idsSupprimes] }
);
const groupesAJeter = groupes.filter(g =>
  (g.refs ?? []).every(ref => idsSupprimes.has(ref) || !(g.vivants ?? []).includes(ref))
);
const groupesAGarder = groupes.filter(g => !groupesAJeter.includes(g));
if (groupes.length) {
  console.log(`\n${groupes.length} groupe(s) de traduction concerné(s) — ${groupesAJeter.length} devenu(s) vide(s), à supprimer aussi.`);
  if (groupesAGarder.length) console.log(`⛔ ${groupesAGarder.length} groupe(s) gardent d'autres traductions : NE PAS y toucher, à traiter à la main.`);
}

if (!POUR_DE_VRAI) {
  console.log("\n📋 Lecture seule. Rien n'a été supprimé. Relancer avec --pour-de-vrai.\n");
  process.exit(0);
}

const sauvegarde = path.join(RACINE, "scripts/_sauvegarde-realisations-inventees.json");
const complet = await requete(`*[_type == "realisation" && slug.current in $s]`, { s: slugs });
fs.writeFileSync(sauvegarde, JSON.stringify(complet, null, 2));
console.log(`\n🛟 Sauvegarde de ${complet.length} documents : ${path.relative(RACINE, sauvegarde)}`);

const mutations = [
  ...groupesAJeter.map(g => ({ delete: { id: g._id } })),
  ...docs.map(d => ({ delete: { id: d._id } })),
  ...docs.map(d => ({ delete: { id: `drafts.${d._id}` } })),
];
const r = await fetch(`${API}/data/mutate/${dataset}?returnIds=true`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

/* ⛔ LE CONTRÔLE NE VIENT PAS DU MÊME CÔTÉ QUE L'ÉCRITURE. On ne relit pas
   la réponse de la mutation — elle dirait forcément que tout s'est bien
   passé. On recompte les réalisations restantes. */
const restantes = await requete(`count(*[_type == "realisation"])`);
const survivantes = await requete(`*[_type == "realisation" && slug.current in $s]{"slug": slug.current}`, { s: slugs });
console.log(`\n✅ ${restantes} réalisations restantes dans Sanity.`);
console.log(survivantes.length ? `⛔ ${survivantes.length} n'ont PAS été supprimées : ${survivantes.map(x => x.slug).join(", ")}` : "✅ aucune des inventées ne subsiste.");
