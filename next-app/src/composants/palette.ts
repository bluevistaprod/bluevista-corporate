/**
 * La palette Bluevista — valeurs relevées sur la CHARTE GRAPHIQUE 2023.
 *
 * Source unique et faisant foi :
 *   Dropbox · guillaume Martin/01Projets Bluevista/01 BLUEVISTA/
 *   BVP Charte graphique/2023
 * complétée par le logo publié sur bluevistaprod.com (Logo_BLUEVISTA_2023).
 *
 * ⛔⛔ HISTORIQUE DES ERREURS, À LIRE AVANT DE TOUCHER À CE FICHIER.
 * Ce bleu a été changé DEUX FOIS à tort en deux jours :
 *   · d'abord relevé à #006078 sur le PNG basse définition du CDN Manus —
 *     approximatif, mais dans la bonne famille ;
 *   · puis « corrigé » en #233C91 d'après un fichier trouvé dans
 *     com-RS/Identité/Logo BV 2019. C'était L'ANCIEN LOGO, celui de 2019.
 *     Un fichier daté n'est pas une charte.
 * La charte 2023 tranche : le bleu de Bluevista est un BLEU PÉTROLE, #12607E,
 * et le « b » dans un rond est à #06607E.
 *
 * 👉 La règle qui en sort : ne jamais relever une couleur sur un fichier
 * trouvé, seulement sur la charte en vigueur. Un logo qui existe ne prouve
 * pas qu'il est le logo actuel.
 *
 * Les deux règles de composition, elles, tiennent depuis le début :
 *
 * 1. DEUX BLEUS. Le bleu de marque est trop sombre pour être lisible sur un
 *    fond sombre : il sert sur fond clair, une déclinaison éclaircie prend le
 *    relais sur fond sombre.
 *
 * 2. NI NOIR NI BLANC PURS pour les fonds de contenu. Exception assumée : la
 *    séquence immersive, où le noir sert l'image (voir NOIR).
 */

/** Le bleu du mot « blue » sur le logo 2023. Fond clair uniquement. */
export const BLEU = "#12607E";

/** Le bleu du « b » dans un rond, très légèrement plus profond. */
export const BLEU_ROND = "#06607E";

/** Déclinaison éclaircie, pour le texte et les accents sur fond sombre. */
export const BLEU_CLAIR = "#5BC8DE";

/** Le gris du mot « vista ». Éléments secondaires. */
export const GRIS = "#CCCCCC";

/** Blanc cassé chaud — la base du site. */
export const CLAIR = "#F7F6F2";

/** Une nuance plus soutenue, pour marquer une section sans changer de camp. */
export const CLAIR_SOUTENU = "#EBE8E1";

/** Sombre dérivé du bleu de marque, pour les zones sombres SANS image. */
export const SOMBRE = "#07222B";

/** Sa version plus profonde, même usage. */
export const SOMBRE_PROFOND = "#04161C";

/**
 * Noir profond — réservé à la SÉQUENCE IMMERSIVE (hero et bandes d'images).
 *
 * ⛔ Règle décidée avec Giz : LE NOIR SERT L'IMAGE, LE BLEU SOMBRE SERT LA
 * MARQUE. Sur une bande plein cadre, un fond noir se confond avec les noirs de
 * l'image : le cadre disparaît. C'est l'effet salle de projection.
 * Quasi-noir à peine bleuté, jamais #000.
 */
export const NOIR = "#04070A";

/**
 * ÉCHELLE TYPOGRAPHIQUE — ajoutée le 02/08/2026.
 *
 * Retour de Giz : « on a du mal à savoir ce qu'il faut lire ». Le diagnostic
 * était juste. Deux fautes se cumulaient :
 *   · les titres de section montaient à 4,5 rem — à cette taille un titre
 *     cesse d'être un titre, il devient une affiche, et l'œil ne sait plus
 *     s'il doit le lire ou le regarder ;
 *   · trop de niveaux se disputaient l'attention — sur-titre, titre, chapô
 *     coloré, sous-titre, corps — sans écart franc entre eux.
 *
 * Quatre niveaux, et pas un de plus. Chaque section en utilise au maximum
 * trois. L'écart entre deux niveaux voisins doit rester visible à l'œil nu.
 */
export const TYPO = {
  /** Sur-titre : dit de quel chapitre on parle. Discret mais lisible. */
  surTitre: "text-[13px] font-bold uppercase tracking-[0.18em]",
  /** Titre de section : un seul par section. */
  titre: "text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.02em]",
  /** Chapô : une phrase sous le titre, facultative, jamais deux. */
  chapo: "text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed opacity-65",
  /** Sous-titre d'un bloc à l'intérieur d'une section. */
  sousTitre: "text-[1.35rem] font-bold leading-snug tracking-tight",
  /** Corps de texte. */
  corps: "text-[1.0625rem] leading-[1.65] opacity-70",
} as const;
