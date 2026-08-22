/**
 * RESTITUER LE TEXTE DES RÉALISATIONS DEPUIS L'ANCIEN SITE — 22/08/2026.
 *
 * ⛔⛔ CE QUE L'IMPORT AVAIT PERDU, ET POURQUOI PERSONNE NE L'AVAIT VU.
 * Sur l'ancien site, un texte de réalisation est un `<p>` dont les lignes sont
 * séparées par des `<br />`, avec des liens internes vers les pages de
 * compétence. L'import a tout aplati : les `<br>` ont disparu (« s'est
 * déroulée ainsi :En captant »), les liens aussi. Le résultat restait un texte
 * valide — juste illisible et sans maillage. Rien ne signale ce genre de perte.
 *
 * ⭐ ON RESTITUE LES TROIS :
 *   · les paragraphes  (un `<p>` = un bloc)
 *   · les sauts de ligne  (un `<br>` = un nouveau bloc)
 *   · les liens internes, TRADUITS vers les nouvelles adresses
 *     (`/nos-competences/x/` → `/savoir-faire/x/`)
 *
 * ⛔ L'ANCIEN SITE EST EN LECTURE SEULE. On ne fait que des GET, une page à la
 * fois, avec une pause entre deux. Et on met en cache sur disque : relancer le
 * script ne doit pas refrapper 135 fois un site de production.
 *
 * ⚠️ CE QU'ON N'ÉCRASE PAS : une fiche dont le texte a déjà été retravaillé à
 * la main. Le script ne touche `detail` que si le texte actuel est un bloc
 * unique — c'est la signature de l'import. Deux blocs ou plus signifient que
 * quelqu'un est passé après, et on ne défait pas son travail.
 *
 * ⚠️ ET LE « LOREM IPSUM » : l'ancien site en porte un dans son pied de page,
 * sur toutes les pages. Sans filtre, il serait entré dans 135 fiches.
 *
 *   node scripts/restituer-textes-realisations.mjs [--ecrire]
 */
import { createClient } from "next-sanity";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const ECRIRE = process.argv.includes("--ecrire");
/**
 * ⚠️ `--forcer` REPASSE SUR LES FICHES DÉJÀ DÉCOUPÉES. Il a fallu l'ajouter
 * parce que ma première passe a écrit 75 textes avec une déduplication
 * fautive : elle jetait le paragraphe complet quand il commençait comme
 * l'intro tronquée. Ces fiches ont alors plus d'un bloc, donc la garde
 * « on ne touche pas ce qui est déjà découpé » les protégeait… du correctif.
 * ⛔ SAUF CELLES ÉCRITES À LA MAIN. `INTOUCHABLES` les nomme : le script ne
 * doit jamais défaire un texte que quelqu'un a rédigé.
 */
const FORCER = process.argv.includes("--forcer");
const INTOUCHABLES = new Set(["lpa-50ans-video-anniversaire"]);
const CACHE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/ancien";
mkdirSync(CACHE, { recursive: true });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const paires = JSON.parse(readFileSync("/tmp/paires.json", "utf8"));

const dormir = ms => new Promise(r => setTimeout(r, ms));

async function pageAncienne(chemin) {
  const nom = `${CACHE}/${chemin.replace(/[^\w-]/g, "_")}.html`;
  if (existsSync(nom)) return readFileSync(nom, "utf8");
  const r = await fetch(`https://www.bluevistaprod.com${chemin}`, {
    headers: { "User-Agent": "Bluevista-migration/1.0 (récupération de nos propres contenus)" },
  });
  const t = r.ok ? await r.text() : "";
  writeFileSync(nom, t, "utf8");
  await dormir(700);            // ⚠️ on ne martèle pas un site de production
  return t;
}

/**
 * ⛔⛔ ON DÉCODE TOUTES LES ENTITÉS, PAS UNE LISTE. Ma version précédente
 * énumérait les entités rencontrées — et `&#8211;` (le tiret demi-cadratin)
 * n'y était pas : VINGT-SEPT réalisations publiaient « SANTOS &#8211; I-GRIND »
 * en toutes lettres sur la page. Une liste d'entités est toujours en retard
 * d'un caractère sur le contenu réel ; la table numérique, elle, les couvre
 * toutes d'un coup.
 * ⚠️ L'ordre compte : `&amp;` se décode EN DERNIER. Sinon `&amp;#8211;`
 * devient `&#8211;` puis un tiret, alors que le texte voulait afficher
 * l'entité elle-même.
 */
