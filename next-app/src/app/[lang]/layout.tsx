import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { LANGUAGES, isLanguage } from "@/shared/urls";
import "../globals.css";
import { Consentement } from "../../composants/Consentement";
import { CaptureAcquisition } from "../../composants/CaptureAcquisition";

/**
 * LE GABARIT DU SITE PUBLIC. Toutes les pages passent par ici.
 *
 * ⛔⛔ CE FICHIER ÉTAIT UN ÉCHAFAUDAGE, ET ÇA SE VOYAIT EN LIGNE. Il posait
 * `<html>`, `<body>` et trois pastilles « FR EN ES » — rien d'autre. Tout ce
 * qui fait un site vivait dans le gabarit de l'APERÇU, jamais servi au public :
 *     ⛔ la police Poppins — les pages publiques sortaient dans la police de
 *        repli du navigateur, sur un site dont la typographie est un choix ;
 *     ⛔ le bandeau de consentement — obligatoire, et sans lui les conversions
 *        Google Ads ne remontent pas dans l'EEE ;
 *     ⛔ la déclaration Consent Mode v2 dans le `<head>` ;
 *     ⛔ la capture du `gclid` à l'atterrissage, sans quoi aucune demande
 *        n'est attribuable à une annonce.
 * 👉 Quatre manques qu'aucune page ne pouvait révéler : ils étaient dans le
 * gabarit, l'endroit qu'on ne relit jamais parce qu'il n'a pas de contenu.
 *
 * ⚠️ La langue est un segment de route, donc connue du serveur avant le
 * rendu : l'attribut `lang` est juste dans le HTML livré, pas posé après coup
 * par JavaScript.
 */

export const metadata: Metadata = {
  title: {
    default: "Bluevista — Agence vidéo, événementiel et immersion",
    template: "%s | Bluevista",
  },
};

/**
 * POPPINS — chargée par `next/font`, donc servie depuis notre domaine et non
 * depuis Google : aucune requête vers un tiers, rien à déclarer côté
 * consentement pour la police, et pas de saut de texte au chargement.
 *
 * 400/500 pour le corps, 600/700 pour les titres. Rien au-dessus : à grande
 * taille, le 800 de Poppins referme les contreformes et le mot devient une
 * tache.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--police-poppins",
  display: "swap",
});

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
    /* `data-police="titres"` est posé PAR LE SERVEUR : le poser côté client
       ferait clignoter la page dans l'ancienne police avant de basculer. */
    <html lang={lang} className={poppins.variable} data-police="titres">
      <head>
        {/* ⛔⛔ LE CONSENT MODE SE DÉCLARE ICI, DANS LE `<head>`, ET PAS DANS UN
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
        {/* Capte le `gclid` dès la page d'ATTERRISSAGE. Il doit vivre ici et
            non dans le formulaire : le visiteur arrive par une annonce sur une
            page de savoir-faire, puis navigue vers contact — à ce moment-là
            l'URL ne porte plus rien. Sans cette ligne, aucune demande ne serait
            attribuable à Google Ads, et le recâblage Ads de la semaine 5
            n'aurait rien à mesurer. */}
        <CaptureAcquisition />
        {children}
        <Consentement />
      </body>
    </html>
  );
}
