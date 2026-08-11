# Le site en ligne pour le 4 septembre — FR / EN / CH-FR

> **Priorité n°1 posée par Giz le 10/08/2026.** 19 jours ouvrés.
> ⛔ La photo Search Console est prise (`PHOTO-SEARCH-CONSOLE-2026-08-07/`) : le filet de
> sécurité est en place, on peut travailler.

---

## ⚠️ Deux choses à trancher avant de lancer la machine

### 1. ✅ Bascule le VENDREDI 4 SEPTEMBRE — tranché par Giz

J'avais recommandé un mardi, au motif classique qu'on ne bascule pas un vendredi : si ça casse,
personne n'est là pendant 48 h. **Sa réponse lève l'objection** : *« je suis en week-end après,
JE pourrai intervenir »*. La disponibilité est donc meilleure le week-end que la semaine — c'est
l'inverse du cas général, et ça change la réponse.

⚠️ **Ce que ça impose en contrepartie**, et qui n'est pas négociable : **la recette est finie le
mercredi 2 au soir.** On ne bascule pas avec une vérification en cours. Le jeudi 3 sert de marge,
pas de rattrapage.

### 2. ⭐ CH-FR n'est ni une traduction ni une copie — et il lui faut SON ton

On a mesuré aujourd'hui que la page Genève française et sa jumelle suisse se recouvrent à **98 %**
— et que **les deux sont enterrées**, à 45 et 55. Le hreflang sélectionne, il ne consolide pas :
deux pages quasi identiques se partagent l'autorité au lieu de l'additionner.

👉 **Dupliquer le site en suisse serait donc à la fois le plus long ET le plus mauvais.**
La version CH-FR doit être **plus petite et différente** — ce que Giz voulait déjà :
*« en Suisse on dit qu'on est suisse only, on ne montre pas tous les projets, on a un langage
différent »*.

**Périmètre CH-FR proposé** : accueil · agence · contact · 4 à 5 savoir-faire réellement vendus
en Suisse · les réalisations suisses uniquement. **Pas les 170 réalisations, pas les 9
savoir-faire.** Moins de pages, textes propres, et un site qui ne se bat pas contre lui-même.

#### ⭐⭐ Et il lui faut un ton de voix suisse, sourcé — pas le ton français traduit

`[Giz, 10/08/2026]` *« on devra trouver un ton de voix adapté au marché suisse, en sourçant des
concurrents suisses… afin de trouver LE ton marketing suisse. Il faudra faire de même avec
l'anglais et l'espagnol en temps voulu. »*

👉 **C'est un prérequis à la rédaction, pas une finition.** Écrire les pages suisses puis « les
adapter » revient à écrire deux fois. La session se tient donc en **semaine 1**, avant la
rédaction de la semaine 2.

**Méthode** — la même qui a produit `voix-marketing.md` le 10/08, et qui a marché :
- sourcer 4 à 5 agences audiovisuelles suisses romandes et relever leur wording réel ;
- confronter au registre français : ce qui se transpose, ce qui ne se transpose pas ;
- ⚠️ **le piquant est le premier suspect** — le registre le note déjà : *« ne se transpose pas
  tel quel en Suisse, à tester avec prudence »* ;
- livrable : une section « Suisse » dans `voix-marketing.md`, avec ses propres étalons.

📌 **Le même geste sera à refaire pour l'anglais, puis l'espagnol.** Ce n'est pas une traduction
du registre : un ton se sourcé sur le marché où il s'exprime. À planifier en temps voulu, pas
maintenant.

---

## Ce qui bloque, et que JE ne peux pas faire

⛔ **C'est cette colonne qui décide de la date.** Le reste est du travail que je peux mener.

