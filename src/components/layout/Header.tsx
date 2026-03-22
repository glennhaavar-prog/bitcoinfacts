"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agent", label: "FUD Buster" },
  { href: "/facts", label: "Facts" },
  { href: "/playbook", label: "Playbook" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-bitcoin flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-dark-950" />
            </div>
            <span className="font-bold text-lg text-white">
              FUD Buster
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-dark-200 hover:text-bitcoin transition-colors rounded-lg hover:bg-dark-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/agent"
              className="px-4 py-2 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-semibold text-sm rounded-lg transition-colors"
            >
              Bust some FUD
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-200 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-900 border-b border-dark-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-dark-200 hover:text-bitcoin hover:bg-dark-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agent"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-semibold rounded-lg text-center transition-colors"
            >
              Bust some FUD
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
