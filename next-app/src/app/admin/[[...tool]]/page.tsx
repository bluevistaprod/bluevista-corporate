/**
 * LA ROUTE DU STUDIO — /admin.
 *
 * `dynamic = "force-static"` n'est PAS utilisable ici : le studio est une
 * application interactive, elle doit être rendue côté client.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { configure } from "../../../../sanity/env";

export const dynamic = "force-dynamic";

export default function Studio() {
  if (!configure) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 620, margin: "12vh auto", padding: "0 24px", lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Le studio est prêt — il lui manque un projet</h1>
        <p style={{ opacity: 0.75 }}>
          Tout est écrit : les schémas, le menu par marché, les vues « à relire », l’import
          des 170 réalisations. Il manque un identifiant de projet Sanity — c’est le seul
          geste qui ne peut pas être fait à votre place, puisqu’il suppose de créer un compte.
        </p>
        <ol style={{ opacity: 0.75, marginTop: 20, paddingLeft: 20 }}>
          <li>Créer un projet gratuit sur sanity.io</li>
          <li>Coller son identifiant dans <code>.env.local</code></li>
          <li>Relancer — le studio s’ouvre ici même</li>
        </ol>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
