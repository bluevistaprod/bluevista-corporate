import { notFound } from "next/navigation";
import { EnTete } from "../../_EnTete";
import { PiedDePage } from "../../_PiedDePage";
import { COMPETENCES, METIERS, competencesDuMetier } from "../../_plan-du-site";
import { lirePage, lirePages, lireRealisationsDuProduit, enParagraphes, imageUrl } from "../../../../lib/sanity";
import { OFFRES } from "../../_offres";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../../_palette";
import { alternatesDe } from "../../../../lib/hreflang";
import { LecteurVideo, BaliseVideo } from "../../_LecteurVideo";
import { TexteRiche } from "../../_TexteRiche";
import { Blocs } from "../../_Blocs";

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

/**
 * ⛔ LES ADRESSES VIENNENT DE SANITY. Créer une page de savoir-faire dans le
 * studio crée sa route — sans que je touche au code.
 *
 * 📌 `_plan-du-site.ts` sert encore, mais pour une seule chose : le
 * RATTACHEMENT d'un savoir-faire à son métier, et le maillage entre pages
 * voisines. Ce n'est pas du contenu, c'est de l'architecture — et
 * l'architecture reste dans le code.
 */
export async function generateStaticParams() {
  const pages = await lirePages("savoir-faire");
  return pages.map(p => ({ slug: p.slug }));
}

/**
 * ⛔ LE hreflang N'EST PAS ÉCRIT ICI, IL EST CALCULÉ. `alternatesDe` interroge
 * Sanity à chaque rendu et ne déclare que les versions RÉELLEMENT PUBLIÉES.
 * Dépublier la version anglaise retire donc la déclaration de la version
 * française toute seule — c'est la garantie demandée par Giz, et elle ne
 * tient que parce que rien n'est figé dans le code.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await lirePage("savoir-faire", slug);
  if (!page) return {};
  /* ⛔ Le titre vient de Sanity, pas du gabarit : c'est là qu'il porte le mot
     réellement recherché. Le repli sur `titre` évite qu'une page sans balise
     sorte sans titre du tout — mais il ne remplace pas le travail. */
  return {
    title: page.titreSeo ?? `${page.titre} | Bluevista`,
    description: page.descriptionSeo,
    alternates: await alternatesDe(page._id, "savoir-faire", "fr"),
  };
}

