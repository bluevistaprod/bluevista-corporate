import type { Realisation } from "./_realisations";

/**
 * LES RÉALISATIONS MIGRÉES DEPUIS /actualites/ — 42 projets.
 *
 * ⛔ CE FICHIER EXISTE PARCE QUE LE SITE AVAIT DEUX PORTFOLIOS.
 * Sur les 63 pages /actualites/ mesurables, UNE SEULE était un vrai article.
 * Les autres étaient des projets publiés au mauvais endroit, qui se
 * disputaient les requêtes avec /nos-realisations/ — 39 paires de doublons,
 * 11 907 impressions pour 39 clics, et trois cas portant exactement le même
 * slug des deux côtés.
 *
 * ⚠️ CE QUI SE PASSE À LA BASCULE, et c'est le point sensible :
 *   · les 42 projets ci-dessous prennent une adresse /realisations/<slug>/ ;
 *   · leur ancienne adresse /actualites/<slug>/ part en REDIRECTION 301 —
 *     `ancienneUrl` est là pour ça, ne pas la supprimer ;
 *   · les 20 doublons ne sont PAS ici : ils redirigent vers la fiche
 *     existante, pas vers une nouvelle. Fusionner deux pages en gardant les
 *     deux serait recréer le problème qu'on corrige.
 *   · le seul vrai article reste un article.
 *
 * ⚠️ Le métier et le produit sont DÉDUITS du titre. Ce qui n'était pas
 * reconnaissable a été rangé en film/corporate par défaut — à relire, comme
 * les titres eux-mêmes.
 */
