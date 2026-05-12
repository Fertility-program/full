"use client";

import { useEffect, useState } from "react";
import { playComplete } from "@/lib/sounds";

/**
 * Optional, discreet intimacy tracker for the fertile window.
 * Helps couples track timing without being clinical.
 * Only shows during fertile window (cycle days around ovulation).
 */
export default function IntimacyTracker() {
  const [show, setShow] = useState(false);
  const [entries, setEntries] = useState<string[]>([]);
  const [fertileStart, setFertileStart] = useState("");
  const [fertileEnd, setFertileEnd] = useState("");

  useEffect(() => {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      if (!cycleData.lastPeriodStart) return;

      const start = new Date(cycleData.lastPeriodStart);
      const cycleLength = cycleData.cycleLength || 28;
      const ovDay = cycleLength - 14;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);

      const cycleDay = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Show only during fertile window (5 days before ovulation to 2 days after)
      if (cycleDay >= ovDay - 5 && cycleDay <= ovDay + 2) {
        setShow(true);

        const fStart = new Date(start);
        fStart.setDate(fStart.getDate() + ovDay - 6);
        const fEnd = new Date(start);
        fEnd.setDate(fEnd.getDate() + ovDay + 1);
        setFertileStart(fStart.toISOString().split("T")[0]);
        setFertileEnd(fEnd.toISOString().split("T")[0]);
      }

      // Load entries
      const saved = localStorage.getItem("intimacyLog");
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
  }, []);

  function logToday() {
    const today = new Date().toISOString().split("T")[0];
    if (entries.includes(today)) return;
    const next = [...entries, today];
    setEntries(next);
    localStorage.setItem("intimacyLog", JSON.stringify(next));
    playComplete();
  }

  function removeToday() {
    const today = new Date().toISOString().split("T")[0];
    const next = entries.filter((d) => d !== today);
    setEntries(next);
    localStorage.setItem("intimacyLog", JSON.stringify(next));
  }

  if (!show) return null;

  const today = new Date().toISOString().split("T")[0];
  const loggedToday = entries.includes(today);

  // Count entries in current fertile window
  const windowEntries = entries.filter((d) => d >= fertileStart && d <= fertileEnd);

  return (
    <section className="soft-card p-4 mb-4 border-l-4 border-l-pink-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">💕</span>
          <div>
            <p className="text-sm font-medium text-[#4a3f44]">Fertile Window Active</p>
            <p className="text-[9px] text-[#7b6870]">
              {windowEntries.length > 0
                ? `${windowEntries.length} time${windowEntries.length > 1 ? "s" : ""} this window`
                : "Log intimacy to track timing"}
            </p>
          </div>
        </div>
        <button
          onClick={loggedToday ? removeToday : logToday}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            loggedToday
              ? "bg-pink-100 text-pink-700 border border-pink-200"
              : "bg-[#d8a7b5] text-white hover:bg-[#c58d9d]"
          }`}
        >
          {loggedToday ? "✓ Logged" : "+ Log Today"}
        </button>
      </div>

      {windowEntries.length >= 3 && (
        <p className="text-[9px] text-green-600 mt-2 font-medium">
          ✨ Great timing! 3+ times during the fertile window gives you the best chances.
        </p>
      )}
    </section>
  );
}
