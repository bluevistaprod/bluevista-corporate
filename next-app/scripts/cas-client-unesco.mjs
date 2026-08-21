/**
 * LE CAS CLIENT UNESCO — « Dive into Heritage ». Demande de Giz, 20/08/2026.
 *
 * ⛔⛔ AUCUN VISUEL. J'ai cherché : le dossier client Dropbox
 * (02 CLIENTS/GL_EVENTS/2025/Decorama/UNESCO) ne contient que DEUX fichiers de
 * planning ; Livid n'a aucune vidéo « unesco » ni « heritage » ; le Cloud
 * Store, où vivent les fichiers de production, n'est pas monté. Cet article
 * part donc SANS IMAGE, et c'est un manque annoncé, pas un oubli.
 * 👉 L'image du bloc d'accueil `px-cas-unesco.jpg` est une PHOTO DE BANQUE
 * D'IMAGES — une galerie d'archéologie, ni l'exposition, ni notre travail.
 * Elle est en ligne sous le libellé « UNESCO · Expérience VR ». À remplacer.
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
 * ⚠️ CE QUE JE N'AFFIRME PAS : les sites mis en avant. Le brief cite le fort
 * de Bahla (Oman) et Timgad (Algérie) en les faisant suivre de « [à
 * confirmer] ». Un « à confirmer » du client n'est pas un fait.
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
}, {
  _type: "bloc", _key: cle(),
  titre: "Des photos à 360°, changées en lieu",
  paragraphes: [
    paraG("L’UNESCO disposait de prises de vue à 360° de ses sites, à l’état brut. Notre premier travail a été de ", { g: "les intégrer dans un univers de réalité virtuelle" }, " : construire autour de ces images l’espace, les repères et les enchaînements qui font qu’on s’y déplace au lieu de simplement les regarder."),
    para("La différence n’est pas technique, elle est de nature. Une photo à 360° affichée telle quelle reste une image dans laquelle on tourne la tête. Mise en scène, avec un ordre, des points d’arrêt et une manière d’en sortir, elle devient un endroit où l’on va — et c’est ce qu’on retient en enlevant le casque."),
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Une interface pour manipuler le patrimoine",
  paragraphes: [
    paraG("Le second dispositif est une ", { g: "interface tactile" }, " qui donne accès aux modèles 3D des sites : les faire tourner, s’en approcher, lire ce qui les accompagne. Elle a demandé un travail d’infographie et de programmation, parce qu’une interface d’exposition ne se comporte pas comme un site web — elle doit s’expliquer sans mode d’emploi et se remettre d’aplomb toute seule entre deux visiteurs."),
    para("C’est le point commun des deux dispositifs : personne ne les découvre avec quelqu’un à côté pour les présenter. Ils tiennent debout seuls, ou ils ne servent à rien."),
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Deux semaines, et l’ouverture ne bouge pas",
  paragraphes: [
    paraG("Entre le lancement du projet et la livraison, il s’est passé ", { g: "deux semaines" }, ". Une date d’ouverture d’exposition ne se négocie pas : le 6 juillet, la salle ouvrait, avec ou sans nous."),
    para("Deux infographistes 2D/3D et un programmeur ont travaillé en parallèle sur les deux dispositifs, à partir des données fournies par l’UNESCO. Nous étions également sur place pendant l’exploitation — parce qu’un dispositif interactif dans une exposition ne se livre pas, il s’accompagne."),
  ],
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
  /* ⚠️ Pas d'`imageEntete` : je n'ai aucune image de ce projet. L'en-tête
     retombe sur un aplat sombre, ce qui est prévu (21 des 63 actualités sont
     dans ce cas). Mieux vaut un aplat qu'une photo qui n'est pas la nôtre. */
  datePublication: "2026-08-21",
  titreSeo: "UNESCO Dive into Heritage — expérience VR 360° et interface tactile | Bluevista",
  descriptionSeo:
    "Pour le lancement de la plateforme UNESCO « Dive into Heritage » (Paris, juillet 2025) : intégration de photos 360° dans un univers VR et création d’une interface tactile d’exploration de modèles 3D.",
  aRelire: true,
};

const existe = await client.fetch(`*[_id==$i][0]._id`, { i: doc._id });
await client.createOrReplace(doc);
console.log(`${existe ? "♻️ remplacée" : "✅ créée"} : /actualites/${SLUG}/`);
console.log(`   ${blocs.length} blocs, 0 image — ⚠️ aucun visuel disponible, voir l'en-tête du script.`);