| Bloquant | Pourquoi c'est vous | Échéance |
|---|---|---|
| **Mentions légales + politique de confidentialité** | Juridique. **Aucune mise en ligne commerciale sans elles.** | 20/08 |
| **Arbitrage références clients** (ONU, UNICEF, BBC…) | Règle « on demande » ; tâche Podio non tranchée. Le bloc est en place et vide. | 20/08 |
| **Accès hébergement + DNS** | Il faut savoir OÙ le site va vivre et qui pointe le domaine. | 18/08 |
| **Les 36 réalisations sans image** | Les visuels sont chez vous. | 25/08 |
| **144 vidéos Vimeo → Livid** | Migration côté Livid. | 25/08 |
| **La genèse de l'agence** | Le seul texte du site où quelqu'un parle en son nom. Deux paragraphes. | 22/08 |
| **Validation des segments d'URL traduits** | `realisations` → `works` / `proyectos`. Un segment se référence : le changer après coûte une redirection par page. | 15/08 |
| **Périmètre CH-FR** | Quelles pages, quels projets suisses. | 15/08 |
| **Clé API Podio dédiée au site** | ⛔ **Devenu obligatoire** : Podio affiche sur la clé « claude » *« les clés API ne doivent pas être partagées entre plusieurs utilisateurs »*, et son plafond horaire est déjà dépassé (270 req/h pour 250). Un formulaire public, c'est beaucoup d'utilisateurs — le brancher là aggraverait un manquement constaté. ⚠️ Ce n'est **pas un programme à héberger** : un identifiant + un secret déclarés une fois sur podio.com/settings/api. | 25/08 |
| **Régénérer les deux clés API existantes** | Les codes secrets de `N8N` et `claude` sont apparus en clair dans une capture d'écran partagée le 11/08. Le bouton ↻ de chaque ligne les remplace. ⚠️ Après régénération, mettre à jour `~/.mcp-secrets.json`, sinon les serveurs MCP maison tombent. | 15/08 |

---

## 🔌 Le formulaire est branché — état au 11/08/2026

**QUATRE apps, pas cinq** `[arbitrage de Giz, 11/08/2026]`. La règle qu'il pose vaut
d'être retenue : **une app par ENTITÉ QUI FACTURE, pas une app par langue.**

| Destination | Reçoit |
|---|---|
| **Ventes** (4233499) | les demandes du site **FR et du site EN** |
| **VentesCH** (21309386) | les demandes du site suisse — autre société, autre facturation |
| **Candidatures** (4241365) | les candidatures des trois sites |
| **Demandes de stage** (11808404) | les stages des trois sites |

⛔ **Ventes ENG (12487900) ne reçoit plus rien** — elle garde ses 27 items d'historique
et n'est pas supprimée. L'anglais est vendu et facturé par Bluevista France : une app
de plus, c'était un CRM de plus à tenir pour zéro bénéfice.

