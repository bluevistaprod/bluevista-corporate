/**
 * LE CLIENT PODIO — CÔTÉ SERVEUR UNIQUEMENT.
 *
 * ⛔⛔ CE FICHIER NE DOIT JAMAIS ÊTRE IMPORTÉ PAR UN COMPOSANT CLIENT.
 * Il porte les identifiants Podio. S'ils atteignaient le navigateur, n'importe
 * quel visiteur pourrait écrire dans le CRM — et lire les 5 000 ventes.
 * Le garde-fou ci-dessous n'est pas décoratif : il fait échouer le build ou la
 * page à la première tentative, au lieu de laisser fuir le secret en silence.
 *
 * ⚠️ Aucune variable de ce fichier ne porte le préfixe NEXT_PUBLIC_ : c'est ce
 * préfixe, et lui seul, qui décide si Next inline une valeur dans le bundle
 * navigateur. Ne jamais le mettre sur PODIO_*.
 */

if (typeof window !== "undefined") {
  throw new Error(
    "src/lib/podio.ts a été importé côté navigateur. Les identifiants Podio " +
      "ne doivent jamais quitter le serveur : passer par la route /api/formulaire.",
  );
}

/**
 * ⚠️ `PODIO_API_BASE` n'est là que pour la RECETTE : il permet de pointer vers
 * un hôte injoignable et de vérifier pour de vrai que le filet (journal,
 * mise en attente, alerte) attrape bien une panne. Non renseigné en production.
 */
const PODIO = process.env.PODIO_API_BASE || "https://api.podio.com";

/**
 * ⭐⭐ DEUX FAÇONS DE S'AUTHENTIFIER, ET LA BONNE N'EST PAS CELLE QU'ON CROIT.
 *
 * **1. Par APPLICATION (`grant_type: "app"`) — celle qu'on veut.** Chaque app
 * Podio expose un `App ID` + un `App Token` (interface : ouvrir l'app →
 * ⚙ Modifier l'application → onglet Developer). Le site s'authentifie alors
 * comme l'application elle-même. Deux bénéfices, et le second est le vrai :
 *   · **aucun mot de passe utilisateur sur le serveur web** ;
 *   · un jeton volé ne donne accès **qu'à son app** — pas aux 5 000 ventes,
 *     pas aux 4 600 candidatures, pas au reste de l'organisation.
 *
 * **2. Par MOT DE PASSE (`grant_type: "password"`) — le repli.** Le serveur
 * porte alors les identifiants d'un vrai compte, donc TOUS ses droits.
 *
 * ⛔ ET IL Y A UNE RAISON DE PLUS, SIGNALÉE PAR PODIO LUI-MÊME LE 11/08/2026 :
 * la clé `claude` porte l'avertissement *« Les clés API ne doivent pas être
 * partagées entre plusieurs utilisateurs »*, et dépasse déjà son plafond
 * horaire (270 req/h pour 250 autorisées). Un formulaire public, c'est par
 * définition beaucoup d'utilisateurs différents : le brancher sur cette clé
 * aggraverait un manquement déjà constaté. **Le site doit avoir sa propre clé.**
 *
 * 👉 Le code choisit tout seul : si un `PODIO_APP_TOKEN_<app_id>` existe pour
 * l'app visée, il s'authentifie par application ; sinon il retombe sur le mot
 * de passe, pour que le développement local continue de fonctionner.
 */
type Jeton = { valeur: string; expireLe: number; rafraichir: string | null };

/** Un cache par « portée » : `password`, ou l'app_id pour l'auth par application. */
const jetons = new Map<string, Jeton>();

/** Marge de sécurité : on renouvelle 5 min avant l'expiration annoncée. */
const MARGE_MS = 5 * 60 * 1000;

