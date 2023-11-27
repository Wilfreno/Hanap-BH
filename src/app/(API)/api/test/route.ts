export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const random = Math.random();
  try {
    return NextResponse.json({ data: random }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
