/**
 * LA ROUTE D'ENVOI — le seul endroit du site qui parle à Podio.
 *
 * ⛔⛔ C'EST LA RAISON D'ÊTRE DE CE FICHIER, ET ELLE N'EST PAS NÉGOCIABLE :
 * le jeton Podio ne doit jamais atteindre le navigateur. Un appel Podio fait
 * depuis le composant de formulaire livrerait, à tout visiteur qui ouvre
 * l'inspecteur, le droit d'écrire dans le CRM et de lire les 5 000 ventes.
 * Le navigateur envoie ici, ce fichier envoie à Podio. Rien d'autre.
 *
 * ⚠️ `runtime = "nodejs"` est explicite : la limite de débit vit dans la
 * mémoire du processus, et un runtime edge la répartirait sur des instances
 * éphémères où elle ne compterait rien.
 */

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { creerItem, ajouterCommentaire } from "@/lib/podio";
import { journaliser, mettreEnAttente } from "@/lib/journal";
import { alerterEchecPodio } from "@/lib/alerte";
import {
  DELAI_MAXIMUM_MS,
  DELAI_MINIMUM_MS,
  debitAtteint,
  enregistrerEnvoi,
  ipDuVisiteur,
} from "@/lib/anti-spam";
import {
  BUDGETS,
  CHAMP_PIEGE,
  COMPETENCES,
  COMPETENCES_STAGE,
  MARCHES,
  ORIGINE_LISIBLE,
  TYPES_FORMULAIRE,
  type Acquisition,
  type Marche,
  type TypeFormulaire,
} from "@/lib/formulaires";
import {
  APPS_AVEC_CHAMP_GCLID,
  APPS_AVEC_CONVERSION_PUB,
  BUDGET_VERS_OPTION,
  CHAMP_GCLID,
  COMPETENCE_STAGE_VERS_OPTION,
  COMPETENCE_VERS_OPTION,
  CONTRAT_VERS_OPTION,
  CONVERSION_GOOGLE_ADS,
  ETAPE_A_ETUDIER,
  CHAMP_LIEU,
  ETAT_PREMIER_CONTACT,
  LIEU_SUISSE,
  NON_COMMUNIQUE,
  PILIER_VERS_TYPE,
  appCible,
  commentaireAcquisition,
  marcheDuDomaine,
  prefixeTitre,
  versHtml,
} from "@/lib/podio-formulaires";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Longueurs maximales — une demande de 200 000 signes est une attaque. */
const MAX_COURT = 200;
const MAX_LONG = 8_000;

function texte(v: unknown, max = MAX_COURT): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

/**
 * ⚠️ On ne valide PAS l'adresse e-mail au caractère près. Les expressions
 * régulières « strictes » qui circulent rejettent des adresses parfaitement
 * valides (apostrophes, nouveaux TLD, sous-adressage). Refuser la demande
 * d'un vrai client pour faire plaisir à une regex coûte infiniment plus cher
 * qu'accepter une adresse morte, qui se verra au premier envoi.
 */
