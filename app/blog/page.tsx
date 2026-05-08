import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fertility Blog",
  description:
    "Expert tips on fertility wellness, cycle-synced nutrition, reproductive exercises and hormone balance for women trying to conceive.",
};

const articles = [
  {
    slug: "exercises-for-hot-flashes",
    title: "5 Cycle-Synced Exercises That Support Ovulation",
    excerpt:
      "Movement patterns designed for each phase of your cycle to optimize blood flow to reproductive organs and support healthy ovulation.",
    category: "Exercise",
    readTime: "4 min",
    date: "2026-04-15",
  },
  {
    slug: "menopause-meal-plan-budget",
    title: "Fertility-Boosting Meals Under €6 Per Day",
    excerpt:
      "A complete day of eating that supports egg quality, reduces inflammation and costs less than a coffee shop lunch.",
    category: "Nutrition",
    readTime: "5 min",
    date: "2026-04-10",
  },
  {
    slug: "sleep-better-after-40",
    title: "The Evening Routine That Optimizes Your Fertility Hormones",
    excerpt:
      "A simple 15-minute wind-down sequence that lowers cortisol, improves progesterone production and enhances sleep quality.",
    category: "Sleep",
    readTime: "3 min",
    date: "2026-04-05",
  },
  {
    slug: "pelvic-floor-beginners",
    title: "Pelvic Floor Health: A Beginner's Guide for Fertility",
    excerpt:
      "Why pelvic floor strength matters for conception and 3 simple exercises you can do anywhere to support reproductive health.",
    category: "Exercise",
    readTime: "4 min",
    date: "2026-03-28",
  },
  {
    slug: "joint-pain-menopause",
    title: "How Inflammation Affects Fertility (And What Actually Helps)",
    excerpt:
      "The inflammation-fertility connection explained, plus 4 anti-inflammatory foods and gentle exercises that support conception.",
    category: "Health",
    readTime: "5 min",
    date: "2026-03-20",
  },
  {
    slug: "confidence-posture-midlife",
    title: "Managing Stress When Trying to Conceive",
    excerpt:
      "The link between cortisol, stress and fertility — plus a 5-minute daily routine that helps regulate your hormones.",
    category: "Mindset",
    readTime: "3 min",
    date: "2026-03-15",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <section className="soft-card p-10 mb-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#6aab9f] mb-4 font-bold">
          Fertility Journal
        </p>
        <h1 className="text-5xl mb-4 text-[#2d5a52]">The Veronica Bloom Blog</h1>
        <p className="text-[#5a7570] text-lg max-w-2xl">
          Expert guidance on fertility wellness, cycle-synced nutrition, gentle exercise and hormone balance for women on their conception journey.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}
            className="soft-card p-8 group hover:border-[#5ba89d] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">
                {article.category}
              </span>
              <span className="text-[11px] text-[#6aab9f]">{article.readTime} read</span>
            </div>
            <h2 className="text-2xl text-[#2d5a52] mb-3 group-hover:text-[#5ba89d] transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-[#5a7570] leading-relaxed mb-4">{article.excerpt}</p>
            <span className="text-sm text-[#5ba89d] font-medium">Read more →</span>
          </Link>
        ))}
      </div>

      <section className="soft-card p-10 text-center">
        <h2 className="text-3xl text-[#2d5a52] mb-4">Ready to Start Your Fertility Journey?</h2>
        <p className="text-[#5a7570] mb-6">Take our free 2-minute assessment and get a personalized plan.</p>
        <Link href="/quiz" className="btn-primary px-10 py-4">Start Free Assessment</Link>
      </section>
    </main>
  );
}
