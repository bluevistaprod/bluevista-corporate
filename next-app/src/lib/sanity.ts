import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "../../sanity/env";

/**
 * LE LIEN ENTRE LE SITE ET SANITY.
 *
 * ⛔ `useCdn: true` EN PRODUCTION, ET C'EST CE QUI REND L'OFFRE GRATUITE
 * SUFFISANTE. Les pages sont générées côté serveur et servies depuis
 * Infomaniak ; Sanity n'est appelé qu'à la génération, pas à chaque visite.
 * Un pic de trafic ne consomme donc aucun quota. C'est l'argument qui a
 * pesé dans la décision — un CMS facturé à la visite aurait été un risque.
 *
 * ⚠️ AUCUN JETON ICI. Ce client est en lecture seule et ne lit que le
 * contenu publié. Le jeton d'écriture ne sert qu'au script d'import, côté
 * serveur, et ne doit jamais atteindre le navigateur.
 */
export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });

/**
 * L'URL d'une image, recadrée autour du POINT FOCAL posé dans le studio.
 * C'est ce qui évite les têtes coupées quand la même photo sert en carré,
 * en 16/9 et en vignette — le problème rencontré avec la photo de tournage.
 */
export function imageUrl(source: unknown, largeur = 1200, hauteur?: number) {
  if (!source) return undefined;
  /* ⛔⛔ UNE CHAÎNE N'EST PAS UNE RÉFÉRENCE D'IMAGE, ET LE CONSTRUCTEUR NE LE
     DIT PAS GENTIMENT : il fabrique un identifiant bricolé à partir du texte
     reçu, puis le serveur rend une 500 — « Malformed asset _ref ». Toute la
     page tombe, pas seulement l'image.
     👉 D'où ça vient : le champ « affiche de la vidéo » était typé `url` sur
     l'ancien schéma des blocs. Certaines pages portent donc encore une
     ADRESSE là où les autres portent une image téléversée. En faisant passer
     le champ à `image`, j'ai envoyé les anciennes chaînes dans un
     constructeur qui n'en veut pas.
     ⚠️ Une adresse reste parfaitement utilisable telle quelle : on la renvoie
     au lieu de la refuser. Une migration de type doit accepter les deux
     formes tant que l'ancienne existe dans les données. */
  if (typeof source === "string") return source;
  let u = builder.image(source as never).width(largeur).auto("format").quality(78);
  if (hauteur) u = u.height(hauteur).fit("crop").crop("focalpoint");
  return u.url();
}

/** Le champ `language` d'un document, tel que le plugin le pose. */
export type Version = "fr" | "en" | "es" | "fr-ch" | "en-ch";

export type RealisationSanity = {
  _id: string;
  slug: string;
  titre: string;
  client?: string;
  metier: "film" | "evenement" | "immersion" | null;
  produit: string | null;
  video?: string;
  clientUrl?: string;
  intro?: string;
  image?: unknown;
  aRelire?: boolean;
  ancienneUrl?: string;
  titreSeo?: string;
  descriptionSeo?: string;
  casContexte?: string;
  casEnjeu?: string;
  casFait?: string;
  casResultat?: string;
};

/**
 * LE DÉLAI DE RECONSTRUCTION DES PAGES.
 *
 * ⛔⛔ SOIXANTE SECONDES, C'ÉTAIT UN RÉGLAGE DE PRODUCTION APPLIQUÉ À UN
 * SERVEUR DE RECETTE — et ça a coûté cher en confiance. Trois fois dans la
 * même journée, une correction faite était invisible à l'écran : Giz voyait
 * une page périmée, moi aussi. J'ai failli « corriger » deux fois quelque
 * chose qui marchait déjà.
 * 👉 En production, ce délai protège le serveur. En recette, il ne protège
 * personne : il ment. Zéro seconde en développement, soixante en production.
 *
 * ⚠️ Le mensonge d'un cache est le pire à diagnostiquer : il ne produit
 * aucune erreur, il montre simplement le passé.
 */
export const DELAI_CACHE = process.env.NODE_ENV === "production" ? 60 : 0;

