/**
 * RÉÉCRIRE LA PAGE RÉALITÉ VIRTUELLE — 12/08/2026, répartition validée par Giz.
 *
 * ⛔⛔ CE QUI N'ALLAIT PAS, ET CE N'ÉTAIT PAS LA MISE EN PAGE.
 * Le texte concentrait TROIS projets — Nikon, Prats, GF — dans la seule
 * section 01, et laissait les trois autres sections sans aucun projet nommé.
 * Il n'y avait donc rien à quoi accrocher un média, et le script comblait par
 * position : une photo sans rapport en 02, la vidéo Cémoi sur un paragraphe
 * qui parle de la durée des sessions, la vidéo Prats en 04 alors que Prats est
 * cité en 01. Verdict de Giz : « elles ne correspondent PAS DU TOUT au texte ».
 *
 * ⭐ LA LEÇON : UN MÉDIA S'ACCROCHE À LA PHRASE QUI LE NOMME. L'ancienne page
 * faisait ça naturellement — cinq blocs, cinq sujets, cinq médias, chacun
 * annoncé par son texte. Aucun script ne peut deviner qu'une vidéo Cémoi va
 * avec un paragraphe sur la durée d'une session, parce que c'est faux.
 * 👉 On n'automatise pas un choix éditorial. On écrit les sections pour
 * qu'elles PORTENT un projet, et le média suit.
 *
 * LA RÉPARTITION, VALIDÉE PAR GIZ :
 *   01 Ce qu'on a déjà mis dans un casque      → Nikon, Vision Tour   (photo)
 *   02 Parcourir un site sans s'y rendre       → GF Machining Solutions (photo)
 *   03 La durée d'une session décide de tout   → Virtual Korner       (vidéo)
 *   04 Essayer avant de promettre              → Prats, 360 sur ligne (vidéo)
 * La vidéo Cémoi, en trop, part dans le bloc de fin.
 *
 * ⚠️ Les images viennent de la MÉDIATHÈQUE de l'ancien site, pas de ses pages :
 * la page réalité virtuelle n'en portait que deux, la médiathèque en contient
 * cinq du showroom GF en 2560 px. Chercher là où c'est affiché ne trouve que
 * ce qui était affiché.
 *
 * Usage :  node scripts/reecrire-realite-virtuelle.mjs [--pour-de-vrai]
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
const groq = async (q) => {
  const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  u.searchParams.set("query", q);
  const j = await (await fetch(u, { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } })).json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

/**
 * LES QUATRE SECTIONS. Chacune nomme son projet dans la première phrase —
 * c'est ce qui permet d'y accrocher un média sans mentir, et ce qui donne au
 * lecteur une preuve plutôt qu'une affirmation.
 *
 * ⚠️ Aucun chiffre inventé. Les durées de session viennent de la FAQ de la
 * page, déjà validée ; « outil personnalisable de salon virtuel » est la
 * formulation de l'ancien site pour Virtual Korner.
 */
const SECTIONS = [
  {
    titre: "Ce qu’on a déjà mis dans un casque",
    image: "Nikon_Tour.jpg",
    paragraphes: [
      "Pour le Vision Tour de Nikon, nous avons reconstitué le parcours de fabrication d’un verre de lunette en combinant prises de vue réelles et modélisation 3D, l’ensemble diffusé en réalité virtuelle. Le visiteur suit le verre d’un poste à l’autre, dans l’ordre où le procédé se déroule.",
      "C’est le format qui convient quand le sujet est trop grand, trop lointain ou trop dangereux pour être montré autrement — une ligne de production, un chantier, un geste technique.",
    ],
  },
  {
    titre: "Parcourir un site sans s’y rendre",
    image: "Showroom–GF_Machining_Solutions-1.png",
    paragraphes: [
      "Pour GF Machining Solutions, la visite virtuelle du site permet de parcourir les ateliers depuis un navigateur, poste par poste, avec les informations techniques accessibles à chaque machine. Aucun casque, aucune installation : un lien suffit.",
      "Un showroom virtuel prolonge un salon de plusieurs mois, parce que le client qui n’a pas pu venir voit les mêmes machines, dans le même ordre, avec le même commentaire.",
    ],
  },
  {
    titre: "La durée d’une session décide de tout",
    /* Pas d'image : la vidéo Virtual Korner prend la colonne média. */
    paragraphes: [
      "Sur un salon, un visiteur accorde trois à cinq minutes ; en formation, il peut rester vingt minutes. Cette durée détermine le scénario, le nombre d’interactions et le nombre de casques nécessaires pour absorber le flux sans file d’attente.",
      "Virtual Korner, notre outil personnalisable de salon virtuel, part de cette contrainte : l’espace se configure selon le temps dont vous disposez et le nombre de visiteurs attendus. Nous fixons cette durée avec vous avant l’écriture, parce qu’elle change le budget autant que le contenu.",
    ],
  },
  {
    titre: "Essayer avant de promettre",
    paragraphes: [
      "Chez Prats, le même sujet a été traité en vidéo 360, sur la ligne de production réelle : pas de reconstitution, les machines tournent pendant qu’on filme. C’est souvent ce qui emporte la décision — voir son propre atelier plutôt qu’une image de synthèse.",
      "Nous avons notre propre parc de casques et nous testons l’expérience sur de vrais visiteurs avant les vôtres, dans les conditions du lieu : debout, avec du bruit, sans mode d’emploi.",
      "(Oui, on les met sur la tête des clients en réunion. Ça raccourcit beaucoup les débats.)",
    ],
  },
];

