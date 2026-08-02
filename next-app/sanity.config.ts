import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { structure } from "./sanity/structure";
import { realisation } from "./sanity/schemas/realisation";
import { page } from "./sanity/schemas/page";

/**
 * LE STUDIO BLUEVISTA — l'interface d'édition, servie par l'application
 * Next elle-même sur /admin. Un seul déploiement, un seul domaine, une seule
 * facture d'hébergement.
 *
 * ⭐ LE MULTILINGUE EST « UN DOCUMENT PAR LANGUE », relié par le plugin
 * ci-dessous. C'est le choix qui commande tout le reste, et il vient d'une
 * contrainte de Giz, pas d'une préférence technique : en Suisse « on ne
 * montre pas TOUS les projets ». Un modèle « un document, trois traductions
 * dans des champs » rend impossible qu'une page N'EXISTE PAS quelque part.
 *
 * Ce que Giz voit à l'écran : sur chaque document, un sélecteur qui montre
 * les langues existantes et propose de créer les manquantes. Il sait donc
 * immédiatement qu'une page est en FR et EN mais pas en ES.
 */
export default defineConfig({
  name: "bluevista",
  title: "Bluevista",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: [
        { id: "fr", title: "Français" },
        { id: "en", title: "English" },
        { id: "es", title: "Español" },
      ],
      schemaTypes: ["realisation", "page"],
    }),
    // Console de requêtes — elle me sert à auditer le contenu en une ligne.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: [realisation, page] },
});
