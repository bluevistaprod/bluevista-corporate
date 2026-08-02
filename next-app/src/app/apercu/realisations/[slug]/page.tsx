import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { lireRealisation, lireRealisations, imageUrl } from "../../../../lib/sanity";
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

/**
 * ⛔ LES ADRESSES VIENNENT DE SANITY. Ajouter une réalisation dans le studio
 * crée sa page — sans que je touche au code. C'est la différence concrète
 * entre une maquette et un site.
 */
export async function generateStaticParams() {
  const rs = await lireRealisations("fr");
  return rs.map(r => ({ slug: r.slug }));
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
  const r = await lireRealisation(slug, "fr");
  if (!r) return notFound();

  const metier = METIERS.find(m => m.cle === r.metier);
  const offre = OFFRES.find(o => o.produits.some(p => p.slug === r.produit));
  /* La page du produit, quand ce produit en a une. `competences` n'existe
     plus au niveau de l'offre : l'information vit sur chaque produit depuis
     la fusion des deux niveaux. */
  const slugPage = offre?.produits.find(x => x.slug === r.produit)?.page;
  const competence = slugPage ? COMPETENCES.find(c => c.slug === slugPage) : undefined;
  /* Le cas est reconstitué à partir des champs du document. Il n'est
     considéré comme écrit que si l'ENJEU l'est : c'est le bloc qui rend
     les autres intéressants, et une fiche sans enjeu est une fiche vide
     habillée en cas client. */
  const cas = r.casEnjeu
    ? {
        accroche: r.intro,
        contexte: r.casContexte,
        enjeu: r.casEnjeu,
        ceQuOnAFait: r.casFait,
        resultat: r.casResultat ?? null,
        credits: undefined as string | undefined,
        photos: 0,
      }
    : undefined;

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
        </div>
      </section>

      {/* ── L'accroche, puis la vidéo ───────────────────────────────────
          L'accroche AVANT le film, et pas après : elle dit ce qu'il faut y
          chercher. Sans elle, on lance une vidéo sans savoir ce qu'on
          regarde — et on l'arrête au bout de vingt secondes. */}
      <section className="mx-auto max-w-[1200px] px-8 pt-16">
        {r.intro && (
          <p className="mb-10 max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.01em]">
            {r.intro}
          </p>
        )}
        {/* ⚠️ LES VIDÉOS SONT SUR VIMEO AUJOURD'HUI — 144 sur 145. Elles
            doivent être repointées vers LIVID avant la bascule (décision de
            Giz). L'iframe n'est donc pas montée ici : poser un lecteur Vimeo
            reviendrait à câbler ce qu'on va défaire, et à déclencher au
            passage la bannière de consentement qu'on cherche à éviter. */}
        <div
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md"
          style={{
            background: r.image ? `url('${imageUrl(r.image, 1200, 675)}') center/cover` : CLAIR_SOUTENU,
          }}
        >
          {Boolean(r.image) && <span className="absolute inset-0" style={{ background: `${NOIR}66` }} />}
          <span
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: BLEU_CLAIR }}
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill={NOIR} aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {r.video && (
            <span className="absolute bottom-3 right-4 text-[11px] text-white/60">
              {String(r.video).includes("vimeo") ? "Vimeo — à migrer vers Livid" : String(r.video)}
            </span>
          )}
        </div>
      </section>

      {/* ── Les photos de fabrication ───────────────────────────────────
          La vidéo prouve le résultat, les photos prouvent la fabrication.
          Une agence de production a besoin des deux — c'est ce qui
          distingue une fiche de projet d'une simple mise en ligne de film. */}
      {cas?.photos && (
        <section className="mx-auto max-w-[1200px] px-8 pt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* ⛔ PAS DE LÉGENDE SOUS LES PHOTOS. Décision de Giz : « on
                n'arrivera pas à les tenir ». C'est le bon réflexe et il vaut
                au-delà de ce bloc — un champ qu'on ne remplira pas sur 140
                fiches finit vide, et un vide répété se voit plus qu'une
                absence assumée. Les photos, elles, restent. */}
            {Array.from({ length: cas.photos }, (_, i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-md"
                style={{ background: CLAIR_SOUTENU }}
              >
                <span className="text-[11px] uppercase tracking-[0.16em] opacity-30">
                  photo
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── LE CONTENU RÉEL, repris de l'export du site ─────────────────
          145 fiches ont deux descriptions écrites par Bluevista. Elles
          s'affichent telles quelles : il n'y a pas de gabarit vide à
          remplir, il y a du texte à relire. */}
      {/* ── Les quatre blocs du cas ───────────────────────────────────── */}
      <section className="mx-auto max-w-[900px] px-8 pb-20 pt-20">
        <div className="space-y-10">
          {(cas ? BLOCS : []).map((b, i) => {
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
