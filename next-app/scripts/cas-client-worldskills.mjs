/**
 * LE CAS CLIENT WORLDSKILLS — Pavillon France, Eurexpo Lyon 2024.
 *
 * ⛔⛔ LE PIÈGE DU CHIFFRE, ANNONCÉ DE LONGUE DATE ET ÉVITÉ.
 * WorldSkills Lyon 2024 a accueilli 250 000 visiteurs. Le chiffre est public,
 * repris partout, et il serait FAUX ici : c'est la fréquentation de la
 * compétition entière, sur tout Eurexpo — pas celle du Pavillon France, et
 * encore moins de l'espace que nous avons scénographié. L'écrire reviendrait à
 * s'attribuer l'audience d'un salon. C'est la même faute que « 145 films ».
 * 👉 La fréquentation du pavillon doit venir de GL Events Live. Tant qu'elle
 * n'est pas là, le bloc de la page d'accueil affiche ce qu'on sait.
 *
 * ⭐ CE QUI EST VÉRIFIÉ, ET D'OÙ ÇA VIENT :
 *   · les photos du montage et de l'exploitation — dossier client, images
 *     rapatriées depuis WhatsApp le 9 septembre 2024 ;
 *   · le restaurant de 80 personnes — dossier du client, DOSSIER
 *     WORLDSKILLSFRANCE2024_PAVILLON FRANCE V05, 27 mai 2024 ;
 *   · les dates, 10 au 15 septembre 2024 — objet des courriels du dossier.
 *
 * ⚠️ VOCABULAIRE : Podio enregistre la vente comme « ESPACE IMMERSIF »
 * (V05097), pas comme « mapping ». Le mapping sur table en est une partie, pas
 * le tout — il y a aussi la scénographie lumineuse et les contenus d'écran.
 *
 * ⭐ LES CHIFFRES VIENNENT DU DEVIS V03 (07/05/2024) ET DU DOSSIER DE
 * SCÉNOGRAPHIE GL EVENTS (PROJET V05, 27/05/2024), pas des photos. C'est ce
 * qui permet d'écrire « 10 tables » ou « 24 m par 12,5 m » sans estimer :
 *   • « Vidéo-projection sur chaque table (x10) », confirmé par « 10 x
 *     vidéo-projecteurs 3400 lumens » et « 10 x centres de tables »
 *   • « grill élingué de 24m x 12,5m »
 *   • « ruban led positionner sur toutes les traverses (effet synchronisé
 *     avec l'ambiance générale - vert bleu) » — la synchro n'est pas une
 *     interprétation de ma part, elle est au devis
 *   • « lumière noire, pour éclairer des végétaux bio-luminescents »
 *   • « RESTAURANT DE 80 PERSONNES » (dossier GL Events)
 * ⚠️ Un devis reste une PROPOSITION. Rien dans le dossier ne le contredit et
 * les photos de montage concordent, mais si un chiffre devait être contesté,
 * c'est celui-là qu'il faudrait confronter à la facture.
 *
 * ⛔ ET LE CHIFFRE QU'ON N'ÉCRIT PAS : les 250 000 visiteurs de WorldSkills
 * Lyon 2024. C'est le salon entier, pas notre espace.
 *
 * ⛔⛔ LES LÉGENDES ÉTAIENT FAUSSES, ET GIZ L'A VU AVANT MOI : « mets [des
 * images] qui correspondent à leur sous-titre ». J'avais écrit « un chantier
 * projeté sur la table » sous une photo qui montre… la salle entière.
 * 👉 LA CAUSE : j'avais jugé les photos sur une PLANCHE CONTACT montée par
 * ffmpeg, dont l'ordre ne correspondait pas à celui de mes fichiers. J'ai donc
 * légendé de mémoire une grille que je croyais lire. Chaque image est
 * maintenant ouverte SEULE avant d'être décrite.
 * ⚠️ C'est la même faute que les images de savoir-faire qui ne correspondaient
 * pas au texte — vue trois fois cette semaine, sous trois formes.
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

const RACINE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/h8/ws";
const img = async (f, nom) => {
  const a = await client.assets.upload("image", readFileSync(`${RACINE}/${f}`), { filename: nom });
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
};

let n = 0;
const cle = () => `w${++n}`;
const para = t => ({ _type: "block", _key: cle(), style: "normal", markDefs: [], children: [{ _type: "span", _key: cle(), text: t, marks: [] }] });
const paraG = (...m) => ({
  _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: m.map(x => typeof x === "string"
    ? { _type: "span", _key: cle(), text: x, marks: [] }
    : { _type: "span", _key: cle(), text: x.g, marks: ["strong"] }),
});

console.log("Téléversement des photos du pavillon…");
/* ⚠️ Chaque fichier a été OUVERT SEUL avant d'être nommé. Les noms disent ce
   que l'image montre, pas ce que j'espérais y trouver. */
