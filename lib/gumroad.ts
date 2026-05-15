// ============================================================
// GUMROAD INTEGRATION
// ============================================================
// Environment variables needed:
//   GUMROAD_ACCESS_TOKEN       — from Gumroad Settings → Advanced → Application
//   GUMROAD_GLOW_PRODUCT_ID   — short product permalink (e.g. "veronica-bloom")
//   GUMROAD_ELITE_PRODUCT_ID  — short product permalink (e.g. "veronica-elite")
//   GUMROAD_PING_SECRET       — optional shared secret for webhook verification
// ============================================================

export const GUMROAD_PLANS = {
  glow: {
    productId: process.env.GUMROAD_GLOW_PRODUCT_ID || "veronica-bloom",
    name: "Veronica Bloom",
    price: 29,
  },
  elite: {
    productId: process.env.GUMROAD_ELITE_PRODUCT_ID || "veronica-elite",
    name: "Veronica Elite",
    price: 79,
  },
} as const;

/**
 * Build a Gumroad checkout URL with custom fields.
 * Gumroad doesn't have a "create checkout" API — you link directly to the product
 * and pass custom fields via query params.
 *
 * Custom fields are passed as query params: ?user_id=xxx&plan=glow
 * These will appear in the webhook ping payload under `custom_fields`.
 *
 * NOTE: You must add custom fields "user_id" and "plan" in Gumroad product settings
 * under "Custom Fields" for them to be included in the webhook.
 */
export function buildCheckoutUrl(options: {
  plan: "glow" | "elite";
  email?: string;
  userId?: string;
  successUrl?: string;
}) {
  const planConfig = GUMROAD_PLANS[options.plan];
  const baseUrl = `https://app.gumroad.com/l/${planConfig.productId}`;

  const params = new URLSearchParams();

  // Pre-fill email
  if (options.email) {
    params.set("email", options.email);
  }

  // Custom fields — these get sent back in the webhook ping
  if (options.userId) {
    params.set("user_id", options.userId);
  }
  params.set("plan", options.plan);

  // Redirect after successful purchase
  if (options.successUrl) {
    params.set("wanted", "true"); // ensures redirect works
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Verify Gumroad webhook ping using the shared secret.
 * Gumroad doesn't use HMAC — it sends the secret as a field in the POST body.
 * The field is called "resource_name" for resource subscriptions,
 * but for simple pings, you verify by checking a shared field.
 *
 * Actually, Gumroad's recommended approach is to verify the seller_id
 * matches your account, or use a custom secret field.
 */
export function verifyGumroadPing(sellerId: string): boolean {
  const expectedSellerId = process.env.GUMROAD_SELLER_ID || "";
  if (!expectedSellerId) {
    // If not configured, skip verification (not recommended for production)
    console.warn("[Gumroad] GUMROAD_SELLER_ID not configured, skipping verification");
    return true;
  }
  return sellerId === expectedSellerId;
}
