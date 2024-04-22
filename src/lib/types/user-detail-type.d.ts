import { Lodging, Photo, User } from "@prisma/client";
import { PhotosType } from "./room-types";

export interface UserDetailType extends Omit<User, "password | provider"> {
  photo?: Photo;
  lodgings?: LodgingDetailsType[];
  provider: "DB" | "GOOGLE";
}

export type LocationType = {
  latitude?: number;
  longitude?: number;
};
