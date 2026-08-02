import type { Realisation } from "./_realisations";

/**
 * LES RÉALISATIONS MIGRÉES DEPUIS /actualites/ — 25 projets.
 *
 * ⛔ CE FICHIER EXISTE PARCE QUE LE SITE AVAIT DEUX PORTFOLIOS.
 * Sur les 63 pages /actualites/ mesurables, UNE SEULE était un vrai article.
 * Les autres étaient des projets publiés au mauvais endroit, qui se
 * disputaient les requêtes avec /nos-realisations/ — 39 paires de doublons,
 * 11 907 impressions pour 39 clics, et trois cas portant exactement le même
 * slug des deux côtés.
 *
 * 📌 RÉDUIT DE 42 À 25 le 02/08/2026. Après reconstruction du portfolio
 * depuis le vrai export (145 réalisations), 17 des 42 projets migrés s'y
 * trouvaient déjà — ils auraient fait doublon une seconde fois, ce qui est
 * précisément le défaut qu'on corrige. Ne restent que ceux qui n'existaient
 * QUE sous /actualites/.
 *
 * ⚠️ CE QUI SE PASSE À LA BASCULE, et c'est le point sensible :
 *   · les 25 projets ci-dessous prennent une adresse /realisations/<slug>/ ;
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
  { slug: "animation-3d-grande-arche-de-la-defense", client: "Animation", titre: "Animation 3D Grande Arche de la Défense", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/animation-3d-grande-arche-de-la-defense/", clics: 7, impressions: 332 },
  { slug: "mase-4-motions", client: "MASE", titre: "MASE Rhône Alpes : Motions", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/mase-4-motions/", clics: 1, impressions: 302 },
  { slug: "projet-de-realisation-video-360", client: "Vidéo", titre: "Vidéo 360 drone", titreSur: false, metier: "immersion", produit: "visite-vr", ancienneUrl: "/actualites/projet-de-realisation-video-360/", clics: 2, impressions: 255 },
  { slug: "sport-boules-16eme-trophee-emile-terrier", client: "Sport", titre: "Sport Boules : 16ème Trophée Émile Terrier", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/sport-boules-16eme-trophee-emile-terrier/", clics: 0, impressions: 225 },
  { slug: "barpi-prevention-accidents", client: "BARPI", titre: "BARPI : Prévention d'accidents industriels", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/barpi-prevention-accidents/", clics: 3, impressions: 197 },
  { slug: "50ans-de-lpa-une-histoire-lyonnaise", client: "50ans", titre: "50ans de LPA, une histoire Lyonnaise", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/50ans-de-lpa-une-histoire-lyonnaise/", clics: 3, impressions: 183 },
  { slug: "peninsula-octobre-rose", client: "Peninsula", titre: "Peninsula : Octobre Rose", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/peninsula-octobre-rose/", clics: 0, impressions: 94 },
  { slug: "nos-dernieres-interviews", client: "Nos", titre: "Nos dernières interviews", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/nos-dernieres-interviews/", clics: 0, impressions: 77 },
  { slug: "getlive-tv-3-0-la-wbe-tv-selon-bluevista", client: "GETLIVE", titre: "GETLIVE TV 3.0 – La web TV selon Bluevista", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/getlive-tv-3-0-la-wbe-tv-selon-bluevista/", clics: 0, impressions: 39 },
  { slug: "decouvrez-notre-nouvelle-bande-demo-3d", client: "Découvrez", titre: "Découvrez notre nouvelle bande démo 3D", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/decouvrez-notre-nouvelle-bande-demo-3d/", clics: 0, impressions: 28 },
  { slug: "blueverse", client: "Le", titre: "Le Métaverse bluevista : le blueverse", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/blueverse/", clics: 1, impressions: 21 },
  { slug: "nouveau-materiel-motion-control-kessler", client: "Nouveau", titre: "Nouveau matériel – Motion control Kessler", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/nouveau-materiel-motion-control-kessler/", clics: 0, impressions: 21 },
  { slug: "streaming-live-et-webtv-demo-2018", client: "Streaming", titre: "Streaming Live et WebTV démo 2018", titreSur: false, metier: "evenement", produit: "streaming", ancienneUrl: "/actualites/streaming-live-et-webtv-demo-2018/", clics: 0, impressions: 13 },
  { slug: "live-video-homeserve-20ans", client: "Live", titre: "Live streaming des 20 ans Homeserve", titreSur: false, metier: "evenement", produit: "streaming", ancienneUrl: "/actualites/live-video-homeserve-20ans/", clics: 0, impressions: 12 },
  { slug: "serie-de-6-videos-promotionnelles-pour-les-produits-abb-snk", client: "Série", titre: "Série de 6 vidéos promotionnelles pour les produits ABB SNK", titreSur: false, metier: "film", produit: "motion-promo", ancienneUrl: "/actualites/serie-de-6-videos-promotionnelles-pour-les-produits-abb-snk/", clics: 0, impressions: 9 },
  { slug: "la-realite-virtuelle-oculus-a-bluevista", client: "La", titre: "La réalité virtuelle Oculus à Bluevista", titreSur: false, metier: "immersion", produit: "visite-vr", ancienneUrl: "/actualites/la-realite-virtuelle-oculus-a-bluevista/", clics: 0, impressions: 7 },
  { slug: "artcurial-20ans", client: "Artcurial", titre: "Artcurial : Mapping 20ans", titreSur: false, metier: "evenement", produit: "mapping-architectural", ancienneUrl: "/actualites/artcurial-20ans/", clics: 0, impressions: 5 },
  { slug: "un-tournage-en-preparation-dans-le-parc-naturel-regional-du-vercors", client: "Un", titre: "Un tournage en préparation dans le Parc Naturel Régional du Vercors", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/un-tournage-en-preparation-dans-le-parc-naturel-regional-du-vercors/", clics: 0, impressions: 3 },
  { slug: "projection-semi-transparente-immersive-pour-linauguration-dun-batiment", client: "Projection", titre: "Projection semi-transparente immersive pour l’inauguration d’un bâtiment", titreSur: false, metier: "immersion", produit: "salle-immersive", ancienneUrl: "/actualites/projection-semi-transparente-immersive-pour-linauguration-dun-batiment/", clics: 0, impressions: 3 },
  { slug: "film-dentreprise-video-15-ans-dexperience", client: "Film", titre: "Film d’entreprise – vidéo 15 ans d’expérience", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/film-dentreprise-video-15-ans-dexperience/", clics: 0, impressions: 1 },
  { slug: "social-wall-pour-espace-vip", client: "Social", titre: "Social wall pour espace VIP", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/social-wall-pour-espace-vip/", clics: 0, impressions: 0 },
  { slug: "premier-vol-drone", client: "Notre", titre: "Notre premier vol de drone, c’était en 2012 !", titreSur: false, metier: "film", produit: "drone", ancienneUrl: "/actualites/premier-vol-drone/", clics: 0, impressions: 0 },
  { slug: "video-et-site-web-funseaker-yacht", client: "Vidéo", titre: "Vidéo et site web – Funseaker Yacht", titreSur: false, metier: "film", produit: "corporate", ancienneUrl: "/actualites/video-et-site-web-funseaker-yacht/", clics: 0, impressions: 0 },
];
