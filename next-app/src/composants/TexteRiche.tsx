import type { BlocTexte } from "../lib/sanity";
import { BLEU, BLEU_CLAIR, NOIR } from "./palette";

/**
 * LE TEXTE DES SECTIONS, AVEC SES LIENS.
 *
 * ⛔⛔ POURQUOI CE COMPOSANT EXISTE, ET C'EST UN PIÈGE DÉJÀ PAYÉ AILLEURS.
 * Les paragraphes passaient par `enParagraphes`, qui aplatit un bloc de texte
 * enrichi en une simple chaîne : `children.map(c => c.text).join("")`. Les
 * liens posés dans Sanity étaient donc bien ENREGISTRÉS, et parfaitement
 * INVISIBLES au rendu. Le contrôle « les liens sont-ils dans Sanity ? »
 * répondait oui ; la page n'en montrait aucun.
 *
 * 👉 Même famille que les treize « ✓ » écrits dans des champs que personne ne
 * lit : écrire quelque part ne prouve pas qu'on l'affiche. Le seul contrôle
 * qui vaut est de regarder la page.
 *
 * ⛔⛔ LE GRAS ÉTAIT ÉCRIT ET JAMAIS AFFICHÉ. Le schéma Sanity l'autorise —
 * il n'y a pas de `decorators` déclarés, donc ce sont ceux par défaut, gras
 * et italique compris. Le rendu, lui, les jetait. Un rédacteur pouvait donc
 * mettre un mot en gras dans le studio, l'y voir en gras, et le voir
 * disparaître en ligne. Giz : « es-tu sûr que le rich text passe ? ».
 *
 * ⚠️ MON COMMENTAIRE PRÉCÉDENT DÉFENDAIT CE TROU, ET IL AVAIT TORT DE LE
 * FAIRE. Il disait que « le gras n'a pas sa place dans le corps d'une page de
 * vente ». C'est une règle d'ÉCRITURE — vraie sur une page d'offre, fausse
 * dans un article ou un cas client, où le gras sert à retrouver un chiffre en
 * balayant. Et surtout : une règle d'écriture ne s'applique pas en supprimant
 * silencieusement ce que l'auteur a écrit. Si le gras est de trop, on le
 * retire du TEXTE, pas du rendu.
 *
 * ⛔⛔ LES INTERTITRES, EUX, ÉTAIENT PERDUS — ET C'EST DU RÉFÉRENCEMENT.
 * Tout arrivait dans un `<p>`, quel que soit le `style` du bloc. Cinq `h3`
 * écrits dans Sanity (live streaming, studio 3D Paris) sortaient donc en
 * paragraphes ordinaires : invisibles pour le lecteur qui balaie la page, et
 * surtout ABSENTS de la structure de titres que Google lit pour comprendre de
 * quoi parle une page.
 * 👉 Arbitrage de Giz, 20/08 : « SEO 1st ». C'est donc le rendu qui s'aligne
 * sur le contenu, jamais l'inverse — on ne supprime pas un intertitre du
 * backoffice sous prétexte que le front ne sait pas l'afficher.
 *
 * ⚠️ QUATRE NIVEAUX TYPOGRAPHIQUES, PAS CINQ. L'intertitre n'introduit pas une
 * taille de plus : il reprend le corps du texte, en demi-gras, avec de l'air
 * au-dessus. C'est l'espace qui le sépare, pas la taille.
 */
