import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Veronica Bloom account, membership, data export and privacy settings.",
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
