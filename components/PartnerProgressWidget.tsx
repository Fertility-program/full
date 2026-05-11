"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { calculateProgramDay, getSpermPhase } from "@/lib/couple";

type PartnerData = {
  name: string;
  programDay: number;
  habitsToday: number;
  habitsTotal: number;
  lastSpermiogram?: {
    date: string;
    score: number;
    label: string;
  };
  streak: number;
};

export default function PartnerProgressWidget() {
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [coupled, setCoupled] = useState(false);

  useEffect(() => {
    async function loadPartnerData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        // Check couple status
        const res = await fetch(`/api/couple?userId=${user.id}`);
        const data = await res.json();

        if (!data.coupled) {
          setCoupled(false);
          setLoading(false);
          return;
        }

        setCoupled(true);

        // Build partner data
        const spermPhase = getSpermPhase(calculateProgramDay(data.startDate));
        setPartner({
          name: data.partner?.name || "Him",
          programDay: calculateProgramDay(data.startDate),
          habitsToday: data.partner?.todayHabits || 0,
          habitsTotal: 16,
          streak: data.partner?.currentDay || 0,
        });
      } catch {
        // Silently fail — widget is non-critical
      }
      setLoading(false);
    }

    loadPartnerData();
  }, []);

  // Don't show anything if not coupled or loading
  if (loading || !coupled) return null;

  const spermPhase = partner ? getSpermPhase(partner.programDay) : null;

  return (
    <section className="soft-card p-5 mb-6 border-l-4 border-l-[#5ba89d]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👨</span>
          <div>
            <h3 className="text-sm font-medium text-[#4a3f44]">
              {partner?.name || "His"} Progress
            </h3>
            <p className="text-[9px] text-[#7b6870]">74-Day Sperm Program</p>
          </div>
        </div>
        <Link
          href="/partner"
          className="text-[10px] px-3 py-1.5 rounded-full bg-[#f0faf8] text-[#5ba89d] font-medium border border-[#c2ddd8] hover:border-[#5ba89d]"
        >
          View Full →
        </Link>
      </div>

      {partner && (
        <>
          {/* Program day progress */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg">{spermPhase?.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#5a7570]">Day {partner.programDay}/74</span>
                <span className="text-[#5ba89d] font-bold">{Math.round((partner.programDay / 74) * 100)}%</span>
              </div>
              <div className="h-2 bg-[#f0faf8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5ba89d] to-[#3d8a7d] rounded-full transition-all"
                  style={{ width: `${(partner.programDay / 74) * 100}%` }}
                />
              </div>
              <p className="text-[9px] text-[#6aab9f] mt-0.5">{spermPhase?.phase}</p>
            </div>
          </div>

          {/* Today's habits */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span>✅</span>
              <span className="text-[#5a7570]">
                Today: <strong className="text-[#2d5a52]">{partner.habitsToday}/{partner.habitsTotal}</strong> habits
              </span>
            </div>
            {partner.streak > 2 && (
              <div className="flex items-center gap-1">
                <span className="animate-pulse">🔥</span>
                <span className="text-[#5a7570]">{partner.streak} day streak</span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
