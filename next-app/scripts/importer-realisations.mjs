#!/usr/bin/env node
/**
 * IMPORTE LES 170 RÉALISATIONS DANS SANITY — et c'est l'argument qui a fait
 * pencher la décision.
 *
 * L'atout de WordPress était « le contenu y est déjà ». Il ne tient que si
 * l'import coûte cher. Ici il coûte une commande : les titres, les vidéos,
 * les descriptions et le classement sont déjà dans _realisations.ts, et les
 * images dans public/media/real.
 *
 *   node scripts/importer-realisations.mjs           # simulation
 *   node scripts/importer-realisations.mjs --ecrire  # écrit vraiment
 *
 * ⛔ IL FAUT UN JETON D'ÉCRITURE. À créer dans sanity.io/manage → API →
 * Tokens, avec le rôle « Editor », et à poser dans .env.local sous
 * SANITY_TOKEN. ⚠️ Sans le préfixe NEXT_PUBLIC_ : ce jeton donne le droit de
 * modifier tout le contenu, il ne doit jamais partir dans le navigateur.
 *
 * ⚠️ LA SIMULATION EST LE MODE PAR DÉFAUT, délibérément. Un import qui se
 * lance tout seul sur une base de production est une mauvaise soirée.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(ICI, "..");
const ECRIRE = process.argv.includes("--ecrire");

// ── Les variables d'environnement ──────────────────────────────────────
const env = {};
const fEnv = path.join(RACINE, ".env.local");
if (fs.existsSync(fEnv)) {
  for (const l of fs.readFileSync(fEnv, "utf8").split("\n")) {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_TOKEN || process.env.SANITY_TOKEN;

// ── La source : le fichier que la maquette utilise déjà ────────────────
function lireRealisations() {
  const brut = fs.readFileSync(path.join(RACINE, "src/app/apercu/_realisations.ts"), "utf8")
    + fs.readFileSync(path.join(RACINE, "src/app/apercu/_realisations-migrees.ts"), "utf8");
  const fiches = [];
  // Chaque entrée est un objet littéral ; on relit champ par champ plutôt que
  // d'évaluer le fichier — évaluer du code pour en extraire des données est
  // le genre de raccourci qui se paie un jour.
  for (const bloc of brut.split(/\n  \{\n?/).slice(1)) {
    const lire = (k) => {
      const m = bloc.match(new RegExp(`${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : undefined;
    };
    const lireNb = (k) => {
      const m = bloc.match(new RegExp(`${k}:\\s*(\\d+)`));
      return m ? Number(m[1]) : 0;
    };
    const slug = lire("slug");
    if (!slug) continue;
    fiches.push({
      slug,
      titre: lire("titre") ?? slug,
      client: lire("client"),
      metier: lire("metier"),
      produit: lire("produit"),
      video: lire("video"),
      intro: lire("intro"),
      detail: lire("detail"),
      image: lire("image"),
      ancienneUrl: lire("ancienneUrl"),
      aRelire: /titreSur:\s*false/.test(bloc),
      clics: lireNb("clics"),
    });
  }
  return fiches;
}

const fiches = lireRealisations();
const avecImage = fiches.filter(f => f.image?.startsWith("/media/real/"));

console.log(`\n${fiches.length} réalisations lues`);
console.log(`  ${fiches.filter(f => f.video).length} avec vidéo`);
console.log(`  ${avecImage.length} avec image locale`);
console.log(`  ${fiches.filter(f => f.aRelire).length} au classement déduit (marquées « à relire »)`);

if (!projectId || !token) {
  console.log(`\n⚠️  ${!projectId ? "NEXT_PUBLIC_SANITY_PROJECT_ID" : "SANITY_TOKEN"} manquant dans .env.local.`);
  console.log("   Simulation uniquement — rien n'a été envoyé.\n");
  console.log("   Les trois premières fiches telles qu'elles partiraient :\n");
  for (const f of fiches.slice(0, 3)) {
    console.log(`   · ${f.titre}`);
    console.log(`     ${f.metier} / ${f.produit}${f.aRelire ? "  ⚠️ à relire" : ""}`);
    console.log(`     ${f.image ?? "(sans image)"}`);
  }
  console.log();
  process.exit(0);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-08-01", useCdn: false });

// ── Le texte riche : Sanity attend des blocs, pas une chaîne ──────────
const enBlocs = (texte) =>
  !texte ? undefined : texte.split(/(?<=\.)\s+(?=[A-ZÀ-Ü])/).reduce((acc, ph) => {
    const d = acc[acc.length - 1];
    if (d && d.join(" ").length < 320) d.push(ph); else acc.push([ph]);
    return acc;
  }, []).map((par, i) => ({
    _type: "block", _key: `b${i}`, style: "normal",
    children: [{ _type: "span", _key: `s${i}`, text: par.join(" ") }],
  }));

async function televerse(chemin) {
  const abs = path.join(RACINE, "public", chemin.replace(/^\//, ""));
  if (!fs.existsSync(abs)) return undefined;
  const asset = await client.assets.upload("image", fs.createReadStream(abs), {
    filename: path.basename(abs),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

console.log(`\n→ écriture sur ${projectId}/${dataset}\n`);
let n = 0;
for (const f of fiches) {
  const doc = {
    _id: `realisation-${f.slug}`,
    _type: "realisation",
    language: "fr",
    titre: f.titre,
    slug: { _type: "slug", current: f.slug },
    client: f.client,
    video: f.video || undefined,
    intro: f.intro || undefined,
    detail: enBlocs(f.detail),
    metier: f.metier || "film",
    produit: f.produit || undefined,
    aRelire: f.aRelire,
    marches: ["fr"],
    ancienneUrl: f.ancienneUrl,
  };
  if (f.image?.startsWith("/media/real/")) {
    const img = await televerse(f.image);
    if (img) doc.image = img;
  }
  if (!ECRIRE) { n++; continue; }
  await client.createOrReplace(doc);
  n++;
  if (n % 20 === 0) console.log(`  ${n}/${fiches.length}`);
}

console.log(ECRIRE
  ? `\n✅ ${n} réalisations importées.\n`
  : `\n${n} fiches prêtes. Relancer avec --ecrire pour envoyer.\n`);
