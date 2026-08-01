import Image from "next/image";
import { BLEU, REFERENCES, BarreAperçu } from "../_commun";

/**
 * V2 — IMMERSIVE
 *
 * Parti pris : l'image occupe tout, l'interface disparaît. Le showreel en
 * plein écran, quelques mots en surimpression, aucun cadre ni carte.
 *
 * Ce que ça dit du positionnement : une agence créative qui montre avant de
 * dire. C'est la plus spectaculaire, et la plus exigeante — elle ne tient que
 * si le film d'accueil est excellent.
 *
 * ⚠️ En production, le fond sera le showreel Livid en lecture automatique et
 * muette. Ici c'est une image fixe : l'intégration Livid ne permet pas encore
 * une lecture de fond sans habillage (point à vérifier avec eux).
 */
export default function V2() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex h-screen min-h-[640px] flex-col">
        <Image
          src="/media/ref-berliet.jpg"
          alt="Film FOOH réalisé pour Berliet sur les quais de Saône à Lyon"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/90" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between px-8 py-8">
          <div className="text-2xl font-bold tracking-tight">bluevista</div>
          <nav className="hidden gap-8 text-[15px] md:flex">
            {["Agence", "Offres", "Réalisations", "Contact"].map(l => (
              <span key={l} className="cursor-pointer opacity-75 hover:opacity-100">{l}</span>
            ))}
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 items-center px-8">
          <div>
            <h1 className="max-w-4xl text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.03em]">
              On ne filme pas.<br />
              <span style={{ color: "#4FD1E8" }}>On fait bouger.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed opacity-80">
              Contenu, événement, immersion. Depuis 2004, à Lyon, Paris et Genève.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pb-12">
          <div className="flex flex-wrap items-center gap-6">
            <button className="flex items-center gap-4 rounded-full bg-white/10 py-3 pl-3 pr-7 backdrop-blur transition hover:bg-white/20">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">▶</span>
              <span className="text-[15px] font-semibold">Voir le showreel 2026</span>
            </button>
            <span className="text-sm uppercase tracking-[0.15em] opacity-50">
              145 films · depuis 2004
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <h2 className="max-w-3xl text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-tight tracking-tight">
          Trois terrains, une même exigence&nbsp;: que ça produise un effet.
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-white/15 md:grid-cols-3">
          {[
            ["Communication & marketing", "Films, motion design, podcasts, contenus sociaux."],
            ["Événementiel", "Conception, scénographie, captation, diffusion en direct."],
            ["Immersion", "Réalité virtuelle, showroom virtuel, vidéo mapping."],
          ].map(([titre, texte]) => (
            <article key={titre} className="bg-black p-10">
              <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: "#4FD1E8" }}>
                {titre}
              </h3>
              <p className="mt-4 leading-relaxed opacity-70">{texte}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-32">
        {REFERENCES.slice(0, 3).map((r, i) => (
          <figure key={r.nom} className="group relative h-[70vh] min-h-[420px] overflow-hidden">
            <Image
              src={r.image}
              alt={`${r.nom} — ${r.legende}`}
              fill
              sizes="100vw"
              className="object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
            <figcaption className="absolute bottom-0 left-0 w-full px-8 pb-12">
              <div className="mx-auto max-w-[1500px]">
                <div className="text-sm uppercase tracking-[0.2em] opacity-60">
                  0{i + 1} — {r.legende}
                </div>
                <div className="mt-3 text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-none tracking-tight">
                  {r.nom}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </section>

      <BarreAperçu actif={2} />
    </main>
  );
}
