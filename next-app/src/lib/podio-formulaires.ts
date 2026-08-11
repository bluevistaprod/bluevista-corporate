/**
 * LA CORRESPONDANCE SITE → PODIO. Côté serveur uniquement.
 *
 * ⛔⛔ CE FICHIER N'A PAS ÉTÉ ÉCRIT DE MÉMOIRE. Chaque external_id et chaque
 * identifiant d'option ci-dessous a été relevé le 11/08/2026 sur les schémas
 * réels des trois apps (podio_get_app_fields), et les conventions de
 * remplissage ont été lues sur de VRAIS items récents créés par l'ancien
 * formulaire web. Deux choses qu'on n'aurait pas devinées :
 *
 *   1. Le champ « Votre demande en détails » (`demande`) contient du HTML —
 *      les items existants portent `<p>…</p>`. Y écrire du texte brut
 *      afficherait un pavé sans retour à la ligne dans le CRM.
 *   2. L'ancien formulaire remplit le TITRE de la vente avec le nom de
 *      l'entreprise, et l'équipe le renomme ensuite « CLIENT - PROJET ».
 *      On reproduit ce comportement : changer la convention obligerait
 *      l'équipe à changer son geste de tri.
 *
 * ⚠️ Si une option est ajoutée dans Podio, elle ne se propage pas ici toute
 * seule. Rejouer `podio_get_app_fields` avant de toucher à ces tables.
 */

import type { Acquisition, Marche, TypeFormulaire } from "./formulaires";

/**
 * QUATRE APPS — arbitrage de Giz du 11/08/2026, et il tient à une règle simple :
 * **une app par ENTITÉ QUI FACTURE, pas une app par langue.**
 *
 * ⛔ VentesCH reste séparée parce que bluevista.ch est une autre société :
 * router une demande suisse vers le CRM français enverrait le prospect chez
 * une entité qui ne peut pas lui facturer.
 * ✅ Ventes ENG disparaît du dispositif : l'anglais est vendu et facturé par
 * Bluevista France. Une app de plus, c'était un CRM de plus à tenir pour zéro
 * bénéfice. C'est le FORMULAIRE qui est traduit, pas la destination.
 * ⚠️ L'app Ventes ENG (12487900, 27 items) n'est pas supprimée pour autant —
 * elle porte de l'historique. Elle ne reçoit simplement plus rien.
 *
 * ⭐ Ce qui rend la fusion FR+EN sans risque, vérifié sur les schémas : les
 * apps Ventes partagent les mêmes external_id ET les mêmes identifiants
 * d'options. Un formulaire anglais peut donc écrire dans l'app française sans
 * la moindre conversion — seul le TEXTE reste anglais, ce qui est voulu.
 *
 * ⏳ À confirmer avec Giz : « Jobs ENG » (12580539) et « Interships ENG »
 * (12580621) existent dans l'espace RH. Par la même logique — une seule équipe
 * RH — les candidatures et stages anglais vont dans les apps françaises.
 */
export const APPS: Record<TypeFormulaire, Partial<Record<Marche, { id: number; nom: string }>>> = {
  ventes: {
    fr: { id: 4233499, nom: "Ventes" },
    en: { id: 4233499, nom: "Ventes" },
    ch: { id: 21309386, nom: "VentesCH" },
  },
  recrutement: {
    fr: { id: 4241365, nom: "Candidatures" },
    en: { id: 4241365, nom: "Candidatures" },
    ch: { id: 4241365, nom: "Candidatures" },
  },
  stage: {
    fr: { id: 11808404, nom: "Demandes de stage" },
    en: { id: 11808404, nom: "Demandes de stage" },
    ch: { id: 11808404, nom: "Demandes de stage" },
  },
};

