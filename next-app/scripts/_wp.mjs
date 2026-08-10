/**
 * Accès en écriture à l'ancien site WordPress.
 * ⚠️ Les identifiants vivent dans ~/.mcp-secrets.json — jamais dans le dépôt.
 */
import fs from "node:fs";
const s = JSON.parse(fs.readFileSync(process.env.HOME + "/.mcp-secrets.json", "utf8"));
const trouve = (o, k) =>
  o[k] ?? Object.values(o).filter(v => v && typeof v === "object").map(v => trouve(v, k)).find(Boolean);
export const BASE = trouve(s, "WP_BASE_URL").replace(/\/$/, "");
const auth = "Basic " + Buffer.from(`${trouve(s, "WP_USER")}:${trouve(s, "WP_APP_PASSWORD")}`).toString("base64");
export const wp = async (chemin, opts = {}) => {
  const r = await fetch(`${BASE}/wp-json/wp/v2${chemin}`, {
    ...opts,
    headers: { Authorization: auth, "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 200)}`);
  return j;
};
