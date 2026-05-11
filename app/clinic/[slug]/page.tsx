"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { activateClinicCode, type ClinicInfo } from "@/lib/clinic-codes";

export default function ClinicLandingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [clinic, setClinic] = useState<ClinicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      // Load clinic info
      const { data } = await supabase
        .from("clinics")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setClinic({
        id: data.id,
        slug: data.slug,
        name: data.name,
        logo: data.logo_url || undefined,
        color: data.brand_color || undefined,
        welcomeMessage: data.welcome_message || undefined,
        accessCode: data.access_code,
        plan: data.plan_duration || "30",
        active: data.active,
      });

      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.id);

        // Check if already activated
        const { data: existing } = await supabase
          .from("clinic_patients")
          .select("id")
          .eq("clinic_id", data.id)
          .eq("user_id", user.id)
          .single();

        if (existing) setActivated(true);
      }

      setLoading(false);
    }

    load();
  }, [slug]);

  async function handleActivate() {
    if (!clinic || !userId) return;
    setActivating(true);
    setError("");

    const result = await activateClinicCode(clinic.accessCode, userId);

    if (result.success) {
      setActivated(true);
    } else {
      setError(result.error || "Failed to activate");
    }
    setActivating(false);
  }

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-[#5ba89d]">Loading clinic...</div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10 text-center">
        <section className="soft-card p-10">
          <div className="text-4xl mb-4">🏥</div>
          <h1 className="text-3xl text-[#2d5a52] mb-3">Clinic Not Found</h1>
          <p className="text-sm text-[#5a7570] mb-6">
            This clinic page doesn&apos;t exist or is no longer active.
          </p>
          <Link href="/" className="btn-primary px-6 py-3 inline-block">Go to Home</Link>
        </section>
      </main>
    );
  }

  const brandColor = clinic?.color || "#5ba89d";

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      {/* CLINIC HEADER */}
      <section className="soft-card p-8 mb-6 text-center" style={{ borderTop: `4px solid ${brandColor}` }}>
        {clinic?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={clinic.logo} alt={clinic.name} className="h-16 mx-auto mb-4 object-contain" />
        )}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🏥</span>
          <h1 className="text-3xl text-[#2d5a52]">{clinic?.name}</h1>
        </div>
        <p className="text-xs text-[#5a7570] mb-4">Official Wellness Partner</p>

        {clinic?.welcomeMessage && (
          <p className="text-sm text-[#3a5550] max-w-lg mx-auto bg-[#f0faf8] p-4 rounded-xl border border-[#c2ddd8]">
            {clinic.welcomeMessage}
          </p>
        )}
      </section>

      {/* WHAT YOU GET */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4 text-center">Your Fertility Wellness Program Includes</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🧘‍♀️", title: "Cycle-Synced Exercises", desc: "Daily sessions adapted to your cycle phase" },
            { icon: "🥗", title: "Fertility Nutrition", desc: "Meal plans under €7/day with shopping lists" },
            { icon: "💊", title: "Supplement Tracking", desc: "Evidence-based protocol with daily reminders" },
            { icon: "📅", title: "Cycle Tracker", desc: "BBT, OPK, fertile window prediction" },
            { icon: "👨", title: "His Program", desc: "74-day sperm optimization for your partner" },
            { icon: "💑", title: "Couple Mode", desc: "Sync progress and fertile window together" },
            { icon: "🔬", title: "Spermiogram Tracker", desc: "Track SA results and improvements" },
            { icon: "📊", title: "Progress Analytics", desc: "Weekly summaries and trend tracking" },
          ].map((item) => (
            <div key={item.title} className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <span className="text-xl block mb-1">{item.icon}</span>
              <p className="text-xs font-bold text-[#2d5a52]">{item.title}</p>
              <p className="text-[9px] text-[#5a7570]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS DURATION */}
      <section className="soft-card p-5 mb-6 text-center border-l-4" style={{ borderLeftColor: brandColor }}>
        <p className="text-sm text-[#2d5a52]">
          Your clinic provides <strong>{clinic?.plan === "unlimited" ? "unlimited" : `${clinic?.plan} days of`}</strong> premium access — completely free for you.
        </p>
      </section>

      {/* ACTIVATION */}
      <section className="soft-card p-6 mb-6 text-center">
        {activated ? (
          <div>
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl text-[#2d5a52] mb-2">You&apos;re All Set!</h2>
            <p className="text-sm text-[#3a5550] mb-4">
              Premium access activated via {clinic?.name}. Start your program now.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/dashboard" className="btn-primary px-6 py-3">Go to Dashboard</Link>
              <Link href="/partner" className="btn-outline px-6 py-3">His Dashboard</Link>
            </div>
          </div>
        ) : isLoggedIn ? (
          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">Activate Your Access</h2>
            <p className="text-sm text-[#3a5550] mb-4">
              Click below to activate your free premium access from {clinic?.name}.
            </p>
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            <button
              onClick={handleActivate}
              disabled={activating}
              className="btn-primary px-8 py-3 text-base disabled:opacity-60"
              style={{ backgroundColor: brandColor }}
            >
              {activating ? "Activating..." : "Activate Free Premium Access"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">Get Started</h2>
            <p className="text-sm text-[#3a5550] mb-4">
              Create a free account to activate your premium access from {clinic?.name}.
            </p>
            <Link
              href={`/login?redirect=/clinic/${slug}`}
              className="btn-primary px-8 py-3 text-base inline-block"
              style={{ backgroundColor: brandColor }}
            >
              Create Account / Sign In
            </Link>
            <p className="text-[10px] text-[#5a7570] mt-3">
              After signing in, you&apos;ll be redirected back here to activate.
            </p>
          </div>
        )}
      </section>

      {/* CLINIC BADGE INFO */}
      <section className="soft-card p-4 mb-6 text-center">
        <p className="text-[10px] text-[#5a7570]">
          🏥 This program is recommended by <strong>{clinic?.name}</strong> as a lifestyle companion to your clinical care. It does not replace medical treatment.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/free-guide" className="btn-outline text-xs px-4 py-2">Free Guide</Link>
        <Link href="/quiz" className="btn-outline text-xs px-4 py-2">Take Assessment</Link>
      </div>
    </main>
  );
}
