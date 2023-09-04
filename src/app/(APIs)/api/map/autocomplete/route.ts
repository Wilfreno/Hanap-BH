import { getGeocode } from "@/lib/google-api/geocode";
import { PlaceDetailType } from "@/lib/types/places-detail-types";
import { ratingClasses } from "@mui/material";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  const { query } = await request.json();

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}&radius=50000&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();

    const data = predictions.map(
      (prediction: PlaceDetailType): PlaceDetailType => {
        const { place_id, description, vicinity } = prediction;

        return {
          owner: undefined,
          place_id,
          description,
          vicinity,
          photo: {
            height: undefined,
            width: undefined,
            photo_reference: "",
          },
          price: {
            max: undefined,
            min: undefined,
          },
          vacant_rooms: undefined,
      
          rating: undefined,
        };
      }
    );

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
