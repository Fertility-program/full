import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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
    "/admin",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check for Supabase auth cookie presence (sb-*-auth-token)
  const hasAuthCookie = request.cookies.getAll().some(
    (cookie) => cookie.name.includes("-auth-token")
  );

  if (isProtected && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/login" && hasAuthCookie) {
    const redirect = request.nextUrl.searchParams.get("redirect") || "/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = redirect;
    url.searchParams.delete("redirect");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|exercises/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
