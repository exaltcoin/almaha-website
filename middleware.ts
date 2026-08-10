import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files (_next, brand, images, favicon, manifest, robots, sitemap)
     */
    "/((?!api|_next|brand|images|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml).*)"
  ]
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Detect preferred locale from Accept-Language, fall back to default.
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.toLowerCase().includes("ar")
    ? "ar"
    : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
