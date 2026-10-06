import { NextResponse } from "next/server";
import { getUsdToInr } from "../../../lib/fx";

export async function GET() {
  const { rate, live } = await getUsdToInr();
  return NextResponse.json({ rate, live }, { headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=3600" } });
}
