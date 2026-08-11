import { EnTete } from "../_EnTete";
import { PiedDePage } from "../_PiedDePage";
import { BLEU, BLEU_CLAIR, CLAIR, NOIR, SOMBRE, TYPO } from "../_palette";

/**
 * LA POLITIQUE DE CONFIDENTIALITÉ — le bloquant de mise en ligne du formulaire.
 *
 * ⛔⛔ CE QUI EST ÉCRIT ICI N'EST PAS UN MODÈLE RECOPIÉ. Chaque donnée listée a
 * été relevée dans le code qui l'envoie (`src/app/api/formulaire/route.ts`) et
 * dans les schémas des apps Podio de destination. Une politique qui décrit
 * autre chose que ce que le site fait réellement est pire que pas de politique :
 * elle documente un manquement.
 *
 * ✅ COMPLÉTÉ LE 11/08/2026 — et voici d'où vient chaque fait, pour qu'on
 * puisse le contredire plutôt que de le croire :
 *   · Bluevista Production, RCS Lyon 451 786 388, siège de Champagne-au-Mont-
 *     d'Or, directeur de la publication : mentions légales EN LIGNE de
 *     bluevistaprod.com. Le SIRET (…00020) et la forme SAS viennent du dossier
 *     comptable i-Suite du cabinet Carré Conseil.
 *   · Bluevista Sàrl, IDE CH-660.2.573.017-8, Genève : mentions légales de
 *     bluevista.ch.
 *   · Infomaniak comme hébergeur : mentions légales des deux sites, ET la
 *     procédure de déploiement du cerveau, qui met tous nos sites Node.js chez
 *     eux — bluevista-corporate y est nommément prévu.
 *   · Progress Software / clauses contractuelles types : politique de
 *     confidentialité de Progress, qui cite explicitement les SCC depuis
 *     l'invalidation du Privacy Shield (Schrems II).
 *   · 3 ans et 2 ans : les durées recommandées par la CNIL.
 *
 * ✅ LA SECTION COOKIES EST ÉCRITE (12/08), le jour où le bandeau a été posé —
 * pas avant, et c'est la règle : une page légale rédigée « pour plus tard »
 * devient fausse le jour où la fonction arrive. Chaque phrase y décrit quelque
 * chose qui existe réellement à l'écran.
 * ⚠️ CE QUI RESTE `À COMPLÉTER` NE PEUT PAS L'ÊTRE PAR MOI : la date réelle de
 * mise en ligne. Le composant `AComplerter` les rend impossibles à
 * rater : un surligné jaune en pleine page ne passe pas une relecture.
 *
 * ⚠️ Le pays d'hébergement des données PODIO n'est pas affirmé ici, seulement
 * le siège de l'éditeur et le mécanisme de transfert. Je n'ai pas trouvé de
 * source publique le précisant, et inventer une localisation serait pire que
 * de la taire.
 *
 * ⚠️ Je rédige, je ne certifie pas. Ce texte couvre les mentions exigées par
 * l'article 13 du RGPD, mais une relecture juridique reste la bonne pratique
 * pour un site commercial.
 */

/** Un trou à combler, impossible à publier par inadvertance. */
function AComplerter({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="rounded px-2 py-0.5 font-bold"
      style={{ background: "#FFE08A", color: "#6B4A00" }}
    >
      [À COMPLÉTER — {children}]
    </mark>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-[1.4rem] font-bold leading-snug">{titre}</h2>
      <div className={`mt-4 space-y-4 ${TYPO.corps}`}>{children}</div>
    </section>
  );
}

export const metadata = {
  title: "Politique de confidentialité — Bluevista",
  robots: { index: false, follow: false },
};

