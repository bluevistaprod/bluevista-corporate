"use client";

import { useState } from "react";
import { METIERS } from "./_plan-du-site";
import { BLEU, CLAIR_SOUTENU } from "./_palette";

/**
 * LES TROIS FORMULAIRES — ventes, recrutement, stages.
 *
 * Repris de l'ancien site sur demande de Giz. Le découpage n'est pas
 * cosmétique : ces trois demandes ne vont pas au même endroit et ne se
 * traitent pas au même rythme. Une demande commerciale entre dans le
 * pipeline Podio ; une candidature part aux RH ; une demande de stage arrive
 * par vagues en janvier et en avril.
 *
 * ⛔ CE QU'UN FORMULAIRE UNIQUE COÛTE, et c'est la raison de fond : un champ
 * « objet de votre demande » dans un menu déroulant fait passer les
 * candidatures dans la boîte commerciale. Elles y sont lues en retard, ou
 * pas du tout. Trois formulaires, trois destinataires, trois délais annoncés.
 *
 * ⚠️ Aucun n'envoie quoi que ce soit dans la maquette. Le premier devra
 * alimenter Podio en natif (application Ventes) — pas un e-mail, pas une
 * passerelle : une demande qui n'entre pas dans le pipeline est une demande
 * qu'on oublie.
 */

type Onglet = "ventes" | "recrutement" | "stage";

const ONGLETS: { cle: Onglet; nom: string; delai: string }[] = [
  { cle: "ventes", nom: "Un projet", delai: "Réponse sous 48 h ouvrées" },
  { cle: "recrutement", nom: "Une candidature", delai: "Réponse sous 3 semaines" },
  { cle: "stage", nom: "Un stage ou une alternance", delai: "Réponse sous 3 semaines" },
];

const BUDGETS = [
  "Moins de 5 000 €",
  "5 000 à 15 000 €",
  "15 000 à 50 000 €",
  "Plus de 50 000 €",
  "Je ne sais pas encore",
];

