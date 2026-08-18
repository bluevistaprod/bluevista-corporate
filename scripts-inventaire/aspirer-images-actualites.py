#!/usr/bin/env python3
"""
ASPIRER LES PHOTOS DES 63 ACTUALITÉS DE L'ANCIEN SITE.

⛔⛔ LA SOURCE EST LA PAGE EN LIGNE, PAS L'API REST. Et ça vient de se payer.
Le champ `content.rendered` de l'API ne rend PAS tout : Elementor range une
partie des images dans ses propres données, et la page publiée en montre plus
que l'API n'en déclare. Compté sur STANN : l'API donne 4 images, la page en
affiche 5, et l'une des quatre n'appartient même pas à l'article.
👉 Quand deux sources ne disent pas la même chose, c'est celle que le VISITEUR
voit qui fait foi. L'API décrit ce que WordPress a stocké ; la page décrit ce
que le site montre.

⛔⛔ DEUX FAMILLES D'IMAGES SE RESSEMBLENT ET N'ONT RIEN À VOIR :
  · celles de l'article — posées dans un widget, elles portent la classe
    `wp-image-<id>` parce que ce sont des pièces jointes ;
  · celles des ARTICLES LIÉS en bas de page — de simples vignettes, sans
    cette classe, enveloppées dans un lien vers un autre article.
La première maquette a pris « motion-renard.png » pour une image de STANN.
C'était la vignette de l'article « Le motion design, c'est quoi ? ». Même
famille d'erreur que la photo de NightSwapping posée sous le texte
d'Amplitude : une image au bon endroit dans le fichier, au mauvais endroit
pour le lecteur.

⚠️ LES VARIANTES DE TAILLE NE SONT PAS DES IMAGES. WordPress publie
`Stan-2.png`, `Stan-2-768x432.png`, `Stan-2-300x169.png`… En les comptant
séparément, on croit qu'un article porte vingt photos quand il en a quatre.
C'est ce qui avait produit le chiffre faux « 20 images par actualité ».

⚠️ LECTURE SEULE — on ne touche plus à l'ancien site.
"""
import csv
import re
import sys
import time
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
PLAN = RACINE / "PLAN-REDIRECTIONS-V2.csv"
SORTIE = RACINE / "IMAGES-ACTUALITES.csv"

DOMAINE = "https://www.bluevistaprod.com"
ENTETE = {"User-Agent": "Mozilla/5.0"}

# Le logo, le favicon, les pictogrammes de plugin : présents partout, jamais
# du contenu. On les écarte par leur nom plutôt que par un comptage — un nom
# est stable, une fréquence dépend de l'échantillon.
EXCLUS = re.compile(r"Logo_BLUEVISTA|favicon|/plugins/|ytimg\.com|youtube\.png", re.I)


def lire(url: str) -> str | None:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=ENTETE), timeout=30) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        print(f"    ⚠️  {e}")
        return None


def pleine_taille(u: str) -> str:
    """`Stan-2-768x432.png` → `Stan-2.png`. On garde l'original : c'est le seul
    fichier dont on soit sûr qu'il existe dans toutes les tailles."""
    return re.sub(r"-\d+x\d+(?=\.\w+$)", "", u.split("?")[0])


def images(html: str) -> tuple[str, list[tuple[str, str]]]:
    """Renvoie (image d'en-tête, [(url, texte alternatif)…]) dans l'ordre de la page."""
    hero = ""
    m = re.search(r'data-rocket-preload as="image" href="([^"]+)"', html)
    if m and not EXCLUS.search(m.group(1)):
        hero = pleine_taille(m.group(1))

    vues, sortie = set(), []
    for balise in re.findall(r"<img[^>]+>", html):
        # ⭐ LE FILTRE QUI SÉPARE LES DEUX FAMILLES.
        if "wp-image-" not in balise:
            continue
        src = re.search(r'src="([^"]+\.(?:jpe?g|png|webp))"', balise)
        if not src or EXCLUS.search(src.group(1)):
            continue
        u = pleine_taille(src.group(1))
        if u in vues:
            continue
        vues.add(u)
        alt = re.search(r'alt="([^"]*)"', balise)
        sortie.append((u, (alt.group(1) if alt else "").strip()))

    if hero and hero not in vues:
        sortie.insert(0, (hero, ""))
    return hero, sortie


def main() -> int:
    adresses = [
        r["ancienne_adresse"]
        for r in csv.DictReader(PLAN.open(encoding="utf-8"), delimiter=";")
        if r["site"] == "fr" and r["ancienne_adresse"].startswith("/actualites/")
        and r["ancienne_adresse"] != "/actualites/"
    ]
    print(f"⭐ {len(adresses)} actualités à parcourir.\n")

    lignes, sans = [], []
    for i, adresse in enumerate(adresses, 1):
        html = lire(DOMAINE + adresse)
        if not html:
            print(f"[{i:>2}/{len(adresses)}] {adresse}  ⛔ page illisible")
            continue
        hero, liste = images(html)
        print(f"[{i:>2}/{len(adresses)}] {adresse}  → {len(liste)} image(s)")
        if not liste:
            sans.append(adresse)
        for rang, (u, alt) in enumerate(liste):
            lignes.append({
                "adresse": adresse,
                "rang": rang,
                "role": "entete" if u == hero else "contenu",
                "url": u,
                "texte_alternatif": alt,
            })
        time.sleep(0.25)

    with SORTIE.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["adresse", "rang", "role", "url", "texte_alternatif"],
                           delimiter=";")
        w.writeheader()
        w.writerows(lignes)

    par_page = {}
    for l in lignes:
        par_page.setdefault(l["adresse"], []).append(l)
    nb = sorted(len(v) for v in par_page.values())
    print(f"\n⭐ {len(lignes)} images sur {len(par_page)} actualités.")
    if nb:
        print(f"   médiane {nb[len(nb)//2]} · maximum {nb[-1]}")
    print(f"⛔ {len(sans)} actualités sans aucune image :")
    for a in sans:
        print(f"     {a}")
    sans_alt = sum(1 for l in lignes if not l["texte_alternatif"])
    print(f"⚠️  {sans_alt}/{len(lignes)} images sans texte alternatif — à écrire à la reprise.")
    print(f"\n→ {SORTIE.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