export const REALISATIONS_MIGREES: Realisation[] = [
  { slug: "stann", client: "STANN.", titre: "STANN.", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/stann/", clics: 0, impressions: 7563 },
  { slug: "video-immersive-360", client: "Vidéo", titre: "Vidéo immersive 360°", titreSur: false, metier: "immersion", produit: "visite-vr", ancienneUrl: "/actualites/video-immersive-360/", clics: 9, impressions: 3145 },
  { slug: "bluevista-video-showreel-2023", client: "Bluevista", titre: "Bluevista vidéo Showreel 2023", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/bluevista-video-showreel-2023/", clics: 5, impressions: 2392 },
  { slug: "carte-de-voeux-video", client: "Carte", titre: "Carte de voeux vidéo", titreSur: false, metier: "film", produit: "voeux", ancienneUrl: "/actualites/carte-de-voeux-video/", clics: 4, impressions: 2339 },
  { slug: "motion-design-3d-et-mapping-a-paris-au-musee-rodin", client: "Motion", titre: "Motion design 3D et mapping à Paris au Musée Rodin", titreSur: false, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/actualites/motion-design-3d-et-mapping-a-paris-au-musee-rodin/", clics: 9, impressions: 705 },
  { slug: "animation-3d-grande-arche-de-la-defense", client: "Animation", titre: "Animation 3D Grande Arche de la Défense", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/animation-3d-grande-arche-de-la-defense/", clics: 7, impressions: 332 },
  { slug: "animation-3d-produit-hitachi-csnet-manager", client: "Animation", titre: "Animation 3D produit HITACHI CSNet manager", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/animation-3d-produit-hitachi-csnet-manager/", clics: 1, impressions: 305 },
  { slug: "mase-4-motions", client: "MASE", titre: "MASE Rhône Alpes : Motions", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/mase-4-motions/", clics: 1, impressions: 302 },
  { slug: "projet-de-realisation-video-360", client: "Vidéo", titre: "Vidéo 360 drone", titreSur: false, metier: "immersion", produit: "visite-vr", ancienneUrl: "/actualites/projet-de-realisation-video-360/", clics: 2, impressions: 255 },
  { slug: "sport-boules-16eme-trophee-emile-terrier", client: "Sport", titre: "Sport Boules : 16ème Trophée Émile Terrier", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/sport-boules-16eme-trophee-emile-terrier/", clics: 0, impressions: 225 },
  { slug: "show-reel-motion-design", client: "Show", titre: "Show reel Motion Design", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/show-reel-motion-design/", clics: 0, impressions: 214 },
  { slug: "showroom-virtuel-gf-machining-solutions", client: "Showroom", titre: "Showroom Virtuel GF Machining Solutions", titreSur: false, metier: "immersion", produit: "showroom-virtuel", ancienneUrl: "/actualites/showroom-virtuel-gf-machining-solutions/", clics: 2, impressions: 200 },
  { slug: "barpi-prevention-accidents", client: "BARPI", titre: "BARPI : Prévention d'accidents industriels", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/barpi-prevention-accidents/", clics: 3, impressions: 197 },
  { slug: "50ans-de-lpa-une-histoire-lyonnaise", client: "50ans", titre: "50ans de LPA, une histoire Lyonnaise", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/50ans-de-lpa-une-histoire-lyonnaise/", clics: 3, impressions: 183 },
  { slug: "bluevista-video-showreel-2020", client: "Bluevista", titre: "Bluevista vidéo Showreel 2020", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/bluevista-video-showreel-2020/", clics: 0, impressions: 99 },
  { slug: "peninsula-octobre-rose", client: "Peninsula", titre: "Peninsula : Octobre Rose", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/peninsula-octobre-rose/", clics: 0, impressions: 94 },
  { slug: "bluevista-video-showreel-2021", client: "Bluevista", titre: "Bluevista vidéo Showreel 2021", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/bluevista-video-showreel-2021/", clics: 1, impressions: 90 },
  { slug: "nos-dernieres-interviews", client: "Nos", titre: "Nos dernières interviews", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/nos-dernieres-interviews/", clics: 0, impressions: 77 },
  { slug: "getlive-tv-3-0-la-wbe-tv-selon-bluevista", client: "GETLIVE", titre: "GETLIVE TV 3.0 – La web TV selon Bluevista", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/getlive-tv-3-0-la-wbe-tv-selon-bluevista/", clics: 0, impressions: 39 },
  { slug: "decouvrez-notre-nouvelle-bande-demo-3d", client: "Découvrez", titre: "Découvrez notre nouvelle bande démo 3D", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/decouvrez-notre-nouvelle-bande-demo-3d/", clics: 0, impressions: 28 },
  { slug: "blueverse", client: "Le", titre: "Le Métaverse bluevista : le blueverse", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/blueverse/", clics: 1, impressions: 21 },
  { slug: "nouveau-materiel-motion-control-kessler", client: "Nouveau", titre: "Nouveau matériel – Motion control Kessler", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/nouveau-materiel-motion-control-kessler/", clics: 0, impressions: 21 },
  { slug: "realisation-de-film-dentreprise-ou-corporate", client: "Réalisation", titre: "Réalisation de film d'entreprise ou corporate", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/realisation-de-film-dentreprise-ou-corporate/", clics: 0, impressions: 19 },
  { slug: "streaming-live-et-webtv-demo-2018", client: "Streaming", titre: "Streaming Live et WebTV démo 2018", titreSur: false, metier: "evenement", produit: "streaming", ancienneUrl: "/actualites/streaming-live-et-webtv-demo-2018/", clics: 0, impressions: 13 },
  { slug: "live-video-homeserve-20ans", client: "Live", titre: "Live streaming des 20 ans Homeserve", titreSur: false, metier: "evenement", produit: "streaming", ancienneUrl: "/actualites/live-video-homeserve-20ans/", clics: 0, impressions: 12 },
  { slug: "serie-de-6-videos-promotionnelles-pour-les-produits-abb-snk", client: "Série", titre: "Série de 6 vidéos promotionnelles pour les produits ABB SNK", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/serie-de-6-videos-promotionnelles-pour-les-produits-abb-snk/", clics: 0, impressions: 9 },
  { slug: "un-motion-design-a-lancienne-making-of", client: "Un", titre: "Un motion design « à l’ancienne » – Making of", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/un-motion-design-a-lancienne-making-of/", clics: 0, impressions: 8 },
  { slug: "la-realite-virtuelle-oculus-a-bluevista", client: "La", titre: "La réalité virtuelle Oculus à Bluevista", titreSur: false, metier: "immersion", produit: "visite-vr", ancienneUrl: "/actualites/la-realite-virtuelle-oculus-a-bluevista/", clics: 0, impressions: 7 },
  { slug: "clip-corporate-bos-equipement", client: "Clip", titre: "Clip Corporate BOS Equipement", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/clip-corporate-bos-equipement/", clics: 0, impressions: 6 },
  { slug: "artcurial-20ans", client: "Artcurial", titre: "Artcurial : Mapping 20ans", titreSur: false, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/actualites/artcurial-20ans/", clics: 0, impressions: 5 },
  { slug: "realisation-de-3-clips-produit-en-studio-pour-la-societe-riso", client: "Réalisation", titre: "Réalisation de 3 clips produit en studio pour la société RISO", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/realisation-de-3-clips-produit-en-studio-pour-la-societe-riso/", clics: 0, impressions: 5 },
  { slug: "film-de-presentation-produit", client: "Film", titre: "Film de présentation produit", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/film-de-presentation-produit/", clics: 0, impressions: 4 },
  { slug: "un-tournage-en-preparation-dans-le-parc-naturel-regional-du-vercors", client: "Un", titre: "Un tournage en préparation dans le Parc Naturel Régional du Vercors", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/un-tournage-en-preparation-dans-le-parc-naturel-regional-du-vercors/", clics: 0, impressions: 3 },
  { slug: "projection-semi-transparente-immersive-pour-linauguration-dun-batiment", client: "Projection", titre: "Projection semi-transparente immersive pour l’inauguration d’un bâtiment", titreSur: false, metier: "immersion", produit: "salle-immersive", ancienneUrl: "/actualites/projection-semi-transparente-immersive-pour-linauguration-dun-batiment/", clics: 0, impressions: 3 },
  { slug: "show-reel-videos-drone", client: "Show", titre: "Show reel vidéos drone", titreSur: false, metier: "film", produit: "drone", ancienneUrl: "/actualites/show-reel-videos-drone/", clics: 0, impressions: 2 },
  { slug: "motion-design-pedagogique", client: "Motion", titre: "Motion Design pédagogique", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/motion-design-pedagogique/", clics: 0, impressions: 1 },
  { slug: "film-dentreprise-video-15-ans-dexperience", client: "Film", titre: "Film d’entreprise – vidéo 15 ans d’expérience", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/film-dentreprise-video-15-ans-dexperience/", clics: 0, impressions: 1 },
  { slug: "timelapse-de-tournage-en-studio", client: "Timelapse", titre: "Timelapse de tournage en studio", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/timelapse-de-tournage-en-studio/", clics: 0, impressions: 0 },
  { slug: "social-wall-pour-espace-vip", client: "Social", titre: "Social wall pour espace VIP", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/social-wall-pour-espace-vip/", clics: 0, impressions: 0 },
  { slug: "after-movie-fubiz-talks-2018", client: "After", titre: "After Movie Fubiz Talks 2018", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/after-movie-fubiz-talks-2018/", clics: 0, impressions: 0 },
  { slug: "premier-vol-drone", client: "Notre", titre: "Notre premier vol de drone, c’était en 2012 !", titreSur: false, metier: "film", produit: "drone", ancienneUrl: "/actualites/premier-vol-drone/", clics: 0, impressions: 0 },
  { slug: "video-et-site-web-funseaker-yacht", client: "Vidéo", titre: "Vidéo et site web – Funseaker Yacht", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/video-et-site-web-funseaker-yacht/", clics: 0, impressions: 0 },
];
