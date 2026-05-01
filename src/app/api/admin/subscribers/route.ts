import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Returns subscriber data + computed stats for the admin dashboard.
 * Auth: requires a logged-in admin (role admin or moderator). Subscribers are
 * personal data so this endpoint never returns rows publicly.
 */
export async function GET() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: adminUser } = await admin
    .from("admins")
    .select("id, role")
    .eq("auth_user_id", session.user.id)
    .single();

  if (!adminUser || (adminUser.role !== "admin" && adminUser.role !== "moderator")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Pull all subscribers — we'll cap UI rendering to 100 on the page side.
  const { data: subscribers, error } = await admin
    .from("subscribers")
    .select("id, email, status, frequency, language, source, confirmed_at, created_at, unsubscribed_at, last_sent_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const all = subscribers || [];

  // Compute counts. Done in JS rather than separate count queries because the
  // dataset is tiny (100s, max low thousands) and one round-trip is enough.
  const stats = {
    total: all.length,
    active: all.filter((s) => s.status === "active").length,
    pending: all.filter((s) => s.status === "pending").length,
    unsubscribed: all.filter((s) => s.status === "unsubscribed").length,
    bounced: all.filter((s) => s.status === "bounced").length,
  };

  // Build a 30-day signup histogram for the sparkline. Index 0 is 29 days ago,
  // index 29 is today.
  const days: { date: string; count: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: 0 });
  }
  for (const s of all) {
    const dayKey = (s.created_at || "").slice(0, 10);
    const bucket = days.find((d) => d.date === dayKey);
    if (bucket) bucket.count++;
  }

  return NextResponse.json({
    stats,
    days,
    subscribers: all.slice(0, 100), // cap for transport size
  });
}
