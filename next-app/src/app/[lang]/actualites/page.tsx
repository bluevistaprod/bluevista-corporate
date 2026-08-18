import Link from "next/link";
import { notFound } from "next/navigation";
import { isLanguage, basePath, type Language } from "@/shared/urls";
import { metadonnees } from "@/shared/seo";
import { lireActualites, imageUrl } from "../../../lib/sanity";
import { BLEU, BLEU_CLAIR, CLAIR_SOUTENU, NOIR } from "../../apercu/_palette";
import { Apparait } from "../../apercu/_Apparait";

/**
 * L'INDEX PUBLIC DES ACTUALITÉS — `/actualites/`.
 *
 * ⛔⛔ CETTE ADRESSE NE CHANGE PAS, ET C'EST LA RAISON D'ÊTRE DE LA PAGE.
 * `/actualites/` est l'une des 64 lignes du plan qui restent en 200 : ni
 * l'index ni les 63 articles ne partent en redirection. Renommer ce segment
 * ferait tomber soixante-quatre adresses le jour de la bascule.
 *
 * ⚠️ La langue vient du segment de route, pas du navigateur : c'est la
 * condition pour que Google indexe une page par langue.
 */
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return metadonnees({
    lang,
    chemin: "/actualites/",
    /* ⚠️ Sans « | Bluevista » : le gabarit de `[lang]/layout.tsx` l'ajoute
       tout seul aux segments enfants. L'écrire ici le doublerait. */
    titre: "Actualités — les projets, racontés",
    description:
      "Les projets de Bluevista racontés un par un : ce qu'il fallait montrer, comment on l'a filmé, et ce que ça a donné.",
  });
}

const LARGE = "mx-auto max-w-[1500px] px-8";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const base = basePath(lang as Language);

  /* ⚠️ 100 et non la valeur par défaut : il y en a 63, et une limite trop
     basse retirerait des pages sans le moindre message. */
  const actualites = await lireActualites(lang as "fr", 100);

  return (
    <main>
      <header className="relative overflow-hidden pb-[4.5rem] pt-[11rem] text-white" style={{ background: NOIR }}>
        <div className={`relative z-10 ${LARGE}`}>
          <div
            className="mb-6 flex items-center gap-4 font-bold uppercase"
            style={{ color: BLEU_CLAIR, fontSize: "clamp(13px,1.15vw,18px)", letterSpacing: "0.16em" }}
          >
            <span className="inline-block h-[3px] rounded-full" style={{ background: BLEU_CLAIR, width: "clamp(3rem,4vw,4.5rem)" }} />
            Actualités
          </div>
          <h1
            className="font-bold text-white"
            style={{ fontSize: "clamp(2.1rem,4.4vw,3.5rem)", lineHeight: 1.04, letterSpacing: "-.02em", maxWidth: "20ch" }}
          >
            Les projets, racontés
          </h1>
          <p className="mt-7 text-[1.25rem] leading-[1.6]" style={{ color: "#ffffffdb", maxWidth: "52ch" }}>
            Ce qu’il fallait montrer, comment on l’a filmé, et ce que ça a donné.
            Un projet par page, avec ses images et ses films.
          </p>
          <div className="mt-9 border-t pt-7 text-[.95rem]" style={{ borderColor: "#ffffff2b", color: "#ffffffb3" }}>
            <b style={{ color: BLEU_CLAIR }}>{actualites.length} projets</b> depuis 2004
          </div>
        </div>
      </header>

      <section className="pb-24 pt-16" style={{ background: CLAIR_SOUTENU }}>
        <Apparait>
          <div className={LARGE}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {actualites.map(a => (
                <Link
                  key={a._id}
                  href={`${base}/actualites/${a.slug}/`}
                  className="group block overflow-hidden rounded-md border bg-white no-underline transition hover:shadow-lg"
                  style={{ borderColor: "#0000001a", color: "inherit" }}
                >
                  <div
                    className="aspect-[16/10] bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                    style={{
                      background: a.imageEntete ? undefined : CLAIR_SOUTENU,
                      backgroundImage: a.imageEntete ? `url('${imageUrl(a.imageEntete, 700)}')` : undefined,
                    }}
                  />
                  <div className="p-5">
                    <div className="text-[.8rem] font-semibold uppercase tracking-wider" style={{ color: BLEU }}>
                      {new Date(a.datePublication).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </div>
                    <div className="mt-2 text-[1.05rem] font-bold leading-snug">{a.titre}</div>
                    {a.client && <div className="mt-2 text-[.85rem] opacity-55">{a.client}</div>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Apparait>
      </section>
    </main>
  );
}
