"use client";

import { useState } from "react";

/**
 * Estimates monthly conception probability based on known factors.
 * This is educational — not a medical prediction.
 */
export default function ConceptionCalculator() {
  const [age, setAge] = useState("30");
  const [ttcMonths, setTtcMonths] = useState("3");
  const [cycleRegular, setCycleRegular] = useState(true);
  const [timing, setTiming] = useState(true); // using OPK/tracking
  const [maleOptimized, setMaleOptimized] = useState(false);
  const [showResult, setShowResult] = useState(false);

  function calculate() {
    setShowResult(true);
  }

  // Rough probability estimation based on published data
  function getEstimate() {
    const ageNum = Number(age) || 30;
    let baseRate: number;

    // Age-based monthly fecundity rate (published data)
    if (ageNum < 30) baseRate = 25;
    else if (ageNum < 35) baseRate = 20;
    else if (ageNum < 38) baseRate = 15;
    else if (ageNum < 40) baseRate = 10;
    else if (ageNum < 42) baseRate = 5;
    else baseRate = 2;

    // Modifiers
    if (!cycleRegular) baseRate *= 0.6; // irregular cycles reduce chances
    if (timing) baseRate *= 1.3; // proper timing increases chances
    if (maleOptimized) baseRate *= 1.2; // optimized male factor helps

    // Cap at reasonable range
    baseRate = Math.min(Math.max(baseRate, 1), 35);

    // Cumulative probability over 6 months
    const sixMonthCumulative = (1 - Math.pow(1 - baseRate / 100, 6)) * 100;
    const twelveMonthCumulative = (1 - Math.pow(1 - baseRate / 100, 12)) * 100;

    return {
      monthly: Math.round(baseRate),
      sixMonth: Math.round(sixMonthCumulative),
      twelveMonth: Math.round(twelveMonthCumulative),
    };
  }

  const estimate = showResult ? getEstimate() : null;

  return (
    <section className="soft-card p-5 mb-4">
      <h3 className="text-sm font-bold text-[#4a3f44] mb-3">🎯 Conception Probability Estimator</h3>
      <p className="text-[9px] text-[#7b6870] mb-4">Educational estimate based on published fertility data. Not a medical prediction.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-[#5a7570] block mb-1">Your Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => { setAge(e.target.value); setShowResult(false); }}
            className="w-full p-2 rounded-lg border border-[#f0e3e8] text-sm focus:outline-none focus:border-[#d8a7b5]"
          />
        </div>
        <div>
          <label className="text-[10px] text-[#5a7570] block mb-1">Months TTC</label>
          <input
            type="number"
            value={ttcMonths}
            onChange={(e) => { setTtcMonths(e.target.value); setShowResult(false); }}
            className="w-full p-2 rounded-lg border border-[#f0e3e8] text-sm focus:outline-none focus:border-[#d8a7b5]"
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={() => { setCycleRegular(!cycleRegular); setShowResult(false); }}
          className={`w-full flex items-center gap-2 p-2 rounded-lg border text-left text-xs ${
            cycleRegular ? "bg-green-50 border-green-200" : "bg-white border-[#f0e3e8]"
          }`}
        >
          <span>{cycleRegular ? "✅" : "○"}</span>
          <span>Regular cycles (21-35 days)</span>
        </button>
        <button
          onClick={() => { setTiming(!timing); setShowResult(false); }}
          className={`w-full flex items-center gap-2 p-2 rounded-lg border text-left text-xs ${
            timing ? "bg-green-50 border-green-200" : "bg-white border-[#f0e3e8]"
          }`}
        >
          <span>{timing ? "✅" : "○"}</span>
          <span>Using OPK / tracking ovulation</span>
        </button>
        <button
          onClick={() => { setMaleOptimized(!maleOptimized); setShowResult(false); }}
          className={`w-full flex items-center gap-2 p-2 rounded-lg border text-left text-xs ${
            maleOptimized ? "bg-green-50 border-green-200" : "bg-white border-[#f0e3e8]"
          }`}
        >
          <span>{maleOptimized ? "✅" : "○"}</span>
          <span>Partner on supplement/lifestyle program</span>
        </button>
      </div>

      {!showResult ? (
        <button onClick={calculate} className="btn-primary w-full py-2.5 text-sm">
          Calculate Estimate
        </button>
      ) : estimate && (
        <div className="p-4 rounded-xl bg-[#fdf2f5] border border-[#f0e3e8]">
          <div className="grid grid-cols-3 gap-3 text-center mb-3">
            <div>
              <p className="text-2xl font-bold text-[#a8687a]">{estimate.monthly}%</p>
              <p className="text-[9px] text-[#7b6870]">Per cycle</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#a8687a]">{estimate.sixMonth}%</p>
              <p className="text-[9px] text-[#7b6870]">Within 6 months</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#a8687a]">{estimate.twelveMonth}%</p>
              <p className="text-[9px] text-[#7b6870]">Within 12 months</p>
            </div>
          </div>
          <p className="text-[9px] text-[#7b6870] text-center italic">
            Based on age-specific fecundity rates from published research. Actual results depend on many individual factors.
          </p>
        </div>
      )}
    </section>
  );
}
