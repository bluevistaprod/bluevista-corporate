#!/usr/bin/env python3
"""
CONSTRUIRE LE PLAN DE REDIRECTIONS — refait de zéro le 12/08/2026.

⛔⛔ POURQUOI ON NE CORRIGE PAS L'ANCIEN, ON LE REFAIT.
`PLAN-REDIRECTIONS.csv` avait trois défauts de conception, pas trois erreurs :
  ① AUCUNE COLONNE DE DOMAINE. La même adresse relative y figurait deux ou
     trois fois (français, anglais, suisse) et ne se distinguait que par sa
     position dans le fichier. Impossible d'en générer quoi que ce soit.
  ② LES CIBLES VENAIENT D'UN CHAMP DÉDUIT. Le champ `ancienneUrl` de Sanity a
     été rempli par ressemblance de mots-clés : 93 fiches sur 170 revendiquent
     la même poignée d'adresses, une d'entre elles est revendiquée par TREIZE
     fiches. D'où des redirections vers le mauvais client — l'actualité du
     Musée Rodin partait chez Sodexo, celle de GF Machining Solutions chez
     Ensto.
  ③ IL IGNORAIT LA RÈGLE DES ACTUALITÉS. 61 actualités françaises y partaient
     vers une page de réalisation, alors que Giz a tranché le 12/08 :
     « tout ce qui est noté avec le slug actualités est une actualité ».
     Elles gardent leur adresse, donc elles ne se redirigent pas.

👉 CE PLAN-CI SE CONSTRUIT DEPUIS L'ADRESSE SOURCE, jamais depuis un champ du
nouveau site, et l'appariement des réalisations se fait sur le TITRE — la
seule donnée que les deux systèmes partagent honnêtement.

⚠️ CE QU'IL NE FAIT PAS. L'anglais et le suisse n'ont AUCUN contenu publié
dans Sanity à ce jour. Leur inventer des cibles produirait des redirections
vers des 404, ce qui est pire que pas de redirection. Ils sont donc listés
avec un motif explicite, en attente.

Usage :  python3 scripts-inventaire/construire-plan-redirections.py
"""
import csv, json, re, html, unicodedata, collections, os, urllib.parse, urllib.request

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = "/private/tmp/claude-501/-Users-giz-Documents-Claude-code-websites/9a77d6fa-14e0-4794-af5a-22720b10e6a9/scratchpad"
env = dict(l.split("=", 1) for l in open(os.path.join(RACINE, "next-app/.env.local"), encoding="utf-8")
           if "=" in l and not l.strip().startswith("#"))
PID, DS = env["NEXT_PUBLIC_SANITY_PROJECT_ID"].strip(), env["NEXT_PUBLIC_SANITY_DATASET"].strip()


def groq(q):
    u = f"https://{PID}.api.sanity.io/v2023-05-03/data/query/{DS}?query={urllib.parse.quote(q)}"
    return json.loads(urllib.request.urlopen(u, timeout=60).read().decode())["result"]


REAL = groq('*[_type=="realisation" && language=="fr"]{"slug":slug.current,titre,client}')
PAGES = {p["slug"] for p in groq('*[_type=="page" && language=="fr"]{"slug":slug.current}')}

# ── L'appariement des réalisations, par le titre ──────────────────────────
VIDE = {"video", "videos", "film", "films", "de", "du", "des", "la", "le", "les", "et", "pour", "avec", "une", "un"}


def toks(s):
    s = unicodedata.normalize("NFD", html.unescape(s or "")).encode("ascii", "ignore").decode().lower()
    return {w for w in re.split(r"[^a-z0-9]+", s) if len(w) > 1 and w not in VIDE}


CIBLES = [(toks(r["titre"]) | toks(r["client"]), r) for r in REAL]

