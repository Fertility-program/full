"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type QuizData = {
  name: string;
  age: string;
  height: string;
  weight: string;
  activity: string;
  goal: string;
  time: string;
  symptoms: string[];
  severity: Record<string, number>;
  cycleRegularity: string;
  ttcDuration: string;
};

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-pulse text-[#6aab9f]">Loading...</div></div>}>
      <QuizContent />
    </Suspense>
  );
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const aff = searchParams.get("aff");
    const ref = searchParams.get("ref");
    if (aff) localStorage.setItem("affiliateRef", aff);
    if (ref) localStorage.setItem("referredBy", ref);
  }, [searchParams]);

  const [step, setStep] = useState(1);

  const [form, setForm] = useState<QuizData>({
    name: "",
    age: "31",
    height: "168",
    weight: "65",
    activity: "light",
    goal: "conception",
    time: "20 min",
    symptoms: [],
    severity: {},
    cycleRegularity: "somewhat",
    ttcDuration: "less_6",
  });

  const totalSteps = 7;

  const activityOptions = [
    { id: "sedentary", label: "Sedentary", desc: "Office job, little exercise" },
    { id: "light", label: "Lightly Active", desc: "1-3 days of light movement" },
    { id: "moderate", label: "Moderately Active", desc: "3-5 days of exercise" },
    { id: "active", label: "Very Active", desc: "6-7 days of intense sport" },
  ];

  const goals = [
    { id: "conception", label: "Prepare for conception" },
    { id: "donor_egg", label: "Donor egg / IVF preparation" },
    { id: "cycle_regulation", label: "Regulate my cycle" },
    { id: "hormone_balance", label: "Balance hormones (PCOS/endo)" },
    { id: "menopause_wellness", label: "Menopause / no menstruation support" },
    { id: "overall_wellness", label: "Overall reproductive wellness" },
  ];

  const symptomOptions = [
    "Irregular cycles", "PCOS symptoms", "Stress & anxiety", "Low energy",
    "Poor sleep", "Inflammation", "Weight concerns", "Hormonal acne",
    "Endometriosis", "Thyroid issues", "Hot flashes", "Joint pain",
    "Mood swings", "Vaginal dryness", "Bone density concerns"
  ];

  function next() {
    if (step === 1 && (!form.age || !form.height || !form.weight)) return;
    if (step < totalSteps) { setStep(step + 1); return; }
    localStorage.setItem("quizData", JSON.stringify(form));
    localStorage.setItem("day", "1");
    router.push("/onboarding");
  }

  function back() { if (step > 1) setStep(step - 1); }

  function toggleSymptom(item: string) {
    if (form.symptoms.includes(item)) {
      const nextSymptoms = form.symptoms.filter((x) => x !== item);
      const sev = { ...form.severity };
      delete sev[item];
      setForm({ ...form, symptoms: nextSymptoms, severity: sev });
    } else {
      setForm({ ...form, symptoms: [...form.symptoms, item], severity: { ...form.severity, [item]: 3 } });
    }
  }

  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <section className="soft-card p-8 mb-8 border border-[#c2ddd8]">
        <p className="uppercase tracking-[0.25em] text-xs text-[#6aab9f] mb-4 font-bold">
          Step {step} of {totalSteps}
        </p>
        <div className="h-2 bg-white rounded-full overflow-hidden border border-[#c2ddd8]">
          <div className="h-full bg-[#5ba89d] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </section>

      {/* STEP 1: NAME + BIOMETRICS */}
      {step === 1 && (
        <section className="soft-card p-8 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-3xl text-[#2d5a52] mb-8">Tell us about yourself</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm text-[#6aab9f] mb-2 font-bold uppercase tracking-widest">Your First Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" placeholder="e.g. Ana" autoFocus />
            </div>
            <div>
              <label className="block text-sm text-[#6aab9f] mb-2 font-bold uppercase tracking-widest">Age</label>
              <input type="number" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})}
                className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" placeholder="e.g. 31" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6aab9f] mb-2 font-bold uppercase tracking-widest">Height (cm)</label>
                <input type="number" value={form.height} onChange={(e) => setForm({...form, height: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" placeholder="168" />
              </div>
              <div>
                <label className="block text-sm text-[#6aab9f] mb-2 font-bold uppercase tracking-widest">Weight (kg)</label>
                <input type="number" value={form.weight} onChange={(e) => setForm({...form, weight: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-[#c2ddd8] outline-none focus:border-[#5ba89d]" placeholder="65" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STEP 2: ACTIVITY LEVEL */}
      {step === 2 && (
        <section className="soft-card p-8 animate-in fade-in">
          <h2 className="text-3xl text-[#2d5a52] mb-8">How active are you?</h2>
          <div className="grid gap-4">
            {activityOptions.map((opt) => (
              <button key={opt.id} onClick={() => setForm({ ...form, activity: opt.id })}
                className={`p-6 rounded-3xl border text-left transition-all ${form.activity === opt.id ? "bg-[#f0faf8] border-[#5ba89d] shadow-sm" : "bg-white border-[#c2ddd8]"}`}>
                <div className="font-semibold text-[#2d5a52]">{opt.label}</div>
                <div className="text-sm text-[#5a7570]">{opt.desc}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 3: GOALS */}
      {step === 3 && (
        <section className="soft-card p-8 animate-in fade-in">
          <h2 className="text-3xl text-[#2d5a52] mb-8">Your primary goal?</h2>
          <div className="grid gap-4">
            {goals.map((g) => (
              <button key={g.id} onClick={() => setForm({ ...form, goal: g.id })}
                className={`p-6 rounded-3xl border text-left transition-all ${form.goal === g.id ? "bg-[#f0faf8] border-[#5ba89d]" : "bg-white border-[#c2ddd8]"}`}>
                {g.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 4: SYMPTOMS */}
      {step === 4 && (
        <section className="soft-card p-8 animate-in fade-in">
          <h2 className="text-3xl text-[#2d5a52] mb-8">What concerns do you have?</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {symptomOptions.map((s) => (
              <button key={s} onClick={() => toggleSymptom(s)}
                className={`p-5 rounded-2xl border text-left transition-all ${form.symptoms.includes(s) ? "bg-[#f0faf8] border-[#5ba89d]" : "bg-white border-[#c2ddd8]"}`}>
                {form.symptoms.includes(s) ? "🌸 " : ""}{s}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 5: INTENSITY */}
      {step === 5 && (
        <section className="soft-card p-8 animate-in fade-in">
          <h2 className="text-3xl text-[#2d5a52] mb-8">How severe are these concerns?</h2>
          <div className="space-y-8">
            {form.symptoms.map((s) => (
              <div key={s}>
                <div className="flex justify-between text-sm mb-2 font-bold text-[#2d5a52] uppercase tracking-widest">
                  <span>{s}</span><span>{form.severity[s]}/5</span>
                </div>
                <input type="range" min="1" max="5" value={form.severity[s] || 3}
                  onChange={(e) => setForm({ ...form, severity: { ...form.severity, [s]: Number(e.target.value) } })}
                  className="w-full accent-[#5ba89d]" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STEP 6: CYCLE & LIFESTYLE */}
      {step === 6 && (
        <section className="soft-card p-8 animate-in fade-in">
          <h2 className="text-3xl text-[#2d5a52] mb-8">Cycle & Lifestyle</h2>
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-[#3a5550]">How regular is your cycle?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "regular", label: "Regular (25-35 days)" },
                  { id: "somewhat", label: "Somewhat irregular" },
                  { id: "irregular", label: "Very irregular / absent" },
                  { id: "no_period", label: "No menstruation (menopause / medical)" },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setForm({...form, cycleRegularity: opt.id})}
                    className={`py-3 px-2 rounded-xl border text-xs ${form.cycleRegularity === opt.id ? "bg-[#5ba89d] text-white border-[#5ba89d]" : "bg-white text-[#3a5550] border-[#c2ddd8]"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[#3a5550]">
                {form.goal === "menopause_wellness"
                  ? "How long have you been in menopause / without a period?"
                  : form.goal === "donor_egg"
                  ? "Where are you in your IVF / donor egg journey?"
                  : "How long have you been trying to conceive?"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(form.goal === "menopause_wellness" ? [
                  { id: "early", label: "Perimenopause (still some periods)" },
                  { id: "less_2y", label: "Less than 2 years" },
                  { id: "2_5y", label: "2-5 years" },
                  { id: "over_5y", label: "Over 5 years" },
                ] : form.goal === "donor_egg" ? [
                  { id: "researching", label: "Researching options" },
                  { id: "preparing", label: "Preparing for transfer" },
                  { id: "in_cycle", label: "Currently in IVF cycle" },
                  { id: "post_transfer", label: "Post-transfer (TWW)" },
                ] : [
                  { id: "not_yet", label: "Not yet / planning" },
                  { id: "less_6", label: "Less than 6 months" },
                  { id: "6_12", label: "6-12 months" },
                  { id: "over_12", label: "Over 12 months" },
                ]).map(opt => (
                  <button key={opt.id} onClick={() => setForm({...form, ttcDuration: opt.id})}
                    className={`py-3 px-2 rounded-xl border text-xs ${form.ttcDuration === opt.id ? "bg-[#5ba89d] text-white border-[#5ba89d]" : "bg-white text-[#3a5550] border-[#c2ddd8]"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[#3a5550]">Training time available per day?</p>
              <div className="flex gap-4">
                {["10 min", "20 min", "30 min"].map(t => (
                  <button key={t} onClick={() => setForm({...form, time: t})}
                    className={`flex-1 py-3 rounded-xl border ${form.time === t ? "bg-[#5ba89d] text-white border-[#5ba89d]" : "bg-white text-[#3a5550] border-[#c2ddd8]"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STEP 7: FINAL */}
      {step === 7 && (
        <section className="soft-card p-10 text-center animate-in zoom-in-95">
          <div className="text-6xl mb-6">🌸</div>
          <h2 className="text-3xl text-[#2d5a52] mb-4">Almost there!</h2>
          <p className="text-[#5a7570] max-w-sm mx-auto mb-8">
            {form.goal === "menopause_wellness"
              ? "We've designed a personalized wellness plan focused on bone health, joint mobility, mood balance, and vitality — tailored for your stage of life."
              : form.goal === "donor_egg"
              ? "We've created a plan to prepare your body for embryo transfer — focusing on uterine blood flow, stress reduction, and optimal implantation support."
              : "We've calculated your personalized fertility plan based on your cycle, goals and lifestyle. Ready to see your dashboard?"}
          </p>
        </section>
      )}

      {/* NAV */}
      <section className="flex justify-between mt-8">
        <button onClick={back} className="btn-outline px-8 py-3 rounded-2xl">Back</button>
        <button onClick={next} className="btn-primary px-10 py-3 rounded-2xl shadow-md">
          {step === totalSteps ? "Generate My Plan" : "Continue"}
        </button>
      </section>
    </main>
  );
}
