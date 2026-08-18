import { imageUrl } from "../../lib/sanity";
import { BLEU, BLEU_CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "./_palette";
import { LecteurVideo, BaliseVideo } from "./_LecteurVideo";
import { TexteRiche } from "./_TexteRiche";
import { Apparait } from "./_Apparait";

/**
 * LE RENDU DES HUIT BLOCS — maquette validée par Giz le 12/08/2026.
 *
 * ⛔⛔ CE QUE L'ÉDITEUR NE DÉCIDE PAS, ET C'EST LA MOITIÉ DU CONTRAT.
 * Il choisit l'ordre et le contenu des blocs. Il ne choisit NI le fond, NI le
 * côté du média, NI l'espacement. Ces trois-là se calculent ici, pour que
 * l'alternance reste juste quoi qu'on déplace dans le studio. C'est ce qui
 * distingue une bibliothèque de blocs d'un Elementor : la liberté porte sur
 * la composition, jamais sur le dessin.
 *
 * ⭐ LES RÈGLES DE DESSIN, toutes issues de la maquette :
 *   · l'alternance clair / sombre sert les GRANDS MOMENTS — bannière, usages,
 *     fin. Entre deux blocs de même fond, un FILET dit qu'on change de
 *     chapitre : « on n'arrivera pas à changer de couleur à chaque fois » ;
 *   · quatre niveaux typographiques, pas un de plus ;
 *   · la couleur veut dire CLIQUABLE — pastille pour les liens, gras simple
 *     pour les emphases. Sans cette règle, on fait cliquer dans le vide ;
 *   · deux bleus : le bleu de marque sur fond clair, sa déclinaison éclaircie
 *     sur fond sombre, parce que le premier y serait illisible ;
 *   · un média ne se pose que sur une phrase qui le NOMME.
 */

type Bloc = { _key?: string; _type: string; [k: string]: unknown };

/** Le fond d'un bloc : imposé par son type, jamais par l'éditeur. */
function fond(t: string): "clair" | "soutenu" | "sombre" | "noir" {
  if (t === "blocUsages") return "sombre";
  if (t === "blocBanniere" || t === "blocGalerie") return "noir";
  if (t === "blocQuestions") return "clair";
  return "soutenu";
}

/**
 * L'ESPACEMENT VERTICAL — corrigé le 12/08/2026 après relecture de Giz :
 * « généralement la marge EN BAS de chaque bloc est trop grande ».
 *
 * ⛔ LA CAUSE ÉTAIT UNE ADDITION, PAS UN RÉGLAGE. Chaque section portait
 * 8 rem en haut ET en bas. Deux blocs qui se suivent creusaient donc 16 rem
 * de vide — et comme plusieurs partagent le même fond, ce vide ne se lisait
 * même pas comme une frontière : juste comme un trou.
 *
 * ⭐ TROIS RÈGLES, et elles tiennent en une phrase chacune :
 *   · le BAS respire moins que le HAUT — un bloc appartient à ce qui le
 *     précède plus qu'à ce qui le suit ;
 *   · un bloc qui suit un bloc de MÊME FOND réduit son haut de moitié : le
 *     filet dit déjà qu'on change de chapitre, l'espace n'a plus à le redire ;
 *   · la bande d'entrée reste la plus serrée de toutes. C'est elle qui sépare
 *     l'image de la première preuve.
 */
function espacement(type: string, filet: boolean) {
  if (type === "blocEntree") return "pt-10 pb-6";
  /* ⚠️ Les valeurs ont été baissées DEUX FOIS. Premier passage : 112 px en
     haut, 80 px en bas — Giz trouvait encore l'écart trop grand, en
     particulier sous « La durée d'une session ». Ce qu'on mesure n'est jamais
     le réglage d'un bloc mais la SOMME de deux : le bas de l'un plus le haut
     du suivant. À 80 + 112, l'écart faisait 192 px de vide. Il en fait 128. */
  return filet ? "pt-12 pb-12" : "pt-20 pb-12";
}

const STYLE = {
  clair: {},
  soutenu: { background: CLAIR_SOUTENU },
  sombre: { background: SOMBRE, color: "#fff" },
  noir: { background: NOIR, color: "#fff" },
} as const;

/** Le sur-titre : il grandit avec l'écran, sinon il disparaît sur un 27 pouces. */
function SurTitre({ enfant, sombre }: { enfant: string; sombre?: boolean }) {
  const c = sombre ? BLEU_CLAIR : BLEU;
  return (
    <div
      className="mb-5 flex items-center gap-4 font-bold uppercase"
      style={{ color: c, fontSize: "clamp(13px,1.15vw,18px)", letterSpacing: "0.16em" }}
    >
      <span className="inline-block h-[3px] rounded-full" style={{ background: c, width: "clamp(3rem,4vw,4.5rem)" }} />
      {enfant}
    </div>
  );
}

export function Blocs({ blocs, projets }: { blocs: Bloc[]; projets: React.ReactNode }) {
  return (
    <>
      {blocs.map((b, i) => {
        const f = fond(b._type);
        const sombre = f === "sombre" || f === "noir";
        /* ⭐ LE FILET. Deux blocs de même fond qui se suivent ont besoin d'une
           frontière — sinon on croit lire le même chapitre. Il est posé DANS
           la largeur du contenu : collé aux bords il ressemblerait à une
           bordure de gabarit. */
        const filet = i > 0 && fond(blocs[i - 1]._type) === f && b._type !== "blocGalerie";
        /* ⛔ L'ALTERNANCE COMPTE LES BLOCS TEXTE + MÉDIA, PAS LEUR POSITION.
           Première version : le côté du média se déduisait de l'index GLOBAL.
           Sur cette page, les trois blocs concernés tombaient aux rangs 1, 5
           et 7 — tous impairs, donc tous du même côté, et l'alternance ne se
           voyait nulle part. Le rang dans la page ne dit rien du rythme ; seul
           le rang PARMI SES SEMBLABLES le dit. */
        const rang = blocs.slice(0, i).filter(x => x._type === "blocTexteMedia").length;
        /* ⛔ L'APARTÉ N'EST PAS UNE SECTION, C'EST UNE NOTE EN MARGE.
           Rendu comme un bloc autonome, il flottait au milieu de la page,
           détaché de la phrase qu'il commente — « ça qui traine au milieu ».
           Or le gimmick, c'est « phrase sérieuse PUIS note backstage » : sans
           la phrase juste au-dessus, il n'y a plus de contraste, donc plus de
           gimmick. Il se rattache donc au bloc qu'il suit. */
        if (b._type === "blocAparte" && blocs[i - 1]?._type === "blocTexteMedia") return null;
        /* ⚠️ LA BANDE D'ENTRÉE EST PLUS SERRÉE QUE LES AUTRES, et c'est
           délibéré : c'est la zone qui sépare l'image de la première preuve.
           « ÉNORME en entrée de site sans rien sur fond blanc, ça va faire
           partir le visiteur ». Chaque pixel y coûte un lecteur. */
        const aparte = blocs[i + 1]?._type === "blocAparte" ? (blocs[i + 1].texte as string) : undefined;
        return (
          <section
            key={b._key ?? i}
            style={STYLE[f]}
            className={f === "noir" ? "" : espacement(b._type, filet)}
          >
            <Apparait>
              <UnBloc bloc={b} sombre={sombre} filet={filet} index={rang} projets={projets} aparte={aparte} />
            </Apparait>
          </section>
        );
      })}
    </>
  );
}

function UnBloc({
  bloc, sombre, filet, index, projets, aparte,
}: { bloc: Bloc; sombre: boolean; filet: boolean; index: number; projets: React.ReactNode; aparte?: string }) {
  /* Les champs varient d'un bloc à l'autre : on lit en souple, le `switch`
     ci-dessous garantit qu'on ne lit que ce que le type porte vraiment. */
  const b = bloc as unknown as Record<string, never>;
  const large = "mx-auto max-w-[1500px] px-8";
  const trait = filet ? (
    <span
      className="mb-16 block h-px"
      style={{ background: sombre ? "#ffffff2e" : "#0722222e" }}
    />
  ) : null;

  switch (bloc._type) {
    /* ── ENTRÉE ─────────────────────────────────────────────────────────
       ⚠️ Deux colonnes, et c'est important : en une seule bande verticale,
       cette zone faisait « ÉNORME en entrée de site sans rien sur fond blanc,
       ça va faire partir le visiteur ». Elles ne tiennent côte à côte que
       parce que les affirmations sont au niveau SOUS-TITRE et pas au niveau
       titre — à 3 rem elles écrasaient la colonne de droite. */
    case "blocEntree":
      return (
        <div className={large}>
          {trait}
          {/* ⛔ L'IMAGE N'EST PAS RENDUE ICI, ET C'EST UNE CORRECTION.
              Elle est SAISIE sur ce bloc dans le studio — c'est là que
              l'éditeur la range naturellement — mais elle s'affiche à côté du
              TEXTE D'INTRODUCTION, plus haut dans la page. J'avais d'abord
              cru que « le bloc d'entrée est vide » désignait ce bloc-ci ; le
              vide était au-dessus, dans la bande de texte nu qui suit l'image
              de couverture. Voir `competence/[slug]/page.tsx`. */}
          <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <SurTitre enfant={(b.surTitre as string) ?? "Ce qui vous amène"} sombre={sombre} />
              <div className="grid gap-[.45rem]">
                {((b.affirmations as string[]) ?? []).map((a, k) => (
                  <div key={k} className="flex items-baseline gap-[.9rem] text-[1.35rem] font-bold leading-[1.35] tracking-[-0.01em]">
                    <span
                      className="inline-block shrink-0 rounded-full"
                      style={{ width: ".5em", height: ".5em", background: sombre ? BLEU_CLAIR : BLEU, transform: "translateY(-.12em)" }}
                    />
                    {a}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SurTitre enfant={(b.surTitrePrise as string) ?? "Ce qu’on prend en charge"} sombre={sombre} />
              <ul className="grid gap-[.55rem]">
                {((b.prestations as string[]) ?? []).map((p, k) => {
                  /* Le premier mot ressort : la liste se balaie du regard au
                     lieu de se lire ligne à ligne. */
                  const i = p.indexOf(" ");
                  const tete = i > 0 ? p.slice(0, i) : p;
                  return (
                    <li
                      key={k}
                      className="relative border-b pb-[.6rem] pl-[1.35rem] text-[.98rem]"
                      style={{ borderColor: sombre ? "#ffffff1f" : "#0722221a" }}
                    >
                      <span
                        className="absolute left-0 top-[.62em] h-[7px] w-[7px] rounded-full"
                        style={{ background: sombre ? BLEU_CLAIR : BLEU }}
                      />
                      <b style={{ color: sombre ? BLEU_CLAIR : BLEU, fontWeight: 600 }}>{tete}</b>
                      {i > 0 ? p.slice(i) : ""}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );

    /* ── TEXTE + MÉDIA ──────────────────────────────────────────────────
       Le côté du média alterne avec l'index : le texte à gauche, puis à
       droite. C'est ce qui donne le rythme de l'ancien site, et c'est calculé
       ici pour qu'un déplacement dans le studio ne le casse pas. */
    case "blocTexteMedia": {
      const img = b.image ? imageUrl(b.image, 1200, 750) : undefined;
      const video = b.videoUrl
        ? { url: b.videoUrl as string, titre: (b.videoTitre as string) ?? "", vignetteUrl: b.videoAffiche as string | undefined }
        : null;
      const galerie = ((b.galerie as unknown[]) ?? []).map(g => imageUrl(g, 700, 440)).filter(Boolean) as string[];
      const media = img || video;
      return (
        <div className={large}>
          {trait}
          <div className={`grid gap-20 ${media ? "lg:grid-cols-2" : ""} items-start`}>
            <div className={media && index % 2 ? "lg:order-last" : ""}>
              <div className="text-sm font-bold tabular-nums" style={{ color: sombre ? BLEU_CLAIR : BLEU }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <h2 className={`mb-6 mt-3 max-w-[22ch] ${TYPO.titre}`}>{b.titre}</h2>
              <TexteRiche blocs={b.paragraphes} className="text-[1.0625rem] leading-[1.75] opacity-82" sombre={sombre} />
              {aparte && (
                <div className="mt-8 border-l-[3px] pl-6" style={{ borderColor: sombre ? BLEU_CLAIR : BLEU }}>
                  <p className="max-w-[52ch] text-[1rem] italic leading-relaxed opacity-65">{aparte}</p>
                </div>
              )}
            </div>
            {media && (
              <div>
                {img ? (
                  <div className="aspect-[16/10] rounded-md bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} role="img" aria-label={b.titre} />
                ) : (
                  <LecteurVideo video={video!} />
                )}
                {galerie.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {galerie.map((g, k) => (
                      <div key={k} className="aspect-[16/10] rounded bg-cover bg-center" style={{ backgroundImage: `url('${g}')` }} role="img" aria-label={`${b.titre} — vue ${k + 2}`} />
                    ))}
                  </div>
                )}
                {video && <BaliseVideo videos={[video]} page={(b.titre as string) ?? ""} />}
              </div>
            )}
          </div>
        </div>
      );
    }

    /* ── BANNIÈRE ───────────────────────────────────────────────────────
       Le bloc qui donne le rythme, et l'équivalent du « Découvrez le Vision
       Tour » de l'ancien site. ⚠️ Une seule par page : deux et l'effet tombe. */
    case "blocBanniere":
      return (
        <div
          className="relative grid min-h-[60vh] place-items-center px-8 py-28 text-center"
          style={{ backgroundImage: `url('${imageUrl(b.image, 2000)}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <span className="absolute inset-0" style={{ background: "#04070ab3" }} />
          <div className="relative z-10 max-w-[44ch] text-white">
            <h2 className={`mx-auto text-white ${TYPO.titre}`}>{b.titre}</h2>
            {b.texte && (
              <div className="mx-auto mb-8 mt-5 [&_p]:mx-auto [&_p]:max-w-none">
                <TexteRiche blocs={b.texte} className="text-[1.0625rem] leading-[1.75] text-white/85" sombre />
              </div>
            )}
            {b.boutonLien && (
              <a
                href={b.boutonLien}
                className="inline-block rounded font-bold"
                style={{ background: BLEU_CLAIR, color: NOIR, padding: ".9rem 1.8rem", fontSize: ".95rem" }}
              >
                {b.boutonLibelle ?? "En savoir plus"}
              </a>
            )}
          </div>
        </div>
      );

    /* ── GALERIE ────────────────────────────────────────────────────────
       ⛔ Elle se colle à la bannière qui la précède : elle montre le MÊME
       projet. Posée ailleurs, elle illustre le texte du voisin — erreur déjà
       commise, et repérée par Giz. */
    case "blocGalerie":
      return (
        <div className={`${large} grid grid-cols-3 gap-3 pb-20`}>
          {((b.images as unknown[]) ?? []).map((im, k) => (
            <div key={k} className="aspect-[16/10] rounded bg-cover bg-center" style={{ backgroundImage: `url('${imageUrl(im, 900, 560)}')` }} role="img" aria-label={`Vue ${k + 1}`} />
          ))}
        </div>
      );

    /* ── USAGES ─────────────────────────────────────────────────────────
       ⭐ Le meilleur rapport maillage / place de la page : chaque entrée
       renvoie à une réalisation, et le visiteur entre par SON cas plutôt que
       par notre vocabulaire. */
    case "blocUsages":
      return (
        <div className={large}>
          {trait}
          <SurTitre enfant={(b.surTitre as string) ?? "Où ça sert"} sombre />
          <h2 className={`max-w-3xl ${TYPO.titre}`}>{b.titre}</h2>
          <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "#ffffff1f" }}>
            {((b.entrees as Record<string, string>[]) ?? []).map((e, k) => (
              <div key={k} style={{ background: SOMBRE }} className="px-9 py-11">
                <h3 className="relative mb-[.6rem] pl-7 text-[1.05rem] font-bold leading-snug">
                  {/* Un triangle plein aux angles arrondis, en SVG : le « → »
                      d'une police change de dessin d'un système à l'autre. */}
                  <svg className="absolute left-0 top-[.28em] h-[.72em] w-[.72em]" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4.5 3.2l7 4.8-7 4.8z" fill={BLEU_CLAIR} stroke={BLEU_CLAIR} strokeWidth="2.6" strokeLinejoin="round" />
                  </svg>
                  {e.titre}
                </h3>
                {e.texte && <p className="text-[.9rem] leading-relaxed opacity-70">{e.texte}</p>}
                {e.lien && (
                  <a
                    href={e.lien}
                    className="mt-3 inline-block rounded font-semibold"
                    style={{ background: BLEU_CLAIR, color: NOIR, padding: ".12em .45em", fontSize: ".88rem" }}
                  >
                    {e.lienLibelle ?? e.titre}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    /* ── APARTÉ — le gimmick, une fois par page et jamais sur une frustration. */
    case "blocAparte":
      return (
        <div className={`mx-auto max-w-[820px] px-8`}>
          {trait}
          <div className="border-l-[3px] pl-6" style={{ borderColor: sombre ? BLEU_CLAIR : BLEU }}>
            <p className="max-w-[52ch] text-[1rem] italic leading-relaxed opacity-65">{b.texte}</p>
          </div>
        </div>
      );

    /* ── QUESTIONS — les recherches longues que les pages vitrines ratent. */
    case "blocQuestions":
      return (
        <div className="mx-auto max-w-[820px] px-8">
          {trait}
          <SurTitre enfant={(b.surTitre as string) ?? "Les questions qu’on nous pose"} sombre={sombre} />
          <div className="mt-8">
            {((b.questions as Record<string, string>[]) ?? []).map((q, k) => (
              <div key={k} className="mt-11 border-t pt-8" style={{ borderColor: "#0722221f" }}>
                <h3 className="text-[1.15rem] font-bold leading-snug tracking-tight">{q.q}</h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.75] opacity-75">{q.r}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── PROJETS — les fiches liées une par une, jamais un filtre. */
    case "blocProjets":
      return (
        <div className={large}>
          {trait}
          <SurTitre enfant={(b.surTitre as string) ?? "Déjà réalisé"} sombre={sombre} />
          <h2 className={`max-w-3xl ${TYPO.titre}`}>{b.titre ?? "Six projets, six contextes"}</h2>
          {projets}
        </div>
      );

    default:
      return null;
  }
}
