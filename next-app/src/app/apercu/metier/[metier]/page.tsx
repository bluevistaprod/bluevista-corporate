import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { MethodeEnCercle } from "../../_Methode";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";
import { COMPETENCES, type Metier as CleMetier } from "../../_plan-du-site";
import { offresDuMetier } from "../../_offres";
import { REALISATIONS } from "../../_realisations";

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
  const c = CONTENU[metier as Metier];
  if (!c) notFound();

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete />

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

      {/* ④ CE QU'ON PRODUIT — après la méthode, et cette fois EN IMAGES.
             ⛔ Correction de Giz : « on a relégué les produits en bas de page
             mais ils ne sont plus visuels et n'ont plus de lien ». C'était
             juste, et c'était une régression — en descendant la section je
             l'avais réduite à trois colonnes de texte gris.

             Chaque offre reprend donc son image, et CHAQUE PRODUIT EST UN
             LIEN vers les réalisations qui l'illustrent. Ce n'est pas
             cosmétique : ça referme la boucle entre ce qu'on annonce et ce
             qu'on peut montrer. Un produit dont le filtre renvoie zéro projet
             est un produit qu'il faut aller produire — ou retirer d'ici. */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Concrètement
        </div>
        <h2 className={`max-w-3xl ${TYPO.titre}`}>Ce qu’on produit</h2>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Chaque ligne mène aux projets qui l’illustrent.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offresDuMetier(c.cleMetier).map(o => {
            const pages = o.competences
              .map(slug => COMPETENCES.find(x => x.slug === slug))
              .filter((x): x is NonNullable<typeof x> => Boolean(x));
            return (
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

                  <ul className="mt-5 space-y-0.5">
                    {o.produits.map(pr => {
                      const n = REALISATIONS.filter(x => x.produit === pr.slug).length;
                      return (
                        <li key={pr.slug}>
                          <a
                            href={`/apercu/realisations?produit=${pr.slug}`}
                            className="flex items-baseline justify-between gap-3 rounded-sm py-1.5 transition hover:bg-black/[.04]"
                          >
                            <span className="text-[1.0625rem] font-medium">{pr.nom}</span>
                            {/* Le compteur n'est pas décoratif : un zéro se
                                voit, et c'est le but. */}
                            <span
                              className="shrink-0 text-[13px] tabular-nums"
                              style={{ color: n > 0 ? BLEU : "rgba(0,0,0,.25)" }}
                            >
                              {n > 0 ? `${n} projet${n > 1 ? "s" : ""}` : "—"}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  {pages.length > 0 && (
                    <div className="mt-6 border-t pt-5" style={{ borderColor: "rgba(0,0,0,.1)" }}>
                      <div className="text-[12px] font-bold uppercase tracking-[0.14em] opacity-40">
                        La page savoir-faire
                      </div>
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {pages.map(pg => (
                          <a
                            key={pg.slug}
                            href={`/apercu/competence/${pg.slug}`}
                            className="text-[15px] font-semibold underline decoration-2 underline-offset-4 transition hover:opacity-70"
                            style={{ color: BLEU }}
                          >
                            {pg.nom} →
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
            href="#"
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
    </main>
  );
}
