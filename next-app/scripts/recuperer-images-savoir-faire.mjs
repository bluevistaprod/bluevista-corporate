/**
 * RÉCUPÉRER LES IMAGES DES PAGES DE SAVOIR-FAIRE — 12/08/2026.
 *
 * ⛔ LE CONSTAT DE GIZ, en comparant l'ancienne page et la nouvelle :
 * « je trouve que l'ancienne vit beaucoup plus […] elle faisait article réel,
 * pas gabarit sans âme ». L'ancienne alterne texte et média à chaque bloc ; la
 * nouvelle alignait quatre sections de texte nu avant deux grilles d'images
 * collées à la fin. Le contenu était meilleur, la page était morte.
 *
 * Sa consigne : « pour le 1 il n'y a pas de choix à faire, map correctement
 * les mêmes que l'ancienne page ». On ne choisit donc pas d'images, on
 * reprend les siennes.
 *
 * ⚠️ OÙ ELLES SE CACHENT, ET POURQUOI JE LES AVAIS RATÉES. Elementor pose la
 * plupart des visuels en IMAGE DE FOND, dans un attribut `style`, pas dans une
 * balise `<img>`. Un premier relevé cherchant `src=` et `background-image:
 * url(` ne trouvait rien sur cinq pages sur neuf — dont la page réalité
 * virtuelle, qui affiche pourtant une bannière pleine largeur.
 * 👉 On ratisse donc TOUTE URL d'image du HTML, puis on écarte au nom de
 * fichier. Chercher là où on croit que c'est rangé ne trouve que ce qu'on
 * imaginait.
 *
 * ⚠️ ON REMONTE À L'ORIGINAL : WordPress sert `image-1024x671.jpg`, une
 * vignette. Le fichier sans suffixe de taille est la pleine définition, et
 * c'est elle qu'on veut — Sanity refera ses propres tailles.
 *
 * Usage :  node scripts/recuperer-images-savoir-faire.mjs [--pour-de-vrai]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");
const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8")
    .split("\n").filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03`;
const UA = { "User-Agent": "Mozilla/5.0" };

const groq = async (q) => {
  const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  u.searchParams.set("query", q);
  const j = await (await fetch(u, { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } })).json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

/* ── 1. Les pages du nouveau site, et combien de sections chacune ───────── */
const cibles = await groq('*[_type=="page" && genre=="savoir-faire"]{_id,"slug":slug.current,titre,"nbSections":count(sections),sections}');
const parSlug = Object.fromEntries(cibles.map(c => [c.slug, c]));

/* ── 2. Les images de l'ancien site ─────────────────────────────────────── */
const pages = [];
for (let p = 1; p <= 2; p++) {
  const r = await fetch(`https://www.bluevistaprod.com/wp-json/wp/v2/pages?per_page=100&page=${p}&_fields=link,content`, { headers: UA });
  if (!r.ok) break;
  const b = await r.json();
  if (!b.length) break;
  pages.push(...b);
}

/* ⛔ Ce qu'on écarte : pictos, logos, séparateurs, drapeaux de langue. Un
   visuel de contenu n'a jamais « icon » ou « logo » dans son nom. */
const REBUT = /(logo|icon|picto|favicon|placeholder|separateur|flag|drapeau|avatar|sprite)/i;

/** original → adresse telle qu'elle figure dans la page, pour le repli. */
const SOURCE = new Map();

function imagesDe(html) {
  const brut = html.match(/https:\/\/[^\s"'<>()\\]+?\.(?:jpg|jpeg|png|webp)/gi) ?? [];
  const vues = [];
  for (const u of brut) {
    if (REBUT.test(u)) continue;
    /* On remonte de la vignette à l'original : `-1024x671` retiré. */
    const original = u.replace(/-\d+x\d+(?=\.\w+$)/, "");
    SOURCE.set(original, u);
    if (!vues.includes(original)) vues.push(original);
  }
  return vues;
}

const plan = [];
for (const page of pages) {
  const m = page.link.match(/\/nos-competences\/([^/]+)\//);
  if (!m || !parSlug[m[1]]) continue;
  const cible = parSlug[m[1]];
  const imgs = imagesDe(page.content?.rendered ?? "");
  if (imgs.length) plan.push({ cible, imgs });
}

console.log(`\n${plan.length} pages avec des images sur l'ancien site :`);
for (const p of plan) {
  console.log(`  ${p.cible.slug.padEnd(40)} ${p.imgs.length} images pour ${p.cible.nbSections} sections`);
  for (const u of p.imgs) console.log(`       ${u.split("/uploads/")[1]}`);
}
if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

/* ── 3. Téléversement dans Sanity ───────────────────────────────────────── */
const deja = new Map();
async function televerser(url) {
  if (deja.has(url)) return deja.get(url);
  /* ⚠️ REMONTER À L'ORIGINAL EST UN PARI, PAS UNE CERTITUDE. Certains
     fichiers s'appellent VRAIMENT `sgs_lab-400x284-1.jpg` : le suffixe fait
     partie du nom, ce n'est pas une vignette. Retirer aveuglément `-400x284`
     produit alors une adresse qui n'existe pas, et l'image disparaît sans
     bruit. On essaie donc l'original, et on retombe sur l'adresse telle
     qu'elle figure dans la page. */
  let r = await fetch(url, { headers: UA });
  if (!r.ok && url !== deja.get("__source__" + url)) {
    const telQuel = SOURCE.get(url);
    if (telQuel && telQuel !== url) {
      console.log(`   ↩︎ original absent, on reprend la vignette — ${telQuel.split("/uploads/")[1]}`);
      r = await fetch(telQuel, { headers: UA });
      if (r.ok) url = telQuel;
    }
  }
  if (!r.ok) { console.log(`   ⛔ ${r.status} — ${url}`); return null; }
  const octets = Buffer.from(await r.arrayBuffer());
  const nom = decodeURIComponent(url.split("/").pop());
  const up = await fetch(`${API}/assets/images/${env.NEXT_PUBLIC_SANITY_DATASET}?filename=${encodeURIComponent(nom)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.SANITY_TOKEN}`, "Content-Type": r.headers.get("content-type") ?? "image/jpeg" },
    body: octets,
  });
  const j = await up.json();
  if (j.error) { console.log(`   ⛔ envoi refusé — ${JSON.stringify(j.error)}`); return null; }
  deja.set(url, j.document._id);
  return j.document._id;
}

const mutations = [];
for (const p of plan) {
  const sections = [...(p.cible.sections ?? [])];
  let posees = 0;
  for (let i = 0; i < sections.length && posees < p.imgs.length; i++) {
    if (sections[i].image) continue;           // on ne remplace jamais une image déjà choisie
    const id = await televerser(p.imgs[posees]);
    if (!id) { posees++; continue; }
    sections[i] = { ...sections[i], image: { _type: "image", asset: { _type: "reference", _ref: id } } };
    posees++;
  }
  mutations.push({ patch: { id: p.cible._id, set: { sections } } });
  console.log(`  ${p.cible.slug} — ${posees} image(s) posée(s)`);
}

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({ mutations }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

/* ⛔ Le contrôle vient d'ailleurs que l'écriture : on recompte dans Sanity. */
const relu = await groq('*[_type=="page" && genre=="savoir-faire"]{"slug":slug.current,"avecImage":count(sections[defined(image)]),"sections":count(sections)}|order(slug asc)');
console.log("\n✅ sections illustrées, relevé dans Sanity :");
for (const p of relu) console.log(`   ${p.slug.padEnd(40)} ${p.avecImage}/${p.sections}`);
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