function emailPlausible(v: string): boolean {
  return v.length >= 6 && v.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function acquisition(v: unknown): Acquisition {
  if (!v || typeof v !== "object") return {};
  const src = v as Record<string, unknown>;
  const clefs = [
    "gclid",
    "gbraid",
    "wbraid",
    "page",
    "referent",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ] as const;
  const a: Acquisition = {};
  for (const k of clefs) {
    const val = texte(src[k], 500);
    if (val) a[k] = val;
  }
  return a;
}

function echec(message: string, code = 400) {
  return NextResponse.json({ ok: false, message }, { status: code });
}

export async function POST(requete: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = (await requete.json()) as Record<string, unknown>;
  } catch {
    return echec("Requête illisible.");
  }

  // ── Barrière 1 : le champ piège ────────────────────────────────────────
  // ⭐ On répond 200 « ok » à un robot. Lui renvoyer une erreur, c'est lui
  // apprendre que le piège existe et l'inviter à réessayer sans le remplir.
  // Silence et succès apparent : il passe au site suivant.
  if (texte(corps[CHAMP_PIEGE])) {
    return NextResponse.json({ ok: true });
  }

  // ── Barrière 2 : le temps passé sur le formulaire ──────────────────────
  const affiche = Number(corps.msDepuisAffichage);
  if (!Number.isFinite(affiche) || affiche < DELAI_MINIMUM_MS || affiche > DELAI_MAXIMUM_MS) {
    return echec(
      "Votre envoi n'a pas pu être vérifié. Rechargez la page et réessayez, " +
        "ou écrivez-nous directement.",
    );
  }

  // ── Barrière 3 : la limite de débit ────────────────────────────────────
  // ⚠️ On LIT ici et on ENREGISTRE seulement après création de l'item : une
  // demande refusée pour un e-mail mal tapé ne doit pas consommer le quota
  // de son auteur (voir le commentaire de `debitAtteint`).
  const ip = ipDuVisiteur(requete.headers);
  if (debitAtteint(ip)) {
    return echec(
      "Vous avez déjà envoyé plusieurs demandes. Laissez-nous le temps de les " +
        "lire — ou appelez-nous, c'est plus rapide.",
      429,
    );
  }

  const type = texte(corps.type) as TypeFormulaire;
  if (!TYPES_FORMULAIRE.includes(type)) return echec("Formulaire inconnu.");

  // ── Le marché : le domaine tranche, la page ne fait que dépanner ───────
  // ⛔ Une demande suisse ne doit jamais entrer dans le CRM français : ce sont
  // deux entités qui facturent séparément. Le domaine est la seule source qui
  // ne peut pas dériver au fil des copier-coller de pages.
  const declare = texte(corps.marche) as Marche;
  const marche =
    marcheDuDomaine(requete.headers.get("host")) ??
    (MARCHES.includes(declare) ? declare : "fr");

  // ── Le consentement ────────────────────────────────────────────────────
  // ⚠️ Vérifié CÔTÉ SERVEUR aussi. Un `required` sur une case à cocher
  // n'engage que les navigateurs : il se contourne en trois lignes.
  if (corps.consentement !== true) {
    return echec("Merci d'accepter le traitement de vos données pour continuer.");
  }

  const nom = texte(corps.nom);
  const email = texte(corps.email);
  const telephone = texte(corps.telephone) || NON_COMMUNIQUE;
  const message = texte(corps.message, MAX_LONG);

  if (!nom) return echec("Le nom est obligatoire.");
  if (!emailPlausible(email)) return echec("L'adresse e-mail semble incomplète.");
  if (!message) return echec("Merci de décrire votre demande.");

  const acq = acquisition(corps.acquisition);
  const commun = { nom, email, telephone, message };

  // ── LE FILET, ÉTAPE 1 : ON ÉCRIT AVANT D'ENVOYER ───────────────────────
  // ⛔⛔ Cet ordre n'est pas négociable. Tant que la demande n'est que dans la
  // mémoire du processus, elle n'existe pas : un redémarrage, un plantage, une
  // coupure et personne ne saura jamais qu'un prospect a écrit.
  // C'est aussi la SEULE étape dont l'échec justifie de dire non au visiteur —
  // si on ne peut même pas écrire sur le disque, on ne peut rien lui promettre.
  const reference = randomUUID();
  try {
    await journaliser({ reference, etape: "recu", type, marche, email });
  } catch (e) {
    console.error("[formulaire] JOURNAL INDISPONIBLE — demande refusée :", e);
    return echec(
      "Nous ne pouvons pas enregistrer votre demande pour le moment. " +
        "Réessayez dans quelques minutes, ou appelez-nous.",
      503,
    );
  }

  try {
    const { itemId, appItemId, app } =
      type === "ventes"
        ? await envoyerVente(corps, commun, acq, marche)
        : type === "recrutement"
          ? await envoyerCandidature(corps, commun, acq, marche)
          : await envoyerStage(corps, commun, acq, marche);

    await journaliser({ reference, etape: "podio-ok", type, marche, email, app, itemId, appItemId });
    enregistrerEnvoi(ip);
    return NextResponse.json({ ok: true, reference: appItemId, itemId });
  } catch (erreur) {
    // ── LE FILET, ÉTAPE 2 : PODIO A DIT NON, LA DEMANDE VIT QUAND MÊME ────
    const motif = erreur instanceof Error ? erreur.message : String(erreur);
    console.error(`[formulaire] Podio a refusé la demande ${reference} :`, erreur);

    // On garde TOUT ce qui permettra de la rejouer telle quelle, plus le
    // marché résolu côté serveur — sinon un rejeu depuis un autre contexte
    // pourrait la router vers la mauvaise app.
    const aRejouer = { ...corps, type, marche, reference, motif };

    let sauvegardee = false;
    try {
      await mettreEnAttente(reference, aRejouer);
      sauvegardee = true;
    } catch (e) {
      console.error(`[formulaire] MISE EN ATTENTE IMPOSSIBLE pour ${reference} :`, e);
    }

    // ⭐ L'alerte porte la demande ENTIÈRE : même si le rejeu ne tourne jamais,
    // le commercial a le lead dans sa boîte et peut répondre dans l'heure.
    const alertee = await alerterEchecPodio(reference, aRejouer, motif);

    await journaliser({ reference, etape: "podio-echec", type, marche, email, erreur: motif });
    await journaliser({
      reference,
      etape: alertee ? "alerte-envoyee" : "alerte-echec",
      type,
      marche,
      email,
    });

    // ⛔ ET C'EST ICI QUE LE COMPORTEMENT CHANGE VRAIMENT. Tant que la demande
    // est conservée ET qu'un humain est prévenu, dire au visiteur « ça n'a pas
    // marché » serait FAUX : son message est chez nous, quelqu'un va le lire.
    // Lui renvoyer une erreur le pousserait à renvoyer trois fois, ou à
    // partir. On ne ment que dans un seul sens — jamais en promettant à vide.
    if (sauvegardee || alertee) {
      enregistrerEnvoi(ip);
      return NextResponse.json({ ok: true, reference, differe: true });
    }

    return echec(
      "L'envoi n'a pas abouti. Réessayez dans un instant — ou écrivez-nous " +
        "directement, on ne vous perdra pas.",
      502,
    );
  }
}

