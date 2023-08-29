import { LatLngLiteral } from "./google-map-type";

export type GeocodeType = {
  location: LatLngLiteral;
};

export type GeocodeResponseType = {
  results: [
    {
      geometry: {
        location: LatLngLiteral;
      };
    }
  ];
};
