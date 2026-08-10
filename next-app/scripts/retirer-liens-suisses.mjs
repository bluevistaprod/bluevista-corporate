#!/usr/bin/env node
/**
 * RETIRE LES LIENS SORTANTS VERS bluevista.ch SUR L'ANCIEN SITE.
 *
 *   node scripts/retirer-liens-suisses.mjs           (simulation)
 *   node scripts/retirer-liens-suisses.mjs --ecrire
 *
 * ⛔⛔ POURQUOI, ET CE QUE LA RECHERCHE A RÉELLEMENT TROUVÉ.
 *
 * La demande était de retirer les liens internes vers la page Genève
 * française. Il n'y en a AUCUN : cette page est déjà orpheline, ce qui
 * explique une part de son classement (position 45 à 55).
 *
 * Ce que la recherche a trouvé à la place est plus grave : **quatre liens
 * sortants vers bluevista.ch**, dont TROIS sur la page d'accueil — la page qui
 * fait 894 clics par an, 40 % du trafic du site.
 *
 * 👉 C'est une violation en production de la règle posée par Giz le
 * 02/08/2026 : « AUCUN LIEN SORTANT VERS bluevista.ch. Un seul lien oublié
 * envoie un prospect français vers une entité qui ne peut pas le facturer. »
 * Le geste relève donc d'une décision déjà prise, pas d'une initiative.
 *
 * ⚠️ ON RETIRE LE LIEN, PAS LE MOT. « Lyon, Paris et Genève » reste lisible :
 * seul le `<a>` disparaît. Supprimer le mot changerait le discours de la page
 * d'accueil, ce qui n'a pas été demandé — et « citer les villes sans les
 * qualifier » est justement la règle de marque.
 *
 * ⛔ ET ON NE REDIRIGE PAS LE LIEN VERS LA PAGE GENÈVE FRANÇAISE : elle est
 * destinée à être retirée au profit du site suisse. La renforcer maintenant
 * travaillerait contre le plan.
 *
 * ⚠️ LE SITEMAP N'EST PAS TRAITÉ ICI, ET C'EST DÉLIBÉRÉ. Sous Yoast, sortir
 * une page du sitemap et la passer en `noindex` sont le même geste — or le
 * `noindex` ferait disparaître la page sans transmettre son autorité, juste
 * avant la 301 qui doit justement la transmettre. Le champ n'est de toute
 * façon pas exposé à l'API REST (vérifié : écriture ignorée). Voir le compte
 * rendu remis à Giz.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { wp } from "./_wp.mjs";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ECRIRE = process.argv.includes("--ecrire");

/** Le `<a>` disparaît, son contenu reste. */
const LIEN_SUISSE = /<a\b[^>]*href="https?:\/\/(?:www\.)?bluevista\.ch[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;

const PAGES = [25, 7188];

for (const id of PAGES) {
  const p = await wp(`/pages/${id}?context=edit&_fields=id,slug,meta`);
  const brut = p.meta._elementor_data;

  /* ⛔ Sauvegarde avant toute écriture : Elementor stocke la page entière dans
     un seul JSON, une erreur n'y casse pas un paragraphe mais la mise en page
     complète. Écrite une seule fois — c'est la référence d'origine. */
  const sauvegarde = path.join(RACINE, `scripts/_sauvegarde-elementor-${p.slug}.json`);
  if (ECRIRE && !fs.existsSync(sauvegarde)) fs.writeFileSync(sauvegarde, brut);

  const data = JSON.parse(brut);
  const retires = [];

  const parcours = els => {
    for (const el of els || []) {
      const s = el.settings;
      if (s) {
        for (const champ of ["editor", "title", "text", "description_text"]) {
          if (typeof s[champ] !== "string" || !s[champ].includes("bluevista.ch")) continue;
          s[champ] = s[champ].replace(LIEN_SUISSE, (_, texte) => {
            retires.push(`${el.id}/${champ} → « ${texte.replace(/<[^>]+>/g, "").trim()} »`);
            return texte;
          });
        }
      }
      parcours(el.elements);
    }
  };
  parcours(data);

  console.log(`\n■ page ${id} — ${p.slug} : ${retires.length} lien(s)`);
  retires.forEach(r => console.log(`   ${r}`));

  const reste = JSON.stringify(data).match(/bluevista\.ch/g)?.length ?? 0;
  if (reste) console.log(`   ⚠️ ${reste} mention(s) de bluevista.ch subsistent hors balise <a>`);

  if (ECRIRE && retires.length) {
    await wp(`/pages/${id}`, {
      method: "POST",
      body: JSON.stringify({ meta: { _elementor_data: JSON.stringify(data) } }),
    });
    console.log(`   ✓ écrit`);
  }
}

console.log(ECRIRE ? "\nTerminé.\n" : "\nSimulation — relancer avec --ecrire.\n");
