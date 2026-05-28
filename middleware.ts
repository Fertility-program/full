import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { setCsrfCookie } from "@/lib/csrf";

export async function middleware(request: NextRequest) {
  // 1. Run auth middleware (session refresh + route protection)
  const response = await updateSession(request);

  // 2. Set CSRF cookie on all responses
  setCsrfCookie(request, response);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, icon.svg, icon-*.png
     * - exercises/ (static exercise images)
     * - .well-known/ (security.txt etc)
     * - manifest.json, sw.js, robots.txt, sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|icon\\.svg|icon-.*\\.png|exercises/|.well-known/|manifest\\.json|sw\\.js|robots\\.txt|sitemap\\.xml|feed\\.xml).*)",
  ],
};
