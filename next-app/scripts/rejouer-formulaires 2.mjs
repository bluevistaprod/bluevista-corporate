#!/usr/bin/env node
/**
 * REJOUER LES DEMANDES QUE PODIO A REFUSÉES.
 *
 * Usage, depuis `next-app/` :
 *   node scripts/rejouer-formulaires.mjs            # aperçu : liste, n'écrit rien
 *   node scripts/rejouer-formulaires.mjs --envoyer  # rejoue pour de vrai
 *
 * ⛔⛔ APERÇU PAR DÉFAUT, ENVOI SUR DEMANDE EXPRESSE. Un script qui écrit dans
 * le CRM dès qu'on le lance finit par être lancé par accident — et ici chaque
 * envoi crée un item et déclenche des tâches assignées à de vraies personnes.
 * Même garde que `exclusions-partagees.js` côté Google Ads.
 *
 * ⭐ ET IL RELIT CE QU'IL A ÉCRIT. Le journal note l'item créé, et le script
 * l'annonce avec son numéro court. Un script ne doit jamais annoncer ce qu'il
 * a *demandé* : il annonce ce qu'il *observe* — la leçon du script d'exclusions
 * Google Ads, qui proclamait « 74 termes ajoutés » à l'infini.
 */

import { readFile, readdir, rename, mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = process.env.JOURNAL_FORMULAIRES || path.join(ICI, "..", "..", "journal-formulaires");
const A_REJOUER = path.join(RACINE, "a-rejouer");
const TRAITEES = path.join(A_REJOUER, "traitees");

const ENVOYER = process.argv.includes("--envoyer");
const URL_SITE = process.env.URL_SITE || "http://localhost:3333";

async function journaliser(entree) {
  const ligne = { ...entree, horodatage: new Date().toISOString() };
  await mkdir(RACINE, { recursive: true });
  await appendFile(
    path.join(RACINE, `journal-${ligne.horodatage.slice(0, 7)}.jsonl`),
    JSON.stringify(ligne) + "\n",
    "utf8",
  );
}

let noms = [];
try {
  noms = (await readdir(A_REJOUER)).filter(n => n.endsWith(".json")).sort();
} catch {
  console.log(`Aucun dossier ${A_REJOUER} — rien n'a jamais échoué. ✅`);
  process.exit(0);
}

if (noms.length === 0) {
  console.log("Aucune demande en attente. ✅");
  process.exit(0);
}

console.log(`${noms.length} demande(s) en attente dans ${A_REJOUER}\n`);

for (const nom of noms) {
  const fichier = path.join(A_REJOUER, nom);
  let demande;
  try {
    demande = JSON.parse(await readFile(fichier, "utf8"));
  } catch (e) {
    // ⚠️ On SIGNALE, on ne saute pas en silence : un fichier illisible est une
    // demande potentiellement perdue, c'est-à-dire exactement ce qu'on combat.
    console.error(`⛔ ${nom} — illisible, à ouvrir à la main : ${e.message}`);
    continue;
  }

  const qui = `${demande.nom ?? "?"} <${demande.email ?? "?"}> · ${demande.type}/${demande.marche}`;
  if (!ENVOYER) {
    console.log(`· ${nom}\n    ${qui}\n    motif d'origine : ${demande.motif ?? "inconnu"}`);
    continue;
  }

  // Le délai anti-robot du serveur porte sur le temps passé DEVANT le
  // formulaire : on renvoie une valeur plausible, la demande a bien été saisie
  // par un humain — c'est justement pour ça qu'elle est là.
  const corps = { ...demande, msDepuisAffichage: 30_000 };
  try {
    const res = await fetch(`${URL_SITE}/api/formulaire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    });
    const d = await res.json();
    if (res.ok && d.ok && !d.differe) {
      await mkdir(TRAITEES, { recursive: true });
      await rename(fichier, path.join(TRAITEES, nom));
      await journaliser({
        reference: demande.reference ?? nom.replace(/\.json$/, ""),
        etape: "rejoue-ok",
        type: demande.type,
        marche: demande.marche,
        email: demande.email,
        itemId: d.itemId,
        appItemId: d.reference,
      });
      console.log(`✅ ${qui} → item ${d.itemId} (n° court ${d.reference})`);
    } else {
      // `differe: true` = le serveur l'a de nouveau mise en attente : Podio est
      // encore indisponible. On ne déplace rien, on réessaiera plus tard.
      console.error(`⏳ ${qui} → toujours pas passé (${res.status}) : ${d.message ?? "mise en attente"}`);
    }
  } catch (e) {
    console.error(`⛔ ${qui} → ${URL_SITE} injoignable : ${e.message}`);
  }
}

if (!ENVOYER) {
  console.log(`\n👉 Aperçu seulement. Pour rejouer réellement :`);
  console.log(`   node scripts/rejouer-formulaires.mjs --envoyer`);
}
