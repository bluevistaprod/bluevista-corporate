import type { NextConfig } from "next";

/**
 * ⛔⛔ `trailingSlash` N'EST PAS UNE PRÉFÉRENCE D'ÉCRITURE, C'EST LE PLAN.
 * Les 242 adresses de l'ancien site finissent par une barre oblique, et les
 * 238 destinations internes du plan de redirections aussi. Par défaut, Next
 * fait l'inverse : il renvoie `/actualites/stann/` vers `/actualites/stann`
 * en 308.
 *
 * 👉 Conséquence si on ne règle rien : les 64 adresses censées rester en 200
 * — l'index des actualités et ses 63 articles — deviendraient toutes des
 * redirections le jour de la bascule. Le plan dit 200, le site aurait dit 308.
 * Ça ne casse pas une page, mais ça ajoute un saut à chaque lien entrant
 * existant, et ça déplace la page canonique sous les pieds de Google au pire
 * moment.
 *
 * ⚠️ Réglage GLOBAL : il vaut pour toutes les routes du site, pas seulement
 * les actualités. C'est voulu — deux conventions d'adresse sur un même site,
 * c'est la garantie d'en oublier une.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
