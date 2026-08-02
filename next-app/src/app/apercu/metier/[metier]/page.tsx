import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { PiedDePage } from "../../_PiedDePage";
import { MethodeEnCercle } from "../../_Methode";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";
import { type Metier as CleMetier } from "../../_plan-du-site";
import { offresDuMetier } from "../../_offres";
import { lirePage, imageUrl } from "../../../../lib/sanity";
import { TOUTES_REALISATIONS } from "../../_realisations";

/**
 * LES TROIS PAGES MÉTIER — créées le 02/08/2026 sur décision de Giz.
 *
 * C'est ici que descend la méthode DÉTAILLÉE, avec ses six étapes propres à
 * chaque métier et ses livrables. La page d'accueil n'en garde qu'un chapeau.
 *
 * Pourquoi une route dynamique et pas trois fichiers : les trois pages ont la
 * même charpente et ne diffèrent que par leur contenu. Trois copies auraient
 * divergé à la première correction — c'est exactement ce qui est arrivé entre
 * la V6 et la V7 sur le pied de page, où le logo n'avait été corrigé qu'à un
 * seul endroit.
 *
 * ⚠️ Ces pages sont des maquettes de structure. Il leur manque, avant toute
 * mise en ligne : les réalisations filtrées par métier, les témoignages du
 * métier, et le maillage interne vers les pages voisines.
 */

type Metier = "film" | "evenement" | "immersion";

const CONTENU: Record<
  Metier,
  {
    /** La clé attendue par le composant de méthode. */
    cleMethode: "film" | "evenementiel" | "immersion";
    /** La clé du plan du site — c'est aussi le segment d'URL. */
    cleMetier: CleMetier;
    surTitre: string;
    titre: string;
    accroche: string;
    chapo: string;
    image: string;
  }
> = {
  film: {
    cleMethode: "film",
    cleMetier: "film",
    surTitre: "Communication & marketing",
    titre: "Des contenus qui font bouger vos indicateurs",
    accroche:
      "Film d’entreprise, motion design, podcast, contenus sociaux. Ce qu’on fabrique dépend de ce que vous devez obtenir — pas l’inverse.",
    chapo:
      "Vous avez un message, mais il se perd dans le bruit. Votre audience ne vous trouve pas, ne vous comprend pas, ou ne passe pas à l’action.",
    image: "/media/px-pilier-communication.jpg",
  },
  evenement: {
    cleMethode: "evenementiel",
    cleMetier: "evenement",
    surTitre: "Événementiel",
    titre: "Une date qui ne bouge pas, et tout ce qu’il y a derrière",
    accroche:
      "Conception, contenus, scénographie, régie, captation. Un événement se prépare pendant des mois pour tenir quelques heures — c’est toute la difficulté du métier.",
    chapo:
      "Un événement réussi ne s’improvise pas le jour même : il se joue dans les semaines qui précèdent, quand plus rien ne doit être en cours de fabrication.",
    image: "/media/px-pilier-evenementiel.jpg",
  },
  immersion: {
    cleMethode: "immersion",
    cleMetier: "immersion",
    surTitre: "Immersion",
    titre: "Faire vivre ce qu’un film ne peut que montrer",
    accroche:
      "Réalité virtuelle, 3D temps réel, mapping, 360°. La technologie découle de ce que votre public doit ressentir — elle ne le précède jamais.",
    chapo:
      "Vos publics veulent des expériences, pas seulement des contenus. Mais la réalité virtuelle paraît complexe, coûteuse, et son intérêt reste flou tant qu’on ne l’a pas essayée.",
    image: "/media/px-pilier-immersion.jpg",
  },
};

export function generateStaticParams() {
  return (Object.keys(CONTENU) as Metier[]).map(metier => ({ metier }));
}

