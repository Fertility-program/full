"use client";

import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ExitIntent from "@/components/ExitIntent";
import FaqJsonLd from "@/components/FaqJsonLd";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { buildPlan } from "@/lib/programs";
import { useMemo } from "react";

const FAQ_DATA = [
  {
    question: "Is this program suitable for women with PCOS or endometriosis?",
    answer: "Yes. The program includes gentle, hormone-balancing exercises and anti-inflammatory nutrition specifically designed for women with PCOS, endometriosis, and other reproductive health conditions. Always consult your doctor before starting any new program.",
  },
  {
    question: "Do I need any equipment?",
    answer: "No equipment needed. All exercises use your body weight and common household items like a chair or wall. You can do everything at home in a small space.",
  },
  {
    question: "How much time do I need per day?",
    answer: "Sessions range from 10 to 30 minutes depending on your preference. You choose your daily time commitment during the assessment, and the program adapts to your cycle phase.",
  },
  {
    question: "Are the meal plans really under €7 per day?",
    answer: "Yes. All recipes use affordable, widely available ingredients rich in fertility-supporting nutrients. The average daily cost is €5-7 depending on your location. Shopping lists are auto-generated.",
  },
  {
    question: "What if I miss a day?",
    answer: "No problem. The program includes streak freezes and rest days. Missing a day doesn't reset your progress. Consistency over perfection is our philosophy.",
  },
  {
    question: "Is this a subscription or one-time payment?",
    answer: "One-time payment. The Bloom plan (€29) gives you 30 days of full access, and the Elite plan (€79) gives you 90 days. No recurring charges, no hidden fees.",
  },
  {
    question: "Can I try it for free first?",
    answer: "Yes. The free plan includes 7 days of cycle-synced exercises, Day 1 full meal plan with recipes, supplement guide preview, and progress tracking. No credit card required.",
  },
  {
    question: "Will this help me get pregnant faster?",
    answer: "The program supports your fertility through evidence-based nutrition, stress reduction, and cycle-synced movement. Many users report improved cycle regularity and overall wellbeing within the first month, though individual results vary. This is not medical treatment.",
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  // Sample plan for preview (Day 1, common fertility focus)
  const samplePlan = useMemo(() => buildPlan(1, {
    symptoms: ["Irregular cycles", "Stress", "Low energy"],
    goal: "tone",
    time: "20 min",
    age: 32,
  }), []);

  return (
    <main className="relative min-h-screen bg-transparent">
      {/* HERO */}
      <section className="max-w-7xl mx-auto pt-4 pb-6 grid lg:grid-cols-2 gap-5 items-center">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#5ba89d] bg-[#f0faf8]/60 w-fit px-3 py-1 rounded-full">
              {t("Fertility Wellness for Women TTC")}
            </p>

            <h1 className="text-4xl md:text-[52px] leading-[1.08] text-[#2d5a52] tracking-tight">
              {t("Nourish Your Body.")}
              <br />
              <span className="italic font-light text-[#5ba89d]">{t("Support Your Cycle.")}</span>
              <br />
              {t("Bloom Into Motherhood.")}
            </h1>

            <p className="text-base text-[#5a7570] max-w-xl leading-relaxed">
              The complete fertility wellness system: <strong className="text-[#2d5a52]">cycle-synced exercises</strong>,{" "}
              <strong className="text-[#2d5a52]">fertility nutrition under €7/day</strong>,{" "}
              <strong className="text-[#2d5a52]">supplement guidance</strong> and daily support for ovulation, hormone balance, and conception readiness.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/quiz" className="btn-primary">{t("Start Free Plan")}</Link>
            <Link href="/pricing" className="btn-outline">{t("View Membership")}</Link>
          </div>

          <div className="flex items-center gap-2 pt-1 opacity-80">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#5ba89d]/30" />
              ))}
            </div>
            <p className="text-[11px] italic text-[#5a7570]">
              {t("Trusted by women on their fertility journey.")}
            </p>
          </div>
        </div>

        {/* WHAT YOU GET CARD */}
        <div className="soft-card p-5 md:p-6">
          <h2 className="text-xl text-[#2d5a52] mb-3 font-light italic text-center lg:text-left">
            Everything In Your Program:
          </h2>
          <div className="space-y-2">
            {[
              { icon: "🌸", text: "Cycle-synced exercise sessions (10-30 min, no equipment)" },
              { icon: "🥗", text: "Fertility nutrition plans under €7/day" },
              { icon: "💊", text: "Supplement guide: folate, CoQ10, vitamins & doses" },
              { icon: "📅", text: "Cycle tracking & ovulation support" },
              { icon: "📊", text: "Progress tracking with weekly reports" },
              { icon: "🛒", text: "Auto-generated shopping lists" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-sm text-[#2d5a52]">
                <span className="text-base shrink-0">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
          <Link href="/quiz" className="btn-primary w-full mt-4 py-2.5 text-xs uppercase tracking-widest">
            Get My Personalized Plan — Free
          </Link>
        </div>
      </section>

      {/* WHAT IS Veronica Bloom - Clear value proposition */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <h2 className="text-3xl text-center text-[#2d5a52] mb-2 italic">
            Built Specifically for Fertility
          </h2>
          <p className="text-center text-sm text-[#5a7570] mb-6 max-w-2xl mx-auto">
            Every exercise, meal and supplement recommendation is designed to support your reproductive health and optimize your chances of conception.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                icon: "🌸",
                title: "Cycle-Synced Movement",
                points: ["Tailored to your cycle phase", "Progressive 4-phase system", "Gentle & effective", "No equipment needed"],
              },
              {
                icon: "🥗",
                title: "Fertility Nutrition",
                points: ["Full meal plans under €7/day", "32+ fertility-boosting recipes", "Ingredients & prep steps", "Printable shopping lists"],
              },
              {
                icon: "💊",
                title: "Supplement Guide",
                points: ["Folate & prenatal support", "CoQ10 for egg quality", "Exact daily doses", "Budget-friendly brands"],
              },
              {
                icon: "📈",
                title: "Track & Improve",
                points: ["Daily check-ins", "Cycle & energy tracking", "Achievement badges", "Weekly progress reports"],
              },
            ].map((col) => (
              <div key={col.title} className="text-center">
                <div className="text-3xl mb-2">{col.icon}</div>
                <h3 className="text-lg text-[#2d5a52] font-medium mb-2">{col.title}</h3>
                <ul className="space-y-1">
                  {col.points.map((p) => (
                    <li key={p} className="text-xs text-[#5a7570] flex items-center gap-1.5 justify-center">
                      <span className="text-[#5ba89d] text-[10px]">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FERTILITY CONCERNS WE ADDRESS */}
      <section className="max-w-7xl mx-auto py-4">
        <h2 className="text-3xl text-center text-[#2d5a52] mb-5 italic">
          We Support These Fertility Concerns
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { symptom: "Irregular Cycles", icon: "📅", desc: "Cycle-regulating movement & nutrition" },
            { symptom: "PCOS", icon: "🌿", desc: "Insulin-balancing meals & gentle exercise" },
            { symptom: "Low Energy", icon: "⚡", desc: "Energizing routines & iron-rich nutrition" },
            { symptom: "Stress & Anxiety", icon: "🧘", desc: "Cortisol-lowering breathwork & yoga" },
            { symptom: "Hormonal Imbalance", icon: "⚖️", desc: "Hormone-supporting foods & movement" },
            { symptom: "Poor Sleep", icon: "😴", desc: "Evening routines for restorative rest" },
            { symptom: "Inflammation", icon: "🔥", desc: "Anti-inflammatory meals & gentle mobility" },
            { symptom: "Egg Quality", icon: "🥚", desc: "Antioxidant nutrition & CoQ10 support" },
            { symptom: "Endometriosis", icon: "🩺", desc: "Pain-reducing movement & anti-inflammatory diet" },
            { symptom: "Weight Management", icon: "🌱", desc: "Balanced nutrition for optimal BMI" },
          ].map((s) => (
            <div key={s.symptom} className="soft-card p-4 text-center hover:border-[#5ba89d] transition-colors">
              <div className="text-2xl mb-1">{s.icon}</div>
              <h3 className="text-sm font-medium text-[#2d5a52] mb-0.5">{s.symptom}</h3>
              <p className="text-[11px] text-[#5a7570]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE DAILY PLAN */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#5ba89d] mb-1">Preview</p>
              <h2 className="text-3xl text-[#2d5a52] italic">Sample Daily Plan</h2>
              <p className="text-sm text-[#5a7570] mt-1">Here&apos;s what a typical day looks like — no sign-up needed to see this.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#f0faf8]/80 border border-[#c2ddd8] px-4 py-2 rounded-2xl text-center">
                <p className="text-[9px] uppercase tracking-widest text-[#5ba89d] font-bold">Duration</p>
                <p className="text-lg font-semibold text-[#2d5a52]">~{samplePlan.totalMinutes} min</p>
              </div>
              <div className="bg-[#f0faf8]/80 border border-[#c2ddd8] px-4 py-2 rounded-2xl text-center">
                <p className="text-[9px] uppercase tracking-widest text-[#5ba89d] font-bold">Exercises</p>
                <p className="text-lg font-semibold text-[#2d5a52]">{samplePlan.exercises.length}</p>
              </div>
            </div>
          </div>

          {/* Exercise list */}
          <div className="grid sm:grid-cols-2 gap-2 mb-5">
            {samplePlan.exercises.map((ex, i) => (
              <div
                key={ex.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-[#c2ddd8]"
              >
                <span className="w-7 h-7 rounded-full bg-[#f0faf8] flex items-center justify-center text-[#5ba89d] text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2d5a52] truncate">{ex.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#6aab9f]">
                    <span>{ex.reps}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#f0faf8] border border-[#c2ddd8] capitalize">{ex.category}</span>
                  </div>
                </div>
                <span className="text-xs text-[#5a7570] shrink-0">
                  {Math.floor(ex.seconds / 60)}:{String(ex.seconds % 60).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Why it works */}
          <div className="p-4 rounded-xl bg-[#f0faf8]/50 border border-[#c2ddd8] mb-5">
            <p className="text-xs text-[#3a5550] leading-relaxed">
              <strong className="text-[#2d5a52]">Why this combination?</strong> This plan includes gentle movement to improve blood flow to reproductive organs, stress-reducing breathwork to lower cortisol, and mobility exercises to support pelvic health. Every session adapts to your cycle phase.
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#5a7570] mb-3">Take the assessment to get a plan personalized for <em>your</em> cycle, goals and concerns.</p>
            <Link href="/quiz" className="btn-primary px-8 py-3 text-sm">
              Get My Personalized Plan — Free
            </Link>
          </div>
        </div>
      </section>

      {/* SUPPLEMENT PREVIEW */}
      <section className="max-w-7xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#5ba89d] mb-1">Included In Your Plan</p>
              <h2 className="text-3xl text-[#2d5a52] italic">Fertility Supplement Guide</h2>
            </div>
            <Link href="/quiz" className="btn-outline text-sm shrink-0">Get My Personalized Doses</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              {
                name: "Folate (Methylfolate)",
                dose: "400-800mcg/day",
                why: "Essential for neural tube development. Methylfolate is the active form, better absorbed than folic acid.",
                icon: "🌿",
              },
              {
                name: "CoQ10 (Ubiquinol)",
                dose: "200-600mg/day",
                why: "Supports egg quality and mitochondrial energy production. Especially important after 30.",
                icon: "🥚",
              },
              {
                name: "Vitamin D3",
                dose: "2,000-4,000 IU/day",
                why: "Linked to improved fertility outcomes. Supports hormone production and immune regulation.",
                icon: "☀️",
              },
              {
                name: "Omega-3 (DHA/EPA)",
                dose: "1,000-2,000mg/day",
                why: "Reduces inflammation, supports hormone balance and healthy uterine lining.",
                icon: "🐟",
              },
              {
                name: "Iron + Vitamin C",
                dose: "18-27mg iron/day",
                why: "Prevents anemia, supports ovulation. Vitamin C enhances absorption.",
                icon: "💪",
              },
              {
                name: "Myo-Inositol",
                dose: "2,000-4,000mg/day",
                why: "Improves insulin sensitivity and egg quality. Especially beneficial for PCOS.",
                icon: "🌸",
              },
            ].map((supp) => (
              <div key={supp.name} className="p-4 rounded-xl bg-white/50 border border-[#c2ddd8]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{supp.icon}</span>
                  <h3 className="text-sm font-medium text-[#2d5a52]">{supp.name}</h3>
                </div>
                <p className="text-xs font-bold text-[#5ba89d] mb-1">{supp.dose}</p>
                <p className="text-[11px] text-[#5a7570] leading-relaxed">{supp.why}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#6aab9f] mt-4 text-center italic">
            Always consult your doctor before starting supplements. Doses are general guidelines based on current research.
          </p>
        </div>
      </section>

      {/* BUDGET COMPARISON */}
      <section className="max-w-5xl mx-auto py-4">
        <div className="soft-card p-6">
          <h2 className="text-2xl text-center text-[#2d5a52] mb-4 italic">How Much You Save</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 text-center">
              <p className="text-xs text-red-400 uppercase font-bold tracking-widest mb-1">Without Us</p>
              <p className="text-2xl font-light text-red-500 line-through">€200+/mo</p>
              <p className="text-[10px] text-red-400 mt-1">Fertility coach + nutritionist + supplements advice</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f0faf8] border-2 border-[#5ba89d] text-center">
              <p className="text-xs text-[#5ba89d] uppercase font-bold tracking-widest mb-1">Veronica Bloom</p>
              <p className="text-2xl font-light text-[#2d5a52]">€29 <span className="text-sm">one-time</span></p>
              <p className="text-[10px] text-[#5a7570] mt-1">30 days of everything included</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] text-center">
              <p className="text-xs text-[#5ba89d] uppercase font-bold tracking-widest mb-1">Veronica Elite</p>
              <p className="text-2xl font-light text-[#2d5a52]">€79 <span className="text-sm">one-time</span></p>
              <p className="text-[10px] text-[#5a7570] mt-1">90 days + advanced features</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-5xl mx-auto py-6">
        <h2 className="text-3xl text-center text-[#2d5a52] mb-6 italic">
          What Women Are Saying
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: "Ana, 31",
              text: "After 6 weeks my cycles became more regular. The stress-reduction exercises and fertility meals made me feel so much more in control.",
              result: "Cycles regulated within 6 weeks",
              emoji: "📅",
            },
            {
              name: "Marija, 34",
              text: "The meal plans are delicious and affordable. I love knowing every ingredient supports my fertility. My husband eats them too!",
              result: "Saving €70/month on food",
              emoji: "🥗",
            },
            {
              name: "Jelena, 29",
              text: "I have PCOS and this program helped me understand how to move and eat for my body. The cycle-synced approach makes so much sense.",
              result: "Improved PCOS symptoms",
              emoji: "🌿",
            },
            {
              name: "Sara, 36",
              text: "Only 20 minutes a day and I feel calmer, more energized. The breathing exercises before bed completely changed my sleep quality.",
              result: "Energy up from 4/10 to 8/10",
              emoji: "🧘",
            },
            {
              name: "Ivana, 33",
              text: "The supplement guide was exactly what I needed. Clear doses, affordable brands, and my doctor approved everything.",
              result: "Optimized supplement routine",
              emoji: "💊",
            },
            {
              name: "Dragana, 38",
              text: "After two years of trying, this program gave me structure and hope. The community support and daily check-ins kept me motivated.",
              result: "Conceived after 3 months on program",
              emoji: "🌸",
            },
          ].map((testimonial) => (
            <div key={testimonial.name} className="soft-card p-5">
              <div className="text-2xl mb-2">{testimonial.emoji}</div>
              <p className="text-sm text-[#2d5a52] leading-relaxed mb-3 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#2d5a52]">{testimonial.name}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f0faf8] text-[#3d8a7d] border border-[#c2ddd8] font-medium">
                  {testimonial.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto py-6">
        <div className="soft-card p-6 md:p-8">
          <h2 className="text-3xl text-center text-[#2d5a52] mb-6 italic">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#c2ddd8] bg-white/40 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-[#2d5a52] hover:bg-[#f0faf8]/50 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="text-[#5ba89d] text-lg shrink-0 ml-3 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-[#5a7570] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
        <FaqJsonLd faqs={FAQ_DATA} />
      </section>

      {/* GET THE APP */}
      <section className="max-w-5xl mx-auto py-6">
        <div className="soft-card p-5 md:p-8">
          <h2 className="text-xl md:text-2xl text-[#2d5a52] mb-2 text-center md:text-left">Get the App</h2>
          <p className="text-xs md:text-sm text-[#3a5550] mb-4 text-center md:text-left">
            Use it like a native app — offline support, reminders, quick access.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a
                href="/fertility-program.apk"
                download
                className="btn-primary px-5 py-2.5 text-xs text-center w-full md:w-auto"
              >
                Download Android
              </a>
              <Link href="/download" className="btn-outline px-5 py-2.5 text-xs text-center w-full md:w-auto">
                iPhone & More Info
              </Link>
            </div>
            <div className="hidden md:block shrink-0 text-center">
              <div className="inline-block p-2 bg-white rounded-xl border border-[#c2ddd8]">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://veronica-bloom.vercel.app/download&color=2d5a52&bgcolor=ffffff"
                  alt="Scan to download"
                  width={120}
                  height={120}
                  className="rounded"
                />
              </div>
              <p className="text-[8px] text-[#4a7a70] mt-1">Scan with phone</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="soft-card p-8 text-center border-[#5ba89d]/20">
          <h2 className="text-3xl md:text-4xl mb-3 text-[#2d5a52] tracking-tight leading-tight">
            {t("Your Fertility Journey")} {t("Starts")} <span className="italic text-[#5ba89d]">{t("Today")}</span>
          </h2>
          <p className="text-sm text-[#5a7570] mb-5 max-w-md mx-auto">
            Take our free 2-minute assessment. Get cycle-synced exercises, fertility meals, supplements and a complete wellness plan.
          </p>
          <Link href="/quiz" className="btn-primary px-10 py-3 text-base">{t("Start Assessment")}</Link>
          <div className="flex flex-wrap gap-3 justify-center mt-3">
            <Link href="/free-guide" className="btn-outline px-6 py-2 text-sm">
              📖 Free Guide
            </Link>
            <Link href="/download" className="btn-outline px-6 py-2 text-sm">
              📱 Download App
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture />
      <ExitIntent />
    </main>
  );
}
