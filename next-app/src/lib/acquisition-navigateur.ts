"use client";

/**
 * LA CAPTURE DU `gclid` — côté navigateur, et il faut comprendre pourquoi
 * elle ne peut PAS se faire au moment de l'envoi.
 *
 * ⛔ LE PIÈGE : le `gclid` arrive dans l'URL de la page d'ATTERRISSAGE
 * (`/nos-competences/video-mapping/?gclid=…`), or personne ne remplit le
 * formulaire sur cette page — on clique sur l'annonce, on lit, PUIS on va sur
 * contact. À ce moment-là l'URL ne porte plus rien. Lire `window.location` au
 * moment de l'envoi ne trouverait donc un gclid que sur les rarissimes
 * visiteurs qui atterrissent directement sur la page de contact.
 * 👉 On capte à l'ARRIVÉE, on garde, on relit à l'ENVOI.
 *
 * ⭐ ON GARDE AUSSI LA PREMIÈRE PAGE VUE, pas la page du formulaire. Toutes
 * les demandes partent de /contact : dire « la demande vient de /contact »
 * n'apprend rien. Ce qu'on veut savoir, c'est QUELLE page a converti.
 *
 * ⚠️ CHOIX DE STOCKAGE, ET SA LIMITE ASSUMÉE : sessionStorage, pas un cookie.
 * Un cookie de 90 jours rattacherait aussi le visiteur qui clique aujourd'hui
 * et écrit la semaine prochaine — mais c'est un stockage à finalité
 * publicitaire, donc soumis au consentement, et le bandeau n'existe pas
 * encore. sessionStorage couvre la visite en cours, ce qui est le trajet de
 * l'immense majorité des demandes, et ne survit pas à la fermeture de
 * l'onglet : rien à demander à personne.
 * 👉 Le jour où le bandeau + Consent Mode v2 seront en place (même semaine),
 *    basculer ces mêmes clés vers un cookie premier-parti de 90 jours, posé
 *    APRÈS consentement. Le reste du code n'a pas à changer.
 */

import { CLE_ACQUISITION, type Acquisition } from "./formulaires";

const PARAMETRES = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * À appeler à chaque affichage de page. Ne remplace jamais une capture déjà
 * faite : le premier contact est celui qui a payé la visite. Une deuxième
 * page vue sans gclid ne doit pas effacer le gclid de la première.
 */
export function capturerAcquisition(): void {
  if (typeof window === "undefined") return;

  try {
    const deja = lireAcquisition();
    const url = new URL(window.location.href);
    const nouveau: Acquisition = {};

    for (const p of PARAMETRES) {
      const v = url.searchParams.get(p);
      if (v) nouveau[p] = v.slice(0, 500);
    }

    // Rien de neuf et une capture existe déjà : on ne touche à rien.
    if (Object.keys(nouveau).length === 0 && deja.page) return;

    const fusion: Acquisition = {
      ...deja,
      ...nouveau,
      // La page et le référent ne s'écrasent pas non plus : on veut l'entrée.
      page: deja.page || url.origin + url.pathname,
      referent: deja.referent || refererExterne(),
    };

    window.sessionStorage.setItem(CLE_ACQUISITION, JSON.stringify(fusion));
  } catch {
    // ⚠️ sessionStorage lève en navigation privée sur certains navigateurs, et
    // quand le stockage est plein. Une demande qui part sans donnée
    // d'acquisition reste une demande : on n'empêche jamais l'envoi pour ça.
  }
}

export function lireAcquisition(): Acquisition {
  if (typeof window === "undefined") return {};
  try {
    const brut = window.sessionStorage.getItem(CLE_ACQUISITION);
    return brut ? (JSON.parse(brut) as Acquisition) : {};
  } catch {
    return {};
  }
}

/** Le référent, seulement s'il vient d'ailleurs — un lien interne n'apprend rien. */
function refererExterne(): string | undefined {
  const r = document.referrer;
  if (!r) return undefined;
  try {
    if (new URL(r).host === window.location.host) return undefined;
  } catch {
    return undefined;
  }
  return r.slice(0, 500);
}
