/**
 * ANCRER LES SIX PAGES DE SAVOIR-FAIRE SUR LEURS PROJETS — 12/08/2026.
 *
 * ⭐ LA MÉTHODE, VALIDÉE PAR GIZ SUR LA PAGE RÉALITÉ VIRTUELLE :
 * un média s'accroche à la PHRASE QUI LE NOMME. Une section qui ouvre sur
 * « Pour GF Machining Solutions… » peut porter la photo du showroom ; une
 * section qui explique une méthode ne porte rien. C'est ce que faisait
 * l'ancien site — cinq blocs, cinq sujets, cinq médias — et c'est ce qui
 * sépare un article d'un gabarit rempli.
 *
 * ⛔ CE QU'ON NE FAIT PLUS : distribuer les médias par position. Une première
 * version posait la vidéo Cémoi sur un paragraphe qui parle de la durée des
 * sessions. Verdict : « elles ne correspondent PAS DU TOUT au texte ».
 *
 * ⛔ ET LA RÈGLE QUI EN DÉCOULE, APPLIQUÉE ICI SANS EXCEPTION : quand je ne
 * peux pas justifier qu'un média illustre son texte, LA SECTION N'EN REÇOIT
 * PAS. Mieux vaut une section en pleine largeur qu'une image qui ment. Trois
 * sections restent donc volontairement sans média.
 *
 * ⚠️ LES TÉMOINS SONT ÉCARTÉS. `video-mapping` (97 clics) et
 * `live-streaming-webtv` (85) portent du trafic de SERVICE : leur texte fait
 * leur classement, et ils tiennent lieu de groupe témoin le 4 septembre. On
 * peut y AJOUTER, jamais y REMPLACER. → BASCULE-SEO.md § Réécrire ou conserver
 *
 * ⛔ AUCUN LIEN INVENTÉ. Les liens internes ne pointent que vers des
 * réalisations vérifiées une par une ; les liens sortants ne reprennent que
 * les `clientUrl` du portfolio. Valrhona, Crouzet, Festival de K, Carso et
 * C'PRO Eole n'ont ni l'un ni l'autre : ils sont NOMMÉS sans être liés.
 *
 * Usage :  node scripts/ancrer-les-savoir-faire.mjs [--pour-de-vrai]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");
const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03`;
const groq = async (q) => {
  const u = new URL(`${API}/data/query/${env.NEXT_PUBLIC_SANITY_DATASET}`);
  u.searchParams.set("query", q);
  const j = await (await fetch(u, { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } })).json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.result;
};

/**
 * LE PLAN, PAGE PAR PAGE.
 *   `ouverture` remplace le PREMIER paragraphe pour qu'il nomme le projet ;
 *   les paragraphes suivants sont conservés tels quels — ils sont au registre.
 *   `media` : "video:<extrait du titre>" ou "photo" (celle déjà en place),
 *             ou null quand la section n'a pas de projet.
 *   `liens`  : mot → adresse. Interne si la réalisation existe, sortante sinon.
 */
