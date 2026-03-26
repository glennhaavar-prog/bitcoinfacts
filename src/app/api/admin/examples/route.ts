import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function getAdminUser(allowedRoles: string[]) {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const admin = createAdminClient();
  const { data: adminUser } = await admin
    .from("admins")
    .select("id, role")
    .eq("auth_user_id", session.user.id)
    .single();

  if (!adminUser || !allowedRoles.includes(adminUser.role)) return null;
  return adminUser;
}

export async function GET() {
  const adminUser = await getAdminUser(["admin", "trainer"]);
  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("example_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ examples: data });
}

export async function POST(request: NextRequest) {
  const adminUser = await getAdminUser(["admin", "trainer"]);
  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { fud_text, ideal_response, fud_type, platform, tone, strategy, notes } = body;

  if (!fud_text || !ideal_response) {
    return NextResponse.json({ error: "fud_text and ideal_response are required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("example_responses")
    .insert({
      fud_text,
      ideal_response,
      fud_type: fud_type || null,
      platform: platform || "general",
      tone: tone || "balanced",
      strategy: strategy || null,
      notes: notes || null,
      created_by: adminUser.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ example: data });
}
