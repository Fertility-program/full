"use client";

import { useState } from "react";
import Link from "next/link";

export default function FreeGuidePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;

    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "free_guide" }),
      });
    } catch {}

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <section className="soft-card p-8 text-center">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="text-3xl text-[#2d5a52] mb-3">Your Guide is Ready!</h1>
          <p className="text-sm text-[#3a5550] mb-6">
            Click below to open your free fertility wellness guide. You can save it as PDF or print it.
          </p>
          <Link
            href="/guide"
            target="_blank"
            className="btn-primary px-8 py-3 text-base inline-block mb-4"
          >
            📖 Open My Free Guide
          </Link>
          <p className="text-xs text-[#4a7a70]">
            Tip: Use Ctrl+P (or ⌘+P on Mac) to save as PDF
          </p>
          <div className="mt-6 pt-6 border-t border-[#c2ddd8]">
            <p className="text-sm text-[#3a5550] mb-3">Ready for the full personalized program?</p>
            <Link href="/quiz" className="btn-outline px-6 py-2">
              Take Free Assessment →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT — what's inside */}
        <section className="soft-card p-6">
          <p className="uppercase tracking-[0.2em] text-[10px] text-[#5ba89d] font-bold mb-3">Free Download</p>
          <h1 className="text-3xl text-[#2d5a52] mb-4">The Complete Fertility Wellness Guide</h1>
          <p className="text-sm text-[#3a5550] mb-6">
            A 30+ page evidence-based guide for couples trying to conceive. Covers cycle-synced exercises, fertility nutrition, supplements for both partners, male optimization, and conception timing strategies.
          </p>

          <div className="space-y-3 mb-6">
            {[
              "The science of conception — egg, sperm & timing explained",
              "Cycle-synced exercise protocol (what to do each phase)",
              "Male fertility: the 74-day sperm cycle & optimization",
              "7-day fertility meal plan under €7/day (both partners)",
              "Complete supplement guide — Her protocol & His protocol",
              "WHO 2021 semen analysis reference values explained",
              "When to see a doctor — red flags & testing guide",
              "Couple optimization: timing, myths debunked, 3-month plan",
              "Daily routine templates (morning & evening for both)",
              "Printable trackers: cycle, daily checklist, shopping list",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#2d5a52]">
                <span className="text-[#5ba89d]">✓</span>
                {item}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-xs text-[#3a5550] italic">
              &ldquo;This guide helped me understand what my body needs for conception. The meal plan is delicious and affordable.&rdquo;
              <span className="block mt-1 font-medium text-[#2d5a52]">— Ana, 33</span>
            </p>
          </div>
        </section>

        {/* RIGHT — email form */}
        <section className="soft-card p-6 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">📖</div>
            <h2 className="text-xl text-[#2d5a52] mb-1">Get Your Free Copy</h2>
            <p className="text-xs text-[#3a5550]">Enter your email and get instant access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Me the Free Guide"}
            </button>
          </form>

          <p className="text-[9px] text-[#4a7a70] text-center mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>

          <div className="mt-6 pt-4 border-t border-[#c2ddd8]">
            <p className="text-[10px] text-[#4a7a70] text-center mb-3">Share with a friend who needs this:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <a
                href="https://wa.me/?text=Free%20fertility%20wellness%20guide%20%E2%80%94%20exercises%2C%20meal%20plans%20%26%20supplements%20for%20women%20TTC%20%F0%9F%8C%B8%20https%3A%2F%2Fveronica-program.vercel.app%2Ffree-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 hover:bg-green-100 transition-colors"
              >
                💬 WhatsApp
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fveronica-program.vercel.app%2Ffree-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 hover:bg-blue-100 transition-colors"
              >
                📘 Facebook
              </a>
              <a
                href="mailto:?subject=Free%20Fertility%20Wellness%20Guide&body=I%20found%20this%20free%20guide%20for%20fertility%20wellness%20%E2%80%94%20exercises%2C%20meal%20plans%20and%20supplements.%20Check%20it%20out%3A%20https%3A%2F%2Fveronica-program.vercel.app%2Ffree-guide"
                className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
              >
                ✉️ Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
