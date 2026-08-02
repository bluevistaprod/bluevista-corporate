/**
 * LE PLAN DU SITE — source unique de vérité, créée le 02/08/2026.
 *
 * ⛔⛔ CE FICHIER EXISTE À CAUSE D'UN CONSTAT QUI A CHANGÉ L'ARCHITECTURE.
 *
 * La maquette partait de trois piliers — Communication & marketing,
 * Événementiel, Immersion. C'est le bon découpage COMMERCIAL, et c'est le
 * repositionnement voulu par Giz. Mais l'inventaire de la Search Console dit
 * autre chose sur l'endroit d'où vient le trafic :
 *
 *   /nos-competences/video-mapping/                    96 clics · 12 984 impr.
 *   /nos-competences/live-streaming-webtv/             85 clics ·  3 785 impr.
 *   /nos-competences/animation-3d/                     24 clics ·  1 908 impr.
 *   /nos-competences/motion-design/                    14 clics ·  9 455 impr.
 *   /nos-competences/aftermovie-captation-evenement/   10 clics ·  7 780 impr.
 *   /studio-animation-3d-lyon/                        159 clics · 15 005 impr.
 *   /studio-animation-3d-paris/                        54 clics · 17 984 impr.
 *   /realisation-film-entreprise-lyon/                 14 clics · 13 952 impr.
 *
 * Autrement dit : hors page d'accueil, la quasi-totalité du trafic entre par
 * des pages de COMPÉTENCE et des pages de VILLE — pas par des pages de
 * métier. Ces URL se positionnent parce que leur adresse, leur titre et leur
 * contenu portent le mot que les gens tapent : « vidéo mapping », « studio
 * animation 3D Lyon ».
 *
 * 👉 Remplacer ces pages par trois pages « pilier » reviendrait à échanger
 * huit expressions de recherche précises contre trois mots génériques.
 * C'est très exactement ce que Giz a interdit depuis le premier jour :
 * « je ne veux pas perdre de points de référencement ».
 *
 * D'OÙ TROIS NIVEAUX, ET NON UN :
 *   ① MÉTIER      — les trois piliers. Nouveaux. Ils portent le
 *                   repositionnement et la conversion.
 *   ② COMPÉTENCE  — une page par savoir-faire, en reprenant les adresses
 *                   existantes. C'est là que vit le référencement.
 *   ③ RÉALISATION — la preuve. Le plus gros volume de contenu du site.
 * Plus les pages de VILLE, qui croisent une compétence et un lieu.
 *
 * La colonne `ancienneUrl` n'est pas décorative : c'est elle qui produira le
 * plan de redirections au moment de la bascule. Toute page qui n'a pas son
 * ancienne adresse ici est une page dont on perdra l'historique.
 */

export type Metier = "film" | "evenement" | "immersion";

export type Competence = {
  /** Le segment d'URL — REPRIS TEL QUEL de l'ancien site. */
  slug: string;
  nom: string;
  /** Le métier auquel elle se rattache. */
  metier: Metier;
  /** Ce que la page doit dire, en une phrase. */
  accroche: string;
  /** Le problème du client qui arrive par cette recherche. */
  probleme: string;
  ce_qu_on_fait: string[];
  /**
   * LE TEXTE DE FOND — repris de l'ancien site, sur décision de Giz :
   * « vu qu'on est très proche de notre positionnement actuel, on peut
   * reprendre le texte de notre ancien site ».
   *
   * ⛔ C'est le bon choix, et pas seulement par économie. Ce texte est ce
   * qui fait remonter la page depuis des années. Le réécrire pour le plaisir
   * de le réécrire, c'est jeter un actif qui fonctionne — et Google met des
   * mois à refaire confiance à une page qui a tout changé d'un coup.
   * Le repositionnement se joue au NIVEAU MÉTIER, pas ici : ces pages
   * répondent à une recherche précise, elles n'ont pas à porter le discours.
   */
  texte?: string[];
  /**
   * LES SECTIONS DE FOND — ajoutées le 02/08/2026 pour les pages dont le
   * texte repris ne suffisait pas (sous 200 mots).
   *
   * ⛔ LA MATIÈRE VIENT DU CERVEAU, PAS DE MOI. Références de mapping,
   * modèle technique des gobos, chaîne de production, couche de service
   * commune aux offres : tout est sourcé dans `savoir/offres/catalogue.md`
   * et `savoir/reference/chaine-de-production.md`. Ce qui n'y était pas
   * n'est pas écrit.
   *
   * La forme suit ce que font les concurrents qui se positionnent : un
   * chapeau, puis des sections courtes avec un titre qui pose une question
   * qu'un client se pose vraiment, puis une FAQ. C'est ce qui capture les
   * recherches longues — « combien coûte un vidéo mapping », « faut-il une
   * autorisation pour un drone » — que les pages vitrines ratent toutes.
   */
  sections?: { titre: string; paragraphes: string[]; image?: string }[];
  faq?: { q: string; r: string }[];
  /**
   * ⚠️ LE VOLUME DU TEXTE REPRIS, mesuré le 02/08/2026. C'est la colonne qui
   * dit ce qu'il reste à faire, et elle est plus utile qu'un « à compléter »
   * générique — reprendre l'ancien texte ne suffit pas partout :
   *
   *   live-streaming-webtv                97 mots   🔴  85 clics/an
   *   studio-fond-vert-compositing       115 mots   🔴
   *   video-corporate-film-dentreprise   145 mots   🔴
   *   video-aerienne-drone               147 mots   🔴
   *   creation-immersive-realite-virt.   171 mots   🔴
   *   aftermovie-captation-evenement.    269 mots   🟡
   *   motion-design                      296 mots   🟡
   *   video-mapping                      ~380 mots  🟡
   *   animation-3d                       ~350 mots  🟡
   *
   * 👉 Sous 200 mots, une page ne se défend pas : Google la montre (le
   * streaming fait 3 785 impressions) mais ne la classe pas haut. Ces cinq
   * pages sont donc le meilleur retour sur temps d'écriture du chantier —
   * elles ont déjà l'audience, il leur manque la substance.
   */
  image: string;
  /** L'adresse actuelle, à rediriger. */
  ancienneUrl: string;
  /** Clics sur 12 mois — sert à prioriser la rédaction, pas à décorer. */
  clics: number;
};

