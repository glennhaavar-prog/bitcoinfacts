"use client";

import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  FileText,
  FormInput,
  Loader2,
  Check,
  Edit3,
  Save,
  ArrowRight,
  Sparkles,
  Database,
  Users,
} from "lucide-react";
import type { ExtractedFact } from "@/lib/supabase/types";

type InputMode = "url" | "text" | "fact";
type Step = "input" | "processing" | "preview" | "submit" | "done";

export default function ContributePage() {
  const [mode, setMode] = useState<InputMode>("url");
  const [step, setStep] = useState<Step>("input");
  const [inputUrl, setInputUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [manualFact, setManualFact] = useState({
    claim_no: "", claim_en: "", source_name: "", source_url: "",
    source_date: "", category_slug: "energy",
  });
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [extractedFacts, setExtractedFacts] = useState<ExtractedFact[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [stats, setStats] = useState({ total: 0, community: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/facts?count=true");
        if (res.ok) { const data = await res.json(); setStats({ total: data.total || 0, community: data.community || 0 }); }
      } catch { /* silent */ }
    }
    loadStats();
  }, []);

  async function handleExtract() {
    if (mode === "url" && !inputUrl.trim()) return;
    if (mode === "text" && !inputText.trim()) return;
    setStep("processing"); setError(null); setExtractedFacts([]);
    try {
      const res = await fetch("/api/submissions/extract", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_type: mode, input_url: mode === "url" ? inputUrl : undefined, input_text: mode === "text" ? inputText : undefined }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Extraction failed"); }
      const data = await res.json();
      setExtractedFacts(data.facts || []); setStep("preview");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); setStep("input"); }
  }

  function handleManualFact() {
    if (!manualFact.claim_en.trim() || !manualFact.source_name.trim()) return;
    setExtractedFacts([{
      claim_no: manualFact.claim_no || manualFact.claim_en, claim_en: manualFact.claim_en,
      source_name: manualFact.source_name, source_date: manualFact.source_date || undefined,
      category_slug: manualFact.category_slug, tags: [], confidence: "needs-verification",
    }]);
    setStep("preview");
  }

  async function handleSubmit() {
    if (honeypot) return;
    setStep("submit"); setError(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: mode, input_url: mode === "url" ? inputUrl : undefined,
          input_text: mode === "text" ? inputText : undefined,
          display_name: displayName || "Anonymous", email: email || undefined,
          extracted_facts: extractedFacts,
        }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Submission failed"); }
      setStep("done");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong"); setStep("preview"); }
  }

  function updateFact(index: number, updates: Partial<ExtractedFact>) {
    setExtractedFacts((prev) => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  }

  const steps = [
    { key: "input", label: "Paste" }, { key: "processing", label: "AI processing" },
    { key: "preview", label: "Preview" }, { key: "submit", label: "Submit" },
  ];
  const stepOrder = ["input", "processing", "preview", "submit", "done"];
  const currentIndex = stepOrder.indexOf(step);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <p className="section-label mb-2">Community</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-2">
          Contribute Facts
        </h1>
        <p className="text-eb-muted max-w-lg mx-auto leading-relaxed">
          Help us build the world&apos;s best Bitcoin evidence database. Share an article, a claim, or a complete fact.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-eb-muted text-sm">
            <Database className="w-4 h-4 text-eb-gold" />
            <span><strong className="text-eb-navy">{stats.total}</strong> facts in the database</span>
          </div>
          <div className="flex items-center gap-2 text-eb-muted text-sm">
            <Users className="w-4 h-4 text-eb-gold" />
            <span><strong className="text-eb-navy">{stats.community}</strong> from community</span>
          </div>
        </div>
      </div>

      {step !== "done" && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${stepOrder.indexOf(s.key) <= currentIndex ? "bg-eb-gold text-white" : "bg-eb-surface-2 text-eb-subtle border border-eb-border"}`}>
                {stepOrder.indexOf(s.key) < currentIndex ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${stepOrder.indexOf(s.key) <= currentIndex ? "text-eb-slate" : "text-eb-subtle"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${stepOrder.indexOf(s.key) < currentIndex ? "bg-eb-gold" : "bg-eb-border"}`} />}
            </div>
          ))}
        </div>
      )}

      {step === "input" && (
        <div className="card p-6">
          <div className="flex gap-2 mb-6">
            {([{ value: "url" as const, label: "URL", icon: LinkIcon }, { value: "text" as const, label: "Text", icon: FileText }, { value: "fact" as const, label: "Fact", icon: FormInput }]).map((m) => (
              <button key={m.value} onClick={() => setMode(m.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === m.value ? "bg-eb-gold text-white" : "bg-eb-surface-2 text-eb-muted hover:text-eb-slate border border-eb-border"}`}>
                <m.icon className="w-4 h-4" />{m.label}
              </button>
            ))}
          </div>

          {mode === "url" && (<>
            <label className="block text-sm text-eb-muted mb-2">Paste a URL to an article with Bitcoin facts</label>
            <input type="url" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="https://..."
              className="input-field" />
            <button onClick={handleExtract} disabled={!inputUrl.trim()}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
              <Sparkles className="w-4 h-4" />Extract facts with AI
            </button>
          </>)}

          {mode === "text" && (<>
            <label className="block text-sm text-eb-muted mb-2">Write or paste text with claims and facts</label>
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Bitcoin mining now uses over 50% sustainable energy according to..." rows={6}
              className="input-field resize-none" />
            <button onClick={handleExtract} disabled={!inputText.trim()}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
              <Sparkles className="w-4 h-4" />Extract facts with AI
            </button>
          </>)}

          {mode === "fact" && (<>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-eb-muted mb-1">Claim (English) *</label>
                <input value={manualFact.claim_en} onChange={(e) => setManualFact({ ...manualFact, claim_en: e.target.value })} placeholder="Bitcoin mining uses 52.4% sustainable energy"
                  className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-eb-muted mb-1">Source *</label>
                  <input value={manualFact.source_name} onChange={(e) => setManualFact({ ...manualFact, source_name: e.target.value })} placeholder="Cambridge University"
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-eb-muted mb-1">Source URL</label>
                  <input value={manualFact.source_url} onChange={(e) => setManualFact({ ...manualFact, source_url: e.target.value })} placeholder="https://..."
                    className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-eb-muted mb-1">Date</label>
                  <input type="date" value={manualFact.source_date} onChange={(e) => setManualFact({ ...manualFact, source_date: e.target.value })}
                    className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-eb-muted mb-1">Category</label>
                  <select value={manualFact.category_slug} onChange={(e) => setManualFact({ ...manualFact, category_slug: e.target.value })}
                    className="input-field">
                    <option value="energy">Energy</option>
                    <option value="environment">Environment</option>
                    <option value="grid">Grid</option>
                    <option value="price">Prices</option>
                    <option value="adoption">Adoption</option>
                    <option value="academic">Academic</option>
                    <option value="myths">Myths</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={handleManualFact} disabled={!manualFact.claim_en.trim() || !manualFact.source_name.trim()}
              className="mt-4 flex items-center gap-2 px-6 py-3 bg-eb-gold hover:bg-eb-gold-dark disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
              <ArrowRight className="w-4 h-4" />Preview
            </button>
          </>)}
          {error && <p className="mt-3 text-eb-red text-sm">{error}</p>}
        </div>
      )}

      {step === "processing" && (
        <div className="card p-12 text-center">
          <Loader2 className="w-10 h-10 text-eb-gold animate-spin mx-auto mb-4" />
          <h3 className="font-serif text-lg font-semibold text-eb-navy mb-2">AI analyzing...</h3>
          <p className="text-eb-muted text-sm">Extracting facts from your content. This usually takes 10–30 seconds.</p>
        </div>
      )}

      {step === "preview" && (
        <div className="space-y-6">
          <div className="card p-4 bg-eb-gold-faint border-eb-gold/20 text-center">
            <p className="text-eb-gold text-sm font-medium">We found {extractedFacts.length} fact(s)! Edit if needed, add your name, and submit.</p>
          </div>
          {extractedFacts.map((fact, i) => (
            <div key={i} className="card p-5">
              {editingIndex === i ? (
                <div className="space-y-3">
                  <input value={fact.claim_en} onChange={(e) => updateFact(i, { claim_en: e.target.value })}
                    className="input-field" />
                  <button onClick={() => setEditingIndex(null)} className="flex items-center gap-1 px-3 py-1.5 bg-eb-gold text-white text-sm font-medium rounded-lg">
                    <Save className="w-3.5 h-3.5" /> Done
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-gold">{fact.category_slug}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${fact.confidence === "high" ? "bg-eb-green-faint text-eb-green" : fact.confidence === "medium" ? "bg-yellow-50 text-yellow-700" : "bg-eb-red-faint text-eb-red"}`}>
                        {fact.confidence}
                      </span>
                    </div>
                    <p className="text-eb-navy text-sm font-medium font-serif">{fact.claim_en || fact.claim_no}</p>
                    <p className="text-eb-muted text-xs mt-1">{fact.source_name}</p>
                  </div>
                  <button onClick={() => setEditingIndex(i)} className="p-2 rounded-lg hover:bg-eb-surface-2 text-eb-subtle hover:text-eb-slate transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="card p-6">
            <h3 className="font-serif text-sm font-semibold text-eb-navy mb-3">Your details (optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Name / nickname"
                className="input-field" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (for notifications)"
                className="input-field" />
            </div>
            <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute -left-[9999px] opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {error && <p className="mt-2 text-eb-red text-sm">{error}</p>}
            <button onClick={handleSubmit} className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold rounded-lg transition-colors">
              <ArrowRight className="w-4 h-4" />Submit for review
            </button>
          </div>
        </div>
      )}

      {step === "submit" && (
        <div className="card p-12 text-center">
          <Loader2 className="w-10 h-10 text-eb-gold animate-spin mx-auto mb-4" />
          <p className="text-eb-muted">Submitting...</p>
        </div>
      )}

      {step === "done" && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-eb-green-faint border border-eb-green/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-eb-green" />
          </div>
          <h3 className="font-serif text-xl font-bold text-eb-navy mb-2">Thank you!</h3>
          <p className="text-eb-muted text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Your contribution has been submitted and will be reviewed by an administrator. Expect a response within 24–48 hours.
          </p>
          <button onClick={() => { setStep("input"); setExtractedFacts([]); setInputUrl(""); setInputText(""); setError(null); }}
            className="px-6 py-2.5 bg-eb-surface-2 hover:bg-eb-border text-eb-slate rounded-lg text-sm font-medium transition-colors border border-eb-border">
            Submit more facts
          </button>
        </div>
      )}
    </div>
  );
}
