import { useEffect } from "react";
import { useLocation } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { LANGUAGES, pathForLang, stripLang } from "@shared/urls";

/**
 * Pose, à chaque changement de page, ce dont les moteurs ont besoin :
 * l'attribut lang, l'adresse canonique et les équivalents par langue (hreflang).
 *
 * ⚠️ Rustine assumée, pas une solution : ces balises sont écrites par
 * JavaScript, donc invisibles pour tout ce qui n'exécute pas de script —
 * aperçus LinkedIn et WhatsApp, robots des IA, et Google au premier passage.
 * La vraie réponse est le rendu serveur (lot 3). Ce composant évite seulement
 * que la situation soit pire que celle de l'ancien site en attendant.
 */
export default function SeoHead() {
  const [location] = useLocation();
  const { language } = useI18n();

  useEffect(() => {
    const origin = window.location.origin;
    const chemin = window.location.pathname;

    document.documentElement.lang = language;

    const poser = (
      selecteur: string,
      creer: () => HTMLLinkElement
    ): HTMLLinkElement => {
      let el = document.head.querySelector<HTMLLinkElement>(selecteur);
      if (!el) {
        el = creer();
        document.head.appendChild(el);
      }
      return el;
    };

    // Adresse canonique — sans paramètres, pour ne pas éclater une même page
    // en autant d'adresses que de campagnes publicitaires.
    poser('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    }).href = origin + chemin;

    // Équivalents par langue. Chaque page doit se déclarer elle-même ET
    // déclarer ses sœurs, sinon Google ignore l'ensemble.
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach(n => n.remove());

    const alternatives = [
      ...LANGUAGES.map(l => ({ hreflang: l, href: origin + pathForLang(chemin, l) })),
      { hreflang: "x-default", href: origin + stripLang(chemin) },
    ];

    for (const alt of alternatives) {
      const l = document.createElement("link");
      l.rel = "alternate";
      l.hreflang = alt.hreflang;
      l.href = alt.href;
      document.head.appendChild(l);
    }
  }, [location, language]);

  return null;
}
