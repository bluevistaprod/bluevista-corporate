import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { CorpsAccueil } from "../../composants/PageAccueil";
import { EnTete } from "../../composants/EnTete";
import { PiedDePage } from "../../composants/PiedDePage";

/**
 * LA PAGE D'ACCUEIL.
 *
 * ⛔⛔ CE QUI ÉTAIT EN LIGNE N'ÉTAIT PAS L'ACCUEIL DU SITE. C'était la preuve
 * de concept du rendu serveur : un titre, une accroche, trois cartes. Quatre
 * titres en tout, 37 Ko. Pendant ce temps la vraie page d'accueil — dix
 * sections, les trois piliers, la méthode, les témoins, les logos clients —
 * vivait sous `/apercu/v7` et n'était accessible à personne.
 * 👉 C'est la page la plus vue du site. Elle était finie et invisible, comme
 * les neuf savoir-faire, mais en pire.
 *
 * ⚠️ SEUL LE FRANÇAIS BASCULE. L'anglais et l'espagnol gardent le texte
 * d'origine : ils ne sont pas encore traduits, et servir la version française
 * sous `/en/` serait pire qu'une page courte — ce serait une page dans la
 * mauvaise langue, que Google indexerait comme telle.
 * 📌 La traduction EN est en semaine 2 du plan du 4 septembre.
 */

const CONTENU = {
  fr: {
    titre: "Bluevista — Agence vidéo, événementiel et immersion",
    description:
      "Bluevista conçoit et produit vos films, vos événements et vos expériences immersives depuis 2004. Studios à Lyon, Paris et Genève.",
    h1: "Transformez votre communication en résultats",
    accroche:
      "Agence de création de contenu, communication & marketing, événementiel et immersion.",
    piliers: [
      ["Communication & Marketing", "Films, motion design, podcasts et contenus sociaux pour porter votre message."],
      ["Événementiel", "Conception, scénographie, captation et diffusion en direct de vos événements."],
      ["Immersion", "Réalité virtuelle, showroom virtuel et expériences immersives sur mesure."],
    ],
  },
  en: {
    titre: "Bluevista — Video, events and immersive experiences",
    description:
      "Bluevista has been creating films, events and immersive experiences since 2004. Studios in Lyon, Paris and Geneva.",
    h1: "Turn your communication into results",
    accroche: "Content creation, communication & marketing, events and immersive experiences.",
    piliers: [
      ["Communication & Marketing", "Films, motion design, podcasts and social content to carry your message."],
      ["Events", "Design, scenography, filming and live broadcasting of your events."],
      ["Immersion", "Virtual reality, virtual showrooms and bespoke immersive experiences."],
    ],
  },
  es: {
    titre: "Bluevista — Vídeo, eventos y experiencias inmersivas",
    description:
      "Bluevista crea películas, eventos y experiencias inmersivas desde 2004. Estudios en Lyon, París y Ginebra.",
    h1: "Convierta su comunicación en resultados",
    accroche: "Creación de contenido, comunicación y marketing, eventos e inmersión.",
    piliers: [
      ["Comunicación y Marketing", "Películas, motion design, podcasts y contenidos sociales para transmitir su mensaje."],
      ["Eventos", "Diseño, escenografía, grabación y retransmisión en directo de sus eventos."],
      ["Inmersión", "Realidad virtual, showroom virtual y experiencias inmersivas a medida."],
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  const c = CONTENU[lang];
  return metadonnees({ lang, chemin: "/", titre: c.titre, description: c.description });
}

export default async function Accueil({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const c = CONTENU[lang];

  /* ⭐ Le français reçoit la vraie page. Les deux autres attendent leur
     traduction — voir le commentaire en tête de fichier. */
  if (lang === "fr") return <CorpsAccueil publique />;

  return (
    <>
      {/* ⛔ Ces pages sont nées avant l'en-tête Bluevista : elles sortaient
          sans logo, sans menu et sans pied de page. */}
      <EnTete opaque publique />
    <main style={{ padding: "3rem 1.5rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.1 }}>{c.h1}</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.125rem", opacity: 0.8 }}>{c.accroche}</p>

      <section style={{ marginTop: "3rem", display: "grid", gap: "1.5rem" }}>
        {c.piliers.map(([titre, texte]) => (
          <article key={titre}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{titre}</h2>
            <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>{texte}</p>
          </article>
        ))}
      </section>
    </main>
      <PiedDePage publique />
    </>
  );
}
