import { PhotosType } from "./google-place-api/room-types";

export type UserDetailType = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  place_owned: {
    [{
      id: string,
    }];
  };
  gender?: string;
  birthday?: {
    year: number;
    month: string;
    day: number;
  };
  profile_pic: string;
  contact: {
    phone_number: string;
    social_media?: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  auth: {
    name: string;
    email: string;
  };
  date_created: Date;
};
