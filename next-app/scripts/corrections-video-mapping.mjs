/**
 * LES CORRECTIONS DE GIZ SUR LA PAGE VIDÉO MAPPING — 19/08/2026.
 *
 * ⚠️ CHAQUE REMPLACEMENT TIENT DANS UN FRAGMENT, JAMAIS DANS UNE PHRASE.
 * Le texte est stocké en spans : une règle écrite comme une phrase entière ne
 * trouve rien et ne le dit pas. Leçon d'hier, appliquée d'emblée.
 *
 * ⭐ CE QUE LES CORRECTIONS DISENT EN COMMUN, ET C'EST INSTRUCTIF :
 *   · ne pas se dévaloriser — « sans revoir à la baisse » devient « avec la
 *     même exigence » ;
 *   · nommer qui a dirigé — un mapping produit sous la direction d'une agence
 *     se dit, sinon on s'attribue le pilotage ;
 *   · ne pas énoncer d'évidence — « il se tourne le même soir, pas après » ;
 *   · ne pas donner un chiffre faux par prudence — un mapping peut durer
 *     quinze minutes, pas cinq.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const REMPLACEMENTS = [
  // ① Le haut de page : ne pas se dévaloriser.
  ["sans revoir aucune de ces prestations à la baisse",
   "avec toujours la même exigence de qualité pour chacune de ces prestations"],

  // ② Nommer qui a dirigé. Bluevista a produit, l'agence a dirigé.
  ["Pour l’ouverture de l’InterContinental de Lyon, nous avons produit deux mappings",
   "Pour l’ouverture de l’InterContinental de Lyon, sous la direction de l’agence TETRO, nous avons produit deux mappings"],
  ["pour les quarante ans de ", "sous la direction de l’agence Thera Conseil, pour les quarante ans de "],

  // ③ Filmer, pas tourner. Et couper ce qui n'apporte rien.
  ["une seconde équipe tournait pendant que les projections tournaient",
   "une seconde équipe filmait pendant que les projections tournaient"],
  [", les deux mappings vus depuis la salle", ", les deux mappings"],
  ["C’est aussi ce qui distingue une chaîne complète d’une prestation de projection : le film du mapping et le film de l’événement sont fabriqués par la même équipe, avec le même calage, et personne n’attend l’autre.",
   "Une seule équipe fabrique le mapping et le film de la soirée. Vous n’avez qu’un interlocuteur, et les deux livraisons arrivent ensemble."],

  // ⑤ La durée réelle d'un mapping.
  ["Un mapping tient trois à cinq minutes devant un public debout",
   "Un mapping tient cinq à quinze minutes devant un public debout"],
  ["Trois à cinq minutes devant un public debout", "Cinq à quinze minutes devant un public debout"],

  // ⑦ Ne pas énoncer une évidence.
  [" — c’est souvent lui qui touche le plus de monde, et il se tourne le même soir, pas après.",
   " — c’est souvent lui qui touche le plus de monde."],

  // Les usages : pas de durée trop courte.
  ["Une projection tient trois minutes et se regarde debout",
   "Une projection dure quelques minutes et se regarde debout"],

  // La FAQ : retirer la mention des Bâtiments de France.
  ["L’autorisation dépend du propriétaire et de l’architecte des Bâtiments de France, et se demande plusieurs semaines à l’avance.",
   "L’autorisation dépend du propriétaire du bâtiment, et se demande plusieurs semaines à l’avance."],
  ["dépend du propriétaire et de l’architecte des Bâtiments de France",
   "dépend du propriétaire du bâtiment"],
];

const applique = t => REMPLACEMENTS.reduce((s, [de, vers]) => s.split(de).join(vers), t);

let touchees = 0;
function reecrire(v) {
  if (typeof v === "string") { const n = applique(v); if (n !== v) touchees++; return n; }
  if (Array.isArray(v)) return v.map(reecrire);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, reecrire(x)]));
  return v;
}

const doc = await client.fetch(
  `*[_type=="page" && language=="fr" && slug.current=="video-mapping"][0]{_id, texte, blocs, faq, sections}`
);

const patch = {
  texte: reecrire(doc.texte),
  blocs: reecrire(doc.blocs),
  ...(doc.faq ? { faq: reecrire(doc.faq) } : {}),
  ...(doc.sections ? { sections: reecrire(doc.sections) } : {}),
};

/* ⭐ L'IMAGE DU BLOC « RELEVÉ » — Giz : « l'image n'est pas une vidéo […] on
   ne comprend pas ce que c'est […] mets une image où on voit une
   architecture ». Elle portait « Toky2 » : une figurine dorée minuscule dans
   un cadre noir. Remplacée par l'intérieur du dôme du Grand Hôtel-Dieu, où
   les caissons, les moulures et la voûte se lisent SOUS la projection —
   c'est exactement ce que le texte raconte. */
const DOME = "image-a8bc7cda07b08483b2c1230a81ece15466139ddf-1920x1080-jpg";
patch.blocs = patch.blocs.map(b =>
  b.titre === "Un mapping se prépare sur un relevé, pas sur une photo"
    ? { ...b, image: { _type: "image", asset: { _type: "reference", _ref: DOME } } }
    : b
);

await client.patch(doc._id).set(patch).commit();
console.log(`⭐ ${touchees} fragment(s) de texte corrigé(s), plus l'image du bloc « relevé ».`);

/* On dit ce qui n'a PAS été trouvé : un remplacement qui ne s'applique pas
   est un silence, et un silence ressemble à un succès. */
const tout = JSON.stringify([doc.texte, doc.blocs, doc.faq, doc.sections]);
for (const [de] of REMPLACEMENTS) {
  if (!tout.includes(de.replace(/"/g, '\\"'))) console.log(`   ⚠️ introuvable : « ${de.slice(0, 62)}… »`);
}
