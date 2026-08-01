import Image from "next/image";
import { REFERENCES, BarreAperçu } from "../_commun";

/**
 * V4 — la structure de V3, l'ambition visuelle de V2, LES TEXTES DE GIZ.
 *
 * ⛔ Règle de cette version : aucun texte inventé. Tout ce qui est écrit
 * ci-dessous vient de son travail — le fichier de traductions de sa maquette
 * et le document offres_content_v2.md du dossier Manus. Les seuls ajouts sont
 * des liaisons courtes, signalées par un commentaire.
 *
 * Ce que la structure change par rapport à sa maquette : la page ne présente
 * plus « nos 3 piliers » puis « nos réalisations » côte à côte. Elle avance
 * dans l'ordre d'une agence qui vend du résultat — la promesse, la preuve
 * chez le client, puis seulement l'offre.
 */

/** Accroche d'accueil — traduction "home.hero_baseline" de sa maquette. */
const BASELINE = "Transformez votre communication en résultats concrets";

/** Les trois offres, telles qu'il les a écrites dans offres_content_v2.md. */
const OFFRES = [
  {
    nom: "Communication & Marketing",
    accroche: "Amplifiez votre présence et convertissez votre audience en clients",
    probleme:
      "Vous avez un message puissant, mais il se perd dans le bruit. Votre audience ne vous trouve pas, ne vous comprend pas, ou ne passe pas à l’action. Vos concurrents captent l’attention que vous méritez.",
    benefice:
      "Transformez votre communication en moteur de croissance. Nous créons une stratégie cohérente qui positionne votre marque, engage votre audience et génère des résultats mesurables.",
    cta: "Demander une consultation",
    image: "/media/ref-ssp.jpg",
  },
  {
    nom: "Événementiel",
    accroche:
      "Créez des événements inoubliables qui marquent les esprits et renforcent votre marque",
    probleme:
      "Organiser un événement impactant demande une coordination complexe entre logistique, créativité et technologie. Vous risquez que votre événement soit oublié dès le lendemain, ou qu’il ne génère pas le ROI attendu.",
    benefice:
      "Transformez votre événement en expérience mémorable. De la conception créative à la couverture professionnelle, nous créons des moments qui renforcent votre marque, génèrent du buzz et maximisent votre ROI.",
    cta: "Planifier votre événement",
    image: "/media/ref-clasquin.jpg",
  },
  {
    nom: "Immersion",
    accroche:
      "Plongez votre audience dans des mondes sans limites et créez des expériences inoubliables",
    probleme:
      "Vos clients veulent des expériences, pas juste du contenu. La réalité virtuelle et augmentée semblent complexes et coûteuses. Vous ne savez pas comment les utiliser pour créer un vrai différenciel compétitif.",
    benefice:
      "Offrez à votre audience une expérience immersive qui la captive et la marque à jamais. Nous transformons votre vision en réalité virtuelle, augmentée ou 360°, créant des moments inoubliables et des résultats mesurables.",
    cta: "Découvrir nos solutions immersives",
    image: "/media/ref-berliet.jpg",
  },
];

/** Ses trois différenciateurs, repris mot pour mot de sa page d'accueil. */
const DIFFERENCE = [
  "Des résultats mesurables et orientés business",
  "Un processus fluide de la stratégie à la livraison",
  "Une équipe proche qui comprend vraiment votre business",
];

/** Les cas clients — chiffres volontairement vides, à obtenir auprès d'eux. */
const CAS = [
  { client: "Clasquin", contexte: "Convention annuelle · Palais de la Bourse, Lyon", image: "/media/ref-clasquin.jpg" },
  { client: "Berliet", contexte: "Film social 3D · quais de Saône", image: "/media/ref-berliet.jpg" },
  { client: "Irisolaris", contexte: "Film corporate · tourné sur site", image: "/media/ref-irisolaris.jpg" },
];

const CYAN = "#4FD1E8";

