"use client";

import Link from "next/link";

const FEATURES = [
  {
    icon: "🧘‍♀️",
    title: "Daily Exercise Sessions",
    desc: "Cycle-synced exercises that adapt to your phase. Gentle during period, stronger during follicular. 10-30 min daily, no equipment needed.",
    href: "/session",
  },
  {
    icon: "🥗",
    title: "Fertility Nutrition",
    desc: "Full meal plans under €7/day with recipes, shopping lists, and macro calculations. Anti-inflammatory, Mediterranean-style, optimized for conception.",
    href: "/nutrition",
  },
  {
    icon: "📅",
    title: "Cycle Tracker",
    desc: "Track your cycle, BBT temperature, OPK results, and cervical mucus. Predicts your fertile window and ovulation day.",
    href: "/cycle",
  },
  {
    icon: "💊",
    title: "Supplement Tracking",
    desc: "Evidence-based supplement protocol with daily tracking, time-of-day schedule, and recommended brands (NOW Foods, Puori).",
    href: "/supplements",
  },
  {
    icon: "💊",
    title: "Medication Tracker",
    desc: "Track fertility medications (Letrozole, Clomid, Progesterone, Gonal-F, etc.) with daily reminders.",
    href: "/dashboard",
  },
  {
    icon: "👨",
    title: "His 74-Day Program",
    desc: "Complete male fertility optimization: daily habits, supplements, exercises, nutrition, and spermiogram tracking. Sperm takes 74 days to develop.",
    href: "/partner",
  },
  {
    icon: "🔬",
    title: "Spermiogram Tracker",
    desc: "Log semen analysis results, track improvements over time, get personalized recommendations based on WHO 2021 values.",
    href: "/partner",
  },
  {
    icon: "💑",
    title: "Couple Mode",
    desc: "Link accounts with your partner. Share progress, sync fertile windows, earn achievements together. Works even if only one partner uses it.",
    href: "/partner",
  },
  {
    icon: "🎯",
    title: "Fertile Window Alerts",
    desc: "Know exactly when you're most fertile. Countdown to ovulation, intimacy timing tracker, and phase-specific tips for both partners.",
    href: "/cycle",
  },
  {
    icon: "📝",
    title: "Daily Check-In",
    desc: "30-second daily log of sleep, energy, and stress. Powers personalized insights and helps you see what's working over time.",
    href: "/checkin",
  },
  {
    icon: "📊",
    title: "Progress & Analytics",
    desc: "Weekly summaries, trend charts, streak tracking, and milestone celebrations. See your journey visualized.",
    href: "/progress",
  },
  {
    icon: "🏆",
    title: "Achievements",
    desc: "Unlock badges for consistency: 7-day streak, 30-day champion, supplement streak, couple achievements, and more.",
    href: "/progress",
  },
  {
    icon: "🏥",
    title: "Doctor Visit Prep",
    desc: "Personalized questions for your fertility appointment — for her, for him, and for couple visits. Plus a printable wellness report.",
    href: "/doctor-prep",
  },
  {
    icon: "📖",
    title: "Free Fertility Guide",
    desc: "30+ page evidence-based guide: cycle science, nutrition, supplements for both, lifestyle factors, timing strategies, and printable trackers.",
    href: "/guide",
  },
  {
    icon: "🛒",
    title: "Shopping Lists",
    desc: "Auto-generated grocery lists based on your meal plan. Print or save as PDF. Budget-optimized.",
    href: "/shopping",
  },
  {
    icon: "📓",
    title: "Journal",
    desc: "Personal notes, reflections, and milestones. Track your emotional journey alongside the physical one.",
    href: "/journal",
  },
  {
    icon: "💬",
    title: "Community",
    desc: "Connect with other couples TTC on Telegram, Facebook, and Instagram. Share experiences, get support.",
    href: "/community",
  },
  {
    icon: "📱",
    title: "Works Like an App",
    desc: "Install on your phone (Android APK or Add to Home Screen). Works offline, push notifications, full-screen experience.",
    href: "/download",
  },
];

export default function FeaturesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <section className="soft-card p-8 text-center mb-6">
        <div className="text-4xl mb-3">✨</div>
        <h1 className="text-3xl text-[#2d5a52] mb-2">Everything in Veronica Bloom</h1>
        <p className="text-sm text-[#5a7570] max-w-lg mx-auto">
          A complete fertility wellness platform for couples trying to conceive. Here&apos;s everything you can do.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-3 mb-8">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="soft-card p-4 flex items-start gap-3 hover:border-[#5ba89d] transition-colors border border-transparent"
          >
            <span className="text-2xl shrink-0">{f.icon}</span>
            <div>
              <h3 className="text-sm font-bold text-[#2d5a52]">{f.title}</h3>
              <p className="text-xs text-[#5a7570] mt-1">{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="soft-card p-6 text-center">
        <h2 className="text-xl text-[#2d5a52] mb-3">Ready to Start?</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/quiz" className="btn-primary px-6 py-2.5 text-sm">Take Free Assessment</Link>
          <Link href="/dashboard" className="btn-outline px-6 py-2.5 text-sm">Go to Dashboard</Link>
          <Link href="/free-guide" className="btn-outline px-6 py-2.5 text-sm">Download Free Guide</Link>
        </div>
      </section>
    </main>
  );
}
