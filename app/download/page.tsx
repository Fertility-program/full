"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DownloadPage() {
  const [showIOS, setShowIOS] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Capture the beforeinstallprompt event for PWA install
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setInstalled(true);
      setInstallPrompt(null);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <section className="soft-card p-8 text-center mb-6">
        <div className="text-5xl mb-4">📱</div>
        <h1 className="text-4xl text-[#2d5a52] mb-2">Get the App</h1>
        <p className="text-[#3a5550] max-w-md mx-auto">
          Install Veronica Bloom on your phone or computer. Works like a native app — offline support, push notifications, quick access.
        </p>
      </section>

      {/* QUICK INSTALL (if browser supports it) */}
      {installPrompt && !installed && (
        <section className="soft-card p-6 mb-4 border-l-4 border-l-green-400 bg-green-50/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
              <span className="text-2xl">⬇️</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg text-[#2d5a52] mb-1">Install Now</h2>
              <p className="text-xs text-[#3a5550]">
                One tap to add to your home screen. No app store needed.
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="btn-primary px-5 py-2.5 text-sm shrink-0 w-full sm:w-auto"
            >
              Install App
            </button>
          </div>
        </section>
      )}

      {installed && (
        <section className="soft-card p-4 mb-4 text-center bg-green-50 border border-green-200">
          <p className="text-sm text-green-700">✅ App is installed! Open it from your home screen.</p>
        </section>
      )}

      {/* ANDROID */}
      <section className="soft-card p-6 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg text-[#2d5a52] mb-1">Android</h2>
            <p className="text-xs text-[#3a5550]">
              Samsung, Xiaomi, Huawei, Google Pixel — all Android phones.
            </p>
          </div>
          <a
            href="/fertility-program.apk"
            download
            className="btn-primary px-5 py-2.5 text-sm shrink-0 w-full sm:w-auto text-center"
          >
            Download APK
          </a>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <p className="text-xs text-[#3a5550] font-medium mb-2">How to install:</p>
          <ol className="space-y-2 text-xs text-[#3a5550]">
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">1.</span>
              Tap <strong>&quot;Download APK&quot;</strong> above
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">2.</span>
              Open the downloaded file
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">3.</span>
              If prompted, allow <strong>&quot;Install from unknown sources&quot;</strong>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">4.</span>
              Tap <strong>&quot;Install&quot;</strong> — Done! App appears on home screen.
            </li>
          </ol>
          <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-[10px] text-blue-700">
              💡 Alternative: Open this site in Chrome → tap ⋮ menu → &quot;Install app&quot;. Same result, no APK needed.
            </p>
          </div>
        </div>
      </section>

      {/* iOS */}
      <section className="soft-card p-6 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">🍎</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg text-[#2d5a52] mb-1">iPhone & iPad</h2>
            <p className="text-xs text-[#3a5550]">
              Add to Home Screen from Safari — works like a native app.
            </p>
          </div>
          <button
            onClick={() => setShowIOS(!showIOS)}
            className="btn-outline px-5 py-2.5 text-sm shrink-0 w-full sm:w-auto"
          >
            {showIOS ? "Hide" : "How to Install"}
          </button>
        </div>

        {showIOS && (
          <div className="mt-4 p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <p className="text-xs text-[#3a5550] font-medium mb-2">How to install on iPhone:</p>
            <ol className="space-y-2 text-xs text-[#3a5550]">
              <li className="flex gap-2">
                <span className="font-bold text-[#5ba89d] shrink-0">1.</span>
                Open this website in <strong>Safari</strong> (not Chrome)
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#5ba89d] shrink-0">2.</span>
                Tap the <strong>Share button</strong> ⬆️ at the bottom
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#5ba89d] shrink-0">3.</span>
                Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#5ba89d] shrink-0">4.</span>
                Tap <strong>&quot;Add&quot;</strong> — app icon appears on your home screen!
              </li>
            </ol>
            <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-[10px] text-amber-700">
                💡 Must use Safari. Chrome on iOS doesn&apos;t support &quot;Add to Home Screen&quot; for PWAs.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* DESKTOP */}
      <section className="soft-card p-6 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">💻</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg text-[#2d5a52] mb-1">Desktop (Windows / Mac)</h2>
            <p className="text-xs text-[#3a5550]">
              Install as a desktop app from Chrome or Edge.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
          <p className="text-xs text-[#3a5550] font-medium mb-2">How to install on desktop:</p>
          <ol className="space-y-2 text-xs text-[#3a5550]">
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">1.</span>
              Open this website in <strong>Chrome</strong> or <strong>Edge</strong>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">2.</span>
              Look for the <strong>install icon</strong> ⊕ in the address bar (right side)
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#5ba89d] shrink-0">3.</span>
              Click <strong>&quot;Install&quot;</strong> — app opens in its own window!
            </li>
          </ol>
        </div>
      </section>

      {/* FEATURES */}
      <section className="soft-card p-6 mb-6">
        <h3 className="text-lg text-[#2d5a52] mb-4 text-center">What you get</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "⚡", text: "Instant access from home screen" },
            { icon: "📴", text: "Works offline" },
            { icon: "🔔", text: "Daily reminders & fertile window alerts" },
            { icon: "🏠", text: "Full-screen app experience" },
            { icon: "🔒", text: "Your data stays private" },
            { icon: "🔄", text: "Always up to date (no store updates)" },
            { icon: "💑", text: "Couple mode — both install it" },
            { icon: "🪶", text: "Lightweight — no storage wasted" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-2 p-3 rounded-xl bg-white/60 border border-[#c2ddd8]">
              <span className="text-lg">{f.icon}</span>
              <span className="text-xs text-[#2d5a52]">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QR CODE */}
      <section className="soft-card p-6 mb-6 text-center">
        <h3 className="text-lg text-[#2d5a52] mb-2">Scan to Open on Phone</h3>
        <p className="text-xs text-[#3a5550] mb-4">On desktop? Scan this QR code with your phone camera.</p>
        <div className="inline-block p-3 bg-white rounded-2xl border border-[#c2ddd8] shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://veronica-bloom.vercel.app/download&color=2d5a52&bgcolor=ffffff"
            alt="QR code to download Veronica Bloom app"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <p className="text-[9px] text-[#4a7a70] mt-3">Opens this page on your phone → then install from there</p>
      </section>

      {/* PARTNER TIP */}
      <section className="soft-card p-5 mb-6 border-l-4 border-l-[#5ba89d]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💑</span>
          <div>
            <h3 className="text-sm font-bold text-[#2d5a52]">Tip: Install for Both Partners</h3>
            <p className="text-xs text-[#5a7570]">
              Have your partner install the app too. He can access his Fertility Dashboard directly from the home screen. Use Couple Mode to sync progress!
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-outline text-xs px-4 py-2">← Home</Link>
        <Link href="/dashboard" className="btn-primary text-xs px-4 py-2">Dashboard</Link>
        <Link href="/partner" className="btn-outline text-xs px-4 py-2">Partner Dashboard</Link>
      </div>
    </main>
  );
}
