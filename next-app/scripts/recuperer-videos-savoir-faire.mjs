/**
 * RÉCUPÉRER LES VIDÉOS DE L'ANCIEN SITE — 12/08/2026.
 *
 * ⛔ LE CONSTAT. Les 9 pages `/nos-competences/` de l'ancien WordPress
 * portaient 27 vidéos ; les 9 pages de savoir-faire du nouveau site n'en
 * affichaient aucune. Sur un site d'agence audiovisuelle, décrire un
 * savoir-faire sans le montrer se prive de sa meilleure preuve.
 *
 * ⛔ ON NE TOUCHE PAS À L'ANCIEN SITE : ce script LIT l'API REST de
 * WordPress, il n'y écrit rien.
 *
 * Ce qu'il fait :
 *   · lit les vidéos de chaque page `/nos-competences/<slug>/`, dans l'ordre
 *     où elles apparaissent dans la page ;
 *   · va chercher le titre et la miniature réels sur Vimeo (oEmbed public) ;
 *   · écrit le tout dans le champ `videos` de la page Sanity du même slug.
 *
 * ⚠️ CE QU'IL ÉCARTE. Une vidéo qui répond 404 sur Vimeo n'est pas
 * intégrable : elle n'est PAS écrite, et elle est listée à part. Publier une
 * vidéo dont on sait qu'elle ne partira pas revient à poser un cadre vide sur
 * la page.
 * En revanche, une vidéo qui rend un lecteur mais cache son titre EST écrite,
 * avec un titre de repli explicite : elle se lit, il lui manque juste un nom.
 *
 * Usage :  node scripts/recuperer-videos-savoir-faire.mjs [--pour-de-vrai]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");
const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8")
    .split("\n").filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03`;
const UA = { "User-Agent": "Mozilla/5.0" };

/**
 * ⛔⛔⛔ LES JETONS — LA CAUSE DE TOUT CE QUI A RATÉ LE 12/08/2026.
 *
 * Une vidéo Vimeo NON LISTÉE s'adresse `vimeo.com/276258421/3dee65778a`. Le
 * second segment est un jeton, et SANS LUI le lecteur répond 401 et rend un
 * cadre noir. J'ai passé la journée à conclure « vidéo bloquée », « vidéo
 * supprimée », « réglage de confidentialité à changer » — sur des vidéos
 * parfaitement vivantes, à qui je donnais une adresse amputée. C'est Giz qui
 * a trouvé, en collant ses liens.
 *
 * 👉 LA LEÇON, et elle dépasse Vimeo : quand une ressource refuse
 * systématiquement de répondre, VÉRIFIER D'ABORD L'ADRESSE QU'ON LUI DONNE.
 * Un 401 en série accuse plus souvent l'appelant que l'appelé.
 *
 * D'où viennent ces jetons : récoltés dans le HTML des 608 pages, articles et
 * réalisations des trois sites — ⚠️ ils figurent souvent sur une AUTRE page
 * que celle qui affiche la vidéo — complétés par ceux que Giz a donnés à la
 * main. Le fichier est relu à chaque exécution : y ajouter une ligne suffit.
 */
const JETONS = JSON.parse(fs.readFileSync(path.join(RACINE, "scripts/_jetons-vimeo.json"), "utf8"));
const adresseVimeo = id => (JETONS[id] ? `https://vimeo.com/${id}/${JETONS[id]}` : `https://vimeo.com/${id}`);

const RX = /https?:\/\/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)|https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/g;

/* ── 1. Ce que porte l'ancien site ────────────────────────────────────── */
const pages = [];
for (let p = 1; p <= 2; p++) {
  const r = await fetch(
    `https://www.bluevistaprod.com/wp-json/wp/v2/pages?per_page=100&page=${p}&_fields=link,title,content`,
    { headers: UA }
  );
  if (!r.ok) break;
  const b = await r.json();
  if (!b.length) break;
  pages.push(...b);
}

/* ── 2. Les pages de savoir-faire réellement présentes dans Sanity ─────── */
const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
u.searchParams.set("query", `*[_type=="page" && genre=="savoir-faire"]{_id,"slug":slug.current,titre,"dejaDesVideos":count(videos)}`);
const cibles = (await (await fetch(u)).json()).result;
const parSlug = Object.fromEntries(cibles.map(c => [c.slug, c]));

