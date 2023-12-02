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
      try {
        if (account?.provider === "google") {
          await dbConnect();
          const user_result = await User.findOne({
            "contact.email": profile?.email,
          });

          if (!user_result) {
            const new_user = new User({
              given_name: profile?.given_name.toLowerCase()!,
              middle_name: "",
              family_name: profile?.family_name.toLowerCase()!,
              profile_pic: profile?.picture!,
              contact: {
                email: profile?.email?.toLowerCase()!,
                social_media: {
                  facebook: "",
                  twitter: "",
                  instagram: "",
                },
                phone_number: [],
              },
              auth: {
                user_name: profile?.given_name.toLocaleLowerCase()!,
              },
            });

            await new_user.save();
          }
          return true;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          token: {
            ...user,
          },
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      await dbConnect();
      console.log("TOKEN: ", token);
      console.log("USER: ", user);

      const user_result = await User.findOne({
        "contact.email": token.email?.toLowerCase()!,
      }).select("-password -__v");

      if (!user_result) {
        session.user.given_name = "";
        session.user.email = token.email;
        session.user.profile_pic = token.picture!;
        return session;
      }

      const filtered_user = user_result.toJSON();
      filtered_user.id = filtered_user._id;
      delete filtered_user._id;
      session.user = filtered_user;
      console.log("SESSION2 ", session);

      return session;
    },
  },
});

export { handler as GET, handler as POST };
