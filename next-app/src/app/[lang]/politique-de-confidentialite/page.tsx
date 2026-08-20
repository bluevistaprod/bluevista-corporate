import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { CorpsConfidentialite } from "../../../composants/PageConfidentialite";

/**
 * `/politique-de-confidentialite/` — obligatoire, et pas seulement pour la forme.
 *
 * ⛔ LE BANDEAU DE CONSENTEMENT POINTE ICI, et le formulaire aussi. Tant que
 * cette route n'existait pas, les deux renvoyaient vers une 404 : le lien que
 * la loi exige menait nulle part sur le site public.
 */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/politique-de-confidentialite/",
    titre: "Politique de confidentialité",
    description:
      "Données collectées, finalités, durées de conservation et exercice de vos droits sur le site de Bluevista.",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CorpsConfidentialite publique />;
}