const NOMMEES = {
  nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", hellip: "…",
  quot: '"', laquo: "«", raquo: "»", ndash: "–", mdash: "—", eacute: "é",
  egrave: "è", agrave: "à", ccedil: "ç", ecirc: "ê", ocirc: "ô", icirc: "î",
  ugrave: "ù", ucirc: "û", euml: "ë", iuml: "ï", deg: "°", euro: "€",
  lt: "<", gt: ">", apos: "’",
};
const sansBalises = s =>
  s.replace(/<[^>]+>/g, "")
   .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
   .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
   .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in NOMMEES ? NOMMEES[n.toLowerCase()] : m))
   .replace(/&amp;/g, "&")
   .replace(/\s+/g, " ").trim();

/**
 * ⛔⛔ LA MÊME CHOSE, MAIS SANS COUPER LES BORDS — et c'est tout le sujet.
 * `sansBalises` finit par `.trim()`. Or `enBloc` découpe le paragraphe autour
 * de chaque lien et passe CHAQUE morceau à la moulinette : l'espace qui
 * séparait le mot du lien vivait justement sur un bord, et disparaissait.
 * Résultat sur la page publiée : « Une vidéo entièrement enanimation 3Dpour
 * présenter… », « Lefilm produitouvidéo promotionnelle ». Le texte était bon,
 * les liens étaient bons, et la phrase était illisible — sur toutes les
 * réalisations qui contiennent un lien, c'est-à-dire la majorité.
 * 👉 À l'intérieur d'un paragraphe, on normalise les espaces sans rogner les
 * bords ; le rognage n'a lieu qu'une fois, sur le bloc assemblé.
 */
const garderBords = s =>
  s.replace(/<[^>]+>/g, "")
   .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
   .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
   .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in NOMMEES ? NOMMEES[n.toLowerCase()] : m))
   .replace(/&amp;/g, "&")
   .replace(/\s+/g, " ");

/**
 * ⛔ LES REBUTS DU GABARIT — et la leçon vient d'un essai à blanc regardé.
 * Ma première version parcourait TOUTE la page : le pied de page entrait dans
 * le texte (« – Siège social – », « 69410 Champagne-au-Mont-d'Or »,
 * « 92100 Boulogne-Billancourt »), sur les 79 fiches à restaurer. Le filtre
 * ne les attrapait pas parce que l'entité `&#8211;` n'était pas décodée.
 * 👉 La vraie réponse n'était pas d'allonger la liste des rebuts mais de
 * BORNER la lecture : du `<h1>` jusqu'au pied de page. Filtrer ce qu'on n'a
 * pas besoin de lire est toujours plus fragile que ne pas le lire.
 * ⚠️ Restent deux lignes de service que le gabarit place DANS le contenu :
 * « Client : <url> » (déjà dans le champ `clientUrl`) et l'appel à suivre les
 * réseaux sociaux.
 */
const REBUT = [
  /^lorem ipsum/i, /tous droits réservés/i, /^complimentary consultation/i,
  /^retour aux réalisations/i, /^aller au contenu/i, /^\d{4}$/,
  /^bluevista\s*[-–]\s*(lyon|paris|genève)/i, /^mentions légales/i,
  /siège social/i, /^\d{5}\s/, /^\+\d[\d\s().]{6,}$/,
  /^client\s*:/i, /^suivez[- ]nous/i, /^https?:\/\/\S+$/,
];
const estRebut = t => t.length < 25 || REBUT.some(r => r.test(t));

/**
 * ⛔⛔ TRADUIRE UNE ADRESSE, C'EST VÉRIFIER QU'ELLE EXISTE. Ma première règle
 * ne traitait que `/nos-competences/` : six destinations sur dix-huit sont
 * tombées en 404 une fois les liens restitués — deux avec le préfixe
 * `/competences/` (sans « nos »), quatre vers d'anciennes pages d'atterrissage
 * supprimées depuis.
 * 👉 On reprend les destinations du PLAN DE REDIRECTIONS, qui est justement
 * la table de correspondance ancien → nouveau. Une adresse qu'il ne connaît
 * pas n'est pas traduite : le texte reste, le lien saute. Un lien mort dans un
 * texte restitué est pire que pas de lien — il donne l'illusion du maillage.
 */
