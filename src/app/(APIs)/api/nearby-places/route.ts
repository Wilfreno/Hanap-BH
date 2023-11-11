import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";
import filterData from "@/lib/google-api/filter-data";
import { user_location } from "@/lib/redux/slices/user-location-slice";
import {
  NominatimReverseAPiResponse,
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
    const next_page_token = search_params.get("next_page-token");
    const nomitatim_response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const nominatim_data: NominatimReverseAPiResponse =
      await nomitatim_response.json();

    if (next_page_token) {
      const next_page_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${next_page_token}&key=${api_key}`
      );
      const next_page_data = await next_page_response.json();
      const restructured_next_page_data = next_page_data.results.map(
        (details: PlacesAPIResponseDetails) => {
          return filterData(details, nominatim_data, {
            lat: Number(lat),
            lng: Number(lng),
          });
        }
      );

      return NextResponse.json({
        data: restructured_next_page_data,
        next_page_token: next_page_data.next_page_token,
      });
    }

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
      };
    });
    const places_api_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${api_key}&location=${lat}%2C${lng}&type=lodging&radius=50000`
    );

    const places_api_data = await places_api_response.json();

    const resturctured_places_api_data = places_api_data.results.map(
      (details: PlacesAPIResponseDetails) => {
        return filterData(details, nominatim_data, {
          lat: Number(lat),
          lng: Number(lng),
        });
      }
    );
    return NextResponse.json(
      {
        data: [...restructured_DB_data!, ...resturctured_places_api_data],
        next_page_token: places_api_data.next_page_token,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("error: ", err);
    return NextResponse.json({ ERROR: err }, { status: 500 });
  }
}
