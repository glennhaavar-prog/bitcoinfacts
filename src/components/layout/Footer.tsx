import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-eb-border bg-eb-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-eb-gold flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-serif font-bold text-sm text-eb-navy block">
                  The Bitcoin Evidence Base
                </span>
              </div>
            </div>
            <p className="text-eb-muted text-sm max-w-md leading-relaxed">
              A curated database of peer-reviewed research on Bitcoin mining,
              energy use, and environmental impact. Evidence-based, not
              rhetoric.
            </p>
            <a
              href="https://www.bitcoinbeyond66.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-eb-gold hover:text-eb-gold-dark text-sm font-medium transition-colors"
            >
              A Beyond 66 project
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-eb-navy text-xs uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/agent", label: "Research Tool" },
                { href: "/facts", label: "Evidence Database" },
                { href: "/playbook", label: "Playbook" },
                { href: "/resources", label: "Resources" },
                { href: "/contribute", label: "Contribute" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-eb-muted hover:text-eb-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Sources */}
          <div>
            <h3 className="font-semibold text-eb-navy text-xs uppercase tracking-wider mb-3">
              Key Sources
            </h3>
            <ul className="space-y-2">
              {[
                { href: "https://www.bitcoinbeyond66.com", label: "Bitcoin Beyond 66" },
                { href: "https://batcoinz.com", label: "Daniel Batten" },
                { href: "https://ccaf.io/cbnsi/cbeci", label: "Cambridge CBECI" },
                {
                  href: "https://woocharts.com/esg-bitcoin-mining-sustainability/",
                  label: "WooCharts ESG",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-eb-muted hover:text-eb-gold transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-eb-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-eb-subtle text-xs">
            &copy; {new Date().getFullYear()} The Bitcoin Evidence Base. All
            rights reserved.
          </p>
          <a
            href="https://www.bitcoinbeyond66.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-eb-subtle hover:text-eb-gold text-xs transition-colors"
          >
            bitcoinbeyond66.com ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
