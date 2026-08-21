/**
 * LE CAS CLIENT UNESCO — « Dive into Heritage ». Demande de Giz, 20/08/2026.
 *
 * ⭐ LA MATIÈRE EST ARRIVÉE le 21/08/2026 : Vincent a fourni les photos du
 * montage ET les deux builds Unity de l'application tactile. L'article part
 * donc avec de vraies images, et le bloc d'accueil ne porte plus la photo de
 * banque d'images qui y traînait.
 *
 * ⭐⭐ ET LE BUILD DONNE LA LISTE DES SITES, ce qu'aucun document commercial
 * ne disait. Les noms d'assets de `level0` sont codés par pays :
 *   01BH_Dilmun · 02BH_Qalat · 04EG_Memphis · 05LB_Baalbek · 06LB_Byblos
 *   08LY_Leptis · 10OM_Bahla · ata-arc-timgad-algeria
 * Huit sites, sept pays. Les maillages portent même leur densité
 * (`Qalat_al_Bahrein_250k`, `Byblos_160k`).
 * 👉 Le livrable lui-même est une source. Le devis dit ce qui a été vendu,
 * le build dit ce qui a été fait.
 *
 * ⚠️ ET LA DISTINCTION QUI TIENT TOUT : les modèles 3D sont FOURNIS PAR
 * L'UNESCO (« L'UNESCO fournira les modèles 3D bruts (.obj ou .glb) »,
 * cahier des charges). Nous ne les avons pas modélisés — nous les avons
 * rendus explorables. Écrire « huit sites modélisés » serait un vol.
 *
 * ⭐ LA PHOTO AU CASQUE EST PUBLIÉE, sur autorisation explicite de Giz le
 * 21/08/2026 (« j'ai l'autorisation »). Elle était écartée jusque-là : un
 * visage parfaitement reconnaissable, et un événement public ne vaut pas
 * autorisation de publier quelqu'un sur un site commercial. C'est la plus
 * forte du lot — la seule qui montre l'expérience EN USAGE.
 * ⛔ Si l'autorisation venait à être retirée, c'est cette image-ci qu'il faut
 * retirer, et elle seule : `unesco-visiteur-casque-vr.jpg`.
 *
 * ⛔⛔ LE PIÈGE DE CE DOSSIER : Podio contient le CAHIER DES CHARGES COMPLET
 * de l'UNESCO — scénographie, écrans, globe physique, photomaton, cartes
 * postales en réalité augmentée, 200 modèles imprimés. Rien de tout cela
 * n'est de nous. L'appel d'offres avait TROIS LOTS (structure / audiovisuel /
 * contenu 3D) et Decorama nous a consultés pour le SEUL lot contenu 3D.
 * Recopier ce brief donnerait un cas client spectaculaire et faux.
 *
 * ⭐ CE QU'ON A RÉELLEMENT LIVRÉ vient de NOTRE FACTURE (F25070093,
 * 08/07/2025), qui nomme les postes :
 *   · « #01 Intégration Photos 360° dans univers VR » — 12 jours
 *   · « #02 Création interface tactile » — 8 jours
 *   · gestion de projet + apport au scénario, achat d'assets, gestion sur place
 * Deux infographistes 2D/3D et un programmeur. C'est cette liste qui fait
 * autorité, pas le brief du client.
 * ⛔ Les montants de cette facture ne sortent NULLE PART. Un cas client ne
 * publie pas le prix payé par un client.
 *
 * ⭐ LES SITES SONT MAINTENANT CONFIRMÉS. Le brief citait Bahla et Timgad
 * suivis de « [à confirmer] » — et je m'étais interdit de les écrire. Le
 * build ET une photo de l'écran les montrent : ils y sont tous les deux.
 * Un « à confirmer » du client se vérifie ; il ne s'invente pas.
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

const RACINE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/unesco/src";
async function img(fichier, nom) {
  const a = await client.assets.upload("image", readFileSync(`${RACINE}/${fichier}`), { filename: nom });
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
}
/* ⛔ Chaque photo a été OUVERTE SEULE avant d'être nommée — la planche de
   contact ne sert qu'au tri. C'est l'inverse qui avait produit les fausses
   légendes de WorldSkills. */
