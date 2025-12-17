import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getModelSeries } from "@/mock/models";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const series = await getModelSeries(slug);
  if (!series) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ data: series });
}
