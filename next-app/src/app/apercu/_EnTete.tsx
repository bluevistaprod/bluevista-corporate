"use client";

import { useEffect, useState } from "react";
import { BLEU_CLAIR, SOMBRE } from "./_palette";
import { COMPETENCES, METIERS } from "./_plan-du-site";

/**
 * L'EN-TÊTE DE NAVIGATION.
 *
 * ⛔ TOUS LES LIENS ÉTAIENT MORTS. Signalé par Giz : « le header n'a aucun
 * lien qui marche et quand je clique sur le logo ça m'amène sur une page
 * presque vide ». C'était exact — les entrées pointaient sur `#` et le logo
 * sur `/`, c'est-à-dire la route [lang] du futur site, encore vide.
 *
 * Une maquette dont on ne peut pas cliquer les liens n'est pas une maquette,
 * c'est une image. Et le défaut se voyait d'autant moins qu'on arrivait
 * toujours sur les pages par une adresse tapée.
 *
 * ⛔ LE LOGO EST UNE IMAGE, PAS DU TEXTE. Bluevista a deux usages officiels :
 * le logo texte complet — « blue » en bleu de marque, « vista » en gris — et
 * le « b » dans un rond pour les formats étroits. Sur fond sombre on sert la
 * version blanche de la charte plutôt qu'un filtre, qui écraserait le gris.
 *
 * ⛔ `opaque` : fond plein dès le premier pixel sur les pages intérieures.
 * Transparent uniquement sur le hero plein écran de l'accueil — ailleurs, du
 * blanc sur une photo claire devient illisible.
 */

const MENU = [
  { nom: "L’agence", href: "/apercu/agence" },
  { nom: "Réalisations", href: "/apercu/realisations" },
];

/**
 * LES CINQ VERSIONS DU SITE.
 *
 * ⚠️ Seul le français existe aujourd'hui. Le sélecteur les affiche quand
 * même, en grisant celles qui n'existent pas — c'est plus honnête qu'un
 * sélecteur qui apparaîtrait un jour sans prévenir, et ça rend visible ce
 * qu'il reste à traduire.
 */
const VERSIONS = [
  { code: "FR", titre: "France — français", href: "/apercu/v7", prete: true },
  { code: "EN", titre: "France — English", href: "#", prete: false },
  { code: "ES", titre: "France — Español", href: "#", prete: false },
  { code: "CH", titre: "Suisse — français", href: "#", prete: false },
];

export function EnTete({ opaque = false }: { opaque?: boolean }) {
  const [defile, setDefile] = useState(false);
  const [offresOuvert, setOffresOuvert] = useState(false);
  const [langueOuverte, setLangueOuverte] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const plein = opaque || defile;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: plein ? SOMBRE : "transparent",
        boxShadow: plein ? "0 1px 0 rgba(255,255,255,0.10)" : "none",
      }}
      onMouseLeave={() => setOffresOuvert(false)}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">
        <a href="/apercu/v7" className="flex items-center" aria-label="Bluevista — accueil">
          <img src="/media/logo-b-rond.png" alt="Bluevista" className="h-10 w-10 sm:hidden" />
          <img
            src="/media/logo-bluevista-blanc.png"
            alt="Bluevista"
            className="hidden h-7 w-auto transition-all duration-300 sm:block"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {/* Les offres ouvrent un panneau : les trois métiers et leurs
              savoir-faire. C'est là que se joue le maillage depuis le haut
              de page — neuf liens vers les pages qui portent le
              référencement, présents sur chaque page du site. */}
          <div className="relative">
            <button
              onMouseEnter={() => setOffresOuvert(true)}
              onClick={() => setOffresOuvert(o => !o)}
              aria-expanded={offresOuvert}
              className="rounded-md px-4 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10"
            >
              Offres ▾
            </button>
            {offresOuvert && (
              <div
                className="absolute left-0 top-full grid w-[640px] grid-cols-3 gap-8 rounded-md p-7 shadow-2xl"
                style={{ background: SOMBRE }}
              >
                {METIERS.map(m => (
                  <div key={m.cle}>
                    <a
                      href={`/apercu/metier/${m.slug}`}
                      className="text-[13px] font-bold uppercase tracking-[0.14em] transition hover:opacity-70"
                      style={{ color: BLEU_CLAIR }}
                    >
                      {m.nom}
                    </a>
                    <ul className="mt-3 space-y-1.5">
                      {COMPETENCES.filter(c => c.metier === m.cle).map(c => (
                        <li key={c.slug}>
                          <a
                            href={`/apercu/competence/${c.slug}`}
                            className="text-[14px] text-white/70 transition hover:text-white"
                          >
                            {c.nom}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {MENU.map(l => (
            <a
              key={l.nom}
              href={l.href}
              className="rounded-md px-4 py-2.5 text-[15px] font-medium text-white transition hover:bg-white/10"
            >
              {l.nom}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* ── Le sélecteur de langue ─────────────────────────────────
              Il manquait partout. Sur un site qui existera en cinq
              versions, c'est l'élément que le visiteur cherche en premier
              quand il n'est pas dans sa langue — et le premier qu'on
              oublie, parce qu'on ne travaille que dans la sienne. */}
          <div className="relative">
            <button
              onClick={() => setLangueOuverte(o => !o)}
              aria-expanded={langueOuverte}
              aria-label="Choisir la langue"
              className="rounded-md px-3 py-2.5 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              FR ▾
            </button>
            {langueOuverte && (
              <div
                className="absolute right-0 top-full mt-1 w-60 overflow-hidden rounded-md shadow-2xl"
                style={{ background: SOMBRE }}
              >
                {VERSIONS.map(v => (
                  <a
                    key={v.code}
                    href={v.href}
                    hrefLang={v.code.toLowerCase()}
                    aria-disabled={!v.prete}
                    className={`flex items-center justify-between px-4 py-3 text-[14px] transition ${
                      v.prete ? "text-white hover:bg-white/10" : "cursor-not-allowed text-white/30"
                    }`}
                  >
                    <span>{v.titre}</span>
                    <span className="font-semibold">{v.prete ? v.code : "à venir"}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/apercu/contact"
            className="rounded-md bg-white px-6 py-3.5 text-[15px] font-bold transition hover:opacity-90"
            style={{ color: SOMBRE }}
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </header>
  );
}
