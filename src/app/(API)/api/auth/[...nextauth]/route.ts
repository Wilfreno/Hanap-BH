import User from "@/lib/database/model/User";
import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/database/mongoclient";
import dbConnect from "@/lib/database/connect";
import FacebookProvider from "next-auth/providers/facebook";

const google_client_id = process.env.GOOGLE_CLIENT_ID;
if (!google_client_id) throw new Error("Missing GOOGLE_CLIENT_ID");
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
if (!google_client_secret) throw new Error("Missing GOOGLE_CLIENT_SECRET");

const facebook_client_id = process.env.FACEBOOK_CLIENT_ID;
if (!facebook_client_id) throw new Error("FACEBOOK_CLIENT_ID");
const facebook_client_secret = process.env.FACEBOOK_CLIENT_SECRET;
if (!facebook_client_secret) throw new Error("FACEBOOK_CLIENT_SECRET");

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) throw new Error("Missing NEXTAUTH_SECRET");

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: google_client_id,
      clientSecret: google_client_secret,
    }),
    FacebookProvider({
      clientId: facebook_client_id,
      clientSecret: facebook_client_secret,
    }),
  ],
  secret,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, profile, account }) {
      const {} = user 
      try {
       
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user, profile, account }) {
      // if (user) {
      //   return {
      //     token: {
      //       ...user,
      //     },
      //   };
      // }
      console.log("Session token: ", token);
      console.log("JWT  user:", user);
      console.log("JWT profile: ", profile);
      console.log("JWT account: ", account);
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session : user", user);
      console.log("Session token: ", token);
      console.log("Session session: ", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
