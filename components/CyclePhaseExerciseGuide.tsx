"use client";

import { useEffect, useState } from "react";

type Phase = "menstrual" | "follicular" | "ovulation" | "luteal" | "unknown";

const PHASE_EXERCISE_GUIDE: Record<Exclude<Phase, "unknown">, { intensity: string; color: string; do: string[]; avoid: string[] }> = {
  menstrual: {
    intensity: "Low (30-50% effort)",
    color: "#e57373",
    do: ["Gentle walking", "Restorative yoga", "Light stretching", "Breathing exercises"],
    avoid: ["HIIT", "Heavy weights", "Inversions", "Long runs"],
  },
  follicular: {
    intensity: "High (70-90% effort)",
    color: "#81c784",
    do: ["Strength training", "HIIT (20 min max)", "Dance/cycling", "Core work"],
    avoid: ["Nothing — this is your power phase!", "Just don't overtrain (>60 min intense)"],
  },
  ovulation: {
    intensity: "Moderate (50-70% effort)",
    color: "#ffb74d",
    do: ["Brisk walking", "Swimming", "Yoga flow", "Pelvic floor exercises"],
    avoid: ["Intense HIIT", "Heavy deadlifts", "Marathon training", "Hot yoga"],
  },
  luteal: {
    intensity: "Low-Moderate (40-60% effort)",
    color: "#9575cd",
    do: ["Walking", "Gentle yoga", "Pilates", "Swimming", "Meditation"],
    avoid: ["Intense exercise", "Jarring movements", "Overheating", "Extreme endurance"],
  },
};

export default function CyclePhaseExerciseGuide() {
  const [phase, setPhase] = useState<Phase>("unknown");

  useEffect(() => {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      if (!cycleData.lastPeriodStart) return;

      const start = new Date(cycleData.lastPeriodStart);
      const cycleLength = cycleData.cycleLength || 28;
      const periodLength = cycleData.periodLength || 5;
      const ovDay = cycleLength - 14;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);

      const cycleDay = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      if (cycleDay <= periodLength) setPhase("menstrual");
      else if (cycleDay < ovDay - 2) setPhase("follicular");
      else if (cycleDay >= ovDay - 2 && cycleDay <= ovDay + 1) setPhase("ovulation");
      else setPhase("luteal");
    } catch {}
  }, []);

  if (phase === "unknown") return null;

  const guide = PHASE_EXERCISE_GUIDE[phase];
  const phaseNames: Record<string, string> = {
    menstrual: "Menstrual Phase",
    follicular: "Follicular Phase",
    ovulation: "Ovulation Window",
    luteal: "Luteal Phase",
  };

  return (
    <div className="p-4 rounded-xl border-l-4 mb-4" style={{ borderLeftColor: guide.color, backgroundColor: `${guide.color}08` }}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-[#4a3f44]">
          🧘‍♀️ {phaseNames[phase]} — Exercise Guide
        </h4>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${guide.color}20`, color: guide.color }}>
          {guide.intensity}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-[9px] font-bold text-green-700 mb-1">✓ Do</p>
          {guide.do.map((item) => (
            <p key={item} className="text-[9px] text-[#3a5550]">• {item}</p>
          ))}
        </div>
        <div>
          <p className="text-[9px] font-bold text-red-600 mb-1">✗ Avoid</p>
          {guide.avoid.map((item) => (
            <p key={item} className="text-[9px] text-[#5a7570]">• {item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
