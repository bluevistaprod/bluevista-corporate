/**
 * LE CAHIER DES IMAGES — créé le 02/08/2026, à la demande de Giz.
 *
 * Sa méthode, et elle est la bonne : on dessine le site COMME ON LE VOUDRAIT,
 * avec n'importe quelle image de référence, puis on remplace par les vraies —
 * tirées de son stock, ou tournées exprès.
 *
 * Ce fichier est le contrat entre les deux étapes. Pour chaque emplacement
 * d'image de la page d'accueil il dit CE QUE L'IMAGE DOIT MONTRER, pas quelle
 * image y est aujourd'hui. C'est donc, tel quel, la liste de courses pour
 * fouiller le stock — et, pour ce qui n'existe pas, le plan de tournage.
 *
 * ⛔ LE PIÈGE À ÉVITER, et il est sérieux.
 * Une image de référence qui « fait le job » dans une maquette a toutes les
 * chances d'y rester. Sur le site d'une agence de production, une photo de
 * banque est une contradiction visible : on vend la fabrication d'images en
 * montrant celles des autres. Le premier client qui reconnaît la photo a
 * compris quelque chose qu'on ne voulait pas lui dire.
 * D'où `provisoire: true` sur chaque entrée, et un contrôle qui refuse la
 * mise en ligne tant qu'il en reste une.
 *
 * ⚠️ Et pour les images de référence : licence Creative Commons commerciale
 * uniquement (Openverse filtre là-dessus, sans clé d'API). Une image trouvée
 * dans un moteur de recherche n'est pas libre parce qu'elle est accessible.
 */

export type Emplacement = {
  /** Le fichier tel qu'il est appelé dans la page. */
  fichier: string;
  /** Où on le voit. */
  ou: string;
  /** CE QUE L'IMAGE DOIT MONTRER. La seule colonne qui compte. */
  brief: string;
  /** true tant que l'image en place n'est pas la bonne. */
  provisoire: boolean;
  /** Existe-t-il, à notre connaissance, une vraie image pour ça ? */
  piste: "stock Bluevista" | "à tourner" | "à créer" | "inconnu";
};

/**
 * 🔴 CONSTAT AVANT MÊME DE REGARDER LE DÉTAIL.
 * Douze emplacements sur la page — mais seulement SIX photos distinctes.
 * ref-clasquin.jpg sert cinq fois, ref-ssp.jpg quatre fois. La page n'a
 * quasiment pas de vocabulaire visuel : elle répète six images en espérant
 * qu'on ne s'en aperçoive pas. C'est probablement la vraie raison du malaise
 * de Giz, avant même la question du sujet de chaque photo.
 */
export const EMPLACEMENTS: Emplacement[] = [
  {
    fichier: "showreel-hero.mp4",
    ou: "Hero — plein écran",
    brief:
      "Le showreel. En place et validé — seule image de la page qui soit à son niveau.",
    provisoire: false,
    piste: "stock Bluevista",
  },
  {
    fichier: "pilier-communication.jpg",
    ou: "Pilier 1 — Communication & marketing",
    brief:
      "Une réunion de conception, pas un tournage : mur d'idées, storyboard au feutre, écran de montage regardé à trois. Doit dire « on réfléchit avant de filmer » — c'est tout le repositionnement agence.",
    provisoire: true,
    piste: "à tourner",
  },
  {
    fichier: "pilier-evenementiel.jpg",
    ou: "Pilier 2 — Événementiel",
    brief:
      "Un événement à l'échelle des références citées : salle pleine, régie, grand écran. ⛔ Pas de stand de salon, pas de tournoi local.",
    provisoire: true,
    piste: "stock Bluevista",
  },
  {
    fichier: "pilier-immersion.jpg",
    ou: "Pilier 3 — Immersion",
    brief:
      "Casque VR porté par un vrai visiteur, ou mapping projeté sur façade. Demande explicite de Giz, deux fois : « je veux des gens en casque VR », « des coulisses de mapping ».",
    provisoire: true,
    piste: "stock Bluevista",
  },
  {
    fichier: "coulisses-interview.jpg",
    ou: "Méthode — étape 1, Brainstorming",
    brief:
      "Deux ou trois personnes debout devant un tableau. Le brief qu'on démonte, pas la caméra qu'on branche.",
    provisoire: true,
    piste: "à tourner",
  },
  {
    fichier: "coulisses-tournage.jpg",
    ou: "Méthode — étape 2, Pré-production",
    brief:
      "Un plan de travail, un storyboard, un repérage sur site. De l'organisation, pas de l'action.",
    provisoire: true,
    piste: "à tourner",
  },
  {
    fichier: "coulisses-grue.jpg",
    ou: "Méthode — étape 3, Production",
    brief:
      "Tournage en cours, matériel visible et sérieux. Le seul endroit de la page où le matériel a sa place.",
    provisoire: false,
    piste: "stock Bluevista",
  },
  {
    fichier: "(manquant)",
    ou: "Méthode — étapes 4, 5, 6",
    brief:
      "Trois images de post-production : station de montage, étalonnage, écran de statistiques de diffusion pour le débriefing. Aujourd'hui ces trois étapes réutilisent des photos d'autres sections.",
    provisoire: true,
    piste: "à tourner",
  },
  {
    fichier: "ref-clasquin.jpg / ref-ssp.jpg / ref-irisolaris.jpg / ref-berliet.jpg",
    ou: "Cas clients · aperçu réalisations · témoignages",
    brief:
      "Une image PAR projet cité, et pas la même d'une section à l'autre. Ces quatre fichiers servent aujourd'hui douze fois. Le portfolio a forcément mieux.",
    provisoire: true,
    piste: "stock Bluevista",
  },
  {
    fichier: "(manquant)",
    ou: "Témoignages — trois posters d'interview",
    brief:
      "Un client filmé chez lui, cadré serré, regard caméra. C'est le seul contenu de la page qui ne peut pas être fabriqué depuis un bureau : il faut aller filmer.",
    provisoire: true,
    piste: "à tourner",
  },
  {
    fichier: "logos/client-01..12.png",
    ou: "Bandeau clients",
    brief:
      "Les logos officiels des clients, en vectoriel. Les fichiers actuels ont été extraits d'un PDF d'appel d'offres : basse définition, ils baveront sur écran Retina.",
    provisoire: true,
    piste: "stock Bluevista",
  },
];

/** Ce qui reste à régler avant toute mise en ligne. */
export const IMAGES_A_REMPLACER = EMPLACEMENTS.filter(e => e.provisoire);
