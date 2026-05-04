import Link from "next/link";
import {
  ScrollText,
  Layers,
  Clock,
  ShieldCheck,
  AlertTriangle,
  GitPullRequest,
  Mail,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Methodology — The Bitcoin Evidence Base",
  description:
    "How we curate facts: source hierarchy, confidence ratings, recency rules, editorial principles, and how to report inaccuracies.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <p className="section-label mb-2">Transparency</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          Methodology
        </h1>
        <p className="text-eb-muted max-w-2xl mx-auto leading-relaxed">
          How facts are sourced, rated, kept current, and corrected. We
          prioritize peer-reviewed research and real-world data over theory,
          and recent evidence over older claims — because Bitcoin is a
          fast-evolving field.
        </p>
      </div>

      {/* Editorial position */}
      <section className="card p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <ScrollText className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Editorial position</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-3">
          The Bitcoin Evidence Base aims to be a <strong>one-stop reference for
          common claims about Bitcoin</strong> — energy and environment, money
          and volatility, security and quantum risk, regulation, decentralization,
          financial inclusion, and more. Every entry pairs a common claim with
          what peer-reviewed research and primary data actually show.
        </p>
        <p className="text-eb-slate text-sm leading-relaxed">
          We are not neutral on facts. Where the evidence is settled, we say so.
          Where it is contested or evolving, we say that too. Our goal is to
          inform, not persuade.
        </p>
      </section>

      {/* Source hierarchy */}
      <section className="card p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Layers className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Source hierarchy</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-4">
          Sources are ranked by independence, peer review, and proximity to
          primary data:
        </p>
        <ol className="space-y-3">
          {[
            {
              tier: 1,
              name: "Peer-reviewed academic research",
              examples: "Joule, Nature, Cell Reports, Andrew M. Bailey (NUS)",
            },
            {
              tier: 2,
              name: "Primary data from authoritative institutions",
              examples: "Cambridge CCAF, ERCOT, EIA, IPCC, NIST, World Bank",
            },
            {
              tier: 3,
              name: "Independent on-chain or industry analysis",
              examples: "Chainalysis, Glassnode, Bloomberg Intelligence, MIT DCI",
            },
            {
              tier: 4,
              name: "Industry reports with disclosed data",
              examples: "Galaxy Digital, CoinShares, BTC Policy Institute",
            },
            {
              tier: 5,
              name: "Recognized analysts with track record",
              examples: "Daniel Batten, Lyn Alden, Nic Carter, Alex Gladstein",
            },
            {
              tier: 6,
              name: "Quality journalism citing the above",
              examples: "BBC, WSJ, Reuters, Bloomberg, FT",
            },
          ].map((t) => (
            <li key={t.tier} className="flex items-start gap-3 p-3 rounded-lg bg-eb-surface-2 border border-eb-border">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center text-eb-gold font-semibold text-xs">
                {t.tier}
              </span>
              <div>
                <p className="text-eb-navy text-sm font-medium">{t.name}</p>
                <p className="text-eb-muted text-xs mt-0.5">e.g. {t.examples}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-eb-muted text-xs mt-4 leading-relaxed">
          When sources at different tiers disagree, we report the disagreement
          rather than picking a side. Where a peer-reviewed paper has been
          formally rebutted (e.g., by DARI), we mark the original claim as
          debunked and link the rebuttal.
        </p>
      </section>

      {/* Confidence ratings */}
      <section className="card p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Confidence ratings</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider border border-green-200">
              High
            </span>
            <p className="text-eb-slate text-sm leading-relaxed">
              Tier 1–3 sources, primary data, or multiple independent confirmations.
              The claim is well-established and we would defend it confidently.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-wider border border-yellow-200">
              Medium
            </span>
            <p className="text-eb-slate text-sm leading-relaxed">
              Tier 4–5 sources, single-source data, or fast-evolving topics where
              the evidence is reasonable but not yet conclusive.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-eb-surface-2 border border-eb-border">
            <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-eb-surface-2 text-eb-muted text-[10px] font-bold uppercase tracking-wider border border-eb-border">
              Low
            </span>
            <p className="text-eb-slate text-sm leading-relaxed">
              Theoretical arguments, contested topics, or claims where we&apos;re
              relying on a single analyst. Use with caveats.
            </p>
          </div>
        </div>
      </section>

      {/* Recency rule */}
      <section className="card p-6 sm:p-8 mb-6 border-eb-gold/30">
        <div className="flex items-start gap-3 mb-4">
          <Clock className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Recency rule</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-4">
          Bitcoin and its surrounding context — energy mix, mining geography,
          regulation, network topology — change quickly. Our priority order:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-eb-slate">
            <CheckCircle2 className="w-4 h-4 text-eb-gold flex-shrink-0" />
            <span>Peer-reviewed research <span className="text-eb-muted">(highest)</span></span>
          </div>
          <div className="flex items-center gap-2 text-eb-slate ml-6">
            <span className="text-eb-muted">→</span>
            <span>Non-peer-reviewed studies and real-world case studies</span>
          </div>
          <div className="flex items-center gap-2 text-eb-slate ml-12">
            <span className="text-eb-muted">→</span>
            <span>Theoretical arguments <span className="text-eb-muted">(lowest)</span></span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-eb-gold-faint border border-eb-gold-border">
          <p className="text-eb-navy text-sm leading-relaxed">
            <strong>Within each tier:</strong> recent (non-debunked) data and
            studies take precedence over older ones. Where a 2020 study has been
            superseded by 2024 data, we cite the newer source.
          </p>
        </div>
        <p className="text-eb-muted text-xs mt-4 leading-relaxed italic">
          Phrasing adapted from Daniel Batten&apos;s editorial guidance for this
          project.
        </p>
      </section>

      {/* Editorial principles */}
      <section className="card p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <ScrollText className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Editorial principles</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-4">
          We follow Daniel Batten&apos;s communication framework:
        </p>
        <ul className="space-y-2.5">
          <li className="flex items-start gap-2 text-sm">
            <span className="text-eb-gold font-semibold flex-shrink-0">🛡️</span>
            <span className="text-eb-slate">
              <strong className="text-eb-navy">Truth First.</strong> Acknowledge what is true
              in the criticism. Never exaggerate or spin.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-eb-gold font-semibold flex-shrink-0">💗</span>
            <span className="text-eb-slate">
              <strong className="text-eb-navy">Influence, don&apos;t just inform.</strong> Create
              emotional connection before presenting data.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-eb-gold font-semibold flex-shrink-0">🎯</span>
            <span className="text-eb-slate">
              <strong className="text-eb-navy">Check intention.</strong> Educate; don&apos;t try to win.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-eb-gold font-semibold flex-shrink-0">🏅</span>
            <span className="text-eb-slate">
              <strong className="text-eb-navy">Authority + humility.</strong> Cite sources; admit complexity.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm">
            <span className="text-eb-gold font-semibold flex-shrink-0">🌉</span>
            <span className="text-eb-slate">
              <strong className="text-eb-navy">&quot;Yes, and&quot; — never &quot;Yes, but&quot;.</strong>{" "}
              Acknowledge points without negating them.
            </span>
          </li>
        </ul>
      </section>

      {/* Reporting inaccuracies */}
      <section className="card p-6 sm:p-8 mb-6 bg-gradient-to-br from-eb-surface to-eb-gold-faint border-eb-gold/30">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">Found something outdated or incorrect?</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-4">
          The fastest way to keep this database current is for readers to flag
          issues. If you spot a fact that seems out of date, contradicted by
          newer research, or simply wrong — please tell us, ideally with the
          source that updates it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/contribute"
            className="card-hover p-4 flex items-center gap-3 group"
          >
            <GitPullRequest className="w-5 h-5 text-eb-gold flex-shrink-0" />
            <div>
              <p className="text-eb-navy text-sm font-semibold group-hover:text-eb-gold transition-colors">
                Submit a correction
              </p>
              <p className="text-eb-muted text-xs">
                Suggest a source via /contribute
              </p>
            </div>
          </Link>
          <a
            href="mailto:glenn@bitcoinbeyond66.com?subject=Bitcoin%20Evidence%20Base%20%E2%80%94%20correction"
            className="card-hover p-4 flex items-center gap-3 group"
          >
            <Mail className="w-5 h-5 text-eb-gold flex-shrink-0" />
            <div>
              <p className="text-eb-navy text-sm font-semibold group-hover:text-eb-gold transition-colors">
                Email the editor
              </p>
              <p className="text-eb-muted text-xs">
                glenn@bitcoinbeyond66.com
              </p>
            </div>
          </a>
        </div>
        <p className="text-eb-muted text-xs mt-4 leading-relaxed">
          Every fact we receive is reviewed manually before being added,
          updated, or archived. Public corrections to existing facts include a
          changelog entry on /resources.
        </p>
      </section>

      {/* AI tool */}
      <section className="card p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-eb-gold flex-shrink-0 mt-1" />
          <h2 className="font-serif text-xl font-bold text-eb-navy">About the AI research tool</h2>
        </div>
        <p className="text-eb-slate text-sm leading-relaxed mb-3">
          The AI assistant at <Link href="/agent" className="text-eb-gold hover:text-eb-gold-dark">/agent</Link>{" "}
          uses Anthropic&apos;s Claude Sonnet 4 with the entire fact database
          loaded as context. It does not invent facts — it draws from the same
          curated, sourced entries you can browse at{" "}
          <Link href="/facts" className="text-eb-gold hover:text-eb-gold-dark">/facts</Link>.
        </p>
        <p className="text-eb-slate text-sm leading-relaxed mb-3">
          The tool follows the editorial principles above: it acknowledges valid
          criticism, cites sources, and uses &quot;yes, and&quot; framing rather
          than dismissive rebuttal. It is bound by an instruction to address
          only what the user actually said — not import objections from related
          but different claims.
        </p>
        <p className="text-eb-muted text-xs leading-relaxed">
          If you see the AI generating something that misrepresents a source or
          makes up a citation, please report it via the channels above. We
          continually refine the system prompt to reduce these issues.
        </p>
      </section>

      {/* Related */}
      <section className="text-center pt-4">
        <p className="text-eb-muted text-sm mb-4">Related pages</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-eb-surface-2 hover:bg-eb-border text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
          >
            Resources & Changelog
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/playbook"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-eb-surface-2 hover:bg-eb-border text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
          >
            Communication Playbook
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-eb-surface-2 hover:bg-eb-border text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
          >
            About
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
