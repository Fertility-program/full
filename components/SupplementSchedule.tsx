"use client";

import { useEffect, useState } from "react";

type TimeSlot = "morning" | "afternoon" | "evening" | "bedtime";

const SCHEDULE: { name: string; time: TimeSlot; icon: string; note: string }[] = [
  { name: "Folate", time: "morning", icon: "🌿", note: "With breakfast" },
  { name: "CoQ10", time: "morning", icon: "🥚", note: "With fat (eggs, avocado)" },
  { name: "Vitamin D3", time: "morning", icon: "☀️", note: "With fat-containing meal" },
  { name: "B-Complex", time: "morning", icon: "⚡", note: "With breakfast (energizing)" },
  { name: "Iron + Vit C", time: "morning", icon: "💪", note: "Empty stomach or with citrus" },
  { name: "Omega-3", time: "afternoon", icon: "🐟", note: "With lunch" },
  { name: "Zinc", time: "afternoon", icon: "🛡️", note: "With food (prevents nausea)" },
  { name: "Myo-Inositol", time: "afternoon", icon: "🌸", note: "2nd dose (if taking 4g/day)" },
  { name: "Vitamin E", time: "afternoon", icon: "🌻", note: "With fat-containing meal" },
  { name: "Probiotics", time: "evening", icon: "🦠", note: "Empty stomach before dinner" },
  { name: "Magnesium", time: "bedtime", icon: "🌙", note: "30 min before sleep (calming)" },
];

const TIME_LABELS: Record<TimeSlot, { label: string; emoji: string; time: string }> = {
  morning: { label: "Morning", emoji: "🌅", time: "7-9 AM" },
  afternoon: { label: "Afternoon", emoji: "☀️", time: "12-2 PM" },
  evening: { label: "Evening", emoji: "🌆", time: "6-7 PM" },
  bedtime: { label: "Bedtime", emoji: "🌙", time: "9-10 PM" },
};

export default function SupplementSchedule() {
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState<TimeSlot>("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setCurrentTime("morning");
    else if (hour < 16) setCurrentTime("afternoon");
    else if (hour < 20) setCurrentTime("evening");
    else setCurrentTime("bedtime");
  }, []);

  // Show only current time slot by default
  const currentSupps = SCHEDULE.filter((s) => s.time === currentTime);

  if (!expanded) {
    return (
      <div className="p-3 rounded-xl bg-[#fdf2f5]/50 border border-[#f0e3e8] mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{TIME_LABELS[currentTime].emoji}</span>
            <div>
              <p className="text-[10px] font-bold text-[#4a3f44]">
                {TIME_LABELS[currentTime].label} Supplements ({TIME_LABELS[currentTime].time})
              </p>
              <p className="text-[9px] text-[#7b6870]">
                {currentSupps.map((s) => s.name).join(", ")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="text-[9px] text-[#d8a7b5] font-medium"
          >
            Full Schedule →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-[#fdf2f5]/50 border border-[#f0e3e8] mb-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-[#4a3f44]">📋 Daily Supplement Schedule</h4>
        <button onClick={() => setExpanded(false)} className="text-[9px] text-[#b98fa1]">Collapse</button>
      </div>

      {(["morning", "afternoon", "evening", "bedtime"] as TimeSlot[]).map((slot) => {
        const supps = SCHEDULE.filter((s) => s.time === slot);
        const isCurrent = slot === currentTime;

        return (
          <div key={slot} className={`mb-3 p-2 rounded-lg ${isCurrent ? "bg-white/60 border border-[#d8a7b5]/30" : ""}`}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs">{TIME_LABELS[slot].emoji}</span>
              <span className="text-[10px] font-bold text-[#4a3f44]">{TIME_LABELS[slot].label}</span>
              <span className="text-[8px] text-[#b98fa1]">({TIME_LABELS[slot].time})</span>
              {isCurrent && <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#d8a7b5] text-white font-bold ml-1">NOW</span>}
            </div>
            <div className="flex flex-wrap gap-1">
              {supps.map((s) => (
                <span key={s.name} className="text-[9px] px-2 py-0.5 rounded-full bg-white border border-[#f0e3e8] text-[#4a3f44]" title={s.note}>
                  {s.icon} {s.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      <p className="text-[8px] text-[#b98fa1] italic mt-2">
        💡 Spacing supplements throughout the day improves absorption. Iron and calcium should be taken 2+ hours apart.
      </p>
    </div>
  );
}
