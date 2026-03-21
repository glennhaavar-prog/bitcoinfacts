"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SubmissionRow, ExtractedFact } from "@/lib/supabase/types";
import {
  Loader2,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Star,
} from "lucide-react";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    const { data } = await supabase
      .from("submissions")
      .select("*")
      .in("status", ["pending", "ready_for_review", "processing"])
      .order("created_at", { ascending: false });

    setSubmissions(data || []);
    setLoading(false);
  }

  async function handleAction(
    submissionId: string,
    action: "approved" | "rejected",
    factIndex?: number
  ) {
    setActionLoading(`${submissionId}-${action}-${factIndex ?? "all"}`);

    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          review_note: reviewNote,
          fact_index: factIndex,
        }),
      });

      if (response.ok) {
        setReviewNote("");
        await loadSubmissions();
      }
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Submissions-kø
        {submissions.length > 0 && (
          <span className="ml-2 text-sm font-normal text-dark-400">
            ({submissions.length} ventende)
          </span>
        )}
      </h1>

      {submissions.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-dark-400">Ingen ventende submissions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const facts = (sub.ai_extracted_facts || []) as ExtractedFact[];

            return (
              <div key={sub.id} className="card overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : sub.id)
                  }
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          sub.status === "ready_for_review"
                            ? "bg-bitcoin/10 text-bitcoin"
                            : sub.status === "processing"
                            ? "bg-blue-400/10 text-blue-400"
                            : "bg-dark-600 text-dark-300"
                        }`}
                      >
                        {sub.status}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-dark-600 text-dark-300 text-xs">
                        {sub.input_type}
                      </span>
                      {sub.ai_quality_score !== null && (
                        <span className="flex items-center gap-1 text-xs text-dark-400">
                          <Star className="w-3 h-3" />
                          {Math.round(sub.ai_quality_score * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-dark-200 text-sm truncate max-w-xl">
                      {sub.input_url || sub.input_text?.slice(0, 100)}
                    </p>
                    <p className="text-dark-500 text-xs mt-1">
                      {new Date(sub.created_at).toLocaleDateString("no-NB")}
                      {facts.length > 0 && ` · ${facts.length} fakta ekstrahert`}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-dark-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-dark-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-dark-700 pt-4">
                    {/* Raw input */}
                    <div className="p-4 rounded-lg bg-dark-900">
                      <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">
                        Rå input
                      </h4>
                      {sub.input_url && (
                        <a
                          href={sub.input_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bitcoin text-sm flex items-center gap-1 hover:underline"
                        >
                          {sub.input_url}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {sub.input_text && (
                        <p className="text-dark-300 text-sm whitespace-pre-wrap">
                          {sub.input_text}
                        </p>
                      )}
                    </div>

                    {/* AI Summary */}
                    {sub.ai_summary && (
                      <div className="p-4 rounded-lg bg-dark-900">
                        <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">
                          AI-oppsummering
                        </h4>
                        <p className="text-dark-200 text-sm">
                          {sub.ai_summary}
                        </p>
                      </div>
                    )}

                    {/* Duplicate warnings */}
                    {sub.ai_duplicate_check &&
                      (sub.ai_duplicate_check as unknown[]).length > 0 && (
                        <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                              Mulige duplikater
                            </h4>
                          </div>
                          {(
                            sub.ai_duplicate_check as Array<{
                              claim_preview: string;
                              similarity: string;
                            }>
                          ).map((dup, i) => (
                            <p
                              key={i}
                              className="text-dark-300 text-sm"
                            >
                              &ldquo;{dup.claim_preview}&rdquo; —{" "}
                              {dup.similarity}
                            </p>
                          ))}
                        </div>
                      )}

                    {/* Extracted facts */}
                    {facts.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
                          Ekstraherte fakta ({facts.length})
                        </h4>
                        <div className="space-y-3">
                          {facts.map((fact, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-lg bg-dark-900 border border-dark-700"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
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
                                  <p className="text-white text-sm font-medium mb-1">
                                    {fact.claim_no || fact.claim_en}
                                  </p>
                                  <p className="text-dark-400 text-xs">
                                    {fact.source_name}
                                    {fact.source_date &&
                                      ` · ${fact.source_date}`}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleAction(sub.id, "approved", i)
                                    }
                                    disabled={actionLoading !== null}
                                    className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                                    title="Godkjenn dette faktumet"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAction(sub.id, "rejected", i)
                                    }
                                    disabled={actionLoading !== null}
                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                    title="Avvis dette faktumet"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review note + bulk actions */}
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <label className="block text-xs text-dark-400 mb-1">
                          Notat (valgfritt)
                        </label>
                        <input
                          type="text"
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                          placeholder="Begrunnelse for godkjenning/avvisning..."
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                        />
                      </div>
                      <button
                        onClick={() => handleAction(sub.id, "approved")}
                        disabled={actionLoading !== null}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        Godkjenn alle
                      </button>
                      <button
                        onClick={() => handleAction(sub.id, "rejected")}
                        disabled={actionLoading !== null}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        Avvis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
