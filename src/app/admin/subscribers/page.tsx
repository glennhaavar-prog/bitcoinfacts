"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, CheckCircle2, Clock, XCircle, AlertTriangle, Mail, TrendingUp } from "lucide-react";

interface SubscriberRow {
  id: string;
  email: string;
  status: "pending" | "active" | "unsubscribed" | "bounced";
  frequency: string;
  language: string;
  source: string | null;
  confirmed_at: string | null;
  created_at: string;
  unsubscribed_at: string | null;
  last_sent_at: string | null;
}

interface ApiResponse {
  stats: {
    total: number;
    active: number;
    pending: number;
    unsubscribed: number;
    bounced: number;
  };
  days: { date: string; count: number }[];
  subscribers: SubscriberRow[];
}

export default function AdminSubscribersPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/subscribers");
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Failed to load");
        }
        const json = (await res.json()) as ApiResponse;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card p-8 text-center">
        <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
        <p className="text-dark-200">{error || "No data"}</p>
      </div>
    );
  }

  const { stats, days, subscribers } = data;

  // Sparkline scaling
  const maxCount = Math.max(1, ...days.map((d) => d.count));
  const last7Days = days.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const prev7Days = days.slice(-14, -7).reduce((sum, d) => sum + d.count, 0);
  const growthPct = prev7Days === 0
    ? (last7Days > 0 ? 100 : 0)
    : Math.round(((last7Days - prev7Days) / prev7Days) * 100);

  const filtered = subscribers.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (search && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Newsletter Subscribers</h1>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total" value={stats.total} color="text-bitcoin" />
        <StatCard icon={CheckCircle2} label="Active" value={stats.active} color="text-green-400" />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="text-yellow-400" />
        <StatCard icon={XCircle} label="Unsubscribed" value={stats.unsubscribed} color="text-dark-400" />
      </div>

      {/* 30-day signup chart */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Signups — last 30 days</h2>
            <p className="text-dark-400 text-xs">{last7Days} this week vs {prev7Days} previous week</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${growthPct >= 0 ? "text-green-400" : "text-red-400"}`}>
            <TrendingUp className={`w-4 h-4 ${growthPct < 0 ? "rotate-180" : ""}`} />
            {growthPct >= 0 ? "+" : ""}{growthPct}%
          </div>
        </div>
        <div className="flex items-end gap-1 h-24">
          {days.map((d) => {
            const heightPct = (d.count / maxCount) * 100;
            const isToday = d.date === days[days.length - 1].date;
            return (
              <div key={d.date} className="flex-1 flex flex-col justify-end group relative">
                <div
                  className={`w-full rounded-sm transition-colors ${isToday ? "bg-bitcoin" : "bg-bitcoin/40 group-hover:bg-bitcoin/60"}`}
                  style={{ height: `${Math.max(heightPct, d.count > 0 ? 8 : 0)}%` }}
                />
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-dark-900 border border-dark-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  {d.date} · {d.count}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-dark-500">
          <span>{days[0].date}</span>
          <span>{days[days.length - 1].date}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="flex-1 min-w-[200px] bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-dark-700 border border-dark-600 text-dark-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-bitcoin"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="unsubscribed">Unsubscribed</option>
          <option value="bounced">Bounced</option>
        </select>
      </div>

      {/* Subscriber list */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-dark-700 flex items-center justify-between">
          <p className="text-sm text-dark-300">
            Showing {filtered.length} of {subscribers.length} (max 100)
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-8 h-8 text-dark-500 mx-auto mb-3" />
            <p className="text-dark-400 text-sm">No subscribers match the filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {filtered.map((s) => (
              <div key={s.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-white text-sm font-medium truncate">{s.email}</p>
                    <StatusBadge status={s.status} />
                    {s.source && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-dark-700 text-dark-300 uppercase tracking-wider">
                        {s.source}
                      </span>
                    )}
                  </div>
                  <p className="text-dark-500 text-xs">
                    Joined {new Date(s.created_at).toLocaleDateString("no-NB")}
                    {s.confirmed_at && ` · Confirmed ${new Date(s.confirmed_at).toLocaleDateString("no-NB")}`}
                    {s.last_sent_at && ` · Last email ${new Date(s.last_sent_at).toLocaleDateString("no-NB")}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; color: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm text-dark-400">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: SubscriberRow["status"] }) {
  const styles = {
    active: "bg-green-400/10 text-green-400",
    pending: "bg-yellow-400/10 text-yellow-400",
    unsubscribed: "bg-dark-600 text-dark-300",
    bounced: "bg-red-400/10 text-red-400",
  } as const;
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
