import { PhotosType } from "./google-place-api-types";

export type UserDetailType = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  place_owned?: string[];
  gender?: string;
  birth_date?: Date;
  profile_pic: PhotosType;
  contact: {
    social_media: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
    phone_number?: string[];
  };
  password?: string;
  date_created?: Date;
};
