import { User } from "@prisma/client";
import { UserDetailType } from "./user-detail-type";
import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserDetailType;
  }
}

declare module "next-auth" {
  interface Profile {
    given_name: string;
    family_name: string;
    picture: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserDetailType{
    
  }
}
