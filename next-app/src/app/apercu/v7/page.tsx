import { BasculePolice } from "../_BasculePolice";
import { BarreAperçu } from "../_commun";
import { EnTete } from "../_EnTete";
import { MethodeEnCercle } from "../_Methode";
import { Temoignages } from "../_Temoignages";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, SOMBRE_PROFOND, TYPO } from "../_palette";

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
 *    Seul chiffre autorisé ici : « depuis 2004 ».
 *    ⛔ « 145 films » A ÉTÉ RETIRÉ le 02/08/2026, sur correction de Giz, pour
 *    DEUX raisons distinctes et toutes deux importantes :
 *      · le compte est FAUX — 145 est le nombre de lignes du CSV du portfolio,
 *        c'est-à-dire de réalisations MISES EN LIGNE, pas de films produits.
 *        Bluevista en a fait bien davantage. Je l'avais présenté comme
 *        « vérifiable » : il l'était comme volume de portfolio, pas comme
 *        volume de production. Une source mal étiquetée reste une erreur.
 *      · et surtout, compter des FILMS positionne une maison de production.
 *        Bluevista se repositionne en agence de communication, d'événementiel
 *        et d'immersion : un compteur de films tire dans l'autre sens.
 *    Tout chiffre doit venir d'une source qui mesure ce qu'elle prétend
 *    mesurer, et servir le positionnement — pas seulement être exact.
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
    image: "/media/px-pilier-communication.jpg",
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
    image: "/media/px-pilier-evenementiel.jpg",
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
    image: "/media/px-pilier-immersion.jpg",
  },
];


/**
 * LES TROIS CAS — un par pilier, décision de Giz du 02/08/2026.
 *
 * C'était aussi la recommandation de l'audit Rocket CEO, mot pour mot :
 * « Crée 3 à 4 cas clients formalisés (secteurs différents) pour renforcer la
 * réassurance en RDV et dans les propositions. » Le même audit relevait le
 * manque : « Tu montres des projets, mais tu n'as pas de cas clients
 * formalisés. » Un projet montre ce qu'on sait faire ; un cas montre ce que
 * ça a produit. Toute la page bascule sur cette différence.
 *
 * Les trois projets sont vérifiés dans Podio. ⛔ LES CHIFFRES, NON — ils
 * restent vides tant que Giz ne les a pas sortis. Voir `chiffre`.
 */
const CAS = [
  {
    client: "Huiles Berliet",
    pilier: "Communication & marketing",
    contexte: "FOOH · film social 3D",
    image: "/media/ref-berliet.jpg",
    /**
     * ⚠️ À MESURER, pas à estimer. Giz veut comparer l'engagement de ce post
     * FOOH à celui des autres publications du compte. C'est le bon chiffre :
     * il compare la marque à elle-même, ce qu'aucun client ne peut contester.
     * Source : Instagram du client. Podio : V05384 (février) puis V05554.
     */
    chiffre: "",
    unite: "",
  },
  {
    client: "WorldSkills",
    pilier: "Événementiel",
    contexte: "Espace immersif · Eurexpo Lyon, pour GL Events Live",
    image: "/media/px-cas-worldskills.jpg",
    /**
     * ⚠️ PIÈGE — le même que « 145 films ». WorldSkills Lyon 2024 a accueilli
     * 250 000 visiteurs, chiffre public et largement repris. Ce n'est PAS le
     * public de l'espace immersif de Bluevista : c'est celui de la compétition
     * entière, sur tout Eurexpo. L'écrire tel quel serait s'attribuer
     * l'audience d'un salon. Il faut la fréquentation de l'espace lui-même,
     * que GL Events Live doit pouvoir donner.
     *
     * 📌 Et une correction de vocabulaire : Podio dit « ESPACE IMMERSIF »
     * (vente V05097), pas « mapping ». À vérifier avant d'écrire quoi que ce
     * soit sur la nature de la prestation.
     */
    chiffre: "",
    unite: "",
  },
  {
    client: "UNESCO",
    pilier: "Immersion",
    contexte: "Expérience VR · exposition Dive into Heritage, Paris",
    image: "/media/px-cas-unesco.jpg",
    /**
     * Vérifié dans Podio (V05498, via Decorama — GL Events) : exposition
     * organisée en marge de la 47e session du Comité du patrimoine mondial,
     * du 6 au 16 juillet 2025, à Paris. Bluevista a produit le contenu 3D et
     * l'expérience VR installée sur les casques.
     *
     * ⚠️ Bluevista intervenait sur le LOT contenu 3D, en sous-traitance de
     * Decorama qui portait l'ensemble. Le dire ainsi reste flatteur et exact ;
     * laisser croire qu'on a monté l'exposition entière serait faux.
     * ⚠️ Fréquentation à demander : l'expo n'avait que deux casques VR, la
     * mesure est donc un nombre de sessions, pas de visiteurs.
     */
    chiffre: "",
    unite: "",
  },
];

