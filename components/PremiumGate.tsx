"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  feature?: string; // name of the feature being gated
  allowDays?: number; // how many free days before gating (default 7)
};

/**
 * Wraps content that should only be visible to premium users.
 * Free users see a blurred preview with upgrade CTA after their trial days.
 */
export default function PremiumGate({ children, feature = "this feature", allowDays = 7 }: Props) {
  const [isPremium, setIsPremium] = useState(true); // default true to avoid flash
  const [day, setDay] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const plan = localStorage.getItem("plan") || "free";
    const premium = localStorage.getItem("premium") === "true";
    const expiryDate = localStorage.getItem("expiryDate");
    const currentDay = Number(localStorage.getItem("day") || "1");

    const isActive = premium && (!expiryDate || new Date(expiryDate) > new Date());
    const hasPaidPlan = plan === "glow" || plan === "elite";

    setIsPremium(isActive && hasPaidPlan);
    setDay(currentDay);
    setLoaded(true);
  }, []);

  // Don't render gate until we know the user's status
  if (!loaded) return <>{children}</>;

  // Premium users or within free trial days — show content
  if (isPremium || day <= allowDays) {
    return <>{children}</>;
  }

  // Free users past trial — show blurred content with CTA
  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="blur-sm pointer-events-none select-none max-h-[300px] overflow-hidden">
        {children}
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-white/80 to-white">
        <div className="text-center p-6 max-w-sm">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-lg text-[#2d5a52] mb-2">Premium Feature</h3>
          <p className="text-xs text-[#5a7570] mb-4">
            Upgrade to access {feature} and the full program — meal plans, advanced exercises, spermiogram tracking, and more.
          </p>
          <Link
            href="/pricing"
            className="btn-primary px-6 py-2.5 text-sm inline-block"
          >
            Upgrade — From €29
          </Link>
          <p className="text-[9px] text-[#5a7570] mt-2">One-time payment. No subscription.</p>
        </div>
      </div>
    </div>
  );
}
