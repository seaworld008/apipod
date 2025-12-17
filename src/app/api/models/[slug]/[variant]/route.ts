import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getModelVariant } from "@/mock/models";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; variant: string }> },
) {
  const { slug, variant } = await params;
  const v = await getModelVariant(slug, variant);
  if (!v) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ data: v });
}
