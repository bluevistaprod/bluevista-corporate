#!/usr/bin/env node
/**
 * LES TEXTES DES PAGES COMPÉTENCE ET VILLE — source unique.
 *
 *   node scripts/textes-competences-villes.mjs            (simulation)
 *   node scripts/textes-competences-villes.mjs --sanity   (écrit dans Sanity)
 *   node scripts/textes-competences-villes.mjs --wordpress (les 2 pages de l'ancien site)
 *
 * ⛔⛔ CE FICHIER REMPLACE `textes-paris-streaming.mjs`, qui portait les deux
 * premières pages. Deux sources pour la même famille de textes, c'est
 * exactement la divergence qu'on vient de corriger sur les listes de services
 * (le vidéomapping s'était retrouvé dans deux piliers). Une seule source.
 *
 * ── LA CONTRAINTE PROPRE À CES PAGES ──────────────────────────────────────
 * ⛔ LEUR TEXTE ACTUEL EST L'ACTIF DE RÉFÉRENCEMENT. Ces pages portent
 * l'essentiel du trafic hors accueil — 846 clics/an, la moitié de la
 * visibilité du domaine. « Le réécrire pour le plaisir jette un actif. »
 *
 * 👉 D'où le geste retenu : on N'EFFACE PAS le corps existant, on AJOUTE les
 * sections et les questions qui manquaient. Les pages faisaient 97 à 519 mots
 * avec toutes leurs sections vides — et le 25/07 a montré ce que coûte une
 * page maigre. On comble, on ne remplace pas.
 *
 * ── LE REGISTRE ───────────────────────────────────────────────────────────
 * `partageable/savoir/reference/voix-marketing.md` + `exemples/voix/marketing.md`.
 * Ce que ça impose ici, et qui a conduit à RENOMMER quatre intitulés :
 *   ⛔ « Vingt ans de clients lyonnais » → « depuis 2004 », jamais un nombre
 *      d'années.
 *   ⛔ « Une entité suisse, PAS une prestation transfrontalière » et « Notre
 *      studio est ici, PAS ailleurs » → on n'écrit jamais ce qu'on n'est pas.
 *   ⛔ « Le problème n'est presque jamais le film » → un titre affirme.
 *
 * ⚠️ ET LA NUANCE QUI ÉVITE LA SURCORRECTION : sur ces pages, le vocabulaire
 * d'ENTRÉE reste celui des recherches. Le titre et le H1 portent « studio
 * animation 3D Lyon » ou « vidéo mapping » — c'est la voix qui change, pas les
 * mots-clés. Personne ne tape « immersion ».
 *
 * ⛔ Une parenthèse d'aparté MAXIMUM par page (le gimmick), et pas de pique :
 * elle est réservée à une page par parcours, et la page agence l'occupe.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SANITY = process.argv.includes("--sanity");
const WORDPRESS = process.argv.includes("--wordpress");

/* ══════════════════════════════════════════════════════════════════════════
   LE CONTENU — la seule chose à modifier dans ce fichier.
   `h` = intertitre (dans `ajout` seulement) · `p` = paragraphe.
   `wp` : seulement pour les pages dont l'ancien site a déjà reçu du texte.
   ══════════════════════════════════════════════════════════════════════════ */

