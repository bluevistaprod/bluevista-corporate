"use client";

import { useState } from "react";
import { BLEU, BLEU_CLAIR, CLAIR, TYPO } from "./_palette";

/**
 * LA MÉTHODE CHAPEAU — version page d'accueil. Idée de Giz, 02/08/2026, et
 * elle est meilleure que ce que j'avais fait.
 *
 * Sa question : garder la méthode détaillée avec sélecteur sur la home, ou la
 * descendre dans les pages métier et n'avoir ici qu'une version chapeau ?
 * Trois raisons de descendre le détail :
 *
 * 1. LE RÔLE DE LA PAGE. La home est un parcours de conviction, pas un mode
 *    d'emploi. Six étapes × trois métiers × un détail chacune, c'est un
 *    document de travail — donné au moment précis où le visiteur devrait se
 *    convaincre, pas étudier.
 *
 * 2. LE RÉFÉRENCEMENT. Chaque page métier a besoin d'un contenu propre et
 *    substantiel. Le parcours détaillé EST ce contenu. Le laisser sur la home
 *    le gaspille, et le répéter ensuite crée du doublon entre pages — le
 *    genre de chose qui fait qu'aucune des deux ne se positionne.
 *
 * 3. CE QUE LE CHAPEAU PEUT DIRE ET QUE LE DÉTAIL NE PEUT PAS. En regardant
 *    les trois parcours côte à côte, une chose saute aux yeux : les étapes 1
 *    et 6 portent le MÊME nom dans les trois métiers. Seul le milieu change.
 *    Autrement dit — on commence toujours par challenger le brief, on finit
 *    toujours par mesurer. C'est exactement l'argument de Bluevista, et il
 *    n'était visible nulle part parce que le sélecteur ne montrait qu'un
 *    métier à la fois.
 *
 * ⛔ NE PAS SUPPRIMER _Methode.tsx : la version détaillée avec sélecteur est
 * conservée telle quelle pour les trois pages métier. C'est la consigne de
 * Giz — « garde bien ce que tu as fait ici pour le répliquer dans les pages ».
 */

type Etape = {
  /** Le nom générique, valable pour les trois métiers. */
  titre: string;
  /** Ce qui est vrai quel que soit le métier. */
  resume: string;
  /** Le nom de l'étape dans chaque métier. null = identique au titre. */
  declinaisons: { film: string; evenementiel: string; immersion: string } | null;
};

const ETAPES: Etape[] = [
  {
    titre: "Brainstorming",
    resume:
      "On challenge le brief avant d’y répondre. Un concept n’est retenu que si le message est clair, s’il parle à la cible, et si nous sommes fiers de le produire.",
    declinaisons: null,
  },
  {
    titre: "Préparation",
    resume:
      "L’étape qui décide de toutes les autres. Tout ce qui n’est pas réglé ici se paiera plus tard, au prix fort.",
    declinaisons: {
      film: "Pré-production",
      evenementiel: "Planification",
      immersion: "Conception technique",
    },
  },
  {
    titre: "Réalisation",
    resume:
      "Le moment où ça se fabrique — ou, pour un événement, où ça se joue. Nos équipes sont sur place, et vous pouvez y être aussi.",
    declinaisons: {
      film: "Production",
      evenementiel: "Le jour J",
      immersion: "Développement",
    },
  },
  {
    titre: "Première version",
    resume:
      "On assemble, on teste, et on vous montre. Vous annotez directement sur notre plateforme, au timecode près.",
    declinaisons: {
      film: "Post-production",
      evenementiel: "L’aftermovie",
      immersion: "Tests & réglages",
    },
  },
  {
    titre: "Livraison",
    resume:
      "Prêt à servir, dans toutes les formes dont vous avez besoin — pas seulement dans celle qui était au devis.",
    declinaisons: {
      film: "Conformation",
      evenementiel: "Diffusion",
      immersion: "Déploiement",
    },
  },
  {
    titre: "Débriefing",
    resume:
      "Ce qui a marché, où le public décroche, ce qu’on change au suivant. C’est ce qui fait de la méthode un cycle, et pas une prestation à la commande.",
    declinaisons: null,
  },
];

const METIERS = [
  { cle: "film" as const, nom: "Film & contenu" },
  { cle: "evenementiel" as const, nom: "Événement" },
  { cle: "immersion" as const, nom: "Immersion" },
];

