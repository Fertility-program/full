import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyGumroadPing } from "@/lib/gumroad";

export const dynamic = "force-dynamic";

// ============================================================
// GUMROAD WEBHOOK (Ping)
// ============================================================
// Gumroad sends a POST request to this endpoint after a sale.
// Configure it in: Gumroad → Settings → Advanced → Ping
// URL: https://yourdomain.com/api/webhooks/gumroad
//
// Required env vars:
//   GUMROAD_SELLER_ID          — your Gumroad seller ID for verification
//   NEXT_PUBLIC_SUPABASE_URL   — Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY  — Supabase service role key
// ============================================================

export async function POST(request: Request) {
  // Gumroad sends form-encoded data
  const formData = await request.formData();

  // Convert FormData to a plain object for easier access
  const payload: Record<string, string> = {};
  formData.forEach((value, key) => {
    payload[key] = value.toString();
  });

  // 1. Verify the ping is from Gumroad
  const sellerId = payload.seller_id || "";
  if (!verifyGumroadPing(sellerId)) {
    console.warn("[Gumroad] Invalid seller_id in ping:", sellerId);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Check if this is a refund or dispute (don't activate)
  const refunded = payload.refunded === "true";
  const disputed = payload.disputed === "true";
  const chargebacked = payload.chargebacked === "true";

  if (refunded || disputed || chargebacked) {
    return handleRefundOrDispute(payload);
  }

  // 3. Handle successful sale
  return handleSale(payload);
}

// ============================================================
// SALE HANDLER
// ============================================================
async function handleSale(payload: Record<string, string>) {
  // Custom fields from the checkout URL
  const userId = payload.user_id || payload["custom_fields[user_id]"] || "";
  const plan = (payload.plan || payload["custom_fields[plan]"] || "glow") as "glow" | "elite";
  const email = payload.email || "";
  const saleId = payload.sale_id || "";
  const productId = payload.product_id || "";

  if (!["glow", "elite"].includes(plan)) {
    console.warn(`[Gumroad] Invalid plan in sale: ${plan}`);
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const durationDays = plan === "elite" ? 90 : 30;
  const now = new Date();
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + durationDays);

  if (userId) {
    try {
      const supabase = getSupabaseAdmin();

      await supabase.from("profiles").upsert(
        {
          id: userId,
          email: email || undefined,
          plan,
          premium: true,
          current_day: 1,
          purchase_date: now.toISOString(),
          expiry_date: expiry.toISOString(),
          updated_at: now.toISOString(),
        },
        { onConflict: "id" }
      );

      console.log(`[Gumroad] Activated ${plan} for user ${userId} (sale: ${saleId}, product: ${productId})`);
    } catch (err) {
      console.error("[Gumroad] Failed to activate subscription:", err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else {
    // No user_id — log for manual resolution
    console.warn(`[Gumroad] Sale ${saleId} has no user_id. Email: ${email}`);
  }

  return NextResponse.json({ received: true });
}

// ============================================================
// REFUND / DISPUTE HANDLER
// ============================================================
async function handleRefundOrDispute(payload: Record<string, string>) {
  const userId = payload.user_id || payload["custom_fields[user_id]"] || "";
  const saleId = payload.sale_id || "";
  const reason = payload.refunded === "true" ? "refund" : payload.disputed === "true" ? "dispute" : "chargeback";

  if (!userId) {
    console.warn(`[Gumroad] ${reason} for sale ${saleId} — no user_id to deactivate`);
    return NextResponse.json({ received: true });
  }

  try {
    const supabase = getSupabaseAdmin();

    await supabase.from("profiles").update({
      premium: false,
      updated_at: new Date().toISOString(),
    }).eq("id", userId);

    console.log(`[Gumroad] Deactivated premium for user ${userId} (${reason}, sale: ${saleId})`);
  } catch (err) {
    console.error(`[Gumroad] Failed to handle ${reason}:`, err);
  }

  return NextResponse.json({ received: true });
}

// ============================================================
// SUPABASE ADMIN CLIENT
// ============================================================
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase credentials not configured");
  }

  return createClient(url, key);
}
