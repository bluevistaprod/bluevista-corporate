/**
 * LES SIX PROJETS DE LA PAGE ANIMATION 3D, et deux fiches remises à leur place.
 *
 * ⭐ SIX CLIENTS, SIX RAISONS DE FAIRE DE LA 3D — produit fermé, lancement,
 * fiction, engin non filmable, service immatériel, geste technique. C'est ce
 * qui distingue un portefeuille d'une liste : six fiches du même type
 * prouvent qu'on sait refaire, six usages différents prouvent qu'on sait
 * répondre.
 *
 * ⛔ DEKO ET SFS ÉTAIENT CLASSÉES « animation-3d » ET N'EN SONT PAS.
 * Leurs intros le disent mot pour mot : « vidéo de présentation – film
 * d'entreprise ». Elles occupaient deux des quatre places du filtre « 3D »
 * du portfolio, qui n'en comptait que quatre.
 * 👉 Le classement se lit dans l'INTRO, jamais dans le titre : « film
 * corporate GFMS Core » est un film de salon, « SFS - film corporate » est
 * un film d'entreprise. Le mot « corporate » dans un titre ne dit pas le
 * format.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const SIX = [
  ["hitachi-yutaki-video-produit-3d", "Une gamme de pompes à chaleur entièrement modélisée — le produit qu'on ne peut ni ouvrir ni transporter."],
  ["gfms-video-publicitaire-3d-we-see-big", "Le teaser d'un lancement de machines de précision, en rendu macro."],
  ["abb-bloc-jonction-snk-animation-3d-fiction-marine", "Un bloc de jonction mis en fiction dans une salle des machines de navire."],
  ["elistair-drone-orion-video-produit-en-animation-3d", "Un drone filaire en vol, impossible à tourner en conditions réelles."],
  ["arrow-abox-memo-animation-3d", "Un service, pas un objet : une application animée en 3D."],
  ["engie-home-services-video-tuto-thermostat-migo", "La 3D qui explique un geste — le tutoriel, et un client grand public."],
];

const slugs = SIX.map(x => x[0]);
const ok = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current in $s].slug.current`, { s: slugs });
const absents = slugs.filter(x => !ok.includes(x));
if (absents.length) { console.log(`⛔ absents : ${absents.join(", ")}`); process.exit(1); }

const page = await client.fetch(`*[_type=="page" && language=="fr" && slug.current=="animation-3d"][0]{_id}`);
await client.patch(page._id).set({ projetsChoisis: slugs }).commit();
console.log(`✅ animation-3d : ${slugs.length} projets choisis`);
for (const [s, quoi] of SIX) console.log(`   · ${s}\n     ${quoi}`);

/* ── Les deux fiches remises à leur place ────────────────────────────── */
const RECLASSE = [
  ["deko-film-de-presentation", "corporate", "film", "« vidéo de présentation – film d'entreprise DEKO »"],
  ["sfs-film-corporate", "corporate", "film", "« vidéo de présentation – film d'entreprise SFS Intec »"],
];
for (const [slug, produit, metier, pourquoi] of RECLASSE) {
  const d = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current==$s][0]{_id,produit,metier}`, { s: slug });
  if (!d) { console.log(`⛔ ${slug} : absente`); continue; }
  await client.patch(d._id).set({ produit, metier }).commit();
  console.log(`\n✅ ${slug}\n   ${d.produit}/${d.metier} → ${produit}/${metier}   ${pourquoi}`);
}

const n3d = await client.fetch(`count(*[_type=="realisation" && language=="fr" && produit=="animation-3d"])`);
console.log(`\n⚠️ Le filtre « animation 3D » du portfolio ne compte plus que ${n3d} fiche(s),`);
console.log(`   alors que 34 réalisations font de la 3D. Le classement reste à trancher.`);
