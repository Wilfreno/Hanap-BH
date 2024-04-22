import getDistance from "@/lib/google-api/distance";
import { PlacesAPIResult } from "@/lib/types/google-places-api-type";
import {
  LodgingDetailsType,
  LodgingSearchType,
} from "@/lib/types/lodging-detail-type";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const query: LodgingSearchType = await request.json();

  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  try {
    const prisma = new PrismaClient();
    const db_response = await prisma.lodging.findMany({
      where: {
        OR: [
          {
            name: { contains: query.search_value },
          },
        ],
        AND: {
          location: { address: { contains: query.location } },
          lodging_type: { contains: query.lodging_type },
        },
      },
    });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input=${query.search_value}&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();

    let google_data: LodgingDetailsType[] = [];
    for (let i = 0; i < predictions.length - 1; i++) {
      const places_api_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${predictions[i].place_id}`
      );
      const json = await places_api_response.json();
      const result: PlacesAPIResult = json.result;
      google_data.push({
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
        },
        house_rules: "",
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

    const result = [...google_data, ...db_response];
    return result.length > 0
      ? NextResponse.json(
          {
            status: "OK",
            message: "request successful",
            data: result,
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
    console.log(error);
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
