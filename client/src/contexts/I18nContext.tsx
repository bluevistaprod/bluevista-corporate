import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language, Domain } from "@shared/i18n";
import { DEFAULT_LANGUAGE, DEFAULT_DOMAIN } from "@shared/i18n";

interface I18nContextType {
  language: Language;
  domain: Domain;
  isLoaded: boolean;
  switchLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <I18nContext.Provider
      value={{
        language,
        domain,
        isLoaded,
        switchLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within I18nProvider");
  }
  return context;
}
