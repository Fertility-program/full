"use client";

import { useState, useEffect } from "react";
import { LOCALE_NAMES, LOCALE_FLAGS, type Locale } from "@/lib/i18n/translations";

// Google Translate language codes
const GT_LANG_MAP: Record<Locale, string> = {
  en: "en",
  sr: "sr",
  de: "de",
  es: "es",
};

function triggerGoogleTranslate(langCode: string) {
  // Set the Google Translate cookie to trigger translation
  const domain = window.location.hostname;
  if (langCode === "en") {
    // Remove translation — restore original
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    // Also try to restore via Google Translate API
    const frame = document.querySelector<HTMLIFrameElement>(".goog-te-menu-frame");
    if (frame?.contentWindow) {
      const items = frame.contentWindow.document.querySelectorAll(".goog-te-menu2-item");
      items.forEach((item) => {
        if ((item as HTMLElement).textContent?.includes("English")) {
          (item as HTMLElement).click();
        }
      });
    }
  } else {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${langCode}; path=/`;
  }
  // Reload to apply Google Translate
  window.location.reload();
}

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vm_locale") as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  const locales: Locale[] = ["en", "sr", "de", "es"];

  function handleChange(loc: Locale) {
    setLocale(loc);
    localStorage.setItem("vm_locale", loc);
    setOpen(false);
    // Trigger Google Translate for full-page translation
    triggerGoogleTranslate(GT_LANG_MAP[loc]);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-sm text-[#6f5a62] hover:bg-white hover:shadow-md transition-all"
        aria-label="Change language"
      >
        <span className="text-base">{LOCALE_FLAGS[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-[#1a1528] rounded-2xl shadow-xl border border-[#f0e3e8] dark:border-[rgba(140,130,180,0.15)] overflow-hidden min-w-[150px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleChange(loc)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#fdf2f5] transition-colors ${
                  locale === loc ? "bg-[#fdf2f5] text-[#8f5d6f] font-medium" : "text-[#6f5a62]"
                }`}
              >
                <span>{LOCALE_FLAGS[loc]}</span>
                <span>{LOCALE_NAMES[loc]}</span>
                {locale === loc && <span className="ml-auto text-[#d8a7b5]">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
