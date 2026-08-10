import { EnTete } from "../_EnTete";
import { PiedDePage } from "../_PiedDePage";
import { MethodeChapeau } from "../_MethodeChapeau";
import { Temoignages } from "../_Temoignages";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, SOMBRE_PROFOND, TYPO } from "../_palette";
import { OFFRES as CATALOGUE } from "../_offres";

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
 * LES TROIS PILIERS — repassés au registre marketing le 10/08/2026.
 *
 * ⛔ CE QUE LA VERSION PRÉCÉDENTE PORTAIT, ET POURQUOI ÇA NE TENAIT PAS :
 *
 * · Les accroches étaient en verbes creux — « Amplifiez votre présence et
 *   convertissez votre audience » — la famille que le registre désigne comme
 *   le passage le plus faible d'une page. Et « Plongez votre audience dans
 *   des mondes sans limites » cumulait deux fautes : « plonger dans » est au
 *   lexique banni, « sans limites » est un superlatif sans source.
 *
 * · Le champ `probleme` échouait au test qui prime : « une autre agence
 *   vidéo pourrait-elle signer ce paragraphe ? ». *« Vous avez un message
 *   puissant, mais il se perd dans le bruit »* — oui, n'importe laquelle.
 *   ⚠️ Il faisait en plus DOUBLON avec le bloc d'ouverture « Par où l'on
 *   commence », qui dit désormais la situation du lecteur. Un pilier n'a pas
 *   à redire le problème : il doit dire la promesse et ce qu'elle change.
 *
 * 👉 D'où la structure du registre, § règle 5 : accroche → promesse → issue
 * rêvée. Aucun des trois ne parle de technique.
 *
 * ⭐ LES TROIS `issue` SONT VALIDÉES MOT POUR MOT par Giz dans
 * `bluevista-corporate/OFFRES-BLUEVISTA.md` (colonne « Issue — Site »). Elles
 * ne sont pas réécrites ici : c'est la version déjà dégonflée, celle qu'il a
 * retenue après « atténue le ton, elles abusent ».
 */

/**
 * ⛔ LES SERVICES VIENNENT DE `_offres.ts`, ILS NE SONT PLUS RECOPIÉS.
 *
 * L'ancienne liste datait d'un `offres_content_v2.md` périmé et contredisait
 * la taxonomie validée : elle plaçait le **vidéomapping dans DEUX piliers**
 * (communication ET événementiel), alors que le classement arrêté le rattache
 * à l'événementiel seul — « un mapping se vend avec un événement, pas avec un
 * casque ».
 *
 * 📌 `OFFRES-BLUEVISTA.md` le dit explicitement : ce document et `_offres.ts`
 * doivent rester d'accord, et c'est le document qui fait foi. Recopier une
 * troisième fois la liste ici garantissait qu'elle diverge — elle avait déjà
 * divergé.
 *
 * ⚠️ TENSION ASSUMÉE : le registre bannit « la grille de modules nommés »
 * (chaque case doit porter un bénéfice). Mais Giz a demandé l'inverse pour
 * CES cartes-là : « le NOM du pilier doit dominer, avec sa liste de services —
 * sans elle, on lit une promesse sans savoir de quel métier il s'agit ». La
 * règle de design prime ici, parce qu'elle répond à un défaut qu'il a
 * constaté à l'écran. La liste reste donc, mais au niveau OFFRE et non
 * produit : « Film de communication interne » dit le métier, « Jingles » non.
 */