const RENVOIS = {
  "/film-entreprise-lyon-15-ans-experience/": "/realisation-film-entreprise-lyon/",
  "/realisation-film-lancement-produit/": "/offres/film/",
  "/video-promotionnelle/": "/offres/film/",
  "/video-publicitaire/": "/offres/film/",
  /* ⚠️ L'ancien slug d'aftermovie ne s'est pas contenté de changer de préfixe,
     il a changé de nom : `aftermovie-report-evenementiel` est devenu
     `aftermovie-captation-evenementielle`. Une règle de préfixe seule fabrique
     donc une adresse bien formée qui n'existe pas — le pire des cas, parce
     qu'elle a l'air juste. */
  "/competences/aftermovie-report-evenementiel/": "/savoir-faire/aftermovie-captation-evenementielle/",
  "/nos-competences/aftermovie-report-evenementiel/": "/savoir-faire/aftermovie-captation-evenementielle/",
};
const adresseNeuve = href => {
  const c = String(href).replace(/^https?:\/\/(www\.)?bluevistaprod\.com/, "").split("#")[0];
  if (RENVOIS[c]) return RENVOIS[c];
  if (c.startsWith("/nos-competences/")) return c.replace("/nos-competences/", "/savoir-faire/");
  if (c.startsWith("/competences/")) return c.replace("/competences/", "/savoir-faire/");
  if (c.startsWith("/nos-realisations/")) return null;   // ⚠️ les slugs ont changé : on n'invente pas
  if (c.startsWith("/")) return c;
  return c.startsWith("http") ? c : null;
};

let n = 0;
const cle = () => `r${Date.now().toString(36)}${++n}`;

/** Un morceau de HTML → un bloc Portable Text, liens compris. */
function enBloc(html) {
  const enfants = [];
  const markDefs = [];
  /* Ce qui déborde d'un morceau sur le suivant : l'espace collé au bord. */
  let enAttente = "";
  const poser = (text, marks) => {
    if (!text) return;
    enfants.push({ _type: "span", _key: cle(), text, marks });
  };
  const morceaux = html.split(/(<a\b[^>]*>.*?<\/a>)/gs);
  for (const m of morceaux) {
    const lien = m.match(/^<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>$/s);
    if (lien) {
      const brut = garderBords(lien[2]);
      const texte = brut.trim();
      if (!texte) { if (/\s/.test(brut)) enAttente = " "; continue; }
      /* ⚠️ L'ESPACE SORT DU LIEN. Le style validé habille les liens d'une
         pastille de couleur : un espace resté À L'INTÉRIEUR se retrouve
         colorié avec, et la pastille déborde d'un blanc à gauche ou à droite.
         On le déplace donc dans le texte voisin — même phrase à l'écran,
         mais le lien ne mord plus sur ce qui l'entoure. */
      poser(enAttente + (/^\s/.test(brut) ? " " : ""), []);
      enAttente = /\s$/.test(brut) ? " " : "";
      const href = adresseNeuve(lien[1]);
      if (href) {
        const k = cle();
        markDefs.push({ _key: k, _type: "link", href });
        poser(texte, [k]);
      } else {
        poser(texte, []);
      }
    } else {
      const t = garderBords(m);
      if (!t) continue;
      poser(enAttente + t, []);
      enAttente = "";
    }
  }
  if (!enfants.length) return null;
  /* Le rognage, une seule fois, sur les bords du bloc assemblé. */
  enfants[0] = { ...enfants[0], text: enfants[0].text.replace(/^\s+/, "") };
  const d = enfants.length - 1;
  enfants[d] = { ...enfants[d], text: enfants[d].text.replace(/\s+$/, "") };
  const nets = enfants.filter(e => e.text);
  if (!nets.length) return null;
  return { _type: "block", _key: cle(), style: "normal", markDefs, children: nets };
}

/**
 * Le corps de la page : les `<p>` de la ZONE DE CONTENU, découpés sur `<br>`.
 * ⛔ La zone va du `<h1>` au pied de page. Sans cette borne, l'adresse des
 * trois bureaux finit dans chaque fiche.
 */
function extraire(page) {
  /* ⛔ CERTAINES PAGES N'ONT AUCUN `<h1>` — une vingtaine, sur un gabarit plus
     récent. Ma première version partait de `indexOf("<h1")`, donc de -1, et le
     bornage rendait une zone vide : ces pages ressortaient sans texte, en
     silence. Giz l'a vu sur Berliet (« l'ancien site est fourni »).
     👉 Un `indexOf` qui échoue ne vaut pas zéro, il vaut -1. Le confondre
     transforme une absence en résultat plausible. */
  const trouve = page.indexOf("<h1");
  const debut = trouve >= 0 ? trouve : 0;
  const bornes = ["Siège social", "&#8211; Si", "<footer"].map(m => page.indexOf(m)).filter(i => i > debut);
  const fin = bornes.length ? Math.min(...bornes) : page.length;
  const html = page.slice(debut, fin);
  const paras = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gs)].map(m => m[1]);
  const blocs = [];
  for (const p of paras) {
    for (const ligne of p.split(/<br\s*\/?>/i)) {
      const nu = sansBalises(ligne);
      if (!nu || estRebut(nu)) continue;
      const b = enBloc(ligne);
      if (b) blocs.push(b);
    }
  }
  return blocs;
}

