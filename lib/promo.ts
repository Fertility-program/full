// ============================================================
// PROMO MODE — Launch Promotion
// ============================================================
// Set PROMO_MODE = true to give all users free Elite access.
// Set PROMO_MODE = false to enable normal paid plans.
//
// Optional: Set PROMO_END_DATE to auto-expire the promo.
// If set, promo will be active until that date regardless of PROMO_MODE.
// ============================================================

export const PROMO_MODE = true;

// Optional: auto-expire promo on this date (ISO format, e.g. "2026-07-01")
// Leave empty string to rely only on PROMO_MODE flag
export const PROMO_END_DATE = "";

/**
 * Returns true if promo is currently active.
 * Checks both the flag and optional end date.
 */
export function isPromoActive(): boolean {
  if (!PROMO_MODE) return false;

  if (PROMO_END_DATE) {
    const endDate = new Date(PROMO_END_DATE);
    const now = new Date();
    return now < endDate;
  }

  return true;
}

/**
 * Promo plan level — what users get for free during promo
 */
export const PROMO_PLAN = "elite" as const;

/**
 * Banner text for pricing page
 */
export const PROMO_BANNER_TEXT = "🎉 Launch Promo — Full Elite Access Free!";

/**
 * Message for checkout page redirect
 */
export const PROMO_CHECKOUT_MESSAGE =
  "Everything is free during our launch promotion! Start your journey now.";
