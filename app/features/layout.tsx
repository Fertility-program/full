import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Features — Everything in Veronica Bloom",
  description: "Complete list of features: cycle tracker, exercises, nutrition, supplements, male fertility program, couple mode, spermiogram tracking, medication reminders, and more.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
