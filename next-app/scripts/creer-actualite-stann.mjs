/**
 * LA PREMIÈRE ACTUALITÉ DANS SANITY — STANN, celle sur laquelle la maquette
 * a été validée le 18/08/2026.
 *
 * ⭐ POURQUOI CELLE-LÀ : c'est l'actualité la plus vue du lot — 7 084
 * impressions sur douze mois — et elle exerce tout le gabarit : deux blocs,
 * une vidéo avec son affiche, trois photos, un aparté, un lien sortant vers
 * le client, deux liens vers des savoir-faire et quatre vers des réalisations.
 *
 * ⛔ LES IMAGES VIENNENT DE L'ANCIEN SITE ET Y SONT LUES UNE FOIS, PAS SERVIES
 * DEPUIS LUI. Pointer les `<img>` sur bluevistaprod.com marcherait aujourd'hui
 * et casserait le jour où le WordPress s'éteint — c'est-à-dire le 4 septembre.
 * On téléverse donc les fichiers dans Sanity.
 *
 * ⚠️ IDEMPOTENT : le document a un `_id` fixe, les images sont dédupliquées
 * par Sanity sur leur empreinte. Relancer le script ne crée pas de doublon.
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

const BASE = "https://www.bluevistaprod.com/wp-content/uploads/2023/10/";

async function televerser(nom) {
  const r = await fetch(BASE + nom);
  if (!r.ok) throw new Error(`${nom} : ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename: nom });
  console.log(`   ${nom} → ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/** Un paragraphe de texte enrichi, avec ses liens posés sur des MOTS. */
let n = 0;
function para(morceaux) {
  const key = () => `k${++n}`;
  const markDefs = [];
  const children = morceaux.map(m => {
    if (typeof m === "string") return { _type: "span", _key: key(), text: m, marks: [] };
    const k = key();
    markDefs.push({ _type: "link", _key: k, href: m.href });
    return { _type: "span", _key: key(), text: m.texte, marks: [k] };
  });
  return { _type: "block", _key: key(), style: "normal", markDefs, children };
}

console.log("⭐ Téléversement des photos de l'ancien site :");
const [entete, affiche, anim, sequence] = await Promise.all(
  ["Stan-3.png", "Stan-2.png", "Stan-4.png", "Stan-5.png"].map(televerser)
);

const doc = {
  _id: "actualite-stann",
  _type: "actualite",
  language: "fr",
  slug: { _type: "slug", current: "stann" },
  titre: "Filmer une application de gestion là où elle sert vraiment",
  chapo: [para([
    "Un logiciel se démontre mal en salle de réunion. Pour ",
    { texte: "STANN", href: "https://www.stann.app/" },
    ", on est allés le filmer chez un de ses clients — une journée de tournage à Grenoble, en conditions réelles, et une conclusion en animation 2D.",
  ])],
  imageEntete: entete,
  client: "STANN",
  clientUrl: "https://www.stann.app/",
  datePublication: "2024-02-05",
  repere: "Film produit · tournage + animation 2D",
  blocs: [
    {
      _type: "bloc", _key: "bloc-projet",
      surTitre: "Le projet",
      titre: "Trois minutes pour faire comprendre un logiciel",
      paragraphes: [
        para([
          "STANN édite une application de gestion pour les entrepreneurs : clients, devis, facturation, comptabilité, ressources humaines. La difficulté d'un ",
          { texte: "film produit", href: "/savoir-faire/video-corporate-film-dentreprise/" },
          " sur un logiciel est toujours la même — filmer des écrans ne montre rien, et un acheteur qui compare deux outils veut voir le sien fonctionner chez quelqu'un.",
        ]),
        para([
          "Le film est donc construit en trois temps : une introduction, la mise en situation de l'application chez un client de STANN, puis une conclusion en ",
          { texte: "animation 2D", href: "/savoir-faire/motion-design/" },
          " qui reprend en trente secondes ce que la démonstration a mis deux minutes à établir.",
        ]),
      ],
      medias: [{
        _type: "media", _key: "media-film",
        videoUrl: "https://livid.com/watch/KzPh3QGxA_sk",
        videoAffiche: affiche,
        legende: "STANN — film de présentation de l'application",
        sousLegende: "3 min 12 · le film s'ouvre sur le dirigeant de STANN",
      }],
      aparte:
        "Le storyboard était écrit avant le premier repérage. C'est le seul moyen de tenir une journée de tournage sans rien laisser au hasard — et de savoir, le soir, qu'on a tout.",
    },
    {
      _type: "bloc", _key: "bloc-fabrication",
      surTitre: "Comment on l'a fait",
      titre: "Une journée de tournage, deux métiers au montage",
      paragraphes: [
        para([
          "L'équipe a tourné en une journée sur Grenoble : les plans de l'entreprise cliente, les séquences d'utilisation de l'application, et les prises de parole. Tourner chez l'utilisateur plutôt qu'en studio impose de composer avec un lieu qu'on ne choisit pas — c'est aussi ce qui rend les images crédibles.",
        ]),
        para([
          "En post-production, le montage et l'animation 2D ont été fabriqués en parallèle. Le film sert aujourd'hui sur le site de STANN, sur ses réseaux sociaux et sur ses salons : trois usages pour un seul tournage, ce qui est généralement ce qui décide un budget vidéo.",
        ]),
      ],
      medias: [
        {
          _type: "media", _key: "media-anim", image: anim,
          legende: "L'animation 2D de la conclusion",
          sousLegende: "Les cinq modules repris en trente secondes",
          texteAlternatif:
            "Image de l'animation 2D qui conclut le film : les cinq modules de l'application STANN",
        },
        {
          _type: "media", _key: "media-sequence", image: sequence,
          legende: "Une séquence d'utilisation, tournée sur place",
          texteAlternatif:
            "Relevé effectué depuis l'application STANN pendant une intervention",
        },
      ],
    },
  ],
  projets: {
    surTitre: "Des projets du même type",
    titre: "Le film produit, du logiciel à la machine-outil",
    paragraphes: [
      para([
        "Un film produit répond toujours à la même commande : montrer un produit en fonctionnement plutôt qu'en fiche technique. Le sujet change, la méthode non — repérage, storyboard, tournage court, montage nerveux.",
      ]),
      para([
        "Chez ", { texte: "SANTOS", href: "/realisations/santos-film-produit/" },
        ", c'était du matériel de cuisine professionnelle en studio. Chez ",
        { texte: "ABB", href: "/realisations/abb-af-contactor-film-produit/" },
        ", un composant électrique qu'il fallait rendre lisible. Chez ",
        { texte: "RISO", href: "/realisations/riso-comcolor-video-produit/" },
        ", une imprimante de production. Et chez STANN, un logiciel.",
      ]),
    ],
    boutonLibelle: "Voir la réalisation STANN",
    boutonLien: "/realisations/stann-presentation-video-de-l-application/",
  },
  titreSeo: "Film de présentation d'une application de gestion",
  descriptionSeo:
    "Comment on a filmé l'application STANN chez un de ses clients : une journée de tournage à Grenoble, un montage en trois temps et une conclusion en animation 2D.",
};

await client.createOrReplace(doc);
console.log(`\n⭐ Actualité créée : ${doc._id}`);
console.log("→ http://localhost:3333/apercu/actualite/stann");
