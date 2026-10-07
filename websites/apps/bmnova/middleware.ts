import { NextResponse, type NextRequest } from "next/server";

/** Icons and OG images that Next links with the locale segment, e.g. /en/icon. */
const METADATA_IMAGE = /^\/(en|tr)(\/.*)?\/(icon|apple-icon|opengraph-image)(-\w+)?$/;

/**
 * English is served at the root and Turkish under /tr. Root paths are rewritten
 * to the internal /en segment; /en/... is redirected to the root so each page has one URL.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    return NextResponse.next();
  }

  if (METADATA_IMAGE.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
