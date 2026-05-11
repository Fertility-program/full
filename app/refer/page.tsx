"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { generateReferralCode, getReferralLink } from "@/lib/referral";

export default function ReferPage() {
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(0);
  const [daysEarned, setDaysEarned] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const c = generateReferralCode(user.id);
        setCode(c);
        setLink(getReferralLink(c));
      }
    });

    // Load referral stats from localStorage
    const stats = localStorage.getItem("referralStats");
    if (stats) {
      try {
        const parsed = JSON.parse(stats);
        setReferrals(parsed.count || 0);
        setDaysEarned(parsed.daysEarned || 0);
      } catch {}
    }
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const shareText = `I'm using this fertility wellness app and it's really helping us on our TTC journey. Try it free: ${link}`;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      {/* HERO */}
      <section className="soft-card p-8 text-center mb-6">
        <div className="text-5xl mb-4">🎁</div>
        <h1 className="text-3xl text-[#2d5a52] mb-2">Share & Earn Free Days</h1>
        <p className="text-sm text-[#5a7570] max-w-md mx-auto">
          Invite anyone — a friend, your sister, a colleague trying to conceive. When they sign up, you both get 7 extra days of premium access.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="soft-card p-6 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <div className="text-2xl mb-2">📤</div>
            <p className="text-sm font-medium text-[#2d5a52]">1. Share Your Link</p>
            <p className="text-xs text-[#5a7570]">Send your unique link to anyone who might benefit</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm font-medium text-[#2d5a52]">2. They Sign Up</p>
            <p className="text-xs text-[#5a7570]">They create a free account using your link</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <div className="text-2xl mb-2">🎉</div>
            <p className="text-sm font-medium text-[#2d5a52]">3. Both Get 7 Days</p>
            <p className="text-xs text-[#5a7570]">You and your friend each get 7 days premium free</p>
          </div>
        </div>
      </section>

      {/* YOUR LINK */}
      <section className="soft-card p-6 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Your Referral Link</h2>
        {link ? (
          <>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={link}
                readOnly
                className="flex-1 p-3 rounded-xl border border-[#c2ddd8] text-xs text-[#3a5550] bg-white/60"
              />
              <button
                onClick={copyLink}
                className="px-4 py-3 rounded-xl bg-[#2d5a52] text-white text-xs font-medium shrink-0"
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>
            <p className="text-[10px] text-[#5a7570]">Your code: <strong>{code}</strong></p>
          </>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-sm text-amber-700">
              <Link href="/login" className="underline font-medium">Log in</Link> to get your personal referral link.
            </p>
          </div>
        )}
      </section>

      {/* SHARE OPTIONS */}
      {link && (
        <section className="soft-card p-6 mb-4">
          <h2 className="text-lg text-[#2d5a52] mb-3">Share Via</h2>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 hover:bg-green-100 transition-colors"
            >
              💬 WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("Free fertility wellness app — exercises, nutrition & tracking for couples TTC 🌸")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 hover:bg-blue-100 transition-colors"
            >
              ✈️ Telegram
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              📘 Facebook
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent("Free Fertility Wellness App")}&body=${encodeURIComponent(shareText)}`}
              className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
            >
              ✉️ Email
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-700 hover:bg-sky-100 transition-colors"
            >
              🐦 Twitter/X
            </a>
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="soft-card p-6 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">Your Referral Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <div className="text-3xl font-bold text-[#2d5a52]">{referrals}</div>
            <p className="text-[10px] text-[#5a7570] uppercase font-bold">Friends Joined</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
            <div className="text-3xl font-bold text-[#5ba89d]">{daysEarned}</div>
            <p className="text-[10px] text-[#5a7570] uppercase font-bold">Days Earned</p>
          </div>
        </div>
      </section>

      {/* WHO TO INVITE */}
      <section className="soft-card p-6 mb-4">
        <h2 className="text-lg text-[#2d5a52] mb-3">💡 Who to Invite</h2>
        <div className="space-y-2 text-xs text-[#3a5550]">
          <p>👩 A friend who&apos;s trying to conceive</p>
          <p>👫 A couple you know who&apos;s starting their fertility journey</p>
          <p>👩‍👧 Your sister or cousin who&apos;s planning a family</p>
          <p>🤰 Someone who just started TTC and needs guidance</p>
          <p>💪 A gym buddy who&apos;d benefit from cycle-synced training</p>
        </div>
        <p className="text-[10px] text-[#5a7570] mt-3 italic">
          No limit on referrals. Each successful signup = 7 days premium for both of you.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/dashboard" className="btn-outline text-xs px-4 py-2">Dashboard</Link>
        <Link href="/buddy" className="btn-outline text-xs px-4 py-2">Buddy System</Link>
      </div>
    </main>
  );
}
