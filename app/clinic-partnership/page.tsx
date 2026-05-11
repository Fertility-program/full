"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClinicPartnershipPage() {
  const [form, setForm] = useState({
    clinicName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    patientsPerMonth: "",
    interest: [] as string[],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function toggleInterest(item: string) {
    setForm((prev) => ({
      ...prev,
      interest: prev.interest.includes(item)
        ? prev.interest.filter((i) => i !== item)
        : [...prev.interest, item],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.clinicName || !form.email) return;

    setSending(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          source: "clinic_partnership",
          clinicName: form.clinicName,
          contactName: form.contactName,
          phone: form.phone,
          country: form.country,
          patientsPerMonth: form.patientsPerMonth,
          interest: form.interest,
          message: form.message,
        }),
      });
    } catch {}

    setSending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <section className="soft-card p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl text-[#2d5a52] mb-3">Application Received!</h1>
          <p className="text-sm text-[#3a5550] mb-6">
            Thank you for your interest. We&apos;ll review your application and get back to you within 48 hours with a personalized proposal.
          </p>
          <Link href="/" className="btn-primary px-6 py-3 inline-block">Back to Home</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5ba89d] font-bold mb-3">For Fertility Clinics</p>
        <h1 className="text-4xl text-[#2d5a52] mb-3">Give Your Patients a Lifestyle Companion</h1>
        <p className="text-lg text-[#3a5550] max-w-2xl mx-auto">
          Offer evidence-based fertility optimization between appointments. Cycle-synced exercises, nutrition, supplements, and male fertility — all in one app your patients will actually use.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="soft-card p-6 mb-6 border-l-4 border-l-amber-400">
        <h2 className="text-xl text-[#2d5a52] mb-3">The Problem</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <p className="text-2xl mb-2">📱</p>
            <p className="text-sm text-[#3a5550]"><strong>Patients Google everything</strong> — and find misinformation about fertility supplements, timing, and lifestyle.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <p className="text-2xl mb-2">⏰</p>
            <p className="text-sm text-[#3a5550]"><strong>Nurses spend hours</strong> on lifestyle counseling calls that could be automated with structured programs.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <p className="text-2xl mb-2">👨</p>
            <p className="text-sm text-[#3a5550]"><strong>Male partners are ignored</strong> — yet contribute to 50% of infertility. No clinic has a structured male program.</p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">Our Solution</h2>
        <p className="text-sm text-[#3a5550] mb-6">
          A patient-facing app that complements your clinical care. Recommend it to patients as their &quot;between-appointments&quot; lifestyle program.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🧘‍♀️ For Her</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Cycle-synced exercise program (adapts to phase)</li>
              <li>• Fertility nutrition with meal plans under €7/day</li>
              <li>• Evidence-based supplement protocol with tracking</li>
              <li>• Cycle tracker (BBT, OPK, cervical mucus)</li>
              <li>• Daily check-ins (sleep, stress, energy, symptoms)</li>
              <li>• Progress analytics and weekly summaries</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">👨 For Him</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• 74-day sperm optimization program</li>
              <li>• Daily habits & supplement tracking</li>
              <li>• Spermiogram results tracker (WHO 2021 values)</li>
              <li>• Male-specific exercises (kegel, pelvic floor)</li>
              <li>• Nutrition guide for sperm quality</li>
              <li>• Personalized recommendations based on SA results</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">💑 Couple Mode</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Linked accounts with shared progress</li>
              <li>• Fertile window sync (he sees her timing)</li>
              <li>• Shared achievements and streaks</li>
              <li>• Partner check-in reminders</li>
              <li>• Doctor visit prep for both</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <h3 className="text-sm font-bold text-[#2d5a52] mb-2">🏥 For Your Clinic</h3>
            <ul className="text-xs text-[#3a5550] space-y-1">
              <li>• Reduces lifestyle counseling calls by 60%+</li>
              <li>• Patients arrive better prepared for appointments</li>
              <li>• Male partners engaged before first consultation</li>
              <li>• Differentiator vs. competing clinics</li>
              <li>• Optional: your branding on the app</li>
            </ul>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">📊 Evidence-Based Content</h2>
        <p className="text-sm text-[#3a5550] mb-4">
          All recommendations are based on peer-reviewed research and align with clinical guidelines:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { stat: "74%", desc: "Sperm count increase with Zinc+Folate", source: "Zhao et al." },
            { stat: "40%", desc: "Less ovulatory infertility with adequate iron", source: "Nurses' Health Study" },
            { stat: "26%", desc: "Motility improvement with CoQ10", source: "Safarinejad" },
            { stat: "50%", desc: "Of infertility involves male factor", source: "WHO 2021" },
          ].map((s) => (
            <div key={s.desc} className="p-3 rounded-xl bg-white/60 border border-[#c2ddd8] text-center">
              <p className="text-2xl font-bold text-[#5ba89d]">{s.stat}</p>
              <p className="text-[9px] text-[#3a5550] mt-1">{s.desc}</p>
              <p className="text-[8px] text-[#5a7570] italic">{s.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4 text-center">Partnership Options</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[#c2ddd8] text-center">
            <p className="text-xs uppercase tracking-widest text-[#5ba89d] font-bold mb-2">Recommend</p>
            <p className="text-3xl font-bold text-[#2d5a52] mb-1">Free</p>
            <p className="text-xs text-[#5a7570] mb-4">Simply recommend to patients</p>
            <ul className="text-xs text-[#3a5550] space-y-2 text-left">
              <li>✓ Patients use the app independently</li>
              <li>✓ Your clinic listed as referral source</li>
              <li>✓ Printable guide for waiting room</li>
              <li>✓ No integration needed</li>
              <li className="text-[#5a7570]">✗ No custom branding</li>
              <li className="text-[#5a7570]">✗ No patient analytics</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border-2 border-[#5ba89d] text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] px-3 py-1 rounded-full bg-[#5ba89d] text-white font-bold">POPULAR</span>
            <p className="text-xs uppercase tracking-widest text-[#5ba89d] font-bold mb-2">Partner</p>
            <p className="text-3xl font-bold text-[#2d5a52] mb-1">€299<span className="text-sm font-normal">/mo</span></p>
            <p className="text-xs text-[#5a7570] mb-4">Up to 100 patients</p>
            <ul className="text-xs text-[#3a5550] space-y-2 text-left">
              <li>✓ Everything in Recommend</li>
              <li>✓ Bulk patient access codes</li>
              <li>✓ Clinic dashboard (aggregate stats)</li>
              <li>✓ Co-branded welcome screen</li>
              <li>✓ Priority support</li>
              <li>✓ Monthly usage reports</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-[#c2ddd8] text-center">
            <p className="text-xs uppercase tracking-widest text-[#5ba89d] font-bold mb-2">Enterprise</p>
            <p className="text-3xl font-bold text-[#2d5a52] mb-1">Custom</p>
            <p className="text-xs text-[#5a7570] mb-4">Unlimited patients</p>
            <ul className="text-xs text-[#3a5550] space-y-2 text-left">
              <li>✓ Everything in Partner</li>
              <li>✓ Full white-label (your brand)</li>
              <li>✓ Custom domain</li>
              <li>✓ API integration with your EMR</li>
              <li>✓ Custom content modules</li>
              <li>✓ Dedicated account manager</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="soft-card p-6 mb-6 border-l-4 border-l-[#5ba89d]">
        <p className="text-sm text-[#3a5550] italic mb-3">
          &ldquo;We recommend lifestyle optimization to all our patients before starting treatment. Having a structured app they can follow — especially one that includes the male partner — saves our nurses hours of phone time and patients arrive better prepared.&rdquo;
        </p>
        <p className="text-xs text-[#5a7570]">— Fertility Clinic Medical Director</p>
      </section>

      {/* APPLICATION FORM */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4 text-center">Get Started</h2>
        <p className="text-sm text-[#3a5550] text-center mb-6">
          Tell us about your clinic and we&apos;ll send a personalized proposal within 48 hours.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Clinic Name *</label>
              <input
                type="text"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="e.g. City Fertility Clinic"
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Contact Name *</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                placeholder="Your name"
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="clinic@example.com"
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+381..."
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="e.g. Serbia, UK, Germany"
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Patients/Month</label>
              <select
                value={form.patientsPerMonth}
                onChange={(e) => setForm({ ...form, patientsPerMonth: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d]"
              >
                <option value="">Select...</option>
                <option value="1-50">1-50</option>
                <option value="50-100">50-100</option>
                <option value="100-300">100-300</option>
                <option value="300+">300+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-2">Interested In</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Patient lifestyle program",
                "Male fertility module",
                "Couple mode",
                "White-label / custom branding",
                "EMR integration",
                "Bulk patient codes",
                "Waiting room materials",
                "Research collaboration",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    form.interest.includes(item)
                      ? "bg-[#5ba89d] text-white"
                      : "bg-white border border-[#c2ddd8] text-[#5a7570] hover:border-[#5ba89d]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#5ba89d] tracking-widest block mb-1">Message (optional)</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your clinic and what you're looking for..."
              className="w-full p-3 rounded-xl border border-[#c2ddd8] text-sm outline-none focus:border-[#5ba89d] resize-none h-24"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full py-4 text-base disabled:opacity-60"
          >
            {sending ? "Sending..." : "Request Partnership Info"}
          </button>
        </form>
      </section>

      {/* FAQ */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-xl text-[#2d5a52] mb-4">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Do patients need to pay?", a: "That's up to you. You can offer it free as a value-add, or patients can subscribe directly. Partner clinics get bulk access codes at a discount." },
            { q: "Is the content clinically reviewed?", a: "All content is evidence-based with references to peer-reviewed studies. We're open to having your medical team review and customize content for your patient population." },
            { q: "How do patients access it?", a: "It's a web app (PWA) — no app store needed. Patients open a link, install on their phone in one tap. Works on all devices, offline included." },
            { q: "Can we customize the content?", a: "Partner tier: co-branded welcome screen. Enterprise tier: full white-label with your branding, custom content modules, and domain." },
            { q: "What about data privacy?", a: "GDPR compliant. Patient data is encrypted, stored in EU servers (Supabase). Clinic sees only aggregate statistics, never individual patient data (unless patient consents)." },
            { q: "How long does setup take?", a: "Recommend tier: instant (just share the link). Partner tier: 1-2 days for codes and dashboard. Enterprise: 2-4 weeks for full white-label." },
          ].map((item) => (
            <div key={item.q} className="p-4 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <p className="text-sm font-medium text-[#2d5a52] mb-1">{item.q}</p>
              <p className="text-xs text-[#3a5550]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-outline text-xs px-4 py-2">← Home</Link>
        <Link href="/free-guide" className="btn-outline text-xs px-4 py-2">See the Guide</Link>
        <Link href="/partner" className="btn-outline text-xs px-4 py-2">Partner Dashboard Demo</Link>
      </div>
    </main>
  );
}
