"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  FactRow,
  CategoryRow,
} from "@/lib/supabase/types";
import {
  Loader2,
  Search,
  Edit3,
  Save,
  X,
  AlertTriangle,
  RefreshCw,
  Archive,
  ChevronDown,
} from "lucide-react";

export default function AdminFaktaPage() {
  const [facts, setFacts] = useState<(FactRow & { categories: CategoryRow })[]>(
    []
  );
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<FactRow>>({});
  const [saving, setSaving] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const loadFacts = useCallback(async () => {
    try {
      let query = supabase
        .from("facts")
        .select("*, categories(*)")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      if (categoryFilter !== "all") {
        query = query.eq("category_id", categoryFilter);
      }

      const { data, error: queryErr } = await query;
      if (queryErr) throw queryErr;
      setFacts((data as (FactRow & { categories: CategoryRow })[]) || []);
    } catch (err) {
      console.error("Facts load error:", err);
      setError("Could not load facts. Check that Supabase tables exist.");
    } finally {
      setLoading(false);
    }
  }, [supabase, statusFilter, categoryFilter]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error: catErr } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order");
        if (catErr) throw catErr;
        setCategories(data || []);
      } catch (err) {
        console.error("Categories load error:", err);
      }
    }
    loadCategories();
  }, [supabase]);

  useEffect(() => {
    loadFacts();
  }, [loadFacts]);

  const filteredFacts = facts.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      f.claim_no.toLowerCase().includes(q) ||
      (f.claim_en || "").toLowerCase().includes(q) ||
      f.source_name.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  function startEdit(fact: FactRow) {
    setEditingId(fact.id);
    setEditData({
      claim_no: fact.claim_no,
      claim_en: fact.claim_en,
      reality_no: fact.reality_no,
      reality_en: fact.reality_en,
      source_name: fact.source_name,
      source_url: fact.source_url,
      batten_tip_no: fact.batten_tip_no,
      confidence: fact.confidence,
      status: fact.status,
      category_id: fact.category_id,
    });
  }

  async function saveEdit() {
    if (!editingId) return;
    setSaving(true);
    await fetch(`/api/admin/facts/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setSaving(false);
    setEditingId(null);
    loadFacts();
  }

  async function handleVerify(factId: string) {
    setVerifying(factId);
    try {
      const res = await fetch(`/api/admin/facts/${factId}/verify`, {
        method: "POST",
      });
      if (res.ok) {
        loadFacts();
      }
    } finally {
      setVerifying(null);
    }
  }

  async function handleArchive(factId: string) {
    await fetch(`/api/admin/facts/${factId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
    loadFacts();
  }

  // Check if a fact needs verification (>6 months old)
  function needsVerification(verifiedDate: string): boolean {
    const verified = new Date(verifiedDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return verified < sixMonthsAgo;
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
        <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
        <p className="text-dark-200">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Facts Administration
        <span className="ml-2 text-sm font-normal text-dark-400">
          ({filteredFacts.length} facts)
        </span>
      </h1>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facts..."
            className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-bitcoin"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-dark-700 border border-dark-600 text-dark-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-bitcoin"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name_no}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        </div>
      </div>

      {/* Facts table */}
      <div className="space-y-3">
        {filteredFacts.map((fact) => {
          const isEditing = editingId === fact.id;
          const stale = needsVerification(fact.verified_date);

          return (
            <div
              key={fact.id}
              className={`card p-4 ${
                stale ? "border-yellow-500/30" : ""
              }`}
            >
              {isEditing ? (
                // Edit mode
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-dark-400">
                        Claim (NO)
                      </label>
                      <input
                        value={editData.claim_no || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, claim_no: e.target.value })
                        }
                        className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-dark-400">
                        Claim (EN)
                      </label>
                      <input
                        value={editData.claim_en || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, claim_en: e.target.value })
                        }
                        className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-dark-400">Source</label>
                    <input
                      value={editData.source_name || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          source_name: e.target.value,
                        })
                      }
                      className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="text-xs text-dark-400">Status</label>
                      <select
                        value={editData.status || "published"}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value as FactRow["status"] })
                        }
                        className="w-full appearance-none bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="relative">
                      <label className="text-xs text-dark-400">Category</label>
                      <select
                        value={editData.category_id || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            category_id: e.target.value,
                          })
                        }
                        className="w-full appearance-none bg-dark-700 border border-dark-600 rounded px-3 py-2 text-sm text-dark-100 focus:outline-none focus:border-bitcoin"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.icon} {c.name_no}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      className="px-4 py-2 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 text-sm font-medium rounded-lg transition-colors"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-1">
                          <Save className="w-4 h-4" /> Save
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-dark-600 hover:bg-dark-500 text-dark-200 text-sm rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                // Display mode
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          fact.status === "published"
                            ? "bg-green-400/10 text-green-400"
                            : fact.status === "draft"
                            ? "bg-dark-600 text-dark-300"
                            : fact.status === "archived"
                            ? "bg-dark-600 text-dark-500"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {fact.status}
                      </span>
                      {fact.categories && (
                        <span className="px-2 py-0.5 rounded bg-bitcoin/10 text-bitcoin text-xs">
                          {fact.categories.icon} {fact.categories.name_no}
                        </span>
                      )}
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
                      {stale && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          Needs verification
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium truncate">
                      {fact.claim_no}
                    </p>
                    <p className="text-dark-500 text-xs mt-0.5">
                      {fact.source_name} · Verified:{" "}
                      {new Date(fact.verified_date).toLocaleDateString("no-NB")}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => startEdit(fact)}
                      className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleVerify(fact.id)}
                      disabled={verifying === fact.id}
                      className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-bitcoin transition-colors"
                      title="Re-verifiser med AI"
                    >
                      {verifying === fact.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleArchive(fact.id)}
                      className="p-2 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-red-400 transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