/**
 * ⭐ `titreSeo` / `descriptionSeo` REBRANCHÉS le 21/08/2026. Ils étaient
 * volontairement absents tant que les 146 réalisations les avaient tous
 * vides ; le showreel 2026 est la première à en porter un.
 *
 * ⛔⛔ ET LE COMMENTAIRE RESTE ICI, DEHORS DE LA REQUÊTE. GROQ ne connaît
 * pas les commentaires à l'étoile : glissés dans la requête, ils la cassent
 * au PARSING — donc à l'exécution. Les types passent, le build passe, et la
 * page rend un 500. Une requête est une CHAÎNE pour JavaScript, pas du code :
 * rien de ce qu'on écrit dedans n'est du commentaire.
 *
 * ⚠️ Et en corrigeant ça je viens de refaire l'autre faute jumelle : écrire
 * une étoile suivie d'une barre oblique DANS un commentaire le termine en
 * plein milieu. Les deux se sont produites à cinq minutes d'intervalle.
 */
const CHAMPS = `
  _id,
  "slug": slug.current,
  titre, client, clientUrl, metier, produit, video, intro, image, aRelire, ancienneUrl,
  casContexte, casEnjeu, casFait, casResultat,
  titreSeo, descriptionSeo
`;

/**
 * LA GALERIE, LA PLUS RÉCENTE EN TÊTE — demande de Giz, 21/08/2026.
 *
 * ⛔⛔ LE TRI ALPHABÉTIQUE ENTERRAIT LE TRAVAIL RÉCENT, et d'une façon que
 * personne ne pouvait deviner : il DISTINGUE LES MAJUSCULES. Presque tous les
 * titres sont en capitales (« ABB - … », « HUILES BERLIET ») ; les rares en
 * minuscules — dont « bluevista | Showreel 2026 » — se retrouvaient donc
 * APRÈS toutes les autres. Le showreel sortait en 145ᵉ position sur 147.
 * Giz : « je ne le vois pas dans la liste ». Il y était, tout en bas.
 *
 * ⚠️ ON TRIE SUR `_createdAt`, ET CE N'EST PAS UNE DATE DE PROJET. Le schéma
 * n'a AUCUN champ de date : `_createdAt` est l'horodatage d'import. Il fait
 * l'affaire parce que l'import a parcouru l'ancien site du plus ancien au plus
 * récent — les showreels 2019 → 2025 s'y succèdent dans l'ordre, ce qui le
 * vérifie. C'est déjà la règle des « 4 dernières » de l'accueil.
 * 👉 CE QUE ÇA NE FAIT PAS : refléter la vraie chronologie des tournages. Deux
 * projets importés dans la même seconde sortent dans un ordre arbitraire. Le
 * jour où l'ordre comptera vraiment, il faudra un champ de date rempli à la
 * main — ce tri-ci est une approximation, pas une vérité.
 */
export async function lireRealisations(version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v] | order(_createdAt desc) { ${CHAMPS} }`,
    { v: version },
    /* Les pages sont regénérées au plus toutes les 60 s : une correction
       dans le studio se voit sans reconstruire le site entier. */
    { next: { revalidate: DELAI_CACHE } }
  );
}

export async function lireRealisation(slug: string, version: Version = "fr") {
  return sanity.fetch<RealisationSanity | null>(
    `*[_type == "realisation" && language == $v && slug.current == $s][0] { ${CHAMPS} }`,
    { v: version, s: slug },
    { next: { revalidate: DELAI_CACHE } }
  );
}

/**
 * LES PAGES ÉDITABLES — savoir-faire, villes, métiers, agence, contact.
 *
 * ⛔ Le CONTENU vient de Sanity ; la STRUCTURE reste dans le code. C'est la
 * ligne de partage posée au moment du choix du backoffice : Giz change un
 * titre, un texte, une image — il ne peut pas déplacer une section ni en
 * inventer une. Rendre la mise en page éditable donne l'illusion de la
 * liberté et produit des pages cassées ; c'est ce qu'Elementor a fait à
 * l'ancien site.
 */
export type BlocTexte = { _key?: string; children?: { text?: string }[] };

export type PageSanity = {
  _id: string;
  genre: string;
  slug: string;
  titre: string;
  surTitre?: string;
  accroche?: string;
  image?: unknown;
  texte?: BlocTexte[];
  sections?: { _key?: string; titre: string; paragraphes?: BlocTexte[]; image?: unknown; galerie?: unknown[]; pleineLargeur?: boolean }[];
  faq?: { _key?: string; q: string; r: string }[];
  /** Récupérées de l'ancien site : plusieurs par page, Vimeo aujourd'hui. */
  videos?: { _key?: string; url: string; titre: string; vignetteUrl?: string }[];
  /** La composition libre : huit blocs typés, ordre choisi dans le studio. */
  blocs?: { _key?: string; _type: string; [k: string]: unknown }[];
  titreSeo?: string;
  descriptionSeo?: string;
  projets?: string[];
  /** Choix manuel des réalisations à montrer. Vide = sélection automatique. */
  projetsChoisis?: string[];
  ancienneUrl?: string;
};

const CHAMPS_PAGE = `
  _id, genre, "slug": slug.current, titre, surTitre, accroche, image,
  texte, sections, faq, videos, blocs, projets, projetsChoisis, ancienneUrl, titreSeo, descriptionSeo
