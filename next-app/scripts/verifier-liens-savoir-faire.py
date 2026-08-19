import re,sys,subprocess,html
pages=["video-mapping","motion-design","animation-3d","live-streaming-webtv","aftermovie-captation-evenementielle","video-aerienne-drone","video-corporate-film-dentreprise","creation-immersive-realite-virtuelle","studio-fond-vert-compositing"]
vus={}
morts=[]
for p in pages:
    h=subprocess.run(["curl","-sL","-m","90",f"http://localhost:3333/apercu/competence/{p}/"],capture_output=True,text=True).stdout
    for href in set(re.findall(r'href="(/[^"#?]*)"',h)):
        if href.startswith('/_next') or href.endswith('.ico') or href.endswith('.css') or href.endswith('.js'): continue
        if href in vus: code=vus[href]
        else:
            code=subprocess.run(["curl","-sL","-m","90","-o","/dev/null","-w","%{http_code}",f"http://localhost:3333{href}"],capture_output=True,text=True).stdout
            vus[href]=code
        if code!="200": morts.append((p,href,code))
print(f"{len(vus)} adresses internes distinctes contrôlées sur les 9 pages")
if morts:
    print(f"\n⛔ {len(morts)} lien(s) cassé(s) :")
    for p,h,c in morts: print(f"   [{c}] {h}\n        vu sur {p}")
else:
    print("✅ aucun lien cassé")