console.log("Téléversement des photos de l’exposition…");
const ecranTimgad  = await img("06.jpg", "unesco-ecran-tactile-timgad.jpg");
const pincement    = await img("02.jpg", "unesco-ecran-tactile-vue-aerienne.jpg");
const posteVR      = await img("04.jpg", "unesco-poste-vr-deux-casques.jpg");
const casqueEnUsage = await img("03.jpg", "unesco-visiteur-casque-vr.jpg");
const salle        = await img("12.jpg", "unesco-salle-exposition.jpg");
const entree       = await img("13.jpg", "unesco-entree-dive-in.jpg");
const public_      = await img("15.jpg", "unesco-lancement-public.jpg");

let n = 0;
const cle = () => `u${++n}`;
const para = t => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: cle(), text: t, marks: [] }],
});
/** Un paragraphe avec du gras, écrit en morceaux. */
const paraG = (...m) => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: m.map(x =>
    typeof x === "string"
      ? { _type: "span", _key: cle(), text: x, marks: [] }
      : { _type: "span", _key: cle(), text: x.g, marks: ["strong"] }
  ),
});

const SLUG = "unesco-dive-into-heritage-photos-360-et-interface-tactile";

const blocs = [{
  _type: "bloc", _key: cle(),
  paragraphes: [
    para("Du 6 au 16 juillet 2025, l’UNESCO a présenté à Paris une exposition en marge de la 47e session du Comité du patrimoine mondial. Elle marquait le lancement officiel de « Dive into Heritage », une plateforme en ligne qui permet d’explorer les sites du patrimoine mondial et le patrimoine culturel immatériel qui leur est associé."),
    paraG("Une plateforme, ça se démontre mal sur un écran de conférence. ", { g: "Il fallait la faire toucher" }, " : que quelqu’un qui traverse la salle en dix minutes reparte en ayant vu un site du patrimoine mondial, et pas une capture d’écran de site web."),
    para("Decorama, la filiale de GL Events spécialisée dans l’aménagement événementiel, portait le projet. L’appel d’offres comptait trois lots : la structure de l’exposition, l’équipement audiovisuel, et la création de contenu 3D. C’est sur ce troisième lot que nous sommes intervenus."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: entree, texteAlternatif: "Visiteurs entrant dans l’exposition Dive into Heritage sous l’enseigne « DIVE IN »", legende: "L’entrée de l’exposition, au siège de l’UNESCO" },
    { _key: cle(), _type: "media", image: public_, texteAlternatif: "Public rassemblé devant la scène le jour du lancement, plusieurs personnes filment avec leur téléphone", legende: "Le jour du lancement de la plateforme" },
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Des photos à 360°, changées en lieu",
  paragraphes: [
    paraG("L’UNESCO disposait de prises de vue à 360° de ses sites, à l’état brut. Notre premier travail a été de ", { g: "les intégrer dans un univers de réalité virtuelle" }, " : construire autour de ces images l’espace, les repères et les enchaînements qui font qu’on s’y déplace au lieu de simplement les regarder."),
    para("La différence n’est pas technique, elle est de nature. Une photo à 360° affichée telle quelle reste une image dans laquelle on tourne la tête. Mise en scène, avec un ordre, des points d’arrêt et une manière d’en sortir, elle devient un endroit où l’on va — et c’est ce qu’on retient en enlevant le casque."),
    para("Deux casques étaient installés dans la salle, en libre essai. Aucune formation, aucune notice : on prend, on regarde, on repose."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: casqueEnUsage, texteAlternatif: "Un visiteur en costume, casque de réalité virtuelle sur la tête et manettes en main, devant l’écran « A digital dive into heritage »", legende: "L’expérience en usage, le jour du lancement" },
    { _key: cle(), _type: "media", image: posteVR, texteAlternatif: "Socle portant deux casques de réalité virtuelle et leurs manettes, devant un écran affichant « A digital dive into heritage »", legende: "Le poste de réalité virtuelle avant l’ouverture — et les derniers câblages" },
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Une interface pour manipuler le patrimoine",
  paragraphes: [
    paraG("Le second dispositif est une ", { g: "interface tactile" }, ", sur écran vertical. Elle donne accès à ", { g: "huit sites du patrimoine mondial" }, " répartis dans sept pays : Dilmun et Qal’at al-Bahreïn, Memphis en Égypte, Baalbek et Byblos au Liban, Leptis Magna en Libye, le fort de Bahla à Oman, et l’arc de Timgad en Algérie."),
    para("Quatre gestes, annoncés en haut de l’écran et pas ailleurs : faire tourner le site à 360°, pincer pour s’approcher ou s’éloigner, toucher un point pour l’ouvrir. On passe d’un site à l’autre par une rangée de vignettes en bas. Les modèles 3D sont fournis par l’UNESCO ; ce qui est de nous, c’est ce qui permet de les manipuler."),
    paraG("Et il y a un bouton ", { g: "Restart" }, ", en haut à droite. Ce détail dit tout du reste : une interface d’exposition ne se comporte pas comme un site web. Elle doit s’expliquer sans mode d’emploi, et revenir d’elle-même à son état de départ entre deux visiteurs. Personne ne la découvre avec quelqu’un à côté pour la présenter — elle tient debout seule, ou elle ne sert à rien."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: ecranTimgad, texteAlternatif: "Écran tactile vertical affichant le modèle 3D de l’arc de Timgad en Algérie, avec la légende des gestes et le sélecteur de sites", legende: "L’arc de Timgad, en Algérie, sur l’écran tactile" },
    { _key: cle(), _type: "media", image: pincement, texteAlternatif: "Deux doigts en train de pincer l’écran tactile qui affiche une vue aérienne d’un site archéologique constellée de points lumineux", legende: "Deux doigts pour s’approcher : la vue aérienne se rapproche et les points d’intérêt s’allument" },
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Deux semaines, et l’ouverture ne bouge pas",
  paragraphes: [
    paraG("Entre le lancement du projet et la livraison, il s’est passé ", { g: "deux semaines" }, ". Une date d’ouverture d’exposition ne se négocie pas : le 6 juillet, la salle ouvrait, avec ou sans nous."),
    para("Deux infographistes 2D/3D et un programmeur ont travaillé en parallèle sur les deux dispositifs, à partir des données fournies par l’UNESCO. Nous étions également sur place pendant l’exploitation — parce qu’un dispositif interactif dans une exposition ne se livre pas, il s’accompagne."),
  ],
  medias: [{ _key: cle(), _type: "media", image: salle, texteAlternatif: "Salle d’exposition en lumière bleue, avec les écrans tactiles alignés le long des cloisons", legende: "La salle, écrans en place" }],
}];

const doc = {
  _type: "actualite",
  _id: `actualite-${SLUG}`,
  titre: "UNESCO — Dive into Heritage : le patrimoine mondial en VR et au bout des doigts",
  slug: { _type: "slug", current: SLUG },
  language: "fr",
  chapo: [para("Pour le lancement de la plateforme « Dive into Heritage », l’UNESCO voulait une exposition où l’on manipule le patrimoine mondial au lieu de le regarder. Nous avons livré les deux dispositifs qui le permettent.")],
  blocs,
  client: "Decorama (GL Events) — pour l’UNESCO",
  /* ⭐ L'écran tactile en en-tête : c'est la seule image du lot qui montre
     NOTRE livrable et rien d'autre. Une salle d'exposition montre le travail
     de Decorama autant que le nôtre. */
  imageEntete: ecranTimgad,
  datePublication: "2026-08-21",
  titreSeo: "UNESCO Dive into Heritage — expérience VR 360° et interface tactile | Bluevista",
  descriptionSeo:
    "Pour le lancement de la plateforme UNESCO « Dive into Heritage » (Paris, juillet 2025) : intégration de photos 360° dans un univers VR et création d’une interface tactile d’exploration de modèles 3D.",
  aRelire: true,
};

const existe = await client.fetch(`*[_id==$i][0]._id`, { i: doc._id });
await client.createOrReplace(doc);
console.log(`${existe ? "♻️ remplacée" : "✅ créée"} : /actualites/${SLUG}/`);
console.log(`   ${blocs.length} blocs, 7 photos de l'exposition.`);
