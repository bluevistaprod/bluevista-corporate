import { sanity, type Version } from "./sanity";

/**
 * LES DÉCLARATIONS hreflang — générées depuis Sanity, jamais écrites à la main.
 *
 * ⛔ CE QU'EST UN hreflang, ET CE QU'IL N'EST PAS.
 * C'est une ligne invisible dans l'en-tête du document. Ce n'est pas un lien :
 * personne ne peut cliquer dessus, Google ne l'affiche jamais au visiteur, et
 * elle ne transmet aucune autorité. Elle dit une seule chose — ces pages sont
 * des variantes régionales, pas des copies.
 *
 * 👉 POURQUOI ON EN MET, alors qu'on a justement cloisonné les deux sites :
 * sans elle, Google voit deux pages françaises de la même entreprise, en
 * choisit une et FILTRE l'autre. Et c'est la plus forte qui gagne —
 * bluevistaprod.com a vingt ans d'historique face à un bluevista.ch neuf.
 * Le site français capterait donc les recherches suisses, c'est-à-dire
 * exactement l'inverse du cloisonnement voulu. Le hreflang ne perce pas la
 * séparation : il la rend effective là où on ne contrôle rien autrement.
 */

const DOMAINES: Record<Version, string> = {
  fr: "https://www.bluevistaprod.com",
  en: "https://www.bluevistaprod.com",
  es: "https://www.bluevistaprod.com",
  "fr-ch": "https://www.bluevista.ch",
  "en-ch": "https://www.bluevista.ch",
};

/** Le code réellement écrit dans l'attribut, avec sa région. */
const CODES: Record<Version, string> = {
  fr: "fr-FR",
  en: "en",
  es: "es",
  "fr-ch": "fr-CH",
  "en-ch": "en-CH",
};

/** Le préfixe d'URL d'une version. Le français de chaque site est sans préfixe. */
const PREFIXE: Record<Version, string> = {
  fr: "",
  en: "/en",
  es: "/es",
  "fr-ch": "",
  "en-ch": "/en",
};

export type Alternative = { version: Version; code: string; url: string };

/** Les quatre familles de pages pilotées par Sanity. */
export type Genre = "realisation" | "savoir-faire" | "metier" | "ville";

/**
 * LE SEGMENT D'URL DE CHAQUE FAMILLE, PAR VERSION.
 *
 * ⚠️ Ce n'est pas seulement le slug qui change d'une langue à l'autre : le
 * segment aussi. `/realisations/engie` a pour équivalent `/works/engie`, pas
 * `/realisations/engie`. Une déclaration hreflang qui garderait le segment
 * français pointerait vers une adresse inexistante sur la version anglaise.
 *
 * ⚠️ À FAIRE VALIDER PAR GIZ. Ces traductions sont les miennes et elles ne
 * sont pas neutres — un segment d'URL se référence, et le changer plus tard
 * coûtera une redirection sur chaque page de la famille. Le suisse
 * francophone reprend volontairement les segments français : c'est la même
 * langue, et rien ne justifierait de les distinguer.
 */
const SEGMENTS: Record<Genre, Record<Version, string>> = {
  realisation: {
    fr: "realisations", en: "works", es: "proyectos",
    "fr-ch": "realisations", "en-ch": "works",
  },
  "savoir-faire": {
    fr: "savoir-faire", en: "expertise", es: "servicios",
    "fr-ch": "savoir-faire", "en-ch": "expertise",
  },
  metier: {
    fr: "offres", en: "offering", es: "ofertas",
    "fr-ch": "offres", "en-ch": "offering",
  },
  ville: {
    fr: "agence", en: "offices", es: "oficinas",
    "fr-ch": "agence", "en-ch": "offices",
  },
};

/**
 * Les versions publiées d'un document, y compris lui-même.
 *
 * ⛔ ON NE LIT QUE LE PUBLIÉ. `sanity` est configuré en perspective
 * « published » : un brouillon n'est donc jamais déclaré. Déclarer une page
 * qui n'est pas en ligne produit un hreflang vers une 404 — le défaut le plus
 * courant, et celui qui fait ignorer TOUT le groupe par Google.
 */
async function versionsPubliees(id: string) {
  return sanity.fetch<{ language: Version; slug: string }[]>(
    `*[_type == "translation.metadata" && references($id)][0]
       .translations[].value-> { language, "slug": slug.current }`,
    { id },
    /* 60 s comme le reste du site, et pas davantage : ce cache est
       exactement le délai pendant lequel une page dépubliée resterait
       déclarée à Google. Le rallonger pour économiser des requêtes
       reviendrait à rallonger la fenêtre d'incohérence. */
    { next: { revalidate: 60 } }
  );
}

/**
 * Construit les alternatives d'une page.
 *
 * ⛔⛔ LA RÈGLE QUI FAIT ÉCHOUER LA PLUPART DES IMPLÉMENTATIONS, et que Giz a
 * demandée explicitement : **s'il ne reste QU'UNE version, on ne déclare RIEN**.
 *
 * Un hreflang qui ne pointe que vers lui-même n'a aucun sens — il annonce un
 * groupe de traductions qui n'existe pas. Et le cas se produit tout seul : le
 * jour où l'on dépublie la version anglaise d'une page, la version française
 * garde sa déclaration et pointe vers une page morte. Rien ne casse, rien ne
 * s'affiche, et Google cesse silencieusement de faire confiance aux
 * déclarations du site entier.
 *
 * D'où le calcul à chaque rendu plutôt qu'une liste figée : dépublier une
 * traduction retire mécaniquement la déclaration de l'autre côté.
 */
export async function alternatives(id: string, genre: Genre): Promise<Alternative[]> {
  const versions = (await versionsPubliees(id))?.filter(v => v?.language && v?.slug) ?? [];

  // ⛔ Une seule version publiée : aucune déclaration. Voir plus haut.
  if (versions.length < 2) return [];

  return versions.map(v => ({
    version: v.language,
    code: CODES[v.language],
    url:
      DOMAINES[v.language] +
      PREFIXE[v.language] +
      `/${SEGMENTS[genre][v.language]}/${v.slug}`,
  }));
}

/**
 * Le bloc `alternates` à poser dans le `generateMetadata` d'une page.
 * C'est le seul point d'entrée que les pages appellent.
 *
 * ⚠️ LA DÉCLARATION INCLUT LA PAGE ELLE-MÊME. Une page qui déclare ses
 * voisines sans se déclarer est ignorée par Google — subtilité qui ne
 * provoque aucune erreur visible, d'où le contrôle automatique dans
 * scripts/verifier-hreflang.mjs.
 *
 * 📌 `x-default` désigne la version servie à qui ne correspond à aucune
 * autre. On donne le français de bluevistaprod.com : c'est le site le plus
 * complet, et l'anglais n'est pas notre marché principal.
 *
 * 📌 Le canonique est posé même quand il n'y a pas d'alternative — il ne
 * dépend pas des traductions, et une page sans canonique laisse Google
 * choisir entre ses variantes d'adresse (avec ou sans paramètres).
 */
export async function alternatesDe(id: string, genre: Genre, version: Version) {
  const alts = await alternatives(id, genre);
  const moi = alts.find(a => a.version === version);

  if (!alts.length) return undefined;

  return {
    canonical: moi?.url,
    languages: {
      ...Object.fromEntries(alts.map(a => [a.code, a.url])),
      "x-default": alts.find(a => a.version === "fr")?.url ?? alts[0].url,
    },
  };
}
