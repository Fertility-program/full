"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FertilityCalendar from "@/components/FertilityCalendar";
import {
  loadCycleData,
  saveCycleData,
  getCycleDay,
  getPhase,
  getFertileWindow,
  getTWWStatus,
  PHASE_INFO,
  TWW_TIPS,
  type CycleData,
  type BBTEntry,
  type OPKEntry,
} from "@/lib/cycle-tracker";

type Tab = "overview" | "bbt" | "opk" | "history";

export default function CycleTrackerPage() {
  const [data, setData] = useState<CycleData | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [setupMode, setSetupMode] = useState(false);

  // Setup form
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLen, setCycleLen] = useState(28);
  const [periodLen, setPeriodLen] = useState(5);

  // BBT form
  const [bbtTemp, setBbtTemp] = useState("");
  const [bbtNote, setBbtNote] = useState("");

  // OPK form
  const [opkResult, setOpkResult] = useState<"negative" | "low" | "high" | "peak">("negative");
  const [opkNote, setOpkNote] = useState("");

  useEffect(() => {
    const loaded = loadCycleData();
    setData(loaded);
    if (!loaded.lastPeriodStart) setSetupMode(true);
    else {
      setLastPeriod(loaded.lastPeriodStart);
      setCycleLen(loaded.cycleLength);
      setPeriodLen(loaded.periodLength);
    }
  }, []);

  function saveSetup() {
    if (!lastPeriod) return;
    const updated: CycleData = {
      ...(data || { bbtEntries: [], opkEntries: [], history: [] }),
      lastPeriodStart: lastPeriod,
      cycleLength: cycleLen,
      periodLength: periodLen,
    };
    saveCycleData(updated);
    setData(updated);
    setSetupMode(false);
  }

  function logBBT() {
    if (!bbtTemp || !data) return;
    const entry: BBTEntry = {
      date: new Date().toISOString().split("T")[0],
      temperature: parseFloat(bbtTemp),
      note: bbtNote || undefined,
    };
    const updated = { ...data, bbtEntries: [...data.bbtEntries.filter(e => e.date !== entry.date), entry] };
    saveCycleData(updated);
    setData(updated);
    setBbtTemp("");
    setBbtNote("");
  }

  function logOPK() {
    if (!data) return;
    const entry: OPKEntry = {
      date: new Date().toISOString().split("T")[0],
      result: opkResult,
      note: opkNote || undefined,
    };
    const updated = { ...data, opkEntries: [...data.opkEntries.filter(e => e.date !== entry.date), entry] };
    saveCycleData(updated);
    setData(updated);
    setOpkNote("");
  }

  function logNewPeriod() {
    if (!data) return;
    const today = new Date().toISOString().split("T")[0];
    const prevCycleLength = data.lastPeriodStart
      ? Math.floor((new Date(today).getTime() - new Date(data.lastPeriodStart).getTime()) / (1000 * 60 * 60 * 24))
      : data.cycleLength;

    const updated: CycleData = {
      ...data,
      lastPeriodStart: today,
      history: [...data.history, { startDate: data.lastPeriodStart, length: prevCycleLength }].slice(-12),
      bbtEntries: [],
      opkEntries: [],
    };
    saveCycleData(updated);
    setData(updated);
  }

  const cycleDay = useMemo(() => data?.lastPeriodStart ? getCycleDay(data.lastPeriodStart) : 0, [data]);
  const phase = useMemo(() => data ? getPhase(cycleDay, data.cycleLength, data.periodLength) : "follicular", [cycleDay, data]);
  const fertileWindow = useMemo(() => data?.lastPeriodStart ? getFertileWindow(data.lastPeriodStart, data.cycleLength) : null, [data]);
  const tww = useMemo(() => data?.lastPeriodStart ? getTWWStatus(data.lastPeriodStart, data.cycleLength) : null, [data]);
  const phaseInfo = PHASE_INFO[phase];

  if (!data || setupMode) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10">
        <section className="soft-card p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">📅</div>
            <h1 className="text-3xl text-[#2d5a52]">Set Up Cycle Tracker</h1>
            <p className="text-sm text-[#5a7570] mt-2">Tell us about your cycle to predict your fertile window.</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-[#5ba89d] mb-2 font-bold uppercase tracking-widest">First Day of Last Period</label>
              <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)}
                className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" />
            </div>
            <div>
              <label className="block text-sm text-[#5ba89d] mb-2 font-bold uppercase tracking-widest">Average Cycle Length (days)</label>
              <input type="number" value={cycleLen} onChange={(e) => setCycleLen(Number(e.target.value))}
                min={21} max={45} className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" />
              <p className="text-[10px] text-[#6aab9f] mt-1">Most cycles are 25-35 days. Average is 28.</p>
            </div>
            <div>
              <label className="block text-sm text-[#5ba89d] mb-2 font-bold uppercase tracking-widest">Period Length (days)</label>
              <input type="number" value={periodLen} onChange={(e) => setPeriodLen(Number(e.target.value))}
                min={2} max={10} className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" />
            </div>
            <button onClick={saveSetup} className="btn-primary w-full py-4">Save & Start Tracking</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-6">
      {/* PHASE BANNER */}
      <section className="soft-card p-6 mb-4 border-l-4" style={{ borderLeftColor: phaseInfo.color }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{phaseInfo.emoji}</span>
              <h1 className="text-2xl text-[#2d5a52]">{phaseInfo.name}</h1>
            </div>
            <p className="text-sm text-[#5a7570]">{phaseInfo.description}</p>
            <p className="text-xs text-[#6aab9f] mt-1 font-bold">Cycle Day {cycleDay}</p>
          </div>
          <div className="text-center shrink-0">
            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold text-[#2d5a52]" style={{ borderColor: phaseInfo.color }}>
              {cycleDay}
            </div>
            <p className="text-[9px] text-[#5a7570] mt-1">of {data.cycleLength}</p>
          </div>
        </div>
      </section>

      {/* FERTILE WINDOW STATUS */}
      {fertileWindow && (
        <section className="soft-card p-5 mb-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-[9px] uppercase tracking-widest text-[#6aab9f] font-bold">Ovulation</p>
              <p className="text-lg font-bold text-[#2d5a52]">
                {fertileWindow.daysUntilOvulation > 0 ? `in ${fertileWindow.daysUntilOvulation}d` : fertileWindow.daysUntilOvulation === 0 ? "Today!" : `${Math.abs(fertileWindow.daysUntilOvulation)}d ago`}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-[9px] uppercase tracking-widest text-[#6aab9f] font-bold">Fertile Window</p>
              <p className="text-lg font-bold text-[#2d5a52]">
                {new Date() >= new Date(fertileWindow.start) && new Date() <= new Date(fertileWindow.end) ? "🟢 NOW" : fertileWindow.daysUntilOvulation > 5 ? `in ${fertileWindow.daysUntilOvulation - 5}d` : "Passed"}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-[9px] uppercase tracking-widest text-[#6aab9f] font-bold">Next Period</p>
              <p className="text-lg font-bold text-[#2d5a52]">
                {fertileWindow.daysUntilPeriod > 0 ? `in ${fertileWindow.daysUntilPeriod}d` : "Due"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TWW SECTION */}
      {tww && tww.isInTWW && (
        <section className="soft-card p-5 mb-4 border-l-4 border-l-purple-300 bg-purple-50/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🤞</span>
            <h2 className="text-lg text-[#2d5a52]">Two Week Wait — {tww.dpo} DPO</h2>
          </div>
          <p className="text-sm text-[#5a7570] mb-2">{TWW_TIPS[tww.dpo] || "Stay positive and take care of yourself."}</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: `${(tww.dpo / 14) * 100}%` }} />
            </div>
            <span className="text-xs text-purple-600 font-bold shrink-0">Test: {tww.daysUntilTest}d</span>
          </div>
        </section>
      )}

      {/* PHASE TIPS */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3 uppercase tracking-widest">Tips for {phaseInfo.name}</h3>
        <div className="space-y-2">
          {phaseInfo.tips.map((tip) => (
            <div key={tip} className="flex items-start gap-2 text-sm text-[#3a5550]">
              <span className="text-[#5ba89d] shrink-0">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {([["overview", "📅 Overview"], ["bbt", "🌡️ BBT"], ["opk", "🧪 OPK"], ["history", "📊 History"]] as [Tab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${tab === id ? "bg-[#5ba89d] text-white" : "bg-white/60 border border-[#c2ddd8] text-[#5a7570]"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {tab === "overview" && (
        <section className="soft-card p-5">
          <h3 className="text-lg text-[#2d5a52] mb-4">Cycle Calendar</h3>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-[9px] text-[#6aab9f] font-bold">{d}</div>
            ))}
            {Array.from({ length: data.cycleLength }, (_, i) => {
              const day = i + 1;
              const dayPhase = getPhase(day, data.cycleLength, data.periodLength);
              const ovDay = data.cycleLength - 14;
              const isFertile = day >= ovDay - 5 && day <= ovDay + 1;
              const isOv = day === ovDay;
              const isToday = day === cycleDay;

              return (
                <div key={day} className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-medium relative
                  ${isToday ? "ring-2 ring-[#5ba89d] ring-offset-1" : ""}
                  ${dayPhase === "menstrual" ? "bg-red-100 text-red-600" : ""}
                  ${dayPhase === "follicular" ? "bg-green-50 text-green-600" : ""}
                  ${dayPhase === "ovulation" ? "bg-orange-100 text-orange-600" : ""}
                  ${dayPhase === "luteal" ? "bg-purple-50 text-purple-600" : ""}
                  ${isFertile && dayPhase !== "menstrual" ? "border-2 border-orange-300" : ""}
                `}>
                  {day}
                  {isOv && <span className="absolute -top-1 -right-1 text-[8px]">🥚</span>}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 text-[9px]">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100" /> Menstrual</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-50 border border-green-200" /> Follicular</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-100" /> Ovulation</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-50 border border-purple-200" /> Luteal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-orange-300" /> Fertile</span>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={logNewPeriod} className="btn-primary text-xs px-4 py-2">🩸 Log Period Started</button>
            <button onClick={() => setSetupMode(true)} className="btn-outline text-xs px-4 py-2">⚙️ Edit Settings</button>
          </div>
        </section>
      )}

      {tab === "bbt" && (
        <section className="soft-card p-5">
          <h3 className="text-lg text-[#2d5a52] mb-2">Basal Body Temperature</h3>
          <p className="text-xs text-[#5a7570] mb-4">Take your temperature every morning before getting out of bed. A sustained rise of 0.2°C+ confirms ovulation.</p>

          <div className="flex gap-3 mb-4">
            <input type="number" step="0.01" value={bbtTemp} onChange={(e) => setBbtTemp(e.target.value)}
              placeholder="36.5" className="flex-1 p-3 rounded-xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-sm" />
            <input type="text" value={bbtNote} onChange={(e) => setBbtNote(e.target.value)}
              placeholder="Note (optional)" className="flex-1 p-3 rounded-xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-sm" />
            <button onClick={logBBT} className="btn-primary px-4 text-xs shrink-0">Log</button>
          </div>

          {/* BBT Chart */}
          {data.bbtEntries.length > 0 && (
            <div className="p-4 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <div className="flex items-end gap-1 h-32">
                {data.bbtEntries.slice(-14).map((entry) => {
                  const min = 36.0;
                  const max = 37.2;
                  const height = ((entry.temperature - min) / (max - min)) * 100;
                  return (
                    <div key={entry.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-[#5a7570]">{entry.temperature.toFixed(1)}</span>
                      <div className="w-full rounded-t" style={{ height: `${Math.max(5, height)}%`, background: entry.temperature >= 36.5 ? "#5ba89d" : "#c2ddd8" }} />
                      <span className="text-[7px] text-[#6aab9f]">{entry.date.slice(8)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[8px] text-[#6aab9f] mt-2 border-t border-[#c2ddd8] pt-1">
                <span>36.0°C</span>
                <span className="text-[#5ba89d] font-bold">— Ovulation shift line (36.4-36.5°C) —</span>
                <span>37.2°C</span>
              </div>
            </div>
          )}
        </section>
      )}

      {tab === "opk" && (
        <section className="soft-card p-5">
          <h3 className="text-lg text-[#2d5a52] mb-2">Ovulation Test (OPK) Log</h3>
          <p className="text-xs text-[#5a7570] mb-4">Log your daily OPK results. A &quot;Peak&quot; result means ovulation is likely within 24-36 hours.</p>

          <div className="flex gap-2 mb-4">
            {(["negative", "low", "high", "peak"] as const).map((r) => (
              <button key={r} onClick={() => setOpkResult(r)}
                className={`flex-1 py-3 rounded-xl border text-xs font-medium capitalize ${opkResult === r
                  ? r === "peak" ? "bg-orange-100 border-orange-400 text-orange-700"
                    : r === "high" ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                    : "bg-[#f0faf8] border-[#5ba89d] text-[#2d5a52]"
                  : "bg-white border-[#c2ddd8] text-[#5a7570]"}`}>
                {r === "peak" ? "🥚 Peak" : r === "high" ? "📈 High" : r === "low" ? "📊 Low" : "➖ Neg"}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mb-4">
            <input type="text" value={opkNote} onChange={(e) => setOpkNote(e.target.value)}
              placeholder="Note (optional)" className="flex-1 p-3 rounded-xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-sm" />
            <button onClick={logOPK} className="btn-primary px-6 text-xs">Log OPK</button>
          </div>

          {data.opkEntries.length > 0 && (
            <div className="space-y-2">
              {[...data.opkEntries].reverse().slice(0, 10).map((entry) => (
                <div key={entry.date} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
                  <span className="text-xs text-[#5a7570] w-20">{entry.date.slice(5)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    entry.result === "peak" ? "bg-orange-100 text-orange-600" :
                    entry.result === "high" ? "bg-yellow-50 text-yellow-600" :
                    entry.result === "low" ? "bg-blue-50 text-blue-600" :
                    "bg-gray-50 text-gray-500"
                  }`}>{entry.result}</span>
                  {entry.note && <span className="text-[10px] text-[#5a7570] italic">{entry.note}</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "history" && (
        <section className="soft-card p-5">
          <h3 className="text-lg text-[#2d5a52] mb-4">Cycle History</h3>
          {data.history.length === 0 ? (
            <p className="text-sm text-[#5a7570] italic">No previous cycles logged yet. Log your next period to start building history.</p>
          ) : (
            <div className="space-y-2">
              {[...data.history].reverse().map((cycle, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
                  <span className="text-sm text-[#2d5a52]">{cycle.startDate}</span>
                  <span className="text-sm font-bold text-[#5ba89d]">{cycle.length} days</span>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] text-center">
                <p className="text-xs text-[#5a7570]">Average cycle: <span className="font-bold text-[#2d5a52]">{Math.round(data.history.reduce((s, c) => s + (c.length || 28), 0) / data.history.length)} days</span></p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* FERTILITY CALENDAR */}
      <FertilityCalendar />

      {/* PARTNER SYNC */}
      <section className="soft-card p-5 mb-4 border-l-4 border-l-[#5ba89d]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💑</span>
            <h3 className="text-sm font-bold text-[#2d5a52]">Share with Partner</h3>
          </div>
          <Link href="/partner" className="text-[10px] px-3 py-1.5 rounded-full bg-[#f0faf8] text-[#5ba89d] font-medium border border-[#c2ddd8]">
            His Dashboard →
          </Link>
        </div>
        {fertileWindow && (
          <div className="space-y-2">
            <div className={`p-3 rounded-xl border ${
              fertileWindow.daysUntilOvulation >= -1 && fertileWindow.daysUntilOvulation <= 5
                ? "bg-amber-50 border-amber-200"
                : "bg-white/60 border-[#c2ddd8]"
            }`}>
              <p className="text-xs text-[#2d5a52]">
                {fertileWindow.daysUntilOvulation >= -1 && fertileWindow.daysUntilOvulation <= 5
                  ? "🎯 Fertile window is active — your partner can see this on his dashboard."
                  : fertileWindow.daysUntilOvulation > 5
                  ? `📅 Fertile window starts in ${fertileWindow.daysUntilOvulation - 5} days. He should optimize habits now.`
                  : "⏳ Waiting for next cycle. Both focus on building healthy habits."}
              </p>
            </div>
            <p className="text-[9px] text-[#6aab9f] italic">
              💡 Your cycle data is automatically synced to his Partner Dashboard when you&apos;re linked in Couple Mode.
            </p>
          </div>
        )}
      </section>

      {/* NAV */}
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Link href="/dashboard" className="btn-outline text-xs px-4 py-2">Dashboard</Link>
        <Link href="/partner" className="btn-outline text-xs px-4 py-2">Partner</Link>
        <Link href="/doctor-report" className="btn-outline text-xs px-4 py-2">Doctor Report</Link>
        <Link href="/supplements" className="btn-outline text-xs px-4 py-2">Supplements</Link>
        <Link href="/checkin" className="btn-outline text-xs px-4 py-2">Daily Check-In</Link>
      </div>
    </main>
  );
}
