import Image from "next/image";
import { BLEU, REFERENCES, BarreAperçu } from "../_commun";

/**
 * V3 — RÉSULTATS
 *
 * Cette version n'était pas demandée : elle est née de la consigne de Giz —
 * « beaucoup plus AGENCE et RÉSULTATS que techniciens ».
 *
 * Parti pris : la page ne s'organise pas autour de ce qu'on sait faire, mais
 * autour de ce que ça a produit chez le client. Le film n'est plus le sujet,
 * il est la preuve. C'est la structure classique des agences qui vendent du
 * conseil plutôt que de la prestation.
 *
 * ⚠️ Elle exige quelque chose que les deux autres n'exigent pas : des
 * RÉSULTATS CHIFFRÉS ET VÉRIFIABLES, obtenus auprès des clients. Les chiffres
 * ci-dessous sont des EMPLACEMENTS, pas des données réelles.
 */

const CAS = [
  {
    client: "Clasquin",
    contexte: "Convention annuelle au Palais de la Bourse",
    besoin: "Fédérer 400 collaborateurs autour d’une nouvelle organisation.",
    resultat: "—",
    unite: "à renseigner",
    image: "/media/ref-clasquin.jpg",
  },
  {
    client: "Berliet",
    contexte: "Film social en 3D sur les quais de Lyon",
    besoin: "Réveiller une marque patrimoniale auprès d’une audience jeune.",
    resultat: "—",
    unite: "à renseigner",
    image: "/media/ref-berliet.jpg",
  },
  {
    client: "Irisolaris",
    contexte: "Film corporate tourné sur site",
    besoin: "Rendre concret un métier technique pour des non-spécialistes.",
    resultat: "—",
    unite: "à renseigner",
    image: "/media/ref-irisolaris.jpg",
  },
];

export default function V3() {
  return (
    <main className="min-h-screen bg-white text-[#0E0E0E]">
      <header className="mx-auto flex max-w-[1300px] items-center justify-between px-8 py-7">
        <div className="text-2xl font-bold tracking-tight">
          blue<span style={{ color: BLEU }}>vista</span>
        </div>
        <nav className="hidden gap-8 text-[15px] md:flex">
          {["Agence", "Offres", "Réalisations", "Contact"].map(l => (
            <span key={l} className="cursor-pointer opacity-70 hover:opacity-100">{l}</span>
          ))}
        </nav>
        <a
          href="#"
          className="rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: BLEU }}
        >
          Discutons-en
        </a>
      </header>

      <section className="mx-auto max-w-[1300px] px-8 pb-20 pt-16 text-center">
        <h1 className="mx-auto max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight">
          Votre message est bon.<br />
          <span style={{ color: BLEU }}>C’est sa portée qui coince.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed opacity-70">
          Nous sommes une agence de contenu, d’événement et d’immersion. Nous
          partons de ce que vous cherchez à obtenir, et nous remontons jusqu’au
          format qui y arrive.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#"
            className="rounded-full px-8 py-4 text-[15px] font-semibold text-white"
            style={{ background: BLEU }}
          >
            Prendre 30 minutes
          </a>
          <a href="#" className="rounded-full border border-black/15 px-8 py-4 text-[15px] font-semibold">
            Voir les résultats
          </a>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#F7F7F5]">
        <div className="mx-auto grid max-w-[1300px] gap-10 px-8 py-14 sm:grid-cols-3">
          {[
            ["Depuis 2004", "à concevoir et produire"],
            ["145", "films livrés"],
            ["Lyon · Paris · Genève", "trois implantations"],
          ].map(([gros, petit]) => (
            <div key={gros} className="text-center">
              <div className="text-3xl font-bold tracking-tight">{gros}</div>
              <div className="mt-1 text-sm opacity-55">{petit}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-8 py-24">
        <h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">
          Ce que ça a changé, chez eux.
        </h2>

        <div className="mt-14 space-y-6">
          {CAS.map(c => (
            <article
              key={c.client}
              className="grid overflow-hidden rounded-lg border border-black/10 md:grid-cols-[300px_1fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={c.image}
                  alt={`${c.client} — ${c.contexte}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold uppercase tracking-wider opacity-50">
                  {c.client}
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{c.contexte}</h3>
                <p className="mt-3 max-w-xl leading-relaxed opacity-70">{c.besoin}</p>
                <div className="mt-6 flex items-baseline gap-3 border-t border-dashed border-black/15 pt-6">
                  <span className="text-4xl font-bold tabular-nums" style={{ color: BLEU }}>
                    {c.resultat}
                  </span>
                  <span className="text-sm opacity-50">{c.unite}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-md bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
          <strong>Note de travail :</strong> cette version ne tient que si les
          chiffres sont réels et vérifiables. Il faudra les obtenir auprès des
          clients — c’est le seul point qui la rend plus exigeante que les deux
          autres, et c’est aussi ce qui la rend crédible.
        </p>
      </section>

      <section className="border-t border-black/10 bg-[#F7F7F5] py-24">
        <div className="mx-auto max-w-[1300px] px-8">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight">
            Comment on travaille
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              ["Communication & marketing", "On part de l’objectif commercial, pas du format."],
              ["Événementiel", "On conçoit l’expérience de la salle jusqu’à sa diffusion."],
              ["Immersion", "On fait vivre ce qu’une vidéo ne peut pas montrer."],
            ].map(([titre, texte], i) => (
              <article key={titre}>
                <div className="mb-4 text-sm font-semibold tabular-nums" style={{ color: BLEU }}>
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold tracking-tight">{titre}</h3>
                <p className="mt-2 leading-relaxed opacity-65">{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BarreAperçu actif={3} />
    </main>
  );
}
