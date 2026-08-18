import { notFound } from "next/navigation";
import { lireActualite, lireActualites } from "../../../../lib/sanity";
import { Actualite } from "../../_Actualite";

/**
 * L'APERÇU D'UNE ACTUALITÉ.
 *
 * ⚠️ Route de PRÉVISUALISATION : l'adresse publique sera `/actualites/<slug>/`,
 * reprise à l'identique de l'ancien site — les 63 gardent leur adresse, aucune
 * ne part en redirection.
 */
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await lireActualite(slug);
  if (!a) return {};
  return {
    title: a.titreSeo ? `${a.titreSeo} | Bluevista` : `${a.titre} | Bluevista`,
    description: a.descriptionSeo,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await lireActualite(slug);
  if (!a) notFound();

  /* Les trois plus récentes, sauf celle qu'on lit. */
  const suite = (await lireActualites("fr", 4)).filter(x => x.slug !== slug).slice(0, 3);

  return (
    <main>
      <Actualite actualite={a} suite={suite} />
    </main>
  );
}
