# La photo Search Console — avant la bascule

> Prise le **21/08/2026**, sur la fenêtre **2025-04-21 → 2026-08-17** (16 mois, le maximum que Google conserve).
> Mise en ligne du nouveau site prévue le **04/09/2026**.

## ⛔ Pourquoi ce dossier existe

Search Console ne garde que **seize mois glissants**. Le jour où l'ancien site disparaît, ses
adresses cessent d'accumuler des données et sortent de la fenêtre, mois après mois. Dans un an,
il sera **impossible** de savoir ce que `/nos-competences/live-streaming-webtv/` rapportait.

Sans cette photo, une baisse de trafic après la bascule ne serait imputable à rien : ni à la
refonte, ni aux redirections, ni à la saison. **Elle ne se rattrape pas.**

## Ce que l'ancien site rapporte réellement

| | bluevistaprod.com | bluevista.ch |
|---|---:|---:|
| Clics (16 mois) | **2552** | **584** |
| Impressions | 349,849 | 90,464 |
| CTR moyen | 0.73 % | — |
| Pages vues par Google | 409 | — |
| Pages rapportant ≥ 1 clic | **132** | — |

⚠️ **2552 clics en seize mois, soit environ 160 par mois.** Le site n'est pas un canal
d'acquisition : c'est une carte de visite. Le dire d'emblée évite de sur-interpréter la moindre
variation après la bascule.

## ⭐ Le chiffre qui décide de tout : marque contre référencement

- **814 clics sur 1165** viennent de requêtes de marque — « bluevista », « blue vista », « bluvista ».
  Soit **70 %**.
- Il ne reste que **351 clics** gagnés sur des requêtes qui ne nous nomment pas.

👉 Les deux ne réagissent pas pareil à une refonte. La marque suit l'entreprise et ne bougera pas ;
le hors-marque dépend des adresses et des contenus, donc des **redirections**. Les confondre après
la bascule ferait conclure n'importe quoi.

## Ce que les redirections doivent sauver

`05-hors-marque-a-proteger.csv` — **130 couples page × requête**, **353 clics**.
C'est la liste courte. Le reste des 409 pages ne rapporte rien et ne mérite pas qu'on
travaille ses redirections.

⚠️ **26 pages font 90 % des clics.** La priorité n'est pas de traiter 608 lignes avec le même soin.

## Les fichiers

| Fichier | Contenu |
|---|---|
| `01-jours-bluevistaprod.csv` | Le trafic jour par jour — pour retrouver la saisonnalité |
| `02-pages-bluevistaprod.csv` | Toutes les pages, triées par clics |
| `03-requetes-bluevistaprod.csv` | Toutes les requêtes |
| `04-page-x-requete-bluevistaprod.csv` | Quelle requête amène sur quelle page |
| `05-hors-marque-a-proteger.csv` | ⭐ **La liste courte à protéger** |
| `06-pays-appareil-page.csv` | France 83 %, ordinateur 67 % |
| `07-ch-*.csv` | Le site suisse, séparément |

## Comment s'en servir après la bascule

Relancer `prendre-la-photo.mjs` en changeant `DEBUT` et `FIN`, puis comparer
**`05-hors-marque-a-proteger.csv`** à son équivalent. C'est le seul tableau où une redirection
ratée se voit — et elle s'y voit tout de suite.

⚠️ Attendre **au moins six semaines** : Google met du temps à suivre des 301, et lire les chiffres
à J+7 ferait paniquer pour rien.
