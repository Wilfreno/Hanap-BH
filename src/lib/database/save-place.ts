import mongoose from "mongoose";
import PlaceDetail from "./model/Place-detail";
import Rating from "./model/Rating";
import { NearbyPlaceType } from "../types/google-place-api-types";
import { getReverseGeocode } from "../google-api/geocode";
import Photos from "./model/Photos";
import dbConnect from "./connect";

export async function savePlace(data: NearbyPlaceType) {
  try {
    await dbConnect();

    const {
      place_id,
      geometry: { location },
      name,
      vicinity,
      photos: [{ height, width, photo_reference }],
      rating,
    } = data;

    if (await alreadyExist(place_id)) return;

    const { municipality } = await getReverseGeocode(location);
    const placeRating = new Rating({
      place_id,
      rating_value: rating,
    });

    await placeRating.save();

    const place_detail = new PlaceDetail({
      place_id,
      name,
      location: {
        vicinity,
        municipality,
        coordinates: location,
      },
      rating,
      database: "GOOGLE",
    });

    const saved_place_detail = await place_detail.save();

    const photo_detail = new Photos({
      reference: saved_place_detail.place_id,
      height,
      width,
      photo_url: photo_reference,
    });

    const saved_photo = await photo_detail.save();
    console.log("photo: ", saved_photo);
  } catch (err) {
    console.log("saveplace error");
    throw err;
  }
}

export async function alreadyExist(id: string) {
  try {
    const place = await PlaceDetail.findOne({ place_id: id });
    if (place !== null) return true;
    return false;
  } catch (error) {
    throw error;
  }
}
