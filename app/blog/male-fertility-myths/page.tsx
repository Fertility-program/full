import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "10 Male Fertility Myths vs Facts — What Science Actually Says",
  description: "Debunking common male fertility myths with clinical evidence. Learn what really affects sperm quality, count, and motility based on WHO 2021 data and peer-reviewed research.",
};

export default function MaleFertilityMythsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold uppercase">Male Fertility</span>
            <span className="text-[10px] text-[#5a7570]">8 min read</span>
          </div>
          <h1 className="text-4xl text-[#2d5a52] mb-3">10 Male Fertility Myths vs Facts</h1>
          <p className="text-lg text-[#3a5550]">
            Male factor contributes to 50% of infertility cases, yet misinformation is everywhere. Here&apos;s what peer-reviewed research actually says.
          </p>
          <p className="text-xs text-[#5a7570] mt-3">Published May 2025 • Updated with WHO 2021 reference values</p>
        </header>

        <div className="space-y-8">
          {/* MYTH 1 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Fertility is mainly a woman&apos;s issue&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Male factor is the sole cause in 20-30% of infertility cases and a contributing factor in another 20-30%. Combined, male issues play a role in roughly half of all couples struggling to conceive.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: WHO Manual for the Examination of Human Semen, 6th Edition (2021)</p>
          </section>

          {/* MYTH 2 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Men can have babies at any age without issues&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Male fertility declines after 40. Sperm DNA fragmentation increases 1-2% per year after age 35. Men over 45 have 5x higher risk of taking over a year to conceive. Paternal age is also linked to increased risk of autism, schizophrenia, and genetic mutations in offspring.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Sharma et al., Reproductive Biology and Endocrinology (2015)</p>
          </section>

          {/* MYTH 3 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;You should save up sperm for ovulation day&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Abstinence longer than 5 days actually DECREASES sperm quality. Older sperm accumulate DNA damage. Optimal abstinence is 2-3 days. Daily ejaculation during the fertile window does not deplete sperm in healthy men — it actually improves DNA integrity.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Levitas et al., Fertility and Sterility (2005); Agarwal et al. (2016)</p>
          </section>

          {/* MYTH 4 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Tight underwear doesn&apos;t really matter&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                A Harvard study of 656 men found that those wearing boxers had 25% higher sperm concentration and 17% higher total count compared to those wearing briefs. Testes need to be 2-3°C below body temperature for optimal sperm production. Tight underwear, hot baths, saunas, and laptops on laps all raise scrotal temperature.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Minguez-Alarcon et al., Human Reproduction (2018)</p>
          </section>

          {/* MYTH 5 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;A few drinks won&apos;t affect sperm&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Even moderate alcohol consumption (5+ drinks/week) is associated with reduced sperm quality. A Danish study of 1,221 men found that those drinking 25+ units/week had 33% lower sperm count. Alcohol reduces testosterone, increases estrogen, and directly damages developing sperm cells.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Jensen et al., BMJ Open (2014)</p>
          </section>

          {/* MYTH 6 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Supplements don&apos;t work for male fertility&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Multiple randomized controlled trials show significant improvements: Zinc + Folate increased normal sperm count by 74%. CoQ10 improved motility by 26%. L-Carnitine improved progressive motility by 20-30%. Selenium + Vitamin E reduced DNA fragmentation. The key is consistency for at least 74 days (one full sperm cycle).
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Zhao et al. (2016); Safarinejad (2012); Lenzi et al. (2004)</p>
          </section>

          {/* MYTH 7 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;More exercise is always better for fertility&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Moderate exercise (30 min, 5x/week) improves sperm quality. But extreme endurance training (marathon, triathlon, cycling 5+ hours/week) raises cortisol, lowers testosterone, and increases scrotal temperature. Professional cyclists have 2x higher rate of abnormal sperm morphology.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Wise et al., Fertility and Sterility (2011)</p>
          </section>

          {/* MYTH 8 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Cannabis is natural so it&apos;s fine&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                THC directly binds to receptors in the testes and disrupts the hypothalamic-pituitary-gonadal axis. Regular cannabis use reduces sperm count by 28%, impairs motility, and causes abnormal morphology. It also affects the acrosome reaction (sperm&apos;s ability to penetrate the egg). Effects are reversible after 3+ months of abstinence.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Gundersen et al., American Journal of Epidemiology (2015)</p>
          </section>

          {/* MYTH 9 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;If the semen analysis is normal, there&apos;s no male problem&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Standard semen analysis only measures volume, count, motility, and morphology. It does NOT test DNA fragmentation, which can be high even with &quot;normal&quot; SA results. Up to 40% of men with unexplained infertility have high DNA fragmentation. A DNA fragmentation test (SCSA or TUNEL) should be considered after 6+ months of unexplained infertility.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Agarwal et al., Reproductive Biology and Endocrinology (2020)</p>
          </section>

          {/* MYTH 10 */}
          <section className="soft-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">MYTH</span>
              <h2 className="text-lg text-[#2d5a52]">&quot;Testosterone supplements boost fertility&quot;</h2>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-3">
              <p className="text-xs font-bold text-green-700 mb-1">FACT:</p>
              <p className="text-sm text-[#3a5550]">
                Exogenous testosterone (TRT, anabolic steroids) COMPLETELY shuts down natural sperm production by suppressing FSH and LH via negative feedback. Many men on TRT have zero sperm count. Recovery after stopping takes 6-12 months, and some men never fully recover. If testosterone is low, a fertility specialist can prescribe alternatives (clomiphene, HCG) that boost T without killing sperm.
              </p>
            </div>
            <p className="text-xs text-[#5a7570] italic">Source: Patel et al., Translational Andrology and Urology (2019)</p>
          </section>
        </div>

        {/* BOTTOM LINE */}
        <section className="soft-card p-6 mt-8 border-l-4 border-l-[#5ba89d]">
          <h2 className="text-xl text-[#2d5a52] mb-3">The Bottom Line</h2>
          <p className="text-sm text-[#3a5550] mb-4">
            Male fertility is highly modifiable. Unlike egg quality (which declines with age), sperm quality can be significantly improved in just 74 days through lifestyle changes. The most impactful actions:
          </p>
          <ol className="text-sm text-[#3a5550] space-y-1">
            <li>1. Take evidence-based supplements (Zinc, CoQ10, D3, Omega-3)</li>
            <li>2. Eliminate heat exposure to testes</li>
            <li>3. Stop smoking and limit alcohol</li>
            <li>4. Exercise moderately (not excessively)</li>
            <li>5. Get a semen analysis early — don&apos;t wait</li>
          </ol>
        </section>

        {/* CTA */}
        <section className="soft-card p-6 mt-6 text-center">
          <p className="text-sm text-[#3a5550] mb-4">
            Track his daily habits, supplements, and spermiogram results with our free Partner Dashboard.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/partner" className="btn-primary px-6 py-2 text-sm">His Dashboard →</Link>
            <Link href="/free-guide" className="btn-outline px-6 py-2 text-sm">Free Fertility Guide</Link>
            <Link href="/blog" className="btn-outline px-6 py-2 text-sm">← All Articles</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
