import { JWT } from "next-auth/jwt";
import { UserDetailType } from "./user-detail-type";
import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: UserDetailType;
//   }
// }

declare module "next-auth" {
  interface Profile {
    given_name: string;
    family_name: string;
    picture: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserDetailType {}
}

declare module "next-auth" {
  interface User {
    
  }
}