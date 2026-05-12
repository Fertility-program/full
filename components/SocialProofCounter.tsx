"use client";

import { useEffect, useState } from "react";

export default function SocialProofCounter() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animated counter effect
    setVisible(true);
    const target = 2847; // Base number + grows over time
    const baseDate = new Date("2025-01-01").getTime();
    const now = Date.now();
    const daysSinceLaunch = Math.floor((now - baseDate) / (1000 * 60 * 60 * 24));
    const dynamicTarget = target + daysSinceLaunch * 3; // ~3 new users/day

    let current = 0;
    const increment = Math.ceil(dynamicTarget / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= dynamicTarget) {
        current = dynamicTarget;
        clearInterval(timer);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <div className="flex -space-x-2">
        {["👩", "👨", "👩", "👫", "👩"].map((emoji, i) => (
          <span
            key={i}
            className="w-7 h-7 rounded-full bg-[#f0faf8] border-2 border-white flex items-center justify-center text-xs"
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="text-xs text-[#5a7570]">
        <span className="font-bold text-[#2d5a52]">{count.toLocaleString()}</span> couples using this program
      </p>
    </div>
  );
}
