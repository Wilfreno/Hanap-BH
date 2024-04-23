export const dynamic = "force-dynamic";
import getDistance from "@/lib/google-api/distance";
import {
  NominatimReverseAPiResponse,
  PlacesAPIResponse,
} from "@/lib/types/google-places-api-type";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  const search_params = request.nextUrl.searchParams;
  const page_token = search_params.get("page_token");
  const latitude = search_params.get("latitude");
  const longitude = search_params.get("longitude");

  if (!page_token || !latitude || !longitude)
    return NextResponse.json(
      {
        status: "BAD_REQUEST",
        message: "page_token, latitude, & longitude url parameter is required",
      },
      { status: 400 }
    );

  try {
    const nomitatim_response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const nominatim_data: NominatimReverseAPiResponse =
      await nomitatim_response.json();

    if (
      nominatim_data.address.country !== "Philippines" ||
      nominatim_data.address.country_code !== "ph"
    ) {
      return NextResponse.json(
        { status: "OUT_OF_BOUND", message: "location out of bound" },
        { status: 400 }
      );
    }
    const next_page_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${page_token}&key=${api_key}`
    );
    const next_page_data =
      (await next_page_response.json()) as PlacesAPIResponse;

    if (next_page_data.status === "OVER_QUERY_LIMIT") {
      return NextResponse.json(
        { status: "REQUEST_TIME_OUT", message: "too many request" },
        { status: 429 }
      );
    }

    const results = next_page_data.results;
    const restructured_next_page_data: LodgingDetailsType[] = [];

    for (let i = 0; i < results.length; i++) {
      restructured_next_page_data.push({
        owner_id: "",
        id: results[i].place_id,
        name: results[i].name,
        lodging_type: "",
        location: {
          id: results[i].place_id,
          address: results[i].vicinity,
          province: "",
          municipality_city: "",
          barangay: "",
          street: "",
          latitude: results[i].geometry.location.lat,
          longitude: results[i].geometry.location.lng,
          date_created: null
        },
        house_rules: [],
        photos: results[i].photos
          ? results[i].photos.map((photo) => ({
              id: photo.photo_reference,
              photo_url: photo.photo_reference,
              width: null,
              height: null,
              user_id: null,
              lodging_id: null,
              room_id: null,
              date_created: null,
            }))
          : [],
        distance: getDistance(
          { latitude: Number(latitude)!, longitude: Number(longitude)! },
          {
            latitude: results[i].geometry.location.lat,
            longitude: results[i].geometry.location.lng,
          }
        ),
        ratings: results[i].rating
          ? [
              {
                id: "",
                value: results[i].rating,
                user_id: "",
                lodging_id: results[i].place_id,
                date_created: null,
              },
            ]
          : [],
        database: "GOOGLE",
        date_created: null,
      });
    }

    return NextResponse.json(
      {
        status: "OK",
        message: "request successful",
        data: restructured_next_page_data,
        next_page_token: next_page_data.next_page_token,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
