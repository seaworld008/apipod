import { NextResponse } from "next/server";
import { getChangelog } from "@/mock/site";

export async function GET() {
  const data = await getChangelog();
  return NextResponse.json({ data });
}

