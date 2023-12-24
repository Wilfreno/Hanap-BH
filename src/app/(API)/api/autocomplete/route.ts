export const dynamic = "force-dynamic";
import dbConnect from "@/lib/database/connect";
import PlaceDetail from "@/lib/database/model/Place-detail";
import PlacesDetail from "@/lib/database/model/Place-detail";
import { AutocompleteType } from "@/lib/types/google-place-api/autocomplete";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search_params = request.nextUrl.searchParams;
  const query = search_params.get("search");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  try {
    await dbConnect();
    const db_response = await PlaceDetail.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { "location.vicinity": { $regex: query, $options: "i" } },
      ],
    });

    const db_data = db_response.map((data) => data.toJSON());

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}&components=country:ph&types=lodging`
    );

    const { predictions } = await response.json();

    const data = predictions.map((prediction: AutocompleteType) => {
      try {
        const {
          place_id,
          description,
          structured_formatting: { secondary_text },
        } = prediction;
        return {
          place_id,
          name: description,
          location: {
            vicinity: secondary_text,
          },
          database: "GOOGLE",
        };
      } catch (error) {
        throw error;
      }
    });

    return NextResponse.json({ data: [...data, ...db_data] }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
