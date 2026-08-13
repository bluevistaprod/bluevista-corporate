/**
 * LIER LES PROJETS CITÉS DANS LE CORPS DES PAGES — 12/08/2026.
 *
 * ⛔ LE CONSTAT DE GIZ, en comparant l'ancienne page et la nouvelle : « il y a
 * des liens qui ont sauté vers les projets spécifiques (GF notamment)…
 * elle faisait article réel, pas gabarit sans âme ». L'ancien site liait dans
 * le texte : Vision Tour de Nikon, Cémoi, modélisations en 3D. Le nouveau
 * nomme les projets sans jamais y renvoyer.
 *
 * ⭐ Ça sert deux choses à la fois, et c'est rare : le lecteur qui veut voir
 * le projet cliquc, et le maillage interne — une page de savoir-faire qui se
 * positionne transmet son autorité aux réalisations qu'elle cite.
 *
 * ⛔⛔ CE SCRIPT NE LIE QUE CE QUI EST CERTAIN. Un nom de client qui renvoie à
 * PLUSIEURS réalisations n'est pas lié automatiquement : « Printemps » en a
 * deux, le mapping et l'aftermovie, et se tromper enverrait le lecteur sur le
 * mauvais projet. La table `CHOIX` tranche ces cas à la main, après lecture du
 * paragraphe — c'est le paragraphe qui dit lequel, pas le nom.
 *
 * ⚠️ CE QUE CE SCRIPT RÉVÈLE PLUS QU'IL NE CORRIGE : sur neuf pages, il n'y a
 * que DEUX liens à poser. Les textes du nouveau site ne nomment presque aucun
 * projet — là où l'ancien en citait à chaque bloc. Le vrai correctif est donc
 * dans l'ÉCRITURE, pas dans ce script. Il servira à nouveau à chaque page
 * réécrite.
 *
 * Usage :  node scripts/lier-les-projets-cites.mjs [--pour-de-vrai]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POUR_DE_VRAI = process.argv.includes("--pour-de-vrai");
const env = Object.fromEntries(
  fs.readFileSync(path.join(RACINE, ".env.local"), "utf8")
    .split("\n").filter(l => l.includes("=") && !l.trim().startsWith("#"))
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
 * ⛔ LES CAS AMBIGUS, TRANCHÉS À LA MAIN APRÈS LECTURE DU PARAGRAPHE.
 * « Printemps » a deux réalisations ; le paragraphe de la page vidéo mapping
 * parle du mapping de façade, donc c'est celle-là. Ce genre d'arbitrage ne
 * s'automatise pas : il se lit.
 */
const CHOIX = {
  "video-mapping": { PRINTEMPS: "printemps-video-mapping" },
};

const real = await groq('*[_type=="realisation"]{"slug":slug.current,titre,client}');
const pages = await groq('*[_type=="page" && genre=="savoir-faire" && count(sections)>0]{_id,"slug":slug.current,sections}');

/** Les réalisations qui correspondent à un nom cité. */
function candidates(nom) {
  const n = nom.toLowerCase();
  return real.filter(r => `${r.titre} ${r.client}`.toLowerCase().includes(n));
}

/* Les noms qu'on cherche : les clients du portfolio, plus longs que trois
   lettres, hors mots communs qui feraient des faux positifs. */
const COMMUNS = /^(vidéo|video|film|animation|motion|studio|la|le|les|un|une|nos|notre|bluevista)$/i;
const NOMS = [...new Set(real.map(r => (r.client ?? "").trim()).filter(c => c.length > 3 && !COMMUNS.test(c)))];

const mutations = [];
let poses = 0;
const ambigus = [];

for (const p of pages) {
  let touche = false;
  const sections = (p.sections ?? []).map(sec => {
    const paragraphes = (sec.paragraphes ?? []).map(bloc => {
      if (!bloc.children?.length) return bloc;
      const markDefs = [...(bloc.markDefs ?? [])];
      const children = bloc.children.map(sp => {
        if (!sp.text || sp.marks?.length) return sp;
        for (const nom of NOMS) {
          const re = new RegExp(`\\b${nom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
          if (!re.test(sp.text)) continue;
          const forcee = CHOIX[p.slug]?.[nom];
          const cands = candidates(nom);
          const cible = forcee ?? (cands.length === 1 ? cands[0].slug : null);
          if (!cible) { ambigus.push(`${p.slug} — « ${nom} » : ${cands.length} réalisations`); continue; }
          /* ⛔ ON DÉCOUPE LE SPAN — corrigé après avoir regardé la page.
             Une première version marquait le span ENTIER : le paragraphe
             complet sortait souligné en bleu. C'est laid, et c'est faux au
             sens du référencement — l'ancre d'un lien doit dire ce qu'il y a
             au bout. « Siparex » renvoie à Siparex ; un paragraphe de quarante
             mots ne renvoie à rien.
             On coupe donc en trois : avant, le nom, après. */
          const cle = `lien-${cible}`;
          if (!markDefs.some(m => m._key === cle)) {
            markDefs.push({ _type: "link", _key: cle, href: `/realisations/${cible}/` });
          }
          const pos = sp.text.search(re);
          const trouve = sp.text.slice(pos, pos + nom.length);
          touche = true; poses++;
          return [
            sp.text.slice(0, pos) && { ...sp, _key: `${sp._key ?? "s"}a`, text: sp.text.slice(0, pos) },
            { ...sp, _key: `${sp._key ?? "s"}b`, text: trouve, marks: [cle] },
            sp.text.slice(pos + nom.length) && { ...sp, _key: `${sp._key ?? "s"}c`, text: sp.text.slice(pos + nom.length) },
          ].filter(Boolean);
        }
        return sp;
      }).flat();
      return { ...bloc, markDefs, children };
    });
    return { ...sec, paragraphes };
  });
  if (touche) mutations.push({ patch: { id: p._id, set: { sections } } });
}

console.log(`\n${poses} lien(s) à poser sur ${mutations.length} page(s).`);
if (ambigus.length) {
  console.log(`\n⚠️ ${[...new Set(ambigus)].length} nom(s) cité(s) renvoyant à plusieurs réalisations — NON liés :`);
  for (const a of [...new Set(ambigus)]) console.log(`     ${a}`);
}
if (!POUR_DE_VRAI) { console.log("\n📋 Lecture seule. Relancer avec --pour-de-vrai.\n"); process.exit(0); }

const r = await fetch(`${API}/data/mutate/${env.NEXT_PUBLIC_SANITY_DATASET}`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SANITY_TOKEN}` },
  body: JSON.stringify({ mutations }),
});
const j = await r.json();
if (j.error) { console.error("\n⛔ échec :", JSON.stringify(j.error)); process.exit(1); }

const relu = await groq('*[_type=="page" && genre=="savoir-faire"]{"slug":slug.current,"liens":count(sections[].paragraphes[].markDefs[])}|order(slug asc)');
console.log("\n✅ liens dans le corps, relevé dans Sanity :");
for (const x of relu) if (x.liens) console.log(`   ${x.slug.padEnd(40)} ${x.liens}`);
console.log("\n⚠️ Le rendu se vérifie APRÈS l'expiration du cache de 60 s.\n");
