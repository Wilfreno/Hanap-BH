"use  server";

import dbConnect from "../database/connect";
import PlaceDetail from "../database/model/Place-detail";
import { AutocompleteType } from "../types/google-place-api/autocomplete";

export async function autocomplete(value: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing ");

  try {
    await dbConnect();
    const db_response = await PlaceDetail.find({
      $or: [
        { name: { $regex: value, $options: "i" } },
        {
          "location.vicinity": {
            $regex: value,
            $options: "i",
          },
        },
      ],
    });

    const db_data = db_response.map((data) => data.toJSON());

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${value}&components=country:ph&types=lodging`
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

    return { data: [...data, ...db_data] };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
