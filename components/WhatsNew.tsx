"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const UPDATES = [
  {
    version: "2.5",
    date: "May 2025",
    items: [
      { icon: "💑", text: "Couple Mode — link accounts, share progress, earn achievements together" },
      { icon: "👨", text: "His Fertility Dashboard — 74-day sperm program, spermiogram tracker" },
      { icon: "🏥", text: "Clinic Partnership — access codes for fertility clinic patients" },
      { icon: "💊", text: "Medication Tracker — reminders for Letrozole, Clomid, Progesterone & more" },
      { icon: "🎯", text: "Fertile Window Countdown — always know where you are in your cycle" },
      { icon: "💕", text: "Intimacy Tracker — discreet logging during fertile window" },
      { icon: "📊", text: "Enhanced AI Insights — cycle-aware, partner-aware personalized tips" },
    ],
  },
  {
    version: "2.0",
    date: "April 2025",
    items: [
      { icon: "📅", text: "Cycle Tracker — BBT, OPK, fertile window prediction" },
      { icon: "🥗", text: "Fertility Nutrition — 32+ recipes, auto shopping lists" },
      { icon: "🧘‍♀️", text: "Cycle-synced exercises — adapts to your phase" },
      { icon: "📱", text: "PWA — install as app, works offline" },
    ],
  },
];

export default function WhatsNew() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem("whatsNewSeen");
    const currentVersion = UPDATES[0].version;
    if (lastSeen !== currentVersion) {
      // Show after 5 seconds on dashboard
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("whatsNewSeen", UPDATES[0].version);
    setDismissed(true);
    setTimeout(() => setShow(false), 300);
  }

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity ${dismissed ? "opacity-0" : "opacity-100"}`}>
      <div className="soft-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
        <button onClick={dismiss} className="absolute top-4 right-4 text-[#5a7570] hover:text-[#2d5a52] text-lg" aria-label="Close">✕</button>

        <div className="text-center mb-4">
          <span className="text-3xl">🆕</span>
          <h2 className="text-xl text-[#2d5a52] mt-2">What&apos;s New</h2>
          <p className="text-xs text-[#5a7570]">Latest updates to your fertility program</p>
        </div>

        {UPDATES.map((update) => (
          <div key={update.version} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5ba89d]/10 text-[#5ba89d] font-bold">v{update.version}</span>
              <span className="text-[10px] text-[#5a7570]">{update.date}</span>
            </div>
            <div className="space-y-1.5">
              {update.items.map((item) => (
                <div key={item.text} className="flex items-start gap-2 text-xs text-[#3a5550]">
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-4">
          <button onClick={dismiss} className="flex-1 btn-primary py-2.5 text-sm">Got it!</button>
          <Link href="/partner" onClick={dismiss} className="btn-outline px-4 py-2.5 text-xs">Try Couple Mode →</Link>
        </div>
      </div>
    </div>
  );
}
