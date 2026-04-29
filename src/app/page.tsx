import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquare, Copy, Target, Zap } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Paste the claim",
    description:
      "Copy a comment from social media or paste any Bitcoin criticism into the research tool.",
  },
  {
    icon: Target,
    number: "02",
    title: "Choose platform & tone",
    description:
      "The tool adapts the response for X, LinkedIn, Facebook or general use.",
  },
  {
    icon: Copy,
    number: "03",
    title: "Copy the response",
    description:
      "Get a fact-based, source-backed response ready to use — in seconds.",
  },
];

// Fallback highlights if Supabase is unavailable
const fallbackHighlights = [
  { fact: "Bitcoin mining uses 52.4% sustainable energy — the only global industry verified above the 50% threshold.", source: "Cambridge University, April 2025" },
  { fact: "In Norway, electricity prices rose 20% immediately after a Bitcoin mining operation left the grid.", source: "Norwegian grid data, Sept 2024" },
  { fact: "Texas saved $18 billion by using Bitcoin miners as flexible load instead of building gas peaker plants.", source: "Digital Assets Research Institute" },
  { fact: "Bitcoin mining can utilize up to 98% of available solar energy and 92% of wind energy that would otherwise be wasted.", source: "Lai & You, Cornell University" },
  { fact: "Gridless delivers renewable energy to ~28,000 people across four African villages — funded by Bitcoin mining.", source: "Gridless" },
  { fact: "22 media publications, including BBC, WSJ and Bloomberg, have now run stories on Bitcoin mining's environmental benefits.", source: "Daniel Batten, media analysis" },
];

async function getHighlights() {
  try {
    const supabase = createAdminClient();
    // Select reality_en (what the evidence actually shows), not claim_en (the FUD claim being debunked).
    // Filter out rebuttals and myths so the homepage leads with positive, evidence-first findings.
    const { data } = await supabase
      .from("facts")
      .select("reality_en, source_name, source_date, categories(slug)")
      .eq("status", "published")
      .not("reality_en", "is", null)
      .order("created_at", { ascending: false })
      .limit(30);
    if (data && data.length > 0) {
      const filtered = data.filter((f) => {
        const slug = (f.categories as { slug?: string } | null)?.slug;
        return slug !== "rebuttals" && slug !== "myths";
      });
      const picks = (filtered.length >= 6 ? filtered : data).slice(0, 6);
      return picks.map((f) => {
        const reality = (f.reality_en || "").trim();
        // Take first 2 sentences for a concise highlight card
        const firstSentences = reality.match(/^[^.!?]+[.!?]+(\s+[^.!?]+[.!?]+)?/);
        const trimmed = firstSentences ? firstSentences[0].trim() : reality;
        return {
          fact: trimmed,
          source: `${f.source_name}${f.source_date ? `, ${new Date(f.source_date).getFullYear()}` : ""}`,
        };
      });
    }
  } catch { /* fall through */ }
  return fallbackHighlights;
}

export default async function HomePage() {
  const highlights = await getHighlights();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-eb-bg">
        {/* Subtle paper texture gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-eb-gold/4 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eb-gold-faint border border-eb-gold-border text-eb-gold text-xs font-semibold mb-6 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Evidence-based research
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-eb-navy leading-tight">
              The Bitcoin{" "}
              <span className="gradient-text">Evidence Base</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-eb-muted max-w-2xl mx-auto leading-relaxed">
              Common claims about Bitcoin — and what peer-reviewed research
              actually shows. Verified evidence from Cambridge University,
              ERCOT, and 22+ academic studies.
            </p>
            <p className="mt-3 text-sm text-eb-subtle max-w-xl mx-auto">
              Built on Daniel Batten&apos;s communication playbook — designed
              to inform, not persuade.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/agent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-base rounded-xl transition-all hover:shadow-card-md"
              >
                Open Research Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/facts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-eb-surface-2 text-eb-navy font-semibold text-base rounded-xl border border-eb-border transition-all hover:border-eb-gold/40"
              >
                Browse Evidence Database
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider rule — academic style */}
      <div className="border-t border-eb-border" />

      {/* How it works */}
      <section className="py-20 bg-eb-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Methodology</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy">
              How the Research Tool works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="card p-8 text-center relative">
                <div className="absolute top-5 right-5 font-mono text-xs font-bold text-eb-border-strong">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-eb-gold" />
                </div>
                <h3 className="font-serif text-base font-bold text-eb-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-eb-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <div className="border-t border-eb-border" />
      <section className="py-20 bg-eb-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Research Highlights</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy mb-3">
              What the evidence shows
            </h2>
            <p className="text-eb-muted max-w-2xl mx-auto text-sm leading-relaxed">
              Key findings from peer-reviewed research on Bitcoin — energy,
              environment, security, adoption and more.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <div key={i} className="card-hover p-6">
                <div className="w-9 h-9 rounded-lg bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mb-4">
                  <Zap className="w-4 h-4 text-eb-gold" />
                </div>
                <p className="text-eb-navy text-sm leading-relaxed mb-3 font-medium">
                  {item.fact}
                </p>
                <p className="text-eb-subtle text-xs">
                  Source: {item.source}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/facts"
              className="inline-flex items-center gap-2 text-sm text-eb-gold hover:text-eb-gold-dark font-semibold transition-colors"
            >
              View full Evidence Database
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-eb-border" />
      <section className="py-20 bg-eb-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Get started</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy mb-4">
            Ready to examine the evidence?
          </h2>
          <p className="text-eb-muted mb-8 leading-relaxed">
            Paste any claim about Bitcoin and get a professional, source-backed
            response based on peer-reviewed research.
          </p>
          <Link
            href="/agent"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-base rounded-xl transition-all hover:shadow-card-md"
          >
            Open Research Tool
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
