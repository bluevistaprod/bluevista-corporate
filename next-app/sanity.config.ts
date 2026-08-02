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
    /**
     * ⭐ LES CINQ VERSIONS — et c'est une CORRECTION du modèle initial.
     *
     * Première version : trois langues (fr/en/es) plus un champ `marches`
     * cochable France/Suisse sur le même document. Défaut relevé par Giz —
     * « on peut avoir les textes FR et CH accessibles pour séparer si
     * besoin ? » — un document coché « France + Suisse » porte UN SEUL
     * texte. Or la Suisse doit avoir « un langage différent ». Le modèle
     * permettait de diffuser sur deux marchés, pas d'y dire deux choses.
     *
     * 👉 Le marché est donc traité COMME une langue. Chaque version est un
     * document distinct, avec son texte, son adresse, et son existence
     * propre. Une réalisation qu'on ne montre pas en Suisse n'a simplement
     * pas de version fr-CH — ce qui répond du même coup à « on ne montre
     * pas TOUS les projets ».
     *
     * ⚠️ CE QUE ÇA COÛTE, et il faut le savoir : un projet montré à
     * l'identique des deux côtés doit être dupliqué, et une correction se
     * fait alors deux fois. C'est le prix d'un modèle à un seul mécanisme.
     * L'alternative — deux mécanismes qui cohabitent — coûte plus cher : on
     * ne sait jamais lequel s'applique.
     */
    documentInternationalization({
      /* ⛔ CÔTÉ STUDIO on nomme les deux SITES, côté visiteur jamais.
         L'éditeur doit savoir sur quel domaine il publie — c'est même
         l'information la plus importante quand on gère deux sites qui ne
         se renvoient pas l'un vers l'autre. Le visiteur, lui, ne voit
         qu'un sélecteur de langues, sans mention de pays : bluevistaprod
         et bluevista.ch sont deux sites parallèles, pas deux versions
         d'un même site. */
      supportedLanguages: [
        { id: "fr", title: "bluevistaprod.com — Français" },
        { id: "en", title: "bluevistaprod.com — English" },
        { id: "es", title: "bluevistaprod.com — Español" },
        { id: "fr-ch", title: "bluevista.ch — Français" },
        { id: "en-ch", title: "bluevista.ch — English" },
      ],
      schemaTypes: ["realisation", "page"],
    }),
    // Console de requêtes — elle me sert à auditer le contenu en une ligne.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: [realisation, page] },
});
