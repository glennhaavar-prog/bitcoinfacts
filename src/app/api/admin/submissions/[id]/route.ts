import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ExtractedFact } from "@/lib/supabase/types";

export async function PATCH(
  request: NextRequest,
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

  const body = await request.json();
  const { action, review_note, fact_index } = body;

  if (!["approved", "rejected"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Get submission
  const { data: submission } = await admin
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!submission) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  if (action === "approved") {
    const facts = (submission.ai_extracted_facts || []) as ExtractedFact[];
    const factsToPublish =
      fact_index !== undefined ? [facts[fact_index]] : facts;

    // Get category IDs
    for (const fact of factsToPublish) {
      if (!fact) continue;

      const { data: category } = await admin
        .from("categories")
        .select("id")
        .eq("slug", fact.category_slug)
        .single();

      if (!category) continue;

      await admin.from("facts").insert({
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
        confidence: fact.confidence || "medium",
        submitted_by: submission.contributor_id,
        reviewed_by: adminUser.id,
        reviewed_at: new Date().toISOString(),
        review_note: review_note || null,
      });
    }

    // Update contributor approved count
    if (submission.contributor_id) {
      const { data: contributor } = await admin
        .from("contributors")
        .select("approved_count")
        .eq("id", submission.contributor_id)
        .single();

      await admin
        .from("contributors")
        .update({
          approved_count: (contributor?.approved_count || 0) + factsToPublish.length,
        })
        .eq("id", submission.contributor_id);
    }
  }

  // Update submission status
  await admin
    .from("submissions")
    .update({
      status: action,
      reviewed_by: adminUser.id,
      reviewed_at: new Date().toISOString(),
      review_note: review_note || null,
    })
    .eq("id", id);

  return NextResponse.json({ success: true });
}
