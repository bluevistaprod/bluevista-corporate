import { EnTete } from "../_EnTete";
import { COMPETENCES, METIERS, PAGES_FIXES, VILLES, competencesDuMetier } from "../_plan-du-site";
import { TOUTES_REALISATIONS } from "../_realisations";
import { BLEU, CLAIR, CLAIR_SOUTENU, SOMBRE, TYPO } from "../_palette";

/**
 * LE PLAN DE LA MAQUETTE — page de travail, pas une page du site.
 *
 * Elle existe pour une raison pratique : la maquette compte maintenant une
 * vingtaine de pages réparties sur quatre routes dynamiques, et il n'y a
 * aucun moyen de toutes les atteindre en cliquant. Elle affiche aussi le
 * trafic actuel de chaque adresse, pour que la relecture se fasse dans le
 * bon ordre — on relit d'abord ce qui rapporte.
 *
 * ⛔ À SUPPRIMER avant la mise en ligne, avec le dossier /apercu.
 */

const Ligne = ({
  href,
  nom,
  detail,
  clics,
  etat,
}: {
  href: string;
  nom: string;
  detail?: string;
  clics?: number;
  etat: "structure" | "contenu-manquant" | "a-faire";
}) => {
  const etats = {
    structure: { texte: "Structure prête", couleur: "#1F7A4D", fond: "rgba(31,122,77,.10)" },
    "contenu-manquant": { texte: "Texte à écrire", couleur: "#9A7200", fond: "rgba(224,164,0,.12)" },
    "a-faire": { texte: "Pas commencée", couleur: "#8A3030", fond: "rgba(138,48,48,.10)" },
  }[etat];

  return (
    <a
      href={href}
      className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t py-4 transition hover:bg-black/[.03]"
      style={{ borderColor: "rgba(0,0,0,.09)" }}
    >
      <span className="min-w-[18rem] flex-1 font-semibold">{nom}</span>
      {detail && <span className="text-[14px] opacity-45">{detail}</span>}
      <span
        className="rounded-full px-3 py-1 text-[12px] font-bold"
        style={{ color: etats.couleur, background: etats.fond }}
      >
        {etats.texte}
      </span>
      <span className="w-24 text-right text-[14px] tabular-nums opacity-55">
        {clics ? `${clics} clics` : "—"}
      </span>
    </a>
  );
};

