import getDistance from "@/lib/google-api/distance";
import prisma from "@/lib/prisma/client";
import { PlacesAPIResult } from "@/lib/types/google-places-api-type";
import {
  LodgingDetailsType,
  LodgingSearchType,
} from "@/lib/types/lodging-detail-type";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const query: LodgingSearchType = await request.json();

  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  try {
    let search_result: LodgingDetailsType[] = [];

    const db_data = await prisma.lodging.findMany({
      where: {
        OR: [
          {
            name: { contains: query.search_value },
          },
        ],
        AND: {
          location: {
            OR: [
              { province: query.location.province.name },
              { municipality_city: query.location.municipality_city.name },
              { barangay: query.location.barangay.name },
            ],
          },
          lodging_type: { contains: query.lodging_type },
        },
      },
      include: {
        photos: true,
        location: true,
        rooms: {
          include: {
            photos: true,
            price: true,
          },
        },
        ratings: true,
        favorited: true,
      },
      relationLoadStrategy: "join",
    });

    for (let i = 0; i < db_data!?.length; i++) {
      search_result.push({
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
          {
            latitude: Number(query.latitude)!,
            longitude: Number(query.longitude)!,
          },
          {
            longitude: Number(db_data[i]?.location?.longitude),
            latitude: Number(db_data[i]?.location?.latitude),
          }
        ),
        database: "POSTGERSQL",
      });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input=${query.search_value}&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();

    for (let i = 0; i < predictions.length - 1; i++) {
      const places_api_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${predictions[i].place_id}`
      );
      const json = await places_api_response.json();
      const result: PlacesAPIResult = json.result;
      search_result.push({
        id: result.place_id,
        owner_id: "",
        name: result.name,
        photos: result.photos.map((photo) => ({
          id: photo.photo_reference,
          user_id: null,
          lodging_id: null,
          room_id: null,
          photo_url: photo.photo_reference,
          width: null,
          height: null,
          date_created: null,
        })),
        location: {
          id: result.place_id,
          address: result.vicinity,
          province: "",
          municipality_city: "",
          barangay: "",
          street: "",
          longitude: result.geometry.location.lng,
          latitude: result.geometry.location.lat,
          date_created: null,
        },
        house_rules: [],
        ratings: [
          {
            id: "",
            value: result.rating,
            user_id: "",
            lodging_id: result.place_id,
            date_created: null,
          },
        ],
        distance: getDistance(
          {
            latitude: Number(query.latitude),
            longitude: Number(query.longitude),
          },
          {
            longitude: result.geometry?.location?.lng,
            latitude: result.geometry?.location?.lat,
          }
        ),
        lodging_type: "",
        database: "GOOGLE",
        date_created: null,
      });
    }

    return search_result.length > 0
      ? NextResponse.json(
          {
            status: "OK",
            message: "request successful",
            data: search_result,
          },
          { status: 200 }
        )
      : NextResponse.json(
          {
            status: "NO_RESULT",
            message: "no search result",
            data: [],
          },
          { status: 404 }
        );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
