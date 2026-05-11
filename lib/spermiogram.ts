// ============================================================
// SPERMIOGRAM TRACKER
// Tracks semen analysis results over time.
// WHO 2021 reference values for normal parameters.
// ============================================================

export type SpermiogramEntry = {
  id: string;
  date: string;
  // Core parameters
  volume: number; // mL (normal: ≥1.5)
  concentration: number; // million/mL (normal: ≥16)
  totalCount: number; // million (normal: ≥39)
  motility: number; // % progressive (normal: ≥30)
  totalMotility: number; // % total (normal: ≥42)
  morphology: number; // % normal forms (normal: ≥4)
  // Optional parameters
  vitality?: number; // % alive (normal: ≥54)
  ph?: number; // normal: ≥7.2
  whiteBloodCells?: number; // million/mL (normal: <1)
  // Meta
  lab?: string;
  notes?: string;
  abstinenceDays?: number; // days of abstinence before test
};

export type SpermiogramParam = {
  key: keyof SpermiogramEntry;
  label: string;
  unit: string;
  normalMin: number;
  normalMax?: number;
  emoji: string;
  description: string;
};

// WHO 2021 6th Edition reference values
export const SPERMIOGRAM_PARAMS: SpermiogramParam[] = [
  {
    key: "volume",
    label: "Volume",
    unit: "mL",
    normalMin: 1.5,
    emoji: "💧",
    description: "Total ejaculate volume. Low volume may indicate blockage or hormonal issues.",
  },
  {
    key: "concentration",
    label: "Concentration",
    unit: "M/mL",
    normalMin: 16,
    emoji: "🔬",
    description: "Sperm per milliliter. Below 16M/mL is oligozoospermia.",
  },
  {
    key: "totalCount",
    label: "Total Count",
    unit: "million",
    normalMin: 39,
    emoji: "📊",
    description: "Total sperm in ejaculate. Volume × concentration.",
  },
  {
    key: "motility",
    label: "Progressive Motility",
    unit: "%",
    normalMin: 30,
    emoji: "🏊",
    description: "Sperm swimming forward. These are the ones that can reach the egg.",
  },
  {
    key: "totalMotility",
    label: "Total Motility",
    unit: "%",
    normalMin: 42,
    emoji: "🔄",
    description: "All moving sperm (progressive + non-progressive).",
  },
  {
    key: "morphology",
    label: "Morphology",
    unit: "%",
    normalMin: 4,
    emoji: "🎯",
    description: "Normal-shaped sperm. Even 4% is considered normal by WHO standards.",
  },
  {
    key: "vitality",
    label: "Vitality",
    unit: "%",
    normalMin: 54,
    emoji: "❤️",
    description: "Percentage of live sperm. Important when motility is low.",
  },
];

// ============================================================
// ANALYSIS & SCORING
// ============================================================

export type ParamStatus = "normal" | "borderline" | "low" | "unknown";

export function getParamStatus(param: SpermiogramParam, value: number | undefined): ParamStatus {
  if (value === undefined || value === null) return "unknown";
  if (value >= param.normalMin) return "normal";
  if (value >= param.normalMin * 0.7) return "borderline";
  return "low";
}

export function getOverallScore(entry: SpermiogramEntry): { score: number; label: string; color: string } {
  let normalCount = 0;
  let totalChecked = 0;

  for (const param of SPERMIOGRAM_PARAMS) {
    const value = entry[param.key] as number | undefined;
    if (value !== undefined && value !== null) {
      totalChecked++;
      if (value >= param.normalMin) normalCount++;
    }
  }

  if (totalChecked === 0) return { score: 0, label: "No data", color: "#9ca3af" };

  const score = Math.round((normalCount / totalChecked) * 100);

  if (score >= 85) return { score, label: "Excellent", color: "#22c55e" };
  if (score >= 70) return { score, label: "Good", color: "#84cc16" };
  if (score >= 50) return { score, label: "Fair", color: "#eab308" };
  if (score >= 30) return { score, label: "Below Average", color: "#f97316" };
  return { score, label: "Needs Attention", color: "#ef4444" };
}

export function getImprovement(entries: SpermiogramEntry[]): Record<string, { change: number; improved: boolean }> {
  if (entries.length < 2) return {};

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const result: Record<string, { change: number; improved: boolean }> = {};

  for (const param of SPERMIOGRAM_PARAMS) {
    const firstVal = first[param.key] as number | undefined;
    const lastVal = last[param.key] as number | undefined;

    if (firstVal !== undefined && lastVal !== undefined && firstVal > 0) {
      const change = Math.round(((lastVal - firstVal) / firstVal) * 100);
      result[param.key as string] = { change, improved: lastVal > firstVal };
    }
  }

  return result;
}

// ============================================================
// RECOMMENDATIONS BASED ON RESULTS
// ============================================================

export function getRecommendations(entry: SpermiogramEntry): string[] {
  const recs: string[] = [];

  if (entry.concentration < 16) {
    recs.push("🛡️ Increase Zinc to 50mg/day — studies show +74% sperm count improvement.");
    recs.push("🥜 Add Brazil nuts (2-3/day) for selenium — supports sperm production.");
  }

  if (entry.motility < 30) {
    recs.push("⚡ CoQ10 at 300mg/day significantly improves motility in clinical trials.");
    recs.push("🔥 L-Carnitine 2000mg/day — provides energy for sperm movement.");
    recs.push("🚫 Eliminate hot baths/saunas — heat directly reduces motility.");
  }

  if (entry.morphology < 4) {
    recs.push("🍊 Vitamin C 1000mg + Vitamin E 400IU — protects sperm DNA from oxidative damage.");
    recs.push("🐟 Increase Omega-3 to 2000mg DHA — improves sperm membrane structure.");
    recs.push("🚬 If smoking, quit immediately — morphology improves within 3 months.");
  }

  if (entry.volume < 1.5) {
    recs.push("💧 Increase water intake to 3L/day — dehydration reduces seminal fluid.");
    recs.push("⏰ Ensure 2-5 days abstinence before next test for accurate volume.");
  }

  if ((entry.totalMotility || 0) < 42) {
    recs.push("🏃 30 min moderate exercise 5x/week — improves blood flow to testes.");
    recs.push("😴 Prioritize 7-8 hours sleep — testosterone peaks during deep sleep.");
  }

  if (recs.length === 0) {
    recs.push("✅ All parameters look good! Maintain current habits and retest in 3 months.");
  }

  return recs;
}

// ============================================================
// LOCAL STORAGE
// ============================================================

const STORAGE_KEY = "spermiogramData";

export function loadSpermiogramData(): SpermiogramEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSpermiogramEntry(entry: SpermiogramEntry): void {
  if (typeof window === "undefined") return;
  const existing = loadSpermiogramData();
  const idx = existing.findIndex((e) => e.id === entry.id);
  if (idx >= 0) {
    existing[idx] = entry;
  } else {
    existing.push(entry);
  }
  existing.sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function deleteSpermiogramEntry(id: string): void {
  if (typeof window === "undefined") return;
  const existing = loadSpermiogramData();
  const filtered = existing.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
