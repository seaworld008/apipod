import { NextResponse } from "next/server";
import { getModelSeriesList } from "@/mock/models";

export async function GET() {
  const list = await getModelSeriesList();
  return NextResponse.json({ data: list });
}

