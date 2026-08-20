/**
 * LES RETOURS DE GIZ DU 19/08 — mapping, motion design, animation 3D.
 *
 * ⭐ CE QUE CES RETOURS ONT EN COMMUN, ET ÇA VAUT POUR TOUTES LES PAGES :
 *   · un texte importé de l'ancien site n'est pas un texte relu. Trois
 *     paragraphes de la page motion design dataient de 2019 — « rendez-vous
 *     sur nos comptes Youtube et Vimeo » — et personne ne les avait vus
 *     depuis, parce que le gabarit neuf a été posé PAR-DESSUS ;
 *   · une image qui ne montre pas ce que la phrase raconte fait perdre le
 *     lecteur, même quand elle est belle : une mascotte sur un texte de
 *     machines-outils, un carton-titre sur un texte de CAO ;
 *   · une sélection automatique donne un résultat correct en moyenne et faux
 *     en particulier.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const img = ref => ({ _type: "image", asset: { _type: "reference", _ref: ref } });

/** L'affiche d'un film Livid, téléversée. */
async function affiche(slug) {
  const j = await (await fetch(`https://livid.com/oembed?url=https://livid.com/watch/${slug}`)).json();
  if (!j.thumbnail_url) return null;
  const r = await fetch(j.thumbnail_url);
  if (!r.ok) return null;
  const a = await client.assets.upload("image", Buffer.from(await r.arrayBuffer()), { filename: `affiche-${slug}.jpg` });
  return img(a._id);
}

/* ── Les remplacements de texte, en FRAGMENTS ────────────────────────── */
const TEXTES = {
  "motion-design": [
    ["en quelques secondes et sans plateau", "en quelques secondes"],
    ["Du crayon à la 3D, passant par l’animation 2D", "Du crayon à la 3D, en passant par l’animation 2D"],
    [" Découvrez plus en profondeur ces principes avec un très bon exemple qu’est notre film en animation 2D pour Veama :", ""],
    [" Rendez vous sur nos comptes Youtube et Vimeo pour visionner nos dernières créations ou sur nos réseaux sociaux pour rester au courant de nos dernières productions.", ""],
    ["Par conséquent, si la réalisation d’un motion design vous intéresse, le motion pourra traduire au mieux des informations didactiques ou informatives par le biais d’animations et de design précis. Ainsi, tout l’intérêt est de capter, de guider le regard pour transmettre une information de la meilleure des manières. Nous pourrons vous proposer de découvrir plus en profondeur ces principes avec de très bons exemples", ""],
    ["le même chiffre dans un tableau se saute", "le même chiffre dans un tableau est invisible"],
  ],
  "animation-3d": [
    ["Nous produisons aussi nos propres capsules, où un membre de l’équipe évolue dans un univers entièrement modélisé. Elles servent à essayer des partis pris avant de les proposer — c’est là qu’on prend les risques.",
     "Nous fabriquons aussi des films pour nous-mêmes : un membre de l’équipe est filmé sur fond vert, puis incrusté dans un décor entièrement modélisé. Ces essais nous servent à tester une idée à nos frais, avant de la proposer à un client."],
  ],
};

let n = 0;
const applique = (v, regles) => {
  if (typeof v === "string") { const x = regles.reduce((s, [a, b]) => s.split(a).join(b), v); if (x !== v) n++; return x; }
  if (Array.isArray(v)) return v.map(x => applique(x, regles));
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, applique(x, regles)]));
  return v;
};

for (const [slug, regles] of Object.entries(TEXTES)) {
  const d = await client.fetch(`*[_type=="page" && language=="fr" && slug.current==$s][0]{_id,accroche,texte,blocs,faq}`, { s: slug });
  const avant = n;
  await client.patch(d._id).set({
    accroche: applique(d.accroche, regles),
    texte: applique(d.texte, regles),
    blocs: applique(d.blocs, regles),
    ...(d.faq ? { faq: applique(d.faq, regles) } : {}),
  }).commit();
  console.log(`✅ ${slug} : ${n - avant} fragment(s) corrigé(s)`);
  for (const [de] of regles) {
    if (!JSON.stringify([d.accroche, d.texte, d.blocs, d.faq]).includes(de.replace(/"/g, '\\"')))
      console.log(`   ⚠️ introuvable : « ${de.slice(0, 58)}… »`);
  }
}

/* ── Les médias ─────────────────────────────────────────────────────── */
/* ⭐ La vidéo VEAMA remplace la photo VEAMA : le texte parle de la charte
   ANIMÉE — « la façon dont les couleurs se succèdent, dont les titres
   entrent ». Une image fixe ne peut pas montrer ça. */
const veamaAffiche = await affiche("3OIuc3gROEr9");
const ARROW = "image-f2a23c9732e31abf6069fd496c068f92a98d31ec-1920x1080-jpg";
const WESEEBIG = "image-b37f2472f154636520b68bfd3325611de9c30f97-1920x1080-jpg";

const md = await client.fetch(`*[_type=="page" && language=="fr" && slug.current=="motion-design"][0]{_id,blocs}`);
await client.patch(md._id).set({
  blocs: md.blocs.map(b => {
    if (b.titre === "Votre charte devient un système qui bouge") {
      const { image, ...reste } = b;
      return { ...reste, videoUrl: "https://livid.com/watch/3OIuc3gROEr9",
               videoTitre: "VEAMA — carte de vœux animée",
               ...(veamaAffiche ? { videoAffiche: veamaAffiche } : {}) };
    }
    /* ⭐ Un tournage HABILLÉ : l'image montre un objet réel avec ses titrages
       et ses logos ajoutés par-dessus. C'est exactement le sujet du bloc. */
    if (b.titre === "Un tournage habillé plutôt qu’un film entièrement animé") return { ...b, image: img(ARROW) };
    return b;
  }),
}).commit();
console.log("✅ motion-design : vidéo VEAMA posée, image d'habillage posée");

const a3 = await client.fetch(`*[_type=="page" && language=="fr" && slug.current=="animation-3d"][0]{_id,blocs}`);
await client.patch(a3._id).set({
  blocs: a3.blocs.map(b => {
    /* La mascotte sur un texte de machines-outils : remplacée par un rendu
       macro d'usinage — ce qu'aucune caméra ne peut atteindre. */
    if (b.titre === "Trois cas où l’animation 3D est la seule réponse") return { ...b, image: img(WESEEBIG) };
    /* ⛔ LE BLOC « CAO » PERD SON IMAGE PLUTÔT QUE D'EN RECEVOIR UNE FAUSSE.
       Il lui faut une vue de modélisation ou un fichier de conception à
       l'écran ; rien de tel dans le stock. Un emplacement vide se voit et se
       corrige ; une image hors sujet se lit et trompe. */
    if (b.titre === "Du fichier de conception à l’image finale") { const { image, ...r } = b; return r; }
    return b;
  }),
}).commit();
console.log("✅ animation-3d : image machines posée, image CAO retirée");

/* ── Les projets choisis à la main sur la page mapping ───────────────── */
const vm = await client.fetch(`*[_type=="page" && language=="fr" && slug.current=="video-mapping"][0]{_id}`);
const CHOIX = ["artcurial-video-mapping", "toky-video-mapping-3d", "video-mapping-vehicule-audi-a8"];
const ok = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: CHOIX });
const absents = CHOIX.filter(x => !ok.includes(x));
if (absents.length) console.log(`⛔ absents : ${absents.join(", ")}`);
else {
  await client.patch(vm._id).set({ projetsChoisis: CHOIX }).commit();
  console.log(`✅ video-mapping : ${CHOIX.length} projets choisis à la main`);
}
