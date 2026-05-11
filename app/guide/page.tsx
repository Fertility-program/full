import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Complete Fertility Wellness Guide — Evidence-Based",
  description: "Free 30-page evidence-based fertility guide: cycle-synced exercises, nutrition, supplements, male fertility, and conception optimization for couples TTC.",
  robots: { index: false },
};

export default function GuidePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 print:px-0 print:py-0 print:max-w-none">
      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          .soft-card { border: none !important; box-shadow: none !important; background: white !important; padding: 0 !important; }
          main { padding: 1cm !important; max-width: 100% !important; }
          .page-break { page-break-before: always; }
          body { font-size: 11pt !important; line-height: 1.6 !important; color: #333 !important; }
          h1 { font-size: 24pt !important; }
          h2 { font-size: 18pt !important; }
          h3 { font-size: 14pt !important; }
        }
      `}} />

      {/* COVER */}
      <section className="soft-card p-10 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5ba89d] font-bold mb-4">Veronica Bloom</p>
        <h1 className="text-5xl text-[#2d5a52] mb-4">The Complete Fertility Wellness Guide</h1>
        <p className="text-lg text-[#3a5550] max-w-xl mx-auto mb-6">
          Evidence-based strategies for both partners: cycle-synced movement, fertility nutrition, supplement protocols, male optimization, and conception timing.
        </p>
        <div className="flex justify-center gap-4 text-xs text-[#5a7570] flex-wrap">
          <span>📖 30+ pages</span>
          <span>🔬 WHO 2021 referenced</span>
          <span>🥗 7-day meal plan</span>
          <span>💊 Supplements for both</span>
          <span>💑 Couple strategies</span>
        </div>
        <p className="text-[10px] text-[#5a7570] mt-6">© 2025 Veronica Bloom. For personal use only. Not medical advice.</p>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="soft-card p-8 mb-8">
        <h2 className="text-2xl text-[#2d5a52] mb-4">Contents</h2>
        <div className="space-y-2 text-sm text-[#3a5550]">
          {[
            "1. Understanding Fertility — The Science of Conception",
            "2. The Menstrual Cycle & Fertile Window",
            "3. Cycle-Synced Exercise Protocol (Her)",
            "4. Male Fertility — The 74-Day Sperm Cycle (Him)",
            "5. Fertility Nutrition — 7-Day Meal Plan for Both",
            "6. Supplement Guide — Her Protocol",
            "7. Supplement Guide — His Protocol",
            "8. Lifestyle Factors That Impact Conception",
            "9. When to See a Doctor — Red Flags & Testing",
            "10. Couple Optimization — Timing & Strategy",
            "11. Daily Routine Templates",
            "12. Trackers & Worksheets",
          ].map((item) => (
            <p key={item} className="py-1 border-b border-[#e8f5f2]">{item}</p>
          ))}
        </div>
      </section>

      {/* CHAPTER 1 — UNDERSTANDING FERTILITY */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">1. Understanding Fertility</h2>
        <p className="text-sm text-[#3a5550] mb-4">
          Human fertility is a complex process requiring precise coordination between hormones, organs, and timing. Understanding the basics empowers you to optimize your chances.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">The Egg</h3>
            <p className="text-xs text-[#3a5550]">Women are born with ~1-2 million eggs. By puberty: ~300,000. Only ~400 will ever ovulate. Egg quality declines with age, particularly after 35, due to accumulated oxidative damage to mitochondrial DNA.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">The Sperm</h3>
            <p className="text-xs text-[#3a5550]">Men produce ~1,500 sperm per second. Full spermatogenesis takes 74 days. Unlike eggs, sperm quality can be significantly improved through lifestyle changes within one cycle (2-3 months).</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">Conception Window</h3>
            <p className="text-xs text-[#3a5550]">The egg lives only 12-24 hours after ovulation. Sperm can survive up to 5 days in fertile cervical mucus. This creates a ~6-day fertile window per cycle. Timing intercourse within this window is critical.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">Monthly Probability</h3>
            <p className="text-xs text-[#3a5550]">Even with perfect timing, the probability of conception per cycle is 20-25% for couples under 35. This means it&apos;s normal to take 4-6 months. After 35, the rate drops to 10-15% per cycle.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">📊 Key Statistics</h3>
          <ul className="text-xs text-[#3a5550] space-y-1">
            <li>• 84% of couples conceive within 1 year of regular unprotected intercourse</li>
            <li>• 92% conceive within 2 years</li>
            <li>• Male factor contributes to ~50% of infertility cases</li>
            <li>• 30% of infertility is unexplained — often lifestyle-related</li>
            <li>• Couples who optimize timing have 2-3x higher conception rates</li>
          </ul>
        </div>
      </section>

      {/* CHAPTER 2 — MENSTRUAL CYCLE */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">2. The Menstrual Cycle & Fertile Window</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          Understanding your cycle is the single most impactful thing you can do for conception. Each phase has different hormonal profiles that affect your body, mood, and fertility.
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-5 rounded-xl border-l-4 border-l-red-300 bg-red-50/30">
            <h3 className="text-base font-bold text-[#2d5a52] mb-2">🩸 Menstrual Phase (Days 1-5)</h3>
            <p className="text-xs text-[#3a5550] mb-2"><strong>Hormones:</strong> Estrogen and progesterone at lowest. FSH begins rising.</p>
            <p className="text-xs text-[#3a5550] mb-2"><strong>What&apos;s happening:</strong> Uterine lining sheds. New follicles begin recruiting in ovaries.</p>
            <p className="text-xs text-[#3a5550]"><strong>For fertility:</strong> Rest and nourish. Focus on iron-rich foods. Gentle movement only. This is NOT a fertile time.</p>
          </div>

          <div className="p-5 rounded-xl border-l-4 border-l-green-300 bg-green-50/30">
            <h3 className="text-base font-bold text-[#2d5a52] mb-2">🌱 Follicular Phase (Days 6-13)</h3>
            <p className="text-xs text-[#3a5550] mb-2"><strong>Hormones:</strong> Estrogen rises steadily. One dominant follicle emerges. LH begins building.</p>
            <p className="text-xs text-[#3a5550] mb-2"><strong>What&apos;s happening:</strong> Egg matures inside follicle. Cervical mucus becomes more fertile (watery → egg-white).</p>
            <p className="text-xs text-[#3a5550]"><strong>For fertility:</strong> Energy is high — use it for strength training. Start OPK testing around Day 10. Eat phytoestrogen foods (flax, legumes). Begin every-other-day intercourse from Day 10.</p>
          </div>

          <div className="p-5 rounded-xl border-l-4 border-l-amber-300 bg-amber-50/30">
            <h3 className="text-base font-bold text-[#2d5a52] mb-2">🥚 Ovulation (Days 13-15)</h3>
            <p className="text-xs text-[#3a5550] mb-2"><strong>Hormones:</strong> LH surges (detected by OPK). Estrogen peaks. Egg releases 24-36 hours after LH surge.</p>
            <p className="text-xs text-[#3a5550] mb-2"><strong>What&apos;s happening:</strong> Egg released from ovary, enters fallopian tube. Lives 12-24 hours.</p>
            <p className="text-xs text-[#3a5550]"><strong>For fertility:</strong> PEAK FERTILITY. Intercourse on LH surge day + day after. Avoid intense exercise (raises cortisol). Stay hydrated for cervical mucus. Look for egg-white cervical mucus (EWCM).</p>
          </div>

          <div className="p-5 rounded-xl border-l-4 border-l-purple-300 bg-purple-50/30">
            <h3 className="text-base font-bold text-[#2d5a52] mb-2">🌙 Luteal Phase (Days 15-28)</h3>
            <p className="text-xs text-[#3a5550] mb-2"><strong>Hormones:</strong> Progesterone rises from corpus luteum. Supports potential implantation.</p>
            <p className="text-xs text-[#3a5550] mb-2"><strong>What&apos;s happening:</strong> If fertilized, embryo travels to uterus (days 6-12 post-ovulation). Implantation occurs.</p>
            <p className="text-xs text-[#3a5550]"><strong>For fertility:</strong> The Two-Week Wait. Gentle movement only. Avoid alcohol. Eat progesterone-supporting foods (sweet potato, walnuts). No need to test before 14 DPO.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🎯 Identifying Your Fertile Window</h3>
          <ul className="text-xs text-[#3a5550] space-y-1">
            <li>• <strong>OPK (Ovulation Predictor Kit):</strong> Most reliable. Test from Day 10. Positive = ovulation in 24-36 hours.</li>
            <li>• <strong>BBT (Basal Body Temperature):</strong> Temp rises 0.2-0.5°C AFTER ovulation. Confirms but doesn&apos;t predict.</li>
            <li>• <strong>Cervical Mucus:</strong> Egg-white consistency = peak fertility. Stretches 2-3cm between fingers.</li>
            <li>• <strong>Calendar Method:</strong> Ovulation typically occurs 14 days BEFORE next period (not 14 days after last).</li>
          </ul>
        </div>
      </section>

      {/* CHAPTER 3 — CYCLE-SYNCED EXERCISES */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">3. Cycle-Synced Exercise Protocol (Her)</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          Exercise impacts fertility through multiple pathways: insulin sensitivity, cortisol regulation, blood flow to reproductive organs, and hormone balance. But intensity matters — too much is as harmful as too little.
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-red-50/30 border border-red-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🩸 Menstrual Phase — Restore</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Gentle walking (15-20 min)</li>
              <li>• Restorative yoga (child&apos;s pose, legs up the wall)</li>
              <li>• Diaphragmatic breathing (5 min)</li>
              <li>• Light stretching — no inversions</li>
            </ul>
            <p className="text-[10px] text-[#5a7570] mt-2 italic">Why: Low hormones = low energy. Honor your body&apos;s need for rest. Iron loss requires recovery.</p>
          </div>

          <div className="p-4 rounded-xl bg-green-50/30 border border-green-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🌱 Follicular Phase — Build</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Strength training (bodyweight or light weights)</li>
              <li>• HIIT (moderate — 20 min max)</li>
              <li>• Dance, cycling, swimming</li>
              <li>• Core work and posture exercises</li>
            </ul>
            <p className="text-[10px] text-[#5a7570] mt-2 italic">Why: Rising estrogen = peak strength and recovery. Muscles respond best to training now. Build lean mass to improve insulin sensitivity.</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🥚 Ovulation — Moderate</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Moderate cardio (brisk walking, swimming)</li>
              <li>• Yoga flow (not hot yoga)</li>
              <li>• Pelvic floor exercises</li>
              <li>• Avoid: heavy lifting, intense HIIT, marathon running</li>
            </ul>
            <p className="text-[10px] text-[#5a7570] mt-2 italic">Why: Intense exercise raises cortisol which can delay or prevent ovulation. Keep heart rate below 80% max. Prioritize blood flow to pelvis.</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/30 border border-purple-100">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🌙 Luteal Phase — Gentle</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Walking (20-30 min daily)</li>
              <li>• Gentle yoga and stretching</li>
              <li>• Pilates (low intensity)</li>
              <li>• Breathing exercises and meditation</li>
            </ul>
            <p className="text-[10px] text-[#5a7570] mt-2 italic">Why: Progesterone raises body temperature and reduces exercise tolerance. Potential implantation is occurring — avoid jarring movements. Focus on stress reduction.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">⚠️ Exercise Red Flags for Fertility</h3>
          <ul className="text-xs text-[#3a5550] space-y-1">
            <li>• Exercising more than 60 min/day intensely can suppress ovulation</li>
            <li>• BMI below 18.5 from over-exercise causes hypothalamic amenorrhea</li>
            <li>• Running more than 40km/week is associated with anovulation</li>
            <li>• If your period disappears, you&apos;re exercising too much</li>
            <li>• Optimal: 150-300 min/week of moderate activity (WHO guideline)</li>
          </ul>
        </div>
      </section>

      {/* CHAPTER 4 — MALE FERTILITY */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">4. Male Fertility — The 74-Day Sperm Cycle</h2>
        <p className="text-sm text-[#3a5550] mb-4">
          Spermatogenesis (sperm production) takes exactly 74 days from stem cell to mature sperm. This means every lifestyle change takes at least 2-3 months to show in semen analysis results.
        </p>

        <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] mb-6">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-3">🔬 The 5 Phases of Spermatogenesis</h3>
          <div className="space-y-2 text-xs text-[#3a5550]">
            <p><strong>Days 1-14 — Spermatogonia:</strong> Stem cells divide. New sperm cells created from scratch.</p>
            <p><strong>Days 15-28 — Primary Spermatocytes:</strong> Meiosis I. DNA shuffled for genetic diversity.</p>
            <p><strong>Days 29-42 — Secondary Spermatocytes:</strong> Meiosis II complete. Cells have 23 chromosomes.</p>
            <p><strong>Days 43-56 — Spermatids:</strong> Cells reshape — grow tails, compact DNA, form acrosome.</p>
            <p><strong>Days 57-74 — Maturation:</strong> Sperm mature in epididymis. Learn to swim. Become fertile.</p>
          </div>
        </div>

        <h3 className="text-lg text-[#2d5a52] mb-3">WHO 2021 Normal Semen Parameters</h3>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            { param: "Volume", normal: "≥ 1.5 mL", low: "Hypospermia" },
            { param: "Concentration", normal: "≥ 16 million/mL", low: "Oligozoospermia" },
            { param: "Total Count", normal: "≥ 39 million", low: "Low total count" },
            { param: "Progressive Motility", normal: "≥ 30%", low: "Asthenozoospermia" },
            { param: "Total Motility", normal: "≥ 42%", low: "Poor movement" },
            { param: "Morphology", normal: "≥ 4% normal", low: "Teratozoospermia" },
          ].map((p) => (
            <div key={p.param} className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <p className="text-xs font-bold text-[#2d5a52]">{p.param}</p>
              <p className="text-xs text-[#5ba89d]">{p.normal}</p>
              <p className="text-[9px] text-[#5a7570]">Below: {p.low}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg text-[#2d5a52] mb-3">Top Sperm Killers (Evidence-Based)</h3>
        <div className="space-y-2 mb-6">
          {[
            { factor: "Heat exposure", impact: "Scrotal temperature +1°C = 14% drop in sperm production. Testes need to be 2-3°C below body temp.", source: "Mieusset & Bujan, 1995" },
            { factor: "Alcohol (>14 drinks/week)", impact: "Reduces testosterone 23%, sperm count drops 33%. Even moderate drinking (>5/week) affects morphology.", source: "Jensen et al., 2014" },
            { factor: "Smoking", impact: "Reduces sperm count 23%, motility 13%, increases DNA fragmentation 8x. Effects reverse in 3 months.", source: "Sharma et al., 2016" },
            { factor: "Obesity (BMI >30)", impact: "Reduces testosterone, increases estrogen conversion. Sperm count 24% lower. DNA fragmentation higher.", source: "Campbell et al., 2015" },
            { factor: "Stress (chronic)", impact: "Cortisol suppresses GnRH → reduces FSH/LH → less sperm production. Also reduces libido.", source: "Nargund, 2015" },
            { factor: "Anabolic steroids", impact: "Completely shuts down natural sperm production. Recovery takes 6-12 months after stopping.", source: "Turek, 2019" },
          ].map((f) => (
            <div key={f.factor} className="p-3 rounded-xl bg-red-50/30 border border-red-100">
              <p className="text-xs font-bold text-[#2d5a52]">{f.factor}</p>
              <p className="text-xs text-[#3a5550]">{f.impact}</p>
              <p className="text-[9px] text-[#5a7570] italic">Ref: {f.source}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">✅ His Daily Protocol</h3>
          <ul className="text-xs text-[#3a5550] space-y-1">
            <li>• Take supplements (Zinc 30mg, CoQ10 200mg, D3 3000IU, Omega-3 1000mg, Selenium 100mcg)</li>
            <li>• 30 min moderate exercise (walking, swimming, light weights)</li>
            <li>• 7-8 hours sleep (testosterone peaks during deep sleep)</li>
            <li>• 2.5L+ water daily</li>
            <li>• Cool showers (avoid hot baths, saunas, heated car seats)</li>
            <li>• Loose boxers (not briefs — reduces scrotal temperature)</li>
            <li>• No laptop on lap (heat + EMF exposure)</li>
            <li>• Limit alcohol to &lt;3 drinks/week</li>
            <li>• No smoking or cannabis</li>
          </ul>
        </div>
      </section>

      {/* CHAPTER 5 — NUTRITION */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">5. Fertility Nutrition — 7-Day Meal Plan</h2>
        <p className="text-sm text-[#3a5550] mb-4">
          The Mediterranean diet is the most studied dietary pattern for fertility. It&apos;s associated with 40% higher IVF success rates and improved ovulation in women with PCOS.
        </p>

        <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8] mb-6">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🔑 Key Fertility Nutrients</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#3a5550]">
            <p><strong>Folate:</strong> DNA synthesis, neural tube prevention</p>
            <p><strong>Iron:</strong> Ovulation support, blood building</p>
            <p><strong>Omega-3 DHA:</strong> Egg quality, sperm membranes</p>
            <p><strong>Zinc:</strong> Hormone production, sperm count</p>
            <p><strong>Vitamin D:</strong> Implantation, testosterone</p>
            <p><strong>Antioxidants:</strong> Protect egg/sperm DNA</p>
            <p><strong>Protein:</strong> Hormone building blocks</p>
            <p><strong>Fiber:</strong> Estrogen metabolism</p>
          </div>
        </div>

        <h3 className="text-lg text-[#2d5a52] mb-3">7-Day Fertility Meal Plan (Under €7/Day)</h3>
        <div className="space-y-3 mb-6">
          {[
            { day: "Monday", b: "Spinach & Feta Egg Scramble + whole grain toast", l: "Lentil & Sweet Potato Soup + seeds", d: "Baked Salmon + quinoa + roasted broccoli", s: "Greek yogurt + walnuts + berries", cost: "€6.20" },
            { day: "Tuesday", b: "Overnight oats + flaxseed + banana + almond butter", l: "Chickpea & Avocado Salad + olive oil", d: "Turkey Meatballs + whole wheat pasta + spinach", s: "Brazil nuts (3) + apple", cost: "€5.80" },
            { day: "Wednesday", b: "Smoothie: spinach + berries + protein + maca", l: "Tuna & White Bean Salad + lemon dressing", d: "Chicken Stir-Fry + brown rice + bok choy", s: "Pumpkin seeds + dark chocolate", cost: "€6.40" },
            { day: "Thursday", b: "Poached eggs + avocado + sourdough + tomato", l: "Mediterranean Quinoa Bowl + feta + olives", d: "Beef & Vegetable Stew + sweet potato", s: "Hummus + carrot sticks", cost: "€6.10" },
            { day: "Friday", b: "Greek yogurt parfait + granola + pomegranate", l: "Sardines on toast + rocket + lemon", d: "One-Pan Chicken + roasted root vegetables", s: "Walnuts + dried apricots", cost: "€5.90" },
            { day: "Saturday", b: "Banana Pancakes (egg + banana + oats)", l: "Black Bean & Corn Tacos + guacamole", d: "Baked Cod + garlic potatoes + green beans", s: "Edamame + sea salt", cost: "€5.70" },
            { day: "Sunday", b: "Full Fertility Breakfast: eggs + salmon + avocado + seeds", l: "Leftover stew + fresh bread", d: "Homemade Pizza + rocket + olive oil", s: "Smoothie: mango + spinach + coconut", cost: "€6.50" },
          ].map((d) => (
            <div key={d.day} className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-[#2d5a52]">{d.day}</span>
                <span className="text-xs text-[#5ba89d] font-medium">{d.cost}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-1 text-[10px] text-[#3a5550]">
                <span>🌅 <strong>B:</strong> {d.b}</span>
                <span>☀️ <strong>L:</strong> {d.l}</span>
                <span>🌙 <strong>D:</strong> {d.d}</span>
                <span>🍎 <strong>S:</strong> {d.s}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#5a7570]">Average: €6.10/day for both partners. Recipes optimized for fertility nutrients.</p>

        <div className="mt-6 p-4 rounded-xl bg-red-50/30 border border-red-100">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🚫 Foods to Avoid or Limit</h3>
          <ul className="text-xs text-[#3a5550] space-y-1">
            <li>• <strong>Trans fats:</strong> Fried food, margarine — linked to ovulatory infertility (Nurses&apos; Health Study)</li>
            <li>• <strong>Excess sugar:</strong> Insulin spikes disrupt ovulation and lower testosterone</li>
            <li>• <strong>Processed meat:</strong> Associated with lower sperm count and quality</li>
            <li>• <strong>Caffeine &gt;200mg/day:</strong> May increase miscarriage risk (limit to 1-2 cups coffee)</li>
            <li>• <strong>Alcohol:</strong> Even moderate drinking reduces fertility in both partners</li>
            <li>• <strong>Soy (excess):</strong> Phytoestrogens may affect male hormones in large amounts</li>
            <li>• <strong>BPA plastics:</strong> Endocrine disruptors — use glass containers</li>
          </ul>
        </div>
      </section>

      {/* CHAPTER 6 — HER SUPPLEMENTS */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">6. Supplement Guide — Her Protocol</h2>
        <p className="text-sm text-[#3a5550] mb-6">Evidence-based supplements for female fertility. Always consult your doctor, especially if taking medication.</p>

        <div className="space-y-3">
          {[
            { name: "Folate (Methylfolate)", dose: "400-800mcg", timing: "With breakfast", evidence: "Prevents neural tube defects. Start 3 months before conception. Methylfolate preferred over folic acid for MTHFR carriers (40% of population).", priority: "essential" },
            { name: "CoQ10 (Ubiquinol)", dose: "200-600mg", timing: "With breakfast", evidence: "Improves egg quality by supporting mitochondrial energy production. Particularly important after 35. RCT showed improved IVF outcomes.", priority: "essential" },
            { name: "Vitamin D3", dose: "2,000-4,000 IU", timing: "With breakfast", evidence: "Deficiency linked to implantation failure and miscarriage. Optimal level: 40-60 ng/mL. 70% of women are deficient.", priority: "essential" },
            { name: "Omega-3 (DHA/EPA)", dose: "1,000-2,000mg", timing: "With meal", evidence: "Improves egg quality, reduces inflammation, supports embryo development. DHA critical for fetal brain. Anti-inflammatory for endometriosis.", priority: "essential" },
            { name: "Iron + Vitamin C", dose: "18-27mg iron", timing: "Empty stomach or with Vit C", evidence: "Ovulatory infertility 40% lower in women with adequate iron (Nurses&apos; Health Study). Vitamin C doubles absorption.", priority: "essential" },
            { name: "Myo-Inositol", dose: "2,000-4,000mg", timing: "Split AM/PM", evidence: "Improves insulin sensitivity and ovulation in PCOS. Multiple RCTs show restored cycles in 60-70% of women. Also improves egg quality in IVF.", priority: "essential" },
            { name: "Magnesium Glycinate", dose: "300-400mg", timing: "Before bed", evidence: "Reduces cortisol, improves sleep quality, supports 300+ enzyme reactions. Deficiency common in modern diets.", priority: "recommended" },
            { name: "Vitamin B Complex", dose: "1 capsule", timing: "With breakfast", evidence: "B6 supports luteal phase (progesterone). B12 essential for DNA synthesis. Folate included in most B-complex.", priority: "recommended" },
            { name: "Zinc", dose: "15-30mg", timing: "With food", evidence: "Required for egg maturation and cell division. Supports progesterone production. Deficiency common in vegetarians.", priority: "recommended" },
            { name: "Vitamin E", dose: "200-400 IU", timing: "With fat-containing meal", evidence: "Antioxidant that protects egg DNA. Improves endometrial thickness. Beneficial for endometriosis.", priority: "recommended" },
            { name: "Probiotics", dose: "10-30B CFU", timing: "Empty stomach", evidence: "Vaginal microbiome affects implantation. Lactobacillus-dominant flora associated with higher IVF success.", priority: "recommended" },
          ].map((s) => (
            <div key={s.name} className={`p-4 rounded-xl border ${s.priority === "essential" ? "bg-green-50/30 border-green-100" : "bg-white/60 border-[#c2ddd8]"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#2d5a52]">{s.name}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f0faf8] text-[#5ba89d] font-bold">{s.dose}</span>
                {s.priority === "essential" && <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">ESSENTIAL</span>}
              </div>
              <p className="text-[10px] text-[#3a5550]">{s.evidence}</p>
              <p className="text-[9px] text-[#5a7570] mt-1">⏰ {s.timing}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 7 — HIS SUPPLEMENTS */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">7. Supplement Guide — His Protocol</h2>
        <p className="text-sm text-[#3a5550] mb-6">Male fertility supplements have strong clinical evidence. Start at least 74 days (one full sperm cycle) before trying to conceive.</p>

        <div className="space-y-3">
          {[
            { name: "Zinc", dose: "30mg", evidence: "Meta-analysis: increases sperm count by 74% in subfertile men. Essential for testosterone synthesis and sperm maturation. Oysters are the richest food source.", source: "Zhao et al., 2016" },
            { name: "CoQ10", dose: "200-300mg", evidence: "Improves sperm motility by 26% and concentration by 33% in RCTs. Provides energy for sperm movement. Antioxidant protection for sperm DNA.", source: "Safarinejad, 2012" },
            { name: "Vitamin D3", dose: "3,000 IU", evidence: "Men with adequate D3 have 30% higher motility. Vitamin D receptors found on sperm cells. Supports testosterone production.", source: "Blomberg Jensen, 2014" },
            { name: "Omega-3 DHA", dose: "1,000mg", evidence: "DHA is the primary fat in sperm cell membranes. Improves membrane fluidity = better motility. Also reduces inflammation in reproductive tract.", source: "Safarinejad, 2011" },
            { name: "Selenium", dose: "100mcg", evidence: "Component of selenoproteins that protect sperm DNA from oxidative damage. Brazil nuts (2-3/day) provide full daily requirement.", source: "Moslemi & Tavanbakhsh, 2011" },
            { name: "L-Carnitine", dose: "1,500-2,000mg", evidence: "Transports fatty acids into mitochondria for energy. Directly fuels sperm motility. Multiple RCTs show 20-30% motility improvement.", source: "Lenzi et al., 2004" },
            { name: "Vitamin C", dose: "500-1,000mg", evidence: "Powerful antioxidant. Protects sperm DNA from oxidative damage. Smokers especially benefit (reduces DNA fragmentation by 50%).", source: "Akmal et al., 2006" },
            { name: "Folate", dose: "400mcg", evidence: "Required for DNA synthesis in rapidly dividing sperm cells. Combined with zinc, increases total normal sperm count by 74%.", source: "Wong et al., 2002" },
          ].map((s) => (
            <div key={s.name} className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#2d5a52]">{s.name}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#5ba89d]/10 text-[#5ba89d] font-bold">{s.dose}</span>
              </div>
              <p className="text-[10px] text-[#3a5550]">{s.evidence}</p>
              <p className="text-[9px] text-[#5a7570] mt-1 italic">📚 {s.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER 8 — LIFESTYLE FACTORS */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">8. Lifestyle Factors That Impact Conception</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">😴 Sleep (Both Partners)</h3>
            <p className="text-xs text-[#3a5550] mb-2">Sleep deprivation disrupts GnRH pulsatility, reducing FSH/LH secretion. Men who sleep &lt;6 hours have 25% lower testosterone. Women with irregular sleep have more anovulatory cycles.</p>
            <p className="text-xs text-[#5ba89d]"><strong>Target:</strong> 7-8 hours. Consistent bedtime. Dark, cool room (18°C). No screens 30 min before bed.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🧠 Stress (Both Partners)</h3>
            <p className="text-xs text-[#3a5550] mb-2">Chronic stress elevates cortisol which directly suppresses GnRH (the master fertility hormone). Women under high stress take 29% longer to conceive. Stress also reduces libido and sexual frequency.</p>
            <p className="text-xs text-[#5ba89d]"><strong>Target:</strong> Daily stress management: 5 min breathing, walking in nature, limiting news/social media. Consider therapy if TTC stress is overwhelming.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">⚖️ Weight (Both Partners)</h3>
            <p className="text-xs text-[#3a5550] mb-2">BMI 20-25 is optimal for fertility. Underweight (BMI &lt;18.5): hypothalamic amenorrhea, no ovulation. Overweight (BMI &gt;30): insulin resistance disrupts ovulation; in men, excess fat converts testosterone to estrogen.</p>
            <p className="text-xs text-[#5ba89d]"><strong>Target:</strong> Even 5% weight loss in overweight individuals significantly improves fertility markers.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🌡️ Environmental Toxins</h3>
            <p className="text-xs text-[#3a5550] mb-2">Endocrine disruptors (BPA, phthalates, pesticides) mimic hormones and damage reproductive cells. Found in: plastic containers, non-stick pans, conventional produce, receipts, fragrances.</p>
            <p className="text-xs text-[#5ba89d]"><strong>Target:</strong> Glass containers for food. Organic when possible (Dirty Dozen list). Fragrance-free products. Filter drinking water. Avoid heating food in plastic.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">💧 Hydration</h3>
            <p className="text-xs text-[#3a5550] mb-2">Water is essential for cervical mucus production (the medium sperm swim through), hormone transport, and seminal fluid volume. Dehydration thickens cervical mucus, making it hostile to sperm.</p>
            <p className="text-xs text-[#5ba89d]"><strong>Target:</strong> Her: 2L/day minimum. Him: 2.5L/day. More if exercising. Limit caffeine (diuretic).</p>
          </div>
        </div>
      </section>

      {/* CHAPTER 9 — WHEN TO SEE A DOCTOR */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">9. When to See a Doctor</h2>

        <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
          <h3 className="text-sm font-bold text-red-800 mb-2">🚨 See a Doctor If:</h3>
          <ul className="text-xs text-red-700 space-y-1">
            <li>• Under 35: no conception after 12 months of regular unprotected intercourse</li>
            <li>• Over 35: no conception after 6 months</li>
            <li>• Over 40: see a specialist immediately when starting TTC</li>
            <li>• Irregular or absent periods (cycles &lt;21 or &gt;35 days)</li>
            <li>• Known conditions: PCOS, endometriosis, fibroids, previous STIs</li>
            <li>• Previous miscarriages (2 or more)</li>
            <li>• Known male factor: undescended testes, varicocele, previous chemotherapy</li>
            <li>• Pain during intercourse or periods</li>
          </ul>
        </div>

        <h3 className="text-lg text-[#2d5a52] mb-3">Common Fertility Tests</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
            <p className="text-xs font-bold text-[#2d5a52]">For Her</p>
            <ul className="text-[10px] text-[#3a5550] space-y-0.5 mt-1">
              <li>• Day 3 bloods: FSH, LH, Estradiol, AMH</li>
              <li>• Day 21 progesterone (confirms ovulation)</li>
              <li>• Thyroid panel (TSH, T3, T4)</li>
              <li>• Pelvic ultrasound (antral follicle count)</li>
              <li>• HSG (checks fallopian tube patency)</li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
            <p className="text-xs font-bold text-[#2d5a52]">For Him</p>
            <ul className="text-[10px] text-[#3a5550] space-y-0.5 mt-1">
              <li>• Semen analysis (SA) — the first test to do</li>
              <li>• Hormone panel: Testosterone, FSH, LH</li>
              <li>• Scrotal ultrasound (if SA abnormal)</li>
              <li>• DNA fragmentation test (if recurrent loss)</li>
              <li>• Karyotype (if severe oligozoospermia)</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800">
            <strong>💡 Important:</strong> Male factor contributes to 50% of infertility cases, yet men are often tested last. A semen analysis is cheap, non-invasive, and should be done early. Don&apos;t wait 12 months to test him.
          </p>
        </div>
      </section>

      {/* CHAPTER 10 — COUPLE OPTIMIZATION */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">10. Couple Optimization — Timing & Strategy</h2>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🎯 Optimal Intercourse Timing</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• <strong>Best days:</strong> Day of positive OPK + day after (O-1 and O day)</li>
              <li>• <strong>Good days:</strong> O-3, O-2, O-1, O (every other day during fertile window)</li>
              <li>• <strong>Frequency:</strong> Every 1-2 days during fertile window. Daily is fine — does NOT deplete sperm in healthy men</li>
              <li>• <strong>Abstinence before:</strong> 2-3 days max. Longer than 5 days reduces motility</li>
              <li>• <strong>After intercourse:</strong> She can lie down 10-15 min (gravity helps). No evidence for legs up.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">❌ Myths Debunked</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• <strong>Myth:</strong> &quot;Save up sperm for ovulation day&quot; → <strong>Fact:</strong> Abstinence &gt;5 days increases DNA damage</li>
              <li>• <strong>Myth:</strong> &quot;Position matters&quot; → <strong>Fact:</strong> No evidence any position is better. Sperm reach cervix in seconds.</li>
              <li>• <strong>Myth:</strong> &quot;Female orgasm helps conception&quot; → <strong>Fact:</strong> No proven effect, but reduces stress which helps</li>
              <li>• <strong>Myth:</strong> &quot;Lubricants are fine&quot; → <strong>Fact:</strong> Most lubricants kill sperm. Use &quot;fertility-friendly&quot; brands (Pre-Seed) or none.</li>
              <li>• <strong>Myth:</strong> &quot;Stress doesn&apos;t affect fertility&quot; → <strong>Fact:</strong> High cortisol suppresses GnRH in both partners</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">📅 The 3-Month Preparation Plan</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• <strong>Month 1:</strong> Both start supplements. He eliminates heat/alcohol/smoking. She starts cycle tracking. Both optimize sleep.</li>
              <li>• <strong>Month 2:</strong> She identifies fertile window with OPK. He has been on protocol 30+ days. Both exercise regularly.</li>
              <li>• <strong>Month 3:</strong> His new sperm are maturing. She has 2 cycles of data. Begin timed intercourse. His SA can be done now to check baseline.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CHAPTER 11 — DAILY ROUTINES */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">11. Daily Routine Templates</h2>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-base font-bold text-[#2d5a52] mb-3">🌅 Her Morning Routine (15 min)</h3>
            <ol className="space-y-1 text-xs text-[#3a5550]">
              <li>1. Log BBT before getting up (if tracking)</li>
              <li>2. Glass of warm lemon water</li>
              <li>3. Take supplements with breakfast (Folate, CoQ10, D3, Omega-3)</li>
              <li>4. 5 min gentle stretching or yoga</li>
              <li>5. Fertility-friendly breakfast (eggs + greens + seeds)</li>
            </ol>
          </div>

          <div className="p-5 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-base font-bold text-[#2d5a52] mb-3">🌅 His Morning Routine (10 min)</h3>
            <ol className="space-y-1 text-xs text-[#3a5550]">
              <li>1. Cool shower (not hot — protects sperm)</li>
              <li>2. Take supplements (Zinc, CoQ10, D3, Omega-3, Selenium)</li>
              <li>3. High-protein breakfast (eggs + avocado + seeds)</li>
              <li>4. Loose boxers (not briefs)</li>
              <li>5. Walk or cycle to work if possible</li>
            </ol>
          </div>

          <div className="p-5 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-base font-bold text-[#2d5a52] mb-3">🌙 Evening Routine (Both — 20 min)</h3>
            <ol className="space-y-1 text-xs text-[#3a5550]">
              <li>1. Dinner together — Mediterranean-style meal</li>
              <li>2. 20 min walk together (reduces cortisol, improves circulation)</li>
              <li>3. Her: Magnesium + evening supplements</li>
              <li>4. No screens 30 min before bed</li>
              <li>5. 5 min breathing exercise together (box breathing or 4-7-8)</li>
              <li>6. Bedroom: dark, cool (18°C), no phones</li>
              <li>7. Aim for sleep by 10:30pm (hormone production peaks 10pm-2am)</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CHAPTER 12 — TRACKERS */}
      <section className="soft-card p-8 mb-8 page-break">
        <h2 className="text-3xl text-[#2d5a52] mb-6">12. Trackers & Worksheets</h2>
        <p className="text-sm text-[#3a5550] mb-6">Print these pages and use them daily. Tracking creates awareness and helps identify patterns.</p>

        {/* Cycle Tracker */}
        <div className="p-5 rounded-xl border border-[#c2ddd8] mb-6">
          <h3 className="text-base font-bold text-[#2d5a52] mb-3">📅 Monthly Cycle Tracker</h3>
          <div className="grid grid-cols-7 gap-1 mb-3">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square border border-[#c2ddd8] rounded-lg flex items-center justify-center text-[9px] text-[#5a7570]">
                {i < 28 ? i + 1 : ""}
              </div>
            ))}
          </div>
          <div className="flex gap-4 text-[9px] text-[#5a7570]">
            <span>🩸 = Period</span>
            <span>🥚 = Ovulation</span>
            <span>💚 = Fertile</span>
            <span>⭐ = Intercourse</span>
            <span>🌡️ = BBT logged</span>
          </div>
        </div>

        {/* Daily Checklist */}
        <div className="p-5 rounded-xl border border-[#c2ddd8] mb-6">
          <h3 className="text-base font-bold text-[#2d5a52] mb-3">✅ Daily Fertility Checklist (Both)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-[#5ba89d] mb-2">Her Daily</p>
              <div className="space-y-1 text-xs text-[#3a5550]">
                {["□ Supplements taken", "□ 2L water", "□ Fertility-friendly meals", "□ Exercise (cycle-appropriate)", "□ 7+ hours sleep", "□ Stress management", "□ OPK test (if in window)", "□ BBT logged"].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#5ba89d] mb-2">His Daily</p>
              <div className="space-y-1 text-xs text-[#3a5550]">
                {["□ Supplements taken", "□ 2.5L water", "□ 30 min exercise", "□ No alcohol", "□ Cool shower (no hot bath)", "□ Loose underwear", "□ No laptop on lap", "□ 7+ hours sleep"].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shopping List */}
        <div className="p-5 rounded-xl border border-[#c2ddd8]">
          <h3 className="text-base font-bold text-[#2d5a52] mb-3">🛒 Weekly Fertility Shopping List</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-[#3a5550]">
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Protein</p>
              <p>□ Eggs (12)</p>
              <p>□ Salmon/sardines</p>
              <p>□ Chicken breast</p>
              <p>□ Lentils/chickpeas</p>
              <p>□ Greek yogurt</p>
            </div>
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Vegetables</p>
              <p>□ Spinach/kale</p>
              <p>□ Broccoli</p>
              <p>□ Sweet potato</p>
              <p>□ Avocado (3)</p>
              <p>□ Garlic, onion</p>
            </div>
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Fruits & Nuts</p>
              <p>□ Berries</p>
              <p>□ Pomegranate</p>
              <p>□ Walnuts</p>
              <p>□ Brazil nuts</p>
              <p>□ Pumpkin seeds</p>
            </div>
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Grains</p>
              <p>□ Quinoa</p>
              <p>□ Oats</p>
              <p>□ Brown rice</p>
              <p>□ Whole grain bread</p>
            </div>
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Fats</p>
              <p>□ Olive oil (extra virgin)</p>
              <p>□ Flaxseed</p>
              <p>□ Coconut oil</p>
            </div>
            <div>
              <p className="font-bold text-[#5ba89d] mb-1">Other</p>
              <p>□ Dark chocolate 85%+</p>
              <p>□ Herbal teas</p>
              <p>□ Turmeric</p>
              <p>□ Ginger</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="soft-card p-8 text-center no-print">
        <h2 className="text-2xl text-[#2d5a52] mb-3">Ready for the Full Personalized Program?</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          This guide is your foundation. The app gives you daily personalized sessions, rotating meal plans, cycle tracking, spermiogram tracking, couple mode, and progress analytics.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/quiz" className="btn-primary px-8 py-3 text-base inline-block">
            Take Free Assessment →
          </Link>
          <Link href="/partner" className="btn-outline px-6 py-3 text-sm inline-block">
            His Dashboard →
          </Link>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="soft-card p-6 mt-8 text-center">
        <p className="text-[10px] text-[#5a7570]">
          <strong>Medical Disclaimer:</strong> This guide is for educational purposes only and does not constitute medical advice. Always consult your healthcare provider before starting supplements, changing your diet, or beginning an exercise program. Individual results vary. References available upon request.
        </p>
      </section>
    </main>
  );
}
