# Photo Search Console — 2025-08-07 → 2026-08-07

> Prise avant la bascule du site. ⛔ Search Console ne conserve que 16 mois :
> ces chiffres ne sont plus récupérables après 2026-08 + 16 mois.

| Propriété | URL vues | Clics | Impressions |
|---|---|---|---|
| https://www.bluevistaprod.com/ | 239 | **1618** | 242736 |
| https://en.bluevistaprod.com/ | 135 | **215** | 23753 |
| sc-domain:bluevista.ch | 37 | **466** | 78373 |

## Comment s'en servir après la bascule

Comparer `fr-pages.csv` à la même coupe prise après, URL par URL. Une URL qui
disparaît de la seconde liste alors qu'elle avait des clics dans la première est
une redirection manquée — c'est le seul diagnostic qui compte les premières semaines.

⚠️ Deux erreurs de lecture à éviter :
- Une **position moyenne** qui chute n'est pas une perte de classement : une page qui
  apparaît sur de nouvelles requêtes lointaines voit sa moyenne s'effondrer sans rien
  perdre. Le juge est `page-x-requete.csv`, pas `pages.csv`.
- La **saisonnalité** se vérifie en année sur année, jamais en mois sur mois.
