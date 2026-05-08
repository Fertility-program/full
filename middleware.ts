import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // If Supabase env vars are not configured, skip auth checks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    // Refresh session - important for Server Components
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protected routes that require authentication
    const protectedRoutes = [
      "/account",
      "/checkin",
      "/dashboard",
      "/session",
      "/progress",
      "/journal",
      "/favorites",
      "/shopping",
      "/weekly-summary",
      "/rest-day",
    ];
    const isProtected = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    // Admin route — requires auth (admin check happens in the page itself)
    const isAdmin = request.nextUrl.pathname.startsWith("/admin");

    if ((isProtected || isAdmin) && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Redirect logged-in users away from login page
    if (request.nextUrl.pathname === "/login" && user) {
      const redirect = request.nextUrl.searchParams.get("redirect") || "/dashboard";
      const url = request.nextUrl.clone();
      url.pathname = redirect;
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }
  } catch {
    // If auth check fails, allow request to proceed
    return NextResponse.next();
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|exercises/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