/**
 * CE QUI NOUS DISTINGUE — réécrit le 02/08/2026, sur accord de Giz.
 *
 * Ce qu'il y avait avant venait mot pour mot de la maquette Manus :
 *   « Des résultats mesurables et orientés business »
 *   « Un processus fluide de la stratégie à la livraison »
 *   « Une équipe proche qui comprend vraiment votre business »
 * Trois phrases que n'importe quelle agence de France peut signer sans
 * changer un mot. Une différence que le concurrent peut recopier n'est pas
 * une différence — c'est une case cochée.
 *
 * 👉 Le test appliqué à chaque bloc : est-ce qu'un concurrent peut écrire la
 * même chose ? Si oui, il saute. J'ai regardé les cinq sites cités par Giz —
 * KabochArts, Stetoo, Les Pingouins, EO Prod, White Mirror — et gardé
 * uniquement ce qu'AUCUN d'eux ne peut revendiquer.
 *
 * Source du fond : audit marketing Rocket CEO, juin 2025, qui identifiait
 * déjà le vrai différenciateur et reprochait de ne pas le mettre en avant :
 * « Un positionnement différenciant basé sur l'intelligence créative. Tu te
 * positionnes comme une structure capable de répondre à des demandes
 * complexes (les moutons à 5 pattes) avec une vision globale des projets. Tu
 * ne fais pas "juste un film" : tu penses stratégie, diffusion, format…
 * C'est une vraie force, À VALORISER DAVANTAGE dans ta communication. »
 *
 * ⛔ Règle de Giz respectée : on ne dit pas ce qu'on n'est pas. Aucun de ces
 * trois blocs ne se compare à un concurrent ni ne nie quoi que ce soit.
 */
const DIFFERENCE = [
  {
    titre: "Le mouton à cinq pattes, c’est notre demande préférée",
    texte:
      "Un film, un mapping, une appli VR et le dispositif qui les relie — dans la même équipe, sous le même budget, avec un seul interlocuteur. Les projets qui obligent à coordonner quatre prestataires sont exactement ceux qu’on prend en entier.",
  },
  {
    titre: "Vingt ans dans le même métier, et quatre pôles internes",
    texte:
      "Vidéo, son, infographie, développement. Rien ne part en sous-traitance à l’aveugle, personne ne découvre le projet à la livraison. C’est ce qui permet de tenir une date d’événement — celles qui ne se décalent jamais.",
  },
  {
    titre: "On revient six mois après, avec les chiffres",
    texte:
      "Ce qui a marché, où les spectateurs décrochent, ce qu’on change au suivant. Le débriefing d’un projet ouvre l’analyse du suivant : c’est la boucle qui fait qu’un client reste, et la raison pour laquelle notre méthode est un cercle et pas une ligne.",
  },
];

