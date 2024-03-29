export type PhilippinesPlaces = {
  province: PSGCResponseType;
  municipality_city: PSGCResponseType;
  barangay: PSGCResponseType;
};
export type PhilippinesPlacesList = {
  province: PSGCResponseType[];
  municipality_city: PSGCResponseType[];
  barangay: PSGCResponseType[];
};
export type PSGCResponseType = {
  name: string;
  code: string;
};
