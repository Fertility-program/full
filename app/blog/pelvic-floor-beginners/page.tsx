import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Pelvic Floor Health: A Beginner's Guide for Fertility",
  description: "How pelvic floor strength supports conception, improves blood flow to reproductive organs, and prepares your body for pregnancy. Plus 3 simple exercises.",
};

export default function PelvicFloorFertilityArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block">← Back to Blog</Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">Exercise</span>
          <span className="text-[11px] text-[#6aab9f]">4 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          Pelvic Floor Health: A Beginner&apos;s Guide for Fertility
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          Your pelvic floor does more than prevent leaks — it supports blood flow to your uterus and ovaries, helps maintain optimal organ positioning, and plays a role in conception. Strengthening it now prepares your body for both getting pregnant and carrying a healthy pregnancy.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Why It Matters for Fertility</h2>
            <p>A well-functioning pelvic floor improves circulation to the reproductive organs, supports the uterus in its optimal position, and helps create the right environment for implantation. Tension or weakness in these muscles can restrict blood flow and contribute to pelvic congestion. Just 5 minutes a day can make a noticeable difference within 3-4 weeks.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Exercise 1: Pelvic Floor Breathing</h2>
            <div className="p-5 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Sit comfortably with a neutral spine, feet flat on the floor.</li>
                <li>Inhale deeply — feel your pelvic floor gently descend and relax.</li>
                <li>Exhale slowly — feel your pelvic floor naturally lift and engage.</li>
                <li>Focus on the coordination between breath and pelvic floor movement.</li>
                <li>Repeat for 2 minutes. This teaches awareness and proper activation.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Exercise 2: Bridge with Pelvic Floor Engagement</h2>
            <p>Lie on your back, knees bent, feet hip-width apart. As you exhale, gently engage your pelvic floor and lift your hips. Hold for 5 seconds at the top, breathing normally. Lower slowly. This combines glute activation with pelvic floor strengthening and increases blood flow to the uterus.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Exercise 3: Deep Squat with Release</h2>
            <p>Stand with feet wide, toes slightly turned out. Lower into a deep squat (use a chair for support if needed). In this position, focus on fully relaxing your pelvic floor for 20-30 seconds. A pelvic floor that can both contract and release is healthier than one that&apos;s always tight — and a relaxed pelvic floor supports conception.</p>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">Important</h2>
            <p>If you experience pelvic pain, painful intercourse, or suspect pelvic floor tension, consult a pelvic floor physiotherapist. For fertility, the goal is balance — muscles that can both engage and fully relax. These exercises should feel comfortable, never painful.</p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">Pelvic Health Is Part of Our Fertility Program</h3>
        <p className="text-[#5a7570] mb-6 text-sm">Our program includes pelvic floor exercises designed specifically to support conception.</p>
        <Link href="/quiz" className="btn-primary">Take Free Assessment</Link>
      </div>
      <BlogJsonLd title="Pelvic Floor Health: A Beginner's Guide for Fertility" description="How pelvic floor strength supports conception, improves blood flow to reproductive organs, and prepares your body for pregnancy." slug="pelvic-floor-beginners" datePublished="2025-02-10" />
    </main>
  );
}
