/**
 * LE BLOC « USAGES » DE LA PAGE LIVE STREAMING — la neuvième et dernière.
 *
 * ⛔⛔ CINQ SITUATIONS, ET QUATRE LIENS SUR CINQ SORTENT DU PORTFOLIO.
 * Cherché largement : produit « streaming », titres contenant live, direct,
 * web TV, convention, hybride. Une seule RÉALISATION est un vrai direct —
 * la convention Huawei, « tournage et montage sur le vif ». Les quatre autres
 * fiches classées « streaming » étaient mal rangées, et viennent d'être
 * reclassées.
 * 👉 Les vraies références de direct sont trois ACTUALITÉS. Sur une page qui
 * vend le direct, il n'y a presque rien à montrer — et c'est une information
 * commerciale, pas seulement un problème de page.
 *
 * ⚠️ CINQ ET NON SIX, comme le fond vert en a quatre. Une page honnête à cinq
 * vaut mieux qu'une page à six dont une ment.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ENTREES = [
  ["Diffuser une conférence à ceux qui n’ont pas pu venir",
   "Le second public a besoin de plans plus serrés, d’un son propre et de temps morts plus courts. Ce n’est pas la captation de la salle qu’on lui envoie.",
   "HomeServe — 20 ans", "/actualites/live-video-homeserve-20ans/"],
  ["Couvrir une convention pendant qu’elle se déroule",
   "Deux jours montés sur le vif, diffusés pendant l’événement plutôt que trois semaines après, quand plus personne n’y pense.",
   "Convention Huawei", "/realisations/convention-huawei-video-event/"],
  ["Tenir une web TV sur plusieurs émissions",
   "Un plateau qui revient, un habillage qui reste, une équipe qui connaît le déroulé : la série coûte moins cher que la somme des directs.",
   "GETLIVE TV", "/actualites/getlive-tv-3-0-la-wbe-tv-selon-bluevista/"],
  ["Servir deux publics à la fois",
   "Celui de la salle et celui de la maison ne suivent pas le même événement. C’est pour ça qu’on écrit la diffusion avant, et pas après.",
   "Streaming live & web TV", "/actualites/streaming-live-et-webtv-demo-2018/"],
  ["Tirer le replay et les extraits du direct",
   "L’enregistrement local sert de master, en qualité supérieure à ce qui a été diffusé. L’événement continue d’exister pour ceux qui n’y étaient pas.",
   "Koesio Convention 2024", "/realisations/koesio-convention-2024/"],
];

const reals = ENTREES.filter(e => e[3].startsWith("/realisations/")).map(e => e[3].replace(/^\/realisations\/|\/$/g, ""));
const actus = ENTREES.filter(e => e[3].startsWith("/actualites/")).map(e => e[3].replace(/^\/actualites\/|\/$/g, ""));
const okR = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: reals });
const okA = await client.fetch(`*[_type=="actualite" && language=="fr" && slug.current in $s].slug.current`, { s: actus });
const manque = [...reals.filter(x => !okR.includes(x)), ...actus.filter(x => !okA.includes(x))];
if (manque.length) { console.log(`⛔ cibles absentes → ${manque.join(", ")}`); process.exit(1); }

const doc = await client.fetch(`*[_type=="page" && language=="fr" && slug.current=="live-streaming-webtv"][0]{_id, blocs}`);
const usages = {
  _type: "blocUsages", _key: "usages-live-streaming",
  surTitre: "Où ça sert",
  titre: "Cinq situations où le direct change tout",
  entrees: ENTREES.map(([titre, texte, lienLibelle, lien], i) => ({ _key: `u${i}`, titre, texte, lienLibelle, lien })),
};
const blocs = (doc.blocs ?? []).filter(b => b._type !== "blocUsages");
const i = blocs.findIndex(b => b._type === "blocQuestions");
blocs.splice(i >= 0 ? i : blocs.length, 0, usages);
await client.patch(doc._id).set({ blocs }).commit();
console.log(`✅ live-streaming-webtv : ${ENTREES.length} situations, ${blocs.length} blocs`);
console.log(`   ${okR.length} réalisation(s) et ${okA.length} actualité(s) vérifiées.`);
