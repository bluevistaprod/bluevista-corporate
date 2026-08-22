import Link from "next/link";
import { imageUrl, type ActualiteSanity, type BlocActualite, type MediaActualite } from "../lib/sanity";
import { BLEU, BLEU_CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "./palette";
import { LecteurVideo } from "./LecteurVideo";
import { TexteRiche } from "./TexteRiche";
import { Apparait } from "./Apparait";
import { EnTete } from "./EnTete";
import { PiedDePage } from "./PiedDePage";
import { Carrousel } from "./Carrousel";

/**
 * LE RENDU D'UNE ACTUALITÉ — maquette validée par Giz le 18/08/2026.
 *
 * ⛔⛔ CE FICHIER EST LA TRADUCTION D'UNE MAQUETTE, ET C'EST LÀ QU'ON PERD DES
 * RÉGLAGES. Sur les savoir-faire, quatre réglages ont disparu en passant de la
 * maquette au code — l'espacement de la bande d'entrée, l'alternance des
 * médias, le rattachement de l'aparté, le style des liens. Tous invisibles
 * dans le code, tous visibles à l'écran.
 * 👉 Après codage, on recompare ÉCRAN CONTRE ÉCRAN, pas champ contre champ.
 *
 * ⭐ LES RÉGLAGES QUI ONT COÛTÉ CHER, ET QU'IL NE FAUT PAS « SIMPLIFIER » :
 *   · le conteneur d'un média ne porte AUCUN fond. Il en portait un, avec des
 *     coins arrondis et `overflow:hidden`, et il enveloppait le visuel ET sa
 *     légende : le fond restait visible en bande pleine sous chaque image, et
 *     la légende s'y perdait, sombre sur sombre ;
 *   · l'alternance se calcule sur le RANG PARMI LES BLOCS, pas sur l'index ;
 *   · l'aparté vit DANS son bloc — détaché, il flotte au milieu de la page ;
 *   · une image ne se pose que sur une phrase qui la NOMME.
 */

const LARGE = "mx-auto max-w-[1500px] px-8";

/**
 * L'adresse d'un lien selon le contexte.
 * ⛔ Sur le SITE, l'adresse stockée est déjà la bonne. Dans l'APERÇU, les
 * routes vivent ailleurs et il faut traduire. Une seule fonction pour les
 * deux, appelée partout — c'est en la réécrivant à la main dans un coin
 * qu'on a produit un bouton mort.
 */
function lien(href: string, publique?: boolean) {
  if (/^https?:\/\//.test(href)) return href;
  if (publique) return href;
  return `/apercu${href.replace(/^\/savoir-faire\//, "/competence/").replace(/\/$/, "")}`;
}

function SurTitre({ enfant, sombre }: { enfant: string; sombre?: boolean }) {
  const c = sombre ? BLEU_CLAIR : BLEU;
  return (
    /* ⭐ HARMONISÉ le 22/08/2026 sur `TYPO.surTitre` — 13 px fixes. Quatre
   endroits portaient leur propre sur-titre en `clamp(13px, 1.15vw, 18px)`
   avec un filet variable, pendant que l'agence, les offres, l'accueil, le
   contact et les villes utilisaient tous la constante. Sur un grand écran
   l'écart se voyait : Giz l'a repéré en comparant deux index.
   ⛔ Une valeur de style recopiée à quatre endroits n'est pas une valeur,
   c'est quatre valeurs qui vont diverger. Elles avaient déjà divergé sur
   l'interlettrage (0,16 contre 0,18 em). */
    <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: c }}>
      <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: c }} />
      {enfant}
    </div>
  );
}

