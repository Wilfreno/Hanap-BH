import { LatLngLiteral } from "../types/google-maps-api-type";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY!;
if (!api_key) throw new Error(" NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY missing ");

export async function getGeocode(place_id: string) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${api_key}`
    );

    const { results } = await response.json();

    return results[0].geometry.location;
  } catch (err) {
    throw err;
  }
}

export async function getReverseGeocode(location: LatLngLiteral) {
  const { lat, lng } = location;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}&result_type=locality`
    );

    const { results } = await response.json();

    return {
      municipality: results[0].address_components[0].long_name.toLowerCase(),
    };

    return results;
  } catch (error) {
    throw error;
  }
}
