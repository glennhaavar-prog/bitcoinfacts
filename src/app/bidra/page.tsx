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
  Zap,
  Database,
  Users,
} from "lucide-react";
import type { ExtractedFact } from "@/lib/supabase/types";

type InputMode = "url" | "text" | "fact";
type Step = "input" | "processing" | "preview" | "submit" | "done";

export default function BidraPage() {
  const [mode, setMode] = useState<InputMode>("url");
  const [step, setStep] = useState<Step>("input");
  const [inputUrl, setInputUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [manualFact, setManualFact] = useState({
    claim_no: "",
    claim_en: "",
    source_name: "",
    source_url: "",
    source_date: "",
    category_slug: "energy",
  });
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [extractedFacts, setExtractedFacts] = useState<ExtractedFact[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [stats, setStats] = useState({ total: 0, community: 0 });

  // Load stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/facts?count=true");
        if (res.ok) {
          const data = await res.json();
          setStats({
            total: data.total || 0,
            community: data.community || 0,
          });
        }
      } catch {
        // Silent fail
      }
    }
    loadStats();
  }, []);

  async function handleExtract() {
    if (mode === "url" && !inputUrl.trim()) return;
    if (mode === "text" && !inputText.trim()) return;

    setStep("processing");
    setError(null);

    try {
      const res = await fetch("/api/submissions/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: mode,
          input_url: mode === "url" ? inputUrl : undefined,
          input_text: mode === "text" ? inputText : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Extraction failed");
      }

      const data = await res.json();
      setExtractedFacts(data.facts || []);
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
      setStep("input");
    }
  }

  function handleManualFact() {
    if (!manualFact.claim_no.trim() || !manualFact.source_name.trim()) return;

    setExtractedFacts([
      {
        claim_no: manualFact.claim_no,
        claim_en: manualFact.claim_en || manualFact.claim_no,
        source_name: manualFact.source_name,
        source_date: manualFact.source_date || undefined,
        category_slug: manualFact.category_slug,
        tags: [],
        confidence: "needs-verification",
      },
    ]);
    setStep("preview");
  }

  async function handleSubmit() {
    if (honeypot) return; // Bot trap

    setStep("submit");
    setError(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: mode,
          input_url: mode === "url" ? inputUrl : undefined,
          input_text: mode === "text" ? inputText : undefined,
          display_name: displayName || "Anonym",
          email: email || undefined,
          extracted_facts: extractedFacts,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
      setStep("preview");
    }
  }

  function updateFact(index: number, updates: Partial<ExtractedFact>) {
    setExtractedFacts((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...updates } : f))
    );
  }

  // Stepper
  const steps = [
    { key: "input", label: "Lim inn" },
    { key: "processing", label: "AI prosesserer" },
    { key: "preview", label: "Forhåndsvisning" },
    { key: "submit", label: "Send inn" },
  ];

  const stepOrder = ["input", "processing", "preview", "submit", "done"];
  const currentIndex = stepOrder.indexOf(step);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Bidra med <span className="gradient-text">fakta</span>
        </h1>
        <p className="text-dark-300 max-w-lg mx-auto">
          Hjelp oss bygge verdens beste Bitcoin-faktadatabase. Del en artikkel,
          en påstand eller et ferdig faktum.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-dark-400 text-sm">
            <Database className="w-4 h-4 text-bitcoin" />
            <span>
              <strong className="text-white">{stats.total}</strong> fakta i
              databasen
            </span>
          </div>
          <div className="flex items-center gap-2 text-dark-400 text-sm">
            <Users className="w-4 h-4 text-bitcoin" />
            <span>
              <strong className="text-white">{stats.community}</strong> fra
              community
            </span>
          </div>
        </div>
      </div>

      {/* Stepper */}
      {step !== "done" && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  stepOrder.indexOf(s.key) <= currentIndex
                    ? "bg-bitcoin text-dark-950"
                    : "bg-dark-700 text-dark-400"
                }`}
              >
                {stepOrder.indexOf(s.key) < currentIndex ? (
                  <Check className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs hidden sm:block ${
                  stepOrder.indexOf(s.key) <= currentIndex
                    ? "text-dark-200"
                    : "text-dark-500"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    stepOrder.indexOf(s.key) < currentIndex
                      ? "bg-bitcoin"
                      : "bg-dark-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step: Input */}
      {step === "input" && (
        <div className="card p-6">
          {/* Mode selector */}
          <div className="flex gap-2 mb-6">
            {[
              { value: "url" as const, label: "URL", icon: LinkIcon },
              { value: "text" as const, label: "Fritekst", icon: FileText },
              { value: "fact" as const, label: "Fakta", icon: FormInput },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  mode === m.value
                    ? "bg-bitcoin text-dark-950"
                    : "bg-dark-700 text-dark-300 hover:text-white"
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
          </div>

          {mode === "url" && (
            <>
              <label className="block text-sm text-dark-300 mb-2">
                Lim inn en URL til en artikkel med Bitcoin-fakta
              </label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
              />
              <button
                onClick={handleExtract}
                disabled={!inputUrl.trim()}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 text-dark-950 font-semibold rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                Ekstraher fakta med AI
              </button>
            </>
          )}

          {mode === "text" && (
            <>
              <label className="block text-sm text-dark-300 mb-2">
                Skriv eller lim inn tekst med påstander og fakta
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Bitcoin-mining bruker nå over 50% bærekraftig energi ifølge..."
                rows={6}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 resize-none focus:outline-none focus:border-bitcoin"
              />
              <button
                onClick={handleExtract}
                disabled={!inputText.trim()}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 text-dark-950 font-semibold rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                Ekstraher fakta med AI
              </button>
            </>
          )}

          {mode === "fact" && (
            <>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-dark-400 mb-1">
                    Påstand (norsk) *
                  </label>
                  <input
                    value={manualFact.claim_no}
                    onChange={(e) =>
                      setManualFact({ ...manualFact, claim_no: e.target.value })
                    }
                    placeholder="Bitcoin-mining bruker 52,4% bærekraftig energi"
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-400 mb-1">
                    Claim (English)
                  </label>
                  <input
                    value={manualFact.claim_en}
                    onChange={(e) =>
                      setManualFact({ ...manualFact, claim_en: e.target.value })
                    }
                    placeholder="Bitcoin mining uses 52.4% sustainable energy"
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-dark-400 mb-1">
                      Kilde *
                    </label>
                    <input
                      value={manualFact.source_name}
                      onChange={(e) =>
                        setManualFact({
                          ...manualFact,
                          source_name: e.target.value,
                        })
                      }
                      placeholder="Cambridge University"
                      className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-1">
                      Kilde-URL
                    </label>
                    <input
                      value={manualFact.source_url}
                      onChange={(e) =>
                        setManualFact({
                          ...manualFact,
                          source_url: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-dark-400 mb-1">
                      Dato
                    </label>
                    <input
                      type="date"
                      value={manualFact.source_date}
                      onChange={(e) =>
                        setManualFact({
                          ...manualFact,
                          source_date: e.target.value,
                        })
                      }
                      className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-1">
                      Kategori
                    </label>
                    <select
                      value={manualFact.category_slug}
                      onChange={(e) =>
                        setManualFact({
                          ...manualFact,
                          category_slug: e.target.value,
                        })
                      }
                      className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                    >
                      <option value="energy">⚡ Energi</option>
                      <option value="environment">🌱 Miljø</option>
                      <option value="grid">🔌 Strømnett</option>
                      <option value="price">💰 Priser</option>
                      <option value="adoption">🌍 Adopsjon</option>
                      <option value="academic">📚 Akademisk</option>
                      <option value="myths">🔍 Myter</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={handleManualFact}
                disabled={
                  !manualFact.claim_no.trim() ||
                  !manualFact.source_name.trim()
                }
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 text-dark-950 font-semibold rounded-lg transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Forhåndsvis
              </button>
            </>
          )}

          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
        </div>
      )}

      {/* Step: Processing */}
      {step === "processing" && (
        <div className="card p-12 text-center">
          <Loader2 className="w-10 h-10 text-bitcoin animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            AI analyserer...
          </h3>
          <p className="text-dark-400 text-sm">
            Vi ekstraherer fakta fra innholdet ditt. Dette tar vanligvis 10-30
            sekunder.
          </p>
        </div>
      )}

      {/* Step: Preview */}
      {step === "preview" && (
        <div className="space-y-6">
          <div className="card p-4 bg-bitcoin/5 border-bitcoin/20 text-center">
            <p className="text-bitcoin text-sm font-medium">
              Vi fant {extractedFacts.length} fakta! Rediger om nødvendig, legg
              til ditt navn, og send inn.
            </p>
          </div>

          {extractedFacts.map((fact, i) => (
            <div key={i} className="card p-5">
              {editingIndex === i ? (
                <div className="space-y-3">
                  <input
                    value={fact.claim_no}
                    onChange={(e) =>
                      updateFact(i, { claim_no: e.target.value })
                    }
                    className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                  />
                  <input
                    value={fact.claim_en}
                    onChange={(e) =>
                      updateFact(i, { claim_en: e.target.value })
                    }
                    className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                  />
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-bitcoin text-dark-950 text-sm font-medium rounded-lg"
                  >
                    <Save className="w-3.5 h-3.5" /> Ferdig
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-bitcoin/10 text-bitcoin text-xs">
                        {fact.category_slug}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          fact.confidence === "high"
                            ? "bg-green-400/10 text-green-400"
                            : fact.confidence === "medium"
                            ? "bg-yellow-400/10 text-yellow-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {fact.confidence}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium">
                      {fact.claim_no || fact.claim_en}
                    </p>
                    <p className="text-dark-400 text-xs mt-1">
                      {fact.source_name}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Contributor info */}
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-white mb-3">
              Dine detaljer (valgfritt)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Navn / kallenavn"
                className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-post (for notifikasjon)"
                className="bg-dark-700 border border-dark-600 rounded-lg px-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
              />
            </div>

            {/* Honeypot */}
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
              <p className="mt-2 text-red-400 text-sm">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-semibold rounded-lg transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Send inn til godkjenning
            </button>
          </div>
        </div>
      )}

      {/* Step: Submitting */}
      {step === "submit" && (
        <div className="card p-12 text-center">
          <Loader2 className="w-10 h-10 text-bitcoin animate-spin mx-auto mb-4" />
          <p className="text-dark-300">Sender inn...</p>
        </div>
      )}

      {/* Step: Done */}
      {step === "done" && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-400/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Takk!</h3>
          <p className="text-dark-300 text-sm max-w-md mx-auto mb-4">
            Bidraget ditt er sendt inn og vil bli gjennomgått av en
            administrator. Du kan forvente et svar innen 24-48 timer.
          </p>
          <button
            onClick={() => {
              setStep("input");
              setExtractedFacts([]);
              setInputUrl("");
              setInputText("");
              setError(null);
            }}
            className="px-6 py-2.5 bg-dark-700 hover:bg-dark-600 text-dark-200 rounded-lg text-sm font-medium transition-colors"
          >
            Send inn flere fakta
          </button>
        </div>
      )}
    </div>
  );
}
