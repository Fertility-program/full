"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrialEndingModal() {
  const [show, setShow] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const plan = localStorage.getItem("plan") || "free";
    const premium = localStorage.getItem("premium") === "true";
    const day = Number(localStorage.getItem("day") || "1");
    const dismissed = localStorage.getItem("trialModalDismissed");

    // Show only for free users on day 5, 6, or 7
    if (plan === "free" && !premium && day >= 5 && day <= 7 && !dismissed) {
      setDaysLeft(7 - day);
      // Delay showing by 3 seconds for better UX
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    setShow(false);
    // Don't show again for 24 hours
    localStorage.setItem("trialModalDismissed", new Date().toISOString());
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="soft-card p-8 max-w-md w-full text-center relative animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#5a7570] hover:text-[#2d5a52] text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-4xl mb-4">⏰</div>
        <h2 className="text-2xl text-[#2d5a52] mb-2">
          {daysLeft === 0
            ? "Your Free Trial Ends Today"
            : `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left in Your Free Trial`}
        </h2>
        <p className="text-sm text-[#3a5550] mb-6">
          {daysLeft === 0
            ? "Upgrade now to keep your streak, meal plans, and full exercise program."
            : "You've been making great progress! Upgrade to continue with personalized meal plans, advanced exercises, and couple mode."}
        </p>

        {/* What you'll lose */}
        <div className="text-left p-4 rounded-xl bg-red-50/50 border border-red-100 mb-4">
          <p className="text-xs font-bold text-red-700 mb-2">Without premium, you&apos;ll lose access to:</p>
          <ul className="text-xs text-red-600 space-y-1">
            <li>✗ Full meal plans (Day 2+)</li>
            <li>✗ Advanced exercises (Build/Strengthen/Master phases)</li>
            <li>✗ Spermiogram tracking</li>
            <li>✗ Weekly summaries & analytics</li>
          </ul>
        </div>

        {/* What you keep */}
        <div className="text-left p-4 rounded-xl bg-green-50/50 border border-green-100 mb-6">
          <p className="text-xs font-bold text-green-700 mb-2">You&apos;ll always keep (free):</p>
          <ul className="text-xs text-green-600 space-y-1">
            <li>✓ Day 1 exercises & meal plan</li>
            <li>✓ Cycle tracker</li>
            <li>✓ Partner Dashboard basics</li>
            <li>✓ Supplement guide preview</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/pricing"
            className="btn-primary w-full py-3 block text-center"
            onClick={dismiss}
          >
            View Plans — From €29
          </Link>
          <button
            onClick={dismiss}
            className="w-full py-2 text-xs text-[#5a7570] hover:text-[#2d5a52]"
          >
            Maybe later
          </button>
        </div>

        <p className="text-[9px] text-[#5a7570] mt-4">
          One-time payment. No subscription. No hidden fees.
        </p>
      </div>
    </div>
  );
}
