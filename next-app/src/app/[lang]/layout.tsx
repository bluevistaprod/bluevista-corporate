import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES, isLanguage, pathForLang, type Language } from "@/shared/urls";
import "../globals.css";

/**
 * Toutes les pages passent par ici. La langue est un segment de route, donc
 * connue du serveur avant le rendu : l'attribut lang est correct dans le HTML
 * livré, et non posé après coup par JavaScript comme sur l'ancienne maquette.
 */

export const metadata: Metadata = {
  title: {
    default: "Bluevista — Agence vidéo, événementiel et immersion",
    template: "%s | Bluevista",
  },
};

/** Pré-génère les trois langues à la compilation. */
export function generateStaticParams() {
  return LANGUAGES.map(lang => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <html lang={lang}>
      <body className="antialiased">
        <SelecteurDeLangue courante={lang} />
        {children}
      </body>
    </html>
  );
}

/**
 * Sélecteur de langue en vrais liens : un moteur doit pouvoir suivre la version
 * étrangère d'une page, et l'utilisateur doit pouvoir l'ouvrir dans un onglet.
 * Rendu côté serveur, donc présent dans le HTML livré.
 */
function SelecteurDeLangue({ courante }: { courante: Language }) {
  return (
    <nav aria-label="Choix de la langue" style={{ padding: "1rem", display: "flex", gap: "0.5rem" }}>
      {LANGUAGES.map(lang => (
        <a
          key={lang}
          href={pathForLang("/", lang)}
          hrefLang={lang}
          aria-current={lang === courante ? "true" : undefined}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "0.25rem",
            fontWeight: lang === courante ? 700 : 400,
            background: lang === courante ? "#2563eb" : "transparent",
            color: lang === courante ? "white" : "inherit",
          }}
        >
          {lang.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
