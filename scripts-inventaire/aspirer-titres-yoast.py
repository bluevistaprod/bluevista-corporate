#!/usr/bin/env python3
"""
ASPIRER LES TITRES ET DESCRIPTIONS SEO DE L'ANCIEN SITE.

⛔⛔ CE QU'ON RÉCUPÈRE, ET POURQUOI ÇA NE CONCERNE QU'UNE PARTIE DES PAGES.
Le titre et la description SEO sont les deux lignes que Google affiche dans ses
résultats. Sur l'ancien site, elles vivent dans Yoast, donc dans la base
WordPress — elles disparaissent le jour où le WordPress s'éteint.

⭐ MAIS SEULES LES PAGES QUI GARDENT LEUR ADRESSE EN ONT BESOIN. Une adresse qui
part en 301 arrive sur une page qui a déjà son propre titre ; récupérer l'ancien
ne servirait qu'à le dupliquer. Sur 242 adresses FR : 169 partent en 301, 3 en
410, et 70 restent. Ce sont ces 70-là, et elles seules, qu'on aspire.

⚠️ LECTURE SEULE. On ne touche plus à l'ancien site : ce script ne fait que des
GET sur une route publique de Yoast. Il n'écrit que dans nos propres fichiers.

⚠️ LE BON NOM DE DOMAINE EST bluevistaprod.com, PAS bluevista.fr. Les deux
pointent sur le même serveur (83.166.130.92), mais Yoast ne connaît que le
canonique : interrogé sur une adresse en bluevista.fr, il répond « Page non
trouvée » pour TOUTES les pages. Le piège est silencieux — on récupère 70
réponses valides qui disent toutes la même chose.
"""
import csv
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
# ⚠️ Gardé pour mémoire : ce script ne l’écrit PAS (voir plus bas).
PLAN = RACINE / "PLAN-REDIRECTIONS-V2.csv"
SORTIE = RACINE / "TITRES-SEO-ANCIENS.csv"

DOMAINE = "https://www.bluevistaprod.com"
ENTETE = {"User-Agent": "Mozilla/5.0"}


def lire(url: str) -> str | None:
    """Un GET, et rien d'autre. Renvoie None plutôt que de lever : une page
    manquante ne doit pas interrompre les soixante-neuf autres."""
    try:
        req = urllib.request.Request(url, headers=ENTETE)
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        print(f"    ⚠️  {e}")
        return None


def extraire(html: str) -> dict:
    """⚠️ On lit le <head> que Yoast a fabriqué, pas la page. C'est exactement ce
    que Google reçoit — donc la seule version qui fasse foi."""
    def cherche(motif: str) -> str:
        m = re.search(motif, html, re.S | re.I)
        return m.group(1).strip() if m else ""

    titre = cherche(r"<title>(.*?)</title>")
    desc = cherche(r'name="description"\s+content="(.*?)"')
    # ⚠️ Yoast n'écrit pas toujours la meta description : quand le champ est vide
    # dans l'admin, il ne sort RIEN plutôt que d'inventer. La description Open
    # Graph, elle, est souvent remplie — elle sert de repli, jamais de vérité.
    og = cherche(r'property="og:description"\s+content="(.*?)"')
    canon = cherche(r'rel="canonical"\s+href="(.*?)"')
    robots = cherche(r'name="robots"\s+content="(.*?)"')
    return {
        "titre_seo": html_decode(titre),
        "description_seo": html_decode(desc),
        "description_og": html_decode(og),
        "canonique": canon,
        "robots": robots,
    }


def html_decode(s: str) -> str:
    import html
    return html.unescape(s)


# ⛔⛔ LE SUFFIXE DU NOM DU SITE SE RETIRE ICI, ET C'EST UN PIÈGE QUI NE SE VOIT
# QU'EN LIGNE. Yoast colle « - Bluevista » à la fin de chaque titre (66 titres
# sur 70). Le nouveau site fait la même chose, autrement : le gabarit de
# `[lang]/layout.tsx` ajoute « | Bluevista » à tout titre de page. Importer les
# titres tels quels produirait « Show reel vidéos drone - Bluevista | Bluevista »
# — juste, champ par champ, et ridicule dans Google.
# ⚠️ On ne retire QUE le suffixe terminal. « bluevista creative | vidéo … »
# garde son « bluevista » : il est dans le nom de la série, pas dans le gabarit.
SUFFIXES = (" - Bluevista", " | Bluevista", " – Bluevista")


