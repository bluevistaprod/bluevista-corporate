/**
 * LES RÉALISATIONS — extraites de l'inventaire des URL, le 02/08/2026.
 *
 * 140 pages sur l'ancien site. C'est de loin le plus gros actif de contenu de
 * Bluevista, et le seul endroit où la preuve est APPORTÉE plutôt qu'affirmée.
 * Les 40 ci-dessous sont celles qui ont du trafic ; les autres seront
 * reprises à la migration du contenu.
 *
 * ⛔ CE FICHIER EST UNE STRUCTURE, PAS UN CONTENU.
 *
 * Fiable : le slug, l'ancienne adresse, les clics et les impressions —
 * ils viennent de la Search Console.
 *
 * À RELIRE : le nom du client, déduit du premier mot de l'adresse. Le métier
 * et le produit, déduits de mots-clés dans l'adresse.
 *
 * ⚠️ ET C'EST LÀ LE CONSTAT UTILE : 21 de ces 40 adresses ne disent
 * pas ce que le projet était. « qwartz », « bos », « spc », « araymond-share »
 * — un humain ne peut pas deviner, Google non plus. Ces pages se positionnent
 * donc uniquement sur le nom du client, jamais sur le type de prestation.
 * C'est une perte sèche : quelqu'un qui cherche « aftermovie convention Lyon »
 * ne les trouvera pas.
 *
 * Ce qui n'a pas été reconnu reste `null` PLUTÔT QUE D'ÊTRE RANGÉ AU HASARD :
 * un projet mal classé est pire qu'un projet non classé — il apparaît dans le
 * mauvais filtre, devant le mauvais prospect.
 *
 * ⚠️ CE QUI MANQUE ENCORE, et qui ne peut venir que de Bluevista :
 *   · l'image de chaque projet ;
 *   · le contexte, l'enjeu, le résultat — c'est ce qui transforme une galerie
 *     en preuve ;
 *   · la vidéo.
 */

export type Realisation = {
  slug: string;
  /** Déduit du slug — À RELIRE. */
  client: string;
  /**
   * LE TITRE DE LA PAGE — relevé sur le site en ligne le 02/08/2026, puis
   * réécrit pour porter la PRESTATION en plus du nom du client.
   *
   * ⛔ C'est le levier le plus rentable et le moins risqué du chantier.
   * L'adresse d'une page ne se change pas sans coût ; son titre, si. Or
   * « Qwartz - Bluevista » ne se positionne que sur « Qwartz » — personne ne
   * cherche ça. « Qwartz — film de présentation du centre commercial » se
   * positionne aussi sur « film centre commercial ».
   *
   * `titreSur` à false = j'ai déduit la nature du projet du titre existant
   * sans en avoir la confirmation. À relire avant mise en ligne.
   */
  titre: string;
  titreSur: boolean;
  metier: "film" | "evenement" | "immersion" | null;
  /** Le slug produit, utilisé comme filtre depuis les pages métier. */
  produit: string | null;
  ancienneUrl: string;
  clics: number;
  impressions: number;
  /**
   * LE CAS, quand il est écrit. Une seule fiche est remplie pour l'instant —
   * Engie — pour valider le style avant d'en faire 140. Son contenu vient de
   * la page en ligne, pas de mon imagination.
   */
  cas?: {
    /**
     * L'ACCROCHE, au-dessus de la vidéo. Idée de Giz, et c'est celle de ses
     * trois questions qui change le plus de choses : une ligne qui pose
     * l'enjeu AVANT le film fait qu'on le regarde en cherchant quelque
     * chose, au lieu de le subir. Sans elle, le visiteur lance une vidéo
     * sans savoir ce qu'il doit y voir.
     */
    accroche: string;
    contexte: string;
    enjeu: string;
    ceQuOnAFait: string;
    /** ⛔ Vide tant que le chiffre n'est pas fourni par le client. */
    resultat: string | null;
    credits?: string;
    /**
     * LES PHOTOS, sous la vidéo — repère pris chez « Tout le monde aime les
     * pingouins », que Giz voulait reprendre. Ce n'est pas décoratif : la
     * vidéo prouve le RÉSULTAT, les photos prouvent la FABRICATION. Une
     * agence de production a besoin des deux, et c'est ce qui distingue une
     * fiche de projet d'une simple mise en ligne de film.
     */
    /** Le nombre de photos ; leurs fichiers viendront plus tard. */
    photos?: number;
  };
};

