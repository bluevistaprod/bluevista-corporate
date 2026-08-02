"use client";

import { useMemo, useState } from "react";
import { REALISATIONS } from "./_realisations";
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
      REALISATIONS.filter(r => {
        if (produit) return r.produit === produit;
        if (metier) return r.metier === metier;
        return true;
      }),
    [metier, produit]
  );

  const nonClassees = resultats.filter(r => !r.metier).length;

  return (
    <div>
      {/* ── Le filtre par métier ────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <Pastille actif={!metier} onClick={() => { setMetier(null); setProduit(null); }}>
          Tout ({REALISATIONS.length})
        </Pastille>
        {METIERS.map(m => (
          <Pastille
            key={m.cle}
            actif={metier === m.cle}
            onClick={() => { setMetier(m.cle); setProduit(null); }}
          >
            {m.nom} ({REALISATIONS.filter(r => r.metier === m.cle).length})
          </Pastille>
        ))}
      </div>

      {/* ── Le filtre par produit ───────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap gap-2">
        {produitsVisibles.map(p => {
          const n = REALISATIONS.filter(r => r.produit === p.slug).length;
          return (
            <button
              key={p.slug + p.offre}
              onClick={() => setProduit(produit === p.slug ? null : p.slug)}
              aria-pressed={produit === p.slug}
              className="rounded-full border px-4 py-2 text-[14px] transition"
              style={{
                borderColor: produit === p.slug ? BLEU : "rgba(0,0,0,.14)",
                background: produit === p.slug ? BLEU : "transparent",
                color: produit === p.slug ? "#fff" : "inherit",
                /* Un produit sans projet reste affiché mais en retrait : le
                   masquer cacherait le trou au lieu de le montrer. */
                opacity: n === 0 && produit !== p.slug ? 0.35 : 1,
              }}
            >
              {p.nom} {n > 0 && <span className="tabular-nums opacity-60">· {n}</span>}
            </button>
          );
        })}
      </div>

      {/* ── Les résultats ───────────────────────────────────────────── */}
      <div className="mt-12">
        {resultats.length === 0 ? (
          <div
            className="rounded-md border-2 border-dashed px-8 py-12 text-center"
            style={{ borderColor: "#E0A400", background: "rgba(224,164,0,.07)" }}
          >
            <p className="text-[1.15rem] font-semibold">
              Aucune réalisation ne porte encore ce produit.
            </p>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed opacity-65">
              Deux options, et une seule est bonne : soit le projet existe et il
              faut le rattacher, soit il n’existe pas — et dans ce cas afficher
              le produit sur une page d’offre revient à vendre quelque chose
              qu’on ne peut pas montrer.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resultats.map(r => (
                <a
                  key={r.slug}
                  href={`/apercu/realisations/${r.slug}`}
                  className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
                  style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}
                >
                  {/* ⚠️ Pas d'image : il en manque 140. Une vignette grise qui
                      le dit vaut mieux qu'une photo de banque qui ment. */}
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
                    {r.clics > 0 && (
                      <div className="mt-4 text-[13px] tabular-nums opacity-40">
                        {r.clics} clics · {r.impressions.toLocaleString("fr-FR")} impressions
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {nonClassees > 0 && !produit && (
              <p className="mt-10 text-[15px] leading-relaxed opacity-55">
                <strong>{nonClassees}</strong> de ces réalisations ne sont
                rattachées à aucun métier&nbsp;: leur adresse ne dit pas ce
                qu’elles montrent. Elles se positionnent donc uniquement sur le
                nom du client — jamais sur le type de prestation.
              </p>
            )}
          </>
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
