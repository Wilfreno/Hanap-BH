import { UserDetailType } from "./user-detail-type";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & UserDetailType;
  }
}

declare module "next-auth" {
  interface Profile {
    given_name: string;
    family_name: string;
    picture: string;
  }
}
