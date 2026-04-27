"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight, BookOpen, Mail } from "lucide-react";

type Step = "input" | "submitting" | "done";

export default function ContributePage() {
  const [step, setStep] = useState<Step>("input");
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Detect whether the submission is a URL or free text. We don't ask the user
  // to choose — they just paste, and we figure it out. Trims off leading/trailing
  // whitespace before the test so newlines around a pasted link don't trip us up.
  function classifyContent(raw: string): { type: "url" | "text"; url?: string; text?: string } {
    const trimmed = raw.trim();
    // A "URL submission" is one where the entire content is a single URL with no other prose.
    const looksLikeUrl = /^https?:\/\/\S+$/i.test(trimmed);
    if (looksLikeUrl) return { type: "url", url: trimmed };
    return { type: "text", text: trimmed };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // Bot trap — silently swallow.
    if (!content.trim()) return;

    setStep("submitting");
    setError(null);

    const { type, url, text } = classifyContent(content);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: type,
          input_url: url,
          input_text: text,
          display_name: displayName || "Anonymous",
          email: email || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("input");
    }
  }

  function reset() {
    setStep("input");
    setContent("");
    setDisplayName("");
    setEmail("");
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <p className="section-label mb-2">Help us build the database</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          Suggest a Source
        </h1>
        <p className="text-eb-muted max-w-lg mx-auto leading-relaxed">
          Found a study, article, or claim worth adding to the evidence base?
          Share it below — every submission is reviewed by an editor before
          publishing, ensuring high-quality, source-backed facts.
        </p>
      </div>

      {step === "input" && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-eb-navy mb-2">
              What would you like us to look at?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste a link to a study/article, paste the text of a claim or PDF excerpt, or describe what you'd like us to research."
              rows={7}
              className="input-field resize-none"
              required
            />
            <p className="mt-2 text-xs text-eb-muted">
              Tip: links to peer-reviewed studies, Cambridge reports, or
              well-sourced articles are most valuable. PDFs? Just paste the link
              or the relevant text.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-eb-muted mb-1 font-semibold uppercase tracking-wider">
                Your name (optional)
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Anonymous"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs text-eb-muted mb-1 font-semibold uppercase tracking-wider">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="So we can credit / follow up"
                className="input-field"
              />
            </div>
          </div>

          {/* Honeypot — invisible to humans, often filled by bots. */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {error && (
            <div className="p-3 rounded-lg bg-eb-red-faint border border-eb-red/20 text-eb-red text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Send to editor
          </button>

          <p className="text-center text-xs text-eb-subtle">
            Your submission is sent to the editor for review. We&apos;ll process
            it manually to ensure quality.
          </p>
        </form>
      )}

      {step === "submitting" && (
        <div className="card p-12 text-center">
          <Loader2 className="w-10 h-10 text-eb-gold animate-spin mx-auto mb-4" />
          <p className="text-eb-muted">Sending...</p>
        </div>
      )}

      {step === "done" && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-eb-green-faint border border-eb-green/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-eb-green" />
          </div>
          <h3 className="font-serif text-xl font-bold text-eb-navy mb-2">
            Thank you!
          </h3>
          <p className="text-eb-muted text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Your submission has been sent to the editor. We review every
            contribution manually and add high-quality sources to the database
            within a few days.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={reset}
              className="px-5 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Submit another
            </button>
            <a
              href="/facts"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-eb-surface-2 hover:bg-eb-border text-eb-slate rounded-lg text-sm font-medium transition-colors border border-eb-border"
            >
              <BookOpen className="w-4 h-4" />
              Browse the database
            </a>
          </div>
        </div>
      )}

      {/* Direct-email fallback for power users. */}
      <div className="mt-8 text-center">
        <p className="text-eb-subtle text-xs">
          Prefer email? Send directly to{" "}
          <a
            href="mailto:glenn@bitcoinbeyond66.com?subject=Bitcoin%20Facts%20—%20source%20suggestion"
            className="inline-flex items-center gap-1 text-eb-gold hover:text-eb-gold-dark"
          >
            <Mail className="w-3 h-3" />
            glenn@bitcoinbeyond66.com
          </a>
        </p>
      </div>
    </div>
  );
}
