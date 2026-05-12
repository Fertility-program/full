"use client";

import { useEffect, useState } from "react";

const TIPS_BY_PHASE: Record<string, string[]> = {
  menstrual: [
    "Focus on iron-rich foods today: spinach, lentils, red meat. Your body is losing iron.",
    "Gentle movement only — restorative yoga or a short walk. Honor your body's need for rest.",
    "Warm foods and ginger tea support circulation and reduce cramping.",
    "This is a great time to meal prep for the week ahead while resting.",
    "Track your flow — heavy or light? This info helps your doctor if needed.",
  ],
  follicular: [
    "Energy is rising! Best time for strength training — your muscles recover faster now.",
    "Start OPK testing around Day 10 if your cycle is 28 days.",
    "Eat phytoestrogen foods: flaxseeds, sesame, legumes — they support follicle growth.",
    "Your cervical mucus will start changing — watch for watery then egg-white consistency.",
    "This is the best phase for trying new exercises or increasing intensity.",
  ],
  ovulation: [
    "Peak fertility! Every other day intimacy is ideal. Sperm needs time to replenish.",
    "Stay hydrated — water supports cervical mucus production (the highway for sperm).",
    "Avoid intense HIIT today — high cortisol can delay or prevent egg release.",
    "Look for egg-white cervical mucus — stretchy, clear, slippery = peak fertility sign.",
    "Positive OPK? Ovulation in 24-36 hours. Today and tomorrow are your best days.",
  ],
  luteal: [
    "Gentle movement only — walking, yoga, swimming. Potential implantation is happening.",
    "Eat progesterone-supporting foods: sweet potato, walnuts, avocado.",
    "Avoid alcohol completely during the TWW — it can affect implantation.",
    "No need to test before 14 DPO. Early negatives are unreliable and cause stress.",
    "Practice 4-7-8 breathing before bed: inhale 4s, hold 7s, exhale 8s. Calms the nervous system.",
  ],
};

export default function DailyTip() {
  const [tip, setTip] = useState("");
  const [phase, setPhase] = useState("");

  useEffect(() => {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      if (!cycleData.lastPeriodStart) {
        // No cycle data — show general tip
        const generalTips = [
          "💊 Consistency with supplements matters more than perfection. Take them daily.",
          "💧 Aim for 2L water today — hydration supports every reproductive process.",
          "😴 7-8 hours sleep tonight. Melatonin (produced during sleep) protects your eggs.",
          "🧘 5 minutes of deep breathing reduces cortisol by 20%. Try it now.",
          "🥗 Add one extra serving of leafy greens today — folate, iron, magnesium in one bite.",
        ];
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        setTip(generalTips[dayOfYear % generalTips.length]);
        return;
      }

      const start = new Date(cycleData.lastPeriodStart);
      const cycleLength = cycleData.cycleLength || 28;
      const periodLength = cycleData.periodLength || 5;
      const ovDay = cycleLength - 14;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);

      const cycleDay = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      let currentPhase: string;
      if (cycleDay <= periodLength) currentPhase = "menstrual";
      else if (cycleDay < ovDay - 2) currentPhase = "follicular";
      else if (cycleDay >= ovDay - 2 && cycleDay <= ovDay + 1) currentPhase = "ovulation";
      else currentPhase = "luteal";

      setPhase(currentPhase);
      const tips = TIPS_BY_PHASE[currentPhase];
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      setTip(tips[dayOfYear % tips.length]);
    } catch {
      setTip("💊 Take your supplements today. Consistency is the key to results.");
    }
  }, []);

  if (!tip) return null;

  const phaseEmoji: Record<string, string> = {
    menstrual: "🩸",
    follicular: "🌱",
    ovulation: "🥚",
    luteal: "🌙",
  };

  return (
    <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] mb-4">
      <div className="flex items-start gap-2">
        <span className="text-sm shrink-0">{phase ? phaseEmoji[phase] || "💡" : "💡"}</span>
        <p className="text-xs text-[#3a5550]">{tip}</p>
      </div>
    </div>
  );
}
