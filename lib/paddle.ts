// ============================================================
// PADDLE INTEGRATION
// ============================================================
// Environment variables needed:
//   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN  — from Paddle Dashboard → Developer Tools → Authentication
//   NEXT_PUBLIC_PADDLE_ENV           — "sandbox" or "production"
//   NEXT_PUBLIC_PADDLE_GLOW_PRICE_ID — Price ID for Bloom/Glow plan (pri_xxxxx)
//   NEXT_PUBLIC_PADDLE_ELITE_PRICE_ID — Price ID for Elite plan (pri_xxxxx)
//   PADDLE_API_KEY                   — Server-side API key
//   PADDLE_WEBHOOK_SECRET            — Webhook signing secret (whsec_xxxxx)
// ============================================================

export const PADDLE_PLANS = {
  glow: {
    priceId: process.env.NEXT_PUBLIC_PADDLE_BLOOM_FERTILITY_PRICE_ID || "",
    name: "Veronica Bloom",
    price: 29,
  },
  elite: {
    priceId: process.env.NEXT_PUBLIC_PADDLE_ELITE_FERTILITY_PRICE_ID || "",
    name: "Veronica Elite",
    price: 79,
  },
} as const;

export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "",
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox") as "sandbox" | "production",
};

/**
 * Verify Paddle webhook signature
 * Paddle uses HMAC-SHA256 with the webhook secret
 */
export function verifyPaddleWebhook(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;

  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[Paddle] PADDLE_WEBHOOK_SECRET not configured");
    return false;
  }

  // Paddle sends signature in format: ts=TIMESTAMP;h1=HASH
  const parts = signature.split(";");
  const tsPart = parts.find((p) => p.startsWith("ts="));
  const h1Part = parts.find((p) => p.startsWith("h1="));

  if (!tsPart || !h1Part) return false;

  const ts = tsPart.replace("ts=", "");
  const expectedHash = h1Part.replace("h1=", "");

  // Build signed payload: timestamp:rawBody
  const crypto = require("crypto");
  const signedPayload = `${ts}:${rawBody}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signedPayload);
  const computedHash = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(computedHash),
    Buffer.from(expectedHash)
  );
}