/* ── Le travail ──────────────────────────────────────────────────────── */
const fiches = await client.fetch(
  `*[_type=="realisation" && language=="fr"]{ _id, "slug": slug.current, titre, intro, detail, ancienneUrl }`
);

const bilan = { traitees: 0, restaurees: 0, dejaBien: 0, sansAncienne: 0, vide: 0, adresseCorrigee: 0 };
const journal = [];

for (const f of fiches) {
  const ancienne = paires[f.slug];
  if (!ancienne) { bilan.sansAncienne++; journal.push(["sans-ancienne", f.slug, ""]); continue; }

  const html = await pageAncienne(ancienne);
  if (!html || /Page non trouvée|Erreur 404/.test(html)) {
    bilan.vide++; journal.push(["404", f.slug, ancienne]); continue;
  }
  bilan.traitees++;

  const blocs = extraire(html);
  /* ⚠️ Le premier bloc est l'INTRO (déjà dans `intro`) : on l'écarte du corps
     pour ne pas l'afficher deux fois. On la reconnaît à son texte. */
  const intro = (f.intro || "").trim();
  /* ⛔⛔ L'INTRO AUSSI A ÉTÉ TRONQUÉE À L'IMPORT. Sur Berliet, l'ancien
     paragraphe dit « …pour les Huiles Berliet. Une vidéo FOOH est une nouvelle
     tendance publicitaire qui utilise un environnement réel avec des
     intégrations 3D… » — et `intro` s'arrête à la première phrase.
     Ma première déduplication comparait les 60 premiers signes et jetait donc
     la version COMPLÈTE au motif qu'elle commençait pareil.
     👉 On ne jette que ce qui est vraiment un doublon. Quand le bloc commence
     par l'intro mais continue, on garde la SUITE — et ses liens. */
  /* ⚠️ ON COMPARE SUR UNE FORME NORMALISÉE. Sanity écrit `"Fake Out Of Home"`
     avec des guillemets droits, l'ancien site avec des chevrons « » : la
     comparaison échouait au 35e signe et le préfixe n'était pas retiré, donc
     la première phrase apparaissait DEUX fois — en chapô puis en tête du
     texte. Guillemets, apostrophes et espaces sont ramenés à une forme
     commune avant de décider. */
  /* ⚠️ ON COMPARE SUR LES SEULES LETTRES. Trois écarts typographiques
     séparaient les deux versions du même début de phrase : les guillemets
     (« » contre "), l'espace insécable que le français met après le chevron,
     et les apostrophes. Normaliser les guillemets ne suffisait pas — il
     restait l'espace. En ne gardant que lettres et chiffres, il ne reste plus
     rien qui puisse différer sans que le texte diffère vraiment. */
  const lettres = x => (x || "").toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
  const titreNu = lettres(f.titre);
  const commencePar = (t, i) =>
    i && t.length > i.length + 20 && lettres(t).startsWith(lettres(i).slice(0, 60));
  const corps = [];
  for (const b of blocs) {
    const t = b.children.map(c => c.text).join("").trim();
    if (!t) continue;
    if (t === intro) continue;
    /* ⛔ UN PARAGRAPHE QUI RÉPÈTE LE TITRE N'APPORTE RIEN. L'ancien gabarit
       réaffichait le nom de la réalisation juste sous le `<h1>` : sur la
       nouvelle page, où le titre est déjà en gros au-dessus, ça donne un
       texte qui commence en se répétant.
       ⚠️ On n'écarte que l'ÉGALITÉ exacte, sur la forme réduite aux lettres.
       Un simple préfixe ne suffit pas : « STANN. L'application de gestion
       d'entreprise » commence par le nom du client et reste un vrai
       sous-titre, qu'il faut garder. */
    if (titreNu && lettres(t) === titreNu) continue;
    if (commencePar(t, intro)) {
      /* On retire le préfixe déjà porté par l'intro, sans casser les liens :
         le premier span est raccourci, les suivants sont intacts. */
      /* ⛔ ON AVANCE EN COMPTANT LES LETTRES, on ne devine pas la position.
         Ma version précédente partait de `intro.length` et DESCENDAIT : or le
         texte d'origine est PLUS LONG à lettres égales (chevrons, espaces
         insécables), donc la bonne coupe est plus loin, jamais avant. La
         boucle ne la trouvait pas et retombait sur intro.length — au milieu
         d'un mot : le corps commençait par « t. Une vidéo FOOH… ».
         👉 Quand deux chaînes ne diffèrent que par leur ponctuation, on ne
         compare pas des longueurs : on avance sur celle qui fait foi. */
      const cible = lettres(intro).length;
      let coupe = 0, vues = 0;
      while (coupe < t.length && vues < cible) {
        if (lettres(t[coupe])) vues++;
        coupe++;
      }
      const reste = t.slice(coupe).replace(/^[\s.,;:]+/, "");
      if (reste.length < 30) continue;
      let mange = coupe;
      const enfants = [];
      for (const c of b.children) {
        if (mange <= 0) { enfants.push(c); continue; }
        if (c.text.length <= mange) { mange -= c.text.length; continue; }
        enfants.push({ ...c, text: c.text.slice(mange).replace(/^\s+/, "") });
        mange = 0;
      }
      /* ⚠️ ON NETTOIE LE TEXTE ÉCRIT, pas seulement la variable de contrôle.
         Je retirais la ponctuation de tête sur `reste`, qui ne servait qu'au
         test de longueur — le span conservé, lui, gardait le point final de
         l'intro et le corps commençait par « . Une vidéo FOOH… ».

         ⛔⛔ ET UN MORCEAU VIDE NE CONDAMNE PAS LE PARAGRAPHE. Ma version
         précédente nettoyait le PREMIER morceau, et si le nettoyage ne
         laissait rien, elle jetait tout le bloc. Or c'est le cas le plus
         fréquent : la coupe tombe pile sur une frontière de lien, le premier
         morceau restant vaut « . » à lui seul, et le paragraphe entier
         disparaît. Sur Stann, l'ancien site dit « Cette vidéo permet de
         présenter le logiciel STANN App et son application sur le terrain » —
         cette phrase a été perdue en silence, et la fiche est ressortie avec
         son seul sous-titre. Giz ne l'aurait vu qu'en ligne.
         👉 On retire les morceaux qui se vident, un par un, et on garde la
         suite. Un début vide veut dire « commence plus loin », jamais
         « il n'y a rien ». */
      while (enfants.length) {
        enfants[0] = { ...enfants[0], text: enfants[0].text.replace(/^[\s.,;:—–-]+/, "") };
        if (enfants[0].text) break;
        enfants.shift();
      }
      if (enfants.length) corps.push({ ...b, children: enfants });
      continue;
    }
    if (intro && t.slice(0, 60) === intro.slice(0, 60)) continue;
    corps.push(b);
  }

  if (INTOUCHABLES.has(f.slug)) { bilan.dejaBien++; continue; }
  const dejaDecoupe = !FORCER && Array.isArray(f.detail) && f.detail.length > 1;
  const patch = {};

  if (corps.length && !dejaDecoupe) patch.detail = corps;
  else if (dejaDecoupe) bilan.dejaBien++;

  if (f.ancienneUrl !== ancienne) { patch.ancienneUrl = ancienne; bilan.adresseCorrigee++; }

  if (Object.keys(patch).length) {
    if (patch.detail) bilan.restaurees++;
    journal.push([patch.detail ? `restauré ${corps.length} blocs` : "adresse", f.slug, ancienne]);
    if (ECRIRE) await client.patch(f._id).set(patch).commit();
  }
}

console.log(`\n  pages lues sur l'ancien site : ${bilan.traitees}`);
console.log(`  textes restaurés             : ${bilan.restaurees}`);
console.log(`  déjà découpés, non touchés   : ${bilan.dejaBien}`);
console.log(`  adresses corrigées           : ${bilan.adresseCorrigee}`);
console.log(`  sans ancienne adresse connue : ${bilan.sansAncienne}`);
console.log(`  anciennes pages en 404       : ${bilan.vide}`);
console.log(ECRIRE ? "\n  ✅ ÉCRIT dans Sanity" : "\n  ⚠️ ESSAI À BLANC — relancer avec --ecrire");
writeFileSync("/tmp/journal-restitution.txt", journal.map(l => l.join("\t")).join("\n"), "utf8");
