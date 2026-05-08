import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "5 Cycle-Synced Exercises That Support Ovulation",
  description:
    "Evidence-based exercises tailored to each phase of your menstrual cycle to support ovulation, hormone balance, and fertility.",
};

export default function CycleSyncedExercisesArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link
        href="/blog"
        className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block"
      >
        ← Back to Blog
      </Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">
            Exercise
          </span>
          <span className="text-[11px] text-[#6aab9f]">5 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          5 Cycle-Synced Exercises That Support Ovulation
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          Your body responds differently to exercise depending on where you are
          in your menstrual cycle. Training with your cycle — not against it —
          can support healthy ovulation, improve hormone balance, and boost your
          chances of conceiving.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              Why Cycle-Synced Exercise Supports Fertility
            </h2>
            <p>
              Your hormones fluctuate throughout your cycle, affecting energy,
              recovery, and how your body responds to stress. Over-exercising
              during sensitive phases can suppress ovulation, while the right
              movement at the right time supports follicle development, healthy
              progesterone levels, and uterine blood flow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              1. Menstrual Phase (Days 1-5): Gentle Yoga & Walking
            </h2>
            <p className="mb-3">
              During menstruation, your hormones are at their lowest. This is a
              time for rest and gentle movement that supports circulation without
              taxing your system.
            </p>
            <div className="p-5 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-sm font-medium text-[#2d5a52] mb-2">Try this:</p>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>15-20 minutes of gentle walking outdoors (morning light is ideal).</li>
                <li>Restorative yoga: child&apos;s pose, supine twist, legs up the wall.</li>
                <li>Focus on deep belly breathing to support blood flow to the pelvis.</li>
                <li>Avoid high-intensity training — your body needs recovery now.</li>
                <li>Listen to your energy levels and rest when needed.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              2. Follicular Phase (Days 6-12): Strength Training
            </h2>
            <p>
              Rising estrogen gives you more energy and better muscle recovery.
              This is the best time for strength training — squats, lunges, and
              resistance work. Building lean muscle improves insulin sensitivity,
              which directly supports healthy ovulation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              3. Ovulation Window (Days 13-15): Moderate Cardio
            </h2>
            <p>
              Energy peaks around ovulation thanks to high estrogen and a surge
              in luteinizing hormone. Moderate cardio like cycling, swimming, or
              brisk walking supports circulation to reproductive organs. Avoid
              extreme endurance exercise, which can raise cortisol and interfere
              with the LH surge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              4. Early Luteal Phase (Days 16-22): Pilates & Barre
            </h2>
            <p>
              After ovulation, progesterone rises and your body temperature
              increases. Switch to lower-impact exercises like Pilates, barre, or
              moderate yoga. These support core strength and pelvic blood flow
              without spiking cortisol, which can interfere with implantation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">
              5. Late Luteal Phase (Days 23-28): Stretching & Breathwork
            </h2>
            <p>
              In the days before your period, progesterone drops and PMS symptoms
              may appear. Gentle stretching, foam rolling, and extended exhale
              breathing help manage stress and support healthy progesterone
              levels during the critical implantation window.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">Key Takeaway</h2>
            <p>
              More exercise isn&apos;t always better for fertility. The goal is
              to match your movement to your cycle phase. Even small adjustments
              — like swapping HIIT for yoga during your luteal phase — can make a
              meaningful difference in hormone balance within 2-3 cycles.
            </p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">
          Get a Cycle-Synced Exercise Plan
        </h3>
        <p className="text-[#5a7570] mb-6 text-sm">
          Our free assessment creates a personalized program matched to your
          cycle and fertility goals.
        </p>
        <Link href="/quiz" className="btn-primary">
          Take Free Assessment
        </Link>
      </div>
      <BlogJsonLd title="5 Cycle-Synced Exercises That Support Ovulation" description="Evidence-based exercises tailored to each phase of your menstrual cycle to support ovulation, hormone balance, and fertility." slug="exercises-for-hot-flashes" datePublished="2025-01-15" />
    </main>
  );
}
