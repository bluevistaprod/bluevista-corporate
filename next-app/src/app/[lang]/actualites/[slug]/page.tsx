import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { LANGUAGES } from "@/shared/urls";
import { lireActualite, lireActualites } from "../../../../lib/sanity";
import { Actualite } from "../../../apercu/_Actualite";

/**
 * UNE ACTUALITÉ PUBLIQUE — `/actualites/<slug>/`.
 *
 * ⛔ LE SLUG EST CELUI DE L'ANCIEN SITE, À L'IDENTIQUE. Les 63 articles
 * gardent leur adresse : aucune redirection n'est prévue pour eux, donc
 * aucune ne les rattraperait si le slug changeait.
 *
 * ⚠️ `publique` est passé au rendu : sans lui, les liens du texte seraient
 * traduits vers les routes d'aperçu, et le vrai site enverrait ses visiteurs
 * sur `/apercu/…` — c'est-à-dire nulle part.
 */
/* ⚠️ Zéro en recette : un cache qui montre le passé se diagnostique mal. */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const a = await lireActualite(slug, lang as "fr");
  if (!a) return {};
  const meta = metadonnees({
    lang,
    chemin: `/actualites/${slug}/`,
    titre: a.titreSeo ?? a.titre,
    description: a.descriptionSeo ?? "",
  });

  /* ⛔⛔ LE HREFLANG NE SE DÉCLARE QUE SUR DU PUBLIÉ.
     `metadonnees` annonce les trois langues sans distinction — juste pour les
     pages qui existent partout. Les actualités n'existent QU'EN FRANÇAIS
     aujourd'hui : la déclaration envoyait Google sur `/en/actualites/<slug>/`
     et `/es/…`, deux 404 que j'ai vérifiées.
     👉 Un hreflang cassé ne produit AUCUNE erreur visible — c'est exactement
     pourquoi il se vérifie au lieu de se supposer. Et une déclaration qui ne
     reste qu'à une seule langue n'a plus d'objet : on la retire entière. */
  const versions = await Promise.all(
    LANGUAGES.map(async l => ((await lireActualite(slug, l as "fr")) ? l : null))
  );
  const publiees = versions.filter(Boolean) as string[];
  meta.alternates = publiees.length > 1
    ? {
        canonical: meta.alternates?.canonical,
        languages: Object.fromEntries(
          Object.entries(meta.alternates?.languages ?? {})
            .filter(([l]) => l === "x-default" || publiees.includes(l))
        ),
      }
    : { canonical: meta.alternates?.canonical };
  return meta;
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const a = await lireActualite(slug, lang as "fr");
  if (!a) notFound();

  const suite = (await lireActualites(lang as "fr", 4)).filter(x => x.slug !== slug).slice(0, 3);

  return (
    <main>
      <Actualite actualite={a} suite={suite} publique />
    </main>
  );
}
