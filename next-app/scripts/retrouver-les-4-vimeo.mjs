/**
 * LES QUATRE DERNIÈRES VIMEO DU SITE : LES RETROUVER SUR LIVID.
 *
 * ⛔ LA RECHERCHE PAR TITRE A DÉJÀ ÉCHOUÉ. « ARAVI Saison 2022 » n'existe pas
 * sous ce nom dans le catalogue ; onze films ARAVI oui, aucun « saison ». Le
 * titre côté site est le titre COMMERCIAL, celui côté Livid est le titre de
 * FICHIER — ils ne se ressemblent pas toujours.
 *
 * ⭐ LA DURÉE, ELLE, NE MENT PAS. C'est la méthode qui avait apparié 66 vidéos
 * sur 66 pour les actualités : on lit la durée réelle sur Vimeo, on descend
 * tout le catalogue Livid, et on ne garde que ce qui tombe à la seconde près.
 *
 * ⛔ CE SCRIPT N'ÉCRIT RIEN. Il propose des candidats avec leur écart de durée ;
 * l'appariement se décide en regardant, pas en faisant confiance au premier
 * résultat. Deux fois déjà, une déduction « qui tient » d'après le sujet s'est
 * révélée fausse (NAOS, ISARA) — la règle qui en est sortie tient toujours :
 * quand on déduit au lieu de constater, on se trompe.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const COOKIE = JSON.parse(readFileSync(`${homedir()}/.mcp-secrets.json`, "utf8")).LIVID_COOKIE;

async function livid(path) {
  const res = await fetch("https://api.livid.com" + path, {
    headers: {
      Accept: "application/json, text/plain, */*",
      Origin: "https://livid.com",
      Referer: "https://livid.com/",
      Cookie: COOKIE,
    },
  });
  if (!res.ok) throw new Error(`Livid HTTP ${res.status}`);
  return res.json();
}

/** Les quatre orphelines, avec ce que le site en dit. */
const ORPHELINES = [
  { ou: "actualité · film-de-presentation-produit", titre: "Film de présentation produit", url: "https://vimeo.com/273331886/c7183218b1" },
  { ou: "réalisation · aravi-saison-2022", titre: "ARAVI – Saison 2022", url: "https://vimeo.com/780309433" },
  { ou: "réalisation · hdi-demenagement-nouvelle-tour", titre: "HDI - Déménagement Nouvelle Tour", url: "https://vimeo.com/904477628" },
  { ou: "réalisation · icsi-briefing-debriefing-minute-d-arret", titre: "ICSI - BRIEFING / DEBRIEFING / MINUTE D’ARRET", url: "https://vimeo.com/834445747" },
];

/* ── 1. Ce que Vimeo dit de chacune ───────────────────────────────────────
   ⚠️ oEmbed refuse les vidéos non listées SANS le jeton de partage : l'URL
   doit être passée entière, jeton compris.
   ⛔ ET TROIS DES QUATRE RÉPONDENT 404 : ces films ont été SUPPRIMÉS de Vimeo.
   Le site actuel affiche donc un lecteur mort dessus, aujourd'hui. Il n'y a
   plus de durée à comparer — l'appariement devra passer par le dossier client,
   et se décider en regardant. */
