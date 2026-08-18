/**
 * LES BLOCS « USAGES » DU LOT 1 — fond vert, drone, aftermovie.
 *
 * ⛔⛔ LA PAGE FOND VERT N'EN A QUE QUATRE, ET C'EST UNE DÉCISION.
 * J'ai proposé deux fois une référence en déduisant le plateau du SUJET de la
 * fiche — une prise de parole, une série d'entretiens. Giz, deux fois :
 * « NAOS n'était pas sur fond vert », « ISARA idem ». Le plateau utilisé
 * N'EST PAS UNE DONNÉE du portfolio : seules 3 fiches sur 145 portent le
 * produit `fond-vert`, et rien d'autre ne le dit.
 * 👉 Décision de Giz : « option 2, je n'ai pas les refs suffisantes ».
 * Quatre situations vraies valent mieux que six dont deux mentent.
 *
 * ⭐ ET UN USAGE PEUT RENVOYER VERS UNE ACTUALITÉ — autorisé le 18/08. Un lien
 * utile vaut mieux qu'une case vide : l'actualité raconte, la réalisation
 * catalogue, mais le lecteur veut voir le projet.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const PLANS = {
  "studio-fond-vert-compositing": {
    titre: "Quatre situations où le plateau règle le problème",
    entrees: [
      ["Poser un produit dans un décor qui n’existe pas",
       "La machine est filmée sur le plateau, l’environnement se construit après. C’est ce qui permet de montrer un produit dans un contexte impossible à réserver.",
       "GF DS Family", "/realisations/gf-ds-family-video-corporate-3d-motion-design/"],
      ["Tenir une charte graphique au pixel près",
       "Sur fond vert, l’arrière-plan devient un espace de marque : couleurs, typographies, éléments animés, tout est décidé plutôt que subi.",
       "GF Customer Services", "/realisations/gf-customer-services-video-promotionnelle-3d/"],
      ["Incruster des comédiens dans une reconstitution",
       "Quand le lieu réel est dangereux, détruit ou inaccessible, on le reconstruit en 3D et on y place les acteurs filmés sur le plateau.",
       "BARPI — prévention", "/actualites/barpi-prevention-accidents/"],
      ["Produire vite, avec un budget qui tient",
       "Pas de repérage, pas de transport, pas de météo. Le plateau est le seul décor dont on connaît le coût à l’avance.",
       "Unicorn Team", "/realisations/bluevista-creative-unicorn-team/"],
    ],
  },

  "video-aerienne-drone": {
    titre: "Six situations où il faut prendre de la hauteur",
    entrees: [
      ["Montrer l’échelle d’un site industriel",
       "Une usine se comprend d’en haut, pas depuis le parking. L’aérien donne en dix secondes ce qu’un plan au sol met une minute à suggérer.",
       "SFS Enveloppe & structure", "/realisations/sfs-enveloppe-structure/"],
      ["Rendre lisible un dispositif installé en hauteur",
       "Une ligne de vie sur une toiture ne se photographie pas depuis le sol : on ne voit ni son tracé, ni ce à quoi elle est ancrée.",
       "SFS Ligne de vie", "/realisations/sfs-ligne-de-vie/"],
      ["Présenter un groupe implanté sur plusieurs sites",
       "L’aérien relie des lieux que rien ne relie visuellement, et donne une unité à ce qui est dispersé sur un territoire.",
       "IRISOLARIS", "/realisations/irisolaris-presentation-groupe-2024/"],
      ["Inspecter ce qu’on ne peut pas approcher",
       "Toiture, pylône, façade en hauteur : le drone filme sans nacelle ni échafaudage, et sans immobiliser le site.",
       "SFS Menuiserie industrie", "/realisations/sfs-menuiserie-industrie/"],
      ["Ouvrir un film sur un plan qui situe",
       "Le premier plan d’un film corporate décide de l’attention. Un aérien dit où l’on est avant qu’une voix l’explique.",
       "IRISOLARIS", "/realisations/irisolaris-presentation-groupe-2024/"],
      ["Capter un événement en extérieur",
       "Un rassemblement, une course, une inauguration : vus de haut, l’ampleur se voit au lieu de se raconter.",
       "Carré Sénart", "/realisations/tetro-carre-senart-show-drone/"],
    ],
  },

  "aftermovie-captation-evenementielle": {
    titre: "Six situations où l’événement doit continuer après",
    entrees: [
      ["Prolonger une convention d’entreprise",
       "Deux jours de séminaire tiennent en deux minutes, regardées par ceux qui n’y étaient pas — et par ceux qui y étaient.",
       "Koesio Convention 2024", "/realisations/koesio-convention-2024/"],
      ["Faire venir au prochain",
       "L’aftermovie d’une édition est l’argument de vente de la suivante. C’est le seul support qui montre l’ambiance au lieu de la promettre.",
       "E-XPERT Solutions 2023", "/realisations/e-xpert-solutions-aftermovie-ecd-2023/"],
      ["Livrer le soir même",
       "Un film validé le soir et publié le lendemain, pendant que l’envie est encore là. Trois semaines plus tard, l’événement est fini et l’envie avec.",
       "Guitare en Scène", "/actualites/guitare-en-scene-2023/"],
      ["Documenter une inauguration",
       "Le lieu, les discours, les réactions : ce qu’il reste quand les invités sont partis et que la décoration est démontée.",
       "Grand Hôtel-Dieu", "/realisations/tetro-grand-hotel-dieu-video-event/"],
      ["Suivre un client sur plusieurs années",
       "La même équipe, le même format, une série qui se compare d’une édition à l’autre — et un montage qui va plus vite chaque année.",
       "E-XPERT Solutions 2022", "/realisations/e-xpert-solutions-aftermovie-ecd-2022/"],
      ["Nourrir les réseaux pendant l’événement",
       "Des formats courts publiés en direct, pas trois semaines après. Le monteur est sur place, pas au bureau.",
       "IrisDays 2024", "/realisations/irisolaris-aftermovie-irisdays-2024/"],
    ],
  },
};

/* ⛔ Les cibles sont vérifiées, pas supposées : une réalisation ET une
   actualité peuvent être visées, mais elles doivent exister. */
