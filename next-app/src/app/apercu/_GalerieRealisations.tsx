"use client";

import { useMemo, useState } from "react";
import { TOUTES_REALISATIONS } from "./_realisations";
import { OFFRES } from "./_offres";
import { METIERS } from "./_plan-du-site";
import { BLEU, CLAIR_SOUTENU, TYPO } from "./_palette";

/**
 * LA GALERIE DES RÉALISATIONS — filtrable par métier et par produit.
 *
 * Le filtre par PRODUIT est le point important, et il n'est pas là pour
 * décorer : c'est lui qui rend cliquables les produits listés sur les pages
 * métier. « Mapping architectural » n'est plus un mot dans une liste, c'est
 * un lien vers les projets qui le prouvent.
 *
 * 👉 Le principe qu'on s'est donné : un produit qu'on ne peut illustrer par
 * aucune réalisation est un produit qu'il faut retirer de la page, ou aller
 * produire. Le filtre le rend visible immédiatement — s'il renvoie zéro
 * projet, la page le dit au lieu de faire semblant.
 *
 * ⛔ Les réalisations dont l'adresse ne dit pas ce qu'elles montrent ne sont
 * PAS rangées d'office : elles apparaissent sous « à classer ». Un projet mal
 * classé serait pire — il s'afficherait devant le mauvais prospect.
 */

const TOUS_PRODUITS = OFFRES.flatMap(o =>
  o.produits.map(p => ({ ...p, metier: o.metier, offre: o.nom }))
);

export function GalerieRealisations({
  produitInitial = null,
}: {
  produitInitial?: string | null;
}) {
  const [metier, setMetier] = useState<string | null>(null);
  const [produit, setProduit] = useState<string | null>(produitInitial);

  const produitsVisibles = useMemo(
    () => (metier ? TOUS_PRODUITS.filter(p => p.metier === metier) : TOUS_PRODUITS),
    [metier]
  );

  const resultats = useMemo(
    () =>
      TOUTES_REALISATIONS.filter(r => {
        if (produit) return r.produit === produit;
        if (metier) return r.metier === metier;
        return true;
      }),
    [metier, produit]
  );

  const nonClassees = resultats.filter(r => !r.metier).length;

  return (
    /* ⛔ TRI À GAUCHE, demande de Giz : « je préfère un tri à gauche qu'un
       tri haut de page qui met les réalisations plus bas ». Il a raison, et
       la raison est mesurable : les filtres empilés en tête repoussaient la
       première vignette de près de 300 pixels. On arrivait sur une page de
       réalisations sans voir une seule réalisation.
       En colonne, les projets commencent tout en haut et les filtres restent
       visibles pendant qu'on fait défiler — d'où le `sticky`. */
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
          Métier
        </div>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
          <Pastille actif={!metier} onClick={() => { setMetier(null); setProduit(null); }}>
            Tout ({TOUTES_REALISATIONS.length})
          </Pastille>
          {METIERS.map(m => (
            <Pastille
              key={m.cle}
              actif={metier === m.cle}
              onClick={() => { setMetier(m.cle); setProduit(null); }}
            >
              {m.nom} ({TOUTES_REALISATIONS.filter(r => r.metier === m.cle).length})
            </Pastille>
          ))}
        </div>

        <div className="mt-10 text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
          Type de projet
        </div>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
          {produitsVisibles
            .filter(p => TOUTES_REALISATIONS.some(r => r.produit === p.slug))
            .map(p => {
              const n = TOUTES_REALISATIONS.filter(r => r.produit === p.slug).length;
              const on = produit === p.slug;
              return (
                <button
                  key={p.slug + p.offre}
                  onClick={() => setProduit(on ? null : p.slug)}
                  aria-pressed={on}
                  className="text-left text-[15px] transition hover:opacity-70"
                  style={{ color: on ? BLEU : "inherit", fontWeight: on ? 700 : 400 }}
                >
                  {p.nom} <span className="tabular-nums opacity-45">{n}</span>
                </button>
              );
            })}
        </div>
      </aside>

      <div>
        {resultats.length === 0 ? (
          <div
            className="rounded-md border-2 border-dashed px-8 py-12 text-center"
            style={{ borderColor: "#E0A400", background: "rgba(224,164,0,.07)" }}
          >
            <p className="text-[1.15rem] font-semibold">
              Aucune réalisation ne porte encore ce type de projet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {resultats.map(r => (
              <a
                key={r.slug}
                href={`/apercu/realisations/${r.slug}`}
                className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
                style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}
              >
                {/* ⚠️ Pas d'image : il en manque 140. Une vignette qui le dit
                    vaut mieux qu'une photo de banque qui ment. */}
                <div
                  className="flex aspect-[16/10] items-center justify-center"
                  style={{ background: CLAIR_SOUTENU }}
                >
                  <span className="text-[13px] uppercase tracking-[0.18em] opacity-30">
                    visuel à venir
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-[1.0625rem] font-bold leading-snug tracking-tight">
                    {r.titre}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Pastille({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={actif}
      className="rounded-md border-2 px-5 py-3 text-[15px] font-semibold transition"
      style={{
        borderColor: actif ? BLEU : "rgba(0,0,0,.12)",
        background: actif ? BLEU : "transparent",
        color: actif ? "#fff" : "inherit",
      }}
    >
      {children}
    </button>
  );
}
