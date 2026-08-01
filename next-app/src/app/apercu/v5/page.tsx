import { BarreAperçu } from "../_commun";
import { EnTete } from "../_EnTete";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE } from "../_palette";

/**
 * V5 — la V4 retravaillée à partir des retours de Giz.
 *
 * Ce qui change, et pourquoi :
 *
 * ① DEUX BLEUS. Une partie de l'accroche passe en bleu, comme il l'a demandé.
 *    Sur fond sombre c'est la déclinaison claire — le bleu du logo y serait
 *    illisible. La couleur tombe sur « résultats concrets » : ce n'est pas
 *    décoratif, ça souligne le mot qui porte le repositionnement.
 *
 * ② ALTERNANCE CLAIR / SOMBRE au lieu d'un sélecteur de thème. Il l'avait
 *    lui-même pressenti : personne ne cliquerait sur un sélecteur, et il
 *    faudrait maintenir chaque composant en double. L'alternance règle du même
 *    coup son autre remarque — on ne comprenait pas qu'on changeait de
 *    chapitre en arrivant aux trois piliers.
 *
 * ③ RUPTURES DE SECTION FRANCHES : changement de fond, sur-titre, et beaucoup
 *    d'air au-dessus. On doit voir qu'on tourne la page sans avoir à lire.
 *
 * ④ BOUTONS HIÉRARCHISÉS : un seul bouton plein et dominant par écran, les
 *    autres en retrait. Les contours sur image ne tenaient pas.
 *
 * ⛔ NI FLOU NI PARALLAXE, volontairement. Flouter ses propres images sur un
 *    site d'agence vidéo revient à cacher ce qu'on vend, et le parallaxe
 *    dégrade les indicateurs de performance que Google mesure. À la place :
 *    des bandes d'image plein cadre, recadrées serré, sans effet.
 *
 * ⛔⛔ CHIFFRES : AUCUN CHIFFRE DE PERFORMANCE SUR CETTE PAGE, ET C'EST VOLONTAIRE.
 *    Alerte de Giz le 01/08/2026 : « attention les chiffres sortent de nulle
 *    part ». Vérification faite, il avait raison, et le problème dépasse un
 *    chiffre isolé : la maquette Manus contient +200%, +45%, +40%, +35%, +30%,
 *    +25%, « 50k téléchargements », « 4.7/5 » — et un témoignage attribué à une
 *    personne NOMMÉE chez un client RÉEL, illustré par une photo de banque
 *    d'images. Rien de tout cela n'est sourcé.
 *    Seuls chiffres autorisés ici : « depuis 2004 » et « 145 films », ce dernier
 *    étant le nombre de lignes de realisations_final_updatedgiz.csv, donc
 *    vérifiable. Tout autre chiffre doit venir du client, par écrit.
 */

/**
 * Les trois piliers.
 *
 * Retour de Giz : « ce n'est pas assez explicite ». C'était juste — le NOM du
 * pilier était l'élément le plus petit de la carte, et rien ne disait ce que
 * le pilier CONTIENT. Deux corrections : le nom devient l'élément dominant, et
 * la liste de services apparaît. Cette liste vient de son offres_content_v2.md,
 * elle n'est pas inventée.
 */
const OFFRES = [
  {
    nom: "Communication & Marketing",
    accroche: "Amplifiez votre présence et convertissez votre audience en clients",
    probleme:
      "Vous avez un message puissant, mais il se perd dans le bruit. Votre audience ne vous trouve pas, ne vous comprend pas, ou ne passe pas à l’action.",
    services: [
      "Podcasts & audio",
      "Réseaux sociaux",
      "Motion design & animation",
      "Documentaires & reportages",
      "Vidéomapping & expériences",
      "Optimisation & testing",
    ],
    cta: "Demander une consultation",
    image: "/media/pilier-communication.jpg",
  },
  {
    nom: "Événementiel",
    accroche: "Créez des événements inoubliables qui marquent les esprits",
    probleme:
      "Organiser un événement impactant demande une coordination complexe. Vous risquez qu’il soit oublié dès le lendemain, ou qu’il ne génère pas le ROI attendu.",
    services: [
      "Conception & scénographie",
      "Couverture professionnelle",
      "Vidéomapping & projections",
      "Événementiel virtuel & hybride",
      "Production & coordination",
      "Contenu post-événement",
    ],
    cta: "Planifier votre événement",
    image: "/media/pilier-evenementiel.jpg",
  },
  {
    nom: "Immersion",
    accroche: "Plongez votre audience dans des mondes sans limites",
    probleme:
      "Vos clients veulent des expériences, pas juste du contenu. La réalité virtuelle semble complexe et coûteuse, et son intérêt reste flou.",
    services: [
      "Réalité virtuelle (VR)",
      "Réalité augmentée (AR)",
      "Vidéo & photographie 360°",
      "Modélisation 3D & animation",
      "Expériences mixtes",
      "Plateforme & distribution",
    ],
    cta: "Découvrir nos solutions immersives",
    image: "/media/pilier-immersion.jpg",
  },
];

