"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type WindowStatus = "approaching" | "active" | "tww" | "period" | "unknown";

export default function FertileWindowCountdown() {
  const [status, setStatus] = useState<WindowStatus>("unknown");
  const [daysUntil, setDaysUntil] = useState(0);
  const [cycleDay, setCycleDay] = useState(0);
  const [ovDate, setOvDate] = useState("");

  useEffect(() => {
    try {
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      if (!cycleData.lastPeriodStart) return;

      const start = new Date(cycleData.lastPeriodStart);
      const cycleLength = cycleData.cycleLength || 28;
      const periodLength = cycleData.periodLength || 5;
      const ovDay = cycleLength - 14;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);

      const cd = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setCycleDay(cd);

      const ovDate = new Date(start);
      ovDate.setDate(ovDate.getDate() + ovDay - 1);
      setOvDate(ovDate.toISOString().split("T")[0]);

      const daysToOv = Math.ceil((ovDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setDaysUntil(daysToOv);

      if (cd <= periodLength) {
        setStatus("period");
      } else if (daysToOv > 5) {
        setStatus("approaching");
      } else if (daysToOv >= -1 && daysToOv <= 5) {
        setStatus("active");
      } else {
        setStatus("tww");
      }
    } catch {}
  }, []);

  if (status === "unknown") return null;

  const configs = {
    period: {
      icon: "🩸",
      title: "Menstrual Phase",
      subtitle: "Rest and nourish. Fertile window coming soon.",
      color: "border-l-red-300",
      bg: "bg-red-50/30",
    },
    approaching: {
      icon: "📅",
      title: `Fertile Window in ${daysUntil - 5} days`,
      subtitle: "Prepare: stay hydrated, reduce stress, both take supplements.",
      color: "border-l-blue-300",
      bg: "bg-blue-50/30",
    },
    active: {
      icon: "🥚",
      title: daysUntil <= 0 ? "Ovulation Day!" : `Fertile NOW — ${daysUntil} days to ovulation`,
      subtitle: daysUntil <= 0 ? "Peak fertility today. Best day for conception." : "Every other day intimacy recommended. You're in the window!",
      color: "border-l-green-400",
      bg: "bg-green-50/30",
    },
    tww: {
      icon: "🤞",
      title: "Two-Week Wait",
      subtitle: "Gentle movement, no alcohol, stay positive. Testing in " + Math.max(0, 14 + daysUntil) + " days.",
      color: "border-l-purple-300",
      bg: "bg-purple-50/30",
    },
  };

  const config = configs[status];

  return (
    <section className={`soft-card p-4 mb-4 border-l-4 ${config.color} ${config.bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <p className="text-sm font-medium text-[#4a3f44]">{config.title}</p>
            <p className="text-[9px] text-[#7b6870]">{config.subtitle}</p>
          </div>
        </div>
        <Link href="/cycle" className="text-[9px] text-[#5ba89d] font-medium">
          Details →
        </Link>
      </div>
    </section>
  );
}
