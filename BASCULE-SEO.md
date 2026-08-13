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

### ⛔⛔ `ancienneUrl` NE PEUT PAS PRODUIRE LES 301 — 93 fiches sur 170 sont en collision `[mesuré le 12/08/2026]`

**Le champ `ancienneUrl` du schéma `realisation` porte la mention « ⛔ Ne pas modifier : c'est elle
qui produit la redirection 301 ». Il est inexploitable en l'état.**

Relevé sur les 170 fiches publiées dans Sanity :

| | |
|---|---|
| fiches portant une `ancienneUrl` | **170 / 170** |
| adresses **distinctes** revendiquées | **98** |
| adresses revendiquées par **plus d'une** fiche | **21** |
| fiches prises dans une collision | **93** — soit **54 %** |
| fiches à l'adresse propre, 1 pour 1 | 77 |

Les quatre pires, et ce sont les articles qui portent le plus de trafic :
**13 fiches** revendiquent `/actualites/motion-design-3d-et-mapping-a-paris-au-musee-rodin/`
(9 clics/an) · **11** revendiquent `/actualites/carte-de-voeux-video/` (4 clics) · **11**
revendiquent `/actualites/bluevista-video-showreel-2023/` (5 clics) · **9** revendiquent
`/actualites/video-mapping-lyon-intercontinental-grand-hotel-dieu/` (8 clics).

⭐ **La cause est écrite en clair dans la source, et n'a jamais franchi la frontière.**
`src/app/apercu/_realisations.ts` prévient en tête de fichier : *« ⚠️ CE QUI RESTE DÉDUIT, ET DONC
À RELIRE : … l'ancienne URL quand aucun rapprochement n'a été trouvé »*. Le rapprochement s'est
fait **par mots-clés du titre**, pas par identité de projet. L'import a recopié le champ tel quel,
et le schéma Sanity l'a promu **source de vérité des 301** — un champ documenté comme *déduit* en
amont est devenu *contraignant* en aval.

👉 **Deux redirections fausses, vérifiées à la main** : la fiche `ENSTO – Showroom virtuel`
revendique l'article **GF Machining Solutions** — deux clients différents, et GF est justement la
référence citable côté suisse. La fiche `Motion Design Sodexo` revendique l'article **Musée
Rodin** — le meilleur article du lot, 9 clics et 705 impressions, envoyé chez un autre client.

⛔ **LE PIÈGE DE MÉTHODE, ET IL A DÉJÀ FAILLI PASSER** : mon premier contrôle comparait
`PLAN-REDIRECTIONS.csv` à `ancienneUrl` et annonçait **zéro divergence**. Les deux étaient
construits **depuis la même déduction** — le contrôle confirmait l'erreur au lieu de la lever.
Le contrôle qui tranche est venu d'un autre côté : **comparer le titre de l'article WordPress au
titre de la fiche.** *(Même famille que les treize « ✓ » écrits dans des champs que personne ne
lit.)*

