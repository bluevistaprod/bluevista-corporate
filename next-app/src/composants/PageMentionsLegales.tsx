import { EnTete } from "./EnTete";
import { PiedDePage } from "./PiedDePage";
import { BLEU, CLAIR, NOIR, SOMBRE, TYPO } from "./palette";
import { liens } from "../shared/liens";
import { origine } from "../shared/seo";

/**
 * LES MENTIONS LÉGALES.
 *
 * ⭐ LE TEXTE JURIDIQUE EST REPRIS DE L'ANCIEN SITE, MOT POUR MOT. Décision de
 * Giz, 20/08/2026 : « reprends le texte juridique tel quel ». C'est le bon
 * réflexe — un texte juridique n'a pas à avoir de style, et le réécrire dans
 * le ton du nouveau site ferait courir le risque d'en changer le sens sans
 * qu'un relecteur non-juriste s'en aperçoive.
 *
 * ⭐ LES DONNÉES D'IDENTITÉ, ELLES, SONT COMPLÉTÉES. L'ancienne page donnait
 * l'éditeur, le siège, le RCS et le directeur de publication — mais pas la
 * FORME JURIDIQUE, pas le CAPITAL, pas la TVA, tous trois exigés par
 * l'article R.123-237 du code de commerce. Ils viennent du registre public des
 * entreprises et de la comptabilité, et Giz les a confirmés un par un.
 *
 * ⛔ CE QUE JE N'AI PAS REPRIS, ET C'EST VOLONTAIRE : l'ancienne page se
 * termine par un bloc « Find out how we can help your business / Complimentary
 * Consultation / Lorem ipsum dolor sit amet… ». Du texte de gabarit, en
 * anglais, en ligne aujourd'hui au bas des mentions légales. Il ne suit pas.
 *
 * ⚠️ L'HÉBERGEUR EST UNE MENTION OBLIGATOIRE (article 6 de la LCEN) et il doit
 * désigner l'hébergeur RÉEL du site. Infomaniak est confirmé par Giz pour le
 * nouveau site comme pour l'ancien. Le jour où l'hébergement change, cette
 * page change le même jour.
 */

/**
 * L'ADRESSE ÉLECTRONIQUE, LISIBLE PAR UN HUMAIN ET PÉNIBLE POUR UN ROBOT.
 *
 * ⛔ PAS DE `mailto:` — demande explicite de Giz : « non cliquable si tu peux,
 * robot pas friendly ». Un `mailto:` en clair est exactement ce que les
 * aspirateurs d'adresses cherchent.
 *
 * ⭐ LE LEURRE EST EN `display:none`, ET C'EST CE DÉTAIL QUI FAIT TOUT :
 *   · un robot qui lit le HTML brut récupère « contact-SUPPRIMER-CE-MOT@… » ;
 *   · un humain ne voit rien du leurre ;
 *   · et une COPIE-COLLER ne l'emporte pas — le texte en `display:none` est
 *     exclu de la sélection par le navigateur. L'adresse copiée est juste.
 * ⚠️ C'est pour ça que le leurre n'est pas simplement mis en petit ou en
 * blanc : ces deux ruses-là polluent le copier-coller et l'accessibilité.
 */
function AdresseCourriel() {
  return (
    <span style={{ fontWeight: 600, color: BLEU }}>
      contact
      <span style={{ display: "none" }} aria-hidden>
        -SUPPRIMER-CE-MOT-
      </span>
      @bluevistaprod<span style={{ display: "none" }} aria-hidden>.invalid</span>.com
    </span>
  );
}

/** Une ligne du tableau d'identité. */
function Ligne({ nom, children }: { nom: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(150px, 210px) 1fr",
        gap: 20,
        padding: "14px 0",
        borderTop: "1px solid #0722221f",
      }}
    >
      <div style={{ opacity: 0.6 }}>{nom}</div>
      <div>{children}</div>
    </div>
  );
}

function Titre({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={TYPO.titre} style={{ marginTop: 56, marginBottom: 18, maxWidth: "24ch" }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ maxWidth: "72ch", fontSize: "1.0625rem", lineHeight: 1.75, opacity: 0.82, marginTop: 16 }}>
      {children}
    </p>
  );
}

