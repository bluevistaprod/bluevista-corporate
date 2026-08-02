import type { Metadata } from "next";

/**
 * LA COQUILLE DU STUDIO.
 *
 * ⛔ CE PROJET N'A PAS DE LAYOUT RACINE : chaque segment fournit son propre
 * <html> et son <body>. C'est le choix fait pour que les aperçus de direction
 * artistique vivent indépendamment du site. La conséquence, qu'on découvre
 * seulement en ajoutant une route hors de ces segments : /admin n'avait pas
 * de coquille, d'où « Missing <html> and <body> tags in the root layout ».
 *
 * ⛔⛔ ET SURTOUT : ON N'IMPORTE PAS globals.css ICI, volontairement.
 * La feuille de style du site pose une remise à zéro Tailwind et impose
 * Poppins sur tous les h1/h2/h3. Appliquée au studio, elle repeint
 * l'interface d'édition de Sanity — champs, menus, boutons — et on passerait
 * des heures à croire que c'est le studio qui est cassé.
 *
 * Le studio apporte sa propre feuille de style. Il ne doit rien recevoir de
 * la nôtre.
 */
export const metadata: Metadata = {
  title: "Bluevista — administration",
  /* Une interface d'édition n'a rien à faire dans un index de recherche. */
  robots: { index: false, follow: false },
};

/* Le studio gère lui-même sa fenêtre : on lui laisse toute la hauteur. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, height: "100vh", overflow: "hidden" }}>{children}</body>
    </html>
  );
}
