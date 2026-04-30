import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendDailyFactEmail } from "@/lib/email";

/**
 * Daily newsletter cron job. Triggered by Vercel Cron via vercel.json schedule.
 *
 * Flow:
 *   1. Verify the request is from Vercel Cron (CRON_SECRET).
 *   2. Pull all active subscribers.
 *   3. For each subscriber:
 *      - Pick a fact they haven't received yet (random of remaining).
 *      - If they've seen them all, reset their sent_facts and pick fresh.
 *      - Send the email and log the send.
 *   4. Return a summary so we can monitor in Vercel logs.
 *
 * Vercel Hobby has a 10-second function timeout. With ~100 subscribers this
 * should fit; if we grow beyond that we'll switch to background fan-out.
 */
export async function GET(request: NextRequest) {
  // Auth: Vercel Cron sends Authorization: Bearer $CRON_SECRET.
  // Locally / manually we accept the same header value.
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Fetch all active daily subscribers.
  const { data: subscribers, error: subErr } = await supabase
    .from("subscribers")
    .select("id, email, unsubscribe_token, language")
    .eq("status", "active")
    .eq("frequency", "daily");

  if (subErr) {
    console.error("Cron: failed to fetch subscribers", subErr);
    return NextResponse.json({ error: "Subscriber fetch failed" }, { status: 500 });
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, message: "No active subscribers" });
  }

  // Fetch all published facts once. Joining with categories so we can show
  // category icon + name in the email. Limit fields for payload size.
  const { data: allFacts, error: factsErr } = await supabase
    .from("facts")
    .select("id, claim_en, claim_no, reality_en, reality_no, source_name, source_url, batten_tip_en, batten_tip_no, categories(name_en, name_no, icon)")
    .eq("status", "published");

  if (factsErr || !allFacts || allFacts.length === 0) {
    console.error("Cron: no facts available", factsErr);
    return NextResponse.json({ error: "No facts to send" }, { status: 500 });
  }

  let sentCount = 0;
  let failedCount = 0;

  for (const sub of subscribers) {
    try {
      // Find facts this subscriber has already received.
      const { data: alreadySent } = await supabase
        .from("sent_facts")
        .select("fact_id")
        .eq("subscriber_id", sub.id);

      const sentIds = new Set((alreadySent || []).map((r) => r.fact_id));

      // Filter to unseen facts. If they've seen them all, reset history and
      // start the cycle over. Better to repeat than to stop sending.
      let pool = allFacts.filter((f) => !sentIds.has(f.id));
      if (pool.length === 0) {
        await supabase.from("sent_facts").delete().eq("subscriber_id", sub.id);
        pool = allFacts;
      }

      // Pick a random fact from the pool.
      const fact = pool[Math.floor(Math.random() * pool.length)];

      const useNorwegian = sub.language === "no";
      const claim = (useNorwegian ? fact.claim_no : fact.claim_en) || fact.claim_en || fact.claim_no || "";
      const reality = (useNorwegian ? fact.reality_no : fact.reality_en) || fact.reality_en || fact.reality_no || "";
      const battenTip = (useNorwegian ? fact.batten_tip_no : fact.batten_tip_en) || fact.batten_tip_en || null;

      // categories may come back as an object (single relation) or array depending on the join.
      const cat = Array.isArray(fact.categories) ? fact.categories[0] : fact.categories;
      const categoryName = (useNorwegian ? cat?.name_no : cat?.name_en) || cat?.name_en || "Bitcoin";
      const categoryIcon = cat?.icon || "🟠";

      const ok = await sendDailyFactEmail({
        email: sub.email,
        unsubscribeToken: sub.unsubscribe_token,
        claim,
        reality,
        source: fact.source_name || "Multiple sources",
        sourceUrl: fact.source_url,
        battenTip,
        categoryName,
        categoryIcon,
      });

      if (ok) {
        // Log the send so we don't repeat the same fact tomorrow.
        await supabase.from("sent_facts").insert({ subscriber_id: sub.id, fact_id: fact.id });
        await supabase
          .from("subscribers")
          .update({ last_sent_at: new Date().toISOString() })
          .eq("id", sub.id);
        sentCount++;
      } else {
        failedCount++;
      }
    } catch (err) {
      console.error("Cron: failed to send to", sub.email, err);
      failedCount++;
    }
  }

  return NextResponse.json({
    ok: true,
    total: subscribers.length,
    sent: sentCount,
    failed: failedCount,
  });
}
