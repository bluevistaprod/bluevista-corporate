#!/usr/bin/env node
/**
 * LES TEXTES DE FOND DES PAGES PARIS ET LIVE STREAMING — source unique.
 *
 *   node scripts/textes-paris-streaming.mjs            (simulation)
 *   node scripts/textes-paris-streaming.mjs --sanity   (écrit dans le nouveau site)
 *   node scripts/textes-paris-streaming.mjs --wordpress (écrit dans l'ancien)
 *
 * ⛔⛔ POURQUOI CE FICHIER EXISTE, ET POURQUOI IL EST LA RÉPONSE À LA CONDITION
 * POSÉE PAR GIZ — « écris seulement si tu es sûr qu'on oubliera pas de
 * répliquer sur le nouveau ».
 *
 * Une promesse ne tient pas ce genre de condition ; une architecture, oui.
 * Le texte n'est écrit qu'UNE FOIS, ici, dans `CONTENU`. Sanity et WordPress
 * en sont deux rendus, produits par le même script. Il n'y a donc pas deux
 * versions à synchroniser, et rien à « ne pas oublier de reporter » : le jour
 * où l'ancien site s'éteint, on supprime la moitié WordPress et le texte reste.
 *
 * 👉 Si le texte doit changer, il change ICI, et on relance. Modifier
 * directement dans le studio Sanity ou dans Elementor recrée exactement le
 * problème que ce fichier évite.
 *
 * ── Pourquoi ces deux pages, et pourquoi maintenant ─────────────────────────
 * `/studio-animation-3d-paris/` a perdu la moitié de son classement autour du
 * 25/07/2026 (« studio animation 3d paris » 11 → 26,7), sans qu'aucune page du
 * site n'ait été modifiée entre le 15 et le 31 juillet — vérifié par les dates
 * de modification WordPress. La cause est donc externe. Ce qui reste sous
 * notre contrôle, c'est la minceur des pages : les deux qui ont décroché
 * faisaient 351 et 203 mots, les deux qui ont tenu en faisaient 632 et 700.
 *
 * ⚠️ Ce n'est pas du travail jeté malgré la refonte : le nouveau site reprend
 * les textes de l'ancien, donc ce texte est celui de la future page, écrit un
 * peu plus tôt, sur le support qui en a besoin maintenant.
 *
 * ── Les règles tenues dans la rédaction, toutes tirées du cerveau ───────────
 * ⛔ AUCUN CHIFFRE INVENTÉ. Seuls « depuis 2004 » et « 145 films » sont
 *    autorisés. Pas de pourcentage, pas de nombre de clients, pas de note.
 * ⛔ NE JAMAIS AFFIRMER QU'IL Y A UN STUDIO À PARIS. Le titre et le H1 de la
 *    page portent « Studio d'animation 3D à Paris » et se positionnent
 *    dessus depuis des années — on ne les touche pas. Mais le corps ne dit
 *    jamais « notre studio parisien » : il parle de l'équipe qui se déplace.
 *    Le silence sur la nature d'une implantation est permis, l'affirmation
 *    fausse ne l'est pas.
 * ⛔ AUCUN NOUVEAU NOM DE CLIENT. La règle par défaut du cerveau est « on
 *    demande ». Elistair et ABB sont conservés parce qu'ils sont DÉJÀ publiés
 *    sur cette page ; rien n'a été ajouté.
 * ⛔⛔ ON NE DIT JAMAIS CE QU'ON NE FAIT PAS. Règle posée par Giz le
 *    03/08/2026, après lecture de la première version.
 *
 *    J'avais écrit un paragraphe expliquant que Bluevista ne développe PAS de
 *    plateforme web TV sur mesure, en pensant qu'annoncer une limite inspire
 *    confiance. C'est peut-être vrai dans un rendez-vous ; c'est faux sur une
 *    page de vente, où le lecteur ne cherche pas nos limites mais une raison
 *    de nous appeler. Une phrase négative laisse en mémoire ce qu'on ne sait
 *    pas faire.
 *
 *    👉 La position commerciale de Giz reste la même — « du live oui, une
 *    WebTV complète et complexe non » — mais elle se TIENT sans s'ÉCRIRE :
 *    le texte décrit ce qu'on assemble et sur quelles briques, ce qui cadre
 *    le périmètre sans jamais énoncer de renoncement. Un prospect qui veut
 *    une plateforme d'abonnement l'apprendra au premier échange, pas ici.
 * 📌 Ton : le bénéfice sans le superlatif. Une affirmation doit être une chose
 *    qu'on pourrait vérifier.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SANITY = process.argv.includes("--sanity");
const WORDPRESS = process.argv.includes("--wordpress");

/* ══════════════════════════════════════════════════════════════════════════
   LE CONTENU — la seule chose à modifier dans ce fichier.
   `h` = intertitre, `p` = paragraphe.
   ══════════════════════════════════════════════════════════════════════════ */

