"use client";

import { useState } from "react";

const FAQ_DATA = [
  {
    question: "How does Couple Mode work?",
    answer: "One partner creates an invite code from their account, the other enters it on the Partner page. Once linked, you can see each other's progress, sync fertile windows, and earn shared achievements. Both partners need their own account.",
  },
  {
    question: "Does my partner need to pay separately?",
    answer: "The Partner Dashboard (his fertility program) is free for all users. He gets daily habits, supplements, exercises, nutrition guide, and spermiogram tracking at no cost. Premium features (extended meal plans, advanced analytics) require a paid plan on her account.",
  },
  {
    question: "What if my partner doesn't want to participate?",
    answer: "That's completely fine. The program works independently for each person. She can use the full fertility program solo, and he can use the Partner Dashboard solo without linking accounts. Couple Mode is optional — it just adds shared progress and fertile window sync.",
  },
  {
    question: "Can he see my personal health data?",
    answer: "He can only see: your current cycle phase, fertile window dates, and whether you completed today's check-in. He cannot see your weight, symptoms, journal entries, or detailed health data. You control what's shared.",
  },
  {
    question: "How long until we see results?",
    answer: "For her: cycle improvements often appear within 1-2 cycles (1-2 months). For him: sperm takes 74 days to develop, so lifestyle changes need at least 2-3 months to show in semen analysis. Most couples report feeling better within 2 weeks.",
  },
  {
    question: "Is the spermiogram tracker private?",
    answer: "By default, spermiogram results are only visible to him. If Couple Mode is active, she can see a summary score but not detailed parameters — unless he chooses to share. All data is encrypted and stored securely.",
  },
  {
    question: "What if we've been trying for over a year?",
    answer: "If you've been trying for 12+ months (or 6+ months if over 35), we recommend seeing a fertility specialist. Our Doctor Prep page generates personalized questions for both partners to ask. The program complements medical treatment — it doesn't replace it.",
  },
  {
    question: "Can same-sex couples use this?",
    answer: "The program is designed for any couple trying to conceive. The cycle tracking and female fertility features work for anyone with a menstrual cycle. The male fertility section is relevant for any sperm-producing partner. Couple Mode works regardless of relationship structure.",
  },
];

export default function CoupleFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="soft-card p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-[#2d5a52] mb-2">Frequently Asked Questions</h2>
        <p className="text-sm text-[#5a7570]">Common questions about the fertility program and Couple Mode</p>
      </div>

      <div className="space-y-2">
        {FAQ_DATA.map((item, i) => (
          <div key={i} className="rounded-xl border border-[#c2ddd8] overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f0faf8] transition-colors"
            >
              <span className="text-sm font-medium text-[#2d5a52] pr-4">{item.question}</span>
              <span className="text-[#5ba89d] shrink-0 text-lg">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="px-4 pb-4">
                <p className="text-xs text-[#3a5550] leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
