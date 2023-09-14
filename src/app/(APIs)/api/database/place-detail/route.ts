import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { place_id } = await request.json();
    await dbConnect();

    const data = await PlaceDetail.findOne({ place_id });

    NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    NextResponse.json({ error }, { status: 500 });
  }
}
