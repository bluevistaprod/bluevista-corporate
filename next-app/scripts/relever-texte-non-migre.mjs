import fs from "node:fs";
const e = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")).map(l=>[l.slice(0,l.indexOf("=")).trim(), l.slice(l.indexOf("=")+1).trim()]));
const q = async s => (await fetch(`https://${e.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(s)}`, {headers:{Authorization:`Bearer ${e.SANITY_TOKEN}`}}).then(r=>r.json())).result;
const norm = s => s.toLowerCase().replace(/[^a-zà-ÿ0-9 ]/g," ").replace(/\s+/g," ").trim();
const P = [["video-mapping","/nos-competences/video-mapping/"],["animation-3d","/nos-competences/animation-3d/"],["motion-design","/nos-competences/motion-design/"],["video-corporate-film-dentreprise","/nos-competences/video-corporate-film-dentreprise/"],["video-aerienne-drone","/nos-competences/video-aerienne-drone/"],["aftermovie-captation-evenementielle","/nos-competences/aftermovie-captation-evenementielle/"],["creation-immersive-realite-virtuelle","/nos-competences/creation-immersive-realite-virtuelle/"],["studio-fond-vert-compositing","/nos-competences/studio-fond-vert-compositing/"],["live-streaming-webtv","/nos-competences/live-streaming-webtv/"],["studio-animation-3d-lyon","/studio-animation-3d-lyon/"],["studio-animation-3d-paris","/studio-animation-3d-paris/"],["realisation-film-entreprise-lyon","/realisation-film-entreprise-lyon/"],["realisation-video-geneve","/realisation-video-geneve/"]];

const docs = await q(`*[_type=="page" && language=="fr" && genre in ["ville","savoir-faire"]]{"slug":slug.current,"t":pt::text(texte),"sec":sections[]{"p":pt::text(paragraphes)},"faq":faq[]{r}}`);
const S = Object.fromEntries(docs.map(d=>[d.slug,d]));

let out = `# ⛔ TEXTE EN LIGNE JAMAIS MIGRÉ — à trier avant la bascule

> Relevé le 10/08/2026 sur les pages en production. **114 paragraphes, ≈ 3 714 mots** présents
> sur bluevistaprod.com et absents de Sanity.
>
> ⛔ **Le WordPress disparaît à la bascule.** Sans ce fichier, ce texte est perdu — et c'est
> celui que Google classe aujourd'hui.
>
> ⚠️ **Ce ne sont PAS 3 714 mots à reprendre tels quels.** Il y a là du texte de valeur
> (descriptions de projets réels, réponses à de vraies questions), du remplissage à mots-clés,
> et des fautes. Chaque paragraphe demande un arbitrage : **garder · réécrire au registre ·
> abandonner**. Le tri est du travail éditorial, pas de la copie.
>
> 📌 Origine du défaut : l'import du 02/08 n'a repris que le PREMIER bloc de texte de chaque
> page. Personne ne s'en est aperçu parce que les pages avaient l'air remplies.
`;

for (const [slug, url] of P) {
  let paras = [];
  try {
    const h = await fetch("https://www.bluevistaprod.com" + url, {signal: AbortSignal.timeout(25000)}).then(r=>r.text());
    paras = [...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g," ").replace(/&rsquo;/g,"’").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&[a-z]+;/g," ").replace(/\s+/g," ").trim())
      .filter(p => p.split(" ").length > 15);
  } catch {}
  const d = S[slug] || {};
  const base = norm([d.t, ...(d.sec||[]).map(x=>x.p), ...(d.faq||[]).map(x=>x.r)].join(" "));
  const abs = paras.filter(p => { const m = norm(p).split(" ").slice(0,9).join(" "); return m.length > 25 && !base.includes(m); });
  if (!abs.length) continue;
  out += `\n---\n\n## ${slug} — ${abs.length} paragraphes, ${abs.reduce((a,p)=>a+p.split(" ").length,0)} mots\n\n`;
  out += "`https://www.bluevistaprod.com" + url + "`\n\n";
  abs.forEach((p,i) => { out += `**${i+1}.** ${p}\n\n`; });
}
fs.writeFileSync("../TEXTE-EN-LIGNE-NON-MIGRE.md", out);
console.log("✓ écrit —", out.split(/\s+/).length, "mots");