⭐ **Ce que la fusion impose en contrepartie : identifier l'origine SANS OUVRIR
L'ITEM.** `[Giz : « il faudra qu'elles soient bien identifiées en arrivant »]`
« En arrivant » veut dire **dans la liste**, pas dans l'item ouvert — c'est ce qui a
décidé de l'emplacement du marqueur.

| Où | Ce qui est posé |
|---|---|
| **Titre** | préfixe **`[EN]`** ou **`[CH]`** dès qu'une demande vit dans une app qui n'est pas la sienne. Aucun préfixe pour une demande FR dans l'app FR, ni pour une demande suisse dans VentesCH. |
| **Champ « Lieu »** (Candidatures) | **Suisse** — l'option existe déjà et les RH filtrent dessus. On s'en sert plutôt que d'inventer un marqueur. ⚠️ Aucune option ne correspond à « anglophone » : un candidat du site EN n'a que le préfixe. Mieux vaut un champ vide qu'un champ faux. |
| **Première ligne du texte** | *« Reçu sur : Site ANGLAIS (en.bluevistaprod.com) — le prospect écrit et attend une réponse en anglais »* |

✅ **Champ « Lieu » créé sur Demandes de stage** le 11/08/2026, options recopiées de
celles des Candidatures. ⚠️ Sa clé technique est `lieu-2` : un champ « Lieu » avait été
supprimé un jour sur cette app, et Podio garde l'external_id d'un champ supprimé
réservé pour toujours.

### 👁️ Ce que le VISITEUR voit — calé sur les anciens formulaires

`[Giz, 11/08/2026 : « je ne souhaite pas donner accès à TOUS les champs »]`
Relevé sur les webforms Podio réellement en service, pas de mémoire.

| Formulaire | L'ancien site demandait | Écart aujourd'hui |
|---|---|---|
| **Projet** (form 330872) | e-mail · nom · téléphone · entreprise · demande · **date prévisionnelle** | ✅ date prévisionnelle **remise** · ⏳ le site ajoute le **pilier** et le **budget** (voir ci-dessous) |
| **Projet CH** (form 1477805) | les mêmes, **sans** date prévisionnelle | date prévisionnelle laissée facultative partout |
| **Candidature** (form 331525) | nom · contrat · message · téléphone · e-mail · lien · **compétences** · poste actuel | ✅ identique |
| **Stage** (form 818799) | nom · e-mail · téléphone · poste · message · lien · dates | ✅ le bloc **compétences a été retiré** — il n'y était pas |

⛔ **RIEN d'autre n'est exposé.** `gclid`, `Lieu`, « conversion pub », l'état
« 1er contact », le préfixe de titre et la ligne d'origine sont **écrits par le
serveur** : ils n'apparaissent nulle part dans le formulaire et le visiteur ne peut ni
les voir ni les modifier.

⏳ **Deux questions en attente d'arbitrage — le pilier et le budget.** Ils ne
figuraient pas sur l'ancien formulaire. **Recommandation : les garder.** C'est
précisément parce que le type de demande n'était **pas demandé** que le champ Podio
disait « film » 195 fois sur 210 — il prenait la valeur par défaut de l'app, y compris
sur les 106 candidatures spontanées. Le poser en vraie question est le correctif que le
cerveau désigne comme le plus rentable du dossier Ads. Le budget, lui, est une décision
de la maquette (facultatif, par tranches).

- L'envoi passe par une **route serveur** (`/api/formulaire`). Le jeton Podio ne part
  jamais dans le navigateur — vérifié en fouillant les 229 fichiers du bundle client.
- **Le marché est déduit du DOMAINE**, pas de la page : `bluevista.ch` → VentesCH.
  Une demande suisse ne peut pas atterrir dans le CRM français.
- ✅ **Champ `gclid` créé le 11/08/2026** sur Ventes (field 277801394) et VentesCH
  (277801396) — external_id `gclid-google-ads`, Podio le dérive du libellé.
  Le gclid est donc dans une **colonne exportable en CSV**, ce qui rend possible un
  import de conversions hors ligne dans Google Ads. Le commentaire garde le contexte
  (page d'origine, UTM) ; la colonne garde la valeur qui s'automatise.
- **Le `gclid` est capté à l'atterrissage**, pas à l'envoi : il arrive sur la page
  d'annonce, et le formulaire est trois pages plus loin. Il voyage en `sessionStorage`.
  ⏳ **À basculer en cookie premier-parti 90 jours quand le bandeau de consentement
  sera posé** — même semaine, les deux chantiers se parlent.
- ⭐ **`conversion pub` = « oui google ads » est cochée automatiquement** dès qu'un
  gclid est présent, sur l'app FR où ce champ existe. Le cerveau notait qu'il n'avait
  jamais été rempli une seule fois sur 500 items : il l'est désormais sans geste humain.
  ⛔ **Inutile de le créer sur VentesCH** : depuis que le `gclid` a sa colonne, cette
  case ne fait que répéter, en moins précis, ce que le gclid dit déjà.
- ⭐ **Les candidatures ne peuvent plus polluer les Ventes.** Sur les 210 demandes de
  l'ancien formulaire, 106 étaient des candidatures spontanées classées « décliné par
  bluevista » — et chacune déclenchait une fausse conversion Ads. Trois formulaires,
  trois apps : le problème disparaît par construction.
- Anti-spam : champ piège + contrôle du temps de saisie + 3 demandes / 10 min par IP.
  ⚠️ Le compteur vit en mémoire du processus : à revoir si le site tourne un jour sur
  plusieurs instances.

### 🕸️ « Qu'on ne loupe JAMAIS rien » — le filet, en quatre couches

`[Giz, 11/08/2026]` Vérifié le jour même **en rendant Podio réellement injoignable**, pas
en relisant le code.

1. **La demande est écrite sur le disque AVANT d'être envoyée à Podio.** Pas après, pas
   « en cas d'erreur ». Tant qu'elle n'est que dans la mémoire du serveur, elle n'existe
   pas : une coupure et personne ne saura jamais qu'un prospect a écrit.
2. **Trois tentatives** vers Podio (0,5 s puis 2 s) sur panne réseau, 429 et 5xx.
   ⛔ Jamais sur un 400 : réessayer une création d'item dont on a mal lu la réponse
   fabriquerait un **doublon** dans le CRM.
3. **Si Podio refuse quand même** : la demande complète est conservée dans
   `a-rejouer/`, et **partie par mail** à contact@bluevistaprod.com — le mail porte la
   demande entière, pas une notification. Même si le rejeu ne tourne jamais, le
   commercial a le lead dans sa boîte.
4. **Le rejeu** : `node scripts/rejouer-formulaires.mjs` (aperçu) puis `--envoyer`.
   Les demandes passées sont **déplacées** dans `traitees/`, jamais supprimées.

⭐ **Et le visiteur n'est pas puni d'une panne qui n'est pas la sienne** : tant que sa
demande est conservée et qu'un humain est prévenu, l'écran de confirmation s'affiche.
Lui dire « ça n'a pas marché » serait faux — et le pousserait à renvoyer trois fois,
ou à partir.

✅ **`SMTP_PASS` renseigné le 11/08/2026**, connexion et authentification vérifiées
auprès de `mail.infomaniak.com` sans envoyer un seul message.

### 🔐 Le fichier `.env.local` — ce qui le protège, et ce qui ne le protège pas

**Vérifié, pas supposé** : jamais dans le bundle navigateur (8 valeurs sensibles
cherchées dans 242 fichiers, zéro trouvée) · jamais dans Git (`.gitignore` ligne 34,
confirmé par `git check-ignore`) · jamais servi en HTTP (hors de `public/`).
⚠️ Il était en **644, lisible par tous les comptes de la machine** — passé en **600**.
**À refaire sur le serveur après chaque déploiement** : `chmod 600 .env`.

⛔ **Le chiffrer n'apporterait presque rien.** L'application doit le lire au démarrage,
donc la clé de déchiffrement vivrait sur le même serveur : on déplace le problème d'un
fichier à l'autre. Le chiffrement au repos ne protège que contre quelqu'un qui obtient
le disque **sans** faire tourner l'application — une sauvegarde volée, un vieil
instantané.

👉 **Ce qui protège réellement, c'est de limiter ce qu'un secret lu permet de faire** :
· les 4 jetons Podio sont **cloisonnés par app** (403 vérifié sur les autres) et
révocables en deux minutes · plus aucun mot de passe de compte Podio humain sur le
serveur · la clé du site est séparée de celle des serveurs MCP.

⚠️ **La ligne la plus sensible est désormais `SMTP_PASS`** : c'est le vrai mot de passe
de la boîte `contact@bluevistaprod.com`. Qui le lit peut **lire et envoyer** du courrier
au nom de Bluevista.
👉 **Tâche Podio `317117400`, échéance 28/08** — créer une adresse d'envoi dédiée
(idéalement en envoi seul), ou obtenir un mot de passe d'application révocable à part.
⛔ À faire **avant** la mise en ligne : après, ce mot de passe sera sur un serveur
exposé au public.

⛔ **Et le vrai périmètre de risque n'est pas le fichier, c'est la liste de ceux qui
peuvent ouvrir une console sur l'hébergement.** Le cerveau consigne que **Yannis Febvre
détient un accès ADMIN Infomaniak** `[confirmé par Giz, 23/07/2026]`, accordé pour poser
les DNS Brevo. Un accès admin permet d'ouvrir la console SSH, donc de lire ce fichier.
👉 **À revoir : cet accès est-il encore nécessaire ?** C'est le geste qui réduit le plus
le risque, davantage que tout chiffrement.

✅ **La politique de confidentialité est écrite** (11/08/2026) — chaque donnée listée a
été relevée dans le code qui l'envoie, pas recopiée d'un modèle.

⛔ **Il y reste NEUF mentions `À COMPLÉTER`, surlignées en jaune dans la page** : raison
sociale et SIRET, adresse du siège, raison sociale de l'entité suisse, éditeur et pays
d'hébergement de Podio, hébergeur du site, deux durées de conservation, la date de
publication, et la section cookies (qui se finalise avec le bandeau de consentement).
**Tant qu'il en reste une, la page ne se publie pas et le formulaire ne collecte pas.**
⚠️ Le texte couvre les mentions exigées par l'article 13 du RGPD ; une relecture
juridique reste la bonne pratique pour un site commercial.

---

## Le calendrier

### Semaine 1 — 11 au 17 août · **fermer le FR + trouver le ton suisse**
- Balises des pages restantes (accueil, agence, contact, réalisations, métiers).
- Gabarit d'article + migration des actualités.
- Formulaire branché sur Podio en natif (app Ventes) — avec `gclid` et type de demande.
- Bandeau de consentement + Consent Mode v2 (obligatoire pour Ads dans l'EEE).
- ⭐ **Session « ton de voix suisse »** — sourcing des concurrents romands, puis arbitrage avec
  Giz. **Prérequis de la semaine 2.**
- ⏳ *Giz : segments d'URL, périmètre CH-FR.*

### Semaine 2 — 18 au 24 août · **EN complet + CH-FR différencié**
- Traduction EN des 18 pages et des réalisations retenues.
- Rédaction CH-FR **différenciée** sur le périmètre arrêté.
- hreflang sur les trois versions, contrôlé par `verifier-hreflang.mjs`.
- ⏳ *Giz : mentions légales, références clients, genèse, hébergement.*

### Semaine 3 — 25 au 31 août · **la bascule technique**
- Les 751 redirections implémentées et **testées une par une** — en priorisant les 30 URL qui
  font 90 % du trafic. ⚠️ Les 602 URL à zéro clic ne méritent pas le même soin.
- Photos et vidéos intégrées.
- Animations (volontairement en dernier : c'est le seul poste sacrifiable).
- Recette complète : cloisonnement, hreflang, vitesse, mobile, formulaires.

### Semaine 4 — 1er au 4 septembre · **mise en ligne**
- **Lundi au mercredi 2 : recette finie.** ⛔ Rien ne glisse au-delà.
- Jeudi 3 : marge.
- **Vendredi 4 : bascule.** Sitemaps soumis dans la foulée.
- Week-end : Giz d'astreinte, surveillance des erreurs dures uniquement.

### Semaine 5 — 7 au 11 septembre · **les deux chantiers d'après, décidés d'avance**
`[Giz, 10/08/2026]` Ils ne sont pas « la suite si on a le temps » : ils sont planifiés.

- **Les animations.** Concession acceptée pour la mise en ligne, rattrapée immédiatement après.
- ⭐ **Google Ads recâblé sur le nouveau site.** Objectif explicite : *« compenser
  potentiellement les pertes de trafic momentanées »*. Ce qu'il faut refaire : les URL de
  destination (toutes changent), le suivi des conversions, le `gclid` transmis au formulaire, et
  les groupes d'annonces alignés sur la nouvelle arborescence.
  ⚠️ **Sans Consent Mode v2, les conversions Ads ne remontent pas dans l'EEE** — c'est pour ça
  qu'il est en semaine 1 et pas ici.

---

## ⛔ Ce qu'on accepte de ne PAS faire pour tenir la date

Le dire maintenant évite de le découvrir le 3 septembre.

- **Les animations poussées.** Le site sera sobre ; ça ne coûte aucun référencement.
  ✅ **Rattrapées en semaine 5**, c'est acté.
- **Les 170 réalisations en EN.** On traduit celles qui portent le trafic, les autres suivent.
- **Le nouveau bluevista.ch complet.** CH-FR sort en périmètre réduit et s'étoffe ensuite.

### La liste « après », qui reste ouverte et ne se perd pas
- ⏳ **L'espagnol** — et avec lui la session « ton de voix espagnol », même méthode qu'en suisse.
- ⏳ **La session « ton de voix anglais »** — l'EN de septembre sera traduit du registre français ;
  son ton propre reste à sourcer.
- ⏳ **La stratégie d'avis Google.**

---

## Le jour J — l'ordre, et il compte

1. Photo Search Console **déjà faite** ✅ (`PHOTO-SEARCH-CONSOLE-2026-08-07/`).
2. Redirections en place **avant** le basculement DNS, jamais après.
3. Basculer. Vérifier immédiatement 30 URL au hasard parmi celles qui rapportent.
4. Soumettre les sitemaps des trois versions.
5. ⛔ **Ne rien « corriger » pendant 72 h** sur la foi des positions : Google réindexe, les
   chiffres sont faux pendant plusieurs jours. On ne corrige que les **erreurs dures** — 404,
   500, boucle de redirection.
6. À J+7 puis J+30 : `gsc_compare` sur `page`, et comparaison à la photo, URL par URL.

⚠️ **Le seul diagnostic qui compte les premières semaines** : une URL qui avait des clics dans la
photo et qui a disparu = une redirection manquée. Tout le reste est du bruit.

---

## 🎯 L'objectif de trafic, posé par Giz

> *« on sera TRÈS attentif au trafic pour que dans les 2 mois qui suivent il soit AU MOINS
> équivalent, puis parte dans l'espace après. »*

**La cible chiffrée est donc dans la photo** : **1 618 clics/an sur le FR**, 215 sur l'EN, 466 sur
le CH — soit ≈ 190 clics/mois pour les trois. **Au 4 novembre 2026, on doit être au moins là.**

⚠️ **Ce qu'il faut savoir avant de s'inquiéter** : une bascule bien faite coûte quand même 10 à
30 % pendant 4 à 8 semaines, le temps que Google réindexe et re-attribue. **Une baisse en
septembre n'est pas un échec ; une baisse encore présente en novembre en est un.**

👉 C'est exactement pour couvrir ce creux que Google Ads est recâblé en semaine 5.

---

📌 Le détail de ce qui doit être exécuté à la bascule vit dans **`BASCULE-SEO.md`** — ce
document-ci donne le calendrier, l'autre donne les gestes.
