import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Fertility Supplements 2025 — Complete Guide for Her & Him",
  description: "Evidence-based fertility supplement guide with exact doses, timing, and clinical references. CoQ10, Folate, Zinc, Vitamin D, Omega-3 and more for both partners.",
};

export default function FertilitySupplementsGuidePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Supplements</span>
            <span className="text-[10px] text-[#5a7570]">12 min read</span>
          </div>
          <h1 className="text-4xl text-[#2d5a52] mb-3">The Complete Fertility Supplement Guide (2025)</h1>
          <p className="text-lg text-[#3a5550]">
            Which supplements actually work for fertility? We reviewed the clinical evidence for every popular supplement — here&apos;s what&apos;s worth taking, exact doses, and what to skip.
          </p>
        </header>

        <div className="space-y-8 text-sm text-[#3a5550] leading-relaxed">
          <section className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs text-amber-800"><strong>⚠️ Important:</strong> Always consult your doctor before starting supplements, especially if you take medication. This is educational content, not medical advice.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">For Her — Essential Supplements</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">1. Folate (Methylfolate) — 400-800mcg</h3>
                <p className="mb-2">The most important fertility supplement. Prevents neural tube defects and supports DNA synthesis in rapidly dividing cells. Start 3 months before conception.</p>
                <p className="text-xs text-[#5a7570]"><strong>Why methylfolate over folic acid:</strong> ~40% of people have MTHFR gene variants that reduce folic acid conversion. Methylfolate is the active form that works for everyone.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with breakfast</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">2. CoQ10 (Ubiquinol) — 200-600mg</h3>
                <p className="mb-2">Eggs are the most mitochondria-dense cells in the body. CoQ10 fuels mitochondria, directly improving egg quality. Particularly important after 35 when natural CoQ10 production declines.</p>
                <p className="text-xs text-[#5a7570]"><strong>Evidence:</strong> RCTs show improved IVF outcomes, better embryo quality, and higher pregnancy rates. Ubiquinol form is 3-6x better absorbed than ubiquinone.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with breakfast (fat-containing meal)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">3. Vitamin D3 — 2,000-4,000 IU</h3>
                <p className="mb-2">70% of women are deficient. Vitamin D receptors are found in the uterus, ovaries, and placenta. Deficiency is linked to implantation failure, miscarriage, and preeclampsia.</p>
                <p className="text-xs text-[#5a7570]"><strong>Optimal level:</strong> 40-60 ng/mL (most women are 20-30). Get tested and supplement accordingly.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with breakfast (needs fat for absorption)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">4. Omega-3 DHA/EPA — 1,000-2,000mg</h3>
                <p className="mb-2">Anti-inflammatory, improves egg quality, and DHA is critical for fetal brain development. Particularly beneficial for women with endometriosis or PCOS (both inflammatory conditions).</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with any meal</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">5. Myo-Inositol — 2,000-4,000mg (especially for PCOS)</h3>
                <p className="mb-2">Improves insulin sensitivity and restores ovulation in 60-70% of women with PCOS. Multiple RCTs show it&apos;s as effective as metformin for cycle regulation with fewer side effects.</p>
                <p className="text-xs text-[#5a7570]"><strong>Dose:</strong> 2000mg twice daily (4000mg total). Often combined with D-chiro-inositol in 40:1 ratio.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Split AM/PM doses</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">For Him — Essential Supplements</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">1. Zinc — 30mg</h3>
                <p className="mb-2">The single most important male fertility mineral. Required for testosterone synthesis, sperm maturation, and DNA integrity. Meta-analysis showed 74% increase in sperm count in subfertile men.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with food (can cause nausea on empty stomach)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">2. CoQ10 — 200-300mg</h3>
                <p className="mb-2">Provides energy for sperm motility and protects sperm DNA from oxidative damage. RCTs show 26% improvement in progressive motility and 33% improvement in concentration.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with breakfast</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">3. L-Carnitine — 1,500-2,000mg</h3>
                <p className="mb-2">Transports fatty acids into mitochondria — directly fuels sperm movement. Multiple RCTs show 20-30% improvement in motility. One of the most well-studied male fertility supplements.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take in the morning</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">4. Selenium — 100mcg</h3>
                <p className="mb-2">Component of selenoproteins that protect sperm DNA from oxidative damage. Also supports sperm morphology. 2-3 Brazil nuts daily provide the full requirement naturally.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with food (or eat Brazil nuts)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="text-base font-bold text-[#2d5a52] mb-1">5. Vitamin C + E — 500mg + 400 IU</h3>
                <p className="mb-2">Powerful antioxidant combination. Protects sperm DNA from oxidative stress. Particularly important for smokers (reduces DNA fragmentation by 50%). Vitamin E also improves sperm membrane integrity.</p>
                <p className="text-xs text-[#5ba89d] mt-1">⏰ Take with meals</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">What to Skip</h2>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                <p><strong>DHEA</strong> — Only under doctor supervision. Can worsen PCOS. Useful only for diminished ovarian reserve in IVF context.</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                <p><strong>Testosterone (for him)</strong> — Exogenous testosterone SHUTS DOWN sperm production. Never take without fertility specialist guidance.</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                <p><strong>High-dose Vitamin A</strong> — Teratogenic (causes birth defects) above 10,000 IU. Get from food (beta-carotene is safe).</p>
              </div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                <p><strong>Unregulated &quot;fertility blends&quot;</strong> — Often underdosed, proprietary blends hide actual amounts. Buy individual supplements at clinical doses instead.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Timeline: When to Start</h2>
            <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <ul className="space-y-2">
                <li><strong>3 months before TTC:</strong> Both start full supplement protocol. His sperm needs 74 days to develop.</li>
                <li><strong>Ongoing:</strong> Continue through conception and early pregnancy (her). He can stop after confirmed pregnancy.</li>
                <li><strong>Results timeline:</strong> Egg quality improvements: 2-3 months. Sperm improvements: 2-3 months (one full cycle).</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="soft-card p-6 mt-8 text-center">
          <p className="text-sm text-[#3a5550] mb-4">Track your daily supplements with reminders and see your consistency over time.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/quiz" className="btn-primary px-6 py-2 text-sm">Start Free Program →</Link>
            <Link href="/partner" className="btn-outline px-6 py-2 text-sm">His Dashboard</Link>
            <Link href="/blog" className="btn-outline px-6 py-2 text-sm">← All Articles</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
