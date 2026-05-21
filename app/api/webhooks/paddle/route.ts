import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyPaddleWebhook } from "@/lib/paddle";

export const dynamic = "force-dynamic";

// ============================================================
// PADDLE WEBHOOK
// ============================================================
// Configure in Paddle Dashboard → Developer Tools → Notifications
// URL: https://yourdomain.com/api/webhooks/paddle
// Events: transaction.completed, subscription.canceled
//
// Required env vars:
//   PADDLE_WEBHOOK_SECRET        — from Paddle notification settings
//   NEXT_PUBLIC_SUPABASE_URL     — Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY    — Supabase service role key
// ============================================================

export async function POST(request: Request) {
  // 1. Read raw body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get("paddle-signature");

  // 2. Verify webhook signature
  if (!verifyPaddleWebhook(rawBody, signature)) {
    console.warn("[Paddle] Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 3. Parse verified body
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = body.event_type as string;
  console.log(`[Paddle] Event: ${eventType}`);

  // 4. Handle events
  if (eventType === "transaction.completed") {
    return handleTransactionCompleted(body);
  }

  if (eventType === "subscription.canceled") {
    return handleSubscriptionCanceled(body);
  }

  // Acknowledge unhandled events
  return NextResponse.json({ received: true });
}

// ============================================================
// EVENT HANDLERS
// ============================================================

async function handleTransactionCompleted(body: Record<string, unknown>) {
  const data = body.data as Record<string, unknown>;
  const customData = (data?.custom_data || {}) as Record<string, string>;
  const userId = customData.user_id;
  const plan = customData.plan as "glow" | "elite";

  if (!plan || !["glow", "elite"].includes(plan)) {
    console.warn(`[Paddle] Invalid plan in transaction: ${plan}`);
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const durationDays = plan === "elite" ? 90 : 30;
  const now = new Date();
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + durationDays);

  const transactionId = data.id as string;

  if (userId) {
    try {
      const supabase = getSupabaseAdmin();

      await supabase.from("profiles").upsert(
        {
          id: userId,
          plan,
          premium: true,
          current_day: 1,
          purchase_date: now.toISOString(),
          expiry_date: expiry.toISOString(),
          updated_at: now.toISOString(),
        },
        { onConflict: "id" }
      );

      console.log(`[Paddle] Activated ${plan} for user ${userId} (tx: ${transactionId})`);
    } catch (err) {
      console.error("[Paddle] Failed to activate subscription:", err);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } else {
    console.warn(`[Paddle] Transaction ${transactionId} has no user_id in custom_data`);
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionCanceled(body: Record<string, unknown>) {
  const data = body.data as Record<string, unknown>;
  const customData = (data?.custom_data || {}) as Record<string, string>;
  const userId = customData.user_id;

  if (!userId) return NextResponse.json({ received: true });

  try {
    const supabase = getSupabaseAdmin();

    await supabase.from("profiles").update({
      premium: false,
      updated_at: new Date().toISOString(),
    }).eq("id", userId);

    console.log(`[Paddle] Subscription cancelled for user ${userId}`);
  } catch (err) {
    console.error("[Paddle] Failed to cancel subscription:", err);
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
