// ============================================================
// Veronica Bloom CYCLE TRACKER ENGINE
// Tracks menstrual cycle, predicts fertile window, ovulation,
// BBT charting, OPK logging, and TWW countdown.
// ============================================================

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export type CycleDay = {
  date: string; // ISO date string
  cycleDay: number;
  phase: CyclePhase;
  isFertile: boolean;
  isOvulationDay: boolean;
  isPredicted: boolean;
};

export type BBTEntry = {
  date: string;
  temperature: number; // in Celsius
  note?: string;
};

export type OPKEntry = {
  date: string;
  result: "negative" | "low" | "high" | "peak";
  note?: string;
};

export type CycleData = {
  lastPeriodStart: string; // ISO date
  cycleLength: number; // typical cycle length in days
  periodLength: number; // how many days period lasts
  bbtEntries: BBTEntry[];
  opkEntries: OPKEntry[];
  history: CyclePeriod[]; // past cycles
};

export type CyclePeriod = {
  startDate: string;
  endDate?: string;
  length?: number;
  ovulationDay?: number; // confirmed ovulation day of cycle
};

export type FertileWindow = {
  start: string;
  end: string;
  ovulationDate: string;
  daysUntilOvulation: number;
  daysUntilPeriod: number;
};

export type TWWStatus = {
  isInTWW: boolean;
  dpo: number; // days past ovulation
  testDate: string;
  daysUntilTest: number;
};

// ============================================================
// CYCLE CALCULATIONS
// ============================================================

export function getCycleDay(lastPeriodStart: string): number {
  const start = new Date(lastPeriodStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1; // Day 1 = first day of period
}

export function getPhase(cycleDay: number, cycleLength: number, periodLength: number): CyclePhase {
  const ovulationDay = cycleLength - 14; // Luteal phase is ~14 days
  if (cycleDay <= periodLength) return "menstrual";
  if (cycleDay < ovulationDay - 2) return "follicular";
  if (cycleDay >= ovulationDay - 2 && cycleDay <= ovulationDay + 1) return "ovulation";
  return "luteal";
}

export function getFertileWindow(lastPeriodStart: string, cycleLength: number): FertileWindow {
  const start = new Date(lastPeriodStart);
  const ovulationDay = cycleLength - 14;

  const ovulationDate = new Date(start);
  ovulationDate.setDate(ovulationDate.getDate() + ovulationDay - 1);

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysUntilOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const nextPeriod = new Date(start);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  const daysUntilPeriod = Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    start: fertileStart.toISOString().split("T")[0],
    end: fertileEnd.toISOString().split("T")[0],
    ovulationDate: ovulationDate.toISOString().split("T")[0],
    daysUntilOvulation,
    daysUntilPeriod,
  };
}

export function getTWWStatus(lastPeriodStart: string, cycleLength: number): TWWStatus {
  const start = new Date(lastPeriodStart);
  const ovulationDay = cycleLength - 14;

  const ovulationDate = new Date(start);
  ovulationDate.setDate(ovulationDate.getDate() + ovulationDay - 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dpo = Math.floor((today.getTime() - ovulationDate.getTime()) / (1000 * 60 * 60 * 24));

  const testDate = new Date(ovulationDate);
  testDate.setDate(testDate.getDate() + 14);

  const daysUntilTest = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    isInTWW: dpo >= 0 && dpo <= 14,
    dpo: Math.max(0, dpo),
    testDate: testDate.toISOString().split("T")[0],
    daysUntilTest: Math.max(0, daysUntilTest),
  };
}

export function getCalendarDays(lastPeriodStart: string, cycleLength: number, periodLength: number): CycleDay[] {
  const start = new Date(lastPeriodStart);
  const days: CycleDay[] = [];
  const fertileWindow = getFertileWindow(lastPeriodStart, cycleLength);
  const ovulationDay = cycleLength - 14;

  for (let i = 0; i < cycleLength + 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const cycleDay = i + 1;
    const phase = getPhase(cycleDay, cycleLength, periodLength);
    const isFertile = dateStr >= fertileWindow.start && dateStr <= fertileWindow.end;
    const isOvulationDay = cycleDay === ovulationDay;

    days.push({
      date: dateStr,
      cycleDay,
      phase,
      isFertile,
      isOvulationDay,
      isPredicted: true,
    });
  }

  return days;
}

export function detectOvulationFromBBT(entries: BBTEntry[]): string | null {
  if (entries.length < 6) return null;

  // Look for a sustained temperature shift of 0.2°C+ for 3+ days
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  for (let i = 3; i < sorted.length - 2; i++) {
    const before = sorted.slice(Math.max(0, i - 6), i);
    const after = sorted.slice(i, i + 3);

    if (before.length < 3 || after.length < 3) continue;

    const avgBefore = before.reduce((s, e) => s + e.temperature, 0) / before.length;
    const avgAfter = after.reduce((s, e) => s + e.temperature, 0) / after.length;

    if (avgAfter - avgBefore >= 0.2) {
      return sorted[i].date; // Ovulation likely occurred day before this shift
    }
  }

  return null;
}

