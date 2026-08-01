import React, { createContext, useContext } from "react";
import type { Domain } from "@shared/i18n";
import { DEFAULT_DOMAIN } from "@shared/i18n";
import type { Language } from "@shared/urls";
import { langFromPath, pathForLang } from "@shared/urls";

interface I18nContextType {
  language: Language;
  domain: Domain;
  isLoaded: boolean;
  switchLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * La langue vient de l'URL, et de nulle part ailleurs.
 *
 * ⛔ Ne PAS revenir à localStorage ni à navigator.language : une même adresse
 * servirait alors deux langues, Google n'en indexerait qu'une, et hreflang
 * deviendrait impossible. C'est le défaut qui a motivé cette réécriture.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Lu une seule fois au montage : changer de langue provoque une navigation
  // complète (voir switchLanguage), donc le composant est remonté avec la
  // bonne valeur. Pas besoin d'état réactif ici.
  const language = langFromPath(window.location.pathname);

  const hostname = window.location.hostname;
  const domain: Domain = hostname.includes("bluevista.ch") ? "ch" : DEFAULT_DOMAIN;

  const switchLanguage = (newLang: Language) => {
    if (newLang === language) return;
    // Navigation complète et non un simple changement d'état : la page doit
    // repartir avec le bon attribut lang, les bonnes balises et la bonne URL.
    window.location.assign(
      pathForLang(window.location.pathname, newLang) + window.location.search
    );
  };

  return (
    <I18nContext.Provider value={{ language, domain, isLoaded: true, switchLanguage }}>
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