function Champ({
  label,
  type = "text",
  requis = false,
  aide,
}: {
  label: string;
  type?: string;
  requis?: boolean;
  aide?: string;
}) {
  return (
    <label className="block">
      <span className="text-[14px] font-bold">
        {label}
        {requis && <span style={{ color: BLEU }}> *</span>}
        {!requis && <span className="ml-2 text-[13px] font-normal opacity-45">facultatif</span>}
      </span>
      {aide && <span className="mt-1 block text-[13px] opacity-50">{aide}</span>}
      {type === "textarea" ? (
        <textarea
          rows={5}
          required={requis}
          className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none transition focus:border-[#12607E]"
        />
      ) : (
        <input
          type={type}
          required={requis}
          className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none transition focus:border-[#12607E]"
        />
      )}
    </label>
  );
}

export function Formulaires() {
  const [onglet, setOnglet] = useState<Onglet>("ventes");
  const [metier, setMetier] = useState<string | null>(null);
  const actif = ONGLETS.find(o => o.cle === onglet)!;

  return (
    <div>
      {/* ── Le choix du formulaire ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {ONGLETS.map(o => {
          const on = o.cle === onglet;
          return (
            <button
              key={o.cle}
              onClick={() => setOnglet(o.cle)}
              aria-pressed={on}
              className="rounded-md border-2 px-6 py-4 text-left transition"
              style={{
                borderColor: on ? BLEU : "rgba(0,0,0,.12)",
                background: on ? BLEU : "transparent",
                color: on ? "#fff" : "inherit",
              }}
            >
              <span className="block text-[1.0625rem] font-bold">{o.nom}</span>
              <span className={`mt-0.5 block text-[13px] ${on ? "text-white/70" : "opacity-50"}`}>
                {o.delai}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-12 space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Champ label="Nom et prénom" requis />
          <Champ
            label={onglet === "ventes" ? "Entreprise" : "Formation ou dernier poste"}
            requis={onglet === "ventes"}
          />
          <Champ label="E-mail" type="email" requis />
          <Champ label="Téléphone" type="tel" />
        </div>

        {/* ── Ce qui change d'un formulaire à l'autre ────────────────── */}
        {onglet === "ventes" && (
          <>
            <fieldset>
              <legend className="text-[14px] font-bold">
                Votre projet relève de<span style={{ color: BLEU }}> *</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {[...METIERS.map(m => ({ cle: m.cle as string, nom: m.nom })), { cle: "autre", nom: "Je ne sais pas encore" }].map(o => {
                  const on = metier === o.cle;
                  return (
                    <button
                      key={o.cle}
                      type="button"
                      onClick={() => setMetier(o.cle)}
                      aria-pressed={on}
                      className="rounded-md border-2 px-5 py-3 text-[15px] font-semibold transition"
                      style={{
                        borderColor: on ? BLEU : "rgba(0,0,0,.12)",
                        background: on ? BLEU : "transparent",
                        color: on ? "#fff" : "inherit",
                      }}
                    >
                      {o.nom}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-[14px] font-bold">Budget envisagé</span>
              <span className="ml-2 text-[13px] opacity-45">facultatif</span>
              {/* ⚠️ Facultatif, et par tranches. L'imposer fait fuir ceux qui
                  ne savent pas encore — c'est-à-dire beaucoup de bons
                  projets, et souvent les plus gros. */}
              <select
                className="mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none focus:border-[#12607E]"
                defaultValue=""
              >
                <option value="">—</option>
                {BUDGETS.map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>

            <Champ
              label="Votre projet"
              type="textarea"
              requis
              aide="Ce que vous devez obtenir, pour qui, et à quelle échéance. Le format viendra après."
            />
          </>
        )}

        {onglet === "recrutement" && (
          <>
            <Champ label="Le poste qui vous intéresse" requis aide="Ou le métier, si aucune offre ne correspond." />
            <Champ label="Lien vers votre portfolio ou votre showreel" type="url" aide="Plus parlant qu’un CV, dans nos métiers." />
            <Champ
              label="Votre message"
              type="textarea"
              requis
              aide="Ce que vous cherchez, et ce sur quoi vous aimeriez travailler chez nous."
            />
          </>
        )}

        {onglet === "stage" && (
          <>
            <Champ label="École et niveau d’études" requis />
            <Champ label="Période et durée" requis aide="Dates souhaitées, et durée imposée par votre école." />
            <Champ label="Lien vers vos travaux" type="url" />
            <Champ
              label="Votre message"
              type="textarea"
              requis
              aide="Ce que vous voulez apprendre. On lit tout, mais on retient ceux qui ont regardé nos réalisations."
            />
          </>
        )}

        <button
          type="button"
          className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110"
          style={{ background: BLEU }}
        >
          Envoyer
        </button>

        <p className="text-[13px] leading-relaxed opacity-50">
          {actif.delai}. Vos données servent uniquement à traiter votre
          demande&nbsp;: elles ne sont ni revendues ni utilisées à d’autres fins.
        </p>
      </form>

      {/* ── LA CARTE, DESSINÉE ET NON INTÉGRÉE ──────────────────────────
          Décision de Giz : carte statique. Deux bénéfices d'un seul geste.

          1. AUCUN MOUCHARD. Une iframe Google Maps dépose des cookies tiers
             et déclencherait l'obligation d'une bannière de consentement sur
             TOUTE la page. Ici, rien ne sort du domaine : pas de bannière à
             cause de la carte.
          2. ELLE EST À NOS COULEURS. Une carte Google est grise et porte le
             logo de Google au milieu d'une page d'agence. Celle-ci est un
             SVG aux couleurs de la charte.

          ⚠️ Positions approximatives — c'est un schéma, pas un plan. Personne
          ne vient à un rendez-vous en s'orientant sur ce dessin : l'adresse
          écrite juste à côté fait ce travail. */}
      <div className="mt-16">
        <div className="text-[13px] font-bold uppercase tracking-[0.16em] opacity-45">
          Nous trouver
        </div>
        <div className="mt-4 overflow-hidden rounded-md" style={{ background: CLAIR_SOUTENU }}>
          <svg viewBox="0 0 420 260" className="h-auto w-full" role="img" aria-label="Lyon, Paris, Genève">
            <rect width="420" height="260" fill={CLAIR_SOUTENU} />
            {/* Un contour de France très simplifié — un repère, pas une carte. */}
            <path
              d="M150 42 L214 34 L246 58 L268 52 L288 78 L276 110 L296 128 L286 158 L252 176 L246 208 L206 224 L166 208 L142 176 L112 156 L104 118 L124 92 Z"
              fill="none"
              stroke={BLEU}
              strokeOpacity="0.28"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {([
              { x: 206, y: 92, nom: "Paris", ancrage: "end" },
              { x: 236, y: 158, nom: "Lyon", ancrage: "start" },
              { x: 274, y: 142, nom: "Genève", ancrage: "start" },
            ] as const).map(v => (
              <g key={v.nom}>
                <circle cx={v.x} cy={v.y} r="5" fill={BLEU} />
                <circle cx={v.x} cy={v.y} r="12" fill={BLEU} fillOpacity="0.14" />
                <text
                  x={v.ancrage === "end" ? v.x - 16 : v.x + 16}
                  y={v.y + 4}
                  textAnchor={v.ancrage}
                  fill={BLEU}
                  fontSize="13"
                  fontWeight="700"
                >
                  {v.nom}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed opacity-45">
          Nos équipes se déplacent partout en France et en Suisse.
        </p>
      </div>
    </div>
  );
}
