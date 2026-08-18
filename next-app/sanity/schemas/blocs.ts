import { defineField, defineType } from "sanity";

/**
 * LA BIBLIOTHÈQUE DE BLOCS — validée par Giz le 12/08/2026.
 *
 * ⛔⛔ CE QUE ÇA CHANGE, ET POURQUOI C'EST UN REVIREMENT ASSUMÉ.
 * Le schéma `page` a été verrouillé exprès, et c'est écrit dedans : « rendre
 * la mise en page éditable donne l'illusion de la liberté et produit des pages
 * cassées ; c'est ce qu'Elementor a fait à l'ancien site ». La conséquence
 * s'est vue : les pages de savoir-faire n'avaient QU'UN SEUL type de section,
 * répété quatre fois. Verdict de Giz : « gabarit sans âme », « franchement
 * l'ancien site est mieux ».
 *
 * ⭐ LE MILIEU RETENU : une bibliothèque de blocs TYPÉS. Giz choisit l'ordre et
 * le nombre ; il ne peut pas casser le dessin. Chaque bloc impose ce dont il a
 * besoin — la bannière exige une image, les usages exigent des liens, la
 * galerie exige plusieurs vues du MÊME projet. On compose, on ne dessine pas.
 *
 * ⚠️ HUIT BLOCS, ET PAS UN DE PLUS SANS RAISON MESURÉE. Le jour où un
 * neuvième arrive « pour ce cas particulier », on est reparti vers Elementor.
 */

/** Le média d'un bloc : une image OU une vidéo, jamais les deux. */
const media = [
  defineField({
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    description: "⛔ Elle doit montrer le projet nommé dans le texte. Sinon, ne rien mettre.",
  }),
  defineField({
    name: "videoUrl",
    title: "Vidéo",
    type: "url",
    description: "Lien Livid (ou Vimeo). Laisser vide s’il y a une image.",
  }),
  defineField({
    name: "videoTitre",
    title: "Titre de la vidéo",
    type: "string",
    description: "Ce que lit le visiteur sous le lecteur, et ce que lit Google.",
    hidden: ({ parent }) => !parent?.videoUrl,
  }),
  defineField({
    name: "videoAffiche",
    title: "Image d’affiche de la vidéo",
    type: "url",
    description: "Ce qu’on voit avant de cliquer. Sans elle, Google ignore le balisage vidéo.",
    hidden: ({ parent }) => !parent?.videoUrl,
  }),
];

export const blocEntree = defineType({
  name: "blocEntree",
  title: "Entrée — ce qui vous amène",
  type: "object",
  fields: [
    defineField({ name: "surTitre", type: "string", initialValue: "Ce qui vous amène" }),
    defineField({
      name: "affirmations",
      title: "Trois affirmations",
      type: "array",
      of: [{ type: "string" }],
      validation: r => r.max(3),
      description:
        "⚠️ Trois, jamais plus. Chacune doit passer le test : une autre agence pourrait-elle la signer ? Si oui, elle ne dit rien.",
    }),
    defineField({ name: "surTitrePrise", type: "string", initialValue: "Ce qu’on prend en charge" }),
    defineField({
      name: "prestations",
      title: "Ce qu’on prend en charge",
      type: "array",
      of: [{ type: "string" }],
      description: "Le PREMIER MOT de chaque ligne ressort en bleu. Le mettre en tête : « Conception du parcours… ».",
    }),
  ],
  preview: { select: { subtitle: "surTitre" }, prepare: () => ({ title: "Entrée" }) },
});

