import { NextResponse } from "next/server";
import { buildCheckoutUrl } from "@/lib/gumroad";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await request.json();
  const planId = body.plan as "glow" | "elite";

  if (!["glow", "elite"].includes(planId)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const checkoutUrl = buildCheckoutUrl({
    plan: planId,
    email: user?.email || undefined,
    userId: user?.id || "",
    successUrl: `${appUrl}/checkout/success?plan=${planId}`,
  });

  return NextResponse.json({ url: checkoutUrl });
}