`;

export async function lirePage(genre: string, slug: string, version: Version = "fr") {
  return sanity.fetch<PageSanity | null>(
    `*[_type == "page" && language == $v && genre == $g && slug.current == $s][0] { ${CHAMPS_PAGE} }`,
    { v: version, g: genre, s: slug },
    { next: { revalidate: DELAI_CACHE } }
  );
}

export async function lirePages(genre: string, version: Version = "fr") {
  return sanity.fetch<PageSanity[]>(
    `*[_type == "page" && language == $v && genre == $g] { ${CHAMPS_PAGE} }`,
    { v: version, g: genre },
    { next: { revalidate: DELAI_CACHE } }
  );
}

/** Le texte riche de Sanity, aplati en paragraphes lisibles. */
export const enParagraphes = (blocs?: BlocTexte[]): string[] =>
  (blocs ?? [])
    .map(b => (b.children ?? []).map(c => c.text ?? "").join(""))
    .filter(t => t.trim().length > 0);

/**
 * LES PROJETS VOISINS — le correctif du point faible du maillage.
 *
 * ⛔ MESURÉ AVANT DE CORRIGER : chaque fiche de réalisation ne recevait
 * QU'UN SEUL lien entrant, celui de l'index. Quarante pages avec un unique
 * lien entrant, c'est quarante pages que Google considère comme marginales
 * — et l'autorité de l'index ne se transmet pas quand elle se divise par
 * 170.
 *
 * Trois voisins par fiche multiplient les chemins : chaque réalisation
 * devient atteignable depuis d'autres réalisations, pas seulement depuis
 * une liste. Et c'est utile au visiteur, qui cherche rarement UN projet
 * mais plutôt « ce que vous avez fait de comparable ».
 */
export async function lireVoisines(slug: string, produit: string | null, metier: string | null, version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v && slug.current != $s
       && (produit == $p || metier == $m)]
     | order(select(produit == $p => 0, 1) asc, titre asc) [0...3] { ${CHAMPS} }`,
    { v: version, s: slug, p: produit, m: metier },
    { next: { revalidate: DELAI_CACHE } }
  );
}

/** Les réalisations d'un savoir-faire — pour les lister sur sa page. */
/**
 * ⛔⛔ ON RAMÈNE LARGE ET ON CHOISIT ENSUITE — la version précédente prenait
 * `order(titre asc)[0...6]`, c'est-à-dire les SIX PREMIÈRES DANS L'ALPHABET.
 * Giz : « les projets en bas sont soit souvent les mêmes soit pas adaptés du
 * tout ». Évidemment : deux pages qui partagent un produit recevaient les six
 * mêmes fiches, et l'alphabet ne sait rien de la qualité d'une vignette.
 * 👉 Le tri se fait maintenant dans la page, sur ce qui compte : une vidéo,
 * une image, et des clients différents.
 */
