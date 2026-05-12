"use client";

import { useEffect, useMemo, useState } from "react";

type DayData = {
  date: string;
  cycleDay?: number;
  phase?: string;
  isFertile?: boolean;
  isOvulation?: boolean;
  hasCheckin?: boolean;
  hasSession?: boolean;
  intimacy?: boolean;
  bbt?: number;
};

/**
 * Monthly fertility calendar showing cycle phases, fertile window,
 * completed activities, and intimacy timing at a glance.
 */
export default function FertilityCalendar() {
  const [days, setDays] = useState<DayData[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    buildCalendar();
  }, [month, year]);

  function buildCalendar() {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      const checkinHistory = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
      const intimacyLog = JSON.parse(localStorage.getItem("intimacyLog") || "[]");

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const result: DayData[] = [];

      for (let d = 1; d <= lastDay.getDate(); d++) {
        const date = new Date(year, month, d);
        const dateStr = date.toISOString().split("T")[0];
        const dayData: DayData = { date: dateStr };

        // Cycle info
        if (cycleData.lastPeriodStart) {
          const start = new Date(cycleData.lastPeriodStart);
          const cycleLength = cycleData.cycleLength || 28;
          const periodLength = cycleData.periodLength || 5;
          const ovDay = cycleLength - 14;

          const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          const cycleDay = (diff % cycleLength) + 1;
          dayData.cycleDay = cycleDay > 0 ? cycleDay : undefined;

          if (cycleDay > 0 && cycleDay <= periodLength) dayData.phase = "menstrual";
          else if (cycleDay > 0 && cycleDay < ovDay - 2) dayData.phase = "follicular";
          else if (cycleDay >= ovDay - 2 && cycleDay <= ovDay + 1) dayData.phase = "ovulation";
          else if (cycleDay > 0) dayData.phase = "luteal";

          dayData.isFertile = cycleDay >= ovDay - 5 && cycleDay <= ovDay + 1;
          dayData.isOvulation = cycleDay === ovDay;
        }

        // Check-in
        dayData.hasCheckin = checkinHistory.some((e: { date: string }) => e.date.startsWith(dateStr));

        // Intimacy
        dayData.intimacy = intimacyLog.includes(dateStr);

        // BBT
        if (cycleData.bbtEntries) {
          const bbtEntry = cycleData.bbtEntries.find((e: { date: string }) => e.date === dateStr);
          if (bbtEntry) dayData.bbt = bbtEntry.temperature;
        }

        result.push(dayData);
      }

      setDays(result);
    } catch {
      setDays([]);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Pad start of month to align with day of week
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun
  const paddingDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Mon=0

  const phaseColors: Record<string, string> = {
    menstrual: "bg-red-100 border-red-200",
    follicular: "bg-green-50 border-green-100",
    ovulation: "bg-amber-100 border-amber-200",
    luteal: "bg-purple-50 border-purple-100",
  };

  return (
    <section className="soft-card p-5 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); }}
          className="text-[#5a7570] hover:text-[#2d5a52] px-2"
        >
          ←
        </button>
        <h3 className="text-sm font-bold text-[#4a3f44]">
          📅 {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); }}
          className="text-[#5a7570] hover:text-[#2d5a52] px-2"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-[8px] text-[#b98fa1] font-bold">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Padding */}
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const isToday = day.date === today;
          const phaseClass = day.phase ? phaseColors[day.phase] : "bg-white/40 border-[#f0e3e8]";

          return (
            <div
              key={day.date}
              className={`aspect-square rounded-lg border flex flex-col items-center justify-center relative ${phaseClass} ${isToday ? "ring-2 ring-[#5ba89d]" : ""}`}
              title={`${day.date}${day.cycleDay ? ` • CD${day.cycleDay}` : ""}${day.bbt ? ` • ${day.bbt}°C` : ""}`}
            >
              <span className={`text-[9px] ${isToday ? "font-bold text-[#2d5a52]" : "text-[#5a7570]"}`}>
                {new Date(day.date).getDate()}
              </span>

              {/* Indicators */}
              <div className="flex gap-0.5 mt-0.5">
                {day.isOvulation && <span className="text-[6px]">🥚</span>}
                {day.intimacy && <span className="text-[6px]">💕</span>}
                {day.hasCheckin && <span className="w-1 h-1 rounded-full bg-[#5ba89d]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-3 text-[8px] text-[#7b6870]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-100 border border-red-200" /> Period</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-50 border border-green-100" /> Follicular</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-100 border border-amber-200" /> Fertile</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-50 border border-purple-100" /> Luteal</span>
        <span>🥚 Ovulation</span>
        <span>💕 Intimacy</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#5ba89d]" /> Check-in</span>
      </div>
    </section>
  );
}
