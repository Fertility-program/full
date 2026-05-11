import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST — Sync partner habits, supplements, spermiogram, check-in
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, type, data } = body;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (type === "habits") {
      const today = new Date().toISOString().split("T")[0];
      await supabase.from("partner_habits").upsert({
        user_id: userId,
        date: today,
        habits: data.habits || {},
        supplements: data.supplements || {},
        habits_completed: data.habitsCompleted || 0,
        checkin: data.checkin || null,
      }, { onConflict: "user_id,date" });

      return NextResponse.json({ success: true });
    }

    if (type === "spermiogram") {
      await supabase.from("spermiogram_entries").upsert({
        user_id: userId,
        entry_id: data.id,
        date: data.date,
        volume: data.volume,
        concentration: data.concentration,
        total_count: data.totalCount,
        motility: data.motility,
        total_motility: data.totalMotility,
        morphology: data.morphology,
        vitality: data.vitality || null,
        ph: data.ph || null,
        white_blood_cells: data.whiteBloodCells || null,
        lab: data.lab || null,
        notes: data.notes || null,
        abstinence_days: data.abstinenceDays || null,
      }, { onConflict: "user_id,entry_id" });

      return NextResponse.json({ success: true });
    }

    if (type === "checkin") {
      const today = new Date().toISOString().split("T")[0];
      await supabase.from("partner_checkins").upsert({
        user_id: userId,
        date: today,
        sleep: data.sleep,
        energy: data.energy,
        stress: data.stress,
        exercise: data.exercise || false,
        alcohol: data.alcohol || false,
        heat_exposure: data.heatExposure || false,
        notes: data.notes || "",
      }, { onConflict: "user_id,date" });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — Pull partner data
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const type = req.nextUrl.searchParams.get("type");

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (type === "spermiogram") {
      const { data } = await supabase
        .from("spermiogram_entries")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: true });

      return NextResponse.json({ entries: data || [] });
    }

    if (type === "checkins") {
      const { data } = await supabase
        .from("partner_checkins")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(90);

      return NextResponse.json({ entries: data || [] });
    }

    if (type === "habits-history") {
      const { data } = await supabase
        .from("partner_habits")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(30);

      return NextResponse.json({ entries: data || [] });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
