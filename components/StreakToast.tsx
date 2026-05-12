"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Shows a brief toast notification when user opens the app with an active streak.
 * Motivational and disappears after 3 seconds.
 */
export default function StreakToast() {
  const [show, setShow] = useState(false);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Only show on dashboard
    if (pathname !== "/dashboard") return;

    // Only show once per session
    const shown = sessionStorage.getItem("streakToastShown");
    if (shown) return;

    const day = Number(localStorage.getItem("day") || "0");
    if (day < 3) return; // Don't show for very new users

    setStreak(day);

    // Pick motivational message based on streak
    const messages = [
      `🔥 ${day} day streak! You're building something beautiful.`,
      `🔥 ${day} days strong! Your consistency is your superpower.`,
      `🔥 Day ${day}! Every session brings you closer to your goal.`,
      `🔥 ${day} days! Top 10% of users for consistency. Amazing!`,
    ];
    setMessage(messages[day % messages.length]);

    // Show after 1 second delay
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("streakToastShown", "true");
      // Auto-hide after 4 seconds
      setTimeout(() => setShow(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#f0e3e8] px-5 py-3 max-w-sm">
        <p className="text-xs text-[#4a3f44] font-medium">{message}</p>
      </div>
    </div>
  );
}
