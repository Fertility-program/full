"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

type QuizData = {
  symptoms?: string[];
  age?: string;
  goal?: string;
};

type Supplement = {
  name: string;
  icon: string;
  dose: string;
  timing: string;
  why: string;
  food_sources: string[];
  priority: "essential" | "recommended" | "optional";
  symptoms: string[];
};

const ALL_SUPPLEMENTS: Supplement[] = [
  {
    name: "Folate (Methylfolate)",
    icon: "🌿",
    dose: "400–800mcg daily",
    timing: "With breakfast",
    why: "Essential for neural tube development and DNA synthesis. Methylfolate is the active form, better absorbed than synthetic folic acid. Start 3 months before conception.",
    food_sources: ["Dark leafy greens", "Lentils", "Asparagus", "Avocado"],
    priority: "essential",
    symptoms: [],
  },
  {
    name: "CoQ10 (Ubiquinol)",
    icon: "🥚",
    dose: "200–600mg daily",
    timing: "With breakfast (fat-containing meal)",
    why: "Supports mitochondrial energy in egg cells, improving egg quality. Especially important for women over 30. Takes 3 months to impact egg development.",
    food_sources: ["Organ meats", "Sardines", "Broccoli", "Cauliflower"],
    priority: "essential",
    symptoms: ["Irregular cycles", "PCOS symptoms"],
  },
  {
    name: "Vitamin D3",
    icon: "☀️",
    dose: "2,000–4,000 IU daily",
    timing: "With breakfast (fat-containing meal)",
    why: "Linked to improved fertility outcomes, supports hormone production, immune regulation and healthy implantation.",
    food_sources: ["Fatty fish (salmon, sardines)", "Egg yolks", "Fortified milk"],
    priority: "essential",
    symptoms: [],
  },
  {
    name: "Omega-3 (DHA/EPA)",
    icon: "🐟",
    dose: "1,000–2,000mg daily",
    timing: "With any meal",
    why: "Reduces inflammation, supports hormone balance, healthy uterine lining and fetal brain development.",
    food_sources: ["Salmon", "Sardines", "Walnuts", "Flaxseeds"],
    priority: "essential",
    symptoms: ["Inflammation", "Endometriosis", "Stress & anxiety"],
  },
  {
    name: "Iron + Vitamin C",
    icon: "💪",
    dose: "18–27mg iron daily with Vitamin C",
    timing: "On empty stomach or with Vitamin C-rich food",
    why: "Prevents anemia, supports ovulation and healthy blood flow to reproductive organs. Vitamin C enhances absorption by 67%.",
    food_sources: ["Red meat", "Lentils", "Spinach", "Pumpkin seeds"],
    priority: "essential",
    symptoms: ["Low energy", "Irregular cycles"],
  },
  {
    name: "Myo-Inositol",
    icon: "🌸",
    dose: "2,000–4,000mg daily",
    timing: "Split into 2 doses (morning and evening)",
    why: "Improves insulin sensitivity, egg quality and ovulation regularity. Especially beneficial for PCOS — shown to restore ovulation in 70% of cases.",
    food_sources: ["Citrus fruits", "Beans", "Whole grains", "Nuts"],
    priority: "essential",
    symptoms: ["PCOS symptoms", "Irregular cycles"],
  },
  {
    name: "Magnesium Glycinate",
    icon: "🌙",
    dose: "300–400mg daily",
    timing: "Before bed (promotes sleep)",
    why: "Supports progesterone production, reduces stress hormones, improves sleep quality and calms the nervous system.",
    food_sources: ["Dark chocolate", "Almonds", "Spinach", "Pumpkin seeds"],
    priority: "recommended",
    symptoms: ["Poor sleep", "Stress & anxiety", "PCOS symptoms"],
  },
  {
    name: "Vitamin B Complex",
    icon: "⚡",
    dose: "1 capsule daily (with active B6 as P5P)",
    timing: "With breakfast",
    why: "B6 supports progesterone production and luteal phase. B12 prevents fatigue. Folate supports cell division. Essential for fertility hormones.",
    food_sources: ["Eggs", "Chicken", "Lentils", "Bananas"],
    priority: "recommended",
    symptoms: ["Low energy", "Irregular cycles", "Stress & anxiety"],
  },
  {
    name: "Zinc",
    icon: "🛡️",
    dose: "15–30mg daily",
    timing: "With food (can cause nausea on empty stomach)",
    why: "Critical for egg development, hormone production and immune function. Supports FSH and LH balance.",
    food_sources: ["Pumpkin seeds", "Beef", "Chickpeas", "Cashews"],
    priority: "recommended",
    symptoms: ["Irregular cycles", "Hormonal acne", "Thyroid issues"],
  },
  {
    name: "Vitamin E",
    icon: "🌻",
    dose: "200–400 IU daily",
    timing: "With a fat-containing meal",
    why: "Antioxidant that protects egg cells from oxidative damage. May improve endometrial thickness and blood flow to uterus.",
    food_sources: ["Sunflower seeds", "Almonds", "Avocado", "Olive oil"],
    priority: "recommended",
    symptoms: ["Endometriosis", "Inflammation"],
  },
  {
    name: "Probiotics",
    icon: "🦠",
    dose: "10–30 billion CFU daily (Lactobacillus strains)",
    timing: "On empty stomach (morning or before bed)",
    why: "Vaginal and gut microbiome health directly affects fertility. Lactobacillus-dominant vaginal flora is linked to better IVF outcomes.",
    food_sources: ["Greek yogurt", "Kefir", "Sauerkraut", "Kimchi"],
    priority: "recommended",
    symptoms: ["Inflammation", "PCOS symptoms", "Hormonal acne"],
  },
  {
    name: "Selenium",
    icon: "🥜",
    dose: "55–100mcg daily",
    timing: "With any meal",
    why: "Protects eggs from oxidative damage, supports thyroid function and healthy follicle development.",
    food_sources: ["Brazil nuts (1-2 daily)", "Tuna", "Eggs", "Sunflower seeds"],
    priority: "optional",
    symptoms: ["Thyroid issues", "Inflammation"],
  },
];

