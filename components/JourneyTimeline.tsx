"use client";

export default function JourneyTimeline({ day }: { day: number }) {
  const milestones = [
    { day: 1, label: "Start", desc: "Assessment complete, program begins", icon: "🌱", done: day >= 1 },
    { day: 7, label: "Week 1", desc: "Habits forming, body adapting", icon: "📅", done: day >= 7 },
    { day: 14, label: "Week 2", desc: "Better sleep, more energy reported", icon: "⚡", done: day >= 14 },
    { day: 21, label: "Week 3", desc: "Cycle improvements beginning", icon: "📊", done: day >= 21 },
    { day: 30, label: "Month 1", desc: "Full cycle completed with optimization", icon: "🌸", done: day >= 30 },
    { day: 60, label: "Month 2", desc: "Egg quality improving, habits solid", icon: "🥚", done: day >= 60 },
    { day: 74, label: "Day 74", desc: "His new sperm cycle complete", icon: "👨", done: day >= 74 },
    { day: 90, label: "Month 3", desc: "Full optimization — peak fertility", icon: "🎯", done: day >= 90 },
  ];

  const currentMilestone = milestones.findIndex((m) => m.day > day);
  const progress = currentMilestone === -1 ? 100 : (day / 90) * 100;

  return (
    <section className="soft-card p-5 mb-4">
      <h3 className="text-sm font-bold text-[#4a3f44] mb-4 uppercase tracking-widest">Your Journey</h3>

      {/* Progress bar */}
      <div className="h-2 bg-[#fdf2f5] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#d8a7b5] to-[#a8687a] rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-2">
        {milestones.map((m, i) => {
          const isCurrent = i === currentMilestone;
          return (
            <div
              key={m.day}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                m.done
                  ? "opacity-70"
                  : isCurrent
                  ? "bg-[#fdf2f5] border border-[#f0e3e8]"
                  : "opacity-40"
              }`}
            >
              <span className="text-lg w-7 text-center">
                {m.done ? "✅" : isCurrent ? m.icon : "○"}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#4a3f44]">{m.label}</span>
                  {isCurrent && (
                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#d8a7b5] text-white font-bold">
                      YOU ARE HERE
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-[#7b6870]">{m.desc}</p>
              </div>
              <span className="text-[9px] text-[#b98fa1] shrink-0">Day {m.day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
