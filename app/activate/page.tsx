"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ActivatePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
      setChecking(false);
    });

    // Check for pending code from login
    const pending = localStorage.getItem("pendingClinicCode");
    if (pending) {
      setCode(pending);
      localStorage.removeItem("pendingClinicCode");
    }
  }, []);

  async function handleActivate() {
    if (!code.trim()) return;
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("Please log in first.");
        setLoading(false);
        return;
      }

      // Validate clinic code
      const { data: clinic } = await supabase
        .from("clinics")
        .select("*")
        .eq("access_code", code.toUpperCase().trim())
        .eq("active", true)
        .single();

      if (!clinic) {
        setError("Invalid or expired code. Please check and try again.");
        setLoading(false);
        return;
      }

      // Try to register as clinic patient
      try {
        await supabase.from("clinic_patients").upsert({
          clinic_id: clinic.id,
          user_id: user.id,
          activated_at: new Date().toISOString(),
          status: "active",
        }, { onConflict: "clinic_id,user_id" });
      } catch {}

      // Grant premium access locally (always works)
      const days = clinic.plan_duration === "unlimited" ? 365 : clinic.plan_duration === "90" ? 90 : 30;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);

      localStorage.setItem("plan", "elite");
      localStorage.setItem("premium", "true");
      localStorage.setItem("expiryDate", expiryDate.toISOString().split("T")[0]);
      localStorage.setItem("clinicId", clinic.id);
      localStorage.setItem("clinicName", clinic.name);
      localStorage.setItem("clinicSlug", clinic.slug);
      if (clinic.brand_color) localStorage.setItem("clinicColor", clinic.brand_color);

      // Try to update profile in DB too
      try {
        await supabase.from("profiles").upsert({
          id: user.id,
          plan: "elite",
          premium: true,
          expiry_date: expiryDate.toISOString().split("T")[0],
          clinic_id: clinic.id,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });
      } catch {}

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  if (checking) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-[#5ba89d]">Loading...</div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="max-w-md mx-auto px-6 py-10">
        <section className="soft-card p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl text-[#2d5a52] mb-3">Premium Activated!</h1>
          <p className="text-sm text-[#5a7570] mb-6">
            Your clinic code has been applied. You now have full access to all features.
          </p>
          <Link href="/dashboard" className="btn-primary px-8 py-3 inline-block">
            Go to Dashboard →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <section className="soft-card p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🏥</div>
          <h1 className="text-3xl text-[#2d5a52] mb-2">Activate Clinic Code</h1>
          <p className="text-sm text-[#5a7570]">
            Enter the access code from your fertility clinic to unlock premium features.
          </p>
        </div>

        {!isLoggedIn && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 mb-4">
            <p className="text-xs text-amber-700">
              ⚠️ You need to <Link href="/login?redirect=/activate" className="underline font-bold">log in</Link> first, then come back here to enter your code.
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">
              Clinic Access Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. DEMO2025"
              className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-center font-mono text-xl tracking-widest uppercase"
              maxLength={20}
            />
          </div>

          <button
            onClick={handleActivate}
            disabled={loading || !isLoggedIn || !code.trim()}
            className="btn-primary w-full py-4 text-lg disabled:opacity-50"
          >
            {loading ? "Activating..." : "Activate Code"}
          </button>
        </div>

        <p className="text-[9px] text-[#5a7570] text-center mt-4">
          Don&apos;t have a code? <Link href="/pricing" className="text-[#5ba89d] underline">View plans</Link> or <Link href="/quiz" className="text-[#5ba89d] underline">start free trial</Link>.
        </p>
      </section>
    </main>
  );
}
