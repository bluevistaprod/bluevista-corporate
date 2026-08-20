/**
 * L'INTRODUCTION DE LA PAGE DRONE PASSE À LA VOIX DU NOUVEAU SITE.
 *
 * ⛔ CE QUI PARTAIT : « plus personne ne vous prendra de haut ! », un jeu de
 * mots à point d'exclamation, et « Profitez de vos rencontres dans nos agence »
 * (faute au pluriel). Le reste énumérait des lieux et des adjectifs sans jamais
 * dire ce qu'une vue aérienne apporte.
 *
 * ⭐ CE QUI ARRIVE S'APPUIE SUR LES AJOUTS DE GIZ. Il avait complété lui-même
 * les prestations avec « Intérieur au drone léger » et « FPV pour plus de
 * dynamisme » — deux usages que l'introduction ne mentionnait nulle part et que
 * les quatre blocs ne couvrent pas non plus. Ils tiennent maintenant le
 * deuxième paragraphe.
 *
 * ⛔ ET ELLE NE REDIT PAS LES BLOCS. Le matériel doublé, l'échelle vue d'en
 * haut, les autorisations, le film de bâtiment : les quatre blocs les traitent
 * déjà, avec leur vidéo. L'ancienne intro d'aftermovie racontait trois cas que
 * les blocs reprenaient ensuite en mieux — on ne refait pas ça ici.
 *
 * ⚠️ AUCUN CHIFFRE INVENTÉ, et une seule affirmation vérifiable en plus : les
 * attestations fournies avec le devis, que la FAQ de la page annonce déjà.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ID = "page-savoir-faire-video-aerienne-drone";

let n = 0;
const para = t => ({
  _type: "block", _key: `dri${++n}`, style: "normal", markDefs: [],
  children: [{ _type: "span", _key: `drs${n}`, text: t, marks: [] }],
});

const TEXTE = [
  /* 1. Ce qu'une vue aérienne apporte — la phrase que l'ancienne n'avait pas. */
  "Une vue aérienne n’est pas un plan de plus : c’est souvent le seul qui montre l’ensemble. Une usine, un chantier, un rassemblement, un bâtiment dans ce qui l’entoure — depuis le sol, on les raconte ; depuis le ciel, on les voit. Nous filmons au drone à Lyon, à Paris et à Genève, en ville comme en zone rurale.",

  /* 2. ⭐ Les deux usages ajoutés par Giz, développés. Aucun bloc ne les traite. */
  "Le drone ne sert pas qu’à monter haut. En intérieur, un appareil léger traverse un atelier ou une halle d’un seul mouvement, là où il faudrait poser des rails. En FPV, il descend une façade ou suit une machine à une vitesse qu’aucune caméra portée ne tient. Ce sont deux usages qu’on associe rarement au drone.",

  /* 3. La double compétence, qui était dans l'ancien texte mais sans son « donc ». */
  "Nos pilotes sont aussi des cadreurs. C’est ce qui fait qu’un plan aérien raconte quelque chose au lieu de survoler : le drone va où le film en a besoin, pas seulement où la machine sait aller.",

  /* 4. Le cadre légal en une ligne — le bloc 03 le détaille, on ne le refait pas. */
  "Nos télépilotes sont déclarés et nos scénarios autorisés, en France comme en Suisse. Les attestations partent avec le devis, sans qu’il faille les demander.",
].map(para);

/* ⚠️ Sauvegarde avant écriture : c'est la seule trace de ce que la page disait. */
const avant = await client.fetch(`*[_id==$i][0].texte`, { i: ID });
const { writeFileSync } = await import("node:fs");
writeFileSync(new URL("./_ancien-texte-drone.json", import.meta.url).pathname, JSON.stringify(avant, null, 2));

/* ⛔ ON N'ÉCRIT QUE `texte`. Giz édite la même page dans Sanity : toucher le
   document entier écraserait ses corrections en cours sans qu'elles laissent
   de trace. Un patch sur un seul champ laisse tout le reste intact. */
await client.patch(ID).set({ texte: TEXTE }).commit();
console.log(`✅ Introduction drone réécrite : ${TEXTE.length} paragraphes (l’ancien texte est sauvegardé à côté).`);
