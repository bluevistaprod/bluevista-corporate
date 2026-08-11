# Backoffice et multilingue — les options

**02/08/2026.** Document de décision. Rien n'est engagé tant que Giz n'a pas tranché.

---

## Ce qui doit décider, avant de comparer quoi que ce soit

Deux contraintes du projet éliminent la moitié des solutions. Elles ne sont pas
techniques, elles viennent de ce que Giz a demandé dès le premier jour.

### ⛔ Contrainte 1 — La Suisse n'est pas une traduction

> *« le site suisse doit être comme le FR et en EN aussi mais s'appeler
> bluevista.ch, et ne pas proposer les mêmes adresses. En Suisse on dit qu'on
> est suisse only, on ne montre pas TOUS les projets, on a un langage
> différent — mais on doit gérer le site depuis la même base. »*

C'est un modèle **multi-marchés**, pas un modèle multilingue. La différence est
énorme et elle passe souvent inaperçue :

| | Multilingue | Multi-marchés |
|---|---|---|
| Une page | existe dans 3 langues | existe **ou pas** selon le marché |
| Le texte | est traduit | est **différent** |
| L'adresse | `/en/mapping/` | peut être **autre chose**, ou ne pas exister |
| Le portfolio | le même partout | **filtré** — la Suisse ne montre pas tout |

👉 Toute solution qui traite la Suisse comme « le français, en Suisse » sera à
refaire. C'est le critère numéro un.

### ⛔ Contrainte 2 — Giz doit pouvoir changer un texte sans moi

C'est sa demande explicite, et elle disqualifie l'état actuel : aujourd'hui le
contenu vit dans le code. C'est parfait pour construire, invivable ensuite.

⚠️ Mais attention au piège inverse : **tout mettre dans un backoffice est une
erreur symétrique.** L'architecture des pages, l'ordre des sections, la méthode
en cercle — ce n'est pas du contenu, c'est de la conception. Le rendre éditable
donne l'illusion de la liberté et produit des pages cassées.

**La ligne de partage retenue :**

| Dans le backoffice | Dans le code |
|---|---|
| Les 170 réalisations | La structure des pages |
| Les textes de page (titres, chapôs, paragraphes) | La méthode en cercle et ses 3 parcours |
| Les images | La palette, la typographie |
| Les actualités | Les redirections |
| Les offres et leurs produits | Le plan du site |

---

## Les cinq options

### A · WordPress découplé — garder WP comme backoffice

Next.js affiche, WordPress stocke. L'API REST est **déjà en place** (le
mu-plugin Yoast a été déposé pendant ce chantier).

**Pour :** Giz et son équipe connaissent l'interface. Les 170 réalisations et
les 1 138 images y sont déjà. Zéro migration de contenu.

**Contre :** on garde un WordPress à mettre à jour, à sécuriser et à sauvegarder
— alors que **le but affiché de la refonte était d'en sortir**. Deux
hébergements, deux systèmes, deux surfaces d'attaque. Et WPML, pour le
multi-marchés, demande une gymnastique que personne ne voudra maintenir.

**Verdict :** l'option la plus rapide à démarrer, et celle qui coûte le plus
cher sur cinq ans.

### B · CMS dans les fichiers — Keystatic, Decap, Tina

Le contenu vit dans le dépôt Git, sous forme de fichiers. L'interface d'édition
écrit dans Git.

**Pour :** gratuit, versionné, aucun tiers, aucune base de données. Chaque
modification est un commit — on voit qui a changé quoi, et on revient en
arrière en une commande.

**Contre :** deux points bloquants ici. Les **images** : 1 138 fichiers dans un
dépôt Git, c'est un dépôt qui devient lourd et lent. Et le **multi-marchés**,
qui se bricole avec des dossiers et des conventions de nommage — ça marche
jusqu'au jour où quelqu'un se trompe de dossier.

**Verdict :** excellent pour un site de dix pages. Pas pour 170 réalisations
sur deux marchés.

### C · CMS hébergé — Sanity, Storyblok, Contentful

Le contenu vit chez un éditeur, l'interface d'édition est fournie, le site
interroge une API.

**Pour :** le multilingue et le multi-marchés sont pensés pour ça. Les images
sont servies par leur CDN, redimensionnées à la volée. L'interface est prête,
il n'y a rien à construire. Les rôles permettent de laisser quelqu'un publier
sans lui donner les clés du serveur.

**Contre :** le contenu vit ailleurs — il faut vérifier qu'on peut l'exporter,
et le faire régulièrement. Le coût monte avec le nombre d'utilisateurs.

**Entre les trois :** Storyblok a la meilleure édition visuelle mais son offre
gratuite est limitée à **un seul utilisateur** — rédhibitoire pour une équipe.
Contentful devient cher vite. **Sanity** a l'offre gratuite la plus large et,
surtout, **son interface d'édition s'installe dans l'application Next.js
elle-même** : un seul déploiement, un seul domaine, `bluevistaprod.com/admin`.

⚠️ Les tarifs changent — à revérifier au moment de décider, pas sur ce document.

### D · Base de données et interface sur mesure

MariaDB est déjà installé, Drizzle est déjà dans le projet.

