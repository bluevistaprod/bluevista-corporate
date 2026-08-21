/**
 * LE LECTEUR LIVID AUX COULEURS DE BLUEVISTA — 20/08/2026.
 * Demande de Giz : « aller sur toutes les vidéos LIVID de notre site internet
 * et dans les réglages du player, mettre notre bon bleu / enlever le logo LIVID ».
 *
 * ⭐ COMMENT L'APPEL A ÉTÉ TROUVÉ, parce que ça resservira. Aucun réglage de
 * lecteur n'existe dans l'interface de Livid : ni dans le compte, ni dans
 * « Share & Embed », ni dans « Advanced settings ». La configuration est
 * pourtant là — elle arrive avec les données de la page de lecture, pas par un
 * appel séparé. Elle se lit dans l'état du routeur de l'application :
 *     window.__TSR_ROUTER__.state.matches → loaderData → playerConfiguration
 * C'est ce qui a donné les noms de champs, puis les routes :
 *     GET/PUT /v1/player-configurations/<id>      → une vidéo
 *     PUT     /v1/player-configurations/bulk      → plusieurs
 *
 * ⭐⭐ ET L'ERREUR DE VALIDATION A DONNÉ LE RESTE. En envoyant `{}` sur `bulk`,
 * le serveur répond en NOMMANT les champs qu'il attend — `folderIds`,
 * `videoIds`, `playerConfigurationId`. Interroger la validation vaut mieux que
 * deviner : trois essais au hasard avaient échoué avant.
 *
 * ⚠️ `bulk` RECOPIE les réglages, il ne partage pas une configuration.
 * Chaque vidéo garde SON objet de configuration ; l'appel écrase ses valeurs
 * avec celles de la source. Conséquence à connaître : modifier la source plus
 * tard ne changera PAS les autres — il faudra relancer ce script.
 *
 * ⛔ CE QU'ON NE TOUCHE PAS : le filigrane. Giz, 19/08 : « éventuellement un
 * watermark logo bluevista ? (pas sûr de ça) ». Un « pas sûr » n'est pas un
 * oui, et les champs `customLogo*` restent donc à leur valeur par défaut.
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const COOKIE = JSON.parse(readFileSync(`${homedir()}/.mcp-secrets.json`, "utf8")).LIVID_COOKIE;

async function livid(chemin, methode = "GET", corps) {
  const r = await fetch("https://api.livid.com" + chemin, {
    method: methode,
    headers: {
      Accept: "application/json",
      Origin: "https://livid.com",
      Referer: "https://livid.com/",
      Cookie: COOKIE,
      ...(corps ? { "Content-Type": "application/json" } : {}),
    },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  if (r.status === 401 || r.status === 403) throw new Error("session Livid expirée");
  const t = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${t.slice(0, 160)}`);
  return t ? JSON.parse(t) : {};
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

/* ── 1. Les vidéos réellement utilisées par le site ──────────────────────
   Les quatre endroits où vivent des adresses, comme pour l'audit d'embed. */
const e = await sanity.fetch(`{
  "r": *[_type=="realisation" && defined(video)].video,
  "pl": *[_type=="page"].videos[].url,
  "pb": *[_type=="page"].blocs[defined(videoUrl)].videoUrl,
  "a": *[_type=="actualite"].blocs[].medias[defined(videoUrl)].videoUrl
}`);
const slugs = [...new Set(
  [...(e.r ?? []), ...(e.pl ?? []), ...(e.pb ?? []), ...(e.a ?? [])]
    .flat()
    .map(u => String(u ?? "").match(/livid\.com\/watch\/([\w-]+)/)?.[1])
    .filter(Boolean)
)];
console.log(`⭐ ${slugs.length} vidéos Livid utilisées sur le site.\n`);

/* ── 2. La configuration de référence ────────────────────────────────────
   ⚠️ On la RELIT avant de s'en servir : c'est elle qui sera recopiée partout,
   une valeur fausse ici se propagerait à 176 lecteurs. */
const BLEU = "#12607E";        // le bleu pétrole de la charte 2023
const BLEU_CLAIR = "#5BC8DE";  // l'accent, lisible sur une image sombre
const REFERENCE = "a03666da-9612-4283-8d8a-d86f38484aae";

await livid(`/v1/player-configurations/${REFERENCE}`, "PUT", {
  colorsPrimary: BLEU,
  colorsAccent: BLEU_CLAIR,
  controlsDefaultLogoEnabled: false,
});
const modele = await livid(`/v1/player-configurations/${REFERENCE}`);
if (modele.colorsPrimary?.toLowerCase() !== BLEU.toLowerCase() || modele.controlsDefaultLogoEnabled !== false) {
  throw new Error("la configuration de référence n'est pas dans l'état attendu — rien n'est propagé");
}
console.log(`✅ Référence : primaire ${modele.colorsPrimary}, accent ${modele.colorsAccent}, logo LIVID ${modele.controlsDefaultLogoEnabled}\n`);

/* ── 3. Les identifiants internes ────────────────────────────────────────
   `bulk` veut des uuid de vidéo, pas des slugs. */
const ids = [];
const perdus = [];
for (const s of slugs) {
  try {
    const v = await livid(`/v1/videos/slug/${encodeURIComponent(s)}`);
    ids.push(v.id);
  } catch { perdus.push(s); }
}
console.log(`⭐ ${ids.length} identifiants résolus${perdus.length ? `, ${perdus.length} introuvables` : ""}.`);

/* ── 4. L'application, par paquets ───────────────────────────────────────
   ⚠️ Par paquets de 50 : un appel à 176 identifiants n'a jamais été éprouvé,
   et un refus global ne dirait pas lequel pose problème. */
let faits = 0;
for (let i = 0; i < ids.length; i += 50) {
  const lot = ids.slice(i, i + 50);
  const r = await livid("/v1/player-configurations/bulk", "PUT", {
    folderIds: [],
    videoIds: lot,
    playerConfigurationId: REFERENCE,
  });
  faits += r.count ?? 0;
  console.log(`   paquet ${i / 50 + 1} : ${r.count ?? 0} lecteurs mis à jour`);
}

/* ── 5. Le contrôle, sur des vidéos prises au hasard ─────────────────────
   ⛔ On ne se fie pas au compteur renvoyé par l'écriture : on relit. */
console.log(`\n── contrôle sur 5 vidéos ──`);
let bons = 0;
for (const s of slugs.filter((_, i) => i % Math.max(1, Math.floor(slugs.length / 5)) === 0).slice(0, 5)) {
  const v = await livid(`/v1/videos/slug/${encodeURIComponent(s)}`);
  const p = v.playerConfiguration ?? {};
  const ok = p.colorsPrimary?.toLowerCase() === BLEU.toLowerCase() && p.controlsDefaultLogoEnabled === false;
  if (ok) bons++;
  console.log(`   ${ok ? "✅" : "⛔"} ${v.title?.slice(0, 42)}`);
}
console.log(`\n⭐ ${faits} lecteurs aux couleurs de Bluevista, ${bons}/5 vérifiés à la relecture.`);
if (perdus.length) console.log(`⚠️ introuvables : ${perdus.join(", ")}`);
