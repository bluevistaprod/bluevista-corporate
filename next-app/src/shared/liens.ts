/**
 * LES ADRESSES DU SITE — une seule source, deux jeux.
 *
 * ⛔⛔ POURQUOI CE FICHIER EXISTE. Les gabarits ont été écrits pour l'APERÇU,
 * et ils portent des adresses `/apercu/…` en dur. Tant qu'ils ne servaient
 * qu'à la maquette, ça allait. Le jour où la même page doit sortir en public,
 * chaque lien devient faux : `/apercu/competence/video-mapping` n'existe pas
 * pour un visiteur, et Google ne doit jamais le voir.
 *
 * ⚠️ ET LES DEUX JEUX NE SE DÉDUISENT PAS L'UN DE L'AUTRE. Les segments ne se
 * correspondent pas : `competence` devient `savoir-faire`, `metier` devient
 * `offres`, `v7` devient la racine. Coller ou retirer « /apercu » ne suffit
 * pas — c'est la traduction qu'il faut écrire, et une seule fois.
 *
 * ⛔ LES ADRESSES PUBLIQUES FINISSENT PAR « / ». Le site tourne avec
 * `trailingSlash: true` parce que les 242 anciennes adresses se terminent
 * ainsi. Une adresse écrite sans la barre finale prend une redirection 308 à
 * chaque clic — invisible à l'œil, coûteuse pour un moteur.
 */

/** Le jeu d'adresses correspondant au contexte de rendu. */
export function liens(publique?: boolean) {
  return publique ? PUBLIQUES : APERCU;
}

export type JeuDeLiens = {
  accueil: string;
  agence: string;
  contact: string;
  realisations: string;
  realisation: (slug: string) => string;
  actualites: string;
  actualite: (slug: string) => string;
  metier: (slug: string) => string;
  competence: (slug: string) => string;
  mentionsLegales: string;
  confidentialite: string;
};

/** Ce que voit le visiteur — et Google. */
export const PUBLIQUES: JeuDeLiens = {
  accueil: "/",
  agence: "/agence/",
  contact: "/contact/",
  realisations: "/realisations/",
  realisation: s => `/realisations/${s}/`,
  actualites: "/actualites/",
  actualite: s => `/actualites/${s}/`,
  /* ⚠️ « offres » et non « metier » : c'est le segment décidé pour les pages
     de niveau ①, et c'est celui que le plan de redirections vise. */
  metier: s => `/offres/${s}/`,
  /* ⚠️ « savoir-faire » et non « competence » : les 11 redirections des
     anciennes `/nos-competences/…` pointent là. */
  competence: s => `/savoir-faire/${s}/`,
  mentionsLegales: "/mentions-legales/",
  confidentialite: "/politique-de-confidentialite/",
};

/** Les routes de travail, hors système de langues. */
export const APERCU: JeuDeLiens = {
  accueil: "/apercu/v7",
  agence: "/apercu/agence",
  contact: "/apercu/contact",
  realisations: "/apercu/realisations",
  realisation: s => `/apercu/realisations/${s}`,
  actualites: "/apercu/actualites",
  actualite: s => `/apercu/actualite/${s}`,
  metier: s => `/apercu/metier/${s}`,
  competence: s => `/apercu/competence/${s}`,
  mentionsLegales: "/apercu/mentions-legales",
  confidentialite: "/apercu/politique-de-confidentialite",
};
