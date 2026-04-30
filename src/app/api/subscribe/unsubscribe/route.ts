import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * One-click unsubscribe endpoint.
 * Idempotent — clicking the link multiple times keeps the subscriber off the list.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/subscribe/unsubscribe?error=missing-token`);
  }

  try {
    const supabase = createAdminClient();
    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (!subscriber) {
      return NextResponse.redirect(`${baseUrl}/subscribe/unsubscribe?error=invalid-token`);
    }

    if (subscriber.status === "unsubscribed") {
      return NextResponse.redirect(`${baseUrl}/subscribe/unsubscribe?status=already-out`);
    }

    const { error: updErr } = await supabase
      .from("subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("id", subscriber.id);
    if (updErr) throw updErr;

    return NextResponse.redirect(`${baseUrl}/subscribe/unsubscribe?status=ok`);
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.redirect(`${baseUrl}/subscribe/unsubscribe?error=server`);
  }
}
