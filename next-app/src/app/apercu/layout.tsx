import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Consentement } from "./_Consentement";
import { CaptureAcquisition } from "./_CaptureAcquisition";

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
      <head>
        {/* ⛔⛔ LE CONSENT MODE SE DÉCLARE ICI, DANS LE <head>, ET PAS DANS UN
            COMPOSANT REACT. C'est la différence entre « conforme » et
            « conforme sur le papier ».

            Une déclaration posée dans un `useEffect` s'exécute APRÈS
            l'hydratation. Le jour où une balise de mesure sera ajoutée, elle
            pourrait se charger AVANT — et déposer son cookie avant même que le
            refus par défaut soit connu. Ce script-ci part avant tout le reste.

            📌 Il lit aussi le choix déjà fait : sans ça, un visiteur qui a
            accepté verrait la mesure repartir de zéro à chaque page.

            ⚠️ `functionality_storage` et `security_storage` restent accordés :
            ils font fonctionner le site lui-même et ne demandent pas de
            consentement. Les refuser casserait sans rien protéger. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
try{var c=localStorage.getItem('bv-consentement')}catch(e){}
var a=c==='accepte'?'granted':'denied';
gtag('consent','default',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:a,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />
      </head>
      <body className="antialiased">
        {/*
          Capte le `gclid` dès la page d'ATTERRISSAGE. Il doit vivre ici et
          non dans le formulaire : le visiteur arrive par une annonce sur une
          page de compétence, puis navigue vers contact — à ce moment-là
          l'URL ne porte plus rien. Sans cette ligne, aucune demande ne serait
          attribuable à Google Ads, et le recâblage Ads de la semaine 5 n'aurait
          rien à mesurer.
        */}
        <CaptureAcquisition />
        {children}
      </body>
    </html>
  );
}
