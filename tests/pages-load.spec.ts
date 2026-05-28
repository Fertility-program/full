import { test, expect } from "@playwright/test";

// ============================================================
// PAGE LOAD TESTS — verify all key pages render without errors
// ============================================================

const pages = [
  { path: "/", title: "homepage", expect: "Veronica Bloom" },
  { path: "/quiz", title: "quiz", expect: "Tell us about yourself" },
  { path: "/pricing", title: "pricing", expect: "Premium Plans" },
  { path: "/blog", title: "blog", expect: "Blog" },
  { path: "/privacy", title: "privacy policy", expect: "Privacy Policy" },
  { path: "/terms", title: "terms of service", expect: "Terms of Service" },
  { path: "/refund", title: "refund policy", expect: "Refund Policy" },
  { path: "/contact", title: "contact", expect: "Contact" },
  { path: "/features", title: "features", expect: "Features" },
  { path: "/download", title: "download", expect: "Download" },
  { path: "/free-guide", title: "free guide", expect: "Guide" },
  { path: "/nutrition", title: "nutrition", expect: "Nutrition" },
  { path: "/supplements", title: "supplements", expect: "Supplement" },
  { path: "/cycle", title: "cycle tracker", expect: "Cycle" },
];

test.describe("Page Load Tests", () => {
  for (const p of pages) {
    test(`${p.title} (${p.path}) loads without errors`, async ({ page }) => {
      const response = await page.goto(p.path);
      
      // Page should return 200
      expect(response?.status()).toBe(200);
      
      // No console errors
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      
      // Wait for content to render
      await page.waitForLoadState("networkidle");
      
      // Should contain expected text
      const body = await page.textContent("body");
      expect(body).toContain(p.expect);
      
      // No critical JS errors
      expect(errors.filter(e => !e.includes("hydration"))).toHaveLength(0);
    });
  }
});