/**
 * LE CHAMP `gclid` — créé le 11/08/2026 sur les deux apps Ventes, à la demande
 * de Giz (field_id 277801394 sur Ventes, 277801396 sur VentesCH).
 *
 * ⚠️ L'external_id n'est PAS `gclid` : Podio le dérive du libellé affiché
 * (« gclid (Google Ads) » → `gclid-google-ads`). On ne choisit pas cette clé,
 * on la relit après création. Renommer le champ dans l'interface ne change
 * PAS l'external_id — donc ce nom-là est stable même si le libellé bouge.
 *
 * ⭐ Ce que ça change : le gclid vit désormais dans une COLONNE, exportable
 * en CSV. C'est ce qui rendra possible un import de conversions hors ligne
 * dans Google Ads — impossible tant qu'il n'existait qu'en commentaire.
 */
export const CHAMP_GCLID = "gclid-google-ads";
export const APPS_AVEC_CHAMP_GCLID = new Set([4233499, 21309386]);

/**
 * ⛔⛔ SI UN AUTRE CHAMP DOIT ÊTRE CRÉÉ PAR L'API UN JOUR, LIRE CECI D'ABORD.
 *
 * `POST /app/{id}/field/` pose le nouveau champ en **`delta = 0`, donc EN TÊTE
 * de l'app**. Or Podio titre ses items d'après le premier champ : le « Lieu »
 * ajouté aux Demandes de stage a **remplacé le nom du candidat par « Suisse »**
 * dans le titre de l'item. Trouvé le 11/08/2026 en relisant un item créé —
 * la liste des champs, elle, ne montrait rien d'anormal.
 *
 * 👉 Toujours enchaîner avec `PUT /app/{id}/field/{field_id}` en renvoyant la
 * **config existante recopiée telle quelle**, `delta` porté à max+1. Un PUT
 * qui n'enverrait que `{delta}` échoue sur *missing required properties:
 * ['label']*, et un PUT qui reconstruirait `settings` risquerait de dupliquer
 * les options d'un champ catégorie.
 *
 * 👉 Et la leçon générale : après une modification de STRUCTURE, relire un
 * ITEM, pas seulement le schéma.
 */

export function appCible(type: TypeFormulaire, marche: Marche): { id: number; nom: string } {
  const cible = APPS[type][marche];
  if (!cible) throw new Error(`Aucune app Podio pour ${type} / ${marche}`);
  return cible;
}

/**
 * « conversion pub » n'existe que sur l'app française (field 273586556) —
 * l'écrire sur VentesCH ferait échouer la création, donc perdre la demande.
 *
 * ⭐ Et il n'y a PLUS lieu de le créer côté suisse : depuis que le `gclid` a
 * sa propre colonne, cette case ne fait que répéter, en moins précis, ce que
 * le gclid dit déjà (« un gclid rempli = la demande vient d'une annonce »).
 * On continue de la cocher côté FR parce qu'elle y existe et que des vues
 * s'appuient peut-être dessus ; on ne la propage pas.
 */
export const APPS_AVEC_CONVERSION_PUB = new Set([4233499]);

/**
 * LES TROIS PILIERS DU SITE → « Précisez le type de votre demande ».
 *
 * ⚠️ La correspondance est imparfaite et il faut le savoir : le site vend en
 * trois piliers (Communication & marketing / Événementiel / Immersion), Podio
 * trie en six familles de production héritées. Aucune n'est la traduction de
 * l'autre. Le pilier choisi est donc AUSSI recopié en clair dans le texte de
 * la demande — la colonne Podio sert au tri, le texte garde le mot du client.
 *
 * ⭐ Ce champ ne sera plus rempli par défaut. Le cerveau a mesuré que 195 des
 * 210 demandes disaient « film » simplement parce que c'était la première
 * option de la liste. Ici le visiteur choisit, ou ne choisit pas.
 */
export const PILIER_VERS_TYPE: Record<string, number> = {
  film: 1, // « film »
  evenement: 4, // « captation - retransmission »
  immersion: 5, // « multimedia / interactif »
  autre: 6, // « autre... »
};

export const BUDGET_VERS_OPTION: Record<string, number> = {
  "moins-10k": 1,
  "10k-20k": 2,
  "20k-30k": 3,
  "plus-30k": 4,
};

