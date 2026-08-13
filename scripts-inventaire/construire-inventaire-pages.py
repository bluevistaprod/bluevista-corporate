#!/usr/bin/env python3
"""
CONSTRUIRE L'INVENTAIRE DES PAGES DES TROIS SITES — 12/08/2026.

⛔ POURQUOI CE FICHIER EXISTE. Le chantier notait « ✅ 13 pages écrites au
registre » alors que leurs sections l'étaient et leur corps portait encore le
texte de l'ancien site. Une seule case pour deux réalités différentes ne peut
que mentir.

👉 D'où la règle posée le 12/08 : ON NE COCHE PAS « PAGE FAITE », ON COCHE
CHAMP PAR CHAMP. Ce script produit le tableau qui le permet.

Il croise quatre sources, et AUCUNE n'est déclarative :
  · l'ancien site — pages, actualités et réalisations des trois WordPress,
    lus par l'API REST (⚠️ les réalisations sont un type de contenu à part,
    `nos-realisations` : ne pas le lire faisait manquer 92 vidéos et
    140 adresses) ;
  · le nouveau site — ce qui existe réellement dans Sanity ;
  · le trafic — la photo Search Console du 07/08/2026, figée avant bascule ;
  · les redirections déjà proposées.

⚠️ CE QU'IL NE SAIT PAS FAIRE, et qu'il ne prétend pas : dire si un texte est
« au registre ». Ça se lit, ça ne se compte pas. Les colonnes de réécriture
sont donc laissées vides — elles se remplissent à la main, page par page.

Usage :  python3 scripts-inventaire/construire-inventaire-pages.py
"""
import csv, json, re, html, urllib.request, collections, os, sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.environ.get("CACHE_WP", "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad")
SITES = {"fr": "www.bluevistaprod.com", "en": "en.bluevistaprod.com", "ch": "www.bluevista.ch"}
TYPES = {"pages": "page", "posts": "actualité", "nos-realisations": "réalisation"}


def lire_wp(dom, rest_base):
    """L'API REST, page par page. On garde le cache : l'ancien site ne bouge plus."""
    out, p = [], 1
    while p <= 4:
        u = f"https://{dom}/wp-json/wp/v2/{rest_base}?per_page=100&page={p}&_fields=id,slug,link,title,modified,content"
        try:
            with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}), timeout=90) as r:
                b = json.loads(r.read().decode())
        except Exception:
            break
        if not b:
            break
        out += b
        p += 1
    return out


def mots(h):
    h = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", h or "", flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    return len([w for w in re.sub(r"\s+", " ", html.unescape(h)).split() if any(c.isalnum() for c in w)])


# ── 1. L'ancien site ──────────────────────────────────────────────────────
anciennes = []
for lang, dom in SITES.items():
    for base, nom in TYPES.items():
        f = os.path.join(CACHE, f"wp-{lang}-{base}.json")
        if os.path.exists(f):
            docs = json.load(open(f))
        else:
            docs = lire_wp(dom, base)
            json.dump(docs, open(f, "w"))
        for d in docs:
            chemin = re.sub(r"^https?://[^/]+", "", d["link"])
            anciennes.append({
                "site": lang, "type": nom, "adresse": chemin,
                "titre": html.unescape(d["title"]["rendered"]),
                "modifie": (d.get("modified") or "")[:10],
                "mots": mots((d.get("content") or {}).get("rendered")),
                "slug": d["slug"],
            })
        print(f"  {dom:<26} {nom:<12} {len(docs)}", file=sys.stderr)

# ── 2. Le trafic, par adresse ─────────────────────────────────────────────
trafic = {}
for lang in SITES:
    f = os.path.join(RACINE, f"PHOTO-SEARCH-CONSOLE-2026-08-07/{lang}-pages.csv")
    if not os.path.exists(f):
        continue
    for r in csv.DictReader(open(f, encoding="utf-8"), delimiter=";"):
        chemin = re.sub(r"^https?://[^/]+", "", r["page"].strip('"'))
        trafic[(lang, chemin)] = (int(r["clics"]), int(r["impressions"]), float(r["position"]))

