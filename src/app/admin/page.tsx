"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Database,
  Inbox,
  AlertTriangle,
  TrendingUp,
  Loader2,
} from "lucide-react";

interface DashboardStats {
  totalFacts: number;
  factsByCategory: Array<{ name_no: string; count: number; icon: string }>;
  pendingSubmissions: number;
  needsVerification: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadStats() {
      // Total published facts
      const { count: totalFacts } = await supabase
        .from("facts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      // Facts by category
      const { data: categories } = await supabase
        .from("categories")
        .select("id, name_no, icon, slug")
        .order("sort_order");

      const factsByCategory: DashboardStats["factsByCategory"] = [];
      if (categories) {
        for (const cat of categories) {
          const { count } = await supabase
            .from("facts")
            .select("*", { count: "exact", head: true })
            .eq("category_id", cat.id)
            .eq("status", "published");
          factsByCategory.push({
            name_no: cat.name_no,
            count: count || 0,
            icon: cat.icon,
          });
        }
      }

      // Pending submissions
      const { count: pendingSubmissions } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .in("status", ["pending", "ready_for_review"]);

      // Needs verification (verified_date > 6 months ago)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const { count: needsVerification } = await supabase
        .from("facts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published")
        .lt("verified_date", sixMonthsAgo.toISOString().split("T")[0]);

      setStats({
        totalFacts: totalFacts || 0,
        factsByCategory,
        pendingSubmissions: pendingSubmissions || 0,
        needsVerification: needsVerification || 0,
      });
      setLoading(false);
    }

    loadStats();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-bitcoin" />
            <span className="text-sm text-dark-400">Publiserte fakta</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalFacts}</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <Inbox className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-dark-400">Ventende</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.pendingSubmissions}
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-dark-400">Trenger verifisering</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.needsVerification}
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-dark-400">Kategorier</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.factsByCategory.length}
          </p>
        </div>
      </div>

      {/* Facts by category */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Fakta per kategori
        </h2>
        <div className="space-y-3">
          {stats.factsByCategory.map((cat) => (
            <div
              key={cat.name_no}
              className="flex items-center justify-between py-2 border-b border-dark-700 last:border-0"
            >
              <span className="text-dark-200 text-sm">
                {cat.icon} {cat.name_no}
              </span>
              <span className="text-white font-medium">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
