import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const {
      owner,
      place_id,
      name,
      photos,
      specifics: { gender_restriction, benefits, desctiption },
      location: {
        vicinity,
        province,
        town: { city, municipality },
        barangay,
        street,
        coordinates: { lat, lng },
      },
      price: { max, min },
      rating: { count, average },
      contact: {
        social_media: { facebook, twitter, instagram },
        phone_number,
      },
    } = await request.json();
    const place_detail = new PlaceDetail({
      owner,
      place_id,
      name,
      photos,
      specifics: { gender_restriction, benefits, desctiption },
      location: {
        vicinity,
        province,
        town: { city, municipality },
        barangay,
        street,
        coordinates: { lat, lng },
      },
      price: { max, min },
      rating: {
        count,
        average,
      },
      contact: {
        social_media: { facebook, twitter, instagram },
        phone_number,
      },
    });
    await place_detail.save();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
