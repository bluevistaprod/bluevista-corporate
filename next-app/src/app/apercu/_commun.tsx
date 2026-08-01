/**
 * Éléments partagés par les trois aperçus.
 * Le bleu #006078 est celui du logo Bluevista, relevé sur le fichier source —
 * et non le bleu par défaut de Tailwind qu'utilisait la maquette Manus.
 */

export const BLEU = "#006078";

export const REFERENCES = [
  { nom: "Clasquin", image: "/media/ref-clasquin.jpg", legende: "Aftermovie · Palais de la Bourse, Lyon" },
  { nom: "Berliet", image: "/media/ref-berliet.jpg", legende: "FOOH · film social 3D" },
  { nom: "Irisolaris", image: "/media/ref-irisolaris.jpg", legende: "Film corporate · portraits de terrain" },
  { nom: "SSP", image: "/media/ref-ssp.jpg", legende: "Présentation globale · 4K" },
];

export function BarreAperçu({ actif }: { actif: 1 | 2 | 3 }) {
  const versions = [
    { n: 1, nom: "Éditoriale" },
    { n: 2, nom: "Immersive" },
    { n: 3, nom: "Résultats" },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/85 px-2 py-2 text-sm text-white shadow-2xl backdrop-blur">
      {versions.map(v => (
        <a
          key={v.n}
          href={`/apercu/v${v.n}`}
          className={`mx-1 rounded-full px-4 py-2 transition ${
            v.n === actif ? "bg-white text-black font-semibold" : "hover:bg-white/15"
          }`}
        >
          V{v.n} · {v.nom}
        </a>
      ))}
    </div>
  );
}
