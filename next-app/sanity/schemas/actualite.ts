import { defineField, defineType } from "sanity";

/**
 * L'ACTUALITÉ — le troisième objet du site, validé par Giz le 18/08/2026.
 *
 * ⛔⛔ POURQUOI UN TYPE À PART, ET NON UN GENRE DE `page`.
 * La règle du 12/08 : « en gros tout ce qui est noté avec le slug actualités
 * est une actualité », et « comme c'est une actualité on parle des projets
 * larges ». Une actualité et une réalisation sont DEUX OBJETS, pas deux
 * rangements du même. Une actualité RACONTE un projet — daté, avec son client,
 * ses photos, ses vidéos ; une réalisation le CATALOGUE.
 *
 * ⭐ CE QUE L'ACTUALITÉ N'A PAS, ET C'EST DÉLIBÉRÉ : ni « ce qu'on prend en
 * charge », ni « les questions qu'on nous pose », ni argumentaire générique.
 * Tout ça vit sur les pages de savoir-faire. C'est exactement ce qui faisait se
 * concurrencer les deux familles — mesuré : sept couples se présentaient sur
 * les mêmes requêtes, dont STANN à 7 084 impressions contre 4 736, et zéro clic
 * des deux côtés. En coupant les 130 mots de vente de l'article, on retire le
 * motif de la concurrence sans retirer la page.
 *
 * ⚠️ LES 63 ACTUALITÉS GARDENT LEUR ADRESSE. Aucune ne part en redirection :
 * 64 lignes du plan sont en 200, l'index compris. Le slug est donc repris à
 * l'identique de l'ancien site, et il ne se retouche pas.
 */

/** Un média et sa légende. Image OU vidéo, jamais les deux. */
const media = {
  type: "object" as const,
  name: "media",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      description: "⛔ Elle doit montrer ce que le texte à côté raconte.",
    }),
    defineField({
      name: "videoUrl",
      title: "Vidéo (lien Livid)",
      type: "url",
      description: "Laisser vide s’il y a une image.",
    }),
    defineField({
      name: "videoAffiche",
      title: "Image d’affiche de la vidéo",
      type: "image",
      options: { hotspot: true },
      description:
        "Ce qu’on voit avant de cliquer. ⚠️ Sans elle, le lecteur sort un dégradé de marque — lisible, mais muet.",
      hidden: ({ parent }) => !(parent as { videoUrl?: string })?.videoUrl,
    }),
    defineField({
      name: "legende",
      title: "Légende",
      type: "string",
      description: "Ce que le visiteur lit sous le média. Et ce que Google lit pour une vidéo.",
    }),
    defineField({
      name: "sousLegende",
      title: "Détail",
      type: "string",
      description: "La durée, le lieu, une précision. Facultatif.",
    }),
    defineField({
      name: "texteAlternatif",
      title: "Texte alternatif",
      type: "string",
      description:
        "⚠️ Ce que lit quelqu’un qui ne voit pas l’image. 19 des 137 photos reprises de l’ancien site n’en ont pas : elles sont à écrire.",
    }),
  ],
  preview: { select: { title: "legende", media: "image" } },
};

/** Le texte enrichi du site : des liens, et rien d'autre. */
const texteRiche = {
  type: "array" as const,
  of: [{
    type: "block",
    marks: {
      annotations: [{
        name: "link", type: "object", title: "Lien",
        fields: [{ name: "href", type: "string", title: "Adresse" }],
      }],
    },
  }],
};

