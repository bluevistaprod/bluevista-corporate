/**
 * L'ALERTE PAR MAIL — le dernier filet, et le seul qu'un humain voit.
 *
 * ⛔⛔ POURQUOI CE FICHIER EXISTE ALORS QUE LE JOURNAL EXISTE DÉJÀ : un fichier
 * posé sur un serveur ne prévient personne. Si Podio tombe un mardi matin et
 * qu'une demande à 40 000 € arrive à 9 h 12, elle attendra dans `a-rejouer/`
 * que quelqu'un pense à regarder — c'est-à-dire, en pratique, jamais.
 * **Le mail transporte la demande ENTIÈRE**, pas une notification : même si le
 * rejeu ne tourne jamais, le commercial a le lead dans sa boîte et peut
 * répondre dans l'heure. C'est ça, « ne JAMAIS rien louper ».
 *
 * 📧 Règle Bluevista `[Giz, 26/07/2026]` : les mails d'un site partent TOUJOURS
 * de `contact@bluevistaprod.com`, jamais d'une adresse personnelle.
 *
 * ⚠️ Si le SMTP n'est pas configuré, on ne fait PAS échouer l'envoi du
 * formulaire : la demande est déjà sur le disque. On journalise l'absence
 * d'alerte, ce qui est une information en soi.
 */

import nodemailer from "nodemailer";

if (typeof window !== "undefined") {
  throw new Error("src/lib/alerte.ts est un module serveur : il porte des identifiants SMTP.");
}

function config() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    ALERTE_FORMULAIRE_A,
    ALERTE_FORMULAIRE_DE,
  } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return {
    hote: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    utilisateur: SMTP_USER,
    motDePasse: SMTP_PASS,
    destinataire: ALERTE_FORMULAIRE_A || "contact@bluevistaprod.com",
    expediteur: ALERTE_FORMULAIRE_DE || "contact@bluevistaprod.com",
  };
}

function echapper(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Envoie la demande complète par mail parce que Podio n'en a pas voulu.
 * Renvoie `true` si le mail est parti, `false` sinon — l'appelant journalise.
 */
export async function alerterEchecPodio(
  reference: string,
  demande: Record<string, unknown>,
  erreur: string,
): Promise<boolean> {
  const c = config();
  if (!c) {
    console.error(
      `[alerte] SMTP non configuré : la demande ${reference} est sur le disque mais ` +
        `PERSONNE n'a été prévenu. Renseigner SMTP_HOST / SMTP_USER / SMTP_PASS.`,
    );
    return false;
  }

  // Les champs qui comptent pour rappeler la personne, en tête et en gros.
  const essentiels: [string, unknown][] = [
    ["Formulaire", demande.type],
    ["Marché", demande.marche],
    ["Nom", demande.nom],
    ["Entreprise / école / parcours", demande.entreprise],
    ["E-mail", demande.email],
    ["Téléphone", demande.telephone],
  ];

  const html = `
    <p style="font-size:15px"><strong>Une demande du site n'a pas pu entrer dans Podio.</strong><br>
    Elle est intacte ci-dessous, et conservée sur le serveur sous la référence
    <code>${echapper(reference)}</code>. <strong>Répondez directement à cette personne&nbsp;;</strong>
    la demande sera réinjectée dans Podio au prochain rejeu.</p>
    <table style="border-collapse:collapse;font-size:14px">
      ${essentiels
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;opacity:.6">${echapper(k)}</td><td style="padding:4px 0"><strong>${echapper(v)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-size:14px;white-space:pre-wrap;border-left:3px solid #12607E;padding-left:12px">${echapper(demande.message)}</p>
    <p style="font-size:12px;opacity:.6">Motif technique&nbsp;: ${echapper(erreur)}</p>`;

  /**
   * ⛔ LA VERSION TEXTE N'EST PAS UNE FORMALITÉ. Sans elle, le client de
   * messagerie fabrique lui-même un repli à partir du HTML et colle les
   * cellules du tableau bout à bout : « FormulaireventesMarchéfrNomTEST… ».
   * Vérifié en lisant le vrai mail reçu le 11/08/2026 — pas le code qui
   * l'envoie. Un mail d'alerte qu'on doit déchiffrer a perdu sa raison d'être.
   */
  const texte = [
    "Une demande du site n'a pas pu entrer dans Podio.",
    `Elle est conservée sur le serveur sous la référence ${reference}.`,
    "Répondez directement à cette personne ; la demande sera réinjectée au prochain rejeu.",
    "",
    ...essentiels.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`),
    "",
    "--- Son message ---",
    String(demande.message ?? ""),
    "",
    `Motif technique : ${erreur}`,
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host: c.hote,
      port: c.port,
      secure: c.port === 465,
      auth: { user: c.utilisateur, pass: c.motDePasse },
    });
    await transport.sendMail({
      from: c.expediteur,
      to: c.destinataire,
      // ⭐ `replyTo` sur l'adresse du prospect : répondre au mail d'alerte
      // répond au prospect. Un clic de moins, un lead de plus.
      replyTo: typeof demande.email === "string" ? demande.email : undefined,
      subject: `⚠️ Demande du site NON enregistrée dans Podio — ${String(demande.nom ?? "sans nom")}`,
      text: texte,
      html,
    });
    return true;
  } catch (e) {
    console.error(`[alerte] envoi du mail d'alerte impossible pour ${reference} :`, e);
    return false;
  }
}
