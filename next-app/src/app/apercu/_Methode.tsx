"use client";

import { useState } from "react";
import { BLEU, BLEU_CLAIR, CLAIR } from "./_palette";

/**
 * LA MÉTHODE, EN CERCLE — idée de Giz, et elle est juste au-delà de l'esthétique.
 *
 * Le trait le plus distinctif de sa méthode, c'est qu'elle BOUCLE : le
 * débriefing du projet précédent ouvre l'analyse du suivant. Une frise
 * verticale disait l'inverse — un tunnel avec un début et une fin. Le cercle
 * dit la bonne chose sans qu'on ait à l'écrire : la forme porte l'argument.
 *
 * ⛔ SIX ÉTAPES, PAS SEPT. Le mémoire technique distingue l'ANALYSE comme
 * « étape préalable » des six étapes numérotées. Six points se lisent d'un
 * coup d'œil ; sept saturent.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TROIS PARCOURS — ajouté le 02/08/2026, et c'est la meilleure remarque du
 * chantier. Giz : « la méthode ne s'adapte qu'au film ».
 *
 * Il avait raison, et le défaut était grave : la page passe une section
 * entière à dire que Bluevista fait trois métiers, puis explique sa façon de
 * travailler dans le seul vocabulaire du film. Un directeur de la
 * communication venu pour un événement lisait « storyboard », « dérushage »,
 * « étalonnage » et en concluait, logiquement, qu'on lui vendait un film.
 *
 * 👉 Et il y a mieux qu'une correction là-dedans. Montrer que LA MÊME
 * MÉTHODE se décline en trois métiers, c'est démontrer le « mouton à cinq
 * pattes » au lieu de l'affirmer. Le sélecteur ne rattrape pas un manque :
 * il prouve l'argument principal de la page.
 *
 * ⚠️ CE QUI EST SOURCÉ ET CE QUI NE L'EST PAS.
 *   · FILM — repris du mémoire technique remis à la Région Auvergne-Rhône-
 *     Alpes, mars 2025. Fiable, c'est l'écrit de Bluevista.
 *   · ÉVÉNEMENTIEL et IMMERSION — écrits par moi, à partir des indications
 *     de Giz (« planification en pré-production », « production = le jour J »,
 *     « post-production = l'aftermovie puis la diffusion réseaux sociaux »).
 *     Le reste est déduit. À RELIRE AVANT MISE EN LIGNE : je décris des
 *     livrables que je n'ai pas vus.
 * ─────────────────────────────────────────────────────────────────────────
 */

type Metier = "film" | "evenementiel" | "immersion";

type Etape = {
  titre: string;
  resume: string;
  detail: string;
  livrable: string;
  photo: string;
};

const METIERS: { cle: Metier; nom: string; sousTitre: string }[] = [
  { cle: "film", nom: "Film & contenu", sousTitre: "Communication & marketing" },
  { cle: "evenementiel", nom: "Événement", sousTitre: "Conception et captation" },
  { cle: "immersion", nom: "Immersion", sousTitre: "VR, 3D, mapping" },
];

/** L'étape préalable, commune aux trois parcours — elle est au centre. */
const ANALYSE: Record<Metier, string> = {
  film: "Votre marque au prisme de votre communication actuelle — avant même de parler de film.",
  evenementiel: "Ce que vos éditions précédentes ont produit, et ce qu’elles ont manqué — avant de parler de lieu.",
  immersion: "Ce que votre public doit comprendre ou ressentir — avant de parler de technologie.",
};

