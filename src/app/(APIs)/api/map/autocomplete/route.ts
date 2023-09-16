import PlacesDetail from "@/lib/database/model/Place-detail";
import { getGeocode } from "@/lib/google-api/geocode";
import { ratingClasses } from "@mui/material";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  const { query } = await request.json();

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}&radius=50000&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();

    const data = predictions.map(
      async (prediction: {
        place_id: string;
        description: string;
        vicinity: string;
      }) => {
        try {
          const { place_id, description, vicinity } = prediction;
          const coordinates = await getGeocode(place_id);

          if (!(await findDuplicate(place_id))) {
            savePlace({
              owner: undefined,
              place_id,
              name: prediction.description,
              location: {
                vicinity,
                province: undefined,
                municipality: undefined,
                barangay: undefined,
                street: undefined,
                coordinates,
              },
              photo: {
                height: undefined,
                width: undefined,
                photo_reference: "",
              },
              price: {
                max: undefined,
                min: undefined,
              },
              vacant_rooms: undefined,

              rating: undefined,
            });
            return {
              owner: undefined,
              place_id,
              name: prediction.description,
              location: {
                vicinity,
                province: undefined,
                municipality: undefined,
                barangay: undefined,
                street: undefined,
                coordinates,
              },
              photo: {
                height: undefined,
                width: undefined,
                photo_reference: "",
              },
              price: {
                max: undefined,
                min: undefined,
              },
              vacant_rooms: undefined,

              rating: undefined,
            } as PlaceDetailType;
          }
        } catch (error) {}
      }
    );

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

async function findDuplicate(data: string) {
  const result = await PlacesDetail.find({ place_id: data });
  if (!result || result.length <= 0) return false;

  return true;
}
