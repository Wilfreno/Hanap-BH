import savePlace from "@/lib/google-api/save-place";
import {
  NearbyPlaceResponseType,
  NearbyPlaceType,
} from "@/lib/types/nearby-place-type";
import { PlaceDetailType } from "@/lib/types/places-detail-types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing");

  try {
    const { lat, lng } = await request.json();

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&type=lodging&location=${lat}%2C${lng}&radius=50000`
    );
    const { results }: NearbyPlaceResponseType = await response.json();

    const data = results.map((result: NearbyPlaceType) => ({
      place_id: result.place_id,
      location: result.geometry.location,
      description: result.name,
      vicinity: result.vicinity,
      photo: {
        height: result.photos[0].height,
        width: result.photos[0].width,
        photo_reference: result.photos[0].photo_reference,
      },
      rating: result.rating,
    }));
    return NextResponse.json(
      {
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ ERROR: err }, { status: 500 });
  }
}
