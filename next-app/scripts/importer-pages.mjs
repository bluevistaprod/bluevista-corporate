#!/usr/bin/env node
/**
 * IMPORTE LES PAGES DANS SANITY — savoir-faire, villes, métiers, agence,
 * contact.
 *
 *   node scripts/importer-pages.mjs           # simulation, n'écrit rien
 *   node scripts/importer-pages.mjs --ecrire  # écrit
 *
 * ⛔ LA SIMULATION N'ÉCRIT RIEN, et le test du mode passe AVANT tout appel
 * réseau. C'est la correction du défaut de l'import des réalisations, où
 * les images partaient même en simulation.
 *
 * La source est _plan-du-site.ts : les 9 savoir-faire avec les textes repris
 * de l'ancien site, les sections de fond et les FAQ ajoutées, et les 4 villes
 * avec leurs spécificités locales.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ECRIRE = process.argv.includes("--ecrire");

const env = {};
for (const l of fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, SANITY_TOKEN: token } = env;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";

/* ── Lecture du plan du site ──────────────────────────────────────────
   On relit le fichier comme du texte plutôt que de l'évaluer : évaluer du
   code pour en extraire des données est le raccourci qui se paie un jour. */
const src = fs.readFileSync(path.join(RACINE, "src/app/apercu/_plan-du-site.ts"), "utf8");