export default async function PageMetier({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const arch = CONTENU[metier as Metier];
  if (!arch) return notFound();

  /* Le titre, l'accroche et l'image viennent de Sanity ; le rattachement
     aux offres et la méthode restent dans le code. */
  const page = await lirePage("metier", metier);
  const c = {
    ...arch,
    titre: page?.titre ?? arch.titre,
    surTitre: page?.surTitre ?? arch.surTitre,
    accroche: page?.accroche ?? arch.accroche,
    image: page?.image ? imageUrl(page.image, 1800, 1100)! : arch.image,
  };

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      {/* ① Le hero du métier — plus court que celui de la home : on arrive
             ici en sachant déjà ce qu'on cherche. */}
      <section className="relative flex min-h-[68vh] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${c.image}')` }}
          role="img"
          aria-label={c.surTitre}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${NOIR}F0 8%, ${NOIR}90 45%, ${NOIR}40 100%)`,
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pb-20 pt-40 text-white">
          <div
            className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`}
            style={{ color: BLEU_CLAIR }}
          >
            <span
              className="inline-block h-[3px] w-12 rounded-full"
              style={{ background: BLEU_CLAIR }}
            />
            {c.surTitre}
          </div>
          <h1 className="max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            {c.titre}
          </h1>
          <p className="mt-7 max-w-2xl text-[1.15rem] leading-relaxed text-white/80">
            {c.accroche}
          </p>
        </div>
      </section>

      {/* ② LES BÉNÉFICES CLIENT — et rien d'autre à ce niveau.
             Demande de Giz, 02/08/2026 : « mettre plus en valeur d'abord les
             bénéfices clients », et faire descendre les produits « sans que
             ça fasse catalogue de 1000 trucs ».

             Il a raison et l'ordre compte : quelqu'un qui arrive ici ne sait
             pas encore ce qu'il veut acheter, il sait ce qu'il veut obtenir.
             Lui présenter d'abord une liste de produits, c'est lui demander
             de faire lui-même la traduction entre son problème et notre
             catalogue — le travail qu'il vient justement nous confier.

             Textes repris MOT POUR MOT du Canva « OFFRES BLUEVISTA 2026 ».
             Voir _offres.ts pour ce qui n'a pas été repris, et pourquoi. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <p className={`mb-20 max-w-2xl ${TYPO.chapo}`}>{c.chapo}</p>

        <div className="space-y-24">
          {offresDuMetier(c.cleMetier).map((o, i) => (
            <article key={o.id} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div>
                <div className="text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                  0{i + 1}
                </div>
                {/* L'accroche EST le bénéfice. C'est le plus gros élément du
                    bloc, avant même le nom de l'offre. */}
                <h2 className={`mt-3 max-w-[16ch] ${TYPO.titre}`}>{o.accroche}</h2>
                <div className="mt-5 text-[13px] font-bold uppercase tracking-[0.16em] opacity-40">
                  {o.nom}
                </div>
              </div>

              <div className="lg:pt-14">
                <p className={TYPO.corps}>{o.promesse}</p>

                {/* L'issue rêvée : ce que le client obtient au bout. C'est le
                    seul endroit de la page où l'on parle de LUI au futur. */}
                <div
                  className="mt-8 border-l-4 py-2 pl-7"
                  style={{ borderColor: BLEU }}
                >
                  <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
                    Au bout du compte
                  </div>
                  <p className="mt-2 text-[1.15rem] font-semibold leading-snug">{o.issue}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ③ LA MÉTHODE DÉTAILLÉE — la raison d'être de cette page.
             `fixe` verrouille le métier et masque le sélecteur : on est déjà
             arrivé par le métier, proposer d'en changer serait proposer de
             quitter la page. */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-28">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
            De l’analyse au débriefing
          </div>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Comment on travaille, étape par étape
          </h2>
          <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
            Six étapes, et elle recommence : le débriefing d’un projet ouvre
            l’analyse du suivant.
          </p>

          <div className="mt-20">
            <MethodeEnCercle jeu="pexels" fixe={c.cleMethode} />
          </div>
        </div>
      </section>

      {/* ④ CE QU'ON FAIT — UN SEUL NIVEAU, plus deux.
             ⛔ Correction de Giz, et elle touchait un vrai défaut : « la page
             savoir-faire » était une formulation interne, et surtout personne
             ne comprenait le lien entre les savoir-faire listés en bas et les
             produits juste au-dessus. Normal — « Motion design » et « Motion
             promo » désignaient la même chose sous deux étiquettes.

             👉 Sa proposition : une page par produit. Sa donnée dit non.
             Mesuré sur sa Search Console, 12 mois : 3D 4 971 impressions,
             mapping 4 755, streaming 3 057, motion design 1 788, corporate
             1 255, VR 793, aftermovie 467 — mais ZÉRO pour packshot, jingle,
             FOOH, métavers, salle immersive, showroom, podcast, convention.
             Créer dix-sept pages que personne ne cherche ne rapporterait
             rien et diluerait les neuf qui fonctionnent.

             La règle retenue : UNE LIGNE PAR CHOSE QU'ON FAIT, et une page
             seulement là où la demande existe. Deux affordances distinctes
             par ligne, expliquées une fois en haut :
               · le NOM mène à la page du produit, quand elle existe ;
               · « exemples » mène aux réalisations filtrées.
             Quand il n'y a pas de page, la ligne entière mène aux exemples. */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Concrètement
        </div>
        <h2 className={`max-w-3xl ${TYPO.titre}`}>Ce qu’on fait</h2>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Cliquez sur un intitulé pour la page détaillée, ou sur{" "}
          <span style={{ color: BLEU }}>exemples</span> pour voir les projets
          correspondants.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offresDuMetier(c.cleMetier).map(o => (
            <div
              key={o.id}
              className="overflow-hidden rounded-md border"
              style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}
            >
              <div
                className="aspect-[16/9] bg-cover bg-center"
                style={{ backgroundImage: `url('${o.image}')` }}
                role="img"
                aria-label={o.nom}
              />
              <div className="p-7">
                <div className={TYPO.sousTitre}>{o.nom}</div>

                <ul className="mt-5 divide-y" style={{ borderColor: "rgba(0,0,0,.08)" }}>
                  {o.produits.map(pr => {
                    const n = TOUTES_REALISATIONS.filter(x => x.produit === pr.slug).length;
                    return (
                      <li
                        key={pr.slug}
                        className="flex items-baseline justify-between gap-3 border-t py-2.5 first:border-t-0"
                        style={{ borderColor: "rgba(0,0,0,.08)" }}
                      >
                        {pr.page ? (
                          <a
                            href={`/apercu/competence/${pr.page}`}
                            className="text-[1.0625rem] font-semibold underline decoration-2 underline-offset-4 transition hover:opacity-60"
                            style={{ color: BLEU }}
                          >
                            {pr.nom}
                          </a>
                        ) : (
                          <span className="text-[1.0625rem] font-medium opacity-80">{pr.nom}</span>
                        )}
                        {n > 0 ? (
                          <a
                            href={`/apercu/realisations?produit=${pr.slug}`}
                            className="shrink-0 text-[13px] font-semibold transition hover:opacity-60"
                            style={{ color: BLEU }}
                          >
                            exemples →
                          </a>
                        ) : (
                          /* ⚠️ Pas de projet rattaché. On ne masque pas : un
                             intitulé qu'aucune réalisation n'illustre est un
                             intitulé à documenter, ou à retirer. */
                          <span className="shrink-0 text-[13px] opacity-25">—</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ④ L'appel final. */}
      <section style={{ background: SOMBRE, color: "#fff" }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Parlons de votre projet{" "}
          <span style={{ color: BLEU_CLAIR }}>{c.surTitre.toLowerCase()}</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/apercu/contact"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
          <a href="/apercu/v7" className="rounded-md border border-white/30 px-9 py-4 text-[16px] font-semibold">
            Revenir à l’accueil
          </a>
        </div>
      </section>
      <PiedDePage />
    </main>
  );
}