/** Un média et sa légende. ⚠️ Aucun fond sur le conteneur — voir l'en-tête. */
function Media({ media }: { media: MediaActualite }) {
  const legende = media.legende;
  if (media.videoUrl) {
    return (
      <div className="block">
        <LecteurVideo video={{ url: media.videoUrl, titre: legende ?? "", vignetteUrl: imageUrl(media.videoAffiche, 1200) }} />
        {media.sousLegende && (
          <div className="mt-[2px] text-[14px] opacity-60">{media.sousLegende}</div>
        )}
      </div>
    );
  }
  if (!media.image) return null;
  return (
    <div className="block">
      <img
        src={imageUrl(media.image, 1200)}
        alt={media.texteAlternatif ?? ""}
        className="block w-full rounded-md"
        style={{ background: CLAIR_SOUTENU }}
      />
      {legende && (
        <div className="mt-[14px] text-[15px] font-bold leading-snug">
          {legende}
          {media.sousLegende && (
            <span className="mt-[2px] block text-[14px] font-normal opacity-60">{media.sousLegende}</span>
          )}
        </div>
      )}
    </div>
  );
}

function UnBloc({ bloc, rang, publique }: { bloc: BlocActualite; rang: number; publique?: boolean }) {
  const medias = (bloc.medias ?? []).filter(m => m.image || m.videoUrl);
  /* ⛔ L'ALTERNANCE COMPTE LES BLOCS, PAS LEUR POSITION DANS LA PAGE. */
  const inverse = rang % 2 === 1;
  /* Le filet : deux blocs de même fond qui se suivent ont besoin d'une
     frontière, sinon on croit lire le même chapitre. */
  const filet = rang > 0;

  const texte = (
    <div>
      {bloc.surTitre && <SurTitre enfant={bloc.surTitre} />}
      {bloc.titre ? (
        <h2
          className="mb-6 font-bold"
          style={{ fontSize: "clamp(1.6rem,2.6vw,2.25rem)", lineHeight: 1.12, letterSpacing: "-.02em", maxWidth: "24ch" }}
        >
          {bloc.titre}
        </h2>
      ) : null}
      <TexteRiche blocs={bloc.paragraphes} publique={publique} className="max-w-[64ch] text-[1.0625rem] leading-[1.75] opacity-[.82]" />
      {bloc.aparte && (
        <div className="mt-8 border-l-[3px] py-1 pl-6" style={{ borderColor: BLEU_CLAIR }}>
          <p className="text-base italic opacity-[.62]" style={{ maxWidth: "52ch" }}>{bloc.aparte}</p>
        </div>
      )}
    </div>
  );

  /* ── LE CARROUSEL ──────────────────────────────────────────────────────
     Demande de Giz, 21/08 : plusieurs images dans une section défilent au
     lieu de s'empiler. C'est posé ICI, dans le gabarit de bloc, donc ça vaut
     pour les 63 actualités sans qu'aucune n'ait à être retouchée.

     ⛔ LES VIDÉOS SONT MISES À PART, et l'ordre du bloc est conservé : les
     vidéos d'abord, puis les images. Une vidéo emportée par un défilement
     automatique au bout de trois secondes serait illisible.
     ⚠️ Une seule image = pas de carrousel. Un « diaporama » d'une vue, avec
     sa pastille unique, ne serait qu'un ornement mensonger. */
  const videos = medias.filter(m => m.videoUrl);
  const images = medias.filter(m => !m.videoUrl && m.image);

  const colonneMedias = medias.length ? (
    <div className="flex flex-col gap-8">
      {videos.map((m, i) => <Media key={m._key ?? `v${i}`} media={m} />)}
      {images.length > 1
        ? <Carrousel medias={images} />
        : images.map((m, i) => <Media key={m._key ?? `i${i}`} media={m} />)}
    </div>
  ) : null;

  return (
    <section style={{ background: CLAIR_SOUTENU }} className={filet ? "pt-12 pb-12" : "pt-20 pb-12"}>
      <Apparait>
        <div className={LARGE}>
          {filet && <span className="mb-16 block h-px" style={{ background: "#0722222e" }} />}
          {/* ⚠️ Sans média, le texte ne s'étale pas sur toute la largeur :
              une ligne de 1500 px ne se lit pas. */}
          {colonneMedias ? (
            <div className="grid items-start gap-16 lg:grid-cols-2">
              <div className={inverse ? "lg:order-2" : ""}>{texte}</div>
              <div className={inverse ? "lg:order-1" : ""}>{colonneMedias}</div>
            </div>
          ) : (
            <div style={{ maxWidth: "68ch" }}>{texte}</div>
          )}
        </div>
      </Apparait>
    </section>
  );
}