function clientApi() {
  const { PODIO_CLIENT_ID, PODIO_CLIENT_SECRET } = process.env;
  if (!PODIO_CLIENT_ID || !PODIO_CLIENT_SECRET) {
    throw new Error(
      "Clé API Podio absente. Renseigner PODIO_CLIENT_ID et PODIO_CLIENT_SECRET " +
        "dans .env.local (voir .env.local.exemple).",
    );
  }
  return { PODIO_CLIENT_ID, PODIO_CLIENT_SECRET };
}

/** Le jeton d'application de cette app, s'il a été configuré. */
function jetonApplication(appId: number): string | undefined {
  return process.env[`PODIO_APP_TOKEN_${appId}`] || undefined;
}

async function demanderJeton(portee: string, appId: number): Promise<string> {
  const cli = clientApi();
  const precedent = jetons.get(portee);

  // On tente d'abord le rafraîchissement : plus léger, et il n'expose pas une
  // fois de plus le secret sur le réseau.
  if (precedent?.rafraichir) {
    const res = await fetch(`${PODIO}/oauth/token/v2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: cli.PODIO_CLIENT_ID,
        client_secret: cli.PODIO_CLIENT_SECRET,
        refresh_token: precedent.rafraichir,
      }),
    });
    if (res.ok) return retenir(portee, await res.json());
    jetons.delete(portee); // Rafraîchissement refusé : authentification complète.
  }

  const appToken = jetonApplication(appId);
  const corps = appToken
    ? {
        grant_type: "app",
        client_id: cli.PODIO_CLIENT_ID,
        client_secret: cli.PODIO_CLIENT_SECRET,
        app_id: appId,
        app_token: appToken,
      }
    : {
        grant_type: "password",
        client_id: cli.PODIO_CLIENT_ID,
        client_secret: cli.PODIO_CLIENT_SECRET,
        username: exige("PODIO_USERNAME"),
        password: exige("PODIO_PASSWORD"),
      };

  const res = await fetch(`${PODIO}/oauth/token/v2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  });

  if (!res.ok) {
    throw new Error(
      `Authentification Podio refusée (${res.status}, mode ${appToken ? "application" : "mot de passe"}) : ${await res.text()}`,
    );
  }
  return retenir(portee, await res.json());
}

function retenir(portee: string, d: { access_token: string; expires_in: number; refresh_token?: string }) {
  jetons.set(portee, {
    valeur: d.access_token,
    expireLe: Date.now() + d.expires_in * 1000,
    rafraichir: d.refresh_token ?? null,
  });
  return d.access_token;
}

function exige(nom: string): string {
  const v = process.env[nom];
  if (!v) {
    throw new Error(
      `${nom} manquant. Renseigner un PODIO_APP_TOKEN_<app_id> pour chaque app ` +
        `(authentification par application, recommandée), ou à défaut PODIO_USERNAME ` +
        `et PODIO_PASSWORD dans .env.local.`,
    );
  }
  return v;
}

async function jetonValide(appId: number): Promise<string> {
  // ⚠️ La portée du cache doit distinguer les deux modes : en authentification
  // par application, un jeton n'ouvre QUE son app. Un cache commun servirait le
  // jeton des Ventes à une écriture dans les Candidatures, qui échouerait en 403.
  const portee = jetonApplication(appId) ? `app:${appId}` : "password";
  const j = jetons.get(portee);
  if (j && Date.now() < j.expireLe - MARGE_MS) return j.valeur;
  return demanderJeton(portee, appId);
}

