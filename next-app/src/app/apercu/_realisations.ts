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
  metier: "film" | "evenement" | "immersion" | null;
  /** Le slug produit, utilisé comme filtre depuis les pages métier. */
  produit: string | null;
  ancienneUrl: string;
  clics: number;
  impressions: number;
};

export const REALISATIONS: Realisation[] = [
  { slug: "engie-home-services-video-thermostat-migo", client: "Engie", metier: null, produit: null, ancienneUrl: "/nos-realisations/engie-home-services-video-thermostat-migo/", clics: 61, impressions: 10087 },
  { slug: "verizon-connect-video-de-presentation", client: "Verizon", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/verizon-connect-video-de-presentation/", clics: 17, impressions: 6509 },
  { slug: "thx-medical-dosamat-digital-2-0", client: "Thx", metier: null, produit: null, ancienneUrl: "/nos-realisations/thx-medical-dosamat-digital-2-0/", clics: 12, impressions: 711 },
  { slug: "stann-lapplication-de-gestion-dentreprise", client: "Stann", metier: null, produit: null, ancienneUrl: "/nos-realisations/stann-lapplication-de-gestion-dentreprise/", clics: 11, impressions: 7170 },
  { slug: "eiffage-energie-expercite", client: "Eiffage", metier: null, produit: null, ancienneUrl: "/nos-realisations/eiffage-energie-expercite/", clics: 11, impressions: 3064 },
  { slug: "printemps-nouvelle-identite", client: "Printemps", metier: null, produit: null, ancienneUrl: "/nos-realisations/printemps-nouvelle-identite/", clics: 8, impressions: 176 },
  { slug: "amplitude-amplivision", client: "Amplitude", metier: null, produit: null, ancienneUrl: "/nos-realisations/amplitude-amplivision/", clics: 6, impressions: 668 },
  { slug: "qwartz", client: "Qwartz", metier: null, produit: null, ancienneUrl: "/nos-realisations/qwartz/", clics: 4, impressions: 218 },
  { slug: "tetro-grand-hotel-dieu", client: "Tetro", metier: null, produit: null, ancienneUrl: "/nos-realisations/tetro-grand-hotel-dieu/", clics: 4, impressions: 216 },
  { slug: "bluevista-showreel-2025", client: "Bluevista", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/bluevista-showreel-2025/", clics: 2, impressions: 451 },
  { slug: "radisson-360-vr", client: "Radisson", metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/radisson-360-vr/", clics: 2, impressions: 161 },
  { slug: "arrow-abox-memo", client: "Arrow", metier: null, produit: null, ancienneUrl: "/nos-realisations/arrow-abox-memo/", clics: 2, impressions: 129 },
  { slug: "artcurial-mapping", client: "Artcurial", metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/artcurial-mapping/", clics: 2, impressions: 127 },
  { slug: "koesio-convention-2024", client: "Koesio", metier: "evenement", produit: "convention", ancienneUrl: "/nos-realisations/koesio-convention-2024/", clics: 2, impressions: 12 },
  { slug: "irisolaris-aftermovie-irisdays-2024", client: "Irisolaris", metier: "evenement", produit: "aftermovie", ancienneUrl: "/nos-realisations/irisolaris-aftermovie-irisdays-2024/", clics: 2, impressions: 11 },
  { slug: "hitachi-cs-net", client: "Hitachi", metier: null, produit: null, ancienneUrl: "/nos-realisations/hitachi-cs-net/", clics: 1, impressions: 1023 },
  { slug: "dromis-equans-ineo", client: "Dromis", metier: null, produit: null, ancienneUrl: "/nos-realisations/dromis-equans-ineo/", clics: 1, impressions: 756 },
  { slug: "bluevista-showreel-2020", client: "Bluevista", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/bluevista-showreel-2020/", clics: 1, impressions: 339 },
  { slug: "olinn-video-publicitaire", client: "Olinn", metier: "film", produit: "produit", ancienneUrl: "/nos-realisations/olinn-video-publicitaire/", clics: 1, impressions: 330 },
  { slug: "pisten-bully-dameuse-360-vr", client: "Pisten", metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/pisten-bully-dameuse-360-vr/", clics: 1, impressions: 220 },
  { slug: "hitachi-hikumo", client: "Hitachi", metier: null, produit: null, ancienneUrl: "/nos-realisations/hitachi-hikumo/", clics: 1, impressions: 161 },
  { slug: "deko-film-de-presentation", client: "Deko", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/deko-film-de-presentation/", clics: 1, impressions: 145 },
  { slug: "mapping-audi", client: "Mapping", metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/mapping-audi/", clics: 1, impressions: 97 },
  { slug: "hitachi-yutaki", client: "Hitachi", metier: null, produit: null, ancienneUrl: "/nos-realisations/hitachi-yutaki/", clics: 1, impressions: 85 },
  { slug: "elistair-orion", client: "Elistair", metier: null, produit: null, ancienneUrl: "/nos-realisations/elistair-orion/", clics: 1, impressions: 70 },
  { slug: "40-ans-siparex", client: "40", metier: "evenement", produit: "convention", ancienneUrl: "/nos-realisations/40-ans-siparex/", clics: 1, impressions: 24 },
  { slug: "hitachi-film-catalogue-2021", client: "Hitachi", metier: "film", produit: "corporate", ancienneUrl: "/nos-realisations/hitachi-film-catalogue-2021/", clics: 1, impressions: 24 },
  { slug: "tetro-stalactite-light-show", client: "Tetro", metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/tetro-stalactite-light-show/", clics: 1, impressions: 15 },
  { slug: "tetro-fete-des-lumieres-2021", client: "Tetro", metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/nos-realisations/tetro-fete-des-lumieres-2021/", clics: 1, impressions: 14 },
  { slug: "koesio-voeux-2024", client: "Koesio", metier: "film", produit: "voeux", ancienneUrl: "/nos-realisations/koesio-voeux-2024/", clics: 1, impressions: 14 },
  { slug: "isara-interviews-detudiants", client: "Isara", metier: "film", produit: "interview", ancienneUrl: "/nos-realisations/isara-interviews-detudiants/", clics: 1, impressions: 13 },
  { slug: "icsi-briefing-debriefing-minute-darret", client: "Icsi", metier: "film", produit: "formation", ancienneUrl: "/nos-realisations/icsi-briefing-debriefing-minute-darret/", clics: 1, impressions: 11 },
  { slug: "bos", client: "Bos", metier: null, produit: null, ancienneUrl: "/nos-realisations/bos/", clics: 1, impressions: 7 },
  { slug: "araymond-share", client: "Araymond", metier: null, produit: null, ancienneUrl: "/nos-realisations/araymond-share/", clics: 1, impressions: 7 },
  { slug: "spc", client: "Spc", metier: null, produit: null, ancienneUrl: "/nos-realisations/spc/", clics: 1, impressions: 6 },
  { slug: "bluevista-creative-la-pizza", client: "Bluevista", metier: null, produit: null, ancienneUrl: "/nos-realisations/bluevista-creative-la-pizza/", clics: 0, impressions: 1286 },
  { slug: "bluevista-creative-unicorn-team", client: "Bluevista", metier: null, produit: null, ancienneUrl: "/nos-realisations/bluevista-creative-unicorn-team/", clics: 0, impressions: 831 },
  { slug: "cera-agence-innovation", client: "Cera", metier: null, produit: null, ancienneUrl: "/nos-realisations/cera-agence-innovation/", clics: 0, impressions: 566 },
  { slug: "bluevista-creative-un-monde-virtuel-1-la-moto", client: "Bluevista", metier: null, produit: null, ancienneUrl: "/nos-realisations/bluevista-creative-un-monde-virtuel-1-la-moto/", clics: 0, impressions: 152 },
  { slug: "serl-video-360-vr", client: "Serl", metier: "immersion", produit: "visite-vr", ancienneUrl: "/nos-realisations/serl-video-360-vr/", clics: 0, impressions: 142 },
];

export const realisationsDuProduit = (produit: string) =>
  REALISATIONS.filter(r => r.produit === produit);

/** À trier à la main : leur adresse ne dit pas ce qu'elles montrent. */
export const NON_CLASSEES = REALISATIONS.filter(r => !r.metier);