const PAGES = {
  /* ───────────────────────── SAVOIR-FAIRE ───────────────────────── */

  "video-mapping": {
    id: "page-savoir-faire-video-mapping",
    seo: {
      titre: "Vidéo mapping : projection sur façade et mapping sur table | Bluevista",
      description: "Conception et réalisation de vidéo mapping architectural et sur table, du relevé du bâtiment à la projection. Écriture, images et technique en interne, depuis 2004.",
    },
    sections: [
      /* ⭐ RÉCUPÉRÉ DE L'ANCIEN SITE, 10/08/2026 — le vrai butin du tri des 110
         paragraphes non migrés. Ce ne sont pas des paragraphes recopiés : le
         remplissage a été jeté, seuls les FAITS ont été gardés.
         ⛔ GL Events écarté : l'ancien texte le présentait comme « notre
         prestataire », alors qu'il figure aussi dans les références CLIENTS. */
      {
        cle: "sec3",
        titre: "Ce qu’on a déjà projeté",
        corps: [
          { p: "Pour l’ouverture de l’InterContinental de Lyon, nous avons produit deux mappings — un sur la façade, un second à l’intérieur — et couvert l’inauguration : les deux projections ont tourné toute la soirée pendant que les invités parcouraient le lieu." },
          { p: "Sur le Printemps de Lyon, nous avons tenu l’ensemble : la captation de l’événement, la conception du mapping, et la captation du mapping lui-même. C’est le cas qui montre le mieux ce que permet une chaîne complète — trois métiers qui auraient demandé trois prestataires." },
          { p: "Ailleurs, un mapping à Paris pour les quarante ans de Siparex, et une projection sur le musée Rodin où l’architecture du bâtiment sert l’œuvre de l’artiste." },
        ],
      },
      {
        cle: "sec0",
        titre: "Un mapping se prépare sur un relevé, pas sur une photo",
        corps: [
          { p: "Une façade n’est jamais plate. Les corniches avancent, les fenêtres reculent, et le mur n’est pas d’équerre avec l’endroit où le public se tiendra. Nous relevons donc la géométrie réelle du bâtiment avant d’écrire quoi que ce soit, et l’image est fabriquée pour cette géométrie-là." },
          { p: "C’est ce qui fait qu’une projection « colle » au relief au lieu de glisser dessus, et c’est aussi ce qui permet de dire dès la conception combien de vidéoprojecteurs seront nécessaires, et depuis quels emplacements." },
        ],
      },
      {
        cle: "sec1",
        titre: "L’écriture avant la technique",
        corps: [
          { p: "Un mapping tient trois à cinq minutes devant un public debout. La durée impose l’écriture : une idée forte, tenue d’un bout à l’autre, plutôt qu’une suite d’effets qui se succèdent sans raison." },
          { p: "Nous partons donc du bâtiment et de ce qu’il raconte — son histoire, sa fonction, ce qui s’y décide — puis nous cherchons le principe visuel qui va le transformer. La technique vient après, et elle sert cette idée." },
        ],
      },
      {
        cle: "sec2",
        titre: "Ce que le mapping sur table permet en intérieur",
        corps: [
          { p: "Le même principe se joue à petite échelle, sur une maquette, un produit ou une table de banquet : la projection habille un volume réel, sous les yeux des convives, sans écran ni casque." },
          { p: "C’est le format qui convient aux conventions et aux dîners de gala, là où une façade n’est ni disponible ni visible depuis la salle." },
        ],
      },
    ],
    faq: [
      { cle: "faq0", question: "Combien de temps faut-il pour préparer un vidéo mapping ?",
        reponse: "Comptez six à huit semaines entre le relevé du bâtiment et la projection, l’écriture et la fabrication des images occupant l’essentiel de ce délai. Les repérages techniques et les essais se font sur place, de nuit, quelques jours avant." },
      { cle: "faq1", question: "Faut-il couper l’éclairage public pendant la projection ?",
        reponse: "En général oui, au moins sur la façade concernée : une projection lutte contre toute lumière qui frappe le mur. Nous prenons contact avec les services de la ville en amont, c’est une démarche que nous connaissons." },
      { cle: "faq2", question: "Peut-on projeter sur un bâtiment classé ?",
        reponse: "Oui. La projection ne touche pas le bâti et ne laisse aucune trace, ce qui la rend compatible avec la plupart des protections patrimoniales. L’autorisation dépend du propriétaire et de l’architecte des Bâtiments de France, et se demande plusieurs semaines à l’avance." },
    ],
  },

  "animation-3d": {
    id: "page-savoir-faire-animation-3d",
    seo: {
      titre: "Animation 3D : studio de films et de visuels 3D | Bluevista",
      description: "Studio d’animation 3D : modélisation, animation et rendu photo-réaliste ou stylisé, à partir de vos fichiers de conception. Toute la chaîne en interne, depuis 2004.",
    },
    sections: [
      /* ⭐ Récupéré de l'ancien site. ⛔ Le paragraphe voisin annonçait « nos
         studios 3D à Lyon, Paris et Genève » : c'est FAUX — le studio est à
         Lyon — et ça mettait Genève dans une page française. Jeté. */
      {
        cle: "sec3",
        titre: "Ce qu’on a déjà fabriqué",
        corps: [
          { p: "Pour GF Machining Solutions, nous avons produit un film de gamme mêlant tournage et animation : les écrans des machines ont été truqués et les informations techniques suivent les mouvements de caméra, ce qui permet de montrer une interface lisible là où la prise de vue réelle ne donnait qu’un reflet." },
          { p: "Nous produisons aussi nos propres capsules, où un membre de l’équipe évolue dans un univers entièrement modélisé. Elles servent à essayer des partis pris avant de les proposer — c’est là qu’on prend les risques." },
        ],
      },
      {
        cle: "sec0",
        titre: "Trois cas où l’animation 3D est la seule réponse",
        corps: [
          { p: "Le produit qu’on ne peut pas filmer : trop grand pour un plateau, trop petit pour un objectif, pas encore fabriqué, ou visible seulement une fois l’appareil ouvert. Une animation 3D montre l’intérieur d’une machine sans la démonter." },
          { p: "Le geste technique : une procédure de montage, une intervention de maintenance, un protocole de sécurité. La 3D isole le mouvement utile et supprime tout ce qui distrait autour." },
          { p: "Ce qui n’a pas d’image : un flux de données, un principe physique, une architecture logicielle. Là, il n’y a rien à filmer — il faut fabriquer l’image." },
        ],
      },
      {
        cle: "sec1",
        titre: "Photo-réaliste ou stylisé : un choix, pas une contrainte",
        corps: [
          { p: "Le photo-réalisme demande du temps de calcul et de la précision de modèle. Il se justifie quand l’image doit tenir la comparaison avec une photographie du produit réel : un catalogue, une page produit, un stand de salon." },
          { p: "Un rendu stylisé coûte moins cher, se relit plus vite et fonctionne souvent mieux en communication interne ou sur les réseaux sociaux, où il faut être compris en trois secondes. Cette question se tranche au début du projet, avec vous, et non au moment de la livraison." },
        ],
      },
      {
        cle: "sec2",
        titre: "Du fichier de conception à l’image finale",
        corps: [
          { p: "Quand vos bureaux d’études travaillent en CAO, nous partons de leurs fichiers plutôt que de remodéliser : les cotes sont justes, les versions suivent les vôtres, et le film reste exact quand le produit évolue." },
          { p: "Le reste de la chaîne se fait ici — texturing, éclairage, animation, rendu et harmonisation des couleurs — sous Blender, Cinema 4D et Unreal Engine selon ce que le projet demande." },
        ],
      },
    ],
    faq: [
      { cle: "faq3", question: "Peut-on mélanger tournage réel et animation 3D ?",
        reponse: "C’est même le cas le plus fréquent, et souvent le plus efficace : on filme ce qui existe et on fabrique ce qui ne se voit pas — l’intérieur d’une machine, un flux, une interface. Le raccord se prépare au tournage, avec des repères posés dans le décor." },
      { cle: "faq0", question: "Pouvez-vous partir de nos fichiers CAO ?",
        reponse: "Oui, et c’est la meilleure entrée quand ils existent : nous récupérons la géométrie exacte du produit au lieu de la reconstruire, ce qui garantit les proportions et raccourcit la fabrication. Les formats STEP, IGES et les exports SolidWorks ou CATIA se traitent sans difficulté." },
      { cle: "faq1", question: "Combien de temps pour un film en animation 3D ?",
        reponse: "Pour une à deux minutes, comptez six à dix semaines selon la complexité du modèle et le niveau de rendu. Le storyboard et la maquette animée occupent le premier tiers : c’est là que les décisions coûtent le moins cher." },
      { cle: "faq2", question: "Peut-on réutiliser les images pour autre chose que le film ?",
        reponse: "Oui, et c’est souvent ce qui rend la 3D rentable. Une fois le produit modélisé, il sert aux visuels de catalogue, aux vues éclatées d’une notice, aux images de salon et aux déclinaisons pour les réseaux, sans nouvelle prise de vue." },
    ],
  },

  "motion-design": {
    id: "page-savoir-faire-motion-design",
    seo: {
      titre: "Agence de motion design et d’animation graphique | Bluevista",
      description: "Motion design et animation graphique pour rendre lisibles vos offres, vos chiffres et vos parcours. Votre charte devient un système animé, réutilisable sur tous vos films.",
    },
    sections: [
      {
        cle: "sec0",
        titre: "Le motion design sert à rendre lisible, pas à décorer",
        corps: [
          { p: "Un chiffre qui apparaît au bon moment se retient ; le même chiffre dans un tableau se saute. L’animation graphique sert à hiérarchiser l’information dans le temps : elle décide de ce que le spectateur regarde, et dans quel ordre." },
          { p: "C’est pour cela qu’elle convient aux sujets qui résistent à la caméra — une offre de services, un parcours client, un résultat financier, une réorganisation." },
        ],
      },
      {
        cle: "sec1",
        titre: "Votre charte devient un système qui bouge",
        corps: [
          { p: "Nous partons de votre charte graphique et nous en fabriquons la version animée : la façon dont vos couleurs se succèdent, dont vos titres entrent, dont votre logo se pose. Une fois ces règles écrites, elles valent pour toutes vos vidéos à venir." },
          { p: "C’est ce qui fait qu’une série de contenus se reconnaît sans qu’on ait besoin d’afficher le logo dans chaque plan." },
        ],
      },
      {
        cle: "sec2",
        titre: "Un tournage habillé plutôt qu’un film entièrement animé",
        corps: [
          { p: "Beaucoup de projets n’ont pas besoin d’un film 100 % animé : ils ont besoin d’images réelles auxquelles on ajoute les titrages, les schémas et les transitions qui les rendent compréhensibles." },
          { p: "Nous travaillons donc souvent en mélange — interviews, plans d’usine, animation par-dessus — parce que c’est le rapport le plus favorable entre ce que ça coûte et ce que ça fait comprendre." },
        ],
      },
    ],
    faq: [
      /* ⭐ Récupérés de l'ancien site : des DÉLAIS et des DURÉES chiffrés — ce
         qu'un client demande vraiment, et ce qui capte les recherches longues.
         ⛔ Le reste de la page — conseils génériques sur la durée et le style —
         a été jeté : le même texte figurait mot pour mot sur une autre page. */
      { cle: "faq0", question: "Combien de temps pour produire un motion design ?",
        reponse: "Pour un film de une à une minute trente en 2D vectorielle avec des animations simples, comptez trois à cinq semaines. Ce délai couvre l’écriture, la direction artistique, la création graphique, le casting des comédiens, l’enregistrement de la voix off et l’animation. Pour un film entièrement en 3D d’une minute, comptez quatre semaines au minimum." },
      { cle: "faq1", question: "Quelle durée viser selon l’usage ?",
        reponse: "Quelques secondes pour un format publicitaire ou une pastille destinée aux réseaux. Une minute à une minute trente pour un film didactique ou une présentation d’offre — au-delà, l’attention se disperse et la fin n’est plus vue. Plusieurs minutes pour de la formation ou un tutoriel, où le spectateur vient chercher une réponse précise." },
      { cle: "faq2", question: "Peut-on partir d’un travail déjà fait de notre côté ?",
        reponse: "Oui, et cela raccourcit d’autant. Si le message et le script existent, nous reprenons à la direction artistique et à l’animation. Pour Engie Home Services, nous sommes ainsi partis d’un besoin déjà cadré pour expliquer l’usage de leur application." },
      { cle: "faq0", question: "Quelle différence entre motion design et animation 3D ?",
        reponse: "Le motion design anime des éléments graphiques en deux dimensions — textes, pictogrammes, courbes, aplats de couleur — pour expliquer et rythmer. L’animation 3D fabrique des volumes et des matières pour montrer un objet ou un espace. Les deux se combinent souvent dans le même film." },
      { cle: "faq1", question: "Faut-il une charte graphique pour commencer ?",
        reponse: "C’est plus confortable, mais ce n’est pas indispensable. À défaut, nous partons de vos supports existants — site, plaquette, présentations — et nous en déduisons les règles. Le film devient alors l’occasion de poser cette grammaire visuelle." },
      { cle: "faq2", question: "Peut-on décliner le film en plusieurs formats ?",
        reponse: "Oui, et cela se prépare dès le storyboard plutôt qu’après : un format vertical pour les réseaux ne se fabrique pas en recadrant un format large, il se compose. Prévu au départ, cela ne coûte presque rien ; ajouté à la fin, cela demande de reprendre les animations." },
    ],
  },

  "video-corporate-film-dentreprise": {
    id: "page-savoir-faire-video-corporate-film-dentreprise",
    seo: {
      titre: "Film d’entreprise : écriture, tournage et diffusion | Bluevista",
      description: "Réalisation de films d’entreprise et de vidéos corporate, de l’écriture à la mise en ligne. Tournage, animation et post-production en interne, depuis 2004.",
    },
    corrigeTexte: [["Fort de plus de 20 ans d’expérience", "Fort d’une expérience accumulée depuis 2004"]],
    sections: [
      { cle: "sec0", titre: "Un film d’entreprise commence par une décision, pas par un tournage",
        corps: [
          { p: "Avant d’écrire, nous cherchons à savoir ce que ce film doit produire : convaincre un client, rassurer un investisseur, recruter, ou aligner des équipes qui ne se croisent jamais. Ces quatre objectifs ne donnent pas le même film." },
          { p: "Nous analysons aussi vos communications existantes et leurs résultats, pour décider si ce film doit s’inscrire dans un ensemble ou au contraire s’en détacher." },
        ] },
      { cle: "sec1", titre: "Ce qu’on maîtrise de bout en bout",
        corps: [
          { p: "Écriture, tournage, prise de son, montage, animation graphique, harmonisation des couleurs, sous-titrage et mise en ligne : chaque étape se fait ici, avec les mêmes interlocuteurs du premier rendez-vous à la diffusion." },
          { p: "Sur les retours, la règle est écrite dans nos propositions : ni limite rigide, ni forfait illimité, sous couvert du bon sens. Deux à trois points d’étape suffisent quand le storyboard a été validé sérieusement." },
        ] },
      { cle: "sec2", titre: "Ce que vous recevez, au-delà du film",
        corps: [
          { p: "Le film principal, ses déclinaisons courtes pour vos réseaux, les versions sous-titrées, et les fichiers finaux aux formats de vos supports — site, écrans internes, salon, présentation commerciale." },
          { p: "Les rushes tournés servent souvent au-delà du projet : ils alimentent vos publications pendant les mois qui suivent, sans nouveau tournage." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Combien coûte un film d’entreprise ?",
        reponse: "Le budget dépend surtout du nombre de jours de tournage, du nombre de lieux et de la part d’animation. Nous chiffrons le concept dès la conception, pour que vous sachiez à quoi vous engagez votre budget avant de le faire valider en interne." },
      { cle: "faq1", question: "Faut-il faire appel à des comédiens ?",
        reponse: "Pas systématiquement. Vos collaborateurs face caméra sont souvent plus convaincants qu’un comédien, à condition d’être préparés — nous prévoyons un temps de coaching avant le tournage, et cela change tout au résultat." },
      { cle: "faq2", question: "Combien de temps dure la production ?",
        reponse: "Comptez huit à douze semaines pour un film d’entreprise complet, dont trois à quatre pour l’écriture et la préparation. Une date d’événement se sécurise en remontant le calendrier depuis elle, jamais en partant d’aujourd’hui." },
    ],
  },

  "video-aerienne-drone": {
    id: "page-savoir-faire-video-aerienne-drone",
    seo: {
      titre: "Vidéo aérienne par drone et photogrammétrie | Bluevista",
      description: "Tournage vidéo et photo par drone sur sites industriels, chantiers et bâtiments, télépilotes déclarés et autorisations instruites en amont. Modèles 3D mesurables en option.",
    },
    sections: [
      /* ⭐ Récupéré de l'ancien site — le meilleur ratio du lot : 93 mots, presque
         tous des faits. ⛔ Les « GoPro 5 » ont été jetées : matériel de 2016. */
      {
        cle: "sec3",
        titre: "Le matériel, et pourquoi il est doublé",
        corps: [
          { p: "Nous volons avec une flotte de trois types d’appareils, montés et réglés par nos équipes selon ce que le tournage demande — un drone léger pour l’intérieur et les espaces contraints, un appareil plus lourd quand il faut porter une caméra de reportage." },
          { p: "Et nous emportons toujours un appareil de réserve. Un tournage aérien ne se rejoue pas : la panne se règle en changeant de machine, pas en reprogrammant la journée." },
        ],
      },
      { cle: "sec0", titre: "Ce qui se voit d’en haut et pas d’ailleurs",
        corps: [
          { p: "Le drone sert à donner l’échelle d’un site industriel, à suivre l’avancement d’un chantier, à montrer l’implantation d’un bâtiment dans son environnement, ou simplement à ouvrir un film sur un mouvement que rien d’autre ne permet." },
          { p: "C’est aussi la seule façon d’inspecter une toiture, une cheminée ou une structure en hauteur sans échafaudage ni nacelle." },
        ] },
      { cle: "sec1", titre: "Le cadre légal fait partie de la préparation",
        corps: [
          { p: "Voler au-dessus d’un site industriel, près d’un aéroport ou en zone urbaine demande des autorisations et des télépilotes déclarés. Nous instruisons ces démarches en amont et nous vous disons dès le repérage ce qui sera possible le jour du tournage." },
          { p: "C’est ce qui évite la situation la plus coûteuse : une équipe sur place et un vol interdit le matin même." },
        ] },
      { cle: "sec2", titre: "La photogrammétrie, quand il faut plus qu’une belle image",
        corps: [
          { p: "En multipliant les prises de vue selon un plan de vol calculé, on reconstruit un modèle 3D mesurable du site : volumes de stockage, surfaces de toiture, avancement d’un terrassement." },
          { p: "Le résultat n’est plus une image mais une donnée, réutilisable par vos équipes techniques et par nos infographistes pour les vues 3D du projet." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Peut-on filmer en drone au-dessus d’un site industriel ?",
        reponse: "Oui, avec l’accord de l’exploitant et une déclaration préalable selon la zone. Le délai d’instruction varie de quelques jours à plusieurs semaines près des aéroports ou des sites sensibles — c’est le point à ouvrir en premier dans le calendrier." },
      { cle: "faq1", question: "Que se passe-t-il s’il pleut le jour prévu ?",
        reponse: "Un drone ne vole pas sous la pluie ni au-delà d’un certain vent. Nous prévoyons donc une date de repli dès la planification, et nous organisons le reste du tournage pour qu’il puisse avoir lieu indépendamment du vol." },
      { cle: "faq2", question: "Vos télépilotes sont-ils déclarés et assurés ?",
        reponse: "Oui. Nos télépilotes sont formés et déclarés, et les vols sont couverts par notre responsabilité civile professionnelle. Les attestations sont fournies avec la proposition, la plupart des donneurs d’ordre industriels les demandent." },
    ],
  },

  "aftermovie-captation-evenementielle": {
    id: "page-savoir-faire-aftermovie-captation-evenementielle",
    seo: {
      titre: "Aftermovie et captation d’événement multicaméra | Bluevista",
      description: "Captation multicaméra et aftermovie de convention, salon ou soirée d’entreprise, avec montage sur place quand la vidéo doit être diffusée le soir même.",
    },
    sections: [
      { cle: "sec0", titre: "Ce qui sera filmé se décide avant l’événement",
        corps: [
          { p: "Un aftermovie réussi ne se sauve pas au montage : il se prépare en repérant le déroulé, en identifiant les trois ou quatre moments qui porteront le film, et en plaçant les caméras là où ils auront lieu." },
          { p: "Nous demandons donc le conducteur en amont, et nous le lisons comme un plan de tournage." },
        ] },
      { cle: "sec1", titre: "Le montage en direct, livré avant que les gens rentrent chez eux",
        corps: [
          { p: "Sur certains événements, nous montons pendant que l’événement se déroule : la vidéo est diffusée en clôture, devant les participants, ou publiée le soir même quand l’audience est encore attentive." },
          { p: "C’est un dispositif qui demande une équipe et une régie sur place, et qui change complètement la portée du film — un aftermovie livré trois semaines plus tard ne rencontre plus personne." },
        ] },
      { cle: "sec2", titre: "Une captation qui sert aussi après",
        corps: [
          { p: "Les conférences filmées en multicaméra deviennent des replays, des extraits pour vos réseaux et des supports de formation interne. La captation coûte peu de plus le jour même, et elle alimente vos publications pendant des mois." },
          { p: "Nous livrons donc à la fois le film court de l’événement et les interventions complètes, prêtes à être mises en ligne." },
        ] },
    ],
    faq: [
      /* ⭐ Récupéré de l'ancien site : le vocabulaire des formats, qui nomme des
         attentes réelles. ⛔ Les conseils génériques sur la durée ont été jetés :
         c'était le MÊME texte que sur la page film d'entreprise, à trois mots
         près — du quasi-doublon interne, et les deux pages sont enterrées. */
      { cle: "faq3", question: "Aftermovie, daily news, best of : quelle différence ?",
        reponse: "L’aftermovie raconte l’événement une fois qu’il est fini et sert à le prolonger. Le daily news sort chaque soir pendant un événement de plusieurs jours et entretient l’audience sur place. Le best of condense une édition entière, souvent pour annoncer la suivante. Le choix se fait avec la diffusion, pas après le tournage." },
      { cle: "faq0", question: "Quand recevons-nous l’aftermovie ?",
        reponse: "Sous une à deux semaines en fonctionnement normal, et le soir même en montage sur place. Le choix se fait au moment du devis, parce qu’il change la composition de l’équipe présente." },
      { cle: "faq1", question: "Combien de caméras pour couvrir un événement ?",
        reponse: "Deux suffisent pour une soirée simple : une caméra qui suit le déroulé, une seconde pour les réactions et les détails. À partir de trois, on couvre une scène et une salle sans manquer les moments simultanés." },
      { cle: "faq2", question: "Faut-il prévoir des autorisations pour filmer les participants ?",
        reponse: "Oui. Un affichage à l’entrée et une mention sur l’invitation suffisent le plus souvent, mais les personnes filmées en gros plan et les intervenants signent une autorisation. Nous fournissons les modèles avec la proposition." },
    ],
  },

  "creation-immersive-realite-virtuelle": {
    id: "page-savoir-faire-creation-immersive-realite-virtuelle",
    seo: {
      titre: "Réalité virtuelle et augmentée pour l’entreprise | Bluevista",
      description: "Création d’expériences en réalité virtuelle et augmentée pour les salons, la formation et la vente : conception, développement et parc de casques en interne.",
    },
    sections: [
      /* ⭐ Récupéré de l'ancien site : trois projets réels, absents du nouveau. */
      {
        cle: "sec3",
        titre: "Ce qu’on a déjà mis dans un casque",
        corps: [
          { p: "Pour le Vision Tour de Nikon, nous avons reconstitué le parcours de fabrication d’un verre de lunette en combinant prises de vue réelles et modélisation 3D, l’ensemble diffusé en réalité virtuelle. Chez Prats, le même sujet a été traité en vidéo 360, sur la ligne de production réelle." },
          { p: "Pour GF Machining Solutions, la visite virtuelle du site permet de parcourir les ateliers depuis un navigateur, avec les informations techniques accessibles à chaque poste." },
        ],
      },
      { cle: "sec0", titre: "On part de ce que le visiteur doit comprendre",
        corps: [
          { p: "Une expérience immersive se conçoit à partir d’une question simple : qu’est-ce que cette personne doit avoir compris en retirant le casque ? Le dispositif technique découle de cette réponse, jamais l’inverse." },
          { p: "C’est ce qui évite le travers le plus courant du secteur — une démonstration technologique impressionnante dont personne ne retient le message." },
        ] },
      { cle: "sec1", titre: "La durée d’une session décide de tout",
        corps: [
          { p: "Sur un salon, un visiteur accorde trois à cinq minutes ; en formation, il peut rester vingt minutes. Cette durée détermine le scénario, le nombre d’interactions et le nombre de casques nécessaires pour absorber le flux sans file d’attente." },
          { p: "Nous la fixons avec vous avant l’écriture, parce qu’elle change le budget autant que le contenu." },
        ] },
      { cle: "sec2", titre: "Essayer avant de promettre",
        corps: [
          { p: "Nous avons notre propre parc de casques et nous testons l’expérience sur de vrais visiteurs avant les vôtres, dans les conditions du lieu — debout, avec du bruit, sans mode d’emploi." },
          { p: "(Oui, on les met sur la tête des clients en réunion. Ça raccourcit beaucoup les débats.)" },
        ] },
    ],
    faq: [
      { cle: "faq3", question: "Sur quels casques et quels supports vos expériences fonctionnent-elles ?",
        reponse: "Nos productions 360 se lisent sur ordinateur, tablette et téléphone, et dans les casques du marché, Meta Quest compris. Le choix se fait selon l’usage : un casque pour un salon ou une formation, un navigateur quand l’expérience doit circuler par un simple lien." },
      { cle: "faq0", question: "Combien de casques faut-il prévoir sur un salon ?",
        reponse: "Le calcul part du flux attendu et de la durée de session : un casque permet environ dix passages par heure pour une expérience de cinq minutes, en comptant l’accueil et l’hygiène. Deux à quatre casques couvrent la plupart des stands." },
      { cle: "faq1", question: "L’expérience fonctionne-t-elle sans casque ?",
        reponse: "Oui, et c’est souvent utile de le prévoir : la même expérience se décline en version navigateur, consultable depuis un ordinateur ou une tablette. Vos commerciaux peuvent alors la montrer en rendez-vous, sans matériel." },
      { cle: "faq2", question: "Que devient l’expérience après l’événement ?",
        reponse: "Elle reste exploitable en interne — accueil de visiteurs, formation, salons suivants — et elle se met à jour quand votre produit évolue. C’est ce qui distingue un investissement d’une animation ponctuelle." },
    ],
  },

  "studio-fond-vert-compositing": {
    id: "page-savoir-faire-studio-fond-vert-compositing",
    seo: {
      titre: "Studio fond vert mobile et compositing | Bluevista",
      description: "Studio fond vert installé dans vos locaux pour vos prises de parole, tutoriels et formations : décors incrustés, versions multilingues et séries tournées en une journée.",
    },
    sections: [
      { cle: "sec0", titre: "Le studio se monte dans vos locaux",
        corps: [
          { p: "Le fond vert, les éclairages et la régie tiennent dans un véhicule : nous installons le dispositif dans une salle de réunion ou un hall, et vos intervenants tournent sur place entre deux rendez-vous." },
          { p: "C’est ce qui rend possible d’enregistrer huit prises de parole dans la journée, sans déplacer personne." },
        ] },
      { cle: "sec1", titre: "Ce que le fond vert permet et qu’un décor réel ne permet pas",
        corps: [
          { p: "Changer d’arrière-plan après le tournage, décliner la même prise en plusieurs langues ou plusieurs marques, incruster des schémas autour de l’intervenant, et remplacer une donnée devenue fausse sans refaire venir la personne." },
          { p: "C’est le format qui convient aux séries : formations, tutoriels, points d’actualité interne, où l’image doit rester identique d’un épisode à l’autre." },
        ] },
      { cle: "sec2", titre: "Le confort de l’intervenant décide de la qualité",
        corps: [
          { p: "La plupart des gens qui passent devant une caméra n’en ont pas l’habitude. Nous prévoyons un temps de préparation, un télésouffleur quand le texte est dense, et des prises courtes plutôt qu’une longue." },
          { p: "Le résultat se joue beaucoup plus là que dans le choix de la caméra." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Quelle surface faut-il prévoir dans nos locaux ?",
        reponse: "Une salle d’environ 30 m² avec 2,50 m sous plafond suffit pour un plan taille. Il faut surtout pouvoir occulter la lumière du jour et disposer de prises électriques — nous validons ces points au repérage." },
      { cle: "faq1", question: "Peut-on utiliser nos propres visuels en arrière-plan ?",
        reponse: "Oui, et c’est le plus fréquent : vos images d’usine, vos schémas ou votre décor de marque remplacent le vert. Ils se préparent avant le tournage, parce que leur cadrage détermine la place de l’intervenant dans l’image." },
      { cle: "faq2", question: "Combien de vidéos peut-on tourner en une journée ?",
        reponse: "Entre six et dix prises de parole de deux à trois minutes, en enchaînant les intervenants sur le même décor. Le facteur limitant est rarement la technique, c’est la disponibilité des personnes et la préparation de leur texte." },
    ],
  },

  "live-streaming-webtv": {
    id: "page-savoir-faire-live-streaming-webtv",
    seo: {
      titre: "Live streaming et web TV : diffusion en direct | Bluevista",
      description: "Diffusion en direct de vos conventions et conférences, en régie multicaméra et liaisons redondées, avec replay et web TV à votre marque. Événements hybrides depuis 2004.",
    },
    wp: { slug: "live-streaming-webtv", widget: "60d1f1a" },
    sections: [
      { cle: "sec0", titre: "Ce qui fait décrocher un spectateur à distance",
        corps: [
          { p: "Un spectateur en salle est captif ; un spectateur derrière un écran ferme l’onglet. Ce qui le fait partir n’est presque jamais la qualité de l’image : c’est de ne pas pouvoir lire les diapositives de l’intervenant, de subir le son de la sonorisation au lieu du son direct, et de rester sur un plan large pendant qu’il se passe quelque chose ailleurs." },
          { p: "Un événement hybride réunit deux publics qui ne suivent pas le même événement : celui de la salle et celui de la maison. Le second a besoin de plans plus serrés, d’un son propre et de temps morts plus courts. C’est pour cela que nous écrivons la diffusion avant l’événement et non après : ce qui sera filmé, pour qui, et sur quels canaux." },
        ] },
      { cle: "sec1", titre: "Ce qu’on installe, et ce que ça suppose de votre côté",
        corps: [
          { p: "Une régie, plusieurs caméras et un mélangeur : le direct se réalise pendant qu’il se tourne. On y ajoute les micros de salle, la reprise du son de la sonorisation, l’incrustation des titrages et des logos, et le renvoi des diapositives de l’intervenant dans l’image." },
          /* ⛔ La version précédente disait « Le reste tient en un mot : la
             redondance. » — phrase à chute, exactement la faute qui a fait
             rejeter trois versions de la page agence. Réécrite en phrase
             pleine, avec le bénéfice attaché. */
          { p: "Nous doublons ensuite tout ce qui peut lâcher — la connexion, l’encodeur — et un enregistrement local tourne en parallèle du flux, parce qu’un plan raté se refait au montage alors qu’une coupure de dix secondes en direct se voit de tout le monde." },
          { p: "De votre côté, il nous faut peu de choses, mais elles ne s’improvisent pas le matin même : un accès à la salle assez tôt pour câbler, une arrivée réseau dédiée ou l’autorisation d’utiliser la nôtre, et une personne qui connaît le déroulé et peut trancher pendant la diffusion." },
        ] },
      { cle: "sec2", titre: "Ce qu’il en reste après",
        corps: [
          { p: "Le direct terminé, l’enregistrement local sert de master, en qualité supérieure à ce qui a été diffusé. Nous le remettons en ligne pour le replay, et nous en tirons les extraits qui serviront ensuite sur vos réseaux, dans vos mails ou sur votre site." },
          { p: "Votre événement continue d’exister pour ceux qui n’y étaient pas." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Faut-il une connexion internet dédiée pour diffuser en direct ?",
        reponse: "C’est le plus confortable, mais ce n’est pas indispensable. Nous diffusons par la connexion du lieu quand elle est suffisante et que nous avons pu la tester à l’avance, avec notre propre liaison en secours. Sur les sites où le réseau est incertain, nous partons directement sur nos liaisons, agrégées ou par satellite." },
      { cle: "faq1", question: "Combien de caméras faut-il pour un live streaming ?",
        reponse: "Deux suffisent pour une conférence : un plan large et un plan serré sur l’intervenant. À partir de trois, on suit une table ronde sans temps mort et on récupère les réactions de la salle. Au-delà, c’est le déroulé qui décide du nombre, pas l’inverse." },
      { cle: "faq2", question: "Peut-on diffuser en privé, pour une audience choisie ?",
        reponse: "Oui. Selon le niveau demandé, cela va du lien non répertorié à une page protégée par mot de passe ou restreinte à une liste d’adresses. Nous en parlons tôt, parce que le choix du contrôle d’accès conditionne la plateforme de diffusion." },
    ],
    /* Le texte ajouté à l'ancien site WordPress, à la suite de l'intro. */
    ajout: [
      { h: "Ce qu’on diffuse le plus souvent" },
      { p: "Conventions et réunions d’entreprise, assemblées générales, conférences de presse, lancements de produit, tables rondes, remises de prix, compétitions sportives. Le format change, la contrainte ne change jamais : ça part à l’heure dite, et ça ne s’arrête pas." },
      { h: "Web TV : vos directs et vos vidéos au même endroit" },
      { p: "Une web TV réunit votre catalogue de vidéos et vos diffusions en direct sur une page à votre marque : un lecteur à vos couleurs, des rubriques qui suivent votre organisation, un accès libre ou réservé à ceux que vous choisissez. Nous l’assemblons sur des briques éprouvées — hébergement, lecteur, contrôle d’accès — pour que le budget parte dans vos contenus et dans la fiabilité du direct. Vous gardez la main sur ce que vous publiez, et vous voyez ce qui est regardé." },
    ],
  },

  /* ──────────────────────── MÉTIERS (balises seules) ────────────────────
     ⛔ POURQUOI CES TROIS PAGES N'ONT QUE DES BALISES ICI, ET POURQUOI LEURS
     TITRES NE SONT PAS « OPTIMISÉS » : ce sont des pages de VENTE, pas
     d'acquisition. Personne ne tape « immersion » dans Google — le registre le
     dit, et la mesure le confirme (ces trois pages n'existent pas encore sur
     l'ancien site, donc aucune demande à capter).

     👉 Le travail d'un titre ici n'est pas de RANGER, c'est d'être LISIBLE
     dans une page de résultats. Les H1 restent les accroches — « Des contenus
     qui font bouger vos indicateurs » — mais sorties de leur page, elles ne
     disent pas de quoi il s'agit. Un visiteur qui voit ça dans Google ne
     clique pas : il ne sait pas ce qu'il trouverait.

     ⚠️ Les savoir-faire sont cités dans les titres, et c'est assumé : une page
     de catégorie nomme ses enfants, ce n'est pas de la cannibalisation. La
     règle « ne pas reprendre les mots-clés des compétences » vise la page
     AGENCE, qui n'est pas leur parente. */

  "metier-film": {
    id: "page-metier-film",
    seo: {
      titre: "Communication & marketing — films, contenus courts, motion design | Bluevista",
      description: "Films d’entreprise, contenus pour les réseaux et motion design, avec la diffusion pensée avec eux. Toutes nos compétences intégrées, depuis 2004.",
    },
  },
  "metier-evenement": {
    id: "page-metier-evenement",
    seo: {
      titre: "Événementiel — captation, vidéo mapping, diffusion en direct | Bluevista",
      description: "Contenus scénographiés, captation multicaméra et diffusion en direct pour vos conventions et lancements. Ce qui passe à l’écran se fabrique avant le jour J.",
    },
  },
  "metier-immersion": {
    id: "page-metier-immersion",
    seo: {
      titre: "Immersion — réalité virtuelle, 360° et visites virtuelles | Bluevista",
      description: "Expériences immersives conçues à partir de ce que le visiteur doit comprendre : casque, salle ou navigateur. Faire essayer ce qu’on ne peut pas encore toucher.",
    },
  },

  /* ─────────────────────────── VILLES ─────────────────────────── */

  "studio-animation-3d-lyon": {
    id: "page-ville-studio-animation-3d-lyon",
    seo: {
      titre: "Studio d’animation 3D à Lyon | Bluevista",
      description: "Studio d’animation 3D à Lyon depuis 2004 : modélisation, animation et rendu réalisés sur place. Validations devant l’écran plutôt que par lien de visionnage.",
    },
    sections: [
      /* ⛔ « Notre studio est ici, pas ailleurs » — on n'écrit pas ce qu'on
         n'est pas. L'affirmation seule est plus forte que l'opposition. */
      { cle: "sp0", titre: "Le studio d’animation 3D est à Lyon, et il l’a toujours été",
        corps: [
          { p: "Bluevista est née à Lyon en 2004, et la modélisation, l’animation et le rendu s’y font depuis. Vous pouvez venir voir les images sur nos écrans plutôt que de les découvrir par un lien de visionnage." },
          { p: "C’est ce qui permet, sur un projet lyonnais, de caler une validation en fin de matinée et de repartir avec les corrections lancées l’après-midi." },
        ] },
      { cle: "sp1", titre: "Ce que la proximité change sur un projet 3D",
        corps: [
          { p: "Un film d’animation se joue sur des arbitrages visuels difficiles à décrire par écrit : une matière, une lumière, un rythme. Une demi-heure devant l’écran remplace trois échanges de mails et deux versions intermédiaires." },
          { p: "Pour les industriels de la région, s’ajoute l’accès au site : nous filmons la machine réelle le matin et nous l’intégrons à la 3D dans la semaine." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Peut-on visiter le studio avant de vous confier un projet ?",
        reponse: "Oui, et nous le proposons volontiers. Voir les projets en cours sur les écrans en dit plus long qu’un portfolio, et cela permet de rencontrer les personnes qui travailleront réellement sur le vôtre." },
      { cle: "faq1", question: "Travaillez-vous avec des clients hors de la région lyonnaise ?",
        reponse: "Régulièrement. La fabrication se fait à Lyon et les tournages se font là où sont vos sites : nos équipes se déplacent, en France comme à l’étranger. La proximité est un confort sur les validations, pas une condition." },
    ],
  },

  "studio-animation-3d-paris": {
    id: "page-ville-studio-animation-3d-paris",
    seo: {
      titre: "Studio d’animation 3D à Paris | Agence 3D Bluevista",
      description: "Animation 3D pour vos projets parisiens : modélisation, animation et rendu photo-réaliste ou stylisé, avec des équipes qui tournent sur vos sites.",
    },
    wp: { slug: "studio-animation-3d-paris", widget: "197acfd" },
    sections: [
      { cle: "sp0", titre: "Une équipe qui se déplace",
        corps: [
          { p: "Les prises de vues réelles qui viennent s’intégrer à la 3D se tournent sur place : chez vous, sur votre site de production ou sur votre salon. Le reste de la fabrication se fait en interne, et les points de validation se tiennent à distance ou en présentiel selon ce qui fait avancer le projet." },
          { p: "Sur les retours, la règle est écrite dans nos propositions : ni limite rigide, ni forfait illimité, sous couvert du bon sens. Deux à trois points d’étape suffisent quand le storyboard a été validé sérieusement — c’est pour cela que nous passons du temps dessus avant de lancer la fabrication." },
        ] },
      { cle: "sp1", titre: "Photo-réaliste ou stylisé : un choix, pas une contrainte",
        corps: [
          { p: "Le photo-réalisme demande du temps de calcul et de la précision de modèle. Il se justifie quand l’image doit tenir la comparaison avec une photographie du produit réel : un catalogue, une page produit, un stand de salon." },
          { p: "Un rendu stylisé coûte moins cher, se relit plus vite et fonctionne souvent mieux en communication interne ou sur les réseaux sociaux, où il faut être compris en trois secondes. Cette question se tranche au début du projet, avec vous, et non au moment de la livraison." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Pouvez-vous tourner à Paris et fabriquer ailleurs ?",
        reponse: "C’est le fonctionnement habituel : le tournage a lieu sur votre site parisien, la fabrication 3D se fait dans nos studios, et les validations se tiennent en visioconférence ou sur place selon ce qui fait avancer le projet." },
      { cle: "faq1", question: "Combien de temps pour un film en animation 3D ?",
        reponse: "Pour une à deux minutes, comptez six à dix semaines selon la complexité du modèle et le niveau de rendu. Le storyboard et la maquette animée occupent le premier tiers : c’est là que les décisions coûtent le moins cher." },
    ],
    ajout: [
      { h: "Ce que « studio d’animation 3D » veut dire, concrètement" },
      { p: "La chaîne complète est chez nous : modélisation, texturing, rigging, animation, éclairage, rendu et compositing. Quatre pôles travaillent sur le même projet — vidéo, son, infographie et développement — et c’est ce qui permet de reprendre un plan en cours de route sans repasser par un prestataire extérieur. Nos infographistes travaillent sous Blender, Cinema 4D et Unreal Engine selon ce que le projet demande." },
      { h: "Trois cas où l’animation 3D est la seule réponse" },
      { p: "Le produit qu’on ne peut pas filmer : trop grand pour un plateau, trop petit pour un objectif, pas encore fabriqué, ou visible seulement une fois l’appareil ouvert. Une animation 3D montre l’intérieur d’une machine sans la démonter." },
      { p: "Le geste technique : une procédure de montage, une intervention de maintenance, un protocole de sécurité. La 3D isole le mouvement utile et supprime tout ce qui distrait autour." },
      { p: "Ce qui n’a pas d’image : un flux de données, un principe physique, une architecture logicielle. Là, il n’y a rien à filmer — il faut fabriquer l’image." },
      { h: "La méthode, en sept temps" },
      { p: "Analyse, brainstorming, pré-production, production, post-production, conformation, débriefing. Le premier temps n’est pas technique : il regarde votre identité de marque au prisme de votre communication actuelle, pour décider si ce film doit s’inscrire dans un ensemble ou au contraire en sortir. Le dernier ouvre le suivant — c’est un cycle, pas un tunnel." },
    ],
  },

  "realisation-film-entreprise-lyon": {
    id: "page-ville-realisation-film-entreprise-lyon",
    seo: {
      titre: "Réalisation de film d’entreprise à Lyon | Bluevista",
      description: "Réalisation de films d’entreprise à Lyon depuis 2004, avec un studio fond vert qui s’installe dans vos locaux pour vos séries de prises de parole.",
    },
    sections: [
      /* ⛔ « Vingt ans de clients lyonnais » — c'est « depuis 2004 ». */
      { cle: "sp0", titre: "Des clients lyonnais depuis 2004",
        corps: [
          { p: "Industrie, santé, énergie, enseignement supérieur, collectivités : la plupart de nos films d’entreprise se tournent dans un rayon d’une heure autour de Lyon, et beaucoup pour des clients que nous suivons depuis plusieurs années." },
          { p: "Cela change surtout la préparation : nous connaissons déjà les sites, les contraintes d’accès et les personnes à prévenir, ce qui raccourcit d’autant le repérage." },
        ] },
      { cle: "sp1", titre: "Le studio fond vert s’installe dans vos locaux",
        corps: [
          { p: "Pour les prises de parole, nous montons le dispositif chez vous — fond vert, éclairages, régie — et vos intervenants tournent entre deux rendez-vous, sans avoir à se déplacer." },
          { p: "C’est le format qui rend possible une série de vidéos internes tournées en une seule journée." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Intervenez-vous en dehors de Lyon ?",
        reponse: "Oui, en France comme à l’étranger. La fabrication se fait à Lyon, les tournages se font là où sont vos sites. Les frais de déplacement figurent au budget dès la proposition, pour qu’il n’y ait pas d’écart au moment de la facture." },
      { cle: "faq1", question: "Combien de temps faut-il prévoir pour un film d’entreprise ?",
        reponse: "Huit à douze semaines pour un film complet, dont trois à quatre pour l’écriture et la préparation. Quand une date d’événement est fixée, nous remontons le calendrier depuis elle plutôt que depuis aujourd’hui." },
    ],
  },

  /* ⛔⛔ AUCUNE BALISE OPTIMISÉE POUR CETTE PAGE, ET C'EST DÉLIBÉRÉ.
     Sur douze mois elle fait ZÉRO clic pour plus de 1 100 impressions, toutes
     sur des requêtes genevoises — pendant que bluevista.ch se positionne et
     convertit sur les mêmes termes. Elle est destinée à être retirée au profit
     du site suisse : lui écrire un titre optimisé reviendrait à renforcer une
     page qu'on veut voir disparaître des résultats. */
  "realisation-video-geneve": {
    id: "page-ville-realisation-video-geneve",
    sections: [
      /* ⛔ « Une entité suisse, PAS une prestation transfrontalière » — on
         n'écrit pas ce qu'on n'est pas. L'affirmation suffit.
         ⚠️ Cette page FR sur Genève reste un point ouvert du cloisonnement,
         signalé à Giz : le sujet est stratégique, pas rédactionnel. */
      { cle: "sp0", titre: "Une facturation et des équipes en Suisse",
        corps: [
          { p: "Les projets suisses sont portés par notre entité genevoise : facturation locale, équipes qui interviennent sur l’ensemble du territoire, et interlocuteurs qui connaissent les usages de la région." },
          { p: "Pour vos services achats, cela veut dire un fournisseur suisse et un règlement en francs." },
        ] },
      { cle: "sp1", titre: "Les organisations internationales, un contexte à part",
        corps: [
          { p: "Filmer pour une organisation internationale demande des habitudes précises : accréditations et contrôles d’accès, tournages multilingues, versions sous-titrées en plusieurs langues, et validations qui passent par plusieurs services." },
          { p: "Nous produisons régulièrement dans ce cadre, et nous en tenons compte dès le calendrier — c’est presque toujours la validation, jamais le tournage, qui décide de la date de livraison." },
        ] },
    ],
    faq: [
      { cle: "faq0", question: "Facturez-vous en francs suisses ?",
        reponse: "Oui, les projets suisses sont facturés en francs par notre entité genevoise. Le budget vous est présenté dans cette monnaie dès la proposition, sans conversion à la livraison." },
      { cle: "faq1", question: "Produisez-vous des versions multilingues ?",
        reponse: "Régulièrement : voix off en plusieurs langues, sous-titrage, et déclinaisons du montage quand les textes à l’image changent. Cela se prépare dès le storyboard, parce que la durée d’une phrase varie d’une langue à l’autre." },
    ],
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   RENDUS
   ══════════════════════════════════════════════════════════════════════════ */

const echappe = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const versHtml = b => b.map(x => (x.h ? `<h3>${echappe(x.h)}</h3>` : `<p>${echappe(x.p)}</p>`)).join("\n");

/* ⚠️ Clés STABLES : une clé aléatoire ferait voir à Sanity un contenu neuf à
   chaque exécution, et l'historique du studio deviendrait illisible. */
const versBlocs = (blocs, prefixe) =>
  blocs.map((b, i) => ({
    _type: "block",
    _key: `${prefixe}${i}`,
    style: b.h ? "h3" : "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${prefixe}${i}s`, text: b.h ?? b.p, marks: [] }],
  }));

const mots = o =>
  [...(o.sections ?? []).flatMap(s => s.corps), ...(o.faq ?? []).map(f => ({ p: f.reponse }))]
    .map(b => (b.p ?? "").split(/\s+/).length)
    .reduce((a, b) => a + b, 0);

const env = {};
for (const l of fs.readFileSync(path.join(RACINE, ".env.local"), "utf8").split("\n")) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const API = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data`;

/**
 * ⛔⛔ LES NOMS DE CHAMPS VIENNENT DU SCHÉMA, PAS DE MA MÉMOIRE.
 * `sanity/schemas/page.ts` : une section porte `titre` + `paragraphes`
 * (blocs), une question porte `q` + `r` (texte SIMPLE, pas des blocs).
 *
 * ⚠️ LA FAUTE À NE PAS REFAIRE, commise le 10/08/2026 : j'avais écrit dans
 * `corps`, `question` et `reponse`. Sanity accepte n'importe quel champ sans
 * broncher, le script a affiché treize « ✓ », et le site n'affichait rien —
 * il lit `paragraphes` et `q`/`r`.
 * ⛔ Et mon contrôle interrogeait LES MÊMES CHAMPS QUE MON ÉCRITURE : il
 * confirmait donc ma propre erreur. **Un contrôle qui rejoue les hypothèses
 * de ce qu'il vérifie ne vérifie rien.** Le seul juge est le RENDU.
 *
 * ⛔ ON ÉCRIT LES TABLEAUX ENTIERS, pas des chemins `[_key=="…"]`. Quatre
 * pages n'avaient aucun tableau `sections` : le patch par clé ne matchait rien
 * et passait en silence. Écrire le tableau entier crée ce qui manque et
 * remplace ce qui existe — et fait disparaître au passage les champs parasites
 * de la première tentative.
 */
async function ecrireSanity(cle, o) {
  const patch = { id: o.id, set: {} };

  /* ⛔ ON N'ÉCRASE PAS `texte` : c'est le corps repris de l'ancien site, celui
     qui se positionne depuis des années. On remplit ce qui était VIDE. */
  /* ⚠️ `sections` est facultatif : les pages MÉTIER n'entrent ici que pour
     leurs balises, leur corps vit ailleurs. Écrire un tableau vide effacerait
     leur contenu. */
  if (o.sections) patch.set.sections = o.sections.map((s, i) => ({
    _key: s.cle,
    _type: "object",
    titre: s.titre,
    paragraphes: versBlocs(s.corps, `sc-${cle}-${i}-`),
  }));
  if (o.faq) {
    patch.set.faq = o.faq.map(f => ({ _key: f.cle, _type: "object", q: f.question, r: f.reponse }));
  }

  /* ⛔ LES BALISES NE SONT PAS DE LA VOIX. Le `<title>` porte le mot que les
     gens tapent — « studio animation 3D Lyon », « vidéo mapping » — même
     quand le corps de page parle de « projet ». C'est la seule entorse
     assumée au registre, et elle est explicite dans voix-marketing.md. */
  if (o.seo) {
    patch.set.titreSeo = o.seo.titre;
    patch.set.descriptionSeo = o.seo.description;
  }

  /* ⚠️ Corrections ponctuelles dans le corps hérité de l'ancien site. On n'y
     touche qu'au mot près : c'est l'actif de référencement. Ici la règle de
     marque « depuis 2004, jamais un nombre d'années ». */
  if (o.corrigeTexte) {
    const actuel = await fetch(
      `${API}/query/production?query=${encodeURIComponent(`*[_id=="${o.id}"][0].texte`)}`,
      { headers: { Authorization: `Bearer ${env.SANITY_TOKEN}` } }
    ).then(r => r.json());
    patch.set.texte = (actuel.result ?? []).map(b => ({
      ...b,
      children: (b.children ?? []).map(c => {
        let txt = c.text ?? "";
        for (const [de, vers] of o.corrigeTexte) txt = txt.split(de).join(vers);
        return { ...c, text: txt };
      }),
    }));
  }

  const r = await fetch(`${API}/mutate/production`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.SANITY_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch }] }),
  }).then(r => r.json());
  if (r.error) throw new Error(JSON.stringify(r.error).slice(0, 300));
  console.log(`   ✓ Sanity — ${o.id}`);
}

/**
 * ⛔ L'ORIGINAL VIENT DE LA SAUVEGARDE, jamais du contenu en ligne. Elementor
 * supprime les commentaires HTML à l'enregistrement : un marqueur posé dans la
 * donnée qu'on modifie n'est pas un marqueur, et la page avait fini par porter
 * les deux versions à la fois. La référence stable vit en dehors du système
 * qu'on modifie.
 */
async function ecrireWordpress(o) {
  const s = JSON.parse(fs.readFileSync(process.env.HOME + "/.mcp-secrets.json", "utf8"));
  const trouve = (x, k) =>
    x[k] ?? Object.values(x).filter(v => v && typeof v === "object").map(v => trouve(v, k)).find(Boolean);
  const BASE = trouve(s, "WP_BASE_URL").replace(/\/$/, "");
  const auth = "Basic " + Buffer.from(`${trouve(s, "WP_USER")}:${trouve(s, "WP_APP_PASSWORD")}`).toString("base64");
  const wp = async (c, opts = {}) => {
    const r = await fetch(`${BASE}/wp-json/wp/v2${c}`, {
      ...opts,
      headers: { Authorization: auth, "Content-Type": "application/json", ...(opts.headers || {}) },
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 200)}`);
    return j;
  };

  const sauvegarde = path.join(RACINE, `scripts/_sauvegarde-elementor-${o.wp.slug}.json`);
  if (!fs.existsSync(sauvegarde)) throw new Error(`sauvegarde absente pour ${o.wp.slug}`);
  const cherche = (els, id) => {
    for (const el of els || []) {
      if (el.id === id) return el;
      const r = cherche(el.elements, id);
      if (r) return r;
    }
  };
  const origine = cherche(JSON.parse(fs.readFileSync(sauvegarde, "utf8")), o.wp.widget).settings.editor;

  const page = (await wp(`/pages?slug=${o.wp.slug}&context=edit&_fields=id,meta`))[0];
  const data = JSON.parse(page.meta._elementor_data);
  const w = cherche(data, o.wp.widget);
  if (!w) throw new Error(`widget ${o.wp.widget} introuvable sur ${o.wp.slug}`);

  w.settings.editor =
    `${origine}\n${versHtml(o.ajout ?? [])}\n` +
    o.sections.map(s => `<h3>${echappe(s.titre)}</h3>\n${versHtml(s.corps)}`).join("\n") +
    (o.faq ? "\n<h3>Questions fréquentes</h3>\n" +
      o.faq.map(f => `<p><strong>${echappe(f.question)}</strong><br>${echappe(f.reponse)}</p>`).join("\n") : "");

  await wp(`/pages/${page.id}`, {
    method: "POST",
    body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
  });
  console.log(`   ✓ WordPress — ${o.wp.slug} (id ${page.id})`);
}

/* ══════════════════════════════════════════════════════════════════════════ */

let total = 0;
for (const [cle, o] of Object.entries(PAGES)) {
  const n = mots(o);
  total += n;
  console.log(`\n${cle} — ${n} mots ajoutés${o.wp ? " · + ancien site" : ""}`);
  if (!SANITY && !WORDPRESS) continue;
  if (SANITY) await ecrireSanity(cle, o);
  if (WORDPRESS && o.wp) await ecrireWordpress(o);
}
console.log(
  !SANITY && !WORDPRESS
    ? `\nSimulation — ${total} mots au total. Rien n'a été écrit.\n`
    : `\n${total} mots. ⚠️ Le texte ne se modifie QUE dans ce fichier.\n`
);
