import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Progress Tracker",
  description: "Track your fertility wellness journey. See sleep, energy and stress trends, achievements and weekly progress over time.",
  robots: { index: false },
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
