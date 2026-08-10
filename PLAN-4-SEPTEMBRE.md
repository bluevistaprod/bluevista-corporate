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