export default async function PageCompetence({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await lirePage("savoir-faire", slug);
  if (!page) return notFound();

  /* L'architecture reste dans le code : c'est elle qui dit à quel métier ce
     savoir-faire se rattache, et donc quel fil d'Ariane afficher. */
  const arch = COMPETENCES.find(x => x.slug === slug);
  const metier = METIERS.find(m => m.cle === arch?.metier) ?? METIERS[0];
  const c = {
    nom: page.titre,
    accroche: page.accroche ?? "",
    probleme: arch?.probleme ?? "",
    ce_qu_on_fait: arch?.ce_qu_on_fait ?? [],
    image: page.image ? imageUrl(page.image, 1800, 1000)! : (arch?.image ?? ""),
    clics: arch?.clics ?? 0,
    texte: enParagraphes(page.texte),
    sections: (page.sections ?? []).map(s => ({
      titre: s.titre,
      /* ⛔ On garde les BLOCS, pas seulement le texte aplati : c'est eux qui
         portent les liens vers les projets cités. Aplatir ici les perdait. */
      blocs: s.paragraphes,
      image: s.image ? imageUrl(s.image, 1200, 750) : undefined,
      galerie: (s.galerie ?? []).map(g => imageUrl(g, 700, 440)).filter(Boolean) as string[],
    })),
    faq: page.faq ?? [],
  };
  /* Le maillage interne : les compétences voisines du même métier. C'est ce
     qui fait qu'une page qui se positionne tire les autres avec elle. */
  const voisines = arch ? competencesDuMetier(arch.metier).filter(x => x.slug !== slug) : [];

  /* Les produits que cette page de savoir-faire porte — c'est par eux
     qu'on retrouve les réalisations correspondantes. */
  /* ⭐ LA RÉPARTITION DES VIDÉOS. Une par section, dans l'ordre ; ce qui
     dépasse va dans un bloc en fin de page. Une page à quatre sections et six
     vidéos en place donc quatre dans le texte et deux ensemble — au lieu des
     six empilées, qui donnaient l'impression d'un gabarit rempli à la fin. */
  /* ⛔ LES VIDÉOS VONT DANS LES SECTIONS QUI N'ONT PAS D'IMAGE, et seulement
     celles-là. Une première version les distribuait sur les sections dans
     l'ordre : dès que les images de l'ancien site ont été reposées, chaque
     section illustrée AVALAIT sa vidéo — le média était choisi par le gabarit,
     l'image gagnait, et la vidéo disparaissait sans laisser de trace. Poser
     deux médias au même endroit, c'est en perdre un. */
  const sansImage = (page.sections ?? [])
    .map((s, i) => (s.image || s.pleineLargeur ? -1 : i))
    .filter(i => i >= 0);
  const videoParSection = new Map<number, NonNullable<typeof page.videos>[number]>();
  (page.videos ?? []).forEach((v, k) => {
    if (k < sansImage.length) videoParSection.set(sansImage[k], v);
  });
  const videosRestantes = (page.videos ?? []).slice(sansImage.length);

  const produits = OFFRES.flatMap(o => o.produits).filter(pr => pr.page === slug).map(pr => pr.slug);
  const candidats = produits.length ? await lireRealisationsDuProduit(produits) : [];

  /**
   * ⭐ LES SIX PROJETS SE CHOISISSENT, ILS NE SE SUBISSENT PLUS.
   * Trois critères, dans cet ordre :
   *   ① une VIDÉO — c'est une agence audiovisuelle ; une fiche sans film
   *     n'est pas une preuve, c'est une intention. Giz : « souvent il manque
   *     des vidéos, on a que des photos » ;
   *   ② une IMAGE — sans elle la carte sort en aplat gris ;
   *   ③ un CLIENT DIFFÉRENT à chaque fois, tant que c'est possible. Six
   *     cartes du même client donnent l'impression d'un seul dossier, pas
   *     d'un portefeuille.
   * ⚠️ On complète ensuite avec le reste plutôt que de rendre une grille
   * incomplète : mieux vaut deux fiches d'un même client que quatre cases.
   */
  const note = (r: (typeof candidats)[number]) => (r.video ? 2 : 0) + (r.image ? 1 : 0);
  /* ⛔ « ARAVI » ET « ARAVI RACING » SONT LE MÊME CLIENT, et la première
     version les a laissés passer tous les deux : elle comparait les noms à
     l'identique. Le portefeuille contient plusieurs variantes du même nom —
     avec ou sans raison sociale, avec ou sans mention d'activité. On considère
     donc deux noms comme un seul quand l'un commence par l'autre, à partir de
     quatre caractères — assez pour rapprocher aravi/araviracing sans
     confondre GF et GFMS. */
  const cle = (r: (typeof candidats)[number]) =>
    (r.client ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const memeClient = (a: string, b: string) =>
    a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a));

  const vus: string[] = [];
  const retenus: typeof candidats = [];
  for (const r of [...candidats].sort((a, b) => note(b) - note(a))) {
    const c = cle(r);
    if (c && vus.some(v => memeClient(v, c))) continue;
    if (c) vus.push(c);
    retenus.push(r);
    if (retenus.length === 6) break;
  }
  if (retenus.length < 6) {
    for (const r of [...candidats].sort((a, b) => note(b) - note(a))) {
      if (retenus.includes(r)) continue;
      retenus.push(r);
      if (retenus.length === 6) break;
    }
  }
  const projets = retenus;

  /* ⭐ LA GRILLE DE PROJETS EST PASSÉE AU BLOC QUI LA DEMANDE. Elle était
     clouée en fin de page ; désormais Giz la place où il veut dans l'ordre des
     blocs, sans que le choix des réalisations lui échappe — elles restent
     sélectionnées par leur produit. */
  const grilleProjets = projets.length > 0 ? (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projets.map(pr => (
        <a key={pr.slug} href={`/apercu/realisations/${pr.slug}`}
           className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
           style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}>
          {pr.image ? (
            <div className="aspect-[16/10] bg-cover bg-center transition duration-700 group-hover:brightness-110"
                 style={{ backgroundImage: `url('${imageUrl(pr.image, 600, 375)}')` }}
                 role="img" aria-label={pr.titre} />
          ) : (
            <div className="aspect-[16/10]" style={{ background: CLAIR_SOUTENU }} />
          )}
          <div className="p-5 text-[15px] font-bold leading-snug" style={{ color: SOMBRE }}>{pr.titre}</div>
        </a>
      ))}
    </div>
  ) : null;

  /* ⛔ LES DEUX MODÈLES COEXISTENT LE TEMPS DE LA REPRISE. Une page qui porte
     des blocs les affiche ; celles qui n'en ont pas encore gardent leurs
     sections. Basculer tout le monde d'un coup viderait les huit pages pas
     encore reprises. */
  const enBlocs = (page.blocs?.length ?? 0) > 0;
  /* L'image d'ouverture est portée par le bloc d'entrée dans le studio —
     c'est là que l'éditeur la range — mais elle s'affiche à côté du texte
     d'introduction, qui est la première zone de la page. */
  const imageIntro = (page.blocs ?? []).find(b => b._type === "blocEntree")?.image;

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

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

      {enBlocs ? (
        <>
          {/* ⛔ LE TEXTE D'INTRODUCTION N'EST PAS UN BLOC, ET IL A FAILLI
              DISPARAÎTRE. En basculant les pages sur les blocs, le champ
              `texte` — trois paragraphes par page — n'était plus affiché nulle
              part : les pages perdaient 80 à 120 mots chacune, sous le
              plancher d'une page de savoir-faire, sans que rien ne le signale.
              👉 Il reste rendu ici, entre le hero et les blocs. C'est lui qui
              porte le vocabulaire commercial de la page. */}
          {/* ⭐ L'IMAGE VIENT ICI, PAS DANS LE BLOC D'ENTRÉE — corrigé le
              18/08 au deuxième essai. Giz : « NON tu as placé l'image à côté
              au mauvais endroit, je la voulais à côté de ce texte : Projeté
              sur un bâtiment, un vidéo mapping consiste… ».
              👉 Je l'avais posée dans le bloc d'entrée parce que c'est LUI
              qu'il avait appelé « vide » la fois d'avant. Mais le vide qu'on
              voit en haut d'une page ne se situe pas là où on a nommé le
              bloc : c'est la BANDE D'INTRODUCTION, juste sous l'image de
              couverture, qui sortait en texte nu sur toute la largeur.
              ⚠️ Le texte reste à sa largeur de lecture — il ne s'élargit pas
              parce qu'une image est arrivée à côté. */}
          {c.texte.length > 0 && (
            <section className="pb-4 pt-16" style={{ background: CLAIR_SOUTENU }}>
              <div className="mx-auto max-w-[1500px] px-8">
                <div className={imageIntro ? "grid items-center gap-14 lg:grid-cols-[1fr_1fr]" : "mx-auto max-w-[820px]"}>
                  <TexteRiche blocs={page.texte} className="max-w-[62ch] text-[1.0625rem] leading-[1.75] opacity-82" />
                  {imageIntro ? (
                    <img
                      src={imageUrl(imageIntro, 1400) ?? ""}
                      alt=""
                      className="block w-full rounded-md"
                      style={{ aspectRatio: "4/3", objectFit: "cover", background: "#EBE8E1" }}
                    />
                  ) : null}
                </div>
              </div>
            </section>
          )}
          <Blocs blocs={page.blocs!} projets={grilleProjets} />
        </>
      ) : (
        <>
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

        {/* ── Le texte de fond ──────────────────────────────────────────
            Repris de l'ancien site : c'est lui qui fait remonter la page
            depuis des années. Le réécrire pour le plaisir jetterait un actif. */}
        {c.texte.length > 0 && (
          <section style={{ background: CLAIR_SOUTENU }}>
            <div className="mx-auto max-w-[820px] px-8 py-20">
              <div className="space-y-6">
                {c.texte.map((par, i) => (
                  <p key={i} className="text-[1.0625rem] leading-[1.75] opacity-80">
                    {par}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── LES SECTIONS DE FOND ────────────────────────────────────────
            Ajoutées là où le texte repris ne suffisait pas — sous 200 mots,
            une page ne se défend pas : Google la montre mais ne la classe
            pas haut.

            La forme n'est pas décorative : un titre par question qu'un client
            se pose vraiment, des blocs courts, une image tous les deux ou
            trois blocs. Un mur de texte de 1 200 mots n'est lu par personne,
            et Google mesure aussi le temps passé. */}
        {c.sections.length > 0 && (
          <section className="mx-auto max-w-[1500px] px-8 py-24">
            <div className="space-y-24">
              {c.sections.map((sec, i) => {
                /* ⭐ UNE VIDÉO PAR SECTION, DANS L'ORDRE — corrigé le 12/08/2026.
                   Elles étaient toutes empilées en bas de page, juste avant la
                   grille des réalisations : deux grilles d'images à la suite, et
                   quatre sections de texte nu au-dessus. Verdict de Giz sur
                   l'ancienne page comparée à la nouvelle : « elle faisait
                   article réel, pas gabarit sans âme » et « les vidéos en bas et
                   pas réparties font gabarit ».
                   👉 La colonne média de la section accueille l'image quand il y
                   en a une, la vidéo sinon. Le texte et le média alternent de
                   gauche à droite d'une section à l'autre — c'est ce que faisait
                   l'ancien site, et c'est ce qui donne le rythme. */
                const media = sec.image ? "image" : videoParSection.get(i) ? "video" : null;
                return (
                  <article
                    key={sec.titre}
                    className={`grid gap-12 lg:gap-16 ${
                      media ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""
                    }`}
                  >
                    <div className={media && i % 2 ? "lg:order-last" : ""}>
                      <div className="text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                        0{i + 1}
                      </div>
                      <h2 className={`mt-3 max-w-[22ch] ${TYPO.titre}`}>{sec.titre}</h2>
                    </div>
                    <div className={media ? "" : "max-w-[820px]"}>
                      {media === "image" && (
                        <>
                          <div
                            className="mb-4 aspect-[16/10] rounded-md bg-cover bg-center"
                            style={{ backgroundImage: `url('${sec.image}')` }}
                            role="img"
                            aria-label={sec.titre}
                          />
                          {/* ⭐ Les autres vues du MÊME projet. Le showroom GF en
                              a cinq : n'en montrer qu'une revient à jeter les
                              quatre autres. */}
                          {sec.galerie.length > 0 && (
                            <div className="mb-8 grid grid-cols-3 gap-3">
                              {sec.galerie.map((g, k) => (
                                <div
                                  key={k}
                                  className="aspect-[16/10] rounded bg-cover bg-center"
                                  style={{ backgroundImage: `url('${g}')` }}
                                  role="img"
                                  aria-label={`${sec.titre} — vue ${k + 2}`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                      {media === "video" && (
                        <div className="mb-8">
                          <LecteurVideo video={videoParSection.get(i)!} />
                        </div>
                      )}
                      <TexteRiche blocs={sec.blocs} className="text-[1.0625rem] leading-[1.75] opacity-80" />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── LA FAQ ──────────────────────────────────────────────────────
            ⛔ Ce n'est pas un remplissage. Les questions longues — « faut-il
            une autorisation pour un drone », « combien de casques prévoir » —
            sont celles que les pages vitrines ratent toutes, et ce sont
            exactement celles que les gens tapent. Elles vaudront aussi un
            balisage FAQPage en JSON-LD à la mise en ligne. */}
        {c.faq.length > 0 && (
          <section style={{ background: CLAIR_SOUTENU }}>
            <div className="mx-auto max-w-[820px] px-8 py-20">
              <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
                <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
                Les questions qu’on nous pose
              </div>
              <div className="mt-10 space-y-8">
                {c.faq.map(item => (
                  <div key={item.q} className="border-t pt-6" style={{ borderColor: "rgba(0,0,0,.12)" }}>
                    <h3 className="text-[1.15rem] font-bold leading-snug tracking-tight">{item.q}</h3>
                    <p className="mt-3 text-[1.0625rem] leading-[1.7] opacity-75">{item.r}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Ce qui manque encore, quand rien n'a été repris ───────────── */}
        {c.texte.length === 0 && c.sections.length === 0 && (
          <section style={{ background: CLAIR_SOUTENU }}>
            <div className="mx-auto max-w-[820px] px-8 py-20">
              <div
                className="rounded-md border-2 border-dashed px-8 py-10"
                style={{ borderColor: `${BLEU}55` }}
              >
                <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
                  À reprendre de l’ancien site — {c.clics} clics sur 12 mois
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── LES VIDÉOS DE LA PAGE ────────────────────────────────────────
            ⛔ ELLES MANQUAIENT, et c'est le trou le plus visible sur un site
            d'agence audiovisuelle : neuf pages décrivaient un savoir-faire
            sans jamais le MONTRER. Les 27 vidéos de l'ancien site ont été
            récupérées le 12/08/2026.

            ⚠️ Rien n'est chargé tant qu'on ne clique pas — voir _LecteurVideo.
            Sept lecteurs posés d'emblée sur la page vidéo mapping auraient
            coûté plus cher en vitesse que les vidéos ne rapportent en preuve.

            ⭐ Le balisage VideoObject part avec : c'est lui qui ouvre les
            résultats vidéo de Google, invisibles sans lui. */}
        {videosRestantes.length > 0 && (
          <section style={{ background: CLAIR_SOUTENU }}>
            <div className="mx-auto max-w-[1500px] px-8 py-24">
              <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
                <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
                À l’écran
              </div>
              <h2 className={`max-w-3xl ${TYPO.titre}`}>Les autres vidéos</h2>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videosRestantes.map((v, i) => (
                  <LecteurVideo key={v._key ?? `${v.url}-${i}`} video={v} />
                ))}
              </div>
            </div>
            
          </section>
        )}

        {/* ⭐ Le balisage couvre TOUTES les vidéos de la page, réparties ou
            non : Google lit l'en-tête, pas la mise en page. */}
        {(page.videos?.length ?? 0) > 0 && <BaliseVideo videos={page.videos!} page={page.titre} />}

        {/* ── LES PROJETS QUI LE PROUVENT ──────────────────────────────────
            ⛔ CE BLOC MANQUAIT, et c'était le trou du maillage. Les pages de
            savoir-faire renvoyaient vers un FILTRE de la page réalisations,
            jamais vers les fiches elles-mêmes. Résultat mesuré : chaque
            réalisation ne recevait qu'un seul lien entrant.

            Ici les fiches sont liées une par une. Une page de savoir-faire
            qui se positionne bien transmet donc son autorité aux projets
            qu'elle cite — et le visiteur voit la preuve au lieu d'un lien
            vers une liste à filtrer. */}
        {projets.length > 0 && (
          <section className="mx-auto max-w-[1500px] px-8 py-24">
            <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
              <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
              La preuve
            </div>
            <h2 className={`max-w-3xl ${TYPO.titre}`}>Des projets, pas des promesses</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projets.map(pr => (
                <a
                  key={pr.slug}
                  href={`/apercu/realisations/${pr.slug}`}
                  className="group block overflow-hidden rounded-md border transition hover:shadow-lg"
                  style={{ borderColor: "rgba(0,0,0,.1)", background: "#fff" }}
                >
                  {pr.image ? (
                    <div
                      className="aspect-[16/10] bg-cover bg-center transition duration-700 group-hover:brightness-110"
                      style={{ backgroundImage: `url('${imageUrl(pr.image, 600, 375)}')` }}
                      role="img"
                      aria-label={pr.titre}
                    />
                  ) : (
                    <div className="aspect-[16/10]" style={{ background: CLAIR_SOUTENU }} />
                  )}
                  <div className="p-5 text-[15px] font-bold leading-snug">{pr.titre}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        </>
      )}

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
          Un projet de <span style={{ color: BLEU }}>{c.nom.toLowerCase()}</span> ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl px-8 text-lg opacity-65">
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
            className="rounded-md border border-black/20 px-9 py-4 text-[16px] font-semibold"
          >
            Voir le pôle {metier.nom.toLowerCase()}
          </a>
        </div>
      </section>
      <PiedDePage />
    </main>
  );
}
