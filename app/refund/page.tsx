export default function RefundPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <section className="soft-card p-10">
        <h1 className="text-4xl text-[#2d5a52] mb-8">Refund Policy</h1>

        <div className="prose prose-sm text-[#5a7570] space-y-6">
          <div className="p-5 rounded-2xl bg-green-50 border border-green-200 mb-8">
            <p className="text-green-700 font-medium text-lg mb-1">
              💸 30-Day Money-Back Guarantee
            </p>
            <p className="text-green-600 text-sm">
              If you&apos;re not satisfied with Veronica Bloom within 30 days of purchase,
              we&apos;ll refund you in full — no questions asked.
            </p>
          </div>

          <h2 className="text-xl text-[#2d5a52] mb-3">How to Request a Refund</h2>
          <p>
            Email us at{" "}
            <a href="mailto:support@veronicabloom.com" className="text-[#5ba89d] underline">
              support@veronicabloom.com
            </a>{" "}
            with your account email and we&apos;ll process your refund within 3-5 business days.
          </p>

          <h2 className="text-xl text-[#2d5a52] mb-3">Eligibility</h2>
          <ul className="space-y-2 ml-4 list-disc">
            <li>Refund requests must be made within 30 days of the original purchase date.</li>
            <li>Refunds are processed to the original payment method.</li>
            <li>After a refund, your premium access will be deactivated.</li>
            <li>Clinic-provided access codes are not eligible for refunds (contact your clinic directly).</li>
          </ul>

          <h2 className="text-xl text-[#2d5a52] mb-3">Processing Time</h2>
          <p>
            Refunds are typically processed within 3-5 business days. Depending on your bank
            or payment provider, it may take an additional 5-10 days to appear on your statement.
          </p>

          <h2 className="text-xl text-[#2d5a52] mb-3">Contact</h2>
          <p>
            For any questions about refunds, reach out to{" "}
            <a href="mailto:support@veronicabloom.com" className="text-[#5ba89d] underline">
              support@veronicabloom.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
