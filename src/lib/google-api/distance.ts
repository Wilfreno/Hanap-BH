import { LatLngLiteral } from "../types/google-maps-api-type";

export default function getDistance(
  location_1: LatLngLiteral  ,
  location_2: LatLngLiteral 
) {
  const earth_radius_km = 6371;

  const lat_radiance_1 = (Math.PI / 180) * Number(location_1.lat);
  const lat_radiance_2 = (Math.PI / 180) * Number(location_2.lat);

  const lat_distance = ((Number(location_2.lat) - Number(location_1.lat)) * Math.PI) / 180;
  const lng_distance = ((Number(location_2.lng) - Number(location_1.lng)) * Math.PI) / 180;

  const a =
    Math.pow(Math.sin(lat_distance / 2), 2) +
    Math.pow(Math.sin(lng_distance / 2), 2) *
      Math.cos(lat_radiance_1) *
      Math.cos(lat_radiance_2);

  const c = 2 * Math.asin(Math.sqrt(a));

  const distance = earth_radius_km * c;

  return distance;
}