export const actualite = defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  groups: [
    { name: "contenu", title: "Contenu", default: true },
    { name: "entete", title: "En-tête" },
    { name: "seo", title: "Référencement" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),

    // ── L'EN-TÊTE ────────────────────────────────────────────────────────
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      group: "entete",
      validation: r => r.required(),
      description: "Le H1. Il dit ce que le projet était, pas ce que le client fait.",
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "entete",
      options: { source: "titre", maxLength: 96 },
      validation: r => r.required(),
      description:
        "⛔ Repris à l’identique de l’ancien site : l’adresse ne change pas, il n’y a pas de redirection derrière.",
    }),
    defineField({
      name: "chapo",
      title: "Chapô",
      group: "entete",
      ...texteRiche,
      description:
        "Deux ou trois phrases, posées SUR l’image d’en-tête. C’est ce que Google reprend le plus souvent.",
    }),
    defineField({
      name: "imageEntete",
      title: "Image d’en-tête",
      type: "image",
      options: { hotspot: true },
      group: "entete",
      description:
        "⚠️ 21 des 63 actualités n’en ont aucune : sans elle, l’en-tête retombe sur un aplat sombre, et c’est prévu.",
    }),
    defineField({ name: "client", type: "string", group: "entete" }),
    defineField({
      name: "clientUrl",
      title: "Site du client",
      type: "url",
      group: "entete",
      description:
        "⭐ Le seul lien sortant naturel du site : il PROUVE que le client existe. Une référence vérifiable en un clic.",
    }),
    defineField({
      name: "datePublication",
      title: "Date de publication",
      type: "date",
      group: "entete",
      validation: r => r.required(),
      description: "Celle de l’ancien site. Une actualité sans date n’en est plus une.",
    }),
    defineField({
      name: "repere",
      title: "Repère",
      type: "string",
      group: "entete",
      description: "Ce que c’était, en trois mots : « Film produit · tournage + animation 2D ».",
    }),

    // ── LE CORPS ─────────────────────────────────────────────────────────
    defineField({
      name: "blocs",
      title: "Le récit",
      type: "array",
      group: "contenu",
      of: [{
        type: "object",
        name: "bloc",
        fields: [
          defineField({ name: "surTitre", type: "string" }),
          defineField({ name: "titre", type: "string", validation: r => r.required() }),
          defineField({
            name: "paragraphes", ...texteRiche,
            description:
              "⭐ Les liens se posent sur les MOTS, jamais sur les photos : vers les savoir-faire, vers les réalisations, vers le site du client.",
          }),
          defineField({
            name: "medias",
            title: "Médias",
            type: "array",
            of: [media],
            description:
              "⛔ UN MÉDIA NE SE POSE QUE SUR UNE PHRASE QUI LE NOMME. Sans phrase qui le justifie, on n’en met pas — un trou vaut mieux qu’un rapprochement faux.",
          }),
          defineField({
            name: "aparte",
            title: "Aparté",
            type: "text",
            rows: 3,
            description:
              "La note de coulisses qui suit une phrase sérieuse. ⛔ Une seule par actualité.",
          }),
        ],
        preview: { select: { title: "titre", subtitle: "surTitre", media: "medias.0.image" } },
      }],
    }),

    // ── LE BLOC QUI DÉSAMORCE LA CONCURRENCE ─────────────────────────────
    defineField({
      name: "projets",
      title: "Des projets du même type",
      type: "object",
      group: "contenu",
      fields: [
        defineField({ name: "surTitre", type: "string", initialValue: "Des projets du même type" }),
        defineField({ name: "titre", type: "string" }),
        defineField({
          name: "paragraphes", ...texteRiche,
          description:
            "⛔ NE JAMAIS PARLER DU SITE LUI-MÊME. « Cette actualité raconte…, la réalisation donne… » ne sert personne. On nomme des CLIENTS et on lie leurs réalisations : c’est utile au lecteur, au référencement, et au maillage.",
        }),
        defineField({ name: "boutonLibelle", title: "Libellé du bouton", type: "string" }),
        defineField({ name: "boutonLien", title: "Lien du bouton", type: "string" }),
      ],
    }),

    // ── RÉFÉRENCEMENT ────────────────────────────────────────────────────
    defineField({
      name: "titreSeo",
      title: "Titre pour Google",
      type: "string",
      group: "seo",
      validation: r => r.max(65).warning("Au-delà de 65 caractères, Google coupe."),
      description: "⚠️ Sans « | Bluevista » : le gabarit l’ajoute tout seul.",
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

  orderings: [{
    title: "Les plus récentes",
    name: "dateDesc",
    by: [{ field: "datePublication", direction: "desc" }],
  }],

  preview: {
    select: { title: "titre", date: "datePublication", media: "imageEntete", client: "client" },
    prepare: ({ title, date, media, client }) => ({
      title,
      subtitle: [client, date].filter(Boolean).join("  ·  "),
      media,
    }),
  },
});
