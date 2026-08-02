import { BLEU_CLAIR, SOMBRE_PROFOND } from "./_palette";
import { COMPETENCES, METIERS } from "./_plan-du-site";

/**
 * LE PIED DE PAGE — partagé par TOUTES les pages.
 *
 * ⛔ IL N'ÉTAIT QUE SUR L'ACCUEIL. Signalé par Giz, et ce n'est pas un
 * détail de finition : le pied de page est le seul endroit du site présent
 * partout. C'est lui qui garantit qu'aucune page n'est un cul-de-sac, qui
 * porte les mentions légales obligatoires, et qui donne à Google un chemin
 * vers les pages profondes depuis n'importe où.
 *
 * Une page intérieure sans pied de page, c'est une page d'où l'on ne peut
 * que reculer.
 *
 * 📌 Il porte volontairement les NEUF savoir-faire en clair. Ce sont les
 * pages qui font le référencement du site — les lister partout leur donne
 * un lien entrant depuis chaque page, ce qui est exactement ce qui manquait
 * aux fiches de réalisation avant qu'on le mesure.
 */
export function PiedDePage() {
  const parMetier = METIERS.map(m => ({
    ...m,
    savoirFaire: COMPETENCES.filter(c => c.metier === m.cle),
  }));

  return (
    <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
      {/* ── Les savoir-faire, par métier ─────────────────────────────── */}
      <div className="mx-auto grid max-w-[1500px] gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* ⛔ Le logo est une IMAGE, jamais du texte composé. */}
          <a href="/apercu/v7" aria-label="Bluevista — accueil">
            <img src="/media/logo-bluevista-blanc.png" alt="Bluevista" className="h-7 w-auto" />
          </a>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
            Agence de communication &amp; marketing, d’événementiel et
            d’immersion. Toute la chaîne de production en interne, depuis 2004.
          </p>
        </div>

        {parMetier.map(m => (
          <div key={m.cle}>
            <a
              href={`/apercu/metier/${m.slug}`}
              className="text-[13px] font-bold uppercase tracking-[0.16em] transition hover:text-white"
              style={{ color: BLEU_CLAIR }}
            >
              {m.nom}
            </a>
            <ul className="mt-4 space-y-2">
              {m.savoirFaire.map(c => (
                <li key={c.slug}>
                  <a
                    href={`/apercu/competence/${c.slug}`}
                    className="text-[15px] text-white/60 transition hover:text-white"
                  >
                    {c.nom}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Les trois villes ─────────────────────────────────────────────
          ⛔ NE JAMAIS ÉCRIRE « bureau commercial » pour Paris ni Genève, et
          ne jamais affirmer qu'il y a un STUDIO là-bas : ce serait faux. On
          cite les villes sans les qualifier — c'est exact, et ça nourrit le
          référencement local. */}
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-8 py-12 sm:grid-cols-3">
          {[
            ["Lyon — siège social", ["8 rue Jean Élysée Dupuy", "69410 Champagne-au-Mont-d’Or", "+33 (0)4 72 34 51 89"]],
            ["Paris", ["92 avenue Victor Hugo", "92100 Boulogne-Billancourt"]],
            ["Genève", ["bluevista.ch", "Suisse romande"]],
          ].map(([ville, lignes]) => (
            <div key={ville as string}>
              <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU_CLAIR }}>
                {ville as string}
              </div>
              <address className="mt-3 not-italic text-[15px] leading-relaxed text-white/60">
                {(lignes as string[]).map(l => (
                  <div key={l}>{l}</div>
                ))}
              </address>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-8 py-7 text-sm text-white/45">
          <div className="flex flex-wrap gap-6">
            <a href="/apercu/agence" className="transition hover:text-white">L’agence</a>
            <a href="/apercu/realisations" className="transition hover:text-white">Réalisations</a>
            <a href="/apercu/contact" className="transition hover:text-white">Contact</a>
            {/* ⚠️ Pages obligatoires pour un site commercial français.
                Elles n'existent pas encore — le lien le dit plutôt que de
                faire semblant. */}
            <span className="opacity-40" title="À créer">Mentions légales</span>
            <span className="opacity-40" title="À créer">Politique de confidentialité</span>
          </div>
          <div className="text-[13px]">© {new Date().getFullYear()} Bluevista</div>
        </div>
      </div>
    </footer>
  );
}
