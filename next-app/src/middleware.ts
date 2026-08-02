import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANGUAGE, PREFIXED_LANGUAGES } from "@/shared/urls";

/**
 * Fait tenir ensemble deux exigences contradictoires en apparence :
 *
 *   1. le français ne doit PAS porter de préfixe dans l'URL (`/portfolio`),
 *      sinon il faudrait rediriger tout l'existant sans rien gagner ;
 *   2. le code veut malgré tout une langue explicite pour chaque page.
 *
 * La réécriture résout les deux : `/portfolio` est servi par la route
 * `/fr/portfolio` sans que l'adresse affichée ne change. L'anglais et
 * l'espagnol, eux, portent leur préfixe pour de bon.
 *
 * ⛔ Réécriture (rewrite), jamais redirection : une redirection changerait
 * l'URL visible et créerait deux adresses pour une même page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const dejaPrefixe = PREFIXED_LANGUAGES.some(
    lang => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
  if (dejaPrefixe) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANGUAGE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // On laisse passer sans réécriture ce qui n'est pas une page :
  // ressources internes de Next, API, fichiers du dossier public.
  // `apercu` est exclu : ce sont les pages de travail sur la direction
  // artistique, volontairement hors du système de langues.
  /* ⛔ `admin` est exclu comme le reste : le studio n'est pas une page du
     site, il n'a donc pas de langue. Sans cette exclusion, /admin est
     réécrit en /fr/admin qui n'existe pas — 404 silencieux, et on cherche
     longtemps du côté de Sanity. */
  matcher: ["/((?!_next|api|admin|media|apercu|planche|favicon.ico|robots.txt|sitemap.xml).*)"],
};
