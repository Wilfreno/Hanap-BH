import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  const { query } = await request.json();

  try {
    console.log("query:", query);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}&radius=50000&components=country:ph&types=lodging`
    );

    const {
      description,
      place_id,
      structured_formatting: { secondary_text },
    } = await response.json();

    return NextResponse.json(
      { description, place_id, secondary_text },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
