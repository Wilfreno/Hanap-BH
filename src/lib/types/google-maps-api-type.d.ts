import { Decimal } from "@prisma/client/runtime/library";

export type LatLngLiteral = {
  lat: number | Decimal;
  lng: number | Decimal;
};
export type DirectionalResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type MapType = google.maps.Map;
type GoogleMapsLibrary = (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[];