export function TexteRiche({
  blocs, className, sombre, publique,
}: { blocs?: BlocTexte[]; className?: string; sombre?: boolean; publique?: boolean }) {
  if (!blocs?.length) return null;
  return (
    <div className="space-y-5">
      {blocs.map((bloc, i) => {
        const liens = new Map(
          ((bloc as { markDefs?: { _key: string; href?: string }[] }).markDefs ?? [])
            .filter(m => m.href)
            .map(m => [m._key, m.href!])
        );
        /* Le `style` du bloc décide de la balise. Tout ce qui n'est pas un
           intertitre connu reste un paragraphe — on n'invente pas de niveau. */
        const style = (bloc as { style?: string }).style;
        const Balise = (style === "h2" ? "h2" : style === "h3" ? "h3" : style === "h4" ? "h4" : "p") as
          "h2" | "h3" | "h4" | "p";
        const estTitre = Balise !== "p";

        return (
          <Balise
            key={i}
            className={estTitre ? `${className ?? ""} font-semibold` : className}
            style={estTitre ? { marginTop: "1.75rem", opacity: 1 } : undefined}
          >
            {(bloc.children ?? []).map((sp, j) => {
              const marques = (sp as { marks?: string[] }).marks ?? [];
              const cle = marques.find(m => liens.has(m));
              const href = cle ? liens.get(cle) : undefined;
              /* Le gras reprend la couleur du texte : la couleur veut dire
                 cliquable, règle posée le 12/08. Un gras coloré ferait cliquer
                 dans le vide. */
              if (!href) {
                const contenu = marques.includes("em") ? <em>{sp.text}</em> : sp.text;
                return marques.includes("strong")
                  ? <strong key={j} className="font-semibold" style={{ opacity: 1 }}>{contenu}</strong>
                  : <span key={j}>{contenu}</span>;
              }
              /* ⭐ Le lien interne sert deux choses à la fois : le lecteur qui
                 veut voir le projet, et le maillage — une page de savoir-faire
                 bien classée transmet son autorité aux réalisations qu'elle
                 cite. Sur l'ancien site, ces liens étaient partout ; ils
                 avaient disparu du nouveau. */
              /* ⭐ LE LIEN VERS LE SITE DU CLIENT est le seul lien sortant
                 NATUREL du site, et il a une valeur qui n'a rien à voir avec
                 le référencement : il PROUVE que le client existe. C'est une
                 référence vérifiable en un clic, pas un logo posé sur une
                 page. On le pose quand le projet n'a pas de réalisation à
                 montrer — sinon c'est la réalisation qui prime.
                 ⚠️ `noopener` avec `_blank` : sans lui, la page ouverte garde
                 une prise sur la nôtre. */
              const externe = /^https?:\/\//.test(href);
              return (
                <a
                  key={j}
                  /* ⛔ LES ADRESSES DE L'APERÇU NE SONT PAS CELLES DU SITE.
                     Le contenu stocke l'adresse PUBLIQUE — `/savoir-faire/…`,
                     décidée et sourcée — mais les routes de prévisualisation
                     vivent sous `/apercu/competence/…`. Coller bêtement
                     `/apercu` devant produisait des liens morts, que Giz a
                     trouvés avant moi. La traduction se fait ici, à un seul
                     endroit, et le contenu reste juste. */
                  /* ⛔ LA TRADUCTION D'ADRESSE NE VAUT QUE POUR L'APERÇU.
                     Le contenu stocke l'adresse PUBLIQUE — `/savoir-faire/…`,
                     `/actualites/…` — qui est juste telle quelle sur le site.
                     Les routes de prévisualisation, elles, vivent ailleurs.
                     Traduire dans les deux cas enverrait les visiteurs du vrai
                     site sur `/apercu/…`, c'est-à-dire nulle part. */
                  href={externe || publique
                    ? href
                    : `/apercu${href.replace(/^\/savoir-faire\//, "/competence/").replace(/\/$/, "")}`}
                  {...(externe ? { target: "_blank", rel: "noopener" } : {})}
                  /* ⭐ LA PASTILLE, ET PAS UN SOULIGNEMENT — règle validée le
                     12/08 après deux constats de Giz : un lien bleu posé sur
                     une photo sombre est illisible, et « la couleur veut dire
                     cliquable ». Une pastille porte son propre fond, donc sa
                     lisibilité ne dépend plus de ce qu'il y a derrière.
                     ⚠️ `box-decoration-break` : sans lui, un lien qui passe à
                     la ligne perd ses coins arrondis sur le second morceau. */
                  className="rounded-[5px] font-semibold no-underline transition"
                  style={{
                    background: sombre ? BLEU_CLAIR : BLEU,
                    color: sombre ? NOIR : "#fff",
                    padding: ".12em .45em",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }}
                >
                  {sp.text}
                </a>
              );
            })}
          </Balise>
        );
      })}
    </div>
  );
}