/** Sur-titre de section : le repère visuel qui manquait entre les chapitres. */
function SurTitre({ children, sombre = false }: { children: string; sombre?: boolean }) {
  return (
    <div
      className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`}
      style={{ color: sombre ? BLEU_CLAIR : BLEU }}
    >
      <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: sombre ? BLEU_CLAIR : BLEU }} />
      {children}
    </div>
  );
}

export default function V7() {
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
        {/*
          LE SHOWREEL EN FOND — enfin. L'image Clasquin n'était qu'un
          bouche-trou.

          L'image d'attente montre TOUTE L'ÉQUIPE sur le bleu de marque, avec
          le clap « Showreel 2026 », un casque VR, un drone et une caméra.
          Elle dit donc à la fois qui ils sont ET l'étendue des métiers — sans
          qu'on ait besoin d'une section « équipe » ni d'un décompte de films.

          ⚠️ Extrait de 24 s, 1280 px, 2,6 Mo. Le poster (77 Ko) s'affiche le
          premier et porte donc la mesure de vitesse de Google ; la vidéo
          arrive derrière. Muette et sans commande : c'est un décor, pas un
          lecteur. Ceux qui coupent les animations ne voient que le poster.
        */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/media/showreel-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/media/showreel-hero.mp4" type="video/mp4" />
        </video>
        {/*
          Voile de lisibilité ancré en bas à gauche, là où vit le texte.
          Il arrive AVEC le texte, pas avant : pendant la première seconde le
          showreel est vu tel quel, sans filtre posé dessus. C'est là tout
          l'intérêt de l'entrée différée — sinon on assombrit une image que
          personne n'a encore eu le temps de regarder.
        */}
        <div
          className="voile-hero absolute inset-0"
          style={{
            background: `linear-gradient(105deg, ${NOIR}F5 0%, ${NOIR}B0 38%, ${NOIR}35 68%, transparent 100%)`,
          }}
        />
        <div
          className="voile-hero absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${NOIR}D0 0%, transparent 42%)`,
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-8 pt-28 text-white">
          {/*
            L'entrée différée. Les trois blocs arrivent l'un après l'autre —
            un décalage court, sinon on attend au lieu de découvrir.
            1,1 s pour le titre : le temps de comprendre qu'on regarde une
            image, pas encore de s'impatienter.
          */}
          <h1
            className="apparition-hero max-w-[19ch] text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em]"
            style={{ "--retard": "1100ms" } as React.CSSProperties}
          >
            Transformez votre communication en{" "}
            <span style={{ color: BLEU_CLAIR }}>résultats concrets</span>
          </h1>
          <p
            className="apparition-hero mt-8 max-w-2xl text-xl leading-relaxed text-white/85"
            style={{ "--retard": "1400ms" } as React.CSSProperties}
          >
            Agence de communication &amp; marketing, d’événementiel et
            d’immersion. Depuis 2004, à Lyon, Paris et Genève.
          </p>
          <div
            className="apparition-hero mt-11 flex flex-wrap items-center gap-4"
            style={{ "--retard": "1650ms" } as React.CSSProperties}
          >
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
        <div
          className="apparition-hero absolute inset-x-0 bottom-8 z-10 flex justify-center"
          style={{ "--retard": "2000ms" } as React.CSSProperties}
        >
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
            ["4 pôles", "vidéo · son · infographie · développement"],
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
          <SurTitre sombre>Avant / après</SurTitre>
          <h2 className={`max-w-3xl ${TYPO.titre}`}>
            Ce que ça a changé, chez eux.
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/55">
            Un projet par métier. Le même exigence de résultat sur les trois.
          </p>
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
                      0{i + 1} — {c.pilier}
                    </div>
                    <div className="mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
                      {c.client}
                    </div>
                    <div className="mt-3 text-[15px] text-white/60">{c.contexte}</div>
                  </div>
                  <div className="rounded-md border border-dashed border-white/30 px-7 py-5">
                    <div className="text-4xl font-bold tabular-nums" style={{ color: BLEU_CLAIR }}>
                      {c.chiffre || "—"}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-white/55">
                      {c.unite || "chiffre à obtenir du client"}
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
        <SurTitre>Ce qu’on fait pour vous</SurTitre>
        <h2 className={`max-w-3xl ${TYPO.titre}`}>
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

      {/* ⑤ SECTION « SUR LE TERRAIN » SUPPRIMÉE LE 02/08/2026 ──────────────
          ⛔ NE PAS LA REMETTRE SANS IMAGES D'UN AUTRE NIVEAU.

          Giz, sans détour : « JE NE VEUX PAS VENDRE DES TOURNAGES DE SPORT
          BOULES, on passe pour une petite agence ». Il a raison, et la faute
          était la mienne : les images disponibles montraient des captations
          de tournois locaux et de stands de salon. Sur une page qui cite
          l'ONU, l'UNICEF et la BBC, ces photos ne prouvaient pas le métier —
          elles rabaissaient l'échelle.

          👉 Une preuve qui contredit le niveau du reste fait plus de mal que
          l'absence de preuve. Et la fonction de cette section — montrer une
          équipe réelle — est DÉJÀ remplie par l'image d'accueil.

          Ce qu'il faudrait pour la rouvrir : des coulisses au niveau des
          références citées — mapping monumental, plateau, VR, réunion de
          conception. Pas avant.
      */}

      {/* ⑥ CLAIR SOUTENU — la différence, puis la méthode en cercle ────
          Giz : « je veux que chaque message soit impactant, la page d'accueil
          est un parcours ». Cette section porte donc les deux choses qui
          doivent rester à la fin du parcours : ce qui les distingue, et
          comment ils travaillent.
      */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <SurTitre>Ce que vous y gagnez</SurTitre>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Ce qui nous distingue
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {DIFFERENCE.map((d, i) => (
              <div key={d.titre} className="border-t-2 pt-6" style={{ borderColor: BLEU }}>
                <div className="mb-3 text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                  0{i + 1}
                </div>
                <p className={TYPO.sousTitre}>{d.titre}</p>
                {/* La section était « très pauvre » (Giz) : trois titres et rien
                    en dessous. Un titre pose l'affirmation, il ne la prouve pas. */}
                <p className={`mt-4 ${TYPO.corps}`}>{d.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ CLAIR — la méthode, en cercle ─────────────────────────────────
          Idée de Giz, et elle est juste : sa méthode BOUCLE, un cercle le dit
          sans qu'on ait à l'écrire. Une frise verticale disait l'inverse.
          Le détail vit dans _Methode.tsx, composant client — c'est le seul
          endroit interactif de la page, et il est chargé à part.
      */}
      <section>
        <div className="mx-auto max-w-[1500px] px-8 py-28">
          <SurTitre>De l’analyse au débriefing</SurTitre>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Six étapes. Et elle recommence.
          </h2>
          <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
            Le débriefing d’un film ouvre l’analyse du suivant. C’est ce qui
            sépare une agence d’un exécutant à la commande.
          </p>

          <div className="mt-20">
            <MethodeEnCercle jeu="pexels" />
          </div>
        </div>
      </section>

      {/* ⑦bis SOMBRE — les témoignages, en vidéo ────────────────────────
          Remis à la demande de Giz. Sa lecture était juste : la page
          n'apportait aucune parole extérieure — tout ce qu'on y lisait était
          écrit par Bluevista sur Bluevista.

          Placé ICI, et pas ailleurs, pour une raison : la section précédente
          affirme une méthode. Un client qui dit « ça s'est passé comme ça »
          juste après est la seule chose qui puisse la valider. Avant la
          méthode, il n'aurait rien à confirmer.

          Le fond sombre isole la séquence du reste : on change de voix, la
          page change de couleur.

          ⛔ Contenu factice et verrouillé — voir l'avertissement en tête de
          _Temoignages.tsx. La maquette Manus contenait un faux témoignage
          signé du nom d'un collaborateur de Bluevista.
      */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 py-28">
          <SurTitre sombre>Sans filtre</SurTitre>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            On préfère les laisser le dire.
          </h2>
          <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
            Trois clients, filmés chez eux, sans script.
          </p>

          <div className="mt-16">
            <Temoignages jeu="pexels" />
          </div>
        </div>
      </section>

      {/* ⑧ CLAIR SOUTENU — les clients, en logos gris ───────────────────
          ⛔ PLUS DE CLASSEMENT PAR FAMILLES. Correction de Giz : ranger ses
          clients en « Institutions / Médias / Entreprises » reproduisait le
          plan de son dossier d'appel d'offres — « c'est pas créatif ». Son
          ancien site les affichait en logos gris ; on y revient.

          Les logos sont extraits de son mémoire technique et désaturés. Le
          gris uniforme sert deux choses : il évite la foire aux couleurs, et
          il met les marques sur un pied d'égalité — personne n'est mis en
          avant, ce qui est aussi plus prudent vis-à-vis des clients.

          ⚠️ Basse définition (issus d'un PDF). À remplacer par les fichiers
          d'origine avant mise en ligne.
      */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <SurTitre>Depuis 2004</SurTitre>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Des institutions, des médias, des industriels.
          </h2>

          <div className="mt-16 grid grid-cols-2 items-center gap-x-12 gap-y-14 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 12 }, (_, i) => (
              <img
                key={i}
                src={`/media/logos/client-${String(i + 1).padStart(2, "0")}.png`}
                alt=""
                className="mx-auto h-9 w-auto max-w-full opacity-45 transition duration-300 hover:opacity-80"
              />
            ))}
          </div>

          <p className="mt-14 max-w-3xl leading-relaxed opacity-55">
            Et aussi&nbsp;: ONU-OHCHR, UNICEF, UNECE, UIT, BBC, France 3, M6,
            NHK, Musée des Confluences, Ville de Lyon, ABB, Cisco, EDF, Enedis,
            Procter&nbsp;&amp; Gamble, Sodexo, Vinci Construction.
          </p>
        </div>
      </section>

      {/* ⑨ CLAIR — aperçu des réalisations ───────────────────────────────
          Manquait à la home : trois cas clients en preuve, c'est peu. Cette
          section ouvre le portfolio, qui est le plus gros actif de contenu du
          site et celui qui portera le référencement.

          ⛔ Pas de décompte de films dans le titre : compter des films
          positionne une maison de production, pas une agence multi-services.
      */}
      <section className="mx-auto max-w-[1500px] px-8 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SurTitre>En images</SurTitre>
            <h2 className={TYPO.titre}>
              Ce qu’on a fait pour eux.
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
            ["/media/px-mapping.jpg", "Cémoi", "Immersion 360°"],
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
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
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
      {/*
        ⛔ NE JAMAIS ÉCRIRE « bureau commercial » POUR PARIS NI GENÈVE.
        Décision de Giz, 02/08/2026. Le mémoire technique le dit en interne,
        mais ça n'a rien à faire sur le site : ces deux villes portent des
        pages qui comptent parmi ses meilleurs actifs de référencement
        (« studio animation 3D Paris », « réalisation vidéo Genève »), et les
        présenter comme de simples points de vente les affaiblirait.

        La règle : on cite les villes SANS les qualifier — c'est exact et ça ne
        déclasse rien. Ce qui reste interdit, à l'inverse, c'est d'affirmer
        qu'il y a des STUDIOS à Paris ou à Genève : ce serait faux.
      */}
      <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
        <div className="mx-auto grid max-w-[1500px] gap-14 px-8 py-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            {/*
              ⛔ LE LOGO EST UNE IMAGE, PAS DU TEXTE — même règle qu'en tête
              de page. « bluevista » composé en gras était encore ici : la
              correction n'avait été appliquée qu'à l'en-tête.
            */}
            <img src="/media/logo-bluevista-blanc.png" alt="Bluevista" className="h-7 w-auto" />
            <p className="mt-5 max-w-xs leading-relaxed text-white/55">
              Agence de communication &amp; marketing, d’événementiel et
              d’immersion. Toute la chaîne de production en interne,
              depuis 2004.
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

      <BasculePolice />
      <BarreAperçu actif={7} />
    </main>
  );
}
