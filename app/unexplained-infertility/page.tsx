"use client";

import Link from "next/link";

export default function UnexplainedInfertilityPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 mb-6 text-center">
        <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Unexplained Infertility</span>
        <h1 className="text-4xl text-[#2d5a52] mt-4 mb-3">When Tests Are Normal But You&apos;re Not Conceiving</h1>
        <p className="text-lg text-[#3a5550] max-w-2xl mx-auto">
          30% of infertility is &quot;unexplained&quot; — all tests normal, but no pregnancy. This often means lifestyle factors are the missing piece.
        </p>
      </section>

      {/* WHY IT HAPPENS */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">What &quot;Unexplained&quot; Often Means</h2>
        <p className="text-sm text-[#3a5550] mb-4">Standard fertility tests check the basics (hormones, tubes, sperm count) but miss subtler issues:</p>
        <div className="space-y-3">
          {[
            { issue: "Egg quality issues", detail: "Not tested by standard bloodwork. Mitochondrial function declines with age and oxidative stress. CoQ10 and antioxidants help." },
            { issue: "Sperm DNA fragmentation", detail: "Standard SA doesn't test this. 40% of 'unexplained' cases have high DNA fragmentation. Lifestyle changes improve it in 74 days." },
            { issue: "Subtle timing errors", detail: "Many couples miss the fertile window by 1-2 days. OPK + cervical mucus tracking dramatically improves timing accuracy." },
            { issue: "Chronic low-grade inflammation", detail: "Doesn't show on standard tests but affects implantation. Anti-inflammatory diet and omega-3 reduce it." },
            { issue: "Stress & cortisol", detail: "High cortisol suppresses GnRH — the master fertility hormone. Women under high stress take 29% longer to conceive." },
            { issue: "Suboptimal endometrial receptivity", detail: "Lining may look fine on ultrasound but have poor blood flow. L-Arginine and vitamin E improve uterine blood flow." },
          ].map((item) => (
            <div key={item.issue} className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <h3 className="text-sm font-bold text-[#2d5a52]">{item.issue}</h3>
              <p className="text-xs text-[#5a7570] mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">Our Approach for Unexplained Infertility</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🧘‍♀️ For Her</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• CoQ10 600mg + antioxidant stack for egg quality</li>
              <li>• L-Arginine for uterine blood flow</li>
              <li>• Anti-inflammatory Mediterranean diet</li>
              <li>• Precise ovulation tracking (OPK + BBT + CM)</li>
              <li>• Stress reduction protocol (breathing, yoga)</li>
              <li>• Cycle-synced exercise (not too much, not too little)</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">👨 For Him</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• DNA fragmentation test (ask your doctor)</li>
              <li>• Full antioxidant protocol (C, E, Selenium, CoQ10)</li>
              <li>• Eliminate heat exposure completely</li>
              <li>• 74-day sperm optimization program</li>
              <li>• Zinc + L-Carnitine for motility</li>
              <li>• Reduce alcohol to zero during fertile window</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">💑 Together</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Every-other-day intercourse during fertile window</li>
              <li>• Fertility-friendly lubricant only (Pre-Seed)</li>
              <li>• Shared stress reduction (walks, breathing together)</li>
              <li>• Both optimize sleep (7-8 hours, consistent schedule)</li>
              <li>• Reduce environmental toxins (BPA, phthalates)</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">⏰ Timeline</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Month 1-2: Establish habits, start supplements</li>
              <li>• Month 3: His new sperm ready, her eggs optimized</li>
              <li>• Month 3-6: Timed intercourse with full optimization</li>
              <li>• If no success by month 6: consider IUI/IVF</li>
              <li>• Many couples conceive in months 3-5 of optimization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SUCCESS RATE */}
      <section className="soft-card p-5 mb-6 border-l-4 border-l-[#5ba89d]">
        <p className="text-sm text-[#3a5550]">
          <strong>Research shows:</strong> Couples with unexplained infertility who optimize lifestyle factors (diet, supplements, timing, stress) have conception rates comparable to fertile couples within 3-6 months. The key is addressing ALL factors simultaneously — not just one.
        </p>
      </section>

      {/* CTA */}
      <section className="soft-card p-8 text-center mb-6">
        <h2 className="text-2xl text-[#2d5a52] mb-3">Optimize Everything at Once</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          Our program addresses all the subtle factors that standard tests miss — for both partners, every day, with tracking and accountability.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/quiz" className="btn-primary px-8 py-3 text-base">Start Free Program →</Link>
          <Link href="/partner" className="btn-outline px-6 py-3 text-sm">His 74-Day Program</Link>
          <Link href="/free-guide" className="btn-outline px-6 py-3 text-sm">Free Guide</Link>
        </div>
      </section>
    </main>
  );
}
