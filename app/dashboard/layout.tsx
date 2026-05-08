import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "My Dashboard",
  description:
    "Your personalized wellness dashboard. Daily exercises, meal plans, nutrition tracking and progress — all in one place.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
