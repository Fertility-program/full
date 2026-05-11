"use client";

import { useEffect, useState } from "react";
import { getClinicBadge } from "@/lib/clinic-codes";

export default function ClinicBadge() {
  const [badge, setBadge] = useState<{ name: string; color?: string } | null>(null);

  useEffect(() => {
    setBadge(getClinicBadge());
  }, []);

  if (!badge) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium border"
      style={{
        backgroundColor: badge.color ? `${badge.color}10` : "#f0faf8",
        borderColor: badge.color ? `${badge.color}40` : "#c2ddd8",
        color: badge.color || "#2d5a52",
      }}
    >
      <span>🏥</span>
      <span>{badge.name}</span>
    </div>
  );
}