for (const [slug, plan] of Object.entries(PLANS)) {
  const reals = plan.entrees.filter(e => e[3].startsWith("/realisations/")).map(e => e[3].replace(/^\/realisations\/|\/$/g, ""));
  const actus = plan.entrees.filter(e => e[3].startsWith("/actualites/")).map(e => e[3].replace(/^\/actualites\/|\/$/g, ""));
  const okR = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: reals });
  const okA = await client.fetch(`*[_type=="actualite" && language=="fr" && slug.current in $s].slug.current`, { s: actus });
  const manque = [...reals.filter(x => !okR.includes(x)), ...actus.filter(x => !okA.includes(x))];
  if (manque.length) { console.log(`⛔ ${slug} : cibles absentes ${manque.join(", ")}`); continue; }

  const doc = await client.fetch(`*[_type=="page" && language=="fr" && slug.current==$s][0]{_id, blocs}`, { s: slug });
  const usages = {
    _type: "blocUsages", _key: `usages-${slug}`,
    surTitre: "Où ça sert",
    titre: plan.titre,
    entrees: plan.entrees.map(([titre, texte, lienLibelle, lien], i) => ({ _key: `u${i}`, titre, texte, lienLibelle, lien })),
  };
  const blocs = (doc.blocs ?? []).filter(b => b._type !== "blocUsages");
  const i = blocs.findIndex(b => b._type === "blocQuestions");
  blocs.splice(i >= 0 ? i : blocs.length, 0, usages);
  await client.patch(doc._id).set({ blocs }).commit();
  console.log(`✅ ${slug} : ${plan.entrees.length} situations, ${blocs.length} blocs`);
}
