// ============================================================
// API UTILITIES — Secure fetch wrapper with CSRF
// ============================================================

import { getClientCsrfToken } from "@/lib/csrf";

/**
 * Secure fetch wrapper that automatically includes CSRF token
 * Use this instead of raw fetch() for all API calls from client.
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  // Add CSRF token for state-changing requests
  const method = (options.method || "GET").toUpperCase();
  if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    const csrfToken = getClientCsrfToken();
    if (csrfToken) {
      headers.set("x-csrf-token", csrfToken);
    }
  }

  // Ensure JSON content type for bodies
  if (options.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
  });
}

/**
 * Sanitize error response — never expose stack traces in production
 */
export function safeErrorResponse(error: unknown, status = 500): Response {
  const isDev = process.env.NODE_ENV === "development";

  const message =
    error instanceof Error
      ? isDev
        ? error.message
        : "Internal server error"
      : "Internal server error";

  // Log full error server-side
  console.error("[API Error]", error);

  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
