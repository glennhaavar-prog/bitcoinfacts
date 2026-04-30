import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Double-opt-in confirmation endpoint. Activates a pending subscriber when
 * they click the link in their confirmation email, then redirects to a
 * friendly success page. Idempotent — clicking the link twice is fine.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/subscribe/confirm?error=missing-token`);
  }

  try {
    const supabase = createAdminClient();
    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (!subscriber) {
      return NextResponse.redirect(`${baseUrl}/subscribe/confirm?error=invalid-token`);
    }

    if (subscriber.status === "active") {
      // Already confirmed — show success without re-updating timestamp.
      return NextResponse.redirect(`${baseUrl}/subscribe/confirm?status=already-active`);
    }

    if (subscriber.status === "unsubscribed") {
      // They unsubscribed but clicked an old confirmation link — re-activate.
      const { error: updErr } = await supabase
        .from("subscribers")
        .update({ status: "active", confirmed_at: new Date().toISOString(), unsubscribed_at: null })
        .eq("id", subscriber.id);
      if (updErr) throw updErr;
      return NextResponse.redirect(`${baseUrl}/subscribe/confirm?status=ok`);
    }

    // pending → active
    const { error: updErr } = await supabase
      .from("subscribers")
      .update({ status: "active", confirmed_at: new Date().toISOString() })
      .eq("id", subscriber.id);
    if (updErr) throw updErr;

    return NextResponse.redirect(`${baseUrl}/subscribe/confirm?status=ok`);
  } catch (err) {
    console.error("Confirmation error:", err);
    return NextResponse.redirect(`${baseUrl}/subscribe/confirm?error=server`);
  }
}
