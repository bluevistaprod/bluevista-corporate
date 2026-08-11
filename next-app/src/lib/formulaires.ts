/**
 * LE CONTRAT DES TROIS FORMULAIRES — partagé entre le navigateur et le serveur.
 *
 * ⛔ AUCUN SECRET ICI. Ce fichier part dans le bundle navigateur : il ne
 * contient que des libellés et des listes de choix. Les identifiants Podio et
 * la correspondance vers les identifiants d'options vivent dans
 * `podio-formulaires.ts`, qui reste côté serveur.
 *
 * ⭐ POURQUOI UN FICHIER PARTAGÉ PLUTÔT QUE DEUX LISTES : le jour où une
 * option change d'un côté seulement, le serveur rejette silencieusement des
 * demandes valides. Une seule source, les deux côtés la lisent.
 */

export type TypeFormulaire = "ventes" | "recrutement" | "stage";

export const TYPES_FORMULAIRE: TypeFormulaire[] = ["ventes", "recrutement", "stage"];

/**
 * LE MARCHÉ — trois versions du site, mais PAS trois CRM.
 *
 * ⛔ CE QUI JUSTIFIE UNE APP À PART, C'EST L'ENTITÉ QUI FACTURE, PAS LA LANGUE.
 * `[Giz, 11/08/2026]` Le site suisse garde son app (VentesCH) parce que
 * bluevista.ch est une autre société : une demande suisse qui atterrirait dans
 * le CRM français enverrait un prospect vers une entité qui ne peut pas lui
 * facturer. L'anglais, lui, est vendu et facturé par Bluevista France :
 * une app séparée n'apportait rien et coûtait un CRM de plus à tenir.
 *
 * 👉 **FR et EN vont donc dans la MÊME app Ventes.** C'est le formulaire qui
 * est traduit, pas la destination.
 *
 * ⚠️ Ce qui doit alors être écrit noir sur blanc dans l'item : **sur quel site
 * la demande a été reçue.** Sans ça, un commercial ouvre une demande anglaise
 * en croyant lire un prospect français, et répond dans la mauvaise langue.
 * D'où la première ligne d'origine ajoutée au texte de la demande.
 */
export type Marche = "fr" | "en" | "ch";

export const MARCHES: Marche[] = ["fr", "en", "ch"];

/** Ce qui s'affiche en tête d'une demande, pour que l'origine saute aux yeux. */
export const ORIGINE_LISIBLE: Record<Marche, string> = {
  fr: "Site français (bluevistaprod.com)",
  en: "Site ANGLAIS (en.bluevistaprod.com) — le prospect écrit et attend une réponse en anglais",
  ch: "Site SUISSE (bluevista.ch)",
};

/**
 * LES TRANCHES DE BUDGET — ⚠️ CE SONT CELLES DE PODIO, PAS D'AUTRES.
 *
 * La maquette en proposait cinq, calées sur d'autres seuils (5 000 / 15 000 /
 * 50 000). Les faire coexister avec les quatre tranches de l'app Ventes
 * imposait une conversion approximative : « 5 000 à 15 000 € » chevauche la
 * frontière des 10 000 € de Podio et devait tomber dans l'une ou l'autre case,
 * arbitrairement. On aurait fabriqué une donnée fausse à chaque envoi.
 * 👉 Les tranches du site s'alignent sur celles que les équipes lisent.
 */
export const BUDGETS = [
  { cle: "moins-10k", libelle: "Moins de 10 000 €" },
  { cle: "10k-20k", libelle: "10 000 à 20 000 €" },
  { cle: "20k-30k", libelle: "20 000 à 30 000 €" },
  { cle: "plus-30k", libelle: "Plus de 30 000 €" },
] as const;

/**
 * LES DOMAINES DE COMPÉTENCES — repris à l'identique de l'app Candidatures.
 *
 * ⛔ Ce champ est OBLIGATOIRE dans Podio : sans lui, l'API refuse l'item et la
 * candidature n'existe nulle part. Il ne figurait pas dans la maquette — il
 * n'est pas ajouté par goût du formulaire long, il est ajouté parce que la
 * destination l'exige. Et il vaut mieux que du texte libre : c'est sur cette
 * colonne que les RH filtrent.
 */
export const COMPETENCES = [
  "3D",
  "Infographie",
  "Réalisation",
  "Tournage",
  "Montage",
  "Photographie",
  "360",
  "Programmation",
  "Gestion de production",
  "Son",
  "Musique",
  "Voix off",
  "Comédien",
  "Vente",
  "Autre...",
] as const;

/** Idem : obligatoire côté Podio, absent de la maquette. */
export const CONTRATS = [
  "Alternance",
  "Intermittent / Freelance",
  "Société",
  "CDD",
  "CDI",
] as const;

/** Les compétences proposées aux stagiaires — l'app en offre moins. */
export const COMPETENCES_STAGE = [
  "3D",
  "Infographie",
  "Réalisation",
  "Tournage",
  "Montage",
  "Programmation",
  "Gestion de production",
  "Son",
  "Musique",
  "Vente",
  "Autre...",
] as const;

/**
 * LES DONNÉES D'ACQUISITION — ce qui répond à « d'où vient cette demande ? ».
 *
 * ⭐ `gclid` est la pièce maîtresse : c'est lui, et lui seul, qui permettra de
 * rattacher une demande à une annonce Google Ads au moment du recâblage.
 * Sans lui, on remesurera en septembre ce qu'on mesure aujourd'hui — un
 * compteur d'envois qui ne sait pas distinguer un devis d'une candidature.
 */
export type Acquisition = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  page?: string;
  referent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export const CLE_ACQUISITION = "bv_acquisition";

/**
 * LE NOM DU CHAMP PIÈGE — partagé, parce que le formulaire doit le poser et
 * le serveur doit le lire. S'ils divergeaient, le piège serait un champ
 * inutile dans le HTML et le serveur n'attraperait plus rien : une panne
 * silencieuse, qui ne se voit qu'au volume de spam six semaines plus tard.
 *
 * ⚠️ Le nom doit rester crédible pour un robot — « website » l'est,
 * « honeypot » ne l'est pas. Le mécanisme, lui, est dans `anti-spam.ts`.
 */
export const CHAMP_PIEGE = "website";
