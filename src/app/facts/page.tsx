"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lightbulb,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { facts as staticFacts, factCategories as staticCategories } from "@/lib/prompts/facts-database";
import { createClient } from "@/lib/supabase/client";

interface DisplayFact {
  id: string;
  category: string;
  claim: string;
  reality: string;
  source: string;
  sourceUrl?: string;
  date?: string;
  tip: string;
}

interface DisplayCategory {
  id: string;
  name: string;
  icon: string;
}

export default function FactsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFact, setExpandedFact] = useState<string | null>(null);
  const [facts, setFacts] = useState<DisplayFact[]>([]);
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFromSupabase() {
      try {
        const supabase = createClient();
        const [factsRes, catsRes] = await Promise.all([
          supabase
            .from("facts")
            .select("*, categories(*)")
            .eq("status", "published")
            .order("created_at", { ascending: false }),
          supabase.from("categories").select("*").order("sort_order"),
        ]);

        if (factsRes.data && factsRes.data.length > 0 && catsRes.data) {
          setFacts(
            factsRes.data.map((f: Record<string, unknown>) => ({
              id: f.id as string,
              category: (f.categories as Record<string, unknown>)?.slug as string || "",
              claim: (f.claim_en as string) || (f.claim_no as string) || "",
              reality: (f.reality_en as string) || (f.reality_no as string) || "",
              source: f.source_name as string,
              sourceUrl: (f.source_url as string) || undefined,
              date: (f.source_date as string) || undefined,
              tip: (f.batten_tip_en as string) || (f.batten_tip_no as string) || "",
            }))
          );
          setCategories(
            catsRes.data.map((c: Record<string, unknown>) => ({
              id: c.slug as string,
              name: c.name_en as string,
              icon: c.icon as string,
            }))
          );
          setLoading(false);
          return;
        }
      } catch {
        /* fall through to static */
      }

      setFacts(
        staticFacts.map((f) => ({
          id: f.id,
          category: f.category,
          claim: f.claim,
          reality: f.reality,
          source: f.source,
          sourceUrl: f.sourceUrl,
          date: f.date,
          tip: f.tip,
        }))
      );
      setCategories(
        staticCategories.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))
      );
      setLoading(false);
    }
    loadFromSupabase();
  }, []);

  const filteredFacts = facts.filter((fact) => {
    const matchesCategory =
      selectedCategory === "all" || fact.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      fact.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.reality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-eb-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page header */}
      <div className="text-center mb-10">
        <p className="section-label mb-2">Research database</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-eb-navy mb-3">
          Common Claims About Bitcoin — and What the Evidence Shows
        </h1>
        <p className="text-eb-muted max-w-2xl mx-auto leading-relaxed">
          Each entry below starts with a <strong>common claim</strong> made
          about Bitcoin mining, followed by what peer-reviewed research and
          primary data actually show. Search, filter, and learn how to respond.
        </p>
      </div>

      {/* Search + filter */}
      <div className="card p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eb-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the evidence database..."
              className="w-full bg-eb-surface-2 border border-eb-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-eb-navy placeholder:text-eb-subtle focus:outline-none focus:border-eb-gold"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-eb-gold text-white"
                  : "bg-eb-surface-2 text-eb-muted hover:text-eb-navy border border-eb-border"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-eb-gold text-white"
                    : "bg-eb-surface-2 text-eb-muted hover:text-eb-navy border border-eb-border"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-eb-muted text-sm mb-4">
        {filteredFacts.length} {filteredFacts.length === 1 ? "entry" : "entries"} found
      </p>

      {/* Fact cards */}
      <div className="space-y-3">
        {filteredFacts.map((fact) => {
          const isExpanded = expandedFact === fact.id;
          const category = categories.find((c) => c.id === fact.category);
          return (
            <div key={fact.id} className="card-hover overflow-hidden">
              <button
                onClick={() => setExpandedFact(isExpanded ? null : fact.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {/* Explicit CLAIM badge so visitors don't read the headline
                          quote as something the site asserts. Pairs with the
                          "Evidence" label below. */}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                        <AlertCircle className="w-3 h-3" />
                        Claim
                      </span>
                      {category && (
                        <span className="badge-gold">
                          {category.icon} {category.name}
                        </span>
                      )}
                      {fact.date && (
                        <span className="text-eb-subtle text-xs">{fact.date}</span>
                      )}
                    </div>
                    <h3 className="font-serif text-base font-semibold text-eb-navy italic">
                      &ldquo;{fact.claim}&rdquo;
                    </h3>
                    {!isExpanded && (
                      <div className="mt-3 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-eb-gold flex-shrink-0 mt-0.5" />
                        <p className="text-eb-slate text-sm line-clamp-2">
                          <span className="font-semibold text-eb-gold">Evidence:</span>{" "}
                          {fact.reality}
                        </p>
                      </div>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-eb-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-eb-muted flex-shrink-0" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Reality */}
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      What the Evidence Actually Shows
                    </h4>
                    <p className="text-eb-slate text-sm leading-relaxed">{fact.reality}</p>
                  </div>

                  {/* Tip */}
                  {fact.tip && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-eb-gold-faint border border-eb-gold-border">
                      <Lightbulb className="w-5 h-5 text-eb-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-eb-gold uppercase tracking-wider mb-1">
                          How to use this
                        </h4>
                        <p className="text-eb-slate text-sm">{fact.tip}</p>
                      </div>
                    </div>
                  )}

                  {/* Source */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-eb-muted text-xs font-semibold uppercase tracking-wider">
                      Source:
                    </span>
                    <span className="text-eb-slate text-sm">{fact.source}</span>
                    {fact.sourceUrl && (
                      <a
                        href={fact.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-eb-gold hover:text-eb-gold-dark transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFacts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-eb-muted">
            No entries match your search. Try a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}
