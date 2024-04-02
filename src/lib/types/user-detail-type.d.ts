import { Lodging, Photo, User } from "@prisma/client";
import { PhotosType } from "./room-types";

export interface UserDetailType extends Omit<User, "password"> {
  photo?: Photo
  lodging?: Lodging[]
};
