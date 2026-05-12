"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { playComplete } from "@/lib/sounds";

/**
 * Floating Action Button for quick daily check-in.
 * Shows on dashboard/session pages if user hasn't checked in today.
 * Allows logging sleep/energy/stress in 3 taps without leaving the page.
 */
export default function QuickCheckinFAB() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(6);
  const [stress, setStress] = useState(4);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Only show on dashboard and session pages
    const showPages = ["/dashboard", "/session", "/nutrition", "/supplements"];
    if (!showPages.some((p) => pathname.startsWith(p))) return;

    // Check if already checked in today
    const today = new Date().toISOString().split("T")[0];
    const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
    const todayEntry = history.find((e: { date: string }) => e.date.startsWith(today));

    if (!todayEntry) {
      setShow(true);
    }
  }, [pathname]);

  function quickSave() {
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      sleep,
      energy,
      stress,
      time: "quick",
      symptoms: [],
      date: new Date().toISOString(),
    };

    // Save to history
    try {
      const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
      const filtered = history.filter((e: { date: string }) => !e.date.startsWith(today));
      filtered.push(payload);
      localStorage.setItem("checkinHistory", JSON.stringify(filtered.slice(-90)));
      localStorage.setItem("dailyCheckin", JSON.stringify(payload));
    } catch {}

    playComplete();
    setSaved(true);
    setTimeout(() => { setShow(false); setOpen(false); }, 1500);
  }

  if (!show) return null;

  // Collapsed FAB
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-[#5ba89d] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform lg:hidden"
        aria-label="Quick check-in"
      >
        <span className="text-lg">📝</span>
      </button>
    );
  }

  // Expanded quick check-in
  return (
    <div className="fixed bottom-20 right-4 z-40 w-64 bg-white rounded-2xl shadow-2xl border border-[#c2ddd8] p-4 lg:hidden">
      {saved ? (
        <div className="text-center py-4">
          <span className="text-3xl">✅</span>
          <p className="text-sm text-[#2d5a52] mt-2">Saved!</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#2d5a52]">Quick Check-In</h4>
            <button onClick={() => setOpen(false)} className="text-[#5a7570] text-xs">✕</button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[9px] text-[#5a7570] mb-1">
                <span>😴 Sleep</span>
                <span className="font-bold">{sleep}/10</span>
              </div>
              <input type="range" min={1} max={10} value={sleep} onChange={(e) => setSleep(Number(e.target.value))} className="w-full accent-[#5ba89d] h-1.5" />
            </div>

            <div>
              <div className="flex justify-between text-[9px] text-[#5a7570] mb-1">
                <span>⚡ Energy</span>
                <span className="font-bold">{energy}/10</span>
              </div>
              <input type="range" min={1} max={10} value={energy} onChange={(e) => setEnergy(Number(e.target.value))} className="w-full accent-[#5ba89d] h-1.5" />
            </div>

            <div>
              <div className="flex justify-between text-[9px] text-[#5a7570] mb-1">
                <span>🧠 Stress</span>
                <span className="font-bold">{stress}/10</span>
              </div>
              <input type="range" min={1} max={10} value={stress} onChange={(e) => setStress(Number(e.target.value))} className="w-full accent-[#5ba89d] h-1.5" />
            </div>
          </div>

          <button
            onClick={quickSave}
            className="w-full mt-3 py-2 rounded-xl bg-[#5ba89d] text-white text-xs font-medium"
          >
            Save Quick Check-In
          </button>
        </>
      )}
    </div>
  );
}
