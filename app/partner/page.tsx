"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { playComplete } from "@/lib/sounds";

type PartnerChecklist = Record<string, boolean>;

const DAILY_HABITS = [
  { id: "supplements", icon: "💊", label: "Take supplements (Zinc, CoQ10, D3, Omega-3)", time: "Morning" },
  { id: "water", icon: "💧", label: "Drink 2.5L+ water", time: "Throughout day" },
  { id: "exercise", icon: "🏃", label: "30 min moderate exercise", time: "Any time" },
  { id: "sleep", icon: "😴", label: "7-8 hours sleep (no screens 30min before)", time: "Evening" },
  { id: "no_alcohol", icon: "🚫", label: "No alcohol today", time: "All day" },
  { id: "cold_shower", icon: "🚿", label: "Cool shower (avoid hot baths/saunas)", time: "Any time" },
  { id: "boxers", icon: "👖", label: "Loose underwear (boxers, not briefs)", time: "All day" },
  { id: "no_laptop", icon: "💻", label: "No laptop on lap", time: "All day" },
];

const AVOID_LIST = [
  { icon: "🔥", text: "Hot tubs, saunas, heated car seats", why: "Heat kills sperm. Scrotal temp should be 2-3°C below body temp." },
  { icon: "🍺", text: "More than 3 drinks/week", why: "Alcohol reduces testosterone and sperm quality dose-dependently." },
  { icon: "🚬", text: "Smoking & cannabis", why: "Directly damages sperm DNA. Effects reverse after 3 months of quitting." },
  { icon: "🏋️", text: "Extreme endurance exercise", why: "Over-training raises cortisol and lowers testosterone. Moderate is best." },
  { icon: "💊", text: "Anabolic steroids / testosterone", why: "Shuts down natural sperm production completely. Can take 6-12 months to recover." },
  { icon: "🧴", text: "BPA plastics & parabens", why: "Endocrine disruptors. Use glass containers, avoid plastic water bottles." },
];

const SUPPLEMENTS_MALE = [
  { name: "Zinc", dose: "30mg", icon: "🛡️", why: "Sperm count +74%" },
  { name: "CoQ10", dose: "200mg", icon: "⚡", why: "Motility boost" },
  { name: "Vitamin D3", dose: "3000 IU", icon: "☀️", why: "Testosterone support" },
  { name: "Omega-3 DHA", dose: "1000mg", icon: "🐟", why: "Sperm membrane health" },
  { name: "Selenium", dose: "100mcg", icon: "🥜", why: "DNA protection" },
  { name: "L-Carnitine", dose: "1500mg", icon: "🔥", why: "Sperm energy" },
  { name: "Vitamin C", dose: "500mg", icon: "🍊", why: "Antioxidant shield" },
  { name: "Folate", dose: "400mcg", icon: "🌿", why: "DNA synthesis" },
];

export default function PartnerPage() {
  const [checklist, setChecklist] = useState<PartnerChecklist>({});
  const [suppChecklist, setSuppChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`partner_habits_${today}`);
    const savedSupps = localStorage.getItem(`partner_supps_${today}`);
    if (saved) try { setChecklist(JSON.parse(saved)); } catch {}
    if (savedSupps) try { setSuppChecklist(JSON.parse(savedSupps)); } catch {}
  }, []);

  function toggleHabit(id: string) {
    const today = new Date().toISOString().split("T")[0];
    const next = { ...checklist, [id]: !checklist[id] };
    if (!checklist[id]) playComplete();
    setChecklist(next);
    localStorage.setItem(`partner_habits_${today}`, JSON.stringify(next));
  }

  function toggleSupp(name: string) {
    const today = new Date().toISOString().split("T")[0];
    const next = { ...suppChecklist, [name]: !suppChecklist[name] };
    if (!suppChecklist[name]) playComplete();
    setSuppChecklist(next);
    localStorage.setItem(`partner_supps_${today}`, JSON.stringify(next));
  }

  const habitsCompleted = Object.values(checklist).filter(Boolean).length;
  const suppsCompleted = Object.values(suppChecklist).filter(Boolean).length;

  return (
    <main className="max-w-3xl mx-auto px-6 py-6">
      {/* HEADER */}
      <section className="soft-card p-6 mb-4 text-center">
        <div className="text-4xl mb-2">👨</div>
        <h1 className="text-3xl text-[#2d5a52] mb-1">His Fertility Dashboard</h1>
        <p className="text-sm text-[#5a7570]">Daily habits and supplements to optimize sperm quality. Results in 2-3 months.</p>
      </section>

      {/* PROGRESS */}
      <section className="soft-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg text-[#2d5a52]">Today&apos;s Progress</h2>
          <span className="text-sm font-bold text-[#5ba89d]">{habitsCompleted + suppsCompleted}/{DAILY_HABITS.length + SUPPLEMENTS_MALE.length}</span>
        </div>
        <div className="h-3 bg-[#f0faf8] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#5ba89d] to-[#3d8a7d] rounded-full transition-all duration-500"
            style={{ width: `${((habitsCompleted + suppsCompleted) / (DAILY_HABITS.length + SUPPLEMENTS_MALE.length)) * 100}%` }} />
        </div>
      </section>

      {/* SUPPLEMENTS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">💊 Daily Supplements</h2>
        <div className="grid grid-cols-2 gap-2">
          {SUPPLEMENTS_MALE.map((supp) => (
            <button key={supp.name} onClick={() => toggleSupp(supp.name)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                suppChecklist[supp.name] ? "bg-green-50 border-green-200 opacity-70" : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
              }`}>
              <span className="text-lg">{suppChecklist[supp.name] ? "✅" : supp.icon}</span>
              <div>
                <p className="text-xs font-medium text-[#2d5a52]">{supp.name}</p>
                <p className="text-[9px] text-[#5a7570]">{supp.dose} • {supp.why}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DAILY HABITS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">✅ Daily Habits</h2>
        <div className="space-y-2">
          {DAILY_HABITS.map((habit) => (
            <button key={habit.id} onClick={() => toggleHabit(habit.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                checklist[habit.id] ? "bg-green-50 border-green-200 opacity-70" : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
              }`}>
              <span className="text-xl">{checklist[habit.id] ? "✅" : habit.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-[#2d5a52]">{habit.label}</p>
                <p className="text-[9px] text-[#6aab9f]">{habit.time}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* WHAT TO AVOID */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">⚠️ What to Avoid</h2>
        <div className="space-y-2">
          {AVOID_LIST.map((item) => (
            <div key={item.text} className="p-3 rounded-xl bg-red-50/30 border border-red-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <p className="text-sm font-medium text-[#2d5a52]">{item.text}</p>
              </div>
              <p className="text-[10px] text-[#5a7570] ml-8 mt-1">{item.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INFO */}
      <section className="soft-card p-5 mb-4 text-center">
        <p className="text-xs text-[#6aab9f] italic">
          🔬 Sperm takes 74 days to develop. Start these habits at least 2-3 months before trying to conceive. Consistency matters more than perfection.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/supplements" className="btn-outline text-xs px-4 py-2">Full Supplement Guide</Link>
        <Link href="/dashboard" className="btn-primary text-xs px-4 py-2">Her Dashboard</Link>
      </div>
    </main>
  );
}
