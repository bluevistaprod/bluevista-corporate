import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { CorpsMentionsLegales } from "../../../composants/PageMentionsLegales";

/**
 * `/mentions-legales/` — la dernière destination manquante du plan de
 * redirections, et une obligation légale pour un site commercial français.
 *
 * ⚠️ 12 clics sur douze mois pointent ici. Ce n'est pas beaucoup, mais une
 * page obligatoire absente ne se juge pas au trafic.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/mentions-legales/",
    titre: "Mentions légales",
    description:
      "Éditeur, hébergeur, propriété intellectuelle et conditions d’utilisation du site de Bluevista.",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsMentionsLegales publique />;
}
