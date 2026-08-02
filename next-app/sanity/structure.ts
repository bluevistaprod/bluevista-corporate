import type { StructureResolver } from "sanity/structure";

/**
 * LE MENU DU STUDIO — et c'est ici que se joue la réponse à la question de
 * Giz : « à quel point c'est visuel de savoir sur quelle version du site
 * quelle page existe ».
 *
 * ⛔ SANITY NE DONNE PAS CETTE VUE NATIVEMENT. Il donne des listes de
 * documents. C'est ce fichier qui les découpe par marché, par langue et par
 * état — et c'est précisément parce que le Studio est une application qu'on
 * configure qu'on peut le faire. Aucun CMS hébergé « clés en main » ne le
 * permettrait sans contorsion.
 *
 * Trois entrées portent tout le travail quotidien :
 *   · 🇨🇭 Suisse — ce qui est publié là-bas, et RIEN d'autre ;
 *   · ⚠️ À relire — les fiches dont le classement a été déduit à l'import ;
 *   · 🕳 Sans image / sans cas — les trous, visibles sans avoir à chercher.
 *
 * 👉 Le principe : une liste qui ne sert qu'à contempler ne vaut rien. Chaque
 * entrée du menu doit répondre à une question qu'on se pose vraiment un
 * lundi matin.
 */
export const structure: StructureResolver = S =>
  S.list()
    .title("Bluevista")
    .items([
      // ── Les réalisations, découpées par ce qu'on en cherche ──────────
      S.listItem()
        .title("Réalisations")
        .child(
          S.list()
            .title("Réalisations")
            .items([
              S.listItem()
                .title("Toutes")
                .child(S.documentTypeList("realisation").title("Toutes les réalisations")),

              S.divider(),

              S.listItem()
                .title("🇫🇷 France")
                .child(
                  S.documentList()
                    .title("Publiées sur bluevistaprod.com")
                    .filter('_type == "realisation" && "fr" in marches')
                ),
              S.listItem()
                .title("🇨🇭 Suisse")
                .child(
                  S.documentList()
                    .title("Publiées sur bluevista.ch")
                    .filter('_type == "realisation" && "ch" in marches')
                ),

              S.divider(),

              S.listItem()
                .title("Communication & marketing")
                .child(
                  S.documentList().title("Communication & marketing")
                    .filter('_type == "realisation" && metier == "film"')
                ),
              S.listItem()
                .title("Événementiel")
                .child(
                  S.documentList().title("Événementiel")
                    .filter('_type == "realisation" && metier == "evenement"')
                ),
              S.listItem()
                .title("Immersion")
                .child(
                  S.documentList().title("Immersion")
                    .filter('_type == "realisation" && metier == "immersion"')
                ),
            ])
        ),

      // ── Les pages ────────────────────────────────────────────────────
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem().title("Toutes").child(S.documentTypeList("page").title("Toutes les pages")),
              S.divider(),
              S.listItem()
                .title("🇫🇷 France")
                .child(S.documentList().title("France").filter('_type == "page" && "fr" in marches')),
              S.listItem()
                .title("🇨🇭 Suisse")
                .child(S.documentList().title("Suisse").filter('_type == "page" && "ch" in marches')),
              S.divider(),
              S.listItem()
                .title("Savoir-faire")
                .child(S.documentList().title("Savoir-faire").filter('_type == "page" && genre == "savoir-faire"')),
              S.listItem()
                .title("Villes")
                .child(S.documentList().title("Villes").filter('_type == "page" && genre == "ville"')),
            ])
        ),

      S.divider(),

      /**
       * ── LES TROUS ──────────────────────────────────────────────────
       * ⭐ La partie la plus utile du menu, et celle qu'aucun CMS ne
       * propose de lui-même. Elle transforme « il faudrait relire les
       * fiches un jour » en une liste finie qu'on voit diminuer.
       */
      S.listItem()
        .title("⚠️ À relire")
        .child(
          S.list()
            .title("Ce qui demande une décision")
            .items([
              S.listItem()
                .title("Classement déduit à l’import")
                .child(
                  S.documentList()
                    .title("Métier et type déduits — à confirmer")
                    .filter('_type == "realisation" && aRelire == true')
                ),
              S.listItem()
                .title("Sans image")
                .child(
                  S.documentList()
                    .title("Réalisations sans visuel")
                    .filter('_type == "realisation" && !defined(image)')
                ),
              S.listItem()
                .title("Sans cas client")
                .child(
                  S.documentList()
                    .title("Le contexte et l’enjeu ne sont pas écrits")
                    .filter('_type == "realisation" && !defined(casEnjeu)')
                ),
              S.listItem()
                .title("Vidéo encore sur Vimeo")
                .child(
                  S.documentList()
                    .title("À repointer vers Livid")
                    .filter('_type == "realisation" && video match "*vimeo*"')
                ),
              S.listItem()
                .title("Sans titre pour Google")
                .child(
                  S.documentList()
                    .title("Le titre SEO n’est pas renseigné")
                    .filter('(_type == "realisation" || _type == "page") && !defined(titreSeo)')
                ),
            ])
        ),
    ]);