/**
 * LE PRÉFIXE DE TITRE — `[EN]` / `[CH]` `[Giz, 11/08/2026]`.
 *
 * ⛔ LE BESOIN, MOT POUR MOT : *« elles arriveront dans les app podio FR, je ne
 * les recréerai pas en suisse pour le moment, mais il faudra qu'elles soient
 * bien identifiées en arrivant »*.
 *
 * ⭐ « En arrivant » = **dans la liste**, pas dans l'item ouvert. C'est ce qui
 * décide de l'emplacement : la ligne d'origine dans le corps du texte ne se
 * voit qu'une fois l'item ouvert, et un commentaire encore moins. Le TITRE est
 * la seule chose qu'on lit sans cliquer. D'où un préfixe court et sobre.
 *
 * ⚠️ Aucun préfixe quand la demande arrive dans SON app (une demande française
 * dans l'app française, une demande suisse dans VentesCH) : le préfixe ne
 * signale que le cas où une demande vit dans une app qui n'est pas la sienne.
 */
export function prefixeTitre(marche: Marche, appId: number): string {
  if (marche === "fr") return "";
  if (appId === 21309386) return ""; // VentesCH : l'app dit déjà tout.
  return marche === "ch" ? "[CH] " : "[EN] ";
}

/**
 * ⭐ App Candidatures : le champ « Lieu » a une option **Suisse**, et c'est le
 * bon véhicule — filtrable, déjà utilisé par les RH. On s'en sert plutôt que
 * d'inventer un marqueur.
 * ⚠️ Le champ refuse les valeurs multiples (piège connu) : une seule valeur.
 * ⚠️ Aucune option ne correspond à « anglophone » — un candidat venu du site
 * EN n'a donc que le préfixe de titre et la ligne d'origine. C'est voulu :
 * mieux vaut un champ vide qu'un champ faux.
 */
export const LIEU_SUISSE = 4;

/**
 * ⚠️ SUR L'APP DEMANDES DE STAGE, LA CLÉ N'EST PAS `lieu` MAIS `lieu-2`.
 *
 * Créé le 11/08/2026 à la demande de Giz (field 277801476), avec les mêmes
 * options que les Candidatures — dont **Suisse = 4**, identique par chance et
 * non par construction : c'est vérifié, pas supposé.
 *
 * Pourquoi `lieu-2` : un champ « Lieu » existait déjà sur cette app et a été
 * **supprimé** un jour (field 90584419, `status: "deleted"`). Podio garde
 * l'external_id d'un champ supprimé réservé pour toujours — le nouveau champ
 * hérite donc d'un suffixe. ⛔ `podio_get_app_fields` ne montre pas les champs
 * supprimés : rien n'aurait laissé deviner ce conflit avant de le heurter.
 */
export const CHAMP_LIEU: Record<number, string> = {
  4241365: "lieu", // Candidatures
  11808404: "lieu-2", // Demandes de stage
};

/** App Candidatures — « Vos domaines de compétences ». Multi-valeurs accepté. */
export const COMPETENCE_VERS_OPTION: Record<string, number> = {
  "3D": 1,
  Infographie: 2,
  Réalisation: 13,
  Tournage: 3,
  Montage: 4,
  Programmation: 5,
  "Gestion de production": 6,
  "Voix off": 8,
  Comédien: 9,
  Son: 10,
  Musique: 11,
  Vente: 12,
  "Autre...": 7,
  Photographie: 14,
  "360": 15,
};

/** App Demandes de stage — mêmes libellés, AUTRES identifiants pour certains. */
export const COMPETENCE_STAGE_VERS_OPTION: Record<string, number> = {
  "3D": 1,
  Infographie: 2,
  Réalisation: 13,
  Tournage: 3,
  Montage: 4,
  Programmation: 5,
  "Gestion de production": 6,
  Son: 10,
  Musique: 11,
  Vente: 12,
  "Autre...": 7,
};

export const CONTRAT_VERS_OPTION: Record<string, number> = {
  Alternance: 2,
  "Intermittent / Freelance": 3,
  Société: 4,
  CDD: 5,
  CDI: 6,
};

