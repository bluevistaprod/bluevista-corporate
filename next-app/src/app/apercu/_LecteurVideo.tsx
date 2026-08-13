"use client";

import { useState } from "react";
import { BLEU_CLAIR, SOMBRE } from "./_palette";

/**
 * LE LECTEUR VIDÉO — affiche d'abord, lecteur ensuite.
 *
 * ⛔⛔ POURQUOI ON NE POSE PAS L'IFRAME TOUT DE SUITE, et c'est la seule
 * raison d'être de ce composant. Un lecteur Vimeo intégré charge plusieurs
 * centaines de kilo-octets de JavaScript tiers AVANT que le visiteur ait
 * décidé de regarder quoi que ce soit. Sur la page vidéo mapping, qui en
 * porte SEPT, cela reviendrait à charger sept lecteurs pour une vidéo
 * regardée — et à effondrer les deux indicateurs que Google mesure
 * réellement : l'affichage du plus grand élément et la réactivité.
 *
 * 👉 Tant que personne ne clique, il n'y a qu'une image et un bouton. Au
 * clic, l'iframe remplace l'affiche et démarre. C'est le motif dit
 * « façade », et il ne coûte au visiteur qu'un clic qu'il faisait déjà.
 *
 * ⚠️ CE COMPOSANT NE CONNAÎT PAS LIVID. Il reconnaît Vimeo et YouTube ; pour
 * tout le reste il pose l'adresse telle quelle dans l'iframe. Le jour où les
 * vidéos passent sur Livid, VÉRIFIER QU'UNE VIDÉO PART VRAIMENT — une
 * adresse qui ne s'intègre pas ne produit aucune erreur, juste un cadre
 * blanc.
 */

/** L'adresse d'intégration, déduite de l'adresse publique. */
function adresseIntegration(url: string): string {
  /* ⭐ LIVID — la destination, depuis l'inventaire des 191 correspondances.
     `livid.com/watch/<slug>` est l'adresse qu'on lit ; `…/embed/<slug>` est
     celle qui s'intègre.
     ⛔⛔ ET IL Y A UN PIÈGE QU'AUCUN TEST TECHNIQUE NE VOIT : une vidéo dont
     l'intégration est DÉSACTIVÉE dans Livid répond quand même 200 sur cette
     adresse. Le refus est décidé par le lecteur, une fois chargé. Autrement
     dit, on ne peut PAS vérifier l'état de l'intégration par une requête —
     seule la colonne `livid_embed_actif` de l'inventaire fait foi, parce
     qu'elle vient de Livid lui-même. Relevé le 12/08/2026 : 159 des 191
     vidéos avaient l'intégration coupée. */
  const livid = url.match(/livid\.com\/(?:watch|embed)\/([\w-]+)/);
  if (livid) return `https://livid.com/embed/${livid[1]}?autoplay=1`;

  /* ⛔ LE JETON DES VIDÉOS NON LISTÉES. `vimeo.com/276258421/3dee65778a` :
     le second segment n'est pas décoratif, c'est lui qui autorise la
     lecture. Sans lui, le lecteur répond 401 et rend un cadre noir. */
  const vimeoJeton = url.match(/vimeo\.com\/(?:video\/)?(\d+)\/([0-9a-f]{8,12})/);
  if (vimeoJeton)
    return `https://player.vimeo.com/video/${vimeoJeton[1]}?h=${vimeoJeton[2]}&autoplay=1&title=0&byline=0&portrait=0`;

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0`;

  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;

  /* Déjà une adresse d'intégration (Livid ou autre) : on n'y touche pas. */
  return url;
}

export type VideoDePage = { url: string; titre: string; vignetteUrl?: string };

export function LecteurVideo({ video }: { video: VideoDePage }) {
  const [lance, setLance] = useState(false);

  return (
    <figure className="m-0">
      <div
        className="relative aspect-video overflow-hidden rounded-md"
        style={{ background: SOMBRE }}
      >
        {lance ? (
          <iframe
            src={adresseIntegration(video.url)}
            title={video.titre}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLance(true)}
            /* ⚠️ Le libellé accessible nomme la vidéo : « Lire la vidéo »
               répété sept fois sur une page ne dit rien à qui navigue au
               lecteur d'écran. */
            aria-label={`Lire la vidéo : ${video.titre}`}
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
            /* ⚠️ SANS AFFICHE, ON NE LAISSE PAS UN RECTANGLE NOIR. Deux vidéos
               n'ont pas de miniature — Vimeo la cachait, et l'inventaire Livid
               n'en fournit pas. Un aplat noir avec un bouton se lit comme une
               page cassée ; un dégradé de marque se lit comme un choix. Ça ne
               remplace pas l'affiche, ça évite d'avoir l'air en panne en
               attendant. */
            style={{
              background: video.vignetteUrl
                ? `center / cover no-repeat url('${video.vignetteUrl}')`
                : `linear-gradient(135deg, ${SOMBRE} 0%, #0d3a49 55%, ${SOMBRE} 100%)`,
            }}
          >
            <span
              className="absolute inset-0 transition duration-300 group-hover:opacity-60"
              style={{ background: "rgba(4,7,10,.35)", opacity: 1 }}
            />
            <span
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition duration-300 group-hover:scale-110"
              style={{ background: BLEU_CLAIR }}
            >
              {/* Un triangle en SVG plutôt qu'un caractère : le rendu d'un
                  « ▶ » dépend de la police installée chez le visiteur. */}
              <svg width="20" height="24" viewBox="0 0 20 24" aria-hidden="true">
                <path d="M0 0v24l20-12z" fill={SOMBRE} />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 text-[15px] font-bold leading-snug" style={{ color: SOMBRE }}>
        {video.titre}
      </figcaption>
    </figure>
  );
}

/**
 * LE BALISAGE `VideoObject`, posé à côté du lecteur.
 *
 * ⭐ C'est lui qui ouvre les résultats vidéo de Google — un canal entier,
 * totalement invisible sans balisage, et qui manque à un site d'agence
 * audiovisuelle plus qu'à n'importe qui d'autre.
 *
 * ⚠️ `uploadDate` est exigée par Google. On ne l'invente pas : quand elle est
 * inconnue, on omet la propriété plutôt que d'écrire une date fausse — un
 * balisage incomplet est ignoré, un balisage faux est une déclaration
 * mensongère.
 */
export function BaliseVideo({ videos, page }: { videos: VideoDePage[]; page: string }) {
  const blocs = videos
    .filter(v => v.vignetteUrl) // sans affiche, Google rejette le balisage entier
    .map(v => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.titre,
      description: `${v.titre} — production Bluevista, ${page}.`,
      thumbnailUrl: v.vignetteUrl,
      contentUrl: v.url,
      embedUrl: adresseIntegration(v.url).replace("autoplay=1", "autoplay=0"),
    }));

  if (!blocs.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blocs.length === 1 ? blocs[0] : blocs) }}
    />
  );
}