def sans_suffixe(titre: str) -> str:
    for s in SUFFIXES:
        if titre.endswith(s):
            return titre[: -len(s)]
    return titre


def main() -> int:
    plan = [
        r for r in csv.DictReader(PLAN.open(encoding="utf-8"), delimiter=";")
        if r["site"] == "fr" and r["code"] == "200"
    ]
    print(f"⭐ {len(plan)} adresses FR gardent leur adresse — ce sont elles qu'on aspire.\n")

    resultats = []
    for i, r in enumerate(plan, 1):
        adresse = r["ancienne_adresse"]
        url = DOMAINE + adresse
        route = (
            f"{DOMAINE}/wp-json/yoast/v1/get_head?url="
            + urllib.parse.quote(url, safe="")
        )
        print(f"[{i:>2}/{len(plan)}] {adresse}")
        brut = lire(route)
        donnees = {}
        if brut:
            try:
                donnees = extraire(json.loads(brut)["html"])
            except Exception:  # noqa: BLE001
                donnees = {}
        # ⚠️ REPLI : si la route Yoast ne répond pas, on lit la page elle-même.
        # Le <head> y est le même — c'est Yoast qui l'a écrit.
        if not donnees.get("titre_seo"):
            page = lire(url)
            if page:
                donnees = extraire(page)

        titre = donnees.get("titre_seo", "")
        if not titre:
            print("    ⛔ rien récupéré")
        elif "Page non trouvée" in titre:
            # ⛔ Le piège du mauvais domaine, attrapé ici plutôt qu'au rendu.
            print(f"    ⛔ Yoast ne connaît pas cette adresse : {titre}")
            titre = ""
            donnees["titre_seo"] = ""
        else:
            print(f"    → {titre}")

        resultats.append({
            "adresse": adresse,
            "clics_12m": r["clics_12m"],
            "titre_yoast": titre,
            "titre_pour_sanity": sans_suffixe(titre),
            **{k: donnees.get(k, "") for k in
               ("description_seo", "description_og", "canonique", "robots")},
        })
        time.sleep(0.25)  # on reste poli avec un serveur de production

    # ── Le fichier dédié ────────────────────────────────────────────────────
    champs = ["adresse", "clics_12m", "titre_yoast", "titre_pour_sanity",
              "description_seo", "description_og", "canonique", "robots"]
    with SORTIE.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=champs, delimiter=";")
        w.writeheader()
        w.writerows(resultats)

    # ⛔⛔ CE SCRIPT N'ÉCRIT PAS DANS L'INVENTAIRE, ET C'EST UNE CORRECTION.
    # Première version : il recopiait les titres récupérés dans la colonne
    # `titre_seo` de INVENTAIRE-PAGES.csv quand elle était vide. Or cette
    # colonne ne contient pas des titres — elle contient « oui » ou « non ».
    # C'est un SUIVI : « le titre SEO du nouveau site est-il écrit ? ». Les 12
    # « oui » sont les 9 pages de savoir-faire plus les trois témoins.
    # 👉 Le nom d'une colonne ne dit pas ce qu'elle contient. Il faut regarder
    # les valeurs. En recopiant du contenu dans une colonne d'état, on obtient
    # un fichier où « oui » et « Vidéo immersive 360° » veulent dire la même
    # chose — et plus aucun compte n'est lisible.
    # Le contenu aspiré vit donc dans son propre fichier, et nulle part ailleurs.

    # ── Le compte rendu ─────────────────────────────────────────────────────
    avec = [r for r in resultats if r["titre_yoast"]]
    sans_desc = [r for r in avec if not r["description_seo"]]
    coupes = sum(1 for r in avec if r["titre_yoast"] != r["titre_pour_sanity"])
    print(f"\n⭐ {len(avec)}/{len(plan)} titres récupérés, le contenu vit dans son propre fichier.")
    print(f"⭐ {coupes} suffixes « - Bluevista » retirés : le gabarit du nouveau "
          "site rajoute « | Bluevista » tout seul.")
    if sans_desc:
        print(f"⚠️  {len(sans_desc)} pages n'ont PAS de description écrite dans Yoast "
              "(repli sur la description Open Graph quand elle existe).")
    manquants = [r for r in resultats if not r["titre_yoast"]]
    if manquants:
        print(f"⛔ {len(manquants)} adresses sans rien :")
        for r in manquants:
            print(f"     {r['adresse']}")
    print(f"\n→ {SORTIE.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
