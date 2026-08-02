import { BLEU_CLAIR, SOMBRE_PROFOND } from "./_palette";
import { COMPETENCES, METIERS } from "./_plan-du-site";

/**
 * LE PIED DE PAGE — partagé par TOUTES les pages.
 *
 * ⛔ IL N'ÉTAIT QUE SUR L'ACCUEIL. Ce n'est pas un détail de finition : le
 * pied de page est le seul élément présent partout. Il garantit qu'aucune
 * page n'est un cul-de-sac, porte les mentions obligatoires, et donne à
 * Google un chemin vers les pages profondes depuis n'importe où.
 *
 * ⛔⛔ ET IL ÉTAIT ÉNORME — presque un écran entier. Giz : « mon problème
 * est ton bas de page énorme ». Trois causes cumulées, toutes de moi :
 *
 *   1. TROIS BANDES EMPILÉES — savoir-faire, puis villes, puis mentions.
 *      Chacune avec sa propre respiration verticale.
 *   2. DES COLONNES TRÈS INÉGALES. Les savoir-faire sont répartis 5 / 3 / 1
 *      entre les métiers : la colonne Immersion tenait une ligne face à
 *      cinq, et la grille réservait la hauteur de la plus longue. Presque
 *      la moitié du bloc était du vide.
 *   3. Des marges dimensionnées pour une section de contenu, pas pour un
 *      pied de page.
 *
 * 👉 Corrigé en changeant la FORME, pas en rognant les marges : les
 * savoir-faire passent sur une seule ligne fluide, sans colonnes, et les
 * villes sur une ligne aussi. Rien n'a été retiré — c'est le même contenu,
 * dans un tiers de la hauteur.
 *
 * 📌 Les neuf savoir-faire restent listés en clair, et c'est délibéré : ce
 * sont les pages qui portent le référencement du site. Les citer partout
 * leur donne un lien entrant depuis chaque page.
 */
export function PiedDePage() {
  return (
    <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
      <div className="mx-auto max-w-[1500px] px-8 py-12">
        {/* ── Le logo et les savoir-faire, sur une seule ligne ────────── */}
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
          <div className="max-w-xs">
            <a href="/apercu/v7" aria-label="Bluevista — accueil">
              {/* ⛔ Le logo est une IMAGE, jamais du texte composé. */}
              <img src="/media/logo-bluevista-blanc.png" alt="Bluevista" className="h-6 w-auto" />
            </a>
            <p className="mt-4 text-[14px] leading-relaxed text-white/50">
              Agence de communication &amp; marketing, d’événementiel et
              d’immersion. Toute la chaîne de production en interne, depuis 2004.
            </p>
          </div>

          <nav aria-label="Nos savoir-faire" className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {METIERS.map(m => (
                <a
                  key={m.cle}
                  href={`/apercu/metier/${m.slug}`}
                  className="text-[12px] font-bold uppercase tracking-[0.14em] transition hover:text-white"
                  style={{ color: BLEU_CLAIR }}
                >
                  {m.nom}
                </a>
              ))}
            </div>
            {/* Une seule ligne fluide plutôt que trois colonnes : les
                savoir-faire sont répartis 5/3/1, et une grille aurait
                réservé la hauteur de la plus longue partout. */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {COMPETENCES.map(c => (
                <a
                  key={c.slug}
                  href={`/apercu/competence/${c.slug}`}
                  className="text-[14px] text-white/55 transition hover:text-white"
                >
                  {c.nom}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ── Les trois villes, sur une ligne ───────────────────────────
            ⛔ NE JAMAIS ÉCRIRE « bureau commercial » pour Paris ni Genève,
            et ne jamais affirmer qu'il y a un STUDIO là-bas : ce serait
            faux. On cite les villes sans les qualifier — c'est exact, et ça
            nourrit le référencement local. */}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-7 text-[14px] text-white/50">
          <span>
            <strong className="font-semibold text-white/70">Lyon</strong> — 8 rue Jean Élysée Dupuy,
            69410 Champagne-au-Mont-d’Or · +33 (0)4 72 34 51 89
          </span>
          <span>
            <strong className="font-semibold text-white/70">Paris</strong> — 92 avenue Victor Hugo,
            92100 Boulogne-Billancourt
          </span>
          <span>
            <strong className="font-semibold text-white/70">Genève</strong> — bluevista.ch
          </span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 py-5 text-[13px] text-white/40">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/apercu/agence" className="transition hover:text-white">L’agence</a>
            <a href="/apercu/realisations" className="transition hover:text-white">Réalisations</a>
            <a href="/apercu/contact" className="transition hover:text-white">Contact</a>
            {/* ⚠️ Obligatoires pour un site commercial français. Elles
                n'existent pas encore — le lien le dit plutôt que de faire
                semblant, et ⛔ ne doit jamais rester en « # ». */}
            <span className="opacity-50" title="À créer avant la mise en ligne">Mentions légales</span>
            <span className="opacity-50" title="À créer avant la mise en ligne">Politique de confidentialité</span>
          </div>
          <div>© {new Date().getFullYear()} Bluevista</div>
        </div>
      </div>
    </footer>
  );
}
