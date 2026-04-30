import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Bitcoin Evidence Base — Evidence-based answers to claims about Bitcoin",
  description:
    "A curated database of peer-reviewed research and primary data on Bitcoin — energy, environment, security, adoption and more. Analyse claims with verified evidence from Cambridge University, ERCOT, and 22+ peer-reviewed studies.",
  openGraph: {
    title: "The Bitcoin Evidence Base",
    description:
      "Common claims about Bitcoin — and what peer-reviewed research actually shows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
