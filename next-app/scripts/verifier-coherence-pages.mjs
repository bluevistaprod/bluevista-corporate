/**
 * LE CONTRÔLE DE COHÉRENCE — écrit le 12/08/2026 parce qu'il manquait.
 *
 * ⛔⛔ POURQUOI IL EXISTE. J'ai corrigé les pages de savoir-faire une par une
 * en affirmant à chaque fois des correspondances que je n'avais pas
 * vérifiées. Giz les a trouvées à ma place, plusieurs fois de suite :
 *   · la vidéo Cémoi posée sur un paragraphe qui parle de la durée des sessions ;
 *   · le texte qui dit « Pour Amplitude » au-dessus d'une photo de NightSwapping ;
 *   · une ancre « vidéo 360 » qui pointe vers la page drone ;
 *   · des liens `/apercu/savoir-faire/…` qui n'existent pas.
 * Son verdict : « il manque encore plein de liens et de trucs… franchement
 * l'ancien site est mieux ! Comment on fait ? »
 *
 * 👉 LA RÉPONSE : on arrête de corriger à l'aveugle, et on rend les
 * désaccords VISIBLES. Ce script compare, pour CHAQUE section :
 *   ① le projet NOMMÉ dans le texte,
 *   ② le média réellement ATTACHÉ (son titre, son nom de fichier),
 *   ③ la cible des liens.
 * Quand les trois ne parlent pas du même projet, il le dit.
 *
 * ⚠️ IL NE CORRIGE RIEN. Un contrôle qui corrige tout seul se met à mentir le
 * jour où il se trompe — c'est exactement ce qui a produit les treize « ✓ »
 * écrits dans des champs que personne ne lisait. Il liste, on décide.
 *
 * Usage :  node scripts/verifier-coherence-pages.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03`;
const groq = async (q) => {
  const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  u.searchParams.set("query", q);
  const j = await (await fetch(u, { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } })).json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

const real = await groq('*[_type=="realisation"]{"slug":slug.current,titre,client,clientUrl}');
const pages = await groq(`*[_type=="page" && genre=="savoir-faire"]{
  "slug":slug.current, "videos":videos[]{titre,url},
  "sections":sections[]{ titre, pleineLargeur,
    "texte": paragraphes[].children[].text,
    "liens": paragraphes[].markDefs[]{href},
    "ancres": paragraphes[].children[marks != []].text,
    "fichier": image.asset->originalFilename }
}|order(slug asc)`);
const slugsReels = new Set(real.map(r => r.slug));

/** Les noms propres d'un texte : ce qui commence par une majuscule et n'est pas un mot de liaison. */
const BANAL = new Set("Le La Les Un Une Des Nous Vous Sur Pour Chez Cette Ce En Il Elle Et Mais Donc Ici Deux Trois Quatre Cinq Aucun Aucune Ils Elles Leur Leurs Son Sa Ses Notre Nos Votre Vos Avant Après Quand Comme Ainsi Cela Ça Google Meta Quest Blender Cinema Unreal CAO 3D 2D".split(" "));
const nomsPropres = (t) =>
  [...new Set((t.match(/\b[A-ZÉÈÀÂÎÔÛ][\wÀ-ÿ'’&-]{2,}(?:\s+[A-ZÉÈÀ][\wÀ-ÿ'’&-]{2,})?/g) ?? [])
    .map(x => x.trim()).filter(x => !BANAL.has(x.split(" ")[0])))];

let alertes = 0;
for (const p of pages) {
  const lignes = [];
  (p.sections ?? []).forEach((s, i) => {
    const texte = (s.texte ?? []).join(" ");
    const noms = nomsPropres(texte);
    const fichier = s.fichier ?? null;
    const liens = (s.liens ?? []).map(l => l.href);
    const pb = [];

    /* ① Le média porte-t-il le nom d'un projet cité ? */
    if (fichier) {
      const dit = noms.some(n => fichier.toLowerCase().includes(n.split(" ")[0].toLowerCase().slice(0, 5)));
      if (!dit) pb.push(`la photo « ${fichier} » ne porte le nom d’aucun projet cité (${noms.slice(0, 3).join(", ") || "aucun"})`);
    }
    /* ② Les liens pointent-ils vers quelque chose qui existe ? */
    for (const h of liens) {
      if (h.startsWith("http")) continue;
      const m = h.match(/^\/realisations\/([^/]+)\//);
      if (m && !slugsReels.has(m[1])) pb.push(`le lien ${h} ne correspond à aucune réalisation`);
    }
    /* ③ L'ancre parle-t-elle de la cible ? */
    (s.ancres ?? []).forEach((a, k) => {
      const h = liens[k];
      if (!h || h.startsWith("http")) return;
      const cible = h.split("/").filter(Boolean).pop() ?? "";
      const mots = a.toLowerCase().split(/[^a-zà-ÿ0-9]+/).filter(w => w.length > 3);
      if (mots.length && !mots.some(w => cible.includes(w.slice(0, 5))))
        pb.push(`l’ancre « ${a} » pointe vers ${h} — les deux ne parlent pas de la même chose`);
    });
    /* ④ Une section sans média ni mention « pleine largeur ». */
    if (!fichier && !s.pleineLargeur) lignes.push(`   0${i + 1} ${s.titre.slice(0, 44).padEnd(44)} (vidéo attendue)`);

    if (pb.length) { alertes += pb.length; lignes.push(`   0${i + 1} ${s.titre.slice(0, 44)}\n        ⛔ ${pb.join("\n        ⛔ ")}`); }
  });

  /* ⑤ Les vidéos encore sur Vimeo. */
  const vimeo = (p.videos ?? []).filter(v => /vimeo/.test(v.url ?? ""));
  if (vimeo.length) { alertes += vimeo.length; lignes.push(`   ⛔ encore sur Vimeo : ${vimeo.map(v => v.titre).join(" · ")}`); }

  /* ⑥ Les projets nommés qui ont une réalisation et ne sont PAS liés. */
  const texteEntier = (p.sections ?? []).flatMap(s => s.texte ?? []).join(" ");
  const dejaLies = (p.sections ?? []).flatMap(s => (s.liens ?? []).map(l => l.href)).join(" ");
  const manques = real.filter(r => {
    const nom = (r.client ?? "").trim();
    return nom.length > 3 && new RegExp(`\\b${nom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(texteEntier)
      && !dejaLies.includes(r.slug);
  });
  if (manques.length) {
    alertes += manques.length;
    lignes.push(`   ⚠️ cités mais pas liés : ${[...new Set(manques.map(m => m.client))].join(" · ")}`);
  }

  if (lignes.length) console.log(`\n═══ ${p.slug}\n${lignes.join("\n")}`);
}
console.log(`\n${alertes} désaccord(s) à traiter.`);