type Commun = { nom: string; email: string; telephone: string; message: string };

/** ────────── VENTES → Ventes (FR) · Ventes ENG · VentesCH ────────────── */
async function envoyerVente(
  corps: Record<string, unknown>,
  c: Commun,
  acq: Acquisition,
  marche: Marche,
) {
  const app = appCible("ventes", marche);
  const entreprise = texte(corps.entreprise);
  if (!entreprise) return Promise.reject(new Error("Entreprise manquante"));

  /* ⛔ Le formulaire ne DEMANDE plus le pilier ni le budget — arbitrage de
     Giz, 11/08/2026 : « je ne veux pas contraindre le client ». On continue
     néanmoins à les LIRE s'ils arrivent : la route sert aussi le site suisse
     et servira l'anglais, et un champ qui disparaît du formulaire ne doit pas
     faire tomber une demande qui l'enverrait encore. */
  const pilier = texte(corps.pilier);
  const budget = texte(corps.budget);

  const champs: Record<string, unknown> = {
    // Le titre reprend le nom de l'entreprise : c'est ce que faisait
    // l'ancien formulaire web, et l'équipe renomme ensuite en
    // « CLIENT - PROJET ». On ne change pas son geste de tri.
    // Le titre reprend le nom de l'entreprise (c'est ce que faisait l'ancien
    // formulaire, et l'équipe le renomme ensuite « CLIENT - PROJET »),
    // précédé de `[EN]` quand la demande anglaise atterrit dans l'app FR.
    "nom-du-projet": prefixeTitre(marche, app.id) + entreprise,
    societe: entreprise,
    "opportunity-name": c.email,
    nom: c.nom,
    telephone: c.telephone,
    // ⛔ L'ORIGINE EN PREMIÈRE LIGNE, PAS SEULEMENT EN COMMENTAIRE. Depuis que
    // les demandes anglaises entrent dans l'app française, un commercial peut
    // ouvrir une demande en anglais en croyant lire un prospect français. La
    // ligne d'origine est la première chose qu'il voit ; un commentaire, il
    // faut penser à le déplier.
    demande: versHtml(`Reçu sur : ${ORIGINE_LISIBLE[marche]}\n\n${c.message}`),
    "etat-de-la-demande": ETAT_PREMIER_CONTACT,
  };

  // ⭐ Le gclid dans sa COLONNE — c'est ce qui le rend exportable en CSV, donc
  // utilisable pour un import de conversions hors ligne dans Google Ads.
  // Le commentaire garde le contexte complet (page d'origine, UTM) ; la
  // colonne garde la seule valeur qui s'automatise.
  const clic = acq.gclid || acq.gbraid || acq.wbraid;
  if (clic && APPS_AVEC_CHAMP_GCLID.has(app.id)) champs[CHAMP_GCLID] = clic;

  if (pilier && PILIER_VERS_TYPE[pilier]) champs["type-de-demande"] = PILIER_VERS_TYPE[pilier];
  if (budget && BUDGET_VERS_OPTION[budget]) champs.budget = BUDGET_VERS_OPTION[budget];

  // « Date prévisionnelle » — champ TEXTE côté Podio, pas un champ date : les
  // items existants portent « décembre 2026 », « Oct 2027 ». On n'essaie donc
  // pas de normaliser ce que le visiteur écrit.
  const echeance = texte(corps.echeance);
  if (echeance) champs["date-previsionnelle-de-votre-projet"] = echeance;

  // ⭐ LE GESTE LE MOINS CHER DE TOUT LE DOSSIER ADS. Ce champ existe depuis
  // toujours et n'a jamais été rempli une seule fois sur 500 items. Coché
  // automatiquement dès qu'un gclid est présent, il donne l'attribution
  // exacte dans Podio — sans attendre le moindre développement Google Ads.
  // ⛔ Uniquement sur l'app française : le champ n'existe pas sur les deux
  // autres, et l'y écrire ferait échouer la création — donc perdre la demande.
  if (clic && APPS_AVEC_CONVERSION_PUB.has(app.id)) {
    champs["conversion-pub"] = CONVERSION_GOOGLE_ADS;
  }

  const item = await creerItem(app.id, champs);

  const complements: string[] = [];
  if (pilier) complements.push(`Pilier choisi sur le site : ${libellePilier(pilier)}`);
  if (budget) complements.push(`Budget déclaré : ${libelleBudget(budget)}`);

  await ajouterCommentaire(
    item.item_id,
    commentaireAcquisition("ventes", marche, acq, complements),
    app.id,
  );
  return { itemId: item.item_id, appItemId: item.app_item_id, app: app.id };
}

