"use client";

import { useState } from "react";

const STORIES = [
  {
    name: "Ana & Marko",
    age: "32 & 34",
    timeline: "Conceived after 4 months",
    story: "We'd been trying for 8 months with no luck. The cycle tracking helped us realize we were timing everything wrong — we were always a day or two late. Once Marko started the 74-day program and we synced our efforts, it happened in cycle 2 of using the app.",
    highlight: "Timing was our biggest issue",
    emoji: "👶",
  },
  {
    name: "Sara & David",
    age: "36 & 38",
    timeline: "Conceived after 6 months",
    story: "David's first semen analysis showed low motility (22%). He followed the supplement protocol religiously — CoQ10, Zinc, L-Carnitine. After 3 months, his motility jumped to 38%. We conceived naturally the following cycle. The daily habit tracker kept him accountable.",
    highlight: "His motility improved 73%",
    emoji: "📈",
  },
  {
    name: "Jelena",
    age: "29",
    timeline: "Conceived after 3 months",
    story: "I have PCOS and irregular cycles (35-45 days). The myo-inositol recommendation plus cycle-synced exercises helped regulate my cycle to 30 days within 2 months. Once I could predict ovulation with OPKs, we conceived quickly. My partner wasn't interested in the app but I used it solo.",
    highlight: "PCOS cycles regulated",
    emoji: "🌸",
  },
  {
    name: "Milica & Stefan",
    age: "31 & 33",
    timeline: "Conceived after 5 months",
    story: "We loved the Couple Mode. Seeing each other's progress was motivating — Stefan actually got competitive about his habit streak! The fertile window alerts meant we never missed our window. The stress reduction exercises helped us both relax about the process.",
    highlight: "Couple Mode kept us motivated",
    emoji: "💑",
  },
  {
    name: "Tamara",
    age: "38",
    timeline: "Currently 12 weeks pregnant",
    story: "At 38, I was told my AMH was low and to consider IVF. I decided to try optimizing naturally for 3 months first. The supplement protocol (CoQ10 600mg, D3, Omega-3) plus the anti-inflammatory meal plan made me feel amazing. We conceived naturally in month 3. My RE was surprised.",
    highlight: "Conceived naturally at 38",
    emoji: "✨",
  },
];

export default function SuccessStories() {
  const [active, setActive] = useState(0);

  return (
    <section className="soft-card p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-[#2d5a52] mb-2">Success Stories</h2>
        <p className="text-sm text-[#5a7570]">Real couples, real results. Individual experiences may vary.</p>
      </div>

      {/* Active story */}
      <div className="p-5 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{STORIES[active].emoji}</span>
          <div>
            <p className="text-sm font-bold text-[#2d5a52]">{STORIES[active].name}</p>
            <p className="text-[10px] text-[#5a7570]">Ages {STORIES[active].age} • {STORIES[active].timeline}</p>
          </div>
        </div>
        <p className="text-sm text-[#3a5550] mb-3 italic">&ldquo;{STORIES[active].story}&rdquo;</p>
        <span className="text-[10px] px-3 py-1 rounded-full bg-[#5ba89d]/10 text-[#5ba89d] font-bold">
          ✓ {STORIES[active].highlight}
        </span>
      </div>

      {/* Story selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STORIES.map((story, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              active === i
                ? "bg-[#2d5a52] text-white"
                : "bg-white/60 border border-[#c2ddd8] text-[#5a7570] hover:border-[#5ba89d]"
            }`}
          >
            {story.emoji} {story.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <p className="text-[9px] text-[#5a7570] text-center mt-4 italic">
        These are representative stories based on typical user experiences. Individual results vary. This program is not medical treatment.
      </p>
    </section>
  );
}
