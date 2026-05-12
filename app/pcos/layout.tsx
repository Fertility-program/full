import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCOS Fertility Program — Conceive Naturally with Polycystic Ovary Syndrome",
  description: "Evidence-based PCOS fertility program: myo-inositol, low-GI nutrition, cycle-synced exercises, ovulation tracking, and supplement protocol. 70% restore ovulation.",
};

export default function PCOSLayout({ children }: { children: React.ReactNode }) {
  return children;
}
