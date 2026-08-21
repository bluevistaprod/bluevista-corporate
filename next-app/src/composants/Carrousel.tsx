"use client";

import { useCallback, useEffect, useState } from "react";
import { imageUrl, type MediaActualite } from "../lib/sanity";
import { BLEU_CLAIR, CLAIR_SOUTENU } from "./palette";

/**
 * LE CARROUSEL D'IMAGES D'UN BLOC D'ACTUALITÉ — demande de Giz, 21/08/2026 :
 * « plusieurs images dans une section → un slider qui défile tout seul toutes
 * les 3 secondes, et qu'on puisse faire défiler au clic ».
 *
 * ⛔⛔ TOUTES LES IMAGES RESTENT DANS LE HTML. C'est LE piège du carrousel :
 * la version paresseuse ne monte que la vue courante, et les autres images
 * n'existent alors ni pour Google ni pour un lecteur d'écran. Sur un site dont
 * la consigne est « SEO d'abord », ça reviendrait à publier une image sur
 * trois. Ici les `<img>` sont TOUTES rendues, avec leur `alt` et leur légende ;
 * seule l'opacité change.
 * 👉 Se vérifie en comptant les `<img>` dans le HTML servi, pas à l'écran.
 *
 * ⛔ LES VIDÉOS N'ENTRENT PAS DANS LE CARROUSEL. Un défilement automatique qui
 * emporte une vidéo en cours de lecture au bout de trois secondes est
 * inutilisable. Le tri se fait dans `UnBloc` : les vidéos restent empilées,
 * seules les images défilent.
 *
 * ⚠️ LA HAUTEUR EST FIXE, et c'est un compromis assumé. Des vues qui se
 * fondent l'une dans l'autre doivent partager la même boîte, sinon la page
 * saute à chaque changement. Le format 4/3 est celui des photos du site
 * (2048 × 1536) ; une image en portrait y est donc recadrée sur son centre.
 * C'est visible, c'est voulu, et ça vaut mieux qu'une page qui tressaute.
 *
 * ⭐ CE QUI EST RESPECTÉ SANS QUE PERSONNE NE L'AIT DEMANDÉ :
 *   · `prefers-reduced-motion` coupe le défilement automatique — pour
 *     certaines personnes une image qui bouge seule est un vrai obstacle,
 *     et l'automatisme n'a jamais été le but, seulement le confort.
 *   · le survol et le focus clavier mettent en pause : on ne lit pas une
 *     légende qui s'échappe.
 *   · les pastilles sont de vrais boutons, atteignables au clavier.
 */

const DELAI = 3000;

export function Carrousel({ medias }: { medias: MediaActualite[] }) {
  const [actif, setActif] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const nombre = medias.length;

  const suivant = useCallback(() => setActif(i => (i + 1) % nombre), [nombre]);

  /* ⚠️ La préférence est LUE, pas supposée, et on écoute ses changements :
     quelqu'un peut l'activer pendant la visite. */
  const [animer, setAnimer] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lire = () => setAnimer(!mq.matches);
    lire();
    mq.addEventListener("change", lire);
    return () => mq.removeEventListener("change", lire);
  }, []);

  /* ⛔ Le minuteur se REMONTE à chaque changement de vue — `actif` est dans
     les dépendances. Sans ça, un clic juste avant l'échéance fait défiler deux
     fois de suite et on n'a pas le temps de lire. */
  useEffect(() => {
    if (!animer || enPause || nombre < 2) return;
    const t = setTimeout(suivant, DELAI);
    return () => clearTimeout(t);
  }, [actif, animer, enPause, nombre, suivant]);

  return (
    <div
      className="block"
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
    >
      {/* ── LES VUES ─────────────────────────────────────────────────────
          Un bouton, parce que c'est cliquable : un `<div>` avec un `onClick`
          ne s'atteint pas au clavier et ne s'annonce pas. */}
      <button
        type="button"
        onClick={suivant}
        aria-label={`Image suivante (${actif + 1} sur ${nombre})`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-md"
        style={{ aspectRatio: "4 / 3", background: CLAIR_SOUTENU }}
      >
        {medias.map((m, i) => (
          <img
            key={m._key ?? i}
            src={imageUrl(m.image, 1200)}
            alt={m.texteAlternatif ?? ""}
            /* ⚠️ `aria-hidden` sur les vues masquées : sans ça, un lecteur
               d'écran annonce les trois images comme si elles étaient toutes
               à l'écran. Elles restent dans le HTML pour l'indexation. */
            aria-hidden={i === actif ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: i === actif ? 1 : 0 }}
          />
        ))}
      </button>

      {/* ── LES PASTILLES ───────────────────────────────────────────────── */}
      <div className="mt-3 flex items-center gap-2">
        {medias.map((m, i) => (
          <button
            key={m._key ?? i}
            type="button"
            onClick={() => setActif(i)}
            aria-label={`Voir l’image ${i + 1}`}
            aria-current={i === actif ? "true" : undefined}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === actif ? 22 : 8,
              background: i === actif ? BLEU_CLAIR : "#07222233",
            }}
          />
        ))}
      </div>

      {/* ── LES LÉGENDES ────────────────────────────────────────────────
          ⛔ Toutes présentes dans le HTML, empilées : la légende est du
          contenu, pas de la décoration. Seule l'opacité les distingue.
          ⛔ ET LA HAUTEUR EST CELLE DE LA PLUS LONGUE. Ma première version
          laissait la légende n°1 dans le flux et superposait les autres :
          toute légende plus longue qu'elle débordait sur le texte suivant.
          Une grille dont tous les enfants occupent LA MÊME cellule règle ça —
          la ligne prend la hauteur du plus grand, sans mesurer quoi que ce
          soit ni attendre le JavaScript. */}
      <div className="mt-[14px] grid">
        {medias.map((m, i) => (
          <div
            key={m._key ?? i}
            aria-hidden={i === actif ? undefined : true}
            className="text-[15px] font-bold leading-snug transition-opacity duration-500"
            style={{ gridArea: "1 / 1", opacity: i === actif ? 1 : 0 }}
          >
            {m.legende}
            {m.sousLegende && (
              <span className="mt-[2px] block text-[14px] font-normal opacity-60">{m.sousLegende}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
