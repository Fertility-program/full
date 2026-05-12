"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Step = {
  icon: string;
  title: string;
  desc: string;
  action?: { label: string; href: string };
  highlight?: string;
};

export default function OnboardingTutorial() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (localStorage.getItem("tutorialDone")) return;

    // Build personalized steps based on user data
    const quiz = (() => { try { return JSON.parse(localStorage.getItem("quizData") || "{}"); } catch { return {}; } })();
    const name = quiz.name || "";
    const symptoms = quiz.symptoms || [];
    const hasCycleData = !!localStorage.getItem("cycleData");

    const personalSteps: Step[] = [
      {
        icon: "👋",
        title: name ? `Welcome, ${name}!` : "Welcome to Veronica Bloom!",
        desc: "Let me show you around. Your personalized fertility program is ready — here's how to get the most out of it.",
      },
      {
        icon: "🧘‍♀️",
        title: "Your Daily Session",
        desc: "Every day you get a cycle-synced exercise session (10-30 min). Exercises adapt to your cycle phase — gentle during period, stronger during follicular.",
        action: { label: "Start First Session", href: "/session" },
      },
      {
        icon: "🥗",
        title: "Fertility Nutrition",
        desc: "Full meal plans under €7/day with recipes, shopping lists, and macro calculations. All optimized for conception.",
        action: { label: "See Meal Plan", href: "/nutrition" },
      },
      {
        icon: "📅",
        title: "Cycle Tracker",
        desc: "Track your cycle, BBT temperature, and OPK results. We predict your fertile window and tell you the best days for conception.",
        action: hasCycleData ? undefined : { label: "Set Up Cycle", href: "/cycle" },
      },
      {
        icon: "💊",
        title: "Supplements & Medications",
        desc: "Evidence-based supplement protocol with daily tracking. Plus a medication tracker if you're on fertility treatment.",
        action: { label: "View Supplements", href: "/supplements" },
      },
      {
        icon: "👨",
        title: "His Program Too",
        desc: "Your partner gets his own 74-day sperm optimization program — supplements, exercises, habits, and spermiogram tracking. Share the link with him!",
        action: { label: "Partner Dashboard", href: "/partner" },
        highlight: "50% of infertility involves male factor",
      },
      {
        icon: "💑",
        title: "Couple Mode",
        desc: "Link your accounts to see each other's progress, sync fertile windows, and earn achievements together. Works even if he uses it solo.",
        action: { label: "Set Up Couple Mode", href: "/partner" },
      },
      {
        icon: "📝",
        title: "Daily Check-In",
        desc: "Log sleep, energy, and stress daily (takes 30 seconds). This data powers your personalized insights and helps track what's working.",
        action: { label: "Do First Check-In", href: "/checkin" },
      },
    ];

    // Add symptom-specific step
    if (symptoms.includes("PCOS symptoms")) {
      personalSteps.push({
        icon: "🌿",
        title: "PCOS Support",
        desc: "Your program includes myo-inositol protocol, low-GI meals, and spearmint tea recommendations specifically for PCOS.",
        action: { label: "PCOS Program", href: "/pcos" },
      });
    }

    if (symptoms.includes("Endometriosis")) {
      personalSteps.push({
        icon: "🐟",
        title: "Endometriosis Support",
        desc: "Anti-inflammatory nutrition, NAC supplementation, and gentle exercises designed for endo. Omega-3 focus throughout.",
        action: { label: "Endo Program", href: "/endometriosis" },
      });
    }

    // Final step
    personalSteps.push({
      icon: "🎯",
      title: "You're Ready!",
      desc: "Start with today's session and check-in. Consistency beats perfection — even 10 minutes a day makes a difference. We're with you every step.",
    });

    setSteps(personalSteps);

    // Show after short delay
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function finish() {
    localStorage.setItem("tutorialDone", "true");
    setShow(false);
  }

  if (!show || steps.length === 0) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="soft-card p-6 max-w-md w-full shadow-2xl relative">
        {/* Close button */}
        <button onClick={finish} className="absolute top-3 right-4 text-[#b98fa1] hover:text-[#4a3f44] text-sm" aria-label="Close">✕</button>

        {/* Progress bar */}
        <div className="h-1 bg-[#f0e3e8] rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d8a7b5] to-[#a8687a] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="text-5xl mb-4">{current.icon}</div>
          <h3 className="text-xl text-[#4a3f44] mb-2">{current.title}</h3>
          <p className="text-sm text-[#7b6870] mb-4 leading-relaxed">{current.desc}</p>

          {current.highlight && (
            <p className="text-[10px] px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 inline-block mb-4">
              💡 {current.highlight}
            </p>
          )}

          {current.action && (
            <Link
              href={current.action.href}
              onClick={finish}
              className="block w-full py-2.5 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] text-sm text-[#2d5a52] font-medium mb-4 hover:bg-[#e8f5f2] transition-colors"
            >
              {current.action.label} →
            </Link>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {step > 0 ? (
            <button onClick={prev} className="flex-1 text-sm text-[#b98fa1] py-2 hover:text-[#8f5d6f]">
              ← Back
            </button>
          ) : (
            <button onClick={finish} className="flex-1 text-sm text-[#b98fa1] py-2 hover:text-[#8f5d6f]">
              Skip All
            </button>
          )}
          <button onClick={next} className="btn-primary flex-[2] py-2.5">
            {step < steps.length - 1 ? "Next" : "Let's Go! 🚀"}
          </button>
        </div>

        <p className="text-[9px] text-[#b98fa1] mt-3 text-center">
          {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
