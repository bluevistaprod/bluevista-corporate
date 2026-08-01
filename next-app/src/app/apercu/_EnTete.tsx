"use client";

import { useEffect, useState } from "react";
import { SOMBRE } from "./_palette";

/**
 * En-tête de navigation.
 *
 * Répond à une remarque de Giz : « pour un client assez perdu, le menu peut
 * être peu visible ». Sa proposition était un menu corporate à gros boutons ;
 * le vrai problème n'était pas la taille mais le CONTRASTE — des libellés à
 * 75 % d'opacité posés sur une image chargée.
 *
 * La réponse retenue :
 *   · libellés à pleine opacité, zones de clic généreuses ;
 *   · un seul bouton d'action, plein et permanent ;
 *   · au défilement, l'en-tête devient opaque et se pose sur le contenu.
 *
 * Le menu ne devient pas plus gros, il devient lisible — et il cesse de manger
 * l'espace que l'image doit occuper.
 */
export function EnTete({ surFondSombre = true }: { surFondSombre?: boolean }) {
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clair = surFondSombre || defile;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: defile ? SOMBRE : "transparent",
        boxShadow: defile ? "0 1px 0 rgba(255,255,255,0.10)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">
        <div
          className="text-[1.6rem] font-bold tracking-tight"
          style={{ color: clair ? "#fff" : SOMBRE }}
        >
          bluevista
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {["L’Agence", "Offres", "Réalisations", "Actualités"].map(l => (
            <a
              key={l}
              href="#"
              className="rounded-md px-4 py-2.5 text-[15px] font-medium transition hover:bg-white/10"
              style={{ color: clair ? "#fff" : SOMBRE }}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden rounded-md px-4 py-2.5 text-[15px] font-medium transition hover:bg-white/10 sm:block"
            style={{ color: clair ? "#fff" : SOMBRE }}
          >
            Contact
          </a>
          <a
            href="#"
            className="rounded-md bg-white px-6 py-3.5 text-[15px] font-bold transition hover:opacity-90"
            style={{ color: SOMBRE }}
          >
            Demander un devis
          </a>
        </div>
      </div>
    </header>
  );
}