const chaine = (bloc, cle) => {
  const m = bloc.match(new RegExp(`\\b${cle}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, " ") : undefined;
};
const tableauChaines = (bloc, cle) => {
  const m = bloc.match(new RegExp(`\\b${cle}:\\s*\\[([\\s\\S]*?)\\n {4}\\]`));
  if (!m) return [];
  return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x => x[1].replace(/\\"/g, '"'));
};
const objets = (bloc, cle, champs) => {
  const m = bloc.match(new RegExp(`\\b${cle}:\\s*\\[([\\s\\S]*?)\\n {4}\\],`));
  if (!m) return [];
  return [...m[1].matchAll(/\{([\s\S]*?)\n {6}\}/g)].map(o => {
    const r = {};
    for (const c of champs) {
      const v = o[1].match(new RegExp(`\\b${c}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      if (v) r[c] = v[1].replace(/\\"/g, '"');
      const arr = o[1].match(new RegExp(`\\b${c}:\\s*\\[([\\s\\S]*?)\\]`));
      if (!v && arr) r[c] = [...arr[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x => x[1]);
    }
    return r;
  });
};

const blocs = (paras, prefixe) =>
  (paras || []).filter(Boolean).map((t, i) => ({
    _type: "block", _key: `${prefixe}${i}`, style: "normal",
    children: [{ _type: "span", _key: `${prefixe}s${i}`, text: t }],
  }));

const pages = [];

// ── Les 9 savoir-faire ────────────────────────────────────────────────
const bruts = src.slice(src.indexOf("export const COMPETENCES"), src.indexOf("export type PageVille"));
for (const b of bruts.split(/\n  \{\n/).slice(1)) {
  const slug = chaine(b, "slug");
  if (!slug) continue;
  pages.push({
    _id: `page-savoir-faire-${slug}`,
    genre: "savoir-faire",
    titre: chaine(b, "nom"),
    slug,
    surTitre: "Savoir-faire",
    accroche: chaine(b, "accroche"),
    texte: blocs(tableauChaines(b, "texte"), "t"),
    sections: objets(b, "sections", ["titre", "paragraphes"]).map((s, i) => ({
      _type: "object", _key: `sec${i}`, titre: s.titre,
      paragraphes: blocs(s.paragraphes, `p${i}`),
    })),
    faq: objets(b, "faq", ["q", "r"]).map((f, i) => ({ _type: "object", _key: `faq${i}`, q: f.q, r: f.r })),
    ancienneUrl: chaine(b, "ancienneUrl"),
  });
}

// ── Les 4 villes ──────────────────────────────────────────────────────
const brutsV = src.slice(src.indexOf("export const VILLES"), src.indexOf("export const PAGES_FIXES"));
for (const b of brutsV.split(/\n  \{\n/).slice(1)) {
  const slug = chaine(b, "slug");
  if (!slug) continue;
  pages.push({
    _id: `page-ville-${slug}`,
    genre: "ville",
    titre: chaine(b, "titre"),
    slug,
    surTitre: chaine(b, "ville"),
    texte: blocs(tableauChaines(b, "texte"), "t"),
    sections: objets(b, "specificites", ["titre", "texte"]).map((s, i) => ({
      _type: "object", _key: `sp${i}`, titre: s.titre, paragraphes: blocs([s.texte], `sp${i}`),
    })),
    projets: tableauChaines(b, "projets"),
    ancienneUrl: chaine(b, "ancienneUrl"),
  });
}

// ── Les 3 métiers, l'agence et le contact ─────────────────────────────
for (const [slug, titre, surTitre, accroche] of [
  ["film", "Des contenus qui font bouger vos indicateurs", "Communication & marketing",
   "Film d’entreprise, motion design, podcast, contenus sociaux. Ce qu’on fabrique dépend de ce que vous devez obtenir — pas l’inverse."],
  ["evenement", "Une date qui ne bouge pas, et tout ce qu’il y a derrière", "Événementiel",
   "Conception, contenus, scénographie, régie, captation. Un événement se prépare pendant des mois pour tenir quelques heures."],
  ["immersion", "Faire vivre ce qu’un film ne peut que montrer", "Immersion",
   "Réalité virtuelle, 3D temps réel, mapping, 360°. La technologie découle de ce que votre public doit ressentir."],
])
  pages.push({ _id: `page-metier-${slug}`, genre: "metier", titre, slug, surTitre, accroche,
               ancienneUrl: `/${slug}/` });

pages.push({ _id: "page-agence", genre: "agence", titre: "Une agence qui fabrique ce qu’elle conçoit",
             slug: "agence", surTitre: "L’agence", ancienneUrl: "/agence/",
             accroche: "Communication et marketing, événementiel, immersion. Quatre pôles sous le même toit, et un seul interlocuteur du premier atelier à la diffusion." });
pages.push({ _id: "page-contact", genre: "contact", titre: "Parlons de vos objectifs avant de parler de format",
             slug: "contact", surTitre: "Contact & devis", ancienneUrl: "/contact-devis/",
             accroche: "Décrivez votre projet en quelques lignes. On revient vers vous sous 48 heures ouvrées, avec des questions avant des chiffres." });

// ── Compte rendu ──────────────────────────────────────────────────────
const par = pages.reduce((a, p) => ((a[p.genre] = (a[p.genre] || 0) + 1), a), {});
console.log(`\n${pages.length} pages prêtes`);
for (const [g, n] of Object.entries(par)) console.log(`  ${n}  ${g}`);
console.log(`  ${pages.filter(p => p.texte?.length).length} avec un texte de fond`);
console.log(`  ${pages.filter(p => p.sections?.length).length} avec des sections`);
console.log(`  ${pages.filter(p => p.faq?.length).length} avec une FAQ`);

if (!ECRIRE) {
  console.log("\nSimulation — rien n'a été envoyé. Relancer avec --ecrire.\n");
  process.exit(0);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-08-01", useCdn: false });
console.log(`\n→ écriture sur ${projectId}/${dataset}\n`);
for (const p of pages) {
  const { genre, titre, slug, ...reste } = p;
  await client.createOrReplace({
    _id: p._id, _type: "page", language: "fr", genre, titre,
    slug: { _type: "slug", current: slug },
    ...Object.fromEntries(Object.entries(reste).filter(([k, v]) =>
      k !== "_id" && v !== undefined && (!Array.isArray(v) || v.length))),
  });
  console.log(`  ✓ ${genre.padEnd(13)} ${titre.slice(0, 52)}`);
}
console.log(`\n✅ ${pages.length} pages importées.\n`);