/* ── 3. Rapprochement, puis Vimeo pour le titre et la miniature ────────── */
/**
 * ⛔⛔ TROIS ÉTATS, PAS DEUX — et confondre les deux derniers coûte cher.
 *
 * `lisible`   Vimeo rend le titre et la miniature. Rien à faire.
 * `muette`    Vimeo répond 200 et rend bien un lecteur intégrable, mais
 *             REFUSE le titre, la miniature et la durée. C'est le réglage de
 *             confidentialité « masquer sur Vimeo ». **La vidéo se lit
 *             quand même sur le site** — il lui manque juste une affiche et
 *             un nom, que Giz fournira.
 * `absente`   404 : supprimée ou entièrement privée. **Non intégrable.**
 *             ⛔ On ne l'écrit PAS : poser une vidéo dont on sait qu'elle ne
 *             partira pas revient à publier un cadre vide.
 *
 * ⚠️ Piège payé le 12/08/2026 : une première version rangeait `muette` avec
 * `absente` et annonçait 13 vidéos mortes sur 27. Recoupé avec un relevé
 * antérieur des 207 vidéos du site : il n'y en avait que 6. Un code HTTP 200
 * avec un corps incomplet n'est pas une erreur — c'est une réponse partielle,
 * et il faut la lire comme telle.
 *
 * 👉 La règle : ne jamais déduire l'état d'une ressource du seul succès ou
 * échec de l'appel. Regarder ce que le corps contient.
 */
const attendre = ms => new Promise(r => setTimeout(r, ms));

/**
 * ⛔⛔⛔ LA SEULE QUESTION QUI COMPTE : LA VIDÉO PART-ELLE ?
 *
 * Piège payé trois fois le 12/08/2026, et c'est le plus coûteux de la
 * journée. J'ai successivement cru que les métadonnées disaient l'état de la
 * vidéo — elles ne disent rien. Une vidéo peut avoir un titre, une durée et
 * une miniature parfaits, et REFUSER de s'intégrer : le lecteur répond 401 et
 * rend une page noire. Mesuré : sur 20 vidéos récupérées, 16 sont dans ce cas
 * — y compris « VideoMapping 40 ans SIPAREX », qui a titre et affiche.
 *
 * 👉 Un bouton de lecture qui ouvre un cadre noir est PIRE que pas de vidéo.
 * On n'écrit donc que ce qui répond 200 sur le lecteur.
 *
 * ⚠️ 401 NE VEUT PAS DIRE PERDUE. C'est le réglage de confidentialité du
 * compte Vimeo qui interdit l'intégration. Giz est propriétaire du compte :
 * en autorisant l'intégration, les vidéos reviennent — et il suffit de
 * relancer ce script, qui les réécrira tout seul. C'est pour ça qu'il teste
 * au lieu de coder une liste d'exclusions.
 *
 * ⚠️ Un 401 isolé peut aussi être une limitation de débit. D'où la pause
 * entre deux appels et la seconde tentative avant de conclure.
 */
async function partVraiment(id) {
  for (let essai = 0; essai < 2; essai++) {
    try {
      const h = JETONS[id] ? `&h=${JETONS[id]}` : "";
      const r = await fetch(`https://player.vimeo.com/video/${id}?app_id=122963${h}`, {
        headers: { ...UA, Referer: "https://www.bluevistaprod.com/" },
      });
      if (r.status === 200) return true;
      if (r.status === 404) return false;
    } catch { /* incident réseau : on réessaie */ }
    await attendre(2500);
  }
  return false;
}
const cache = new Map();
async function vimeo(id) {
  if (cache.has(id)) return cache.get(id);
  let v = { titre: "", vignette: "", etat: "injoignable" };
  for (let essai = 0; essai < 4; essai++) {
    try {
      const r = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(adresseVimeo(id))}`, { headers: UA });
      if (r.status === 404) { v.etat = "absente"; break; }
      if (r.ok) {
        const d = await r.json();
        v = {
          titre: d.title ?? "",
          vignette: d.thumbnail_url ?? "",
          /* Le lecteur intégrable est le seul critère qui compte pour le
             site : c'est lui qui décide si la vidéo partira. */
          etat: d.title ? "lisible" : (d.html ? "muette" : "absente"),
        };
        break;
      }
      /* 403 / 429 / 5xx : limitation de débit ou incident. On réessaie. */
    } catch { /* incident réseau : on réessaie */ }
    await attendre(400 * (essai + 1));
  }
  cache.set(id, v);
  return v;
}

const patchs = [];
let sansTitre = 0;
const mortes = [];
const bloquees = []; // conservé pour le rapport, plus alimenté
const incertain = [];
for (const page of pages) {
  const m = page.link.match(/\/nos-competences\/([^/]+)\//);
  if (!m || !parSlug[m[1]]) continue;
  const cible = parSlug[m[1]];

  const vus = [];
  for (const t of (page.content?.rendered ?? "").matchAll(RX)) {
    const cle = t[1] ? `vimeo:${t[1]}` : `youtube:${t[2]}`;
    if (!vus.includes(cle)) vus.push(cle);
  }
  if (!vus.length) continue;

  const videos = [];
  for (const [i, cle] of vus.entries()) {
    const [plat, id] = cle.split(":");
    const meta = plat === "vimeo" ? await vimeo(id) : { titre: "", vignette: "", etat: "muette" };

    if (meta.etat === "absente") { mortes.push(`${cible.slug} → vimeo.com/${id}  (introuvable)`); continue; }
    if (meta.etat === "injoignable") { incertain.push(`${cible.slug} → vimeo.com/${id}`); continue; }

    /* ⛔⛔⛔ IL Y AVAIT ICI UN FILTRE « LA VIDÉO PART-ELLE ? » — RETIRÉ LE
       12/08/2026, ET C'EST LA QUATRIÈME CORRECTION DU MÊME MOTIF.
       Il interrogeait le lecteur en HTTP et écartait tout ce qui répondait
       401. Vérification faite dans un VRAI NAVIGATEUR : les vidéos écartées
       se lisent parfaitement — « bluevista | Showreel Drone 2018 »,
       « VideoMapping 40 ans SIPAREX ». Le 401 ne disait pas « intégration
       refusée », il disait « tu n'es pas un navigateur ».
       👉 LA RÈGLE : une requête sans navigateur ne décide JAMAIS si quelque
       chose s'affiche. Elle sait dire qu'une adresse existe, pas qu'elle
       fonctionne. Le seul contrôle valable est de regarder la page.
       Conséquence assumée : on écrit tout ce qu'on trouve, et c'est Giz qui
       signale ce qui ne part pas — son œil s'est trompé zéro fois
       aujourd'hui, mes tests quatre. */
    if (meta.etat === "muette") sansTitre++;

    videos.push({
      _type: "object",
      _key: `v${id}`,
      url: plat === "vimeo" ? adresseVimeo(id) : `https://youtu.be/${id}`,
      /* ⚠️ Repli EXPLICITE, pas silencieux : « à renommer » se voit dans le
         studio et appelle une correction. Un titre plausible mais faux ne
         serait jamais corrigé. */
      titre: meta.titre || `${cible.titre} — vidéo ${i + 1} (à renommer)`,
      ...(meta.vignette ? { vignetteUrl: meta.vignette } : {}),
    });
  }
  /* ⛔ ON PATCHE MÊME QUAND LA LISTE EST VIDE — bug trouvé le 12/08/2026.
     La version précédente sautait les pages dont AUCUNE vidéo ne partait ;
     leurs vidéos bloquées restaient donc en place, et le contrôle final
     comptait 17 vidéos alors que 4 seulement fonctionnaient. Ne pas écrire
     n'efface rien : le silence laisse l'ancien état en production. */
  patchs.push({ cible, videos });
}

