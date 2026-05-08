import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Managing Stress When Trying to Conceive",
  description: "How cortisol disrupts fertility hormones, and a practical daily routine to lower stress, support ovulation, and improve your chances of conceiving.",
};

export default function StressFertilityArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block">← Back to Blog</Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">Mindset</span>
          <span className="text-[11px] text-[#6aab9f]">4 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          Managing Stress When Trying to Conceive
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          &ldquo;Just relax and it will happen&rdquo; is unhelpful advice — but the science behind it is real. Chronic stress raises cortisol, which directly suppresses the hormones needed for ovulation and implantation. Here&apos;s what actually works.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The Cortisol-Fertility Connection</h2>
            <p>When cortisol stays elevated, your body deprioritizes reproduction. High cortisol suppresses GnRH (the hormone that triggers ovulation), reduces progesterone production, and can shorten the luteal phase — making implantation less likely. Studies show women with high stress biomarkers take 29% longer to conceive.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">A Daily Stress-Reduction Routine</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Morning: 5-Minute Grounding (before phone)</p>
                <p className="text-sm">Before checking your phone, sit quietly and take 10 slow breaths. Place your hands on your lower belly. This sets your nervous system to &ldquo;safe mode&rdquo; for the day and reduces the morning cortisol spike.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Midday: 10-Minute Walk Outside</p>
                <p className="text-sm">Natural light and gentle movement lower cortisol more effectively than intense exercise. Walk without your phone if possible. Sunlight also supports vitamin D production, which is linked to better fertility outcomes.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Evening: Body Scan Meditation (5 min)</p>
                <p className="text-sm">Lie down and slowly scan from head to toes, releasing tension in each area. Focus on relaxing your jaw, shoulders, and pelvis. This activates the parasympathetic nervous system and supports progesterone production during sleep.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#c2ddd8]">
                <p className="font-medium text-[#2d5a52] mb-1">Throughout the Day: Boundary Setting</p>
                <p className="text-sm">Limit fertility forums and comparison scrolling. Set specific times to research rather than constant checking. Protect your emotional energy — it&apos;s a finite resource that your body needs for conception.</p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">What to Expect</h2>
            <p>Stress reduction isn&apos;t about being perfectly calm — it&apos;s about giving your nervous system enough &ldquo;safe&rdquo; signals that your body can prioritize fertility. Most women notice improved cycle regularity and reduced anxiety within 2-4 weeks of consistent practice. Our program includes daily mindfulness and breathwork exercises tailored to your cycle phase.</p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">Stress Management Is Built Into Every Plan</h3>
        <p className="text-[#5a7570] mb-6 text-sm">Our program includes daily mindfulness and nervous system support tailored to your fertility journey.</p>
        <Link href="/quiz" className="btn-primary">Take Free Assessment</Link>
      </div>
      <BlogJsonLd title="Managing Stress When Trying to Conceive" description="How cortisol disrupts fertility hormones, and a practical daily routine to lower stress, support ovulation, and improve your chances of conceiving." slug="confidence-posture-midlife" datePublished="2025-03-01" />
    </main>
  );
}
