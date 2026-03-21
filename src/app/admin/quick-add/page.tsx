"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ExtractedFact } from "@/lib/supabase/types";
import {
  Loader2,
  Link as LinkIcon,
  FileText,
  Check,
  Edit3,
  Save,
  Zap,
} from "lucide-react";

export default function QuickAddPage() {
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [inputValue, setInputValue] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractedFacts, setExtractedFacts] = useState<ExtractedFact[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  async function handleExtract() {
    if (!inputValue.trim()) return;
    setExtracting(true);
    setError(null);
    setExtractedFacts([]);

    try {
      const res = await fetch("/api/submissions/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: inputType,
          input_url: inputType === "url" ? inputValue : undefined,
          input_text: inputType === "text" ? inputValue : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Extraction failed");
      }

      const data = await res.json();
      setExtractedFacts(data.facts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setExtracting(false);
    }
  }

  async function handlePublish() {
    if (extractedFacts.length === 0) return;
    setPublishing(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facts: extractedFacts }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Publishing failed");
      }

      setPublished(true);
      setExtractedFacts([]);
      setInputValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setPublishing(false);
    }
  }

  function updateFact(index: number, updates: Partial<ExtractedFact>) {
    setExtractedFacts((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...updates } : f))
    );
  }

  function removeFact(index: number) {
    setExtractedFacts((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Quick Add
        <span className="ml-2 text-sm font-normal text-dark-400">
          URL → AI → Publiser
        </span>
      </h1>

      {published && (
        <div className="card p-4 mb-6 bg-green-500/5 border-green-500/20">
          <div className="flex items-center gap-2 text-green-400">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">
              Fakta publisert! De er nå tilgjengelige i databasen.
            </span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="card p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputType("url")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputType === "url"
                ? "bg-bitcoin text-dark-950"
                : "bg-dark-700 text-dark-300"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            URL
          </button>
          <button
            onClick={() => setInputType("text")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputType === "text"
                ? "bg-bitcoin text-dark-950"
                : "bg-dark-700 text-dark-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            Tekst
          </button>
        </div>

        {inputType === "url" ? (
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://artikkel-url.com/..."
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
          />
        ) : (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Lim inn tekst med fakta..."
            rows={6}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 resize-none focus:outline-none focus:border-bitcoin"
          />
        )}

        {error && (
          <p className="mt-2 text-red-400 text-sm">{error}</p>
        )}

        <button
          onClick={handleExtract}
          disabled={extracting || !inputValue.trim()}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 text-dark-950 font-semibold rounded-lg transition-colors"
        >
          {extracting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              AI ekstraherer...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Ekstraher fakta
            </>
          )}
        </button>
      </div>

      {/* Extracted facts */}
      {extractedFacts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Ekstraherte fakta ({extractedFacts.length})
            </h2>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              {publishing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Publiser alle
            </button>
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
                    placeholder="Påstand (NO)"
                    className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                  />
                  <input
                    value={fact.claim_en}
                    onChange={(e) =>
                      updateFact(i, { claim_en: e.target.value })
                    }
                    placeholder="Claim (EN)"
                    className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                  />
                  <input
                    value={fact.source_name}
                    onChange={(e) =>
                      updateFact(i, { source_name: e.target.value })
                    }
                    placeholder="Kilde"
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
                            : "bg-yellow-400/10 text-yellow-400"
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
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFact(i)}
                      className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-red-400"
                    >
                      <span className="text-xs font-bold">✕</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
