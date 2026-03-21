import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const countOnly = request.nextUrl.searchParams.get("count") === "true";
  const supabase = createAdminClient();

  if (countOnly) {
    const { count: total } = await supabase
      .from("facts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    const { count: community } = await supabase
      .from("facts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .not("submitted_by", "is", null);

    return NextResponse.json(
      { total: total || 0, community: community || 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }

  const { data, error } = await supabase
    .from("facts")
    .select("*, categories(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { facts: data },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
