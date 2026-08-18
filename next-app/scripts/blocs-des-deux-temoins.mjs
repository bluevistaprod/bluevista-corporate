/**
 * LES DEUX DERNIÈRES PAGES DE SAVOIR-FAIRE PASSENT AUX BLOCS — 18/08/2026.
 *
 * ⛔⛔ CE QUE CETTE BASCULE COÛTE, ET IL FAUT LE DIRE.
 * `video-mapping` et `live-streaming-webtv` étaient les deux TÉMOINS : gardés
 * volontairement sur l'ancien gabarit pour pouvoir mesurer l'effet de la
 * refonte en comparant à des pages restées identiques. En les refaisant, on
 * perd ce point de comparaison — la règle « ajouter, jamais remplacer » qui
 * les protégeait tombe.
 * 👉 Décision de Giz le 18/08 : deux pages sur neuf qui ne ressemblent pas aux
 * autres, le 4 septembre, ça se voit plus que ça ne se mesure.
 *
 * ⭐ LE TEXTE EST DÉJÀ ÉCRIT ET IL EST BON. Ces deux pages avaient été
 * réécrites ; seule leur MISE EN PAGE était restée en arrière. Ce script ne
 * touche donc pas une phrase : il reprend les `sections` telles quelles —
 * paragraphes ET liens, `markDefs` compris — et les range dans des blocs.
 *
 * ⛔ UN MÉDIA NE SE POSE QUE SUR UNE PHRASE QUI LE NOMME. Sur `video-mapping`,
 * six vidéos sont disponibles et deux seulement sont nommées dans le texte :
 * l'InterContinental et les quarante ans de Siparex. Les quatre autres NE SONT
 * PAS placées — les répartir « pour ne pas les perdre » est exactement le
 * geste qui avait mis la vidéo Cémoi sur un paragraphe de durée de session.
 * Elles sont listées en fin d'exécution pour que Giz tranche.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

let n = 0;
const cle = () => `t${++n}`;

/** Un paragraphe écrit ici, avec ses liens posés sur les MOTS. */
function para(morceaux) {
  const markDefs = [];
  const children = morceaux.map(m => {
    if (typeof m === "string") return { _type: "span", _key: cle(), text: m, marks: [] };
    const k = cle();
    markDefs.push({ _type: "link", _key: k, href: m.href });
    return { _type: "span", _key: cle(), text: m.texte, marks: [k] };
  });
  return { _type: "block", _key: cle(), style: "normal", markDefs, children };
}

/**
 * LE PLAN DES DEUX PAGES.
 * `sections` renvoie aux sections existantes par leur rang ; `video` au titre
 * exact d'une vidéo déjà rattachée à la page. Rien n'est deviné.
 */
const PLANS = {
  "video-mapping": {
    entree: {
      affirmations: [
        "Une façade n’est jamais plate : l’image se fabrique sur un relevé, pas sur une photo.",
        "Trois à cinq minutes devant un public debout — c’est l’écriture qui tient, pas les effets.",
        "Le même principe se joue sur une table de banquet que sur trente mètres de façade.",
      ],
      prestations: [
        "Relevé de la géométrie réelle du bâtiment, avant toute écriture",
        "Écriture du spectacle à partir de ce que le lieu raconte",
        "Fabrication des images — 3D, motion design, tournage",
        "Calcul du nombre de vidéoprojecteurs et de leurs emplacements",
        "Captation de la projection et de la soirée",
      ],
    },
    blocs: [
      /* ⛔⛔ QUATRE VIDÉOS ÉTAIENT RATTACHÉES À LA PAGE SANS QU'AUCUNE PHRASE
         NE LES NOMME. Je les avais laissées de côté au nom de la règle « un
         média ne se pose que sur une phrase qui le nomme ». Giz : « fais la
         phrase qui va bien, mais je veux les placer OUI ».
         👉 LA RÈGLE NE DIT PAS DE JETER LE MÉDIA, ELLE DIT D'ÉCRIRE LA PHRASE.
         Ce que je prenais pour un arbitrage était une paresse : il y avait un
         troisième chemin entre « placer au hasard » et « ne pas placer ».
         Chaque vidéo a donc reçu son bloc, avec un texte qui dit ce qu'elle
         montre — vérifié un par un sur Livid, pas deviné d'après son titre. */
      { titre: "Un aperçu, avant d’entrer dans le détail",
        video: "Vidéo mapping — vidéo 1 (à renommer)",
        paras: [
          ["Une minute et vingt secondes de projections, prises sur des façades, des dômes et des tables. C’est le format le plus court pour comprendre ce que recouvre le mot « mapping », qui désigne des objets très différents selon qu’on parle d’un bâtiment de trente mètres ou d’une maquette de salon."],
        ] },

      { section: 0, video: "TETRO - Intercontinental Lyon - Mapping Dome" },

      { titre: "La soirée filmée pendant qu’elle se projetait",
        video: "Vidéo mapping — vidéo 6 (à renommer)",
        paras: [
          ["Le soir de l’inauguration, une seconde équipe tournait pendant que les projections tournaient : l’arrivée des invités, les réactions sous le dôme, les deux mappings vus depuis la salle. Ce clip est ce qu’il reste de la soirée pour ceux qui n’y étaient pas."],
          ["C’est aussi ce qui distingue une chaîne complète d’une prestation de projection : le film du mapping et le film de l’événement sont fabriqués par la même équipe, avec le même calage, et personne n’attend l’autre."],
        ] },

      { section: 1 },
      { section: 2, video: "VideoMapping 40 ans SIPAREX" },

      { titre: "Le Printemps de Lyon annonce sa nouvelle marque sur sa façade",
        video: "PRINTEMPS - Mapping Festival",
        paras: [
          ["Changer de marque, pour un grand magasin, c’est changer ce que les gens voient depuis la rue. La projection a servi l’annonce elle-même : la façade a porté la bascule, devant le public d’un soir plutôt que dans un communiqué."],
        ] },

      { titre: "Et l’aftermovie qui a fait circuler la soirée",
        video: "PRINTEMPS - Aftermovie Festival",
        paras: [
          ["Une projection dure un soir. L’aftermovie, lui, tourne ensuite pendant des semaines sur les réseaux du client et dans ses mails — c’est souvent lui qui touche le plus de monde, et il se tourne le même soir, pas après."],
        ] },

      { section: 3 },
    ],
  },

  "live-streaming-webtv": {
    entree: {
      affirmations: [
        "Ce qui fait fermer l’onglet n’est presque jamais la qualité de l’image.",
        "Un événement hybride, ce sont deux publics qui ne suivent pas le même événement.",
        "Tout ce qui peut lâcher est doublé — la connexion, l’encodeur, l’enregistrement.",
      ],
      prestations: [
        "Écriture de la diffusion avant l’événement, pas après",
        "Régie multicaméra, mélangeur et direct réalisé pendant le tournage",
        "Reprise du son de salle, titrages, logos et diapositives dans l’image",
        "Doublement de la connexion et de l’encodeur, enregistrement local en parallèle",
        "Remise en ligne du replay et extraits pour vos réseaux",
      ],
    },
    blocs: [
      /* ⚠️ La vidéo est une démonstration du savoir-faire, pas le film d'un
         projet nommé dans le texte. Elle est posée sur le bloc d'ouverture,
         où elle illustre le propos sans prétendre l'illustrer LUI. */
      { section: 0, video: "bluevista | Live streaming 2018" },
      { section: 1 },
      { section: 2 },
    ],
  },
};

