import fs from "node:fs";
import path from "node:path";

/**
 * LA MAQUETTE DE TRAVAIL, SERVIE PAR LE SERVEUR DE RECETTE.
 *
 * ⚠️ Elle vit dans `public/`, mais le serveur de développement déjà lancé ne
 * reprend pas les fichiers ajoutés après son démarrage — d'où ce petit
 * gestionnaire de route, qui lit le fichier à chaque appel. Un redémarrage du
 * serveur aurait suffi, mais il tourne et n'est pas à moi.
 *
 * ⛔ À SUPPRIMER une fois la maquette validée et le gabarit codé : ce n'est pas
 * une page du site, c'est un brouillon qu'on regarde ensemble.
 */
export async function GET() {
  const f = path.join(process.cwd(), "public", "maquette-realite-virtuelle.html");
  return new Response(fs.readFileSync(f, "utf8"), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
