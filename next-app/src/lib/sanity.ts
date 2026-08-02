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
  titre, client, metier, produit, video, intro, image, aRelire, ancienneUrl,
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
