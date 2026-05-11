"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { playComplete } from "@/lib/sounds";
import { createClient } from "@/lib/supabase/client";
import {
  calculateProgramDay,
  getSpermPhase,
  generateCoupleCode,
  COUPLE_ACHIEVEMENTS,
} from "@/lib/couple";
import {
  loadSpermiogramData,
  saveSpermiogramEntry,
  getOverallScore,
  getImprovement,
  getRecommendations,
  getParamStatus,
  SPERMIOGRAM_PARAMS,
  type SpermiogramEntry,
} from "@/lib/spermiogram";
import { getFertileWindow, loadCycleData } from "@/lib/cycle-tracker";

// ============================================================
// TYPES
// ============================================================

type Tab = "dashboard" | "checkin" | "spermiogram" | "exercises" | "nutrition" | "couple";
type PartnerChecklist = Record<string, boolean>;

// ============================================================
// CONSTANTS
// ============================================================

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

const MALE_EXERCISES = [
  {
    id: "kegel",
    name: "Kegel Exercises",
    duration: "5 min",
    icon: "🎯",
    description: "Strengthen pelvic floor. Contract PC muscle for 5s, relax 5s. 3 sets of 10.",
    benefit: "Improves blood flow, erection quality, and ejaculatory control.",
  },
  {
    id: "hip_stretch",
    name: "Hip Flexor Stretch",
    duration: "3 min",
    icon: "🧘",
    description: "Lunge position, push hips forward. Hold 30s each side. 3 reps.",
    benefit: "Improves pelvic circulation and reduces tension.",
  },
  {
    id: "squat",
    name: "Bodyweight Squats",
    duration: "5 min",
    icon: "🦵",
    description: "Feet shoulder-width, squat to parallel. 3 sets of 15.",
    benefit: "Boosts testosterone naturally through large muscle activation.",
  },
  {
    id: "bridge",
    name: "Glute Bridge",
    duration: "4 min",
    icon: "🌉",
    description: "Lie on back, feet flat, lift hips. Hold 3s at top. 3 sets of 12.",
    benefit: "Strengthens pelvic floor and improves blood flow to reproductive organs.",
  },
  {
    id: "walk",
    name: "Brisk Walk",
    duration: "20 min",
    icon: "🚶",
    description: "Moderate pace walk outdoors. Keep heart rate at 60-70% max.",
    benefit: "Reduces cortisol, improves circulation without overheating testes.",
  },
  {
    id: "yoga_twist",
    name: "Seated Spinal Twist",
    duration: "3 min",
    icon: "🔄",
    description: "Seated, twist torso gently. Hold 20s each side. 3 reps.",
    benefit: "Stimulates abdominal organs and improves reproductive organ blood flow.",
  },
  {
    id: "breathing",
    name: "Box Breathing",
    duration: "5 min",
    icon: "🌬️",
    description: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 8 cycles.",
    benefit: "Reduces cortisol (stress hormone that suppresses testosterone).",
  },
];