export function MethodeChapeau() {
  const [actif, setActif] = useState(0);
  const e = ETAPES[actif];
  const R = 42;

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
      {/* ── La roue ─────────────────────────────────────────────────────
          Identique à celle des pages métier : c'est la même méthode, elle
          doit avoir la même forme. Ce qui change, c'est ce qu'on lit à côté. */}
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke={BLEU} strokeOpacity="0.18" strokeWidth="0.6" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={BLEU}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray={`${(2 * Math.PI * R) / ETAPES.length} ${2 * Math.PI * R}`}
            strokeDashoffset={-((2 * Math.PI * R) / ETAPES.length) * actif}
            className="transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BLEU }}>
            Étape préalable
          </div>
          <div className="mt-2 text-lg font-bold leading-tight tracking-tight">Analyse</div>
          <p className="mt-2 px-2 text-[13px] leading-snug opacity-55">
            Ce que votre public doit comprendre — avant de parler de format,
            de lieu ou de technologie.
          </p>
        </div>

        {ETAPES.map((etape, i) => {
          const angle = (i / ETAPES.length) * 2 * Math.PI - Math.PI / 2;
          const estActif = i === actif;
          return (
            <button
              key={etape.titre}
              onClick={() => setActif(i)}
              aria-pressed={estActif}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2"
              style={{
                left: `${50 + R * Math.cos(angle)}%`,
                top: `${50 + R * Math.sin(angle)}%`,
                width: estActif ? 72 : 54,
                height: estActif ? 72 : 54,
                background: estActif ? BLEU : CLAIR,
                color: estActif ? "#fff" : "inherit",
                border: `2px solid ${BLEU}`,
                boxShadow: estActif ? "0 8px 24px rgba(18,96,126,.28)" : "none",
              }}
            >
              <span className="block text-[15px] font-bold tabular-nums">{i + 1}</span>
              <span className="sr-only">{etape.titre}</span>
            </button>
          );
        })}
      </div>

      {/* ── L'étape ouverte ─────────────────────────────────────────── */}
      <div>
        <div className="text-[15px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
          Étape {actif + 1} sur {ETAPES.length}
        </div>
        <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          {e.titre}
        </h3>
        <p className={`mt-6 max-w-xl ${TYPO.corps}`}>{e.resume}</p>

        {/* ── La démonstration ───────────────────────────────────────────
            C'est le cœur du chapeau. Le sélecteur des pages métier ne
            montrait qu'un parcours à la fois : on ne voyait donc jamais que
            c'est LA MÊME méthode. Ici, les trois noms sont côte à côte. */}
        <div className="mt-9 border-t border-black/10 pt-6">
          <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
            Cette étape s’appelle
          </div>

          {e.declinaisons ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {METIERS.map(m => (
                <div key={m.cle}>
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] opacity-40">
                    {m.nom}
                  </div>
                  <div className="mt-1.5 font-bold" style={{ color: BLEU }}>
                    {e.declinaisons![m.cle]}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Étapes 1 et 6 : le nom ne change pas d'un métier à l'autre, et
               ce n'est pas un détail — c'est l'argument. On le dit. */
            <p className="mt-4 font-semibold" style={{ color: BLEU }}>
              Pareil dans les trois métiers.{" "}
              <span className="font-normal opacity-70">
                {actif === 0
                  ? "On commence toujours par remettre le brief en question."
                  : "Et on finit toujours par mesurer ce que ça a produit."}
              </span>
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActif((actif + 1) % ETAPES.length)}
            className="rounded-md px-6 py-3.5 text-[15px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Étape suivante
          </button>
          {actif === ETAPES.length - 1 && (
            <span className="text-[15px] font-semibold" style={{ color: BLEU }}>
              …et le cycle recommence.
            </span>
          )}
        </div>

        {/* Le renvoi vers le détail — c'est lui qui justifie que la home
            reste courte, et il fait entrer les pages métier dans le parcours. */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
          <span className="opacity-50">La méthode en détail&nbsp;:</span>
          {METIERS.map(m => (
            <a
              key={m.cle}
              href="#"
              className="font-semibold underline decoration-2 underline-offset-4 transition hover:opacity-70"
              style={{ color: BLEU }}
            >
              {m.nom}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
