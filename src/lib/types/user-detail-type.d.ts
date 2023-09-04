export type UserDetailType = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  place_owned?: Schema.Types.ObjectId[];
  gender?: string;
  birth_date: Date;
  address: string;
  profile_pic: string;
  contact: {
    social_media: {
      facebok?: string;
      twitter?: string;
      instagram?: string;
    };
    phone_number?: string;
  };
  password: string;
  date_created: Date;
};
