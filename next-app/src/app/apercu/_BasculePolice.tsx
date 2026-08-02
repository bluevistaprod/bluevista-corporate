"use client";

import { useEffect, useState } from "react";

/**
 * L'INTERRUPTEUR DE POLICE — demandé par Giz, 02/08/2026.
 *
 * Il aimait Poppins et envisageait une V7 pour l'essayer. Une V7 aurait été
 * le mauvais outil : trois variables bougent déjà sur cette page (les photos,
 * les chiffres, la direction artistique elle-même). Une quatrième maquette
 * n'aurait pas répondu « est-ce que j'aime Poppins ? », elle aurait répondu
 * « est-ce que j'aime la V7 ? » — ce qui n'est pas la même question.
 *
 * Ici, une seule chose change entre deux clics. C'est la seule façon
 * d'obtenir une réponse exploitable.
 *
 * L'état vit sur <html> et pas dans React : il doit s'appliquer à toute la
 * page, y compris aux sections rendues côté serveur.
 */
type Police = "systeme" | "titres" | "partout";

const CHOIX: { valeur: Police; nom: string; aide: string }[] = [
  { valeur: "systeme", nom: "Sans Poppins", aide: "L'ancien état, pour comparer." },
  { valeur: "titres", nom: "Poppins titres", aide: "✅ Retenu par Giz le 02/08/2026." },
  { valeur: "partout", nom: "Poppins partout", aide: "Regarde les paragraphes." },
];

export function BasculePolice() {
  /* Retenu : Poppins sur les titres. L'attribut est déjà posé par le serveur
     dans layout.tsx — cet état initial ne fait que s'accorder avec lui. */
  const [police, setPolice] = useState<Police>("titres");

  useEffect(() => {
    const racine = document.documentElement;
    if (police === "systeme") racine.removeAttribute("data-police");
    else racine.setAttribute("data-police", police);
  }, [police]);

  const actif = CHOIX.find(c => c.valeur === police);

  return (
    <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-black/85 px-3 py-3 text-white shadow-2xl backdrop-blur">
      <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
        Essai de police
      </div>
      <div className="flex items-center gap-1">
        {CHOIX.map(c => (
          <button
            key={c.valeur}
            onClick={() => setPolice(c.valeur)}
            aria-pressed={police === c.valeur}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              police === c.valeur ? "bg-white font-semibold text-black" : "hover:bg-white/15"
            }`}
          >
            {c.nom}
          </button>
        ))}
      </div>
      <div className="mt-2 px-2 text-[12px] text-white/50">{actif?.aide}</div>
    </div>
  );
}
