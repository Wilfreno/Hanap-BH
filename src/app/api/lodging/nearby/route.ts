import getDistance from "@/lib/google-api/distance";
import prisma from "@/lib/prisma/client";

import {
  NominatimReverseAPiResponse,
  PlacesAPIResponse,
  PlacesAPIResult,
} from "@/lib/types/google-places-api-type";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  try {
    const search_params = request.nextUrl.searchParams;
    const latitude = search_params.get("latitude");
    const longitude = search_params.get("longitude");

    if (!latitude || !longitude)
      return NextResponse.json(
        {
          status: "BAD_REQUEST",
          message: "latitude & longitude field is required",
        },
        { status: 400 }
      );

    const nomitatim_response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      { cache: "no-store" }
    );
    const nominatim_data: NominatimReverseAPiResponse =
      await nomitatim_response.json();

    if (
      nominatim_data.address.country !== "Philippines" ||
      nominatim_data.address.country_code !== "ph"
    ) {
      return NextResponse.json(
        {
          status: "OUT_OF_BOUND",
          message:
            "location out of bound; the app can only be used in the philippines",
        },
        { status: 400 }
      );
    }

    const places_api_response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${api_key}&location=${latitude}%2C${longitude}&type=lodging&rankby=distance`,
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

    const results: PlacesAPIResult[] = places_api_data.results;
    const nearby_lodgings: LodgingDetailsType[] = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i].business_status !== "OPERATIONAL") continue;

      nearby_lodgings.push({
        id: results[i].place_id,
        owner_id: "",
        name: results[i].name,
        lodging_type: "",
        distance: getDistance(
          { latitude: Number(latitude), longitude: Number(longitude) },
          {
            longitude: results[i].geometry.location.lng,
            latitude: results[i].geometry.location.lat,
          }
        ),
        house_rules: [],
        photos: results[i].photos
          ? results[i].photos.map((photo) => ({
              id: photo.photo_reference,
              photo_url: photo?.photo_reference,
              width: null,
              height: null,
              user_id: null,
              lodging_id: null,
              room_id: null,
              date_created: null,
            }))
          : [],
        location: {
          id: results[i].place_id,
          address: results[i].vicinity,
          province: "",
          municipality_city: "",
          barangay: "",
          street: "",
          latitude: results[i].geometry.location.lat,
          longitude: results[i].geometry.location.lng,
          date_created: null,
        },
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

    const db_data = await prisma.lodging.findMany({
      where: {
        location: {
          address: {
            contains: nominatim_data.address.city
              ? nominatim_data.address.city
              : nominatim_data.address.town,
          },
        },
      },
      include: {
        rooms: {
          include: {
            photos: true,
          },
        },
        ratings: true,
        photos: true,
        location: true,
        favorited: true
      },
      relationLoadStrategy: "join",
    });

    for (let i = 0; i < db_data!?.length; i++) {
      nearby_lodgings.push({
        ...db_data[i],
        ratings: db_data[i].ratings.map((rating) => ({
          ...rating,
          value: Number(rating.value),
        })),
        house_rules: db_data[i].house_rules
          ? JSON.parse(db_data[i].house_rules)
          : [],
        location: {
          id: db_data[i].id,
          address: db_data[i].location?.address!,
          province: db_data[i].location?.province!,
          municipality_city: db_data[i].location?.municipality_city!,
          barangay: db_data[i].location?.barangay!,
          street: db_data[i].location?.street!,
          latitude: Number(db_data[i].location?.latitude),
          longitude: Number(db_data[i].location?.longitude),
          date_created: null,
        },
        distance: getDistance(
          { latitude: Number(latitude)!, longitude: Number(longitude)! },
          {
            longitude: Number(db_data[i]?.location?.longitude),
            latitude: Number(db_data[i]?.location?.latitude),
          }
        ),
        database: "POSTGERSQL",
      });
    }

    return nearby_lodgings.length > 0
      ? NextResponse.json(
          {
            status: "OK",
            message: "Request sucessful",
            data: nearby_lodgings,
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
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
