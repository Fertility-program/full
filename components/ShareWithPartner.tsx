"use client";

import { useState } from "react";

/**
 * A button/card that lets the user share the Partner Dashboard link
 * with their partner via WhatsApp, SMS, email, or copy link.
 */
export default function ShareWithPartner() {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const partnerLink = typeof window !== "undefined"
    ? `${window.location.origin}/partner`
    : "https://veronica-bloom.vercel.app/partner";

  const message = `Hey! I'm using this fertility app and there's a section just for you — daily habits, supplements, and a 74-day sperm optimization program. It's free. Check it out: ${partnerLink}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(partnerLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  // Check if already dismissed today
  if (typeof window !== "undefined") {
    const dismissedDate = localStorage.getItem("sharePartnerDismissed");
    if (dismissedDate === new Date().toISOString().split("T")[0]) return null;
  }

  if (dismissed) return null;

  // Don't show if partner is already active
  if (typeof window !== "undefined") {
    const partnerStart = localStorage.getItem("partnerStartDate");
    const coupleRole = localStorage.getItem("coupleRole");
    if (coupleRole === "him") return null; // He's already using it
  }

  function dismiss() {
    setDismissed(true);
    localStorage.setItem("sharePartnerDismissed", new Date().toISOString().split("T")[0]);
  }

  return (
    <section className="soft-card p-4 mb-4 border-l-4 border-l-[#5ba89d] relative">
      <button onClick={dismiss} className="absolute top-2 right-3 text-[#5a7570] text-xs hover:text-[#2d5a52]" aria-label="Dismiss">✕</button>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">👨</span>
        <div>
          <p className="text-sm font-medium text-[#2d5a52]">Invite Your Partner</p>
          <p className="text-[9px] text-[#5a7570]">His fertility matters too — 50% of infertility involves male factor</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-[10px] text-green-700"
        >
          💬 WhatsApp
        </a>
        <a
          href={`sms:?body=${encodeURIComponent(message)}`}
          className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[10px] text-blue-700"
        >
          📱 SMS
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent("Check out this fertility program for men")}&body=${encodeURIComponent(message)}`}
          className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-[10px] text-gray-700"
        >
          ✉️ Email
        </a>
        <button
          onClick={copyLink}
          className="px-3 py-1.5 rounded-lg bg-[#f0faf8] border border-[#c2ddd8] text-[10px] text-[#2d5a52]"
        >
          {copied ? "✓ Copied!" : "🔗 Copy Link"}
        </button>
      </div>
    </section>
  );
}