**Le geste retenu :**
1. ⛔ **Ne jamais générer les 301 depuis `ancienneUrl`.** La carte se construit depuis l'**article**
   (63 en français, comptés en direct sur l'API WordPress), pas depuis la fiche.
2. **Vider `ancienneUrl` sur les 93 fiches en collision.** Une adresse revendiquée par treize
   fiches ne transmet rien et produit une redirection fausse ; vide vaut mieux que fausse.
   Les 77 propres restent. ⏳ *En attente de l'accord de Giz — écriture dans Sanity.*
3. **Corriger la source aussi**, `src/app/apercu/_realisations.ts` : sinon un ré-import réinstalle
   les 93 collisions.
4. ⚠️ **Le même doute pèse sur les 85 `ancienneUrl` en `/nos-realisations/`** — mêmes collisions
   (6 fiches sur `olinn-video-publicitaire`, 5 sur `verizon-connect-video-de-presentation`). À
   reprendre avec la même méthode avant d'attaquer les 751 redirections.

⚠️ **`PLAN-REDIRECTIONS.csv` n'a pas de colonne de domaine** : la même URL relative y figure deux
ou trois fois (FR, EN, CH) et ne se distingue que par sa position dans le fichier. À corriger avant
de s'en servir pour générer quoi que ce soit.

### ⛔⛔ LA CAUSE PROFONDE : 26 fiches du portfolio ont été FABRIQUÉES À PARTIR D'ARTICLES `[12/08/2026]`

Sur les 170 fiches `realisation` publiées dans Sanity, **26 portent le slug ou le titre exact d'un
article WordPress**. Le portfolio réel en compte 145 — l'écart est là.

**Une bonne moitié ne sont pas des projets clients du tout** : *Notre premier vol de drone, c'était
en 2012 !* · *La réalité virtuelle Oculus à Bluevista* · *Nouveau matériel – Motion control
Kessler* · *Nos dernières interviews* · *Découvrez notre nouvelle bande démo 3D* · *Streaming Live
et WebTV démo 2018* · *Un tournage en préparation dans le Vercors* · *Le Métaverse bluevista* ·
*GETLIVE TV 3.0* · *Film d'entreprise – vidéo 15 ans d'expérience* · *Vidéo immersive 360°* ·
*Projet de réalisation vidéo 360* · *Social wall pour espace VIP*.

**Et plusieurs doublent une fiche réelle** : `50ans-de-lpa-une-histoire-lyonnaise` double
`lpa-50ans-video-anniversaire` · `mase-4-motions` double `mase-rhone-alpes-motion-design` ·
`artcurial-20ans` double `artcurial-video-mapping` · `stann` double
`stann-presentation-video-de-l-application` · `video-et-site-web-funseaker-yacht` double
`funseaker-presentation`.

⭐ **La signature qui les trahit, et elle est mécanique** : sur ces fiches, le champ `client` est le
**premier mot du titre** — « Notre », « Nouveau », « Nos », « La », « Le », « Un », « Vidéo »,
« Série », « Social », « Streaming », « Découvrez », « Projection », « Animation », « Live »,
« Sport », « Film », « 50ans ». Un client ne s'appelle pas « Notre ».
👉 **Le contrôle réutilisable** : `client == premier mot du titre` désigne une fiche dont le client
n'a jamais été renseigné. 70 fiches sur 170 sont dans ce cas — la plupart légitimement (le titre
commence vraiment par le nom du client, `TETRO`, `SANTOS`, `KOESIO`), **mais c'est le filtre qui
fait sortir les 26**.

### ⭐⭐ LA RÈGLE QUI CLÔT LE SUJET `[Giz, 12/08/2026]`

*« en gros tout ce qui est noté avec le slug actualités est une actualité »* — et
*« comme c'est une actualité on parle des projets larges. DONC il peut y avoir plusieurs vidéos
dedans […] on parle d'un projet global à chaque fois. »*

👉 **Une actualité et une réalisation sont deux objets, pas deux rangements du même.** Une
actualité couvre un **projet large** — plusieurs vidéos, des photos, une mise en page riche ; une
réalisation couvre **un** projet. Demander « à quelle réalisation correspond cette actualité ? »
est une question mal posée.

⛔ **Conséquence sur ce chantier, et elle est radicale** : les 63 pages `/actualites/` **restent
des actualités et gardent leur adresse**. Il n'y a ni migration vers les réalisations, ni table de
redirection à construire pour elles. C'était la prémisse du chantier n°1 — elle était fausse.

⛔ **Vocabulaire** : ne jamais écrire « fiche » dans un échange avec Giz. On dit **une
réalisation**, **une actualité**, ou **un cas client** si un troisième objet est créé.

**Le seul arbitrage qui reste, et il est à deux conditions CUMULATIVES** : une actualité **peu
fournie** ET qui **chevauche vraiment** une réalisation identique. Deux issues, pas une —
*« soit on vire l'actualité, soit on change les mots clefs pour parler du même projet de manière
différente »*. La réécriture est la sortie par défaut quand l'actualité est riche.

**Le geste retenu :**
1. ✅ **Fait** — les 25 réalisations créées depuis `/actualites/` sont supprimées de Sanity
   (`next-app/scripts/curer-realisations-inventees.mjs`, sauvegarde JSON à côté). Le portfolio est
   retombé à **145**, exactement le nombre du vrai export. L'importeur ne lit plus
   `_realisations-migrees.ts` : le relire les recréerait.
