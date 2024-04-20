import { Location, Lodging, Photo, Prisma, Rating, Room } from "@prisma/client";

const LodgingWithRelations = Prisma.validator<Prisma.LodgingDefaultArgs>()({
  include: { photos: true, rooms: true, location:true, ratings: true },
});

export interface LodgingDetailsType
  extends Prisma.LodgingGetPayload<typeof LodgingWithRelations> {
  distance: number;
  database: "GOOGLE" | "POSTGERSQL";
  location: LodgingLocationType;
}

export interface LodgingLocationType
  extends Omit<Location, "longitude" | "latitude"> {
  latitude: number;
  longitude: number;
}

export interface RatingDetailsType extends Omit<Rating, "value"> {
  value: number;
}

export type LodgingType =
  | "BOARDING_HOUSE"
  | "APARTMENT"
  | "HOTEL"
  | "MOTEL"
  | "B&B"
  | string;

export type LodgingSearchType = {
  search_value: string;
  lodging_type: string;
  location: PhilippinesPlaces;
  longitude: number | Decimal;
  latitude: number | Decimal;
};
