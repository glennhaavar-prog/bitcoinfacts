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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminUser = await getAdminUser(["admin", "trainer"]);
  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  const allowed = ["fud_text", "ideal_response", "fud_type", "platform", "tone", "strategy", "notes"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("example_responses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ example: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminUser = await getAdminUser(["admin", "trainer"]);
  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const admin = createAdminClient();
  const { error } = await admin
    .from("example_responses")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: true });
}
