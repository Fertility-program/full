import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Veronica Bloom refund policy — 30-day money-back guarantee.",
};

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
