# Session « site web Bluevista » — semaine 2 : EN complet + CH-FR différencié

Chantier site web, objectif **vendredi 4 septembre 2026** : FR / EN / CH-FR en ligne.
⛔ **La recette est finie le mercredi 2 au soir.** Le jeudi 3 est une marge, pas un rattrapage.

━━ À CHARGER ━━
Cerveau `00_GIZ_OS_V2` (⛔ un chemin `00_GIZ_OS/` sans `_V2` = mauvais cerveau) :
· `partageable/noyau/NOYAU.md` puis `_tampon/inbox.md` — **le tampon d'abord, il porte les
  arbitrages du 11/08 qui ne sont pas encore consolidés**
· `partageable/savoir/reference/voix-marketing.md` — les 7 tests en tête, **et la § 🇨🇭 LE REGISTRE
  SUISSE** (écrite le 11/08)
· `partageable/savoir/exemples/voix/marketing.md` — §12 (diffs page agence) et §13 (étalon web)
· `partageable/savoir/metier/site-web.md` — cloisonnement FR/CH, chiffres interdits, règles de design

Dépôt `Claude-code-websites/bluevista-corporate/` :
`PLAN-4-SEPTEMBRE.md` (calendrier + ce qui bloque) · `BASCULE-SEO.md` (les gestes du jour J) ·
`TON-DE-VOIX-SUISSE.md` (le relevé des 18 agences romandes et les gabarits) ·
`OFFRES-BLUEVISTA.md` (les 9 diffs validés) · `TEXTE-PAGE-AGENCE.md`

━━ CE QUI EST ACQUIS, NE PAS LE REFAIRE ━━
· **Le ton suisse est sourcé et arbitré** (11/08, 18 agences romandes). Quatre écarts avec le
  français : jamais `on` et « Bluevista » comme sujet · le piquant **concentré en un bloc de 3 à 5
  sur la seule page agence**, zéro ailleurs, toujours avec auto-implication · la déférence attendue
  payée par un **engagement chiffré**, jamais par un adjectif · les marqueurs locaux (`offre` et non
  `devis`, `mandat`, `prestations`, apostrophe des milliers `2'000`, quartier + canton,
  « nous nous réjouissons d'en discuter »).
· **La date du site suisse** : *« Bluevista produit depuis 2004. À Genève depuis 2017. »*
  ⛔ Jamais « bientôt 10 ans » ni aucun décompte : ça se périme.
· **GF Machining Solutions est citable** (autorisation obtenue le 11/08) — ⚠️ **seuls les projets
  postérieurs à 2017**, les précédents ont été livrés en marque blanche pour l'agence Félix.
· **`bluevista.ch` est déjà 2ᵉ sur `agence vidéo genève`** (mesuré depuis un VPN suisse). On
  différencie sans casser une position acquise.
· **Le formulaire est branché sur Podio en natif**, 4 apps, filet de rejeu vérifié en coupant Podio.
  ⏳ Reste la **traduction EN des libellés** (le routage EN fonctionne déjà).
· ✅✅ **LES SEGMENTS D'URL SONT VERROUILLÉS** (10/08), sourcés sur 10 agences anglophones et
  7 hispanophones. ⛔ **Ne pas les redemander, ne pas les recopier depuis un document** — la source
  de vérité est le code : `next-app/src/lib/hreflang.ts` → `const SEGMENTS`.

  | Famille | `fr` / `fr-ch` | `en` / `en-ch` | `es` |
  |---|---|---|---|
  | réalisation | `realisations` | **`work`** | `proyectos` |
  | savoir-faire | `savoir-faire` | **`services`** | `servicios` |
  | métier (piliers) | `offres` | **`what-we-do`** | `que-hacemos` |
  | ville | ⛔ aucun segment, **à la racine** | ⛔ pas de page ville | ⛔ pas de page ville |

  ⛔ `works`, `expertise`, `realizaciones`, `offering`, `offices` sont **des valeurs mortes** :
  si elles réapparaissent quelque part, c'est un document périmé, pas une décision.
  ⚠️ `agence` n'est **pas** un segment de famille — c'est l'adresse d'une page fixe.

━━ LE TRAVAIL DE LA SEMAINE ━━
1. **Traduction EN** des 18 pages + des réalisations qui portent le trafic, et des libellés du
   formulaire. ⚠️ L'EN de septembre est **traduit** du registre français ; son ton propre reste à
   sourcer plus tard (chantier séparé).
2. **Rédaction CH-FR différenciée** sur le périmètre arrêté. Les quatre leviers qui font tomber le
   recouvrement de 98 % : le sujet · la géographie fine · les preuves suisses · le lexique local.
   🎯 **Recouvrement visé sous 40 %**, contrôlé page à page.
   ⭐ L'angle : **l'immersif industriel** (showroom virtuel, 360/VR, animation 3D de machines,
   multilingue) — c'est le seul terrain que les 18 agences romandes laissent vide.
3. **hreflang sur les trois versions**, contrôlé par `scripts/verifier-hreflang.mjs` — il vérifie le
   **rendu**, pas le code. ⚠️ Un hreflang cassé ne produit **aucune erreur visible**.

━━ CE QUI BLOQUE, ET QUI DÉPEND DE GIZ ━━
| Bloquant | Échéance |
|---|---|
| **Périmètre CH-FR** — quelles pages, quels projets suisses | **15/08** — dépassé ? le redemander en premier. ⛔ **C'est le seul point du 15/08 encore ouvert.** |
| Régénérer les clés API `N8N` et `claude` (secrets apparus en clair le 11/08) | **15/08** |
| Accès hébergement + DNS | **18/08** |
| Mentions légales + politique de confidentialité (9 mentions `À COMPLÉTER`) | **20/08** |
| Arbitrage références clients — ✅ GF fait, restent SGS, Labcorp, OMM, OIM, e-Xpert, IQONE, Cermix, CAP | **20/08** |
| La genèse de l'agence (2 paragraphes, le seul texte où quelqu'un parle en son nom) | **22/08** |
| Les 36 réalisations sans image · 144 vidéos Vimeo → Livid | **25/08** |
| Clé API Podio dédiée au site · adresse d'envoi dédiée pour `SMTP_PASS` (tâche 317117400) | **25/08 / 28/08** |

