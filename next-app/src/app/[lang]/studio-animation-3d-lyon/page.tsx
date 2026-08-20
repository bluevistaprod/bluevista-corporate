import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { lirePage } from "../../../lib/sanity";
import { alternatesDe } from "../../../lib/hreflang";
import { CorpsVille } from "../../../composants/PageVille";

/**
 * PAGE DE VILLE — `/studio-animation-3d-lyon/`.
 *
 * ⛔ ELLE EST À LA RACINE, ET C'EST VOULU : c'est l'adresse de l'ancien site,
 * et elle se positionne depuis des années. La déplacer sous un segment plus
 * logique reviendrait à jeter son classement.
 *
 * ⛔ ROUTE STATIQUE PLUTÔT QUE `[ville]` DYNAMIQUE. Un segment dynamique à la
 * racine avalerait toutes les adresses inconnues du site — n'importe quelle
 * faute de frappe rendrait une page de ville au lieu d'une 404. Trois
 * fichiers explicites coûtent moins cher qu'un piège permanent.
 *
 * ⚠️ La quatrième page de ville, Genève, reste DÉPUBLIÉE : elle part en 301
 * vers bluevista.ch. Elle n'a donc pas de route ici, et c'est délibéré.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

const SLUG = "studio-animation-3d-lyon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const page = await lirePage("ville", SLUG);
  if (!page) return {};
  return {
    /* ⛔ `absolute` : sans lui le gabarit « %s | Bluevista » du layout
       s'ajoute à un `titreSeo` qui porte DÉJÀ le suffixe, et la page sort
       avec « | Bluevista | Bluevista ». Vu seulement en lisant le HTML. */
    title: { absolute: page.titreSeo ?? `${page.titre} | Bluevista` },
    description: page.descriptionSeo,
    alternates: await alternatesDe(page._id, "ville", lang as "fr", SLUG),
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsVille slug={SLUG} publique />;
}
