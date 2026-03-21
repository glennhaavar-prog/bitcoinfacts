import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Rate limit: 3 per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "For mange innsendinger. Prøv igjen om litt." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const {
      input_type,
      input_url,
      input_text,
      display_name,
      email,
      extracted_facts,
    } = body;

    if (!input_type || !["url", "text", "fact"].includes(input_type)) {
      return NextResponse.json(
        { error: "Ugyldig input-type." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Create or find contributor
    let contributorId: string | null = null;
    if (display_name) {
      const { data: existing } = email
        ? await supabase
            .from("contributors")
            .select("id")
            .eq("email", email)
            .single()
        : { data: null };

      if (existing) {
        contributorId = existing.id;
      } else {
        const { data: newContributor } = await supabase
          .from("contributors")
          .insert({
            display_name: display_name || "Anonym",
            email: email || null,
          })
          .select("id")
          .single();
        contributorId = newContributor?.id || null;
      }
    }

    // Create submission
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        input_type,
        input_url: input_url || null,
        input_text: input_text || null,
        contributor_id: contributorId,
        status: "ready_for_review",
        ai_extracted_facts: extracted_facts || null,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id, status: "submitted" });
  } catch {
    return NextResponse.json(
      { error: "Noe gikk galt." },
      { status: 500 }
    );
  }
}
