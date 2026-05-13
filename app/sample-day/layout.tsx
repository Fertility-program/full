import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Day — See What a Full Day in the Program Looks Like",
  description: "Preview Day 5 of the fertility program: exercises, 4 meals with recipes, supplement schedule, evening routine, partner program, and daily insights. All for under €7.",
};

export default function SampleDayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
