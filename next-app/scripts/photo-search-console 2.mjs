#!/usr/bin/env node
/**
 * LA PHOTO SEARCH CONSOLE — l'état AVANT bascule, figé sur disque.
 *
 *   node scripts/photo-search-console.mjs
 *
 * ⛔⛔ POURQUOI CE SCRIPT EXISTE, ET POURQUOI IL A UNE DATE DE PÉREMPTION.
 * Search Console ne conserve que **16 mois**. Le jour où le trafic bouge après
 * la bascule, la première question est « c'était combien avant ? ». Si la
 * photo n'a pas été prise, elle ne se rattrape pas : on ne peut plus ni
 * démontrer une perte, ni identifier quelle URL a décroché, ni corriger.
 *
 * 👉 Ce n'est pas un rapport, c'est une PIÈCE À CONVICTION. Elle se range dans
 * le dépôt, versionnée, et on ne la relit qu'en cas de problème — mais ce
 * jour-là elle vaut des semaines de travail.
 *
 * ⚠️ Portée du jeton : `webmasters.readonly`. Ce script ne peut RIEN écrire
 * dans la Search Console — ni soumettre, ni supprimer, ni demander une
 * indexation. Il lit, il écrit des fichiers locaux, c'est tout.
 *
 * ⚠️ La fenêtre s'arrête 3 jours avant aujourd'hui : Google livre ses données
 * avec du retard et les 48-72 dernières heures sont incomplètes. Les inclure
 * ferait croire à une chute en fin de période.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const s = JSON.parse(fs.readFileSync(process.env.HOME + "/.mcp-secrets.json", "utf8"));
const trouve = (o, k) =>
  o[k] ?? Object.values(o).filter(v => v && typeof v === "object").map(v => trouve(v, k)).find(Boolean);

const CLIENT_ID = trouve(s, "GSC_CLIENT_ID");
const CLIENT_SECRET = trouve(s, "GSC_CLIENT_SECRET");
const REFRESH = trouve(s, "GSC_REFRESH_TOKEN");
if (!CLIENT_ID || !REFRESH) {
  console.error("⛔ Identifiants GSC absents de ~/.mcp-secrets.json");
  process.exit(1);
}

const jeton = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
    refresh_token: REFRESH, grant_type: "refresh_token",
  }),
}).then(r => r.json());
if (!jeton.access_token) {
  console.error("⛔ Rafraîchissement du jeton refusé :", JSON.stringify(jeton).slice(0, 200));
  process.exit(1);
}

/* ── La fenêtre ────────────────────────────────────────────────────────────
   ⚠️ Les dates sont passées en argument plutôt que calculées avec `new Date()`
   quand on rejoue la photo : une photo doit être reproductible à l'identique.
   Par défaut, 12 mois glissants s'arrêtant il y a 3 jours. */
const jour = ms => new Date(Date.now() - ms).toISOString().slice(0, 10);
const FIN = process.argv[2] ?? jour(3 * 864e5);
const DEBUT = process.argv[3] ?? jour(368 * 864e5);

const PROPRIETES = [
  ["https://www.bluevistaprod.com/", "fr"],
  ["https://en.bluevistaprod.com/", "en"],
  ["sc-domain:bluevista.ch", "ch"],
];

/** Une coupe de la Search Console : dimensions × période. */
async function coupe(site, dimensions, rowLimit = 25000) {
  const lignes = [];
  for (let start = 0; ; start += rowLimit) {
    const r = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${jeton.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: DEBUT, endDate: FIN, dimensions, rowLimit, startRow: start, dataState: "final" }),
      }
    ).then(r => r.json());
    if (r.error) throw new Error(`${r.error.code} ${r.error.message}`.slice(0, 160));
    const rows = r.rows ?? [];
    lignes.push(...rows);
    if (rows.length < rowLimit) break;
  }
  return lignes;
}

const csv = (dimensions, lignes) => {
  const ech = v => `"${String(v).replace(/"/g, '""')}"`;
  return [
    [...dimensions, "clics", "impressions", "ctr", "position"].join(";"),
    ...lignes.map(l =>
      [...l.keys.map(ech), l.clicks, l.impressions, (l.ctr * 100).toFixed(2), l.position.toFixed(1)].join(";")
    ),
  ].join("\n");
};

const DOSSIER = path.join(RACINE, `PHOTO-SEARCH-CONSOLE-${FIN}`);
fs.mkdirSync(DOSSIER, { recursive: true });

const COUPES = [
  [["page"], "pages"],
  [["query"], "requetes"],
  [["country"], "pays"],
  [["date"], "jours"],
  [["page", "query"], "page-x-requete"],
  [["device"], "appareils"],
];

console.log(`Photo Search Console — du ${DEBUT} au ${FIN}\n`);
const resume = [];

for (const [site, code] of PROPRIETES) {
  console.log(`■ ${site}`);
  for (const [dims, nom] of COUPES) {
    try {
      const l = await coupe(site, dims);
      const f = path.join(DOSSIER, `${code}-${nom}.csv`);
      fs.writeFileSync(f, csv(dims, l));
      const clics = l.reduce((a, x) => a + x.clicks, 0);
      console.log(`   ${nom.padEnd(15)} ${String(l.length).padStart(6)} lignes${nom === "pages" ? ` · ${clics} clics` : ""}`);
      if (nom === "pages") resume.push({ site, urls: l.length, clics, impressions: l.reduce((a, x) => a + x.impressions, 0) });
    } catch (e) {
      console.log(`   ${nom.padEnd(15)} ⛔ ${e.message}`);
    }
  }
}

/* Un repère lisible à côté des CSV : dans six mois, personne n'ouvrira
   25 000 lignes pour savoir si la bascule s'est bien passée. */
fs.writeFileSync(
  path.join(DOSSIER, "REPERES.md"),
  `# Photo Search Console — ${DEBUT} → ${FIN}\n\n` +
  `> Prise avant la bascule du site. ⛔ Search Console ne conserve que 16 mois :\n` +
  `> ces chiffres ne sont plus récupérables après ${FIN.slice(0, 4)}-${String(Number(FIN.slice(5, 7))).padStart(2, "0")} + 16 mois.\n\n` +
  `| Propriété | URL vues | Clics | Impressions |\n|---|---|---|---|\n` +
  resume.map(r => `| ${r.site} | ${r.urls} | **${r.clics}** | ${r.impressions} |`).join("\n") +
  `\n\n## Comment s'en servir après la bascule\n\n` +
  `Comparer \`fr-pages.csv\` à la même coupe prise après, URL par URL. Une URL qui\n` +
  `disparaît de la seconde liste alors qu'elle avait des clics dans la première est\n` +
  `une redirection manquée — c'est le seul diagnostic qui compte les premières semaines.\n\n` +
  `⚠️ Deux erreurs de lecture à éviter :\n` +
  `- Une **position moyenne** qui chute n'est pas une perte de classement : une page qui\n` +
  `  apparaît sur de nouvelles requêtes lointaines voit sa moyenne s'effondrer sans rien\n` +
  `  perdre. Le juge est \`page-x-requete.csv\`, pas \`pages.csv\`.\n` +
  `- La **saisonnalité** se vérifie en année sur année, jamais en mois sur mois.\n`
);

console.log(`\n✅ Écrit dans ${path.relative(RACINE, DOSSIER)}/\n`);