const PARCOURS: Record<Metier, Etape[]> = {
  // ── FILM — source : mémoire technique, mars 2025. ─────────────────────
  film: [
    {
      titre: "Brainstorming",
      resume: "On challenge le brief avant d’y répondre.",
      detail:
        "Quel message, quelle cible, quelles références, cohérence ou disruption. Puis un ou plusieurs concepts — retenus seulement si le message est clair, s’il parle à la cible, et si nous sommes fiers de produire ce film.",
      livrable: "Concept général · narratif et graphique · chiffré",
      photo: "/media/px-methode-1.jpg",
    },
    {
      titre: "Pré-production",
      resume: "L’étape qui décide de toutes les autres.",
      detail:
        "Écriture du scénario, note d’intention, storyboard, devis, plan de travail, casting, logistique, droits musicaux et droit à l’image, autorisations de tournage et de survol drone.",
      livrable: "Scénario · note d’intention · storyboard · planning",
      photo: "/media/px-methode-2.jpg",
    },
    {
      titre: "Production",
      resume: "En décors réels ou en studio.",
      detail:
        "Repérages techniques, tests de configuration, coaching des intervenants, voix off, création graphique et animatique. Vous pouvez accompagner nos équipes sur site — certains clients y tiennent, et ils ont raison.",
      livrable: "Tournage · voix off · création graphique · animatique",
      photo: "/media/bv-production.jpg",
    },
    {
      titre: "Post-production",
      resume: "Là où le film prend son rythme.",
      detail:
        "Dérushage, montage, animation des éléments graphiques, sound design. Une première version complète livrée sur notre plateforme de visionnage, où vous annotez au timecode près.",
      livrable: "Film complet — version 1",
      photo: "/media/px-methode-4.jpg",
    },
    {
      titre: "Conformation",
      resume: "Ni forfait illimité, ni limite rigide.",
      detail:
        "Étalonnage, sous-titrage pour l’accessibilité, rendus aux formats de diffusion. Sur les retours : deux à trois allers-retours, sous couvert du bon sens — le premier pour le fond, les suivants pour les détails.",
      livrable: "Film prêt à diffuser · sous-titres · tous formats",
      photo: "/media/px-methode-5.jpg",
    },
    {
      titre: "Débriefing",
      resume: "Et on recommence, mieux.",
      detail:
        "On suit la vie du film avec vous : ce qui a marché, à quel moment les spectateurs décrochent, où et quand il a été posté. Ce qu’on en tire nourrit l’analyse du projet suivant.",
      livrable: "Analyse de diffusion · leçons pour le projet suivant",
      photo: "/media/px-methode-6.jpg",
    },
  ],

  // ── ÉVÉNEMENTIEL — proposition, à valider par Giz. ────────────────────
  evenementiel: [
    {
      titre: "Brainstorming",
      resume: "On challenge l’objectif avant de parler de format.",
      detail:
        "Qui vient, pourquoi, et qu’est-ce qu’ils doivent emporter en repartant. On écarte les dispositifs qui flattent l’organisateur sans marquer le public. Puis un parti pris de mise en scène, chiffré.",
      livrable: "Concept d’événement · parti pris scénographique · budget",
      photo: "/media/px-methode-1.jpg",
    },
    {
      titre: "Planification",
      resume: "Un événement ne se rattrape pas.",
      detail:
        "Rétroplanning, repérages sur site, plans de scénographie, besoins techniques, coordination des prestataires, autorisations. C’est ici que se joue la date : elle ne bouge pas, donc tout le reste doit être prêt avant.",
      livrable: "Rétroplanning · plans · plan de charge technique",
      photo: "/media/px-methode-2.jpg",
    },
    {
      titre: "Le jour J",
      resume: "Montage, régie, captation.",
      detail:
        "Installation, réglages, conduite et régie pendant l’événement, captation multi-caméra. Notre équipe est sur place du montage au démontage — c’est le seul moment du projet où l’improvisation coûte cher.",
      livrable: "Régie · captation multi-caméra · exploitation sur site",
      photo: "/media/px-pilier-evenementiel.jpg",
    },
    {
      titre: "L’après-événement",
      resume: "L’aftermovie, tant que ça compte encore.",
      detail:
        "Montage du film de l’événement pendant que le souvenir est frais, et non trois semaines plus tard. Sélection des temps forts, interviews de participants, habillage graphique.",
      livrable: "Aftermovie · interviews · photos sélectionnées",
      photo: "/media/px-methode-4.jpg",
    },
    {
      titre: "Diffusion",
      resume: "Un événement, plusieurs vies.",
      detail:
        "Déclinaison en formats courts et verticaux pour les réseaux, versions internes, extraits pour la prochaine édition. Un événement produit largement de quoi communiquer jusqu’au suivant.",
      livrable: "Formats réseaux · versions internes · extraits",
      photo: "/media/px-methode-5.jpg",
    },
    {
      titre: "Débriefing",
      resume: "Et on recommence, mieux.",
      detail:
        "Fréquentation, temps passé sur les dispositifs, retombées des contenus diffusés. Ce qu’on en tire nourrit la conception de l’édition suivante.",
      livrable: "Bilan de fréquentation · retombées · leçons",
      photo: "/media/px-methode-6.jpg",
    },
  ],

  // ── IMMERSION — proposition, à valider par Giz. ───────────────────────
  immersion: [
    {
      titre: "Brainstorming",
      resume: "La technologie vient en dernier.",
      detail:
        "Ce que le visiteur doit comprendre ou ressentir, en combien de temps, dans quelles conditions. Le casque, le mapping ou la 3D temps réel découlent de cette réponse — jamais l’inverse.",
      livrable: "Intention d’expérience · scénario d’usage · budget",
      photo: "/media/px-methode-1.jpg",
    },
    {
      titre: "Conception technique",
      resume: "Le parcours avant les pixels.",
      detail:
        "Parcours du visiteur, durée d’une session, contraintes de la salle, matériel, flux de visiteurs. Prototype testé tôt : une expérience immersive ne se juge pas sur un document.",
      livrable: "Parcours · prototype · besoins matériels",
      photo: "/media/px-methode-2.jpg",
    },
    {
      titre: "Production",
      resume: "Modélisation, développement, intégration.",
      detail:
        "Modélisation et animation 3D, captation 360°, développement de l’application, intégration des contenus. Nos développeurs sont dans l’équipe : ce qui est conçu et ce qui est codé ne se découvrent pas à la livraison.",
      livrable: "Application · contenus 3D · intégration",
      photo: "/media/px-pilier-immersion.jpg",
    },
    {
      titre: "Tests & réglages",
      resume: "Sur de vrais visiteurs.",
      detail:
        "Recette technique, confort, durée réelle d’une session, ergonomie pour quelqu’un qui n’a jamais mis un casque. C’est l’étape que l’on saute le moins volontiers : elle décide de tout le reste.",
      livrable: "Recette · corrections · protocole d’accueil",
      photo: "/media/px-methode-4.jpg",
    },
    {
      titre: "Déploiement",
      resume: "Installer, et faire tourner.",
      detail:
        "Installation sur site, réglages, formation des équipes d’accueil, exploitation pendant toute la durée. Un dispositif immersif sans personne pour l’accompagner reste inutilisé.",
      livrable: "Installation · formation · exploitation",
      photo: "/media/px-mapping.jpg",
    },
    {
      titre: "Débriefing",
      resume: "Et on recommence, mieux.",
      detail:
        "Nombre de sessions, temps passé, points de décrochage, retours des visiteurs et des équipes d’accueil. Ce qu’on en tire nourrit la conception du dispositif suivant.",
      livrable: "Statistiques de session · retours · leçons",
      photo: "/media/px-methode-6.jpg",
    },
  ],
};

