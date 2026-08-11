"use client";

import { useEffect, useState } from "react";
import { BLEU, BLEU_CLAIR, SOMBRE_PROFOND } from "./_palette";

/**
 * LE BANDEAU DE CONSENTEMENT — et le Consent Mode v2 qui va avec.
 *
 * ⛔⛔ POURQUOI IL EST PLUS QU'UNE OBLIGATION LÉGALE, ET POURQUOI IL PASSE
 * AVANT LE RECÂBLAGE GOOGLE ADS : depuis mars 2024, **sans Consent Mode v2 les
 * conversions Ads ne remontent plus dans l'EEE**. Recâbler Ads en semaine 5
 * sans ce bandeau reviendrait à mesurer dans le vide — l'argent partirait sans
 * qu'on sache ce qu'il rapporte.
 *
 * ⭐ LE MÉCANISME, en une phrase : on déclare TOUT REFUSÉ par défaut, avant
 * qu'aucune balise ne se charge, puis on remonte le consentement quand le
 * visiteur l'accorde. Google reçoit alors des « pings » anonymes même en cas de
 * refus, et modélise ce qu'il ne peut plus mesurer.
 *
 * ⛔⛔ LA FAUTE À NE PAS REFAIRE — elle a été évitée de justesse sur
 * pulsecongress.com le 11/08/2026, et elle est vicieuse :
 * la politique de confidentialité annonçait qu'on peut retirer son
 * consentement « depuis ce même bandeau »… alors que le bandeau DISPARAÎT dès
 * qu'un choix est fait. Le texte est devenu FAUX à la seconde où la mesure a
 * été branchée.
 * 👉 D'où les deux garde-fous ci-dessous, et ils ne sont pas décoratifs :
 *   · un lien « Cookies » dans le pied de page ROUVRE le bandeau — sinon la
 *     promesse de retrait n'existe pas ;
 *   · passer de « accepté » à « refusé » RECHARGE la page — un script de
 *     mesure déjà chargé ne se décharge pas tout seul, et sans ce
 *     rechargement le refus ne vaudrait qu'à la visite suivante.
 *
 * 📌 LA RÈGLE GÉNÉRALE QUI EN SORT : une page légale écrite « pour plus tard »
 * devient fausse le jour où la fonction arrive. Quand on branche la fonction,
 * on relit la page dans le même geste — et on vérifie que ce qu'elle promet
 * existe vraiment à l'écran.
 *
 * ⚠️ AUCUNE MESURE N'EST ENCORE BRANCHÉE sur ce site. Le bandeau est posé
 * AVANT, volontairement : c'est l'ordre qui évite de collecter pendant les
 * quelques jours où « on va le mettre ». Le jour où GA4 arrive, il n'y aura
 * rien à ajouter ici — seulement l'identifiant de mesure.
 */

const CLE = "bv-consentement";
type Choix = "accepte" | "refuse";

/** Ce que le navigateur expose, sans dépendre d'un typage global de gtag. */
type FenetreMesure = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * ⛔ APPELÉ AVANT TOUTE BALISE, y compris quand le visiteur n'a rien choisi.
 * C'est la différence entre « conforme » et « conforme sur le papier » : une
 * balise qui se charge avant la déclaration a déjà déposé son cookie.
 */
function declarer(etat: Choix | null) {
  const w = window as FenetreMesure;
  w.dataLayer = w.dataLayer || [];
  const gtag = (...args: unknown[]) => w.dataLayer!.push(args);
  const accorde = etat === "accepte" ? "granted" : "denied";
  /* ⛔ TOUJOURS « update », JAMAIS « default » : le défaut est déclaré dans le
     <head> du layout, avant toute balise. Le poser une seconde fois ici
     écraserait un choix déjà remonté. */
  gtag("consent", "update", {
    ad_storage: accorde,
    ad_user_data: accorde,
    ad_personalization: accorde,
    analytics_storage: accorde,
    /* ⛔ Jamais refusé : c'est ce qui fait fonctionner le site lui-même
       (session, panier, sécurité). Le refuser casserait des choses sans rien
       protéger — la CNIL ne demande pas de consentement pour l'essentiel. */
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

export function Consentement() {
  const [choix, setChoix] = useState<Choix | null | undefined>(undefined);

  useEffect(() => {
    /* ⚠️ On ne re-déclare RIEN au chargement : le <head> l'a déjà fait, et
       avant nous. Ici on ne fait que décider d'afficher le bandeau ou non. */
    setChoix(localStorage.getItem(CLE) as Choix | null);

    /* Le lien « Cookies » du pied de page rouvre le bandeau. Sans lui, la
       politique de confidentialité promettrait un retrait impossible. */
    const rouvrir = () => setChoix(null);
    window.addEventListener("bv-rouvrir-consentement", rouvrir);
    return () => window.removeEventListener("bv-rouvrir-consentement", rouvrir);
  }, []);

  function repondre(reponse: Choix) {
    const avant = localStorage.getItem(CLE) as Choix | null;
    localStorage.setItem(CLE, reponse);
    declarer(reponse);
    setChoix(reponse);

    /* ⛔ Le rechargement n'est PAS une commodité : un script de mesure déjà
       chargé continue de tourner. Sans lui, « je refuse » ne prendrait effet
       qu'à la visite suivante — c'est-à-dire jamais pour celui qui part. */
    if (avant === "accepte" && reponse === "refuse") window.location.reload();
  }

  // `undefined` = on n'a pas encore lu le navigateur : ne rien afficher évite
  // que le bandeau clignote pour quelqu'un qui a déjà répondu.
  if (choix === undefined || choix === "accepte" || choix === "refuse") return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
    >
      <div
        className="mx-auto max-w-[1100px] rounded-md p-6 shadow-2xl sm:p-7"
        style={{ background: SOMBRE_PROFOND, color: "#fff" }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <p className="flex-1 text-[15px] leading-relaxed text-white/80">
            Nous aimerions mesurer l’audience de ce site pour savoir quelles
            pages vous servent vraiment. Rien ne se déclenche sans votre accord,
            et vous pouvez le retirer à tout moment depuis le lien{" "}
            <span className="font-semibold" style={{ color: BLEU_CLAIR }}>
              Cookies
            </span>{" "}
            en bas de page.{" "}
            <a
              href="/apercu/politique-de-confidentialite"
              className="underline decoration-1 underline-offset-4 hover:text-white"
            >
              Notre politique de confidentialité
            </a>
            .
          </p>

          {/* ⛔ LES DEUX BOUTONS ONT LE MÊME POIDS VISUEL. Un « refuser » en
              petit gris sous un « accepter » en gros vert est un dark pattern
              — la CNIL le sanctionne, et il trahit exactement ce que le texte
              ci-dessus promet. */}
          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              onClick={() => repondre("refuse")}
              className="rounded-md border-2 px-7 py-3.5 text-[15px] font-bold transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,.4)", color: "#fff" }}
            >
              Refuser
            </button>
            <button
              onClick={() => repondre("accepte")}
              className="rounded-md px-7 py-3.5 text-[15px] font-bold text-white transition hover:brightness-110"
              style={{ background: BLEU }}
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Le lien du pied de page qui rouvre le bandeau.
 * ⛔ Il rend la promesse de retrait VRAIE. Sans lui, la politique de
 * confidentialité mentirait — c'est la faute évitée sur pulsecongress.
 */
export function LienCookies({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("bv-rouvrir-consentement"))}
    >
      Cookies
    </button>
  );
}
