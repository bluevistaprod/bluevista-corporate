import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { lirePage, lirePages } from "../../../../lib/sanity";
import { alternatesDe } from "../../../../lib/hreflang";
import { CorpsCompetence } from "../../../../composants/PageCompetence";

/**
 * LES NEUF PAGES DE SAVOIR-FAIRE, EN PUBLIC — `/savoir-faire/<slug>/`.
 *
 * ⛔⛔ ELLES N'EXISTAIENT PAS. Le gabarit était fini, relu et validé page par
 * page, mais il ne vivait que sous `/apercu/competence/…`. Onze anciennes
 * adresses du site pointent ici — dont `/nos-competences/video-mapping/` (97
 * clics sur douze mois) et `live-streaming-webtv` (85). Sans cette route,
 * elles seraient tombées en 404 le 4 septembre.
 *
 * ⛔ LE SLUG EST CELUI DE L'ANCIEN SITE, et ce n'est pas un hasard :
 * `video-mapping` reste `video-mapping`. Une adresse qui se positionne depuis
 * des années est un actif ; la renommer parce qu'elle nous plaît moins revient
 * à le jeter.
 *
 * ⚠️ Le segment passe en revanche de `competence` à `savoir-faire` — c'est le
 * découpage arrêté pour le nouveau site, et c'est lui que vise le plan de
 * redirections.
 */

/* ⚠️ Zéro en recette : un cache qui montre le passé se diagnostique mal. */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

/**
 * ⛔ LES ADRESSES VIENNENT DE SANITY, pas d'une liste écrite dans le code :
 * créer une page de savoir-faire dans le studio crée sa route publique.
 * ⚠️ Seule la version française est pré-générée ici ; l'anglais et l'espagnol
 * suivront quand leurs pages existeront, et `alternatesDe` ne déclarera de
 * toute façon que celles réellement publiées.
 */
export async function generateStaticParams() {
  const pages = await lirePages("savoir-faire");
  return pages.map(p => ({ lang: "fr", slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const page = await lirePage("savoir-faire", slug);
  if (!page) return {};
  /* ⛔ Le titre vient de Sanity : c'est là qu'il porte le mot réellement
     recherché. Le repli évite qu'une page sans balise sorte sans titre — il ne
     remplace pas le travail.
     ⚠️ `titreSeo` contient déjà « | Bluevista » ; le gabarit du layout ne
     s'applique qu'aux titres qui ne l'ont pas. */
  return {
    /* ⛔ `absolute` : sans lui le gabarit « %s | Bluevista » du layout
       s'ajoute à un `titreSeo` qui porte DÉJÀ le suffixe, et la page sort
       avec « | Bluevista | Bluevista ». Vu seulement en lisant le HTML. */
    title: { absolute: page.titreSeo ?? `${page.titre} | Bluevista` },
    description: page.descriptionSeo,
    /* ⛔ Le hreflang est CALCULÉ, pas écrit : il ne déclare que les versions
       réellement publiées. Dépublier l'anglais retire la déclaration tout
       seul — la garantie demandée par Giz après les deux 404 de hreflang. */
    alternates: await alternatesDe(page._id, "savoir-faire", lang as "fr", slug),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsCompetence slug={slug} publique />;
}
