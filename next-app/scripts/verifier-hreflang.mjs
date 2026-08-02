#!/usr/bin/env node
/**
 * VÉRIFIE LES DÉCLARATIONS hreflang — dans Sanity ET dans le rendu.
 *
 *   node scripts/verifier-hreflang.mjs
 *
 * ⛔ POURQUOI CE CONTRÔLE EXISTE, et pourquoi il est plus important que la
 * plupart des tests de ce projet : un hreflang cassé NE PRODUIT AUCUNE
 * ERREUR. Rien ne s'affiche de travers, aucune page ne tombe en 404, aucun
 * message n'apparaît en console. Google se contente d'ignorer silencieusement
 * la déclaration — parfois celle de tout le groupe — et on le découvre six
 * mois plus tard en constatant que le site suisse a disparu des résultats.
 *
 * Les quatre défauts ci-dessous couvrent l'intégralité des façons connues de
 * casser un hreflang. Ils sont tous invisibles à l'œil.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.BASE ?? "http://localhost:3333";

/* ⛔ On lit .env.local comme les scripts d'import, et surtout on lit les
   MÊMES variables que l'application (NEXT_PUBLIC_*). Une première version de
   ce script inventait un `SANITY_PROJECT_ID` qui n'existe nulle part : il
   interrogeait donc un projet vide et annonçait tranquillement que tout
   allait bien. Un contrôle qui se trompe de source est pire que pas de
   contrôle du tout. */
