/**
 * REGARDER UNE PAGE POUR DE VRAI — capture d'écran d'une section du site.
 *
 * ⛔⛔ POURQUOI CET OUTIL EXISTE. La règle est « on regarde le rendu avant de
 * livrer », et je ne la tenais pas : je lisais le HTML avec des filtres, ce
 * qui valide un texte mais ne montre RIEN de la mise en page. Toutes mes
 * pages ratées de cette semaine viennent de là. Il fallait une image.
 *
 * ⚠️ CE QUI NE MARCHE PAS, pour ne pas le refaire :
 *  • Chrome `--screenshot` ne capture que la zone visible et ne sait pas
 *    défiler. Agrandir la fenêtre à 9000 px ne sert à rien : un hero en
 *    100vh fait alors 9000 px de haut, et on ne photographie que lui.
 *  • Un cadre chargé depuis `file://` est d'une autre origine : impossible
 *    de lui demander de défiler.
 *
 * ⭐ CE QUI MARCHE : une page d'emballage servie par le site lui-même, donc
 * de MÊME ORIGINE, qui charge la page dans un cadre et la fait défiler
 * jusqu'au texte cherché. Elle doit vivre sous `/media/` — le seul chemin
 * que le `matcher` du middleware laisse passer sans réécriture.
 * ⛔ Et elle est SUPPRIMÉE à la fin : rien de tout ceci ne doit partir en
 * production, `public/` est publié tel quel.
 *
 *   node scripts/regarder.mjs "/actualites/mon-article/" "Un titre de bloc"
 */
import { writeFileSync, rmSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const [chemin = "/", ancre = ""] = process.argv.slice(2);
const PORT = process.env.PORT_SITE ?? "3333";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const EMBALLAGE = "public/media/_regarder.html";
const SORTIE = process.env.SORTIE ?? "capture.png";

writeFileSync(EMBALLAGE, `<style>html,body{margin:0;overflow:hidden}
iframe{width:1280px;height:1000px;border:0;display:block}</style>
<iframe id="f"></iframe><script>
const p=new URLSearchParams(location.search), f=document.getElementById('f');
f.onload=()=>{const d=f.contentWindow.document;
  /* le bandeau cookies masque le bas de l'écran : on refuse, c'est le choix
     le moins intrusif et ça libère la vue */
  d.querySelectorAll('button').forEach(b=>{if(/Refuser/i.test(b.textContent))b.click()});
  const t=p.get('t');
  if(t){const n=[...d.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim().startsWith(t));
    if(n)n.scrollIntoView({block:'center'}); else console.log('ancre introuvable');}
};
f.src=p.get('u')||'/';
</script>`);

try {
  const url = `http://localhost:${PORT}/media/_regarder.html?u=${encodeURIComponent(chemin)}&t=${encodeURIComponent(ancre)}`;
  execFileSync(CHROME, [
    "--headless", "--disable-gpu", "--hide-scrollbars",
    "--window-size=1280,1000", "--virtual-time-budget=15000",
    `--screenshot=${SORTIE}`, url,
  ], { stdio: "ignore" });
  console.log(`✅ ${SORTIE} — ${chemin}${ancre ? ` @ « ${ancre} »` : ""}`);
} finally {
  /* ⛔ Même si Chrome échoue : le fichier ne doit JAMAIS survivre dans public/. */
  rmSync(EMBALLAGE, { force: true });
}
