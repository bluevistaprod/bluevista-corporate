import { useEffect, useState } from "react";
import type { Language, Domain } from "@shared/i18n";
import { DEFAULT_LANGUAGE, DEFAULT_DOMAIN, t, tAll } from "@shared/i18n";

/**
 * Hook pour gérer la langue et le domaine
 * Récupère la langue depuis l'URL ou localStorage
 * Récupère le domaine depuis le hostname
 */
export function useI18n() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [domain, setDomain] = useState<Domain>(DEFAULT_DOMAIN);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Déterminer le domaine depuis le hostname
    const hostname = window.location.hostname;
    const detectedDomain: Domain = hostname.includes("bluevista.ch")
      ? "ch"
      : "com";
    setDomain(detectedDomain);

    // Déterminer la langue
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang") as Language | null;

    const storedLang = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.split("-")[0] as Language;

    let detectedLang: Language = DEFAULT_LANGUAGE;

    if (urlLang && ["fr", "en"].includes(urlLang)) {
      detectedLang = urlLang;
    } else if (storedLang && ["fr", "en"].includes(storedLang)) {
      detectedLang = storedLang;
    } else if (["fr", "en"].includes(browserLang)) {
      detectedLang = browserLang;
    }

    setLanguage(detectedLang);
    localStorage.setItem("language", detectedLang);
    setIsLoaded(true);
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);

    // Mettre à jour l'URL sans rechargement
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
  };

  return {
    language,
    domain,
    isLoaded,
    switchLanguage,
    t: (key: string) => t(key, language),
    tAll: (key: string) => tAll(key),
  };
}
