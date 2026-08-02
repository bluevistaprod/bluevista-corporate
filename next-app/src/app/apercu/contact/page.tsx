import { EnTete } from "../_EnTete";
import { ChoixMetier } from "../_ChoixMetier";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../_palette";

/**
 * LA PAGE CONTACT — /contact-devis/ sur l'ancien site, 17 clics sur 12 mois.
 *
 * ⛔ ELLE S'APPELLE « CONTACT & DEVIS », ET LE MOT « DEVIS » RESTE.
 * La Search Console recense neuf requêtes distinctes qui le contiennent :
 * « devis vidéo d'entreprise lyon », « devis motion design », « devis
 * audiovisuel »… Le retirer partout par souci de registre coûterait un
 * vocabulaire qui amène de vrais visiteurs. Il a été rétrogradé au second
 * rang des boutons ailleurs sur le site ; ici, il est chez lui.
 *
 * ⛔⛔ LE FORMULAIRE DOIT ALIMENTER PODIO EN NATIF — décision prise plus tôt
 * dans le chantier (application Ventes 4233499, mapping des champs relevé).
 * Pas de passerelle tierce, pas de simple e-mail : une demande qui n'entre
 * pas dans le pipeline commercial est une demande qu'on oublie.
 * Les champs ci-dessous sont donc calqués sur ceux de l'app Ventes, pas
 * inventés pour la maquette.
 *
 * ⚠️ Le champ BUDGET est volontairement facultatif et par tranches. Le rendre
 * obligatoire fait fuir ceux qui ne savent pas encore — c'est-à-dire une
 * bonne partie des projets intéressants.
 */

const CHAMPS = [
  { id: "nom", label: "Nom et prénom", type: "text", requis: true, large: false },
  { id: "entreprise", label: "Entreprise", type: "text", requis: true, large: false },
  { id: "email", label: "E-mail", type: "email", requis: true, large: false },
  { id: "telephone", label: "Téléphone", type: "tel", requis: false, large: false },
];

const BUDGETS = ["Moins de 5 000 €", "5 000 à 15 000 €", "15 000 à 50 000 €", "Plus de 50 000 €", "Je ne sais pas encore"];

export default function PageContact() {
  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-20 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Contact &amp; devis
          </div>
          <h1 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Parlons de vos objectifs avant de parler de format
          </h1>
          <p className="mt-7 max-w-2xl text-[1.15rem] leading-relaxed text-white/80">
            Décrivez votre projet en quelques lignes. On revient vers vous sous
            48&nbsp;heures ouvrées, avec des questions avant des chiffres.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-24">
          {/* ── Le formulaire ─────────────────────────────────────────── */}
          <form className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {CHAMPS.map(c => (
                <label key={c.id} className="block">
                  <span className="text-[14px] font-bold">
                    {c.label}
                    {c.requis && <span style={{ color: BLEU }}> *</span>}
                  </span>
                  <input
                    type={c.type}
                    name={c.id}
                    required={c.requis}
                    className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none transition focus:border-[#12607E]"
                  />
                </label>
              ))}
            </div>

            <fieldset>
              <legend className="text-[14px] font-bold">
                Votre projet relève de<span style={{ color: BLEU }}> *</span>
              </legend>
              <ChoixMetier />
            </fieldset>

            <label className="block">
              <span className="text-[14px] font-bold">Budget envisagé</span>
              <span className="ml-2 text-[13px] opacity-45">facultatif</span>
              <select
                name="budget"
                className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none focus:border-[#12607E]"
                defaultValue=""
              >
                <option value="">—</option>
                {BUDGETS.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[14px] font-bold">
                Votre projet<span style={{ color: BLEU }}> *</span>
              </span>
              <span className="mt-1 block text-[13px] opacity-50">
                Ce que vous devez obtenir, pour qui, et à quelle échéance. Le
                format viendra après.
              </span>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none focus:border-[#12607E]"
              />
            </label>

            <button
              type="button"
              className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
              style={{ background: BLEU }}
            >
              Envoyer
            </button>

            <p className="text-[13px] leading-relaxed opacity-50">
              Vos données servent uniquement à traiter votre demande. Elles ne
              sont ni revendues ni utilisées à d’autres fins.
            </p>
          </form>

          {/* ── La colonne de droite ──────────────────────────────────── */}
          <aside className="space-y-10">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
                Directement
              </div>
              <p className="mt-4 text-[1.15rem] font-semibold leading-snug">
                Un projet urgent, ou une question rapide&nbsp;?
              </p>
              <p className={`mt-3 ${TYPO.corps}`}>
                Le téléphone reste plus rapide qu’un formulaire, et c’est
                souvent en cinq minutes qu’on sait si un projet est pour nous.
              </p>
              <div
                className="mt-6 rounded-md border-2 border-dashed px-6 py-5 text-[15px]"
                style={{ borderColor: `${BLEU}55` }}
              >
                Téléphone et adresse e-mail à reprendre de l’ancien site.
              </div>
            </div>

            <div
              className="rounded-md p-8"
              style={{ background: CLAIR_SOUTENU }}
            >
              <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
                Ce qui se passe ensuite
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  "On vous rappelle sous 48 heures ouvrées.",
                  "Un premier échange pour comprendre l’objectif — sans engagement, et sans chiffre à ce stade.",
                  "Un concept chiffré, narratif et graphique. C’est le livrable de notre première étape, et il est offert.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                      0{i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed opacity-75">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* ── L'avertissement technique ─────────────────────────────────── */}
      <section style={{ background: SOMBRE, color: "#fff" }} className="py-16">
        <div className="mx-auto max-w-[900px] px-8">
          <div
            className="rounded-md border-2 border-dashed px-8 py-7"
            style={{ borderColor: "#E0A400", color: "#FFD98A", background: "rgba(224,164,0,.08)" }}
          >
            <div className="text-[13px] font-bold uppercase tracking-[0.16em]">
              Maquette — le formulaire n’envoie rien
            </div>
            <p className="mt-4 text-[1.0625rem] leading-relaxed">
              Il devra alimenter <strong>Podio en natif</strong> (application
              Ventes), et non un e-mail ou une passerelle tierce&nbsp;: une
              demande qui n’entre pas dans le pipeline commercial est une
              demande qu’on oublie. Les champs ci-dessus sont calqués sur ceux
              de l’application, pas inventés.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
