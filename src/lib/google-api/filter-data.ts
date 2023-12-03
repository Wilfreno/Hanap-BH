import { LatLngLiteral } from "../types/google-maps-api-type";
import {
  NominatimReverseAPiResponse,
  PlaceDetailsType,
  PlacesAPIResponseDetails,
} from "../types/place-detail";
import getDistance from "./distance";

export default function fiterData(
  details: PlacesAPIResponseDetails,
  nominatim_data?: NominatimReverseAPiResponse,
  user_location?: LatLngLiteral
) {
  const photo_details = details.photos?.map((photo) => {
    return {
      photo_url: photo.photo_reference,
    };
  });
  const new_data = <PlaceDetailsType>{
    owner: "",
    place_id: details.place_id,
    name: details.name,
    photos: photo_details,
    location: {
      vicinity: details.vicinity,
      province: "",
      town: {
        city: nominatim_data?.address.city || "",
        municipality: nominatim_data?.address.town || "",
      },
      barangay: "",
      street: "",
      coordinates: {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      },
    },
    price: {
      max: undefined,
      min: undefined,
    },
    rating: {
      count: details.user_ratings_total,
      average: details.rating,
    },
    rooms: 0,
    distance: getDistance(
      { lat: user_location?.lat!, lng: user_location?.lng! },
      { lng: details.geometry.location.lng, lat: details.geometry.location.lat }
    ),
    database: "GOOGLE",
    date_created: undefined,
  };

  return new_data;
}
