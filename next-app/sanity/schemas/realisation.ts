import { defineField, defineType } from "sanity";

/**
 * UNE RÉALISATION — le type le plus nombreux du site : 170 documents.
 *
 * ⛔ POURQUOI CHAQUE CHAMP EST LÀ, ET PAS UN DE PLUS.
 * Un schéma trop riche produit des fiches à moitié remplies, et une fiche à
 * moitié remplie se voit plus qu'une fiche courte. Chaque champ ci-dessous
 * correspond à une colonne réellement présente dans l'export du site actuel,
 * ou à un manque identifié pendant le chantier.
 *
 * 📌 LE MODÈLE MULTILINGUE EST « UN DOCUMENT PAR LANGUE », relié par le
 * plugin document-internationalization. C'est ce qui permet qu'une
 * réalisation N'EXISTE PAS en Suisse — impossible avec un modèle « un
 * document, trois traductions dans des champs ». C'était la contrainte
 * numéro un de Giz : « on ne montre pas TOUS les projets » en Suisse.
 */
const NOM_VERSION: Record<string, string> = {
  fr: "🇫🇷 FR", en: "🇫🇷 EN", es: "🇫🇷 ES", "fr-ch": "🇨🇭 FR", "en-ch": "🇨🇭 EN",
};

export const realisation = defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  groups: [
    { name: "contenu", title: "Contenu", default: true },
    { name: "classement", title: "Classement" },
    { name: "cas", title: "Le cas client" },
    { name: "seo", title: "Référencement" },
  ],
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      group: "contenu",
      validation: r => r.required(),
      description:
        "Il doit porter le CLIENT et la PRESTATION. « Qwartz » ne se positionne que sur « Qwartz » ; « Qwartz — film de présentation du centre commercial » se positionne aussi sur « film centre commercial ».",
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page",
      type: "slug",
      group: "contenu",
      options: { source: "titre", maxLength: 70 },
      validation: r => r.required(),
      description:
        "⛔ Une adresse qui se positionne est un actif. Ne jamais la changer sur une page qui a du trafic sans poser une redirection.",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "contenu",
      description: "Le nom tel qu’il doit apparaître publiquement. Vérifier qu’on a l’accord de le citer.",
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      group: "contenu",
      options: { hotspot: true },
      description:
        "Posez le point focal : le site recadre autour, en carré comme en 16/9. C’est ce qui évite les têtes coupées.",
    }),
    defineField({
      name: "video",
      title: "Lien de la vidéo",
      type: "url",
      group: "contenu",
      description:
        "⚠️ Les 144 vidéos importées pointent vers Vimeo. Elles sont à repointer vers Livid avant la mise en ligne.",
    }),
    defineField({
      name: "intro",
      title: "Accroche",
      type: "text",
      rows: 2,
      group: "contenu",
      description: "Une phrase qui pose l’enjeu, lue AVANT la vidéo. Elle donne au spectateur ce qu’il doit y chercher.",
    }),
    defineField({
      name: "detail",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      group: "contenu",
    }),

    // ── Classement ────────────────────────────────────────────────────
    defineField({
      name: "metier",
      title: "Métier",
      type: "string",
      group: "classement",
      options: {
        list: [
          { title: "Communication & marketing", value: "film" },
          { title: "Événementiel", value: "evenement" },
          { title: "Immersion", value: "immersion" },
        ],
        layout: "radio",
      },
      validation: r => r.required(),
    }),
    defineField({
      name: "produit",
      title: "Type de projet",
      type: "string",
      group: "classement",
      description: "Sert de filtre sur la page réalisations, et fait le lien avec les produits annoncés sur les pages métier.",
    }),
    defineField({
      name: "aRelire",
      title: "Classement à relire",
      type: "boolean",
      group: "classement",
      initialValue: false,
      description:
        "Coché sur les fiches dont le métier et le type ont été DÉDUITS à l’import — les colonnes correspondantes étaient vides dans l’export.",
    }),


    // ── Le cas client ─────────────────────────────────────────────────
    defineField({
      name: "casContexte",
      title: "Le contexte",
      type: "text",
      rows: 3,
      group: "cas",
      description: "Qui est le client, sur quel marché, à quel moment ce projet arrive.",
    }),
    defineField({
      name: "casEnjeu",
      title: "L’enjeu",
      type: "text",
      rows: 3,
      group: "cas",
      description: "Ce qu’il fallait obtenir, et pourquoi ce n’était pas évident. C’est le bloc qui rend le reste intéressant.",
    }),
    defineField({
      name: "casFait",
      title: "Ce qu’on a fait",
      type: "text",
      rows: 3,
      group: "cas",
    }),
    defineField({
      name: "casResultat",
      title: "Ce que ça a donné",
      type: "text",
      rows: 2,
      group: "cas",
      description:
        "⛔ Le chiffre, ou à défaut le fait vérifiable. RIEN D’ESTIMÉ — c’est la règle depuis « 145 films ». Laisser vide vaut mieux qu’approximer.",
    }),
    defineField({
      name: "photos",
      title: "Photos de fabrication",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "cas",
      description: "La vidéo prouve le résultat, les photos prouvent la fabrication.",
    }),

    // ── Référencement ─────────────────────────────────────────────────
    defineField({
      name: "ancienneUrl",
      title: "Ancienne adresse",
      type: "string",
      group: "seo",
      readOnly: true,
      description: "⛔ Ne pas modifier : c’est elle qui produit la redirection 301 depuis l’ancien site.",
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

  /**
   * L'APERÇU DANS LES LISTES — c'est lui qui rend le multi-marchés visible
   * d'un coup d'œil, sans ouvrir aucun document. Réponse directe à la
   * question de Giz : « à quel point c'est visuel de savoir sur quelle
   * version du site quelle page existe ».
   */
  preview: {
    select: { title: "titre", media: "image", langue: "language", metier: "metier", aRelire: "aRelire" },
    prepare({ title, media, langue, metier, aRelire }) {
      const v = NOM_VERSION[langue as string] ?? "—";
      const nom = { film: "Communication", evenement: "Événementiel", immersion: "Immersion" }[metier as string] ?? "—";
      return { title, media, subtitle: `${v}  ·  ${nom}${aRelire ? "  ·  ⚠️ à relire" : ""}` };
    },
  },
});