export function getAverageCycleLength(history: CyclePeriod[]): number {
  const lengths = history.filter((c) => c.length).map((c) => c.length!);
  if (lengths.length === 0) return 28;
  return Math.round(lengths.reduce((s, l) => s + l, 0) / lengths.length);
}

// ============================================================
// PHASE-SPECIFIC ADVICE
// ============================================================

export const PHASE_INFO: Record<CyclePhase, { name: string; emoji: string; color: string; description: string; tips: string[] }> = {
  menstrual: {
    name: "Menstrual Phase",
    emoji: "🩸",
    color: "#e57373",
    description: "Your body is shedding the uterine lining. Rest, nourish, and be gentle with yourself.",
    tips: [
      "Focus on iron-rich foods (spinach, lentils, red meat)",
      "Gentle walking or restorative yoga only",
      "Prioritize sleep — aim for 8+ hours",
      "Warm foods and herbal teas (ginger, raspberry leaf)",
      "Track flow and any symptoms for your records",
    ],
  },
  follicular: {
    name: "Follicular Phase",
    emoji: "🌱",
    color: "#81c784",
    description: "Estrogen is rising, energy increases. Your body is preparing a follicle for ovulation.",
    tips: [
      "Best time for strength training — muscles recover faster",
      "Eat phytoestrogen foods (flax, sesame, legumes)",
      "Increase protein intake to support follicle growth",
      "Start OPK testing around day 10 if cycle is 28 days",
      "Energy is high — use it for meal prep and planning",
    ],
  },
  ovulation: {
    name: "Ovulation Window",
    emoji: "🥚",
    color: "#ffb74d",
    description: "Peak fertility! The egg is released and can be fertilized for 12-24 hours.",
    tips: [
      "This is your most fertile time — every other day intimacy is ideal",
      "Moderate exercise only (avoid intense HIIT)",
      "Stay hydrated — supports cervical mucus production",
      "Reduce stress — cortisol can delay or prevent ovulation",
      "Look for egg-white cervical mucus (peak fertility sign)",
    ],
  },
  luteal: {
    name: "Luteal Phase",
    emoji: "🌙",
    color: "#9575cd",
    description: "Progesterone rises to support potential implantation. The two-week wait begins.",
    tips: [
      "Gentle movement only — yoga, walking, swimming",
      "Eat progesterone-supporting foods (sweet potato, walnuts)",
      "Avoid alcohol and limit caffeine to 200mg/day",
      "Keep stress low — practice breathwork daily",
      "No need to 'test early' — wait until 14 DPO for accuracy",
    ],
  },
};

// ============================================================
// TWW DAILY TIPS
// ============================================================

export const TWW_TIPS: Record<number, string> = {
  0: "Ovulation day! The egg lives 12-24 hours. Relax and trust your body.",
  1: "1 DPO — Fertilization may be happening right now. Stay calm and hydrated.",
  2: "2 DPO — The fertilized egg begins dividing. Gentle movement is fine.",
  3: "3 DPO — The embryo is traveling through the fallopian tube. Eat warm, nourishing foods.",
  4: "4 DPO — Still traveling. Progesterone is rising. You might feel slightly warmer.",
  5: "5 DPO — The embryo may start implanting soon. Avoid heavy lifting.",
  6: "6 DPO — Implantation can begin (days 6-12). Some women feel light cramping.",
  7: "7 DPO — Peak implantation window. Light spotting is normal and can be a good sign.",
  8: "8 DPO — If implanted, hCG production begins. Still too early to test.",
  9: "9 DPO — hCG is doubling every 48 hours. Some women notice breast tenderness.",
  10: "10 DPO — Earliest a sensitive test might show positive. But negatives aren't reliable yet.",
  11: "11 DPO — hCG levels are rising. Fatigue and mood changes are common.",
  12: "12 DPO — A test today is more reliable but still not definitive if negative.",
  13: "13 DPO — Almost there. Try to stay busy and distracted today.",
  14: "14 DPO — Test day! A negative today is fairly reliable. A positive is definitive. 🤞",
};

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================

const STORAGE_KEY = "cycleData";

export function loadCycleData(): CycleData {
  if (typeof window === "undefined") return getDefaultCycleData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultCycleData();
    return JSON.parse(raw);
  } catch {
    return getDefaultCycleData();
  }
}

export function saveCycleData(data: CycleData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDefaultCycleData(): CycleData {
  return {
    lastPeriodStart: "",
    cycleLength: 28,
    periodLength: 5,
    bbtEntries: [],
    opkEntries: [],
    history: [],
  };
}
