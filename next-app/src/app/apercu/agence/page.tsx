import { EnTete } from "../_EnTete";
import { MethodeChapeau } from "../_MethodeChapeau";
import { BLEU, BLEU_CLAIR, CLAIR, CLAIR_SOUTENU, NOIR, SOMBRE, TYPO } from "../_palette";

/**
 * LA PAGE AGENCE — /agence/ sur l'ancien site, 38 clics sur 12 mois.
 *
 * ⛔ C'EST LA PAGE OÙ LE REPOSITIONNEMENT SE JOUE OU SE PERD.
 * Partout ailleurs on montre ce qu'on fait ; ici on dit qui on est. Un
 * prospect qui arrive sur cette page a déjà vu le travail et cherche à savoir
 * à qui il aurait affaire — c'est la dernière page avant le rendez-vous.
 *
 * ⛔⛔ LES DEUX INTERDITS DE GIZ S'APPLIQUENT ICI PLUS QU'AILLEURS :
 *   1. ON NE DIT PAS CE QU'ON N'EST PAS. Pas de « une équipe, pas un
 *      prestataire », pas de « contrairement aux agences classiques ». Une
 *      identité qui se définit par opposition n'en est pas une.
 *   2. PAS DE SECTION « ÉQUIPE » avec trombinoscope. Sa formulation, le
 *      02/08/2026 : « peut-être que l'équipe se sent et ne se montre pas
 *      spécialement dans UNE section ». Elle se sent dans le showreel, dans
 *      les coulisses et dans la façon d'écrire — pas dans une grille de
 *      portraits.
 *
 * ⚠️ CE QUI MANQUE, et que je ne peux pas écrire : la genèse de l'agence, et
 * « ce qui nous fait vibrer en ce moment » — deux blocs prévus par Giz dans
 * son Canva « SITE WEB BLUEVISTA 2026 ». Ce sont les seuls endroits du site
 * où il parle en son nom. Les emplacements sont prêts et signalés.
 */

const REPERES = [
  {
    chiffre: "2004",
    libelle: "Première année d’activité",
    detail: "Vingt ans dans le même métier, sans changement de nom ni de dirigeant.",
  },
  {
    chiffre: "4",
    libelle: "Pôles internes",
    detail: "Vidéo, son, infographie, développement. Rien ne part en sous-traitance à l’aveugle.",
  },
  {
    chiffre: "3",
    libelle: "Villes",
    detail: "Lyon, Paris, Genève.",
  },
];

export default function PageAgence() {
  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-20 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            L’agence
          </div>
          <h1 className="max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Une agence qui fabrique ce qu’elle conçoit
          </h1>
          <p className="mt-7 max-w-2xl text-[1.15rem] leading-relaxed text-white/80">
            Communication et marketing, événementiel, immersion. Quatre pôles
            sous le même toit, et un seul interlocuteur du premier atelier à la
            diffusion.
          </p>
        </div>
      </section>

      {/* ── Les repères ─────────────────────────────────────────────────
             ⛔ Trois chiffres, tous vérifiables, aucun de performance. La
             règle posée après « 145 films » : un chiffre doit venir d'une
             source qui mesure ce qu'elle prétend mesurer. */}
      <section style={{ background: SOMBRE, color: "#fff" }}>
        <div className="mx-auto grid max-w-[1500px] gap-12 px-8 py-16 sm:grid-cols-3">
          {REPERES.map(r => (
            <div key={r.libelle}>
              <div className="text-[3rem] font-bold leading-none tabular-nums" style={{ color: BLEU_CLAIR }}>
                {r.chiffre}
              </div>
              <div className="mt-3 text-[1.0625rem] font-bold">{r.libelle}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── La genèse — emplacement réservé ────────────────────────────── */}
      <section className="mx-auto max-w-[900px] px-8 py-24">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Notre histoire
        </div>
        <h2 className={TYPO.titre}>D’où vient Bluevista</h2>

        <div
          className="mt-10 rounded-md border-2 border-dashed px-8 py-10"
          style={{ borderColor: `${BLEU}55` }}
        >
          <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
            À écrire par Giz — et par personne d’autre
          </div>
          <p className={`mt-4 ${TYPO.corps}`}>
            La genèse de l’agence, et « ce qui nous fait vibrer en ce moment » —
            les deux blocs prévus dans le Canva <em>Site web Bluevista 2026</em>.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed opacity-55">
            C’est le seul endroit du site où quelqu’un parle en son nom. Un
            texte d’agence écrit par une agence se reconnaît en trois lignes, et
            il annule le bénéfice de tout le reste de la page. Deux paragraphes
            suffisent, mais ils doivent être de vous.
          </p>
        </div>
      </section>

      {/* ── La méthode, en chapeau ───────────────────────────────────────
             La même que sur la page d'accueil. Ce n'est pas un doublon : sur
             la home elle sert à convaincre, ici elle sert à expliquer — et
             quelqu'un qui arrive directement sur /agence/ depuis Google ne
             l'a jamais vue. */}
      <section style={{ background: CLAIR_SOUTENU }}>
        <div className="mx-auto max-w-[1500px] px-8 py-28">
          <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
            De l’analyse au débriefing
          </div>
          <h2 className={`max-w-4xl ${TYPO.titre}`}>Une méthode. Trois métiers.</h2>
          <div className="mt-16">
            <MethodeChapeau />
          </div>
        </div>
      </section>

      {/* ── Les trois villes ───────────────────────────────────────────
             ⛔ NE JAMAIS ÉCRIRE « bureau commercial » pour Paris ni Genève,
             et ne jamais affirmer qu'il y a un STUDIO là-bas : ce serait
             faux. On cite les villes sans les qualifier — c'est exact, et ça
             nourrit le référencement local. */}
      <section className="mx-auto max-w-[1500px] px-8 py-24">
        <div className={`mb-7 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU }}>
          <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU }} />
          Où nous trouver
        </div>
        <h2 className={`max-w-3xl ${TYPO.titre}`}>Lyon, Paris, Genève</h2>
        <p className={`mt-6 max-w-2xl ${TYPO.chapo}`}>
          Nos équipes se déplacent partout en France et en Suisse. La Suisse a
          son propre site&nbsp;: <strong>bluevista.ch</strong>.
        </p>
      </section>

      <section style={{ background: SOMBRE, color: "#fff" }} className="py-24 text-center">
        <h2 className={`mx-auto max-w-3xl px-8 ${TYPO.titre}`}>
          On en parle de <span style={{ color: BLEU_CLAIR }}>vive voix</span> ?
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
          <a
            href="/apercu/contact"
            className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
            style={{ background: BLEU }}
          >
            Contactez-nous
          </a>
          <a
            href="/apercu/realisations"
            className="rounded-md border border-white/30 px-9 py-4 text-[16px] font-semibold"
          >
            Voir nos réalisations
          </a>
        </div>
      </section>
    </main>
  );
}
