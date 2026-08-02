import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

/**
 * POPPINS — chargée pour l'essai demandé par Giz, 02/08/2026.
 *
 * Chargée par next/font, donc servie depuis notre domaine et non depuis
 * Google : pas de requête vers un tiers, rien à déclarer côté consentement
 * pour ça, et pas de saut de texte au chargement.
 *
 * 400/500 servent au corps dans le mode « Poppins partout », 600/700 aux
 * titres. Rien au-dessus : à grande taille, le 800 de Poppins referme les
 * contreformes et le mot devient une tache.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--police-poppins",
  display: "swap",
});

export default function ApercuLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      data-police="titres" est posé PAR LE SERVEUR, et c'est délibéré :
      Giz a tranché le 02/08/2026 — « poppins titre est le meilleur dans le
      sélecteur ». Le poser ici plutôt que dans l'interrupteur évite que la
      page s'affiche une fraction de seconde dans l'ancienne police avant de
      basculer. L'interrupteur reste en place pour continuer à comparer.
    */
    <html lang="fr" className={poppins.variable} data-police="titres">
      <body className="antialiased">{children}</body>
    </html>
  );
}
