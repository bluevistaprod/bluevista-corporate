"use client";

import { useEffect, useState } from "react";
import { SOMBRE } from "./_palette";

/**
 * En-tête de navigation.
 *
 * ⛔ LE LOGO EST UNE IMAGE, PAS DU TEXTE. Correction de Giz, 02/08/2026 :
 * j'affichais « bluevista » composé en Arial gras, ce qui n'est pas son logo.
 * Bluevista a DEUX usages officiels, tous deux dans son fichier d'identité :
 *   · le logo texte complet — « blue » en bleu de marque, « vista » en gris ;
 *   · le « b » seul dans un rond, pour les formats étroits et le favicon.
 * On utilise le second sur mobile, où le logo texte deviendrait illisible.
 *
 * Sur le fond sombre du hero, le logo texte perdrait son gris. Il est donc
 * repassé en blanc par filtre tant que l'en-tête est transparent, et retrouve
 * ses couleurs dès qu'il se pose sur un fond clair.
 */
export function EnTete() {
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: defile ? SOMBRE : "transparent",
        boxShadow: defile ? "0 1px 0 rgba(255,255,255,0.10)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">
        <a href="/" className="flex items-center" aria-label="Bluevista — accueil">
          {/* Le « b » dans un rond : format étroit. */}
          <img
            src="/media/logo-b-rond.png"
            alt="Bluevista"
            className="h-10 w-10 sm:hidden"
          />
          {/*
            Le logo texte, version 2023. Sur le hero sombre on sert la version
            blanche fournie par la charte plutôt que d'inverser le logo par
            filtre : un filtre écrase le gris du mot « vista », la version
            blanche le conserve.
          */}
          <img
            src="/media/logo-bluevista-blanc.png"
            alt="Bluevista"
            className="hidden h-7 w-auto transition-all duration-300 sm:block"
          />
        </a>

        {/* ⛔ « Contact » a été RETIRÉ de cette barre : il faisait doublon
            avec le bouton « Contactez-nous » juste à côté. Deux fois la même
            action à trente pixels d'écart, dont une en gris — le visiteur se
            demande laquelle est la bonne. Correction de Giz, 02/08/2026. */}
        <nav className="hidden items-center gap-1 lg:flex">
          {["L’Agence", "Offres", "Réalisations", "Actualités"].map(l => (
            <a
              key={l}
              href="#"
              className="rounded-md px-4 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="rounded-md bg-white px-6 py-3.5 text-[15px] font-bold transition hover:opacity-90"
            style={{ color: SOMBRE }}
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </header>
  );
}
