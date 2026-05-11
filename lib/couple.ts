// ============================================================
// COUPLE MODE ENGINE
// Links two accounts (her + him) for shared fertility journey.
// Enables: fertile window sync, shared streaks, progress visibility.
// ============================================================

import { createClient } from "@/lib/supabase/client";

export type CoupleLink = {
  id: string;
  partner_a: string; // her user_id
  partner_b: string; // his user_id
  invite_code: string;
  status: "pending" | "active" | "paused";
  created_at: string;
  start_date: string; // when he started the 74-day program
};

export type PartnerProfile = {
  user_id: string;
  name: string;
  role: "her" | "him";
  start_date: string; // program start date
  current_day: number;
};

export type CoupleProgress = {
  her: {
    name: string;
    streak: number;
    todayCompleted: boolean;
    cyclePhase?: string;
    fertileWindow?: { start: string; end: string; ovulationDate: string };
  };
  him: {
    name: string;
    streak: number;
    todayCompleted: boolean;
    programDay: number; // out of 74
    habitsToday: number;
    habitsTotal: number;
  };
  sharedStreak: number;
  sharedAchievements: string[];
};

// ============================================================
// INVITE CODE GENERATION
// ============================================================

export function generateCoupleCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ============================================================
// CREATE COUPLE INVITE (her side)
// ============================================================

export async function createCoupleInvite(): Promise<{ code: string; link: string } | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const code = generateCoupleCode();

  const { error } = await supabase.from("couples").upsert({
    partner_a: user.id,
    invite_code: code,
    status: "pending",
    created_at: new Date().toISOString(),
  }, { onConflict: "partner_a" });

  if (error) {
    console.error("[couple] Create invite failed:", error);
    return null;
  }

  const link = `${typeof window !== "undefined" ? window.location.origin : ""}/partner?join=${code}`;
  return { code, link };
}

// ============================================================
// JOIN COUPLE (his side)
// ============================================================

export async function joinCouple(code: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  // Find the invite
  const { data: couple } = await supabase
    .from("couples")
    .select("*")
    .eq("invite_code", code.toUpperCase())
    .eq("status", "pending")
    .single();

  if (!couple) return { success: false, error: "Invalid or expired code" };
  if (couple.partner_a === user.id) return { success: false, error: "Cannot pair with yourself" };

  // Activate the couple link
  const { error } = await supabase
    .from("couples")
    .update({
      partner_b: user.id,
      status: "active",
      start_date: new Date().toISOString().split("T")[0],
    })
    .eq("id", couple.id);

  if (error) return { success: false, error: "Failed to join" };

  // Save locally
  localStorage.setItem("coupleId", couple.id);
  localStorage.setItem("coupleRole", "him");
  localStorage.setItem("partnerStartDate", new Date().toISOString().split("T")[0]);

  return { success: true };
}

// ============================================================
// GET COUPLE STATUS
// ============================================================

export async function getCoupleStatus(): Promise<CoupleLink | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Check if user is partner_a or partner_b
  const { data } = await supabase
    .from("couples")
    .select("*")
    .or(`partner_a.eq.${user.id},partner_b.eq.${user.id}`)
    .eq("status", "active")
    .single();

  if (!data) return null;

  // Determine role and save locally
  const role = data.partner_a === user.id ? "her" : "him";
  localStorage.setItem("coupleId", data.id);
  localStorage.setItem("coupleRole", role);

  return data as CoupleLink;
}

// ============================================================
// GET PARTNER PROGRESS (what each partner sees about the other)
// ============================================================

