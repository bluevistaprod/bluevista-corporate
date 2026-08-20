import { defineField, defineType } from "sanity";

/**
 * UNE PAGE ÉDITABLE — accueil, agence, contact, savoir-faire, ville.
 *
 * ⛔ LA LIGNE DE PARTAGE, ET C'EST LE CHOIX LE PLUS STRUCTURANT DU MODÈLE.
 *
 * Ce schéma expose des CHAMPS NOMMÉS, pas des blocs libres. Giz change un
 * titre, un chapô, une image — il ne peut pas déplacer une section ni en
 * inventer une. C'est délibéré : rendre la mise en page éditable donne
 * l'illusion de la liberté et produit des pages cassées. C'est exactement
 * ce qu'Elementor a fait à l'ancien site.
 *
 * L'architecture, l'ordre des sections, la méthode en cercle : ça reste dans
 * le code. Ce n'est pas du contenu, c'est de la conception.
 *
 * 📌 Un seul type pour toutes les pages, distinguées par `genre`. Cinq types
 * séparés auraient divergé à la première correction — c'est ce qui est arrivé
 * entre la V6 et la V7 sur le logo du pied de page.
 */
const NOM_VERSION: Record<string, string> = {
  fr: "🇫🇷 FR", en: "🇫🇷 EN", es: "🇫🇷 ES", "fr-ch": "🇨🇭 FR", "en-ch": "🇨🇭 EN",
};

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "contenu", title: "Contenu", default: true },
    { name: "sections", title: "Sections de fond" },
    { name: "seo", title: "Référencement" },
  ],
  fields: [
    defineField({
      name: "genre",
      title: "Type de page",
      type: "string",
      group: "contenu",
      options: {
        list: [
          { title: "Accueil", value: "accueil" },
          { title: "Métier", value: "metier" },
          { title: "Savoir-faire", value: "savoir-faire" },
          { title: "Ville", value: "ville" },
          { title: "Agence", value: "agence" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: r => r.required(),
      readOnly: ({ document }) => Boolean(document?._createdAt),
      description: "Se choisit à la création et ne change plus : le gabarit en dépend.",
    }),
    defineField({
      name: "titre",
      title: "Titre principal",
      type: "string",
      group: "contenu",
      validation: r => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Adresse",
      type: "slug",
      group: "contenu",
      options: { source: "titre", maxLength: 70 },
      description:
        "⛔ Sur les pages qui ont du trafic — vidéo mapping, studio 3D Lyon — ne jamais changer sans redirection. Ces adresses valent des centaines de visites par an.",
    }),
    defineField({
      name: "surTitre",
      title: "Sur-titre",
      type: "string",
      group: "contenu",
      description: "Le petit texte en capitales au-dessus du titre. Il doit porter un FAIT, pas répéter la catégorie.",
    }),
    defineField({
      name: "accroche",
      title: "Accroche",
      type: "text",
      rows: 3,
      group: "contenu",
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      group: "contenu",
      options: { hotspot: true },
    }),

    defineField({
      name: "texte",
      title: "Texte de fond",
      type: "array",
      of: [{ type: "block" }],
      group: "sections",
      description:
        "⛔ C’est CE TEXTE qui fait remonter la page, pas la mise en page. Sous 200 mots une page ne se défend pas : Google la montre mais ne la classe pas haut.",
    }),
    defineField({
      name: "sections",
      title: "Sections illustrées",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre", type: "string", validation: r => r.required() },
            { name: "paragraphes", title: "Texte", type: "array", of: [{ type: "block" }] },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            /* ⭐ LA GALERIE — plusieurs vues du même sujet, quand il y en a.
               Le showroom GF Machining Solutions a cinq photos en 2560 px dans
               la médiathèque ; n'en montrer qu'une revient à jeter les quatre
               autres. ⚠️ Elle ne sert QUE ça : des vues d'un même projet. Ce
               n'est pas un espace de remplissage — trois images qui ne
               racontent rien valent moins qu'une image qui raconte. */
            /* ⛔⛔ CE CHAMP EXISTE PARCE QUE LE GABARIT NE DOIT PAS DÉCIDER
               À LA PLACE DE L'ÉDITEUR. Il répartissait les vidéos sur les
               sections sans image, dans l'ordre — et posait donc le survol
               d'un parc éolien sur un paragraphe qui parle du cadre légal.
               Une section de méthode, sans projet nommé, ne porte RIEN : elle
               se lit en pleine largeur. Le dire explicitement est la seule
               façon d'empêcher la distribution automatique de reprendre la
               main. */
            {
              name: "pleineLargeur",
              title: "Sans média, en pleine largeur",
              type: "boolean",
              initialValue: false,
              description: "À cocher sur les sections de méthode : aucun projet à montrer, donc aucun média.",
            },
            {
              name: "galerie",
              title: "Autres vues",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "D’autres vues du MÊME projet. Laisser vide s’il n’y en a qu’une.",
            },
          ],
          preview: { select: { title: "titre", media: "image" } },
        },
      ],
      description: "Un titre par question qu’un client se pose vraiment. Une image toutes les deux ou trois sections.",
    }),
    /**
     * ⭐ LES BLOCS — la composition libre, validée par Giz le 12/08/2026.
     *
     * ⛔ ILS REMPLACENT `sections` À TERME, mais les deux coexistent le temps
     * de la reprise page par page : une page qui n'a pas encore de blocs
     * continue de s'afficher avec ses sections. Supprimer `sections` avant que
     * les neuf pages soient reprises viderait celles qui restent.
     *
     * ⚠️ L'ORDRE DES BLOCS EST L'ORDRE DE LA PAGE. Le fond — clair, soutenu,
     * sombre — n'est PAS un choix d'éditeur : il se calcule à l'affichage,
     * pour que l'alternance reste juste quoi qu'on déplace.
     */
    defineField({
      name: "blocs",
      title: "Blocs de la page",
      type: "array",
      group: "sections",
      of: [
        { type: "blocEntree" }, { type: "blocTexteMedia" }, { type: "blocBanniere" },
        { type: "blocGalerie" }, { type: "blocUsages" }, { type: "blocAparte" },
        { type: "blocQuestions" }, { type: "blocProjets" },
      ],
      description:
        "Glisser pour changer l’ordre. Le fond et l’alternance se calculent tout seuls — il n’y a rien à régler.",
    }),

    defineField({
      name: "faq",
      title: "Questions fréquentes",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string", validation: r => r.required() },
            { name: "r", title: "Réponse", type: "text", rows: 3, validation: r => r.required() },
          ],
          preview: { select: { title: "q" } },
        },
      ],
      description:
        "Ce n’est pas du remplissage : « faut-il une autorisation pour un drone » est une vraie recherche, que les pages vitrines ratent toutes.",
    }),

    /**
     * ⭐ LES VIDÉOS DE LA PAGE — récupérées de l'ancien site le 12/08/2026.
     *
     * ⛔ POURQUOI CE CHAMP EXISTE. Les 9 pages de savoir-faire de l'ancien
     * site portaient 27 vidéos ; le nouveau site n'en affichait aucune. Sur
     * un site d'agence audiovisuelle, une page qui décrit un savoir-faire
     * sans le MONTRER se prive de sa meilleure preuve — et d'un canal
     * entier, les résultats vidéo de Google, qui ne s'ouvre qu'avec un
     * balisage `VideoObject` posé sur une vidéo réellement présente.
     *
     * 📌 PLUSIEURS VIDÉOS PAR PAGE, à la demande de Giz : la page vidéo
     * mapping en portait 7 à elle seule.
     *
     * ⚠️ `vignetteUrl` est préremplie avec la miniature Vimeo. Elle sert
     * d'affiche AVANT le clic : la vidéo n'est chargée qu'au clic, sinon
     * sept lecteurs sur une page effondreraient les indicateurs de vitesse
     * que Google mesure. 👉 En passant une vidéo sur Livid, changer AUSSI la
     * vignette : elle pointe aujourd'hui vers le CDN de Vimeo, et mourra
     * avec lui.
     */
    defineField({
      name: "videos",
      title: "Vidéos de la page",
      type: "array",
      group: "contenu",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "url",
              title: "Lien de la vidéo",
              type: "url",
              validation: r => r.required(),
              description: "Vimeo aujourd’hui, Livid à terme. Le lecteur reconnaît les deux.",
            },
            {
              name: "titre",
              title: "Titre affiché",
              type: "string",
              validation: r => r.required(),
              description:
                "Ce que lit le visiteur sous la vignette, et ce que lira Google. « Mapping — Hôtel-Dieu, Lyon » vaut mieux que « Vidéo 3 ».",
            },
            {
              name: "vignetteUrl",
              title: "Image d’affiche",
              type: "url",
              description: "Préremplie depuis Vimeo. À remettre à jour en passant sur Livid.",
            },
          ],
          preview: { select: { title: "titre", subtitle: "url" } },
        },
      ],
    }),

    /**
     * ⭐ LES PROJETS LOCAUX — réservé aux pages de VILLE, et c'est le champ
     * qui les sauve. Ces pages ont été fabriquées par duplication sur
     * l'ancien site : la page Genève demandait « envie de travailler avec
     * une boîte de prod lyonnaise ? ». Nommer des projets réellement
     * réalisés dans cette ville est le seul contenu qui ne peut pas exister
     * ailleurs — donc la seule parade au contenu quasi dupliqué.
     */
    /* ⛔⛔ LES SIX PROJETS SE CHOISISSENT MAINTENANT À LA MAIN QUAND ON LE
       VEUT. Ils étaient sélectionnés automatiquement par le produit, ce qui
       donne un résultat correct en moyenne et faux en particulier : Giz, sur
       la page mapping, « on enlève SIPAREX / SHOWREEL 2022 / DEEPWEB /
       PRINTEMPS et on rajoute Audi A8 ».
       👉 Une sélection automatique est un bon point de départ, jamais une
       décision. Ce champ laisse la décision à l'éditeur, et ne fait rien tant
       qu'il est vide — la sélection automatique reprend la main. */
    defineField({
      name: "projetsChoisis",
      title: "Projets à montrer (choix manuel)",
      type: "array",
      of: [{ type: "string" }],
      group: "sections",
      description:
        "Les slugs des réalisations à afficher, dans l'ordre voulu — par exemple « artcurial-video-mapping ». ⚠️ Laisser VIDE pour que la sélection se fasse toute seule par le produit.",
    }),
    defineField({
      name: "projets",
      title: "Projets réalisés ici",
      type: "array",
      of: [{ type: "string" }],
      group: "sections",
      description: "Un par ligne. À ne renseigner que sur les pages de ville.",
      hidden: ({ document }) => document?.genre !== "ville",
    }),

    defineField({
      name: "ancienneUrl",
      title: "Ancienne adresse",
      type: "string",
      group: "seo",
      readOnly: true,
    }),
    defineField({
      name: "titreSeo",
      title: "Titre pour Google",
      type: "string",
      group: "seo",
      validation: r => r.max(65).warning("Au-delà de 65 caractères, Google coupe."),
    }),
    defineField({
      name: "descriptionSeo",
      title: "Description pour Google",
      type: "text",
      rows: 2,
      group: "seo",
      validation: r => r.max(160).warning("Au-delà de 160 caractères, Google coupe."),
    }),
  ],

  preview: {
    select: { title: "titre", genre: "genre", media: "image", langue: "language" },
    prepare({ title, genre, media, langue }) {
      return { title, media, subtitle: `${NOM_VERSION[langue as string] ?? "—"}  ·  ${genre ?? "—"}` };
    },
  },
});