/** ──────────────────── RECRUTEMENT → app 4241365 ─────────────────────── */
async function envoyerCandidature(
  corps: Record<string, unknown>,
  c: Commun,
  acq: Acquisition,
  marche: Marche,
) {
  const app = appCible("recrutement", marche);
  const parcours = texte(corps.entreprise); // « Formation ou dernier poste »
  const poste = texte(corps.poste);
  const contrat = texte(corps.contrat);
  const lien = texte(corps.lien, 500);
  const competences = listeValidee(corps.competences, COMPETENCES);

  if (!competences.length) return Promise.reject(new Error("Compétences manquantes"));
  if (!CONTRAT_VERS_OPTION[contrat]) return Promise.reject(new Error("Type de contrat manquant"));

  // Le poste visé n'a pas de colonne dans l'app : il ouvre le texte de la
  // candidature, où les RH le lisent en premier — précédé de l'origine, pour
  // la même raison que côté Ventes (une candidature anglaise se répond en
  // anglais, et rien d'autre dans l'item ne le dit).
  const texteComplet = [
    `Reçu sur : ${ORIGINE_LISIBLE[marche]}`,
    poste ? `Poste visé : ${poste}` : null,
    "",
    c.message,
  ]
    .filter(l => l !== null)
    .join("\n");

  const champs: Record<string, unknown> = {
    "applicants-name": prefixeTitre(marche, app.id) + c.nom,
    "email-address": c.email,
    "contact-phone-number": c.telephone,
    resum: versHtml(texteComplet),
    competences: competences.map(x => COMPETENCE_VERS_OPTION[x]),
    "job-applying-for2": CONTRAT_VERS_OPTION[contrat],
    "applicant-stage": ETAPE_A_ETUDIER,
  };
  if (marche === "ch") champs[CHAMP_LIEU[app.id]!] = LIEU_SUISSE;
  if (parcours) champs.fonction = parcours;
  if (lien) champs["twitter-profile"] = lien;

  const item = await creerItem(app.id, champs);
  await ajouterCommentaire(
    item.item_id,
    commentaireAcquisition("recrutement", marche, acq, poste ? [`Poste visé : ${poste}`] : []),
    app.id,
  );
  return { itemId: item.item_id, appItemId: item.app_item_id, app: app.id };
}