export default function PagePolitique() {
  return (
    <main style={{ background: CLAIR, color: SOMBRE }}>
      <EnTete opaque />

      <section style={{ background: NOIR, color: "#fff" }}>
        <div className="mx-auto max-w-[900px] px-8 pb-16 pt-44">
          <div className={`mb-6 flex items-center gap-4 ${TYPO.surTitre}`} style={{ color: BLEU_CLAIR }}>
            <span className="inline-block h-[3px] w-12 rounded-full" style={{ background: BLEU_CLAIR }} />
            Vos données
          </div>
          <h1 className="max-w-[22ch] text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.02em]">
            Ce qu’on collecte, pourquoi, et combien de temps
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-white/80">
            Vous nous écrivez pour un projet, un poste ou un stage. Cette page
            dit exactement ce que ce formulaire enregistre, qui le lit, et
            comment vous reprenez la main.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] px-8 py-16">
        <p className="text-[14px] opacity-50">
          Dernière mise à jour&nbsp;: <AComplerter>date réelle de mise en ligne</AComplerter>
        </p>

        <Section titre="Qui traite vos données">
          <p>
            Le responsable du traitement est <strong>Bluevista Production</strong>,
            société par actions simplifiée immatriculée au registre du commerce et
            des sociétés de Lyon sous le numéro <strong>451&nbsp;786&nbsp;388</strong>{" "}
            (SIRET 451&nbsp;786&nbsp;388&nbsp;00020), dont le siège est situé{" "}
            <strong>8&nbsp;rue Jean&nbsp;Elysée&nbsp;Dupuy, 69410 Champagne-au-Mont-d’Or</strong>.
            Directeur de la publication&nbsp;: Guillaume&nbsp;Martin.
          </p>
          <p>
            Les demandes envoyées depuis <strong>bluevista.ch</strong> sont
            traitées par <strong>Bluevista Sàrl</strong> (IDE
            CH-660.2.573.017-8), Boulevard&nbsp;Georges-Favon&nbsp;43, 1204&nbsp;Genève —
            entité distincte&nbsp;: c’est elle qui vous répond et qui facture.
          </p>
          <p>
            Pour toute question sur vos données&nbsp;:{" "}
            <a href="mailto:contact@bluevistaprod.com" className="underline underline-offset-2">
              contact@bluevistaprod.com
            </a>
            .
          </p>
        </Section>

        <Section titre="Ce que le formulaire enregistre">
          <p>
            Rien d’autre que ce que vous tapez, plus deux informations
            techniques décrites plus bas. Le détail, formulaire par formulaire.
          </p>

          <h3 className="pt-2 text-[1.05rem] font-bold">Formulaire « un projet »</h3>
          <p>
            Nom et prénom, entreprise, adresse e-mail, téléphone (facultatif),
            le domaine dont relève votre projet, le budget envisagé
            (facultatif), la description de votre projet et la date
            prévisionnelle (facultative).
          </p>

          <h3 className="pt-2 text-[1.05rem] font-bold">Formulaire « une candidature »</h3>
          <p>
            Nom et prénom, formation ou dernier poste, adresse e-mail,
            téléphone (facultatif), le poste qui vous intéresse, vos domaines
            de compétences, le type de contrat recherché, le lien vers votre
            portfolio (facultatif) et votre message.
          </p>

          <h3 className="pt-2 text-[1.05rem] font-bold">Formulaire « un stage ou une alternance »</h3>
          <p>
            Nom et prénom, école et niveau d’études, adresse e-mail, téléphone
            (facultatif), les dates de stage souhaitées, le lien vers vos
            travaux (facultatif) et votre message.
          </p>

          <h3 className="pt-2 text-[1.05rem] font-bold">Ce qui s’ajoute automatiquement</h3>
          <p>
            La <strong>page depuis laquelle vous êtes arrivé</strong> sur le
            site, et — si vous avez cliqué sur une de nos annonces — l’
            <strong>identifiant de clic publicitaire</strong> que Google ajoute
            à l’adresse, ainsi que les paramètres de campagne présents dans
            cette adresse. Cela nous sert à savoir quelles annonces amènent de
            vraies demandes. Ces informations sont conservées le temps de votre
            visite, dans votre navigateur, et ne sont transmises qu’au moment
            où vous cliquez sur « Envoyer ».
          </p>
          <p>
            Votre <strong>adresse IP</strong> est utilisée pour limiter les
            envois automatisés. Elle n’est associée à aucune demande&nbsp;:
            elle sert uniquement à compter les envois récents, et elle est
            effacée au bout de 24&nbsp;heures.
          </p>
          <p className="rounded-md border-l-4 py-2 pl-5" style={{ borderColor: BLEU }}>
            Nous ne demandons jamais de données sensibles — origine, santé,
            opinions, appartenance syndicale. Merci de ne pas en écrire dans le
            champ libre&nbsp;: nous n’en avons pas besoin pour vous répondre.
          </p>
        </Section>

        <Section titre="Pourquoi, et à quel titre">
          <p>
            <strong>Répondre à votre demande de projet ou de devis.</strong> La
            base légale est votre demande elle-même&nbsp;: nous ne pouvons pas
            y répondre sans ces informations.
          </p>
          <p>
            <strong>Étudier votre candidature ou votre demande de stage.</strong>{" "}
            Même logique&nbsp;: sans ces informations, il n’y a pas de dossier
            à examiner.
          </p>
          <p>
            <strong>Mesurer l’efficacité de nos annonces</strong> et protéger le
            formulaire des envois automatisés. Nous nous appuyons ici sur notre
            intérêt légitime à savoir d’où viennent nos demandes et à garder un
            formulaire utilisable.
          </p>
          <p>
            ⛔ Vos données ne sont <strong>ni vendues, ni louées, ni échangées</strong>,
            et ne servent à aucune prospection commerciale non sollicitée.
          </p>
        </Section>

        <Section titre="Qui y a accès">
          <p>
            En interne&nbsp;: l’équipe commerciale pour les demandes de projet,
            l’équipe ressources humaines pour les candidatures et les stages.
            Personne d’autre.
          </p>
          <p>
            En externe, deux prestataires techniques, qui agissent sur nos
            instructions et n’ont pas le droit d’utiliser vos données pour leur
            propre compte&nbsp;:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Infomaniak Network SA</strong>, notre hébergeur —
              Rue&nbsp;Eugène-Marziano&nbsp;25, 1227&nbsp;Les&nbsp;Acacias,
              Genève, <strong>Suisse</strong>. La Suisse bénéficie d’une
              décision d’adéquation de la Commission européenne&nbsp;: y héberger
              des données offre le même niveau de protection que dans l’Union.
            </li>
            <li>
              <strong>Podio</strong>, l’outil de suivi où votre demande est
              enregistrée, édité par <strong>Progress Software Corporation</strong>,
              société établie aux <strong>États-Unis</strong>. Les transferts
              hors Union européenne sont encadrés par les{" "}
              <strong>clauses contractuelles types</strong> approuvées par la
              Commission européenne.
            </li>
          </ul>
        </Section>

        <Section titre="Combien de temps">
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Demandes de projet sans suite</strong>&nbsp;:{" "}
              <strong>3&nbsp;ans</strong> à compter du dernier contact avec vous.
            </li>
            <li>
              <strong>Demandes devenues des projets</strong>&nbsp;: conservées
              le temps de la relation commerciale, puis pendant les durées
              légales de conservation comptable.
            </li>
            <li>
              <strong>Candidatures et demandes de stage non retenues</strong>&nbsp;:{" "}
              <strong>2&nbsp;ans</strong> à compter du dernier contact. Passé ce
              délai, écrivez-nous simplement à nouveau.
            </li>
            <li>
              <strong>Adresse IP</strong> (anti-spam)&nbsp;: 24&nbsp;heures.
            </li>
          </ul>
        </Section>

        <Section titre="Ce que vous pouvez exiger">
          <p>
            Vous pouvez à tout moment demander à <strong>consulter</strong> les
            données que nous avons sur vous, à les faire{" "}
            <strong>corriger</strong>, à les faire <strong>effacer</strong>, à
            en <strong>limiter</strong> l’usage, à les <strong>récupérer</strong>{" "}
            dans un format lisible, ou à <strong>vous opposer</strong> à leur
            traitement.
          </p>
          <p>
            Une seule adresse pour tout ça&nbsp;:{" "}
            <a href="mailto:contact@bluevistaprod.com" className="underline underline-offset-2">
              contact@bluevistaprod.com
            </a>
            . Nous répondons sous un mois. Une pièce d’identité peut vous être
            demandée si nous avons un doute sérieux sur qui écrit.
          </p>
          <p>
            Si notre réponse ne vous satisfait pas, vous pouvez saisir la{" "}
            <strong>CNIL</strong> (Commission nationale de l’informatique et
            des libertés),{" "}
            <a
              href="https://www.cnil.fr"
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              cnil.fr
            </a>
            . Pour une demande envoyée depuis le site suisse, l’autorité
            compétente est le <strong>PFPDT</strong>.
          </p>
        </Section>

        <Section titre="Cookies et mesure d’audience">
          {/* ⛔⛔ ÉCRITE LE 12/08, EN MÊME TEMPS QUE LE BANDEAU — jamais avant.
              La règle vient d'une faute évitée de justesse sur pulsecongress :
              une page légale rédigée « pour plus tard » devient FAUSSE le jour
              où la fonction arrive. Le texte y annonçait un retrait « depuis ce
              même bandeau », alors que le bandeau disparaît au premier choix.
              👉 Chaque phrase ci-dessous décrit quelque chose qui existe
              réellement à l'écran. Si le bandeau change, ce texte change dans
              le même geste. */}
          <p>
            Un cookie est un petit fichier déposé sur votre appareil. Nous en
            distinguons deux sortes, et elles n’ont pas le même statut.
          </p>
          <p>
            <strong>Ceux qui font fonctionner le site</strong> — mémoriser votre
            choix en matière de cookies, garder votre saisie si vous changez
            d’onglet dans le formulaire, protéger l’envoi contre les robots. Ils
            sont nécessaires au service que vous demandez, ils ne servent à rien
            d’autre, et la réglementation ne soumet pas leur dépôt à votre
            accord.
          </p>
          <p>
            <strong>Ceux qui mesurent l’audience</strong> — savoir quelles pages
            sont consultées, combien de temps, et par quel chemin vous êtes
            arrivé. Ceux-là ne se déclenchent qu’après votre accord explicite.
            Tant que vous n’avez pas répondu au bandeau, ou si vous refusez,
            aucune mesure n’est activée&nbsp;: nous déclarons le refus par défaut
            avant même que la page finisse de se charger.
          </p>
          <p>
            <strong>Revenir sur votre choix, à tout moment.</strong> Le lien
            «&nbsp;Cookies&nbsp;» en bas de chaque page rouvre le bandeau. Si
            vous passez de l’acceptation au refus, la page se recharge
            immédiatement pour que la mesure cesse tout de suite, et non à votre
            prochaine visite.
          </p>
          <p>
            Votre choix est conservé sur votre appareil, dans votre navigateur.
            Il n’est pas transmis&nbsp;: nous ne savons pas qui a accepté ni qui
            a refusé. Effacer les données de votre navigateur le supprime, et le
            bandeau réapparaîtra.
          </p>
          <p>
            <strong>Ce que nous n’utilisons pas.</strong> La carte de la page
            contact est un dessin, pas une carte Google&nbsp;: elle ne dépose
            aucun cookie et n’envoie rien à un tiers. Nous n’employons ni pixel
            publicitaire de réseau social, ni outil de suivi entre sites.
          </p>
        </Section>
      </div>

      <PiedDePage />
    </main>
  );
}
