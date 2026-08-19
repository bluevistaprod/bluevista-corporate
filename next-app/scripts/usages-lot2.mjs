/**
 * LES BLOCS « USAGES » DU LOT 2 — animation 3D, motion design, film d'entreprise.
 *
 * ⭐ CORRECTIONS DE GIZ INTÉGRÉES, et elles disent toutes la même chose :
 * un argument doit être vrai de LA référence citée, pas du savoir-faire en
 * général.
 *   · « SFS film corporate » écarté de la 3D — pas assez fort ; remplacé par
 *     le drone Elistair, entièrement en animation ;
 *   · l'argument « catalogue homogène » retiré — le catalogue Hitachi n'est
 *     pas vraiment en 3D, l'argument était donc faux là où il pointait ;
 *   · « habiller un site internet » reformulé — la vidéo CERA EXPLIQUE le
 *     site, elle ne le décore pas ;
 *   · « recruter » et American Vintage supprimés — cette vidéo n'a jamais
 *     servi au recrutement ;
 *   · ARAVI retiré du film d'entreprise : ce sont des reportages de course.
 *
 * ⭐ UN USAGE PEUT EMPRUNTER À UNE AUTRE CATÉGORIE. Giz : « autorise-toi à
 * reprendre des films déjà des autres catégories 3D ou motion, c'est pas grave
 * pour celle-ci ». Le classement sert le filtre du portfolio, pas la
 * démonstration d'un savoir-faire.
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
  "animation-3d": {
    titre: "Six situations où la caméra ne peut pas aller",
    entrees: [
      ["Montrer l’intérieur d’une machine",
       "Ce qu’aucune caméra ne peut cadrer : la coupe, le flux, la pièce en mouvement dans son logement.",
       "Hitachi Yutaki", "/realisations/hitachi-yutaki-video-produit-3d/"],
      ["Présenter un produit qui n’existe pas encore",
       "Le film est prêt avant le premier exemplaire. C’est ce qui permet d’annoncer un lancement au lieu de le suivre.",
       "ABB SNK — Industrie", "/realisations/abb-snk-animation-3d-publicitaire-industrie/"],
      ["Filmer un produit qu’on ne peut pas filmer en usage",
       "Un drone filaire en mission ne se tourne pas : autorisations, météo, échelle, et le câble devient invisible dès qu’on recule. La 3D le montre déployé, sa station au sol et sa liaison.",
       "Elistair — Drone Orion", "/realisations/elistair-drone-orion-video-produit-en-animation-3d/"],
      ["Mettre un produit industriel en situation de fiction",
       "Un bloc de jonction est une boîte grise. Placé en 3D dans une salle des machines de navire, il devient une scène — et l’usage se comprend sans notice.",
       "ABB SNK — « Marine »", "/realisations/abb-bloc-jonction-snk-animation-3d-fiction-marine/"],
      ["Rendre lisible un chantier de rénovation",
       "Les étapes se recouvrent, l’essentiel est caché, le résultat n’existe pas encore. La 3D montre l’ordre des opérations et l’état final.",
       "Grande Arche de la Défense", "/actualites/animation-3d-grande-arche-de-la-defense/"],
      ["Publier un produit sous tous ses angles",
       "Un rendu 3D se décline en photo, en boucle réseau, en visuel de salon, sans nouveau tournage ni nouveau devis.",
       "GFMS — We See Big", "/realisations/gfms-video-publicitaire-3d-we-see-big/"],
    ],
  },

  "motion-design": {
    titre: "Six situations où le sujet n’a pas de forme",
    entrees: [
      ["Expliquer un service qu’on ne peut pas filmer",
       "Un flux, un contrat, une plateforme : rien de tout ça n’a de forme. Le motion design lui en donne une.",
       "Cisco Video Platform", "/realisations/cisco-video-platform-animation-3d-motion-design/"],
      ["Faire passer une consigne de sécurité",
       "Un film de prévention est regardé debout, en début de poste. Il doit se comprendre sans son, puis se re-comprendre avec.",
       "MASE Rhône-Alpes", "/realisations/mase-rhone-alpes-motion-design/"],
      ["Expliquer ce que fait un site ou un outil en ligne",
       "Une plateforme se démontre mal par capture d’écran : on voit l’interface, pas le service. Le film raconte le parcours plutôt que de le dérouler.",
       "CERA — site internet", "/realisations/site-internet-cera-motion-design/"],
      ["Envoyer des vœux qu’on regarde jusqu’au bout",
       "Deux semaines de fenêtre, et tout le monde en même temps. Le seul film qu’on regarde parce qu’il est daté.",
       "UNIHA — vœux 2025", "/realisations/uniha-carte-de-v-ux-video-2025/"],
      ["Vendre un produit technique en une minute",
       "Les arguments clés, une démonstration d’usage, et c’est fini. Plus long, personne ne va au bout.",
       "MLT Super-Screw", "/realisations/mlt-super-screw-video-motion-design/"],
      ["Décliner une charte en système animé",
       "Vos couleurs et vos typographies deviennent des règles de mouvement, réutilisables sur les films suivants.",
       "Araymond ShARe", "/realisations/araymond-share-motion-design-site-internet/"],
    ],
  },

  "video-corporate-film-dentreprise": {
    titre: "Six situations où l’entreprise a besoin de se montrer",
    entrees: [
      ["Présenter l’entreprise à un nouveau client",
       "Le film qu’on envoie avant le rendez-vous, et qui évite d’expliquer deux fois la même chose.",
       "Verizon Connect", "/realisations/verizon-connect-video-de-presentation/"],
      ["Faire parler ceux qui font le travail",
       "Un dirigeant convainc, un opérateur prouve. Les deux ne disent pas la même chose et ne se remplacent pas.",
       "Dromis — EQUANS & INEO", "/realisations/dromis-equans-ineo-reportage-video/"],
      ["Accompagner un déménagement ou une ouverture",
       "Un lieu qui change se raconte avant, pendant et après. Filmé plus tard, il ne reste que l’après.",
       "HDI — nouvelle tour", "/realisations/hdi-demenagement-nouvelle-tour/"],
      ["Montrer un chantier qui dure des mois",
       "Des travaux changent trop lentement pour être filmés. Le timelapse compresse la durée et rend visible ce que personne n’a le temps de regarder.",
       "Time lapse — La CLEDA", "/realisations/time-lapse-la-cleda/"],
      ["Valoriser un savoir-faire de terrain",
       "Ce qui se passe sur le site, dans l’atelier, sur le sentier — là où l’entreprise est crédible parce qu’elle est à l’ouvrage.",
       "PNR Vercors", "/realisations/pnr-vercors-les-chemins-de-la-liberte-la-cabane-des-carteaux/"],
      ["Raconter l’histoire d’une entreprise",
       "Un anniversaire se joue dans les archives et dans la mémoire des gens qui étaient là — pas dans les moyens du présent.",
       "LPA — 50 ans", "/realisations/lpa-50ans-video-anniversaire/"],
    ],
  },
};

for (const [slug, plan] of Object.entries(PLANS)) {
  const reals = plan.entrees.filter(e => e[3].startsWith("/realisations/")).map(e => e[3].replace(/^\/realisations\/|\/$/g, ""));
  const actus = plan.entrees.filter(e => e[3].startsWith("/actualites/")).map(e => e[3].replace(/^\/actualites\/|\/$/g, ""));
  const okR = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: reals });
  const okA = await client.fetch(`*[_type=="actualite" && language=="fr" && slug.current in $s].slug.current`, { s: actus });
  const manque = [...reals.filter(x => !okR.includes(x)), ...actus.filter(x => !okA.includes(x))];
  if (manque.length) { console.log(`⛔ ${slug} : cibles absentes → ${manque.join(", ")}`); continue; }

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