/** ────────────────────── STAGE → app 11808404 ────────────────────────── */
async function envoyerStage(
  corps: Record<string, unknown>,
  c: Commun,
  acq: Acquisition,
  marche: Marche,
) {
  const app = appCible("stage", marche);
  const ecole = texte(corps.entreprise); // « École et niveau d'études »
  const debut = texte(corps.debut, 10);
  const fin = texte(corps.fin, 10);
  const lien = texte(corps.lien, 500);
  const competences = listeValidee(corps.competences, COMPETENCES_STAGE);

  // ⛔ « Vos dates de stage » est un champ DATE obligatoire dans Podio. La
  // maquette demandait « Période et durée » en texte libre : un texte ne
  // rentre pas dans un champ date, et l'API refuse l'item. D'où deux dates.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(debut) || !/^\d{4}-\d{2}-\d{2}$/.test(fin)) {
    return Promise.reject(new Error("Dates de stage manquantes ou mal formées"));
  }
  if (fin < debut) return Promise.reject(new Error("Dates de stage incohérentes"));

  const champs: Record<string, unknown> = {
    "applicants-name": prefixeTitre(marche, app.id) + c.nom,
    "email-address": c.email,
    "contact-phone-number": c.telephone,
    resum: versHtml(`Reçu sur : ${ORIGINE_LISIBLE[marche]}\n\n${c.message}`),
    // ⛔ MINUIT SUR LES DEUX BORNES — et il a fallu deux échecs pour le savoir.
    // Le champ est réglé sur `time: "disabled"` dans Podio. Conséquence :
    //   · « 2027-01-11 09:00:00 » → refusé, « Start and end must both be with
    //     time or both must be without time » (message trompeur : les deux
    //     bornes AVAIENT une heure, c'est le réglage du champ qui refuse) ;
    //   · « 2027-01-11 » tout court → refusé aussi, « Must be a date with time
    //     in the format YYYY-MM-DD HH:MM:SS ».
    // Les deux messages se contredisent en apparence. Ce qui a tranché n'est
    // aucun des deux : c'est la LECTURE DES ITEMS EXISTANTS, qui portent tous
    // « 00:00:00 » aux deux bornes.
    // ⚠️ Le schéma de l'app ne dit pas ça : il annonce « type: date » et rien
    // de plus. Aucun raisonnement sur le schéma n'aurait donné la réponse.
    "vos-dates-de-stage": { start: `${debut} 00:00:00`, end: `${fin} 00:00:00` },
    "applicant-stage": ETAPE_A_ETUDIER,
  };
  if (marche === "ch") champs[CHAMP_LIEU[app.id]!] = LIEU_SUISSE;
  if (ecole) champs.fonction = ecole;
  if (lien) champs["twitter-profile"] = lien;
  if (competences.length) {
    champs.competences = competences.map(x => COMPETENCE_STAGE_VERS_OPTION[x]);
  }

  const item = await creerItem(app.id, champs);
  await ajouterCommentaire(
    item.item_id,
    commentaireAcquisition("stage", marche, acq, ecole ? [`École et niveau : ${ecole}`] : []),
    app.id,
  );
  return { itemId: item.item_id, appItemId: item.app_item_id, app: app.id };
}

/** N'accepte que des valeurs de la liste blanche — jamais ce qui arrive. */
function listeValidee(v: unknown, autorisees: readonly string[]): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && autorisees.includes(x)).slice(0, 15);
}

function libelleBudget(cle: string): string {
  return BUDGETS.find(b => b.cle === cle)?.libelle ?? cle;
}

function libellePilier(cle: string): string {
  return (
    { film: "Communication & marketing", evenement: "Événementiel", immersion: "Immersion" }[
      cle
    ] ?? "Je ne sais pas encore"
  );
}
