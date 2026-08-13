"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * L'APPARITION AU DÉFILEMENT.
 *
 * ⛔⛔ DEUX VERSIONS RATÉES AVANT CELLE-CI, ET LA CAUSE VAUT D'ÊTRE RETENUE.
 * L'effet reposait sur `IntersectionObserver` seul, avec un filet de sécurité
 * qui révélait TOUS les blocs au bout d'une seconde et demie, sans condition.
 * Résultat chez Giz : « c'est tous les blocs en même temps, pas au scroll ».
 * Le filet ne rattrapait pas l'effet — il le remplaçait.
 *
 * 👉 LA LEÇON, et elle dépasse ce composant : UN GARDE-FOU QUI S'APPLIQUE
 * TOUJOURS N'EST PLUS UN GARDE-FOU, C'EST LE COMPORTEMENT PAR DÉFAUT. Il ne
 * doit se déclencher que si le mécanisme qu'il protège a réellement échoué.
 *
 * ⭐ CETTE VERSION NE DÉPEND D'AUCUN MÉCANISME UNIQUE. Une seule fonction
 * décide qu'un bloc est entré dans l'écran, et deux chemins l'appellent :
 * l'observation quand le navigateur la fait, le défilement sinon.
 *
 * ⚠️ CE N'EST PAS DU PARALLAXE, et la distinction n'est pas cosmétique : le
 * parallaxe recalcule une position à chaque pixel de défilement et dégrade la
 * réactivité que Google mesure. Ici chaque bloc monte de 18 px une fois, puis
 * ne bouge plus, et le défilement est lu dans une trame d'animation.
 *
 * ⚠️ `prefers-reduced-motion` coupe tout. Certaines personnes souffrent
 * physiquement du mouvement à l'écran ; c'est un réglage de leur système, pas
 * une préférence esthétique.
 */
export function Apparait({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  /* ⛔⛔ LE CONTENU EST VISIBLE TANT QUE LE JAVASCRIPT N'A PAS PRIS LA MAIN.
     Sortir la page avec `opacity:0` dans le HTML du serveur serait la pire
     version du piège précédent : si le script ne s'exécute pas — erreur, vieux
     navigateur, réseau coupé en cours de chargement — la page reste BLANCHE et
     rien ne le signale. On masque donc côté client seulement, avant le premier
     rendu à l'écran pour éviter tout clignotement. */
  const [anime, setAnime] = useState(false);
  /* `useLayoutEffect` s'exécute AVANT le premier affichage : le masquage n'est
     donc jamais visible. Il ne tourne pas au rendu serveur, ce qui est
     exactement ce qu'on veut — le HTML livré reste visible. */
  useLayoutEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setAnime(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !anime) return;

    const reveler = () => {
      if (el.dataset.vu === "oui") return true;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.88 && r.bottom > 0) {
        el.dataset.vu = "oui";
        return true;
      }
      return false;
    };

    /* Chemin 1 — l'observation, quand elle part vraiment. */
    let obs: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      obs = new IntersectionObserver(
        es => es.forEach(e => { if (e.isIntersecting) { el.dataset.vu = "oui"; obs?.disconnect(); } }),
        { rootMargin: "0px 0px -12% 0px" }
      );
      obs.observe(el);
    }

    /* Chemin 2 — le défilement, qui marche partout. */
    let enAttente = false;
    const auDefilement = () => {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => { if (reveler()) obs?.disconnect(); enAttente = false; });
    };
    addEventListener("scroll", auDefilement, { passive: true });
    addEventListener("resize", auDefilement, { passive: true });
    requestAnimationFrame(reveler);

    /* Le filet, et sa condition est étroite : il ne s'active que si le bloc
       est DANS l'écran et toujours masqué — c'est-à-dire si les deux chemins
       sont morts. Dans un navigateur normal, il ne se déclenche jamais. */
    const filet = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (el.dataset.vu !== "oui" && r.top < innerHeight && r.bottom > 0) el.dataset.vu = "oui";
    }, 3000);

    return () => {
      obs?.disconnect();
      removeEventListener("scroll", auDefilement);
      removeEventListener("resize", auDefilement);
      clearTimeout(filet);
    };
  }, [anime]);

  return (
    <div
      ref={ref}
      className={
        anime
          ? "[&[data-vu=oui]]:translate-y-0 [&[data-vu=oui]]:opacity-100 translate-y-[18px] opacity-0 transition-[opacity,transform] duration-500 ease-out"
          : ""
      }
    >
      {children}
    </div>
  );
}
