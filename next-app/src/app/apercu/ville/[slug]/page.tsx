import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { COMPETENCES, VILLES } from "../../_plan-du-site";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";

/**
 * LES PAGES DE VILLE — les plus rentables du site, et les plus fragiles.
 *
 * 229 clics à elles quatre, dont 159 pour la seule page Lyon : c'est plus que
 * toutes les pages de compétence réunies hors mapping et streaming. Elles
 * répondent à une intention très précise — « studio animation 3D lyon » — et
 * leur valeur tient à leur adresse et à leur titre, pas à leur design.
 *
 * ⛔⛔ LE PIÈGE À NE PAS TOMBER DEDANS, et il est classique.
 * La tentation est de générer ces pages en dupliquant le texte de la
 * compétence et en remplaçant « Lyon » par « Paris ». Google appelle ça du
 * contenu quasi dupliqué, et la sanction ne tombe pas seulement sur la copie :
 * elle déclasse l'ensemble du groupe. On perdrait les 159 clics de Lyon pour
 * avoir voulu en gagner quelques-uns à Paris.
 *
 * Chaque page de ville doit donc porter du contenu QUI N'EXISTE NULLE PART
 * AILLEURS : des projets réalisés dans cette ville, des lieux nommés, la
 * façon dont on y travaille concrètement.
 *
 * ⚠️ Ce gabarit prépare la place. Le contenu local, lui, ne peut venir que de
 * Bluevista — et c'est le seul endroit du site où je ne peux rien inventer
 * sans risquer d'écrire une contre-vérité géographique.
 */

export function generateStaticParams() {
  return VILLES.map(v => ({ slug: v.slug }));
}

export default async function PageVille({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = VILLES.find(x => x.slug === slug);
  if (!v) notFound();

  const c = COMPETENCES.find(x => x.slug === v.competence);

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete />

      <section className="relative flex min-h-[58vh] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${c?.image ?? "/media/px-pilier-communication.jpg"}')` }}
          role="img"
          aria-label={v.titre}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${NOIR}F2 8%, ${NOIR}95 50%, ${NOIR}45 100%)` }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pb-16 pt-40 text-white">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            {v.ville}
          </div>
          <h1 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            {v.titre}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-white/80">
            Depuis 2004, à {v.ville}.
          </p>
        </div>
      </section>

      {/* ── L'avertissement de contenu ────────────────────────────────────
          Affiché dans la maquette, et pas seulement écrit en commentaire :
          c'est la page où une erreur coûte le plus cher. */}
      <section className="mx-auto max-w-[900px] px-8 py-20">
        <div
          className="rounded-md border-2 border-dashed px-8 py-10"
          style={{ borderColor: "#E0A400", background: "rgba(224,164,0,.07)" }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: "#9A7200" }}>
            Contenu local à écrire — {v.clics} clics sur 12 mois
          </div>
          <p className="mt-4 text-[1.0625rem] leading-relaxed opacity-75">
            Cette page ne doit <strong>pas</strong> reprendre le texte de la page{" "}
            {c ? c.nom.toLowerCase() : "compétence"} en changeant le nom de la
            ville. Google traite ça comme du contenu quasi dupliqué, et la
            sanction frappe le groupe entier — on perdrait les {v.clics} clics
            de cette page pour en gagner quelques-uns ailleurs.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed opacity-60">
            Il faut ici ce qui n’existe nulle part ailleurs sur le site&nbsp;:
            des projets réellement tournés à {v.ville} et nommés, les lieux où
            vous travaillez, la façon dont vous intervenez concrètement dans
            cette ville. C’est le seul contenu du site que je ne peux pas
            écrire à votre place sans risquer d’inventer une contre-vérité.
          </p>
        </div>
      </section>

      {/* ── Le renvoi vers la compétence ─────────────────────────────── */}
      {c && (
        <section style={{ background: CLAIR_SOUTENU }}>
          <div className="mx-auto max-w-[1500px] px-8 py-20">
            <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
              <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
              Le savoir-faire
            </div>
            <h2 className={`max-w-3xl ${TYPO.titre}`}>{c.nom}</h2>
            <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>{c.accroche}</p>
            <a
              href={`/apercu/competence/${c.slug}`}
              className="mt-9 inline-block rounded-md px-7 py-4 text-[15px] font-bold text-white transition hover:brightness-110"
              style={{ background: BLEU }}
            >
              Voir la page {c.nom.toLowerCase()}
            </a>
          </div>
        </section>
      )}

      <section style={{ background: SOMBRE, color: "#fff" }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Un projet à <span style={{ color: BLEU_CLAIR }}>{v.ville}</span> ?
        </h2>
        <div className="mt-10 px-8">
          <a
            href="/apercu/contact"
            className="inline-block rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
        </div>
      </section>
    </main>
  );
}