/** « Etat d'avancement » — les demandes web arrivent en « 1er contact ». */
export const ETAT_PREMIER_CONTACT = 5;

/** « conversion pub » → « oui google ads ». */
export const CONVERSION_GOOGLE_ADS = 1;

/** « étape » des deux apps RH → « à étudier ». */
export const ETAPE_A_ETUDIER = 11;

/**
 * Podio exige une valeur sur les champs obligatoires. Le téléphone est
 * facultatif sur le site — décision de Giz, et elle est bonne : l'exiger fait
 * fuir. On envoie donc une mention explicite plutôt qu'une chaîne vide, qui
 * ferait échouer la création de l'item.
 */
export const NON_COMMUNIQUE = "non communiqué";

/**
 * LE MARCHÉ D'UNE DEMANDE — déduit du DOMAINE, pas de ce que dit la page.
 *
 * ⭐ Pourquoi le serveur tranche plutôt que le composant : le marché décide
 * dans QUELLE entité juridique la demande atterrit. Le laisser dépendre d'une
 * propriété passée au composant, c'est accepter qu'un copier-coller de page
 * envoie un jour des demandes suisses dans le CRM français — une erreur
 * invisible, qui ne se verrait qu'au moment de facturer.
 * Le domaine, lui, ne se trompe jamais : bluevista.ch EST le site suisse.
 *
 * ⚠️ En développement (localhost), aucun domaine ne correspond : on retombe
 * alors sur le marché déclaré par la page, ce qui permet de recetter les
 * trois branchements depuis un seul serveur.
 */
export function marcheDuDomaine(hote: string | null): Marche | null {
  if (!hote) return null;
  const h = hote.toLowerCase().split(":")[0]!;
  if (h.endsWith("bluevista.ch")) return "ch";
  if (h.startsWith("en.")) return "en";
  if (h.endsWith("bluevistaprod.com")) return "fr";
  return null;
}

function echapper(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Convertit un texte de formulaire en HTML de paragraphes.
 * ⛔ L'échappement passe AVANT la mise en forme : sans ça, un visiteur qui
 * colle du HTML dans sa demande l'injecte dans le CRM.
 */
export function versHtml(texte: string): string {
  const lignes = texte.trim().split(/\n+/).filter(Boolean);
  if (lignes.length === 0) return "";
  return lignes.map(l => `<p>${echapper(l.trim())}</p>`).join("");
}

/**
 * LE COMMENTAIRE D'ACQUISITION — la trace qui rend le recâblage Ads possible.
 *
 * ⚠️ Écrit même quand il n'y a pas de gclid, et c'est délibéré : « cette
 * demande n'est PAS venue d'une annonce » est une information, pas un vide.
 * Sans elle, une demande sans commentaire serait indiscernable d'une demande
 * arrivée avant la mise en service du dispositif.
 */
export function commentaireAcquisition(
  type: TypeFormulaire,
  marche: Marche,
  a: Acquisition,
  compléments: string[] = [],
): string {
  const lignes: string[] = [
    `🌐 Demande envoyée depuis le site — formulaire « ${type} », marché ${marche.toUpperCase()}`,
    "",
    `Page d'origine : ${a.page || "inconnue"}`,
    `gclid : ${a.gclid || "aucun (visite non issue d'une annonce Google Ads)"}`,
  ];

  if (a.gbraid) lignes.push(`gbraid : ${a.gbraid}`);
  if (a.wbraid) lignes.push(`wbraid : ${a.wbraid}`);

  const utm = (["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const)
    .filter(k => a[k])
    .map(k => `${k} = ${a[k]}`);
  if (utm.length) lignes.push(`UTM : ${utm.join(" · ")}`);

  if (a.referent) lignes.push(`Arrivé depuis : ${a.referent}`);
  if (compléments.length) lignes.push("", ...compléments);

  lignes.push(
    "",
    `Horodatage serveur : ${new Date().toISOString()}`,
  );

  return lignes.join("\n");
}
