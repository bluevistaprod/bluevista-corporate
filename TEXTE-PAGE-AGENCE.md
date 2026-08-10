# Page agence — texte validé avec Giz le 10/08/2026

> ⚠️ **Texte, pas code.** Rien n'a été appliqué dans `next-app/`. À intégrer dans la conversation
> site web.
> 📌 Le registre qui l'a produit vit dans le cerveau : `partageable/savoir/reference/voix-marketing.md`
> (les règles) et `partageable/savoir/exemples/voix/marketing.md` §12 (les diffs réels de la
> session). ⛔ Ne pas réécrire ce texte sans les avoir chargés.

## Balises

- `<title>` — **Agence de production audiovisuelle à Lyon et Paris | Bluevista**
- `H1` — **Agence de production vidéo et audiovisuelle depuis 2004**
- ⛔ **Pas « Genève » dans le title ni le H1.** La page capte déjà 236 impressions suisses pour
  zéro clic — c'est la fuite que le cloisonnement FR/CH veut empêcher.
- ⛔ **URL `/agence/` à conserver** à la bascule : 38 clics/an d'historique.

## Le texte

### Accroche

> **Vous nous confiez un sujet, pas un dossier.**
>
> Sur chaque étape de votre projet vidéo, la compétence est ici : c'est pourquoi nous réalisons
> l'essentiel en interne. Un renfort extérieur ne change rien à qui répond du résultat.

### Les frustrations

> **Si vous avez déjà confié un projet à une agence, ces situations vous diront quelque chose.**
>
> **On vous demande tout** — Le brief, les textes, les visuels, les contacts, les autorisations :
> vous fournissez tout et vous relancez vos collègues, alors que vous aviez confié le projet.
>
> **Le projet prend du retard, pas votre date** — L'événement, lui, ne se décale pas.
>
> **Vous répétez les mêmes demandes** — Vous redites la même chose à chaque étape, parce que la
> personne qui vous écoute n'est jamais celle qui exécute.
>
> **Chaque ajout devient une option** — Le budget que vous aviez fait valider en interne ne tient
> plus, parce que chaque demande se transforme en supplément.

⛔ **Aucune réponse dans ce bloc** (règle 8c). Pas de note backstage ici — Giz s'est repris
explicitement sur ce point.

### La pique — une seule par page

> **Une agence qui vous demande tout n'a pas de méthode. Elle a un formulaire.**

### La méthode

> Avant toute production, nous analysons vos communications existantes et leurs résultats.
>
> **Six étapes simples et une boucle d'amélioration.** Des points d'étape réguliers et définis, qui
> vous font gagner du temps sans perdre en flexibilité.
> *(On sait bien qu'il y aura toujours quelques modifications de dernière minute. Elles ne
> remettent pas le concept en cause.)*
>
> Le concept vous arrive chiffré dès la conception, et la même méthode vaut pour un film, un
> événement ou une expérience immersive.

📌 La parenthèse est le **gimmick backstage** — phrase sérieuse, puis note complice. Voir
`voix-marketing.md` § 9 bis.
🔗 « un film, un événement ou une expérience immersive » doit porter **trois liens internes**.

### Les gens et les métiers

> **Quatre pôles : production vidéo, son, infographie, développement.**
> Concepteurs, réalisateurs, infographistes, cadreurs, monteurs, développeurs.
> Les mêmes personnes suivent votre projet du premier rendez-vous à la mise en ligne.

📷 **Photos au travail** — en montage, en tournage, en régie. Jamais un groupe posé, jamais de
photo où l'on peut compter les têtes. ⛔ **Aucune image IA** pour ce qui montre Bluevista.

### L'histoire

> **Agence de production audiovisuelle née à Lyon en 2004**, Bluevista travaille aujourd'hui à
> Lyon et à Paris. Les outils ont changé, des premiers casques Oculus aux plateformes web 3D. La
> première question n'a pas bougé : qu'est-ce que ce projet doit produire ?
>
> **Plus de 2 000 projets** menés depuis.

⛔⛔ **« 145 réalisations » est retiré** `[Giz, 10/08/2026]` — ce chiffre comptait les **fiches
publiées sur le WordPress**, pas la production. Comptage Podio : 1 489 projets actifs + 1 792
archivés (les deux apps se recoupent), et Podio ne démarre qu'en 2014. **Plus de 2 000 depuis 2004
est prudent.** Détail et réserves dans le cerveau → `metier/site-web.md`.

### Les convictions

> **Ce sur quoi nous ne cédons pas**
>
> Un concept n'est retenu que si nous sommes fiers de le produire.
> Un projet qui n'est pas diffusé n'a rien produit : la diffusion fait partie du travail, pas des
> options.
> Vous nous exposez un problème, nous vous proposons une solution — et quand nous ne sommes pas
> d'accord, nous le disons.

### Les moyens

> Une grue de six mètres et des drones, pour les mouvements que l'épaule ne permet pas. Unreal
> Engine, Blender et Cinema 4D, parce que la 3D et le temps réel se fabriquent ici. Notre propre
> parc de casques, pour tester une expérience avant de vous la promettre.
> *(Oui, on les met sur la tête des clients en réunion. Ça raccourcit beaucoup les débats.)*

🔗 Cette section doit renvoyer vers les pages compétence — `studio animation 3D Lyon`, `vidéo
mapping`, `live streaming` — **avec ces mots en ancre**. C'est le vrai rôle SEO de la page.

### Les références

> L'**ONU**, l'**UNICEF**, la **BBC**, **NHK**. **EDF**, **Vinci**, **Procter & Gamble**,
> **GL Events**. Le **Musée des Confluences**, la **Ville de Lyon**, le **Parc naturel régional du
> Vercors**.

⚠️ **À trancher avant mise en ligne** : ces noms viennent du mémoire Région AuRA. Les citer dans un
marché public n'est pas les publier. La tâche Podio sur la règle de publication client n'est pas
tranchée.
⚠️ **Le titre reste à trouver** — « Ils nous font confiance » est la formule KabochArts, classée
repoussoir.

### Clôture

> Voyons **ensemble** ce que votre prochain projet doit faire.
> \> un appel de 30 minutes ?
> \> ou envoyez-nous votre sujet — nous vous dirons ce que nous en ferions.

---

## Deux corrections à appliquer aussi dans `_Methode.tsx`

Les deux seuls résumés d'étape qui **décrivent un moyen** au lieu d'affirmer quelque chose :

| Étape | Actuel | Remplacer par |
|---|---|---|
| Production | *« En décors réels ou en studio. »* | **Nous tournons en décors réels ou en studio, et vous pouvez accompagner les équipes sur site.** |
| Diffusion | *« Le film part sur ses supports. »* | **Le projet est livré à tous les formats utiles et mis en ligne, parce qu'un projet qui n'est pas diffusé n'a rien produit.** |

Et le **jargon à traduire** dans les textes de détail : *dérushage* → tri et sélection des images ·
*animatique* → maquette animée du storyboard · *conformation* → mise aux formats · *étalonnage* →
harmonisation des couleurs · *sound design* → création sonore · *masters* → fichiers finaux.
✅ **« Avant-première » se garde** — tout le monde comprend, et son résumé *« Tout est monté, rien
n'est public »* est un des meilleurs du cercle.
