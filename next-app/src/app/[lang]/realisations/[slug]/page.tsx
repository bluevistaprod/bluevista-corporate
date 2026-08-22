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
import { liens } from "../../../../shared/liens";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../../../composants/palette";
import { LecteurVideo } from "../../../../composants/LecteurVideo";
import { TexteRiche } from "../../../../composants/TexteRiche";

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
     ⭐ REBRANCHÉS le 21/08/2026 : le showreel 2026 est la première réalisation
     à porter un `titreSeo`. Le titre construit n'est plus qu'un REPLI — il
     s'efface dès qu'un titre est écrit. */
  const nom: string = r.client && !r.titre.toLowerCase().includes(r.client.toLowerCase())
    ? `${r.client} — ${r.titre}`
    : r.titre;
  return {
    /* ⚠️ ON NE REMET PAS « | Bluevista » ICI : le gabarit du layout l'ajoute.
       Première tentative : `${nom} | Bluevista` — et les fiches sont sorties
       en « … | Bluevista | Bluevista ». Le même piège que je venais de
       corriger, refait dans le geste qui le corrigeait. */
    /* ⛔ `absolute` quand le titre est écrit : `titreSeo` porte déjà
       « | Bluevista », et le gabarit du layout l'ajoute une seconde fois.
       C'est exactement le piège décrit juste au-dessus — d'où la garde, qui
       ne met `absolute` que si le suffixe est effectivement là. */
    title: r.titreSeo
      ? (/\|\s*Bluevista\s*$/i.test(r.titreSeo) ? { absolute: r.titreSeo } : r.titreSeo)
      : nom,
    description: r.descriptionSeo ?? (r.intro ? String(r.intro).slice(0, 155) : undefined),
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

  /* ⛔⛔ LES ADRESSES VIENNENT DE LA TABLE, PLUS DE LA MAIN. Deux liens de
     cette page étaient fabriqués en `/${metier.slug}/` — soit `/film/`, qui
     n'existe pas : la vraie adresse est `/offres/film/`. Le fil d'Ariane ET
     la carte d'offre pointaient donc dans le vide, sur les 147 fiches.
     👉 Réponse à la question de Giz — « comment ne pas avoir le souci ? » :
     ne jamais écrire une adresse à la main. `liens.ts` existe pour ça, et il
     documente précisément que « metier » devient « offres » dans l'URL. Une
     adresse écrite à la main est une supposition ; la table est la source.
     ⚠️ Et pour une page qui n'existerait pas ENCORE : on n'affiche pas le
     lien. Un lien mort coûte plus qu'un lien absent — au visiteur comme à
     Google. */
  const L = liens(true);
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

      {/* ── LA BANNIÈRE ────────────────────────────────────────────────
          ⭐ AVEC L'IMAGE DU PROJET, depuis le 22/08. Elle était un aplat noir
          alors que l'image existait dans Sanity — elle ne servait que d'affiche
          au faux lecteur. Sur un site d'agence d'image, ouvrir une fiche de
          projet sur un rectangle noir est le pire endroit possible.
          ⚠️ Le voile est lourd à gauche pour que le texte blanc tienne, et
          s'éclaircit à droite pour qu'on voie de quoi il s'agit. */}
      <section className="relative overflow-hidden" style={{ background: NOIR, color: "#fff" }}>
        {r.image ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${imageUrl(r.image, 2000, 1100)}')` }}
              role="img"
              aria-label={r.titre}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(100deg, rgba(4,7,10,.93) 0%, rgba(4,7,10,.72) 44%, rgba(4,7,10,.3) 100%)" }}
            />
          </>
        ) : null}
        <div className="relative z-10 mx-auto max-w-[1500px] px-8 pb-16 pt-44">
          <nav className="mb-6 text-[14px] text-white/60">
            <a href="/realisations/" className="hover:text-white">Réalisations</a>
            {metier && (
              <>
                <span className="mx-2">·</span>
                <a href={L.metier(metier.slug)} className="hover:text-white">{metier.nom}</a>
              </>
            )}
          </nav>
          <h1 className="max-w-[24ch] text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            {r.titre}
          </h1>
          {/* ⚠️ LE CLIENT NE SE RÉPÈTE PAS. « LPA : 50ans vidéo anniversaire »
              porte déjà le nom — l'écrire une ligne plus bas fait bégayer le
              titre. On ne l'ajoute que s'il manque, ce qui arrive sur les
              fiches dont le titre ne nomme que le projet. */}
          {r.client && !r.titre.toLowerCase().includes(r.client.toLowerCase()) && (
            <p className="mt-5 text-[1.05rem] text-white/70">{r.client}</p>
          )}
        </div>
      </section>

      {/* ── LE CHAPÔ, PUIS LE FILM ─────────────────────────────────────
          ⛔ L'ACCROCHE ÉTAIT COMPOSÉE COMME UN TITRE — clamp jusqu'à 2,25 rem
          en gras, sur 24 caractères de large. Sur LPA elle tombait en quatre
          lignes courtes et se lisait comme un second titre concurrent du H1.
          Elle redevient ce qu'elle est : un chapô.
          ⭐ Elle reste AVANT le film, et c'est délibéré : elle dit ce qu'il
          faut y chercher. Sans elle, on lance une vidéo sans savoir ce qu'on
          regarde, et on l'arrête au bout de vingt secondes. */}
      <section className="mx-auto max-w-[1200px] px-8 pt-16">
        {r.intro && (
          <p className="mb-10 max-w-[62ch] text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.6] opacity-75">
            {r.intro}
          </p>
        )}

        {/* ⛔⛔ IL N'Y AVAIT AUCUN LECTEUR — un faux bouton play posé sur
            l'image, et l'adresse de la vidéo écrite en petit dans un coin.
            Le commentaire disait « les vidéos sont sur Vimeo, à migrer vers
            Livid » : c'était vrai en juillet, ce ne l'est plus. Mesuré le
            22/08 — 142 réalisations sur 147 sont sur LIVID, ZÉRO sur Vimeo.
            👉 Un garde-fou écrit dans un commentaire ne se périme pas tout
            seul : il faut le vérifier, sinon il finit par interdire ce qu'il
            protégeait. 147 pages ont eu un lecteur décoratif pour ça. */}
        {r.video ? (
          <LecteurVideo
            video={{
              url: String(r.video),
              titre: r.titre,
              vignetteUrl: r.image ? imageUrl(r.image, 1200, 675) ?? undefined : undefined,
            }}
            sansLegende
          />
        ) : null}
      </section>

      {/* ── LE TEXTE DU PROJET, ET LA FICHE DE FAITS ───────────────────
          ⛔⛔ CE TEXTE N'ÉTAIT AFFICHÉ NULLE PART. Le champ `detail` porte la
          description reprise de l'ancien site sur 146 réalisations sur 147 —
          et le gabarit ne le lisait pas. Il attendait quatre champs de cas
          client (contexte / enjeu / ce qu'on a fait / résultat) remplis sur
          ZÉRO fiche, et affichait à la place quatre paragraphes d'aide en
          gris. Le fond du projet était donc invisible partout.
          ⭐ Décision de Giz le 22/08 : on abandonne les quatre champs au
          profit d'un TEXTE LIBRE en rich text, formaté quand ça s'y prête. */}
      {(r.detail || r.clientUrl) && (
        <section className="mx-auto max-w-[1200px] px-8 pb-4 pt-16">
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_minmax(0,280px)]">
            <div>
              {r.detail ? (
                <TexteRiche blocs={r.detail} publique className="max-w-[68ch] text-[1.0625rem] leading-[1.75] opacity-[.82]" />
              ) : null}
            </div>

            {/* ── LES FAITS ─────────────────────────────────────────────
                ⚠️ Une colonne de faits, pas une carte d'identité : on n'y met
                que ce qui est renseigné. Un intitulé suivi d'un tiret sur 147
                pages se remarque plus qu'une ligne absente. */}
            <aside className="rounded-md border p-7" style={{ borderColor: "rgba(0,0,0,.12)", background: "#fff" }}>
              <div className={`mb-5 ${TYPO.surTitre}`} style={{ color: BLEU }}>Le projet</div>
              <dl className="grid gap-4 text-[15px]">
                {r.client && (
                  <div>
                    <dt className="opacity-45">Client</dt>
                    <dd className="mt-0.5 font-semibold">{r.client}</dd>
                  </div>
                )}
                {/* ⛔ LE LIEN ÉTAIT SUR LA MAUVAISE LIGNE, et Giz l'a vu : « je ne
                    vois pas de lien sur métier mais un sur offre qui lui envoie sur
                    la page métier ». Exact — j'avais inversé les deux.
                    La taxonomie a TROIS niveaux et un seul n'a pas de page :
                      · MÉTIER            → /offres/film/            ✅ existe
                      · OFFRE             → aucune page
                      · SAVOIR-FAIRE      → /savoir-faire/<slug>/    ✅ existe
                    Une offre est un regroupement interne au catalogue, pas une
                    destination. Elle reste donc du texte. */}
                {metier && (
                  <div>
                    <dt className="opacity-45">Métier</dt>
                    <dd className="mt-0.5 font-semibold">
                      <a href={L.metier(metier.slug)} className="no-underline" style={{ color: BLEU }}>
                        {metier.nom}
                      </a>
                    </dd>
                  </div>
                )}
                {offre && (
                  <div>
                    <dt className="opacity-45">Offre</dt>
                    <dd className="mt-0.5 font-semibold">{offre.nom}</dd>
                  </div>
                )}
                {competence && (
                  <div>
                    <dt className="opacity-45">Savoir-faire</dt>
                    <dd className="mt-0.5 font-semibold">
                      <a href={L.competence(competence.slug)} className="no-underline" style={{ color: BLEU }}>
                        {competence.nom}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              {r.clientUrl && (
                <a
                  href={r.clientUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-7 block rounded-md px-5 py-3 text-center text-[15px] font-bold text-white no-underline transition hover:brightness-110"
                  style={{ background: BLEU }}
                >
                  Voir le site de {r.client} ↗
                </a>
              )}
            </aside>
          </div>
        </section>
      )}


      {/* ⛔ LA SECTION « CE PROJET RELÈVE DE » A ÉTÉ RETIRÉE le 22/08.
          Giz, capture à l'appui : « ce bloc est en désordre total ». Il
          l'était : une carte seule flottant à gauche d'une bande de 300 px de
          haut, et elle répétait mot pour mot l'offre déjà présente dans la
          colonne de faits, trois écrans plus haut.
          ⭐ CE QU'ELLE PORTAIT DE VRAI — le maillage vers les pages offre et
          savoir-faire — n'est pas perdu : les deux entrées de la colonne de
          faits sont désormais des LIENS. L'offre n'y était que du texte.
          👉 Supprimer un bloc ne doit jamais supprimer sa raison d'être : on
          déplace d'abord, on retire ensuite. */}

      {/* ⛔ LA SECTION « LE SITE DU CLIENT » A ÉTÉ RETIRÉE le 22/08. Le lien
          vers le site du client vit désormais dans la colonne de faits, au
          niveau du texte : le laisser AUSSI en bas produisait un second
          bouton « Voir le site de LPA » flottant seul dans une bande vide.
          📌 Ce que le commentaire d'origine disait reste vrai et vaut d'être
          gardé : ce lien PROUVE que le client existe, une référence
          vérifiable en un clic vaut mieux qu'un logo posé sur une page. */}

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
