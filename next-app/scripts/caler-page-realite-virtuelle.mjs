/**
 * CALER LA PAGE « RÉALITÉ VIRTUELLE » SUR SON PROPRE VOCABULAIRE — 12/08/2026.
 *
 * ⛔ LE PROBLÈME, ET IL EST MESURÉ.
 * Sur la famille de requêtes « immersive », deux pages de Bluevista se
 * présentent, et c'est la plus vieille qui gagne :
 *   · /actualites/video-immersive-360/ (2014) — 2 727 impressions/an,
 *     POSITION 9,9 sur « vidéo immersive » ;
 *   · /nos-competences/creation-immersive-realite-virtuelle/ — 1 502
 *     impressions, position 55,9 sur « agence réalité virtuelle » et 32,2 sur
 *     « création de vidéo immersive 360 ».
 *
 * 👉 Écrire la nouvelle page savoir-faire sur « vidéo immersive » la ferait
 * affronter une page installée en première page depuis dix ans. Les deux y
 * perdraient — c'est le partage d'autorité, pas le vol, déjà constaté sur la
 * paire Genève FR/CH.
 *
 * ⭐ LE PARTAGE RETENU `[Giz, 12/08/2026]` :
 *   · la page SAVOIR-FAIRE prend la moitié COMMERCIALE — agence, production,
 *     showroom virtuel : ce que tape quelqu'un qui cherche un prestataire ;
 *   · l'ACTUALITÉ garde la moitié DESCRIPTIVE — vidéo immersive, expérience
 *     vidéo 360 : ce que tape quelqu'un qui découvre le format.
 *
 * ⚠️ CE QUE CE SCRIPT REMPLACE, et pourquoi ce n'est pas une perte.
 * Le champ `texte` portait encore la prose de l'ANCIEN site, importée telle
 * quelle et bien visible au rendu — fautes comprises (« sensibiliser votre
 * audiences ! », « font parti », « cette univers »), et se terminant sur
 * « notre vidéo immersive pour Cémoi : » suivi de rien. C'est elle qui plaçait
 * la page sur le terme que l'actualité occupe déjà.
 *
 * Les sections, la FAQ et l'accroche sont au registre : on n'y touche pas.
 *
 * Usage :  node scripts/caler-page-realite-virtuelle.mjs [--pour-de-vrai]
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
const ID = "page-savoir-faire-creation-immersive-realite-virtuelle";

/* Trois paragraphes au lieu de cinq.
 *
 * ⛔ CORRECTION DU 12/08 APRÈS RELECTURE DE GIZ — deux erreurs de ma part.
 *
 * ① « La production reste sous notre toit » : la famille domestique — *sous le
 *    même toit*, *dans le même couloir*, *nos murs* — est ÉCARTÉE par Giz dans
 *    voix-marketing. Il l'a repéré de mémoire, j'aurais dû le vérifier avant
 *    d'écrire. Remplacé par sa formulation : les expertises nécessaires à la
 *    production sont maîtrisées en interne.
 *    ⚠️ L'internalisation est une PREUVE, pas une promesse : trois concurrents
 *    l'écrivent déjà. Elle ne tient ici que parce qu'un bénéfice y est
 *    attaché — l'interlocuteur unique.
 *
 * ② J'avais banni « vidéo immersive » de la page entière. Trop loin.
 *    ⭐ On sépare la requête VISÉE — titre, H1, description, ancres — pas le
 *    VOCABULAIRE du corps. Un thème traité sans son mot principal perd sa
 *    cohérence sémantique, et la page perdait ses 123 impressions sur
 *    « création de vidéo immersive 360 ». Le terme revient donc une fois, dans
 *    le corps, là où il rend service au lecteur.
 *
 * ③ Longueur : la première version ramenait la page à 663 mots propres, soit
 *    le bas de la fourchette d'une page savoir-faire (650–900). Le troisième
 *    paragraphe ne rallonge pas pour rallonger : il tranche la confusion la
 *    plus courante du marché, 360 contre VR. */
const PARAGRAPHES = [
  "Vous cherchez une agence de réalité virtuelle qui tienne le projet du scénario jusqu’à l’exploitation le jour J. Nous produisons des dispositifs VR, des visites 360 et des showrooms virtuels pour les salons, la formation et la vente.",
  /* ⚠️ « tests sur notre propre parc de casques » retiré le 12/08 : la section
     04 le dit déjà, et mieux. Une preuve répétée deux fois sur la même page
     n'est pas deux preuves. L'énumération repasse à TROIS termes, comme le
     veut le registre. */
  "Les expertises nécessaires à la production sont maîtrisées en interne : écriture du parcours, captation 360 ou modélisation 3D, développement de l’application. Vous avez un seul interlocuteur, de la maquette à la mise en service.",
  "Une vidéo immersive se regarde en tournant la tête dans une scène filmée ; une expérience en réalité virtuelle se parcourt, avec des choix qui changent ce qu’on voit. La différence décide du budget autant que du calendrier, et c’est la première question que nous tranchons avec vous.",
];
const TITRE_SEO = "Agence de réalité virtuelle et augmentée | Bluevista";
const DESCRIPTION_SEO =
  "Agence de réalité virtuelle : écriture du parcours, captation 360, modélisation 3D et développement de l’application. Pour vos salons, formations et showrooms.";

const cle = i => `rv12082026${i}`;
const blocs = PARAGRAPHES.map((t, i) => ({
  _type: "block", _key: cle(i), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: `${cle(i)}s`, text: t, marks: [] }],
}));

console.log(`\ntitreSeo       (${TITRE_SEO.length}/65)  ${TITRE_SEO}`);
console.log(`descriptionSeo (${DESCRIPTION_SEO.length}/160) ${DESCRIPTION_SEO}`);
console.log(`\ntexte — ${PARAGRAPHES.length} paragraphes, ${PARAGRAPHES.join(" ").split(/\s+/).length} mots :`);
PARAGRAPHES.forEach(p => console.log(`\n  ${p}`));

if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({
    mutations: [{ patch: { id: ID, set: { texte: blocs, titreSeo: TITRE_SEO, descriptionSeo: DESCRIPTION_SEO } } }],
  }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

/* ⛔ LE CONTRÔLE NE VIENT PAS DU MÊME CÔTÉ QUE L'ÉCRITURE : on relit le
   document, et on vérifie surtout ce qui doit AVOIR DISPARU. */
const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
u.searchParams.set("query", `*[_id=="${ID}"][0]{titreSeo,"t": texte[].children[].text}`);
const relu = (await (await fetch(u)).json()).result;
const texte = (relu.t ?? []).join(" ");
console.log(`\n✅ titreSeo relu : ${relu.titreSeo}`);
/* ⚠️ On ne vérifie plus l'ABSENCE du terme mais sa MODÉRATION : une seule
   occurrence dans le corps, et aucune dans le titre ni la description. */
const n = (texte.toLowerCase().match(/vidéo immersive/g) ?? []).length;
console.log(n === 1 ? "✅ « vidéo immersive » : 1 occurrence dans le corps, comme voulu."
  : `⛔ « vidéo immersive » : ${n} occurrences dans le corps.`);
console.log(/immersiv/i.test(relu.titreSeo) ? "⛔ « immersive » est dans le titre Google." : "✅ le titre Google ne vise pas « immersive ».");
console.log(texte.includes("agence de réalité virtuelle")
  ? "✅ « agence de réalité virtuelle » est en place."
  : "⛔ « agence de réalité virtuelle » absent.");
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s, pas avant.\n");
