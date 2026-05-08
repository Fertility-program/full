import Link from "next/link";
import type { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Fertility-Boosting Meals Under €6 Per Day",
  description:
    "A complete day of budget-friendly eating that supports egg quality, ovulation, and hormone balance. Breakfast, lunch, dinner and snack — all under €6.",
};

export default function FertilityMealPlanArticle() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-[#6aab9f] hover:text-[#2d5a52] mb-6 inline-block">
        ← Back to Blog
      </Link>

      <article className="soft-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full bg-[#f0faf8] text-[#6aab9f] font-bold uppercase tracking-widest border border-[#c2ddd8]">Nutrition</span>
          <span className="text-[11px] text-[#6aab9f]">5 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#2d5a52] mb-6 leading-tight">
          Fertility-Boosting Meals Under €6 Per Day
        </h1>

        <p className="text-lg text-[#5a7570] mb-8 leading-relaxed">
          Eating for fertility doesn&apos;t have to be expensive. Here&apos;s a full day of meals that support egg quality, ovulation, and hormone balance — all for less than the price of a takeaway coffee.
        </p>

        <div className="space-y-8 text-[#5a7570] leading-relaxed">
          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">The Principles</h2>
            <ul className="space-y-2">
              <li>• <strong>Protein at every meal</strong> — stabilizes blood sugar and supports egg development</li>
              <li>• <strong>Folate-rich foods</strong> — leafy greens, lentils, avocado (essential for early cell division)</li>
              <li>• <strong>Healthy fats</strong> — omega-3s, olive oil, nuts (building blocks for reproductive hormones)</li>
              <li>• <strong>Iron & zinc sources</strong> — beans, seeds, eggs (support ovulation and implantation)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Breakfast: Egg & Spinach Toast (€1.10)</h2>
            <p>2 eggs scrambled with a handful of spinach on whole grain toast. Eggs provide choline (critical for fetal development) and spinach delivers folate and iron. Add a sprinkle of pumpkin seeds for zinc.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Lunch: Lentil & Avocado Bowl (€1.80)</h2>
            <p>1 cup cooked lentils + half an avocado + cherry tomatoes + lemon dressing. Lentils are one of the best plant sources of folate and iron. Avocado provides monounsaturated fats that support hormone production. 22g protein.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Dinner: Salmon & Sweet Potato (€2.40)</h2>
            <p>1 can wild salmon + roasted sweet potato + steamed broccoli. Salmon delivers omega-3 DHA (supports egg quality), sweet potato provides beta-carotene (supports the corpus luteum), and broccoli adds folate and fiber. Ready in 20 minutes.</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#2d5a52] mb-3">Snack: Brazil Nuts & Berries (€0.60)</h2>
            <p>3 Brazil nuts + a handful of mixed berries. Just 3 Brazil nuts provide your daily selenium (supports thyroid function and egg quality). Berries add antioxidants that protect eggs from oxidative stress.</p>
          </section>

          <section className="p-6 rounded-2xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h2 className="text-xl text-[#2d5a52] mb-2">Daily Total: €5.90 | 1,520 kcal | 88g protein</h2>
            <p>Our program generates a different fertility-focused meal plan every day, personalized to your cycle phase and nutritional needs — all under €7/day.</p>
          </section>
        </div>
      </article>

      <div className="soft-card p-8 mt-8 text-center">
        <h3 className="text-2xl text-[#2d5a52] mb-3">Get 30 Days of Fertility Meals</h3>
        <p className="text-[#5a7570] mb-6 text-sm">Different every day, tailored to your cycle phase and budget.</p>
        <Link href="/quiz" className="btn-primary">Take Free Assessment</Link>
      </div>
      <BlogJsonLd title="Fertility-Boosting Meals Under €6 Per Day" description="Budget-friendly meal planning for fertility with nutrient-dense recipes that support egg quality, ovulation, and hormone balance." slug="menopause-meal-plan-budget" datePublished="2025-01-20" />
    </main>
  );
}
