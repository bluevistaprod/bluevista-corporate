import { t, tAll } from "@shared/i18n";
import { useI18nContext } from "@/contexts/I18nContext";

/**
 * Hook pour accéder à la langue, domaine et fonctions de traduction
 * Utilise le contexte global I18nProvider pour synchroniser les changements
 */
export function useI18n() {
  const { language, domain, isLoaded, switchLanguage } = useI18nContext();

  return {
    language,
    domain,
    isLoaded,
    switchLanguage,
    t: (key: string) => t(key, language),
    tAll: (key: string) => tAll(key),
  };
}
