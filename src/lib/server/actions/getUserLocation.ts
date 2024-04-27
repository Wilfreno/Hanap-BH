"use server";

export default async function getUserLocation() {
  const geolocation_api_key =
    process.env.NEXT_PUBLIC_GOOGLE_GEOLOCATION_API_KEY;
  if (!geolocation_api_key)
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_GEOLOCATION_API_KEY is missing from .env.local file"
    );

  type GeolocationResponse = {
    location: {
      lat: number;
      lng: number;
    };
  };
  try {
    const response = await fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${geolocation_api_key}`,
      {
        method: "POST",
      }
    );

    const response_json = (await response.json()) as GeolocationResponse;

    return {
      latitude: response_json.location.lat,
      longitude: response_json.location.lng,
    };
  } catch (error) {
    throw new Error(`Something went wrong : ${error}`);
  }
}
