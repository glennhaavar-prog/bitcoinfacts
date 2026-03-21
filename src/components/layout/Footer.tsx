import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-dark-800 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-bitcoin flex items-center justify-center">
                <Zap className="w-5 h-5 text-dark-950" />
              </div>
              <span className="font-bold text-lg text-white">FUD Buster</span>
            </div>
            <p className="text-dark-300 text-sm max-w-md">
              Faktagrunnede svar på Bitcoin-kritikk. Bygget med Daniel Battens
              kommunikasjonsplaybook og verifisert forskning.
            </p>
            <p className="text-dark-400 text-xs mt-4">
              Et Beyond 66-prosjekt
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Navigasjon</h3>
            <ul className="space-y-2">
              {[
                { href: "/agent", label: "FUD Buster Agent" },
                { href: "/fakta", label: "Faktabibliotek" },
                { href: "/playbook", label: "Playbook" },
                { href: "/om", label: "Om prosjektet" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-300 hover:text-bitcoin transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Ressurser</h3>
            <ul className="space-y-2">
              {[
                { href: "https://batcoinz.com", label: "Daniel Batten" },
                { href: "https://ccaf.io/cbnsi/cbeci", label: "Cambridge CBECI" },
                { href: "https://woocharts.com/esg-bitcoin-mining-sustainability/", label: "WooCharts ESG" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-dark-300 hover:text-bitcoin transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800 text-center">
          <p className="text-dark-400 text-xs">
            &copy; {new Date().getFullYear()} Bitcoin FUD Buster. Open source — MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
