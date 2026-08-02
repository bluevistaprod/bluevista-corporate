"use client";

import { useState } from "react";
import { BLEU_CLAIR, NOIR, TYPO } from "./_palette";

/**
 * LES TÉMOIGNAGES — remis à la demande de Giz, 02/08/2026.
 *
 * ⛔⛔⛔ AUCUN DE CES TÉMOIGNAGES N'EST RÉEL. LIRE AVANT DE TOUCHER.
 *
 * La maquette Manus en contenait trois, présentés comme authentiques. L'un
 * d'eux était attribué à « Yanniv Bettane, Directeur Marketing, KOESIO » —
 * Yaniv Bettane est un COLLABORATEUR DE BLUEVISTA, et la photo qui
 * l'accompagnait était une image de banque (Unsplash). Un faux témoignage
 * signé d'un nom réel, sur un site d'agence, n'est pas une maladresse de
 * maquette : c'est une pratique commerciale trompeuse, et le nom cité est
 * celui d'une vraie personne dans une vraie entreprise.
 *
 * Donc : la structure est là pour juger le DESIGN, le contenu est du faux
 * assumé et signalé comme tel à l'écran par le bandeau ci-dessous.
 * `AUTHENTIQUE = false` verrouille la section tant que les vrais témoignages
 * ne sont pas recueillis, avec accord écrit du client sur la citation.
 */
const AUTHENTIQUE = false;

/**
 * POURQUOI EN VIDÉO PLUTÔT QU'EN CITATION.
 *
 * Une citation entre guillemets sur un site d'agence ne prouve rien : tout le
 * monde sait qu'elle a pu être écrite en interne — c'est exactement ce qui
 * s'était passé ici. Un client filmé qui parle est invérifiable à la baisse :
 * on voit son visage, on entend sa voix, il travaille dans une entreprise
 * qu'on peut appeler.
 *
 * Et pour Bluevista, c'est deux preuves en une : ce que dit le client, et la
 * qualité de l'image dans laquelle il le dit. Une interview client bien
 * filmée est un échantillon de travail déguisé en témoignage. Aucune autre
 * section de la page ne fait ce travail-là.
 *
 * 👉 Ce que ça implique côté production : il faut ALLER FILMER trois clients.
 * Une demi-journée chacun. C'est le seul contenu de cette page qui ne peut
 * pas être fabriqué depuis un bureau.
 */
type Temoignage = {
  citation: string;
  auteur: string;
  fonction: string;
  entreprise: string;
  /** Image d'attente de la vidéo. */
  poster: string;
  duree: string;
};

const TEMOIGNAGES: Temoignage[] = [
  {
    citation:
      "On est arrivés avec un brief déjà écrit. Ils l’ont démonté en deux heures, et ils avaient raison — le film qu’on avait en tête ne parlait pas à ceux qu’on visait.",
    auteur: "Prénom Nom",
    fonction: "Fonction",
    entreprise: "ENTREPRISE",
    poster: "/media/ref-clasquin.jpg",
    duree: "2 min 40",
  },
  {
    citation:
      "Le jour du tournage, personne dans mes équipes n’a eu l’impression de perdre sa journée. C’est bête, mais c’est ça qui fait qu’on les rappelle.",
    auteur: "Prénom Nom",
    fonction: "Fonction",
    entreprise: "ENTREPRISE",
    poster: "/media/ref-irisolaris.jpg",
    duree: "3 min 10",
  },
  {
    citation:
      "Six mois après, ils sont revenus avec les chiffres de diffusion et ce qu’il fallait changer pour le suivant. Aucun prestataire ne m’avait fait ça avant.",
    auteur: "Prénom Nom",
    fonction: "Fonction",
    entreprise: "ENTREPRISE",
    poster: "/media/ref-ssp.jpg",
    duree: "2 min 05",
  },
];

/** Portraits de calage — V7. Trois profils visiblement différents, chacun
 *  dans un lieu réel plutôt que sur fond de studio uni. */
const POSTERS_PEXELS = [
  "/media/px-temoignage-1.jpg",
  "/media/px-temoignage-2.jpg",
  "/media/px-temoignage-3.jpg",
];

export function Temoignages({ jeu = "actuel" }: { jeu?: "actuel" | "pexels" }) {
  const [i, setI] = useState(0);
  const t = TEMOIGNAGES[i];
  const poster = jeu === "pexels" ? POSTERS_PEXELS[i] : t.poster;

  return (
    <div>
      {!AUTHENTIQUE && (
        <div
          className="mb-12 rounded-md border-2 border-dashed px-6 py-5 text-[15px] leading-relaxed"
          style={{ borderColor: "#E0A400", color: "#FFD98A", background: "rgba(224,164,0,.08)" }}
        >
          <strong>Contenu factice — visible uniquement dans la maquette.</strong>{" "}
          Les trois témoignages ci-dessous sont inventés et les noms sont
          volontairement laissés en « Prénom Nom ». Cette section reste bloquée
          tant que les vraies interviews ne sont pas tournées et que les clients
          n’ont pas validé leur citation par écrit.
        </div>
      )}

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* L'image d'attente de l'interview. */}
        <button
          type="button"
          className="group relative aspect-[4/5] w-full overflow-hidden rounded-md bg-cover bg-center"
          style={{ backgroundImage: `url('${poster}')` }}
          aria-label={`Lire le témoignage de ${t.auteur}`}
        >
          <span
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${NOIR}CC, transparent 55%)` }}
          />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition duration-300 group-hover:scale-110"
            style={{ background: BLEU_CLAIR }}
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill={NOIR} aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-6 text-sm font-semibold text-white/75">
            {t.duree}
          </span>
        </button>

        {/* Ce qu'il dit. */}
        <div>
          <blockquote className="text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-white">
            {t.citation}
          </blockquote>

          <div className="mt-9 border-t border-white/15 pt-6">
            <div className="text-[1.0625rem] font-bold text-white">{t.auteur}</div>
            <div className="mt-1 text-[15px] text-white/55">{t.fonction}</div>
            <div className="mt-1 text-[15px] font-bold uppercase tracking-[0.14em]" style={{ color: BLEU_CLAIR }}>
              {t.entreprise}
            </div>
          </div>

          {/* Navigation : des traits, pas des pastilles — on lit une liste. */}
          <div className="mt-10 flex items-center gap-3">
            {TEMOIGNAGES.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Témoignage ${n + 1} sur ${TEMOIGNAGES.length}`}
                aria-pressed={n === i}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: n === i ? 56 : 24,
                  background: n === i ? BLEU_CLAIR : "rgba(255,255,255,.28)",
                }}
              />
            ))}
            <span className={`ml-4 ${TYPO.surTitre}`} style={{ color: "rgba(255,255,255,.4)" }}>
              {i + 1} / {TEMOIGNAGES.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