export async function getPartnerProgress(): Promise<CoupleProgress | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const couple = await getCoupleStatus();
  if (!couple) return null;

  const partnerId = couple.partner_a === user.id ? couple.partner_b : couple.partner_a;

  // Get partner's profile
  const { data: partnerProfile } = await supabase
    .from("profiles")
    .select("quiz_data, current_day, plan")
    .eq("id", partnerId)
    .single();

  // Get partner's today check-in
  const today = new Date().toISOString().split("T")[0];
  const { data: partnerCheckin } = await supabase
    .from("checkins")
    .select("*")
    .eq("user_id", partnerId)
    .eq("date", today)
    .single();

  // Get partner's habits (for him)
  const { data: partnerHabits } = await supabase
    .from("partner_habits")
    .select("*")
    .eq("user_id", partnerId)
    .eq("date", today)
    .single();

  // Get shared achievements
  const { data: sharedAch } = await supabase
    .from("couple_achievements")
    .select("achievement_id")
    .eq("couple_id", couple.id);

  const role = couple.partner_a === user.id ? "her" : "him";
  const partnerName = partnerProfile?.quiz_data?.name || (role === "her" ? "Him" : "Her");

  return {
    her: {
      name: role === "her" ? "You" : partnerName,
      streak: partnerProfile?.current_day || 1,
      todayCompleted: !!partnerCheckin,
      cyclePhase: undefined, // loaded separately from cycle data
    },
    him: {
      name: role === "him" ? "You" : partnerName,
      streak: partnerHabits?.streak || 0,
      todayCompleted: !!partnerHabits,
      programDay: calculateProgramDay(couple.start_date),
      habitsToday: partnerHabits?.habits_completed || 0,
      habitsTotal: 16,
    },
    sharedStreak: Math.min(partnerProfile?.current_day || 0, partnerHabits?.streak || 0),
    sharedAchievements: sharedAch?.map((a) => a.achievement_id) || [],
  };
}

// ============================================================
// SYNC PARTNER HABITS TO SERVER
// ============================================================

export async function syncPartnerHabits(habits: Record<string, boolean>, supps: Record<string, boolean>): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];
  const habitsCompleted = Object.values(habits).filter(Boolean).length + Object.values(supps).filter(Boolean).length;

  await supabase.from("partner_habits").upsert({
    user_id: user.id,
    date: today,
    habits: habits,
    supplements: supps,
    habits_completed: habitsCompleted,
    streak: calculateStreak(user.id),
  }, { onConflict: "user_id,date" });
}

// ============================================================
// 74-DAY PROGRAM COUNTDOWN
// ============================================================

export function calculateProgramDay(startDate: string): number {
  if (!startDate) return 0;
  const start = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff + 1, 1), 74);
}

export function getSpermPhase(day: number): { phase: string; description: string; emoji: string } {
  if (day <= 14) return {
    phase: "Spermatogonia",
    emoji: "🌱",
    description: "Stem cells are dividing. New sperm cells are being created from scratch.",
  };
  if (day <= 28) return {
    phase: "Primary Spermatocytes",
    emoji: "🔬",
    description: "Cells are undergoing meiosis I. DNA is being shuffled for genetic diversity.",
  };
  if (day <= 42) return {
    phase: "Secondary Spermatocytes",
    emoji: "⚡",
    description: "Meiosis II complete. Cells now have half the chromosomes — ready to pair with an egg.",
  };
  if (day <= 56) return {
    phase: "Spermatids",
    emoji: "🏗️",
    description: "Cells are reshaping — growing tails, compacting DNA, forming the acrosome.",
  };
  return {
    phase: "Mature Spermatozoa",
    emoji: "🏊",
    description: "Sperm are maturing in the epididymis. Learning to swim. Almost ready!",
  };
}

// ============================================================
// COUPLE ACHIEVEMENTS
// ============================================================

export const COUPLE_ACHIEVEMENTS = [
  { id: "first_sync", name: "Connected", emoji: "🔗", description: "Linked accounts as a couple" },
  { id: "7_day_together", name: "One Week Together", emoji: "🌟", description: "Both completed 7 days" },
  { id: "14_day_together", name: "Two Weeks Strong", emoji: "💪", description: "Both completed 14 days" },
  { id: "30_day_together", name: "Monthly Champions", emoji: "🏆", description: "Both completed 30 days" },
  { id: "no_alcohol_week", name: "Dry Week", emoji: "🚫🍺", description: "Both avoided alcohol for 7 days" },
  { id: "fertile_window_ready", name: "Perfect Timing", emoji: "🎯", description: "Both optimized during fertile window" },
  { id: "supplement_streak_7", name: "Supplement Squad", emoji: "💊", description: "Both took supplements 7 days straight" },
  { id: "74_day_complete", name: "New Sperm, New You", emoji: "🎉", description: "Completed the full 74-day sperm cycle" },
];

// ============================================================
// HELPERS
// ============================================================

async function calculateStreak(userId: string): Promise<number> {
  // Simple streak calculation based on consecutive days with habits logged
  const supabase = createClient();
  const { data } = await supabase
    .from("partner_habits")
    .select("date")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(90);

  if (!data || data.length === 0) return 1;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split("T")[0];

    if (data.some((d) => d.date === dateStr)) {
      streak++;
    } else if (i > 0) {
      break; // streak broken
    }
  }

  return streak;
}
