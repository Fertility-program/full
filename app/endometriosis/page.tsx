"use client";

import Link from "next/link";

export default function EndometriosisPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 mb-6 text-center">
        <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Endometriosis & Fertility</span>
        <h1 className="text-4xl text-[#2d5a52] mt-4 mb-3">Conceiving with Endometriosis</h1>
        <p className="text-lg text-[#3a5550] max-w-2xl mx-auto">
          Endometriosis affects 1 in 10 women and is found in 25-50% of infertile women. But 60-70% conceive naturally or with treatment.
        </p>
      </section>

      {/* HOW ENDO AFFECTS FERTILITY */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">How Endometriosis Affects Conception</h2>
        <div className="space-y-3">
          {[
            { mechanism: "Inflammation", detail: "Endometrial implants create chronic inflammation that damages eggs, sperm, and embryos. Inflammatory cytokines are toxic to reproductive cells." },
            { mechanism: "Adhesions & scarring", detail: "Can block or distort fallopian tubes, preventing egg pickup. Adhesions around ovaries can trap eggs." },
            { mechanism: "Egg quality", detail: "Oxidative stress from inflammation damages mitochondria in developing eggs, reducing quality." },
            { mechanism: "Implantation issues", detail: "Altered endometrial receptivity — the lining may not be optimal for embryo attachment even if fertilization occurs." },
            { mechanism: "Pain & reduced frequency", detail: "Dyspareunia (painful intercourse) can reduce sexual frequency, especially around ovulation." },
          ].map((item) => (
            <div key={item.mechanism} className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <h3 className="text-sm font-bold text-[#2d5a52]">{item.mechanism}</h3>
              <p className="text-xs text-[#5a7570] mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT HELPS */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">Evidence-Based Strategies</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-green-50/50 border border-green-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🐟 Anti-Inflammatory Nutrition</h3>
            <p className="text-xs text-[#3a5550] mb-2">The Mediterranean diet reduces endometriosis symptoms and improves fertility outcomes:</p>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Omega-3 fatty fish 3x/week (reduces prostaglandins)</li>
              <li>• Turmeric daily (curcumin is a potent anti-inflammatory)</li>
              <li>• Colorful vegetables and berries (antioxidants)</li>
              <li>• Avoid: red meat, trans fats, alcohol, caffeine &gt;200mg</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-green-50/50 border border-green-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">💊 Supplement Protocol for Endo</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• <strong>Omega-3 2000-3000mg</strong> — reduces inflammation and pain</li>
              <li>• <strong>NAC (N-Acetyl Cysteine) 600mg 3x/day</strong> — RCT showed it reduces endometrioma size</li>
              <li>• <strong>Vitamin E 400IU + Vitamin C 1000mg</strong> — reduces pelvic pain and inflammation</li>
              <li>• <strong>CoQ10 400-600mg</strong> — protects eggs from oxidative damage</li>
              <li>• <strong>Curcumin 500mg 2x/day</strong> — anti-inflammatory, may reduce implant growth</li>
              <li>• <strong>Vitamin D 4000IU</strong> — immunomodulatory, reduces endo progression</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-green-50/50 border border-green-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🧘‍♀️ Movement for Endo</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Gentle yoga (reduces pain and stress)</li>
              <li>• Walking 30 min daily (improves circulation without aggravating)</li>
              <li>• Pelvic floor relaxation (endo often causes pelvic floor tension)</li>
              <li>• Avoid: high-impact exercise during flares</li>
              <li>• Swimming (low-impact, anti-inflammatory effect of cool water)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHEN TO ACT FAST */}
      <section className="soft-card p-6 mb-6 border-l-4 border-l-amber-400">
        <h2 className="text-xl text-[#2d5a52] mb-3">⏰ Don&apos;t Wait Too Long</h2>
        <p className="text-sm text-[#3a5550] mb-3">
          Endometriosis is progressive — it can worsen over time. If you have diagnosed endo and want to conceive:
        </p>
        <ul className="text-xs text-[#3a5550] space-y-1">
          <li>• <strong>Mild endo (Stage I-II):</strong> Try naturally for 6 months with optimization, then consider IUI</li>
          <li>• <strong>Moderate endo (Stage III):</strong> Try 3-6 months, then IUI or IVF</li>
          <li>• <strong>Severe endo (Stage IV):</strong> Consider IVF sooner — success rates are good (40-50%)</li>
          <li>• <strong>After surgery:</strong> Best fertility window is 6-12 months post-op — don&apos;t delay</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="soft-card p-8 text-center mb-6">
        <h2 className="text-2xl text-[#2d5a52] mb-3">Support Your Body While TTC with Endo</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          Our program includes anti-inflammatory meal plans, gentle cycle-synced exercises, and supplement tracking specifically designed for endometriosis.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/quiz" className="btn-primary px-8 py-3 text-base">Start Free Program →</Link>
          <Link href="/supplements" className="btn-outline px-6 py-3 text-sm">Supplement Guide</Link>
          <Link href="/doctor-prep" className="btn-outline px-6 py-3 text-sm">Doctor Prep</Link>
        </div>
      </section>
    </main>
  );
}
