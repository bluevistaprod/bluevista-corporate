/**
 * La palette Bluevista — décidée avec Giz le 01/08/2026.
 *
 * ⛔ Deux règles qui expliquent tous les choix ci-dessous.
 *
 * 1. DEUX BLEUS, PAS UN. Le bleu du logo (#006078) est trop sombre pour être
 *    lisible sur un fond sombre. Il sert donc sur fond clair uniquement, et
 *    une déclinaison éclaircie prend le relais sur fond sombre. Utiliser le
 *    même partout produisait soit du texte illisible, soit un bleu délavé.
 *
 * 2. NI NOIR NI BLANC PURS. Le blanc pur fatigue l'œil et fait « gabarit » ;
 *    le noir pur écrase les images et ne dit rien de la marque. Le clair est
 *    donc un blanc cassé légèrement chaud, et le sombre est un bleu très
 *    désaturé dérivé du #006078 — il reste de la marque jusque dans les fonds.
 */

/** Le bleu du logo, relevé sur le fichier source. Fond clair uniquement. */
export const BLEU = "#006078";

/** Sa déclinaison éclaircie, pour le texte et les accents sur fond sombre. */
export const BLEU_CLAIR = "#5BC8DE";

/** Blanc cassé chaud — la base du site. */
export const CLAIR = "#F7F6F2";

/** Une nuance plus soutenue, pour marquer une section sans changer de camp. */
export const CLAIR_SOUTENU = "#EBE8E1";

/** Sombre dérivé du bleu de marque, jamais un noir neutre. */
export const SOMBRE = "#07222B";

/** Encore plus profond, pour les fins de page et les fondus d'image. */
export const SOMBRE_PROFOND = "#04161C";
