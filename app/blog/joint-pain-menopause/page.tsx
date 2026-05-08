import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How Inflammation Affects Fertility (And What Actually Helps)",
  description: "The connection between chronic inflammation and conception difficulties, plus anti-inflammatory foods and lifestyle changes that support fertility.",
};

export default function InflammationFertilityArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block">← Back to Blog</Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">Health</span>
          <span className="text-[11px] text-[#6aab9f]">5 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          How Inflammation Affects Fertility (And What Actually Helps)
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          Chronic low-grade inflammation is one of the most overlooked barriers to conception. It can disrupt ovulation, impair implantation, and reduce egg quality — often without obvious symptoms. The good news: targeted nutrition and lifestyle changes can make a real difference.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The Inflammation-Fertility Connection</h2>
            <p>Inflammation is your immune system&apos;s response to stress, poor diet, or environmental toxins. When it becomes chronic, it can damage the uterine lining, interfere with embryo implantation, reduce egg quality, and disrupt the delicate hormonal signaling needed for ovulation. Conditions like endometriosis, PCOS, and unexplained infertility all have inflammatory components.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">4 Anti-Inflammatory Foods for Fertility</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { food: "Wild Salmon / Sardines", why: "Rich in omega-3 DHA & EPA. Reduces inflammatory markers and supports egg membrane health. €1.20/can." },
                { food: "Turmeric + Black Pepper", why: "Curcumin reduces NF-kB inflammation. Pepper increases absorption 2000%. Add to meals daily." },
                { food: "Leafy Greens", why: "Folate, antioxidants, and fiber. Spinach and kale reduce oxidative stress on eggs." },
                { food: "Walnuts & Flaxseeds", why: "Plant-based omega-3 (ALA). Support hormone balance. Just a tablespoon daily helps." },
              ].map((item) => (
                <div key={item.food} className="p-4 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
                  <p className="font-medium text-[#2d5a52] text-sm mb-1">{item.food}</p>
                  <p className="text-xs">{item.why}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">3 Lifestyle Changes That Reduce Inflammation</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Cut Refined Sugar & Processed Foods</p>
                <p className="text-sm">Sugar spikes insulin, which triggers inflammatory cascades. Swap processed snacks for whole foods. This alone can improve ovulation regularity within one cycle.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Prioritize Sleep (7-9 Hours)</p>
                <p className="text-sm">Sleep deprivation raises C-reactive protein (an inflammation marker) by up to 25%. Consistent sleep supports immune regulation and hormone production.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Gentle Daily Movement</p>
                <p className="text-sm">30 minutes of walking or yoga reduces inflammatory markers. Avoid over-exercising, which can increase inflammation and suppress ovulation.</p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">What to Expect</h2>
            <p>Most women notice reduced bloating and more regular cycles within 4-6 weeks of consistent anti-inflammatory changes. Our program includes fertility-focused nutrition plans and gentle movement routines designed to reduce inflammation and support conception.</p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">Get an Anti-Inflammatory Fertility Plan</h3>
        <p className="text-[#5a7570] mb-6 text-sm">Tell us about your health and we&apos;ll build a plan to reduce inflammation and support conception.</p>
        <Link href="/quiz" className="btn-primary">Take Free Assessment</Link>
      </div>
      <BlogJsonLd title="How Inflammation Affects Fertility (And What Actually Helps)" description="The connection between chronic inflammation and conception difficulties, plus anti-inflammatory foods and lifestyle changes that support fertility." slug="joint-pain-menopause" datePublished="2025-02-20" />
    </main>
  );
}
