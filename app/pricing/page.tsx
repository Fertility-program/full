"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function getTimeLeft() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    }

    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#f0faf8] border border-[#c2ddd8]">
      <span className="text-sm text-[#3d8a7d] font-medium">Today&apos;s price expires in:</span>
      <div className="flex items-center gap-1 font-mono">
        <span className="bg-[#2d5a52] text-white px-2 py-1 rounded-lg text-sm font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[#5ba89d] font-bold">:</span>
        <span className="bg-[#2d5a52] text-white px-2 py-1 rounded-lg text-sm font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[#5ba89d] font-bold">:</span>
        <span className="bg-[#2d5a52] text-white px-2 py-1 rounded-lg text-sm font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function PricingContent() {
  const params = useSearchParams();
  const locked = params.get("locked") === "true";

  const plans = [
    {
      name: "Bloom",
      price: "€29",
      badge: "Most Popular",
      subtitle: "30-day fertility reset for cycle balance, stress reduction and conception readiness.",
      href: "/plans/glow",
      cta: "Explore Bloom",
      features: [
        "30-Day Program",
        "Cycle-synced daily sessions",
        "Stress & cortisol reduction",
        "Fertility nutrition plan",
        "Progress dashboard",
      ],
    },
    {
      name: "Elite",
      price: "€79",
      badge: "Best Value",
      subtitle: "90-day premium fertility transformation with advanced protocols.",
      href: "/plans/elite",
      cta: "Explore Elite",
      features: [
        "Everything in Bloom",
        "90-Day Roadmap",
        "Hormone optimization protocols",
        "Monthly reassessments",
        "VIP premium library",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      {locked && (
        <section className="soft-card p-8 mb-10 border border-[#c2ddd8]">
          <p className="uppercase tracking-[0.25em] text-sm text-[#6aab9f] mb-4">
            Premium Access Required
          </p>
          <h2 className="text-5xl mb-4">Unlock Your Fertility Wellness</h2>
          <p className="text-[#5a7570] text-lg leading-relaxed">
            Upgrade now to access your premium dashboard, guided sessions, personalized plans and progress tracking tools.
          </p>
        </section>
      )}

      <section className="text-center mb-14">
        <p className="uppercase tracking-[0.25em] text-sm text-[#6aab9f] mb-4">
          Choose Your Membership
        </p>
        <h1 className="text-5xl md:text-7xl mb-6">
          Premium Plans For Your Fertility Journey
        </h1>
        <p className="max-w-3xl mx-auto text-[#5a7570] text-xl leading-relaxed mb-6">
          Compare your options, explore benefits and choose the path that supports your conception goals.
        </p>
        <CountdownTimer />
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-14">
        {plans.map((plan) => (
          <div key={plan.name} className="soft-card p-8 relative">
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#e8f8f5] text-[#3d8a7d] text-sm">
              {plan.badge}
            </div>
            <h2 className="text-5xl mb-3">{plan.name}</h2>
            <p className="text-[#5a7570] text-lg mb-6">{plan.subtitle}</p>
            <div className="text-6xl mb-8">{plan.price}</div>
            <div className="space-y-4 mb-10">
              {plan.features.map((item) => (
                <div key={item} className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                  ✓ {item}
                </div>
              ))}
            </div>
            <Link
              href={plan.href}
              className={plan.name === "Elite" ? "btn-primary w-full text-center block" : "btn-outline w-full text-center block"}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="soft-card p-10 mb-14">
        <h2 className="text-5xl mb-8 text-center">Quick Comparison</h2>
        <div className="space-y-4">
          {[
            ["Program Length", "30 Days", "90 Days"],
            ["Cycle-Synced Sessions", "Yes", "Premium Library"],
            ["Reassessments", "Basic", "Monthly Smart"],
            ["Hormone Optimization", "—", "Yes"],
            ["Advanced Fertility Protocols", "—", "Yes"],
            ["Progress Dashboard", "Yes", "Advanced"],
          ].map(([feature, bloom, elite]) => (
            <div key={feature} className="grid md:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-[#c2ddd8]">
              <div className="text-[#5a7570]">{feature}</div>
              <div>{bloom}</div>
              <div>{elite}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="soft-card p-10 mb-14">
        <h2 className="text-4xl text-center mb-8 text-[#2d5a52]">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { q: "Is this suitable for women with PCOS?", a: "Yes. The program includes specific protocols for PCOS including insulin-balancing nutrition, gentle movement and supplement guidance tailored to polycystic ovary syndrome." },
            { q: "How much does the meal plan cost per day?", a: "All our meal plans are designed to cost under €7 per day. Most days average €5-6 using fertility-friendly ingredients like leafy greens, wild salmon, eggs and seasonal vegetables." },
            { q: "What if I have specific health conditions?", a: "Veronica Bloom is a wellness program, not medical treatment. The quiz personalizes your plan based on your concerns, but always consult your doctor before starting any new program." },
            { q: "Can I cancel anytime?", a: "Yes. You can cancel from your Account page at any time. We also offer a 30-day money-back guarantee — no questions asked." },
            { q: "What's the difference between Bloom and Elite?", a: "Bloom is a 30-day program perfect for getting started. Elite is 90 days with advanced protocols, hormone optimization, monthly reassessments and a premium exercise library." },
            { q: "Do I need any equipment?", a: "No equipment needed. All exercises use bodyweight only. A yoga mat is optional but not required." },
          ].map((faq) => (
            <details key={faq.q} className="group p-5 rounded-2xl bg-white border border-[#c2ddd8] hover:border-[#5ba89d] transition-colors">
              <summary className="cursor-pointer text-[#2d5a52] font-medium flex items-center justify-between">
                {faq.q}
                <span className="text-[#5ba89d] group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#5a7570] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-5">Start Your Fertility Journey Today</h2>
        <p className="text-[#5a7570] text-lg mb-8">
          Explore every feature before checkout and choose the plan that supports your goals.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/plans/glow" className="btn-outline">View Bloom</Link>
          <Link href="/plans/elite" className="btn-primary">View Elite</Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: "🔒", text: "Secure Payment" },
          { icon: "💸", text: "30-Day Money Back" },
          { icon: "📱", text: "Works on Any Device" },
          { icon: "🚫", text: "No Subscription" },
        ].map((item) => (
          <div key={item.text} className="soft-card p-4 text-center">
            <div className="text-xl mb-1">{item.icon}</div>
            <p className="text-[10px] text-[#2d5a52] font-medium">{item.text}</p>
          </div>
        ))}
      </section>

      {/* COMPARISON TABLE */}
      <section className="soft-card p-6 mb-8 overflow-x-auto">
        <h2 className="text-xl text-[#2d5a52] mb-4 text-center">What&apos;s Included</h2>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#c2ddd8]">
              <th className="text-left p-2 text-[#5a7570]">Feature</th>
              <th className="text-center p-2 text-[#5a7570]">Free (7 days)</th>
              <th className="text-center p-2 text-[#2d5a52] font-bold">Bloom €29</th>
              <th className="text-center p-2 text-[#2d5a52] font-bold">Elite €79</th>
            </tr>
          </thead>
          <tbody className="text-[#3a5550]">
            {[
              { feature: "Daily exercises", free: "7 days", bloom: "30 days", elite: "90 days" },
              { feature: "Meal plans & recipes", free: "Day 1 only", bloom: "30 days rotating", elite: "90 days rotating" },
              { feature: "Supplement tracking", free: "Preview", bloom: "✓ Full", elite: "✓ Full" },
              { feature: "Cycle tracker (BBT, OPK)", free: "✓", bloom: "✓", elite: "✓" },
              { feature: "Partner Dashboard (his)", free: "✓", bloom: "✓", elite: "✓" },
              { feature: "Couple Mode", free: "—", bloom: "✓", elite: "✓" },
              { feature: "Spermiogram tracker", free: "—", bloom: "✓", elite: "✓" },
              { feature: "Medication tracker", free: "—", bloom: "✓", elite: "✓" },
              { feature: "Weekly summaries", free: "—", bloom: "✓", elite: "✓" },
              { feature: "Shopping lists (14-day)", free: "—", bloom: "✓", elite: "✓" },
              { feature: "Progress analytics", free: "Basic", bloom: "✓ Full", elite: "✓ Full" },
              { feature: "Doctor report", free: "—", bloom: "—", elite: "✓" },
              { feature: "Custom workouts", free: "—", bloom: "—", elite: "✓" },
              { feature: "Priority support", free: "—", bloom: "—", elite: "✓" },
            ].map((row) => (
              <tr key={row.feature} className="border-b border-[#f0faf8]">
                <td className="p-2 font-medium">{row.feature}</td>
                <td className="p-2 text-center text-[#5a7570]">{row.free}</td>
                <td className="p-2 text-center">{row.bloom}</td>
                <td className="p-2 text-center">{row.elite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MONEY BACK GUARANTEE */}
      <section className="soft-card p-6 mb-8 text-center border-l-4 border-l-green-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">💸</span>
          <h3 className="text-lg text-[#2d5a52]">30-Day Money-Back Guarantee</h3>
        </div>
        <p className="text-xs text-[#5a7570] max-w-md mx-auto">
          Try the full program risk-free. If you&apos;re not satisfied within 30 days, we&apos;ll refund you — no questions asked. We&apos;re confident you&apos;ll love it.
        </p>
      </section>

      {/* TESTIMONIAL */}
      <section className="soft-card p-5 mb-8 border-l-4 border-l-[#5ba89d]">
        <p className="text-sm text-[#3a5550] italic mb-2">
          &ldquo;We conceived after 4 months of using the program. The cycle tracking and his supplement protocol made all the difference. Best €29 we ever spent.&rdquo;
        </p>
        <p className="text-xs text-[#5a7570]">— Ana & Marko, ages 32 & 34</p>
      </section>

      {/* CLINIC CODE */}
      <section className="soft-card p-6 text-center mt-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">🏥</span>
          <h3 className="text-lg text-[#2d5a52]">Have a Clinic Access Code?</h3>
        </div>
        <p className="text-xs text-[#5a7570] mb-4">
          If your fertility clinic gave you an access code, activate it for free premium access.
        </p>
        <Link href="/activate" className="btn-outline px-6 py-2.5 text-sm inline-block">
          Enter Clinic Code →
        </Link>
      </section>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading plans...</div>}>
      <PricingContent />
    </Suspense>
  );
}
