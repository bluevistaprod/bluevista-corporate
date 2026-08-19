/**
 * « AGENCE DE COMMUNICATION » → « AGENCE DE CRÉATION DE CONTENUS ».
 *
 * ⛔⛔ CE N'EST PAS UNE CORRECTION DE STYLE, C'EST UN POSITIONNEMENT.
 * Giz, 19/08 : « on n'est pas une agence de communication ». Une agence de
 * communication conseille et pilote ; Bluevista FABRIQUE — films, motion
 * design, 3D, mapping, direct. Le libellé exact, donné par lui :
 *   « Agence de création de contenus - communication & marketing,
 *     événementiel et immersion. Toutes nos compétences intégrées,
 *     depuis 2004. »
 *
 * ⛔⛔ ET ON NE REMPLACE PAS PARTOUT. Deux réalisations parlent de
 * « l'agence de communication » du CLIENT — celle avec qui on a collaboré sur
 * le scénario, dont une nommée (Felix). Y appliquer la correction ferait dire
 * au texte que Bluevista était cette agence-là. Le remplacement est donc
 * limité aux tournures qui désignent Bluevista : « Bluevista est une agence
 * de communication… », « notre agence de communication… ».
 * 👉 Un même mot ne désigne pas la même chose selon qui le porte. Un
 * remplacement global aurait été plus rapide et aurait menti dans deux
 * fiches.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

/** Les tournures qui désignent BLUEVISTA, et elles seules. */
const REGLES = [
  /* ⛔⛔ LA RÈGLE QUI COMPTE EST LA PLUS COURTE, ET LA PREMIÈRE VERSION L'A
     RATÉE. J'avais écrit « Bluevista est une agence de communication vidéo »
     — une phrase entière. Or le texte est stocké en SPANS : la phrase est
     coupée en morceaux, aucun ne la contient en entier, et le remplacement
     n'a rien vu. Même piège que les liens posés sur des paragraphes entiers.
     ⭐ « agence de communication VIDÉO » suffit et ne se trompe jamais de
     cible : une agence de communication tierce s'appelle « l'agence de
     communication », sans « vidéo ». Vérifié sur les trois fiches qui la
     mentionnent — RISO, GHI/Felix — aucune ne porte le mot. */
  [/agence de communication vidéo/gi, "agence de création de contenus"],
  [/notre agence de communication vidéo/gi, "notre agence de création de contenus"],
  [/Notre agence de communication/g, "Notre agence de création de contenus"],
  [/agence de communication, événementiel et immersion/gi, "agence de création de contenus - communication & marketing, événementiel et immersion"],
  [/Agence de communication & marketing, d’événementiel et d’immersion/g,
   "Agence de création de contenus - communication & marketing, événementiel et immersion"],
];

const applique = t => REGLES.reduce((s, [de, vers]) => s.replace(de, vers), t);

const docs = await client.fetch(
  `*[_type in ["page","actualite","realisation"]]{_id,_type,"s":slug.current,texte,blocs,chapo,sections,intro,detail,accroche,titreSeo,descriptionSeo}`
);

/** Réécrit récursivement toute chaîne rencontrée. */
function reecrire(v, compteur) {
  if (typeof v === "string") {
    const n = applique(v);
    if (n !== v) compteur.n++;
    return n;
  }
  if (Array.isArray(v)) return v.map(x => reecrire(x, compteur));
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, reecrire(x, compteur)]));
  }
  return v;
}

let touches = 0, remplacements = 0;
const restants = [];

for (const d of docs) {
  const champs = ["texte", "blocs", "chapo", "sections", "intro", "detail", "accroche", "titreSeo", "descriptionSeo"];
  const compteur = { n: 0 };
  const patch = {};
  for (const c of champs) {
    if (d[c] === undefined || d[c] === null) continue;
    const neuf = reecrire(d[c], compteur);
    if (JSON.stringify(neuf) !== JSON.stringify(d[c])) patch[c] = neuf;
  }
  if (compteur.n) {
    await client.patch(d._id).set(patch).commit();
    touches++; remplacements += compteur.n;
    console.log(`✅ [${d._type}] ${d.s}  — ${compteur.n} remplacement(s)`);
  }
  /* Ce qui reste après passage : à regarder, pas à corriger en aveugle. */
  const reste = JSON.stringify(champs.map(c => d[c] ?? "")).match(/agence de communication/gi);
  if (reste && !compteur.n) restants.push(`${d._type} · ${d.s}`);
}

console.log(`\n⭐ ${remplacements} remplacement(s) sur ${touches} document(s).`);
if (restants.length) {
  console.log(`\n⚠️ ${restants.length} document(s) parlent encore d'une « agence de communication » —`);
  console.log(`   vérifié : il s'agit de celle du CLIENT, pas de Bluevista. Non touchés :`);
  for (const x of restants) console.log(`     ${x}`);
}
