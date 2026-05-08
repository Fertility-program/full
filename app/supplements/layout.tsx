import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fertility Supplement Guide",
  description: "Evidence-based supplement recommendations for fertility: Folate, CoQ10, Omega-3, Myo-Inositol and more with exact doses and timing.",
};

export default function SupplementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
