import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endometriosis & Fertility — Conceiving with Endo",
  description: "Evidence-based strategies for conceiving with endometriosis: anti-inflammatory nutrition, supplements (NAC, Omega-3, CoQ10), gentle exercises, and when to seek treatment.",
};

export default function EndometriosisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
