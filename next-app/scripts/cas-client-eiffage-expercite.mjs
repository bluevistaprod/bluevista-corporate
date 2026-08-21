/**
 * LE CAS CLIENT EIFFAGE EXPERCITÉ — actualité + bloc de page d'accueil.
 * Demande de Giz, 20/08/2026.
 *
 * ⛔⛔ LE CHIFFRE A FAILLI ÊTRE FAUX, DEUX FOIS.
 *
 * 1. Giz a dit « expliquer un concept ultra complexe en 2 minutes ». Le film
 *    dure **1 min 21**, vérifié sur Livid ET sur le master Dropbox (80 s).
 *    « 2 minutes » serait passé inaperçu de tout le monde et aurait été faux.
 *    On garde la vraie durée — et elle est plus forte.
 *
 * 2. Aucun chiffre ne mesure ce que le film a rapporté : ni audience, ni
 *    rendez-vous comptés, ni affaire signée. Le site du client ne publie même
 *    pas ses propres volumes. J'ai donc demandé plutôt que d'inventer, et Giz
 *    a donné le fait vérifiable : le film sert d'introduction commerciale et
 *    déclenche des rendez-vous.
 *
 * ⭐ ET LA VRAIE PREUVE : « le film a tellement bien marché qu'il a été
 * décliné en une version 2 ». Un client qui recommande le même travail est
 * l'indicateur le moins contestable qui soit — il ne demande à personne de
 * nous croire.
 *
 * ⛔ J'AVAIS DÉSIGNÉ LE MAUVAIS FILM. J'ai proposé « Le biomimétisme au
 * service de nos constructions » parce que c'était le seul autre Eiffage que
 * ma recherche trouvait. Giz : « non, biomimétisme est un autre ». Le bon est
 * « Expercité énergie / route » (1 min 22).
 * 👉 POURQUOI JE NE L'AVAIS PAS TROUVÉ : la recherche Livid ne porte que sur
 * les TITRES, et celui-ci ne contient pas le mot « Eiffage ». Ma propre
 * documentation d'API le dit noir sur blanc — et je m'y suis fait prendre
 * quand même. Chercher un client par son nom ne suffit pas : il faut ouvrir
 * son DOSSIER.
 *
 * ⚠️ CE QUE JE N'AFFIRME PAS : l'ordre des deux films. Le second porte
 * « 2017 » dans son titre, le master du premier est daté de 2018 côté
 * fichiers. Lequel a précédé l'autre n'est pas établi, donc le texte dit
 * « un second film » sans prétendre dater la suite.
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const RACINE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/h8/eif";

async function televerser(fichier, nom) {
  const a = await client.assets.upload("image", readFileSync(`${RACINE}/${fichier}`), { filename: nom });
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
}

let n = 0;
const cle = () => `e${++n}`;
const para = t => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: cle(), text: t, marks: [] }],
});

/**
 * Un paragraphe avec du GRAS, écrit en morceaux.
 * ⭐ Il sert à retrouver un chiffre ou une bascule en balayant l'article —
 * pas à insister. Giz, 20/08 : « tu as moyen d'avoir un peu de corps dans le
 * texte ». Le rendu ne l'affichait pas ; c'est corrigé dans TexteRiche.
 */
const paraGras = (...morceaux) => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: morceaux.map(m =>
    typeof m === "string"
      ? { _type: "span", _key: cle(), text: m, marks: [] }
      : { _type: "span", _key: cle(), text: m.g, marks: ["strong"] }
  ),
});

console.log("Téléversement des images extraites du film…");
const objets = await televerser("e15.jpg", "expercite-objets-connectes.jpg");
const vue3d = await televerser("e30.jpg", "expercite-vue-3d-reseaux.jpg");
const nuit = await televerser("e47.jpg", "expercite-eclairage-nuit.jpg");
const ecrans = await televerser("e63.jpg", "expercite-supervision.jpg");
const v2 = await televerser("v2.jpg", "expercite-energie-route.jpg");

/* ── L'actualité ─────────────────────────────────────────────────────────
   ⚠️ Format « actualité » et non « réalisation » : décision de Giz. Une
   réalisation montre un film ; un cas client raconte un problème et ce qu'il
   est devenu. Le gabarit d'actualité porte les deux — texte long et médias. */
const SLUG = "eiffage-expercite-rendre-visible-une-ville-connectee";

