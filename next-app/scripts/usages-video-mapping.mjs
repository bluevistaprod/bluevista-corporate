/**
 * LE BLOC « USAGES » DE LA PAGE VIDÉO MAPPING — validé en maquette le 18/08.
 *
 * ⭐ CE QU'IL APPORTE, ET C'EST TRIPLE :
 *   · l'ALTERNANCE — c'est le premier bloc sombre de la page, qui n'avait que
 *     du beige et un peu de clair ;
 *   · le MAILLAGE — six liens vers des réalisations, dans la zone la plus
 *     dense de la page en autorité transmise pour la place occupée ;
 *   · la VENTE — six situations concrètes plutôt qu'une compétence abstraite.
 *
 * ⛔ LES SIX LIENS POINTENT SUR DES RÉALISATIONS QUI EXISTENT, vérifiées dans
 * Sanity avant d'écrire. Un usage qui renvoie vers une fiche absente serait
 * pire que pas d'usage du tout.
 *
 * ⚠️ Il se place AVANT les questions fréquentes : les usages font partie de
 * l'argumentaire, les questions viennent quand la décision est presque prise.
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
  ["Inaugurer un bâtiment",
   "Le lieu qu’on inaugure devient l’objet du spectacle. La projection se règle sur son architecture réelle, corniches comprises.",
   "InterContinental Lyon", "/realisations/tetro-video-fete-des-lumieres-lyon-2022/"],
  ["Annoncer un changement de marque",
   "Changer d’identité, pour un commerce, c’est changer ce que les gens voient depuis la rue. La façade porte l’annonce.",
   "Printemps de Lyon", "/realisations/printemps-video-mapping/"],
  ["Fêter un anniversaire d’entreprise",
   "Quarante ans se racontent mal en discours. Une projection tient trois minutes et se regarde debout, verre à la main.",
   "40 ans de Siparex", "/realisations/40-ans-siparex-videomapping/"],
  ["Habiller une soirée de gala",
   "Sur une table de banquet ou une maquette, le même principe joue à petite échelle — sans écran ni casque, sous les yeux des convives.",
   "Artcurial", "/realisations/artcurial-video-mapping/"],
  ["Lancer un produit devant un public",
   "La projection habille l’objet lui-même. La voiture n’est plus posée sur un stand : elle est dessinée par la lumière.",
   "Audi A8", "/realisations/video-mapping-vehicule-audi-a8/"],
  ["Participer à une fête des lumières",
   "Un rendez-vous public impose des contraintes que l’événement privé ignore : flux de visiteurs, sécurité, éclairage urbain à négocier.",
   "Fête des Lumières", "/realisations/tetro-video-fete-des-lumieres-lyon-2021/"],
];

const doc = await client.fetch(
  `*[_type=="page" && language=="fr" && slug.current=="video-mapping"][0]{_id, blocs}`
);

/* ⛔ Les cibles sont vérifiées, pas supposées. */
const cibles = ENTREES.map(e => e[3].replace(/^\/realisations\/|\/$/g, ""));
const trouvees = await client.fetch(
  `*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: cibles }
);
const absentes = cibles.filter(c => !trouvees.includes(c));
if (absentes.length) { console.log("⛔ réalisations absentes :", absentes); process.exit(1); }

const usages = {
  _type: "blocUsages", _key: "usages-mapping",
  surTitre: "Où ça sert",
  titre: "Six situations où une façade vaut mieux qu’un écran",
  entrees: ENTREES.map(([titre, texte, lienLibelle, lien], i) => ({
    _key: `u${i}`, titre, texte, lienLibelle, lien,
  })),
};

const blocs = (doc.blocs ?? []).filter(b => b._type !== "blocUsages");
const i = blocs.findIndex(b => b._type === "blocQuestions");
blocs.splice(i >= 0 ? i : blocs.length, 0, usages);

await client.patch(doc._id).set({ blocs }).commit();
console.log(`✅ bloc usages posé — ${ENTREES.length} situations, ${trouvees.length} réalisations vérifiées.`);
console.log(`   la page passe à ${blocs.length} blocs.`);
