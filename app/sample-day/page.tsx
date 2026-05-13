"use client";

import Link from "next/link";

export default function SampleDayPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 text-center mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5ba89d] font-bold mb-3">Preview</p>
        <h1 className="text-4xl text-[#2d5a52] mb-2">A Day in the Program</h1>
        <p className="text-sm text-[#5a7570] max-w-lg mx-auto">
          Here&apos;s exactly what Day 5 looks like — exercises, meals, supplements, and tips. This is what you get every single day, personalized to your cycle.
        </p>
      </section>

      {/* MORNING ROUTINE */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌅</span>
          <h2 className="text-xl text-[#2d5a52]">Morning (7-9 AM)</h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-[9px] uppercase font-bold text-[#5ba89d] mb-1">Supplements</p>
            <div className="flex flex-wrap gap-2 text-xs text-[#3a5550]">
              <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🌿 Folate 800mcg</span>
              <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🥚 CoQ10 400mg</span>
              <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">☀️ Vitamin D3 3000IU</span>
              <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">⚡ B-Complex</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <p className="text-[9px] uppercase font-bold text-amber-700 mb-1">Breakfast</p>
            <h3 className="text-sm font-bold text-[#2d5a52]">Spinach & Feta Egg Scramble</h3>
            <p className="text-xs text-[#5a7570] mt-1">3 eggs + handful spinach + 30g feta + 1 slice sourdough + pumpkin seeds</p>
            <div className="flex gap-3 mt-2 text-[9px] text-[#5a7570]">
              <span>🔥 420 kcal</span>
              <span>🥩 28g protein</span>
              <span>🥑 24g fat</span>
              <span>⏱ 8 min</span>
            </div>
            <p className="text-[9px] text-[#5ba89d] mt-2">💡 Folate + Iron + Choline + Protein — perfect fertility breakfast</p>
          </div>
        </div>
      </section>

      {/* EXERCISE SESSION */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧘‍♀️</span>
          <div>
            <h2 className="text-xl text-[#2d5a52]">Today&apos;s Session</h2>
            <p className="text-xs text-[#5a7570]">Day 5 • Foundation Phase • Follicular Phase</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[9px] px-2 py-1 rounded-full bg-green-50 border border-green-100 text-green-700">🌱 Follicular Phase</span>
          <span className="text-[9px] px-2 py-1 rounded-full bg-[#f0faf8] border border-[#c2ddd8] text-[#5ba89d]">⏱ 20 min</span>
          <span className="text-[9px] px-2 py-1 rounded-full bg-[#f0faf8] border border-[#c2ddd8] text-[#5ba89d]">7 exercises</span>
        </div>

        <div className="space-y-2">
          {[
            { name: "Gentle March in Place", time: "2 min", category: "Warm-Up" },
            { name: "Cat-Cow Flow", time: "2 min", category: "Mobility" },
            { name: "Bodyweight Squats", time: "3 min", category: "Lower Body" },
            { name: "Bridge Lift with Hold", time: "3 min", category: "Pelvic Floor" },
            { name: "Wall Push-Ups", time: "2 min", category: "Upper Body" },
            { name: "Single-Leg Balance", time: "2 min", category: "Balance" },
            { name: "Diaphragmatic Breathing", time: "3 min", category: "Cool-Down" },
          ].map((ex, i) => (
            <div key={ex.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <span className="w-6 h-6 rounded-full bg-[#f0faf8] flex items-center justify-center text-[9px] text-[#5ba89d] font-bold shrink-0">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm text-[#2d5a52]">{ex.name}</p>
                <p className="text-[9px] text-[#5a7570]">{ex.category}</p>
              </div>
              <span className="text-xs text-[#5ba89d] font-medium">{ex.time}</span>
            </div>
          ))}
        </div>

        <p className="text-[9px] text-[#5a7570] mt-3 italic">
          🔊 Voice-guided option available. Each exercise has detailed instructions and modifications.
        </p>
      </section>

      {/* LUNCH */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">☀️</span>
          <h2 className="text-xl text-[#2d5a52]">Lunch</h2>
        </div>

        <div className="p-4 rounded-xl bg-green-50/50 border border-green-100 mb-3">
          <h3 className="text-sm font-bold text-[#2d5a52]">Mediterranean Lentil & Salmon Bowl</h3>
          <p className="text-xs text-[#5a7570] mt-1">100g baked salmon + 80g lentils + cherry tomatoes + cucumber + feta + olive oil + lemon dressing</p>
          <div className="flex gap-3 mt-2 text-[9px] text-[#5a7570]">
            <span>🔥 520 kcal</span>
            <span>🥩 38g protein</span>
            <span>🐟 Omega-3</span>
            <span>⏱ 15 min</span>
            <span>💰 €2.80</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <p className="text-[9px] uppercase font-bold text-[#5ba89d] mb-1">Afternoon Supplements</p>
          <div className="flex flex-wrap gap-2 text-xs text-[#3a5550]">
            <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🐟 Omega-3 1000mg</span>
            <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🛡️ Zinc 30mg</span>
            <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🌸 Myo-Inositol 2000mg</span>
          </div>
        </div>
      </section>

      {/* SNACK */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🍎</span>
          <h2 className="text-xl text-[#2d5a52]">Afternoon Snack</h2>
        </div>
        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
          <h3 className="text-sm font-bold text-[#2d5a52]">Fertility Power Snack</h3>
          <p className="text-xs text-[#5a7570] mt-1">Greek yogurt + walnuts + 3 Brazil nuts + pomegranate seeds + drizzle of honey</p>
          <div className="flex gap-3 mt-2 text-[9px] text-[#5a7570]">
            <span>🔥 280 kcal</span>
            <span>🥜 Selenium</span>
            <span>🍊 Antioxidants</span>
            <span>💰 €1.50</span>
          </div>
        </div>
      </section>

      {/* DINNER */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌙</span>
          <h2 className="text-xl text-[#2d5a52]">Dinner</h2>
        </div>
        <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 mb-3">
          <h3 className="text-sm font-bold text-[#2d5a52]">One-Pan Chicken & Roasted Vegetables</h3>
          <p className="text-xs text-[#5a7570] mt-1">150g chicken thigh + sweet potato + broccoli + garlic + olive oil + turmeric + black pepper</p>
          <div className="flex gap-3 mt-2 text-[9px] text-[#5a7570]">
            <span>🔥 480 kcal</span>
            <span>🥩 35g protein</span>
            <span>🌿 Anti-inflammatory</span>
            <span>⏱ 30 min</span>
            <span>💰 €2.90</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <p className="text-[9px] uppercase font-bold text-[#5ba89d] mb-1">Evening Supplements</p>
          <div className="flex flex-wrap gap-2 text-xs text-[#3a5550]">
            <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🦠 Probiotics</span>
            <span className="px-2 py-1 rounded-full bg-white border border-[#c2ddd8]">🌙 Magnesium 400mg</span>
          </div>
        </div>
      </section>

      {/* DAILY TOTALS */}
      <section className="soft-card p-5 mb-4">
        <h3 className="text-sm font-bold text-[#2d5a52] mb-3">📊 Day 5 Totals</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-lg font-bold text-[#2d5a52]">1,700</p>
            <p className="text-[8px] text-[#5a7570]">Calories</p>
          </div>
          <div className="p-2 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-lg font-bold text-[#2d5a52]">120g</p>
            <p className="text-[8px] text-[#5a7570]">Protein</p>
          </div>
          <div className="p-2 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-lg font-bold text-[#2d5a52]">€6.20</p>
            <p className="text-[8px] text-[#5a7570]">Food Cost</p>
          </div>
          <div className="p-2 rounded-lg bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-lg font-bold text-[#2d5a52]">20 min</p>
            <p className="text-[8px] text-[#5a7570]">Exercise</p>
          </div>
        </div>
      </section>

      {/* EVENING ROUTINE */}
      <section className="soft-card p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌙</span>
          <h2 className="text-xl text-[#2d5a52]">Evening Routine</h2>
        </div>
        <div className="space-y-2 text-xs text-[#3a5550]">
          <p>✅ Daily check-in: log sleep, energy, stress (30 sec)</p>
          <p>✅ Herbal tea: Chamomile or Red Raspberry Leaf</p>
          <p>✅ No screens 30 min before bed</p>
          <p>✅ 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s</p>
          <p>✅ Lights out by 10:30 PM (hormones peak 10pm-2am)</p>
        </div>
      </section>

      {/* SMART INSIGHT */}
      <section className="soft-card p-4 mb-4 border-l-4 border-l-amber-300 bg-amber-50/30">
        <p className="text-xs text-[#4a3f44]">
          💡 <strong>Today&apos;s Insight:</strong> You&apos;re in the follicular phase — energy is rising! This is the best time for strength training. Your muscles recover faster now thanks to rising estrogen.
        </p>
      </section>

      {/* HIS DAY */}
      <section className="soft-card p-6 mb-4 border-l-4 border-l-[#5ba89d]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">👨</span>
          <h2 className="text-xl text-[#2d5a52]">His Day 5</h2>
        </div>
        <div className="space-y-2 text-xs text-[#3a5550]">
          <p>💊 Supplements: Zinc 30mg, CoQ10 200mg, D3 3000IU, Omega-3, Selenium, L-Carnitine</p>
          <p>🏃 Exercise: 30 min brisk walk + Kegel exercises (5 min)</p>
          <p>🚿 Cool shower (no hot bath)</p>
          <p>💧 2.5L water</p>
          <p>🚫 No alcohol, no laptop on lap</p>
          <p>😴 7-8 hours sleep, loose boxers</p>
        </div>
        <p className="text-[9px] text-[#5ba89d] mt-3 italic">Day 5/74 of sperm optimization. Phase: Spermatogonia (stem cells dividing).</p>
      </section>

      {/* WHAT ELSE IS INCLUDED */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-3">Plus Every Day You Also Get:</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            "📅 Fertile window countdown",
            "🌡️ BBT chart tracking",
            "💕 Intimacy timing tracker",
            "📊 Progress analytics",
            "🏆 Achievement unlocks",
            "💬 Community support",
            "🛒 Auto shopping list",
            "🏥 Doctor report builder",
          ].map((item) => (
            <div key={item} className="p-2 rounded-lg bg-[#f0faf8] border border-[#c2ddd8] text-[10px] text-[#3a5550]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="soft-card p-8 text-center">
        <h2 className="text-2xl text-[#2d5a52] mb-2">This is Just One Day</h2>
        <p className="text-sm text-[#5a7570] mb-6">
          You get 90 days of progressive programming — exercises get harder, meals rotate, insights get smarter. All for less than the cost of one doctor visit.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/pricing" className="btn-primary px-8 py-3 text-base">View Plans — From €29</Link>
          <Link href="/quiz" className="btn-outline px-6 py-3 text-sm">Free Assessment</Link>
        </div>
        <p className="text-[9px] text-[#5a7570] mt-3">One-time payment. No subscription. 7 days free without paying.</p>
      </section>
    </main>
  );
}