# ⛔ LES QUATRE QUE L'APPARIEMENT AUTOMATIQUE RATE, corrigées à la main après
# lecture. Elles ont toutes la même cause : un client qui a beaucoup de
# projets, où le nom du client ne suffit plus à trancher.
FORCE = {
    "cpro-film-corpo": "c-pro-film-corporate-fiction",
    "e-xpert-solutions-voeux-2022": "e-xpert-solutions-video-voeux-2022",
    "expert-solutions-voeux-2022": "e-xpert-solutions-video-voeux-2022",
    "motion-design-veama": "veama-carte-de-voeux-2019",
    # ⛔ Deux erreurs vraies, trouvées en relisant les cas signalés le 12/08.
    # Elles ont la même cause que les autres : un client à plusieurs projets,
    # où le score de recouvrement choisit le mauvais millésime ou le mauvais
    # sujet. Le titre de l'ancienne page tranche à chaque fois.
    #   « Cisco motion design PLATEFORME VIDÉO » n'est pas le projet 5G.
    "cisco-4": "cisco-video-platform-animation-3d-motion-design",
    #   « CERA.Fr » est le SITE INTERNET, pas l'agence innovation. `[Giz, 12/08]`
    "cera-fr": "site-internet-cera-motion-design",
    #   « Equita Lyon – Dailynews 2022 » n'est pas le millésime 2023.
    "equita-lyon-dailynews": "equita-lyon-dailynews-video-2022",
}


def apparier(titre, slug):
    if slug in FORCE:
        return FORCE[slug], "forcé à la main"
    a = toks(titre)
    best = (0, None)
    for b, r in CIBLES:
        inter = a & b
        if not inter:
            continue
        s = len(inter) / min(len(a), len(b))
        if s > best[0]:
            best = (s, r)
    if not best[1]:
        return None, "aucune correspondance"
    return best[1]["slug"], ("sûr" if best[0] >= 1.0 else "probable" if best[0] >= 0.7 else "⛔ à vérifier")


# ── La carte des pages françaises, décidée à la main ──────────────────────
# ⚠️ Elle ne se devine pas : chaque ligne est un arbitrage.
CARTE = {
    "/": ("/", "accueil"),
    "/agence/": ("/agence/", "page fixe"),
    "/contact-devis/": ("/contact/", "page fixe"),
    "/mentions-legales/": ("/mentions-legales/", "page fixe"),
    "/nos-realisations/": ("/realisations/", "index"),
    "/actualites/": ("/actualites/", "⛔ index conservé — les actualités gardent leur adresse"),
    "/nos-competences/": ("/offres/film/", "index sans équivalent — renvoyé sur le pilier principal"),
    # ⭐ Les villes gardent leur adresse : elles se positionnent depuis des années.
    "/studio-animation-3d-lyon/": ("/studio-animation-3d-lyon/", "ville, adresse conservée"),
    "/studio-animation-3d-paris/": ("/studio-animation-3d-paris/", "ville, adresse conservée"),
    "/realisation-film-entreprise-lyon/": ("/realisation-film-entreprise-lyon/", "ville, adresse conservée"),
    # ⚠️ EXCEPTION ASSUMÉE à « aucun lien vers bluevista.ch » : ici le visiteur
    # est suisse par sa requête même. 301 page à page, jamais vers l'accueil.
    "/realisation-video-geneve/": ("https://www.bluevista.ch/realisation-video-geneve/", "⚠️ part vers le site suisse"),
    # Les pages de secteur n'ont pas d'équivalent : elles remontent au pilier.
    "/realisation-film-sante/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-industrie/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-automotive/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-territoires/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-de-film-banques-assurances/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-construction-immobiliere/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-immobilier-real-estate/": ("/offres/film/", "page de secteur → pilier"),
    "/realisation-film-lancement-produit/": ("/offres/film/", "page de produit → pilier"),
    "/realisation-film-evenementiel/": ("/offres/evenement/", "page de secteur → pilier événementiel"),
    "/realisation-de-film-evenements/": ("/offres/evenement/", "page de secteur → pilier événementiel"),
    "/video-publicitaire/": ("/offres/film/", "page de produit → pilier"),
    "/video-promotionnelle/": ("/offres/film/", "page de produit → pilier"),
    "/bluevista-agence-metaverse/": ("/savoir-faire/creation-immersive-realite-virtuelle/", "métavers → immersion"),
    "/film-d-entreprise-paris-15-ans-d-experience/": ("/savoir-faire/video-corporate-film-dentreprise/", "page d’ancienneté"),
    "/film-entreprise-lyon-15-ans-experience/": ("/realisation-film-entreprise-lyon/", "page d’ancienneté lyonnaise → ville"),
    "/film-corporate-lyon-depuis-2004/": ("/realisation-film-entreprise-lyon/", "page d’ancienneté lyonnaise → ville"),
    # ⛔ Les pages de remerciement n'ont aucun équivalent et aucun visiteur
    # direct : 410, pas 404 ni redirection vers l'accueil.
    "/merci-demande/": ("410", "page de remerciement, disparaît"),
    "/merci-demande-stage/": ("410", "page de remerciement, disparaît"),
    "/merci-demande-recrutement/": ("410", "page de remerciement, disparaît"),
}