export async function lireRealisationsDuProduit(produits: string[], version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v && produit in $p] | order(titre asc) [0...60] { ${CHAMPS} }`,
    { v: version, p: produits },
    { next: { revalidate: DELAI_CACHE } }
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LES ACTUALITÉS — troisième objet du site, ajouté le 18/08/2026.

   ⛔ Elles ne passent PAS par `page` : une actualité raconte un projet daté,
   une page vend une compétence. Les mélanger, c'est ce qui avait produit
   26 réalisations fabriquées à partir d'articles, puis supprimées.
   ══════════════════════════════════════════════════════════════════════════ */

export type MediaActualite = {
  _key?: string;
  image?: unknown;
  videoUrl?: string;
  videoAffiche?: unknown;
  legende?: string;
  sousLegende?: string;
  texteAlternatif?: string;
};

export type BlocActualite = {
  _key?: string;
  surTitre?: string;
  titre?: string;
  paragraphes?: BlocTexte[];
  medias?: MediaActualite[];
  aparte?: string;
};

export type ActualiteSanity = {
  _id: string;
  slug: string;
  titre: string;
  chapo?: BlocTexte[];
  imageEntete?: unknown;
  client?: string;
  clientUrl?: string;
  datePublication: string;
  repere?: string;
  blocs?: BlocActualite[];
  projets?: {
    surTitre?: string;
    titre?: string;
    paragraphes?: BlocTexte[];
    boutonLibelle?: string;
    boutonLien?: string;
  };
  titreSeo?: string;
  descriptionSeo?: string;
};

const CHAMPS_ACTUALITE = `
  _id, "slug": slug.current, titre, chapo, imageEntete, client, clientUrl,
  datePublication, repere, blocs, projets, titreSeo, descriptionSeo
`;

export async function lireActualite(slug: string, version: Version = "fr") {
  return sanity.fetch<ActualiteSanity | null>(
    `*[_type == "actualite" && language == $v && slug.current == $s][0] { ${CHAMPS_ACTUALITE} }`,
    { v: version, s: slug },
    { next: { revalidate: DELAI_CACHE } }
  );
}

/** Les plus récentes, pour le bloc « à lire aussi » et pour l'index. */
export async function lireActualites(version: Version = "fr", limite = 12) {
  return sanity.fetch<ActualiteSanity[]>(
    `*[_type == "actualite" && language == $v] | order(datePublication desc) [0...$n] { ${CHAMPS_ACTUALITE} }`,
    { v: version, n: limite },
    { next: { revalidate: DELAI_CACHE } }
  );
}


/**
 * Les réalisations désignées une par une, DANS L'ORDRE DEMANDÉ.
 * ⚠️ GROQ rend les documents dans son ordre à lui : on réordonne ici, sinon
 * le choix de l'éditeur serait respecté sur le contenu et ignoré sur la suite.
 */

/**
 * LES DERNIÈRES RÉALISATIONS, POUR LA PAGE D'ACCUEIL.
 *
 * ⛔ NOS PROPRES FILMS SONT ÉCARTÉS. Showreels, bandes démo, « Bluevista
 * Creative » : quatorze fiches portent `client == "BLUEVISTA"`. Une vitrine
 * qui s'ouvre sur notre showreel ne prouve rien — c'est la faute corrigée
 * trois fois cette semaine sur les pages de savoir-faire, où ces mêmes films
 * occupaient jusqu'à trois places sur six.
 *
 * ⚠️ LE TRI SE FAIT SUR `_createdAt`, FAUTE DE MIEUX. Les réalisations n'ont
 * pas de champ de date de projet, et les 145 fiches ont été importées le même
 * jour : l'ordre entre elles est donc arbitraire. Les fiches créées ENSUITE
 * remontent correctement. Un vrai champ « date » réglerait ça, et c'est à
 * décider quand Giz reprendra les réalisations.
 *
 * ⛔ Et le `[0...n]` vient APRÈS le filtre : trancher avant filtrer renverrait
 * moins de cartes que demandé dès qu'un de nos films tombe dans le lot.
 */
export async function lireDernieresRealisations(combien = 4, version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v && client != "BLUEVISTA" && defined(image)]
       | order(_createdAt desc) [0...$n] { ${CHAMPS} }`,
    { v: version, n: combien },
    { next: { revalidate: DELAI_CACHE } }
  );
}

export async function lireRealisationsParSlugs(slugs: string[], version: Version = "fr") {
  const r = await sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v && slug.current in $s] { ${CHAMPS} }`,
    { v: version, s: slugs },
    { next: { revalidate: DELAI_CACHE } }
  );
  return slugs.map(s => r.find(x => x.slug === s)).filter(Boolean) as RealisationSanity[];
}