const PLAN = {
  "aftermovie-captation-evenementielle": {
    /* ⭐ Quatre projets pour trois sections : Giz a demandé d'en ajouter une
       quatrième plutôt que de laisser un projet de côté. */
    sections: [
      { media: "video:PRINTEMPS",
        ouverture: "Pour le Printemps, à Lyon, l’aftermovie du festival a été préparé avant l’ouverture : nous avons repéré le déroulé et identifié les trois ou quatre moments qui porteraient le film. Un aftermovie réussi ne se sauve pas au montage.",
        liens: { "Printemps": "/realisations/printemps-nouvelle-identite-reportage-video-evenement/" } },
      { media: "video:Festival de K",
        ouverture: "Sur le Festival de K, nous avons monté pendant que l’événement se déroulait : la vidéo a été diffusée en clôture, devant les participants." },
      { media: "video:Valrhona",
        ouverture: "Pour les 100 ans de Valrhona, avec CWT, la captation ne s’est pas arrêtée au film de l’événement : les interventions filmées en multicaméra sont devenues des replays, des extraits pour les réseaux et des supports internes." },
      { titre: "Un anniversaire d’entreprise se prépare comme un événement public",
        media: "video:Crouzet",
        ouverture: "Pour les 100 ans de Crouzet, avec LUDICO, l’enjeu n’était pas de filmer une soirée mais de raconter un siècle devant ceux qui le font aujourd’hui : archives, témoignages de collaborateurs et captation de la soirée dans un même film.",
        suite: ["Ce format demande de commencer bien avant le jour J — repérer les fonds d’archives, préparer les prises de parole, caler le montage sur le déroulé — et c’est ce qui le distingue d’un aftermovie classique."] },
    ],
  },
  "animation-3d": {
    sections: [
      { media: "video:DS Family",
        liens: { "GF Machining Solutions": "/realisations/gf-ds-family-video-corporate-3d-motion-design/" } },
      { media: "photo" }, { media: "photo" }, { media: "photo" },
    ],
    videosAGarder: ["DS Family"],
  },
  "motion-design": {
    sections: [
      { media: "video:Thermostat",
        ouverture: "Pour ENGIE Home Services, le tutoriel du thermostat MiGo explique en motion design ce qu’une notice ne fait pas passer : un chiffre qui apparaît au bon moment se retient, le même chiffre dans un tableau se saute.",
        liens: { "ENGIE Home Services": "/realisations/engie-home-services-video-tuto-thermostat-migo/" } },
      { media: "photo",
        ouverture: "Pour VEAMA, nous sommes partis de leur charte graphique pour en fabriquer la version animée : la façon dont les couleurs se succèdent, dont les titres entrent, dont les transitions s’enchaînent.",
        liens: { "VEAMA": "/realisations/veama-carte-de-voeux-2019/" } },
      { media: null },
    ],
    videosAGarder: ["Thermostat"],
  },
  "studio-fond-vert-compositing": {
    sections: [
      { media: "video:Customer Services",
        ouverture: "Pour GF Machining Solutions, l’offre Customer Services a été enregistrée sur notre fond vert mobile, monté sur place : le fond, les éclairages et la régie tiennent dans un véhicule.",
        liens: { "GF Machining Solutions": "/realisations/gf-customer-services-video-promotionnelle-3d/" } },
      { media: "photo",
        ouverture: "Pour Amplitude, la carte de vœux tournée sur fond vert a permis de changer d’arrière-plan après le tournage et de décliner la même prise en plusieurs versions — ce qu’un décor réel interdit.",
        liens: { "Amplitude": "/realisations/amplitude-carte-de-voeux-video-2018/" } },
      /* ⛔ Aucun média : cette section parle du confort de l'intervenant, aucun
         projet ne l'illustre, et la photo qui y était posée ne se justifie
         pas. Pleine largeur. */
      { media: null, retirerPhoto: true },
    ],
    videosAGarder: ["Customer Services"],
  },
  "video-aerienne-drone": {
    sections: [
      { media: "photo",
        ouverture: "Pour TETRO, le show de drones de Carré Sénart demandait une flotte doublée : nous volons avec trois types d’appareils, montés et réglés par nos équipes selon ce que le tournage demande.",
        liens: { "TETRO": "/realisations/tetro-carre-senart-show-drone/" } },
      { media: "video:Vercors",
        ouverture: "Dans le Parc naturel régional du Vercors, le drone donne l’échelle d’un massif que rien ne montre depuis le sol — c’est ce qu’il apporte aussi sur un site industriel ou un chantier." ,
        liens: { "Parc naturel régional du Vercors": "/realisations/pnr-vercors-les-chemins-de-la-liberte-la-cabane-des-carteaux/" } },
      { media: null, retirerPhoto: true },
      { media: "video:Eole",
        ouverture: "Pour C’PRO, le survol du parc Eole ne cherchait pas la belle image : en multipliant les prises de vue selon un plan de vol calculé, on reconstruit un modèle 3D mesurable du site." },
    ],
    videosAGarder: ["Vercors", "Eole"],
  },
  "video-corporate-film-dentreprise": {
    sections: [
      { media: "video:Carso",
        ouverture: "Pour Carso, le film a commencé par une décision, pas par un tournage : savoir ce qu’il devait produire — convaincre un client, rassurer un investisseur, recruter, ou aligner des équipes." },
      { media: "photo",
        ouverture: "Pour SGS, le reportage au Protection Lab a été tourné, monté, étalonné et sous-titré ici : écriture, tournage, prise de son, montage, animation graphique et mise en ligne, chaque étape se fait sous notre responsabilité.",
        liens: { "SGS": "/realisations/sgs-protection-lab-reportage-video/" } },
      { media: "photo",
        ouverture: "Pour Riso, la vidéo produit Comcolor a été livrée avec ses déclinaisons courtes, ses versions sous-titrées et les fichiers aux formats de chaque support — site, écran de salon, réseaux.",
        liens: { "Riso": "/realisations/riso-comcolor-video-produit/" } },
    ],
    videosAGarder: ["Carso"],
  },
};

