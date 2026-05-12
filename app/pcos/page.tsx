"use client";

import Link from "next/link";

export default function PCOSLandingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 mb-6 text-center">
        <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">For Women with PCOS</span>
        <h1 className="text-4xl text-[#2d5a52] mt-4 mb-3">PCOS Fertility Program</h1>
        <p className="text-lg text-[#3a5550] max-w-2xl mx-auto">
          Irregular cycles, anovulation, insulin resistance — PCOS makes conception harder, but not impossible. 80% of women with PCOS conceive with the right approach.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 gap-3 mb-6">
        {[
          { stat: "70%", desc: "restore ovulation with myo-inositol" },
          { stat: "80%", desc: "conceive with lifestyle + treatment" },
          { stat: "2-3", desc: "months to see cycle improvements" },
        ].map((s) => (
          <div key={s.desc} className="soft-card p-4 text-center">
            <p className="text-2xl font-bold text-[#5ba89d]">{s.stat}</p>
            <p className="text-[9px] text-[#5a7570]">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* WHAT WE ADDRESS */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">What Our PCOS Program Addresses</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: "📅", title: "Irregular Cycles", desc: "Restore ovulation with myo-inositol, diet changes, and cycle-synced movement" },
            { icon: "⚖️", title: "Insulin Resistance", desc: "Low-GI meal plans, strength training, and supplements that improve insulin sensitivity" },
            { icon: "🧪", title: "Elevated Androgens", desc: "Spearmint tea protocol, zinc, and anti-androgen nutrition strategies" },
            { icon: "🔥", title: "Chronic Inflammation", desc: "Anti-inflammatory foods, omega-3, turmeric, and gentle exercise" },
            { icon: "😴", title: "Sleep & Stress", desc: "Magnesium, evening routines, and breathing exercises to lower cortisol" },
            { icon: "🎯", title: "Ovulation Tracking", desc: "OPK + BBT + cervical mucus tracking adapted for irregular cycles" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <span className="text-xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-[#2d5a52] mt-1">{item.title}</h3>
              <p className="text-xs text-[#5a7570] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PCOS SUPPLEMENT STACK */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">💊 PCOS Supplement Protocol</h2>
        <div className="space-y-2">
          {[
            { name: "Myo-Inositol", dose: "4000mg/day (split AM/PM)", evidence: "Restores ovulation in 60-70% of PCOS women (multiple RCTs)" },
            { name: "Vitamin D3", dose: "3000-4000 IU", evidence: "67-85% of PCOS women are deficient. Improves insulin sensitivity." },
            { name: "Omega-3", dose: "2000mg DHA/EPA", evidence: "Reduces inflammation and androgens in PCOS" },
            { name: "Zinc Picolinate", dose: "30-50mg", evidence: "Reduces androgens, supports ovulation, improves acne" },
            { name: "Magnesium", dose: "400mg glycinate", evidence: "Improves insulin sensitivity and sleep quality" },
            { name: "B-Complex (B-50)", dose: "1 daily", evidence: "B6 supports progesterone, B12 for energy, folate for conception" },
            { name: "Berberine", dose: "500mg 2x/day", evidence: "Natural metformin alternative — improves insulin resistance (discuss with doctor)" },
          ].map((s) => (
            <div key={s.name} className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8] flex items-start gap-3">
              <span className="text-[#5ba89d] mt-0.5">•</span>
              <div>
                <p className="text-sm text-[#2d5a52]"><strong>{s.name}</strong> — {s.dose}</p>
                <p className="text-[10px] text-[#5a7570]">{s.evidence}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEAL PLAN PREVIEW */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-3">🥗 PCOS-Friendly Nutrition</h2>
        <p className="text-xs text-[#5a7570] mb-4">Low glycemic, anti-inflammatory, protein-rich meals that stabilize insulin:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#3a5550]">
          <div className="p-3 rounded-xl bg-green-50/50 border border-green-100">
            <p className="font-bold text-green-700 text-[9px] uppercase mb-1">Eat More</p>
            <p>Fatty fish, eggs, leafy greens, berries, nuts, seeds, legumes, whole grains, avocado, olive oil</p>
          </div>
          <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
            <p className="font-bold text-red-700 text-[9px] uppercase mb-1">Avoid</p>
            <p>Sugar, white bread/rice, fried food, soda, excess dairy, processed meat, alcohol</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="soft-card p-8 text-center mb-6">
        <h2 className="text-2xl text-[#2d5a52] mb-3">Start Your PCOS Fertility Plan</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          Take our 2-minute assessment. We&apos;ll create a personalized program based on your PCOS symptoms, cycle length, and goals.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/quiz" className="btn-primary px-8 py-3 text-base">Take Free Assessment →</Link>
          <Link href="/blog/pcos-and-pregnancy" className="btn-outline px-6 py-3 text-sm">Read PCOS Guide</Link>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/supplements" className="btn-outline text-xs px-4 py-2">Full Supplement Guide</Link>
        <Link href="/free-guide" className="btn-outline text-xs px-4 py-2">Free Fertility Guide</Link>
        <Link href="/" className="btn-outline text-xs px-4 py-2">← Home</Link>
      </div>
    </main>
  );
}