export default function V4() {
  return (
    <main className="min-h-screen bg-[#07090C] text-white">
      {/* ── Promesse ─────────────────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[660px] flex-col">
        {/*
          L'image de fond est enveloppée dans un conteneur absolu plutôt que
          posée directement dans la section. Dans un conteneur flex, une image
          en `fill` peut ne pas peindre comme prévu ; l'enveloppe rend le
          rendu déterministe. Constaté sur cette page : le fond restait noir
          alors que l'image était bien chargée.
        */}
        <div
          role="img"
          aria-label="Convention Clasquin au Palais de la Bourse à Lyon"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/media/ref-clasquin.jpg')" }}
        />
        {/*
          Voile de lisibilité, et non un assombrissement de l'image : l'image
          reste à pleine intensité, seul un dégradé passe par-dessus. Un fond
          à 45 % d'opacité sous un dégradé noir ne donnait qu'un aplat sombre —
          exactement le défaut reproché à la maquette d'origine.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#07090C]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <header className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between px-8 py-8">
          <div className="text-2xl font-bold tracking-tight">bluevista</div>
          <nav className="hidden gap-9 text-[15px] md:flex">
            {["L’Agence", "Offres", "Réalisations", "Actualités", "Contact"].map(l => (
              <span key={l} className="cursor-pointer opacity-75 hover:opacity-100">{l}</span>
            ))}
          </nav>
          <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
            Demander un devis
          </a>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 items-center px-8">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.75rem,7.5vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.02em]">
              {BASELINE}
            </h1>
            {/* Liaison ajoutée — reprend ses trois domaines tels qu'il les nomme. */}
            <p className="mt-9 max-w-2xl text-xl leading-relaxed opacity-80">
              Agence de communication &amp; marketing, d’événementiel et d’immersion.
              Depuis 2004, à Lyon, Paris et Genève.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-5">
              <button className="flex items-center gap-4 rounded-full bg-white/10 py-3 pl-3 pr-7 backdrop-blur transition hover:bg-white/20">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">▶</span>
                <span className="text-[15px] font-semibold">Showreel 2026</span>
              </button>
              <a href="#" className="text-[15px] font-semibold underline underline-offset-8 opacity-80 hover:opacity-100">
                Découvrez nos offres
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Preuve chez le client ────────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-8 pb-8 pt-24">
        <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
          Ce que ça a changé, chez eux.
        </h2>
        <p className="mt-5 max-w-xl text-lg opacity-60">
          {DIFFERENCE[0]}.
        </p>
      </section>

      <section className="space-y-px">
        {CAS.map((c, i) => (
          <article key={c.client} className="group relative h-[68vh] min-h-[430px] overflow-hidden">
            <Image
              src={c.image}
              alt={`${c.client} — ${c.contexte}`}
              fill
              sizes="100vw"
              className="object-cover transition duration-[1400ms] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/35 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full px-8 pb-14">
              <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8">
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] opacity-55">
                    0{i + 1} — {c.contexte}
                  </div>
                  <div className="mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold uppercase leading-none tracking-tight">
                    {c.client}
                  </div>
                </div>
                <div className="rounded-lg border border-dashed border-white/30 px-7 py-5">
                  <div className="text-4xl font-bold tabular-nums" style={{ color: CYAN }}>
                    —
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest opacity-55">
                    résultat à obtenir du client
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── L'offre, avec ses textes ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
          Nos 3 piliers stratégiques
        </h2>

        <div className="mt-16 space-y-24">
          {OFFRES.map((o, i) => (
            <article
              key={o.nom}
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>figure]:order-first" : ""}`}
            >
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
                  {o.nom}
                </div>
                <h3 className="mt-5 text-[clamp(1.5rem,2.6vw,2.4rem)] font-bold leading-[1.1] tracking-tight">
                  {o.accroche}
                </h3>
                <p className="mt-7 leading-relaxed opacity-55">{o.probleme}</p>
                <p className="mt-5 leading-relaxed opacity-85">{o.benefice}</p>
                <a
                  href="#"
                  className="mt-8 inline-block rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold transition hover:border-white/70"
                >
                  {o.cta}
                </a>
              </div>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={o.image}
                  alt={o.nom}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>

      {/* ── Pourquoi vous ────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-[1500px] px-8">
          <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-tight">
            Pourquoi Bluevista
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {DIFFERENCE.map((d, i) => (
              <div key={d}>
                <div className="mb-4 text-sm font-semibold tabular-nums" style={{ color: CYAN }}>
                  0{i + 1}
                </div>
                <p className="text-lg font-semibold leading-snug">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-8 text-sm uppercase tracking-[0.18em] opacity-45">
            <span>Depuis 2004</span>
            <span>145 films livrés</span>
            <span>Lyon · Paris · Genève</span>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-28 text-center">
        <h2 className="mx-auto max-w-3xl px-8 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight">
          Transformez votre communication en résultats concrets
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a href="#" className="rounded-full bg-white px-9 py-4 text-[15px] font-semibold text-black">
            Demander un devis
          </a>
          <a href="#" className="rounded-full border border-white/25 px-9 py-4 text-[15px] font-semibold">
            S’inscrire à la newsletter
          </a>
        </div>
      </section>

      <BarreAperçu actif={4} />
    </main>
  );
}
