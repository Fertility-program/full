import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <section className="soft-card p-10">
        <p className="uppercase tracking-[0.25em] text-xs text-[#6aab9f] mb-4 font-bold">
          Policy
        </p>
        <h1 className="text-4xl text-[#2d5a52] mb-8">Refund Policy</h1>

        <div className="space-y-8 text-[#5a7570] text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-green-50 border border-green-200">
            <p className="text-green-700 font-medium text-lg mb-2">
              💸 30-Day Money-Back Guarantee
            </p>
            <p className="text-green-600">
              We want you to feel confident trying Veronica Bloom. If our program isn&apos;t
              the right fit for you, we offer a full refund within 30 days of purchase — no
              questions asked.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">How to Request a Refund</h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                Contact us via our{" "}
                <Link href="/contact" className="text-[#5ba89d] underline">Contact page</Link>{" "}
                within 30 days of your purchase date.
              </li>
              <li>Include your account email address and the plan you purchased.</li>
              <li>No reason required — we respect your decision.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">Refund Timeline</h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>Refund requests are processed within 5–10 business days.</li>
              <li>The refund will be returned to your original payment method.</li>
              <li>You will receive an email confirmation once the refund is processed.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">After 30 Days</h2>
            <p>
              Refunds are not available after 30 days from the date of purchase. However, you
              retain full access to your program for the duration of your plan (30 or 90 days).
            </p>
          </div>

          <div>
            <h2 className="text-xl text-[#2d5a52] mb-3">Exceptions</h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                If you experience a technical issue that prevents you from accessing the program,
                contact us and we will resolve it or issue a refund regardless of the 30-day window.
              </li>
              <li>Duplicate purchases are always refunded in full.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#c2ddd8]">
            <p className="text-xs text-[#7b6870]">
              Last updated: May 2026. This policy applies to all purchases made through Veronica Bloom.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