const salleDressee = await img("p1.jpg", "worldskills-salle-ecran-plantes.jpg");
const tableAtelier = await img("p2.jpg", "worldskills-table-atelier-circulations.jpg");
const tableEiffel  = await img("p3.jpg", "worldskills-table-tour-eiffel-chantier.jpg");
const tableLumiere = await img("p4.jpg", "worldskills-table-fin-de-service.jpg");
const sallePlantes = await img("p5.jpg", "worldskills-salle-plantes-luminescentes.jpg");
const passerelle   = await img("demande.jpg", "worldskills-passerelle-projecteurs-lyres.jpg");

const SLUG = "worldskills-pavillon-france-un-espace-immersif-a-eurexpo";

const blocs = [{
  _type: "bloc", _key: cle(),
  paragraphes: [
    para("En septembre 2024, la compétition mondiale des métiers s’installe à Eurexpo Lyon. Au milieu du salon, le Pavillon France doit accueillir les délégations, les partenaires et les officiels — et tenir six jours durant, du 10 au 15 septembre."),
    paraG("Un pavillon national n’est pas un stand. Il reçoit à table, il fait patienter, il impressionne sans crier. ", { g: "Le problème posé à la scénographie était celui du temps long" }, " : comment un même espace reste-t-il intéressant pour quelqu’un qui y passe vingt minutes, et pour quelqu’un qui y déjeune ?"),
  ],
  medias: [{
    _key: cle(), _type: "media",
    videoUrl: "https://livid.com/watch/NSapKk3Un30l",
    /* ⛔ AFFICHE EN PAYSAGE, OBLIGATOIREMENT. J'avais mis `salleDressee`, qui
       est en 1536x2048 — un PORTRAIT sur un lecteur 16/9, donc recadré au
       massacre : le grill en haut et les tables en bas disparaissaient.
       ⚠️ Vérifier l'ORIENTATION d'une affiche, pas seulement son sujet. */
    videoAffiche: sallePlantes,
    legende: "L’espace en fonctionnement",
    sousLegende: "1 min 25",
  }],
}, {
  _type: "bloc", _key: cle(),
  titre: "Les tables deviennent l’écran",
  paragraphes: [
    paraG("La réponse a été de projeter ", { g: "sur les tables elles-mêmes" }, ". ", { g: "Dix tables rondes" }, " ont été équipées une à une, chacune avec son vidéoprojecteur accroché deux mètres au-dessus, en douche. La nappe devient l’écran."),
    para("Le contenu arrive à un moment précis du repas, et il raconte les métiers : un atelier vu du dessus avec ses postes de travail et ses circulations balisées, puis la tour Eiffel en chantier, grues et compagnons à l’ouvrage — à l’échelle d’une table de huit."),
    para("Le procédé a une qualité que n’a pas un écran mural : il n’y a rien à regarder ailleurs. Les convives sont déjà tournés vers la table, et l’image arrive là où leurs yeux sont — ce qui règle la question du temps long sans demander à personne de se déplacer."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: tableAtelier, texteAlternatif: "Vue de dessus d’un atelier industriel miniature projeté sur une table ronde : postes de travail, convoyeurs et circulations balisées en jaune et noir", legende: "Un atelier vu du dessus : postes de travail, convoyeurs et circulations balisées au sol" },
    { _key: cle(), _type: "media", image: tableEiffel, texteAlternatif: "La tour Eiffel en cours de construction projetée sur une table : grues, échafaudages et compagnons au travail", legende: "La tour Eiffel en chantier — grues, échafaudages et compagnons, à l’échelle de la table" },
    /* ⚠️ CETTE LÉGENDE A ÉTÉ CORRIGÉE APRÈS AVOIR OUVERT LA PHOTO. J'avais
       écrit « en fin de service » — inventé. Ce qu'elle montre : un bouquet
       RÉEL posé au centre, et la nappe projetée en violet, jaune et bleu. */
    { _key: cle(), _type: "media", image: tableLumiere, texteAlternatif: "Table ronde du Pavillon France avec un bouquet de fleurs au centre, la nappe recouverte d’une projection violette, jaune et bleue", legende: "Le bouquet est réel, la nappe est projetée : les deux se répondent" },
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "La lumière et la projection, sur la même passerelle",
  paragraphes: [
    paraG("Toute la technique est suspendue à un même grill élingué de ", { g: "24 mètres sur 12,5" }, " : les vidéoprojecteurs, les lyres, les enceintes et, sur chacune des traverses, un ruban LED. Ce n’est pas un détail de montage — c’est ce qui permet de faire varier ensemble l’image projetée et l’éclairage de la salle, au lieu de les laisser se contrarier."),
    paraG("L’effet lumineux est ", { g: "synchronisé avec l’ambiance générale" }, ", en vert et bleu. Un mapping de table se joue à faible contraste : trop de lumière ambiante et l’image disparaît, trop peu et la salle devient une cave où personne ne voit son assiette. Le calage se fait donc tableau par tableau, entre ce que projette la machine et ce qu’éclaire le grill."),
    paraG("La couleur de la salle vient d’ailleurs des plantes. Des végétaux bioluminescents — dix centres de table et quarante mètres de suspensions sur tout le pourtour — sont éclairés ", { g: "en lumière noire" }, ". Ils tiennent la pièce quand les tables s’éteignent entre deux séquences, et ce sont eux qu’on voit de loin, depuis le hall."),
  ],
  medias: [
    { _key: cle(), _type: "media", image: passerelle, texteAlternatif: "Passerelle technique au plafond portant côte à côte des vidéoprojecteurs Panasonic et des lyres LED", legende: "La passerelle technique : vidéoprojecteurs et lyres LED accrochés côte à côte, au-dessus des tables" },
  ],
}, {
  _type: "bloc", _key: cle(),
  titre: "Un espace immersif, pas une projection",
  paragraphes: [
    para("Les tables ne sont qu’une partie du travail. L’espace a été traité comme un tout : un mur LED et un grand écran de projection au fond de la mezzanine, une bande son diffusée en 360° par des enceintes réparties sur le grill, la scénographie lumineuse — et le calage de l’ensemble sur le déroulé de la journée : l’accueil avant le déjeuner, le déjeuner, les temps officiels."),
    paraG("La mezzanine reçoit ", { g: "80 couverts" }, ". C’est cette échelle qui a fixé le reste : le nombre de tables à équiper, la puissance de projection au-dessus de chacune, et la longueur de grill à élinguer."),
  ],
  medias: [{ _key: cle(), _type: "media", image: salleDressee, texteAlternatif: "Le Pavillon France en service : grand écran WorldSkills France, tables rondes dressées et plantes luminescentes", legende: "L’écran du pavillon et les tables dressées, sous la lumière de la scénographie" }],
}];

const doc = {
  _type: "actualite",
  _id: `actualite-${SLUG}`,
  titre: "WorldSkills : le Pavillon France, où les tables deviennent l’écran",
  slug: { _type: "slug", current: SLUG },
  language: "fr",
  chapo: [para("Six jours de compétition mondiale à Eurexpo, un pavillon national à faire vivre du matin au soir, et une réponse qui ne passe par aucun écran mural.")],
  blocs,
  imageEntete: tableEiffel,
  client: "GL Events Live — WorldSkills France",
  datePublication: "2026-08-20",
  titreSeo: "WorldSkills 2024 — scénographie immersive du Pavillon France | Bluevista",
  descriptionSeo:
    "Mapping sur tables, suspensions luminescentes et contenus d’écran pour le Pavillon France de WorldSkills Lyon 2024, avec GL Events Live.",
  aRelire: true,
};

await client.createOrReplace(doc);
console.log(`✅ /actualites/${SLUG}/ — ${blocs.length} blocs, 6 photos + la vidéo.`);