/**
 * LES RÉESSAIS — et surtout, ce sur quoi on NE réessaie PAS.
 *
 * ⭐ Trois tentatives, espacées de 0,5 s puis 2 s. Déclencheurs :
 *   · une **panne réseau** (`fetch` lève) — vu en recette le 11/08/2026 : un
 *     `fetch failed` isolé, Podio n'avait rien refusé, et la demande était
 *     perdue pour le visiteur ;
 *   · un **429** (Podio nous freine) ou un **5xx** (Podio a un incident).
 *
 * ⛔⛔ ON NE RÉESSAIE JAMAIS SUR UN 4xx (hors 429), ET C'EST IMPORTANT. Un 400
 * veut dire « ce que tu envoies est invalide » : le renvoyer à l'identique
 * échouera pareil, trois fois plus lentement. Pire, sur une CRÉATION d'item,
 * réessayer une requête dont on a mal lu la réponse fabriquerait un DOUBLON
 * dans le CRM — un faux prospect que quelqu'un rappellera deux fois.
 * Une exception réseau, elle, garantit qu'aucune réponse n'a été reçue : c'est
 * le seul cas où réessayer est sûr sans idempotence côté serveur.
 *
 * ⚠️ Le temps total reste borné (~2,5 s d'attente au pire) : au-delà, le
 * visiteur croit que la page a planté et repart. La suite du filet — journal,
 * mise en attente, alerte — prend le relais, et elle, elle ne coûte rien à
 * l'attente du visiteur.
 */
const ATTENTES_MS = [500, 2000];

function estTemporaire(status: number): boolean {
  return status === 429 || status >= 500;
}

async function appel(
  chemin: string,
  corps: unknown,
  appId: number,
  jetonDejaRenouvele = false,
): Promise<unknown> {
  let derniereErreur: Error | null = null;

  for (let essai = 0; essai <= ATTENTES_MS.length; essai++) {
    if (essai > 0) await new Promise(r => setTimeout(r, ATTENTES_MS[essai - 1]));

    let res: Response;
    try {
      res = await fetch(`${PODIO}${chemin}`, {
        method: "POST",
        headers: {
          Authorization: `OAuth2 ${await jetonValide(appId)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(corps),
      });
    } catch (e) {
      derniereErreur = e instanceof Error ? e : new Error(String(e));
      console.warn(`[podio] ${chemin} — panne réseau (essai ${essai + 1}) : ${derniereErreur.message}`);
      continue;
    }

    // Un jeton peut être révoqué avant son expiration annoncée. On le renouvelle
    // une fois, une seule, sinon on boucle.
    if (res.status === 401 && !jetonDejaRenouvele) {
      jetons.delete(jetonApplication(appId) ? `app:${appId}` : "password");
      return appel(chemin, corps, appId, true);
    }

    const texte = await res.text();
    if (res.ok) return texte ? JSON.parse(texte) : null;

    derniereErreur = new Error(`Podio ${chemin} → ${res.status} : ${texte.slice(0, 500)}`);
    if (!estTemporaire(res.status)) throw derniereErreur; // Définitif : inutile d'insister.
    console.warn(`[podio] ${chemin} — ${res.status} temporaire (essai ${essai + 1})`);
  }

  throw derniereErreur ?? new Error(`Podio ${chemin} : échec sans erreur remontée`);
}

/**
 * Crée un item dans une app. Renvoie l'item_id ET l'app_item_id — c'est ce
 * second numéro, court, que les équipes lisent (V05798).
 */
export async function creerItem(
  appId: number,
  champs: Record<string, unknown>,
): Promise<{ item_id: number; app_item_id: number }> {
  const d = (await appel(`/item/app/${appId}/`, { fields: champs }, appId)) as {
    item_id: number;
    app_item_id: number;
  };
  return d;
}

/**
 * Ajoute un commentaire sur un item.
 *
 * ⭐ C'EST LE PORTEUR DU `gclid`, ET CE N'EST PAS UN PIS-ALLER TEMPORAIRE
 * TANT QU'AUCUN CHAMP N'EXISTE. Aucune des trois apps n'a de champ prévu pour
 * une donnée d'acquisition : y écrire de force dans un champ métier
 * salirait des colonnes que les équipes lisent tous les jours. Le commentaire
 * est daté, horodaté, cherchable par l'API — et n'abîme rien.
 * 👉 Voir PODIO_CHAMP_GCLID_* dans .env.local.exemple pour basculer vers un
 *    vrai champ le jour où Giz l'aura créé.
 */
export async function ajouterCommentaire(
  itemId: number,
  texte: string,
  appId: number,
): Promise<void> {
  await appel(`/comment/item/${itemId}`, { value: texte }, appId);
}
