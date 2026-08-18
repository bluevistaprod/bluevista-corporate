import type { BlocTexte } from "../../lib/sanity";
import { BLEU, BLEU_CLAIR, NOIR } from "./_palette";

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
 * ⚠️ Ce composant reste volontairement pauvre — liens et rien d'autre. Le gras
 * et l'italique n'ont pas leur place dans le corps d'une page de vente : ils
 * signalent qu'on n'a pas su hiérarchiser en écrivant.
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
        return (
          <p key={i} className={className}>
            {(bloc.children ?? []).map((sp, j) => {
              const cle = (sp as { marks?: string[] }).marks?.find(m => liens.has(m));
              const href = cle ? liens.get(cle) : undefined;
              if (!href) return <span key={j}>{sp.text}</span>;
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
          </p>
        );
      })}
    </div>
  );
}
