import { EnTete } from "./EnTete";
import { CarrouselHistoires } from "./CarrouselHistoires";
import { LecteurVideo } from "./LecteurVideo";
import { PiedDePage } from "./PiedDePage";
import { MethodeChapeau } from "./MethodeChapeau";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "./palette";
import { liens } from "../shared/liens";

/**
 * LA PAGE AGENCE — texte validé avec Giz le 10/08/2026.
 *
 * ⛔ NE PAS RÉÉCRIRE CE TEXTE sans avoir chargé le registre marketing :
 * `partageable/savoir/reference/voix-marketing.md` (les règles) et
 * `partageable/savoir/exemples/voix/marketing.md` §12 (quatre versions de
 * cette page corrigées en direct par Giz, avec ses verdicts verbatim).
 * Le texte de référence vit dans `bluevista-corporate/TEXTE-PAGE-AGENCE.md`.
 *
 * ⛔⛔ LA FAUTE QUI A FAIT ÉCHOUER TROIS VERSIONS : la prose de voix off
 * descendue dans le corps de page. « Nous commençons avant. » → sa réaction :
 * « avant quoi ??????? ». La grammaire du corps est la phrase PLEINE — sujet,
 * verbe, complément, bénéfice attaché par `qui` / `sans` / `afin de`. Le court
 * qui claque est réservé aux titres. ⚠️ Le piège est qu'une phrase courte
 * SONNE réussie à la relecture, alors qu'elle oblige à un décodage que le
 * lecteur ne fera pas. En cas de doute : écrire plein.
 *
 * ── CE QUE CETTE RÉÉCRITURE A DÛ CORRIGER DANS LA VERSION PRÉCÉDENTE ──────
 * ⛔ « Quatre pôles sous le même toit » — la famille domestique est bannie
 *    (maison, atelier, nos murs, sous le même toit) : un lieu dit toujours
 *    une taille, et une petite. L'argument n'est pas un lieu, c'est la
 *    continuité.
 * ⛔ « Vingt ans dans le même métier » — règle de marque : « depuis 2004 »,
 *    jamais un nombre d'années.
 * ⛔ La grille de cinq portraits + la photo de groupe — règle 3 : aucune
 *    photo où l'on peut compter les têtes. On montre des gens AU TRAVAIL
 *    (montage, tournage, régie) et on cite les MÉTIERS, pas les personnes.
 * ⛔ « Genève » a disparu du corps de cette page. La page capte déjà 236
 *    impressions suisses pour ZÉRO clic — c'est la fuite exacte que le
 *    cloisonnement FR/CH veut empêcher. Le pied de page garde l'adresse
 *    (c'est un élément de contact) ; la page de positionnement, non.
 *
 * ── LE RÔLE SEO, MESURÉ ───────────────────────────────────────────────────
 * `/agence/` fait 38 clics/an, TOUS en requêtes de marque. Ce n'est pas une
 * page d'acquisition. Son rôle est triple : capter la marque · se positionner
 * sur « agence de production audiovisuelle Lyon » · et surtout DISTRIBUER les
 * liens internes vers les pages qui rankent.
 * ⛔ Ne pas y mettre les mots-clés des pages compétence (« studio animation
 * 3D Lyon », « vidéo mapping ») autrement qu'en ANCRE DE LIEN : les répéter
 * en corps de texte créerait la cannibalisation que le plan de site évite.
 */

/**
 * LES QUATRE PÔLES — l'argument que personne ne peut recopier. Les
 * concurrents relevés sont tous mono-métier.
 *
 * ⚠️ On nomme les MÉTIERS sans les compter (règle 3) : c'est ce qui permet
 * de dire l'intégration sans donner de signal de taille.
 */
