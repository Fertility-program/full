"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

type ReportData = {
  name: string;
  age: string;
  cycleLength: number;
  periodLength: number;
  ttcMonths: string;
  symptoms: string[];
  avgSleep: number;
  avgEnergy: number;
  avgStress: number;
  cyclesTracked: number;
  sessionsCompleted: number;
  supplements: string[];
  medications: string[];
  bbtShiftDetected: boolean;
  partnerOnProgram: boolean;
  partnerProgramDay: number;
};

export default function DoctorReportPage() {
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    try {
      const quiz = JSON.parse(localStorage.getItem("quizData") || "{}");
      const cycleData = JSON.parse(localStorage.getItem("cycleData") || "{}");
      const checkinHistory = JSON.parse(localStorage.getItem("checkinHistory") || "[]");
      const day = Number(localStorage.getItem("day") || "1");
      const activeMeds = JSON.parse(localStorage.getItem("activeMedications") || "[]");
      const partnerStart = localStorage.getItem("partnerStartDate");

      // Calculate averages from last 30 days
      const recent = checkinHistory.slice(-30);
      const avgSleep = recent.length > 0 ? recent.reduce((s: number, e: { sleep: number }) => s + (e.sleep || 0), 0) / recent.length : 0;
      const avgEnergy = recent.length > 0 ? recent.reduce((s: number, e: { energy: number }) => s + (e.energy || 0), 0) / recent.length : 0;
      const avgStress = recent.length > 0 ? recent.reduce((s: number, e: { stress: number }) => s + (e.stress || 0), 0) / recent.length : 0;

      // BBT shift detection
      let bbtShift = false;
      if (cycleData.bbtEntries && cycleData.bbtEntries.length >= 6) {
        const sorted = [...cycleData.bbtEntries].sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date));
        for (let i = 3; i < sorted.length - 2; i++) {
          const before = sorted.slice(Math.max(0, i - 6), i);
          const after = sorted.slice(i, i + 3);
          if (before.length >= 3 && after.length >= 3) {
            const avgBefore = before.reduce((s: number, e: { temperature: number }) => s + e.temperature, 0) / before.length;
            const avgAfter = after.reduce((s: number, e: { temperature: number }) => s + e.temperature, 0) / after.length;
            if (avgAfter - avgBefore >= 0.2) { bbtShift = true; break; }
          }
        }
      }

      // Partner info
      const partnerDay = partnerStart
        ? Math.min(Math.floor((Date.now() - new Date(partnerStart).getTime()) / (1000 * 60 * 60 * 24)) + 1, 74)
        : 0;

      setData({
        name: quiz.name || "Patient",
        age: quiz.age || "Unknown",
        cycleLength: cycleData.cycleLength || 28,
        periodLength: cycleData.periodLength || 5,
        ttcMonths: quiz.ttcDuration || "unknown",
        symptoms: quiz.symptoms || [],
        avgSleep: Math.round(avgSleep * 10) / 10,
        avgEnergy: Math.round(avgEnergy * 10) / 10,
        avgStress: Math.round(avgStress * 10) / 10,
        cyclesTracked: cycleData.history?.length || 0,
        sessionsCompleted: day,
        supplements: [], // Could load from supps tracking
        medications: activeMeds,
        bbtShiftDetected: bbtShift,
        partnerOnProgram: !!partnerStart,
        partnerProgramDay: partnerDay,
      });
    } catch {}
  }, []);

  if (!data) return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-[#5ba89d]">Loading report...</div>
    </main>
  );

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 print:px-0 print:py-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          .soft-card { border: 1px solid #ddd !important; box-shadow: none !important; }
          main { padding: 1cm !important; max-width: 100% !important; }
        }
      `}} />

      {/* HEADER */}
      <section className="soft-card p-6 mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2d5a52]">Fertility Wellness Report</h1>
          <p className="text-xs text-[#5a7570]">Generated: {new Date().toLocaleDateString()} • For: {data.name}</p>
        </div>
        <div className="no-print">
          <PrintButton targetId="" label="Print / PDF" />
        </div>
      </section>

      {/* PATIENT INFO */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Patient Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-[9px] text-[#5a7570] uppercase">Age</p>
            <p className="text-sm font-bold text-[#2d5a52]">{data.age}</p>
          </div>
          <div className="p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-[9px] text-[#5a7570] uppercase">Cycle Length</p>
            <p className="text-sm font-bold text-[#2d5a52]">{data.cycleLength} days</p>
          </div>
          <div className="p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-[9px] text-[#5a7570] uppercase">Period Length</p>
            <p className="text-sm font-bold text-[#2d5a52]">{data.periodLength} days</p>
          </div>
          <div className="p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-[9px] text-[#5a7570] uppercase">TTC Duration</p>
            <p className="text-sm font-bold text-[#2d5a52]">{data.ttcMonths}</p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Reported Symptoms</h2>
        <div className="flex flex-wrap gap-2">
          {data.symptoms.length > 0 ? data.symptoms.map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full bg-[#fdf2f5] border border-[#f0e3e8] text-[#4a3f44]">{s}</span>
          )) : (
            <p className="text-xs text-[#5a7570]">No symptoms reported</p>
          )}
        </div>
      </section>

      {/* WELLNESS METRICS (30-day average) */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">30-Day Wellness Averages</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-2xl font-bold text-[#2d5a52]">{data.avgSleep}/10</p>
            <p className="text-[9px] text-[#5a7570]">Sleep Quality</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-2xl font-bold text-[#2d5a52]">{data.avgEnergy}/10</p>
            <p className="text-[9px] text-[#5a7570]">Energy Level</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-2xl font-bold text-[#2d5a52]">{data.avgStress}/10</p>
            <p className="text-[9px] text-[#5a7570]">Stress Level</p>
          </div>
        </div>
      </section>

      {/* CYCLE TRACKING */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Cycle Tracking Summary</h2>
        <div className="space-y-2 text-sm text-[#3a5550]">
          <p>• Cycles tracked: <strong>{data.cyclesTracked}</strong></p>
          <p>• BBT temperature shift detected: <strong>{data.bbtShiftDetected ? "Yes ✓ (ovulation confirmed)" : "Not yet / insufficient data"}</strong></p>
          <p>• Program days completed: <strong>{data.sessionsCompleted}</strong></p>
        </div>
      </section>

      {/* MEDICATIONS */}
      {data.medications.length > 0 && (
        <section className="soft-card p-5 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-3">Current Medications</h2>
          <div className="flex flex-wrap gap-2">
            {data.medications.map((med) => (
              <span key={med} className="text-xs px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700">{med}</span>
            ))}
          </div>
        </section>
      )}

      {/* PARTNER STATUS */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Partner Status</h2>
        {data.partnerOnProgram ? (
          <div className="text-sm text-[#3a5550]">
            <p>• Partner on 74-day sperm optimization program: <strong>Yes ✓</strong></p>
            <p>• Program day: <strong>{data.partnerProgramDay}/74</strong></p>
            <p>• Recommendation: Retest semen analysis after day 74</p>
          </div>
        ) : (
          <p className="text-sm text-[#5a7570]">Partner not currently on optimization program.</p>
        )}
      </section>

      {/* NOTES FOR DOCTOR */}
      <section className="soft-card p-5 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Notes for Your Doctor</h2>
        <div className="space-y-2 text-xs text-[#3a5550]">
          <p>This report summarizes data tracked by the patient using the Veronica Bloom fertility wellness app. It includes self-reported symptoms, daily wellness metrics, cycle tracking data, and lifestyle optimization progress.</p>
          <p><strong>This is not a medical document.</strong> It is intended to supplement the clinical consultation by providing the doctor with a snapshot of the patient&apos;s daily wellness patterns and lifestyle factors.</p>
        </div>
      </section>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-3 justify-center no-print">
        <Link href="/doctor-prep" className="btn-primary px-6 py-2 text-sm">Doctor Questions →</Link>
        <Link href="/dashboard" className="btn-outline px-6 py-2 text-sm">Dashboard</Link>
        <Link href="/progress" className="btn-outline px-6 py-2 text-sm">Full Progress</Link>
      </div>
    </section>
  );
}