const MALE_NUTRITION = [
  { food: "Oysters", icon: "🦪", nutrient: "Zinc (74mg/serving)", benefit: "Highest zinc food — directly boosts sperm count" },
  { food: "Brazil Nuts (3/day)", icon: "🥜", nutrient: "Selenium (544mcg/nut)", benefit: "Protects sperm DNA from oxidative damage" },
  { food: "Wild Salmon", icon: "🐟", nutrient: "Omega-3 DHA + Astaxanthin", benefit: "Improves sperm membrane fluidity and motility" },
  { food: "Eggs (whole)", icon: "🥚", nutrient: "Vitamin D + Choline + B12", benefit: "Supports testosterone and sperm maturation" },
  { food: "Spinach", icon: "🥬", nutrient: "Folate + Iron + Magnesium", benefit: "Essential for DNA synthesis in new sperm cells" },
  { food: "Walnuts", icon: "🌰", nutrient: "ALA Omega-3 + L-Arginine", benefit: "Improves sperm vitality and morphology" },
  { food: "Pomegranate", icon: "🍎", nutrient: "Antioxidants + Ellagic acid", benefit: "Reduces oxidative stress on sperm by 50%" },
  { food: "Dark Chocolate (85%+)", icon: "🍫", nutrient: "L-Arginine + Zinc", benefit: "Improves blood flow and sperm count" },
  { food: "Pumpkin Seeds", icon: "🎃", nutrient: "Zinc + Magnesium + Omega-3", benefit: "Triple fertility support in one snack" },
  { food: "Garlic", icon: "🧄", nutrient: "Allicin + Selenium", benefit: "Improves blood flow to reproductive organs" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function PartnerPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [checklist, setChecklist] = useState<PartnerChecklist>({});
  const [suppChecklist, setSuppChecklist] = useState<Record<string, boolean>>({});
  const [exercisesDone, setExercisesDone] = useState<Record<string, boolean>>({});
  const [startDate, setStartDate] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [coupleStatus, setCoupleStatus] = useState<"none" | "pending" | "active">("none");
  const [inviteCode, setInviteCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [userName, setUserName] = useState("");

  // Spermiogram state
  const [spermiogramEntries, setSpermiogramEntries] = useState<SpermiogramEntry[]>([]);
  const [showAddSpermiogram, setShowAddSpermiogram] = useState(false);

  // Check-in state
  const [checkinData, setCheckinData] = useState({
    sleep: 7,
    energy: 5,
    stress: 5,
    exercise: false,
    alcohol: false,
    heatExposure: false,
    notes: "",
  });
  const [checkinSaved, setCheckinSaved] = useState(false);

  // Fertile window from her data
  const [fertileWindow, setFertileWindow] = useState<{ start: string; end: string; ovulationDate: string; daysUntilOvulation: number } | null>(null);

  useEffect(() => {
    // Load saved data
    const today = new Date().toISOString().split("T")[0];
    const savedHabits = localStorage.getItem(`partner_habits_${today}`);
    const savedSupps = localStorage.getItem(`partner_supps_${today}`);
    const savedExercises = localStorage.getItem(`partner_exercises_${today}`);
    const savedStart = localStorage.getItem("partnerStartDate");
    const savedCheckin = localStorage.getItem(`partner_checkin_${today}`);

    if (savedHabits) try { setChecklist(JSON.parse(savedHabits)); } catch {}
    if (savedSupps) try { setSuppChecklist(JSON.parse(savedSupps)); } catch {}
    if (savedExercises) try { setExercisesDone(JSON.parse(savedExercises)); } catch {}
    if (savedCheckin) { setCheckinSaved(true); try { setCheckinData(JSON.parse(savedCheckin)); } catch {} }

    if (savedStart) {
      setStartDate(savedStart);
    } else {
      const newStart = today;
      localStorage.setItem("partnerStartDate", newStart);
      setStartDate(newStart);
    }

    // Load spermiogram data
    setSpermiogramEntries(loadSpermiogramData());

    // Load cycle data for fertile window sync
    const cycleData = loadCycleData();
    if (cycleData.lastPeriodStart) {
      const fw = getFertileWindow(cycleData.lastPeriodStart, cycleData.cycleLength);
      setFertileWindow(fw);
    }

    // Load name
    try {
      const qd = JSON.parse(localStorage.getItem("partnerQuizData") || localStorage.getItem("quizData") || "{}");
      if (qd.name) setUserName(qd.name);
    } catch {}

    // Check auth
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.id);
      }
    });
  }, []);

  // 74-day countdown
  const programDay = useMemo(() => calculateProgramDay(startDate), [startDate]);
  const spermPhase = useMemo(() => getSpermPhase(programDay), [programDay]);

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

  function toggleExercise(id: string) {
    const today = new Date().toISOString().split("T")[0];
    const next = { ...exercisesDone, [id]: !exercisesDone[id] };
    if (!exercisesDone[id]) playComplete();
    setExercisesDone(next);
    localStorage.setItem(`partner_exercises_${today}`, JSON.stringify(next));
  }

  function saveCheckin() {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`partner_checkin_${today}`, JSON.stringify(checkinData));

    // Save to history
    try {
      const history = JSON.parse(localStorage.getItem("partnerCheckinHistory") || "[]");
      const filtered = history.filter((e: { date: string }) => !e.date.startsWith(today));
      filtered.push({ ...checkinData, date: new Date().toISOString() });
      localStorage.setItem("partnerCheckinHistory", JSON.stringify(filtered.slice(-90)));
    } catch {}

    setCheckinSaved(true);
    playComplete();
  }

  const habitsCompleted = Object.values(checklist).filter(Boolean).length;
  const suppsCompleted = Object.values(suppChecklist).filter(Boolean).length;
  const exercisesCompleted = Object.values(exercisesDone).filter(Boolean).length;
  const totalProgress = habitsCompleted + suppsCompleted + exercisesCompleted;
  const totalItems = DAILY_HABITS.length + SUPPLEMENTS_MALE.length + MALE_EXERCISES.length;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "checkin", label: "Check-In", icon: "📝" },
    { id: "spermiogram", label: "SA Results", icon: "🔬" },
    { id: "exercises", label: "Exercises", icon: "🏋️" },
    { id: "nutrition", label: "Nutrition", icon: "🥗" },
    { id: "couple", label: "Couple", icon: "💑" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      {/* HEADER */}
      <section className="soft-card p-6 mb-4 text-center bg-gradient-to-br from-[#f0faf8] to-[#e8f5f2]">
        <div className="text-4xl mb-2">👨</div>
        <h1 className="text-3xl text-[#2d5a52] mb-1">
          {userName ? `${userName}'s` : "His"} Fertility Dashboard
        </h1>
        <p className="text-sm text-[#5a7570]">
          Optimize sperm quality in 74 days. Track, improve, conceive together.
        </p>
      </section>

      {/* 74-DAY COUNTDOWN */}
      <section className="soft-card p-5 mb-4 border-l-4 border-l-[#5ba89d]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg text-[#2d5a52] flex items-center gap-2">
              {spermPhase.emoji} Day {programDay}/74
            </h2>
            <p className="text-xs text-[#5a7570]">{spermPhase.phase}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#5ba89d]">{Math.round((programDay / 74) * 100)}%</span>
            <p className="text-[9px] text-[#6aab9f]">{74 - programDay} days remaining</p>
          </div>
        </div>
        <div className="h-4 bg-[#f0faf8] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-[#5ba89d] to-[#3d8a7d] rounded-full transition-all duration-1000"
            style={{ width: `${(programDay / 74) * 100}%` }}
          />
        </div>
        <p className="text-xs text-[#5a7570] italic">{spermPhase.description}</p>
      </section>

      {/* FERTILE WINDOW ALERT */}
      {fertileWindow && fertileWindow.daysUntilOvulation >= -1 && fertileWindow.daysUntilOvulation <= 6 && (
        <section className="soft-card p-4 mb-4 border-l-4 border-l-amber-400 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="text-sm font-bold text-amber-800">
                {fertileWindow.daysUntilOvulation <= 0
                  ? "Ovulation Day — Peak Fertility!"
                  : fertileWindow.daysUntilOvulation <= 2
                  ? "Fertile Window NOW"
                  : `Fertile Window in ${fertileWindow.daysUntilOvulation} days`}
              </h3>
              <p className="text-xs text-amber-700">
                {fertileWindow.daysUntilOvulation <= 0
                  ? "Today is the most important day. Intimacy recommended."
                  : `Ovulation expected: ${fertileWindow.ovulationDate}. Every other day intimacy is ideal.`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB NAVIGATION */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? "bg-[#2d5a52] text-white shadow-md"
                : "bg-white/60 text-[#5a7570] border border-[#c2ddd8] hover:border-[#5ba89d]"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {tab === "dashboard" && (
        <DashboardTab
          habitsCompleted={habitsCompleted}
          suppsCompleted={suppsCompleted}
          totalProgress={totalProgress}
          totalItems={totalItems}
          checklist={checklist}
          suppChecklist={suppChecklist}
          toggleHabit={toggleHabit}
          toggleSupp={toggleSupp}
        />
      )}

      {tab === "checkin" && (
        <CheckinTab
          data={checkinData}
          setData={setCheckinData}
          saved={checkinSaved}
          onSave={saveCheckin}
        />
      )}

      {tab === "spermiogram" && (
        <SpermiogramTab
          entries={spermiogramEntries}
          setEntries={setSpermiogramEntries}
          showAdd={showAddSpermiogram}
          setShowAdd={setShowAddSpermiogram}
        />
      )}

      {tab === "exercises" && (
        <ExercisesTab
          exercisesDone={exercisesDone}
          toggleExercise={toggleExercise}
        />
      )}

      {tab === "nutrition" && <NutritionTab />}

      {tab === "couple" && (
        <CoupleTab
          isLoggedIn={isLoggedIn}
          userId={userId}
          coupleStatus={coupleStatus}
          setCoupleStatus={setCoupleStatus}
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          fertileWindow={fertileWindow}
          programDay={programDay}
        />
      )}

      {/* FOOTER NAV */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link href="/supplements" className="btn-outline text-xs px-4 py-2">Full Supplement Guide</Link>
        <Link href="/dashboard" className="btn-primary text-xs px-4 py-2">Her Dashboard</Link>
        <Link href="/cycle" className="btn-outline text-xs px-4 py-2">Cycle Tracker</Link>
      </div>
    </main>
  );
}

// ============================================================
// DASHBOARD TAB
// ============================================================

function DashboardTab({
  habitsCompleted,
  suppsCompleted,
  totalProgress,
  totalItems,
  checklist,
  suppChecklist,
  toggleHabit,
  toggleSupp,
}: {
  habitsCompleted: number;
  suppsCompleted: number;
  totalProgress: number;
  totalItems: number;
  checklist: PartnerChecklist;
  suppChecklist: Record<string, boolean>;
  toggleHabit: (id: string) => void;
  toggleSupp: (name: string) => void;
}) {
  return (
    <>
      {/* OVERALL PROGRESS */}
      <section className="soft-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg text-[#2d5a52]">Today&apos;s Progress</h2>
          <span className="text-sm font-bold text-[#5ba89d]">
            {totalProgress}/{totalItems}
          </span>
        </div>
        <div className="h-3 bg-[#f0faf8] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5ba89d] to-[#3d8a7d] rounded-full transition-all duration-500"
            style={{ width: `${(totalProgress / totalItems) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-[#6aab9f]">
          <span>💊 {suppsCompleted}/{SUPPLEMENTS_MALE.length} supps</span>
          <span>✅ {habitsCompleted}/{DAILY_HABITS.length} habits</span>
        </div>
      </section>

      {/* SUPPLEMENTS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">💊 Daily Supplements</h2>
        <div className="grid grid-cols-2 gap-2">
          {SUPPLEMENTS_MALE.map((supp) => (
            <button
              key={supp.name}
              onClick={() => toggleSupp(supp.name)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                suppChecklist[supp.name]
                  ? "bg-green-50 border-green-200 opacity-70"
                  : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
              }`}
            >
              <span className="text-lg">{suppChecklist[supp.name] ? "✅" : supp.icon}</span>
              <div>
                <p className="text-xs font-medium text-[#2d5a52]">{supp.name}</p>
                <p className="text-[9px] text-[#5a7570]">
                  {supp.dose} • {supp.why}
                </p>
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
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                checklist[habit.id]
                  ? "bg-green-50 border-green-200 opacity-70"
                  : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
              }`}
            >
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
    </>
  );
}

// ============================================================
// CHECK-IN TAB (Male-specific daily check-in)
// ============================================================

function CheckinTab({
  data,
  setData,
  saved,
  onSave,
}: {
  data: { sleep: number; energy: number; stress: number; exercise: boolean; alcohol: boolean; heatExposure: boolean; notes: string };
  setData: (d: typeof data) => void;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <section className="soft-card p-5 mb-4">
      <h2 className="text-lg text-[#2d5a52] mb-4">📝 Daily Check-In</h2>

      {saved && (
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-4 text-center">
          <p className="text-sm text-green-700">✅ Today&apos;s check-in saved!</p>
        </div>
      )}

      {/* Sleep */}
      <div className="mb-5">
        <label className="text-sm text-[#2d5a52] font-medium block mb-2">
          😴 Sleep Quality: <span className="text-[#5ba89d] font-bold">{data.sleep}/10</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={data.sleep}
          onChange={(e) => setData({ ...data, sleep: Number(e.target.value) })}
          className="w-full accent-[#5ba89d]"
        />
        <div className="flex justify-between text-[9px] text-[#6aab9f]">
          <span>Terrible</span>
          <span>Amazing</span>
        </div>
      </div>

      {/* Energy */}
      <div className="mb-5">
        <label className="text-sm text-[#2d5a52] font-medium block mb-2">
          ⚡ Energy Level: <span className="text-[#5ba89d] font-bold">{data.energy}/10</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={data.energy}
          onChange={(e) => setData({ ...data, energy: Number(e.target.value) })}
          className="w-full accent-[#5ba89d]"
        />
      </div>

      {/* Stress */}
      <div className="mb-5">
        <label className="text-sm text-[#2d5a52] font-medium block mb-2">
          🧠 Stress Level: <span className="text-[#5ba89d] font-bold">{data.stress}/10</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={data.stress}
          onChange={(e) => setData({ ...data, stress: Number(e.target.value) })}
          className="w-full accent-[#5ba89d]"
        />
        <div className="flex justify-between text-[9px] text-[#6aab9f]">
          <span>Calm</span>
          <span>Very stressed</span>
        </div>
      </div>

      {/* Toggle questions */}
      <div className="space-y-3 mb-5">
        <button
          onClick={() => setData({ ...data, exercise: !data.exercise })}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${
            data.exercise ? "bg-green-50 border-green-200" : "bg-white/60 border-[#c2ddd8]"
          }`}
        >
          <span className="text-lg">{data.exercise ? "✅" : "🏃"}</span>
          <span className="text-sm text-[#2d5a52]">Did you exercise today?</span>
        </button>

        <button
          onClick={() => setData({ ...data, alcohol: !data.alcohol })}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${
            data.alcohol ? "bg-red-50 border-red-200" : "bg-white/60 border-[#c2ddd8]"
          }`}
        >
          <span className="text-lg">{data.alcohol ? "🍺" : "🚫"}</span>
          <span className="text-sm text-[#2d5a52]">Any alcohol today?</span>
        </button>

        <button
          onClick={() => setData({ ...data, heatExposure: !data.heatExposure })}
          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${
            data.heatExposure ? "bg-red-50 border-red-200" : "bg-white/60 border-[#c2ddd8]"
          }`}
        >
          <span className="text-lg">{data.heatExposure ? "🔥" : "❄️"}</span>
          <span className="text-sm text-[#2d5a52]">Heat exposure? (sauna, hot bath, laptop on lap)</span>
        </button>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label className="text-sm text-[#2d5a52] font-medium block mb-2">📝 Notes (optional)</label>
        <textarea
          value={data.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          placeholder="How are you feeling? Any symptoms?"
          className="w-full p-3 rounded-xl border border-[#c2ddd8] bg-white/60 text-sm text-[#2d5a52] resize-none h-20 focus:outline-none focus:border-[#5ba89d]"
        />
      </div>

      <button
        onClick={onSave}
        disabled={saved}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
          saved
            ? "bg-green-100 text-green-700 cursor-default"
            : "bg-[#2d5a52] text-white hover:bg-[#1d4a42]"
        }`}
      >
        {saved ? "✅ Saved for Today" : "Save Check-In"}
      </button>
    </section>
  );
}

// ============================================================
// SPERMIOGRAM TAB
// ============================================================

function SpermiogramTab({
  entries,
  setEntries,
  showAdd,
  setShowAdd,
}: {
  entries: SpermiogramEntry[];
  setEntries: (e: SpermiogramEntry[]) => void;
  showAdd: boolean;
  setShowAdd: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    volume: "",
    concentration: "",
    totalCount: "",
    motility: "",
    totalMotility: "",
    morphology: "",
    vitality: "",
    lab: "",
    notes: "",
    abstinenceDays: "",
  });

  const latestEntry = entries.length > 0 ? entries[entries.length - 1] : null;
  const latestScore = latestEntry ? getOverallScore(latestEntry) : null;
  const improvement = getImprovement(entries);
  const recommendations = latestEntry ? getRecommendations(latestEntry) : [];

  function handleSave() {
    const entry: SpermiogramEntry = {
      id: crypto.randomUUID(),
      date: form.date,
      volume: parseFloat(form.volume) || 0,
      concentration: parseFloat(form.concentration) || 0,
      totalCount: parseFloat(form.totalCount) || 0,
      motility: parseFloat(form.motility) || 0,
      totalMotility: parseFloat(form.totalMotility) || 0,
      morphology: parseFloat(form.morphology) || 0,
      vitality: form.vitality ? parseFloat(form.vitality) : undefined,
      lab: form.lab || undefined,
      notes: form.notes || undefined,
      abstinenceDays: form.abstinenceDays ? parseInt(form.abstinenceDays) : undefined,
    };

    saveSpermiogramEntry(entry);
    setEntries(loadSpermiogramData());
    setShowAdd(false);
    setForm({
      date: new Date().toISOString().split("T")[0],
      volume: "", concentration: "", totalCount: "",
      motility: "", totalMotility: "", morphology: "",
      vitality: "", lab: "", notes: "", abstinenceDays: "",
    });
    playComplete();
  }

  return (
    <>
      {/* OVERVIEW */}
      {latestEntry && latestScore && (
        <section className="soft-card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-[#2d5a52]">🔬 Latest Results</h2>
            <span className="text-xs text-[#6aab9f]">{latestEntry.date}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: latestScore.color }}
            >
              {latestScore.score}%
            </div>
            <div>
              <p className="text-lg font-medium text-[#2d5a52]">{latestScore.label}</p>
              <p className="text-xs text-[#5a7570]">Overall sperm health score</p>
            </div>
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-2 gap-2">
            {SPERMIOGRAM_PARAMS.slice(0, 6).map((param) => {
              const value = latestEntry[param.key] as number | undefined;
              const status = getParamStatus(param, value);
              const statusColors = {
                normal: "bg-green-50 border-green-200 text-green-700",
                borderline: "bg-amber-50 border-amber-200 text-amber-700",
                low: "bg-red-50 border-red-200 text-red-700",
                unknown: "bg-gray-50 border-gray-200 text-gray-500",
              };

              return (
                <div key={param.key as string} className={`p-3 rounded-xl border ${statusColors[status]}`}>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm">{param.emoji}</span>
                    <span className="text-[10px] font-bold uppercase">{param.label}</span>
                  </div>
                  <p className="text-lg font-bold">
                    {value !== undefined ? `${value}${param.unit === "%" ? "%" : ""}` : "—"}
                  </p>
                  <p className="text-[9px]">
                    Normal: ≥{param.normalMin}{param.unit}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Improvement indicators */}
          {Object.keys(improvement).length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <h3 className="text-xs font-bold text-[#2d5a52] mb-2">📈 Changes Since First Test</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(improvement).map(([key, { change, improved }]) => {
                  const param = SPERMIOGRAM_PARAMS.find((p) => p.key === key);
                  if (!param) return null;
                  return (
                    <span
                      key={key}
                      className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                        improved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {param.emoji} {param.label}: {improved ? "+" : ""}{change}%
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section className="soft-card p-5 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-3">💡 Personalized Recommendations</h2>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <p key={i} className="text-sm text-[#2d5a52] p-2 rounded-lg bg-[#f0faf8]">{rec}</p>
            ))}
          </div>
        </section>
      )}

      {/* ADD NEW ENTRY */}
      {!showAdd ? (
        <section className="soft-card p-5 mb-4 text-center">
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[#2d5a52] text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1d4a42] transition-all"
          >
            + Add Semen Analysis Results
          </button>
          <p className="text-[10px] text-[#6aab9f] mt-2">
            Enter results from your lab test. Retest every 2-3 months to track improvement.
          </p>
        </section>
      ) : (
        <section className="soft-card p-5 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-4">📋 New Semen Analysis</h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#5a7570] block mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Volume (mL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.volume}
                  onChange={(e) => setForm({ ...form, volume: e.target.value })}
                  placeholder="≥1.5"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Concentration (M/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.concentration}
                  onChange={(e) => setForm({ ...form, concentration: e.target.value })}
                  placeholder="≥16"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Total Count (million)</label>
                <input
                  type="number"
                  step="1"
                  value={form.totalCount}
                  onChange={(e) => setForm({ ...form, totalCount: e.target.value })}
                  placeholder="≥39"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Progressive Motility (%)</label>
                <input
                  type="number"
                  step="1"
                  value={form.motility}
                  onChange={(e) => setForm({ ...form, motility: e.target.value })}
                  placeholder="≥30"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Total Motility (%)</label>
                <input
                  type="number"
                  step="1"
                  value={form.totalMotility}
                  onChange={(e) => setForm({ ...form, totalMotility: e.target.value })}
                  placeholder="≥42"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Morphology (%)</label>
                <input
                  type="number"
                  step="1"
                  value={form.morphology}
                  onChange={(e) => setForm({ ...form, morphology: e.target.value })}
                  placeholder="≥4"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Vitality (%, optional)</label>
                <input
                  type="number"
                  step="1"
                  value={form.vitality}
                  onChange={(e) => setForm({ ...form, vitality: e.target.value })}
                  placeholder="≥54"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a7570] block mb-1">Abstinence (days)</label>
                <input
                  type="number"
                  step="1"
                  value={form.abstinenceDays}
                  onChange={(e) => setForm({ ...form, abstinenceDays: e.target.value })}
                  placeholder="2-5 ideal"
                  className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#5a7570] block mb-1">Lab / Clinic (optional)</label>
              <input
                type="text"
                value={form.lab}
                onChange={(e) => setForm({ ...form, lab: e.target.value })}
                placeholder="e.g. City Fertility Clinic"
                className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 focus:outline-none focus:border-[#5ba89d]"
              />
            </div>

            <div>
              <label className="text-xs text-[#5a7570] block mb-1">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any additional notes from the doctor..."
                className="w-full p-2 rounded-lg border border-[#c2ddd8] text-sm bg-white/60 resize-none h-16 focus:outline-none focus:border-[#5ba89d]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#2d5a52] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#1d4a42]"
              >
                Save Results
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-3 rounded-xl border border-[#c2ddd8] text-sm text-[#5a7570] hover:border-[#5ba89d]"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* WHO Reference */}
          <div className="mt-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <p className="text-[10px] text-blue-700 font-medium mb-1">📖 WHO 2021 Reference Values</p>
            <p className="text-[9px] text-blue-600">
              Volume ≥1.5mL • Concentration ≥16M/mL • Total ≥39M • Motility ≥30% progressive •
              Total motility ≥42% • Morphology ≥4% • Vitality ≥54%
            </p>
          </div>
        </section>
      )}

      {/* HISTORY */}
      {entries.length > 0 && (
        <section className="soft-card p-5 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-3">📅 Test History</h2>
          <div className="space-y-2">
            {[...entries].reverse().map((entry) => {
              const score = getOverallScore(entry);
              return (
                <div key={entry.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: score.color }}
                  >
                    {score.score}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2d5a52]">{entry.date}</p>
                    <p className="text-[10px] text-[#5a7570]">
                      {score.label} • Vol: {entry.volume}mL • Conc: {entry.concentration}M/mL • Mot: {entry.motility}%
                    </p>
                  </div>
                  {entry.lab && <span className="text-[9px] text-[#6aab9f]">{entry.lab}</span>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* REMINDER */}
      <section className="soft-card p-4 mb-4 text-center border-l-4 border-l-blue-300">
        <p className="text-xs text-[#5a7570]">
          🔬 Retest every 2-3 months. Sperm takes 74 days to develop — changes in lifestyle take at least one full cycle to show in results.
        </p>
      </section>
    </>
  );
}

// ============================================================
// EXERCISES TAB (Male fertility exercises)
// ============================================================

function ExercisesTab({
  exercisesDone,
  toggleExercise,
}: {
  exercisesDone: Record<string, boolean>;
  toggleExercise: (id: string) => void;
}) {
  const completed = Object.values(exercisesDone).filter(Boolean).length;

  return (
    <>
      <section className="soft-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg text-[#2d5a52]">🏋️ Daily Exercise Routine</h2>
          <span className="text-sm font-bold text-[#5ba89d]">{completed}/{MALE_EXERCISES.length}</span>
        </div>
        <p className="text-xs text-[#5a7570] mb-4">
          Moderate exercise boosts testosterone and sperm quality. Avoid overtraining — keep sessions under 45 min.
        </p>

        <div className="space-y-3">
          {MALE_EXERCISES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => toggleExercise(ex.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                exercisesDone[ex.id]
                  ? "bg-green-50 border-green-200 opacity-80"
                  : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{exercisesDone[ex.id] ? "✅" : ex.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#2d5a52]">{ex.name}</p>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f0faf8] text-[#5ba89d] font-medium">
                      {ex.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a7570] mt-1">{ex.description}</p>
                  <p className="text-[10px] text-[#6aab9f] mt-1 italic">💡 {ex.benefit}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* EXERCISE TIPS */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3">⚡ Exercise Guidelines for Fertility</h3>
        <div className="space-y-2 text-xs text-[#5a7570]">
          <p>✅ <strong>Do:</strong> 30 min moderate exercise 5x/week (walking, swimming, light weights)</p>
          <p>✅ <strong>Do:</strong> Kegel exercises daily — improves pelvic blood flow</p>
          <p>✅ <strong>Do:</strong> Yoga/stretching for stress reduction and circulation</p>
          <p>❌ <strong>Avoid:</strong> Cycling more than 5 hours/week (pressure + heat)</p>
          <p>❌ <strong>Avoid:</strong> Marathon training or extreme endurance (raises cortisol)</p>
          <p>❌ <strong>Avoid:</strong> Tight compression shorts during exercise</p>
        </div>
      </section>
    </>
  );
}

// ============================================================
// NUTRITION TAB (Male fertility foods)
// ============================================================

function NutritionTab() {
  return (
    <>
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-2">🥗 Fertility-Boosting Foods</h2>
        <p className="text-xs text-[#5a7570] mb-4">
          These foods are scientifically linked to improved sperm parameters. Try to include 3-4 daily.
        </p>

        <div className="space-y-2">
          {MALE_NUTRITION.map((item) => (
            <div key={item.food} className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2d5a52]">{item.food}</p>
                  <p className="text-[10px] text-[#5ba89d] font-medium">{item.nutrient}</p>
                  <p className="text-[10px] text-[#5a7570] mt-0.5">{item.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE MEAL PLAN */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3">🍽️ Sample Day Meal Plan</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <p className="text-[10px] font-bold text-amber-700 uppercase">Breakfast</p>
            <p className="text-sm text-[#2d5a52]">3 eggs scrambled + spinach + pumpkin seeds + whole grain toast</p>
            <p className="text-[9px] text-[#5a7570]">Zinc, Folate, Vitamin D, Choline</p>
          </div>
          <div className="p-3 rounded-xl bg-green-50/50 border border-green-100">
            <p className="text-[10px] font-bold text-green-700 uppercase">Lunch</p>
            <p className="text-sm text-[#2d5a52]">Wild salmon + quinoa + broccoli + olive oil dressing</p>
            <p className="text-[9px] text-[#5a7570]">Omega-3, Selenium, Vitamin C, Healthy fats</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
            <p className="text-[10px] font-bold text-blue-700 uppercase">Snack</p>
            <p className="text-sm text-[#2d5a52]">Walnuts + Brazil nuts (3) + dark chocolate square + pomegranate</p>
            <p className="text-[9px] text-[#5a7570]">Antioxidants, Selenium, L-Arginine</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
            <p className="text-[10px] font-bold text-purple-700 uppercase">Dinner</p>
            <p className="text-sm text-[#2d5a52]">Lean steak + sweet potato + garlic roasted vegetables + avocado</p>
            <p className="text-[9px] text-[#5a7570]">Zinc, CoQ10, L-Carnitine, Vitamin E</p>
          </div>
        </div>
      </section>

      {/* WHAT TO AVOID */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3">🚫 Foods to Limit</h3>
        <div className="space-y-2 text-xs text-[#5a7570]">
          <p>❌ <strong>Processed meats</strong> — linked to lower sperm count</p>
          <p>❌ <strong>Soy products (excess)</strong> — phytoestrogens may affect hormones</p>
          <p>❌ <strong>Trans fats</strong> — found in fried food, reduces sperm count</p>
          <p>❌ <strong>Sugar & refined carbs</strong> — insulin spikes lower testosterone</p>
          <p>❌ <strong>Caffeine &gt;300mg/day</strong> — may affect sperm DNA</p>
          <p>❌ <strong>Alcohol &gt;3 drinks/week</strong> — directly toxic to sperm cells</p>
        </div>
      </section>
    </>
  );
}

// ============================================================
// COUPLE TAB (Pairing, shared progress, fertile window sync)
// ============================================================

function CoupleTab({
  isLoggedIn,
  userId,
  coupleStatus,
  setCoupleStatus,
  inviteCode,
  setInviteCode,
  joinCode,
  setJoinCode,
  fertileWindow,
  programDay,
}: {
  isLoggedIn: boolean;
  userId: string | null;
  coupleStatus: "none" | "pending" | "active";
  setCoupleStatus: (s: "none" | "pending" | "active") => void;
  inviteCode: string;
  setInviteCode: (c: string) => void;
  joinCode: string;
  setJoinCode: (c: string) => void;
  fertileWindow: { start: string; end: string; ovulationDate: string; daysUntilOvulation: number } | null;
  programDay: number;
}) {
  const [copied, setCopied] = useState(false);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");

  async function createInvite() {
    if (!userId) return;
    try {
      const res = await fetch("/api/couple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create-invite", userId }),
      });
      const data = await res.json();
      if (data.code) {
        setInviteCode(data.code);
        setCoupleStatus("pending");
      }
    } catch {}
  }

  async function handleJoin() {
    if (!userId || !joinCode) return;
    setJoining(true);
    setJoinError("");
    try {
      const res = await fetch("/api/couple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join", userId, code: joinCode }),
      });
      const data = await res.json();
      if (data.success) {
        setCoupleStatus("active");
        localStorage.setItem("coupleRole", "him");
        playComplete();
      } else {
        setJoinError(data.error || "Failed to join");
      }
    } catch {
      setJoinError("Connection error");
    }
    setJoining(false);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  if (!isLoggedIn) {
    return (
      <section className="soft-card p-6 mb-4 text-center">
        <div className="text-4xl mb-3">🔒</div>
        <h2 className="text-lg text-[#2d5a52] mb-2">Login Required</h2>
        <p className="text-sm text-[#5a7570] mb-4">
          Create an account to link with your partner and share progress.
        </p>
        <Link href="/login" className="bg-[#2d5a52] text-white px-6 py-3 rounded-xl font-medium text-sm inline-block">
          Login / Sign Up
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* COUPLE STATUS */}
      {coupleStatus === "active" ? (
        <section className="soft-card p-5 mb-4 border-l-4 border-l-green-400">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💑</span>
            <div>
              <h2 className="text-lg text-[#2d5a52]">Connected!</h2>
              <p className="text-xs text-[#5a7570]">You&apos;re linked with your partner. Progress is shared.</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="soft-card p-5 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-3">💑 Link With Your Partner</h2>
          <p className="text-xs text-[#5a7570] mb-4">
            Connect your accounts to share progress, sync fertile windows, and earn couple achievements together.
          </p>

          {/* Create invite (for her) */}
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] mb-3">
            <h3 className="text-sm font-medium text-[#2d5a52] mb-2">Option 1: Create Invite Code</h3>
            {inviteCode ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-mono font-bold text-[#2d5a52] tracking-widest bg-white px-4 py-2 rounded-lg border">
                  {inviteCode}
                </span>
                <button
                  onClick={copyCode}
                  className="px-3 py-2 rounded-lg bg-[#2d5a52] text-white text-xs"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            ) : (
              <button
                onClick={createInvite}
                className="bg-[#5ba89d] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4a9a8f]"
              >
                Generate Code
              </button>
            )}
            <p className="text-[9px] text-[#6aab9f] mt-2">Share this code with your partner to link accounts.</p>
          </div>

          {/* Join with code (for him) */}
          <div className="p-4 rounded-xl bg-white/60 border border-[#c2ddd8]">
            <h3 className="text-sm font-medium text-[#2d5a52] mb-2">Option 2: Enter Partner&apos;s Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                maxLength={6}
                className="flex-1 p-2 rounded-lg border border-[#c2ddd8] text-center font-mono text-lg tracking-widest uppercase bg-white/60 focus:outline-none focus:border-[#5ba89d]"
              />
              <button
                onClick={handleJoin}
                disabled={joinCode.length < 6 || joining}
                className="px-4 py-2 rounded-lg bg-[#2d5a52] text-white text-sm disabled:opacity-50"
              >
                {joining ? "..." : "Join"}
              </button>
            </div>
            {joinError && <p className="text-xs text-red-500 mt-2">{joinError}</p>}
          </div>
        </section>
      )}

      {/* FERTILE WINDOW SYNC */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">🎯 Fertile Window Sync</h2>
        {fertileWindow ? (
          <div className="space-y-3">
            <div className={`p-4 rounded-xl border ${
              fertileWindow.daysUntilOvulation >= -1 && fertileWindow.daysUntilOvulation <= 5
                ? "bg-green-50 border-green-200"
                : "bg-white/60 border-[#c2ddd8]"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#2d5a52]">Ovulation Date</p>
                  <p className="text-lg font-bold text-[#5ba89d]">{fertileWindow.ovulationDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#2d5a52]">
                    {fertileWindow.daysUntilOvulation > 0
                      ? `In ${fertileWindow.daysUntilOvulation} days`
                      : fertileWindow.daysUntilOvulation === 0
                      ? "TODAY!"
                      : `${Math.abs(fertileWindow.daysUntilOvulation)} days ago`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-xs text-[#2d5a52] font-medium mb-1">📅 Fertile Window</p>
              <p className="text-sm text-[#5a7570]">{fertileWindow.start} → {fertileWindow.end}</p>
              <p className="text-[9px] text-[#6aab9f] mt-1">
                Best timing: every other day during this window. Avoid abstinence longer than 5 days before.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              No cycle data available yet. Ask your partner to set up cycle tracking.
            </p>
          </div>
        )}
      </section>

      {/* COUPLE ACHIEVEMENTS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">🏆 Couple Achievements</h2>
        <div className="grid grid-cols-2 gap-2">
          {COUPLE_ACHIEVEMENTS.map((ach) => {
            const unlocked = ach.id === "first_sync" && coupleStatus === "active";
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border text-center ${
                  unlocked
                    ? "bg-amber-50 border-amber-200"
                    : "bg-gray-50/50 border-gray-200 opacity-60"
                }`}
              >
                <span className="text-2xl block mb-1">{unlocked ? ach.emoji : "🔒"}</span>
                <p className="text-[10px] font-bold text-[#2d5a52]">{ach.name}</p>
                <p className="text-[9px] text-[#5a7570]">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SHARED TIPS */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3">💡 Tips for Couples TTC</h3>
        <div className="space-y-2 text-xs text-[#5a7570]">
          <p>🎯 <strong>Timing:</strong> Every other day during the fertile window (days -5 to 0 from ovulation)</p>
          <p>⏰ <strong>Abstinence:</strong> 2-3 days before fertile window starts — not longer</p>
          <p>🧘 <strong>Stress:</strong> High cortisol in either partner reduces conception chances</p>
          <p>🍷 <strong>Alcohol:</strong> Both partners should limit to &lt;3 drinks/week</p>
          <p>💊 <strong>Supplements:</strong> Both should take folate — it&apos;s not just for women</p>
          <p>🏥 <strong>Testing:</strong> If no conception after 12 months (6 if over 35), see a specialist</p>
        </div>
      </section>
    </>
  );
}
