import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const category = request.nextUrl.searchParams.get("category");

  if (!query && !category) {
    return NextResponse.json(
      { error: "Søkeord (q) eller kategori påkrevd." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  let dbQuery = supabase
    .from("facts")
    .select("*, categories(*)")
    .eq("status", "published");

  if (category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single();

    if (cat) {
      dbQuery = dbQuery.eq("category_id", cat.id);
    }
  }

  if (query) {
    dbQuery = dbQuery.or(
      `claim_no.ilike.%${query}%,claim_en.ilike.%${query}%,source_name.ilike.%${query}%`
    );
  }

  const { data, error } = await dbQuery.order("created_at", {
    ascending: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ facts: data });
}