/**
 * LES QUATRE PÔLES — refondus le 21/08/2026, sur la direction de Giz.
 *
 * ⛔ CE QUI NE TENAIT PLUS : « Vidéo » et « Son » séparés. Giz : « ne pas
 * séparer vidéo et son, mettre tout ça sous contenu vidéo ». Il a raison, et
 * pas seulement pour la forme — personne n'achète du son tout seul. Les
 * séparer donnait deux cases de production là où le client voit un livrable.
 *
 * ⭐ ET LE PÔLE QUI MANQUAIT : la CONCEPTION. Giz : « on coordonne des projets
 * events maintenant ». C'est vérifiable, pas déclaratif — sur WorldSkills, le
 * devis facture une « conception scénographique », un « bureau d'étude » et
 * des journées d'accompagnement technique, en plus des contenus. Sur UNESCO,
 * un « apport au scénario » et de la gestion sur place. Ce travail-là existait
 * déjà et n'apparaissait nulle part sur le site.
 *
 * ⚠️ LA COORDINATION EST DANS « CONCEPTION », PAS EN CINQUIÈME PÔLE. Un pôle
 * décrit un métier qu'on exerce ; coordonner n'est pas un métier de plus, c'est
 * ce que fait la conception quand le projet mobilise les trois autres.
 */
const POLES = [
  {
    nom: "Conception",
    detail:
      "Le concept, le scénario, la direction artistique — et la coordination quand un projet mobilise plusieurs métiers à la fois. Le pôle qui travaille avant qu’on filme quoi que ce soit.",
  },
  {
    nom: "Contenu vidéo et son",
    detail:
      "Tournage, montage, harmonisation des couleurs, prise de son, voix off, création sonore. Le son ne se rajoute pas à la fin : c’est ce qu’on entend en premier quand c’est mal fait.",
  },
  {
    nom: "Infographie",
    detail:
      "Motion design, animation et modélisation 3D, pour montrer l’intérieur, l’invisible et le pas-encore-construit.",
  },
  {
    nom: "Développement",
    detail:
      "Applications VR, dispositifs interactifs, plateformes. C’est ce pôle qui permet de prendre un projet en entier.",
  },
];

/**
 * LES FRUSTRATIONS — écrites DEPUIS CHEZ LE CLIENT, pas depuis la production.
 *
 * ⛔ La première version listait ce qui agace Giz (réunions de validation,
 * film que personne ne regarde). Son verdict : « ce ne sont pas de vraies
 * frustrations car le client ne vit pas ça ».
 *
 * ⛔⛔ LE BLOC DOIT ÊTRE INTRODUIT, et c'est la faute la plus vicieuse de la
 * série : sans phrase d'amorce, le « on vous demande tout » se lit comme si
 * c'était BLUEVISTA qui le faisait. Verdict de Giz : « les frustrations sont
 * envoyées de la même manière que si c'est ce que l'on faisait ! »
 *
 * ⛔ AUCUNE RÉPONSE DANS CE BLOC. Les réponses viennent après. Et pas de note
 * backstage ici — Giz s'est repris explicitement : « on ne répond pas à une
 * frustration ».
 */
const FRUSTRATIONS = [
  {
    titre: "On vous demande tout",
    texte:
      "Le brief, les textes, les visuels, les contacts, les autorisations : vous fournissez tout et vous relancez vos collègues, alors que vous aviez confié le projet.",
  },
  {
    titre: "Le projet prend du retard, pas votre date",
    texte: "L’événement, lui, ne se décale pas.",
  },
  {
    titre: "Vous répétez les mêmes demandes",
    texte:
      "Vous redites la même chose à chaque étape, parce que la personne qui vous écoute n’est jamais celle qui exécute.",
  },
  {
    titre: "Chaque ajout devient une option",
    texte:
      "Le budget que vous aviez fait valider en interne ne tient plus, parce que chaque demande se transforme en supplément.",
  },
];

/**
 * LES CONVICTIONS — et non des valeurs.
 *
 * ⭐ LA DISTINCTION, posée par Giz le 10/08 : la valeur se proclame, la
 * conviction se vérifie. Le test : une conviction peut être démentie par les
 * faits. Une valeur, non. « Nous sommes rigoureux » ne peut pas être pris en
 * défaut — donc on le coupe. Les trois ci-dessous engagent.
 */
const CONVICTIONS = [
  "Un concept n’est retenu que si nous sommes fiers de le produire.",
  "Un projet qui n’est pas diffusé n’a rien produit : la diffusion fait partie du travail, pas des options.",
  "Vous nous exposez un problème, nous vous proposons une solution — et quand nous ne sommes pas d’accord, nous le disons.",
];

