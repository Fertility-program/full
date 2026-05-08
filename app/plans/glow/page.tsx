"use client";

import Link from "next/link";

export default function BloomPlanPage() {
  const features = [
    "30-Day Fertility Wellness Program",
    "Cycle-synced daily movement sessions",
    "Stress & cortisol reduction routines",
    "Fertility nutrition with shopping lists",
    "Ovulation support protocols",
    "Hormone-balancing breathwork",
    "Smart symptom-based daily plans",
    "Progress dashboard tracking",
    "Monthly reassessment upgrade",
    "Mobile friendly guided sessions",
  ];

  const results = [
    "More regular cycles",
    "Better sleep & energy",
    "Reduced stress & anxiety",
    "Improved hormone balance",
    "Greater body confidence",
    "Daily structure & motivation",
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      <section className="soft-card p-10 text-center mb-10">
        <p className="uppercase tracking-[0.25em] text-sm text-[#6aab9f] mb-4">
          Bloom Membership
        </p>
        <h1 className="text-6xl mb-5">Nourish, Balance & Bloom</h1>
        <p className="text-[#5a7570] text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          A complete 30-day fertility reset designed for women preparing their body for conception through movement, nutrition and stress reduction.
        </p>
        <div className="text-7xl mb-8">€29</div>
        <Link href="/checkout?plan=glow" className="btn-primary">Start Bloom Now</Link>
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="soft-card p-8">
          <h2 className="text-4xl mb-6">Everything Included</h2>
          <div className="space-y-4">
            {features.map((item) => (
              <div key={item} className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="soft-card p-8">
          <h2 className="text-4xl mb-6">What Women Love</h2>
          <div className="space-y-4">
            {results.map((item) => (
              <div key={item} className="p-4 rounded-2xl bg-[#f0faf8]">🌸 {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-card p-10 mb-10">
        <h2 className="text-5xl mb-6">Perfect If You Want To...</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Regulate your menstrual cycle",
            "Reduce stress & cortisol",
            "Improve egg quality naturally",
            "Eat for fertility on a budget",
            "Build a daily wellness routine",
            "Prepare your body for conception",
          ].map((item) => (
            <div key={item} className="p-5 rounded-3xl bg-white border border-[#c2ddd8]">✓ {item}</div>
          ))}
        </div>
      </section>

      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-5">Your Next 30 Days Can Change Everything</h2>
        <p className="text-[#5a7570] text-lg mb-8">Start now and build the foundation for your fertility journey.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/checkout?plan=glow" className="btn-primary">Join Bloom €29</Link>
          <Link href="/plans/elite" className="btn-outline">Compare With Elite</Link>
        </div>
      </section>
    </main>
  );
}