# ── 3. Le nouveau site ────────────────────────────────────────────────────
env = dict(l.split("=", 1) for l in open(os.path.join(RACINE, "next-app/.env.local"), encoding="utf-8")
           if "=" in l and not l.strip().startswith("#"))
pid, ds = env["NEXT_PUBLIC_SANITY_PROJECT_ID"].strip(), env["NEXT_PUBLIC_SANITY_DATASET"].strip()


def groq(q):
    u = f"https://{pid}.api.sanity.io/v2023-05-03/data/query/{ds}?query={urllib.parse.quote(q)}"
    with urllib.request.urlopen(u, timeout=60) as r:
        return json.loads(r.read().decode())["result"]


import urllib.parse
pages_sanity = groq('*[_type=="page"]{genre,"slug":slug.current,titre,titreSeo,descriptionSeo,'
                    '"nbTexte":count(texte),"nbSections":count(sections),"nbFaq":count(faq),'
                    '"nbVideos":count(videos),"image":defined(image)}')
real_sanity = groq('*[_type=="realisation"]{"slug":slug.current,titre,"video":defined(video),"image":defined(image)}')
par_slug_page = {p["slug"]: p for p in pages_sanity}
par_slug_real = {r["slug"]: r for r in real_sanity}

# ── 4. Les redirections déjà proposées ────────────────────────────────────
redir = {}
f = os.path.join(RACINE, "PLAN-REDIRECTIONS.csv")
if os.path.exists(f):
    for r in csv.reader(open(f, encoding="utf-8"), delimiter=";"):
        if r and r[0].startswith("/") and r[0] not in redir:
            redir[r[0]] = r[1]

# ── 5. Le tableau ─────────────────────────────────────────────────────────
lignes = []
for a in anciennes:
    c, i, pos = trafic.get((a["site"], a["adresse"]), (0, 0, 0))
    s = par_slug_page.get(a["slug"]) or par_slug_real.get(a["slug"])
    est_page = a["slug"] in par_slug_page
    lignes.append([
        a["site"], a["type"], a["adresse"], a["titre"], a["modifie"], a["mots"],
        c, i, round(pos, 1) if pos else "",
        "oui" if s else "non",
        (s or {}).get("genre", "réalisation" if s else ""),
        (s or {}).get("nbTexte", "") if est_page else "",
        (s or {}).get("nbSections", "") if est_page else "",
        (s or {}).get("nbVideos", "") if est_page else ("oui" if (s or {}).get("video") else "non" if s else ""),
        "oui" if (s or {}).get("titreSeo") else ("non" if s else ""),
        "oui" if (s or {}).get("descriptionSeo") else ("non" if s else ""),
        "oui" if (s or {}).get("image") else ("non" if s else ""),
        redir.get(a["adresse"], ""),
        "", "", "", "",   # texte_reecrit · canonique · donnees_structurees · verifie_au_rendu
        "",
    ])

lignes.sort(key=lambda r: (-int(r[6]), -int(r[7])))
sortie = os.path.join(RACINE, "INVENTAIRE-PAGES.csv")
with open(sortie, "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["site", "type", "adresse", "titre", "modifie_le", "mots_ancien",
                "clics_12m", "impressions_12m", "position",
                "existe_dans_sanity", "genre", "nb_paragraphes", "nb_sections", "videos",
                "titre_seo", "description_seo", "image",
                "redirection_proposee",
                "texte_reecrit", "canonique", "donnees_structurees", "verifie_au_rendu", "note"])
    w.writerows(lignes)

print(f"\n{len(lignes)} adresses écrites dans {os.path.relpath(sortie, RACINE)}")
print("par site :", dict(collections.Counter(r[0] for r in lignes)))
print("par type :", dict(collections.Counter(r[1] for r in lignes)))
print("reprises dans Sanity :", sum(1 for r in lignes if r[9] == "oui"), "/", len(lignes))
print("avec du trafic       :", sum(1 for r in lignes if r[6] > 0))
