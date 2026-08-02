import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { MethodeEnCercle } from "../../_Methode";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";
import { competencesDuMetier, type Metier as CleMetier } from "../../_plan-du-site";

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

      {/* ② Le problème, puis les COMPÉTENCES du pôle.
             ⛔ Ce n'était qu'une liste de mots il y a une heure. Ce sont
             maintenant de vrais liens vers les pages de compétence, et c'est
             tout l'enjeu : ces pages-là portent le référencement du site
             (voir _plan-du-site.ts). Une page métier qui ne pointe pas vers
             elles est une impasse pour le visiteur comme pour Google. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <p className={`mb-16 max-w-2xl ${TYPO.chapo}`}>{c.chapo}</p>

        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Nos savoir-faire
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {competencesDuMetier(c.cleMetier).map(s => (
            <a
              key={s.slug}
              href={`/apercu/competence/${s.slug}`}
              className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
              style={{ borderColor: `${BLEU}2A`, background: "#fff" }}
            >
              <div
                className="aspect-[16/9] bg-cover bg-center transition duration-700 group-hover:brightness-110"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div className="p-7">
                <div className={TYPO.sousTitre}>{s.nom}</div>
                <p className="mt-3 text-[15px] leading-relaxed opacity-60">{s.accroche}</p>
                <div className="mt-5 text-[15px] font-bold" style={{ color: BLEU }}>
                  Voir la page →
                </div>
              </div>
            </a>
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
