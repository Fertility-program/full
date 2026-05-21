"use client";

import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <section className="soft-card p-8 text-center mb-6">
        <div className="text-5xl mb-4">💬</div>
        <h1 className="text-3xl text-[#2d5a52] mb-2">Join Our Community</h1>
        <p className="text-sm text-[#3a5550] max-w-md mx-auto">
          Connect with other couples on their fertility journey. Share experiences, ask questions, celebrate wins together.
        </p>
      </section>

      {/* COMMUNITY OPTIONS */}
      <div className="space-y-4 mb-6">
        <a
          href="https://t.me/+veronicabloom"
          target="_blank"
          rel="noopener noreferrer"
          className="soft-card p-5 flex items-center gap-4 hover:border-[#5ba89d] transition-colors border border-transparent"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">✈️</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg text-[#2d5a52]">Telegram Group</h2>
            <p className="text-xs text-[#5a7570]">Daily tips, Q&A, and support from the community. Most active group.</p>
          </div>
          <span className="text-[#5ba89d] text-sm">Join →</span>
        </a>

        <a
          href="https://www.facebook.com/groups/veronicabloom"
          target="_blank"
          rel="noopener noreferrer"
          className="soft-card p-5 flex items-center gap-4 hover:border-[#5ba89d] transition-colors border border-transparent"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">📘</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg text-[#2d5a52]">Facebook Group</h2>
            <p className="text-xs text-[#5a7570]">Private group for women TTC. Share stories, ask questions, find support.</p>
          </div>
          <span className="text-[#5ba89d] text-sm">Join →</span>
        </a>

        <a
          href="https://www.instagram.com/veronicabloom.fertility"
          target="_blank"
          rel="noopener noreferrer"
          className="soft-card p-5 flex items-center gap-4 hover:border-[#5ba89d] transition-colors border border-transparent"
        >
          <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">📸</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg text-[#2d5a52]">Instagram</h2>
            <p className="text-xs text-[#5a7570]">Daily fertility tips, meal ideas, exercise demos, and motivation.</p>
          </div>
          <span className="text-[#5ba89d] text-sm">Follow →</span>
        </a>

        <a
          href="mailto:majavujovicns021@gmail.com"
          className="soft-card p-5 flex items-center gap-4 hover:border-[#5ba89d] transition-colors border border-transparent"
        >
          <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
            <span className="text-2xl">✉️</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg text-[#2d5a52]">Email Support</h2>
            <p className="text-xs text-[#5a7570]">Questions about the program? We respond within 24 hours.</p>
          </div>
          <span className="text-[#5ba89d] text-sm">Write →</span>
        </a>
      </div>

      {/* COMMUNITY GUIDELINES */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-lg text-[#2d5a52] mb-3">Community Guidelines</h2>
        <div className="space-y-2 text-xs text-[#3a5550]">
          <p>💚 <strong>Be kind</strong> — everyone is on a different part of their journey</p>
          <p>🔒 <strong>Respect privacy</strong> — what&apos;s shared in the group stays in the group</p>
          <p>🚫 <strong>No medical advice</strong> — share experiences, but always recommend seeing a doctor</p>
          <p>🎉 <strong>Celebrate wins</strong> — positive OPK, good SA results, BFP — share them!</p>
          <p>🤝 <strong>Support each other</strong> — bad days happen. Be there for each other.</p>
        </div>
      </section>

      {/* WHAT MEMBERS SAY */}
      <section className="soft-card p-6 mb-6">
        <h2 className="text-lg text-[#2d5a52] mb-4">What Members Say</h2>
        <div className="space-y-3">
          {[
            { text: "Finding this community made me feel less alone. Other women understand what I'm going through.", name: "Ivana" },
            { text: "My husband joined the partner group and it actually motivated him to take his supplements daily!", name: "Milica" },
            { text: "I got my BFP last week and the support from this group was everything. Thank you all! 🤰", name: "Sara" },
          ].map((quote) => (
            <div key={quote.name} className="p-3 rounded-xl bg-[#f0faf8] border border-[#c2ddd8]">
              <p className="text-xs text-[#3a5550] italic">&ldquo;{quote.text}&rdquo;</p>
              <p className="text-[10px] text-[#5ba89d] mt-1 font-medium">— {quote.name}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/dashboard" className="btn-outline text-xs px-4 py-2">Dashboard</Link>
        <Link href="/buddy" className="btn-outline text-xs px-4 py-2">Invite a Buddy</Link>
        <Link href="/refer" className="btn-outline text-xs px-4 py-2">Refer & Earn</Link>
      </div>
    </main>
  );
}