/**
 * TROIS HISTOIRES — transcrites des vidéos « anecdotes » de Giz (15/10/2025).
 *
 * ⛔ LES CHIFFRES SONT LES SIENS, mot pour mot : « ils étaient à peu près
 * 2000 » (Cannes), « ses 1000 collaborateurs » (Malte), « à peu près x10 sur
 * leur compte » (Berliet). Aucun n'est arrondi vers le haut, aucun n'est
 * déduit. Si l'un doit bouger, c'est lui qui le corrige.
 *
 * ⚠️ « x10 » EST UN RAPPORT, PAS UN VOLUME. Giz précise « par rapport à leur
 * vue habituelle et par rapport à leur like habituel ». Écrire « 10 fois plus
 * de vues » sans ce repère laisserait croire à un chiffre absolu.
 *
 * ⚠️ FOOH : Giz dit « Foreign Out of Home ». Le terme du métier est « Fake
 * Out Of Home ». On écrit la version juste, et on lui signale.
 */
/* ⭐ L'AFFICHE DE « BARILS » N'EST PAS UN PLAN DE PAROLE. Celle que Livid
   avait choisie tombait sur un mouvement de bouche — Giz : « la miniature est
   très moche ». On a pris l'image à 34 s : les barils qui roulent sur la place
   Bellecour, Fourvière sur la colline. Une affiche doit montrer le TRAVAIL,
   pas quelqu'un qui en parle. */
const HISTOIRES = [
  {
    titre: "Le montage suivait le car",
    video: "https://livid.com/watch/PJp_0DaZq5C2",
    affiche: "/media/anecdote-malte.jpg",
    duree: "1 min 15",
    texte:
      "Un séminaire de mille collaborateurs à Malte, sur plusieurs lieux — plage, hôtel, bateau, soirée. Une équipe de trois : deux à la caméra, un au montage. Le monteur montait pendant les trajets, dans le car. La dernière séquence a été tournée cinq minutes avant la diffusion : deux participants se remémorant leur journée.",
    chute: "Le film de la journée a été projeté le soir même, dans la soirée.",
  },
  {
    titre: "La demande arrivée le premier jour",
    video: "https://livid.com/watch/8bFaVBE38-A_",
    affiche: "/media/anecdote-cannes.jpg",
    duree: "1 min 07",
    texte:
      "Une convention à Cannes, environ deux mille personnes. Le dispositif était calé : captation, films diffusés pendant la convention, aftermovie. En installant le matériel, le client propose d’interviewer ses collaborateurs devant le Palais des Festivals, pour les faire patienter à l’entrée de la salle.",
    chute:
      "On a déclenché le monteur plus tôt et décalé l’aftermovie. Les interviews ont été diffusées le jour même.",
  },
  {
    titre: "Des barils qui traversent Lyon",
    video: "https://livid.com/watch/6xYf4WRlTlm8",
    affiche: "/media/anecdote-berliet.jpg",
    duree: "1 min 13",
    texte:
      "Un client fêtait un anniversaire avec un nouveau visuel de barils d’huile, et voulait de la visibilité. Plutôt qu’un film de présentation envoyé sur les réseaux — ce qui n’y marche pas — nous avons proposé un FOOH : des barils géants qui traversent la ville, filmés comme une scène de rue.",
    chute:
      "Le post a fait environ dix fois leurs vues et leurs likes habituels.",
  },
];

/**
 * PHOTOS AU TRAVAIL. Jamais un groupe posé, jamais de tête à compter.
 *
 * ⛔⛔ TROIS DES QUATRE ÉTAIENT DES PHOTOS DE BANQUE D'IMAGES — préfixe `px-`,
 * celui des visuels de gabarit. Une page qui dit « la compétence est ici »
 * l'illustrait avec des photos achetées. Remplacées le 21/08/2026 par des
 * images du Cloud Store, une fois celui-ci remonté.
 *
 * ⛔ LES LIBELLÉS ONT CHANGÉ, ET C'EST VOULU. L'ancienne série annonçait
 * « En conception / En montage / En test » : je n'ai trouvé au Cloud Store
 * aucune photo de conception ni de montage. Garder les mots en collant
 * dessous une image qui montre autre chose, c'est la faute que je viens de
 * corriger trois fois sur les actualités. On nomme ce qu'on montre.
 *
 * ⚠️ ET J'AI FAILLI ME TROMPER SUR LA PREMIÈRE VERSION. Sur la planche de
 * contact j'avais lu « quelqu'un avec des manettes VR sur fond vert ». En
 * ouvrant la photo : c'est un DÉFROISSEUR. Une vignette de 180 pixels ne se
 * lit pas, elle se devine — et deviner, c'est inventer.
 *
 * ⛔⛔ ET MÊME JUSTE, ELLE ÉTAIT MAUVAISE. Giz : « un stagiaire avec un fer à
 * repasser à la main sur un petit fond vert, ça fait pas rêver ». Le reproche
 * ne porte pas sur l'exactitude : une photo peut être vraie ET dire le
 * contraire de ce qu'on vend. Celle-ci disait « petite agence » sur une page
 * dont l'argument est qu'on prend un projet en entier.
 * 👉 Les quatre actuelles montrent chacune une ÉQUIPE au travail, à l'échelle
 * d'un vrai chantier : repérage sur plans, tournage sur un stand, accroche
 * d'un projecteur sur structure, régie de direct à quatre.
 */
