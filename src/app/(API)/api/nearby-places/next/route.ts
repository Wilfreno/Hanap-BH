import {
  NominatimReverseAPiResponse,
  PlacesAPIResponseDetails,
} from "@/lib/types/place-detail";
import filterData from "@/lib/google-api/filter-data";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  const search_params = request.nextUrl.searchParams;
  const next_page_token = search_params.get("next_page_token");
  const lat = search_params.get("lat");
  const lng = search_params.get("lng");
  try {
    const nomitatim_response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const nominatim_data: NominatimReverseAPiResponse =
      await nomitatim_response.json();

    if (
      nominatim_data.address.country !== "Philippines" ||
      nominatim_data.address.country_code !== "ph"
    ) {
      return NextResponse.json(
        { message: "location out of bound" },
        { status: 400 }
      );
    }

    const next_page_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${next_page_token}&key=${api_key}`
    );
    const next_page_data = await next_page_response.json();

    if (next_page_data.status === "OVER_QUERY_LIMIT") {
      return NextResponse.json(
        { message: "too many request" },
        { status: 408 }
      );
    }
    if (!next_page_data.next_page_token) {
      next_page_data.next_page_token = null;
    }
    const restructured_next_page_data = next_page_data.results.map(
      (details: PlacesAPIResponseDetails) => {
        return filterData(details, nominatim_data, {
          lat: Number(lat),
          lng: Number(lng),
        });
      }
    );

    return NextResponse.json(
      {
        data: restructured_next_page_data,
        next_page_token: next_page_data.next_page_token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
