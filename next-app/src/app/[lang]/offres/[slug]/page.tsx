import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { lirePage, lirePages } from "../../../../lib/sanity";
import { alternatesDe } from "../../../../lib/hreflang";
import { CorpsMetier } from "../../../../composants/PageMetier";

/**
 * LES TROIS PAGES DE MÉTIER — `/offres/<slug>/`.
 *
 * ⚠️ LE SEGMENT EST « offres », PAS « metier ». C'est ce que vise le plan de
 * redirections (`/offres/film/` : 26 clics, `/offres/evenement/` : 1), et
 * c'est le mot que le visiteur comprend — « métier » parle de nous, « offres »
 * parle de lui.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateStaticParams() {
  const pages = await lirePages("metier");
  return pages.map(p => ({ lang: "fr", slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const page = await lirePage("metier", slug);
  if (!page) return {};
  return {
    /* ⛔ `absolute` : sans lui le gabarit « %s | Bluevista » du layout
       s'ajoute à un `titreSeo` qui porte DÉJÀ le suffixe, et la page sort
       avec « | Bluevista | Bluevista ». Vu seulement en lisant le HTML. */
    title: { absolute: page.titreSeo ?? `${page.titre} | Bluevista` },
    description: page.descriptionSeo,
    alternates: await alternatesDe(page._id, "metier", lang as "fr", slug),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsMetier metier={slug} publique />;
}