const AU_TRAVAIL = [
  ["/media/coulisses-reperage.jpg", "En repérage"],
  ["/media/coulisses-interview.jpg", "En tournage"],
  ["/media/coulisses-installation.jpg", "En installation"],
  /* ⚠️ RETOUR À CETTE PHOTO-CI le 21/08. J'avais préféré une régie à quatre
     personnes, pour montrer une équipe. Giz : « celle-ci est moins bien
     rangée ». Il a raison — sur une page qui vend la maîtrise, un plan de
     travail encombré dit le contraire du propos, même s'il montre plus de
     monde. L'ordre à l'image compte autant que ce qu'il y a dedans. */
  ["/media/coulisses-regie-direct.jpg", "En régie"],
];

/**
 * ⛔ LES BALISES, validées le 10/08/2026 — et elles ne sont PAS de la voix.
 * Un `<title>` porte le mot que les gens tapent, pas une accroche.
 * ⛔⛔ « Genève » n'y figure pas, et c'est mesuré : cette page capte déjà 236
 * impressions suisses pour ZÉRO clic. Le mettre dans une balise aggraverait
 * la fuite que le cloisonnement FR/CH cherche à fermer.
 */

export function CorpsAgence({  publique }: {  publique?: boolean }) {
  const L = liens(publique);
  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque publique={publique} />

      {/* ── L'ACCROCHE ───────────────────────────────────────────────────
             ⛔ Le H1 porte le mot que les gens tapent — « agence de
             production vidéo et audiovisuelle ». « audiovisuelle » est présent
             dans presque toutes les requêtes qui atteignent cette page, et
             elle est déjà en position 1 à 2 dessus.
             ⛔ PAS de « Genève » ici. */}
      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-20 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            L’agence
          </div>
          <h1 className="max-w-[22ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Agence de production vidéo et audiovisuelle depuis 2004
          </h1>
          <p className="mt-8 max-w-2xl text-[1.35rem] font-semibold leading-snug">
            Vous nous confiez un sujet, pas un dossier.
          </p>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
            Sur chaque étape de votre projet vidéo, la compétence est ici :
            c’est pourquoi nous réalisons l’essentiel en interne. Un renfort
            extérieur ne change rien à qui répond du résultat.
          </p>
        </div>
      </section>

      {/* ── LES FRUSTRATIONS ─────────────────────────────────────────────
             Le bloc qui fait la différence entre un site qui se présente et un
             site qui vend : on nomme le problème du client AVANT de parler de
             soi. L'ancien site ouvrait sur « Bienvenue à l'agence ».
             ⛔ Ce bloc vit ICI et pas sur la home (décision du 10/08). */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Si vous avez déjà confié un projet à une agence, ces situations vous
            diront quelque chose.
          </h2>

          <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {FRUSTRATIONS.map(f => (
              <div key={f.titre} className="border-t-2 pt-6" style={{ borderColor: BLEU_CLAIR }}>
                <div className="text-[1.25rem] font-bold leading-snug">{f.titre}</div>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/65">{f.texte}</p>
              </div>
            ))}
          </div>

          {/* ── LA PIQUE — une seule par page, jamais deux pages de suite.
                 ⭐ Ce qui la rend admissible : le lecteur y est la VICTIME du
                 travers, jamais l'auteur. C'est le critère qui a fait écarter
                 « Un film meurt en réunion de validation » — là, c'est le
                 lecteur qui organise les réunions.
                 ⛔ Elle vise une PRATIQUE, jamais une maison ni une personne.
                 ⚠️ Elle est immédiatement payée par la preuve : la méthode
                 qui suit. */}
          <p
            className="mt-16 max-w-3xl text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-snug"
            style={{ color: BLEU_CLAIR }}
          >
            Une agence qui vous demande tout n’a pas de méthode. Elle a un
            formulaire.
          </p>
        </div>
      </section>

      {/* ── LA MÉTHODE — la preuve qui paie la pique ─────────────────────── */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-28">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
            Notre méthode
          </div>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Six étapes simples et une boucle d’amélioration.
          </h2>

          <p className={`mt-8 max-w-3xl ${TYPO.chapo}`}>
            Avant toute production, nous analysons vos communications existantes
            et leurs résultats.
          </p>
          <p className={`mt-5 max-w-3xl ${TYPO.corps}`}>
            Des points d’étape réguliers et définis, qui vous font gagner du
            temps sans perdre en flexibilité.{" "}
            {/* ⭐ LE GIMMICK — phrase sérieuse, puis note backstage. C'est sa
                parenthèse d'aparté du registre mail qui trouve enfin sa forme
                web. Le contraste fait tout le travail : la principale tient le
                registre professionnel, l'aparté descend d'un cran vers le
                parlé et désamorce. ⛔ Une par page — sinon « c'est redondant
                et chiant ». */}
            <em className="opacity-70">
              (On sait bien qu’il y aura toujours quelques modifications de
              dernière minute. Elles ne remettent pas le concept en cause.)
            </em>
          </p>
          <p className={`mt-5 max-w-3xl ${TYPO.corps}`}>
            Le concept vous arrive chiffré dès la conception, et la même méthode
            vaut pour{" "}
            {/* 🔗 Trois liens internes demandés par le texte validé. C'est le
                vrai rôle SEO de cette page : distribuer vers ce qui range. */}
            <a href={L.metier("film")} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              un film
            </a>
            ,{" "}
            <a href={L.metier("evenement")} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              un événement
            </a>{" "}
            ou{" "}
            <a href={L.metier("immersion")} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              une expérience immersive
            </a>
            .
          </p>

          <div className="mt-16">
            <MethodeChapeau publique={publique} />
          </div>
        </div>
      </section>

      {/* ── LES GENS ET LES MÉTIERS ──────────────────────────────────────
             ⛔ Aucun effectif, et rien qui permette de le déduire. On parle en
             ORGANISATION (quatre pôles) et en MÉTIERS, jamais en personnes. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          En interne
        </div>
        {/* ⭐⭐ POURQUOI LES QUATRE PÔLES RESTENT, ALORS QUE LE SITE VEND TROIS
            MÉTIERS. Question de Giz le 21/08 : « est-ce cohérent avec notre
            nouveau positionnement ? ». Oui — parce que les deux listes ne
            répondent pas à la même question.
              · Communication & marketing / événementiel / immersion, c'est ce
                qu'on ACHÈTE. C'est la porte d'entrée du client.
              · Vidéo / son / infographie / développement, c'est ce qu'on A.
                C'est de la production, et ça n'a rien à faire dans une vitrine.
            ⛔ MAIS LA LISTE SEULE POSITIONNERAIT UNE MAISON DE PRODUCTION,
            exactement ce qui avait fait retirer « 145 films » de l'accueil.
            Elle ne tient donc ici qu'à une condition : servir de PREUVE à la
            promesse « un seul interlocuteur ». D'où le titre reformulé — ce
            n'est plus un catalogue de compétences, c'est la réponse à
            « pourquoi vous n'aurez pas quatre prestataires ». */}
        <h2 className={`max-w-3xl ${TYPO.titre}`}>
          Un seul interlocuteur, parce que les quatre métiers sont dans la
          maison.
        </h2>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Vidéo, son, infographie, développement. Concepteurs, réalisateurs,
          infographistes, cadreurs, monteurs, développeurs : les mêmes
          personnes suivent votre projet du premier rendez-vous à la mise en
          ligne.
        </p>
        {/* ⭐ CE PARAGRAPHE VIENT DE L'AUDIO DE GIZ (« anecdotes », 5-réactivité),
            et c'est le seul endroit de la page qui explique COMMENT la promesse
            tient un mois d'août. Sans lui, « un seul interlocuteur » est un
            argument que n'importe qui peut écrire. */}
        <p className={`mt-5 max-w-2xl ${TYPO.corps}`}>
          Tout le monde travaille sur les mêmes logiciels, avec la même méthode
          et la même nomenclature. C’est ce qui fait qu’une demande de
          modification n’attend pas le retour de la personne qui était dessus :
          quelqu’un d’autre ouvre le projet et le reprend.
        </p>

        {/* ⭐ LA VIDÉO PROUVE LE PARAGRAPHE AU-DESSUS. C'est le seul endroit de
            la page où l'on peut vérifier une promesse d'organisation : « un
            seul interlocuteur » est une phrase que toute agence peut écrire,
            la nomenclature commune est un fait qu'on peut entendre expliquer.
            ⚠️ Colonne étroite : la vidéo est en 9/16. */}
        <div className="mt-12 grid items-start gap-10 md:grid-cols-[minmax(0,260px)_1fr]">
          <LecteurVideo
            format="portrait"
            sansLegende
            video={{
              url: "https://livid.com/watch/xWoXOR2H7RcC",
              titre: "Pourquoi une modification n’attend pas",
              vignetteUrl: "/media/anecdote-reactivite.jpg",
            }}
          />
          <div className="max-w-xl">
            <div className={TYPO.sousTitre}>Pourquoi une modification n’attend pas</div>
            <p className={`mt-3 ${TYPO.corps}`}>
              Plus il y a de clients, plus il est difficile de rester réactif.
              La réponse n’est pas d’embaucher : c’est que chacun travaille de
              la même façon, pour que n’importe qui puisse reprendre le projet
              d’un autre.
            </p>
            <p className="mt-3 text-[15px] opacity-60">En vidéo — 1 min</p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {POLES.map((p, i) => (
            <div key={p.nom} className="border-t-2 pt-6" style={{ borderColor: BLEU }}>
              <div className="mb-3 text-sm font-bold tabular-nums" style={{ color: BLEU }}>
                0{i + 1}
              </div>
              <div className={TYPO.sousTitre}>{p.nom}</div>
              <p className={`mt-3 ${TYPO.corps}`}>{p.detail}</p>
            </div>
          ))}
        </div>

        {/* ⛔ PHOTOS AU TRAVAIL — décision de Giz, 10/08/2026 : « plutôt
            photos d'équipe mais pas complète, au travail ; et on cite les
            métiers, pas les personnes ». La grille de portraits et la photo de
            groupe qui étaient ici ont été retirées : toute image où l'on peut
            compter les têtes donne un signal de taille.
            ⛔ Aucune image IA pour ce qui prétend montrer Bluevista. */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AU_TRAVAIL.map(([src, legende]) => (
            <figure key={legende}>
              <div
                className="aspect-[4/3] rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url('${src}')` }}
                role="img"
                aria-label={legende}
              />
              <figcaption className="mt-2.5 text-[14px] opacity-55">{legende}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── L'HISTOIRE ───────────────────────────────────────────────────── */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto max-w-[900px] px-8 py-24">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Notre histoire
          </div>
          <p className="text-[1.35rem] leading-relaxed">
            <strong>Agence de production audiovisuelle née à Lyon en 2004</strong>,
            Bluevista travaille aujourd’hui à Lyon, Paris et Genève. Les outils ont
            changé, des premiers casques Oculus aux plateformes web 3D. La
            première question n’a pas bougé : qu’est-ce que ce projet doit
            produire ?
          </p>
          {/* ⛔⛔ DEUX CHIFFRES QUI NE MESURENT PAS LA MÊME CHOSE, et les
              confondre est la faute qui avait fait retirer « 145 films » de
              l'accueil le 02/08.
              · « plus de 2 000 projets » = la PRODUCTION réelle depuis 2004.
                C'est celui-ci qui va partout où l'on parle d'expérience.
              · « 145 réalisations » = ce que le PORTFOLIO montre. Il ne vaut
                que sur la page réalisations, et jamais comme volume produit.
              ✅ Les deux confirmés par Giz le 10/08/2026. */}
          <p className="mt-10 text-[3rem] font-bold leading-none" style={{ color: BLEU_CLAIR }}>
            Plus de 2 000 projets
          </p>
          <p className="mt-3 text-white/55">réalisés depuis 2004.</p>
        </div>
      </section>

      {/* ── LES ZONES GRISES ─────────────────────────────────────────────
             ⭐ POURQUOI CETTE SECTION EXISTE. C'est, de toutes les anecdotes
             enregistrées par Giz, la seule qui décrive un problème que le
             client ne sait pas encore qu'il a — et donc la seule qui ne
             pourrait pas être signée par une autre agence. Les frustrations
             plus haut nomment ce qu'il subit ; celle-ci nomme ce qu'il paie
             deux fois sans le voir.

             ⛔ AUCUN NOM DE CLIENT. Giz dit « un salon » et « une autre
             société » sans les nommer, et le nom du salon n'apparaît que dans
             le nom de fichier de la vidéo. Ce qui n'a pas été dit à voix haute
             ne se déduit pas d'un nom de fichier. */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Ce qu’on regarde et que personne ne regarde
          </div>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Vous payez peut-être deux fois la même vidéo.
          </h2>

          <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_minmax(0,300px)]">
            <div className="max-w-3xl">
              <p className={TYPO.chapo}>
                Sur un salon, nous avons failli tourner le même film que le
                prestataire du service communication du même client — l’un
                commandé par l’organisateur, l’autre par la marque, sans que
                les deux services se soient parlé.
              </p>
              <p className={`mt-5 ${TYPO.corps}`}>
                Ce n’est pas un accident, c’est ce qui arrive quand une
                entreprise grandit. Nous cherchons donc systématiquement à
                savoir ce qui se tourne ailleurs chez vous — pour partager les
                images plutôt que de les refaire, ou pour que les films
                répondent à des objectifs différents.
              </p>
              <p className={`mt-5 ${TYPO.corps}`}>
                Chez un client, trois entités voulaient communiquer chacune de
                son côté : le mobilier, l’aménagement, la structure et la
                signalétique. Nous avons regroupé les tournages, chacune
                prenant sa part du budget du même déplacement.{" "}
                <strong className="font-semibold">
                  Plusieurs films, plusieurs besoins, un seul tournage.
                </strong>
              </p>
            </div>
            <div>
              <LecteurVideo
                format="portrait"
                sansLegende
                video={{
                  url: "https://livid.com/watch/_ydksVk_4_t3",
                  titre: "Éliminer les zones grises",
                  vignetteUrl: "/media/anecdote-zones-grises.jpg",
                }}
              />
              <p className="mt-4 text-[14px] text-white/60">En vidéo — 1 min 17</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LES CONVICTIONS ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <h2 className={`max-w-3xl ${TYPO.titre}`}>Ce sur quoi nous ne cédons pas</h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {CONVICTIONS.map(c => (
            <li key={c} className="border-t-2 pt-6 text-[1.0625rem] leading-relaxed" style={{ borderColor: BLEU }}>
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* ── TROIS HISTOIRES ──────────────────────────────────────────────
             ⭐ D'OÙ ELLES VIENNENT : les vidéos « anecdotes » enregistrées par
             Giz le 15/10/2025 et transcrites le 21/08/2026. Ce ne sont pas des
             exemples reconstitués — c'est lui qui raconte, et les faits (mille
             collaborateurs à Malte, deux mille à Cannes, le ×10 de Berliet)
             sortent de sa bouche.

             ⛔⛔ POURQUOI UNE SECTION À PART PLUTÔT QUE DES ANECDOTES FONDUES.
             La page affirmait beaucoup et ne montrait rien : quatre
             frustrations, trois convictions, une méthode — pas un seul fait
             vérifiable. Une conviction sans récit reste une valeur déguisée.
             Fondues dans les sections, ces histoires auraient été des
             illustrations ; groupées, elles deviennent la preuve.

             ⚠️ AUCUN NOM DE CLIENT ICI, sauf là où le projet est déjà public
             sur le site (Berliet est en réalisation). Un séminaire d'entreprise
             ne se raconte pas avec le nom de l'entreprise sans son accord.

             ⛔ ET AUCUN EFFECTIF. L'audio dit « cinq salariés et cinq à dix
             intermittents » — la page s'interdit depuis le 10/08 de donner
             l'effectif ou de quoi le déduire. « Une équipe de trois » décrit
             UN TOURNAGE, pas l'entreprise : c'est la seule forme admise, et la
             règle attend l'arbitrage de Giz. */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 py-24">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Trois histoires
          </div>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>
            Ce que ça donne quand ça se passe bien.
          </h2>

          <div className="mt-14">
            <CarrouselHistoires histoires={HISTOIRES} />
          </div>
        </div>
      </section>

      {/* ── LES MOYENS ───────────────────────────────────────────────────
             🔗 C'est ici que la page distribue vers les pages qui portent le
             référencement, AVEC LES BONS MOTS EN ANCRE. */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[900px] px-8 py-24">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
            Nos moyens
          </div>
          <p className={TYPO.chapo}>
            Une grue de six mètres et des drones, pour les mouvements que
            l’épaule ne permet pas. Unreal Engine, Blender et Cinema 4D, parce
            que la 3D et le temps réel se fabriquent ici. Notre propre parc de
            casques, pour tester une expérience avant de vous la promettre.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-relaxed opacity-70">
            <em>
              (Oui, on les met sur la tête des clients en réunion. Ça raccourcit
              beaucoup les débats.)
            </em>
          </p>
          <p className={`mt-8 ${TYPO.corps}`}>
            Ces moyens servent notre{" "}
            <a href={publique ? "/studio-animation-3d-lyon/" : "/apercu/ville/studio-animation-3d-lyon"} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              studio d’animation 3D à Lyon
            </a>
            , nos projections de{" "}
            <a href={L.competence("video-mapping")} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              vidéo mapping
            </a>{" "}
            et nos dispositifs de{" "}
            <a href={L.competence("live-streaming-webtv")} className="font-semibold underline decoration-2 underline-offset-4" style={{ color: BLEU }}>
              live streaming
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── LES RÉFÉRENCES ──────────────────────────────────────────────
             ⚠️⚠️ EMPLACEMENT RÉSERVÉ, VOLONTAIREMENT VIDE.
             Les noms (ONU, UNICEF, BBC, NHK, EDF, Vinci…) viennent du mémoire
             Région AuRA. Les citer dans un marché public n'est PAS les
             publier : la règle par défaut du cerveau est « on demande », et la
             tâche Podio sur le droit de publication client n'est pas tranchée.
             ⛔ Ne pas remplir ce bloc avant cet arbitrage.
             ⚠️ Le titre reste à trouver : « Ils nous font confiance » est la
             formule KabochArts, classée repoussoir. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <div
          className="rounded-md border-2 border-dashed px-8 py-10"
          style={{ borderColor: `${BLEU}55` }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
            En attente d’arbitrage — ne pas mettre en ligne
          </div>
          <p className={`mt-4 ${TYPO.corps}`}>
            Le bandeau de références clients. C’est le plus gros gisement non
            exploité du site — une agence qui a produit pour des institutions
            internationales et des chaînes nationales ne devrait pas le taire.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed opacity-55">
            Deux choses bloquent, et aucune n’est rédactionnelle : le droit de
            publication n’est tranché pour aucun de ces clients (tâche Podio en
            cours), et le titre de section reste à trouver.
          </p>
        </div>
      </section>

      {/* ── LA CLÔTURE ──────────────────────────────────────────────────
             ⛔ Jamais un « contactez-nous ! » nu. Son marqueur depuis quinze
             ans : il PROPOSE des options, il ne demande pas. Et le mot de
             clôture est `ensemble`.
             ⛔ Fond clair : le pied de page est sombre, et deux bandes sombres
             collées se lisaient comme deux pieds de page. */}
      <section style={{ background: CLAIR }} className="border-t border-black/10 py-24">
        <div className="mx-auto max-w-[900px] px-8">
          <h2 className={TYPO.titre}>
            Voyons <span style={{ color: BLEU }}>ensemble</span> ce que votre
            prochain projet doit faire.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={L.contact}
              className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
              style={{ background: BLEU }}
            >
              Un appel de 30 minutes ?
            </a>
            <a
              href={L.contact}
              className="rounded-md border border-black/20 px-9 py-4 text-[16px] font-semibold"
            >
              Ou envoyez-nous votre sujet — nous vous dirons ce que nous en ferions
            </a>
          </div>
        </div>
      </section>

      <PiedDePage publique={publique} />
    </main>
  );
}