export function Actualite({
  actualite: a,
  suite,
  publique,
}: {
  actualite: ActualiteSanity;
  suite: ActualiteSanity[];
  /** true sur le site, false (par défaut) sur les routes d'aperçu. */
  publique?: boolean;
}) {
  const racine = publique ? "" : "/apercu";
  const versActualite = (s: string) => (publique ? `/actualites/${s}/` : `/apercu/actualite/${s}`);
  /* ⛔⛔ UNE DATE ABSENTE S'AFFICHAIT « 1 janvier 1970 ». `new Date(undefined)`
     ne lève pas d'erreur : il rend l'époque Unix, et la page publie une date
     fausse avec aplomb. C'est la famille de défauts qui ne casse rien et ne
     prévient pas — on ne la découvre qu'en regardant la page.
     👉 Sans date, on n'écrit pas de date. */
  const date = a.datePublication
    ? new Date(a.datePublication).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    /* ⛔⛔ LE MENU ET LE PIED DE PAGE MANQUAIENT SUR LES 63 ACTUALITÉS.
       Toutes les autres pages du site portent leur chrome dans leur propre
       composant ; celui-ci ne le faisait pas, et personne ne s'en apercevait
       parce que la page a SON PROPRE `<header>` — la bannière de l'article.
       Un contrôle qui compte les balises `<header>` répondait donc « il y en
       a un » sur une page qui n'avait aucun menu.
       👉 Vérifier la NAVIGATION (les liens du menu), pas la balise.

       ⚠️ Conséquence réelle : c'est le plus gros groupe de pages du site, et
       celui où l'on arrive le plus souvent depuis Google. Un visiteur y
       atterrissait sans aucun moyen d'entrer dans le site.

       ⭐ En-tête TRANSPARENT (pas `opaque`) : la bannière est sombre et
       pleine largeur, comme celle de l'accueil. Le `pt-[11rem]` qui suit
       réserve d'ailleurs exactement la hauteur de la barre fixe — la
       maquette l'attendait en surimpression depuis le début. */
    <main>
      <EnTete publique={publique} />

      {/* ── ① L'EN-TÊTE ────────────────────────────────────────────────
          ⚠️ L'image est facultative : 21 des 63 actualités n'en ont aucune,
          et l'en-tête doit tenir debout sans elle plutôt que d'en réclamer
          une qu'on inventerait. */}
      <header className="relative overflow-hidden pb-[4.5rem] pt-[11rem] text-white" style={{ background: NOIR }}>
        {a.imageEntete ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[.55]"
            style={{ backgroundImage: `url('${imageUrl(a.imageEntete, 2000)}')` }}
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top,#04070AF7 6%,#04070AC7 46%,#04070A6B 100%)" }}
        />
        <div className={`relative z-10 ${LARGE}`}>
          <div className="mb-7 text-sm" style={{ color: "#ffffff8c" }}>
            <Link href={racine || "/"} className="hover:text-white">Accueil</Link>
            {" · "}
            <Link href={publique ? "/actualites/" : "/apercu/actualites"} className="hover:text-white">Actualités</Link>
          </div>
          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(2.1rem,4.4vw,3.5rem)", lineHeight: 1.04, letterSpacing: "-.02em", maxWidth: "20ch" }}
          >
            {a.titre}
          </h1>
          {a.chapo && (
            <div className="mt-7" style={{ maxWidth: "52ch" }}>
              <TexteRiche blocs={a.chapo} sombre publique={publique} className="max-w-[52ch] text-[1.25rem] leading-[1.6]" />
            </div>
          )}
          <div
            className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t pt-7 text-[.95rem]"
            style={{ borderColor: "#ffffff2b", color: "#ffffffb3" }}
          >
            {a.client && <div>Client : <b style={{ color: BLEU_CLAIR }}>{a.client}</b></div>}
            {date && <div>Publié le <b style={{ color: BLEU_CLAIR }}>{date}</b></div>}
            {a.repere && <div><b style={{ color: BLEU_CLAIR }}>{a.repere}</b></div>}
          </div>
        </div>
      </header>

      {/* ── ② LE RÉCIT ─────────────────────────────────────────────────── */}
      {(a.blocs ?? []).map((b, i) => <UnBloc key={b._key ?? i} bloc={b} rang={i} publique={publique} />)}

      {/* ── ③ DES PROJETS DU MÊME TYPE ─────────────────────────────────
          ⭐ LE BLOC QUI DÉSAMORCE LA CONCURRENCE avec la réalisation.
          ⛔ Il ne parle JAMAIS du site lui-même : il nomme des clients et lie
          leurs réalisations. « Cette actualité raconte…, la réalisation
          donne… » ne sert personne. */}
      {a.projets?.titre && (
        <section className="pb-12 pt-20">
          <Apparait>
            <div className={LARGE}>
              <div className="overflow-hidden rounded-lg px-14 py-12 text-white" style={{ background: SOMBRE }}>
                {a.projets.surTitre && <SurTitre enfant={a.projets.surTitre} sombre />}
                <h3 className="mb-4 text-2xl font-bold leading-tight">{a.projets.titre}</h3>
                <TexteRiche blocs={a.projets.paragraphes} sombre publique={publique} className="max-w-[70ch] text-base leading-[1.75] opacity-[.78]" />
                {a.projets.boutonLibelle && a.projets.boutonLien && (
                  <Link
                    /* ⛔ MÊME TRADUCTION D'ADRESSE QUE DANS `TexteRiche`, et
                       l'oublier ici a produit un lien mort : le contenu stocke
                       l'adresse PUBLIQUE `/savoir-faire/…`, les routes
                       d'aperçu vivent sous `/apercu/competence/…`. Une règle
                       écrite à un endroit ne se transporte pas toute seule
                       dans le fichier suivant. */
                    href={lien(a.projets.boutonLien, publique)}
                    className="mt-6 inline-block rounded-[5px] px-6 py-3 text-[.95rem] font-bold no-underline transition hover:bg-white"
                    style={{ background: BLEU_CLAIR, color: NOIR }}
                  >
                    {a.projets.boutonLibelle}
                  </Link>
                )}
              </div>
            </div>
          </Apparait>
        </section>
      )}

      {/* ── ④ À LIRE AUSSI ─────────────────────────────────────────────── */}
      {suite.length > 0 && (
        <section className="pb-12 pt-20" style={{ background: CLAIR_SOUTENU }}>
          <Apparait>
            <div className={LARGE}>
              <SurTitre enfant="À lire aussi" />
              <h2 className="font-bold" style={{ fontSize: "clamp(1.6rem,2.6vw,2.25rem)", lineHeight: 1.12, letterSpacing: "-.02em" }}>
                Les projets qui ressemblent à celui-là
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {suite.map(s => (
                  <Link
                    key={s._id}
                    href={versActualite(s.slug)}
                    className="block overflow-hidden rounded-md border bg-white no-underline"
                    style={{ borderColor: "#0000001a", color: "inherit" }}
                  >
                    <div
                      className="aspect-[16/10] bg-cover bg-center"
                      style={{
                        background: s.imageEntete ? undefined : CLAIR_SOUTENU,
                        backgroundImage: s.imageEntete ? `url('${imageUrl(s.imageEntete, 600)}')` : undefined,
                      }}
                    />
                    <div className="p-5 text-[.95rem] font-bold leading-snug">{s.titre}</div>
                    <div className="px-5 pb-5 text-[.82rem] font-normal opacity-55">
                      {/* ⛔ `new Date(undefined)` affiche « 1 janvier 1970 » avec
                          aplomb — la faute a déjà été publiée une fois sur cette
                          page. Aucune actualité n'est sans date aujourd'hui ;
                          c'est justement pour ça qu'il faut la garde. */}
                      {s.datePublication
                        ? new Date(s.datePublication).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                        : null}
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={publique ? "/actualites/" : "/apercu/actualites"} className="mt-12 inline-block font-semibold no-underline" style={{ color: BLEU }}>
                ← Toutes les actualités
              </Link>
            </div>
          </Apparait>
        </section>
      )}
      <PiedDePage publique={publique} />
    </main>
  );
}
