import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bitcoin FUD Buster — Faktagrunnede svar på Bitcoin-kritikk",
  description:
    "Noen du kjenner poster Bitcoin-FUD? Få et faktabasert svar på sekunder. Bygget med Daniel Battens kommunikasjonsplaybook.",
  openGraph: {
    title: "Bitcoin FUD Buster",
    description: "Faktagrunnede svar på Bitcoin-kritikk, på sekunder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
