import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Doctor Visit Prep",
  description: "Generate a personalized list of questions for your gynecologist based on your cycle data, symptoms and fertility journey.",
  robots: { index: false },
};

export default function DoctorPrepLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
