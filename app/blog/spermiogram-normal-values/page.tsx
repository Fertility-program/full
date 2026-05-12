import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spermiogram Normal Values (WHO 2021) — How to Read Your Semen Analysis",
  description: "Complete guide to understanding semen analysis results. WHO 2021 reference values for volume, concentration, motility, morphology. What's normal, what's low, and how to improve.",
};

export default function SpermiogramValuesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Male Fertility</span>
            <span className="text-[10px] text-[#5a7570]">7 min read</span>
          </div>
          <h1 className="text-4xl text-[#2d5a52] mb-3">How to Read Your Semen Analysis: WHO 2021 Normal Values</h1>
          <p className="text-lg text-[#3a5550]">
            Got your semen analysis results but confused by the numbers? Here&apos;s exactly what each parameter means, what&apos;s normal, and what you can do if something is low.
          </p>
        </header>

        <div className="space-y-8 text-sm text-[#3a5550] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">WHO 2021 Reference Values (6th Edition)</h2>
            <p className="mb-4">These are the lower reference limits — meaning 95% of fertile men score above these numbers. Being at or slightly below doesn&apos;t mean infertility, but it does mean there&apos;s room for improvement.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f0faf8]">
                    <th className="p-3 text-left text-[#2d5a52] border border-[#c2ddd8]">Parameter</th>
                    <th className="p-3 text-left text-[#2d5a52] border border-[#c2ddd8]">Normal (WHO 2021)</th>
                    <th className="p-3 text-left text-[#2d5a52] border border-[#c2ddd8]">If Below</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Volume", normal: "≥ 1.5 mL", below: "Hypospermia — may indicate blockage or retrograde ejaculation" },
                    { param: "Concentration", normal: "≥ 16 million/mL", below: "Oligozoospermia — fewer sperm per mL" },
                    { param: "Total sperm count", normal: "≥ 39 million", below: "Low total count — volume × concentration" },
                    { param: "Progressive motility", normal: "≥ 30%", below: "Asthenozoospermia — sperm not swimming forward" },
                    { param: "Total motility", normal: "≥ 42%", below: "Too many non-moving sperm" },
                    { param: "Morphology", normal: "≥ 4% normal forms", below: "Teratozoospermia — abnormal shape" },
                    { param: "Vitality", normal: "≥ 54% alive", below: "Necrozoospermia — too many dead sperm" },
                    { param: "pH", normal: "≥ 7.2", below: "May indicate infection or blockage" },
                    { param: "White blood cells", normal: "< 1 million/mL", below: "Leukocytospermia — possible infection" },
                  ].map((row) => (
                    <tr key={row.param} className="hover:bg-[#f0faf8]/50">
                      <td className="p-3 border border-[#c2ddd8] font-medium">{row.param}</td>
                      <td className="p-3 border border-[#c2ddd8] text-[#5ba89d] font-bold">{row.normal}</td>
                      <td className="p-3 border border-[#c2ddd8] text-[#5a7570]">{row.below}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Important Notes About SA Results</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p><strong>Results vary 30% between tests.</strong> One bad result doesn&apos;t mean infertility. Always repeat after 2-3 months before drawing conclusions.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p><strong>Abstinence matters.</strong> 2-5 days is ideal. Less than 2 days = lower volume. More than 5 days = more dead sperm and DNA damage.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p><strong>SA doesn&apos;t test DNA fragmentation.</strong> You can have &quot;normal&quot; SA but high DNA damage. Consider a fragmentation test if unexplained infertility or recurrent miscarriage.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p><strong>Morphology is controversial.</strong> WHO says ≥4% is normal, but many fertile men score 2-3%. Don&apos;t panic about morphology alone.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">How to Improve Each Parameter</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="font-bold text-[#2d5a52] mb-1">Low Concentration (Oligozoospermia)</h3>
                <p>Zinc 30mg + Folate 400mcg daily (74% improvement in studies). Avoid heat, alcohol, smoking. Ensure adequate sleep and moderate exercise.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="font-bold text-[#2d5a52] mb-1">Low Motility (Asthenozoospermia)</h3>
                <p>CoQ10 200-300mg + L-Carnitine 1500-2000mg daily. These directly fuel sperm movement. Also: avoid heat exposure, exercise moderately, reduce oxidative stress.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="font-bold text-[#2d5a52] mb-1">Low Morphology (Teratozoospermia)</h3>
                <p>Vitamin C 1000mg + Vitamin E 400IU + Selenium 100mcg. Antioxidants protect developing sperm from DNA damage that causes abnormal shapes. Quit smoking immediately.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
                <h3 className="font-bold text-[#2d5a52] mb-1">Low Volume (Hypospermia)</h3>
                <p>Increase water intake to 3L/day. Ensure 2-5 days abstinence before test. Rule out retrograde ejaculation with your doctor if persistently low.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Timeline for Improvement</h2>
            <p className="mb-3">Spermatogenesis takes 74 days. Any lifestyle change needs at least one full cycle to show in results:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Week 1-2:</strong> New habits established, supplements started</li>
              <li>• <strong>Week 3-6:</strong> Existing sperm maturing, new sperm being created</li>
              <li>• <strong>Week 7-10:</strong> First batch of &quot;optimized&quot; sperm reaching maturity</li>
              <li>• <strong>Week 11-12:</strong> Retest SA — should see improvements</li>
            </ul>
          </section>
        </div>

        <section className="soft-card p-6 mt-8 text-center">
          <p className="text-sm text-[#3a5550] mb-4">
            Track your semen analysis results over time and get personalized recommendations based on your numbers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/partner" className="btn-primary px-6 py-2 text-sm">His Dashboard (Free) →</Link>
            <Link href="/free-guide" className="btn-outline px-6 py-2 text-sm">Free Guide</Link>
            <Link href="/blog" className="btn-outline px-6 py-2 text-sm">← All Articles</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
