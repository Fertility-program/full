import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/push-send — send push notification to a user
// Used by cron jobs for daily reminders
export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  // Only allow cron or admin calls
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

  if (!vapidPublicKey || !vapidPrivateKey) {
    return NextResponse.json({ error: "VAPID keys not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { subscriptions, title, body: notifBody, url } = body;

  if (!subscriptions || !title) {
    return NextResponse.json({ error: "subscriptions and title required" }, { status: 400 });
  }

  // Dynamic import web-push (server-side only)
  // @ts-ignore — web-push is an optional dependency, installed in production
  let webpush: any;
  try {
    webpush = require("web-push");
  } catch {
    return NextResponse.json({ error: "web-push not installed — run: npm i web-push" }, { status: 500 });
  }

  webpush.setVapidDetails(
    "mailto:support@veronicabloom.com",
    vapidPublicKey,
    vapidPrivateKey
  );

  const payload = JSON.stringify({
    title: title || "Veronica Bloom",
    body: notifBody || "Time for your daily wellness routine!",
    url: url || "/dashboard",
  });

  let sent = 0;
  let failed = 0;

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth_key },
        },
        payload
      );
      sent++;
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ sent, failed });
}
