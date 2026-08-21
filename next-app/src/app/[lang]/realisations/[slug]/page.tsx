/**
 * LA FICHE PUBLIQUE D'UNE RÉALISATION — `/realisations/<slug>/`.
 *
 * ⛔⛔ POURQUOI CE FICHIER EXISTE : LES BOUTONS TOMBAIENT EN 404.
 * Giz : « le bouton "voir la réalisation" tombe sur un 404 […] idem pour les
 * 6 situations ». Les liens étaient JUSTES — c'est la destination qui
 * n'existait pas. Les 145 fiches n'avaient que leur route d'aperçu.
 * 👉 Un lien qui pointe vers une page non construite est indiscernable d'un
 * lien faux : le visiteur voit la même chose. Toute adresse citée dans un
 * texte doit exister avant que le texte soit publié.
 *
 * ⚠️ CE FICHIER EST UNE COPIE ADAPTÉE de la route d'aperçu, et c'est une
 * dette assumée : les deux devront fusionner. Ce qui change ici, ce sont
 * uniquement les ADRESSES — `/apercu/competence/x` devient `/savoir-faire/x/`,
 * `/apercu/realisations/x` devient `/realisations/x/`. Le rendu est le même,
 * volontairement : c'est ce qui a été validé.
 */
import { notFound } from "next/navigation";
import { EnTete } from "../../../../composants/EnTete";
import { PiedDePage } from "../../../../composants/PiedDePage";
import { lireRealisation, lireRealisations, lireVoisines, imageUrl } from "../../../../lib/sanity";
import { alternatesDe } from "../../../../lib/hreflang";
import { COMPETENCES, METIERS } from "../../../../composants/plan-du-site";
import { OFFRES } from "../../../../composants/offres";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../../../composants/palette";

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

