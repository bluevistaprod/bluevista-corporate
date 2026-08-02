import { BLEU_CLAIR, SOMBRE_PROFOND } from "./_palette";
import { COMPETENCES } from "./_plan-du-site";

/**
 * LE PIED DE PAGE — partagé par toutes les pages.
 *
 * ⛔⛔ QUATRIÈME VERSION. Ce commentaire existe pour qu'on ne refasse pas le
 * tour du problème, parce que chaque correction a cassé la précédente.
 *
 * V1 — colonnes par métier + deux bandes. Presque un écran de haut.
 * V2 — colonnes supprimées : compact, mais neuf liens à la file ne se
 *      lisent plus. « Maintenant tout se chevauche ».
 * V3 — colonnes rendues, sans groupement par métier. Bonne structure.
 * V4 — la présente, et le déclencheur n'était PAS un défaut de conception.
 *
 * ⚠️ CE QUE LA CAPTURE DE GIZ MONTRAIT VRAIMENT : un logo géant et une
 * barre du bas sans aucun espace entre les liens — « gence Réalisations
 * Contact Mentions légales ». Or dans le navigateur, au même moment, le
 * logo mesurait 24 px et l'espacement 28 px. Sa feuille de style compilée
 * était en retard sur le code : Tailwind n'avait pas encore régénéré les
 * classes d'un composant fraîchement créé.
 *
 * 👉 LA LEÇON, ET ELLE VAUT AU-DELÀ DU PIED DE PAGE : quand un défaut visuel
 * est invraisemblable — un logo dix fois trop grand n'est pas une erreur de
 * conception —, la première hypothèse doit être une feuille de style
 * périmée, pas une faute dans le code.
 *
 * ⭐ D'où deux garde-fous ajoutés ici, qui rendent le rendu correct MÊME si
 * des classes manquent :
 *   · la hauteur du logo est en style direct, pas en classe utilitaire ;
 *   · les liens du bas sont séparés par un « · » explicite, donc lisibles
 *     même sans espacement.
 * Ce n'est pas de la paranoïa : ce pied de page s'affiche sur toutes les
 * pages, et un défaut y est visible partout à la fois.
 *
 * 📌 Les neuf savoir-faire restent listés en clair : ce sont les pages qui
 * portent le référencement du site, et les citer partout leur donne un lien
 * entrant depuis chaque page.
 *
 * ⛔ NE JAMAIS ÉCRIRE « bureau commercial » pour Paris ni Genève, et ne
 * jamais affirmer qu'il y a un STUDIO là-bas : ce serait faux. On cite les
 * villes sans les qualifier.
 */

const VILLES = [
  ["Lyon", "8 rue Jean Élysée Dupuy, 69410 Champagne-au-Mont-d’Or"],
  ["Paris", "92 avenue Victor Hugo, 92100 Boulogne-Billancourt"],
  ["Genève", "bluevista.ch — Suisse romande"],
];

const BAS = [
  { nom: "L’agence", href: "/apercu/agence" },
  { nom: "Réalisations", href: "/apercu/realisations" },
  { nom: "Contact", href: "/apercu/contact" },
];

export function PiedDePage() {
  return (
    <footer style={{ background: SOMBRE_PROFOND, color: "#fff" }}>
      <div
        className="mx-auto max-w-[1500px] px-8"
        style={{ paddingTop: 56, paddingBottom: 40 }}
      >
        <div
          style={{
            display: "grid",
            gap: 48,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {/* ── L'identité ─────────────────────────────────────────────── */}
          <div>
            {/* ⛔ Hauteur en style direct : une classe utilitaire absente de
                la feuille compilée laisserait l'image à sa taille naturelle,
                soit un logo qui mange la moitié du pied de page. */}
            <a href="/apercu/v7" aria-label="Bluevista — accueil">
              <img
                src="/media/logo-bluevista-blanc.png"
                alt="Bluevista"
                style={{ height: 24, width: "auto", display: "block" }}
              />
            </a>
            <p
              className="text-[14px] leading-relaxed text-white/50"
              style={{ marginTop: 16, maxWidth: "34ch" }}
            >
              Agence de communication &amp; marketing, d’événementiel et
              d’immersion. Toute la chaîne de production en interne,
              depuis&nbsp;2004.
            </p>
            <a
              href="tel:+33472345189"
              className="text-[14px] font-semibold transition hover:text-white"
              style={{ color: BLEU_CLAIR, display: "inline-block", marginTop: 18 }}
            >
              +33 (0)4 72 34 51 89
            </a>
          </div>

          {/* ── Les savoir-faire ───────────────────────────────────────────
              Pas de groupement par métier : c'est lui qui créait le vide de
              la V1, puisque la répartition est 5/3/1 et qu'une grille
              réserve à toutes ses colonnes la hauteur de la plus longue.
              Sans groupement, neuf entrées se rangent d'elles-mêmes.
              Le groupement par métier vit dans le menu « Offres ». */}
          <nav aria-label="Nos savoir-faire" style={{ gridColumn: "span 2" }}>
            <div
              className="text-[12px] font-bold uppercase tracking-[0.16em]"
              style={{ color: BLEU_CLAIR }}
            >
              Nos savoir-faire
            </div>
            <ul
              style={{
                marginTop: 16,
                display: "grid",
                gap: "10px 32px",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {COMPETENCES.map(c => (
                <li key={c.slug}>
                  <a
                    href={`/apercu/competence/${c.slug}`}
                    className="text-[14px] leading-snug text-white/55 transition hover:text-white"
                  >
                    {c.nom}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Les villes ────────────────────────────────────────────── */}
          <div>
            <div
              className="text-[12px] font-bold uppercase tracking-[0.16em]"
              style={{ color: BLEU_CLAIR }}
            >
              Nous trouver
            </div>
            <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
              {VILLES.map(([ville, adresse]) => (
                <address key={ville} className="not-italic text-[14px] leading-snug">
                  <span className="font-semibold text-white/75">{ville}</span>
                  <span className="block text-white/45">{adresse}</span>
                </address>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.10)" }}>
        <div
          className="mx-auto max-w-[1500px] px-8 text-[13px] text-white/40"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px 32px",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {/* ⛔ Séparateurs « · » EXPLICITES entre les liens. Sans eux, une
              feuille de style en retard colle les intitulés les uns aux
              autres — c'est très exactement ce que montrait la capture de
              Giz : « gence Réalisations Contact Mentions légales ». */}
          <nav style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
            {BAS.map((l, i) => (
              <span key={l.href} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                {i > 0 && <span aria-hidden style={{ opacity: 0.4 }}>·</span>}
                <a href={l.href} className="transition hover:text-white">
                  {l.nom}
                </a>
              </span>
            ))}
            {/* ⚠️ Obligatoires pour un site commercial français. Elles
                n'existent pas encore — le texte le dit plutôt que de faire
                semblant, et ⛔ ne doit jamais rester en « # ». */}
            {["Mentions légales", "Politique de confidentialité"].map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden style={{ opacity: 0.4 }}>·</span>
                <span style={{ opacity: 0.5 }} title="À créer avant la mise en ligne">
                  {t}
                </span>
              </span>
            ))}
          </nav>
          <div>© {new Date().getFullYear()} Bluevista</div>
        </div>
      </div>
    </footer>
  );
}
