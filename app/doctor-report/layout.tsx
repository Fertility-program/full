import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fertility Wellness Report — For Your Doctor",
  description: "Printable summary of your tracked fertility data: cycle info, wellness metrics, symptoms, medications, and partner status. Bring to your doctor appointment.",
};

export default function DoctorReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
