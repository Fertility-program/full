import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Choose your Veronica Bloom plan. Glow (€29/30 days) or Elite (€79/90 days). Personalized exercises, meal plans under €7/day, progress tracking. 30-day money-back guarantee.",
};

// FAQ Schema for SEO (Google rich results)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this suitable for women with PCOS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The program includes specific protocols for PCOS including insulin-balancing nutrition, gentle movement and supplement guidance tailored to polycystic ovary syndrome.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the meal plan cost per day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All our meal plans are designed to cost under €7 per day. Most days average €5-6 using fertility-friendly ingredients like leafy greens, wild salmon, eggs and seasonal vegetables.",
      },
    },
    {
      "@type": "Question",
      name: "What if I have specific health conditions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Veronica Bloom is a wellness program, not medical treatment. The quiz personalizes your plan based on your concerns, but always consult your doctor before starting any new program.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can cancel from your Account page at any time. We also offer a 30-day money-back guarantee — no questions asked.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between Bloom and Elite?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bloom is a 30-day program perfect for getting started. Elite is 90 days with advanced protocols, hormone optimization, monthly reassessments and a premium exercise library.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need any equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No equipment needed. All exercises use bodyweight only. A yoga mat is optional but not required.",
      },
    },
  ],
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
