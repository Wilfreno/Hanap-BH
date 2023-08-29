import { GeocodeResponseType, GeocodeType } from "../types/geocode-type";
import { LatLngLiteral } from "../types/google-map-type";

export async function getGeocode(place_id: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY!;
  if (!apiKey) throw new Error(" NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY missing ");

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${apiKey}`
    );

    const results: GeocodeResponseType = await response.json();

    return results.results[0].geometry.location;
  } catch (err) {
    throw err;
  }
}