const orphelines = [];

for (const [slug, plan] of Object.entries(PLANS)) {
  const doc = await client.fetch(
    `*[_type=="page" && language=="fr" && slug.current==$s][0]{_id, sections, faq, videos}`,
    { s: slug }
  );
  if (!doc) { console.log(`⛔ ${slug} : absente`); continue; }

  const videos = doc.videos ?? [];
  const utilisees = new Set();

  const blocs = [{
    _type: "blocEntree", _key: cle(),
    surTitre: "Ce qui vous amène",
    affirmations: plan.entree.affirmations,
    surTitrePrise: "Ce qu’on prend en charge",
    prestations: plan.entree.prestations,
  }];

  for (const b of plan.blocs) {
    /* Un bloc vient soit d'une section existante, soit d'un texte écrit ici. */
    const s = b.paras
      ? { titre: b.titre, paragraphes: b.paras.map(para) }
      : doc.sections?.[b.section];
    if (!s) { console.log(`   ⚠️ section ${b.section} absente`); continue; }
    const v = b.video ? videos.find(x => x.titre === b.video) : null;
    if (b.video && !v) console.log(`   ⚠️ vidéo « ${b.video} » introuvable`);
    if (v) utilisees.add(v.url);
    blocs.push({
      _type: "blocTexteMedia", _key: cle(),
      titre: s.titre,
      paragraphes: s.paragraphes ?? [],
      /* ⛔ Image OU vidéo, jamais les deux : c'est la règle du schéma, et
         c'est aussi le piège qui avait fait disparaître une vidéo en
         silence derrière une photo restée en place. */
      ...(v
        ? { videoUrl: v.url, videoTitre: v.titre, ...(v.vignetteUrl ? { videoAffiche: v.vignetteUrl } : {}) }
        : s.image ? { image: s.image } : {}),
      ...(s.galerie?.length ? { galerie: s.galerie } : {}),
    });
  }

  if (doc.faq?.length) {
    blocs.push({
      _type: "blocQuestions", _key: cle(),
      surTitre: "Les questions qu’on nous pose",
      questions: doc.faq.map(f => ({ _key: cle(), q: f.q, r: f.r })),
    });
  }

  blocs.push({
    _type: "blocProjets", _key: cle(),
    surTitre: "Déjà réalisé",
    titre: "Ce qu’on a produit sur ce savoir-faire",
  });

  await client.patch(doc._id).set({ blocs }).commit();

  const restantes = videos.filter(v => !utilisees.has(v.url));
  restantes.forEach(v => orphelines.push(`${slug} · ${v.titre ?? v.url}`));
  console.log(`✅ ${slug} : ${blocs.length} blocs (${doc.sections?.length ?? 0} sections reprises, ${doc.faq?.length ?? 0} questions)`);
}

console.log(`\n⭐ Les deux témoins sont passés aux blocs.`);
if (orphelines.length) {
  console.log(`\n⚠️ ${orphelines.length} vidéo(s) rattachées à la page mais NON PLACÉES — aucune phrase ne les nomme :`);
  for (const o of orphelines) console.log(`     ${o}`);
  console.log(`   Elles ne sont pas perdues : le champ « videos » de la page les garde.`);
}
