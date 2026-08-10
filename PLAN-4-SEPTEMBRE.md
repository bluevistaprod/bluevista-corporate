# Le site en ligne pour le 4 septembre — FR / EN / CH-FR

> **Priorité n°1 posée par Giz le 10/08/2026.** 19 jours ouvrés.
> ⛔ La photo Search Console est prise (`PHOTO-SEARCH-CONSOLE-2026-08-07/`) : le filet de
> sécurité est en place, on peut travailler.

---

## ⚠️ Deux choses à trancher avant de lancer la machine

### 1. Le 4 septembre est un VENDREDI

⛔ **On ne bascule pas un site un vendredi.** Si quelque chose casse, personne n'est là pendant
48 h — et les premières heures sont exactement celles où l'on rattrape une redirection manquée.

👉 **Bascule le mardi 1er ou le mercredi 2 septembre**, et le 4 devient la marge. On garde la
date d'annonce, on avance la manœuvre.

### 2. ⭐ CH-FR n'est pas une traduction, et c'est ce qui rend la date tenable

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

### Semaine 1 — 11 au 17 août · **fermer le FR**
- Balises des pages restantes (accueil, agence, contact, réalisations, métiers).
- Gabarit d'article + migration des actualités.
- Formulaire branché sur Podio en natif (app Ventes) — avec `gclid` et type de demande.
- Bandeau de consentement + Consent Mode v2 (obligatoire pour Ads dans l'EEE).
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
- **Mardi 1er ou mercredi 2 : bascule.**
- Sitemaps soumis, Search Console surveillée quotidiennement.
- Jeudi/vendredi : correction de ce que le réel aura révélé.

---

## ⛔ Ce qu'on accepte de ne PAS faire pour tenir la date

Le dire maintenant évite de le découvrir le 2 septembre.

- **L'espagnol.** Prévu, pas pour cette échéance.
- **Les animations poussées.** Le site sera sobre ; ça ne coûte aucun référencement.
- **Les 170 réalisations en EN.** On traduit celles qui portent le trafic, les autres suivent.
- **La stratégie d'avis Google.** Conversation séparée, après la bascule.
- **Le nouveau bluevista.ch complet.** CH-FR sort en périmètre réduit et s'étoffe ensuite.

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

📌 Le détail de ce qui doit être exécuté à la bascule vit dans **`BASCULE-SEO.md`** — ce
document-ci donne le calendrier, l'autre donne les gestes.
