"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { playComplete } from "@/lib/sounds";

type Reward = {
  streak: number;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
};

export default function StreakRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [newUnlock, setNewUnlock] = useState<Reward | null>(null);

  useEffect(() => {
    const day = Number(localStorage.getItem("day") || "1");
    setCurrentStreak(day);

    const allRewards: Reward[] = [
      { streak: 3, title: "Bonus: Breathing Exercise", icon: "🌬️", description: "4-7-8 technique for better sleep", unlocked: day >= 3 },
      { streak: 7, title: "Bonus: Fertility Smoothie Recipe", icon: "🥤", description: "Antioxidant-rich conception smoothie", unlocked: day >= 7 },
      { streak: 14, title: "Bonus: Partner Yoga Routine", icon: "🧘‍♂️", description: "10-min couples relaxation flow", unlocked: day >= 14 },
      { streak: 21, title: "Bonus: Meal Prep Guide", icon: "📋", description: "Sunday prep for the whole week", unlocked: day >= 21 },
      { streak: 30, title: "Bonus: Advanced Pelvic Floor", icon: "💪", description: "Level 2 pelvic floor protocol", unlocked: day >= 30 },
      { streak: 45, title: "Bonus: Stress Reset Meditation", icon: "🧘", description: "15-min guided fertility meditation", unlocked: day >= 45 },
      { streak: 60, title: "Bonus: IVF Prep Module", icon: "🏥", description: "What to do 3 months before IVF", unlocked: day >= 60 },
      { streak: 74, title: "Bonus: His Results Day", icon: "🔬", description: "Guide for interpreting new SA results", unlocked: day >= 74 },
      { streak: 90, title: "Bonus: Lifetime Badge", icon: "🏅", description: "You completed the full program!", unlocked: day >= 90 },
    ];

    setRewards(allRewards);

    // Check for new unlock (show celebration)
    const lastShownReward = Number(localStorage.getItem("lastRewardShown") || "0");
    const justUnlocked = allRewards.find((r) => r.unlocked && r.streak > lastShownReward && r.streak === day);
    if (justUnlocked) {
      setNewUnlock(justUnlocked);
      localStorage.setItem("lastRewardShown", String(justUnlocked.streak));
      playComplete();
    }
  }, []);

  function dismissUnlock() {
    setNewUnlock(null);
  }

  const nextReward = rewards.find((r) => !r.unlocked);

  return (
    <>
      {/* New unlock celebration */}
      {newUnlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="soft-card p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-3 animate-bounce">{newUnlock.icon}</div>
            <h2 className="text-xl text-[#2d5a52] mb-2">Reward Unlocked!</h2>
            <p className="text-sm text-[#5a7570] mb-1 font-bold">{newUnlock.title}</p>
            <p className="text-xs text-[#5a7570] mb-4">{newUnlock.description}</p>
            <p className="text-[10px] text-[#5ba89d] mb-4">🔥 {currentStreak}-day streak!</p>
            <button onClick={dismissUnlock} className="btn-primary w-full py-2.5">Awesome!</button>
          </div>
        </div>
      )}

      {/* Streak rewards card on dashboard */}
      <section className="soft-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#4a3f44]">🎁 Streak Rewards</h3>
          {nextReward && (
            <span className="text-[9px] text-[#5ba89d]">
              Next: {nextReward.icon} in {nextReward.streak - currentStreak} days
            </span>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {rewards.map((r) => (
            <div
              key={r.streak}
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-all ${
                r.unlocked
                  ? "bg-[#f0faf8] border-[#5ba89d] scale-100"
                  : "bg-gray-50 border-gray-200 opacity-40 scale-90"
              }`}
              title={r.unlocked ? `${r.title} (Day ${r.streak})` : `Unlock at Day ${r.streak}`}
            >
              {r.unlocked ? r.icon : "🔒"}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
