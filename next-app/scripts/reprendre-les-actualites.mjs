/**
 * LA PASSE MÉCANIQUE — les 63 actualités reprises depuis WordPress.
 *
 * ⭐ CE QUE CETTE PASSE FAIT, ET RIEN D'AUTRE : reprendre ce qui est FACTUEL et
 * vérifiable — le texte tel qu'il est écrit, les photos, les vidéos, la date,
 * l'adresse, le titre et la description Google déjà aspirés, le lien sortant
 * vers le site du client. Elle n'écrit pas une phrase.
 *
 * ⛔⛔ ELLE NE DÉCOUPE PAS LE RÉCIT EN CHAPITRES, ET C'EST DÉLIBÉRÉ.
 * 61 des 63 articles n'ont AUCUN intertitre. Découper en blocs et leur donner
 * un titre demande de LIRE l'article ; le faire par une règle produirait 126
 * titres fabriqués. Chaque article arrive donc en UN bloc, tous ses paragraphes
 * et tous ses médias. La passe éditoriale découpe et titre les 30 pages qui
 * portent le trafic.
 *
 * ⛔ AUCUN MÉDIA N'EST POSÉ SUR UN PARAGRAPHE PARTICULIER. Les rapprocher
 * automatiquement, c'est ce qui avait mis la vidéo Cémoi sur un texte de durée
 * de session et la photo NightSwapping sous le texte d'Amplitude. Les médias
 * sont empilés dans l'ordre de la page d'origine, qui est le seul ordre dont
 * on soit sûr.
 *
 * ⚠️ LES IMAGES SONT TÉLÉVERSÉES, pas pointées sur l'ancien site : celui-ci
 * s'éteint le 4 septembre.
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const RACINE = new URL("../../", import.meta.url).pathname;
const DOMAINE = "https://www.bluevistaprod.com";

/* ── Les fichiers déjà constitués ─────────────────────────────────────── */
function csv(nom) {
  const [entete, ...lignes] = readFileSync(RACINE + nom, "utf8").trim().split("\n");
  const cols = entete.split(";");
  return lignes.map(l => Object.fromEntries(l.split(";").map((v, i) => [cols[i], v])));
}
const IMAGES = csv("IMAGES-ACTUALITES.csv");
const SEO = Object.fromEntries(csv("TITRES-SEO-ANCIENS.csv").map(r => [r.adresse, r]));

/* ── Le cache des téléversements : une image partagée n'est envoyée qu'une
      fois, et Sanity déduplique de toute façon sur l'empreinte. ─────────── */
const deja = new Map();
async function televerser(url) {
  if (deja.has(url)) return deja.get(url);
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const nom = decodeURIComponent(url.split("/").pop());
    const asset = await client.assets.upload("image", buf, { filename: nom });
    const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    deja.set(url, ref);
    return ref;
  } catch (e) {
    console.log(`      ⚠️  image illisible : ${url.split("/").pop()} (${e.message})`);
    deja.set(url, null);
    return null;
  }
}

