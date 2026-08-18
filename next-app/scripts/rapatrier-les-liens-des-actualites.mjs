/**
 * LES LIENS INTERNES DES ACTUALITÉS, RAMENÉS SUR LE NOUVEAU SITE.
 *
 * ⛔⛔ LE DÉFAUT QUE ÇA CORRIGE, ET IL EST GRAVE.
 * Les articles de l'ancien site se citent entre eux en adresses ABSOLUES :
 * `https://www.bluevistaprod.com/nos-competences/video-mapping/`. La reprise
 * mécanique les a fidèlement recopiées. Résultat : sur le nouveau site, ces
 * liens sortent du site — et le 4 septembre, quand le WordPress s'éteint, ils
 * tombent tous en même temps.
 *
 * 👉 C'est le pire genre de défaut : il ne se voit pas aujourd'hui, parce que
 * l'ancien site répond encore. Il se déclencherait le jour de la bascule, sur
 * toutes les actualités à la fois.
 *
 * ⭐ LA TRADUCTION SE FAIT PAR LE PLAN DE REDIRECTIONS, pas par une règle de
 * réécriture d'adresse. Une page de l'ancien site ne devient pas la même page
 * ailleurs : `/nos-competences/video-mapping/` devient
 * `/savoir-faire/video-mapping/`. Seul le plan sait ça, et il a été construit
 * puis vérifié pour ça.
 *
 * ⚠️ Un lien vers une adresse qui n'est PAS dans le plan est laissé tel quel
 * et signalé. Le réécrire au jugé recréerait le défaut qu'on répare.
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const RACINE = new URL("../../", import.meta.url).pathname;
const [entete, ...lignes] = readFileSync(RACINE + "PLAN-REDIRECTIONS-V2.csv", "utf8").trim().split("\n");
const cols = entete.split(";");
const CARTE = new Map();
for (const l of lignes) {
  const r = Object.fromEntries(l.split(";").map((v, i) => [cols[i], v]));
  if (r.site !== "fr") continue;
  /* Un 410 n'a pas de destination : on ne peut pas y envoyer un lecteur. */
  if (r.code === "410") continue;
  CARTE.set(r.ancienne_adresse, r.nouvelle_adresse);
}
console.log(`⭐ ${CARTE.size} adresses connues du plan.\n`);

const inconnues = new Map();

/** Une adresse de l'ancien site → son adresse sur le nouveau. */
function traduire(href) {
  const m = href.match(/^https?:\/\/(?:www\.)?bluevistaprod\.com(\/[^?#]*)/i);
  if (!m) return null;
  const chemin = m[1].endsWith("/") ? m[1] : m[1] + "/";
  const cible = CARTE.get(chemin);
  if (!cible) {
    inconnues.set(chemin, (inconnues.get(chemin) ?? 0) + 1);
    return null;
  }
  return cible;
}

/** Parcourt les markDefs de tous les textes enrichis du document. */
function reecrire(valeur, compteur) {
  if (Array.isArray(valeur)) return valeur.map(v => reecrire(v, compteur));
  if (valeur && typeof valeur === "object") {
    const sortie = {};
    for (const [k, v] of Object.entries(valeur)) {
      if (k === "markDefs" && Array.isArray(v)) {
        sortie[k] = v.map(d => {
          if (d._type !== "link" || !d.href) return d;
          const neuf = traduire(d.href);
          if (!neuf) return d;
          compteur.n++;
          return { ...d, href: neuf };
        });
      } else {
        sortie[k] = reecrire(v, compteur);
      }
    }
    return sortie;
  }
  return valeur;
}

const docs = await client.fetch(`*[_type == "actualite"]{_id, "slug": slug.current, chapo, blocs, projets}`);
let touchees = 0, total = 0;
for (const d of docs) {
  const compteur = { n: 0 };
  const patch = {
    chapo: reecrire(d.chapo, compteur),
    blocs: reecrire(d.blocs, compteur),
    ...(d.projets ? { projets: reecrire(d.projets, compteur) } : {}),
  };
  if (!compteur.n) continue;
  await client.patch(d._id).set(patch).commit();
  touchees++; total += compteur.n;
  console.log(`✅ ${d.slug} : ${compteur.n} lien(s) rapatrié(s)`);
}

console.log(`\n⭐ ${total} liens rapatriés sur ${touchees} actualités.`);
if (inconnues.size) {
  console.log(`\n⚠️ ${inconnues.size} adresse(s) de l'ancien site absentes du plan — laissées telles quelles :`);
  for (const [a, n] of [...inconnues].sort((x, y) => y[1] - x[1])) console.log(`     ${n}×  ${a}`);
}
