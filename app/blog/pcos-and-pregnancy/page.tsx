import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PCOS and Pregnancy — How to Conceive Naturally with Polycystic Ovary Syndrome",
  description: "Complete guide to getting pregnant with PCOS: ovulation induction, myo-inositol, diet changes, exercise, and when to seek help. Evidence-based strategies that work.",
};

export default function PCOSPregnancyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">PCOS</span>
            <span className="text-[10px] text-[#5a7570]">9 min read</span>
          </div>
          <h1 className="text-4xl text-[#2d5a52] mb-3">PCOS and Pregnancy: A Complete Guide</h1>
          <p className="text-lg text-[#3a5550]">
            PCOS is the most common cause of anovulatory infertility — but most women with PCOS can conceive with the right approach. Here&apos;s what actually works.
          </p>
        </header>

        <div className="space-y-8 text-sm text-[#3a5550] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Why PCOS Affects Fertility</h2>
            <p className="mb-3">PCOS (Polycystic Ovary Syndrome) affects 8-13% of women. The core issue for fertility is <strong>anovulation</strong> — your ovaries develop follicles but don&apos;t release eggs regularly. This is caused by:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Insulin resistance</strong> — high insulin stimulates excess androgen production</li>
              <li>• <strong>Elevated androgens</strong> — testosterone disrupts follicle maturation</li>
              <li>• <strong>LH/FSH imbalance</strong> — LH is often elevated, FSH suppressed</li>
              <li>• <strong>Chronic low-grade inflammation</strong> — further disrupts ovarian function</li>
            </ul>
            <p className="mt-3">The good news: PCOS is highly responsive to lifestyle changes. Many women restore ovulation within 2-3 months of targeted intervention.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Step 1: Myo-Inositol (The Game-Changer)</h2>
            <p className="mb-3">Myo-inositol is the most studied supplement for PCOS fertility. It&apos;s a B-vitamin-like compound that improves insulin signaling in the ovaries.</p>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs text-green-800"><strong>Clinical evidence:</strong> Multiple RCTs show myo-inositol restores ovulation in 60-70% of women with PCOS. It&apos;s as effective as metformin for cycle regulation with fewer GI side effects.</p>
            </div>
            <p><strong>Dose:</strong> 2000mg twice daily (4000mg total). Often combined with D-chiro-inositol in 40:1 ratio. Results typically seen within 2-3 cycles.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Step 2: Diet Changes</h2>
            <p className="mb-3">Since insulin resistance drives PCOS, diet is critical:</p>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <p><strong>Low glycemic index (GI) foods</strong> — swap white bread/rice for whole grains, sweet potato, quinoa. This prevents insulin spikes that trigger androgen production.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <p><strong>Protein with every meal</strong> — slows glucose absorption. Aim for 25-30g per meal (eggs, fish, legumes, chicken).</p>
              </div>
              <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <p><strong>Anti-inflammatory foods</strong> — fatty fish, turmeric, berries, leafy greens. PCOS involves chronic inflammation.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <p><strong>Spearmint tea 2x/day</strong> — RCT showed it reduces free testosterone and improves hirsutism in PCOS.</p>
              </div>
            </div>
            <p className="mt-3"><strong>Avoid:</strong> Sugar, refined carbs, trans fats, excessive dairy (can increase androgens in some women).</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Step 3: Exercise (But the Right Kind)</h2>
            <p className="mb-3">Exercise improves insulin sensitivity — the root cause of PCOS. But type matters:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Best:</strong> Strength training 3x/week + walking daily. Muscle mass improves insulin sensitivity long-term.</li>
              <li>• <strong>Good:</strong> HIIT 2x/week (20 min max). Improves insulin sensitivity acutely.</li>
              <li>• <strong>Avoid:</strong> Excessive cardio (&gt;60 min/day). Raises cortisol which worsens PCOS.</li>
            </ul>
            <p className="mt-3">Even 5% weight loss in overweight women with PCOS can restore ovulation.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Step 4: Supplements Stack for PCOS</h2>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Myo-Inositol 4000mg/day</strong> — restores ovulation</li>
              <li>• <strong>Vitamin D 3000-4000 IU</strong> — 67-85% of PCOS women are deficient</li>
              <li>• <strong>Omega-3 2000mg</strong> — reduces inflammation and androgens</li>
              <li>• <strong>Magnesium 300-400mg</strong> — improves insulin sensitivity</li>
              <li>• <strong>Zinc 30mg</strong> — reduces androgens, supports ovulation</li>
              <li>• <strong>Berberine 500mg 2x/day</strong> — natural alternative to metformin (discuss with doctor)</li>
              <li>• <strong>CoQ10 200-400mg</strong> — improves egg quality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Step 5: Track Ovulation Carefully</h2>
            <p className="mb-3">With PCOS, ovulation is unpredictable. Standard &quot;Day 14&quot; rules don&apos;t apply. You may ovulate on Day 20, 25, or later.</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>OPK strips:</strong> Start testing from Day 10, continue until positive (may take longer)</li>
              <li>• <strong>BBT tracking:</strong> Confirms ovulation happened (temp shift of 0.2°C+)</li>
              <li>• <strong>Cervical mucus:</strong> Egg-white mucus = approaching ovulation</li>
              <li>• <strong>Beware false LH surges:</strong> PCOS can cause multiple LH rises without ovulation. BBT confirms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">When to See a Doctor</h2>
            <p className="mb-3">If lifestyle changes + supplements don&apos;t restore regular ovulation within 3-4 months, medical options include:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Letrozole (Femara)</strong> — first-line ovulation induction for PCOS (better than Clomid)</li>
              <li>• <strong>Clomiphene (Clomid)</strong> — second-line, higher multiple pregnancy risk</li>
              <li>• <strong>Metformin</strong> — improves insulin sensitivity, often combined with letrozole</li>
              <li>• <strong>Ovarian drilling</strong> — laparoscopic procedure for resistant cases</li>
              <li>• <strong>IVF</strong> — if above options fail (PCOS women often respond well to IVF)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Success Rates</h2>
            <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <ul className="space-y-1">
                <li>• Lifestyle changes alone: 50-60% restore ovulation within 3 months</li>
                <li>• Letrozole: 60-80% ovulation rate, 30-40% pregnancy rate per cycle</li>
                <li>• IVF: 50-60% success rate per cycle for PCOS (often higher than average)</li>
                <li>• Overall: 80%+ of women with PCOS eventually conceive with treatment</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="soft-card p-6 mt-8 text-center">
          <p className="text-sm text-[#3a5550] mb-4">
            Our program includes PCOS-specific meal plans, cycle-synced exercises, and supplement tracking designed for insulin resistance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/quiz" className="btn-primary px-6 py-2 text-sm">Start PCOS Program →</Link>
            <Link href="/free-guide" className="btn-outline px-6 py-2 text-sm">Free Guide</Link>
            <Link href="/blog" className="btn-outline px-6 py-2 text-sm">← All Articles</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
