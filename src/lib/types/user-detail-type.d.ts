import { Lodging, Photo, User } from "@prisma/client";
import { PhotosType } from "./room-types";

export interface UserDetailType extends Omit<User, "password | provider"> {
  photo?: Photo
  lodging?: Lodging[]
  provider: "DB" | "GOOGLE"
};

export type LocationType = {
  latitude?: number,
  longitude?: number
}