# ── Le tableau ────────────────────────────────────────────────────────────
lignes = []
trafic = {}
for r in csv.DictReader(open(os.path.join(RACINE, "INVENTAIRE-PAGES.csv"), encoding="utf-8"), delimiter=";"):
    trafic[(r["site"], r["adresse"])] = int(r["clics_12m"])
    site, typ, adr, titre = r["site"], r["type"], r["adresse"], r["titre"]
    clics = int(r["clics_12m"])

    if site != "fr":
        lignes.append([site, typ, adr, "", "—", clics,
                       "⏳ en attente — aucun contenu publié dans cette langue"])
        continue

    if typ == "actualité":
        # ⭐ La règle de Giz : elles gardent leur adresse. Aucune redirection.
        lignes.append([site, typ, adr, adr, "200", clics, "adresse conservée — c’est une actualité"])
    elif typ == "réalisation":
        slug = adr.rstrip("/").split("/")[-1]
        cible, conf = apparier(titre, slug)
        lignes.append([site, typ, adr, f"/realisations/{cible}/" if cible else "",
                       "301" if cible else "⛔", clics,
                       f"apparié sur le titre — {conf}"])
    elif adr.startswith("/nos-competences/") and adr.rstrip("/").split("/")[-1] in PAGES:
        # ⭐ LES NEUF PAGES DE SAVOIR-FAIRE, ET ELLES PORTENT 245 CLICS/AN.
        # Seul le SEGMENT change : `/nos-competences/` devient `/savoir-faire/`,
        # le slug est conservé tel quel — c'est lui qui se positionne.
        lignes.append([site, typ, adr, f"/savoir-faire/{adr.rstrip('/').split('/')[-1]}/", "301", clics,
                       "savoir-faire — seul le segment change"])
    else:
        c = CARTE.get(adr)
        if not c:
            lignes.append([site, typ, adr, "", "⛔", clics, "⛔ page non cartographiée"])
        elif c[0] == "410":
            lignes.append([site, typ, adr, "", "410", clics, c[1]])
        else:
            lignes.append([site, typ, adr, c[0], "301" if c[0] != adr else "200", clics, c[1]])

lignes.sort(key=lambda x: (x[0] != "fr", -x[5]))
sortie = os.path.join(RACINE, "PLAN-REDIRECTIONS-V2.csv")
with open(sortie, "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["site", "type", "ancienne_adresse", "nouvelle_adresse", "code", "clics_12m", "motif"])
    w.writerows(lignes)

# ── Les contrôles, et ils viennent d'ailleurs que de l'écriture ───────────
fr = [l for l in lignes if l[0] == "fr"]
cibles_reelles = {f"/realisations/{r['slug']}/" for r in REAL} | {f"/savoir-faire/{s}/" for s in PAGES} \
    | {f"/offres/{s}/" for s in PAGES} | {f"/{s}/" for s in PAGES} | {"/", "/realisations/", "/actualites/", "/agence/", "/contact/", "/mentions-legales/"}
introuvables = [l for l in fr if l[4] == "301" and not l[3].startswith("http") and l[3] not in cibles_reelles]
print(f"\n{len(lignes)} adresses — {len(fr)} en français, {len(lignes)-len(fr)} en attente (anglais et suisse)")
print("codes :", dict(collections.Counter(l[4] for l in fr)))
print("confiance de l’appariement :", dict(collections.Counter(l[6] for l in fr if "apparié" in l[6])))
print(f"⛔ redirections vers l’accueil : {sum(1 for l in fr if l[3]=='/' and l[2]!='/')}")
print(f"⛔ cibles qui n’existent PAS dans Sanity : {len(introuvables)}")
for l in sorted(introuvables, key=lambda x: -x[5])[:10]:
    print(f"     {l[5]:>4} clics  {l[2][:46]:<46} → {l[3]}")
print(f"\nécrit : {os.path.relpath(sortie, RACINE)}")
