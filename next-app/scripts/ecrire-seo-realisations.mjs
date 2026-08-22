/**
 * LES TITRES ET DESCRIPTIONS SEO DES RÉALISATIONS — 22/08/2026.
 *
 * ⛔⛔ POURQUOI CE CHANTIER EXISTE. Les 147 réalisations sortaient sans titre
 * ni description propres : elles héritaient TOUTES du titre par défaut du
 * site. Google voyait 147 pages au titre identique sur le plus gros actif de
 * contenu — celui que 141 redirections visent le 4 septembre. Aucune erreur,
 * aucune page cassée : juste des balises vides.
 *
 * ⛔ CES TEXTES SONT ÉCRITS UN PAR UN, PAS FABRIQUÉS PAR GABARIT. Un patron
 * du genre « <client> — <produit> vidéo » donnerait 147 titres jumeaux, ce
 * qui reproduit exactement le défaut qu'on corrige. Chaque titre est lu dans
 * le texte de la réalisation.
 *
 * ⚠️ AUCUN CHIFFRE INVENTÉ. Tout ce qui est chiffré ici vient du texte de la
 * réalisation elle-même. Une description SEO est du contenu public comme un
 * autre : la règle « rien d'estimé » s'y applique.
 *
 * ⚠️ LE SUFFIXE « | Bluevista » EST DANS LE TEXTE, et la page le détecte pour
 * poser `absolute` — sinon le gabarit du layout l'ajoute une seconde fois et
 * les fiches sortent en « … | Bluevista | Bluevista ».
 *
 *   node scripts/ecrire-seo-realisations.mjs <lot.json> [--ecrire]
 */
import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const lot = JSON.parse(readFileSync(process.argv[2], "utf8"));
const ecrire = process.argv.includes("--ecrire");

/* ⚠️ Les bornes ne sont pas décoratives. Au-delà, Google recompose le titre
   lui-même : le travail d'écriture est alors perdu, silencieusement. */
let alertes = 0;
for (const [slug, [t, d]] of Object.entries(lot)) {
  if (t.length > 68) { console.log(`  ⚠️ titre ${t.length} car. — ${slug}`); alertes++; }
  if (d.length > 160) { console.log(`  ⚠️ desc  ${d.length} car. — ${slug}`); alertes++; }
  if (d.length < 110) { console.log(`  ⚠️ desc courte ${d.length} — ${slug}`); alertes++; }
  if (!/\|\s*Bluevista$/.test(t)) { console.log(`  ⛔ suffixe absent — ${slug}`); alertes++; }
}

if (!ecrire) {
  console.log(`\n  ${Object.keys(lot).length} fiches · ${alertes} alertes · (essai — ajouter --ecrire)`);
  process.exit(0);
}

let tx = client.transaction();
for (const [slug, [titreSeo, descriptionSeo]] of Object.entries(lot)) {
  tx = tx.patch(`realisation-${slug}`, p => p.set({ titreSeo, descriptionSeo }));
}
await tx.commit();
console.log(`\n  ✅ ${Object.keys(lot).length} fiches écrites · ${alertes} alertes`);
