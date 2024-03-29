export const dynamic = "force-dynamic";
import getDistance from "@/lib/google-api/distance";
import {
  NominatimReverseAPiResponse,
  PlaceDetailsType,
  PlacesAPIResponse,
} from "@/lib/types/place-detail";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  const search_params = request.nextUrl.searchParams;
  const page_token = search_params.get("page_token");
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
        { status: "OUT_OF_BOUND", message: "location out of bound" },
        { status: 400 }
      );
    }
    const next_page_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${page_token}&key=${api_key}`
    );
    const next_page_data = await next_page_response.json() as  PlacesAPIResponse;

    if (next_page_data.status === "OVER_QUERY_LIMIT") {
      return NextResponse.json(
        { status: "REQUEST_TIME_OUT", message: "too many request" },
        { status: 429 }
      );
    }
    if (!next_page_data.next_page_token) {
      next_page_data.next_page_token = null;
    }
    const restructured_next_page_data = next_page_data.results.map(
      (details) => {
        const data: PlaceDetailsType = {
          owner: "",
          place_id: details.place_id,
          name: details.name,
          photos: details.photos
            ? details.photos.map((photo) => photo.photo_reference)
            : [],
          location: {
            vicinity: details.vicinity,
            province: "",
            town: {
              city: nominatim_data.address.city || "",
              municipality: nominatim_data.address.town || "",
            },
            barangay: "",
            street: "",
            coordinates: details.geometry.location,
          },
          price: {
            max: undefined,
            min: undefined,
          },
          rating: {
            count: 1,
            average: details.rating,
          },
          rooms: 0,
          distance: getDistance(
            { lat: Number(lat), lng: Number(lng) },
            {
              lng: details.geometry.location.lng,
              lat: details.geometry.location.lat,
            }
          ),
          database: "GOOGLE",
        };
        return data;
      }
    );
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
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