━━ LES PIÈGES DÉJÀ PAYÉS, À NE PAS REFAIRE ━━
⛔ **« Toute la chaîne » n'entre pas dans le site suisse** : c'est le titre de la page À propos de
Point Prod, le leader genevois.
⛔ **On ne fait pas QUE des films** — le corps de page dit « projet », le titre dit « vidéo ».
⛔ **Aucun effectif, aucun chiffre non sourcé, aucune image IA** de ce qui prétend montrer Bluevista.
⛔ **Genève ne va ni dans un `<title>` ni dans un `H1` de page FR.** Aucun lien sortant vers
bluevista.ch — sauf la 301 page à page de `/realisation-video-geneve/`, exception assumée.
⛔ **La prose de voix off ne descend pas dans le corps de page** : phrase pleine, bénéfice attaché,
jamais de chute à décoder. C'est ce qui a fait échouer trois versions de la page agence.
⚠️ **`main` et `chantier-refonte-2026` ont été fusionnées le 10/08** (les deux sur `03be8d8`) —
mais **rien ne les maintient synchronisées**, et la procédure de déploiement cible `main`.
👉 **Refusionner avant le déploiement**, sinon on met en ligne un site en retard.

━━ COMMENT TRAVAILLER ━━
📌 Giz veut **une recommandation ferme**, des **réponses courtes**, et qu'on **dise quand on n'est
pas sûr** plutôt que de deviner. Une réponse unique et synthétisée, jamais un rapport par sujet mis
bout à bout. Rien ne part en son nom sans sa validation explicite. Ce que la session produit, la
fiche du cerveau le porte **avant** de finir.