export const blocTexteMedia = defineType({
  name: "blocTexteMedia",
  title: "Texte + média",
  type: "object",
  fields: [
    defineField({ name: "titre", type: "string", validation: r => r.required() }),
    defineField({
      name: "paragraphes",
      type: "array",
      of: [{ type: "block", marks: { annotations: [{ name: "link", type: "object", title: "Lien", fields: [{ name: "href", type: "string", title: "Adresse" }] }] } }],
      description:
        "⭐ La PREMIÈRE PHRASE nomme le projet — c'est elle qui autorise le média à côté. Sans projet nommé, laisser le média vide.",
    }),
    ...media,
    defineField({
      name: "galerie",
      title: "Autres vues du même projet",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: { select: { title: "titre", media: "image" } },
});

export const blocBanniere = defineType({
  name: "blocBanniere",
  title: "Bannière pleine largeur",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: "titre", type: "string", validation: r => r.required() }),
    /* ⚠️ Texte RICHE et non simple : la bannière nomme un client — « Chez GF
       Machining Solutions… » — et ce nom doit pouvoir être un lien. En texte
       brut, il ne l'était pas, et c'est ce qui manquait au premier passage. */
    defineField({
      name: "texte",
      type: "array",
      of: [{ type: "block", marks: { annotations: [{ name: "link", type: "object", title: "Lien", fields: [{ name: "href", type: "string", title: "Adresse" }] }] } }],
    }),
    defineField({ name: "boutonLibelle", title: "Libellé du bouton", type: "string" }),
    defineField({ name: "boutonLien", title: "Lien du bouton", type: "string" }),
  ],
  description: "Le bloc qui donne le rythme. ⚠️ Une seule par page : deux et l'effet tombe.",
  preview: { select: { title: "titre", media: "image" } },
});

export const blocGalerie = defineType({
  name: "blocGalerie",
  title: "Galerie",
  type: "object",
  fields: [
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: r => r.min(2),
      description: "⛔ Des vues d’un MÊME projet. Pas un espace de remplissage.",
    }),
  ],
  preview: { select: { media: "images.0" }, prepare: ({ media }) => ({ title: "Galerie", media }) },
});

export const blocUsages = defineType({
  name: "blocUsages",
  title: "Usages — les situations",
  type: "object",
  fields: [
    defineField({ name: "surTitre", type: "string", initialValue: "Où ça sert" }),
    defineField({ name: "titre", type: "string", validation: r => r.required() }),
    defineField({
      name: "entrees",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "titre", type: "string", validation: r => r.required() }),
          defineField({ name: "texte", type: "text", rows: 2 }),
          defineField({ name: "lienLibelle", title: "Libellé du lien", type: "string" }),
          defineField({ name: "lien", title: "Adresse", type: "string" }),
        ],
        preview: { select: { title: "titre", subtitle: "lien" } },
      }],
      description:
        "⭐ Le meilleur rapport maillage / place de la page : chaque entrée renvoie à une réalisation. C'est ce que faisait l'ancien site avec « Découverte touristique · Visite d'entreprise ».",
    }),
  ],
  preview: { select: { title: "titre" } },
});

export const blocAparte = defineType({
  name: "blocAparte",
  title: "Aparté",
  type: "object",
  fields: [defineField({ name: "texte", type: "text", rows: 3, validation: r => r.required() })],
  description:
    "Le gimmick : phrase sérieuse au-dessus, note backstage ici. ⛔ Une par page — « sinon c'est redondant et chiant ». Et jamais sur une frustration.",
  preview: { select: { title: "texte" } },
});

export const blocQuestions = defineType({
  name: "blocQuestions",
  title: "Questions fréquentes",
  type: "object",
  fields: [
    defineField({ name: "surTitre", type: "string", initialValue: "Les questions qu’on nous pose" }),
    defineField({
      name: "questions",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "q", type: "string", validation: r => r.required() }),
          defineField({ name: "r", type: "text", rows: 3, validation: r => r.required() }),
        ],
        preview: { select: { title: "q" } },
      }],
      description: "Les recherches longues que les pages vitrines ratent toutes.",
    }),
  ],
  preview: { prepare: () => ({ title: "Questions fréquentes" }) },
});

export const blocProjets = defineType({
  name: "blocProjets",
  title: "Projets",
  type: "object",
  fields: [
    defineField({ name: "surTitre", type: "string", initialValue: "Déjà réalisé" }),
    defineField({ name: "titre", type: "string", initialValue: "Six projets, six contextes" }),
  ],
  description:
    "Les réalisations se choisissent toutes seules, par leur produit. ⛔ Ne jamais renvoyer vers un filtre : les fiches se lient une par une, c'est ce qui répare le maillage.",
  preview: { select: { title: "titre" } },
});

export const BLOCS = [
  blocEntree, blocTexteMedia, blocBanniere, blocGalerie,
  blocUsages, blocAparte, blocQuestions, blocProjets,
];
