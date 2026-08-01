import { BarreAperçu } from "../_commun";
import { EnTete } from "../_EnTete";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, SOMBRE_PROFOND } from "../_palette";

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
 * LA MÉTHODE BLUEVISTA — extraite du dossier de lancement Atracsys (juillet 2026).
 *
 * ⛔ CE DOSSIER EST SOUS NDA. On en reprend LA MÉTHODE — la façon de raisonner,
 * la structure, le vocabulaire — et RIEN du contenu client : ni le
 * positionnement d'Atracsys, ni ses produits, ni les angles de ses films.
 *
 * Pourquoi ça remplace le « processus en 5 phases » qui était ici : Écoute /
 * Stratégie / Création / Optimisation / Impact, n'importe quelle agence
 * l'écrit. L'architecture modulaire adossée au parcours client, elle, est un
 * vrai différenciateur — et Bluevista la pratique déjà, document à l'appui.
 */
const METHODE = [
  [
    "Le brief d'évolution",
    "On part de vos objectifs commerciaux et de votre positionnement, pas d'un format. Ce qui vous différencie vraiment devient le fil du dispositif.",
  ],
  [
    "L'architecture vidéo",
    "Un film principal qui installe la marque, des modules courts qui apportent les preuves, et des assets réutilisables pour le site, les salons, LinkedIn et vos rendez-vous commerciaux.",
  ],
  [
    "Un angle par cible",
    "Chaque module a son angle, son message et son moment dans le parcours client. Le bon message, pour la bonne cible, au bon moment.",
  ],
  [
    "L'intention créative",
    "Un principe narratif fort et un langage visuel et sonore tenu — ce qui fait qu'un film se retient au lieu de s'ajouter au bruit.",
  ],
  [
    "La structure narrative",
    "Séquence par séquence : l'intention, l'illustration, les moyens. Vous savez ce que vous achetez avant qu'on tourne.",
  ],
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

        {/*
          ⛔ SECTION STUDIO RETIRÉE LE 02/08/2026, ET IL NE FAUT PAS LA REMETTRE
          TELLE QUELLE. Elle affirmait « Un plateau à nous, à Lyon » au-dessus
          d'une photo tirée du groupe WhatsApp. Correction de Giz : ce plateau
          était ÉPHÉMÈRE et n'appartient pas à Bluevista. C'était donc une
          affirmation fausse — la faute même que ce fichier interdit plus haut
          au sujet des chiffres, commise cette fois sur une image.

          Ce qu'il y a de vrai et d'exploitable à la place : Enéide a racheté
          50 % du studio Streamset, dont Bluevista sera probablement bon client.
          À reprendre quand on aura des images de ce studio-là, et une
          formulation qui dise exactement le lien : partenaire, pas propriétaire.
        */}
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
                Notre méthode, en 5 temps
              </div>
              <ol className="space-y-6">
                {METHODE.map(([nom, texte], i) => (
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

      {/* ⑦ CLAIR — aperçu des réalisations ───────────────────────────────
          Manquait à la home : trois cas clients en preuve, c'est peu quand on
          a 145 réalisations. Cette section ouvre le portfolio, qui est le plus
          gros actif de contenu du site — et celui qui portera le référencement.
      */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SurTitre>Nos réalisations</SurTitre>
            <h2 className="text-[clamp(2.4rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
              145 films, et le vôtre.
            </h2>
          </div>
          <a
            href="#"
            className="rounded-md px-7 py-4 text-[15px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Voir toutes les réalisations
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/media/ref-clasquin.jpg", "Clasquin", "Événementiel"],
            ["/media/pilier-immersion.jpg", "Cémoi", "Immersion 360°"],
            ["/media/ref-ssp.jpg", "SSP", "Film corporate"],
            ["/media/ref-berliet.jpg", "Berliet", "Film social 3D"],
          ].map(([src, client, type]) => (
            <figure key={client} className="group">
              <div
                role="img"
                aria-label={`${client} — ${type}`}
                className="aspect-[4/3] overflow-hidden rounded-md bg-cover bg-center transition duration-700 group-hover:brightness-110"
                style={{ backgroundImage: `url('${src}')` }}
              />
              <figcaption className="mt-4">
                <div className="font-bold">{client}</div>
                <div className="text-sm opacity-55">{type}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ⑧ SOMBRE — l'appel final ───────────────────────────────────── */}
      <section style={{ background: SOMBRE, color: "#fff" }} className="py-28 text-center">
        <h2 className="mx-auto max-w-3xl px-8 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          Transformez votre communication en{" "}
          <span style={{ color: BLEU_CLAIR }}>résultats concrets</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl px-8 text-lg text-white/65">
          Parlons de vos objectifs avant de parler de format.
        </p>
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

      {/*
        PIED DE PAGE — il n'y en avait aucun jusqu'ici, sur aucune des versions.
        C'est pourtant lui qui porte les trois adresses, le sélecteur de langue,
        les mentions légales et les liens que Google suit d'une page à l'autre.
        Les trois implantations y sont écrites en clair : c'est aussi ce qui
        nourrit le référencement local sur Lyon, Paris et Genève.
      */}
      <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
        <div className="mx-auto grid max-w-[1500px] gap-14 px-8 py-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-bold tracking-tight">bluevista</div>
            <p className="mt-5 max-w-xs leading-relaxed text-white/55">
              Agence de communication &amp; marketing, d’événementiel et
              d’immersion. Depuis 2004.
            </p>
          </div>

          {[
            ["Lyon — siège social", ["8 rue Jean Élysée Dupuy", "69410 Champagne-au-Mont-d’Or", "+33 (0)4 72 34 51 89"]],
            ["Paris", ["92 avenue Victor Hugo", "92100 Boulogne-Billancourt"]],
            ["Genève", ["bluevista.ch", "Suisse romande"]],
          ].map(([ville, lignes]) => (
            <div key={ville as string}>
              <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU_CLAIR }}>
                {ville as string}
              </div>
              <address className="mt-4 not-italic leading-relaxed text-white/60">
                {(lignes as string[]).map(l => (
                  <div key={l}>{l}</div>
                ))}
              </address>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6 px-8 py-7 text-sm text-white/45">
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white">Mentions légales</a>
              <a href="#" className="hover:text-white">Politique de confidentialité</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
            <nav aria-label="Choix de la langue" className="flex gap-4">
              <a href="/" hrefLang="fr" className="font-semibold text-white">FR</a>
              <a href="/en" hrefLang="en" className="hover:text-white">EN</a>
              <a href="/es" hrefLang="es" className="hover:text-white">ES</a>
            </nav>
          </div>
        </div>
      </footer>

      <BarreAperçu actif={5} />
    </main>
  );
}
