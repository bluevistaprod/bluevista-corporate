import Image from "next/image";
import { BLEU, REFERENCES, BarreAperçu } from "../_commun";

/**
 * V1 — ÉDITORIALE
 *
 * Parti pris : le calme comme signe d'assurance. Fond clair, typographie
 * large, beaucoup de blanc, et le bleu de marque employé avec parcimonie.
 * L'image est plein cadre mais posée, jamais recouverte de texte.
 *
 * Ce que ça dit du positionnement : une agence installée, qui n'a pas besoin
 * d'en faire trop. Le contraire d'un prestataire technique qui aligne son
 * matériel.
 */
export default function V1() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111]">
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-8">
        <div className="text-2xl font-bold tracking-tight">
          blue<span style={{ color: BLEU }}>vista</span>
        </div>
        <nav className="hidden gap-8 text-[15px] md:flex">
          {["Agence", "Offres", "Réalisations", "Contact"].map(l => (
            <span key={l} className="cursor-pointer opacity-70 hover:opacity-100">{l}</span>
          ))}
        </nav>
      </header>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-8 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p
            className="mb-8 text-[13px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: BLEU }}
          >
            Agence de contenu, d’événement et d’immersion
          </p>
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
            Vos idées méritent<br />mieux qu’une vidéo.
          </h1>
          <p className="mt-8 max-w-lg text-xl leading-relaxed opacity-70">
            Nous concevons des contenus, des événements et des expériences qui
            font bouger vos indicateurs — pas seulement vos audiences.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-full px-8 py-4 text-[15px] font-semibold text-white transition hover:opacity-90"
              style={{ background: BLEU }}
            >
              Parlons de votre projet
            </a>
            <a href="#" className="rounded-full border border-black/15 px-8 py-4 text-[15px] font-semibold transition hover:border-black/40">
              Voir le showreel
            </a>
          </div>
          <p className="mt-12 text-sm opacity-45">
            Depuis 2004 · Lyon · Paris · Genève · 145 films produits
          </p>
        </div>

        <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src="/media/ref-clasquin.jpg"
            alt="Aftermovie tourné au Palais de la Bourse à Lyon pour Clasquin"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </figure>
      </section>

      <section className="border-t border-black/10 bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight tracking-tight">
            Trois façons de faire avancer votre marque.
          </h2>
          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {[
              ["Communication & marketing", "Films, motion design, podcasts et contenus sociaux. Une stratégie, pas une accumulation de formats."],
              ["Événementiel", "Conception, scénographie, captation et diffusion. De l’idée à la salle, puis à l’écran."],
              ["Immersion", "Réalité virtuelle, showroom virtuel, mapping. Faire vivre ce qu’on ne peut pas montrer autrement."],
            ].map(([titre, texte], i) => (
              <article key={titre}>
                <div className="mb-5 text-sm font-semibold tabular-nums" style={{ color: BLEU }}>
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{titre}</h3>
                <p className="mt-3 leading-relaxed opacity-65">{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-8">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold tracking-tight">
              Réalisations
            </h2>
            <span className="text-sm opacity-50">145 projets</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCES.slice(0, 3).map(r => (
              <figure key={r.nom} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                  <Image
                    src={r.image}
                    alt={`${r.nom} — ${r.legende}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4">
                  <div className="font-semibold">{r.nom}</div>
                  <div className="text-sm opacity-55">{r.legende}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <BarreAperçu actif={1} />
    </main>
  );
}
