import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Live Session",
  description: "Your guided exercise session with timer, voice guide and step-by-step instructions tailored to your cycle phase.",
  robots: { index: false },
};

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
