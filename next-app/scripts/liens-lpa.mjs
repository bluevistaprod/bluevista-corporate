/**
 * LES DEUX LIENS DE LA RÉALISATION LPA — 22/08/2026, demande de Giz.
 *
 * ⛔ POURQUOI CE SCRIPT À PART, ET PAS LE SCRAPER. Le texte de LPA a été
 * ÉCRIT à la main, avec Giz, et validé à l'écran : c'est l'étalon des fiches
 * réalisation. `restituer-textes-realisations.mjs` l'écarte volontairement
 * (`INTOUCHABLES`), parce qu'y passer remplacerait ce texte par celui de
 * l'ancien site. Ce qui manquait n'était pas le texte, c'étaient les LIENS
 * que portait l'ancienne page — donc on ajoute exactement ça.
 *
 * ⚠️ L'ANCIENNE PAGE PORTAIT TROIS LIENS, ON N'EN POSE QUE DEUX. Le troisième
 * (« LPA » vers lpa.fr) est déjà sur la page, dans la colonne de faits :
 * « Voir le site de LPA ». Le reposer dans le texte ferait deux fois le même
 * lien à quelques centimètres — le défaut qu'on a justement corrigé sur cette
 * page il y a deux jours.
 *
 *   node scripts/liens-lpa.mjs [--ecrire]
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const ID = "realisation-lpa-50ans-video-anniversaire";
/* Le texte visé → la destination NEUVE (l'ancienne était /nos-competences/). */
const POSES = [
  ["animation 2D", "/savoir-faire/motion-design/"],
  ["3D", "/savoir-faire/animation-3d/"],
];

const doc = await client.getDocument(ID);
const detail = structuredClone(doc.detail);

/* On travaille sur le bloc qui contient la phrase, quel que soit son rang :
   se fier à l'index, c'est casser au premier paragraphe ajouté. */
const bloc = detail.find(b =>
  b.children?.some(c => c.text?.includes("Mêlant animation 2D et 3D"))
);
if (!bloc) throw new Error("phrase introuvable — le texte a changé, ne rien écrire");

const iSpan = bloc.children.findIndex(c => c.text?.includes("Mêlant animation 2D et 3D"));
const span = bloc.children[iSpan];

/* ⚠️ ON DÉCOUPE UNE SEULE FOIS, DE GAUCHE À DROITE. Poser les deux liens l'un
   après l'autre sur le même span, c'est chercher « 3D » dans un texte où
   « animation 2D » vient d'être extraite — les positions ne veulent plus rien
   dire. On balaie donc le texte une fois et on émet les morceaux au fil. */
const morceaux = [];
const markDefs = [...(bloc.markDefs || [])];
let reste = span.text;
let n = 0;
for (const [mot, href] of POSES) {
  const i = reste.indexOf(mot);
  if (i < 0) throw new Error(`« ${mot} » introuvable — ne rien écrire`);
  if (i > 0) morceaux.push({ _type: "span", _key: `lpa-t${++n}`, marks: [], text: reste.slice(0, i) });
  const k = `lpa-l${n}`;
  markDefs.push({ _key: k, _type: "link", href });
  morceaux.push({ _type: "span", _key: `lpa-s${n}`, marks: [k], text: mot });
  reste = reste.slice(i + mot.length);
}
if (reste) morceaux.push({ _type: "span", _key: `lpa-t${++n}`, marks: [], text: reste });

bloc.children = [...bloc.children.slice(0, iSpan), ...morceaux, ...bloc.children.slice(iSpan + 1)];
bloc.markDefs = markDefs;

console.log("  phrase reconstituée :");
bloc.children.forEach(c =>
  console.log(`   ${c.marks?.length ? "🔗" : "  "} ${JSON.stringify(c.text)}${c.marks?.length ? " → " + (markDefs.find(m => m._key === c.marks[0])?.href ?? c.marks[0]) : ""}`)
);

if (!process.argv.includes("--ecrire")) {
  console.log("\n  ⚠️ ESSAI À BLANC — relancer avec --ecrire");
  process.exit(0);
}
await client.patch(ID).set({ detail }).commit();
console.log("\n  ✅ ÉCRIT dans Sanity");
