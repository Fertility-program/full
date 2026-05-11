import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/PageTransition";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: {
    default: "Veronica Bloom | The Complete Fertility Wellness Program",
    template: "%s | Veronica Bloom",
  },
  description:
    "The complete fertility wellness program: cycle-synced exercises, fertility nutrition under €7/day, supplement guide and daily support for women trying to conceive.",
  manifest: "/manifest.json",
  keywords: [
    "fertility program",
    "fertility exercises",
    "fertility meal plan",
    "fertility supplements",
    "trying to conceive",
    "cycle synced workouts",
    "ovulation support",
    "PCOS exercises",
    "fertility nutrition",
    "reproductive wellness",
  ],
  openGraph: {
    title: "Veronica Bloom | The Complete Fertility Wellness Program",
    description:
      "Cycle-synced exercises, fertility nutrition and supplement guidance for women on their conception journey.",
    type: "website",
    locale: "en_US",
    siteName: "Veronica Bloom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veronica Bloom | The Complete Fertility Wellness Program",
    description:
      "Cycle-synced exercises, fertility meals under €7/day, supplement guide. The complete fertility program for women trying to conceive.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="alternate" type="application/rss+xml" title="Veronica Bloom Blog" href="/feed.xml" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ""} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#5ba89d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Veronica Bloom" />
        {/* Dark mode — sprečava flash of light mode */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("darkMode")==="true")document.documentElement.classList.add("dark")}catch(e){}` }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Veronica Bloom",
              description:
                "The complete fertility wellness program: cycle-synced exercises, fertility nutrition and supplement guidance for women trying to conceive.",
              url: "https://veronica-bloom.vercel.app",
              applicationCategory: "HealthApplication",
              offers: [
                {
                  "@type": "Offer",
                  name: "Bloom Plan",
                  price: "29",
                  priceCurrency: "EUR",
                  description: "30-day fertility wellness program",
                },
                {
                  "@type": "Offer",
                  name: "Elite Plan",
                  price: "79",
                  priceCurrency: "EUR",
                  description: "90-day premium fertility transformation program",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="text-[#3d2b32]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#d8a7b5] focus:text-white focus:text-sm"
        >
          Skip to content
        </a>
        <div className="min-h-screen relative flex flex-col">
          <div
            className="fixed inset-0 -z-20"
            style={{
              background:
                "linear-gradient(180deg, #e0eeeb 0%, #d8e8e4 50%, #cfe3de 100%)",
            }}
          />
          <div
            className="fixed inset-0 -z-10 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 90% 5%, rgba(91,168,157,.12), transparent 15%), radial-gradient(circle at 5% 85%, rgba(70,140,125,.10), transparent 18%)",
            }}
          />
          <div className="fixed top-10 -left-16 w-48 h-48 rounded-full bg-[#8dc4b8] blur-3xl opacity-15 -z-10" />
          <div className="fixed bottom-10 -right-16 w-56 h-56 rounded-full bg-[#7ab8aa] blur-3xl opacity-15 -z-10" />

          <Header />

          <main id="main-content" className="relative z-10 flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          <Footer />
          <ClientShell />
        </div>
      </body>
    </html>
  );
}
