import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { CorpsContact } from "../../../composants/PageContact";

/**
 * `/contact/` — 18 clics sur douze mois, et le bout de la chaîne : c'est la
 * page où le formulaire branché sur Podio reçoit les demandes.
 * ⛔ Le mot « devis » reste dans le titre : neuf requêtes distinctes de la
 * Search Console le contiennent.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/contact/",
    titre: "Contact & devis",
    description:
      "Parlez-nous de votre projet vidéo, événementiel ou immersif. Réponse sous 48 h ouvrées — Lyon, Paris, Genève.",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsContact publique />;
}
