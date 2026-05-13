export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: AchievementStats) => boolean;
};

export type AchievementStats = {
  currentDay: number;
  totalCheckins: number;
  streak: number;
  sessionsCompleted: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_session",
    title: "First Step",
    description: "Complete your first session",
    icon: "🌱",
    condition: (s) => s.sessionsCompleted >= 1,
  },
  {
    id: "streak_3",
    title: "Building Momentum",
    description: "3-day streak",
    icon: "🔥",
    condition: (s) => s.streak >= 3,
  },
  {
    id: "streak_7",
    title: "One Week Strong",
    description: "7-day streak",
    icon: "⭐",
    condition: (s) => s.streak >= 7,
  },
  {
    id: "streak_14",
    title: "Unstoppable",
    description: "14-day streak",
    icon: "💎",
    condition: (s) => s.streak >= 14,
  },
  {
    id: "streak_30",
    title: "Monthly Master",
    description: "30-day streak",
    icon: "👑",
    condition: (s) => s.streak >= 30,
  },
  {
    id: "day_7",
    title: "Foundation Complete",
    description: "Reach Day 7",
    icon: "🏗️",
    condition: (s) => s.currentDay >= 7,
  },
  {
    id: "day_15",
    title: "Halfway There",
    description: "Reach Day 15",
    icon: "🎯",
    condition: (s) => s.currentDay >= 15,
  },
  {
    id: "day_30",
    title: "Transformation Complete",
    description: "Complete 30 days",
    icon: "🌸",
    condition: (s) => s.currentDay >= 30,
  },
  {
    id: "checkins_10",
    title: "Self-Aware",
    description: "10 daily check-ins",
    icon: "📝",
    condition: (s) => s.totalCheckins >= 10,
  },
  {
    id: "checkins_30",
    title: "Mindful Master",
    description: "30 daily check-ins",
    icon: "🧘",
    condition: (s) => s.totalCheckins >= 30,
  },
  {
    id: "sessions_10",
    title: "Dedicated",
    description: "Complete 10 sessions",
    icon: "💪",
    condition: (s) => s.sessionsCompleted >= 10,
  },
  {
    id: "sessions_25",
    title: "Warrior",
    description: "Complete 25 sessions",
    icon: "🏆",
    condition: (s) => s.sessionsCompleted >= 25,
  },
  {
    id: "streak_60",
    title: "Diamond Consistency",
    description: "60-day streak — top 1% of users",
    icon: "💠",
    condition: (s) => s.streak >= 60,
  },
  {
    id: "streak_74",
    title: "Full Sperm Cycle",
    description: "74 days — one complete spermatogenesis cycle",
    icon: "🧬",
    condition: (s) => s.streak >= 74,
  },
  {
    id: "streak_90",
    title: "Fertility Legend",
    description: "90-day streak — full program complete",
    icon: "🏅",
    condition: (s) => s.streak >= 90,
  },
  {
    id: "day_60",
    title: "Two Months Strong",
    description: "Reach Day 60",
    icon: "🌟",
    condition: (s) => s.currentDay >= 60,
  },
  {
    id: "day_90",
    title: "Program Graduate",
    description: "Complete the full 90-day program",
    icon: "🎓",
    condition: (s) => s.currentDay >= 90,
  },
];

export function getUnlockedAchievements(stats: AchievementStats): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.condition(stats));
}

export function getNextAchievements(stats: AchievementStats): Achievement[] {
  return ACHIEVEMENTS.filter((a) => !a.condition(stats)).slice(0, 3);
}

export function loadAchievementStats(): AchievementStats {
  if (typeof window === "undefined") {
    return { currentDay: 1, totalCheckins: 0, streak: 0, sessionsCompleted: 0 };
  }

  const currentDay = Number(localStorage.getItem("day") || "1");

  let totalCheckins = 0;
  let sessionsCompleted = 0;
  try {
    const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
    totalCheckins = history.length;
    sessionsCompleted = history.filter(
      (e: { completedSession?: boolean }) => e.completedSession
    ).length;
  } catch { /* ignore */ }

  // Simple streak calculation
  let streak = 0;
  try {
    const history = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
    const dates = history
      .map((e: { date: string }) => e.date.split("T")[0])
      .filter((d: string, i: number, arr: string[]) => arr.indexOf(d) === i)
      .sort()
      .reverse();

    const today = new Date().toISOString().split("T")[0];
    for (let i = 0; i < dates.length; i++) {
      const expected = new Date();
      expected.setDate(expected.getDate() - i);
      const expectedStr = expected.toISOString().split("T")[0];
      if (dates[i] === expectedStr || (i === 0 && dates[i] === today)) {
        streak++;
      } else {
        break;
      }
    }
  } catch { /* ignore */ }

  return { currentDay, totalCheckins, streak, sessionsCompleted };
}
