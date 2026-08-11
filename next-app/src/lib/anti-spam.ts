/**
 * ANTI-SPAM — trois barrières, aucune visible par un humain.
 *
 * ⛔ POURQUOI C'EST OBLIGATOIRE ET NON « À VOIR PLUS TARD » : un formulaire
 * public branché sur un CRM se fait inonder en quelques jours. Le coût n'est
 * pas le bruit, c'est la confiance — le jour où la boîte commerciale contient
 * 300 faux items, plus personne ne la lit, et une vraie demande se perd.
 *
 * ⛔ PAS DE CAPTCHA. Il dégrade l'expérience de ceux qu'on veut (des décideurs
 * pressés), il n'arrête pas les fermes humaines, et reCAPTCHA ferait entrer un
 * mouchard Google sur la page de conversion — donc une ligne de plus dans le
 * bandeau de consentement. Les trois barrières ci-dessous coûtent zéro au
 * visiteur légitime.
 */

/** ── Barrière 1 : le champ piège ────────────────────────────────────────
 * Un champ invisible qu'aucun humain ne peut remplir, que les robots
 * remplissent parce qu'ils lisent le HTML et non l'écran. Rempli = rejet.
 *
 * ⚠️ Son NOM vit dans `formulaires.ts`, avec le reste du contrat partagé : le
 * formulaire doit le poser et le serveur doit le lire. Ce fichier-ci ne part
 * jamais dans le navigateur, il ne peut donc pas le porter. */

/** ── Barrière 2 : le temps ───────────────────────────────────────────────
 * Un humain ne remplit pas huit champs en moins de trois secondes. Un robot,
 * si. Et symétriquement, un formulaire renvoyé douze heures après son
 * affichage est un rejeu automatisé, pas un visiteur revenu déjeuner.
 * ⚠️ Bornes volontairement larges : mieux vaut laisser passer un spam que
 * refuser une vraie demande écrite lentement, à deux, ou reprise après une
 * interruption. */
export const DELAI_MINIMUM_MS = 3_000;
export const DELAI_MAXIMUM_MS = 6 * 60 * 60 * 1000;

/** ── Barrière 3 : la limite de débit par IP ──────────────────────────────
 * Personne n'a trois projets différents à nous soumettre en dix minutes.
 *
 * ⚠️ LIMITE CONNUE, ASSUMÉE, ET À NE PAS OUBLIER : ce compteur vit dans la
 * mémoire du processus. Il repart à zéro à chaque redéploiement, et il ne se
 * partage pas entre plusieurs instances. Sur un hébergement à une instance —
 * ce qui est le cas visé — il fait le travail. Le jour où le site tournera
 * derrière plusieurs instances, la limite devra remonter d'un cran (reverse
 * proxy ou stockage partagé), sinon elle devient décorative.
 */
const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_FENETRE = 3;
const FENETRE_JOUR_MS = 24 * 60 * 60 * 1000;
const MAX_PAR_JOUR = 10;

const envois = new Map<string, number[]>();

/** Purge les horodatages périmés — sans quoi la Map grossit indéfiniment. */
function nettoyer(maintenant: number) {
  for (const [ip, dates] of envois) {
    const vivants = dates.filter(d => maintenant - d < FENETRE_JOUR_MS);
    if (vivants.length === 0) envois.delete(ip);
    else envois.set(ip, vivants);
  }
}

/**
 * ⛔⛔ LIRE SEULEMENT — n'incrémente rien. La distinction n'est pas cosmétique,
 * elle a été trouvée en recette le 11/08/2026 : la première version comptait
 * chaque REQUÊTE, y compris celles rejetées pour un e-mail mal tapé. Résultat,
 * un visiteur qui se trompe deux fois d'adresse et une fois de champ était
 * bloqué dix minutes — le dispositif anti-robot punissait exactement les
 * humains maladroits, et laissait passer autant de robots qu'avant.
 * 👉 On COMPTE les demandes réellement entrées dans Podio, pas les tentatives.
 *    `enregistrerEnvoi` n'est donc appelé qu'après création de l'item.
 */
export function debitAtteint(ip: string): boolean {
  const maintenant = Date.now();
  // Nettoyage opportuniste : pas de minuterie à entretenir, et le volume
  // d'un formulaire de contact ne justifie pas mieux.
  if (envois.size > 500) nettoyer(maintenant);

  const dates = (envois.get(ip) ?? []).filter(d => maintenant - d < FENETRE_JOUR_MS);
  const recents = dates.filter(d => maintenant - d < FENETRE_MS);
  return recents.length >= MAX_PAR_FENETRE || dates.length >= MAX_PAR_JOUR;
}

/** À appeler UNE fois la demande réellement créée dans Podio. */
export function enregistrerEnvoi(ip: string): void {
  const maintenant = Date.now();
  const dates = (envois.get(ip) ?? []).filter(d => maintenant - d < FENETRE_JOUR_MS);
  dates.push(maintenant);
  envois.set(ip, dates);
}

/**
 * L'IP du visiteur derrière un proxy.
 *
 * ⚠️ `x-forwarded-for` est une liste : le client d'origine est en PREMIER, les
 * proxys traversés suivent. Prendre le dernier élément — erreur classique —
 * revient à compter tout le trafic sur l'IP du proxy, et donc à bloquer le
 * site entier au troisième envoi.
 */
export function ipDuVisiteur(entetes: Headers): string {
  const xff = entetes.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return entetes.get("x-real-ip")?.trim() || "inconnue";
}