/* ── Le texte : on ne garde que les paragraphes, et leurs liens ────────── */
const decode = s => s
  .replace(/&#8217;|&rsquo;/g, "’").replace(/&#8211;|&ndash;/g, "–")
  .replace(/&#8230;|&hellip;/g, "…").replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'");

let compteur = 0;
const cle = () => `k${++compteur}`;

/** Un <p> de WordPress → un bloc de texte enrichi, liens compris. */
function paragraphe(html) {
  const markDefs = [];
  const children = [];
  // On découpe sur les <a> pour garder l'ancre sur les MOTS, pas sur tout
  // le paragraphe — c'est le défaut qui avait rendu des paragraphes entiers
  // cliquables sur les pages de savoir-faire.
  const morceaux = html.split(/(<a\b[^>]*>.*?<\/a>)/gis);
  for (const m of morceaux) {
    if (!m) continue;
    const lien = m.match(/^<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>$/is);
    if (lien) {
      const texte = decode(lien[2].replace(/<[^>]+>/g, "")).trim();
      if (!texte) continue;
      const k = cle();
      markDefs.push({ _type: "link", _key: k, href: lien[1] });
      children.push({ _type: "span", _key: cle(), text: texte, marks: [k] });
    } else {
      const texte = decode(m.replace(/<[^>]+>/g, ""));
      if (texte.trim()) children.push({ _type: "span", _key: cle(), text: texte, marks: [] });
    }
  }
  if (!children.length) return null;
  return { _type: "block", _key: cle(), style: "normal", markDefs, children };
}

/* ── WordPress ────────────────────────────────────────────────────────── */
const posts = [];
for (let p = 1; p <= 2; p++) {
  const r = await fetch(`${DOMAINE}/wp-json/wp/v2/posts?per_page=50&page=${p}&_fields=id,slug,title,date,content,link`);
  if (r.ok) posts.push(...(await r.json()));
}
console.log(`⭐ ${posts.length} articles lus sur WordPress.\n`);

const journal = [];
for (const [i, post] of posts.entries()) {
  const slug = post.slug;
  const adresse = `/actualites/${slug}/`;
  const html = post.content.rendered;

  /* Les paragraphes de l'article, dans l'ordre. */
  const bruts = [...html.matchAll(/<p\b[^>]*>(.*?)<\/p>/gis)]
    .map(m => m[1])
    .filter(p => decode(p.replace(/<[^>]+>/g, "")).trim().length > 40);
  const paras = bruts.map(paragraphe).filter(Boolean);
  if (!paras.length) {
    console.log(`[${i + 1}/${posts.length}] ${slug}  ⛔ aucun paragraphe`);
    continue;
  }

  /* Le chapô, c'est le premier paragraphe. Le reste fait le récit. */
  const chapo = [paras[0]];
  const corps = paras.slice(1);

  /* Les images : la première est l'en-tête, les autres vont dans le bloc. */
  const lignes = IMAGES.filter(r => r.adresse === adresse);
  const entete = lignes.find(r => r.role === "entete") ?? lignes[0];
  const contenus = lignes.filter(r => r !== entete);

  const imageEntete = entete ? await televerser(entete.url) : null;
  const medias = [];

  /* Les vidéos, dans l'ordre de la page. ⚠️ Elles restent sur leur plateforme
     d'origine à cette étape : la correspondance Livid des actualités n'est pas
     encore établie, et inventer un lien mort serait pire que garder Vimeo. */
  const videos = [...new Set([...html.matchAll(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/g)].map(m => m[1]))];
  for (const id of videos) {
    medias.push({
      _type: "media", _key: cle(),
      videoUrl: `https://vimeo.com/${id}`,
      legende: decode(post.title.rendered.replace(/<[^>]+>/g, "")).trim(),
    });
  }
  for (const l of contenus) {
    const img = await televerser(l.url);
    if (img) medias.push({ _type: "media", _key: cle(), image: img, texteAlternatif: l.texte_alternatif || "" });
  }

  const seo = SEO[adresse];
  const doc = {
    _id: `actualite-${slug}`,
    _type: "actualite",
    language: "fr",
    slug: { _type: "slug", current: slug },
    titre: decode(post.title.rendered.replace(/<[^>]+>/g, "")).trim(),
    chapo,
    datePublication: post.date.slice(0, 10),
    ...(imageEntete ? { imageEntete } : {}),
    blocs: corps.length || medias.length
      ? [{ _type: "bloc", _key: cle(), paragraphes: corps, medias }]
      : [],
    ...(seo?.titre_pour_sanity ? { titreSeo: seo.titre_pour_sanity } : {}),
    ...(seo?.description_seo || seo?.description_og
      ? { descriptionSeo: seo.description_seo || seo.description_og } : {}),
  };

  await client.createOrReplace(doc);
  journal.push({ slug, paras: paras.length, medias: medias.length, entete: Boolean(imageEntete), seo: Boolean(seo?.titre_pour_sanity) });
  console.log(`[${i + 1}/${posts.length}] ${slug}  → ${paras.length} §, ${medias.length} média(s)${imageEntete ? ", en-tête" : ", SANS EN-TÊTE"}`);
}

console.log(`\n⭐ ${journal.length} actualités créées.`);
console.log(`   sans image d'en-tête : ${journal.filter(j => !j.entete).length}`);
console.log(`   sans titre ni description Google : ${journal.filter(j => !j.seo).length}`);
console.log(`   médias au total : ${journal.reduce((n, j) => n + j.medias, 0)}`);
console.log(`\n⚠️ Aucun titre de bloc n'est écrit : c'est le travail de la passe éditoriale.`);
