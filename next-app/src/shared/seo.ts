import type { Metadata } from "next";
import { LANGUAGES, pathForLang, stripLang, type Language } from "./urls";

/**
 * L'origine du site, telle qu'elle doit apparaître dans les URL canoniques et
 * les hreflang. En développement on retombe sur localhost ; en production la
 * valeur vient de l'environnement, jamais d'une constante en dur — le même code
 * sert bluevistaprod.com et bluevista.ch.
 */
export function origine(): string {
  return process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";
}

/**
 * Construit les métadonnées d'une page : titre, description, adresse canonique
 * et équivalents par langue.
 *
 * ⚠️ Différence essentielle avec l'ancienne version du site : ces balises sont
 * produites PAR LE SERVEUR et présentes dans le HTML livré. Elles sont donc
 * lues par Google au premier passage, et par tout ce qui n'exécute pas de
 * JavaScript — aperçus LinkedIn et WhatsApp, robots des IA.
 */
export function metadonnees(opts: {
  lang: Language;
  /** Chemin sans préfixe de langue, par exemple "/portfolio". */
  chemin: string;
  titre: string;
  description: string;
}): Metadata {
  const base = origine();
  const cheminNu = stripLang(opts.chemin);

  const languages: Record<string, string> = {};
  for (const l of LANGUAGES) {
    languages[l] = base + pathForLang(cheminNu, l);
  }
  languages["x-default"] = base + cheminNu;

  return {
    /* ⛔⛔ LE SUFFIXE SE DOUBLAIT. Le gabarit du layout est « %s | Bluevista ».
       Un titre venu de Sanity porte souvent DÉJÀ « | Bluevista » — le résultat
       sortait en « … | Bluevista | Bluevista ». Invisible à l'écran, visible
       dans l'onglet et dans les résultats de recherche.
       👉 On détecte le suffixe et on rend le titre absolu dans ce cas. Corriger
       les titres un par un dans Sanity aurait marché aussi, mais le défaut
       serait revenu au premier titre saisi avec le suffixe. */
    title: /\|\s*Bluevista\s*$/i.test(opts.titre)
      ? { absolute: opts.titre }
      : opts.titre,
    description: opts.description,
    alternates: {
      canonical: base + pathForLang(cheminNu, opts.lang),
      languages,
    },
    openGraph: {
      title: opts.titre,
      description: opts.description,
      url: base + pathForLang(cheminNu, opts.lang),
      siteName: "Bluevista",
      locale: opts.lang,
      type: "website",
    },
  };
}