export function CorpsMentionsLegales({ publique }: { publique?: boolean }) {
  const L = liens(publique);

  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque publique={publique} />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-8 pb-16 pt-44">
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            Mentions légales
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1500px] px-8 py-20">
        <div style={{ maxWidth: 880 }}>
          <Titre>Éditeur du site</Titre>
          <div style={{ fontSize: "1.0625rem", lineHeight: 1.6, marginTop: 8 }}>
            <Ligne nom="Dénomination sociale">Blue Vista Production</Ligne>
            <Ligne nom="Nom commercial">Bluevista</Ligne>
            <Ligne nom="Forme juridique">Société par actions simplifiée (SAS)</Ligne>
            <Ligne nom="Capital social">20 000 €</Ligne>
            <Ligne nom="Siège social">
              8 rue Jean-Élysée Dupuy
              <br />
              69410 Champagne-au-Mont-d’Or, France
            </Ligne>
            <Ligne nom="RCS">451 786 388 Lyon</Ligne>
            <Ligne nom="SIRET (siège)">451 786 388 00020</Ligne>
            <Ligne nom="TVA intracommunautaire">FR 01 451 786 388</Ligne>
            <Ligne nom="Code APE / NAF">
              59.11A — production de films et de programmes pour la télévision
            </Ligne>
            <Ligne nom="Directeur de la publication">Guillaume Martin</Ligne>
            <Ligne nom="Téléphone">
              +33 (0)4 72 34 51 89 — Lyon
              <br />
              +33 (0)1 83 64 58 96 — Paris
              <br />
              +41 (0)22 519 28 48 — Genève
            </Ligne>
            <Ligne nom="Courriel">
              <AdresseCourriel />
            </Ligne>
          </div>

          <Titre>Hébergeur</Titre>
          <div style={{ fontSize: "1.0625rem", lineHeight: 1.6, marginTop: 8 }}>
            <Ligne nom="Raison sociale">Infomaniak Network SA</Ligne>
            <Ligne nom="Adresse">
              Rue Eugène-Marziano 25
              <br />
              1227 Les Acacias, Genève, Suisse
            </Ligne>
            <Ligne nom="Téléphone">+41 (0)22 820 35 44</Ligne>
          </div>

          {/* ── À PARTIR D'ICI, LE TEXTE EST CELUI DE L'ANCIEN SITE ─────────
              Repris mot pour mot, à une exception près : « ce Site » désignait
              l'adresse bluevistaprod.com, remplacée par l'adresse du nouveau
              site.
              ⛔⛔ ET LE DOMAINE N'EST PAS ÉCRIT EN DUR. J'avais commencé par y
              mettre « bluevista.fr », que PERSONNE n'avait décidé — une
              invention dans un texte juridique, c'est-à-dire le pire endroit.
              Il est maintenant lu depuis `NEXT_PUBLIC_SITE_ORIGIN`, la même
              source que les adresses canoniques : les deux ne peuvent plus se
              contredire. */}
          <Titre>Conditions générales d’utilisation</Titre>
          <P>
            Le présent document constitue les conditions générales d’utilisation
            du site accessible sous l’adresse «&nbsp;{origine().replace(/^https?:\/\//, "")}&nbsp;»
            (ci-après dénommé le «&nbsp;Site&nbsp;»). En accédant ou en utilisant ce
            Site, vous êtes réputé accepter ces conditions générales et nous nous
            réservons le droit de refuser l’accès à tout ou partie du Site à tout
            utilisateur qui ne les respecterait pas. Vous vous engagez par ailleurs
            à ne pas adresser ou transmettre des textes ou images contraires à la
            loi, ou susceptibles de choquer la sensibilité, notamment par un
            contenu haineux, pornographique, ou incitatif à des comportements du
            même ordre. Bluevista se réserve le droit de prendre toute mesure, ou
            d’engager toute action qu’elle estime nécessaire au cas où son Site
            serait utilisé pour diffuser des éléments de cette nature. Nous vous
            informons que le Site est soumis au droit français, aux juridictions
            françaises et qu’il a pour langue officielle le français.
          </P>

          <Titre>Propriété intellectuelle</Titre>
          <P>
            Le Site et chacun des éléments qui le composent (les marques,
            graphismes, photographies…) relèvent de la législation française et
            internationale notamment celle relative au droit d’auteur, aux bases
            de données et à la propriété intellectuelle, en particulier, la marque
            Bluevista et son logo. Toutes les autres marques citées sont la
            propriété de leurs titulaires respectifs. Toute reproduction,
            représentation, publication, transmission, ou plus généralement toute
            exploitation non autorisée du Site et/ou de ses éléments engage votre
            responsabilité et est susceptible d’entraîner des poursuites
            judiciaires, notamment pour contrefaçon.
          </P>

          <Titre>Responsabilité</Titre>
          <P>
            Le Site peut contenir des liens vers d’autres sites que nous
            n’exploitons pas. Nous ne pouvons en aucune manière être tenus
            responsables de la mise à disposition de ces liens permettant l’accès
            à ces sites et sources externes, et ne pouvons supporter aucune
            responsabilité quant au contenu, publicités, produits, services ou
            tout autre matériel disponible sur ou à partir de ces sites ou sources
            externes qui ne sont ni vérifiées ni approuvées par nos équipes.
          </P>
          <P>
            Nous nous engageons à assurer nos meilleurs efforts pour offrir des
            informations actualisées et exactes. Cependant, nous ne saurions être
            tenus pour responsables d’erreurs, d’omissions ou des résultats qui
            pourraient être obtenus par un mauvais usage de ces informations. Nous
            nous réservons le droit de les corriger, dès que ces erreurs sont
            portées à notre connaissance et, plus généralement, de modifier, à
            tout moment, sans préavis, tout ou partie du Site ainsi que ses
            conditions d’utilisation, sans que notre responsabilité puisse être
            engagée de ce fait.
          </P>
          <P>
            Le téléchargement de tous matériels lors de l’utilisation du service
            sera à vos risques et périls. Vous serez seul responsable pour tout
            dommage subi par votre ordinateur ou toutes pertes de données
            consécutives à ce téléchargement. Plus généralement, Bluevista ne
            pourra en aucun cas être responsable en cas de dommages directs et/ou
            indirects résultant de l’utilisation de ce Site.
          </P>

          <Titre>Disponibilité du site</Titre>
          <P>
            Il est techniquement impossible de fournir le Site exempt de tout
            défaut et ces défauts peuvent conduire à l’indisponibilité temporaire
            du Site ; le fonctionnement du Site peut être affecté par des
            événements et/ou des éléments que nous ne contrôlons pas, tels que par
            exemple, des moyens de transmission et de communication entre vous et
            nous et entre nous et d’autres réseaux ; nous et/ou nos fournisseurs
            pourrons, à tout moment, modifier ou interrompre temporairement ou de
            façon permanente tout ou partie du Site pour effectuer des opérations
            de maintenance et/ou effectuer des améliorations et/ou des
            modifications sur le Site. Nous vous informerons, si possible, de
            chaque modification/interruption des services disponibles sur le Site.
            Nous ne sommes pas responsables de toute modification, suspension ou
            interruption du Site.
          </P>

          {/* ⭐ L'ancienne page ne disait RIEN des données personnelles. Plutôt
              que de dupliquer ici ce que la politique de confidentialité
              détaille déjà, on y renvoie : deux textes sur le même sujet
              finissent toujours par se contredire. */}
          <Titre>Données personnelles et cookies</Titre>
          <P>
            Le traitement de vos données personnelles, les finalités poursuivies,
            les durées de conservation et les moyens d’exercer vos droits sont
            détaillés dans notre{" "}
            <a href={L.confidentialite} style={{ color: BLEU, fontWeight: 600 }}>
              politique de confidentialité
            </a>
            .
          </P>
        </div>
      </div>

      <PiedDePage publique={publique} />
    </main>
  );
}
