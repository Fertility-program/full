"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentPreferences = {
  essential: true; // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPreferences>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    const consent = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShow(false);
  }

  function acceptSelected() {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setShow(false);
  }

  function declineAll() {
    const consent = { essential: true, analytics: false, marketing: false };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto soft-card p-5 shadow-2xl border border-[#d8a7b5]/20">
        <div className="flex flex-col gap-4">
          <div className="flex-1 text-sm text-[#6f5a62]">
            We use cookies to improve your experience and save your preferences.
            See our{" "}
            <Link href="/privacy" className="text-[#d8a7b5] underline">
              Privacy Policy
            </Link>
            .
          </div>

          {showDetails && (
            <div className="space-y-3 p-4 rounded-xl bg-[#fdf8f9] border border-[#f0e3e8]">
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked disabled className="accent-[#5ba89d]" />
                <span className="text-[#4a3f44]"><strong>Essential</strong> — Required for the site to function (auth, preferences)</span>
              </label>
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  className="accent-[#5ba89d]"
                />
                <span className="text-[#4a3f44]"><strong>Analytics</strong> — Anonymous usage data (Plausible, no personal data)</span>
              </label>
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  className="accent-[#5ba89d]"
                />
                <span className="text-[#4a3f44]"><strong>Marketing</strong> — Personalized recommendations and email preferences</span>
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button onClick={declineAll} className="px-4 py-2 rounded-xl text-sm text-[#7b6870] hover:bg-[#fdf2f5] transition-colors">
              Decline All
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 rounded-xl text-sm text-[#5ba89d] hover:bg-[#f0faf8] transition-colors"
            >
              {showDetails ? "Hide Options" : "Customize"}
            </button>
            {showDetails && (
              <button onClick={acceptSelected} className="px-4 py-2 rounded-xl text-sm bg-[#f0faf8] text-[#5ba89d] border border-[#c2ddd8]">
                Save Preferences
              </button>
            )}
            <button onClick={acceptAll} className="btn-primary px-6 py-2 text-sm ml-auto">
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
