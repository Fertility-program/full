import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Cycle Tracker",
  description: "Track your menstrual cycle, predict your fertile window, log BBT and ovulation tests. Personalized fertility insights based on your cycle phase.",
  robots: { index: false },
};

export default function CycleLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
