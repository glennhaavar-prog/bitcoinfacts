"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agent", label: "Research Tool" },
  { href: "/facts", label: "Evidence Database" },
  { href: "/contribute", label: "Contribute" },
  { href: "/playbook", label: "Playbook" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-sm border-b border-eb-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-eb-gold flex items-center justify-center flex-shrink-0 group-hover:bg-eb-gold-dark transition-colors">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-serif font-bold text-[15px] text-eb-navy block">
                The Bitcoin
              </span>
              <span className="font-serif font-semibold text-[15px] text-eb-gold block">
                Evidence Base
              </span>
            </div>
            <span className="sm:hidden font-serif font-bold text-[15px] text-eb-navy">
              Evidence Base
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-eb-gold font-medium bg-eb-gold-faint"
                    : "text-eb-muted font-medium hover:text-eb-navy hover:bg-eb-surface-2"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/agent"
              className="px-4 py-2 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Open Research Tool
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-eb-muted hover:text-eb-navy rounded-lg hover:bg-eb-surface-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-eb-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-eb-gold bg-eb-gold-faint"
                    : "text-eb-slate hover:text-eb-navy hover:bg-eb-surface-2"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agent"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 px-4 py-3 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold rounded-lg text-center transition-colors text-sm"
            >
              Open Research Tool
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
