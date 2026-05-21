import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Veronica Bloom team. Questions about your program, billing or partnerships — we're here to help.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
