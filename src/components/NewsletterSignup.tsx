"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  /** Where the signup is rendered, for analytics. */
  source: string;
  /** Compact = small inline form. Card = full prominent CTA. */
  variant?: "card" | "compact";
}

/**
 * Reusable newsletter signup. Posts to /api/subscribe which handles dedup,
 * rate limiting and the double-opt-in confirmation email.
 *
 * - "card" variant: full prominent block with headline, body copy, CTA.
 * - "compact" variant: single-line form for footers / sidebars.
 */
export default function NewsletterSignup({ source, variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }
      setStatus(data.alreadySubscribed ? "already" : "success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading" || status === "success" || status === "already"}
          className="flex-1 bg-eb-surface-2 border border-eb-border rounded-lg px-3 py-2 text-sm text-eb-navy placeholder:text-eb-subtle focus:outline-none focus:border-eb-gold disabled:opacity-50"
        />
        {/* Honeypot — invisible to humans, often filled by bots. */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={!email.trim() || status === "loading" || status === "success" || status === "already"}
          className="px-4 py-2 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
           status === "success" || status === "already" ? <Check className="w-4 h-4" /> : null}
          {status === "success" ? "Check your inbox" :
           status === "already" ? "Already subscribed" :
           "Subscribe"}
        </button>
        {status === "error" && (
          <p className="text-eb-red text-xs">{errorMsg}</p>
        )}
      </form>
    );
  }

  return (
    <div className="card p-6 sm:p-8 bg-gradient-to-br from-eb-surface to-eb-gold-faint border border-eb-gold-border">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-eb-gold flex-shrink-0 items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-eb-navy mb-2">
            Get a daily Bitcoin claim — and the evidence to debunk it
          </h3>
          <p className="text-eb-muted text-sm leading-relaxed mb-4">
            One short email each morning: a common Bitcoin claim, what
            peer-reviewed research actually shows, and a tip for using it in a
            discussion. Free. Unsubscribe anytime.
          </p>
          {status === "success" ? (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-eb-green-faint border border-eb-green/20">
              <Check className="w-5 h-5 text-eb-green flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-eb-navy text-sm">Almost done!</p>
                <p className="text-eb-muted text-sm">
                  Check your inbox for a confirmation email. Click the link to
                  activate your subscription.
                </p>
              </div>
            </div>
          ) : status === "already" ? (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-eb-gold-faint border border-eb-gold/20">
              <Check className="w-5 h-5 text-eb-gold flex-shrink-0 mt-0.5" />
              <p className="text-eb-navy text-sm">
                You&apos;re already subscribed. Look for an email tomorrow morning.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === "loading"}
                className="flex-1 bg-white border border-eb-border rounded-lg px-3 py-2.5 text-sm text-eb-navy placeholder:text-eb-subtle focus:outline-none focus:border-eb-gold disabled:opacity-50"
              />
              {/* Honeypot — invisible to humans, often filled by bots. */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={!email.trim() || status === "loading"}
                className="px-5 py-2.5 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                Subscribe
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-eb-red text-xs">{errorMsg}</p>
          )}
          <p className="mt-3 text-eb-subtle text-xs">
            No spam. Unsubscribe with one click. We never share your email.
          </p>
        </div>
      </div>
    </div>
  );
}
