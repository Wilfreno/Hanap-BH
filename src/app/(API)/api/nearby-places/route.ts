export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";
import {
  NominatimReverseAPiResponse,
  PlaceDetailsType,
  PlacesAPIResponseDetails,
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

    const places_api_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${api_key}&location=${lat}%2C${lng}&type=lodging&radius=1000`
    );

    const places_api_data = await places_api_response.json();

    if (places_api_data.status === "OVER_QUERY_LIMIT") {
      return NextResponse.json(
        { status: "REQUEST_TIME_OUT", message: "too many request" },
        { status: 429 }
      );
    }
    const resturctured_places_api_data = places_api_data.results.map(
      (details: PlacesAPIResponseDetails, index: number) => {
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
    if (db_data) {
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
    return NextResponse.json(
      {
        status: "OK",
        message: "Request sucessful",
        data: places_api_data,
        next_page_token: places_api_data.next_page_token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
