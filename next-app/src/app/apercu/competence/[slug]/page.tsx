import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { COMPETENCES, METIERS, competencesDuMetier } from "../../_plan-du-site";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";

/**
 * LES PAGES DE COMPÉTENCE — le niveau ② de l'architecture.
 *
 * C'est ici que vit le référencement du site. Neuf pages, neuf expressions
 * de recherche précises, et l'essentiel du trafic hors page d'accueil.
 * Voir _plan-du-site.ts pour le raisonnement complet.
 *
 * ⛔ LES ADRESSES SONT REPRISES TELLES QUELLES de l'ancien site :
 * /nos-competences/video-mapping/ reste video-mapping. Une URL qui se
 * positionne depuis des années est un actif ; la renommer parce qu'elle nous
 * plaît moins revient à le jeter.
 *
 * ⚠️ CE QUI MANQUE ENCORE, et qui compte plus que le design de cette page :
 *   · un vrai texte de fond (800 à 1 200 mots) écrit par Bluevista — c'est
 *     lui qui fait le positionnement, pas la mise en page ;
 *   · les réalisations réellement liées à cette compétence ;
 *   · les questions fréquentes, qui capturent les recherches longues.
 * Le gabarit est prêt pour les accueillir.
 */

export function generateStaticParams() {
  return COMPETENCES.map(c => ({ slug: c.slug }));
}

export default async function PageCompetence({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COMPETENCES.find(x => x.slug === slug);
  if (!c) notFound();

  const metier = METIERS.find(m => m.cle === c.metier)!;
  /* Le maillage interne : les compétences voisines du même métier. C'est ce
     qui fait qu'une page qui se positionne tire les autres avec elle. */
  const voisines = competencesDuMetier(c.metier).filter(x => x.slug !== c.slug);

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete />

      <section className="relative flex min-h-[62vh] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${c.image}')` }}
          role="img"
          aria-label={c.nom}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${NOIR}F2 8%, ${NOIR}95 48%, ${NOIR}45 100%)` }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pb-16 pt-40 text-white">
          {/* Le fil d'Ariane : il dit au visiteur — et à Google — où cette
              page se situe dans l'arborescence. */}
          <nav className="mb-6 text-[14px] text-white/60">
            <a href="/apercu/v7" className="hover:text-white">
              Accueil
            </a>
            <span className="mx-2">·</span>
            <a href={`/apercu/metier/${metier.slug}`} className="hover:text-white">
              {metier.nom}
            </a>
          </nav>
          <h1 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            {c.nom}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-white/80">
            {c.accroche}
          </p>
        </div>
      </section>

      {/* ── Le problème, et ce qu'on prend en charge ──────────────────────
          On ouvre sur le problème du visiteur, pas sur notre savoir-faire :
          il arrive d'une recherche, il veut d'abord savoir s'il est au bon
          endroit. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
              <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
              Le point de départ
            </div>
            <p className={`max-w-xl ${TYPO.chapo}`}>{c.probleme}</p>
          </div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
              Ce qu’on prend en charge
            </div>
            <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {c.ce_qu_on_fait.map(s => (
                <li
                  key={s}
                  className="border-t pt-3 text-[1.0625rem] font-medium"
                  style={{ borderColor: `${BLEU}33` }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── L'emplacement du texte de fond ────────────────────────────────
          Volontairement laissé visible dans la maquette : c'est le contenu
          qui décide du référencement de cette page, et il n'existe pas
          encore. Un gabarit vide qui ne le dit pas laisse croire que la
          page est finie. */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[900px] px-8 py-20">
          <div
            className="rounded-md border-2 border-dashed px-8 py-10"
            style={{ borderColor: `${BLEU}55` }}
          >
            <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
              À écrire — {c.clics} clics sur 12 mois
            </div>
            <p className="mt-4 text-[1.0625rem] leading-relaxed opacity-70">
              Le texte de fond de cette page : 800 à 1 200 mots sur{" "}
              <strong>{c.nom.toLowerCase()}</strong>, écrits par Bluevista. C’est
              lui qui porte le référencement, pas la mise en page — l’ancienne
              page se positionne parce qu’elle dit quelque chose, pas parce
              qu’elle est bien dessinée.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed opacity-55">
              À y faire figurer : des exemples de projets nommés, les questions
              qu’on vous pose vraiment en rendez-vous, les contraintes
              techniques et légales, et un ordre de grandeur de budget.
            </p>
          </div>
        </div>
      </section>

      {/* ── Le maillage interne ───────────────────────────────────────── */}
      {voisines.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-8 py-24">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
            Souvent avec
          </div>
          <h2 className={`max-w-3xl ${TYPO.titre}`}>
            Les autres savoir-faire du pôle {metier.nom.toLowerCase()}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voisines.map(v => (
              <a
                key={v.slug}
                href={`/apercu/competence/${v.slug}`}
                className="group block rounded-md border p-7 transition hover:shadow-lg"
                style={{ borderColor: `${BLEU}2A`, background: "#fff" }}
              >
                <div className={TYPO.sousTitre}>{v.nom}</div>
                <p className="mt-3 text-[15px] leading-relaxed opacity-60">{v.accroche}</p>
                <div className="mt-5 text-[15px] font-bold" style={{ color: BLEU }}>
                  Voir la page →
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: SOMBRE, color: "#fff" }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Un projet de <span style={{ color: BLEU_CLAIR }}>{c.nom.toLowerCase()}</span> ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl px-8 text-lg text-white/65">
          Parlons de vos objectifs avant de parler de format.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/apercu/contact"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
          <a
            href={`/apercu/metier/${metier.slug}`}
            className="rounded-md border border-white/30 px-9 py-4 text-[16px] font-semibold"
          >
            Voir le pôle {metier.nom.toLowerCase()}
          </a>
        </div>
      </section>
    </main>
  );
}