const CONTENU = {
  paris: {
    sanityId: "page-ville-studio-animation-3d-paris",
    wpSlug: "studio-animation-3d-paris",
    /* ⛔ Le widget Elementor où le texte est ajouté. C'est l'intro existante,
       qui porte les mots-clés historiques — on ajoute À LA SUITE, on ne
       remplace rien. */
    wpWidget: "197acfd",
    ajout: [
      { h: "Ce que « studio d’animation 3D » veut dire, concrètement" },
      { p: "La chaîne complète est chez nous : modélisation, texturing, rigging, animation, éclairage, rendu et compositing. Quatre pôles travaillent sur le même projet — vidéo, son, infographie et développement — et c’est ce qui permet de reprendre un plan en cours de route sans repasser par un prestataire extérieur. Nos infographistes travaillent sous Blender, Cinema 4D et Unreal Engine selon ce que le projet demande : du rendu calculé quand l’image prime, du temps réel quand il faut pouvoir changer un angle ou une teinte le jour de la validation." },
      { h: "Trois cas où l’animation 3D est la seule réponse" },
      { p: "Le produit qu’on ne peut pas filmer : trop grand pour un plateau, trop petit pour un objectif, pas encore fabriqué, ou visible seulement une fois l’appareil ouvert. Une animation 3D montre l’intérieur d’une machine sans la démonter." },
      { p: "Le geste technique : une procédure de montage, une intervention de maintenance, un protocole de sécurité. La 3D isole le mouvement utile et supprime tout ce qui distrait autour." },
      { p: "Ce qui n’a pas d’image : un flux de données, un principe physique, une architecture logicielle. Là, il n’y a rien à filmer — il faut fabriquer l’image." },
      { h: "La méthode, en sept temps" },
      { p: "Analyse, brainstorming, pré-production, production, post-production, conformation, débriefing. Le premier temps n’est pas technique : il regarde votre identité de marque au prisme de votre communication actuelle, pour décider si ce film doit s’inscrire dans un ensemble ou au contraire en sortir. Le dernier ouvre le suivant — c’est un cycle, pas un tunnel." },
    ],
    sections: [
      {
        cle: "sp0",
        titre: "Une équipe qui se déplace, pas une adresse",
        corps: [
          { p: "Nos équipes se déplacent. Les prises de vues réelles qui viennent s’intégrer à la 3D se tournent sur place : chez vous, sur votre site de production ou sur votre salon. Le reste de la fabrication se fait en interne, et les points de validation se tiennent à distance ou en présentiel, selon ce qui fait avancer le projet." },
          { p: "Sur les retours, la règle est simple et nous l’écrivons dans nos propositions : ni limite rigide, ni forfait illimité, sous couvert du bon sens. Deux à trois allers-retours suffisent quand le storyboard a été validé sérieusement — c’est pour cela que nous passons du temps dessus avant de lancer la fabrication." },
        ],
      },
      {
        cle: "sp1",
        /* ⚠️ Intitulé remplacé. L'ancien — « Ce qu'on y a installé » — laissait
           entendre qu'on avait installé un studio à Paris. C'est précisément
           ce qu'il ne faut pas écrire. */
        titre: "Photo-réaliste ou stylisé : un choix, pas une contrainte",
        corps: [
          { p: "Le photo-réalisme demande du temps de calcul et de la précision de modèle. Il se justifie quand l’image doit tenir la comparaison avec une photographie du produit réel : un catalogue, une page produit, un stand de salon." },
          { p: "Un rendu stylisé ou cartoon coûte moins cher, se relit plus vite, et fonctionne souvent mieux en communication interne ou sur les réseaux sociaux, où il faut être compris en trois secondes. Cette question se tranche au début du projet, avec vous, et non au moment de la livraison." },
        ],
      },
    ],
  },

  streaming: {
    sanityId: "page-savoir-faire-live-streaming-webtv",
    wpSlug: "live-streaming-webtv",
    wpWidget: "60d1f1a",
    ajout: [
      { h: "Ce qu’on diffuse le plus souvent" },
      { p: "Conventions et réunions d’entreprise, assemblées générales, conférences de presse, lancements de produit, tables rondes, remises de prix, compétitions sportives. Le format change, la contrainte ne change jamais : ça part à l’heure dite, et ça ne s’arrête pas." },
      { h: "Web TV : vos directs et vos vidéos au même endroit" },
      { p: "Une web TV réunit votre catalogue de vidéos et vos diffusions en direct sur une page à votre marque : un lecteur à vos couleurs, des rubriques qui suivent votre organisation, un accès libre ou réservé à ceux que vous choisissez. Nous l’assemblons sur des briques éprouvées — hébergement, lecteur, contrôle d’accès — pour que le budget parte dans vos contenus et dans la fiabilité du direct. Vous gardez la main sur ce que vous publiez, et vous voyez ce qui est regardé." },
    ],
    sections: [
      {
        cle: "sec0",
        titre: "Ce qui fait décrocher un spectateur à distance",
        corps: [
          { p: "Un spectateur en salle est captif ; un spectateur derrière un écran ferme l’onglet. Ce qui le fait partir n’est presque jamais la qualité de l’image : c’est de ne pas pouvoir lire les diapositives de l’intervenant, de subir le son de la sonorisation au lieu du son direct, et de rester sur un plan large pendant qu’il se passe quelque chose ailleurs." },
          { p: "Un événement hybride réunit deux publics qui ne suivent pas le même événement : celui de la salle et celui de la maison. Le second a besoin de plans plus serrés, d’un son propre et de temps morts plus courts. C’est pour cela que nous écrivons la diffusion avant l’événement et non après : ce qui sera filmé, pour qui, et sur quels canaux." },
        ],
      },
      {
        cle: "sec1",
        titre: "Ce qu’on installe, et ce que ça suppose de votre côté",
        corps: [
          { p: "Une régie, plusieurs caméras et un mélangeur : le direct se réalise pendant qu’il se tourne. On y ajoute les micros de salle, la reprise du son de la sonorisation, l’incrustation des titrages et des logos, et le renvoi des diapositives de l’intervenant dans l’image." },
          { p: "Le reste tient en un mot : la redondance. Un plan raté se refait au montage ; une coupure de dix secondes en direct se voit de tout le monde et ne se répare pas. Nous doublons donc ce qui peut lâcher — la connexion, l’encodeur — et un enregistrement local tourne en parallèle du flux." },
          { p: "De votre côté, il nous faut peu de choses, mais elles ne s’improvisent pas le matin même : un accès à la salle assez tôt pour câbler, une arrivée réseau dédiée ou l’autorisation d’utiliser la nôtre, et une personne qui connaît le déroulé et peut trancher pendant la diffusion." },
        ],
      },
      {
        cle: "sec2",
        titre: "Ce qu’il en reste après",
        corps: [
          { p: "Le direct terminé, il reste un fichier — et c’est l’enregistrement local, en qualité supérieure à ce qui a été diffusé, qui sert de master. Nous le remettons en ligne pour le replay, et nous en tirons les extraits qui serviront ensuite sur vos réseaux, dans vos mails ou sur votre site." },
          { p: "Votre événement continue d’exister pour ceux qui n’y étaient pas." },
        ],
      },
    ],
    /* Les trois questions étaient en place dans Sanity, sans réponse.
       ⚠️ Elles captent les recherches longues — c'est leur seul intérêt, donc
       elles répondent vraiment plutôt que de renvoyer vers un formulaire. */
    faq: [
      {
        cle: "faq0",
        question: "Faut-il une connexion internet dédiée pour diffuser en direct ?",
        reponse: "C’est le plus confortable, mais ce n’est pas indispensable. Nous diffusons par la connexion du lieu quand elle est suffisante et que nous avons pu la tester à l’avance, avec notre propre liaison en secours. Sur les sites où le réseau est incertain, nous partons directement sur nos liaisons, agrégées ou par satellite.",
      },
      {
        cle: "faq1",
        question: "Combien de caméras faut-il pour un live streaming ?",
        reponse: "Deux suffisent pour une conférence : un plan large et un plan serré sur l’intervenant. À partir de trois, on suit une table ronde sans temps mort et on récupère les réactions de la salle. Au-delà, c’est le déroulé qui décide du nombre, pas l’inverse.",
      },
      {
        cle: "faq2",
        question: "Peut-on diffuser en privé, pour une audience choisie ?",
        reponse: "Oui. Selon le niveau demandé, cela va du lien non répertorié à une page protégée par mot de passe ou restreinte à une liste d’adresses. Nous en parlons tôt, parce que le choix du contrôle d’accès conditionne la plateforme de diffusion.",
      },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   RENDUS
   ══════════════════════════════════════════════════════════════════════════ */

const echappe = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const versHtml = blocs =>
  blocs.map(b => (b.h ? `<h3>${echappe(b.h)}</h3>` : `<p>${echappe(b.p)}</p>`)).join("\n");

/* Portable Text. ⚠️ Les clés doivent être stables d'une exécution à l'autre :
   une clé aléatoire ferait voir à Sanity un contenu neuf à chaque passage, et
   l'historique de révisions du studio deviendrait illisible. */
const versBlocs = (blocs, prefixe) =>
  blocs.map((b, i) => ({
    _type: "block",
    _key: `${prefixe}${i}`,
    style: b.h ? "h3" : "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${prefixe}${i}s`, text: b.h ?? b.p, marks: [] }],
  }));

const mots = o =>
  [...(o.ajout ?? []), ...(o.sections ?? []).flatMap(s => s.corps), ...(o.faq ?? []).map(f => ({ p: f.reponse }))]
    .map(b => (b.h ?? b.p ?? "").split(/\s+/).length)
    .reduce((a, b) => a + b, 0);

/* ══════════════════════════════════════════════════════════════════════════
   SANITY — le nouveau site, et la source de vérité
   ══════════════════════════════════════════════════════════════════════════ */

const env = {};
for (const l of fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data`;

async function ecrireSanity(cle, o) {
  const patch = { id: o.sanityId, set: {} };

  /* ⛔ On REMPLACE `texte` par l'intro existante + l'ajout, plutôt que
     d'insérer : relancer le script deux fois ne doit pas empiler le texte en
     double. Le script doit être rejouable sans dégât. */
  const actuel = await fetch(
    `${API}/query/production?query=${encodeURIComponent(`*[_id=="${o.sanityId}"][0].texte`)}`,
    { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } }
  ).then(r => r.json());

  const intro = (actuel.result ?? []).filter(b => !String(b._key ?? "").startsWith(`aj-${cle}`));
  patch.set.texte = [...intro, ...versBlocs(o.ajout, `aj-${cle}-`)];

  o.sections.forEach((s, i) => {
    patch.set[`sections[_key=="${s.cle}"].titre`] = s.titre;
    patch.set[`sections[_key=="${s.cle}"].corps`] = versBlocs(s.corps, `sec-${cle}-${i}-`);
  });
  (o.faq ?? []).forEach((f, i) => {
    patch.set[`faq[_key=="${f.cle}"].question`] = f.question;
    patch.set[`faq[_key=="${f.cle}"].reponse`] = versBlocs([{ p: f.reponse }], `faq-${cle}-${i}-`);
  });

  const r = await fetch(`${API}/mutate/production`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.SANITY_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch }] }),
  }).then(r => r.json());
  if (r.error) throw new Error(JSON.stringify(r.error).slice(0, 400));
  console.log(`   ✓ Sanity — ${o.sanityId}`);
}

/* ══════════════════════════════════════════════════════════════════════════
   WORDPRESS — l'ancien site, qui gagne encore les clics
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * ⛔⛔ CE SCRIPT DOIT ÊTRE REJOUABLE, ET LA PREMIÈRE TENTATIVE A ÉCHOUÉ.
 *
 * Version 1 : on repérait l'ajout précédent avec un marqueur `<!-- ... -->`
 * et on coupait dessus avant de réécrire. **Elementor supprime les
 * commentaires HTML à l'enregistrement.** À la deuxième exécution le marqueur
 * n'existait donc plus, la coupe ne trouvait rien, et le texte s'est ajouté
 * une seconde fois : la page a porté les DEUX versions en ligne.
 *
 * 👉 Version 2, celle-ci : on ne cherche plus de repère dans le contenu vivant,
 * on **repart de la sauvegarde d'origine** à chaque fois. Le texte publié est
 * toujours « original + ajout courant », quel que soit le nombre de passages.
 *
 * ⚠️ Règle générale à retenir : un marqueur d'idempotence posé DANS une donnée
 * que le système hôte peut réécrire n'est pas un marqueur. La référence stable
 * doit vivre en dehors du système qu'on modifie.
 */
async function ecrireWordpress(cle, o) {
  const s = JSON.parse(fs.readFileSync(process.env.HOME + "/.mcp-secrets.json", "utf8"));
  const trouve = (x, k) =>
    x[k] ?? Object.values(x).filter(v => v && typeof v === "object").map(v => trouve(v, k)).find(Boolean);
  const BASE = trouve(s, "WP_BASE_URL").replace(/\/$/, "");
  const auth = "Basic " + Buffer.from(`${trouve(s, "WP_USER")}:${trouve(s, "WP_APP_PASSWORD")}`).toString("base64");
  const wp = async (c, opts = {}) => {
    const r = await fetch(`${BASE}/wp-json/wp/v2${c}`, {
      ...opts,
      headers: { Authorization: auth, "Content-Type": "application/json", ...(opts.headers || {}) },
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 300)}`);
    return j;
  };

  const page = (await wp(`/pages?slug=${o.wpSlug}&context=edit&_fields=id,meta`))[0];
  const brut = page.meta._elementor_data;

  /* ⛔ SAUVEGARDE AVANT TOUTE ÉCRITURE. Elementor stocke la page entière dans
     un seul champ JSON : une écriture ratée ne casse pas un paragraphe, elle
     casse la mise en page complète d'une page qui reçoit du trafic. */
  const sauvegarde = path.join(RACINE, `scripts/_sauvegarde-elementor-${o.wpSlug}.json`);
  if (!fs.existsSync(sauvegarde)) fs.writeFileSync(sauvegarde, brut);

  /* ⛔ L'ORIGINAL VIENT DE LA SAUVEGARDE, jamais du contenu en ligne : c'est ce
     qui rend le script rejouable sans empiler le texte. */
  const cherche = (els, id) => {
    for (const el of els || []) {
      if (el.id === id) return el;
      const r = cherche(el.elements, id);
      if (r) return r;
    }
  };
  const widgetOrigine = cherche(JSON.parse(fs.readFileSync(sauvegarde, "utf8")), o.wpWidget);
  if (!widgetOrigine) throw new Error(`widget ${o.wpWidget} absent de la sauvegarde de ${o.wpSlug}`);
  const origine = widgetOrigine.settings.editor;

  const data = JSON.parse(brut);
  let trouveWidget = false;
  const parcours = els => {
    for (const el of els || []) {
      if (el.id === o.wpWidget && el.settings?.editor !== undefined) {
        el.settings.editor = `${origine}\n${versHtml(o.ajout)}\n` +
          o.sections.map(s => `<h3>${echappe(s.titre)}</h3>\n${versHtml(s.corps)}`).join("\n") +
          (o.faq ? "\n<h3>Questions fréquentes</h3>\n" +
            o.faq.map(f => `<p><strong>${echappe(f.question)}</strong><br>${echappe(f.reponse)}</p>`).join("\n") : "");
        trouveWidget = true;
      }
      parcours(el.elements);
    }
  };
  parcours(data);
  if (!trouveWidget) throw new Error(`widget ${o.wpWidget} introuvable sur ${o.wpSlug}`);

  await wp(`/pages/${page.id}`, {
    method: "POST",
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
  console.log(`   ✓ WordPress — ${o.wpSlug} (id ${page.id}, sauvegarde dans scripts/)`);
}

/* ══════════════════════════════════════════════════════════════════════════ */

for (const [cle, o] of Object.entries(CONTENU)) {
  console.log(`\n${cle.toUpperCase()} — ${mots(o)} mots ajoutés`);
  if (!SANITY && !WORDPRESS) {
    console.log("   (simulation — relancer avec --sanity ou --wordpress)");
    continue;
  }
  if (SANITY) await ecrireSanity(cle, o);
  if (WORDPRESS) await ecrireWordpress(cle, o);
}
console.log(
  !SANITY && !WORDPRESS
    ? "\nRien n'a été écrit.\n"
    : "\nTerminé. ⚠️ Le texte ne se modifie QUE dans ce fichier, jamais dans le studio ni dans Elementor.\n"
);
