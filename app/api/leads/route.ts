import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { leadSchema, validateBody } from "@/lib/validations";
import { checkRateLimit, getRateLimitKey, rateLimitResponse, PUBLIC_LIMIT } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // Rate limit — public endpoint, strict
  const rlKey = getRateLimitKey(request, "leads");
  const rl = checkRateLimit(rlKey, PUBLIC_LIMIT);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { data: body, error: validationError } = await validateBody(request, leadSchema);
  if (validationError) return validationError;

  // Try to save to Supabase (if leads table exists)
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("leads").insert({
      email: body.email,
      source: body.source || "website",
      created_at: new Date().toISOString(),
    });
  } catch {
    // Table might not exist yet — that's ok
  }

  // Send first email from nurture sequence if source is free_guide
  if (body.source === "free_guide" && process.env.RESEND_API_KEY) {
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://fertility-program.vercel.app";
      await fetch(`${appUrl}/api/email/send-sequence`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CRON_SECRET || "internal"}`,
        },
        body: JSON.stringify({ email: body.email, day: 0 }),
      });
    } catch {
      // Non-critical — guide still works without email
    }
  }

  return NextResponse.json({ success: true });
}
