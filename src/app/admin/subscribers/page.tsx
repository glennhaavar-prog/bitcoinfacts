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
        <Loader2 className="w-8 h-8 text-eb-gold animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card p-8 text-center">
        <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <p className="text-eb-slate">{error || "No data"}</p>
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
      <h1 className="font-serif text-2xl font-bold text-eb-navy mb-6">Newsletter Subscribers</h1>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total" value={stats.total} color="text-eb-gold" />
        <StatCard icon={CheckCircle2} label="Active" value={stats.active} color="text-green-600" />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="text-yellow-600" />
        <StatCard icon={XCircle} label="Unsubscribed" value={stats.unsubscribed} color="text-eb-subtle" />
      </div>

      {/* 30-day signup chart */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg font-semibold text-eb-navy mb-1">Signups — last 30 days</h2>
            <p className="text-eb-muted text-xs">{last7Days} this week vs {prev7Days} previous week</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${growthPct >= 0 ? "text-green-600" : "text-eb-red"}`}>
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
                  className={`w-full rounded-sm transition-colors ${isToday ? "bg-eb-gold" : "bg-eb-gold/40 group-hover:bg-eb-gold/70"}`}
                  style={{ height: `${Math.max(heightPct, d.count > 0 ? 8 : 0)}%` }}
                />
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-eb-navy text-white rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  {d.date} · {d.count}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-eb-subtle">
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
          className="flex-1 min-w-[200px] bg-white border border-eb-border rounded-lg px-3 py-2 text-sm text-eb-navy placeholder:text-eb-subtle focus:outline-none focus:border-eb-gold"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-eb-border text-eb-navy text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-eb-gold"
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
        <div className="px-4 py-3 border-b border-eb-border flex items-center justify-between">
          <p className="text-sm text-eb-slate">
            Showing {filtered.length} of {subscribers.length} (max 100)
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-8 h-8 text-eb-subtle mx-auto mb-3" />
            <p className="text-eb-muted text-sm">No subscribers match the filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-eb-border">
            {filtered.map((s) => (
              <div key={s.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-eb-navy text-sm font-medium truncate">{s.email}</p>
                    <StatusBadge status={s.status} />
                    {s.source && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-eb-surface-2 text-eb-muted uppercase tracking-wider border border-eb-border">
                        {s.source}
                      </span>
                    )}
                  </div>
                  <p className="text-eb-subtle text-xs">
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
        <span className="text-sm text-eb-muted">{label}</span>
      </div>
      <p className="text-3xl font-bold text-eb-navy">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: SubscriberRow["status"] }) {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unsubscribed: "bg-eb-surface-2 text-eb-muted border-eb-border",
    bounced: "bg-red-100 text-red-800 border-red-200",
  } as const;
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
