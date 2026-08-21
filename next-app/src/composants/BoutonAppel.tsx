"use client";

import { useState } from "react";
import { BLEU } from "./palette";

/**
 * « UN APPEL RAPIDE ? » — puis le numéro, sur le bouton lui-même.
 *
 * ⭐ POURQUOI CE GESTE PLUTÔT QU'UN LIEN `tel:`. Sur un ordinateur, un lien
 * `tel:` ouvre une application que la plupart des gens n'ont pas configurée —
 * il ne se passe rien, et le visiteur croit que le bouton est cassé. Afficher
 * le numéro EN PLACE marche partout : on le lit, on le compose, ou on clique
 * si le téléphone sait le faire.
 *
 * ⛔ ET LE NUMÉRO N'EST PAS DANS LE HTML AVANT LE CLIC. C'est la même logique
 * que l'adresse mail des mentions légales : un numéro en clair dans la page est
 * aspiré par les robots de démarchage. Ici il n'existe qu'après une action
 * humaine.
 * ⚠️ Ce n'est pas une protection forte — un robot qui exécute le JavaScript
 * le verrait. C'est une gêne, pas un mur, et ça suffit contre les aspirateurs
 * ordinaires.
 *
 * 📌 Lyon est le siège social : c'est le numéro qui décroche par défaut.
 */
export function BoutonAppel() {
  const [montre, setMontre] = useState(false);

  if (montre) {
    return (
      <a
        href="tel:+33472345189"
        className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
        style={{ background: BLEU }}
      >
        04 72 34 51 89
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setMontre(true)}
      className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
      style={{ background: BLEU }}
    >
      Un appel rapide ?
    </button>
  );
}
