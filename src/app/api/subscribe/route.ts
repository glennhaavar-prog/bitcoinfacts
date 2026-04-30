import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendConfirmationEmail } from "@/lib/email";

// Loose RFC 5322 check — we let Resend reject anything truly malformed.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-IP rate limit: 5 signup attempts per hour. Stops basic abuse without
// punishing real users who fat-finger their email and try again.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again in an hour." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const rawEmail = (body?.email || "").toString().trim().toLowerCase();
    const source = (body?.source || "unknown").toString().slice(0, 50);
    const honeypot = body?.website; // bot trap; humans never fill this

    if (honeypot) {
      // Pretend success so bots don't probe further. Don't actually create the row.
      return NextResponse.json({ ok: true });
    }

    if (!rawEmail || !EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Look up by email (lowercased). If they exist:
    //   - active: tell them they're already subscribed
    //   - pending: re-send the confirmation email (probably lost)
    //   - unsubscribed: re-activate as pending and send fresh confirmation
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status, confirmation_token")
      .eq("email", rawEmail)
      .maybeSingle();

    if (existing && existing.status === "active") {
      return NextResponse.json({
        ok: true,
        alreadySubscribed: true,
      });
    }

    let subscriberId: string;
    let confirmationToken: string;

    if (existing) {
      // Pending or unsubscribed — generate a fresh confirmation token and
      // reset the row to pending so they go through opt-in again.
      const newToken = crypto.randomUUID().replace(/-/g, "");
      const { error: updErr } = await supabase
        .from("subscribers")
        .update({
          status: "pending",
          confirmation_token: newToken,
          source,
          confirmed_at: null,
          unsubscribed_at: null,
        })
        .eq("id", existing.id);
      if (updErr) throw updErr;
      subscriberId = existing.id;
      confirmationToken = newToken;
    } else {
      // Brand new subscriber. The DB defaults generate the tokens for us.
      const { data: created, error: insErr } = await supabase
        .from("subscribers")
        .insert({ email: rawEmail, source, status: "pending" })
        .select("id, confirmation_token")
        .single();
      if (insErr) throw insErr;
      subscriberId = created.id;
      confirmationToken = created.confirmation_token;
    }

    // Send confirmation email. If sending fails, surface a soft error — the
    // row exists, the user can hit signup again to retry.
    const sent = await sendConfirmationEmail(rawEmail, confirmationToken);
    if (!sent) {
      console.error("Confirmation email failed for subscriber", subscriberId);
      return NextResponse.json(
        { error: "Could not send confirmation email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
