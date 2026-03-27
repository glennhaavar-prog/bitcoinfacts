"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Loader2,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

interface ExampleResponse {
  id: string;
  fud_text: string;
  ideal_response: string;
  fud_type: string | null;
  platform: string;
  tone: string;
  strategy: string | null;
  notes: string | null;
  created_at: string;
}

const fudTypes = [
  { value: "", label: "— None —" },
  { value: "energy", label: "Energy" },
  { value: "ponzi", label: "Ponzi/Bubble" },
  { value: "criminal", label: "Criminal use" },
  { value: "useless", label: "No real use" },
  { value: "grid", label: "Grid/Capacity" },
  { value: "environment", label: "Environment" },
  { value: "skepticism", label: "Skepticism" },
  { value: "other", label: "Other" },
];

const platforms = [
  { value: "general", label: "General" },
  { value: "x", label: "X/Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
];

const tones = [
  { value: "balanced", label: "Balanced" },
  { value: "direct", label: "Direct" },
  { value: "soft", label: "Soft" },
];

const strategies = [
  { value: "", label: "— None —" },
  { value: "180-reframe", label: "180° Reframe" },
  { value: "admit-and-redefine", label: "Admit & Redefine" },
  { value: "question", label: "Question Technique" },
  { value: "combined", label: "Combined" },
];

export default function AdminExamplesPage() {
  const [examples, setExamples] = useState<ExampleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ExampleResponse>>({});
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newExample, setNewExample] = useState({
    fud_text: "",
    ideal_response: "",
    fud_type: "",
    platform: "general",
    tone: "balanced",
    strategy: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const loadExamples = useCallback(async () => {
    try {
      const { data, error: queryErr } = await supabase
        .from("example_responses")
        .select("*")
        .order("created_at", { ascending: false });
      if (queryErr) throw queryErr;
      setExamples(data || []);
    } catch (err) {
      console.error("Examples load error:", err);
      setError("Could not load examples. The example_responses table may not exist yet.");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadExamples();
  }, [loadExamples]);

  async function handleAdd() {
    if (!newExample.fud_text.trim() || !newExample.ideal_response.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/examples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newExample,
        fud_type: newExample.fud_type || null,
        strategy: newExample.strategy || null,
        notes: newExample.notes || null,
      }),
    });
    if (res.ok) {
      setAdding(false);
      setNewExample({ fud_text: "", ideal_response: "", fud_type: "", platform: "general", tone: "balanced", strategy: "", notes: "" });
      loadExamples();
    }
    setSaving(false);
  }

  async function handleSave(id: string) {
    setSaving(true);
    await fetch(`/api/admin/examples/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    setEditData({});
    loadExamples();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this example response?")) return;
    await fetch(`/api/admin/examples/${id}`, { method: "DELETE" });
    loadExamples();
  }

  function startEdit(example: ExampleResponse) {
    setEditingId(example.id);
    setEditData({
      fud_text: example.fud_text,
      ideal_response: example.ideal_response,
      fud_type: example.fud_type,
      platform: example.platform,
      tone: example.tone,
      strategy: example.strategy,
      notes: example.notes,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <MessageSquare className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
        <p className="text-dark-200">{error}</p>
        <p className="text-dark-400 text-sm mt-2">Run the SQL migration to create the example_responses table.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Example Responses
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            Train the AI agent&apos;s communication style with curated FUD + ideal response pairs.
          </p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-2 px-4 py-2.5 bg-bitcoin hover:bg-bitcoin-dark text-white font-semibold text-sm rounded-lg transition-colors"
        >
          {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {adding ? "Cancel" : "Add Example"}
        </button>
      </div>

      {/* Add new form */}
      {adding && (
        <div className="card p-6 mb-6 border-2 border-bitcoin/30">
          <h3 className="font-semibold text-white mb-4">New Example Response</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">FUD Comment *</label>
              <textarea
                value={newExample.fud_text}
                onChange={(e) => setNewExample({ ...newExample, fud_text: e.target.value })}
                placeholder="The FUD claim or comment to respond to..."
                rows={3}
                className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">Ideal Response *</label>
              <textarea
                value={newExample.ideal_response}
                onChange={(e) => setNewExample({ ...newExample, ideal_response: e.target.value })}
                placeholder="Daniel's ideal response to this FUD..."
                rows={5}
                className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">FUD Type</label>
                <div className="relative">
                  <select value={newExample.fud_type} onChange={(e) => setNewExample({ ...newExample, fud_type: e.target.value })}
                    className="w-full appearance-none bg-dark-700 border border-dark-600 text-white text-xs rounded-lg px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                    {fudTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">Platform</label>
                <div className="relative">
                  <select value={newExample.platform} onChange={(e) => setNewExample({ ...newExample, platform: e.target.value })}
                    className="w-full appearance-none bg-dark-700 border border-dark-600 text-white text-xs rounded-lg px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                    {platforms.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">Tone</label>
                <div className="relative">
                  <select value={newExample.tone} onChange={(e) => setNewExample({ ...newExample, tone: e.target.value })}
                    className="w-full appearance-none bg-dark-700 border border-dark-600 text-white text-xs rounded-lg px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                    {tones.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">Strategy</label>
                <div className="relative">
                  <select value={newExample.strategy} onChange={(e) => setNewExample({ ...newExample, strategy: e.target.value })}
                    className="w-full appearance-none bg-dark-700 border border-dark-600 text-white text-xs rounded-lg px-2.5 py-2 pr-6 focus:outline-none focus:border-bitcoin">
                    {strategies.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-dark-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-dark-400 mb-1 font-semibold uppercase tracking-wider">Notes (why this response works)</label>
              <textarea
                value={newExample.notes}
                onChange={(e) => setNewExample({ ...newExample, notes: e.target.value })}
                placeholder="Explain what makes this response effective..."
                rows={2}
                className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={saving || !newExample.fud_text.trim() || !newExample.ideal_response.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-bitcoin hover:bg-bitcoin-dark disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Example
            </button>
          </div>
        </div>
      )}

      {/* Examples list */}
      {examples.length === 0 && !adding ? (
        <div className="card p-12 text-center">
          <MessageSquare className="w-10 h-10 text-dark-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">No examples yet</h3>
          <p className="text-dark-400 text-sm">Add FUD + ideal response pairs to train the AI agent&apos;s communication style.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {examples.map((ex) => (
            <div key={ex.id} className="card p-5">
              {editingId === ex.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-dark-400 mb-1 font-semibold">FUD</label>
                    <textarea
                      value={editData.fud_text || ""}
                      onChange={(e) => setEditData({ ...editData, fud_text: e.target.value })}
                      rows={3}
                      className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-1 font-semibold">Ideal Response</label>
                    <textarea
                      value={editData.ideal_response || ""}
                      onChange={(e) => setEditData({ ...editData, ideal_response: e.target.value })}
                      rows={5}
                      className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-dark-400 mb-1 font-semibold">Notes</label>
                    <textarea
                      value={editData.notes || ""}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      rows={2}
                      className="w-full bg-dark-700 border border-dark-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(ex.id)} disabled={saving}
                      className="flex items-center gap-1 px-3 py-1.5 bg-bitcoin text-white text-sm font-medium rounded-lg">
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                    </button>
                    <button onClick={() => { setEditingId(null); setEditData({}); }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-dark-700 text-dark-400 text-sm font-medium rounded-lg border border-dark-600">
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {ex.fud_type && (
                        <span className="px-2 py-0.5 rounded-full bg-bitcoin/10 border border-bitcoin/30 text-bitcoin text-[10px] font-medium">
                          {ex.fud_type}
                        </span>
                      )}
                      {ex.platform !== "general" && (
                        <span className="px-2 py-0.5 rounded-full bg-dark-700 border border-dark-600 text-dark-400 text-[10px] font-medium">
                          {ex.platform}
                        </span>
                      )}
                      {ex.strategy && (
                        <span className="px-2 py-0.5 rounded-full bg-dark-700 border border-dark-600 text-dark-400 text-[10px] font-medium">
                          {ex.strategy}
                        </span>
                      )}
                      <span className="text-dark-500 text-[10px]">
                        {new Date(ex.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => startEdit(ex)} className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-500 hover:text-white transition-colors" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(ex.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-dark-500 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] text-dark-500 font-semibold uppercase tracking-wider mb-1">FUD</p>
                    <p className="text-white text-sm leading-relaxed bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">{ex.fud_text}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] text-dark-500 font-semibold uppercase tracking-wider mb-1">Ideal Response</p>
                    <p className="text-white text-sm leading-relaxed bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2 whitespace-pre-wrap">{ex.ideal_response}</p>
                  </div>
                  {ex.notes && (
                    <div>
                      <p className="text-[10px] text-dark-500 font-semibold uppercase tracking-wider mb-1">Why This Works</p>
                      <p className="text-dark-400 text-xs leading-relaxed">{ex.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
