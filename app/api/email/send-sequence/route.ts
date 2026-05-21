import { NextRequest, NextResponse } from "next/server";
import { getSequenceEmail, renderEmail } from "@/lib/email-sequences";

export const dynamic = "force-dynamic";

// POST /api/email/send-sequence — send nurture email from sequence
// Called by cron job daily to send emails to users based on their signup day
export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { email, day, name } = body;

  if (!email || day === undefined) {
    return NextResponse.json({ error: "email and day required" }, { status: 400 });
  }

  const sequenceEmail = getSequenceEmail(day);
  if (!sequenceEmail) {
    return NextResponse.json({ error: "No email for this day" }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://veronica-program.vercel.app";

  const rendered = renderEmail(sequenceEmail, {
    guideUrl: `${appUrl}/guide`,
    partnerUrl: `${appUrl}/partner`,
    nutritionUrl: `${appUrl}/nutrition`,
    cycleUrl: `${appUrl}/cycle`,
    quizUrl: `${appUrl}/quiz`,
    name: name || "there",
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Veronica Bloom <hello@veronicabloom.com>",
        to: [email],
        subject: rendered.subject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #3a5550;">
            ${rendered.body}
            <hr style="border: none; border-top: 1px solid #e8f5f2; margin: 30px 0;" />
            <p style="font-size: 11px; color: #5a7570;">
              You're receiving this because you downloaded our fertility guide. 
              <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #5ba89d;">Unsubscribe</a>
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    return NextResponse.json({ success: true, day });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