/* ── Les images, prises dans la médiathèque de l'ancien site ─────────────── */
const medias = JSON.parse(fs.readFileSync(
  "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad/media-fr.json", "utf8"));
const trouver = (nom) => medias.find(m => decodeURIComponent(m.source_url).endsWith(nom))?.source_url;

const deja = new Map();
async function televerser(nom) {
  if (deja.has(nom)) return deja.get(nom);
  const url = trouver(nom);
  if (!url) { console.log(`   ⛔ introuvable dans la médiathèque : ${nom}`); return null; }
  const r = await fetch(url, { headers: UA });
  if (!r.ok) { console.log(`   ⛔ ${r.status} — ${nom}`); return null; }
  const up = await fetch(`${API}/assets/images/${env.NEXT_PUBLIC_SANITY_DATASET}?filename=${encodeURIComponent(nom)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.SANITY_TOKEN}`, "Content-Type": r.headers.get("content-type") ?? "image/jpeg" },
    body: Buffer.from(await r.arrayBuffer()),
  });
  const j = await up.json();
  if (j.error) { console.log(`   ⛔ envoi refusé — ${JSON.stringify(j.error)}`); return null; }
  deja.set(nom, j.document._id);
  return j.document._id;
}

const page = (await groq('*[_type=="page" && genre=="savoir-faire" && slug.current=="creation-immersive-realite-virtuelle"][0]{_id,videos}'));

console.log("\nLA PAGE RÉÉCRITE :\n");
for (const [i, s] of SECTIONS.entries()) {
  console.log(`  0${i + 1} ${s.titre}`);
  console.log(`     média : ${s.image ?? "vidéo"}`);
  for (const p of s.paragraphes) console.log(`     ${p.slice(0, 96)}…`);
  console.log();
}
/* ⛔ L'ORDRE DES VIDÉOS COMPTE MAINTENANT : la 03 doit recevoir Virtual
   Korner et la 04 Prats. On les range explicitement, on ne compte plus sur
   l'ordre d'arrivée. */
const ordre = ["Virtual Korner", "PRATZ", "CEMOI"];
const videos = [...(page.videos ?? [])].sort(
  (a, b) => ordre.findIndex(o => a.titre?.includes(o)) - ordre.findIndex(o => b.titre?.includes(o))
);
console.log("  ordre des vidéos :", videos.map(v => v.titre).join(" · "));

if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const sections = [];
for (const [i, s] of SECTIONS.entries()) {
  const bloc = {
    _type: "object", _key: `sec${i}`, titre: s.titre,
    paragraphes: s.paragraphes.map((t, j) => ({
      _type: "block", _key: `sec${i}p${j}`, style: "normal", markDefs: [],
      children: [{ _type: "span", _key: `sec${i}p${j}s`, text: t, marks: [] }],
    })),
  };
  if (s.image) {
    const id = await televerser(s.image);
    if (id) bloc.image = { _type: "image", asset: { _type: "reference", _ref: id } };
  }
  sections.push(bloc);
}

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({ mutations: [{ patch: { id: page._id, set: { sections, videos } } }] }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

const relu = await groq('*[_id=="' + page._id + '"][0]{"sections":sections[]{titre,"image":defined(image)},"videos":videos[].titre}');
console.log("\n✅ relu dans Sanity :");
relu.sections.forEach((s, i) => console.log(`   0${i + 1} ${s.titre.padEnd(42)} ${s.image ? "photo" : "(vidéo)"}`));
console.log("   vidéos :", relu.videos.join(" · "));
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
