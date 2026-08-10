# La bascule — tout ce qu'on a découvert, et qui doit être exécuté ce jour-là

> **Règle posée par Giz le 10/08/2026 : on ne touche plus à l'ancien site.**
> Tout ce qu'on découvre de meilleur se consigne ICI et s'applique à la bascule.
> *« Garder un max de SEO est primordial. »*
>
> ⛔ Ce document n'est pas un compte rendu, c'est une **liste à exécuter**. Une découverte
> qui n'y figure pas sera perdue : entre aujourd'hui et la bascule, personne ne se souviendra
> d'un raisonnement tenu en août.

---

## ⏳ À FAIRE AVANT LA BASCULE — la seule chose vraiment urgente

⛔⛔ **Extraire la photo Search Console AVANT de basculer. Elle ne se rattrape pas.**

Search Console ne conserve que **16 mois**. Le jour où le trafic s'effondre après une bascule,
la première question est « c'était combien avant ? » — et si la photo n'a pas été prise, on ne
peut plus rien démontrer ni rien corriger.

**Ce qu'il faut sortir, par propriété** (`www.bluevistaprod.com`, `en.bluevistaprod.com`,
`sc-domain:bluevista.ch`), sur 12 mois glissants :
- pages × clics × impressions × position
- requêtes × clics × impressions × position
- le croisement page × requête pour les 30 URL qui font 90 % du trafic
- la répartition par pays (c'est elle qui a révélé les 675 impressions suisses sur la page Genève)

📌 Le MCP `gsc` maison répond sur les cinq propriétés en `siteOwner`.

---

## 1. Les redirections — ce que le plan porte déjà, et les deux exceptions

`PLAN-REDIRECTIONS.csv` — 751 lignes. Deux points appris à la dure :

⭐ **La page Genève française part vers le site suisse.** `/realisation-video-geneve/` →
`https://www.bluevista.ch/realisation-video-geneve/`, en **301 page à page**.
- ⛔ **JAMAIS vers l'accueil de bluevista.ch** : une 301 vers une page d'accueil est traitée
  comme une erreur douce et **ne transfère rien**.
- ⚠️ **C'est une exception assumée** à la règle « aucun lien vers bluevista.ch ». Cette règle
  protège les prospects *français* ; ici les visiteurs sont suisses par leur requête même.
  L'exception doit rester écrite, sinon quelqu'un « corrigera » la ligne un jour.

⚠️ **Ne pas traiter les 602 URL à zéro clic avec le même soin que les 30 qui portent 90 % du
trafic.** Une page déjà exclue de l'index n'a pas besoin d'une redirection travaillée.

⚠️ **Alerte d'indexation du 08/08/2026 sur `en.bluevistaprod.com`** (262 URL au sitemap) : sortir
les raisons de non-indexation par propriété **au moment du plan**, pas avant. Une page déjà
désindexée se redirige différemment.

---

## 2. ⛔⛔ Le site suisse est un CLONE, slug pour slug — c'est le plus gros sujet

**Une quinzaine de paires identiques** entre `bluevistaprod.com` et `bluevista.ch` :
`/realisation-video-geneve/` · `/agence/` · `/contact-devis/` · `/nos-realisations/` ·
`/actualites/` · `/mentions-legales/` · `/bluevista-agence-metaverse/` · et **les neuf
`/nos-competences/…`**. Structurel : un seul WordPress avec WPML.

**Mesuré sur la paire Genève** : recouvrement des textes **98 %**, même `<title>`, même `H1`,
même adresse relative. Résultat : les deux pages enterrées, à 45 et 55.

### ⭐ La leçon qui commande tout le reste : le hreflang SÉLECTIONNE, il ne CONSOLIDE PAS

Le hreflang de ces pages est **correct et réciproque** — et elles sont quand même enterrées.
Une déclaration dit à Google *laquelle montrer à qui* ; elle **ne fusionne pas les signaux de
classement**. Deux pages quasi identiques restent deux pages faibles qui se partagent l'autorité
au lieu de l'additionner.

👉 **Différencier le contenu suisse n'est pas un choix de marque, c'est LE correctif SEO.**
Ça rejoint exactement ce que Giz voulait déjà : *« en Suisse on dit qu'on est suisse only, on ne
montre pas tous les projets, on a un langage différent »*.

---

## 3. Ce qui a déjà été fait sur l'ancien site, et qu'il faut REPORTER

⚠️ Ces gestes sont en production aujourd'hui. **Le nouveau site doit les reprendre, pas les
redécouvrir.**

**Les titres et méta-descriptions réécrits le 01/08/2026** — 16 pages FR, 6 CH, 1 EN. Motif :
mot-clé et ville d'abord, marque à la fin, « depuis 2004 » dans la description.
👉 **Avant la bascule, comparer ces titres à ceux écrits dans Sanity** : là où ils diffèrent,
c'est un arbitrage à prendre en connaissance de cause, pas un écart à laisser passer.

**Le texte de fond ajouté aux pages Paris et live streaming** (03/08, puis repassé au registre le
10/08). Source unique : `next-app/scripts/textes-competences-villes.mjs`.

**Les quatre liens sortants vers bluevista.ch retirés** (10/08) — trois étaient sur la page
d'accueil. ⛔ Le nouveau site ne doit en recréer aucun.

---

## 4. Ce que le nouveau site apporte, et qu'il ne faut pas perdre en route

- **`agence vidéo` dans le H1 et le `<title>` de l'accueil** — 7 845 impressions/an en position
  22,9 pour 5 clics, la plus grosse visibilité non convertie du domaine. L'expression ne figurait
  **nulle part** sur l'ancienne accueil.
- **Les 13 pages compétence et ville nourries** — 3 652 mots ajoutés, toutes entre 480 et 945 mots
  là où elles étaient à 97-519 avec toutes leurs sections vides.
  📌 Rappel du 25/07 : les deux pages maigres ont perdu la moitié de leur classement, les deux
  nourries n'ont pas bougé.
- **Le maillage interne** — 4,3 liens entrants par fiche contre 1 avant, et 18 liens sortants via
  `clientUrl`. ⚠️ La page Genève était **orpheline** : zéro lien entrant. C'est la classe de
  défaut que le nouveau maillage supprime par construction.
- **La cannibalisation `/actualites/` vs `/nos-realisations/`** — 39 paires de doublons, 11 907
  impressions pour 39 clics, trois cas portant le **même slug** des deux côtés. Résolue par la
  migration.
- ⛔ **« Genève » ne va ni dans un `<title>` ni dans un `H1` de page FR.**

---

## 5. Les pièges vérifiés — ne pas les réapprendre

⛔ **Ne jamais poser un `noindex` sur une page destinée à une 301.** Elle disparaîtrait sans
transmettre son autorité, juste avant le geste censé la transmettre. C'est le pire des deux mondes.
📌 Corollaire Yoast : **sortir une page du sitemap et la passer en `noindex` sont le même geste**
(pas de réglage séparé). Le champ n'est de toute façon pas exposé à l'API REST — écriture acceptée
puis ignorée. La seule voie propre est un filtre `wpseo_exclude_from_sitemap_by_post_ids` dans un
mu-plugin, qui demande un accès fichier.

⛔ **Le hreflang ne se déclare que sur du PUBLIÉ, et jamais s'il ne reste qu'une version.**
Recalculé à chaque rendu depuis Sanity, donc dépublier retire la déclaration toute seule.
Contrôle : `scripts/verifier-hreflang.mjs`. ⚠️ **Un hreflang cassé ne produit aucune erreur.**

⛔ **La réciprocité du couple fr-FR / fr-CH n'est pas vérifiable tant que le nouveau
bluevista.ch n'est pas en ligne.** Relancer le contrôle avec `BASE` pointant sur le site suisse
le jour de sa mise en service — sans déclaration en retour, Google ignore le couple.

⚠️ **Devant une chute de position, dater les modifications réelles AVANT de chercher une
explication.** L'API REST de WordPress donne la date de modification de chaque page en une
requête, là où la Search Console laisse spéculer des jours. C'est ce qui a clos le débat du 25/07
en dix minutes : zéro page modifiée entre le 15 et le 31 juillet, donc cause externe.

---

## 6. Après la bascule — la surveillance

- `gsc_compare` sur `page`, semaine par semaine, pendant six semaines. C'est l'outil qui montre
  **quelles URL ont décroché**, une par une.
- ⚠️ **Ne pas confondre une baisse de position moyenne avec une perte de classement.** Une page
  qui se met à apparaître sur des requêtes nouvelles et lointaines voit sa moyenne s'effondrer
  sans rien perdre. Le juge est la position **par requête**, pas la moyenne de la page.
- ⚠️ **La saisonnalité se vérifie en année sur année, pas en mois sur mois.** Juin → juillet 2026
  donnait −32 % ; juillet 2025 → juillet 2026 donnait des positions *meilleures*.

---

## ⭐⭐ Réécrire ou conserver : la règle, et l'erreur qu'elle corrige

`[10/08/2026, mesuré sur la photo]`

**L'erreur que j'ai commise** : traiter « la page qui fait le plus de clics » comme « la page la
plus fragile ». J'avais donc recommandé de garder l'ancien texte de l'accueil à la bascule — ce
qui revenait à livrer un site neuf avec l'ancien message. Giz l'a relevé : *« l'ancien accueil
n'a pas le nouveau message… je ne comprends pas »*. Il avait raison.

⭐ **LA VRAIE RÈGLE : la fragilité d'une page n'est pas son volume de trafic, c'est la PART de ce
trafic qui dépend de ce qu'on s'apprête à modifier.**

**La mesure qui tranche** — l'accueil fait 785 clics, dont **481 sur « bluevista » : 95 % de
requêtes de marque.** On est premier sur son propre nom quel que soit le texte de la page. Hors
marque il reste **25 clics**, dont 5 sur « agence vidéo » (que le nouveau texte vise précisément,
là où l'ancien ne la portait nulle part) et une quinzaine sur des requêtes **genevoises**, qu'on
cède volontairement au site suisse. Exposition réelle : **≈ 5 clics par an.**

### Ce qui en découle

| | pages | à la bascule |
|---|---|---|
| **Trafic de MARQUE** — le texte ne le porte pas | `/` (95 % marque) · `/agence/` (100 %) | ✅ **Nouveau message, tout de suite** |
| **Trafic de SERVICE** — le texte porte le classement | `studio-animation-3d-lyon` · `video-mapping` · `live-streaming-webtv` · `studio-animation-3d-paris` · la réalisation Engie | ⚠️ On AJOUTE, on ne remplace pas. Réécriture après, une par une |
| **Zéro clic** — 152 URL sur 239 | tout le reste | ✅ Réécriture totale, aucun risque |

⭐ **Et le conflit apparent n'existe pas** : les pages qui portent le POSITIONNEMENT sont
exactement celles dont le trafic ne dépend pas de leur texte ; les pages dont le trafic dépend de
leur texte sont exactement celles qui ne portent pas le positionnement. Le nouveau message vit sur
l'accueil, la page agence et les trois pages métier — toutes libres.

### ⛔ La distinction qui rend tout praticable

**AJOUTER du texte** ≠ **REMPLACER du texte.** Ajouter enrichit sans déplacer ce qui range : c'est
libre, partout, tout de suite. Seul le remplacement se dose.

### Pourquoi on garde un témoin

Le 4 septembre, tout change en même temps — adresses, gabarits, CMS, maillage, hreflang. Si le
texte des pages de service changeait aussi et que le trafic baissait, **on ne saurait pas
pourquoi**. Les cinq pages de service tiennent lieu de groupe témoin.

### Le calendrier de reprise, après la bascule

Une page à la fois, espacées de deux à trois semaines, en mesurant chacune :
`video-mapping` (~25 sept) · `live-streaming-webtv` (~15 oct) · `studio-animation-3d-lyon`
(~5 nov) · `studio-animation-3d-paris` (~25 nov) · la réalisation Engie (~déc).

⭐ L'avantage dépasse la prudence : **chaque réécriture devient une expérience.** Au bout de trois,
on saura si le nouveau registre fait gagner des clics — ce qu'aucun raisonnement ne dit à l'avance.

---

## ⭐⭐ Le garde-fou de longueur était FAUX — on compte les mots PROPRES

`[révisé le 10/08/2026, après le tri du texte non migré]`

**L'ancienne règle**, tirée de la chute du 25/07 : *« une page sous 200 mots est fragile, viser
600 à 900 »*. Elle reposait sur quatre points et une corrélation. **Le tri l'a démentie.**

| page | mots EN LIGNE | position | clics/an |
|---|---|---|---|
| `motion-design` | **1 120** | **61,7** | 14 |
| `realisation-film-entreprise-lyon` | **1 095** | 32,4 | 14 |
| `aftermovie-captation` | 824 | 21,3 | 10 |
| `live-streaming-webtv` | 853 | **10,2** | **85** |
| `video-mapping` | 700 | 18,6 | **97** |

👉 `motion-design` fait **1 120 mots et se classe 61ᵉ**. `live-streaming` en fait 853 et se classe
**10ᵉ**. À longueur comparable, six fois mieux. **La longueur n'explique rien.**

### Ce qui les sépare

Le texte de `motion-design`, `aftermovie` et `realisation-film-entreprise-lyon` est fait de
conseils génériques sur la durée et le style d'une vidéo — et **le même passage se retrouve mot
pour mot sur deux pages**, avec trois mots échangés (*« vidéo d'entreprise »* → *« film
événementiel »*). Du contenu quasi dupliqué **à l'intérieur du site** : deux pages qui se
partagent l'autorité au lieu de l'additionner.

Le texte de `live-streaming` et `video-mapping` est fait de **projets nommés et de détails
techniques** qui n'existent nulle part ailleurs.

### ✅ LA RÈGLE RÉVISÉE

**On ne compte pas les mots. On compte les mots PROPRES** — ceux qui ne pourraient figurer ni sur
une autre page du site, ni sur le site suisse, ni sur celui d'un concurrent.

**Le seuil : 300 à 400 mots propres.** C'est à peu près ce que portent les deux pages qui rangent,
une fois le remplissage retiré.

⭐ **Le test, et il se pose paragraphe par paragraphe :**
> *« Ce paragraphe pourrait-il figurer tel quel sur une autre de nos pages ? »*
> Si oui, **il ne compte pas** — et il vaut mieux le supprimer que le garder.

C'est le frère jumeau du test du registre — *« une autre agence pourrait-elle signer ce
paragraphe ? »* — appliqué cette fois à la duplication **interne**.

⚠️ **Ce que ça corrige dans la lecture du 25/07** : Paris et live streaming n'ont pas décroché
parce qu'elles étaient COURTES, mais parce qu'elles étaient courtes **et génériques**. Lyon et
mapping ont tenu parce qu'elles portaient du spécifique. Allonger avec du remplissage n'aurait
rien sauvé — `motion-design` en est la preuve, à 1 120 mots et 61ᵉ.

---

## 7. Ce qui reste à trancher

- ⏳ **Les références clients** (ONU, UNICEF, BBC, NHK, EDF, Vinci…) — le bloc est en place mais
  **volontairement vide**. Règle par défaut : « on demande ». Tâche Podio non tranchée.
- ⏳ **Les segments d'URL traduits** (`realisations` → `works` / `proyectos`, etc.) — un segment se
  référence, le changer plus tard coûte une redirection par page.
- ⏳ **Le marché genevois ANGLOPHONE** — *corporate video production geneva* : 185 impressions,
  **position 4**, zéro clic, sur une page française. Aucun des deux sites ne le sert. C'est un
  chantier pour la version anglaise de bluevista.ch, pas une correction côté français.
- ⏳ **Mentions légales et politique de confidentialité** — obligatoires, toujours absentes.
  Bloquant pour une mise en ligne.
