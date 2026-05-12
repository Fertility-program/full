"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BBTEntry = { date: string; temperature: number };

/**
 * Mini BBT chart for the dashboard — shows last 14 days of temperature data
 * with ovulation shift detection.
 */
export default function BBTMiniChart() {
  const [entries, setEntries] = useState<BBTEntry[]>([]);
  const [shiftDay, setShiftDay] = useState<number | null>(null);

  useEffect(() => {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      if (cycleData.bbtEntries && cycleData.bbtEntries.length >= 3) {
        const sorted = [...cycleData.bbtEntries]
          .sort((a: BBTEntry, b: BBTEntry) => a.date.localeCompare(b.date))
          .slice(-14); // Last 14 days
        setEntries(sorted);

        // Detect temperature shift (ovulation confirmation)
        if (sorted.length >= 6) {
          for (let i = 3; i < sorted.length - 2; i++) {
            const before = sorted.slice(Math.max(0, i - 6), i);
            const after = sorted.slice(i, i + 3);
            if (before.length >= 3 && after.length >= 3) {
              const avgBefore = before.reduce((s, e) => s + e.temperature, 0) / before.length;
              const avgAfter = after.reduce((s, e) => s + e.temperature, 0) / after.length;
              if (avgAfter - avgBefore >= 0.2) {
                setShiftDay(i);
                break;
              }
            }
          }
        }
      }
    } catch {}
  }, []);

  if (entries.length < 3) return null;

  const temps = entries.map((e) => e.temperature);
  const minTemp = Math.min(...temps) - 0.1;
  const maxTemp = Math.max(...temps) + 0.1;
  const range = maxTemp - minTemp;

  return (
    <section className="soft-card p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">🌡️</span>
          <h3 className="text-xs font-bold text-[#4a3f44]">BBT Chart (Last {entries.length} days)</h3>
        </div>
        <Link href="/cycle" className="text-[9px] text-[#5ba89d] font-medium">Full Chart →</Link>
      </div>

      {/* Mini chart */}
      <div className="h-16 flex items-end gap-0.5 relative">
        {/* Coverline (average of pre-shift temps) */}
        {shiftDay !== null && (
          <div
            className="absolute left-0 right-0 border-t border-dashed border-[#d8a7b5]/50"
            style={{ bottom: `${((entries.slice(0, shiftDay).reduce((s, e) => s + e.temperature, 0) / shiftDay - minTemp) / range) * 100}%` }}
          />
        )}

        {entries.map((entry, i) => {
          const height = ((entry.temperature - minTemp) / range) * 100;
          const isShift = shiftDay !== null && i >= shiftDay;

          return (
            <div
              key={entry.date}
              className="flex-1 flex flex-col items-center justify-end"
              title={`${entry.date}: ${entry.temperature}°C`}
            >
              <div
                className={`w-full max-w-[8px] rounded-full transition-all ${
                  isShift ? "bg-[#d8a7b5]" : "bg-[#c2ddd8]"
                }`}
                style={{ height: `${Math.max(height, 10)}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 text-[8px] text-[#7b6870]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#c2ddd8]" /> Pre-ovulation</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d8a7b5]" /> Post-ovulation</span>
        {shiftDay !== null && <span className="text-[#5ba89d] font-medium">✓ Shift detected</span>}
      </div>
    </section>
  );
}