const PRIORITY_LABELS = {
  essential: { label: "Essential", cls: "bg-rose-50 text-rose-600 border-rose-100" },
  recommended: { label: "Recommended", cls: "bg-amber-50 text-amber-600 border-amber-100" },
  optional: { label: "Optional", cls: "bg-blue-50 text-blue-600 border-blue-100" },
};

export default function SupplementsPage() {
  const [data, setData] = useState<QuizData>({});

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    if (raw) {
      try { setData(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const personalizedSupplements = useMemo(() => {
    const symptoms = data.symptoms || [];
    const age = Number(data.age) || 48;

    return ALL_SUPPLEMENTS.map((supp) => {
      let relevance = 0;

      // Essential always high
      if (supp.priority === "essential") relevance += 10;
      if (supp.priority === "recommended") relevance += 5;

      // Symptom matching
      for (const s of supp.symptoms) {
        if (symptoms.includes(s)) relevance += 3;
      }

      // Age adjustments
      if (age >= 55 && supp.name === "Calcium") relevance += 2;
      if (age >= 50 && supp.name === "Vitamin D3") relevance += 2;

      return { ...supp, relevance };
    }).sort((a, b) => b.relevance - a.relevance);
  }, [data]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <section className="soft-card p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#b98fa1] mb-2 font-bold">
              {data.symptoms && data.symptoms.length > 0 ? "Personalized For You" : "Supplement Guide"}
            </p>
            <h1 className="text-4xl text-[#4a3f44]">Vitamins & Minerals</h1>
          </div>
          <PrintButton targetId="printable-supplements" label="Print Guide" />
        </div>

        {data.symptoms && data.symptoms.length > 0 ? (
          <p className="text-sm text-[#7b6870]">
            Based on your assessment, here are the supplements recommended for your specific needs.
            <span className="block mt-1 text-[#d8a7b5] font-medium">Your symptoms: {data.symptoms.join(", ")}.</span>
          </p>
        ) : (
          <div className="mt-3 p-4 rounded-2xl bg-[#fff4f7] border border-[#f0e3e8]">
            <p className="text-sm text-[#6f5a62] mb-2">
              📋 Take the assessment to get personalized supplement recommendations based on your symptoms, age and goals.
            </p>
            <Link href="/quiz" className="btn-primary text-xs px-4 py-2">
              Take Assessment
            </Link>
          </div>
        )}
      </section>

      <div id="printable-supplements">
        {/* ESSENTIAL */}
        {["essential", "recommended", "optional"].map((priority) => {
          const supps = personalizedSupplements.filter((s) => s.priority === priority);
          if (supps.length === 0) return null;
          const config = PRIORITY_LABELS[priority as keyof typeof PRIORITY_LABELS];

          return (
            <section key={priority} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border ${config.cls}`}>
                  {config.label}
                </span>
              </div>

              <div className="space-y-3">
                {supps.map((supp) => {
                  const isRelevant = (data.symptoms || []).some((s) => supp.symptoms.includes(s));

                  return (
                    <div
                      key={supp.name}
                      className={`soft-card p-5 ${isRelevant ? "border-[#d8a7b5]/40" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">{supp.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-base font-medium text-[#4a3f44]">{supp.name}</h3>
                            {isRelevant && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#fdf2f5] text-[#d8a7b5] font-bold">
                                Matches your symptoms
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-3 text-xs mb-2">
                            <span className="text-[#d8a7b5] font-bold">{supp.dose}</span>
                            <span className="text-[#7b6870]">⏰ {supp.timing}</span>
                          </div>

                          <p className="text-xs text-[#6f5a62] leading-relaxed mb-2">{supp.why}</p>

                          {supp.food_sources.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] text-[#b98fa1] font-bold mr-1">Food sources:</span>
                              {supp.food_sources.map((f) => (
                                <span key={f} className="text-[9px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="soft-card p-5 text-center">
          <p className="text-xs text-[#b98fa1] italic">
            ⚕️ Always consult your doctor before starting any supplement, especially if you take medication.
            Doses are general guidelines based on current research.
          </p>
        </section>

        {/* MEN'S FERTILITY SUPPLEMENTS */}
        <section className="mt-10 mb-6">
          <div className="soft-card p-8 mb-4 border-l-4 border-l-[#5ba89d]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👨</span>
              <div>
                <h2 className="text-3xl text-[#2d5a52]">For Him: Sperm Quality</h2>
                <p className="text-sm text-[#5a7570]">Supplements & minerals that improve sperm count, motility and morphology. Results typically visible after 2-3 months (one full spermatogenesis cycle).</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Zinc",
                icon: "🛡️",
                dose: "25–50mg daily",
                timing: "With food (dinner)",
                why: "The most critical mineral for male fertility. Zinc is essential for testosterone production, sperm formation and DNA integrity. Deficiency directly reduces sperm count and motility. Studies show 25mg/day increases sperm count by 74% in subfertile men.",
                food_sources: ["Oysters (highest source)", "Beef", "Pumpkin seeds", "Chickpeas"],
                priority: "essential" as const,
              },
              {
                name: "CoQ10 (Ubiquinol)",
                icon: "⚡",
                dose: "200–400mg daily",
                timing: "With breakfast (fat-containing meal)",
                why: "Powers mitochondria in sperm cells — directly improves motility (swimming speed). Meta-analysis shows significant improvement in sperm concentration and motility after 3 months. Ubiquinol form is 3x better absorbed than ubiquinone.",
                food_sources: ["Organ meats", "Sardines", "Beef", "Peanuts"],
                priority: "essential" as const,
              },
              {
                name: "Selenium",
                icon: "🥜",
                dose: "55–200mcg daily",
                timing: "With any meal",
                why: "Protects sperm DNA from oxidative damage and is essential for sperm tail formation (morphology). Just 2 Brazil nuts daily provide ~100mcg. Combined with Vitamin E, shown to improve motility by 52%.",
                food_sources: ["Brazil nuts (2/day)", "Tuna", "Eggs", "Sunflower seeds"],
                priority: "essential" as const,
              },
              {
                name: "Folate (5-MTHF)",
                icon: "🌿",
                dose: "400–800mcg daily",
                timing: "With breakfast",
                why: "Essential for DNA synthesis during sperm production. Low folate is linked to higher rates of chromosomal abnormalities in sperm. Combined with zinc, increases sperm count by 74% in studies.",
                food_sources: ["Dark leafy greens", "Lentils", "Asparagus", "Avocado"],
                priority: "essential" as const,
              },
              {
                name: "Vitamin D3",
                icon: "☀️",
                dose: "2,000–4,000 IU daily",
                timing: "With breakfast",
                why: "Vitamin D receptors exist on sperm cells. Deficiency is linked to lower motility and testosterone. Studies show supplementation improves total motile sperm count. Most men in northern climates are deficient.",
                food_sources: ["Sunlight (15 min)", "Fatty fish", "Egg yolks", "Fortified milk"],
                priority: "essential" as const,
              },
              {
                name: "Omega-3 (DHA)",
                icon: "🐟",
                dose: "1,000–2,000mg daily (high DHA)",
                timing: "With any meal",
                why: "DHA is a structural component of sperm cell membranes. Higher DHA levels correlate with better morphology and motility. Also reduces inflammation in the reproductive tract.",
                food_sources: ["Wild salmon", "Sardines", "Mackerel", "Algae oil"],
                priority: "essential" as const,
              },
              {
                name: "L-Carnitine",
                icon: "🔥",
                dose: "1,000–2,000mg daily",
                timing: "Split into 2 doses (morning and evening)",
                why: "Fuels sperm energy metabolism — directly powers the tail for swimming. Multiple RCTs show improved concentration, motility and morphology. One of the most evidence-backed male fertility supplements.",
                food_sources: ["Red meat", "Chicken", "Milk", "Avocado"],
                priority: "recommended" as const,
              },
              {
                name: "Vitamin C",
                icon: "🍊",
                dose: "500–1,000mg daily",
                timing: "With breakfast (split if >500mg)",
                why: "Powerful antioxidant that protects sperm DNA from oxidative stress. Studies show 1,000mg/day reduces sperm DNA fragmentation by 20% and prevents sperm agglutination (clumping).",
                food_sources: ["Kiwi", "Bell peppers", "Oranges", "Strawberries"],
                priority: "recommended" as const,
              },
              {
                name: "Vitamin E",
                icon: "🌻",
                dose: "200–400 IU daily",
                timing: "With fat-containing meal",
                why: "Works synergistically with Selenium to protect sperm membranes from lipid peroxidation. Combined supplementation improves pregnancy rates by 29% in one study.",
                food_sources: ["Sunflower seeds", "Almonds", "Hazelnuts", "Olive oil"],
                priority: "recommended" as const,
              },
              {
                name: "Ashwagandha (KSM-66)",
                icon: "🌿",
                dose: "300–600mg daily",
                timing: "Morning or evening (consistent timing)",
                why: "Adaptogen that reduces cortisol by 27% and increases testosterone by 17% in studies. Improves sperm count (+167%), motility (+57%) and semen volume in infertile men. Also reduces stress and improves sleep.",
                food_sources: [],
                priority: "recommended" as const,
              },
              {
                name: "Magnesium",
                icon: "🌙",
                dose: "300–400mg daily",
                timing: "Before bed",
                why: "Supports testosterone production, improves sleep quality (critical for sperm production which peaks during sleep), and reduces oxidative stress. Most men are deficient.",
                food_sources: ["Dark chocolate", "Almonds", "Spinach", "Pumpkin seeds"],
                priority: "recommended" as const,
              },
              {
                name: "D-Aspartic Acid (DAA)",
                icon: "💊",
                dose: "2,000–3,000mg daily",
                timing: "Morning, on empty stomach",
                why: "Amino acid that stimulates LH release, which triggers testosterone production. Studies show 42% increase in testosterone and 60% increase in sperm count after 90 days. Cycle 2-3 months on, 1 month off.",
                food_sources: [],
                priority: "optional" as const,
              },
            ].map((supp) => {
              const config = PRIORITY_LABELS[supp.priority];
              return (
                <div key={supp.name} className="soft-card p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{supp.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-medium text-[#2d5a52]">{supp.name}</h3>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border ${config.cls}`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs mb-2">
                        <span className="text-[#5ba89d] font-bold">{supp.dose}</span>
                        <span className="text-[#5a7570]">⏰ {supp.timing}</span>
                      </div>
                      <p className="text-xs text-[#3a5550] leading-relaxed mb-2">{supp.why}</p>
                      {supp.food_sources.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[9px] text-[#6aab9f] font-bold mr-1">Food sources:</span>
                          {supp.food_sources.map((f) => (
                            <span key={f} className="text-[9px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="soft-card p-5 mt-4">
            <h3 className="text-sm font-medium text-[#2d5a52] mb-2">⚠️ What to Avoid</h3>
            <div className="grid md:grid-cols-2 gap-2 text-xs text-[#3a5550]">
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Excessive heat (hot tubs, saunas, laptop on lap)</div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Alcohol (more than 5 drinks/week reduces quality)</div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Smoking & cannabis (directly damages sperm DNA)</div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Processed soy in excess (phytoestrogens)</div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Tight underwear (raises scrotal temperature)</div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">🚫 Anabolic steroids (shuts down natural production)</div>
            </div>
          </div>

          <div className="soft-card p-5 mt-4 text-center">
            <p className="text-xs text-[#6aab9f] italic">
              ⚕️ Sperm takes ~74 days to develop. Start supplements at least 2-3 months before trying to conceive for best results. Always consult a doctor, especially if on medication.
            </p>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
        <Link href="/nutrition" className="btn-outline">Meal Plans</Link>
        <Link href="/shopping" className="btn-outline">Shopping List</Link>
      </div>
    </main>
  );
}
