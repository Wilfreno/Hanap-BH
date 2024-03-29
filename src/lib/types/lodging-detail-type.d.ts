export interface LodgingDetailsType extends Lodging {
  distance: number;
  database: "GOOGLE" | "MONGODB";
  photos?: Photo[]
  rooms?: Room[]
}

export type Lodging_Type = "BOARDING_HOUSE";
