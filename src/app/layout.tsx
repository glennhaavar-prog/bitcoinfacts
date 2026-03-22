import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bitcoin FUD Buster — Fact-based responses to Bitcoin criticism",
  description:
    "Someone you know posting Bitcoin FUD? Get a fact-based response in seconds. Built with Daniel Batten's communication playbook.",
  openGraph: {
    title: "Bitcoin FUD Buster",
    description: "Fact-based responses to Bitcoin criticism, in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
