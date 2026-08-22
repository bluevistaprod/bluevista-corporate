import { notFound } from "next/navigation";
import { isLanguage } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { lireRealisations, lireHerosIndex, imageUrl } from "../../../lib/sanity";
import { GalerieRealisations } from "../../../composants/GalerieRealisations";
import { BLEU_CLAIR, CLAIR, NOIR, SOMBRE, TYPO } from "../../../composants/palette";
import { EnTete } from "../../../composants/EnTete";
import { PiedDePage } from "../../../composants/PiedDePage";

/**
 * L'INDEX PUBLIC DES RÉALISATIONS — `/realisations/`.
 *
 * ⭐ C'EST LE PLUS GROS ACTIF DE CONTENU DU SITE, et le seul endroit où la
 * preuve est apportée plutôt qu'affirmée : 145 projets en ligne.
 *
 * ⭐ LE FILTRE SERT LE MAILLAGE AVANT DE SERVIR LE VISITEUR. C'est lui qui
 * rend cliquables les produits annoncés sur les pages métier : « mapping
 * architectural » cesse d'être un mot dans une liste pour devenir un lien
 * vers les projets qui le prouvent. Et il rend visible l'inverse — un produit
 * qui ne renvoie aucun projet est un produit à retirer de la page, ou à aller
 * produire.
 *
 * ⛔ DEUX FILTRES, ET PAS TROIS. Giz, 18/08 : « ok pour le filtre uniquement
 * existant pour le moment, on ne crée pas les secteurs ». Un filtre par
 * SECTEUR D'ACTIVITÉ demanderait un champ qui n'existe pas et son
 * renseignement sur les 145 fiches — donc d'abord une liste de secteurs
 * arrêtée, sinon on obtient dix cases à deux projets.
 *
 * ⚠️ « 145 réalisations » s'emploie ICI ET NULLE PART AILLEURS : c'est le
 * nombre de fiches publiées, pas le volume produit. Le chiffre de production
 * est « plus de 2 000 projets depuis 2004 ». Les confondre est la faute qui
 * avait fait retirer « 145 films » de l'accueil.
 */
/* ⚠️ Zéro en recette : un cache qui montre le passé se diagnostique mal. */
export const revalidate = process.env.NODE_ENV === "production" ? 60 : 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/realisations/",
    /* ⚠️ Sans « | Bluevista » : le gabarit du layout l'ajoute tout seul. */
    titre: "Nos réalisations vidéo, événementielles et immersives",
    description:
      "Films d’entreprise, animation 3D, vidéo mapping, live streaming et expériences immersives. Filtrez par métier et par type de projet.",
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ produit?: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const { produit } = await searchParams;
  const realisations = await lireRealisations(lang as "fr");
  /* ⭐ Le héros suit la dernière réalisation client publiée — voir
     `lireHerosIndex`. Nos propres films en sont écartés. */
  const heros = await lireHerosIndex("realisation", lang as "fr");

  return (
    <>
      {/* ⛔ Ces pages sont nées avant l'en-tête Bluevista : elles sortaient
          sans logo, sans menu et sans pied de page. */}
      <EnTete opaque publique />
    <main style={{ background: CLAIR, color: SOMBRE }}>
      {/* ⭐ UNE IMAGE DE HÉROS QUI SE MET À JOUR SEULE : celle de la dernière
          réalisation client mise en ligne. La galerie annonce ainsi ce qu'elle
          contient, et elle reste vivante sans intervention. */}
      <section className="relative overflow-hidden" style={{ background: NOIR, color: "#fff" }}>
        {heros?.image ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${imageUrl(heros.image, 2000, 1100)}')` }}
              role="img"
              aria-label={heros.titre}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(100deg, rgba(4,7,10,.93) 0%, rgba(4,7,10,.74) 44%, rgba(4,7,10,.34) 100%)" }}
            />
          </>
        ) : null}
        <div className="relative z-10 mx-auto max-w-[1500px] px-8 pb-20 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Depuis 2004
          </div>
          <h1 className="max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Ce qu’on a fait pour eux
          </h1>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-white/75">
            Laissez-vous guider par votre curiosité et découvrez certaines de nos
            précédentes réalisations. Bon visionnage !
          </p>
          <div className="mt-9 border-t border-white/20 pt-7 text-[.95rem] text-white/70">
            <b style={{ color: BLEU_CLAIR }}>{realisations.length} réalisations</b> en ligne
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-8 py-20">
        <GalerieRealisations realisations={realisations} produitInitial={produit ?? null} publique />
      </section>
    </main>
      <PiedDePage publique />
    </>
  );
}