export default function PlanDeLaMaquette() {
  const totalCompetences = COMPETENCES.reduce((s, c) => s + c.clics, 0);
  const totalVilles = VILLES.reduce((s, v) => s + v.clics, 0);

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section className="mx-auto max-w-[1100px] px-8 pb-16 pt-40">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Page de travail
        </div>
        <h1 className={TYPO.titre}>Le plan de la maquette</h1>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Toutes les pages construites, avec le trafic actuel de l’adresse
          correspondante. Relisez dans cet ordre&nbsp;: ce qui rapporte
          d’abord.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-8 pb-24">
        {/* ── Niveau 0 ─────────────────────────────────────────────────── */}
        <h2 className="mt-12 text-[1.35rem] font-bold tracking-tight">
          La page d’accueil
        </h2>
        <div className="mt-4">
          <Ligne href="/apercu/v7" nom="Accueil — V7" detail="/" clics={894} etat="structure" />
        </div>

        {/* ── Niveau 1 ─────────────────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Les trois métiers{" "}
          <span className="font-normal opacity-45">— nouveaux, ils portent le repositionnement</span>
        </h2>
        <div className="mt-4">
          {METIERS.map(m => (
            <Ligne
              key={m.cle}
              href={`/apercu/metier/${m.slug}`}
              nom={m.nom}
              detail={`${competencesDuMetier(m.cle).length} savoir-faire`}
              etat="structure"
            />
          ))}
        </div>

        {/* ── Niveau 2 ─────────────────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Les savoir-faire{" "}
          <span className="font-normal opacity-45">
            — {totalCompetences} clics : c’est ici que vit le référencement
          </span>
        </h2>
        <div className="mt-4">
          {[...COMPETENCES]
            .sort((a, b) => b.clics - a.clics)
            .map(c => (
              <Ligne
                key={c.slug}
                href={`/apercu/competence/${c.slug}`}
                nom={c.nom}
                detail={c.ancienneUrl}
                clics={c.clics}
                etat="contenu-manquant"
              />
            ))}
        </div>

        {/* ── Les villes ───────────────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Les villes{" "}
          <span className="font-normal opacity-45">
            — {totalVilles} clics, et les pages les plus fragiles de la refonte
          </span>
        </h2>
        <div className="mt-4">
          {[...VILLES]
            .sort((a, b) => b.clics - a.clics)
            .map(v => (
              <Ligne
                key={v.slug}
                href={`/apercu/ville/${v.slug}`}
                nom={v.titre}
                detail={v.ancienneUrl}
                clics={v.clics}
                etat="contenu-manquant"
              />
            ))}
        </div>

        {/* ── Les pages transverses ────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Les pages transverses
        </h2>
        <div className="mt-4">
          <Ligne href="/apercu/agence" nom="L’agence" detail="/agence/" clics={38} etat="contenu-manquant" />
          <Ligne href="/apercu/contact" nom="Contact & devis" detail="/contact-devis/" clics={17} etat="structure" />
        </div>

        {/* ── Les réalisations ─────────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Les réalisations{" "}
          <span className="font-normal opacity-45">
            — 140 pages sur l’ancien site, le plus gros actif de contenu
          </span>
        </h2>
        <div className="mt-4">
          <Ligne
            href="/apercu/realisations"
            nom="Index filtrable"
            detail="/nos-realisations/"
            clics={15}
            etat="structure"
          />
          {TOUTES_REALISATIONS.slice(0, 5).map(r => (
            <Ligne
              key={r.slug}
              href={`/apercu/realisations/${r.slug}`}
              nom={r.titre}
              detail={r.ancienneUrl}
              clics={r.clics}
              etat="contenu-manquant"
            />
          ))}
          <Ligne
            href="/apercu/realisations"
            nom={`… et ${TOUTES_REALISATIONS.length - 5} autres dans l’index`}
            etat="contenu-manquant"
          />
        </div>

        {/* ── Ce qui reste ─────────────────────────────────────────────── */}
        <h2 className="mt-16 text-[1.35rem] font-bold tracking-tight">
          Pas encore construites
        </h2>
        <div className="mt-4">
          {PAGES_FIXES.filter(p => !["contact", "realisations", "agence"].includes(p.slug)).map(p => (
            <Ligne
              key={p.slug}
              href="#"
              nom={p.nom}
              detail={p.ancienneUrl}
              clics={p.clics}
              etat="a-faire"
            />
          ))}
        </div>
      </section>

      {/* ── Ce que le plan raconte ──────────────────────────────────────── */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[900px] px-8 py-20">
          <h2 className={TYPO.titre}>Ce que ce tableau dit</h2>
          <p className={`mt-6 ${TYPO.corps}`}>
            Hors page d’accueil, <strong>tout le trafic entre par le niveau 2</strong> —
            les savoir-faire et les villes. Aucune des trois pages métier
            n’existe aujourd’hui, et aucune ne se positionnera avant des mois :
            « communication &amp; marketing » est une expression sur laquelle
            personne ne cherche une agence.
          </p>
          <p className={`mt-5 ${TYPO.corps}`}>
            C’est pour ça que l’architecture a trois niveaux et pas un. Les
            pages métier portent le repositionnement et la conversion ; les
            pages de savoir-faire gardent le référencement acquis. Supprimer
            les secondes au profit des premières aurait été l’erreur la plus
            coûteuse de cette refonte.
          </p>
        </div>
      </section>
    </main>
  );
}
