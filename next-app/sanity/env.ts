/**
 * Les identifiants du projet Sanity.
 *
 * ⛔ LE `projectId` EST LA SEULE CHOSE QUI MANQUE, et c'est le seul geste que
 * je ne peux pas faire : créer un compte relève de Giz. Une fois le projet
 * créé sur sanity.io, coller son identifiant dans .env.local suffit — tout le
 * reste est déjà écrit.
 *
 * ⚠️ Le projectId n'est PAS un secret : il est visible dans le navigateur de
 * tout visiteur. Ce qui est secret, c'est le jeton d'écriture (SANITY_TOKEN),
 * qui ne doit jamais porter le préfixe NEXT_PUBLIC_.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-08-01";

/** Le studio s'affiche même sans projet configuré, pour pouvoir le regarder. */
export const configure = Boolean(projectId);
