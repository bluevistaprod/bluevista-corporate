/**
 * Langue et URL — la source de vérité unique.
 *
 * ⛔ Règle de fond : la langue vit DANS L'URL, jamais dans le stockage local ni
 * dans la langue du navigateur. C'est la seule façon pour Google d'indexer une
 * page par langue, et la condition pour poser des balises hreflang.
 *
 *   /              → français  (langue par défaut, sans préfixe)
 *   /en/...        → anglais
 *   /es/...        → espagnol
 *
 * Le français n'a pas de préfixe : c'est la langue principale du site, et lui en
 * donner un obligerait à rediriger l'intégralité de l'existant sans rien gagner.
 */

export const LANGUAGES = ["fr", "en", "es"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "fr";

/** Les langues qui portent un préfixe d'URL (toutes sauf la langue par défaut). */
export const PREFIXED_LANGUAGES = LANGUAGES.filter(l => l !== DEFAULT_LANGUAGE);

export function isLanguage(value: string | null | undefined): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * Langue portée par un chemin.
 *   "/en/portfolio" → "en"   ·   "/portfolio" → "fr"   ·   "/en" → "en"
 */
export function langFromPath(pathname: string): Language {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLanguage(first) && first !== DEFAULT_LANGUAGE ? first : DEFAULT_LANGUAGE;
}

/**
 * Préfixe à donner au routeur pour une langue.
 *   "fr" → ""   ·   "en" → "/en"
 */
export function basePath(lang: Language): string {
  return lang === DEFAULT_LANGUAGE ? "" : `/${lang}`;
}

/**
 * Chemin débarrassé de son préfixe de langue.
 *   "/en/portfolio" → "/portfolio"   ·   "/en" → "/"
 */
export function stripLang(pathname: string): string {
  const lang = langFromPath(pathname);
  if (lang === DEFAULT_LANGUAGE) return pathname || "/";
  const reste = pathname.slice(`/${lang}`.length);
  return reste === "" ? "/" : reste;
}

/**
 * Même page, autre langue.
 *   ("/en/portfolio", "es") → "/es/portfolio"
 *   ("/en/portfolio", "fr") → "/portfolio"
 */
export function pathForLang(pathname: string, lang: Language): string {
  const nu = stripLang(pathname);
  const base = basePath(lang);
  if (nu === "/") return base || "/";
  return `${base}${nu}`;
}

/**
 * Les adresses équivalentes d'une page dans toutes les langues.
 * Sert à générer les balises hreflang et le plan de site.
 */
export function alternatesForPath(
  pathname: string,
  origin: string
): { lang: Language; href: string }[] {
  return LANGUAGES.map(lang => ({
    lang,
    href: `${origin}${pathForLang(pathname, lang)}`,
  }));
}
