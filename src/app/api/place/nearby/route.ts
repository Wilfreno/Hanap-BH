import getDistance from "@/lib/google-api/distance";

import {
  LodgingDetailsType,
  NominatimReverseAPiResponse,
  PlacesAPIResponse,
  PlacesAPIResult,
} from "@/lib/types/google-places-api-type";
import { Lodging, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
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
      .map(
        (details: PlacesAPIResult): LodgingDetailsType => ({
          id: details.place_id,
          owner_id: "",
          name: details.name,
          lodging_type: "",
          address: details.vicinity,
          latitude: details.geometry.location.lat as Decimal,
          longitude: details.geometry.location.lng as Decimal,
          house_rules: "",
          photos: details.photos.map((photo) => ({
            id: photo.photo_reference,
            photo_url: photo?.photo_reference,
            width: 0,
            heigth: 0,
            user_id: null,
            date_created: null
          })),
          distance: getDistance(
            { lat: Number(lat), lng: Number(lng) },
            {
              lng: details.geometry.location.lng,
              lat: details.geometry.location.lat,
            }
          ),
          database: "GOOGLE",
          date_created: null
        })
      );

    const prisma = new PrismaClient();
    let db_data;
    if (nominatim_data.address.city) {
      db_data = await prisma.lodging.findMany({
        where: { address: { contains: nominatim_data.address.city } },
      });
    } else if (nominatim_data.address.town) {
      db_data = await prisma.lodging.findMany({
        where: { address: { contains: nominatim_data.address.town } },
      });
    }

    if (db_data!.length > 0) {
      const restructured_DB_data = db_data?.map((details) => {
        return {
          ...details,
          distance: getDistance(
            { lat: Number(lat), lng: Number(lng) },
            {
              lng: details?.longitude,
              lat: details?.latitude,
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
