/**
 * PAGE LIVE STREAMING — LES IMAGES ET LE PREMIER PARAGRAPHE. 20/08/2026.
 *
 * ⛔⛔ CE SCRIPT NE TOUCHE QU'UN SEUL DOCUMENT. Giz travaille en parallèle sur
 * la page « film d'entreprise » dans Sanity : tout patch ailleurs écraserait
 * son travail en cours.
 *
 * ⛔⛔ CE QUE J'AVAIS RATÉ, ET COMMENT. J'ai déclaré cette page « vérifiée »
 * après avoir seulement changé son en-tête. Les images des blocs, je ne les
 * avais jamais OUVERTES — je les avais jugées sur leur taille en pixels, qui
 * ne dit rien de ce qu'elles montrent. Résultat, sur une page de diffusion en
 * direct :
 *     • le bloc d'entrée montrait UN DRONE en vol (et en 400×400) ;
 *     • le bloc « ce qu'il en reste après » montrait une PETITE PLANÈTE 360,
 *       c'est-à-dire de la réalité virtuelle ;
 *     • le bloc « ce qu'on installe » montrait une salle de spectacle vide,
 *       alors que le texte décrit une régie et un mélangeur.
 * 👉 Une image ne se contrôle qu'en la regardant. Compter les pixels, c'est
 * vérifier qu'elle existe, pas qu'elle est juste.
 *
 * ⛔ ET J'AI AFFIRMÉ QU'AUCUNE PHOTO DE RÉGIE N'EXISTAIT. Elle était sur la
 * BANNIÈRE DE CETTE PAGE — la seule image que mon inventaire n'ouvrait pas.
 * La médiathèque de l'ancien site en contient quatre autres, du même tournage
 * HomeServe : régie complète, plateau, opérateurs. Elles sont ici.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ID = "page-savoir-faire-live-streaming-webtv";
const BASE = "https://www.bluevistaprod.com/wp-content/uploads/2023/05";

/* ⚠️ Téléversées chez nous, pas pointées sur l'ancien site : le jour où il
   s'éteint, une image qui y pointe disparaît de la page. */
async function reprendre(fichier, nom) {
  const r = await fetch(`${BASE}/${fichier}`);
  if (!r.ok) throw new Error(`${fichier} : HTTP ${r.status}`);
  const a = await client.assets.upload("image", Buffer.from(await r.arrayBuffer()), { filename: nom });
  console.log(`   ⬆ ${nom} — ${a.metadata?.dimensions?.width}×${a.metadata?.dimensions?.height}`);
  return { _type: "image", asset: { _type: "reference", _ref: a._id } };
}

console.log("Reprise des photos du direct HomeServe :");
/* Le plateau : un intervenant filmé, le décor, la caméra au premier plan. */
const PLATEAU = await reprendre("Live-HS03.jpg", "live-plateau-homeserve.jpg");
/* La régie : mélangeur, multiview, deux opérateurs au casque, caméras. */
const REGIE   = await reprendre("Live-HS01.jpg", "live-regie-homeserve.jpg");
/* La caméra qui tourne encore, à contre-jour. */
const CAMERA  = await reprendre("Live-HS04.jpg", "live-camera-homeserve.jpg");

const doc = await client.fetch(`*[_id==$i][0]{blocs, texte}`, { i: ID });

/* ── Les images ──────────────────────────────────────────────────────────── */
const blocs = doc.blocs.map(b => {
  if (b._type === "blocEntree") return { ...b, image: PLATEAU };   // remplace le drone
  if (b.titre === "Ce qu’on installe, et ce que ça suppose de votre côté") return { ...b, image: REGIE };
  /* ⚠️ LE MOINS LITTÉRAL DES TROIS, ET JE LE DIS. Aucune image du catalogue ne
     montre un replay ni des extraits. Celle-ci montre une caméra qui tourne
     encore : elle vaut pour « l'événement continue d'exister », pas davantage.
     Elle a surtout le mérite d'être un vrai tournage à nous, là où la petite
     planète 360 racontait une autre prestation. */
  if (b.titre === "Ce qu’il en reste après") return { ...b, image: CAMERA };
  return b;
});

/* ── Le premier paragraphe ───────────────────────────────────────────────
   ⚠️ LUI SEUL. Les quatre entrées suivantes (clés « aj-streaming-… ») ont été
   écrites pour le nouveau site, intertitres compris : on n'y touche pas. */
const texte = doc.texte.map(b =>
  b._key !== "t0" ? b : {
    ...b, style: "normal", markDefs: [],
    children: [{
      _type: "span", _key: "t0s", marks: [],
      text: "Diffuser en direct, ce n’est pas mettre une caméra devant une salle : c’est réaliser pendant qu’on tourne. Une régie, plusieurs caméras, un mélangeur, et quelqu’un qui décide en temps réel de ce que voit le spectateur à distance — parce qu’il n’y a pas de rattrapage au montage.",
    }],
  }
);

await client.patch(ID).set({ blocs, texte }).commit();
console.log(`
✅ bloc d’entrée : le drone cède la place au plateau HomeServe
✅ « Ce qu’on installe » : la vraie régie, mélangeur et multiview
✅ « Ce qu’il en reste après » : la petite planète 360 s’en va
✅ premier paragraphe réécrit (ADSL / 3G / 4G et H.264 sont partis)`);
