/**
 * PAGE FILM D'ENTREPRISE — DEUX RETOURS DE GIZ, 20/08/2026.
 *
 * ⛔ « CE QUI VOUS AMÈNE » ÉTAIT UNE DEVINETTE. Les trois points disaient :
 *     « Une vidéo de présentation ». / Personne n’a dit à qui. / Personne n’a
 *     dit pourquoi.
 * Lus à la suite, ils racontent une scène — un client qui commande sans savoir
 * pour qui. Lu SEUL, comme on lit trois puces en balayant une page, chacun est
 * incompréhensible : le premier n'est même pas une phrase, les deux autres
 * n'ont pas de sujet.
 * 👉 La règle vaut ici comme pour les mots-clés à l'écran : chaque point doit
 * tenir tout seul, sujet compris. On garde l'idée, on lui rend sa phrase.
 *
 * ⛔ LES RÉFÉRENCES : Equita et ARAVI sortent, sur demande de Giz. Les deux
 * sont des reportages de salon ou de saison sportive — de la captation
 * répétée, pas des films d'entreprise. Les remplaçants sont choisis sur ce que
 * la page dit elle-même vouloir montrer, dans ses propres cas d'usage :
 * « Accompagner un déménagement ou une ouverture » et « Valoriser un
 * savoir-faire de terrain ».
 *
 * ⚠️ Giz travaille sur cette page dans Sanity au moment où ce script tourne.
 * Vérifié avant écriture : aucun brouillon en cours. Et on ne patche QUE les
 * deux champs concernés.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ID = "page-savoir-faire-video-corporate-film-dentreprise";

/* ⛔ Garde-fou : si un brouillon est apparu entre-temps, on n'écrit pas. */
const brouillon = await client.fetch(`*[_id=="drafts.${ID}"][0]._id`);
if (brouillon) {
  console.log("⛔ Un brouillon est ouvert sur cette page — rien n'est écrit.");
  console.log("   Publie-le (ou dis-moi de forcer) et relance.");
  process.exit(0);
}

/**
 * LES TROIS SITUATIONS, CHACUNE LISIBLE SEULE.
 * Elles gardent le fond de l'ancienne version — on commande un film sans avoir
 * tranché son but — mais chacune nomme maintenant une situation reconnaissable.
 */
const AFFIRMATIONS = [
  "Une entreprise qu’il faut expliquer avant de pouvoir la vendre.",
  "Un savoir-faire qui ne se voit pas depuis l’extérieur.",
  "Autant de versions de l’entreprise que de gens qui la racontent.",
];

/**
 * LES SIX RÉFÉRENCES.
 * ⛔ Sortent : « ARAVI – Saison 2022 » (reportages d'une saison de course) et
 * « GL Events – Equita Dailynews 2023 » (une vidéo par jour de salon). Les deux
 * sont de la captation d'événement répétée : elles ont leur place ailleurs.
 * ⭐ Entrent : HDI et SGS, qui répondent mot pour mot à deux cas d'usage
 * listés plus bas sur la page.
 */
const PROJETS = [
  "bos-equipement-video-corporate",                        // conservé
  "hdi-demenagement-nouvelle-tour",                        // ⭐ « accompagner un déménagement »
  "deko-film-de-presentation",                             // conservé
  "sgs-protection-lab-reportage-video",                    // ⭐ « valoriser un savoir-faire de terrain »
  "dromis-equans-ineo-reportage-video",                    // conservé
  "e-xpert-solutions-atdefense-video-pub-fiction-humour",  // conservé
];

const doc = await client.fetch(`*[_id==$i][0]{blocs}`, { i: ID });
const blocs = doc.blocs.map(b =>
  b._type === "blocEntree" ? { ...b, affirmations: AFFIRMATIONS } : b
);

await client.patch(ID).set({ blocs, projetsChoisis: PROJETS }).commit();

console.log("✅ « Ce qui vous amène » : trois phrases qui tiennent seules");
for (const a of AFFIRMATIONS) console.log(`     • ${a}`);
console.log("\n✅ Références : ARAVI et Equita sortent, HDI et SGS entrent");
console.log(`
⚠️ À REGARDER : la vignette de SGS – Protection Lab est AUSSI l'image du bloc
   « Ce qu'on maîtrise de bout en bout », plus haut sur la même page. La même
   image apparaît donc deux fois. Si ça gêne, deux sorties : mettre le
   « SGS – Reportage Making of » sur le bloc, ou remplacer SGS par
   « Verizon Connect » dans les références — sa vignette porte en revanche une
   incrustation « Plus de 3000 salariés », un chiffre du client qu'on pourrait
   lire comme le nôtre.`);
