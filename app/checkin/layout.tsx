import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Daily Check-In",
  description: "Log your sleep quality, energy level, stress and symptoms. Your daily check-in helps personalize your wellness program.",
  robots: { index: false },
};

export default function CheckinLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
