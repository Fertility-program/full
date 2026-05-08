"use client";

import Link from "next/link";

export default function ElitePlanPage() {
  const features = [
    "Everything included in Bloom",
    "90-Day Full Fertility Roadmap",
    "Advanced hormone optimization",
    "Cycle-phase specific protocols",
    "Reproductive health movement system",
    "Anti-inflammatory deep nutrition",
    "Monthly reassessment engine",
    "VIP premium guided sessions",
    "Priority future updates",
    "Elite transformation dashboard",
    "Long-term lifestyle progression",
    "Premium fertility accelerator system",
  ];

  const outcomes = [
    "Optimized hormone levels",
    "More regular ovulation",
    "Reduced inflammation",
    "Better egg quality markers",
    "Premium accountability structure",
    "Long-term healthy habits",
  ];

  const compare = [
    ["Program Length", "90 Days"],
    ["Guided Sessions", "Premium Library"],
    ["Reassessments", "Monthly Smart Upgrades"],
    ["Hormone Optimization", "Included"],
    ["Advanced Fertility Protocols", "Included"],
    ["Priority Updates", "Included"],
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">
      <section className="soft-card p-10 text-center mb-10 relative overflow-hidden">
        <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#e8f8f5] text-[#3d8a7d] text-sm font-medium">
          Best Value
        </div>
        <p className="uppercase tracking-[0.25em] text-sm text-[#6aab9f] mb-4">Elite Membership</p>
        <h1 className="text-6xl mb-5">Full Premium Fertility Transformation</h1>
        <p className="text-[#5a7570] text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          Built for women who want comprehensive support: hormone optimization, cycle regulation, nutrition and long-term reproductive wellness.
        </p>
        <div className="text-7xl mb-8">€79</div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/checkout?plan=elite" className="btn-primary">Start Elite Now</Link>
          <Link href="/plans/glow" className="btn-outline">Compare Bloom</Link>
        </div>
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
          <h2 className="text-4xl mb-6">Elite Outcomes</h2>
          <div className="space-y-4">
            {outcomes.map((item) => (
              <div key={item} className="p-4 rounded-2xl bg-[#f0faf8]">🌸 {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-card p-10 mb-10">
        <h2 className="text-5xl mb-8">Why Elite?</h2>
        <div className="space-y-4">
          {compare.map(([label, value]) => (
            <div key={label} className="grid md:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-[#c2ddd8]">
              <div className="text-[#5a7570]">{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="soft-card p-10 mb-10">
        <h2 className="text-5xl mb-6">Perfect If You Want...</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Complete fertility body preparation",
            "Optimized hormone balance",
            "Better ovulation regularity",
            "Reduced inflammation & PCOS support",
            "Long-term premium guidance",
            "Serious transformation structure",
          ].map((item) => (
            <div key={item} className="p-5 rounded-3xl bg-white border border-[#c2ddd8]">✓ {item}</div>
          ))}
        </div>
      </section>

      <section className="soft-card p-10 text-center">
        <h2 className="text-5xl mb-5">Commit To Your Fertility Journey</h2>
        <p className="text-[#5a7570] text-lg mb-8">
          Elite is for women ready to transform with a deeper, smarter and more complete system.
        </p>
        <Link href="/checkout?plan=elite" className="btn-primary">Join Elite €79</Link>
      </section>
    </main>
  );
}