2. ✅ **Fait** — `CLASSEMENT-ACTUALITES.csv` porte les 63 articles relus depuis leur contenu, avec
   la **preuve** de chaque ligne (client nommé, lien sortant vers le site du client, réalisation
   liée par l'article lui-même).
3. ⏳ **Reste** — le test de concurrence, mesuré sur `fr-page-x-requete.csv` : voir ci-dessous.

### 📊 La concurrence actualité / réalisation, MESURÉE `[12/08/2026]`

Croisement page × requête de la photo Search Console, requêtes de marque écartées. **Sept couples**
où les deux pages se présentent sur les mêmes requêtes :

| actualité | mots | impr. | réalisation | impr. |
|---|---|---|---|---|
| `stann` | 458 | **7 084** | `stann-lapplication-de-gestion-dentreprise` | 4 736 |
| `aravi-saison-2022-2023` | 455 | 773 | `aravi-saison-2022-2023` | 19 |
| `guitare-en-scene-2023` | 457 | 148 | `guitare-en-scene-edition-2023` | 25 |
| `animation-3d-produit-hitachi-csnet-manager` | 269 | 77 | `hitachi-cs-net` | 203 |
| `koesio-carte-de-voeux-2023` | 495 | 65 | `koesio-voeux-2023` | 13 |
| `realisation-immersion-360-…-pisten-bully` | 272 | 54 | `pisten-bully-dameuse-360-vr` | 35 |
| `video-immersive-360` | 392 | 31 | `radisson-360-vr`, `serl-video-360-vr`… | 223 |

⛔ **Aucune de ces pages ne fait le moindre clic** — ni l'actualité, ni la réalisation, sauf STANN
où la réalisation en fait 4. Le problème n'est donc pas qu'une page en vole une autre : **les deux
sont trop basses pour convertir**, et elles se partagent l'autorité au lieu de l'additionner.
*(Même mécanisme que la paire Genève FR/CH — le partage, pas le vol.)*

⚠️ **Aucune de ces actualités n'est « peu fournie »** : 269 à 495 mots. La première condition de
Giz n'est donc remplie nulle part. 👉 **La sortie est la réécriture des mots-clés, pas la
suppression.**

### ⛔ ET EN REGARDANT REQUÊTE PAR REQUÊTE, TROIS COUPLES SEULEMENT SE BATTENT

Le tableau ci-dessus appariait sur « au moins une requête commune ». C'est trop large. Au détail :

- **Vraie concurrence — 3** : STANN, ARAVI, Guitare en Scène 2023. ⭐ **Les trois se battent sur le
  nom d'un TIERS** — le logiciel, l'écurie, l'affiche du festival. **8 300 impressions, 2 clics** :
  aucune de ces recherches n'a d'acheteur, et celle qui gagnerait ne gagnerait rien. 👉 **Ne rien
  réécrire.** Seul geste, gratuit : que la réalisation porte *client + prestation* (sa règle de
  titre) et l'actualité *l'histoire du projet*.
- **Déjà séparés tout seuls — 3** : Hitachi (l'actualité tient « csnet manager », la réalisation
  tient « cs net » et « csnet lite ») · Pisten Bully (l'actualité tient le sujet, la réalisation
  tient la technique) · Koesio. Garder chaque titre sur le terme qu'il occupe déjà.
- **Pas une concurrence, une occasion — 1** : voir ci-dessous.

### ⭐⭐ LE VRAI SUJET : DEUX ACTUALITÉS SE BATTENT AVEC LES PAGES SAVOIR-FAIRE

**① Vidéo immersive — l'actualité de 2014 est en PREMIÈRE PAGE, la page savoir-faire est en page 3.**

| page | impressions/an | position |
|---|---|---|
| `/actualites/video-immersive-360/` | **2 727** | **9,9** sur « vidéo immersive » (1 452 impr.) |
| `/nos-competences/creation-immersive-realite-virtuelle/` | 1 502 | 55,9 sur « agence réalité virtuelle » · 32,2 sur « création de vidéo immersive 360 » |

⛔ **Écrire la nouvelle page savoir-faire sur « vidéo immersive » la ferait affronter une page
installée depuis dix ans. Les deux y perdraient** — partage d'autorité, pas vol.

✅ **Appliqué le 12/08** (`next-app/scripts/caler-page-realite-virtuelle.mjs`) : la page savoir-faire
prend la moitié **commerciale** — *agence*, *production*, *showroom virtuel* ; l'actualité garde la
moitié **descriptive** — *vidéo immersive*, *expérience vidéo 360*.
⚠️ Au passage, le champ `texte` de cette page portait encore la prose de l'ANCIEN site, **visible au
rendu**, fautes comprises (« sensibiliser votre audiences ! », « font parti », « cette univers ») et
finissant sur « notre vidéo immersive pour Cémoi : » suivi de rien. 👉 **À vérifier sur les autres
pages savoir-faire : le même import a pu laisser le même résidu.**

**② Carte de vœux vidéo — vue 1 988 fois, choisie zéro fois.**

L'actualité générique tient seule toute la famille « vœux » (1 905 des 1 988 impressions), aux
**positions 19 à 24**. Aucune page savoir-faire ne couvre ce marché. Être vu deux mille fois en
page 2 sans un seul clic n'est pas un problème de contenu : **c'est le titre et la description qui
ne donnent pas envie**. C'est le geste le moins cher du chantier.

### 📌 À APPLIQUER À LA MIGRATION — les titres et descriptions de deux actualités

⛔ **On ne touche pas à l'ancien site** : ces textes se posent le jour où les actualités passent sur
le nouveau. Chaque élément ci-dessous vient du texte de l'article, rien n'est inventé.

**`/actualites/carte-de-voeux-video/`** — garde son adresse, et la famille « carte de vœux vidéo ».
- Titre : `Carte de vœux vidéo d'entreprise : nos réalisations | Bluevista` *(62 signes)*
- Description : `Motion design, film décalé avec vos collaborateurs ou réalité augmentée : nous concevons vos vœux en vidéo depuis 2004, de l'idée à la diffusion.` *(146)*

**`/actualites/koesio-carte-de-voeux-2023/`** — ⛔ **retirer « 2023 » du titre.** La page dérive
aujourd'hui sur « carte de voeux 2023 » en **position 67** — des gens qui cherchent une carte à
envoyer, pas une agence. Recentrer sur Koesio et la fabrication.
- Titre : `Koesio — la carte de vœux peinte par 25 enfants | Bluevista` *(58)*
- Description : `Studio parisien, cyclo blanc, 25 enfants de collaborateurs peignent en direct, Louis Bertignac joue la musique. Une vue de la vidéo = 1 € pour Arc En Ciel.` *(153)*
- ⚠️ L'adresse, elle, ne change pas : `koesio-carte-de-voeux-2023` porte « koesio studio »
  (64 impr.). Changer le slug coûterait une redirection pour rien.

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
- ✅✅ **Les segments d'URL ne sont plus un point ouvert — tranchés et verrouillés le 10/08/2026**,
  sourcés sur 10 agences anglophones et 7 hispanophones :
  `realisations` → **`work`** / `proyectos` · `savoir-faire` → **`services`** / `servicios` ·
  `offres` → **`what-we-do`** / `que-hacemos` · ⛔ **pas de page de ville en EN ni en ES**, et les
  villes françaises vivent **à la racine**, sans segment.
  📌 **La source de vérité est le code** : `next-app/src/lib/hreflang.ts` → `const SEGMENTS`.
  ⛔ Ne pas les redemander à Giz, et ne rien recopier depuis un autre document que celui-là.
- ⏳ **Le marché genevois ANGLOPHONE** — *corporate video production geneva* : 185 impressions,
  **position 4**, zéro clic, sur une page française. Aucun des deux sites ne le sert. C'est un
  chantier pour la version anglaise de bluevista.ch, pas une correction côté français.
- ⏳ **Mentions légales et politique de confidentialité** — obligatoires, toujours absentes.
  Bloquant pour une mise en ligne.