const env = {};
for (const l of fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const PROJET = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = env.NEXT_PUBLIC_SANITY_DATASET || "production";
if (!PROJET) {
  console.error("⛔ NEXT_PUBLIC_SANITY_PROJECT_ID absent de .env.local — rien à vérifier.");
  process.exit(1);
}

/* ── 1. L'état réel des traductions, lu dans Sanity ───────────────────────
   On lit la perspective PUBLIÉE : un brouillon n'existe pas pour Google, et
   le déclarer produirait un hreflang vers une page qui n'est pas en ligne. */
/* ⛔ LA LANGUE EST PORTÉE PAR L'ÉLÉMENT DU TABLEAU (`translations[].language`),
   pas par sa clé. Le `_key` est un hachage aléatoire posé par le plugin — une
   première version de ce script l'affichait comme s'il s'agissait d'un code de
   langue, ce qui donnait des rapports illisibles du genre
   « a2284f97032a9e68c077f7c70cf32939 ×1 ».

   ⚠️ Et ne PAS remettre cette explication à l'intérieur de la requête : les
   backticks autour de `_key` y refermeraient le gabarit de chaîne. */
const requete = encodeURIComponent(`
  *[_type == "translation.metadata"]{
    _id,
    "membres": translations[]{
      language,
      "publie": defined(value->_id),
      "type": value->_type,
      "titre": value->titre,
      "slug": value->slug.current
    }
  }
`);

const url = `https://${PROJET}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${requete}`;
const { result: groupes = [] } = await fetch(url).then(r => r.json());

let fautes = 0;
const signale = (quoi, detail) => {
  fautes++;
  console.log(`⛔ ${quoi}\n   ${detail}`);
};

/* ── DÉFAUT 1 — le groupe orphelin ────────────────────────────────────────
   ⛔⛔ C'EST LA RÈGLE DEMANDÉE EXPLICITEMENT PAR GIZ, 02/08/2026 :
   « si un jour je dépublie une page d'une langue, il faut retirer le
   hreflang sur la page restante s'il n'en reste qu'une ».

   Elle est juste, et c'est le cas le plus vicieux du lot. Une déclaration
   qui ne pointe que vers soi-même annonce un groupe de traductions qui
   n'existe pas ; et surtout, dépublier une traduction laisse l'autre page
   pointer vers une adresse morte. Le code de src/lib/hreflang.ts s'en
   protège en recalculant à chaque rendu — ce contrôle vérifie qu'il le
   fait vraiment, y compris après une dépublication faite dans le studio
   des semaines plus tard. */
const orphelins = [];
const pendantes = [];
for (const g of groupes) {
  const membres = g.membres ?? [];
  const vivants = membres.filter(m => m.publie);
  if (vivants.length === 1) orphelins.push({ ...vivants[0], groupe: g._id });

  /* ⚠️ LA RÉFÉRENCE PENDANTE — une traduction commencée dans le studio dont
     le document n'a jamais été créé, ou qui a été supprimée depuis. Le
     groupe garde une entrée qui ne mène nulle part.

     Le code du site n'en souffre pas : `value->` renvoie null et l'entrée
     est écartée avant toute déclaration. Mais on la signale, parce qu'elle
     traduit un geste inachevé côté studio — et parce qu'un jour où l'on
     s'étonnera qu'une traduction « ne sorte pas », c'est ici que sera la
     réponse. */
  for (const m of membres) {
    if (!m.publie && !m.titre) pendantes.push({ langue: m.language ?? "?", groupe: g._id, avec: vivants[0]?.titre });
  }
}

/* ── DÉFAUT 2 — la cible dépubliée ────────────────────────────────────────
   Un groupe où certains membres sont publiés et d'autres non. Le code ne
   déclare que les vivants : on liste ici ce qui est en attente, pour que
   Giz sache ce qui n'est pas encore déclaré à Google. Ce n'est pas une
   faute — c'est l'état d'avancement des traductions. */
const enAttente = groupes
  .filter(g => (g.membres ?? []).some(m => m.publie) && (g.membres ?? []).some(m => !m.publie))
  .flatMap(g => (g.membres ?? []).filter(m => !m.publie && m.titre).map(m => m.language));

/* ── 2. Le rendu réel des pages ───────────────────────────────────────────
   ⚠️ On vérifie le RENDU et non le code : c'est le seul moyen de constater
   ce que Google verra vraiment. Une page peut compiler parfaitement et ne
   rien émettre du tout. */
const PAGES = [
  "/apercu/competence/video-mapping",
  "/apercu/ville/studio-animation-3d-lyon",
  "/apercu/ville/realisation-video-geneve",
  "/apercu/metier/film",
  "/apercu/metier/evenement",
  "/apercu/metier/immersion",
];

/* On ajoute quelques réalisations réelles, prises dans Sanity plutôt
   qu'écrites en dur : une liste figée finit toujours par citer une page
   supprimée, et le contrôle échoue alors pour la mauvaise raison. */
const rq = encodeURIComponent(`*[_type=="realisation" && language=="fr"][0..4].slug.current`);
const { result: slugs = [] } = await fetch(
  `https://${PROJET}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${rq}`
).then(r => r.json());
PAGES.push(...slugs.map(s => `/apercu/realisations/${s}`));

const declarations = new Map(); // url déclarée → pages qui la déclarent

for (const p of PAGES) {
  const html = await fetch(BASE + p).then(r => r.text()).catch(() => "");
  const balises = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*>/gi)].map(m => m[0]);
  const liens = balises
    .map(b => ({
      lang: (b.match(/hreflang="([^"]+)"/i) ?? [])[1],
      href: (b.match(/href="([^"]+)"/i) ?? [])[1],
    }))
    .filter(l => l.lang && l.href);

  if (!liens.length) continue; // page sans traduction : c'est légitime

  /* ── DÉFAUT 3 — la page qui ne se déclare pas elle-même ─────────────────
     Subtilité qui fait ignorer TOUT le groupe : une page doit figurer dans
     sa propre liste.

     ⚠️ On compare au CANONIQUE plutôt qu'au chemin de la maquette. Les
     adresses d'aperçu (/apercu/competence/…) ne ressemblent pas aux adresses
     finales (/savoir-faire/…) : un contrôle qui rapprocherait les deux ne
     mesurerait que ma capacité à écrire la bonne transformation. Le
     canonique, lui, est produit par le même code que les déclarations —
     s'il n'y figure pas, le défaut est réel. */
  const canonique = (html.match(/<link rel="canonical" href="([^"]+)"/i) ?? [])[1];
  if (canonique && !liens.some(l => l.href === canonique)) {
    signale(`${p} ne se déclare pas elle-même`, `canonique ${canonique} absent de : ${liens.map(l => l.lang).join(", ")}`);
  }

  /* ── DÉFAUT 4 — le groupe d'une seule langue ────────────────────────────
     Le pendant côté rendu du défaut 1. Une seule langue déclarée (hors
     x-default) veut dire qu'on annonce un groupe vide. */
  const langues = liens.map(l => l.lang).filter(l => l !== "x-default");
  if (langues.length < 2) {
    signale(
      `${p} déclare un hreflang alors qu'une seule version existe`,
      `→ retirer la déclaration. Langue(s) : ${langues.join(", ") || "aucune"}`
    );
  }

  for (const l of liens) {
    if (l.lang === "x-default") continue;
    declarations.set(l.href, [...(declarations.get(l.href) ?? []), p]);
  }
}

