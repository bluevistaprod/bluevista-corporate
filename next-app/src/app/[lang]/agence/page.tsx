import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { CorpsAgence } from "../../../composants/PageAgence";

/**
 * `/agence/` — 36 clics sur douze mois pointent ici depuis l'ancien site.
 * ⚠️ Le gabarit existait depuis des semaines sous `/apercu/agence` ; la route
 * publique, non. Le contenu est le même composant, aux adresses près.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/agence/",
    titre: "L’agence — création de contenus depuis 2004",
    description:
      "Bluevista, agence de création de contenus à Lyon, Paris et Genève : communication & marketing, événementiel et immersion. Toutes nos compétences intégrées, depuis 2004.",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsAgence publique />;
}
