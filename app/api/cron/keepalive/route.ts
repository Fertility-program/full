import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * Keepalive ping — prevents Supabase free tier from pausing.
 * Runs daily via Vercel Cron. Just does a simple query to keep the DB active.
 */
export async function GET(request: Request) {
  // Verify cron secret (optional but recommended)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").startsWith("http")
      ? process.env.NEXT_PUBLIC_SUPABASE_URL!
      : `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(url, key);

    // Simple query to keep DB alive
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[Keepalive] DB ping failed:", error.message);
      return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }

    console.log(`[Keepalive] DB alive — ${count} profiles`);
    return NextResponse.json({ status: "ok", profiles: count, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("[Keepalive] Failed:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
