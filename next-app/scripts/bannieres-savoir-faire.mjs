/**
 * LES BANNIÈRES DES PAGES DE SAVOIR-FAIRE — le dernier bloc du gabarit
 * qui n'avait jamais servi.
 *
 * ⛔⛔ LES IMAGES VIENNENT DE SANITY, PAS DU CLOUD STORE — et pas par choix.
 * Le volume s'est démonté en cours de route (« CLOUD STORE NON MONTÉ »). En
 * cherchant une solution de repli, j'ai trouvé mieux que le repli : Sanity
 * contenait DÉJÀ des images de 1 920 à 5 184 pixels, montées lors de la
 * reprise des 63 actualités. Aucun téléversement, aucune dépendance à un
 * volume réseau qui peut disparaître.
 * 👉 Chercher ailleurs quand la source habituelle tombe fait parfois trouver
 * la meilleure source.
 *
 * ⛔ LES SEPT ONT ÉTÉ OUVERTES ET REGARDÉES. Deux candidates ont été écartées
 * à l'œil : le rendu 3D du moulin SANTOS (trop sombre — sous le voile noir de
 * la bannière, il ne resterait rien) et le personnage Toky (une figurine
 * minuscule perdue dans un cadre noir).
 *
 * ⚠️ DEUX PAGES N'ONT PAS DE BANNIÈRE : `video-corporate-film-dentreprise` et
 * `studio-fond-vert-compositing`. Leurs seules images fortes servent déjà
 * d'ouverture sur la même page — les remettre en bannière ferait doublon à
 * deux écrans d'intervalle. Il leur faut une image du Cloud Store.
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

const BANNIERES = {
  "video-mapping": {
    image: "image-14fb603cd678d151892ccd2fbaa1a07ffed0d21f-1920x1080-jpg",
    vu: "Constellations projetées sur la façade du Grand Hôtel-Dieu, la nuit, devant les invités",
    titre: "Deux mois de travail pour une soirée",
    texte: [["Production, image, technique de projection et musique : quatre métiers qui ne travaillent pas ensemble le reste de l’année, réunis sur une inauguration."]],
    bouton: ["Voir la réalisation", "/realisations/tetro-grand-hotel-dieu-video-event/"],
  },
  "live-streaming-webtv": {
    image: "image-38125c6fd2d88642b582abe3e977a3736d76848a-2560x1710-jpg",
    vu: "La régie d’un direct : deux opérateurs au casque, la table de mélange, les retours « Live »",
    titre: "Le direct se réalise pendant qu’il se tourne",
    texte: [["Pas de rattrapage au montage : la régie décide en temps réel, et tout ce qui peut lâcher est doublé — la connexion, l’encodeur, l’enregistrement."]],
    bouton: ["Voir le projet", "/actualites/live-video-homeserve-20ans/"],
  },
  "aftermovie-captation-evenementielle": {
    image: "image-3c7484439ab5ad791cc1eff42a8dee557cf63da5-2560x1326-jpg",
    vu: "La salle des Fubiz Talks avant l’arrivée du public : scène, écran, lettres géantes",
    titre: "Ce qu’il reste quand la salle s’est vidée",
    texte: [["Un événement dure une journée. Son film tourne ensuite pendant des mois — sur les réseaux du client, dans ses mails, et comme argument de vente de l’édition suivante."]],
    bouton: ["Voir la réalisation", "/realisations/tetro-aftermovie-fubiztalks-2017/"],
  },
  "video-aerienne-drone": {
    image: "image-0ac0638a64918ed3da8fac3c7c1d9b8d1ff7e7cb-1920x1080-jpg",
    vu: "Vue aérienne d’un bâtiment industriel en fin de chantier, camions et engins au sol",
    titre: "Une usine se comprend d’en haut",
    texte: [["Depuis le parking, on voit une façade. Depuis le ciel, on voit l’implantation, les flux, l’échelle réelle — et ce que le site est devenu."]],
    bouton: ["Voir la réalisation", "/realisations/irisolaris-presentation-groupe-2024/"],
  },
  "creation-immersive-realite-virtuelle": {
    image: "image-122df98efe60e49dc22cfb7e22a95fd23236b18d-2560x1315-png",
    vu: "Le showroom virtuel GF Machining Solutions : une machine modélisée et sa fiche produit",
    titre: "Un showroom qu’on visite depuis un navigateur",
    texte: [["Une machine-outil ne va pas au salon : elle pèse des tonnes et son client est à l’autre bout du monde. Le showroom virtuel la déplace à sa place."]],
    bouton: ["Voir le projet", "/actualites/showroom-virtuel-gf-machining-solutions/"],
  },
  "animation-3d": {
    image: "image-196393457bdf6a3a04431711d0dec95e0e191d4c-1920x1080-png",
    vu: "Le blueverse : un espace entièrement modélisé en 3D, sous une verrière, avec ses stands",
    titre: "Un lieu qui n’existe que parce qu’on l’a modélisé",
    texte: [["Ni décor à louer, ni contrainte de bâtiment. La 3D fabrique l’espace, la lumière et les matières — puis les fait exister sous n’importe quel angle."]],
    bouton: ["Voir le projet", "/actualites/blueverse/"],
  },
  "motion-design": {
    image: "image-7d2b1e261ab2499350e2bbe61e1fe8332a896038-2560x1440-png",
    vu: "Une image du film « Le motion design, c’est quoi ? » — le personnage dessiné et animé",
    titre: "Expliquer en trente secondes ce qui prend deux minutes",
    texte: [["Un service, un flux, une idée : rien de tout ça n’a de forme. Le motion design lui en donne une, et fait tenir l’explication dans le temps où l’on regarde encore."]],
    bouton: ["Voir le projet", "/actualites/bluevista-le-motion-design/"],
  },
};

let n = 0;
const cle = () => `b${++n}`;
const para = t => ({ _type: "block", _key: cle(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: cle(), text: t, marks: [] }] });

for (const [slug, b] of Object.entries(BANNIERES)) {
  /* ⛔ La cible du bouton est vérifiée : une bannière qui renvoie dans le vide
     est pire qu'une page sans bannière — c'est le seul bouton de la page. */
  const [libelle, lien] = b.bouton;
  const type = lien.startsWith("/realisations/") ? "realisation" : "actualite";
  const cible = lien.replace(/^\/(realisations|actualites)\/|\/$/g, "");
  const ok = await client.fetch(`count(*[_type==$t && language=="fr" && slug.current==$s])`, { t: type, s: cible });
  if (!ok) { console.log(`⛔ ${slug} : cible « ${cible} » absente — bannière non posée`); continue; }

  const doc = await client.fetch(`*[_type=="page" && language=="fr" && slug.current==$s][0]{_id, blocs}`, { s: slug });
  const banniere = {
    _type: "blocBanniere", _key: `banniere-${slug}`,
    image: img(b.image),
    titre: b.titre,
    texte: b.texte.map(t => para(t[0])),
    boutonLibelle: libelle,
    boutonLien: lien,
  };
  /* ⚠️ La bannière se place AVANT le bloc usages : c'est le grand moment de
     la page, il vient après le récit et avant la liste des situations. */
  const blocs = (doc.blocs ?? []).filter(x => x._type !== "blocBanniere");
  const i = blocs.findIndex(x => x._type === "blocUsages");
  blocs.splice(i >= 0 ? i : blocs.length, 0, banniere);
  await client.patch(doc._id).set({ blocs }).commit();
  console.log(`✅ ${slug}  (${blocs.length} blocs)`);
  console.log(`   image : ${b.vu}`);
}

console.log(`\n⚠️ Sans bannière : video-corporate-film-dentreprise · studio-fond-vert-compositing`);
console.log(`   Leur seule image forte sert déjà d'ouverture sur la même page.`);