const PILIERS = [
  {
    metier: "film" as const,
    nom: "Communication & Marketing",
    accroche: "Faites-vous comprendre, et faites-vous préférer",
    promesse:
      "Des films et des contenus courts pensés pour vos canaux, avec la stratégie de diffusion qui va avec et l’analyse de ce que chacun a rapporté.",
    issue: "Vos interlocuteurs vous prennent au sérieux avant le premier rendez-vous.",
    cta: "Voir nos projets de communication",
    image: "/media/px-pilier-communication.jpg",
  },
  {
    metier: "evenement" as const,
    nom: "Événementiel",
    accroche: "Marquez les esprits le jour J, et faites-en durer l’effet",
    promesse:
      "Des contenus scénographiés pour votre salle, et une diffusion pensée avant l’événement : ce qui sera filmé, pour qui, et sur quels canaux.",
    issue: "Vos participants repartent avec quelque chose à raconter — et ils le racontent.",
    cta: "Voir nos projets événementiels",
    image: "/media/px-pilier-evenementiel.jpg",
  },
  {
    metier: "immersion" as const,
    nom: "Immersion",
    accroche: "Faites essayer ce qu’on ne peut pas encore toucher",
    /* ⛔ CORRIGÉ le 10/08/2026. Ces deux textes recopiaient mot pour mot
       l'offre VR/AR — « des expériences VR et AR » et « à des milliers de
       kilomètres ». C'était FAUX pour la salle immersive, qui est précisément
       chez le client. Une accroche de pilier doit valoir pour ses trois
       offres, sinon le pilier ment sur deux tiers de son contenu. */
    promesse:
      "Des expériences conçues à partir de ce que le visiteur doit comprendre, pas à partir du matériel disponible — dans un casque, dans une salle ou depuis un navigateur.",
    issue: "Vos prospects essaient avant d’acheter, chez vous comme à l’autre bout du monde.",
    cta: "Voir nos projets immersifs",
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
    /*
      ⛔ NE PAS RÉÉCRIRE « le mouton à cinq pattes ». C'était la formulation
      précédente : elle vient de l'audit Rocket CEO, où c'est Giz lui-même qui
      emploie l'expression — mais en interne, pour décrire ses clients. Il ne
      l'a jamais aimée sur le site, et il a raison : l'image traite la demande
      du client comme une bizarrerie, alors qu'on veut dire l'inverse. Le
      client n'a pas une demande étrange, il a un projet complet.
    */
    titre: "Plus le projet est complexe, plus il est pour nous",
    texte:
      /* ⛔ « dans la même équipe » a été retiré : ça laisse déduire une petite
         structure (règle 3 du registre). Remplacé par un bénéfice client —
         l'énumération par trois est conservée. */
      "Un film, un mapping, une application VR et le dispositif qui les relie — sous le même budget, avec un seul interlocuteur, et sans coordination à votre charge. Les projets qui obligeraient à coordonner quatre prestataires sont exactement ceux qu’on prend en entier.",
  },
  {
    titre: "Le même métier depuis 2004, et quatre pôles internes",
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

/**
 * ⭐⭐ LES BALISES DE LA HOME — et c'est ici que se joue le plus gros gisement
 * du domaine. « agence vidéo » fait 7 845 impressions par an en position 22,9
 * pour 5 clics : la plus grosse visibilité non convertie du site.
 *
 * L'expression ne figurait NULLE PART dans le H1 ni le title de l'accueil.
 * Une page qui ne contient pas les mots qu'on tape ne peut pas remonter
 * dessus, quelle que soit la qualité du reste.
 *
 * ⛔ « Genève » n'y est pas, et c'est mesuré : la seule page /agence/ capte
 * déjà 236 impressions suisses pour zéro clic. Le site suisse est un site
 * parallèle — le référencer ici revient à lui prendre ses recherches sans
 * pouvoir les facturer.
 */
export const metadata = {
  title: "Agence vidéo à Lyon et Paris — film, événementiel, immersion | Bluevista",
  description:
    "Agence vidéo depuis 2004 : film d’entreprise, captation d’événement et expériences immersives. Conception, tournage, animation 3D et diffusion, en interne.",
};

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
            On conçoit, on fabrique,{" "}
            <span style={{ color: BLEU_CLAIR }}>on diffuse</span>.
          </h1>
          <p
            className="apparition-hero mt-8 max-w-2xl text-xl leading-relaxed text-white/85"
            style={{ "--retard": "1400ms" } as React.CSSProperties}
          >
            Agence vidéo, événementiel et immersion. Lyon, Paris et Genève,
            depuis 2004.
          </p>
          <div
            className="apparition-hero mt-11 flex flex-wrap items-center gap-4"
            style={{ "--retard": "1650ms" } as React.CSSProperties}
          >
            <a
              href="/apercu/contact"
              className="rounded-md px-9 py-4.5 text-[16px] font-bold text-white shadow-lg transition hover:brightness-110"
              style={{ background: BLEU, paddingTop: "1.05rem", paddingBottom: "1.05rem" }}
            >
              Contactez-nous
            </a>
            <button className="flex items-center gap-3.5 rounded-md border border-white/35 py-[1.05rem] pl-3 pr-7 text-[16px] font-semibold text-white transition hover:bg-white/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm" style={{ color: SOMBRE }}>▶</span>
              Voir le showreel
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
            /* ⛔ LES TROIS VILLES RESTENT — arbitrage de Giz, 10/08/2026 :
               « sur le site FR on parle bien de Lyon, Paris et Genève ».
               J'avais retiré Genève d'ici de ma propre initiative, en
               sur-appliquant une règle qui ne porte QUE sur les balises.
               ⚠️ LA FRONTIÈRE EST EXACTE : « Genève » n'entre ni dans un
               <title> ni dans un H1 de page FR — c'est là que se joue la fuite
               mesurée (236 impressions suisses pour zéro clic sur /agence/).
               Dans le CORPS de page, c'est un arbitrage commercial, et il est
               tranché : on cite les trois villes. */
            ["Lyon · Paris · Genève", "trois implantations"],
          ].map(([gros, petit]) => (
            <div key={gros}>
              <div className="text-[2rem] font-bold leading-none tracking-tight">{gros}</div>
              <div className="mt-2 text-sm text-white/50">{petit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ②bis SOMBRE — PAR OÙ ON ENTRE ─────────────────────────────────
          ⛔⛔ CE BLOC REMPLACE LES FRUSTRATIONS, qui ont été affectées à la
          page agence le 10/08/2026. Il fallait donc que la home ouvre
          autrement — mais sans revenir au défaut que le registre condamne :
          l'ancien site commençait par « Bienvenue à l'agence », c'est-à-dire
          par parler de soi.

          👉 Le principe est tenu autrement : on part de LA SITUATION du
          lecteur, pas de ses frustrations. Une frustration dit ce qui l'a
          fait souffrir la dernière fois ; une situation dit où il en est
          aujourd'hui. La première ouvre une page « agence » (on vient y
          jauger un partenaire), la seconde ouvre une page d'accueil (on vient
          y chercher qui fait quoi).

          ⭐ Et ce bloc fait le travail de routage : trois entrées, trois liens
          vers les pages métier. C'est le premier maillage interne de la page,
          placé là où l'attention est maximale.

          ⛔ PAS DE PIQUE ICI. Le registre en autorise une par page et jamais
          deux pages de suite — celle de la page agence (« Elle a un
          formulaire ») occupe la place pour ce parcours.

          📌 Chaque entrée porte une image ET un fait (règle mère) : la
          situation, puis les cas concrets qui la rendent reconnaissable. */}
      <section style={{ background: NOIR, color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <SurTitre sombre>Par où l’on commence</SurTitre>
          <h2 className={`max-w-3xl ${TYPO.titre}`}>
            La première question n’a pas changé depuis 2004 : qu’est-ce que ce
            projet doit produire ?
          </h2>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {[
              {
                situation: "Vous avez quelque chose à faire comprendre.",
                exemples:
                  "Un produit technique, une réorganisation, un métier qu’on explique mal en réunion. Le film sert à ce que tout le monde en reparte avec la même version.",
                lien: "/apercu/metier/film",
                libelle: "Communication & marketing",
              },
              {
                situation: "Vous avez une date qui ne bougera pas.",
                exemples:
                  "Une convention, un lancement, un anniversaire d’entreprise. Tout ce qui passera à l’écran se fabrique avant, parce que le jour J ne se rattrape pas.",
                lien: "/apercu/metier/evenement",
                libelle: "Événementiel",
              },
              {
                situation: "Vous avez quelque chose qu’on ne peut pas montrer en vrai.",
                exemples:
                  "Une machine de douze mètres, un bâtiment qui n’existe pas encore, un site à l’autre bout du monde. On le fabrique en 3D et on le met dans les mains du visiteur.",
                lien: "/apercu/metier/immersion",
                libelle: "Immersion",
              },
            ].map(e => (
              <div key={e.libelle} className="border-t-2 pt-6" style={{ borderColor: BLEU_CLAIR }}>
                <div className="text-[1.25rem] font-bold leading-snug">{e.situation}</div>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/65">{e.exemples}</p>
                <a
                  href={e.lien}
                  className="mt-5 inline-block text-[15px] font-semibold underline decoration-2 underline-offset-4 transition hover:opacity-70"
                  style={{ color: BLEU_CLAIR }}
                >
                  {e.libelle}
                </a>
              </div>
            ))}
          </div>
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
          {PILIERS.map((o, i) => (
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
                <p className="mt-5 leading-relaxed opacity-70">{o.promesse}</p>
                {/* ⭐ L'issue rêvée — ce que ça change chez lui, pas ce qu'on
                    livre. Les trois sont validées mot pour mot par Giz. */}
                <p className="mt-4 text-[1.0625rem] font-semibold leading-snug" style={{ color: BLEU }}>
                  {o.issue}
                </p>

                {/* Ce que le pilier contient concrètement — la pièce qui manquait. */}
                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {CATALOGUE.filter(c => c.metier === o.metier).map(c => c.nom).map(s => (
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
                  href={["/apercu/metier/film", "/apercu/metier/evenement", "/apercu/metier/immersion"][i]}
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
            Une méthode. Trois métiers.
          </h2>
          <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
            Six étapes, et elle recommence : le débriefing d’un projet ouvre
            l’analyse du suivant. Le premier et le dernier mot sont les mêmes
            pour un film, un événement ou un dispositif immersif — seul le
            milieu change de vocabulaire.
          </p>

          <div className="mt-20">
            <MethodeChapeau />
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
            href="/apercu/realisations"
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
      {/* ── L'APPEL FINAL ────────────────────────────────────────────────
          ⛔ SUR FOND CLAIR, ET C'EST UNE CORRECTION. Il était sombre, et le
          pied de page l'est aussi : deux bandes sombres collées se lisaient
          comme DEUX pieds de page. Giz : « étrange ton double footer ».
          Il n'y avait pourtant qu'une seule balise <footer> — le défaut
          était visuel, pas structurel, et c'est précisément pour ça
          qu'aucune vérification automatique ne pouvait l'attraper.
          Le fond clair rétablit l'alternance et redonne au pied de page son
          rôle : marquer la fin. */}
      <section style={{ background: CLAIR_SOUTENU }} className="py-28 text-center">
        {/* ⛔ « Transformez votre communication en résultats concrets » a été
            retiré : c'est la famille de verbes creux que le registre désigne
            comme le passage le plus faible d'une page (« Simplifiez…
            améliorez… centralisez… »), et « concrets » est un adjectif qui ne
            prouve rien.
            ⛔⛔ ET « DEMANDER UN DEVIS » AUSSI — le mot est banni de la prose
            de vente : « le mot devis est moche ». On écrit budget, ou rien.
            ⚠️ Nuance qui compte : l'interdit porte sur la PROSE. L'URL
            /contact-devis/ et sa balise gardent le mot, parce que neuf
            requêtes réelles le contiennent. Les balises ne sont pas de la voix.
            📌 Et la clôture PROPOSE des options au lieu de demander — son
            marqueur depuis quinze ans, avec `ensemble` comme mot de fin. */}
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          Voyons <span style={{ color: BLEU }}>ensemble</span> ce que votre
          projet doit changer.
        </h2>
        <p className="mx-auto mt-6 max-w-xl px-8 text-lg opacity-65">
          Parlons de vos objectifs avant de parler de format.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/apercu/contact"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Un appel de 30 minutes ?
          </a>
          <a href="/apercu/contact" className="rounded-md border-2 border-black/15 px-9 py-4 text-[16px] font-semibold">
            Ou décrivez-nous votre projet en trois lignes
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
      <PiedDePage />

    </main>
  );
}
