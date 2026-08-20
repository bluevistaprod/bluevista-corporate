/**
 * BALAYAGE DES IMAGES DES NEUF PAGES DE SAVOIR-FAIRE — 20/08/2026.
 *
 * ⛔ LE CLOUD STORE N'EST PAS DISPONIBLE (point de montage resté en place mais
 * volume injoignable), et l'ANCIEN SITE NE DONNE RIEN : ses pages de
 * savoir-faire ne contiennent que des logos et des vignettes de 400×284 — ce
 * sont d'ailleurs ces vignettes-là qui ont été importées et qui font les
 * images floues d'aujourd'hui. Le fichier s'appelle littéralement
 * « American-Vintage01-400x284-1.jpg » : 400×284 EST l'original.
 *
 * ⭐ LA SOURCE UTILISABLE EST DONC LA MÊME QUE POUR LES 137 RÉALISATIONS :
 * les affiches Livid de nos propres films, en 1920×1080. Elles sont à nous,
 * elles sont grandes, et elles montrent un vrai tournage.
 *
 * ⛔ RÈGLE APPLIQUÉE À CHAQUE CHOIX : quand un bloc NOMME un client, il reçoit
 * l'image DE CE FILM-LÀ, pas une image du même thème. C'est ce qui manquait
 * quand la page SGS montrait American Vintage. Chaque ligne ci-dessous porte
 * sa justification ; celles que je n'ai pas pu justifier ne sont pas écrites,
 * elles sont listées à la fin pour Giz.
 *
 * ⚠️ TOUTES LES IMAGES ONT ÉTÉ REGARDÉES, une par une, avant d'être posées.
 *
 * ⛔⛔ CE SCRIPT N'EST PAS REJOUABLE TEL QUEL : il INSÈRE une bannière au lieu
 * de la remplacer. Relancé une fois pour corriger le type du texte, il en a
 * posé une seconde — et les deux portaient la MÊME clé, ce que Sanity refuse.
 * Les deux pages sont tombées en 500. Réparé à part, mais si tu le relances,
 * retire d'abord les bannières existantes.
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

/* ── Les images retenues, avec ce qu'elles montrent vraiment ─────────────── */
const RADISSON  = "image-f24f110d50d33411a71a86120031d81e3767b058-4072x2036-jpg"; // panorama 360 d'un lounge, courbé : le format se voit
const HUAWEI    = "image-a70b167c53d3d5e1f443f1f9f1014916105722c9-1920x1080-jpg"; // salle comble, grand écran, un orateur
const SANTOS66  = "image-450782a93d3be74f70172d0ef4b854ec0725dc50-1920x1080-jpg"; // décor de café monté en studio, une personne au travail
const GHI       = "image-664f0cc4cd892de6999871b785602552d6e2e1ff-1920x1080-jpg"; // un banc et un homme sur fond blanc pur : le détourage se VOIT
const SGSLAB    = "image-329159c90c7b4041dd79038435a1f5f61e2872aa-1920x1080-jpg"; // le Protection Lab, blouse blanche, tableau sur table
const SGSITW    = "image-33d56685aa756eca44ef098c84a94fbaf7760849-1920x1080-jpg"; // interview SGS avec son bandeau-titre
const RISO      = "image-a66646cbdee36cb192f2d9b014bc15ffbae9fb67-1280x720-jpg";  // détail machine Comcolor, mention de vitesse incrustée
const NAOS      = "image-aa5b1796c8b99271b97ead15931d95a987343480-1920x1080-jpg"; // un intervenant assis, micro-cravate, lumière douce
const AUDI      = "image-a1a83735e4527a89bed90d4ea2ccfa25c0aabb7a-1920x1080-jpg"; // mapping projeté sur une voiture sous housse
const AMPLIVIS  = "image-285a859ad0fbd4dc6551e99aaf6b996188b6c11d-1920x1080-jpg"; // macro produit blanc, éclairage de studio
const ABBSNK    = "image-22ae13a12cbd60a0665f1057d2f8e4cb56a469c1-1920x1080-jpg"; // personnages 3D cartoon : le « stylisé » en image

/**
 * Une bannière neuve : les deux pages qui n'en avaient pas du tout.
 *
 * ⛔ `texte` N'EST PAS UNE CHAÎNE, C'EST DU TEXTE RICHE. Le champ porte un nom
 * qui appelle une phrase, et le schéma attend un TABLEAU de blocs. Une chaîne
 * y passe sans broncher côté Sanity, puis le rendu tombe en 500 sur
 * « blocs.map is not a function » — deux pages entières mortes pour un type.
 * 👉 Même leçon que l'affiche vidéo : le nom d'un champ ne dit pas son type.
 */
const banniere = (cle, titre, texte, ref) => ({
  _type: "blocBanniere", _key: cle, titre, image: img(ref),
  texte: [{
    _type: "block", _key: `${cle}t`, style: "normal", markDefs: [],
    children: [{ _type: "span", _key: `${cle}s`, text: texte, marks: [] }],
  }],
});

