import { test, expect } from "@playwright/test";

// ============================================================
// SEO & META TESTS — verify meta tags and structured data
// ============================================================

test.describe("SEO & Meta Tags", () => {
  test("homepage has proper meta tags", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();
    expect(title).toContain("Veronica Bloom");

    const description = await page.getAttribute('meta[name="description"]', "content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });

  test("has Open Graph tags", async ({ page }) => {
    await page.goto("/");

    const ogTitle = await page.getAttribute('meta[property="og:title"]', "content");
    expect(ogTitle).toContain("Veronica Bloom");

    const ogType = await page.getAttribute('meta[property="og:type"]', "content");
    expect(ogType).toBe("website");
  });

  test("has structured data (JSON-LD)", async ({ page }) => {
    await page.goto("/");

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();

    const data = JSON.parse(jsonLd!);
    expect(data["@type"]).toBe("WebApplication");
    expect(data.name).toContain("Veronica Bloom");
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("manifest.json is accessible", async ({ page }) => {
    const response = await page.goto("/manifest.json");
    expect(response?.status()).toBe(200);
    const data = await response?.json();
    expect(data.name).toContain("Veronica Bloom");
  });
});
