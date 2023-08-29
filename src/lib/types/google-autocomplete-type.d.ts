import { LatLngLiteral } from "./google-map-type";

export type AutocompleteType = {
  description: string;
  place_id: string;
  vicinity: string;
  location?: LatLngLiteral;
};
