import { test, expect } from "@playwright/test";

// ============================================================
// CHECKOUT & PROMO FLOW TESTS
// ============================================================

test.describe("Checkout Page", () => {
  test("shows promo message when PROMO_MODE is active", async ({ page }) => {
    await page.goto("/checkout?plan=glow");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    // During promo, should show free access message
    // (If promo is off, this test should be updated)
    if (text.includes("No Payment Needed") || text.includes("Launch Promo")) {
      expect(text).toContain("Free");
      expect(text).toContain("quiz");
    } else {
      // Normal checkout should show plan info
      expect(text).toContain("€");
      expect(text).toContain("Secure");
    }
  });

  test("checkout success page loads", async ({ page }) => {
    const response = await page.goto("/checkout/success?plan=glow");
    expect(response?.status()).toBe(200);
  });
});

test.describe("Pricing Page — Promo Mode", () => {
  test("shows promo banner or normal pricing", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    // Must always show prices regardless of promo
    expect(text).toContain("€29");
    expect(text).toContain("€79");

    // Either promo banner or buy buttons should be visible
    const hasPromo = text.includes("Launch Promo") || text.includes("Currently Free");
    const hasBuyButtons = text.includes("Explore Bloom") || text.includes("Explore Elite");
    expect(hasPromo || hasBuyButtons).toBe(true);
  });
});
