/**
 * L'INTRODUCTION DE LA PAGE AFTERMOVIE PASSE À LA VOIX DU NOUVEAU SITE.
 *
 * ⛔ C'ÉTAIT LA SEULE DES NEUF RESTÉE EN L'ÉTAT. Les blocs en dessous avaient
 * été réécrits ; l'introduction, elle, était encore le texte de l'ancien site —
 * « Chez Bluevista, nous accompagnons une multitude d'entreprise… », avec deux
 * fautes (« entreprise » au singulier, « maitrisons » sans accent) et quatre
 * points d'exclamation. Le contraste avec les blocs se voyait à l'écran.
 *
 * ⛔ ET SURTOUT : L'ANCIENNE INTRO RACONTAIT DÉJÀ KOESIO, VALRHONA ET CROUZET —
 * les trois cas que les blocs développent juste en dessous, avec leur vidéo.
 * Le lecteur lisait deux fois la même chose, la seconde en mieux. La nouvelle
 * introduction pose le cadre et laisse les cas aux blocs.
 *
 * ⚠️ AUCUN CHIFFRE INVENTÉ. Ni nombre d'événements, ni nombre de pays. Seul
 * « depuis 2004 » est admis, et il est vrai.
 * ⚠️ « Partout dans le monde » est tombé : c'est une promesse, pas un fait.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

let n = 0;
const para = texte => ({
  _type: "block",
  _key: `intro${++n}`,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `s${n}`, text: texte, marks: [] }],
});

const TEXTE = [
  /* 1. Ce que le film change, dit sans emphase. */
  "Un événement se prépare pendant des mois et se joue en une journée. Le filmer, c’est ce qui lui donne une suite : un aftermovie qui circule, des interventions en replay, des formats courts pour les réseaux. Nous prenons en charge la captation multicaméra, le montage et la livraison, à Lyon, à Paris ou à Genève.",

  /* 2. Le vrai sujet : le format n'est pas donné d'avance. */
  "Un aftermovie n’est pas un format unique. Selon ce que l’événement doit laisser derrière lui, il tient en quarante secondes ou en huit minutes, se monte pendant la soirée ou dans les jours qui suivent, se livre en un film ou en une série d’extraits. C’est cette décision-là qu’on prend avec vous, avant de poser la première caméra.",

  /* 3. Le dispositif suit l'événement — et ça se dit contre l'usage inverse. */
  "Le dispositif suit l’événement, jamais l’inverse. Une remise de prix devant cent personnes ne demande pas la même équipe qu’une convention qui en réunit plusieurs milliers, et gonfler le dispositif ne rend pas le film meilleur. Le nombre de caméras, la régie et l’équipe se calent sur le déroulé réel.",

  /* 4. La passerelle vers les cas, qui remplace « les mots ont leurs limites ». */
  "Depuis 2004, nous filmons des conventions d’entreprise, des festivals, des anniversaires de sociétés, des inaugurations et des congrès. Quelques exemples, plutôt que des promesses : ils sont juste en dessous.",
].map(para);

const ID = "page-savoir-faire-aftermovie-captation-evenementielle";

/* ⚠️ On sauvegarde l'ancien texte avant de l'écraser. Il n'est pas bon, mais
   il est la seule trace de ce que la page disait — et une réécriture qui ne
   plaît pas doit pouvoir être annulée sans rouvrir l'ancien site. */
const avant = await client.fetch(`*[_id==$i][0].texte`, { i: ID });
const { writeFileSync } = await import("node:fs");
writeFileSync(
  new URL("./_ancien-texte-aftermovie.json", import.meta.url).pathname,
  JSON.stringify(avant, null, 2)
);

await client.patch(ID).set({ texte: TEXTE }).commit();
console.log(`✅ Introduction réécrite : ${TEXTE.length} paragraphes (l’ancien texte est sauvegardé à côté).`);
