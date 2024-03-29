export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";
import { PlaceDetailsType, PlacesAPIResult } from "@/lib/types/google-places-api-type";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");
  const search_params = request.nextUrl.searchParams;
  const place_id = search_params.get("place_id");
  const lat = search_params.get("lat");
  const lng = search_params.get("lng");

  try {
    let data: PlaceDetailsType;
    await dbConnect();
    data = (await PlaceDetail.findOne({ place_id })) as PlaceDetailsType;

    if (!data) {
      const places_api_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${place_id}`
      );
      const places_api_data = await places_api_response.json();
      if (
        places_api_data.status === "NOT_FOUND" ||
        places_api_data.status === "ZERO_RESULTS"
      )
        return NextResponse.json(
          { status: "NO_RESULT", message: "not found" },
          { status: 404 }
        );

      const result: PlacesAPIResult = places_api_data.result;
      data = {
        owner: "",
        place_id: result.place_id,
        name: result.name,
        photos: result.photos
          ? result.photos.map((photo: any) => photo.photo_reference)
          : [],
        location: {
          vicinity: result.vicinity,
          province: "",
          town: {
            city: "",
            municipality: "",
          },
          barangay: "",
          street: "",
          coordinates: result.geometry.location,
        },
        price: {
          max: undefined,
          min: undefined,
        },
        rating: {
          count: 1,
          average: result.rating,
        },
        rooms: 0,
        distance: getDistance(
          { lat: Number(lat), lng: Number(lng) },
          {
            lng: result.geometry.location.lng,
            lat: result.geometry.location.lat,
          }
        ),
        database: "GOOGLE",
      };
    }
    return NextResponse.json(
      { status: "OK", message: "request successful", data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
