import { test, expect } from "@playwright/test";

// ============================================================
// API HEALTH TESTS — verify API routes respond correctly
// ============================================================

test.describe("API Routes — Health Check", () => {
  test("POST /api/leads accepts valid email", async ({ request }) => {
    const res = await request.post("/api/leads", {
      data: { email: "test@example.com", source: "test" },
    });
    // Should be 200 or 429 (rate limited)
    expect([200, 429]).toContain(res.status());
  });

  test("POST /api/checkin requires auth", async ({ request }) => {
    const res = await request.post("/api/checkin", {
      data: { sleep: 7, energy: 6, stress: 4 },
    });
    expect([401, 403]).toContain(res.status());
  });

  test("GET /api/profile requires auth", async ({ request }) => {
    const res = await request.get("/api/profile");
    expect([401, 403]).toContain(res.status());
  });

  test("POST /api/checkout requires valid plan", async ({ request }) => {
    const res = await request.post("/api/checkout", {
      data: { plan: "invalid_plan" },
    });
    expect(res.status()).toBe(400);
  });

  test("POST /api/subscription requires auth", async ({ request }) => {
    const res = await request.post("/api/subscription", {
      data: { plan: "glow" },
    });
    expect([401, 429]).toContain(res.status());
  });

  test("Paddle webhook rejects unsigned requests", async ({ request }) => {
    const res = await request.post("/api/webhooks/paddle", {
      data: { event_type: "transaction.completed", data: {} },
    });
    expect(res.status()).toBe(401);
  });

  test("LemonSqueezy webhook rejects unsigned requests", async ({ request }) => {
    const res = await request.post("/api/webhooks/lemonsqueezy", {
      data: { meta: { event_name: "order_created" } },
    });
    expect([401, 500]).toContain(res.status());
  });

  test("GET /feed.xml returns RSS", async ({ request }) => {
    const res = await request.get("/feed.xml");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("xml");
  });
});
