"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, ExternalLink, Lightbulb, Loader2 } from "lucide-react";
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
          supabase.from("facts").select("*, categories(*)").eq("status", "published").order("created_at", { ascending: false }),
          supabase.from("categories").select("*").order("sort_order"),
        ]);

        if (factsRes.data && factsRes.data.length > 0 && catsRes.data) {
          setFacts(factsRes.data.map((f: Record<string, unknown>) => ({
            id: f.id as string,
            category: (f.categories as Record<string, unknown>)?.slug as string || "",
            claim: (f.claim_en as string) || (f.claim_no as string) || "",
            reality: (f.reality_en as string) || (f.reality_no as string) || "",
            source: f.source_name as string,
            sourceUrl: (f.source_url as string) || undefined,
            date: (f.source_date as string) || undefined,
            tip: (f.batten_tip_en as string) || (f.batten_tip_no as string) || "",
          })));
          setCategories(catsRes.data.map((c: Record<string, unknown>) => ({
            id: c.slug as string,
            name: c.name_en as string,
            icon: c.icon as string,
          })));
          setLoading(false);
          return;
        }
      } catch { /* fall through */ }

      setFacts(staticFacts.map((f) => ({
        id: f.id, category: f.category,
        claim: f.claim, reality: f.reality,
        source: f.source, sourceUrl: f.sourceUrl,
        date: f.date, tip: f.tip,
      })));
      setCategories(staticCategories.map((c) => ({
        id: c.id, name: c.name, icon: c.icon,
      })));
      setLoading(false);
    }
    loadFromSupabase();
  }, []);

  const filteredFacts = facts.filter((fact) => {
    const matchesCategory = selectedCategory === "all" || fact.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      fact.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.reality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Facts <span className="gradient-text">Library</span>
        </h1>
        <p className="text-dark-300 max-w-2xl mx-auto">
          Curated, source-backed facts about Bitcoin mining. Search, filter and
          learn how to use them in discussions.
        </p>
      </div>

      <div className="card p-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facts..."
              className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2.5 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCategory("all")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedCategory === "all" ? "bg-bitcoin text-dark-950" : "bg-dark-700 text-dark-300 hover:text-white border border-dark-600"}`}>
              All
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedCategory === cat.id ? "bg-bitcoin text-dark-950" : "bg-dark-700 text-dark-300 hover:text-white border border-dark-600"}`}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-dark-400 text-sm mb-4">{filteredFacts.length} facts found</p>

      <div className="space-y-4">
        {filteredFacts.map((fact) => {
          const isExpanded = expandedFact === fact.id;
          const category = categories.find((c) => c.id === fact.category);
          return (
            <div key={fact.id} className="card-hover overflow-hidden">
              <button onClick={() => setExpandedFact(isExpanded ? null : fact.id)} className="w-full p-5 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {category && <span className="px-2.5 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-medium">{category.icon} {category.name}</span>}
                      {fact.date && <span className="text-dark-500 text-xs">{fact.date}</span>}
                    </div>
                    <h3 className="text-base font-semibold text-white">&ldquo;{fact.claim}&rdquo;</h3>
                    {!isExpanded && <p className="mt-2 text-dark-300 text-sm line-clamp-2">{fact.reality}</p>}
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-dark-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-dark-400 flex-shrink-0" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="p-4 rounded-lg bg-dark-900 border border-dark-700">
                    <h4 className="text-xs font-semibold text-bitcoin uppercase tracking-wider mb-2">The Reality</h4>
                    <p className="text-dark-200 text-sm leading-relaxed">{fact.reality}</p>
                  </div>
                  {fact.tip && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-bitcoin/5 border border-bitcoin/20">
                      <Lightbulb className="w-5 h-5 text-bitcoin flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-bitcoin uppercase tracking-wider mb-1">How to use this</h4>
                        <p className="text-dark-200 text-sm">{fact.tip}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-dark-400">Source:</span>
                    <span className="text-dark-200">{fact.source}</span>
                    {fact.sourceUrl && (
                      <a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-bitcoin hover:text-bitcoin-light transition-colors">
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
        <div className="text-center py-16"><p className="text-dark-400">No facts match your search. Try a different keyword.</p></div>
      )}
    </div>
  );
}
