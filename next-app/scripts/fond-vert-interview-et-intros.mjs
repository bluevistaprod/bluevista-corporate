/**
 * DEUX EN-TÊTES REFUSÉES, ET LES TROIS DERNIÈRES INTRODUCTIONS — 20/08/2026.
 *
 * ⛔ « UNE IMAGE AVEC UN FOND VERT » N'EXISTE PAS DANS NOS FILMS, ET C'EST
 * LOGIQUE : un film livré montre le résultat, jamais la toile verte. Je l'ai
 * vérifié pour de bon plutôt qu'en regardant au jugé — les 138 affiches ont été
 * ramenées en 32×18 et j'ai compté les pixels réellement verts. Aucune
 * n'atteint 5 %, la plus « verte » est à 6,6 % et c'est du feuillage.
 * ⭐ La photo existe en revanche dans la MÉDIATHÈQUE de l'ancien site : un vrai
 * plateau, cyclo vert, mandarines, structure, et l'incrustation visible sur le
 * moniteur de retour au premier plan. 2048×1024, exactement une bande d'en-tête.
 *
 * ⭐ POUR L'INTERVIEW, la seule belle image SANS TEXTE INCRUSTÉ est celle de
 * NAOS. Les autres candidates (ISARA, l'autre NAOS) portent toutes un bandeau
 * de nom, parfois des sous-titres : sur une bande d'en-tête, le texte se fait
 * couper au recadrage, et surtout ça met le nom d'une personne réelle en grand
 * sur une page commerciale.
 * ⚠️ NAOS quitte donc le bloc « confort de l'intervenant » du fond vert. Ce
 * bloc reçoit l'image GHI — un homme détendu sur un banc détouré : elle dit à
 * la fois l'aisance devant la caméra et l'incrustation.
 *
 * ⭐ LES TROIS INTRODUCTIONS restantes passent à la voix du site. Comme pour
 * l'aftermovie et le drone : elles posent le cadre et NE REDISENT PAS les blocs
 * ni les cas d'usage listés plus bas.
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
let n = 0;
const para = t => ({
  _type: "block", _key: `i${++n}`, style: "normal", markDefs: [],
  children: [{ _type: "span", _key: `s${n}`, text: t, marks: [] }],
});

/* ── 1. La photo de plateau, récupérée sur l'ancien site et téléversée ────
   ⛔ ON NE POINTE PAS VERS bluevistaprod.com : le jour où l'ancien site
   s'éteint, l'en-tête disparaîtrait. L'image devient la nôtre. */
const SOURCE = "https://www.bluevistaprod.com/wp-content/uploads/2023/05/Capture_From_Facebook-1.png";
const rep = await fetch(SOURCE);
if (!rep.ok) throw new Error(`photo de plateau introuvable (HTTP ${rep.status})`);
const asset = await client.assets.upload("image", Buffer.from(await rep.arrayBuffer()), {
  filename: "plateau-fond-vert-bluevista.png",
});
console.log(`✅ photo de plateau téléversée (${asset.metadata?.dimensions?.width}×${asset.metadata?.dimensions?.height})`);

const NAOS = "image-aa5b1796c8b99271b97ead15931d95a987343480-1920x1080-jpg"; // interview propre, sans incrustation
const GHI  = "image-664f0cc4cd892de6999871b785602552d6e2e1ff-1920x1080-jpg"; // l'homme détendu sur son banc détouré