/** Un bloc de texte enrichi, avec ses liens découpés au mot près. */
function bloc(cle, texte, liens = {}) {
  const marques = Object.entries(liens).filter(([mot]) => texte.includes(mot));
  const markDefs = marques.map(([mot, href], i) => ({ _type: "link", _key: `${cle}l${i}`, href }));
  const children = [];
  let reste = texte, i = 0;
  for (const [k, [mot]] of marques.entries()) {
    const pos = reste.indexOf(mot);
    if (pos < 0) continue;
    if (pos > 0) children.push({ _type: "span", _key: `${cle}s${i++}`, text: reste.slice(0, pos), marks: [] });
    children.push({ _type: "span", _key: `${cle}s${i++}`, text: mot, marks: [markDefs[k]._key] });
    reste = reste.slice(pos + mot.length);
  }
  if (reste) children.push({ _type: "span", _key: `${cle}s${i++}`, text: reste, marks: [] });
  return { _type: "block", _key: cle, style: "normal", markDefs, children };
}

const pages = await groq(`*[_type=="page" && genre=="savoir-faire" && slug.current in ${JSON.stringify(Object.keys(PLAN))}]{_id,"slug":slug.current,sections,videos}`);
const mutations = [];

for (const p of pages) {
  const plan = PLAN[p.slug];
  const sections = [];

  for (const [i, cfg] of plan.sections.entries()) {
    const src = p.sections[i];
    const base = src ?? { _type: "object", titre: cfg.titre, paragraphes: [] };
    const s = { ...base, _key: base._key ?? `sec${i}` };
    if (cfg.titre) s.titre = cfg.titre;

    /* L'ouverture remplace le premier paragraphe ; le reste est conservé —
       il est déjà au registre, le réécrire serait du travail pour rien. */
    const anciens = (src?.paragraphes ?? []).slice(1);
    const suite = cfg.suite ? cfg.suite.map((t, j) => bloc(`${s._key}x${j}`, t)) : anciens;
    s.paragraphes = cfg.ouverture
      ? [bloc(`${s._key}p0`, cfg.ouverture, cfg.liens ?? {}), ...suite]
      : (src?.paragraphes ?? []);

    /* ⛔ Le lien du premier paragraphe quand on garde le texte d'origine. */
    if (!cfg.ouverture && cfg.liens && s.paragraphes[0]) {
      const t = (s.paragraphes[0].children ?? []).map(c => c.text).join("");
      s.paragraphes = [bloc(`${s._key}p0`, t, cfg.liens), ...s.paragraphes.slice(1)];
    }

    /* ⛔ UNE SECTION NE PORTE QU'UN SEUL MÉDIA. Si elle reçoit une vidéo,
       sa photo doit partir — sinon le gabarit affiche l'image et la vidéo
       disparaît sans laisser de trace. Poser deux médias au même endroit,
       c'est en perdre un : erreur déjà commise ce matin. */
    if (cfg.media === null || cfg.retirerPhoto || cfg.media?.startsWith("video:")) delete s.image;
    sections.push(s);
  }

  /* Les vidéos gardées, dans l'ordre des sections qui les attendent. */
  const attendues = plan.sections.filter(c => c.media?.startsWith("video:")).map(c => c.media.slice(6));
  const videos = attendues
    .map(m => (p.videos ?? []).find(v => v.titre?.includes(m)))
    .filter(Boolean);

  mutations.push({ patch: { id: p._id, set: { sections, videos } } });
  console.log(`\n${p.slug}`);
  sections.forEach((s, i) => {
    const c = plan.sections[i];
    console.log(`   0${i + 1} ${s.titre.slice(0, 50).padEnd(50)} ${c.media === null ? "— pleine largeur" : c.media === "photo" ? "photo" : "vidéo " + c.media.slice(6)}`);
  });
  console.log(`   vidéos gardées : ${videos.map(v => v.titre).join(" · ") || "aucune"}`);
}

if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({ mutations }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

const relu = await groq('*[_type=="page" && genre=="savoir-faire"]{"slug":slug.current,"sections":count(sections),"photos":count(sections[defined(image)]),"videos":count(videos),"liens":count(sections[].paragraphes[].markDefs[])}|order(slug asc)');
console.log("\n✅ relu dans Sanity :");
for (const x of relu) console.log(`   ${x.slug.padEnd(40)} ${x.sections} sections · ${x.photos} photos · ${x.videos} vidéos · ${x.liens} liens`);
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
