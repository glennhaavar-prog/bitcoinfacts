import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyFact } from "@/lib/ai/verify-fact";
import type { FactRow } from "@/lib/supabase/types";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  const { data: fact } = await admin
    .from("facts")
    .select("*")
    .eq("id", id)
    .single();

  if (!fact) {
    return NextResponse.json({ error: "Fact not found" }, { status: 404 });
  }

  try {
    const verification = await verifyFact(fact as FactRow);

    // Update fact with verification results
    const updates: Record<string, unknown> = {
      verified_date: new Date().toISOString().split("T")[0],
      confidence: verification.new_confidence,
      notes: `[Verified ${new Date().toISOString().split("T")[0]}] ${verification.changes_summary}${fact.notes ? `\n\n${fact.notes}` : ""}`,
    };

    if (verification.updated_claim_en) {
      updates.claim_en = verification.updated_claim_en;
    }
    if (verification.updated_claim_no) {
      updates.claim_no = verification.updated_claim_no;
    }
    if (verification.updated_reality_en) {
      updates.reality_en = verification.updated_reality_en;
    }
    if (verification.updated_reality_no) {
      updates.reality_no = verification.updated_reality_no;
    }

    await admin.from("facts").update(updates).eq("id", id);

    return NextResponse.json({
      verification,
      updated: !verification.still_accurate,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
