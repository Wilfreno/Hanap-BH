import getDistance from "@/lib/google-api/distance";
import { PlacesAPIResult } from "@/lib/types/google-places-api-type";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { Lodging, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  try {
    const search_params = request.nextUrl.searchParams;
    const id = search_params.get("id");
    const lat = search_params.get("lat");
    const lng = search_params.get("lng");

    const prisma = new PrismaClient();
    let data: LodgingDetailsType | null | Lodging;

    data = await prisma.lodging.findFirst({ where: { id: id! } });
    data = {
      ...data!,
      database: "POSTGERSQL",
      distance: getDistance(
        { lat: Number(lat)!, lng: Number(lng)! },
        { lat: data?.latitude!, lng: data?.latitude! }
      ),
    };

    if (!data) {
      const places_api_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${id}`
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
        id: result.place_id,
        owner_id: "",
        name: result.name,
        lodging_type: "",
        address: result.vicinity,
        longitude: result.geometry.location.lng as Decimal,
        latitude: result.geometry.location.lat as Decimal,
        house_rules: "",
        photos: result.photos.map((photo) => ({
          id: photo.photo_reference,
          photo_url: photo.photo_reference,
          width: null,
          height: null,
          user_id: null,
          room_id: null,
          lodging_id: result.place_id,
          date_created: null,
        })),
        distance: getDistance(
          { lat: Number(lat)!, lng: Number(lng)! },
          {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          }
        ),
        database: "GOOGLE",
        date_created: null,
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

export async function POST(request: Request) {
  try {
    const lodging: Lodging = await request.json();
    const prisma = new PrismaClient();
    const new_lodging = await prisma.lodging.create({
      data: {
        owner_id: lodging.owner_id,
        name: lodging.name,
        lodging_type: lodging.lodging_type,
        address: lodging.address,
        latitude: lodging.latitude,
        longitude: lodging.longitude,
        house_rules: lodging.house_rules,
      },
    });
    return NextResponse.json(
      { status: "OK", message: "Created successfully", data: new_lodging },
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
