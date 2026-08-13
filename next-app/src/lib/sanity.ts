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
  casContexte?: string;
  casEnjeu?: string;
  casFait?: string;
  casResultat?: string;
};

const CHAMPS = `
  _id,
  "slug": slug.current,
  titre, client, clientUrl, metier, produit, video, intro, image, aRelire, ancienneUrl,
  casContexte, casEnjeu, casFait, casResultat
`;

export async function lireRealisations(version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v] | order(titre asc) { ${CHAMPS} }`,
    { v: version },
    /* Les pages sont regénérées au plus toutes les 60 s : une correction
       dans le studio se voit sans reconstruire le site entier. */
    { next: { revalidate: 60 } }
  );
}

export async function lireRealisation(slug: string, version: Version = "fr") {
  return sanity.fetch<RealisationSanity | null>(
    `*[_type == "realisation" && language == $v && slug.current == $s][0] { ${CHAMPS} }`,
    { v: version, s: slug },
    { next: { revalidate: 60 } }
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
  ancienneUrl?: string;
};

const CHAMPS_PAGE = `
  _id, genre, "slug": slug.current, titre, surTitre, accroche, image,
  texte, sections, faq, videos, blocs, projets, ancienneUrl, titreSeo, descriptionSeo
`;

export async function lirePage(genre: string, slug: string, version: Version = "fr") {
  return sanity.fetch<PageSanity | null>(
    `*[_type == "page" && language == $v && genre == $g && slug.current == $s][0] { ${CHAMPS_PAGE} }`,
    { v: version, g: genre, s: slug },
    { next: { revalidate: 60 } }
  );
}

export async function lirePages(genre: string, version: Version = "fr") {
  return sanity.fetch<PageSanity[]>(
    `*[_type == "page" && language == $v && genre == $g] { ${CHAMPS_PAGE} }`,
    { v: version, g: genre },
    { next: { revalidate: 60 } }
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
    { next: { revalidate: 60 } }
  );
}

/** Les réalisations d'un savoir-faire — pour les lister sur sa page. */
export async function lireRealisationsDuProduit(produits: string[], version: Version = "fr") {
  return sanity.fetch<RealisationSanity[]>(
    `*[_type == "realisation" && language == $v && produit in $p] | order(titre asc) [0...6] { ${CHAMPS} }`,
    { v: version, p: produits },
    { next: { revalidate: 60 } }
  );
}