**Pour :** contrôle total, aucun tiers, aucun abonnement.

**Contre :** **il faudrait construire l'interface d'administration.** C'est
plusieurs semaines, et surtout chaque champ ajouté plus tard devient une
demande de développement. L'objectif était l'autonomie de Giz : cette option
produit exactement l'inverse.

**Verdict :** à écarter. C'est la solution qui a l'air la moins chère et qui
coûte le plus de temps.

### E · Ne rien changer — le contenu reste dans le code

**Verdict :** disqualifié par la contrainte 2. Mentionné pour mémoire.

---

## Recommandation

> ### Sanity, avec l'interface d'édition intégrée à l'application Next.js.

**Les quatre raisons, dans l'ordre :**

**1. Le multi-marchés suisse est résolu proprement.** Chaque document porte un
champ « marchés » — France, Suisse, ou les deux — et son propre slug par
marché. Une réalisation qu'on ne veut pas montrer en Suisse n'y apparaît pas.
Un texte différent pour la Suisse est un texte différent, pas une traduction
approximative. C'est le critère qui élimine les options B et A.

**2. Le coût de migration est presque nul, et c'est nouveau.** L'argument fort
de WordPress était « le contenu y est déjà ». Il ne tient plus : le CSV
d'export contient les 145 réalisations avec titres, vidéos et descriptions, et
les images sont nommées par convention. **L'import est un script, pas une
saisie.** J'ai déjà fait ce travail pour la maquette.

**3. Un seul déploiement.** L'interface vit dans le même projet, sur le même
domaine. Pas de second hébergement, pas de second nom de domaine, pas de
seconde facture, pas de second système à mettre à jour.

**4. On sort vraiment de WordPress.** C'était le point de départ du chantier.

**Ce que ça coûte, honnêtement :** un abonnement quand l'équipe dépassera le
nombre d'utilisateurs de l'offre gratuite, et une dépendance à un éditeur
tiers — à compenser par un export automatique programmé, comme pour le cerveau.

---

## Le multilingue — les décisions à prendre en même temps

### Les adresses

```
bluevistaprod.com/realisations/          ← français, sans préfixe
bluevistaprod.com/en/work/               ← anglais
bluevistaprod.com/es/proyectos/          ← espagnol
bluevista.ch/realisations/               ← français suisse
bluevista.ch/en/work/                    ← anglais suisse
```

⛔ **Ce bloc portait `/en/works/` et `/es/realizaciones/` — deux valeurs
FAUSSES**, corrigées le 11/08/2026. Les bonnes sont `work` (singulier) et
`proyectos`, tranchées le 10/08 et sourcées sur 10 agences anglophones.
📌 **La source de vérité est le code**, `next-app/src/lib/hreflang.ts` →
`const SEGMENTS` — jamais un document.

⛔ **Le français reste sans préfixe.** C'est déjà construit ainsi (réécriture,
jamais redirection) et c'est ce qui protège les 751 adresses actuelles. Ajouter
`/fr/` obligerait à rediriger tout le site pour un gain nul.

📌 **Les slugs sont traduits, pas seulement les textes.** `/en/work/` et non
`/en/realisations/` : une adresse en français sur une page anglaise ne se
positionnera jamais sur une recherche anglaise.

### ⚠️ Le piège du contenu dupliqué entre les deux domaines

`bluevistaprod.com` et `bluevista.ch` seront tous deux en français. Sans
précaution, Google voit deux sites qui disent la même chose et en déclasse un —
exactement le mécanisme qui plombe déjà les pages villes.

Deux parades, **et il faut les deux** :

1. **`hreflang`** avec les variantes régionales : `fr-FR` et `fr-CH`, chacune
   déclarant l'autre. C'est ce qui dit à Google « ce sont deux versions
   régionales, pas deux copies ».
2. **Du contenu réellement différent.** C'est ce que Giz veut de toute façon —
   *« on ne montre pas TOUS les projets, on a un langage différent »*. La
   déclaration technique ne suffit pas si les pages sont identiques.

### Ce qui ne se traduit pas automatiquement, et qu'on oublie

- Les **titres et descriptions SEO** — une traduction littérale d'un bon titre
  français donne un mauvais titre anglais
- Les **images qui portent du texte**
- Les **formulaires** : les trois formulaires, leurs champs, leurs messages
- Les **formats** : dates, montants, numéros de téléphone
- Le **sitemap** : une entrée par langue et par marché

---

## L'ordre que je propose

1. **Trancher le backoffice** — ce document
2. **Modéliser le contenu** — réalisations, pages, offres, actualités, marchés
3. **Importer** les 170 réalisations depuis le CSV, par script
4. **Brancher les pages** de la maquette sur le contenu
5. **Le multilingue** ensuite, une fois le français figé — traduire une
   structure qui bouge encore, c'est traduire deux fois
6. **Les animations** en dernier : elles se posent sur une structure stable, et
   les poser avant oblige à les refaire

⚠️ **Les redirections ne dépendent d'aucun de ces choix** et peuvent avancer en
parallèle — `PLAN-REDIRECTIONS.csv` est prêt.
