import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";


import {
  NominatimReverseAPiResponse,
  PlaceDetailsType,
  PlacesAPIResponse,
  PlacesAPIResult,
} from "@/lib/types/place-detail";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  try {
    const search_params = request.nextUrl.searchParams;
    const lat = search_params.get("lat");
    const lng = search_params.get("lng");
    const nomitatim_response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      { cache: "no-store" }
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

    const places_api_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${api_key}&location=${lat}%2C${lng}&type=lodging&rankby=distance`,
      { cache: "no-store" }
    );

    const places_api_data =
      (await places_api_response.json()) as PlacesAPIResponse;

    if (places_api_data.status === "OVER_QUERY_LIMIT") {
      return NextResponse.json(
        { status: "REQUEST_TIME_OUT", message: "too many request" },
        { status: 429 }
      );
    }

    const resturctured_places_api_data = places_api_data.results
      .filter((place) => place.business_status === "OPERATIONAL")
      .map((details: PlacesAPIResult) => {
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
            count: details.user_ratings_total,
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
      });

    await dbConnect();
    let db_data;
    if (nominatim_data.address.city) {
      db_data = await PlaceDetail.find({
        "location.town.city": nominatim_data.address.city,
      });
    } else if (nominatim_data.address.town) {
      db_data = await PlaceDetail.find({
        "location.town.": nominatim_data.address.town,
      });
    }

    if (db_data!?.length! > 0) {
      const filtered_DB_data = db_data?.map((detail) => detail.toJSON());
      const restructured_DB_data = filtered_DB_data?.map((details) => {
        return {
          ...details,
          distance: getDistance(
            { lat: Number(lat), lng: Number(lng) },
            {
              lng: details.geometry.location.lng,
              lat: details.geometry.location.lat,
            }
          ),
          database: "MONGODB",
        };
      });
      return NextResponse.json(
        {
          status: "OK",
          message: "Request sucessful",
          data: [...restructured_DB_data!, ...resturctured_places_api_data],
          next_page_token: places_api_data.next_page_token,
        },
        { status: 200 }
      );
    }
    return resturctured_places_api_data.length > 0
      ? NextResponse.json(
          {
            status: "OK",
            message: "Request sucessful",
            data: resturctured_places_api_data,
            next_page_token: places_api_data.next_page_token,
          },
          { status: 200 }
        )
      : NextResponse.json(
          {
            status: "NO_RESULT",
            message: "No Search Result",
            data: [],
            next_page_token: null,
          },
          { status: 404 }
        );
  } catch (error) {
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