/**
 * ⛔ LE hreflang N'EST PAS ÉCRIT ICI, IL EST CALCULÉ. `alternatesDe` interroge
 * Sanity à chaque rendu et ne déclare que les versions RÉELLEMENT PUBLIÉES.
 * Dépublier la fiche anglaise retire donc la déclaration de la fiche
 * française toute seule — c'est la garantie demandée par Giz, et elle ne
 * tient que parce que rien n'est figé dans le code.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await lireRealisation(slug);
  if (!r) return {};
  /* ⛔⛔ LES 146 FICHES SORTAIENT SANS TITRE NI DESCRIPTION. Elles héritaient
     donc du titre par défaut du site — « Bluevista — Agence vidéo,
     événementiel et immersion » — TOUTES LES 146. Google voyait 146 pages au
     titre identique sur le plus gros actif de contenu du site, celui que
     141 redirections visent.
     Aucune erreur, aucune page cassée : juste `generateMetadata` qui ne
     renvoyait que le hreflang.

     ⚠️ AUCUNE FICHE N'A DE `titreSeo` RENSEIGNÉ (vérifié : 0 sur 146). Le
     titre est donc CONSTRUIT — client + titre du projet — en attendant que
     Giz reprenne les réalisations. Un titre construit vaut mieux que 146
     titres identiques ; il ne vaut pas un titre écrit.
     📌 Les champs `titreSeo`/`descriptionSeo` existent dans le schéma mais ne
     sont pas remontés par la requête : inutile de les lire tant qu'ils sont
     vides partout. À rebrancher le jour où Giz les remplit. */
  const nom: string = r.client && !r.titre.toLowerCase().includes(r.client.toLowerCase())
    ? `${r.client} — ${r.titre}`
    : r.titre;
  return {
    /* ⚠️ ON NE REMET PAS « | Bluevista » ICI : le gabarit du layout l'ajoute.
       Première tentative : `${nom} | Bluevista` — et les fiches sont sorties
       en « … | Bluevista | Bluevista ». Le même piège que je venais de
       corriger, refait dans le geste qui le corrigeait. */
    title: nom,
    description: r.intro ? String(r.intro).slice(0, 155) : undefined,
    alternates: await alternatesDe(r._id, "realisation", "fr", r.slug),
  };
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
  const voisines = await lireVoisines(slug, r.produit, r.metier);

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
      {/* ⛔ `publique` : sans lui, l'en-tête et le pied de page d'une fiche
          publique renvoyaient vers /apercu/… — dix-sept liens morts par page,
          sur les 146 fiches. */}
      <EnTete opaque publique />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-16 pt-44">
          <nav className="mb-6 text-[14px] text-white/55">
            <a href="/realisations/" className="hover:text-white">
              Réalisations
            </a>
            {metier && (
              <>
                <span className="mx-2">·</span>
                <a href={`/${metier.slug}/`} className="hover:text-white">
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
                  href={`/${metier?.slug ?? "film"}/`}
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
                  href={`/savoir-faire/${competence.slug}/`}
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

      {/* ── LE SITE DU CLIENT ────────────────────────────────────────────
          Le seul lien sortant naturel du site, et sa valeur n'est pas
          d'abord référentielle : il PROUVE que le client existe. Une
          référence vérifiable en un clic vaut mieux qu'un logo posé sur
          une page. `rel="noopener"` par sécurité, pas de `nofollow` —
          on assume de citer nos clients. */}
      {r.clientUrl && (
        <section className="mx-auto max-w-[900px] px-8 pb-16">
          <a
            href={r.clientUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-md border-2 px-6 py-4 text-[15px] font-semibold transition hover:shadow-md"
            style={{ borderColor: `${BLEU}33`, color: BLEU }}
          >
            Voir le site de {r.client ?? "ce client"} ↗
          </a>
        </section>
      )}

      {/* ── LES PROJETS VOISINS ──────────────────────────────────────────
          ⛔ CORRECTIF DU POINT FAIBLE DU MAILLAGE, mesuré avant d'agir :
          chaque fiche ne recevait QU'UN lien entrant, celui de l'index.
          Quarante pages à un seul lien entrant sont quarante pages que
          Google traite comme marginales. Trois voisins par fiche
          multiplient les chemins — et répondent à ce que le visiteur
          cherche vraiment : « qu'avez-vous fait de comparable ». */}
      {voisines.length > 0 && (
        <section style={{ background: CLAIR_SOUTENU }}>
          <div className="mx-auto max-w-[1500px] px-8 py-20">
            <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
              <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
              Dans le même esprit
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {voisines.map(v => (
                <a
                  key={v.slug}
                  href={`/realisations/${v.slug}/`}
                  className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
                  style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}
                >
                  {v.image ? (
                    <div
                      className="aspect-[16/10] bg-cover bg-center transition duration-700 group-hover:brightness-110"
                      style={{ backgroundImage: `url('${imageUrl(v.image, 600, 375)}')` }}
                      role="img"
                      aria-label={v.titre}
                    />
                  ) : (
                    <div className="aspect-[16/10]" style={{ background: CLAIR_SOUTENU }} />
                  )}
                  <div className="p-5 text-[15px] font-bold leading-snug">{v.titre}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ── L'APPEL FINAL ────────────────────────────────────────────────
          ⛔ SUR FOND CLAIR, ET C'EST UNE CORRECTION. Il était sombre, et le
          pied de page l'est aussi : deux bandes sombres collées se lisaient
          comme DEUX pieds de page. Giz : « étrange ton double footer ».
          Il n'y avait qu'une balise <footer> — le défaut était visuel, pas
          structurel, ce qui le rendait invisible à toute vérification
          automatique.
          Le fond clair rétablit l'alternance et redonne au pied de page son
          rôle : marquer la fin. */}

      <section style={{ background: CLAIR_SOUTENU }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Un projet <span style={{ color: BLEU }}>comparable</span> ?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/contact/"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
          <a
            href="/realisations/"
            className="rounded-md border border-black/20 px-9 py-4 text-[16px] font-semibold"
          >
            Voir les autres réalisations
          </a>
        </div>
      </section>
      <PiedDePage publique />
    </main>
  );
}