/**
 * Le processus, en cinq phases — écrit par Giz dans offres_content_v2.md.
 * Il vient nourrir « Pourquoi Bluevista », que Giz jugeait « très pauvre »,
 * SANS recourir au moindre chiffre de performance : voir la note en tête de
 * fichier sur les chiffres inventés.
 */
const PROCESSUS = [
  ["Écoute", "Audit de votre marque, analyse de votre audience, définition des objectifs."],
  ["Stratégie", "Positionnement, messages clés, calendrier de contenu, choix des canaux."],
  ["Création", "Production des contenus, itérations sur vos retours, respect des délais."],
  ["Optimisation", "Tests et variantes, ajustements fondés sur les données de performance."],
  ["Impact", "Suivi, reporting et ajustements réguliers, dans la durée."],
];

const CAS = [
  { client: "Clasquin", contexte: "Convention annuelle · Palais de la Bourse, Lyon", image: "/media/ref-clasquin.jpg" },
  { client: "Berliet", contexte: "Film social 3D · quais de Saône", image: "/media/ref-berliet.jpg" },
  { client: "Irisolaris", contexte: "Film corporate · tourné sur site", image: "/media/ref-irisolaris.jpg" },
];

const DIFFERENCE = [
  "Des résultats mesurables et orientés business",
  "Un processus fluide de la stratégie à la livraison",
  "Une équipe proche qui comprend vraiment votre business",
];

/** Sur-titre de section : le repère visuel qui manquait entre les chapitres. */
function SurTitre({ children, sombre = false }: { children: string; sombre?: boolean }) {
  return (
    <div
      className="mb-7 flex items-center gap-4 text-[15px] font-bold uppercase tracking-[0.16em]"
      style={{ color: sombre ? BLEU_CLAIR : BLEU }}
    >
      <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: sombre ? BLEU_CLAIR : BLEU }} />
      {children}
    </div>
  );
}

