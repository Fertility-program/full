import { test, expect } from "@playwright/test";

// ============================================================
// LEGAL & COMPLIANCE TESTS — Paddle approval requirements
// ============================================================

test.describe("Legal Pages — Paddle Compliance", () => {
  test("Privacy Policy has required sections", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    expect(text).toContain("Privacy Policy");
    expect(text).toContain("Data We Collect");
    expect(text).toContain("GDPR");
    expect(text).toContain("Paddle");
    expect(text).toContain("Cookies");
    expect(text).toContain("Third-Party");
  });

  test("Terms of Service has required sections", async ({ page }) => {
    await page.goto("/terms");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    expect(text).toContain("Terms of Service");
    expect(text).toContain("Medical Disclaimer");
    expect(text).toContain("Merchant of Record");
    expect(text).toContain("Paddle");
    expect(text).toContain("Refund");
    expect(text).toContain("30");
    expect(text).toContain("Veronica Bloom");
  });

  test("Refund Policy has required sections", async ({ page }) => {
    await page.goto("/refund");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    expect(text).toContain("Refund Policy");
    expect(text).toContain("30-Day Money-Back");
    expect(text).toContain("How to Request");
    expect(text).toContain("Contact");
  });

  test("Pricing page shows clear prices", async ({ page }) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");
    const text = await page.textContent("body") || "";

    expect(text).toContain("€29");
    expect(text).toContain("€79");
    expect(text).toContain("One-time payment");
    expect(text).toContain("No subscription");
  });

  test("Footer contains legal links and disclaimer", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check footer links exist
    const footer = page.locator("footer");
    await expect(footer.locator('a[href="/privacy"]')).toBeVisible();
    await expect(footer.locator('a[href="/terms"]')).toBeVisible();
    await expect(footer.locator('a[href="/refund"]')).toBeVisible();
    await expect(footer.locator('a[href="/contact"]')).toBeVisible();

    // Health disclaimer in footer
    const footerText = await footer.textContent() || "";
    expect(footerText).toContain("Disclaimer");
    expect(footerText).toContain("not substitute for professional medical advice");
  });

  test("No broken legal page links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Click each legal link and verify it loads
    for (const path of ["/privacy", "/terms", "/refund", "/contact"]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }
  });
});

test.describe("Brand Consistency", () => {
  test("No 'Veronica Method' references on site", async ({ page }) => {
    const pagesToCheck = ["/", "/pricing", "/terms", "/privacy", "/refund", "/contact"];

    for (const path of pagesToCheck) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const text = await page.textContent("body") || "";
      expect(text).not.toContain("Veronica Method");
    }
  });
});
