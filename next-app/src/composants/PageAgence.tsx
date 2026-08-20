import { EnTete } from "./EnTete";
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
const POLES = [
  {
    nom: "Vidéo",
    detail:
      "Tournage, montage, harmonisation des couleurs. Le métier d’origine, et celui qui donne le rythme aux trois autres.",
  },
  {
    nom: "Son",
    detail:
      "Prise de son, voix off, création sonore, podcast. C’est ce qu’on entend en premier quand c’est mal fait.",
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

/** ⚠️ Photos AU TRAVAIL. Jamais un groupe posé, jamais de tête à compter. */
const AU_TRAVAIL = [
  ["/media/coulisses-interview.jpg", "En tournage"],
  ["/media/px-methode-1.jpg", "En conception"],
  ["/media/px-methode-4.jpg", "En montage"],
  ["/media/px-pilier-immersion.jpg", "En test"],
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
        <h2 className={`max-w-3xl ${TYPO.titre}`}>
          Quatre pôles : production vidéo, son, infographie, développement.
        </h2>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Concepteurs, réalisateurs, infographistes, cadreurs, monteurs,
          développeurs. Les mêmes personnes suivent votre projet du premier
          rendez-vous à la mise en ligne.
        </p>

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
