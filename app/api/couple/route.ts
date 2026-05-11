import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST — Create invite or join couple
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, code } = body;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (action === "create-invite") {
      // Generate a 6-char invite code
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let inviteCode = "";
      for (let i = 0; i < 6; i++) {
        inviteCode += chars[Math.floor(Math.random() * chars.length)];
      }

      const { error } = await supabase.from("couples").upsert({
        partner_a: userId,
        invite_code: inviteCode,
        status: "pending",
        created_at: new Date().toISOString(),
      }, { onConflict: "partner_a" });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ code: inviteCode });
    }

    if (action === "join") {
      if (!code) {
        return NextResponse.json({ error: "Code required" }, { status: 400 });
      }

      // Find pending invite
      const { data: couple, error: findError } = await supabase
        .from("couples")
        .select("*")
        .eq("invite_code", code.toUpperCase())
        .eq("status", "pending")
        .single();

      if (findError || !couple) {
        return NextResponse.json({ error: "Invalid or expired code" }, { status: 404 });
      }

      if (couple.partner_a === userId) {
        return NextResponse.json({ error: "Cannot pair with yourself" }, { status: 400 });
      }

      // Activate couple
      const { error: updateError } = await supabase
        .from("couples")
        .update({
          partner_b: userId,
          status: "active",
          start_date: new Date().toISOString().split("T")[0],
        })
        .eq("id", couple.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, coupleId: couple.id });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — Get couple status and partner progress
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Find active couple
    const { data: couple } = await supabase
      .from("couples")
      .select("*")
      .or(`partner_a.eq.${userId},partner_b.eq.${userId}`)
      .eq("status", "active")
      .single();

    if (!couple) {
      return NextResponse.json({ coupled: false });
    }

    const partnerId = couple.partner_a === userId ? couple.partner_b : couple.partner_a;
    const role = couple.partner_a === userId ? "her" : "him";

    // Get partner profile
    const { data: partnerProfile } = await supabase
      .from("profiles")
      .select("quiz_data, current_day")
      .eq("id", partnerId)
      .single();

    // Get partner's today habits (if partner is him)
    const today = new Date().toISOString().split("T")[0];
    const { data: partnerHabits } = await supabase
      .from("partner_habits")
      .select("*")
      .eq("user_id", partnerId)
      .eq("date", today)
      .single();

    return NextResponse.json({
      coupled: true,
      role,
      coupleId: couple.id,
      startDate: couple.start_date,
      partner: {
        name: partnerProfile?.quiz_data?.name || (role === "her" ? "Him" : "Her"),
        currentDay: partnerProfile?.current_day || 1,
        todayHabits: partnerHabits?.habits_completed || 0,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
