import { Download, BookOpen, Clock, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

const changelog = [
  {
    version: "1.0",
    date: "March 2026",
    changes: [
      "Initial release with 16 curated facts across 7 categories",
      "Daniel Batten's 4-principle communication framework",
      "180° reframe, admit-and-redefine, and question techniques",
      "FUD triage system (Fight / Ignore / Educate)",
      "Platform-specific formatting (X, LinkedIn, Facebook)",
      "Analogies library (EV, car radio, highway, space elevator, crumbs)",
    ],
  },
];

const sections = [
  {
    title: "Evidence Database",
    description:
      "16 curated, source-backed facts about Bitcoin mining across energy, environment, grid stability, prices, adoption, and academic research.",
    link: "/facts",
    linkLabel: "Browse database",
  },
  {
    title: "Communication Playbook",
    description:
      "Daniel Batten's 4 core principles, the 180° reframe technique, admit-and-redefine, question technique, FUD triage, effective analogies, and the 'never say' list.",
    link: "/playbook",
    linkLabel: "View playbook",
  },
  {
    title: "Research Tool",
    description:
      "AI-powered tool that combines the evidence database and playbook to generate ready-to-use responses tailored to any platform and tone.",
    link: "/agent",
    linkLabel: "Open tool",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <p className="section-label mb-2">Download & reference</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          Resources
        </h1>
        <p className="text-eb-muted max-w-2xl mx-auto leading-relaxed">
          Everything you need to respond to Bitcoin criticism with confidence.
          Download, read online, or use the research tool.
        </p>
      </div>

      {/* Download section */}
      <section className="card p-6 sm:p-8 mb-8 border-eb-gold/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-14 h-14 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-eb-gold" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-xl font-bold text-eb-navy mb-1">
              Complete Guide — PDF
            </h2>
            <p className="text-eb-muted text-sm mb-2 leading-relaxed">
              The full evidence database, communication playbook, and tactical
              reference in one document. Use it offline, share it with your
              team, or print it for reference.
            </p>
            <div className="flex items-center gap-3 text-xs text-eb-subtle">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Last updated: March 2026
              </span>
              <span>v1.0</span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/playbook"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-eb-surface-2 text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Read online
            </Link>
            <Link
              href="/guide"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-eb-navy mb-4">
          What&apos;s included
        </h2>
        <div className="space-y-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.link}
              className="card-hover p-5 flex items-center gap-4 group block"
            >
              <div className="flex-1">
                <h3 className="text-eb-navy font-semibold text-sm group-hover:text-eb-gold transition-colors font-serif">
                  {section.title}
                </h3>
                <p className="text-eb-muted text-xs mt-1 leading-relaxed">
                  {section.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-eb-subtle group-hover:text-eb-gold flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section>
        <h2 className="font-serif text-lg font-bold text-eb-navy mb-4">Changelog</h2>
        <div className="space-y-4">
          {changelog.map((entry) => (
            <div key={entry.version} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="badge-gold">v{entry.version}</span>
                <span className="text-eb-subtle text-xs">{entry.date}</span>
              </div>
              <ul className="space-y-1.5">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-2 text-eb-muted text-sm">
                    <span className="text-eb-gold mt-1.5 text-[8px]">●</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