/* ── 2. Les textes ───────────────────────────────────────────────────────── */
const INTROS = {
  "page-savoir-faire-studio-fond-vert-compositing": [
    /* ⚠️ L'ancien texte listait le matériel sans ponctuation (« Toile de fond
       vert Eclairage Caméra 4K Micro cravate HF Prompteur ») et annonçait
       qu'on allait « tricher la réalité ». On garde le fond, on change tout. */
    "Le fond vert sert à une chose : filmer quelqu’un ou quelque chose une seule fois, et décider ensuite de ce qu’il y a derrière. L’arrière-plan se choisit au montage, se change sans refaire une prise, et se décline autant de fois qu’il y a de versions à livrer.",
    "Notre studio est mobile. Le fond, les éclairages, la caméra 4K, les micros-cravates et le télésouffleur tiennent dans un véhicule : on monte le plateau dans vos locaux, un matin, et vos intervenants n’ont pas une journée de déplacement à poser.",
    "L’incrustation ne rattrape pas un mauvais tournage : elle exige un fond éclairé à plat, une distance suffisante entre le sujet et la toile, et une lumière sur le sujet cohérente avec le décor qu’on lui donnera. Ces trois points se règlent au tournage, jamais après.",
    "Et le décor qu’on ajoute n’a pas besoin d’exister. Un atelier, une salle, un plateau de marque, un environnement 3D : c’est le même travail de compositing, et c’est souvent moins cher que de trouver le lieu réel et d’y emmener une équipe.",
  ],

  "page-savoir-faire-video-corporate-film-dentreprise": [
    /* ⚠️ L'ancien texte portait quatre points d'exclamation, « le piment qui
       fera la différence » et deux invitations à aller voir les réseaux
       sociaux — sur une page qui doit, elle, retenir le lecteur. */
    "Un film d’entreprise ne se juge pas à ce qu’il montre mais à ce qu’il obtient : convaincre un client qui hésite, rassurer un investisseur, donner envie à un candidat, ou remettre des équipes d’accord sur ce qu’elles font. Ces quatre films ne se ressemblent pas, et c’est la première question qu’on vous pose.",
    "Ensuite seulement viennent les moyens : combien de jours de tournage, qui parle, ce qui se filme sur site et ce qui se fabrique en animation. Un film qui a répondu à la première question supporte un petit budget ; l’inverse n’est pas vrai.",
    "Tout se fabrique ici — écriture, tournage, prise de son, montage, étalonnage, animation graphique, sous-titres. Rien n’attend un prestataire extérieur, ce qui change surtout les délais de correction : une modification demandée le matin se voit l’après-midi.",
    "Depuis 2004, à Lyon, à Paris et à Genève, plus de 2 000 projets sont passés par ces étapes-là.",
  ],

  "page-savoir-faire-motion-design": [
    /* ⚠️ L'ancien texte disait « le fruit de nos idées » là où il fallait lire
       « les vôtres », et tournait trois paragraphes autour du mot « beau »
       sans jamais dire à quoi le motion design sert. */
    "Le motion design sert à montrer ce qui n’a pas d’image : un service, un flux, un principe, une organisation. Là où la caméra n’a rien à filmer, on fabrique l’image — et on la fabrique dans l’ordre où l’œil doit la lire.",
    "C’est un travail de hiérarchie autant que de graphisme. Un chiffre qui apparaît au bon moment se retient ; le même chiffre affiché d’emblée avec six autres ne se lit pas. Ce qui entre en premier, ce qui reste à l’écran, ce qui disparaît : ces décisions-là valent plus que le style choisi.",
    "Le style, lui, part de chez vous. Vos couleurs, vos typographies, la façon dont vos titres entrent et dont vos transitions s’enchaînent : la charte devient un système animé, réutilisable sur les films suivants sans repartir de zéro.",
    "Et tout n’a pas besoin d’être animé de bout en bout. Beaucoup de projets demandent des images réelles auxquelles on ajoute titrages, schémas et transitions — c’est plus rapide, souvent plus juste, et ça se décide au moment du devis.",
  ],
};

/* ── 3. On applique ──────────────────────────────────────────────────────── */
for (const [id, textes] of Object.entries(INTROS)) {
  /* ⛔ Un patch par champ : Giz édite les mêmes pages dans Sanity. */
  await client.patch(id).set({ texte: textes.map(para) }).commit();
  console.log(`✅ ${id.replace("page-savoir-faire-", "")} : introduction réécrite (${textes.length} paragraphes)`);
}

/* Fond vert : la photo de plateau en en-tête, GHI sur le bloc « intervenant ». */
{
  const id = "page-savoir-faire-studio-fond-vert-compositing";
  const d = await client.fetch(`*[_id==$i][0]{blocs}`, { i: id });
  await client.patch(id).set({
    image: img(asset._id),
    blocs: d.blocs.map(b =>
      b.titre === "Le confort de l’intervenant décide de la qualité" ? { ...b, image: img(GHI) } : b
    ),
  }).commit();
  console.log("✅ fond vert : en-tête = le plateau, vrai fond vert éclairé ; bloc « intervenant » = GHI");
}

/* Film d'entreprise : l'interview NAOS en en-tête. */
await client.patch("page-savoir-faire-video-corporate-film-dentreprise").set({ image: img(NAOS) }).commit();
console.log("✅ film d’entreprise : en-tête = l’interview NAOS, sans texte incrusté");