const TRAVAUX = [
  {
    page: "page-savoir-faire-creation-immersive-realite-virtuelle",
    hero: RADISSON,
    pourquoi: "en-tête : un panoramique 360 dont la courbure dit le format avant tout texte",
  },
  {
    page: "page-savoir-faire-live-streaming-webtv",
    hero: HUAWEI,
    pourquoi: "en-tête : une salle pleine et un écran — un événement qui se diffuse",
  },
  {
    page: "page-savoir-faire-video-corporate-film-dentreprise",
    hero: SANTOS66,
    pourquoi: "en-tête : un vrai tournage, un décor monté, quelqu'un au travail",
    /* ⭐ Les deux blocs reçoivent l'image DU film qu'ils nomment. Ils
       portaient jusqu'ici deux vignettes de 400×284 sans rapport. */
    blocs: { "Ce qu’on maîtrise de bout en bout": SGSLAB, "Ce que vous recevez, au-delà du film": RISO },
    ajouterBanniere: banniere(
      "bancorp",
      "Tout se fabrique ici, du brief à la mise en ligne",
      "Écriture, tournage, prise de son, montage, étalonnage, sous-titres : chaque étape se décide dans la même pièce, et rien n’attend un prestataire extérieur.",
      SGSITW
    ),
  },
  {
    page: "page-savoir-faire-studio-fond-vert-compositing",
    hero: GHI,
    pourquoi: "en-tête : un banc posé sur du blanc pur — le détourage se voit à l'œil nu",
    blocs: { "Le confort de l’intervenant décide de la qualité": NAOS },
    ajouterBanniere: banniere(
      "banfv",
      "Le décor arrive après le tournage",
      "On filme d’abord la personne, on choisit ensuite ce qu’il y a derrière — et on peut en changer sans refaire une prise.",
      AMPLIVIS
    ),
  },
  {
    page: "page-savoir-faire-video-mapping",
    blocs: { "Ce que le mapping sur table permet en intérieur": AUDI },
    pourquoi: "bloc 08 : une projection sur une voiture, c'est le « produit » que la phrase annonce",
  },
  {
    page: "page-savoir-faire-animation-3d",
    /* ⚠️ 336×199 : la plus petite image de tout le site, et elle illustrait
       un paragraphe sur la qualité du rendu. */
    blocs: { "Photo-réaliste ou stylisé : un choix, pas une contrainte": ABBSNK },
    pourquoi: "bloc 03 : des personnages cartoon pour illustrer le « stylisé » (l'image faisait 336 pixels de large)",
  },
];

for (const t of TRAVAUX) {
  const doc = await client.fetch(`*[_id==$i][0]{blocs}`, { i: t.page });
  if (!doc) { console.log(`⛔ ${t.page} introuvable`); continue; }

  const patch = {};
  if (t.hero) patch.image = img(t.hero);

  if (t.blocs || t.ajouterBanniere) {
    let blocs = doc.blocs.map(b =>
      t.blocs?.[b.titre] ? { ...b, image: img(t.blocs[b.titre]) } : b
    );
    if (t.ajouterBanniere) {
      /* ⛔ LA BANNIÈRE SE POSE OÙ ELLE COUPE. Sur les sept autres pages elle
         tombe après les blocs de texte et avant les cas d'usage : c'est elle
         qui donne la respiration sombre au milieu de la page. La placer en fin
         de document la mettrait après la grille de projets, où elle n'aurait
         plus rien à séparer. */
      const i = blocs.findIndex(b => b._type === "blocUsages");
      const ou = i === -1 ? blocs.length : i;
      blocs = [...blocs.slice(0, ou), t.ajouterBanniere, ...blocs.slice(ou)];
    }
    patch.blocs = blocs;
  }

  await client.patch(t.page).set(patch).commit();
  console.log(`✅ ${t.page.replace("page-savoir-faire-", "")}\n   ${t.pourquoi}`);
  if (t.blocs) for (const k of Object.keys(t.blocs)) console.log(`   image posée sur « ${k} »`);
  if (t.ajouterBanniere) console.log(`   bannière créée : « ${t.ajouterBanniere.titre} »`);
}

console.log(`
── CE QUE JE N'AI PAS FAIT, ET POURQUOI ─────────────────────────────
⛔ fond vert, bloc « Ce que le fond vert permet… » : le texte parle de la
   carte de vœux Amplitude tournée sur fond vert. Ce film n'est pas dans le
   catalogue en image utilisable — les deux Amplitude disponibles sont une
   salle de formation et une carte à logo, aucune des deux ne montre un fond
   vert. L'image de 400×284 reste donc en place, floue mais juste.
   👉 Soit on retrouve ce film, soit on change l'exemple du paragraphe.

⛔ live streaming, bloc « Ce qu'on installe… » : le texte décrit une régie,
   plusieurs caméras et un mélangeur. Aucune photo de régie dans le catalogue.
   L'image actuelle fait 943×526 — elle passera, mais elle est petite.

⛔ drone, bloc « Le cadre légal… » : c'est le film de l'aéroport de Lyon qui
   doit y aller, et il n'est pas encore sur Livid (tâche Podio du 15/10).`);
