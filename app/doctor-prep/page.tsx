"use client";

import { useEffect, useMemo, useState } from "react";
import PrintButton from "@/components/PrintButton";

type QuizData = {
  symptoms?: string[];
  age?: string;
  goal?: string;
};

export default function DoctorPrepPage() {
  const [data, setData] = useState<QuizData>({});
  const [ttcMonths, setTtcMonths] = useState("6");
  const [concerns, setConcerns] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    if (raw) try { setData(JSON.parse(raw)); } catch {}
  }, []);

  const additionalConcerns = [
    "Irregular periods", "Painful periods", "No period for 3+ months",
    "Previous miscarriage", "PCOS diagnosis", "Endometriosis",
    "Thyroid issues", "Partner sperm concerns", "Age over 35",
    "Previous surgery", "Hormonal birth control recently stopped",
    "Unexplained infertility",
  ];

  function toggleConcern(c: string) {
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  const questions = useMemo(() => {
    const qs: { category: string; questions: string[] }[] = [];

    // Basic fertility questions
    qs.push({
      category: "General Fertility",
      questions: [
        "Based on my age and history, what tests do you recommend?",
        "Should I get a hormone panel (FSH, LH, AMH, estradiol, progesterone)?",
        "When in my cycle should I come for blood tests?",
        "Do you recommend an ultrasound to check follicle development?",
        "How long should we try before considering further investigation?",
      ],
    });

    // TTC duration specific
    if (parseInt(ttcMonths) >= 12) {
      qs.push({
        category: "Extended TTC (12+ months)",
        questions: [
          "Should we be referred to a fertility specialist?",
          "What are the next diagnostic steps (HSG, laparoscopy)?",
          "Should my partner get a semen analysis?",
          "Are there any structural issues we should rule out?",
          "What are our options: IUI, IVF, or other treatments?",
        ],
      });
    } else if (parseInt(ttcMonths) >= 6) {
      qs.push({
        category: "TTC 6+ Months",
        questions: [
          "Is it too early to investigate, or should we start testing?",
          "Can you confirm I'm ovulating with a Day 21 progesterone test?",
          "Should my partner get a basic semen analysis?",
          "Are there lifestyle changes that could improve our chances?",
        ],
      });
    }

    // Symptom-specific
    const symptoms = [...(data.symptoms || []), ...concerns];

    if (symptoms.includes("Irregular cycles") || symptoms.includes("Irregular periods")) {
      qs.push({
        category: "Irregular Cycles",
        questions: [
          "What's causing my irregular cycles?",
          "Should I get tested for PCOS or thyroid issues?",
          "Would tracking BBT or using OPKs help identify ovulation?",
          "Are there medications to regulate my cycle (letrozole, clomid)?",
        ],
      });
    }

    if (symptoms.includes("PCOS symptoms") || symptoms.includes("PCOS diagnosis")) {
      qs.push({
        category: "PCOS",
        questions: [
          "What's my AMH level? (often elevated in PCOS)",
          "Should I take metformin or inositol for insulin resistance?",
          "Would letrozole or clomid help me ovulate?",
          "What dietary changes do you recommend for PCOS fertility?",
          "Should I get an ultrasound to check for polycystic ovaries?",
        ],
      });
    }

    if (symptoms.includes("Endometriosis")) {
      qs.push({
        category: "Endometriosis",
        questions: [
          "How is my endometriosis affecting my fertility?",
          "Should I have a laparoscopy to assess/remove adhesions?",
          "Are my fallopian tubes open? (HSG test)",
          "Would IVF be more appropriate than natural conception?",
          "What pain management is safe while TTC?",
        ],
      });
    }

    if (symptoms.includes("Previous miscarriage")) {
      qs.push({
        category: "Recurrent Loss",
        questions: [
          "Should I be tested for clotting disorders (thrombophilia)?",
          "Would progesterone supplementation help in early pregnancy?",
          "Should we do genetic testing (karyotyping)?",
          "When is it safe to try again?",
          "Are there any immune factors to investigate?",
        ],
      });
    }

    if (symptoms.includes("Thyroid issues")) {
      qs.push({
        category: "Thyroid & Fertility",
        questions: [
          "Is my TSH optimal for conception? (should be 1-2.5 mIU/L)",
          "Should I adjust my thyroid medication while TTC?",
          "Are my thyroid antibodies elevated?",
          "How often should I recheck levels during TTC/pregnancy?",
        ],
      });
    }

    if (symptoms.includes("Age over 35")) {
      qs.push({
        category: "Age-Related Fertility",
        questions: [
          "What's my ovarian reserve? (AMH + antral follicle count)",
          "Should we be more aggressive with timing/treatment?",
          "Would egg freezing be worth considering?",
          "What are realistic expectations for my age group?",
          "Should we consider genetic testing (PGT) if doing IVF?",
        ],
      });
    }

    // Supplements
    qs.push({
      category: "Supplements & Lifestyle",
      questions: [
        "Are my current supplements appropriate? (show your list)",
        "Is my BMI in the optimal range for conception?",
        "How much caffeine is safe? (current guideline: <200mg/day)",
        "Are there any medications I should stop while TTC?",
        "Do you recommend any specific prenatal vitamin brand?",
      ],
    });

    return qs;
  }, [data.symptoms, concerns, ttcMonths]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-6">
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl text-[#2d5a52]">Doctor Visit Prep</h1>
            <p className="text-sm text-[#5a7570]">Personalized questions based on your fertility journey.</p>
          </div>
          <PrintButton targetId="doctor-questions" label="Print / PDF" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#6aab9f] mb-1 font-bold uppercase tracking-widest">Months TTC</label>
            <select value={ttcMonths} onChange={(e) => setTtcMonths(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d] text-sm">
              <option value="0">Not yet / planning</option>
              <option value="3">1-3 months</option>
              <option value="6">4-6 months</option>
              <option value="9">7-9 months</option>
              <option value="12">12+ months</option>
              <option value="24">24+ months</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-[#6aab9f] mb-2 font-bold uppercase tracking-widest">Additional Concerns</p>
          <div className="flex flex-wrap gap-2">
            {additionalConcerns.map((c) => (
              <button key={c} onClick={() => toggleConcern(c)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  concerns.includes(c) ? "bg-[#5ba89d] text-white" : "bg-white border border-[#c2ddd8] text-[#5a7570]"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div id="doctor-questions">
        {questions.map((section) => (
          <section key={section.category} className="soft-card p-5 mb-3">
            <h2 className="text-lg text-[#2d5a52] mb-3">{section.category}</h2>
            <div className="space-y-2">
              {section.questions.map((q) => (
                <div key={q} className="flex items-start gap-2 p-2 rounded-lg hover:bg-[#f0faf8] transition-colors">
                  <span className="text-[#5ba89d] shrink-0 mt-0.5">□</span>
                  <p className="text-sm text-[#3a5550]">{q}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="soft-card p-4 text-center">
        <p className="text-[10px] text-[#6aab9f] italic">
          💡 Tip: Print this page and bring it to your appointment. Check off questions as you ask them. Write answers in the margins.
        </p>
      </section>
    </main>
  );
}
