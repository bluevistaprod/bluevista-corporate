import { EnTete } from "../_EnTete";
import { PiedDePage } from "../_PiedDePage";
import { GalerieRealisations } from "../_GalerieRealisations";
import { lireRealisations } from "../../../lib/sanity";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../_palette";

/**
 * L'INDEX DES RÉALISATIONS.
 *
 * 140 pages sur l'ancien site : c'est le plus gros actif de contenu de
 * Bluevista, et le seul endroit où la preuve est apportée plutôt qu'affirmée.
 *
 * Le filtre par produit rend cliquables les produits listés sur les pages
 * métier — c'est ce qui referme la boucle entre les offres et les preuves.
 */
/**
 * ⛔ CETTE PAGE LIT SANITY, PLUS LE CODE. C'est la bascule : jusqu'ici la
 * maquette affichait un fichier TypeScript, désormais elle affiche ce que
 * Giz voit et modifie dans le studio. Une correction publiée à 10 h est en
 * ligne à 10 h 01 — sans reconstruction, sans intervention de ma part.
 *
 * `_realisations.ts` reste dans le dépôt : il a servi de source à l'import
 * et garde la trace du rapprochement des images et des anciennes URL.
 * ⚠️ Il n'est plus la vérité. Le modifier ne changerait plus rien à l'écran.
 */
export default async function PageRealisations({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string }>;
}) {
  const { produit } = await searchParams;
  const realisations = await lireRealisations("fr");

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section className="relative overflow-hidden" style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-20 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Depuis 2004
          </div>
          <h1 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Ce qu’on a fait pour eux
          </h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-white/75">
            Filtrez par métier ou par type de projet. Chaque produit annoncé sur
            nos pages d’offres doit se retrouver ici — sinon il n’a rien à y
            faire.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-8 py-20">
        <GalerieRealisations realisations={realisations} produitInitial={produit ?? null} />
      </section>

      {/* ── L'état du chantier, affiché ────────────────────────────────── */}
      {/* ⛔ Sur fond CLAIR : c'était la dernière bande sombre collée au pied
          de page, celle qui restait après la correction du « double
          footer ». Vérifié page par page — c'est la seule qui avait
          échappé au premier passage. */}
      <section style={{ background: CLAIR_SOUTENU }} className="py-20">
        <div className="mx-auto max-w-[900px] px-8">
          <div
            className="rounded-md border-2 border-dashed px-8 py-8"
            style={{ borderColor: "#E0A400", color: "#9A7200", background: "rgba(224,164,0,.09)" }}
          >
            <div className="text-[13px] font-bold uppercase tracking-[0.16em]">
              État de la maquette
            </div>
            <p className="mt-4 text-[1.0625rem] leading-relaxed">
              <strong>{realisations.length} réalisations</strong> sur les 140 de
              l’ancien site — seulement celles qui ont du trafic. Aucune n’a
              encore son visuel, son contexte ni son résultat.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed opacity-80">
              C’est le plus gros poste de travail restant, et le plus rentable :
              une galerie prouve qu’on sait faire, une fiche de projet prouve ce
              que ça a donné. Toute la différence entre un portfolio et une
              référence commerciale tient là.
            </p>
          </div>
        </div>
      </section>
      <PiedDePage />
    </main>
  );
}