export default function V5() {
  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete />

      {/* ① SOMBRE — la promesse ─────────────────────────────────────────
          ⛔ NE PAS remettre de fondu vers le clair en bas de ce hero.
          Essayé en première version, retiré immédiatement : faire mourir
          l'image dans un aplat beige tuait toute l'immersion en deux
          secondes. Le hero occupe l'écran entier et se termine par une
          coupe FRANCHE. L'alternance clair/sombre ne commence pas ici —
          elle commence après la séquence immersive, au chapitre des offres.
      */}
      <section className="relative flex h-[100svh] min-h-[620px] flex-col justify-center overflow-hidden">
        <div
          role="img"
          aria-label="Convention Clasquin au Palais de la Bourse à Lyon"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/media/ref-clasquin.jpg')" }}
        />
        {/* Voile de lisibilité ancré en bas à gauche, là où vit le texte. */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, ${NOIR}F5 0%, ${NOIR}B0 38%, ${NOIR}35 68%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${NOIR}D0 0%, transparent 42%)`,
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pt-28 text-white">
          <h1 className="max-w-[19ch] text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em]">
            Transformez votre communication en{" "}
            <span style={{ color: BLEU_CLAIR }}>résultats concrets</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/85">
            Agence de communication &amp; marketing, d’événementiel et
            d’immersion. Depuis 2004, à Lyon, Paris et Genève.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-md px-9 py-4.5 text-[16px] font-bold text-white shadow-lg transition hover:brightness-110"
              style={{ background: BLEU, paddingTop: "1.05rem", paddingBottom: "1.05rem" }}
            >
              Demander un devis
            </a>
            <button className="flex items-center gap-3.5 rounded-md border border-white/35 py-[1.05rem] pl-3 pr-7 text-[16px] font-semibold text-white transition hover:bg-white/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm" style={{ color: SOMBRE }}>▶</span>
              Showreel 2026
            </button>
          </div>
        </div>

        {/*
          Indice de défilement : signale qu'il y a une suite SANS faire mourir
          l'image dans un dégradé. C'est ce que remplaçait, en pire, le fondu
          vers le clair de la première version.
        */}
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-white/45">défiler</span>
        </div>
      </section>

      {/* ② SOMBRE — bandeau de chiffres, dans la continuité du hero ────
          Cette bande était claire dans la première version : elle cassait
          l'immersion à peine sortie du hero. Elle reste sombre, séparée par
          un simple filet, et la séquence immersive continue sans rupture.
      */}
      <section
        style={{ background: NOIR, color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        <div className="mx-auto grid max-w-[1500px] gap-10 px-8 py-14 sm:grid-cols-3">
          {[
            ["Depuis 2004", "à concevoir et produire"],
            ["145", "films livrés"],
            ["Lyon · Paris · Genève", "trois implantations"],
          ].map(([gros, petit]) => (
            <div key={gros}>
              <div className="text-[2rem] font-bold leading-none tracking-tight">{gros}</div>
              <div className="mt-2 text-sm text-white/50">{petit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ③ SOMBRE — la preuve chez le client ────────────────────────── */}
      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-4 pt-24">
          <SurTitre sombre>Nos preuves</SurTitre>
          <h2 className="max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Ce que ça a changé, chez eux.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/60">{DIFFERENCE[0]}.</p>
        </div>

        <div className="mt-14 space-y-px">
          {CAS.map((c, i) => (
            <article key={c.client} className="relative h-[62vh] min-h-[400px] overflow-hidden">
              <div
                role="img"
                aria-label={`${c.client} — ${c.contexte}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${c.image}')` }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${NOIR} 4%, ${NOIR}66 45%, transparent 100%)` }}
              />
              <div className="absolute bottom-0 left-0 w-full px-8 pb-12">
                <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-8">
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-white/60">
                      0{i + 1} — {c.contexte}
                    </div>
                    <div className="mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
                      {c.client}
                    </div>
                  </div>
                  <div className="rounded-md border border-dashed border-white/30 px-7 py-5">
                    <div className="text-4xl font-bold tabular-nums" style={{ color: BLEU_CLAIR }}>—</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-white/55">
                      résultat à obtenir du client
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ④ CLAIR — l'offre. Le changement de fond marque le chapitre. ─ */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <SurTitre>Nos offres</SurTitre>
        <h2 className="max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
          Nos 3 piliers stratégiques
        </h2>

        <div className="mt-20 space-y-24">
          {OFFRES.map((o, i) => (
            <article
              key={o.nom}
              className={`grid items-center gap-14 lg:grid-cols-2 ${i % 2 ? "lg:[&>figure]:order-first" : ""}`}
            >
              <div>
                {/*
                  Le NOM du pilier est désormais l'élément dominant. Il était
                  auparavant le plus petit de la carte, sous une accroche en
                  gros : on lisait la promesse sans savoir de quel métier il
                  s'agissait. C'est le « pas assez explicite » de Giz.
                */}
                <div className="flex items-baseline gap-4">
                  <span className="text-base font-bold tabular-nums" style={{ color: BLEU }}>
                    0{i + 1}
                  </span>
                  <h3 className="text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                    {o.nom}
                  </h3>
                </div>

                <p className="mt-6 text-[clamp(1.15rem,1.6vw,1.5rem)] font-semibold leading-snug" style={{ color: BLEU }}>
                  {o.accroche}
                </p>
                <p className="mt-5 leading-relaxed opacity-60">{o.probleme}</p>

                {/* Ce que le pilier contient concrètement — la pièce qui manquait. */}
                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {o.services.map(s => (
                    <li key={s} className="flex items-start gap-3 text-[15px] leading-snug">
                      <span
                        className="mt-[7px] inline-block h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{ background: BLEU }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="mt-9 inline-block rounded-md px-7 py-4 text-[15px] font-bold text-white transition hover:brightness-110"
                  style={{ background: BLEU }}
                >
                  {o.cta}
                </a>
              </div>
              <figure
                className="aspect-[4/3] overflow-hidden rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url('${o.image}')` }}
                aria-label={o.nom}
                role="img"
              />
            </article>
          ))}
        </div>
      </section>

      {/* ⑤ NOIR — les coulisses ─────────────────────────────────────────
          Photos choisies par Giz dans le groupe WhatsApp « Validation RS » :
          l'équipe en tournage, sur grue, en interview, sur un événement, et
          le décor de « La Boîte à Questions ».

          Ce n'est pas de l'illustration : c'est ce qui prouve son troisième
          différenciateur, « une équipe proche qui comprend vraiment votre
          business ». On ne l'affirme plus, on le montre.

          ⚠️ Images recompressées par WhatsApp (1800 px). Suffisant à cette
          taille ; à remplacer par les originaux avant la mise en ligne.
      */}
      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-14 pt-24">
          <SurTitre sombre>Dans les coulisses</SurTitre>
          <h2 className="max-w-3xl text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Une équipe, pas un prestataire.
          </h2>
        </div>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/media/coulisses-grue.jpg", "Tournage sur grue en extérieur"],
            ["/media/coulisses-interview.jpg", "Interview filmée sur stand"],
            ["/media/coulisses-tournage.jpg", "Équipe en tournage"],
            ["/media/coulisses-event.jpg", "Captation événementielle"],
          ].map(([src, alt]) => (
            <figure
              key={src}
              role="img"
              aria-label={alt}
              className="aspect-[3/4] bg-cover bg-center"
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-8 py-24 lg:grid-cols-2">
          <figure
            role="img"
            aria-label="Le décor du plateau La Boîte à Questions"
            className="aspect-[4/3] rounded-md bg-cover bg-center"
            style={{ backgroundImage: "url('/media/studio-plateau.jpg')" }}
          />
          <div>
            <div className="text-[15px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU_CLAIR }}>
              Notre studio
            </div>
            <h3 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-tight">
              Un plateau à nous, à Lyon.
            </h3>
            <p className="mt-6 max-w-lg leading-relaxed text-white/65">
              Décors montés sur mesure, éclairage, régie et post-production sur
              place. De l’idée au montage final, sans intermédiaire.
            </p>
          </div>
        </div>
      </section>

      {/* ⑥ CLAIR SOUTENU — même camp, autre chapitre ────────────────── */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <SurTitre>Pourquoi nous</SurTitre>
          <h2 className="text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Pourquoi Bluevista
          </h2>
          {/*
            Section jugée « très pauvre » par Giz : elle ne portait que trois
            phrases nues. Elle porte maintenant ses trois différenciateurs
            ADOSSÉS à son processus en cinq phases — du contenu qu'il a écrit,
            et qui prouve l'affirmation au lieu de la répéter.

            ⛔ Aucun chiffre de performance ici, volontairement. Voir la note
            en tête de fichier : ceux de la maquette d'origine étaient inventés.
          */}
          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
            <div className="space-y-10">
              {DIFFERENCE.map((d, i) => (
                <div key={d} className="border-l-2 pl-6" style={{ borderColor: BLEU }}>
                  <div className="mb-2 text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                    0{i + 1}
                  </div>
                  <p className="text-[1.35rem] font-bold leading-snug tracking-tight">{d}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-8 text-[15px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
                Notre processus, en 5 phases
              </div>
              <ol className="space-y-6">
                {PROCESSUS.map(([nom, texte], i) => (
                  <li key={nom} className="flex gap-6">
                    <span
                      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: BLEU }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-lg font-bold tracking-tight">{nom}</div>
                      <p className="mt-1 leading-relaxed opacity-65">{texte}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ SOMBRE — l'appel final ───────────────────────────────────── */}
      <section style={{ background: SOMBRE, color: "#fff" }} className="py-28 text-center">
        <h2 className="mx-auto max-w-3xl px-8 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          Transformez votre communication en{" "}
          <span style={{ color: BLEU_CLAIR }}>résultats concrets</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="#"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Demander un devis
          </a>
          <a href="#" className="rounded-md border border-white/30 px-9 py-4 text-[16px] font-semibold">
            S’inscrire à la newsletter
          </a>
        </div>
      </section>

      <BarreAperçu actif={5} />
    </main>
  );
}
