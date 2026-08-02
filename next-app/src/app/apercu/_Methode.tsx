"use client";

import { useState } from "react";
import { BLEU, BLEU_CLAIR, CLAIR } from "./_palette";

/**
 * LA MÉTHODE, EN CERCLE — idée de Giz, et elle est juste au-delà de l'esthétique.
 *
 * Le trait le plus distinctif de sa méthode, c'est qu'elle BOUCLE : le
 * débriefing du film précédent ouvre l'analyse du suivant. Une frise verticale
 * disait l'inverse — un tunnel avec un début et une fin. Le cercle dit la
 * bonne chose sans qu'on ait à l'écrire : la forme porte l'argument.
 *
 * ⛔ SIX ÉTAPES, PAS SEPT. Le mémoire technique distingue l'ANALYSE comme
 * « étape préalable » des six étapes numérotées. Six points se lisent d'un
 * coup d'œil ; sept saturent. L'analyse est donc présentée comme ce qui ouvre
 * le cycle, au centre, et non comme un septième point sur la roue.
 *
 * Source : mémoire technique remis à la Région Auvergne-Rhône-Alpes, mars 2025.
 */

type Etape = {
  titre: string;
  resume: string;
  detail: string;
  livrable: string;
  photo: string;
  /** true tant que la photo n'est pas la bonne — à retirer au remplacement. */
  photoProvisoire?: boolean;
};

const ETAPES: Etape[] = [
  {
    titre: "Brainstorming",
    resume: "On challenge le brief avant d’y répondre.",
    detail:
      "Quel message, quelle cible, quelles références, cohérence ou disruption, quelles idées éditoriales à apporter. Puis un ou plusieurs concepts — retenus seulement si le message est clair, s’il parle à la cible, et si nous sommes fiers de produire ce film.",
    livrable: "Concept général · narratif et graphique · chiffré",
    photo: "/media/coulisses-interview.jpg",
    photoProvisoire: true,
  },
  {
    titre: "Pré-production",
    resume: "L’étape qui décide de toutes les autres.",
    detail:
      "Écriture du scénario, note d’intention, storyboard, devis, plan de travail, casting, logistique, droits musicaux et droit à l’image, autorisations de tournage et de survol drone.",
    livrable: "Scénario · note d’intention · devis · storyboard · planning",
    photo: "/media/coulisses-tournage.jpg",
    photoProvisoire: true,
  },
  {
    titre: "Production",
    resume: "En décors réels ou en studio.",
    detail:
      "Repérages techniques, tests de configuration, coaching des intervenants, voix off, création graphique et animatique. Vous pouvez accompagner nos équipes sur site — certains clients y tiennent, et ils ont raison.",
    livrable: "Tournage · voix off · création graphique · animatique",
    photo: "/media/coulisses-grue.jpg",
  },
  {
    titre: "Post-production",
    resume: "Là où le film prend son rythme.",
    detail:
      "Dérushage, montage, animation des éléments graphiques, sound design. Une première version complète livrée sur notre plateforme de visionnage, où vous annotez au timecode près.",
    livrable: "Film complet — version 1",
    photo: "/media/pilier-communication.jpg",
    photoProvisoire: true,
  },
  {
    titre: "Conformation",
    resume: "Ni forfait illimité, ni limite rigide.",
    detail:
      "Étalonnage, sous-titrage pour l’accessibilité, rendus aux formats de diffusion. Sur les retours : deux à trois allers-retours, sous couvert du bon sens — le premier pour le fond, les suivants pour les détails.",
    livrable: "Film prêt à diffuser · sous-titres · formats de diffusion",
    photo: "/media/ref-ssp.jpg",
    photoProvisoire: true,
  },
  {
    titre: "Débriefing",
    resume: "Et on recommence, mieux.",
    detail:
      "On suit la vie du film avec vous : ce qui a marché, à quel moment les spectateurs décrochent, où et quand il a été posté. Ce qu’on en tire nourrit l’analyse du film suivant. C’est ce qui fait de la méthode un cycle, et pas une prestation à la commande.",
    livrable: "Analyse de diffusion · leçons pour le film suivant",
    photo: "/media/ref-clasquin.jpg",
    photoProvisoire: true,
  },
];

export function MethodeEnCercle() {
  const [actif, setActif] = useState(0);
  const e = ETAPES[actif];
  const R = 42; // rayon en pourcentage du conteneur

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
      {/* ── La roue ─────────────────────────────────────────────────── */}
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke={BLEU} strokeOpacity="0.18" strokeWidth="0.6" />
          {/* L'arc actif : montre qu'on avance sur un cercle, pas sur une liste. */}
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

        {/* Le centre porte ce qu'une frise verticale ne pouvait pas dire. */}
        <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BLEU }}>
            Étape préalable
          </div>
          <div className="mt-2 text-lg font-bold leading-tight tracking-tight">Analyse</div>
          <p className="mt-2 px-2 text-[13px] leading-snug opacity-55">
            Votre marque au prisme de votre communication actuelle — avant même
            de parler de film.
          </p>
        </div>

        {ETAPES.map((etape, i) => {
          const angle = (i / ETAPES.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + R * Math.cos(angle);
          const y = 50 + R * Math.sin(angle);
          const estActif = i === actif;
          return (
            <button
              key={etape.titre}
              onClick={() => setActif(i)}
              aria-pressed={estActif}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: estActif ? 72 : 54,
                height: estActif ? 72 : 54,
                background: estActif ? BLEU : CLAIR,
                color: estActif ? "#fff" : "inherit",
                border: `2px solid ${BLEU}`,
                boxShadow: estActif ? "0 8px 24px rgba(0,96,120,.28)" : "none",
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
        <h3 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          {e.titre}
        </h3>
        <p className="mt-4 text-[clamp(1.15rem,1.7vw,1.5rem)] font-semibold leading-snug" style={{ color: BLEU }}>
          {e.resume}
        </p>

        <figure
          role="img"
          aria-label={`Illustration de l’étape ${e.titre}`}
          className="mt-8 aspect-[16/10] rounded-md bg-cover bg-center"
          style={{ backgroundImage: `url('${e.photo}')` }}
        />

        <p className="mt-7 leading-relaxed opacity-70">{e.detail}</p>

        <div className="mt-7 border-t border-black/10 pt-5">
          <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
            Ce que vous recevez
          </div>
          <p className="mt-2 font-semibold">{e.livrable}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
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
      </div>
    </div>
  );
}
