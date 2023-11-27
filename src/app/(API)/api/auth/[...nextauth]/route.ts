import User from "@/lib/database/model/User";
import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/database/mongoclient";
import dbConnect from "@/lib/database/connect";
import bcrypt from "bcrypt";

const clientId = process.env.GOOGLE_CLIENT_ID;
if (!clientId) throw new Error("Missing GOOGLE_CLIENT_ID");

const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientSecret) throw new Error("Missing GOOGLE_CLIENT_SECRET");

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) throw new Error("Missing NEXTAUTH_SECRET");

const handler = nextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Users: "generated-users",
    },
  }),
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        user: {
          label: "user",
          type: "text",
          placeholder: "Email or Username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.user && !credentials?.password)
            throw new Error("0");
          if (!credentials.user) throw new Error("1");
          if (!credentials.password) throw new Error("2");

          await dbConnect();

          const user = await User.findOne({
            $or: [
              { "contact.email": credentials?.user },
              { "auth.user_name": credentials?.user },
            ],
          }).select("-__v");

          if (!user) {
            throw new Error("400");
          }
          if (!(await bcrypt.compare(credentials?.password!, user.password))) {
            throw new Error("401");
          }
          const filtered_user = user.toJSON();
          delete filtered_user.password;

          return filtered_user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/auth/login",
  },
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