export const COMPETENCES: Competence[] = [
  {
    slug: "video-mapping",
    nom: "Vidéo mapping",
    // Rattaché à l'ÉVÉNEMENTIEL et non à l'immersion : c'est le classement
    // du Canva « OFFRES BLUEVISTA 2026 ». Un mapping se vend avec un
    // événement, pas avec un casque.
    metier: "evenement",
    accroche:
      "Projeter sur un bâtiment, un objet ou un décor, et faire de sa surface un écran.",
    probleme:
      "Vous avez un lieu fort — une façade, un hall, une machine — et rien qui le mette en scène le soir de votre événement.",
    ce_qu_on_fait: [
      "Relevé et modélisation 3D du support",
      "Écriture et création graphique",
      "Calage optique sur site",
      "Régie et exploitation le jour J",
      "Captation du résultat",
    ],
    texte: [
      "Projeté sur un bâtiment, un vidéo mapping consiste à diffuser de la vidéo et de l’animation 2D ou 3D en tenant compte de l’architecture existante. Déformations du bâtiment ou création d’univers : il s’agit de créer un véritable spectacle visuel et immersif. Nous vous accompagnons de la création du storyboard jusqu’aux tests de projection sur maquette et à la diffusion.",
      "Bluevista, c’est des créations de vidéo mapping sur des événements majeurs. Que ce soit les 50 ans du fonds d’investissement du Koweït ou les Bocuse d’Or, nous sommes à même d’assurer tout type de projet. Des plus simples aux plus ambitieux, à Paris, à Lyon ou partout en France : confiez-nous votre architecture, et découvrez-la comme vous ne l’avez jamais vue.",
      "Notre travail ne se limite pas à concevoir et diffuser. Nous sommes régulièrement amenés à gérer plusieurs aspects d’un même événement — comme pour le Printemps de Lyon, où nous avons assuré à la fois la captation de l’événement, la réalisation du mapping et la captation de celui-ci, sans revoir aucune de ces prestations à la baisse.",
      "Grâce aux jeux de lumière et aux animations 2D et 3D, transformez vos bâtiments en œuvre d’art. Que votre vidéo mapping soit à Paris, Lyon ou Genève, nous donnerons à votre événement toute la mesure qu’il mérite.",
    ],
    image: "/media/px-mapping.jpg",
    ancienneUrl: "/nos-competences/video-mapping/",
    clics: 96,
  },
  {
    slug: "live-streaming-webtv",
    nom: "Live streaming & web TV",
    metier: "evenement",
    accroche:
      "Diffuser en direct, avec la fabrication d’un plateau et la fiabilité d’une régie.",
    probleme:
      "Une partie de votre public ne sera pas dans la salle. S’ils regardent un flux mal réalisé, ils décrochent en quatre minutes.",
    ce_qu_on_fait: [
      "Plateau et habillage graphique",
      "Régie multi-caméra",
      "Diffusion multi-plateformes",
      "Interaction avec le public à distance",
      "Rediffusion et extraits",
    ],
    image: "/media/px-pilier-evenementiel.jpg",
    texte: [
      "Via une simple connexion ADSL / 3G / 4G ou par satellite, nous diffusons en direct votre évènement vers nos serveurs de streaming vidéo dédiés. Notre plateforme webtv vous assure une diffusion accessible au plus grand nombre et un suivi précis de votre audience. Grâce à du matériel léger et mobile, nous pouvons intervenir depuis (presque) n’importe où dans le monde pour une diffusion vidéo haute résolution H.264. De la conférence privée à plusieurs milliers d’internautes connectés en même temps, nous vous accompagnons sur toutes les étapes de votre diffusion d’évènement en direct ou VOD sur internet.",
    ],
    sections: [
      {
        titre: "Ce qui fait décrocher un spectateur à distance",
        paragraphes: [
          "Quelqu’un qui suit votre événement depuis son bureau n’a pas la salle autour de lui : ni les voisins, ni l’écran géant, ni la pause café. Il a un onglet parmi douze. Tout ce qui est approximatif — un son qui souffle, un plan fixe qui dure, un intervenant hors cadre — lui donne une raison de fermer.",
          "C’est pour ça qu’un direct se réalise comme une émission, pas comme une captation. Plusieurs caméras, une régie qui choisit le bon plan au bon moment, un habillage graphique qui rappelle où l’on est et qui parle. Le spectacle est le même que dans la salle ; c’est la mise en scène qui change.",
        ],
        image: "/media/px-pilier-evenementiel.jpg",
      },
      {
        titre: "Ce qu’on installe, et ce que ça suppose de votre côté",
        paragraphes: [
          "Nous arrivons avec la régie, les caméras, le son et l’encodage. La diffusion part vers nos serveurs de streaming dédiés, puis vers la ou les plateformes que vous choisissez — votre site, LinkedIn, YouTube, un espace privé avec mot de passe.",
          "De votre côté, un seul point est vraiment critique : le débit montant. Une connexion filaire dédiée est toujours préférable au wifi de la salle, qui sera saturé par vos invités au moment précis où vous en aurez besoin. Nous prévoyons systématiquement un secours 4G, mais il sert de filet, pas de solution.",
        ],
      },
      {
        titre: "Ce qu’il en reste après",
        paragraphes: [
          "Un direct qui disparaît à la fin du direct est un investissement à moitié utilisé. La captation multicaméra sert ensuite au replay, aux extraits courts pour les réseaux, et à la version interne pour ceux qui n’étaient pas disponibles ce jour-là. C’est décidé avant, pas après : les formats verticaux se tournent différemment.",
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on diffuser en direct depuis un lieu sans connexion fiable ?",
        r: "Oui. Nous diffusons par ADSL, 4G agrégée ou satellite selon le site. Le repérage technique sert précisément à trancher ce point — c’est la première chose qu’on vérifie, avant même la scénographie.",
      },
      {
        q: "Combien de caméras faut-il ?",
        r: "Deux suffisent pour une conférence à un intervenant. Au-delà de trois personnes sur scène, ou dès qu’il y a une table ronde, trois deviennent nécessaires : sans quoi la régie n’a jamais le bon plan disponible au bon moment.",
      },
      {
        q: "Le direct peut-il être privé ?",
        r: "Oui, par mot de passe ou par lien non listé. C’est le cas courant pour une convention interne ou une assemblée générale.",
      },
    ],
    ancienneUrl: "/nos-competences/live-streaming-webtv/",
    clics: 85,
  },
  {
    slug: "animation-3d",
    nom: "Animation 3D",
    metier: "film",
    accroche:
      "Montrer ce qu’aucune caméra ne peut filmer : l’intérieur, l’invisible, le pas-encore-construit.",
    probleme:
      "Votre produit est technique, enterré, microscopique ou encore à l’état de plan. Le photographier ne sert à rien.",
    ce_qu_on_fait: [
      "Modélisation d’après vos plans ou fichiers CAO",
      "Animation et rendu",
      "Vues en coupe et éclatés techniques",
      "Intégration en prises de vues réelles",
      "Déclinaison en images fixes",
    ],
    texte: [
      "Un studio d’animation 3D pour chaque étape de la production d’un film. De la modélisation au rendu photo-réaliste ou cartoon, en passant par l’animation, le texturing et l’éclairage : Bluevista dispose de toute la chaîne de production, avec ou sans intégration dans un environnement réel, à Paris, Lyon ou Genève.",
      "Pour GF Machining Solutions, nous avons réalisé un film 3D complet présentant la DS Family, du storyboard jusqu’à la livraison. Avec l’ajout de prises de vues réelles, du compositing et de l’animation 2D, le film a su transmettre la qualité et la précision de la gamme.",
      "Pour ABB, nous avons réalisé un film 3D avec des personnages animés, pour présenter les composants de leurs disjoncteurs industriels de manière humoristique. Notre studio a marié la voix de nos comédiens aux mouvements labiaux des personnages.",
      "Depuis sa création en 2004, notre studio s’est toujours orienté vers les nouvelles technologies, et notamment la 3D. Tout a commencé avec 3DS Max, Maya et Cinema 4D — à une époque où il fallait s’armer de patience et travailler en fil de fer.",
    ],
    image: "/media/px-pilier-communication.jpg",
    ancienneUrl: "/nos-competences/animation-3d/",
    clics: 24,
  },
  {
    slug: "motion-design",
    nom: "Motion design",
    metier: "film",
    accroche:
      "Rendre lisible ce qui est complexe, en quelques secondes et sans plateau.",
    probleme:
      "Vous devez expliquer une offre, un chiffre ou un processus à des gens qui ne vous accorderont pas trois minutes.",
    ce_qu_on_fait: [
      "Écriture et scénarisation",
      "Direction artistique et illustration",
      "Animation et sound design",
      "Voix off et sous-titrage",
      "Formats courts pour les réseaux",
    ],
    image: "/media/px-methode-4.jpg",
    texte: [
      "Du crayon à la 3D, passant par l’animation 2D, nous maîtrisons les outils vous permettant de mettre en images le fruit de nos idées. Cette technique d’animation est au cœur de nos créations audiovisuelles depuis plusieurs années et nous permet de retranscrire la spécificité de chacun de vos projets. D’un style retro à une animation ultra moderne, notre agence de motion design s’adapte à chaque demande.",
      "Le motion traduit l’idée de créer un dialogue entre le sens et l’attention du spectateur. Tout l’intérêt du motion design réside dans le fait de capter l’attention et de guider le regard.",
      "Ici on s’attache à la recherche du beau, de la qualité et de l’aspect du motion design. Après avoir donné du sens à nos images, il est important de faire en sorte que leur apparence reflète la plus belle des visions et mettent en valeur le propos du film. En somme, c’est là tout le but de l’animation 2D. Découvrez plus en profondeur ces principes avec un très bon exemple qu’est notre film en animation 2D pour Veama :",
      "Nos studios de production vidéo à Lyon et à Paris possèdent aujourd’hui un panel très varié de création qui vous permettra de découvrir toutes les possibilités offertes par l’animation 2D. Rendez vous sur nos comptes Youtube et Vimeo pour visionner nos dernières créations ou sur nos réseaux sociaux pour rester au courant de nos dernières productions.",
      "Par conséquent, si la réalisation d’un motion design vous intéresse, le motion pourra traduire au mieux des informations didactiques ou informatives par le biais d’animations et de design précis. Ainsi, tout l’intérêt est de capter, de guider le regard pour transmettre une information de la meilleure des manières. Nous pourrons vous proposer de découvrir plus en profondeur ces principes avec de très bons exemples",
    ],
    ancienneUrl: "/nos-competences/motion-design/",
    clics: 14,
  },
  {
    slug: "aftermovie-captation-evenementielle",
    nom: "Aftermovie & captation",
    metier: "evenement",
    accroche:
      "Filmer votre événement, et en tirer de quoi communiquer jusqu’au suivant.",
    probleme:
      "Vous investissez des mois dans un événement qui dure une journée, et il n’en reste rien le lendemain.",
    ce_qu_on_fait: [
      "Captation multi-caméra",
      "Interviews de participants sur le vif",
      "Aftermovie monté à chaud",
      "Formats courts et verticaux",
      "Photothèque de l’événement",
    ],
    image: "/media/px-cas-worldskills.jpg",
    texte: [
      "Chez Bluevista, nous accompagnons une multitude d’entreprise dans leur communication vidéo. Grâce à notre savoir-faire en captation et montage, nous sommes capables de délivrer rapidement des films. Ces films sont alors forts en émotions et synthétisent toute l’ambiance de l’événement. Nous maitrisons toute la chaîne de production et sommes à même d’organiser efficacement la captation de tout événement en France ou partout dans le monde! Découvrez un court exemple de nos captations précédentes avec le Printemps :",
      "Chaque événement étant totalement différent, nous nous adaptons à chaque projet! Que ce soit en petite équipe ou sur des conventions à plusieurs milliers de personnes. Les mots ont leurs limites, découvrez plutôt quelques exemples de clients et événements que nous avons pu couvrir récemment !",
      "En septembre 2021, Koesio a mis en place un événement hors norme pour son changement de nom. Nous les avons accompagnés en réalisant un multitude de contenu diffusés à cet occasion ainsi que de multiples aftermovie / report de ce weekend riche en émotions! Comme souvent, le montage a été réalisé en direct et en parallèle de la captation. Bien que cet exercice soit périlleux, cela reste un bon moyen de délivrer une sensation d’instantanéité et de créer une surprise qui marquera les participants.",
      "En 2022, l’ agence CWT nous a fait confiance dans la captation et le montage retraçant l’événement des 100 ans de Valrhona. Nous les avons accompagnés en réalisant un aftermovie / report monté en direct !",
      "Autre anniversaire, nous avons travaillé avec l’agence Ludico pour retracer la soirée des 100ans de l’entreprise Crouzet. Un montage en direct, captation de la soirée et une réalisation vibrante !",
    ],
    ancienneUrl: "/nos-competences/aftermovie-captation-evenementielle/",
    clics: 10,
  },
  {
    slug: "creation-immersive-realite-virtuelle",
    nom: "Réalité virtuelle",
    metier: "immersion",
    accroche:
      "Faire vivre une situation impossible à montrer autrement — et mesurer ce qu’il en reste.",
    probleme:
      "Vous devez faire comprendre un lieu, un risque ou un geste à des gens qui ne peuvent pas s’y rendre.",
    ce_qu_on_fait: [
      "Conception du parcours et du scénario d’usage",
      "Captation 360° ou environnement 3D",
      "Développement de l’application",
      "Installation, casques et exploitation",
      "Statistiques de session",
    ],
    image: "/media/px-pilier-immersion.jpg",
    texte: [
      "Filmez et diffusez vos contenus en 360° pour présenter votre entreprise. Faites découvrir des lieux uniques ou sensibiliser votre audiences! Les sujets et applications sont infinis.",
      "Les projets uniques et sur mesure font parti de nos plus belles créations. Découvrez plus bas toutes ces possibilités mêlant 3D, photos et/ou installations techniques.",
      "Les showrooms sont une toute nouvelle façon de partager vos produits et services à vos prospects.",
      "Bluevista cherche toujours à repousser la limite de ses compétences et nos showrooms virtuels en sont un exemple flagrant! Notre idée est de proposer des solutions modernes et immersives dans l’ère du temps comme le Metaverse.",
      "La vidéo 360° permet une immersion complète dans un environnement, offrant au spectateur une expérience inédite et interactive. Bluevista allie la vidéo 360° à la 3D et au développement d’applications intuitives, pour effacer la limite entre monde virtuel et réalité. Pour mieux vous projeter dans cette univers de plus en plus présent dans nos quotidiens, nous vous proposons de jeter un œil sur notre vidéo immersive pour Cémoi :",
    ],
    sections: [
      {
        titre: "La technologie vient en dernier",
        paragraphes: [
          "La bonne question n’est pas « faut-il faire de la VR ». Elle est : que doit comprendre ou ressentir votre public, en combien de temps, et dans quelles conditions. Le casque, la 3D temps réel ou la 360° découlent de cette réponse — jamais l’inverse.",
          "Certains sujets ne gagnent rien à être immersifs. D’autres ne peuvent pas exister autrement : un lieu inaccessible, un geste technique dangereux, une machine qu’on ne peut pas déplacer sur un salon.",
        ],
        image: "/media/px-pilier-immersion.jpg",
      },
      {
        titre: "Ce qui décide de la réussite : la durée d’une session",
        paragraphes: [
          "Une expérience VR se juge sur une contrainte que personne n’anticipe : le nombre de personnes qui peuvent la vivre dans une journée. Trois minutes par visiteur et deux casques, c’est environ quarante personnes par heure en comptant l’accueil et l’hygiène. Sept minutes, et vous en faites la moitié.",
          "C’est pour ça que le parcours se conçoit avant les images, et qu’on le teste tôt sur de vraies personnes — y compris sur quelqu’un qui n’a jamais mis un casque, parce que c’est lui qui révèle les vrais problèmes.",
        ],
      },
      {
        titre: "Ce qu’on a livré",
        paragraphes: [
          "Pour l’UNESCO, une expérience VR installée sur casques dans l’exposition Dive into Heritage, en marge de la 47ᵉ session du Comité du patrimoine mondial, à Paris. Des écrans tactiles interactifs et une application maintenue depuis un an accompagnaient le parcours.",
          "Un dispositif immersif sans personne pour l’accompagner reste inutilisé : nous formons vos équipes d’accueil et assurons l’exploitation pendant toute la durée.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien de casques faut-il prévoir ?",
        r: "Cela dépend de la fréquentation attendue et de la durée de l’expérience, pas du budget. Nous calculons le débit visiteurs avec vous avant de concevoir quoi que ce soit.",
      },
      {
        q: "Faut-il quelqu’un en permanence sur le dispositif ?",
        r: "Oui, et c’est non négociable. Accueil, hygiène, aide au premier port du casque : sans accompagnement, un dispositif immersif est regardé mais pas vécu.",
      },
      {
        q: "Que devient l’expérience après l’événement ?",
        r: "Elle peut être redéployée en showroom, en salon, ou convertie en visite web accessible depuis un navigateur — c’est à décider en amont, la conception n’est pas la même.",
      },
    ],
    ancienneUrl: "/nos-competences/creation-immersive-realite-virtuelle/",
    clics: 9,
  },
  {
    slug: "studio-fond-vert-compositing",
    nom: "Studio fond vert & compositing",
    metier: "film",
    accroche: "Détourer, incruster, et poser vos intervenants où vous voulez.",
    probleme:
      "Vous avez besoin d’un décor que vous n’avez pas, ou d’une série de vidéos tournées le même jour dans dix contextes différents.",
    ce_qu_on_fait: [
      "Tournage sur fond vert",
      "Incrustation et compositing",
      "Décors virtuels 3D",
      "Habillage graphique",
      "Série de contenus en une seule journée",
    ],
    image: "/media/bv-production.jpg",
    texte: [
      "Grâce à notre studio fond vert mobile, nous pouvons monter un fond vert dans vos locaux. Nous nous déplaçons avec tout l’équipement nécessaire, tel que : Toile de fond vert Eclairage Caméra 4K Micro cravate HF Prompteur L’intérêt du fond vert vient avant tout de créer de manière plus facile et de réduire les impossibles. Cette méthode de captation permet deux choses primordiales que sont de tricher la réalité et de pouvoir embellir vos vidéos.",
      "Découvrez la multitude de possibilités accordée par le fond vert. Des projets originaux qui vous permettront de sublimer vos idées par une réalisation nouvelle! Retrouvez aussi nos réalisations en fond vert et compositing sur nos réseaux sociaux, et nos sites vidéos",
    ],
    sections: [
      {
        titre: "Le studio vient à vous",
        paragraphes: [
          "Notre studio fond vert est mobile. Nous montons la toile, l’éclairage, la caméra 4K, les micros HF et le prompteur dans vos locaux — une salle de réunion vidée suffit. L’intérêt n’est pas seulement pratique : vos intervenants sont sur leur lieu de travail, ils n’ont pas perdu une demi-journée en déplacement, et ils sont infiniment plus disponibles.",
          "Le prompteur change tout pour des gens qui ne sont pas comédiens. Il évite les vingt-cinq prises, la fatigue et le message qui se délite au fil des essais. Ce qui coûte cher sur un tournage de dirigeants, ce n’est pas la caméra, c’est le temps.",
        ],
        image: "/media/bv-production.jpg",
      },
      {
        titre: "Ce que le fond vert permet, et que le décor réel ne permet pas",
        paragraphes: [
          "Un décor qui n’existe pas, ou qui coûterait un voyage. Une série de dix vidéos tournées le même jour dans dix contextes visuels différents. Un habillage graphique qui entoure l’intervenant au lieu de se poser par-dessus. Une charte qui reste identique quand le film sera refait dans deux ans.",
          "C’est aussi ce qui permet d’assumer une série : quand la production d’une vidéo supplémentaire ne coûte qu’un passage devant la toile, la question n’est plus « peut-on se le permettre » mais « qu’est-ce qu’on a à dire ».",
        ],
      },
    ],
    faq: [
      {
        q: "De quelle place avez-vous besoin ?",
        r: "Une salle d’environ 5 mètres sur 4, sans fenêtre derrière l’intervenant si possible. Nous faisons le repérage en amont : c’est plus rapide qu’il n’y paraît, une photo de la pièce suffit souvent à trancher.",
      },
      {
        q: "Les intervenants doivent-ils apprendre leur texte ?",
        r: "Non. Le prompteur est là pour ça. Nous préparons le texte avec vous en amont, et il est réécrit pour être dit à voix haute — un texte écrit pour être lu ne se prononce pas.",
      },
      {
        q: "Peut-on tourner plusieurs sujets dans la journée ?",
        r: "C’est même le cas le plus fréquent. Une journée de studio permet couramment de tourner cinq à huit sujets courts si les textes sont prêts.",
      },
    ],
    ancienneUrl: "/nos-competences/studio-fond-vert-compositing/",
    clics: 4,
  },
  {
    slug: "video-aerienne-drone",
    nom: "Vidéo aérienne & drone",
    metier: "film",
    accroche: "Prendre de la hauteur, légalement, y compris en ville.",
    probleme:
      "Votre site, votre chantier ou votre événement ne se comprend qu’à condition de le voir en entier.",
    ce_qu_on_fait: [
      "Pilotes déclarés et scénarios autorisés",
      "Demandes d’autorisation de survol",
      "Prises de vues aériennes 4K",
      "Intérieur au drone léger",
      "Photogrammétrie et modèles 3D",
    ],
    image: "/media/px-methode-2.jpg",
    texte: [
      "BLUEVISTA réalise des prises de vue vidéo aériennes par drone en intérieur et extérieur, et partout en France que ce soit en agglomération ( Paris, Lyon, Genève, etc) ou en zone rurale. Pour mettre en valeur vos sujets que ce soit votre entreprise, une inauguration ou une convention, la prise de vue en drone saura donner une nouvelle dimension à vos films.",
      "Voici une photographie en drone de l’entreprise Koesio (ex C’PRO) sur leur nouveau site Eole.",
      "Grâce à nos différentes offres de services drones, plus personne ne vous prendra de haut! Profitez de vos rencontres dans nos agence à Lyon, Paris et Genève pour découvrir les possibilités de nos drones.",
      "Réaliser un film ne s’improvise pas, c’est pourquoi Bluevista dispose de la double compétence réalisation et pilotage.",
      "Autorisation annuelle préfectorale S3 en région Rhône-Alpes et dans de nombreux départements du SUD-EST de la France et DOM-TOM.",
    ],
    sections: [
      {
        titre: "Ce qui se voit d’en haut et pas d’ailleurs",
        paragraphes: [
          "Un site industriel, un chantier, un domaine viticole ou un événement en plein air ne se comprennent qu’à condition d’en voir l’étendue. Au sol, on montre un bâtiment ; à trente mètres, on montre une implantation. C’est souvent la différence entre « ils ont un atelier » et « ils ont un outil industriel ».",
          "Le drone sert aussi à l’intérieur, avec un appareil léger : traverser une ligne de production d’un bout à l’autre en un seul plan raconte l’enchaînement des étapes mieux que dix plans de coupe.",
        ],
        image: "/media/px-methode-2.jpg",
      },
      {
        titre: "Le cadre légal, et pourquoi il vous concerne",
        paragraphes: [
          "Voler au-dessus d’un site, et surtout en zone peuplée, se déclare. Selon la zone, l’autorisation prend de quelques jours à plusieurs semaines — en agglomération dense ou près d’un aéroport, c’est le facteur qui décide de la date de tournage, pas la météo.",
          "Nous nous chargeons des scénarios, des déclarations et des demandes de survol. Le seul point qui vous revient : nous prévenir tôt. Une demande déposée trois jours avant un événement ne se rattrape pas, et c’est la cause la plus banale d’un plan aérien qui saute.",
        ],
      },
      {
        titre: "La photogrammétrie, quand il faut plus qu’une belle image",
        paragraphes: [
          "En multipliant les prises de vue sous des angles calculés, on reconstruit un modèle 3D fidèle du bâtiment ou du site. Ce modèle sert ensuite ailleurs : dans une animation 3D, dans une visite virtuelle, ou comme base d’un vidéo mapping sur la façade relevée. C’est le même vol qui alimente plusieurs livrables.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il une autorisation pour filmer mon site ?",
        r: "Presque toujours, dès qu’on est en zone habitée. Nous nous en occupons — mais prévoyez le délai : de quelques jours à plusieurs semaines selon la zone.",
      },
      {
        q: "Le vent ou la pluie peuvent-ils annuler le tournage ?",
        r: "Oui, et c’est la raison pour laquelle un plan aérien ne se planifie jamais comme unique séquence indispensable d’un film. On prévoit une fenêtre, pas une heure.",
      },
      {
        q: "Peut-on voler à l’intérieur d’un bâtiment ?",
        r: "Oui, avec un drone léger. C’est même souvent plus spectaculaire qu’à l’extérieur, et cela ne demande pas les mêmes autorisations.",
      },
    ],
    ancienneUrl: "/nos-competences/video-aerienne-drone/",
    clics: 2,
  },
  {
    slug: "video-corporate-film-dentreprise",
    nom: "Film d’entreprise",
    metier: "film",
    accroche:
      "Le film qui dit qui vous êtes — à vos clients, à vos candidats, à vos équipes.",
    probleme:
      "On vous demande « une vidéo de présentation » sans que personne n’ait tranché à qui elle parle ni ce qu’elle doit obtenir.",
    ce_qu_on_fait: [
      "Cadrage des objectifs et de la cible",
      "Écriture et interviews",
      "Tournage sur vos sites",
      "Montage, habillage, sous-titres",
      "Déclinaisons courtes",
    ],
    image: "/media/px-methode-5.jpg",
    texte: [
      "Bluevista met tout en œuvre pour donner à cette réalisation classique le piment qui fera la différence! N’hésitez pas à découvrir un de nos exemples de réalisations avec le film d’entreprise de notre client Carso : Toutes nos réalisations sont disponibles sur nos réseaux sociaux :",
      "Fort de plus de 20 ans d’expérience, nous avons maintenant une large panoplie d’expériences qui vous permettront de trouver le ton et l’axe pour transmettre, vos idées et représentés vos produits, vos services, votre entreprise et vos projets! Nos agences de Lyon, Paris et Genève vous assurent une proximité pour la réalisation de votre vidéo corporate.",
      "Votre communication est au centre de votre image et influence votre travail. Nous nous chargeons de vous fournir les conseils et le savoir-faire de notre équipe pour développer la communication qui fera la différence! Chaque film d’entreprise est différent, créez le votre et démarquez vous !",
    ],
    sections: [
      {
        titre: "Le problème n’est presque jamais le film",
        paragraphes: [
          "On nous demande « une vidéo de présentation ». Neuf fois sur dix, personne n’a tranché à qui elle parle. Un film qui s’adresse à la fois aux clients, aux candidats, aux banques et aux équipes ne parle à personne — et c’est le seul défaut qu’aucun budget de tournage ne rattrape.",
          "La première étape de notre méthode existe pour ça : on challenge le brief avant d’y répondre. Un concept n’est retenu que si le message est clair, s’il parle à une cible identifiée, et si nous sommes fiers de le produire.",
        ],
        image: "/media/px-methode-5.jpg",
      },
      {
        titre: "Ce qu’on maîtrise de bout en bout",
        paragraphes: [
          "Conception, storyboard, tournage, montage, motion design, animation 3D. Nos quatre pôles — vidéo, son, infographie, développement — sont internes : ce qui est conçu et ce qui est fabriqué ne se découvrent pas à la livraison.",
          "En pratique, ça veut dire qu’une idée qui demande une animation 3D au milieu d’un film tourné en décor réel ne déclenche pas une négociation entre deux prestataires. C’est la même équipe, dans le même budget.",
        ],
      },
      {
        titre: "Ce que vous recevez, au-delà du film",
        paragraphes: [
          "Un film d’entreprise n’a pas une vie, il en a plusieurs : la version longue pour le site, une version courte pour un salon, des extraits verticaux pour les réseaux, une version sous-titrée pour l’accessibilité et pour la lecture sans son. Ces déclinaisons se décident avant le tournage, parce qu’elles changent la façon de cadrer.",
          "Et après diffusion, nous revenons avec ce que les chiffres disent : où les spectateurs décrochent, quels formats ont porté. C’est ce qui nourrit le film suivant.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps dure la production d’un film d’entreprise ?",
        r: "Comptez six à dix semaines entre le premier atelier et la livraison, dont une bonne moitié avant le tournage. C’est la préparation qui décide de tout le reste.",
      },
      {
        q: "Faut-il faire appel à des comédiens ?",
        r: "Rarement pour un film corporate. Vos équipes sont plus crédibles que des comédiens — à condition d’être préparées, et c’est notre travail de les mettre à l’aise.",
      },
      {
        q: "Peut-on réutiliser le film dans deux ans ?",
        r: "Si on l’a conçu pour. Éviter de dater le film — pas de chiffres d’exercice, pas de mention d’une organisation qui va changer — allonge sa durée de vie de plusieurs années.",
      },
    ],
    ancienneUrl: "/nos-competences/video-corporate-film-dentreprise/",
    clics: 1,
  },
];

/**
 * LES PAGES DE VILLE.
 *
 * 227 clics à elles seules, soit davantage que toutes les pages de
 * compétence réunies hors mapping et streaming. Elles répondent à une
 * intention précise — « studio animation 3D lyon » — et ce sont les pages
 * les plus fragiles de la refonte : leur valeur tient à l'adresse et au
 * titre, pas au design.
 *
 * ⛔ NE PAS LES FONDRE dans les pages de compétence, et ne pas se contenter
 * d'y dupliquer le texte de la compétence en changeant le nom de la ville :
 * Google traite ça comme du contenu quasi dupliqué et déclasse l'ensemble.
 * Chacune doit porter des réalisations locales et des mentions de lieux réels.
 */
export type PageVille = {
  slug: string;
  /**
   * CE QUI REND CETTE PAGE UNIQUE — la seule parade au contenu dupliqué.
   *
   * ⛔ Les projets nommés sont SOURCÉS dans le cerveau
   * (savoir/offres/catalogue.md, verbatim visio OIM du 21/07/2026). Rien
   * n'est inventé : un projet attribué à la mauvaise ville est une
   * contre-vérité qu'un client local repère immédiatement.
   *
   * 👉 C'est le seul contenu qui ne peut exister QUE sur cette page. Le
   * reste — la description du savoir-faire — est forcément commun d'une
   * ville à l'autre, et c'est précisément pour ça qu'il ne suffit pas.
   */
  specificites?: { titre: string; texte: string }[];
  projets?: string[];
  /**
   * Le texte de l'ancienne page, repris tel quel — même règle que pour les
   * compétences : c'est lui qui fait remonter la page.
   *
   * ⚠️ MAIS IL EST À RELIRE PLUS SÉRIEUSEMENT ICI. Ces pages ont été
   * fabriquées par duplication : la page GENÈVE demande « envie de travailler
   * avec une boîte de prod lyonnaise ? », et les pages Lyon et Paris
   * partagent des paragraphes au caractère près. C'est exactement le contenu
   * quasi dupliqué qui empêche le groupe de monter — et la raison pour
   * laquelle Paris plafonne à 54 clics pour 17 984 impressions.
   */
  texte?: string[];
  titre: string;
  ville: string;
  competence: string;
  ancienneUrl: string;
  clics: number;
};

export const VILLES: PageVille[] = [
  {
    slug: "studio-animation-3d-lyon",
    titre: "Studio d’animation 3D à Lyon",
    ville: "Lyon",
    competence: "animation-3d",
    texte: [
      "Un studio d’ animation 3D pour chaque étape de la production d’un film. De la modélisation au rendu photo-réaliste ou cartoon en passant par l’animation, le texturing, l’éclairage… Bluevista dispose de toute la chaine de production pour la réalisation d’ animation 3D avec ou sans intégration dans un environnement réel sur Paris, Lyon ou Genève. D’une simple animation technique à un film 3D de prestige ou bien même une animation interactive profitant des dernières technologies de VR et de réalité augmentée, nos équipes de spécialistes seront à vos côtés.",
      "Pour l’entreprise GF Machining Solutions, nous avons réaliser un film 3D complet présentant la DS Family. En tant que studio d’animation 3D, nous avons accompagné GF Machining Solutions du storyboard jusqu’à la livraison du film. Avec l’ajout de prises de vues réelles, un peu de compositing et l’ajout d’ animation 2D, le film a su transmettre toute la qualité et la précision de la DS Family.",
      "L’ entreprise ABB, nous a demandé de réaliser un film 3D comprenant des personnage animés en 3D. L’idée ? Présenter les composants électroniques de leurs différents disjoncteurs industriels de manière humoristique et différente. Notre studio d’ animation 3D a su marier la voix de nos comédiens aux mouvements labiales des personnages Avec l’ajout de prises de vues réelles, un peu de compositing et l’ajout d’ animation 2D, le film a su transmettre la praticité des contacteur ABB.",
      "Depuis sa création en 2004, notre studio d’animation à Lyon s’est toujours orienté vers les nouvelles technologies et notamment la 3D. Tout a commencé avec les logiciels 3DSMax, Maya et Maxon Cinema4D. A cette époque, l’animation 3D n’était pas aussi simple qu’on la connait aujourd’hui et il fallait s’armer de patience. De la patience pour créer, souvent avec une visualisation en wireframe (des fils de fer représentant le maillage structurel des objets). De la patience pour animer, avec de nombreuses clefs d’animation à placer à la main. Et de la patience pour voir une image « rendue » avec de nombreuses heures de calculs pour un rendu de qualité. Les « moteurs » de rendu utilisés en 2004 étaient des moteurs « CPU » (c’est à dire sur le processeur du PC). Ce type de calcul était très chronophage. Au fur et à mesure des avancées technologiques, nous avons utilisé d’autres moteurs de rendu basés sur la carte graphique (GPU) ainsi que de nouveaux logiciels tels que Blender, Unreal Engine… Les outils évoluant, notre studio d’animation les a expérimentés, permettant des projets ambitieux tels qu’un showroom virtuel pour la société GFMS. Ici, le défi consistait plutôt à faire entrer dans nos logiciels des modélisations 3D très complexes représentant de lourds fichiers. Forts de ces 20 années d’expertise, nous sommes aujourd’hui à même de proposer un large panel de services en animation 3D, autant sur des aspects très techniques avec de lourdes machines industrielles que sur ce que l’on aime également faire en tant qu’artistes, animer des personnages, des décors et faire rêver.",
      "L’animation 3D est au cœur de nos films. Que ce soit un rendu photo-réaliste ou un cartoon, nous saurons donner vie à votre projet !",
    ],
    specificites: [
      {
        titre: "Notre studio est ici, pas ailleurs",
        texte:
          "Bluevista est née à Lyon en 2004, et l’équipe 3D y travaille depuis. Ce n’est pas une agence parisienne avec une adresse de domiciliation lyonnaise : la modélisation, l’animation et le rendu se font dans nos locaux, avec des gens que vous pouvez venir voir.",
      },
      {
        titre: "Ce que ça change pour un projet lyonnais",
        texte:
          "Une session de validation autour d’un écran vaut dix allers-retours par mail — surtout sur de la 3D, où l’on discute d’un matériau, d’un angle ou d’une lumière. Pour nos clients de la métropole, cette séance se cale dans une matinée.",
      },
    ],
    projets: [
      "InterContinental Lyon — mapping sur dôme et façade, au Grand Hôtel-Dieu",
      "Printemps de Lyon — scénographie, mapping et captation de l’événement",
      "Bocuse d’Or — dispositif vidéo",
      "EUROSONO — mapping immersif au H7",
    ],
    ancienneUrl: "/studio-animation-3d-lyon/",
    clics: 159,
  },
  {
    slug: "studio-animation-3d-paris",
    titre: "Studio d’animation 3D à Paris",
    ville: "Paris",
    competence: "animation-3d",
    texte: [
      "Un studio d’ animation 3D pour chaque étape de la production d’un film. De la modélisation au rendu photo-réaliste ou cartoon en passant par l’animation, le texturing, l’éclairage… Bluevista dispose de toute la chaine de production pour la réalisation d’ animation 3D avec ou sans intégration dans un environnement réel sur Paris, Lyon ou Genève. D’une simple animation technique à un film 3D de prestige ou bien même une animation interactive profitant des dernières technologies de VR et de réalité augmentée, nos équipes de spécialistes seront à vos côtés.",
      "Pour l’entreprise Elistair, nous avons réaliser un film 3D complet présentant le drone Orion et ses fonctionnalités. En tant que studio d’animation 3D, nous avons accompagné Elistair du storyboard jusqu’à la livraison du film. Avec l’ajout de prises de vues réelles, un peu de compositing et l’ajout d’ animation 2D, le film a su transmettre toute la qualité et la précision du drone Orion.",
      "L’ entreprise ABB, nous a demandé de réaliser un film 3D comprenant des personnage animés en 3D. L’idée ? Présenter les composants électroniques de leurs différents disjoncteurs industriels de manière humoristique et différente. Notre studio d’ animation 3D a su marier la voix de nos comédiens aux mouvements labiales des personnages Avec l’ajout de prises de vues réelles, un peu de compositing et l’ajout d’ animation 2D, le film a su transmettre la praticité des contacteur ABB.",
      "L’animation 3D est au cœur de nos films. Que ce soit un rendu photo-réaliste ou un cartoon, nous saurons donner vie à votre projet !",
    ],
    specificites: [
      {
        titre: "Une équipe qui se déplace, pas une adresse",
        texte:
          "Nous n’avons pas de studio parisien et nous ne prétendons pas en avoir un. Nos équipes montent régulièrement pour les tournages, les repérages et les installations — et la fabrication 3D se fait à Lyon, ce qui n’a jamais posé de difficulté à nos clients parisiens.",
      },
      {
        titre: "Ce qu’on y a installé",
        texte:
          "Nos projets parisiens sont majoritairement de l’immersif et du monumental : c’est là que se trouvent les institutions et les lieux qui s’y prêtent. La 3D y sert souvent de matière première à un dispositif plus large plutôt que de livrable final.",
      },
    ],
    projets: [
      "UNESCO — expérience VR et écrans tactiles, exposition Dive into Heritage",
      "Musée Rodin — motion design 3D et mapping",
      "Grande Arche de la Défense — animation 3D",
    ],
    ancienneUrl: "/studio-animation-3d-paris/",
    clics: 54,
  },
  {
    slug: "realisation-film-entreprise-lyon",
    titre: "Réalisation de film d’entreprise à Lyon",
    ville: "Lyon",
    competence: "video-corporate-film-dentreprise",
    texte: [
      "Notre agence vidéo à Lyon réalise des films d’entreprise déjà plus de 15ans. Nous sommes présent sur toutes les étapes de production : conception, storyboard, tournage, montage, motion design, animation 3D. Nos studios gèrent et réalisent l’entièreté de votre film d’entreprise à l’aide de notre set de matériel haut de gamme ainsi que de nos équipes de spécialistes. Quelle que soit le projet, de la simple interview au film corporate complet, nous pouvons vous accompagner et répondre à vos besoins. bluevista n’est pas qu’une « boite de prod », nous sommes une société de production vidéo à Lyon prête à vous accompagner dans tous vos projets. Que ce soit pour de la prise de vue, du motion design, du drone ou de l’animation 3D.",
      "Envie de nous suivre nous et notre travail ? Envie de travailler avec une boite de prod lyonnaise ? Suivez nous sur nos réseaux sociaux !",
      "Mais qui sommes nous ? Bluevista est une agence de communication vidéo lyonnaise mêlant les savoir-faire au profit de votre communication, notre expertise au service de votre vidéo promotionnelle.",
    ],
    specificites: [
      {
        titre: "Vingt ans de clients lyonnais",
        texte:
          "La plupart de nos films d’entreprise se tournent dans la région : sites industriels, sièges sociaux, laboratoires. L’avantage est prosaïque — un repérage se fait en une heure, et un tournage qui déborde ne coûte pas une nuit d’hôtel à toute l’équipe.",
      },
      {
        titre: "Le studio fond vert se déplace dans vos locaux",
        texte:
          "Pour une série d’interviews de dirigeants, nous montons le studio chez vous plutôt que de faire venir dix personnes à tour de rôle. Sur Lyon et sa métropole, c’est souvent la formule la plus rapide : une journée sur place, cinq à huit sujets tournés.",
      },
    ],
    projets: [
      "Clasquin — convention annuelle au Palais de la Bourse",
      "Irisolaris — film corporate tourné sur site",
      "Lyon La Duchère — captation de saison",
    ],
    ancienneUrl: "/realisation-film-entreprise-lyon/",
    clics: 14,
  },
  {
    slug: "realisation-video-geneve",
    titre: "Réalisation vidéo à Genève",
    ville: "Genève",
    competence: "video-corporate-film-dentreprise",
    texte: [
      "Nous maitrisons tous les stades de réalisation et production vidéo : conception, storyboard, tournage, montage, motion design, animation 3D. Nos équipes se déplacent sur l’ensemble du territoire suisse pour la réalisation de votre vidéo d’entreprise avec du matériel haut de gamme et des experts dans leur domaine. Nous adaptons nos équipes à toute taille de projet. Qu’il s’agisse d’une simple interview en région genevoise face au jet d’eau ou d’un film corporate multi-techniques, nous saurons vous accompagner. Plus qu’une société de production vidéo à Genève, nous sommes une agence de réalisation vidéo sur Genève complète à même de vous accompagner dans tous vos projets. Cela autant pour du tournage, du motion design, du drone ou de l’ animation 3D.",
      "Envie de nous suivre nous et notre travail ? Envie de travailler avec une boite de prod lyonnaise ? Suivez nous sur nos réseaux sociaux !",
      "Notre équipe est composée d’experts dans leurs domaines : concepteurs / réalisateurs / caméramen / monteurs / graphistes. Notre agence vidéo de Genève intervient sur l’ensemble du territoire suisse avec une grande expérience en communication des entreprises de la région. Notre société de production vidéo est en évolution permanente. La réalisation de vidéo est notre domaine ainsi que tous les nouveaux supports. Que votre projet soit de diffuser votre film sur votre site internet, lors d’une convention d’entreprise ou bien dans un casque de réalité virtuelle, nous saurons vous accompagner. Vous souhaitez découvrir nos compétences ? Allez faire un tour sur notre page réalisations. Vous découvrirez un ensemble de projets vidéos réalisés en suisse.",
    ],
    specificites: [
      {
        titre: "Une entité suisse, pas une prestation transfrontalière",
        texte:
          /* ⛔ La mention de bluevista.ch a été RETIRÉE : les deux sites sont
             parallèles et ne se renvoient jamais l'un vers l'autre. Nommer
             l'autre domaine, même sans lien, invite à le chercher. */
          "Bluevista dispose d’une structure suisse. Pour un client genevois, cela veut dire une facturation locale et un interlocuteur qui connaît le contexte — pas un devis français converti en francs.",
      },
      {
        titre: "Les institutions internationales, un contexte à part",
        texte:
          "Filmer pour une organisation internationale ne ressemble pas à un film d’entreprise : accréditations, droit à l’image de délégations, versions multilingues, contraintes de neutralité. Nous travaillons dans ce cadre depuis des années, et c’est un savoir-faire qui ne s’improvise pas.",
      },
    ],
    projets: [
      "ONU Genève — captation et production audiovisuelle",
      "Hôtel Président Wilson — dispositif immersif",
    ],
    ancienneUrl: "/realisation-video-geneve/",
    clics: 2,
  },
];

/** Les pages fixes, hors arborescence métier. */
export const PAGES_FIXES = [
  { slug: "agence", nom: "L’agence", ancienneUrl: "/agence/", clics: 38 },
  { slug: "realisations", nom: "Réalisations", ancienneUrl: "/nos-realisations/", clics: 15 },
  { slug: "contact", nom: "Contact & devis", ancienneUrl: "/contact-devis/", clics: 17 },
  { slug: "actualites", nom: "Actualités", ancienneUrl: "/actualites/", clics: 0 },
  { slug: "mentions-legales", nom: "Mentions légales", ancienneUrl: "/mentions-legales/", clics: 11 },
];

export const METIERS: { cle: Metier; nom: string; slug: string }[] = [
  { cle: "film", nom: "Communication & marketing", slug: "film" },
  { cle: "evenement", nom: "Événementiel", slug: "evenement" },
  { cle: "immersion", nom: "Immersion", slug: "immersion" },
];

export const competencesDuMetier = (m: Metier) =>
  COMPETENCES.filter(c => c.metier === m).sort((a, b) => b.clics - a.clics);
