import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { REALISATIONS } from "../../_realisations";
import { COMPETENCES, METIERS } from "../../_plan-du-site";
import { OFFRES } from "../../_offres";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";

/**
 * LE GABARIT DE RÉALISATION — 140 pages sortiront de ce fichier.
 *
 * ⛔ CE QUI DÉCIDE DE LA VALEUR DE CES PAGES N'EST PAS LEUR DESIGN.
 * L'ancienne page Engie fait 61 clics et 10 087 impressions à elle seule,
 * avec un simple titre et une vidéo. Ce qui la fait remonter, c'est le nom du
 * client et le sujet — pas la mise en page.
 *
 * 👉 La structure ci-dessous suit donc l'ordre d'un CAS, pas d'un portfolio :
 *      le contexte  → l'enjeu  → ce qu'on a fait  → ce que ça a donné.
 * Un portfolio montre ce qu'on sait faire ; un cas montre ce que ça a produit.
 * C'est exactement la recommandation de l'audit Rocket CEO — « crée 3 à 4 cas
 * clients formalisés » — appliquée à l'échelle du site.
 *
 * ⚠️ Les quatre blocs sont vides et le disent à l'écran. C'est délibéré : un
 * gabarit qui se remplit de faux texte donne l'illusion d'un site fini, et on
 * découvre le travail réel au moment de la mise en ligne.
 */

export function generateStaticParams() {
  return REALISATIONS.map(r => ({ slug: r.slug }));
}

const BLOCS = [
  {
    titre: "Le contexte",
    aide: "Qui est le client, sur quel marché, et à quel moment de sa vie d’entreprise ce projet arrive.",
  },
  {
    titre: "L’enjeu",
    aide: "Ce qu’il fallait obtenir, et pourquoi ce n’était pas évident. C’est le bloc qui rend le reste intéressant.",
  },
  {
    titre: "Ce qu’on a fait",
    aide: "Le dispositif, les moyens, les contraintes. Assez précis pour qu’un pair reconnaisse le métier.",
  },
  {
    titre: "Ce que ça a donné",
    aide: "Le chiffre, ou à défaut le fait vérifiable. ⚠️ Rien d’estimé — c’est la règle depuis « 145 films ».",
  },
];

export default async function PageRealisation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = REALISATIONS.find(x => x.slug === slug);
  if (!r) notFound();

  const metier = METIERS.find(m => m.cle === r.metier);
  const offre = OFFRES.find(o => o.produits.some(p => p.slug === r.produit));
  const competence = offre
    ? COMPETENCES.find(c => c.slug === offre.competences[0])
    : undefined;
  const cas = r.cas;

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-16 pt-44">
          <nav className="mb-6 text-[14px] text-white/55">
            <a href="/apercu/realisations" className="hover:text-white">
              Réalisations
            </a>
            {metier && (
              <>
                <span className="mx-2">·</span>
                <a href={`/apercu/metier/${metier.slug}`} className="hover:text-white">
                  {metier.nom}
                </a>
              </>
            )}
          </nav>
          <h1 className="max-w-[24ch] text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            {r.titre}
          </h1>
          {r.clics > 0 && (
            <p className="mt-8 text-[14px] tabular-nums text-white/40">
              Page actuelle : {r.clics} clics · {r.impressions.toLocaleString("fr-FR")} impressions sur 12 mois
            </p>
          )}
        </div>
      </section>

      {/* ── Le lecteur vidéo ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <div
          className="flex aspect-video items-center justify-center rounded-md"
          style={{ background: CLAIR_SOUTENU }}
        >
          <span className="text-[13px] uppercase tracking-[0.18em] opacity-35">
            le film du projet
          </span>
        </div>
      </section>

      {/* ── Les quatre blocs du cas ───────────────────────────────────── */}
      <section className="mx-auto max-w-[900px] px-8 pb-20">
        <div className="space-y-10">
          {BLOCS.map((b, i) => {
            const texte = cas ? [cas.contexte, cas.enjeu, cas.ceQuOnAFait, cas.resultat][i] : null;
            return (
              <div key={b.titre} className="border-t pt-7" style={{ borderColor: "rgba(0,0,0,.12)" }}>
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                    0{i + 1}
                  </span>
                  <h2 className={TYPO.sousTitre}>{b.titre}</h2>
                </div>
                {texte ? (
                  <p className={`mt-4 pl-9 ${TYPO.corps}`}>{texte}</p>
                ) : (
                  /* Le bloc vide dit ce qu'il attend, et pourquoi. Un gabarit
                     rempli de faux texte donne l'illusion d'un site fini. */
                  <p className="mt-4 pl-9 text-[15px] leading-relaxed opacity-45">{b.aide}</p>
                )}
              </div>
            );
          })}
        </div>

        {cas?.credits && (
          <p className="mt-12 border-t pt-6 text-[15px] opacity-50" style={{ borderColor: "rgba(0,0,0,.12)" }}>
            {cas.credits}
          </p>
        )}
      </section>

      {/* ── Le maillage : c'est ce qui fait travailler ces 140 pages ──── */}
      {(offre || competence) && (
        <section style={{ background: CLAIR_SOUTENU }}>
          <div className="mx-auto max-w-[1500px] px-8 py-20">
            <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
              <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
              Ce projet relève de
            </div>
            <div className="flex flex-wrap gap-4">
              {offre && (
                <a
                  href={`/apercu/metier/${metier?.slug ?? "film"}`}
                  className="rounded-md border-2 px-7 py-5 transition hover:shadow-md"
                  style={{ borderColor: `${BLEU}33`, background: "#fff" }}
                >
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] opacity-40">
                    Offre
                  </div>
                  <div className="mt-1.5 font-bold" style={{ color: BLEU }}>
                    {offre.nom}
                  </div>
                </a>
              )}
              {competence && (
                <a
                  href={`/apercu/competence/${competence.slug}`}
                  className="rounded-md border-2 px-7 py-5 transition hover:shadow-md"
                  style={{ borderColor: `${BLEU}33`, background: "#fff" }}
                >
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] opacity-40">
                    Savoir-faire
                  </div>
                  <div className="mt-1.5 font-bold" style={{ color: BLEU }}>
                    {competence.nom}
                  </div>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: SOMBRE, color: "#fff" }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Un projet <span style={{ color: BLEU_CLAIR }}>comparable</span> ?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/apercu/contact"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
          <a
            href="/apercu/realisations"
            className="rounded-md border border-white/30 px-9 py-4 text-[16px] font-semibold"
          >
            Voir les autres réalisations
          </a>
        </div>
      </section>
    </main>
  );
}
