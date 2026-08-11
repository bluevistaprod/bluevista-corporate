"use client";

import { useEffect, useRef, useState } from "react";
import { METIERS } from "./_plan-du-site";
import { BLEU, CLAIR_SOUTENU } from "./_palette";
import { lireAcquisition } from "@/lib/acquisition-navigateur";
import {
  BUDGETS,
  COMPETENCES,
  CONTRATS,
  CHAMP_PIEGE,
  type Marche,
  type TypeFormulaire,
} from "@/lib/formulaires";

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
 * ⭐⭐ ET CE DÉCOUPAGE RÈGLE, TOUT SEUL, LE PLUS GROS PROBLÈME MESURÉ DU
 * DISPOSITIF ACTUEL. Sur 210 demandes venues de l'ancien formulaire, 106 —
 * la moitié — sont des candidatures spontanées tombées dans l'app Ventes,
 * marquées « décliné par bluevista ». Elles ont pollué le pipeline commercial
 * ET déclenché autant de fausses conversions Google Ads. Ici, une candidature
 * ne peut plus atterrir dans les Ventes : elle n'a pas le même formulaire,
 * pas la même route, pas la même app.
 *
 * ✅ LES TROIS ENVOIENT MAINTENANT POUR DE VRAI — vers `/api/formulaire`, qui
 * crée l'item Podio côté serveur. ⛔ Aucun appel à Podio ne part d'ici : le
 * jeton resterait visible dans l'inspecteur de n'importe quel visiteur.
 */

type Onglet = TypeFormulaire;

const ONGLETS: { cle: Onglet; nom: string; delai: string }[] = [
  { cle: "ventes", nom: "Un projet", delai: "Réponse sous 48 h ouvrées" },
  { cle: "recrutement", nom: "Une candidature", delai: "Réponse sous 3 semaines" },
  { cle: "stage", nom: "Un stage ou une alternance", delai: "Réponse sous 3 semaines" },
];

const CLASSE_CHAMP =
  "mt-2 w-full rounded-md border-2 border-black/10 bg-white px-4 py-3.5 text-[16px] outline-none transition focus:border-[#12607E]";

function Champ({
  label,
  type = "text",
  requis = false,
  aide,
  valeur,
  onChange,
}: {
  label: string;
  type?: string;
  requis?: boolean;
  aide?: string;
  valeur: string;
  onChange: (v: string) => void;
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
          value={valeur}
          onChange={e => onChange(e.target.value)}
          className={CLASSE_CHAMP}
        />
      ) : (
        <input
          type={type}
          required={requis}
          value={valeur}
          onChange={e => onChange(e.target.value)}
          className={CLASSE_CHAMP}
        />
      )}
    </label>
  );
}

