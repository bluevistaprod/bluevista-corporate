"use client";

import { useState } from "react";
import { METIERS } from "./_plan-du-site";
import { BLEU } from "./_palette";

/**
 * LE CHOIX DU MÉTIER dans le formulaire de contact.
 *
 * ⛔ POURQUOI UN COMPOSANT CLIENT plutôt qu'une simple case à cocher stylée.
 * La première version utilisait `peer-checked:` de Tailwind : l'état coché
 * n'était pas peint. Le bouton sélectionné restait donc identique aux autres
 * — c'est-à-dire qu'on ne voyait pas ce qu'on avait choisi.
 *
 * Ce genre de bug est exactement ce que Giz a signalé en disant « des textes
 * qui se chevauchent partout » : ce n'était pas de la géométrie, c'était de
 * la lisibilité. Un état invisible et un texte illisible produisent la même
 * impression de page cassée.
 *
 * Ici l'état vit dans React : il est peint ou il ne l'est pas, et ça se
 * vérifie. Le vrai `<input radio>` reste dans le DOM pour que le formulaire
 * s'envoie normalement et reste accessible au clavier.
 */
export function ChoixMetier() {
  const [choix, setChoix] = useState<string | null>(null);
  const options = [
    ...METIERS.map(m => ({ cle: m.cle as string, nom: m.nom })),
    { cle: "autre", nom: "Je ne sais pas encore" },
  ];

  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {options.map(o => {
        const on = choix === o.cle;
        return (
          <label key={o.cle} className="cursor-pointer">
            <input
              type="radio"
              name="metier"
              value={o.cle}
              checked={on}
              onChange={() => setChoix(o.cle)}
              className="sr-only"
            />
            <span
              className="block rounded-md border-2 px-5 py-3 text-[15px] font-semibold transition"
              style={{
                borderColor: on ? BLEU : "rgba(0,0,0,.12)",
                background: on ? BLEU : "transparent",
                color: on ? "#fff" : "inherit",
              }}
            >
              {o.nom}
            </span>
          </label>
        );
      })}
    </div>
  );
}
