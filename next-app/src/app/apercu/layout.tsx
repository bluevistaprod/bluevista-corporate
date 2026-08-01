import type { Metadata } from "next";
import "../globals.css";

/**
 * Aperçus de direction artistique — pages de travail, jamais publiées.
 *
 * Elles vivent hors du segment [lang] pour rester indépendantes du site :
 * on les supprimera d'un bloc une fois la direction tranchée.
 */
export const metadata: Metadata = {
  title: "Aperçus de direction artistique — Bluevista",
  robots: { index: false, follow: false },
};

export default function ApercuLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