/** Les cases à cocher en pastilles — même vocabulaire visuel que les piliers. */
function Pastilles({
  options,
  choisies,
  basculer,
}: {
  options: readonly string[];
  choisies: string[];
  basculer: (v: string) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2.5">
      {options.map(o => {
        const on = choisies.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => basculer(o)}
            aria-pressed={on}
            className="rounded-md border-2 px-4 py-2.5 text-[14px] font-semibold transition"
            style={{
              borderColor: on ? BLEU : "rgba(0,0,0,.12)",
              background: on ? BLEU : "transparent",
              color: on ? "#fff" : "inherit",
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

const VIDE = {
  nom: "",
  entreprise: "",
  email: "",
  telephone: "",
  poste: "",
  lien: "",
  message: "",
  debut: "",
  fin: "",
  echeance: "",
};

/**
 * ⚠️ `marche` n'est PAS la source de vérité — c'est un dépannage.
 * En production, le serveur déduit le marché du DOMAINE (bluevista.ch → CH,
 * en.bluevistaprod.com → EN), parce qu'une demande suisse qui atterrirait dans
 * le CRM français partirait vers une entité qui ne peut pas la facturer, et
 * que personne ne s'en apercevrait avant le devis. Cette propriété ne sert
 * qu'en développement, où tout tourne sur localhost.
 */
export function Formulaires({ marche = "fr" }: { marche?: Marche } = {}) {
  const [onglet, setOnglet] = useState<Onglet>("ventes");
  const [champs, setChamps] = useState({ ...VIDE });
  const [pilier, setPilier] = useState<string | null>(null);
  const [budget, setBudget] = useState("");
  const [contrat, setContrat] = useState("");
  const [competences, setCompetences] = useState<string[]>([]);
  const [consentement, setConsentement] = useState(false);
  const [piege, setPiege] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);

  /** Horodatage d'affichage — sert à la barrière anti-robot côté serveur. */
  const affiche = useRef<number>(0);
  useEffect(() => {
    affiche.current = Date.now();
  }, []);

  const actif = ONGLETS.find(o => o.cle === onglet)!;
  const maj = (cle: keyof typeof VIDE) => (v: string) => setChamps(c => ({ ...c, [cle]: v }));

  function changerOnglet(cle: Onglet) {
    setOnglet(cle);
    setErreur(null);
    // ⚠️ On ne vide PAS les champs communs (nom, e-mail, téléphone) : quelqu'un
    // qui se trompe d'onglet après avoir saisi son identité ne doit pas être
    // puni en le retapant. Seuls les champs propres à l'onglet quitté partent.
    setPilier(null);
    setBudget("");
    setContrat("");
    setCompetences([]);
    setChamps(c => ({ ...c, poste: "", lien: "", debut: "", fin: "", echeance: "" }));
  }

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (etat === "envoi") return;

    // Les vérifications que le navigateur ne fait pas tout seul, dites en
    // clair plutôt que par un `required` sur un bouton-pastille (invisible
    // pour la validation native, donc muet pour le visiteur).
    if (onglet === "ventes" && !pilier) {
      setErreur("Indiquez de quoi relève votre projet — ou « Je ne sais pas encore ».");
      return;
    }
    if (onglet === "recrutement" && competences.length === 0) {
      setErreur("Choisissez au moins un domaine de compétences.");
      return;
    }
    if (onglet === "recrutement" && !contrat) {
      setErreur("Précisez ce que vous cherchez : alternance, CDD, CDI…");
      return;
    }

    setEtat("envoi");
    setErreur(null);

    try {
      const reponse = await fetch("/api/formulaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: onglet,
          marche,
          ...champs,
          pilier,
          budget,
          contrat,
          competences,
          consentement,
          [CHAMP_PIEGE]: piege,
          msDepuisAffichage: Date.now() - affiche.current,
          acquisition: lireAcquisition(),
        }),
      });

      const donnees = (await reponse.json()) as { ok?: boolean; message?: string };
      if (!reponse.ok || !donnees.ok) {
        throw new Error(donnees.message || "L'envoi n'a pas abouti.");
      }
      setEtat("envoye");
    } catch (err) {
      setEtat("saisie");
      setErreur(err instanceof Error ? err.message : "L'envoi n'a pas abouti.");
    }
  }

  /* ── L'accusé de réception ─────────────────────────────────────────────
     Une page distincte plutôt qu'un bandeau vert : le visiteur doit voir que
     quelque chose a changé, pas chercher une ligne au-dessus d'un formulaire
     qu'il vient de remplir. Et le délai annoncé est répété ici — c'est le
     moment où on le lit. */
  if (etat === "envoye") {
    return (
      <div className="rounded-md border-2 px-8 py-12" style={{ borderColor: BLEU }}>
        <div className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: BLEU }}>
          Message reçu
        </div>
        <p className="mt-5 text-[1.35rem] font-bold leading-snug">
          C’est bien arrivé chez nous.
        </p>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed opacity-70">
          {actif.delai}. Si votre projet est urgent, le téléphone reste plus
          rapide — le numéro est juste à côté.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── Le choix du formulaire ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {ONGLETS.map(o => {
          const on = o.cle === onglet;
          return (
            <button
              key={o.cle}
              type="button"
              onClick={() => changerOnglet(o.cle)}
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

      <form className="mt-12 space-y-8" onSubmit={envoyer} noValidate={false}>
        {/* ── LE CHAMP PIÈGE ────────────────────────────────────────────
            Invisible à l'écran, invisible au lecteur d'écran, hors du
            parcours de tabulation : un humain ne peut pas le remplir. Les
            robots, qui lisent le HTML et non l'écran, le remplissent. Rempli
            = l'envoi est accepté en apparence et jeté côté serveur.
            ⚠️ Ne jamais l'appeler « honeypot » ni le masquer par
            `display:none` seul : les robots récents reconnaissent les deux. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Site web
            <input
              type="text"
              name={CHAMP_PIEGE}
              value={piege}
              onChange={e => setPiege(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Champ label="Nom et prénom" requis valeur={champs.nom} onChange={maj("nom")} />
          <Champ
            label={
              onglet === "ventes"
                ? "Entreprise"
                : onglet === "recrutement"
                  ? "Formation ou dernier poste"
                  : "École et niveau d’études"
            }
            requis={onglet !== "recrutement"}
            valeur={champs.entreprise}
            onChange={maj("entreprise")}
          />
          <Champ label="E-mail" type="email" requis valeur={champs.email} onChange={maj("email")} />
          <Champ label="Téléphone" type="tel" valeur={champs.telephone} onChange={maj("telephone")} />
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
                  const on = pilier === o.cle;
                  return (
                    <button
                      key={o.cle}
                      type="button"
                      onClick={() => setPilier(o.cle)}
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
                  projets, et souvent les plus gros.
                  ⛔ Les tranches sont celles de l'app Ventes, pas d'autres :
                  des seuils différents obligeraient à ranger « 5 000 à
                  15 000 € » dans l'une ou l'autre case de Podio,
                  arbitrairement — donc à fabriquer une donnée fausse. */}
              <select
                className={CLASSE_CHAMP}
                value={budget}
                onChange={e => setBudget(e.target.value)}
              >
                <option value="">Je ne sais pas encore</option>
                {BUDGETS.map(b => (
                  <option key={b.cle} value={b.cle}>
                    {b.libelle}
                  </option>
                ))}
              </select>
            </label>

            <Champ
              label="Votre projet"
              type="textarea"
              requis
              valeur={champs.message}
              onChange={maj("message")}
              aide="Ce que vous devez obtenir, pour qui, et à quelle échéance. Le format viendra après."
            />

            {/* ⭐ REMIS d'après l'ancien formulaire, pas inventé : le webform
                Podio du site FR (form 330872) posait exactement six questions,
                et celle-ci en faisait partie. Elle avait disparu de la maquette.
                ⚠️ Texte libre, pas un calendrier : les vraies réponses étaient
                « décembre 2026 », « Oct 2027 », « Septembre 2026 ». Imposer une
                date précise à quelqu'un qui n'en a pas ferait fuir ou mentir. */}
            <Champ
              label="Date prévisionnelle de votre projet"
              valeur={champs.echeance}
              onChange={maj("echeance")}
              aide="Un mois, une saison, un événement à tenir. Approximatif suffit."
            />
          </>
        )}

        {onglet === "recrutement" && (
          <>
            <Champ
              label="Le poste qui vous intéresse"
              requis
              valeur={champs.poste}
              onChange={maj("poste")}
              aide="Ou le métier, si aucune offre ne correspond."
            />

            {/* ⛔ CES DEUX BLOCS NE SONT PAS DU CONFORT : l'app Candidatures
                les exige. Sans eux, l'API Podio refuse l'item et la
                candidature n'existe nulle part. Ils valent d'ailleurs mieux
                que du texte libre — c'est sur ces colonnes que les RH filtrent. */}
            <fieldset>
              <legend className="text-[14px] font-bold">
                Vos domaines de compétences<span style={{ color: BLEU }}> *</span>
              </legend>
              <span className="mt-1 block text-[13px] opacity-50">
                Plusieurs choix possibles.
              </span>
              <Pastilles
                options={COMPETENCES}
                choisies={competences}
                basculer={v =>
                  setCompetences(c => (c.includes(v) ? c.filter(x => x !== v) : [...c, v]))
                }
              />
            </fieldset>

            <fieldset>
              <legend className="text-[14px] font-bold">
                Vous cherchez<span style={{ color: BLEU }}> *</span>
              </legend>
              <Pastilles
                options={CONTRATS}
                choisies={contrat ? [contrat] : []}
                basculer={v => setContrat(c => (c === v ? "" : v))}
              />
            </fieldset>

            <Champ
              label="Lien vers votre portfolio ou votre showreel"
              type="url"
              valeur={champs.lien}
              onChange={maj("lien")}
              aide="Plus parlant qu’un CV, dans nos métiers."
            />
            <Champ
              label="Votre message"
              type="textarea"
              requis
              valeur={champs.message}
              onChange={maj("message")}
              aide="Ce que vous cherchez, et ce sur quoi vous aimeriez travailler chez nous."
            />
          </>
        )}

        {onglet === "stage" && (
          <>
            {/* ⛔ DEUX DATES, PAS « PÉRIODE ET DURÉE » EN TEXTE LIBRE. Le champ
                « Vos dates de stage » de l'app est un champ DATE obligatoire :
                « de mars à juin » n'y rentre pas, et l'API refuse l'item.
                Bénéfice au passage : les stages deviennent triables par
                période, ce qui est exactement le geste des RH en janvier. */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Champ
                label="Début souhaité"
                type="date"
                requis
                valeur={champs.debut}
                onChange={maj("debut")}
              />
              <Champ
                label="Fin souhaitée"
                type="date"
                requis
                valeur={champs.fin}
                onChange={maj("fin")}
                aide="La durée imposée par votre école, si elle l’est."
              />
            </div>

            {/* ⛔ PAS DE BLOC « COMPÉTENCES » ICI, ET C'EST DÉLIBÉRÉ.
                Je l'avais ajouté ; le webform Podio des stages (form 818799)
                ne posait que sept questions et celle-là n'en faisait pas
                partie — contrairement au formulaire de candidature, où les
                compétences sont obligatoires. `[Giz, 11/08/2026 : on reste
                sur ce que montrait l'ancien site]`
                ⚠️ Le champ existe toujours côté Podio et reste remplissable
                à la main par les RH : on ne le demande simplement pas au
                stagiaire, qui à ce stade ne sait pas encore répondre. */}

            <Champ
              label="Lien vers vos travaux"
              type="url"
              valeur={champs.lien}
              onChange={maj("lien")}
            />
            <Champ
              label="Votre message"
              type="textarea"
              requis
              valeur={champs.message}
              onChange={maj("message")}
              aide="Ce que vous voulez apprendre. On lit tout, mais on retient ceux qui ont regardé nos réalisations."
            />
          </>
        )}

        {/* ── LE CONSENTEMENT ───────────────────────────────────────────
            ✅ La politique de confidentialité existe depuis le 11/08/2026.
            ⚠️ Elle porte encore des mentions `À COMPLÉTER` en surligné jaune
            (raison sociale, hébergeur, durées de conservation) : ce sont des
            faits que seul Giz connaît. Tant qu'il en reste une, la page ne
            doit pas être publiée — et le formulaire ne doit pas collecter.
            La case, elle, est posée dès maintenant : l'ajouter après coup
            obligerait à revalider tout le parcours. */}
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            required
            checked={consentement}
            onChange={e => setConsentement(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[#12607E]"
          />
          <span className="text-[14px] leading-relaxed">
            J’accepte que Bluevista utilise ces informations pour traiter ma
            demande, dans les conditions décrites par la{" "}
            <a
              href="/apercu/politique-de-confidentialite"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2"
            >
              politique de confidentialité
            </a>
            .<span style={{ color: BLEU }}> *</span>
          </span>
        </label>

        {erreur && (
          <p
            role="alert"
            className="rounded-md border-2 px-5 py-4 text-[15px] leading-relaxed"
            style={{ borderColor: "#B4402E", color: "#8C3324" }}
          >
            {erreur}
          </p>
        )}

        <button
          type="submit"
          disabled={etat === "envoi"}
          className="rounded-md px-9 py-4 text-[16px] font-bold text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          style={{ background: BLEU }}
        >
          {etat === "envoi" ? "Envoi en cours…" : "Envoyer"}
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
