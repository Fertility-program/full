import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Fertility Wellness Guide",
  description: "Download our free 30+ page guide: cycle-synced exercises, 7-day meal plan, supplement doses for both partners, and daily routines for couples TTC.",
};

export default function FreeGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
