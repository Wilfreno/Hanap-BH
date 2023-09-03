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

    const data = results.map((result: NearbyPlaceType): PlaceDetailType => {
      const {
        place_id,
        geometry: { location },
        name,
        vicinity,
        photos: [{ height, width, photo_reference }],
        rating,
      } = result;

      return {
        owner: undefined,
        place_id,
        description: name,
        vicinity,
        location,
        photo: {
          height,
          width,
          photo_reference,
        },
        price: {
          max: undefined,
          min: undefined,
        },
        vacant_rooms: undefined,
        contact: {
          email: "",
          phone: undefined,
          social_media: "",
        },
        rating,
      };
    });
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
