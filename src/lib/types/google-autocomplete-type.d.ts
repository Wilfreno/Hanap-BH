import { LatLngLiteral } from "./google-map-type";

export type AutocompleteType = {
  description: string;
  place_id: string;
  structured_formatting: {
    secondary_text: string;
  };
  geocode?: LatLngLiteral;
};
