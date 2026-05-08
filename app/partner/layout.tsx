import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Dashboard",
  description: "Daily habits, supplements and lifestyle guide for men to optimize sperm quality and support conception.",
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
