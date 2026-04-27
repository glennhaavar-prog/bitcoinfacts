import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendSubmissionEmail } from "@/lib/email";

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
      { error: "Too many submissions. Please try again later." },
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
    } = body;

    if (!input_type || !["url", "text"].includes(input_type)) {
      return NextResponse.json(
        { error: "Invalid input type." },
        { status: 400 }
      );
    }

    // Require either a URL or non-empty text — submissions without content
    // are useless and almost always bot/empty-form noise.
    const hasContent =
      (input_type === "url" && input_url?.trim()) ||
      (input_type === "text" && input_text?.trim());
    if (!hasContent) {
      return NextResponse.json(
        { error: "Please provide a link or text." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Create or find contributor (best-effort — failures shouldn't block the submission)
    let contributorId: string | null = null;
    if (display_name) {
      try {
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
              display_name: display_name || "Anonymous",
              email: email || null,
            })
            .select("id")
            .single();
          contributorId = newContributor?.id || null;
        }
      } catch (e) {
        console.warn("Contributor lookup/insert failed:", e);
      }
    }

    // Create submission. Note: ai_extracted_facts is left NULL — admin handles
    // extraction manually now (via Claude chat or /admin/quick-add) for higher
    // quality output than what the public extraction endpoint produces.
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        input_type,
        input_url: input_url || null,
        input_text: input_text || null,
        contributor_id: contributorId,
        status: "ready_for_review",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Email the admin so they can act on the submission immediately.
    // Fire-and-forget — don't block the user's response on email delivery.
    sendSubmissionEmail({
      inputType: input_type,
      inputUrl: input_url,
      inputText: input_text,
      displayName: display_name,
      contributorEmail: email,
      submissionId: data.id,
    });

    return NextResponse.json({ id: data.id, status: "submitted" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
