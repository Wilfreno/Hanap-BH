import { getGeocode } from "@/lib/google-api/geocode";
import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
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

    const data = predictions.map((prediction: AutocompleteType) => ({
      description: prediction.description,
      place_id: prediction.place_id,
      structured_formatting: {
        secondary_text: prediction.structured_formatting.secondary_text,
      },
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
