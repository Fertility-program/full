import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "The Evening Routine That Optimizes Your Fertility Hormones",
  description: "How a 15-minute wind-down routine supports progesterone production, improves sleep quality, and creates the hormonal environment your body needs to conceive.",
};

export default function FertilitySleepArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block">← Back to Blog</Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">Sleep</span>
          <span className="text-[11px] text-[#6aab9f]">4 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          The Evening Routine That Optimizes Your Fertility Hormones
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          Sleep is when your body produces the hormones essential for conception. Poor sleep disrupts progesterone, increases cortisol, and can interfere with ovulation. This 15-minute evening routine helps create the hormonal environment your body needs.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The Sleep-Fertility Connection</h2>
            <p className="mb-4">
              Research shows that women who sleep fewer than 7 hours per night have lower progesterone levels and more irregular cycles. During sleep, your body regulates luteinizing hormone (LH), follicle-stimulating hormone (FSH), and melatonin — all critical for ovulation and implantation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The 15-Minute Wind-Down</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Minutes 1-5: Hip Opening & Pelvic Stretches</p>
                <p className="text-sm">Butterfly pose, supine pigeon, and gentle hip circles. These increase blood flow to the reproductive organs and release tension stored in the pelvis — especially helpful during the luteal phase.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Minutes 5-10: Legs Up the Wall</p>
                <p className="text-sm">This restorative inversion calms the nervous system, reduces cortisol, and promotes blood flow to the uterus. Hold for 5 minutes with slow, deep breathing. Particularly beneficial after intercourse during the fertile window.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Minutes 10-15: 4-7-8 Breathing</p>
                <p className="text-sm">Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. This activates the parasympathetic nervous system, lowering cortisol and signaling your body that it&apos;s safe to prioritize reproductive function.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The One Habit Change</h2>
            <p>
              Stop all screens 30 minutes before bed. Blue light suppresses melatonin, and melatonin isn&apos;t just a sleep hormone — it&apos;s a powerful antioxidant that protects egg quality. Studies show women with higher melatonin levels have better IVF outcomes and healthier eggs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Bonus: Magnesium & Tart Cherry</h2>
            <p>
              A cup of tart cherry juice (natural melatonin source) with 200mg magnesium glycinate before bed. Magnesium supports progesterone production and reduces muscle tension. Tart cherry provides natural melatonin without supplements. Cost: about €0.50.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">Results to Expect</h2>
            <p>Most women notice improved sleep within 5-7 days and more regular cycles within 2-3 months. Our program includes fertility-optimized evening routines and cycle-phase-specific relaxation exercises in every plan.</p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">Get a Fertility-Optimized Sleep Plan</h3>
        <p className="text-[#5a7570] mb-6 text-sm">Tell us about your sleep and cycle, and we&apos;ll build a plan to support your hormones.</p>
        <Link href="/quiz" className="btn-primary">Take Free Assessment</Link>
      </div>
      <BlogJsonLd
        title="The Evening Routine That Optimizes Your Fertility Hormones"
        description="How a 15-minute wind-down routine supports progesterone production, improves sleep quality, and creates the hormonal environment your body needs to conceive."
        slug="sleep-better-after-40"
        datePublished="2025-02-01"
      />
    </main>
  );
}