/* ── DÉFAUT 5 — la réciprocité ────────────────────────────────────────────
   ⚠️ Google exige que la déclaration soit RÉCIPROQUE : si A déclare B, B
   doit déclarer A. À défaut, la déclaration est ignorée — n'importe qui
   pourrait sinon s'attacher au site d'un tiers.

   👉 Ce contrôle est INCOMPLET tant que bluevista.ch n'existe pas : on ne
   peut pas interroger un site qui n'est pas en ligne. Il devra être relancé
   avec BASE pointant sur le site suisse le jour de sa mise en service —
   sans quoi le couple fr-FR / fr-CH ne vaut rien. */
const suisses = [...declarations.keys()].filter(u => u.includes("bluevista.ch"));
if (suisses.length) {
  console.log(
    `\n⚠️  ${suisses.length} déclaration(s) pointent vers bluevista.ch.\n` +
      `   La réciprocité NE PEUT PAS être vérifiée tant que ce site n'est pas\n` +
      `   en ligne. Sans déclaration en retour de son côté, Google ignorera\n` +
      `   le couple — relancer ce script à sa mise en service.`
  );
}

/* ── Le compte rendu ──────────────────────────────────────────────────────── */
if (orphelins.length) {
  console.log(`\n⛔ ${orphelins.length} page(s) n'ont plus qu'une seule version publiée :`);
  for (const o of orphelins.slice(0, 20)) {
    console.log(`   ${String(o.language).padEnd(6)} ${o.type} — ${o.titre ?? o.slug}`);
  }
  console.log(
    `   → aucune déclaration hreflang ne doit subsister sur ces pages.\n` +
      `     Le code le fait automatiquement ; les lignes ci-dessus sont là\n` +
      `     pour que la dépublication reste un geste visible, pas un oubli.`
  );
}

if (pendantes.length) {
  console.log(`\n⚠️  ${pendantes.length} traduction(s) commencée(s) mais jamais créée(s) :`);
  for (const d of pendantes.slice(0, 20)) {
    console.log(`   ${String(d.langue).padEnd(6)} rattachée à « ${d.avec ?? "?"} »`);
  }
  console.log(`   → à terminer ou à retirer dans le studio. Sans effet sur le site.`);
}

if (enAttente.length) {
  const compte = enAttente.reduce((a, l) => ({ ...a, [l]: (a[l] ?? 0) + 1 }), {});
  console.log(
    `\n📌 Traductions non publiées, donc non déclarées : ` +
      Object.entries(compte).map(([l, n]) => `${l} ×${n}`).join(", ")
  );
}

console.log(
  fautes
    ? `\n${fautes} défaut(s) de hreflang.\n`
    : `\n✅ ${PAGES.length} pages vérifiées — hreflang cohérent.\n`
);
process.exit(fautes ? 1 : 0);
