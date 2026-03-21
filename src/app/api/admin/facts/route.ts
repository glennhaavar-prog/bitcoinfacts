import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ExtractedFact } from "@/lib/supabase/types";

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
    .select("id")
    .eq("auth_user_id", session.user.id)
    .single();

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await admin
    .from("facts")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ facts: data });
}

export async function POST(request: NextRequest) {
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
    .select("id")
    .eq("auth_user_id", session.user.id)
    .single();

  if (!adminUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { facts } = body as { facts: ExtractedFact[] };

  if (!facts || facts.length === 0) {
    return NextResponse.json({ error: "No facts provided" }, { status: 400 });
  }

  let inserted = 0;

  for (const fact of facts) {
    const { data: category } = await admin
      .from("categories")
      .select("id")
      .eq("slug", fact.category_slug)
      .single();

    if (!category) continue;

    const { error } = await admin.from("facts").insert({
      category_id: category.id,
      status: "published",
      claim_no: fact.claim_no,
      claim_en: fact.claim_en || null,
      reality_no: fact.reality_no || null,
      reality_en: fact.reality_en || null,
      source_name: fact.source_name,
      source_date: fact.source_date || null,
      verified_date: new Date().toISOString().split("T")[0],
      batten_tip_no: fact.batten_tip_no || null,
      batten_tip_en: fact.batten_tip_en || null,
      tags: fact.tags || [],
      confidence: fact.confidence || "high",
      reviewed_by: adminUser.id,
      reviewed_at: new Date().toISOString(),
    });

    if (!error) inserted++;
  }

  return NextResponse.json({ inserted, total: facts.length });
}
