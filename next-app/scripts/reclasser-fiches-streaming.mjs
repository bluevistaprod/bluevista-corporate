/**
 * QUATRE FICHES CLASSÉES « STREAMING » QUI N'EN SONT PAS.
 *
 * ⛔⛔ LE FILTRE DU PORTFOLIO ANNONÇAIT CINQ PROJETS DE DIRECT — un seul en
 * était un. Le champ `produit` sert désormais de filtre public sur
 * /realisations/ : une fiche mal classée n'est plus une imprécision de rangement,
 * c'est une promesse fausse faite à un prospect qui clique sur « streaming ».
 *
 * ⭐ LE CLASSEMENT SE DÉDUIT DE L'INTRO, PAS DU TITRE :
 *   · BOS Equipement — « clip de présentation de la société » → corporate ;
 *   · ABB SNK « Solaire » — « film publicitaire en animation 3D » → produit ;
 *   · Waygoo — « motion design explicatif du concept » → motion-promo.
 * Les trois portaient aussi le métier « evenement », qui était faux pour
 * toutes les trois.
 *
 * ⛔⛔ LA QUATRIÈME N'EST PAS RECLASSÉE : C'EST UN DOUBLON.
 * `abb-snk-animation-3d-fiction-marine` et
 * `abb-bloc-jonction-snk-animation-3d-fiction-marine` portent LA MÊME VIDÉO
 * Livid (Y2DwDQrgsuvH), le même client et la même intro à quelques mots près.
 * La reclasser produirait deux fiches identiques dans le filtre « produit »
 * — on remplacerait une erreur visible par une erreur discrète.
 * 👉 Elle est signalée, pas touchée : supprimer une fiche est la décision de
 * Giz, pas la mienne.
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const CORRECTIONS = [
  ["bos-equipement-video-corporate", "corporate", "film", "« clip de présentation de la société »"],
  ["abb-snk-animation-3d-produit-solaire", "produit", "film", "« film publicitaire en animation 3D »"],
  ["waygoo-motion-design", "motion-promo", "film", "« motion design explicatif du concept »"],
];

for (const [slug, produit, metier, pourquoi] of CORRECTIONS) {
  const doc = await client.fetch(`*[_type=="realisation" && language=="fr" && slug.current==$s][0]{_id,produit,metier}`, { s: slug });
  if (!doc) { console.log(`⛔ ${slug} : absente`); continue; }
  await client.patch(doc._id).set({ produit, metier }).commit();
  console.log(`✅ ${slug}`);
  console.log(`   ${doc.produit}/${doc.metier} → ${produit}/${metier}   ${pourquoi}`);
}

console.log(`\n⚠️ NON TOUCHÉE — doublon à trancher :`);
console.log(`   abb-snk-animation-3d-fiction-marine`);
console.log(`   porte la même vidéo Livid que abb-bloc-jonction-snk-animation-3d-fiction-marine.`);
console.log(`\n⚠️ Deux autres doublons repérés au passage, même méthode (une vidéo, plusieurs fiches) :`);
console.log(`   · C'PRO vœux 2017 — deux fiches, même film`);
console.log(`   · Toky — TROIS fiches partagent la même vidéo de mapping`);
