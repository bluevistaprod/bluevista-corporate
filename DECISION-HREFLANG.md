# Le hreflang — décision du 02/08/2026

## Ce qui a été décidé

**On pose le hreflang** entre les cinq versions, malgré le cloisonnement strict
demandé pour les visiteurs.

Ce n'est pas une contradiction. Le hreflang est une ligne invisible dans
l'en-tête du code : personne ne peut cliquer dessus, Google ne l'affiche jamais
au visiteur, elle ne transmet aucune autorité. Elle dit une seule chose — *ces
pages sont des variantes régionales, pas des copies*.

## Pourquoi, et c'est contre-intuitif

Sans elle, Google voit deux pages françaises de la même entreprise, en choisit
une et **filtre l'autre**. Et c'est la plus forte qui gagne :
bluevistaprod.com a vingt ans d'historique et 751 adresses connues face à un
bluevista.ch neuf.

👉 **Le site français capterait donc les recherches suisses** — un prospect
genevois atterrirait sur l'entité qui ne peut pas le facturer. C'est
exactement l'inverse du cloisonnement voulu.

Le hreflang ne perce pas la séparation : **il la rend effective là où on ne
contrôle rien autrement**, c'est-à-dire dans les résultats de recherche.

`.ch` étant une extension nationale, Google la rattache déjà automatiquement à
la Suisse. Une partie de la protection est acquise ; le hreflang couvre le
reste, notamment les pages de savoir-faire dont les textes seront forcément
voisins d'un site à l'autre.

## Comment c'est fait

Rien n'est écrit à la main. `src/lib/hreflang.ts` interroge Sanity **à chaque
rendu** et ne déclare que les versions **réellement publiées**.

Trois règles y sont inscrites :

1. **Moins de deux versions publiées → aucune déclaration.** Une déclaration
   qui ne pointe que vers soi annonce un groupe qui n'existe pas.
2. **Seul le publié compte.** Un brouillon n'existe pas pour Google ; le
   déclarer produirait un hreflang vers une 404, le défaut qui fait ignorer
   tout le groupe.
3. **Le segment d'URL change avec la langue**, pas seulement le slug :
   `/realisations/engie` a pour équivalent `/works/engie`.

⛔ **La conséquence, et c'est la garantie demandée :** le jour où une version
est dépubliée dans le studio, la déclaration disparaît **toute seule** de la
version restante. Elle n'est nulle part figée.

**Vérifié le 02/08/2026**, cycle complet sur `video-mapping` :
0 traduction → aucune déclaration · 2 traductions → 3 déclarations correctes ·
dépublication de l'anglais → plus aucune déclaration.

## Le contrôle

```bash
node scripts/verifier-hreflang.mjs
```

Il vérifie le **rendu**, pas le code — une page peut compiler parfaitement et
n'émettre rien du tout. Cinq défauts couverts : le groupe orphelin, la cible
dépubliée, la page qui ne se déclare pas elle-même, le groupe d'une seule
langue, la réciprocité.

⚠️ **Un hreflang cassé ne produit aucune erreur.** Rien ne s'affiche de
travers, aucune page ne tombe. Google ignore silencieusement la déclaration et
on le découvre six mois plus tard. D'où un contrôle qu'on lance, plutôt qu'une
vigilance qu'on espère.

`verifier-cloisonnement.mjs` a été ajusté en conséquence : il écarte les
balises `rel="alternate"` avant de chercher des liens vers bluevista.ch. Sans
cette exception il échouerait à chaque page, on finirait par le désactiver — et
on perdrait la protection contre les vrais croisements, qui sont des liens
cliquables dans le corps.

## Deux points ouverts

⚠️ **Les segments d'URL traduits sont les miens, à valider par Giz.**
`realisations` → `works` / `proyectos`, `savoir-faire` → `expertise` /
`servicios`, `offres` → `offering` / `ofertas`, `agence` → `offices` /
`oficinas`. Un segment se référence : le changer plus tard coûtera une
redirection sur chaque page de la famille.

⚠️ **La réciprocité ne peut pas encore être vérifiée.** Google exige que si A
déclare B, B déclare A — sinon la déclaration est ignorée. Le contrôle devra
être relancé avec `BASE` pointant sur bluevista.ch **le jour de sa mise en
service**. Sans déclaration en retour, le couple fr-FR / fr-CH ne vaut rien.

## À savoir

📌 L'ancien site en ligne porte déjà des déclarations hreflang, posées par un
greffon WordPress — et elles sont fausses : chaque page déclare la **page
d'accueil** de chaque langue au lieu de son équivalent. Elles disparaîtront
avec la refonte ; rien à faire, mais cela explique pourquoi le couple
FR/CH n'a jamais fonctionné jusqu'ici.

📌 Il reste dans le studio une traduction `fr-ch` commencée sur « Vidéo et site
web – Funseaker Yacht » dont le document n'a jamais été créé. Sans effet sur le
site — le contrôle la signale pour qu'elle soit terminée ou retirée.
