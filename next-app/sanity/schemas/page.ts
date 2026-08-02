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
          ],
          preview: { select: { title: "titre", media: "image" } },
        },
      ],
      description: "Un titre par question qu’un client se pose vraiment. Une image toutes les deux ou trois sections.",
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
     * ⭐ LES PROJETS LOCAUX — réservé aux pages de VILLE, et c'est le champ
     * qui les sauve. Ces pages ont été fabriquées par duplication sur
     * l'ancien site : la page Genève demandait « envie de travailler avec
     * une boîte de prod lyonnaise ? ». Nommer des projets réellement
     * réalisés dans cette ville est le seul contenu qui ne peut pas exister
     * ailleurs — donc la seule parade au contenu quasi dupliqué.
     */
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
