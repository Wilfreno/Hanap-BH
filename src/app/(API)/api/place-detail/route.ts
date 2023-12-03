export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const search_params = request.nextUrl.searchParams;
  const place_id = search_params.get("place_id");
  try {
    await dbConnect();
    const database_data = await PlaceDetail.findOne({ place_id });

    if (!database_data) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    return NextResponse.json({ data: database_data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