console.log("── Ce que Vimeo dit ──────────────────────────────────────────\n");
for (const o of ORPHELINES) {
  try {
    const j = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(o.url)}`).then(r => r.json());
    o.duree = j.duration;
    o.titreVimeo = j.title;
    console.log(`   ${String(j.duration).padStart(5)}s  « ${j.title} »`);
    console.log(`          côté site : ${o.titre}`);
  } catch (e) {
    console.log(`   ⛔ ${o.titre} — Vimeo ne répond pas (${e.message})`);
  }
}

/* ── 2. Tout le catalogue Livid, dossier par dossier ──────────────────── */
console.log("\n── Descente du catalogue Livid ───────────────────────────────");
const dossiers = [{ id: null, nom: "(racine)" }];
{
  const file = [null];
  const vus = new Set();
  while (file.length) {
    const parent = file.shift();
    let cursor = null;
    do {
      const q = `?limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`;
      const j = await livid((parent ? `/v2/folders/${parent}` : "/v2/folders") + q);
      const cf = j.childFolders || j;
      for (const f of cf.folders || []) {
        if (vus.has(f.id)) continue;
        vus.add(f.id);
        dossiers.push({ id: f.id, nom: f.name });
        file.push(f.id);
      }
      cursor = cf.nextCursor || null;
    } while (cursor);
  }
}
console.log(`   ${dossiers.length} dossiers.`);

const catalogue = [];
for (const d of dossiers) {
  let cursor = null;
  do {
    const j = await livid(`/v1/videos/previews?limit=100${d.id ? `&folderId=${d.id}` : ""}` +
      (cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""));
    for (const v of j.videoPreviews || []) catalogue.push({ ...v, dossier: d.nom });
    cursor = j.nextCursor || null;
  } while (cursor);
}
/* Une même vidéo peut remonter deux fois (racine + dossier). */
const parId = new Map();
for (const v of catalogue) if (!parId.has(v.id)) parId.set(v.id, v);
const tout = [...parId.values()];
console.log(`   ${tout.length} vidéos au total.\n`);

/* ⚠️ Livid compte en SECONDES ou en MILLISECONDES selon le champ. On normalise
   au lieu de parier : une durée de 380 000 « secondes » se repère toute seule. */
const secondes = v => {
  /* ⛔ LA DURÉE N'EST PAS SUR LA VIDÉO, ELLE EST SUR SON FICHIER.
     `v.duration` n'existe pas — le champ est `currentVideoAsset.length`, EN
     SECONDES (vérifié contre une vidéo dont on connaissait la durée : 380 pour
     un film de 6:20). En lisant `duration`, tout le catalogue ressortait sans
     durée et l'appariement ne trouvait « aucun candidat » — un zéro qui
     ressemblait à une réponse alors que c'était une panne silencieuse. */
  const d = v.currentVideoAsset?.length ?? null;
  return d == null ? null : Math.round(d);
};
const mmss = s => s == null ? "?" : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/* ── 3. L'appariement, par la durée ───────────────────────────────────── */
for (const o of ORPHELINES) {
  console.log(`\n═══ ${o.titre}  (${mmss(o.duree)} — ${o.duree}s)`);
  console.log(`    ${o.ou}`);
  if (!o.duree) { console.log(`    ⛔ durée inconnue, appariement impossible`); continue; }

  const notes = tout
    .map(v => ({ v, s: secondes(v), ecart: Math.abs((secondes(v) ?? -9999) - o.duree) }))
    .filter(x => x.s != null && x.ecart <= 3)
    .sort((a, b) => a.ecart - b.ecart);

  if (!notes.length) {
    console.log(`    ⛔ AUCUNE vidéo Livid à ±3 secondes. Le film n'est pas dans le catalogue.`);
    /* On élargit une fois, pour dire si c'est « absent » ou « presque ». */
    const large = tout.map(v => ({ v, s: secondes(v), ecart: Math.abs((secondes(v) ?? -9999) - o.duree) }))
      .filter(x => x.s != null && x.ecart <= 15).sort((a, b) => a.ecart - b.ecart).slice(0, 3);
    for (const x of large) console.log(`       (à ${x.ecart}s : ${x.v.title} — ${x.v.slug})`);
    continue;
  }
  for (const x of notes.slice(0, 6))
    console.log(`    ${x.ecart === 0 ? "⭐" : "  "} ±${String(x.ecart).padStart(2)}s  ${mmss(x.s)}  [${(x.v.dossier ?? "").slice(0, 18).padEnd(18)}] ${x.v.title}\n              https://livid.com/watch/${x.v.slug}`);
}
