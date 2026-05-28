// ============================================================
// CSRF PROTECTION — Double-submit cookie pattern
// ============================================================
// Generates a CSRF token, stores it in a cookie, and validates
// it against the X-CSRF-Token header on state-changing requests.
// ============================================================

import { NextResponse, type NextRequest } from "next/server";

const CSRF_COOKIE = "csrf_token";
const CSRF_HEADER = "x-csrf-token";

/**
 * Generate a random CSRF token
 */
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Middleware: Set CSRF cookie if not present
 */
export function setCsrfCookie(request: NextRequest, response: NextResponse): NextResponse {
  const existing = request.cookies.get(CSRF_COOKIE);
  if (!existing) {
    const token = generateToken();
    response.cookies.set(CSRF_COOKIE, token, {
      httpOnly: false, // Must be readable by JS to send in header
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }
  return response;
}

/**
 * Validate CSRF token on API routes (POST, PUT, DELETE, PATCH)
 * Returns true if valid, false if invalid.
 */
export function validateCsrf(request: Request): boolean {
  // Skip for webhooks (they use their own signature verification)
  const url = new URL(request.url);
  if (url.pathname.includes("/webhooks/")) return true;
  if (url.pathname.includes("/cron/")) return true;

  // Skip for GET/HEAD/OPTIONS
  const method = request.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return true;

  // Get token from cookie and header
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieMatch = cookieHeader.match(/csrf_token=([^;]+)/);
  const cookieToken = cookieMatch ? cookieMatch[1] : null;
  const headerToken = request.headers.get(CSRF_HEADER);

  // Both must exist and match
  if (!cookieToken || !headerToken) return false;
  return cookieToken === headerToken;
}

/**
 * Client-side helper: get CSRF token from cookie
 */
export function getClientCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match ? match[1] : "";
}