export const REALISATIONS: Realisation[] = [
  {
    slug: "engie-home-services-video-thermostat-migo",
    client: "Engie Home Services",
    titre: "Engie Home Services — film tutoriel 3D du thermostat MiGo",
    titreSur: true,
    metier: "film",
    produit: "formation",
    ancienneUrl: "/nos-realisations/engie-home-services-video-thermostat-migo/",
    clics: 61,
    impressions: 10087,
    /**
     * â ï¸ CONTENU REPRIS DE LA PAGE EN LIGNE, le 02/08/2026. Rien n'est
     * inventé : les phrases ci-dessous remettent en forme ce qui est déjÃ 
     * publié, réorganisé selon les quatre blocs du gabarit.
     *
     * ð Découverte au passage : la page actuelle contient un bloc de
     * LOREM IPSUM en clair, visible par tout visiteur et par Google — sur la
     * page la plus visitée du portfolio (61 clics, 10 087 impressions).
     * Ã corriger sur l'ancien site sans attendre la refonte.
     */
    cas: {
      accroche:
        "Faire comprendre un appairage sans notice et sans technicien.",
      contexte:
        "Saunier Duval lance MiGo, un thermostat connecté. Engie Home Services en assure l’installation chez les particuliers — et reçoit les appels quand l’appairage ne se passe pas comme prévu.",
      enjeu:
        "Faire comprendre l’appairage et le paramétrage à quelqu’un qui tient le boîtier dans les mains, sans notice et sans technicien. Un tutoriel qu’on ne regarde pas jusqu’au bout ne sert à rien : chaque étape devait tenir sans qu’on ait besoin de revenir en arrière.",
      ceQuOnAFait:
        "Un film tutoriel en animation 3D, étape par étape. Le produit est montré en situation, et des picots créés pour l’occasion guident le regard vers le bon bouton au bon moment — c’est ce qui remplace le doigt du technicien.",
      resultat: null,
      credits: "Pour l’agence BIGMAMA · client final Engie Home Services · produit Saunier Duval",
      /* ⚠️ Emplacements, pas photos : celles-ci n'existent pas encore. Une
         image de banque sous une fiche client serait un mensonge sur le
         travail lui-même. */
      photos: 4,
    },
  },
  { slug: "verizon-connect-video-de-presentation", client: "Verizon", titre: "Verizon Connect — film de présentation", titreSur: true, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/verizon-connect-video-de-presentation/", clics: 17, impressions: 6509 },
  { slug: "thx-medical-dosamat-digital-2-0", client: "Thx", titre: "THX Medical — film d’animation Dosamat Digital 2.0", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/thx-medical-dosamat-digital-2-0/", clics: 12, impressions: 711 },
  { slug: "stann-lapplication-de-gestion-dentreprise", client: "Stann", titre: "Stann — film de l’application de gestion d’entreprise", titreSur: true, metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/stann-lapplication-de-gestion-dentreprise/", clics: 11, impressions: 7170 },
  { slug: "eiffage-energie-expercite", client: "Eiffage", titre: "Eiffage Énergie — film Expercité", titreSur: true, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/eiffage-energie-expercite/", clics: 11, impressions: 3064 },
  { slug: "printemps-nouvelle-identite", client: "Printemps", titre: "Printemps — film de la nouvelle identité", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/printemps-nouvelle-identite/", clics: 8, impressions: 176 },
  { slug: "amplitude-amplivision", client: "Amplitude", titre: "Amplitude — film produit Amplivision", titreSur: false, metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/amplitude-amplivision/", clics: 6, impressions: 668 },
  { slug: "qwartz", client: "Qwartz", titre: "Qwartz — film de présentation du centre commercial", titreSur: true, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/qwartz/", clics: 4, impressions: 218 },
  { slug: "tetro-grand-hotel-dieu", client: "Tetro", titre: "TETRO — captation de l’inauguration au Grand Hôtel-Dieu", titreSur: true, metier: "evenement", produit: "captation", ancienneUrl: "/nos-realisations/tetro-grand-hotel-dieu/", clics: 4, impressions: 216 },
  { slug: "bluevista-showreel-2025", client: "Bluevista", titre: "Bluevista — showreel 2025", titreSur: true, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/bluevista-showreel-2025/", clics: 2, impressions: 451 },
  { slug: "radisson-360-vr", client: "Radisson", titre: "Radisson — visite 360° en réalité virtuelle", titreSur: true, metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/radisson-360-vr/", clics: 2, impressions: 161 },
  { slug: "arrow-abox-memo", client: "Arrow", titre: "Arrow — animation 3D du boîtier Abox Memo", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/arrow-abox-memo/", clics: 2, impressions: 129 },
  { slug: "artcurial-mapping", client: "Artcurial", titre: "Artcurial — vidéomapping", titreSur: true, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/artcurial-mapping/", clics: 2, impressions: 127 },
  { slug: "koesio-convention-2024", client: "Koesio", titre: "Koesio — convention 2024", titreSur: true, metier: "evenement", produit: "convention", ancienneUrl: "/nos-realisations/koesio-convention-2024/", clics: 2, impressions: 12 },
  { slug: "irisolaris-aftermovie-irisdays-2024", client: "Irisolaris", titre: "Irisolaris — aftermovie des IrisDays 2024", titreSur: true, metier: "evenement", produit: "aftermovie", ancienneUrl: "/nos-realisations/irisolaris-aftermovie-irisdays-2024/", clics: 2, impressions: 11 },
  { slug: "hitachi-cs-net", client: "Hitachi", titre: "Hitachi — animation 3D du système CS Net", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/hitachi-cs-net/", clics: 1, impressions: 1023 },
  { slug: "dromis-equans-ineo", client: "Dromis", titre: "Dromis — film pour EQUANS et INEO", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/dromis-equans-ineo/", clics: 1, impressions: 756 },
  { slug: "bluevista-showreel-2020", titre: "bluevista showreel 2020", titreSur: false, client: "Bluevista", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/bluevista-showreel-2020/", clics: 1, impressions: 339 },
  { slug: "olinn-video-publicitaire", client: "Olinn", titre: "Olinn — film publicitaire", titreSur: true, metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/olinn-video-publicitaire/", clics: 1, impressions: 330 },
  { slug: "pisten-bully-dameuse-360-vr", titre: "pisten bully dameuse 360 vr", titreSur: false, client: "Pisten", metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/pisten-bully-dameuse-360-vr/", clics: 1, impressions: 220 },
  { slug: "hitachi-hikumo", client: "Hitachi", titre: "Hitachi — animation 3D Hikumo", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/hitachi-hikumo/", clics: 1, impressions: 161 },
  { slug: "deko-film-de-presentation", client: "Deko", titre: "Deko — film de présentation", titreSur: true, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/deko-film-de-presentation/", clics: 1, impressions: 145 },
  { slug: "mapping-audi", titre: "mapping audi", titreSur: false, client: "Mapping", metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/mapping-audi/", clics: 1, impressions: 97 },
  { slug: "hitachi-yutaki", client: "Hitachi", titre: "Hitachi — animation 3D Yutaki", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/hitachi-yutaki/", clics: 1, impressions: 85 },
  { slug: "elistair-orion", client: "Elistair", titre: "Elistair — film 3D du drone Orion", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/elistair-orion/", clics: 1, impressions: 70 },
  { slug: "40-ans-siparex", client: "40", titre: "Siparex — les 40 ans, captation et aftermovie", titreSur: true, metier: "evenement", produit: "aftermovie", ancienneUrl: "/nos-realisations/40-ans-siparex/", clics: 1, impressions: 24 },
  { slug: "hitachi-film-catalogue-2021", titre: "hitachi film catalogue 2021", titreSur: false, client: "Hitachi", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/hitachi-film-catalogue-2021/", clics: 1, impressions: 24 },
  { slug: "tetro-stalactite-light-show", client: "Tetro", titre: "TETRO — light show Stalactite", titreSur: true, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/tetro-stalactite-light-show/", clics: 1, impressions: 15 },
  { slug: "tetro-fete-des-lumieres-2021", client: "Tetro", titre: "TETRO — Fête des Lumières 2021", titreSur: true, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/tetro-fete-des-lumieres-2021/", clics: 1, impressions: 14 },
  { slug: "koesio-voeux-2024", client: "Koesio", titre: "Koesio — film de vœux 2024", titreSur: true, metier: "film", produit: "voeux", ancienneUrl: "/nos-realisations/koesio-voeux-2024/", clics: 1, impressions: 14 },
  { slug: "isara-interviews-detudiants", titre: "isara interviews detudiants", titreSur: false, client: "Isara", metier: "film", produit: "interview", ancienneUrl: "/nos-realisations/isara-interviews-detudiants/", clics: 1, impressions: 13 },
  { slug: "icsi-briefing-debriefing-minute-darret", client: "Icsi", titre: "ICSI — film de formation « briefing, débriefing, minute d’arrêt »", titreSur: true, metier: "film", produit: "formation", ancienneUrl: "/nos-realisations/icsi-briefing-debriefing-minute-darret/", clics: 1, impressions: 11 },
  { slug: "bos", client: "Bos", titre: "BOS — film promotionnel", titreSur: true, metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/bos/", clics: 1, impressions: 7 },
  { slug: "araymond-share", client: "Araymond", titre: "Araymond — film ShARe", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/araymond-share/", clics: 1, impressions: 7 },
  { slug: "spc", client: "Spc", titre: "SPC — film produit", titreSur: true, metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/spc/", clics: 1, impressions: 6 },
  { slug: "bluevista-creative-la-pizza", client: "Bluevista", titre: "Bluevista Creative — « La Pizza », film 3D", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/bluevista-creative-la-pizza/", clics: 0, impressions: 1286 },
  { slug: "bluevista-creative-unicorn-team", client: "Bluevista", titre: "Bluevista Creative — « Unicorn Team », film 3D", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/bluevista-creative-unicorn-team/", clics: 0, impressions: 831 },
  { slug: "cera-agence-innovation", client: "Cera", titre: "CERA — motion design pour l’Agence Innovation", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/cera-agence-innovation/", clics: 0, impressions: 566 },
  { slug: "bluevista-creative-un-monde-virtuel-1-la-moto", client: "Bluevista", titre: "Bluevista Creative — « Un monde virtuel #1 : la moto »", titreSur: true, metier: "film", produit: "motion-promo", ancienneUrl: "/nos-realisations/bluevista-creative-un-monde-virtuel-1-la-moto/", clics: 0, impressions: 152 },
  { slug: "serl-video-360-vr", titre: "serl video 360 vr", titreSur: false, client: "Serl", metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/serl-video-360-vr/", clics: 0, impressions: 142 },
];

/**
 * LE PORTFOLIO COMPLET — les réalisations d'origine PLUS celles migrées
 * depuis /actualites/. C'est cette liste que la galerie affiche.
 *
 * ⛔ L'import est en bas du fichier, pas en haut : _realisations-migrees.ts
 * importe le type `Realisation` d'ici. Une dépendance circulaire de types
 * ne casse pas à la compilation, mais elle rend l'ordre de lecture
 * incompréhensible — mieux vaut le dire que le laisser deviner.
 */
export const TOUTES_REALISATIONS: Realisation[] = [
  ...REALISATIONS,
  ...REALISATIONS_MIGREES,
];

import { REALISATIONS_MIGREES } from "./_realisations-migrees";

export const realisationsDuProduit = (produit: string) =>
  TOUTES_REALISATIONS.filter(r => r.produit === produit);

/** À trier à la main : leur adresse ne dit pas ce qu'elles montrent. */
export const NON_CLASSEES = REALISATIONS.filter(r => !r.metier);
