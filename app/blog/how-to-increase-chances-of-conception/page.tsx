import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Increase Your Chances of Conception — 12 Evidence-Based Tips",
  description: "Proven strategies to boost fertility naturally: timing, nutrition, supplements, lifestyle changes for both partners. Based on clinical research and WHO guidelines.",
};

export default function ConceptionTipsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Conception</span>
            <span className="text-[10px] text-[#5a7570]">10 min read</span>
          </div>
          <h1 className="text-4xl text-[#2d5a52] mb-3">12 Evidence-Based Ways to Increase Your Chances of Conception</h1>
          <p className="text-lg text-[#3a5550]">
            Whether you&apos;re just starting to try or have been at it for months, these research-backed strategies can significantly improve your odds each cycle.
          </p>
        </header>

        <div className="space-y-8 text-sm text-[#3a5550] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">1. Know Your Fertile Window</h2>
            <p className="mb-3">The fertile window is only 6 days per cycle — the 5 days before ovulation plus ovulation day itself. The egg lives just 12-24 hours, but sperm can survive up to 5 days in fertile cervical mucus.</p>
            <p className="mb-3"><strong>Best days for intercourse:</strong> O-2 and O-1 (two days and one day before ovulation) have the highest conception rates at 25-30% per cycle.</p>
            <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-xs"><strong>How to identify ovulation:</strong> Use OPK strips starting Day 10. A positive result means ovulation in 24-36 hours. Combine with cervical mucus observation (egg-white = peak fertility) for best accuracy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">2. Optimize Intercourse Frequency</h2>
            <p className="mb-3">Every 1-2 days during the fertile window is ideal. Daily intercourse does NOT deplete sperm in healthy men — a 2016 study showed daily ejaculation actually improves sperm DNA integrity.</p>
            <p><strong>Avoid:</strong> Abstinence longer than 5 days (increases DNA damage). Lubricants that aren&apos;t fertility-friendly (most kill sperm — use Pre-Seed or none).</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">3. Take the Right Supplements (Her)</h2>
            <p className="mb-3">Start at least 3 months before trying:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Folate 400-800mcg</strong> — prevents neural tube defects, supports DNA synthesis</li>
              <li>• <strong>CoQ10 200-600mg</strong> — improves egg quality (mitochondrial support)</li>
              <li>• <strong>Vitamin D 2000-4000 IU</strong> — linked to implantation success</li>
              <li>• <strong>Omega-3 1000-2000mg</strong> — reduces inflammation, supports egg quality</li>
              <li>• <strong>Iron 18-27mg</strong> — ovulatory infertility 40% lower with adequate iron</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">4. Optimize His Sperm (Him)</h2>
            <p className="mb-3">Male factor contributes to 50% of infertility. Sperm takes 74 days to develop, so start changes 2-3 months before trying:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Zinc 30mg + Folate 400mcg</strong> — increased normal sperm count by 74%</li>
              <li>• <strong>CoQ10 200mg</strong> — improved motility by 26%</li>
              <li>• <strong>Avoid heat</strong> — no hot baths, saunas, laptop on lap</li>
              <li>• <strong>Wear boxers</strong> — 25% higher sperm concentration vs briefs</li>
              <li>• <strong>Limit alcohol</strong> — &lt;3 drinks/week</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">5. Eat a Fertility-Friendly Diet</h2>
            <p className="mb-3">The Mediterranean diet is associated with 40% higher IVF success rates. Focus on:</p>
            <ul className="space-y-1 ml-4">
              <li>• Fatty fish 2-3x/week (salmon, sardines — Omega-3)</li>
              <li>• Leafy greens daily (folate, iron)</li>
              <li>• Whole grains over refined (insulin stability)</li>
              <li>• Full-fat dairy (associated with better ovulation vs low-fat)</li>
              <li>• Nuts and seeds (walnuts, Brazil nuts, pumpkin seeds)</li>
            </ul>
            <p className="mt-3"><strong>Avoid:</strong> Trans fats, excess sugar, processed meat, &gt;200mg caffeine/day.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">6. Manage Stress</h2>
            <p className="mb-3">Women under high stress take 29% longer to conceive. Cortisol directly suppresses GnRH (the master fertility hormone) in both partners.</p>
            <p><strong>What helps:</strong> Daily 5-min breathing exercises, walking in nature, limiting news/social media, therapy if TTC anxiety is overwhelming. Consider that the stress of &quot;trying&quot; itself can be counterproductive.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">7. Maintain a Healthy Weight</h2>
            <p className="mb-3">BMI 20-25 is optimal. Being underweight (BMI &lt;18.5) can stop ovulation entirely. Being overweight (BMI &gt;30) disrupts insulin and hormone balance. Even 5% weight loss in overweight women significantly improves ovulation rates.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">8. Exercise — But Not Too Much</h2>
            <p className="mb-3">150-300 minutes/week of moderate activity is optimal (WHO guideline). Excessive exercise (&gt;60 min/day intense) can suppress ovulation. During the luteal phase and TWW, keep it gentle — walking, yoga, swimming.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">9. Sleep 7-8 Hours</h2>
            <p className="mb-3">Sleep deprivation disrupts reproductive hormones. Men who sleep &lt;6 hours have 25% lower testosterone. Women with irregular sleep have more anovulatory cycles. Melatonin (produced during sleep) also acts as an antioxidant for eggs.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">10. Quit Smoking and Limit Alcohol</h2>
            <p className="mb-3">Smoking reduces fertility by 50% in women and damages sperm DNA in men. Effects reverse within 3 months of quitting. Alcohol — even moderate — reduces conception rates in both partners. Aim for zero during the TWW.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">11. Reduce Toxin Exposure</h2>
            <p className="mb-3">Endocrine disruptors (BPA, phthalates) are found in plastics, non-stick pans, receipts, and fragrances. Switch to glass containers, choose organic produce (especially the Dirty Dozen), and use fragrance-free personal care products.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">12. Don&apos;t Wait Too Long to Get Help</h2>
            <p className="mb-3">See a specialist if:</p>
            <ul className="space-y-1 ml-4">
              <li>• Under 35: no conception after 12 months</li>
              <li>• Over 35: no conception after 6 months</li>
              <li>• Over 40: immediately when starting TTC</li>
              <li>• Irregular periods, known PCOS/endometriosis, or previous miscarriages</li>
            </ul>
            <p className="mt-3">A semen analysis for him should be done early — it&apos;s cheap, non-invasive, and rules out 50% of potential issues.</p>
          </section>
        </div>

        {/* CTA */}
        <section className="soft-card p-6 mt-8 text-center">
          <h2 className="text-xl text-[#2d5a52] mb-3">Put These Tips Into Practice</h2>
          <p className="text-sm text-[#3a5550] mb-4">
            Our app turns these strategies into a daily actionable program — cycle-synced exercises, meal plans, supplement tracking, and a 74-day program for him.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/quiz" className="btn-primary px-6 py-2 text-sm">Free Assessment →</Link>
            <Link href="/free-guide" className="btn-outline px-6 py-2 text-sm">Download Free Guide</Link>
            <Link href="/blog" className="btn-outline px-6 py-2 text-sm">← All Articles</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
