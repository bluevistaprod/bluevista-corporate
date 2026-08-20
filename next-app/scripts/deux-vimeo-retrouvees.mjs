/**
 * DEUX DES QUATRE VIMEO SONT RETROUVÉES SUR LIVID — AVEC CERTITUDE.
 *
 * ⛔⛔ LES ADRESSES VIMEO DE SANITY ÉTAIENT FAUSSES, ET C'EST L'IMPORT QUI LES
 * A CASSÉES. Trois des quatre répondent 404. En allant lire l'ANCIEN SITE (en
 * lecture seule), on trouve d'autres identifiants aux mêmes pages :
 *     ARAVI  : Sanity 780309433  ≠  ancien site 851622826
 *     ICSI   : Sanity 834445747  ≠  ancien site 834446775
 *     HDI    : même identifiant, mais l'ancien site porte un JETON de partage
 *              (h=49a48876c3) que l'import a perdu — sans lui, Vimeo répond 404.
 * 👉 Une adresse enregistrée n'est pas une adresse qui répond. Trois lecteurs
 * morts dormaient dans le site depuis l'import sans que rien ne le signale.
 *
 * ⭐ CE QUE CE SCRIPT ÉCRIT, IL LE SAIT — titre identique ET durée identique :
 *   • ARAVI → « ARAVI - Castellet - Highlight - J2 - 2023 », 2:19 des deux côtés.
 *   • L'actualité « Film de présentation produit » portait un LIEN Vimeo dans sa
 *     prose (pas un lecteur) vers « EIFFAGE ENERGIE - offre bâtiment connecté »,
 *     2:20 — un film déjà embarqué plus bas dans la même actualité, en Livid.
 *
 * ⛔ LES DEUX AUTRES NE SONT PAS DANS LE CATALOGUE. Vérifié sur les 980 vidéos :
 * aucun film HDI de 1:42, aucun « déménagement » nulle part, et côté ICSI huit
 * séquences mais pas le montage. Elles restent sur Vimeo — à Giz de les
 * renvoyer sur Livid.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function affiche(slug, nom) {
  const o = await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`).then(r => r.json());
  if (!o.thumbnail_url) return null;
  const img = await fetch(o.thumbnail_url);
  if (!img.ok) return null;
  const a = await client.assets.upload("image", Buffer.from(await img.arrayBuffer()), { filename: `affiche-${nom}.jpg` });
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
}

/* ── 1. ARAVI : la réalisation reçoit son film ET son affiche ─────────────
   Elle faisait partie des huit qui gardaient une image d'emprunt faute de
   vidéo Livid connue. Il y en a donc sept. */
const ARAVI = "https://livid.com/watch/FKr8OT9jrcsz";
const aff = await affiche("FKr8OT9jrcsz", "aravi-castellet-j2-2023");
const doc = await client.fetch(`*[_type=="realisation" && slug.current=="aravi-saison-2022"][0]{_id}`);
await client.patch(doc._id).set({ video: ARAVI, ...(aff ? { image: aff } : {}) }).commit();
console.log(`✅ ARAVI – Saison 2022 : passe sur Livid${aff ? ", et prend l'affiche de son propre film" : ""}.`);

/* ── 2. L'actualité : un lien dans la prose, pas un lecteur ───────────────
   ⚠️ On ne remplace QUE le href visé. Réécrire le paragraphe entier ferait
   sauter les autres liens qu'il porte — un `markDefs` se modifie par sa clé. */
const EIFFAGE = "https://livid.com/watch/bWNwHsayEU9C";
const act = await client.fetch(`*[_type=="actualite" && slug.current=="film-de-presentation-produit"][0]{_id, blocs}`);
let touches = 0;
const blocs = (act.blocs ?? []).map(b => ({
  ...b,
  paragraphes: (b.paragraphes ?? []).map(p => ({
    ...p,
    markDefs: (p.markDefs ?? []).map(m => {
      if (!m.href?.includes("vimeo.com")) return m;
      touches++;
      return { ...m, href: EIFFAGE };
    }),
  })),
}));
await client.patch(act._id).set({ blocs }).commit();
console.log(`✅ Film de présentation produit : ${touches} lien(s) Vimeo dans le texte renvoient maintenant vers Livid.`);

/* ── 3. Ce qui reste, dit franchement ────────────────────────────────────
   ⚠️ Les adresses données ici sont celles de l'ANCIEN SITE, pas celles de
   Sanity : ce sont les seules qui répondent encore. */
console.log(`
── Restent deux films à renvoyer sur Livid ───────────────────────────
   HDI - Déménagement Nouvelle Tour        1:42
      https://vimeo.com/904477628/49a48876c3
      (le jeton après la barre est indispensable — sans lui, Vimeo répond 404)

   ICSI - Briefing / Débriefing / Minute d'arrêt
      https://vimeo.com/834446775
      (identifiant relevé sur l'ancien site ; celui de Sanity, 834445747,
       ne répond plus — c'est peut-être le même film à un chiffre près)

   Une fois en ligne, me redonner les adresses Livid : je les pose et je
   vérifie que l'embed est actif, il arrive coupé par défaut.`);