const blocs = [{
  _type: "bloc",
  _key: cle(),
  paragraphes: [
    para("Expercité est la marque d’Eiffage Énergie Systèmes dédiée aux villes et aux collectivités. Derrière ce nom, il y a une plateforme qui relie ce qui, dans une ville, est déjà connecté sans que personne ne le voie : l’éclairage public, les feux, les radars pédagogiques, le mobilier urbain, la vidéoprotection, les bornes de recharge, les réseaux gaz et haut débit."),
    paraGras("Le problème n’était pas commercial, il était ", { g: "pédagogique" }, ". Un maire ou un directeur des services techniques ne se représente pas ce qu’est une hypervision urbaine tant qu’il ne l’a pas vue. Et expliquer quatre familles de métiers — cadre de vie, mobilité, sûreté, territoires connectés — demandait un technicien, un rendez-vous, et un vocabulaire que l’interlocuteur n’a pas."),
    paraGras("Le film devait donc faire une chose précise : ", { g: "poser le concept avant que la conversation commence" }, "."),
  ],
  medias: [{
    /* ⭐ LE FILM LUI-MÊME EN OUVERTURE. Un cas client qui parle d'un film sans
       le montrer demande au lecteur de croire sur parole. */
    _key: cle(), _type: "media",
    videoUrl: "https://livid.com/watch/W4vO1ka_A_z-",
    videoAffiche: objets,
    legende: "Expercité — le film de présentation",
    sousLegende: "1 min 30",
  }],
}, {
  _type: "bloc",
  _key: cle(),
  titre: "Montrer les fils que personne ne voit",
  paragraphes: [
    para("Le parti pris a été de rendre le réseau visible. Le film part de plans réels de la ville et fait apparaître, par-dessus, ce qui la traverse : les liaisons se dessinent en lumière entre les points, les objets s’allument un par un et se nomment eux-mêmes. Ce qui était une abstraction devient une carte."),
    para("Trois techniques travaillent ensemble : le tournage en timelapse pour l’échelle et le passage du jour à la nuit, l’animation 3D pour les vues aériennes de la commune, et le motion design pour l’habillage qui nomme chaque élément. Le scénario, le concept visuel et l’ensemble des images ont été écrits et fabriqués par nos équipes, à partir des caractéristiques de l’offre."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: vue3d, legende: "Les réseaux dessinés en 3D au-dessus de la commune réelle" },
    { _key: cle(), _type: "media", image: nuit, legende: "La nuit, le réseau d’éclairage public apparaît seul" },
  ],
}, {
  _type: "bloc",
  _key: cle(),
  titre: "Un service compris en 1 min 30",
  paragraphes: [
    paraGras("Le film dure ", { g: "une minute et demie" }, ". C’est le temps dont dispose Expercité, en rendez-vous, pour faire comprendre ce qu’est une ville pilotée depuis un tableau de bord — et il se termine sur ce tableau de bord, écrans allumés, opérateur au clavier."),
    para("Il ne remplace pas le commercial : il le précède. Il pose le concept, écarte le malentendu, et laisse la conversation commencer là où elle s’arrêtait avant. C’est à cet endroit précis qu’un film de présentation gagne son coût."),
  ],
  medias: [{
    _key: cle(), _type: "media", image: ecrans, legende: "Le film se termine sur la supervision : ce qui était abstrait devient un poste de travail",
  }],
}, {
  _type: "bloc",
  _key: cle(),
  titre: "Ce qui s’est passé ensuite",
  paragraphes: [
    /* ⭐ LA PREUVE, ET ELLE EST FACTUELLE. Pas « le client était content » :
       un second film commandé. C'est vérifiable dans le catalogue. */
    para("Le principe a été décliné une seconde fois pour Expercité, sur le volet énergie et voirie : une commune entière reconstruite en 3D, parcourue par le même vocabulaire de pastilles qui nomment ce qu’elles désignent — un défibrillateur, un point lumineux, un équipement de route. Même durée, même grammaire visuelle."),
    /* ⚠️ Version subtile, demandée par Giz : « écrit, ça sonne un peu
       présomptueux ». On rapporte le fait et on laisse le lecteur en tirer sa
       conclusion, au lieu de la lui annoncer. */
    para("Nous n’avons pas de chiffre d’audience à mettre en face de ce film. Ce qu’on peut dire, c’est qu’il y en a eu un second."),
  ],
  medias: [{
    _key: cle(), _type: "media",
    videoUrl: "https://livid.com/watch/QBeSowrEBR3d",
    videoAffiche: v2,
    legende: "Expercité énergie et voirie — le second film",
    sousLegende: "1 min 30",
  }],
}];

const doc = {
  _type: "actualite",
  _id: `actualite-${SLUG}`,
  titre: "Eiffage Expercité : rendre visible une ville connectée",
  slug: { _type: "slug", current: SLUG },
  language: "fr",
  chapo: [para("Comment expliquer en une minute une plateforme qui pilote l’éclairage, les feux, la vidéoprotection et les réseaux d’une commune entière ? En montrant les fils que personne ne voit.")],
  blocs,
  /* ⛔ LE CHAMP DE COUVERTURE S'APPELLE `imageEntete`, PAS `image`. J'avais
     rempli `image`, qui n'existe pas sur ce type : l'article sortait donc sans
     hero, sans que rien ne le signale. */
  imageEntete: objets,
  client: "Eiffage Énergie Systèmes",
  clientUrl: "https://www.expercite.com",
  /* ⚠️ La date de PUBLICATION de ce cas client, pas celle du film (2018-2019).
     Sans elle, la page affichait « 1 janvier 1970 ». */
  datePublication: "2026-08-20",
  titreSeo: "Eiffage Expercité — film de présentation d’une ville connectée | Bluevista",
  descriptionSeo:
    "Timelapse, animation 3D et motion design pour expliquer Expercité, la plateforme de gestion urbaine d’Eiffage Énergie Systèmes. Un concept complexe rendu lisible en une minute et demie.",
  /* ⛔ Signale que le texte est de moi et attend la relecture de Giz. */
  aRelire: true,
};

const existe = await client.fetch(`*[_id==$i][0]._id`, { i: doc._id });
await client.createOrReplace(doc);
console.log(`${existe ? "♻️ remplacée" : "✅ créée"} : /actualites/${SLUG}/`);
console.log(`   ${blocs.length} blocs, 4 images extraites du master.`);