console.log(`\n${patchs.length} pages de savoir-faire concernées, ${patchs.reduce((n, p) => n + p.videos.length, 0)} vidéos.`);
if (sansTitre) console.log(`⚠️ ${sansTitre} « muettes » : elles SE LISENT sur le site, mais Vimeo cache leur titre et leur affiche — à nommer dans le studio.`);
if (bloquees.length) {
  console.log(`\n⛔ ${bloquees.length} REFUSENT DE S'INTÉGRER (le lecteur répond 401) — NON écrites.`);
  console.log(`   Ce n'est PAS une perte : c'est le réglage de confidentialité du compte Vimeo.`);
  console.log(`   👉 Autoriser l'intégration côté Vimeo, puis relancer ce script : elles reviendront seules.`);
  for (const b of bloquees) console.log(`     ${b}`);
}
if (mortes.length) {
  console.log(`\n⛔ ${mortes.length} introuvables sur Vimeo (404) — NON écrites, une vidéo morte ne se publie pas :`);
  for (const m of mortes) console.log(`     ${m}`);
}
if (incertain.length) console.log(`\n⛔ ${incertain.length} injoignables après 4 tentatives — ne rien conclure, relancer plus tard : ${incertain.join(", ")}`);
for (const p of patchs) {
  console.log(`\n  ${p.cible.slug}${p.cible.dejaDesVideos ? `  ⚠️ en contient déjà ${p.cible.dejaDesVideos}, elles seront REMPLACÉES` : ""}`);
  for (const v of p.videos) console.log(`     ${v.vignetteUrl ? "🖼 " : "⛔ "}${v.titre.slice(0, 62)}`);
}

if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({ mutations: patchs.map(p => ({ patch: { id: p.cible._id, set: { videos: p.videos } } })) }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

/* ⛔ LE CONTRÔLE VIENT D'AILLEURS QUE L'ÉCRITURE : on recompte depuis Sanity,
   on ne relit pas la réponse de la mutation — elle dirait toujours oui. */
const v = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
v.searchParams.set("query", `*[_type=="page" && genre=="savoir-faire" && count(videos)>0]{"slug":slug.current,"n":count(videos),"sansVignette":count(videos[!defined(vignetteUrl)])}|order(slug asc)`);
const relu = (await (await fetch(v)).json()).result;
console.log(`\n✅ ${relu.length} pages portent des vidéos, ${relu.reduce((n, x) => n + x.n, 0)} au total.`);
const trous = relu.filter(x => x.sansVignette);
if (trous.length) console.log(`⚠️ sans image d'affiche : ${trous.map(x => `${x.slug} (${x.sansVignette})`).join(", ")}`);
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
