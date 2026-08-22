/**
 * LA VRAIE DATE DE PUBLICATION DE CHAQUE RÉALISATION — 22/08/2026.
 * Demande de Giz : « regarde les dates de publications des réalisations de
 * l'ancien site afin de classer intelligemment celles du nouveau site — ne
 * pas l'afficher sur notre site mais que ça serve pour le classement ».
 *
 * ⛔⛔ DEUX DATES COHABITENT SUR L'ANCIEN SITE, ET L'ÉVIDENTE EST LA FAUSSE.
 * `INVENTAIRE-PAGES.csv` porte une colonne `modifie_le` : c'est la date de
 * DERNIÈRE RETOUCHE, pas de mise en ligne. Le site ayant été repris en bloc en
 * janvier 2024, presque tout y est daté de 2024 — LPA compris, alors que le
 * film des 50 ans est de novembre 2019. Trier là-dessus donnerait un ordre
 * faux qui a l'air juste : la galerie s'ouvrirait sur des films de six ans
 * rangés comme des nouveautés.
 * 👉 La bonne source est le `datePublished` du JSON-LD de chaque page, que
 * WordPress écrit à la publication et ne retouche pas ensuite.
 *
 * ⚠️ ELLE NE S'AFFICHE NULLE PART. Le champ est en lecture seule et hors
 * gabarit : il ne sert qu'à `order()`. Une réalisation datée à l'écran
 * vieillit toute seule — un film de 2019 affiché « 2019 » se lit comme périmé,
 * alors que rangé au bon endroit il fait simplement son âge.
 *
 *   node scripts/dates-realisations.mjs [--ecrire]
 */
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { createClient } from "next-sanity";

const CACHE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/ancien";
const paires = JSON.parse(readFileSync("/tmp/paires.json", "utf8"));
const ECRIRE = process.argv.includes("--ecrire");
const dormir = ms => new Promise(r => setTimeout(r, ms));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function pageAncienne(chemin) {
  const nom = `${CACHE}/${chemin.replace(/[^\w-]/g, "_")}.html`;
  if (existsSync(nom)) return readFileSync(nom, "utf8");
  const r = await fetch(`https://www.bluevistaprod.com${chemin}`, {
    headers: { "User-Agent": "Bluevista-migration/1.0 (récupération de nos propres contenus)" },
  });
  const t = r.ok ? await r.text() : "";
  writeFileSync(nom, t, "utf8");
  await dormir(700);
  return t;
}

/* ⚠️ On prend le PREMIER `datePublished` du document : le JSON-LD de WordPress
   décrit d'abord l'article, puis parfois l'organisation ou le fil d'Ariane. */
const datePubliee = html => {
  const m = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return m ? m[1].slice(0, 10) : null;
};

const fiches = await client.fetch(
  `*[_type=="realisation" && language=="fr"]{_id,"s":slug.current,titre,datePublication,_createdAt}`
);

/**
 * ⛔ QUATRE RÉALISATIONS SONT LE MÊME PROJET QU'UNE AUTRE. Le même film a été
 * importé deux fois sous deux titres — même vidéo Livid, même image, même
 * page d'origine. Elles ne peuvent donc pas porter l'ancienne adresse : deux
 * fiches ne peuvent pas revendiquer la même redirection 301. Mais elles
 * doivent quand même se ranger au bon endroit dans la galerie, sinon elles
 * remontent en tête faute de date.
 * 👉 On leur donne la date de leur jumelle. C'est la même date : c'est le
 * même projet. ⚠️ Cela ne les dédouble pas — leur sort revient à Giz.
 */
const JUMELLES = {
  "abb-snk-animation-3d-fiction-marine": "abb-bloc-jonction-snk-animation-3d-fiction-marine",
  "aravi-saison-2022-2023-reportages-video": "aravi-saison-2022",
  "elistair-orion-video-produit-animation-3d": "elistair-drone-orion-video-produit-en-animation-3d",
  "videomapping-les-aventures-de-toky-animation-3d": "toky-video-mapping-3d",
};

const bilan = { trouvees: 0, deja: 0, viaJumelle: 0, sansSource: [] };
const dates = {};
let tx = client.transaction();

for (const f of fiches) {
  const url = paires[f.s];
  if (!url) continue;
  const html = await pageAncienne(url);
  const d = html ? datePubliee(html) : null;
  if (!d) continue;
  dates[f.s] = d;
}

for (const f of fiches) {
  const d = dates[f.s] ?? dates[JUMELLES[f.s]] ?? null;
  if (!d) { bilan.sansSource.push(f.s); continue; }
  if (JUMELLES[f.s] && !dates[f.s]) bilan.viaJumelle++;
  else bilan.trouvees++;
  if (f.datePublication === d) { bilan.deja++; continue; }
  tx = tx.patch(f._id, p => p.set({ datePublication: d }));
}

const annees = {};
console.log(`  dates relevées : ${bilan.trouvees} · reprises de la jumelle : ${bilan.viaJumelle} · déjà bonnes : ${bilan.deja}`);
console.log(`  sans source (créées après la bascule, ou non appariées) : ${bilan.sansSource.length}`);
bilan.sansSource.forEach(s => console.log(`     ${s}`));

if (!ECRIRE) { console.log("\n  ⚠️ ESSAI À BLANC — relancer avec --ecrire"); process.exit(0); }
await tx.commit();
console.log("\n  ✅ ÉCRIT dans Sanity");
