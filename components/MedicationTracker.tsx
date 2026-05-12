"use client";

import { useEffect, useState } from "react";
import { playComplete } from "@/lib/sounds";

type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  notes?: string;
  icon: string;
};

const COMMON_FERTILITY_MEDS: Medication[] = [
  { id: "letrozole", name: "Letrozole (Femara)", dose: "2.5-7.5mg", time: "Days 3-7", icon: "💊", notes: "Ovulation induction. Take at same time daily." },
  { id: "clomid", name: "Clomiphene (Clomid)", dose: "50-150mg", time: "Days 3-7 or 5-9", icon: "💊", notes: "Ovulation induction. Monitor with ultrasound." },
  { id: "progesterone", name: "Progesterone", dose: "200-400mg", time: "After ovulation", icon: "🟡", notes: "Luteal support. Vaginal or oral. Don't stop without doctor." },
  { id: "gonal_f", name: "Gonal-F (FSH)", dose: "75-300 IU", time: "Daily injection", icon: "💉", notes: "Stimulates follicle growth. Store in fridge." },
  { id: "menopur", name: "Menopur (FSH+LH)", dose: "75-150 IU", time: "Daily injection", icon: "💉", notes: "Combined FSH/LH. Mix before injecting." },
  { id: "ovidrel", name: "Ovidrel (hCG trigger)", dose: "250mcg", time: "Single injection", icon: "💉", notes: "Triggers ovulation 36h after injection." },
  { id: "metformin", name: "Metformin", dose: "500-2000mg", time: "With meals", icon: "💊", notes: "Insulin sensitizer for PCOS. Build up dose slowly." },
  { id: "prenatal", name: "Prenatal Vitamin", dose: "1 daily", time: "Morning", icon: "🌿", notes: "Contains folate, iron, DHA. Take 3 months before TTC." },
  { id: "baby_aspirin", name: "Baby Aspirin", dose: "75-81mg", time: "Daily", icon: "💊", notes: "Blood flow to uterus. Only if prescribed." },
  { id: "estradiol", name: "Estradiol (Estrace)", dose: "2-6mg", time: "As directed", icon: "🔵", notes: "Builds endometrial lining. Oral or vaginal." },
];

export default function MedicationTracker() {
  const [activeMeds, setActiveMeds] = useState<string[]>([]);
  const [takenToday, setTakenToday] = useState<Record<string, boolean>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [customMed, setCustomMed] = useState({ name: "", dose: "", time: "" });

  useEffect(() => {
    const saved = localStorage.getItem("activeMedications");
    if (saved) try { setActiveMeds(JSON.parse(saved)); } catch {}

    const today = new Date().toISOString().split("T")[0];
    const taken = localStorage.getItem(`meds_taken_${today}`);
    if (taken) try { setTakenToday(JSON.parse(taken)); } catch {}
  }, []);

  function toggleMed(id: string) {
    const next = activeMeds.includes(id)
      ? activeMeds.filter((m) => m !== id)
      : [...activeMeds, id];
    setActiveMeds(next);
    localStorage.setItem("activeMedications", JSON.stringify(next));
  }

  function markTaken(id: string) {
    const today = new Date().toISOString().split("T")[0];
    const next = { ...takenToday, [id]: !takenToday[id] };
    if (!takenToday[id]) playComplete();
    setTakenToday(next);
    localStorage.setItem(`meds_taken_${today}`, JSON.stringify(next));
  }

  function addCustom() {
    if (!customMed.name) return;
    const id = `custom_${Date.now()}`;
    const custom = JSON.parse(localStorage.getItem("customMedications") || "[]");
    custom.push({ id, ...customMed, icon: "💊" });
    localStorage.setItem("customMedications", JSON.stringify(custom));
    setActiveMeds([...activeMeds, id]);
    localStorage.setItem("activeMedications", JSON.stringify([...activeMeds, id]));
    setCustomMed({ name: "", dose: "", time: "" });
    setShowAdd(false);
  }

  const myMeds = COMMON_FERTILITY_MEDS.filter((m) => activeMeds.includes(m.id));
  const customMeds: Medication[] = (() => {
    try {
      return JSON.parse(localStorage.getItem("customMedications") || "[]")
        .filter((m: Medication) => activeMeds.includes(m.id));
    } catch { return []; }
  })();
  const allMyMeds = [...myMeds, ...customMeds];
  const takenCount = Object.values(takenToday).filter(Boolean).length;

  return (
    <section className="soft-card p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg text-[#2d5a52]">💊 Medication Tracker</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-xs text-[#5ba89d] font-medium"
        >
          {showAdd ? "Close" : "+ Add"}
        </button>
      </div>

      {/* Today's medications */}
      {allMyMeds.length > 0 ? (
        <>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-[#5a7570]">
              <strong className="text-[#2d5a52]">{takenCount}</strong>/{allMyMeds.length} taken today
            </span>
            <div className="flex-1 h-2 bg-[#f0faf8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5ba89d] to-[#3d8a7d] rounded-full transition-all"
                style={{ width: `${allMyMeds.length > 0 ? (takenCount / allMyMeds.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {allMyMeds.map((med) => (
              <button
                key={med.id}
                onClick={() => markTaken(med.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  takenToday[med.id]
                    ? "bg-green-50 border-green-200 opacity-70"
                    : "bg-white/60 border-[#c2ddd8] hover:border-[#5ba89d]"
                }`}
              >
                <span className="text-lg">{takenToday[med.id] ? "✅" : med.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2d5a52]">{med.name}</p>
                  <p className="text-[9px] text-[#5a7570]">{med.dose} • {med.time}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-xs text-[#5a7570] text-center py-4">
          No medications added yet. Tap &quot;+ Add&quot; to set up your medication reminders.
        </p>
      )}

      {/* Add medication panel */}
      {showAdd && (
        <div className="mt-4 p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <h3 className="text-sm font-bold text-[#2d5a52] mb-3">Common Fertility Medications</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {COMMON_FERTILITY_MEDS.map((med) => (
              <button
                key={med.id}
                onClick={() => toggleMed(med.id)}
                className={`p-2 rounded-lg border text-left text-[10px] transition-all ${
                  activeMeds.includes(med.id)
                    ? "bg-[#5ba89d]/10 border-[#5ba89d] text-[#2d5a52]"
                    : "bg-white border-[#c2ddd8] text-[#5a7570] hover:border-[#5ba89d]"
                }`}
              >
                <span className="block">{med.icon} {med.name}</span>
                <span className="text-[8px] opacity-70">{med.dose}</span>
              </button>
            ))}
          </div>

          {/* Custom medication */}
          <h3 className="text-sm font-bold text-[#2d5a52] mb-2">Or add custom:</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customMed.name}
              onChange={(e) => setCustomMed({ ...customMed, name: e.target.value })}
              placeholder="Name"
              className="flex-1 p-2 rounded-lg border border-[#c2ddd8] text-xs"
            />
            <input
              type="text"
              value={customMed.dose}
              onChange={(e) => setCustomMed({ ...customMed, dose: e.target.value })}
              placeholder="Dose"
              className="w-20 p-2 rounded-lg border border-[#c2ddd8] text-xs"
            />
            <button onClick={addCustom} className="px-3 py-2 rounded-lg bg-[#2d5a52] text-white text-xs">
              Add
            </button>
          </div>
        </div>
      )}

      <p className="text-[9px] text-[#5a7570] mt-3 italic">
        ⚠️ This is a reminder tool only. Always follow your doctor&apos;s instructions for medication timing and dosage.
      </p>
    </section>
  );
}
