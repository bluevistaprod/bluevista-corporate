#!/usr/bin/env node
/**
 * VÉRIFIE QU'AUCUNE PAGE NE RENVOIE VERS LE SITE PARALLÈLE.
 *
 *   node scripts/verifier-cloisonnement.mjs
 *
 * ⛔ POURQUOI CE CONTRÔLE EXISTE. Décision de Giz, 02/08/2026 :
 * bluevistaprod.com et bluevista.ch sont deux sites PARALLÈLES. Aucun des
 * deux ne renvoie vers l'autre. Un visiteur français qui atterrit sur le
 * site suisse tombe sur une entité qui ne peut pas le facturer — et
 * inversement.
 *
 * Un croisement ne se voit pas : c'est un lien parmi des centaines, souvent
 * ajouté de bonne foi dans un texte. D'où un contrôle qu'on lance, plutôt
 * qu'une vigilance qu'on espère.
 *
 * ⚠️ Ce script vérifie le RENDU, pas le code source : un lien construit
 * dynamiquement échapperait à une simple recherche dans les fichiers.
 */
const BASE = process.env.BASE ?? "http://localhost:3333";
const PAGES = [
  "/apercu/v7", "/apercu/agence", "/apercu/contact", "/apercu/realisations",
  "/apercu/plan", "/apercu/metier/film", "/apercu/metier/evenement",
  "/apercu/metier/immersion", "/apercu/competence/video-mapping",
  "/apercu/ville/studio-animation-3d-lyon", "/apercu/ville/realisation-video-geneve",
];
const INTERDIT = /bluevista\.ch/i;

/**
 * ⛔⛔ LA SEULE MENTION AUTORISÉE DU DOMAINE SUISSE : le hreflang.
 *
 * Depuis qu'on déclare les versions régionales, `bluevista.ch` apparaît
 * légitimement dans l'en-tête des pages — sous la forme
 * `<link rel="alternate" hreflang="fr-CH" href="https://www.bluevista.ch/…">`.
 *
 * 👉 Ce n'est PAS un croisement : cette ligne est invisible, elle ne
 * s'affiche nulle part, personne ne peut cliquer dessus. Elle s'adresse à
 * Google et à lui seul, et c'est précisément elle qui empêche le site
 * français de capter les recherches suisses.
 *
 * ⚠️ Sans cette exception, le contrôle échouerait dès la première page et on
 * finirait par le désactiver — c'est-à-dire par perdre la protection contre
 * les VRAIS croisements, qui sont des `href` cliquables dans le corps.
 * On retire donc ces balises AVANT de chercher, plutôt que d'assouplir la
 * recherche elle-même.
 */
const SANS_HREFLANG = h => h.replace(/<link[^>]*rel="alternate"[^>]*>/gi, "");

let fautes = 0;
for (const p of PAGES) {
  const brut = await fetch(BASE + p).then(r => r.text()).catch(() => "");
  const h = SANS_HREFLANG(brut);
  const liens = [...h.matchAll(/href="([^"]*bluevista\.ch[^"]*)"/gi)].map(m => m[1]);
  const mentions = (h.match(INTERDIT) || []).length;
  if (liens.length || mentions) {
    fautes++;
    console.log(`⛔ ${p}`);
    if (liens.length) console.log(`   ${liens.length} lien(s) : ${liens.join(", ")}`);
    else console.log(`   ${mentions} mention(s) du domaine, sans lien`);
  }
}
console.log(fautes
  ? `\n${fautes} page(s) renvoient vers le site parallèle.\n`
  : `\n✅ ${PAGES.length} pages vérifiées — aucun croisement vers bluevista.ch.\n`);
process.exit(fautes ? 1 : 0);
