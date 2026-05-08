import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Rest Day",
  description: "Your guided rest and recovery day. Meditation, journaling prompts, self-care tips and affirmations.",
  robots: { index: false },
};

export default function RestDayLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
