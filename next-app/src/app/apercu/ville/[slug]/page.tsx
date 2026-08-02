import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { PiedDePage } from "../../_PiedDePage";
import { COMPETENCES, VILLES } from "../../_plan-du-site";
import { lirePage, lirePages, enParagraphes, imageUrl } from "../../../../lib/sanity";
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

export async function generateStaticParams() {
  const pages = await lirePages("ville");
  return pages.map(p => ({ slug: p.slug }));
}

export default async function PageVille({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await lirePage("ville", slug);
  if (!page) return notFound();

  /* Le rattachement à un savoir-faire reste dans le code : c'est de
     l'architecture, pas du contenu. */
  const arch = VILLES.find(x => x.slug === slug);
  const c = COMPETENCES.find(x => x.slug === arch?.competence);
  const v = {
    ville: page.surTitre ?? arch?.ville ?? "",
    titre: page.titre,
    clics: arch?.clics ?? 0,
    texte: enParagraphes(page.texte),
    specificites: (page.sections ?? []).map(s => ({
      titre: s.titre,
      texte: enParagraphes(s.paragraphes).join(" "),
    })),
    projets: page.projets ?? [],
  };

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section className="relative flex min-h-[58vh] flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${page.image ? imageUrl(page.image, 1800, 1000) : (c?.image ?? "/media/px-pilier-communication.jpg")}')` }}
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

      {/* ── Le texte de l'ancienne page ─────────────────────────────────
          Repris tel quel : c'est lui qui fait remonter la page.

          ⛔ MAIS CES PAGES-LÀ ONT UN PROBLÈME QUE LES AUTRES N'ONT PAS, et
          il se voit à la lecture : elles ont été fabriquées par duplication.
          La page GENÈVE demande « envie de travailler avec une boîte de prod
          lyonnaise ? ». Les pages Lyon et Paris partagent des paragraphes au
          caractère près.

          C'est exactement le contenu quasi dupliqué qui empêche un groupe de
          pages de monter — et très probablement pourquoi Paris plafonne à 54
          clics pour 17 984 impressions : Google la montre, puis ne la juge
          pas assez distincte pour la classer haut. */}
      <section className="mx-auto max-w-[820px] px-8 py-20">
        {v.texte.length > 0 && (
          <div className="space-y-6">
            {v.texte.map((par, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.75] opacity-80">
                {par}
              </p>
            ))}
          </div>
        )}

        {/* ── CE QUI N'EXISTE QUE SUR CETTE PAGE ────────────────────────
            La seule parade au contenu dupliqué. Le texte repris est commun
            aux quatre villes par construction ; ces blocs-là ne le sont pas,
            et c'est eux qui donneront à Google une raison de classer chaque
            page séparément. */}
        {v.specificites.length > 0 && (
          <div className="mt-16 space-y-10">
            {v.specificites.map((sp, i) => (
              <div key={sp.titre} className="border-t-2 pt-6" style={{ borderColor: BLEU }}>
                <div className="mb-3 text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                  0{i + 1}
                </div>
                <h2 className={TYPO.sousTitre}>{sp.titre}</h2>
                <p className="mt-3 text-[1.0625rem] leading-[1.75] opacity-80">{sp.texte}</p>
              </div>
            ))}
          </div>
        )}

        {/* Les projets locaux nommés — sourcés dans le cerveau. C'est la
            preuve que l'implantation n'est pas qu'une ligne d'adresse. */}
        {v.projets.length > 0 && (
          <div className="mt-14">
            <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
              Quelques projets à {v.ville}
            </div>
            <ul className="mt-5 space-y-3">
              {v.projets.map(pr => (
                <li
                  key={pr}
                  className="border-t pt-3 text-[1.0625rem] leading-snug"
                  style={{ borderColor: "rgba(0,0,0,.1)" }}
                >
                  {pr}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="mt-12 rounded-md border-2 border-dashed px-8 py-8"
          style={{ borderColor: "#E0A400", background: "rgba(224,164,0,.07)" }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: "#9A7200" }}>
            À dédupliquer — {v.clics} clics sur 12 mois
          </div>
          <p className="mt-4 text-[1.0625rem] leading-relaxed opacity-75">
            Le texte du haut vient de l’ancienne page et reste <strong>en
            partie commun aux autres villes</strong>. Les blocs numérotés
            ci-dessus, eux, sont propres à {v.ville} — c’est ce qui donne à
            Google une raison de classer cette page séparément.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed opacity-60">
            Reste à faire&nbsp;: relire le texte repris pour en retirer ce qui
            parle d’une autre ville — la page Genève demandait « envie de
            travailler avec une boîte de prod lyonnaise&nbsp;? » — et compléter
            la liste des projets locaux. Les projets cités sont sourcés, mais
            ils ne sont pas les seuls.
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
      <PiedDePage />
    </main>
  );
}
