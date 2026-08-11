/**
 * LE JOURNAL DES FORMULAIRES — « qu'on ne loupe JAMAIS rien ». `[Giz, 11/08/2026]`
 *
 * ⛔⛔ LE PRINCIPE, ET IL COMMANDE TOUT LE RESTE : **une demande est écrite sur
 * le disque AVANT d'être envoyée à Podio.** Pas après, pas « en cas d'erreur ».
 * Avant. Parce que la seule chose qu'on ne peut pas rattraper, c'est ce dont on
 * n'a jamais gardé trace : si le serveur meurt entre la réception et l'écriture,
 * personne ne saura jamais qu'un prospect a écrit.
 *
 * Trois fichiers, trois rôles distincts :
 *
 *   · `journal-AAAA-MM.jsonl` — une ligne par événement. C'est la mémoire :
 *     elle répond à « est-ce qu'on a bien reçu la demande de M. Untel le 3 ? ».
 *   · `a-rejouer/<référence>.json` — la demande COMPLÈTE, quand Podio n'a pas
 *     voulu d'elle. C'est le filet : `scripts/rejouer-formulaires.mjs` la
 *     repousse plus tard, sans que le visiteur ait à réécrire.
 *   · `a-rejouer/traitees/` — où atterrissent celles qui sont finalement
 *     passées. On les DÉPLACE, on ne les supprime pas : une demande qui a
 *     échoué mérite qu'on puisse relire ce qui s'est passé.
 *
 * ⛔⛔ CE DOSSIER EST PLUS SENSIBLE QUE LE FICHIER DE SECRETS. Un secret se
 * révoque en deux minutes ; les noms, adresses e-mail, téléphones et messages
 * de vraies personnes qui vivent ici, non. C'est de la donnée personnelle au
 * sens du RGPD, et la politique de confidentialité en répond.
 * 👉 D'où le `mode: 0o700` à la création : lisible par le seul compte qui fait
 * tourner le site, pas par les autres comptes de la machine. Et jamais, sous
 * aucun prétexte, à l'intérieur de `public/` — tout ce qui y est posé est
 * servi publiquement.
 *
 * ⚠️ OÙ CES FICHIERS VIVENT, ET POURQUOI PAS DANS LE PROJET : par défaut dans
 * `../journal-formulaires`, donc à CÔTÉ du dossier du site. Sur Infomaniak, le
 * déploiement fait un `git pull` dans `~/sites/DOMAINE` et reconstruit :
 * tout ce qui vit à l'intérieur de ce dossier est exposé au ménage d'un
 * redéploiement, et pire, un fichier posé dans `public/` serait servi
 * publiquement. Un cran au-dessus, rien de tout ça.
 * 👉 Surchargeable par `JOURNAL_FORMULAIRES` si l'hébergement impose un chemin.
 */

import { appendFile, mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

if (typeof window !== "undefined") {
  throw new Error("src/lib/journal.ts est un module serveur : il écrit sur le disque.");
}

const RACINE =
  process.env.JOURNAL_FORMULAIRES || path.join(process.cwd(), "..", "journal-formulaires");

const A_REJOUER = path.join(RACINE, "a-rejouer");
const TRAITEES = path.join(A_REJOUER, "traitees");

export type Evenement = {
  reference: string;
  horodatage: string;
  etape: "recu" | "podio-ok" | "podio-echec" | "rejoue-ok" | "alerte-envoyee" | "alerte-echec";
  type?: string;
  marche?: string;
  email?: string;
  app?: number;
  itemId?: number;
  appItemId?: number;
  erreur?: string;
  tentatives?: number;
};

/**
 * Écrit une ligne dans le journal du mois.
 *
 * ⚠️ Format JSONL (une ligne = un objet JSON) et non un gros tableau JSON :
 * un tableau doit être relu et réécrit en entier à chaque ajout, donc peut être
 * corrompu par une écriture interrompue. Une ligne ajoutée en fin de fichier ne
 * peut abîmer que sa propre ligne — et `appendFile` sur une ligne courte est
 * atomique en pratique sur les systèmes de fichiers POSIX.
 */
export async function journaliser(e: Omit<Evenement, "horodatage">): Promise<void> {
  const ligne: Evenement = { ...e, horodatage: new Date().toISOString() };
  const mois = ligne.horodatage.slice(0, 7);
  await mkdir(RACINE, { recursive: true, mode: 0o700 });
  await appendFile(path.join(RACINE, `journal-${mois}.jsonl`), JSON.stringify(ligne) + "\n", "utf8");
}

/**
 * Met une demande de côté pour rejeu.
 *
 * ⛔ Écriture ATOMIQUE : on écrit dans un fichier temporaire puis on le renomme.
 * Sans ça, un rejeu lancé pendant l'écriture lirait un JSON tronqué et
 * conclurait que la demande est corrompue — c'est-à-dire perdue, exactement ce
 * que ce fichier existe pour empêcher. `rename` est atomique sur un même
 * système de fichiers.
 */
export async function mettreEnAttente(reference: string, demande: unknown): Promise<string> {
  await mkdir(A_REJOUER, { recursive: true, mode: 0o700 });
  const definitif = path.join(A_REJOUER, `${reference}.json`);
  const temporaire = `${definitif}.tmp`;
  await writeFile(temporaire, JSON.stringify(demande, null, 2), "utf8");
  await rename(temporaire, definitif);
  return definitif;
}

/** Les demandes en attente de rejeu, les plus anciennes d'abord. */
export async function enAttente(): Promise<{ reference: string; fichier: string; demande: unknown }[]> {
  let noms: string[];
  try {
    noms = await readdir(A_REJOUER);
  } catch {
    return []; // Le dossier n'existe pas encore : rien n'a jamais échoué.
  }
  const resultats = [];
  for (const nom of noms.filter(n => n.endsWith(".json")).sort()) {
    const fichier = path.join(A_REJOUER, nom);
    try {
      resultats.push({
        reference: nom.replace(/\.json$/, ""),
        fichier,
        demande: JSON.parse(await readFile(fichier, "utf8")),
      });
    } catch {
      // ⚠️ On SIGNALE un fichier illisible, on ne le saute pas en silence :
      // un fichier corrompu est une demande potentiellement perdue.
      console.error(`[journal] fichier en attente illisible, à regarder à la main : ${fichier}`);
    }
  }
  return resultats;
}

/** Déplace une demande rejouée avec succès — on archive, on ne supprime pas. */
export async function marquerTraitee(fichier: string): Promise<void> {
  await mkdir(TRAITEES, { recursive: true, mode: 0o700 });
  await rename(fichier, path.join(TRAITEES, path.basename(fichier)));
}

export const CHEMIN_JOURNAL = RACINE;
