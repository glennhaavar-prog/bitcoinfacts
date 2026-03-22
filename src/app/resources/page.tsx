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
    title: "Facts Database",
    description: "16 curated, source-backed facts about Bitcoin mining across energy, environment, grid stability, prices, adoption, and academic research.",
    link: "/facts",
    linkLabel: "Browse facts",
  },
  {
    title: "Communication Playbook",
    description: "Daniel Batten's 4 core principles, the 180° reframe technique, admit-and-redefine, question technique, FUD triage, effective analogies, and the 'never say' list.",
    link: "/playbook",
    linkLabel: "View playbook",
  },
  {
    title: "FUD Buster Agent",
    description: "AI-powered agent that combines the facts database and playbook to generate ready-to-use responses tailored to any platform and tone.",
    link: "/agent",
    linkLabel: "Try the agent",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          <span className="gradient-text">Resources</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Everything you need to respond to Bitcoin FUD with confidence.
          Download, read online, or use the AI agent.
        </p>
      </div>

      {/* Download section */}
      <section className="card p-6 sm:p-8 mb-8 border-bitcoin/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-14 h-14 rounded-xl bg-bitcoin/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-bitcoin" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">
              Bitcoin FUD Buster — Complete Guide
            </h2>
            <p className="text-dark-300 text-sm mb-2">
              The full fact database, communication playbook, and tactical
              reference in one document. Use it offline, share it with your team,
              or print it for reference.
            </p>
            <div className="flex items-center gap-3 text-xs text-dark-400">
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
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-dark-700 hover:bg-dark-600 text-dark-200 text-sm font-medium rounded-lg border border-dark-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Read online
            </Link>
            <a
              href="/bitcoin-fud-buster-guide.pdf"
              download
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 text-sm font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4">What&apos;s included</h2>
        <div className="space-y-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.link}
              className="card-hover p-5 flex items-center gap-4 group block"
            >
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm group-hover:text-bitcoin transition-colors">
                  {section.title}
                </h3>
                <p className="text-dark-400 text-xs mt-1">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-dark-500 group-hover:text-bitcoin flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Changelog</h2>
        <div className="space-y-4">
          {changelog.map((entry) => (
            <div key={entry.version} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-semibold">
                  v{entry.version}
                </span>
                <span className="text-dark-400 text-xs">{entry.date}</span>
              </div>
              <ul className="space-y-1.5">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                    <span className="text-bitcoin mt-1.5 text-[8px]">●</span>
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
