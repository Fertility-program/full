import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * Daily Cron Job — runs every day at 8:00 AM
 * 1. Sends push notification reminders to active users
 * 2. Sends nurture emails to guide downloaders (day 1, 3, 5, 7)
 * 3. Checks for expiring plans and sends warnings
 *
 * Configure in vercel.json:
 * { "crons": [{ "path": "/api/cron/daily-reminders", "schedule": "0 8 * * *" }] }
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const results = {
    pushSent: 0,
    emailsSent: 0,
    errors: 0,
  };

  // ============================================================
  // 1. PUSH NOTIFICATIONS — remind users to do their daily routine
  // ============================================================
  try {
    const { data: subscriptions } = await supabase
      .from("push_subscriptions")
      .select("*");

    if (subscriptions && subscriptions.length > 0) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://veronica-program.vercel.app";

      // Daily motivation messages (rotate by day of year)
      const messages = [
        { title: "Good morning! 🌸", body: "Your daily fertility session is ready. 10 minutes for your future baby." },
        { title: "Time for your routine 🧘‍♀️", body: "Cycle-synced exercises waiting for you. Consistency beats perfection." },
        { title: "Don't forget supplements 💊", body: "CoQ10, Folate, D3 — your eggs need daily fuel." },
        { title: "Check in today 📝", body: "Log your sleep, energy, and stress. Tracking creates awareness." },
        { title: "You're doing great! ✨", body: "Every day you show up is a day closer to your goal." },
        { title: "Hydration reminder 💧", body: "2L water today supports cervical mucus and hormone transport." },
        { title: "Move your body 🏃‍♀️", body: "Even 10 minutes of walking improves blood flow to reproductive organs." },
      ];

      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const todayMessage = messages[dayOfYear % messages.length];

      // Send to all subscribers (in production, filter by user preferences)
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

      if (vapidPublicKey && vapidPrivateKey) {
        try {
          const webpush = require("web-push");
          webpush.setVapidDetails(
            "mailto:majavujovicns021@gmail.com",
            vapidPublicKey,
            vapidPrivateKey
          );

          const payload = JSON.stringify({
            title: todayMessage.title,
            body: todayMessage.body,
            url: "/dashboard",
          });

          for (const sub of subscriptions) {
            try {
              await webpush.sendNotification(
                { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
                payload
              );
              results.pushSent++;
            } catch {
              results.errors++;
            }
          }
        } catch {
          // web-push not installed
        }
      }
    }
  } catch {
    results.errors++;
  }

  // ============================================================
  // 2. EMAIL NURTURE SEQUENCE — send to guide downloaders
  // ============================================================
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      // Get leads who downloaded guide and need follow-up emails
      const { data: leads } = await supabase
        .from("leads")
        .select("email, created_at")
        .eq("source", "free_guide");

      if (leads) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://veronica-program.vercel.app";
        const sequenceDays = [1, 3, 5, 7]; // Days to send emails

        for (const lead of leads) {
          const daysSinceSignup = Math.floor(
            (Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24)
          );

          if (sequenceDays.includes(daysSinceSignup)) {
            try {
              await fetch(`${appUrl}/api/email/send-sequence`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${cronSecret}`,
                },
                body: JSON.stringify({ email: lead.email, day: daysSinceSignup }),
              });
              results.emailsSent++;
            } catch {
              results.errors++;
            }
          }
        }
      }
    }
  } catch {
    results.errors++;
  }

  // ============================================================
  // 3. PLAN EXPIRY WARNINGS (future: send email 3 days before expiry)
  // ============================================================
  // TODO: Query profiles where expiry_date is 3 days from now
  // and send a "Your plan expires soon" email

  return NextResponse.json({
    success: true,
    ...results,
    timestamp: new Date().toISOString(),
  });
}
