/**
 * LA PHOTO SEARCH CONSOLE AVANT LA BASCULE — 21/08/2026.
 *
 * ⛔⛔ POURQUOI ELLE EST URGENTE ET POURQUOI ELLE NE SE RATTRAPE PAS.
 * Search Console ne garde que SEIZE MOIS glissants. Le jour où l'ancien site
 * disparaît, ses adresses cessent d'accumuler des données et, mois après mois,
 * sortent de la fenêtre. Dans un an il sera impossible de dire ce que
 * `/nos-competences/live-streaming-webtv/` rapportait avant. Sans cette photo,
 * une baisse de trafic après la bascule ne serait imputable à rien : ni à la
 * refonte, ni aux redirections, ni à la saison.
 *
 * ⭐ CE QUE LA PHOTO SERT À FAIRE, concrètement :
 *   · savoir quoi protéger — 130 couples page × requête portent TOUT le
 *     trafic hors marque ; le reste des 409 pages ne rapporte rien.
 *   · savoir si la bascule a coûté — en rejouant la même requête dans trois
 *     mois, sur les mêmes dimensions.
 *   · savoir ce qui est de la MARQUE et ce qui est du référencement. Les deux
 *     ne réagissent pas pareil à une refonte, et les confondre ferait conclure
 *     n'importe quoi.
 *
 * ⚠️ LES SECRETS VIENNENT DU TROUSSEAU macOS, pas d'un fichier. `~/.mcp-secrets.json`
 * a été retiré le 20/08 — volontairement, pas perdu. `loadSecrets()` lit
 * l'élément `mcp-secrets` du trousseau et injecte dans process.env.
 *
 * ⚠️ LES DEUX PROPRIÉTÉS COMPTENT. `sc-domain:bluevistaprod.com` couvre http,
 * https, www ET le sous-domaine `en.` — c'est elle qui fait foi. `bluevista.ch`
 * est un site distinct, et le cloisonnement FR/CH est un chantier ouvert : il
 * faut son état d'avant pour juger après.
 *
 *   node photo-search-console/prendre-la-photo.mjs
 */
/* ⚠️ Chemin ABSOLU via le dossier personnel, pas un relatif. Un relatif
   dépend d'où vit ce dépôt ; le jour où on le déplace, le script casse pour
   une raison qui n'a rien à voir avec son travail. */
import { homedir } from "node:os";
const { loadSecrets } = await import(`file://${homedir()}/mcp-servers/shared/secrets.js`);
import { writeFileSync, mkdirSync } from "node:fs";

loadSecrets();

const DEBUT = "2025-04-21";
const FIN = "2026-08-17";           // ⚠️ 3 jours de recul : GSC n'est pas à jour du jour même
const DOSSIER = new URL(".", import.meta.url).pathname;

async function jeton() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GSC_CLIENT_ID,
      client_secret: process.env.GSC_CLIENT_SECRET,
      refresh_token: process.env.GSC_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const d = await r.json();
  if (!d.access_token) throw new Error("jeton refusé : " + JSON.stringify(d).slice(0, 200));
  return d.access_token;
}

async function interroger(token, site, dimensions, rowLimit = 25000) {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: DEBUT, endDate: FIN, dimensions, rowLimit }),
    }
  );
  const d = await r.json();
  if (!r.ok) throw new Error(`${site} ${dimensions}: ${JSON.stringify(d).slice(0, 200)}`);
  return d.rows ?? [];
}

const csv = (chemin, colonnes, lignes) => {
  const echapper = v => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  writeFileSync(
    chemin,
    [colonnes.join(","), ...lignes.map(l => colonnes.map(c => echapper(l[c])).join(","))].join("\n"),
    "utf8"
  );
};

const aplatir = (rows, dims) =>
  rows.map(r => {
    const o = {};
    dims.forEach((d, i) => (o[d] = r.keys[i]));
    o.clics = r.clicks;
    o.impressions = r.impressions;
    o.ctr = +(r.ctr * 100).toFixed(2);
    o.position = +r.position.toFixed(1);
    return o;
  });

const token = await jeton();
mkdirSync(DOSSIER, { recursive: true });

/* ── La propriété suisse, que la première passe n'avait pas prise ────────── */
for (const [site, prefixe] of [["sc-domain:bluevista.ch", "07-ch"]]) {
  for (const dims of [["date"], ["page"], ["query"], ["page", "query"]]) {
    const rows = aplatir(await interroger(token, site, dims), dims);
    rows.sort((a, b) => b.clics - a.clics || b.impressions - a.impressions);
    const nom = `${prefixe}-${dims.join("-x-")}.csv`;
    csv(DOSSIER + nom, [...dims, "clics", "impressions", "ctr", "position"], rows);
    const c = rows.reduce((n, l) => n + l.clics, 0);
    console.log(`  ${nom.padEnd(28)} ${String(rows.length).padStart(5)} lignes · ${c} clics`);
  }
}

console.log("\n⭐ Pour comparer après la bascule : relancer ce script en changeant DEBUT et FIN,");
console.log("   puis comparer 05-hors-marque-a-proteger.csv à son équivalent. C'est là que ça se voit.");
