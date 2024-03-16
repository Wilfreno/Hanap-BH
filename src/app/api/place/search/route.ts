import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import getDistance from "@/lib/google-api/distance";
import { PlaceDetailsType, PlacesAPIResult } from "@/lib/types/place-detail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const query = await request.json();

  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  try {
    const db_autocomplete_query = [];
    const db_location_query = [];
    if (!!query.autocomplete) {
      db_autocomplete_query.push({
        name: { $regex: query.autocomplete, $options: "i" },
      });
      db_autocomplete_query.push({
        "location.vicinity": { $regex: query.autocomplete, $options: "i" },
      });
    }
    if (!!query.location?.province)
      db_location_query.push({ "location.province ": query.location.province });

    if (!!query.location?.municipality_city)
      db_location_query.push({
        "location.municipality_city": query.location.municipality_city,
      });

    if (!!query.location?.barangay)
      db_location_query.push({ "location.barangay": query.location.barangay });

    if (!!query.lodging_type)
      db_location_query.push({ lodging_type: query.lodging_type });

    await dbConnect();

    const db_response = await PlaceDetail.find({
      $and: [
        {
          $or: db_autocomplete_query,
        },
        ...db_location_query,
      ],
    });

    const db_data = db_response.map((data) => data.toJSON());

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input=${query.autocomplete}&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();
    console.log(predictions);

    let data = [] as PlaceDetailsType[];
    for (let i = 0; i < predictions.length - 1; i++) {
      const places_api_response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&place_id=${predictions[i].place_id}`
      );
      const { result } = await places_api_response.json();

      data.push({
        owner: "",
        place_id: result.place_id,
        name: result.name,
        photos: result.photos
          ? result.photos.map((photo: any) => photo.photo_reference)
          : [],
        location: {
          vicinity: result.vicinity,
          province: "",
          town: {
            city: "",
            municipality: "",
          },
          barangay: "",
          street: "",
          coordinates: result.geometry?.location,
        },
        price: {
          max: undefined,
          min: undefined,
        },
        rating: {
          count: 1,
          average: result.rating,
        },
        rooms: 0,
        distance: getDistance(
          { lat: Number(query.lat), lng: Number(query.lng) },
          {
            lng: result.geometry?.location?.lng,
            lat: result.geometry?.location?.lat,
          }
        ),
        database: "GOOGLE",
      });
    }

    const result = [...data, ...db_data];
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
