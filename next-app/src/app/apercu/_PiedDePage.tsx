import { BLEU_CLAIR, SOMBRE_PROFOND } from "./_palette";
import { COMPETENCES } from "./_plan-du-site";

/**
 * LE PIED DE PAGE — partagé par toutes les pages.
 *
 * ⛔⛔ TROISIÈME VERSION, ET LES DEUX PREMIÈRES ÉTAIENT RATÉES DIFFÉREMMENT.
 * Ce qui suit est écrit pour éviter de refaire le tour du problème.
 *
 * VERSION 1 — quatre colonnes par métier, plus une bande de villes, plus une
 * bande de mentions. Résultat : presque un écran entier. La cause n'était pas
 * les marges mais la RÉPARTITION : les neuf savoir-faire se distribuent
 * 5 / 3 / 1 entre les métiers, et une grille réserve à toutes ses colonnes la
 * hauteur de la plus longue. La colonne Immersion tenait une ligne face à
 * cinq — la moitié du bloc était du vide.
 *
 * VERSION 2 — j'ai supprimé les colonnes pour supprimer le vide. La hauteur
 * a bien fondu, mais neuf liens à la file sans hiérarchie ne se lisent plus :
 * l'œil ne sait pas où commence une entrée et où finit la suivante. Giz :
 * « maintenant tout se chevauche ». Rien ne se chevauchait au sens
 * géométrique — vérifié à dix largeurs, de 420 à 1600 px, zéro
 * recouvrement. Mais l'impression était juste, et c'est elle qui compte.
 *
 * 👉 CE QUE J'AVAIS MANQUÉ : le vide ne venait pas des colonnes, il venait
 * du GROUPEMENT PAR MÉTIER. En renonçant à ce groupement, on peut garder des
 * colonnes — et les neuf savoir-faire se répartissent alors trois par trois,
 * parfaitement équilibrés. Structure ET compacité, au lieu de l'une contre
 * l'autre.
 *
 * Le groupement par métier n'est d'ailleurs pas perdu : il est porté par le
 * menu « Offres » de l'en-tête, présent sur chaque page lui aussi.
 *
 * 📌 Les neuf savoir-faire restent listés en clair : ce sont les pages qui
 * portent le référencement du site, et les citer partout leur donne un lien
 * entrant depuis chaque page.
 */

const VILLES = [
  { nom: "Lyon", detail: ["Siège social", "8 rue Jean Élysée Dupuy", "69410 Champagne-au-Mont-d’Or"] },
  { nom: "Paris", detail: ["92 avenue Victor Hugo", "92100 Boulogne-Billancourt"] },
  { nom: "Genève", detail: ["bluevista.ch", "Suisse romande"] },
];

export function PiedDePage() {
  return (
    <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
      <div className="mx-auto max-w-[1500px] px-8 py-14">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* ── L'identité ─────────────────────────────────────────────── */}
          <div>
            <a href="/apercu/v7" aria-label="Bluevista — accueil">
              {/* ⛔ Le logo est une IMAGE, jamais du texte composé. */}
              <img src="/media/logo-bluevista-blanc.png" alt="Bluevista" className="h-6 w-auto" />
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-white/50">
              Agence de communication &amp; marketing, d’événementiel et
              d’immersion. Toute la chaîne de production en interne, depuis 2004.
            </p>
            <a
              href="/apercu/contact"
              className="mt-5 inline-block text-[14px] font-semibold transition hover:text-white"
              style={{ color: BLEU_CLAIR }}
            >
              +33 (0)4 72 34 51 89
            </a>
          </div>

          {/* ── Les savoir-faire, trois par trois ──────────────────────────
              ⛔ Pas de groupement par métier ici : c'est lui qui créait le
              vide, puisque la répartition est 5/3/1. Sans groupement, neuf
              entrées se rangent trois par trois — colonnes équilibrées,
              hauteur minimale, et la structure que la version précédente
              avait perdue. */}
          <nav aria-label="Nos savoir-faire">
            <div className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU_CLAIR }}>
              Nos savoir-faire
            </div>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {COMPETENCES.map(c => (
                <li key={c.slug}>
                  <a
                    href={`/apercu/competence/${c.slug}`}
                    className="text-[14px] leading-snug text-white/55 transition hover:text-white"
                  >
                    {c.nom}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Les villes ─────────────────────────────────────────────────
              ⛔ NE JAMAIS ÉCRIRE « bureau commercial » pour Paris ni Genève,
              et ne jamais affirmer qu'il y a un STUDIO là-bas : ce serait
              faux. On cite les villes sans les qualifier — c'est exact, et
              ça nourrit le référencement local. */}
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU_CLAIR }}>
              Nous trouver
            </div>
            <div className="mt-4 space-y-4">
              {VILLES.map(v => (
                <address key={v.nom} className="not-italic text-[14px] leading-relaxed">
                  <span className="font-semibold text-white/75">{v.nom}</span>
                  <span className="block text-white/45">{v.detail.join(" · ")}</span>
                </address>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-8 py-5 text-[13px] text-white/40">
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            <a href="/apercu/agence" className="transition hover:text-white">L’agence</a>
            <a href="/apercu/realisations" className="transition hover:text-white">Réalisations</a>
            <a href="/apercu/contact" className="transition hover:text-white">Contact</a>
            {/* ⚠️ Obligatoires pour un site commercial français. Elles
                n'existent pas encore — le texte le dit plutôt que de faire
                semblant, et ⛔ ne doit jamais rester en « # ». */}
            <span className="opacity-50" title="À créer avant la mise en ligne">Mentions légales</span>
            <span className="opacity-50" title="À créer avant la mise en ligne">Politique de confidentialité</span>
          </nav>
          <div>© {new Date().getFullYear()} Bluevista</div>
        </div>
      </div>
    </footer>
  );
}
