import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Fertility Assessment",
  description:
    "Take our free 2-minute assessment to get a personalized fertility wellness plan. Tailored exercises, nutrition and cycle support based on your body and goals.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
