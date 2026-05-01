import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Lightbulb, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Daily Bitcoin Newsletter — The Bitcoin Evidence Base",
  description:
    "One short email each morning: a common Bitcoin claim, what peer-reviewed research actually shows, and a tip for using it in a discussion. Free. Unsubscribe anytime.",
  openGraph: {
    title: "Daily Bitcoin Claim + Evidence Newsletter",
    description: "A common claim, what the evidence shows, and how to use it. Free, daily, no spam.",
    type: "website",
  },
};

export default function SubscribePage() {
  return (
    <div className="bg-eb-bg">
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Free daily newsletter</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-eb-navy leading-tight mb-5">
            One Bitcoin claim. The evidence to debunk it.
            <br />
            <span className="gradient-text">In your inbox each morning.</span>
          </h1>
          <p className="text-lg text-eb-muted max-w-2xl mx-auto leading-relaxed mb-8">
            Become the most well-informed person in any Bitcoin discussion. We
            send one short email a day — a common claim, peer-reviewed evidence,
            and a tip for how to respond.
          </p>
          <div className="max-w-xl mx-auto">
            <NewsletterSignup source="subscribe-page-hero" variant="card" />
          </div>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-16 bg-eb-surface border-y border-eb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">What you&apos;ll get</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy">
              Each email follows a simple, consistent format
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={AlertCircle}
              title="The claim"
              text="A common Bitcoin criticism — usually one you've actually heard online or from friends."
            />
            <FeatureCard
              icon={CheckCircle2}
              title="The evidence"
              text="What peer-reviewed research, primary data, and reputable institutions actually show. With sources."
            />
            <FeatureCard
              icon={Lightbulb}
              title="How to use it"
              text="A specific tip from Daniel Batten's communication playbook for using the fact effectively in a discussion."
            />
          </div>
        </div>
      </section>

      {/* Email preview mockup */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="section-label mb-2">Sample email</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy">
              Here&apos;s what tomorrow morning could look like
            </h2>
          </div>
          <div className="bg-white border border-eb-border rounded-xl shadow-card overflow-hidden">
            <div className="bg-eb-surface-2 border-b border-eb-border px-5 py-3 text-xs text-eb-muted">
              <strong className="text-eb-navy">From:</strong> Bitcoin Facts &lt;notifications@bitcoinbeyond66.com&gt;<br />
              <strong className="text-eb-navy">Subject:</strong> 🟠 Bitcoin uses too much energy
            </div>
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-eb-gold-faint border border-eb-gold-border text-eb-gold text-[10px] font-bold uppercase tracking-wider mb-3">
                ⚡ Energy &amp; Sustainability
              </div>
              <div className="inline-block ml-2 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-wider mb-3">
                ⚠ Common claim
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-eb-navy italic mb-5">
                &ldquo;Bitcoin uses too much energy&rdquo;
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider mb-2">
                  ✓ What the evidence shows
                </p>
                <p className="text-eb-slate text-sm leading-relaxed">
                  &quot;Too much&quot; is a value judgment. Cambridge University states
                  comparing industries to total energy use is &quot;presenter bias.&quot;
                  The IPCC consensus focuses on transforming the energy
                  system, not reducing total energy use. Bitcoin is 52.4%
                  sustainable (Cambridge 2025), uses stranded/curtailed
                  energy, and enables grid stabilization and methane
                  mitigation...
                </p>
              </div>
              <div className="bg-eb-gold-faint border border-eb-gold-border rounded-lg p-4 mb-4">
                <p className="text-[11px] font-bold text-eb-gold uppercase tracking-wider mb-2">
                  💡 How to use this in a discussion
                </p>
                <p className="text-eb-slate text-sm leading-relaxed">
                  Quote Cambridge directly on &quot;presenter bias&quot; for country
                  comparisons. Then reframe using IPCC criteria — Bitcoin
                  mining meets all three transformation requirements.
                </p>
              </div>
              <p className="text-eb-muted text-xs">
                <strong>Source:</strong> Cambridge University / IPCC Assessment Reports
              </p>
            </div>
          </div>
          <p className="text-center text-eb-subtle text-xs mt-4">
            Real emails include a tasteful Bitcoin Beyond 66 footer + one-click unsubscribe.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-eb-surface border-t border-eb-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">FAQ</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            <Faq
              q="How often will I get emails?"
              a="One email per day, sent around 07:00 CET (08:00 CEST in summer)."
            />
            <Faq
              q="Will you spam me?"
              a="No. One email per day, that's it. We don't send promotions, surveys, or other lists. The footer has a small mention of Bitcoin Beyond 66 (Norway's Bitcoin conference, August 14, 2026) — that's the closest thing to a promotion you'll see."
            />
            <Faq
              q="Can I unsubscribe?"
              a="Yes — every email has a one-click unsubscribe link at the bottom. No login or confirmation needed."
            />
            <Faq
              q="What language are the emails in?"
              a="English by default. Norwegian (Bokmål) coming soon — you'll be able to switch in settings."
            />
            <Faq
              q="Where do the facts come from?"
              a="The Bitcoin Evidence Base — our curated database of 115+ peer-reviewed studies, Cambridge research, ERCOT data, and reports from named analysts. Each fact is sourced and dated."
            />
            <Faq
              q="Will you sell or share my email?"
              a="Never. We collect your email solely to send you the newsletter. We don't sell it, share it, or use it for any other purpose. You can request deletion at any time by emailing glenn@bitcoinbeyond66.com."
            />
            <Faq
              q="Why double opt-in?"
              a="To protect your inbox and our sender reputation. After signup you'll receive a confirmation email — click the link to activate. This ensures only real, intentional subscribers are on the list."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy mb-4">
            Ready to start your day with evidence?
          </h2>
          <p className="text-eb-muted mb-8 leading-relaxed">
            Join the daily list. Become the most well-prepared person in any
            Bitcoin discussion. Unsubscribe whenever you want.
          </p>
          <div className="max-w-xl mx-auto">
            <NewsletterSignup source="subscribe-page-bottom" variant="card" />
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-eb-subtle text-xs">
            <Lock className="w-3 h-3" />
            <span>GDPR-compliant. Double opt-in. Unsubscribe anytime.</span>
          </div>
          <p className="mt-6 text-eb-muted text-sm">
            Or, <Link href="/agent" className="text-eb-gold hover:text-eb-gold-dark font-medium">try the AI research tool</Link> first.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="card p-6">
      <div className="w-10 h-10 rounded-lg bg-eb-gold-faint border border-eb-gold-border flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-eb-gold" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-eb-navy mb-2">{title}</h3>
      <p className="text-eb-muted text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-eb-navy text-sm mb-2 flex items-start gap-2">
        <MessageSquare className="w-4 h-4 text-eb-gold mt-0.5 flex-shrink-0" />
        {q}
      </h3>
      <p className="text-eb-muted text-sm leading-relaxed">{a}</p>
    </div>
  );
}

