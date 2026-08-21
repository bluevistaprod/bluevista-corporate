"use client";

import { useState } from "react";
import { BLEU, SOMBRE } from "./palette";

/**
 * LES PHOTOS « AU TRAVAIL », EN CARROUSEL — demande de Giz, 21/08/2026 :
 * « mets-en d'autres et fais défiler comme un carrousel avec à chaque fois
 * 4 à l'écran ».
 *
 * ⭐ POURQUOI QUATRE ET PAS UNE PAR ÉCRAN. Ces images ne se regardent pas une
 * par une : c'est leur ENCHAÎNEMENT qui raconte quelque chose — repérage,
 * tournage, installation, régie. Un carrousel qui n'en montre qu'une à la fois
 * détruirait exactement ce que la série dit.
 *
 * ⚠️ ON DÉFILE D'UNE PHOTO À LA FOIS, pas de quatre. Faire sauter la fenêtre
 * entière donne l'impression d'avoir raté quelque chose ; décaler d'un cran
 * garde un point de repère à l'écran entre deux états.
 *
 * ⛔ PAS DE DÉFILEMENT AUTOMATIQUE ICI, contrairement au carrousel des
 * actualités. Là-bas les images illustrent un texte qu'on lit ; ici elles sont
 * le contenu, et une bande qui bouge toute seule pendant qu'on la regarde est
 * une gêne, pas un service.
 *
 * ⚠️ Toutes les images restent dans le HTML — c'est la même règle que pour les
 * actualités : un carrousel qui monte ses images en JavaScript les fait
 * disparaître pour Google et pour les lecteurs d'écran.
 */
export function CarrouselPhotos({ photos }: { photos: [string, string][] }) {
  const [debut, setDebut] = useState(0);
  const PAR_ECRAN = 4;
  const max = Math.max(0, photos.length - PAR_ECRAN);
  const borne = (n: number) => Math.min(max, Math.max(0, n));

  const Fleche = ({ sens }: { sens: -1 | 1 }) => {
    const cible = borne(debut + sens);
    const inactif = cible === debut;
    return (
      <button
        type="button"
        onClick={() => setDebut(cible)}
        disabled={inactif}
        aria-label={sens === 1 ? "Photos suivantes" : "Photos précédentes"}
        className="flex h-11 w-11 items-center justify-center rounded-full border-0 transition"
        style={{
          background: inactif ? "#07222214" : BLEU,
          color: inactif ? "#07222240" : "#fff",
          cursor: inactif ? "default" : "pointer",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d={sens === 1 ? "M5 1l7 7-7 7" : "M11 1L4 8l7 7"}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  return (
    <div>
      {/* ⚠️ `overflow-hidden` sur le conteneur et translation sur la bande :
          on ne joue pas avec `scrollLeft`, qui se désynchronise dès qu'on
          redimensionne la fenêtre. */}
      {/* ⛔ MARGE NÉGATIVE SUR LE CONTENEUR, PAS `first:pl-0` SUR LA PREMIÈRE.
          Ma première version retirait la marge gauche de la vignette n°1 : elle
          devenait plus LARGE que les autres, donc plus HAUTE en 4/3, et les
          légendes ne s'alignaient plus. Toutes les vignettes ont maintenant la
          même marge, et c'est la bande qui recule pour que la première touche
          le bord. */}
      <div className="-mx-2 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${debut * (100 / PAR_ECRAN)}%)` }}
        >
          {photos.map(([src, legende]) => (
            <figure
              key={src}
              className="m-0 shrink-0 px-2"
              style={{ width: `${100 / PAR_ECRAN}%` }}
            >
              <img
                src={src}
                alt={legende}
                className="block w-full rounded-md object-cover"
                style={{ aspectRatio: "4 / 3", background: "#EBE8E1" }}
              />
              <figcaption className="mt-3 text-[15px]" style={{ color: SOMBRE, opacity: 0.72 }}>
                {legende}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Fleche sens={-1} />
        <Fleche sens={1} />
        <span className="ml-2 text-[14px] tabular-nums" style={{ color: SOMBRE, opacity: 0.45 }}>
          {debut + 1}–{Math.min(photos.length, debut + PAR_ECRAN)} sur {photos.length}
        </span>
      </div>
    </div>
  );
}
