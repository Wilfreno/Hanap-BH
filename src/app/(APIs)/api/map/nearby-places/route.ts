import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import { savePlace } from "@/lib/database/save-place";
import { getReverseGeocode } from "@/lib/google-api/geocode";
import {
  NearbyPlaceType,
  PlaceDetailType,
} from "@/lib/types/google-place-api-types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing");

  try {
    const { lat, lng } = await request.json();

    const { municiplality } = await getReverseGeocode({ lat, lng });

    await dbConnect();

    const mongo_DB_data = await PlaceDetail.find({
      location: {
        municiplality,
      },
    });

    if (mongo_DB_data.length > 20)
      return NextResponse.json({ data: mongo_DB_data }, { status: 200 });

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${api_key}&type=lodging&location=${lat}%2C${lng}&radius=50000`
    );

    const { results } = await response.json();

    const google_response = results.map(
      (result: NearbyPlaceType): PlaceDetailType => {
         savePlace(result);
        const {
          place_id,
          geometry: { location },
          name,
          vicinity,
          rating,
        } = result;
        return {
          owner: undefined,
          place_id,
          name,
          location: {
            vicinity,
            province: "",
            municipality: "",
            barangay: "",
            street: "",
            coordinates: location,
          },
          price: {
            max: undefined,
            min: undefined,
          },
          rooms: undefined,
          contact: {
            social_media: {
              facebook: "",
              twitter: "",
              instagram: "",
            },
            phone_number: [""],
          },
          rating,
        };
      }
    );

    const filtered_mongo_DB_data = mongo_DB_data.filter(
      (data) => data.database === "MONGODB"
    );
    const nearby_place = [...google_response, ...filtered_mongo_DB_data];
    return NextResponse.json({ data: nearby_place }, { status: 200 });
  } catch (err) {
    console.log("nearby-places api error");
    return NextResponse.json({ ERROR: err }, { status: 500 });
  }
}
