"use client";

import { useState } from "react";
import { LecteurVideo } from "./LecteurVideo";
import { BLEU_CLAIR } from "./palette";

export type Histoire = {
  titre: string;
  texte: string;
  chute: string;
  video: string;
  affiche: string;
  duree: string;
};

/**
 * LES TROIS HISTOIRES, AVEC LA VIDÉO OÙ GIZ LES RACONTE — 21/08/2026.
 *
 * ⭐ LE CHOIX DE DISPOSITION EST DE GIZ, après trois maquettes comparées : une
 * vidéo en vedette à gauche, les trois histoires à droite, et un carrousel
 * pour passer de l'une à l'autre.
 *
 * ⭐⭐ ET LES HISTOIRES SONT LA NAVIGATION DU CARROUSEL. C'est le point de
 * conception qui vaut d'être gardé : plutôt que d'ajouter des flèches et des
 * pastilles au-dessus du lecteur, on rend les trois titres cliquables. Le
 * visiteur ne pilote pas un carrousel, il choisit une histoire — et le geste
 * qu'on lui demande est celui qu'il voulait faire de toute façon.
 * ⚠️ Des pastilles restent EN PLUS, mais sous le lecteur et discrètes : sur un
 * écran de téléphone la colonne de texte passe sous la vidéo, et le lien entre
 * les deux cesse d'être visible d'un coup d'œil.
 *
 * ⛔ LE LECTEUR EST REMONTÉ À CHAQUE CHANGEMENT (`key={i}`). Sans ça, React
 * garde l'instance : l'iframe déjà ouverte se contente de changer d'adresse,
 * et la vidéo suivante démarre toute seule chez quelqu'un qui a simplement
 * cliqué sur un titre. Avec la clé, on retrouve l'affiche et son bouton.
 *
 * ⛔⛔ ON N'ÉCRIT JAMAIS « GIZ » DANS LA PAGE. C'est une appellation INTERNE,
 * consigne du 21/08/2026 — et je l'avais mise trois fois dans cette section
 * (« Giz raconte », « Voir Giz la raconter », « Giz l'explique »). Un surnom
 * d'atelier sur une page publique fait deux dégâts : il exclut le lecteur qui
 * ne sait pas qui c'est, et il donne au site un ton d'entre-soi.
 * 👉 Formulations neutres : « En vidéo — 1 min 15 », « Voir l'histoire en
 * vidéo ». Si un jour il faut nommer quelqu'un, ce sera son vrai nom, et
 * seulement après son accord.
 *
 * ⚠️ LES VIDÉOS SONT VERTICALES (1080×1920) — ce sont les formats réseaux
 * sociaux, réutilisés tels quels. D'où la colonne étroite : un 9/16 étiré sur
 * toute la largeur d'une section serait grotesque.
 */
export function CarrouselHistoires({ histoires }: { histoires: Histoire[] }) {
  const [actif, setActif] = useState(0);
  const h = histoires[actif];

  return (
    <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,340px)_1fr]">
      {/* ── LA VIDÉO ────────────────────────────────────────────────── */}
      <div>
        <LecteurVideo
          key={actif}
          format="portrait"
          sansLegende
          video={{ url: h.video, titre: h.titre, vignetteUrl: h.affiche }}
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[14px] leading-snug text-white/60">
            En vidéo — {h.duree}
          </p>
          {/* Les pastilles : un repère de position, pas la commande principale. */}
          <div className="flex items-center gap-2">
            {histoires.map((x, i) => (
              <button
                key={x.titre}
                type="button"
                onClick={() => setActif(i)}
                aria-label={`Voir : ${x.titre}`}
                aria-current={i === actif ? "true" : undefined}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === actif ? 22 : 8,
                  background: i === actif ? BLEU_CLAIR : "#ffffff40",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── LES TROIS HISTOIRES ─────────────────────────────────────── */}
      <div className="grid gap-9">
        {histoires.map((x, i) => {
          const ouvert = i === actif;
          return (
            <div
              key={x.titre}
              className="border-t-2 pt-6 transition-opacity duration-300"
              style={{
                borderColor: ouvert ? BLEU_CLAIR : "#ffffff2e",
                opacity: ouvert ? 1 : 0.62,
              }}
            >
              {/* ⚠️ Un vrai bouton : c'est une commande, elle doit s'atteindre
                  au clavier et s'annoncer comme telle. */}
              <button
                type="button"
                onClick={() => setActif(i)}
                aria-current={ouvert ? "true" : undefined}
                className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
              >
                <span className="block text-[1.25rem] font-bold leading-snug text-white">
                  {x.titre}
                </span>
                <span
                  className="mt-2 block text-[14px] font-semibold"
                  style={{ color: BLEU_CLAIR, opacity: ouvert ? 0 : 1 }}
                >
                  ▶ Voir l’histoire en vidéo
                </span>
              </button>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/70">{x.texte}</p>
              <p className="mt-4 text-[1.0625rem] font-semibold leading-snug" style={{ color: BLEU_CLAIR }}>
                {x.chute}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
