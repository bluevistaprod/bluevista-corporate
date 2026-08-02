/**
 * La palette Bluevista.
 *
 * ⛔⛔ CORRECTION MAJEURE DU 02/08/2026 — NE PAS REVENIR EN ARRIÈRE.
 * J'ai travaillé pendant deux jours avec un bleu #006078, un bleu pétrole que
 * j'avais extrait du PNG basse définition récupéré sur le CDN de Manus. CE
 * N'ÉTAIT PAS LE BLEU DE BLUEVISTA. Giz a fourni le fichier de référence
 * (Dropbox, projetsBVinternes/com-RS/Identité/Logo BV 2019) : le vrai bleu de
 * marque est un bleu roi profond, #233C91, et le gris du mot « vista » est
 * #C6C6C6.
 *
 * La leçon vaut au-delà de la couleur : une valeur relevée sur un fichier
 * dégradé n'est pas une source, c'est une approximation. Toujours remonter au
 * fichier d'identité.
 *
 * Les deux autres règles, elles, restent valables :
 *
 * 1. DEUX BLEUS, PAS UN. Le bleu de marque est trop sombre pour être lisible
 *    sur un fond sombre. Il sert donc sur fond clair, et une déclinaison
 *    éclaircie prend le relais sur fond sombre.
 *
 * 2. NI NOIR NI BLANC PURS pour les fonds de contenu. Le blanc pur fatigue et
 *    fait « gabarit » ; le noir pur ne dit rien de la marque. Exception
 *    assumée : la séquence immersive, où le noir sert l'image (voir NOIR).
 */

/** Le bleu du logo, relevé sur le fichier d'identité. Fond clair uniquement. */
export const BLEU = "#233C91";

/** Le second bleu du logo rond — plus lumineux, utile en accent secondaire. */
export const BLEU_VIF = "#006AB3";

/** Déclinaison éclaircie, pour le texte et les accents sur fond sombre. */
export const BLEU_CLAIR = "#7FA8E8";

/** Le gris du mot « vista ». Sert aux éléments secondaires. */
export const GRIS = "#C6C6C6";

/** Blanc cassé légèrement froid, accordé au bleu roi — la base du site. */
export const CLAIR = "#F5F6F8";

/** Une nuance plus soutenue, pour marquer une section sans changer de camp. */
export const CLAIR_SOUTENU = "#E7E9EF";

/** Sombre dérivé du bleu de marque, pour les zones sombres SANS image. */
export const SOMBRE = "#141C3A";

/** Sa version plus profonde, même usage. */
export const SOMBRE_PROFOND = "#0B1128";

/**
 * Noir profond — réservé à la SÉQUENCE IMMERSIVE (hero et cas clients).
 *
 * ⛔ Règle décidée avec Giz : LE NOIR SERT L'IMAGE, LE BLEU SOMBRE SERT LA
 * MARQUE. Sur une bande plein cadre, un fond noir se confond avec les noirs de
 * l'image : le cadre disparaît et la photo cesse de ressembler à un rectangle
 * posé sur un fond. C'est l'effet salle de projection.
 *
 * Quasi-noir à peine bleuté, jamais #000 : assez profond pour se fondre dans
 * les images, assez vivant pour éviter l'aplat mort d'un noir pur.
 */
export const NOIR = "#04070A";
