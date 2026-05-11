// ============================================================
// CLINIC ACCESS CODE SYSTEM
// Clinics get unique codes. Patients enter code at signup
// to get premium access and be tagged to that clinic.
// ============================================================

import { createClient } from "@/lib/supabase/client";

export type ClinicInfo = {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  color?: string;
  welcomeMessage?: string;
  accessCode: string;
  plan: "30" | "90" | "unlimited";
  active: boolean;
};

// ============================================================
// VALIDATE CLINIC CODE
// ============================================================

export async function validateClinicCode(code: string): Promise<ClinicInfo | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("clinics")
    .select("*")
    .eq("access_code", code.toUpperCase().trim())
    .eq("active", true)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    logo: data.logo_url || undefined,
    color: data.brand_color || undefined,
    welcomeMessage: data.welcome_message || undefined,
    accessCode: data.access_code,
    plan: data.plan_duration || "30",
    active: data.active,
  };
}

// ============================================================
// ACTIVATE CLINIC CODE FOR PATIENT
// ============================================================

export async function activateClinicCode(code: string, userId: string): Promise<{ success: boolean; clinic?: ClinicInfo; error?: string }> {
  const clinic = await validateClinicCode(code);
  if (!clinic) return { success: false, error: "Invalid or expired clinic code" };

  const supabase = createClient();

  // Register patient under this clinic
  const { error } = await supabase.from("clinic_patients").upsert({
    clinic_id: clinic.id,
    user_id: userId,
    activated_at: new Date().toISOString(),
    status: "active",
  }, { onConflict: "clinic_id,user_id" });

  if (error) return { success: false, error: "Failed to activate code" };

  // Grant premium access
  const days = clinic.plan === "unlimited" ? 365 : clinic.plan === "90" ? 90 : 30;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);

  // Update profile with premium
  await supabase.from("profiles").upsert({
    id: userId,
    plan: "elite",
    premium: true,
    expiry_date: expiryDate.toISOString().split("T")[0],
    clinic_id: clinic.id,
    updated_at: new Date().toISOString(),
  }, { onConflict: "id" });

  // Save locally
  localStorage.setItem("plan", "elite");
  localStorage.setItem("premium", "true");
  localStorage.setItem("expiryDate", expiryDate.toISOString().split("T")[0]);
  localStorage.setItem("clinicId", clinic.id);
  localStorage.setItem("clinicName", clinic.name);
  localStorage.setItem("clinicSlug", clinic.slug);
  if (clinic.color) localStorage.setItem("clinicColor", clinic.color);

  // Increment clinic patient count
  try {
    await supabase.rpc("increment_clinic_patients", { clinic_id_input: clinic.id });
  } catch {
    // Non-critical, ignore
  }

  return { success: true, clinic };
}

// ============================================================
// GET CLINIC BY SLUG (for /clinic/[slug] page)
// ============================================================

export async function getClinicBySlug(slug: string): Promise<ClinicInfo | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("clinics")
    .select("*")
    .eq("slug", slug.toLowerCase().trim())
    .eq("active", true)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    logo: data.logo_url || undefined,
    color: data.brand_color || undefined,
    welcomeMessage: data.welcome_message || undefined,
    accessCode: data.access_code,
    plan: data.plan_duration || "30",
    active: data.active,
  };
}

// ============================================================
// CHECK IF USER IS CLINIC PATIENT
// ============================================================

export function getClinicBadge(): { name: string; color?: string } | null {
  if (typeof window === "undefined") return null;
  const name = localStorage.getItem("clinicName");
  if (!name) return null;
  const color = localStorage.getItem("clinicColor") || undefined;
  return { name, color };
}