/**
 * Ancien jeu d'images, conservé pour la V6 — sinon la comparaison entre les
 * deux versions ne porterait plus sur les images.
 */
const PHOTOS_V6 = [
  "/media/coulisses-interview.jpg",
  "/media/coulisses-tournage.jpg",
  "/media/coulisses-grue.jpg",
  "/media/pilier-communication.jpg",
  "/media/ref-ssp.jpg",
  "/media/ref-clasquin.jpg",
];

export function MethodeEnCercle({ jeu = "actuel" }: { jeu?: "actuel" | "pexels" }) {
  const [metier, setMetier] = useState<Metier>("film");
  const [actif, setActif] = useState(0);

  const etapes = PARCOURS[metier];
  const e = etapes[actif];
  const photo = jeu === "pexels" ? e.photo : PHOTOS_V6[actif];
  const R = 42; // rayon en pourcentage du conteneur

  return (
    <div>
      {/* ── Le choix du métier ──────────────────────────────────────────
          Placé AVANT le cercle, et pas à côté : on choisit de quoi on parle
          avant de lire les étapes. Changer de métier remet l'étape à 1 —
          rester sur l'étape 4 en changeant de parcours n'aurait aucun sens
          pour quelqu'un qui découvre. */}
      <div className="mb-14 flex flex-wrap gap-3">
        {METIERS.map(m => {
          const on = m.cle === metier;
          return (
            <button
              key={m.cle}
              onClick={() => {
                setMetier(m.cle);
                setActif(0);
              }}
              aria-pressed={on}
              className="rounded-md border-2 px-6 py-4 text-left transition"
              style={{
                borderColor: on ? BLEU : "rgba(0,0,0,.12)",
                background: on ? BLEU : "transparent",
                color: on ? "#fff" : "inherit",
              }}
            >
              <span className="block text-[1.0625rem] font-bold">{m.nom}</span>
              <span className={`mt-0.5 block text-[13px] ${on ? "text-white/70" : "opacity-50"}`}>
                {m.sousTitre}
              </span>
            </button>
          );
        })}
      </div>

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
              strokeDasharray={`${(2 * Math.PI * R) / etapes.length} ${2 * Math.PI * R}`}
              strokeDashoffset={-((2 * Math.PI * R) / etapes.length) * actif}
              className="transition-all duration-500"
            />
          </svg>

          {/* Le centre porte ce qu'une frise verticale ne pouvait pas dire. */}
          <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: BLEU }}>
              Étape préalable
            </div>
            <div className="mt-2 text-lg font-bold leading-tight tracking-tight">Analyse</div>
            <p className="mt-2 px-2 text-[13px] leading-snug opacity-55">{ANALYSE[metier]}</p>
          </div>

          {etapes.map((etape, i) => {
            const angle = (i / etapes.length) * 2 * Math.PI - Math.PI / 2;
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
            Étape {actif + 1} sur {etapes.length}
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
            style={{ backgroundImage: `url('${photo}')` }}
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
              onClick={() => setActif((actif + 1) % etapes.length)}
              className="rounded-md px-6 py-3.5 text-[15px] font-bold text-white transition hover:brightness-110"
              style={{ background: BLEU }}
            >
              Étape suivante
            </button>
            {actif === etapes.length - 1 && (
              <span className="text-[15px] font-semibold" style={{ color: BLEU_CLAIR }}>
                …et le cycle recommence.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
