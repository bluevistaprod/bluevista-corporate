"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturerAcquisition } from "@/lib/acquisition-navigateur";

/**
 * Monté une fois dans la mise en page : capte le `gclid` sur la page
 * d'atterrissage, avant que le visiteur navigue vers le formulaire.
 *
 * ⚠️ Il faut le rejouer à chaque changement d'URL. Next ne recharge pas la
 * page lors d'une navigation interne : un `useEffect` sans dépendance ne
 * s'exécuterait qu'une fois, et raterait un visiteur qui arrive par un lien
 * interne portant des paramètres UTM.
 *
 * Ne rend rien, ne mesure rien, n'appelle aucun tiers.
 */
function Capture() {
  const chemin = usePathname();
  const parametres = useSearchParams();

  useEffect(() => {
    capturerAcquisition();
  }, [chemin, parametres]);

  return null;
}

/**
 * ⚠️ `useSearchParams` impose une frontière `<Suspense>`, sinon toute la page
 * qui monte ce composant bascule en rendu dynamique — ce qui coûterait le
 * rendu statique, donc la vitesse, donc du référencement. La frontière isole
 * ce composant vide.
 */
export function CaptureAcquisition() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  );
}
