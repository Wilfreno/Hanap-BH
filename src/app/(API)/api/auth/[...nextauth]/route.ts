import User from "@/lib/database/model/User";
import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/database/connect";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
const google_client_id = process.env.GOOGLE_CLIENT_ID;
if (!google_client_id) throw new Error("Missing GOOGLE_CLIENT_ID");
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
if (!google_client_secret) throw new Error("Missing GOOGLE_CLIENT_SECRET");

// const facebook_client_id = process.env.FACEBOOK_CLIENT_ID;
// if (!facebook_client_id) throw new Error("FACEBOOK_CLIENT_ID");
// const facebook_client_secret = process.env.FACEBOOK_CLIENT_SECRET;
// if (!facebook_client_secret) throw new Error("FACEBOOK_CLIENT_SECRET");

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) throw new Error("Missing NEXTAUTH_SECRET");

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "user", type: "text", placeholder: "User" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        let email_name = "";
        const at_index = credentials?.user.indexOf("@");
        if (at_index)
          email_name = credentials?.user.slice(0, at_index) as string;
        try {
          await dbConnect();
          const user = await User.findOne({
            $or: [
              { "auth.name": email_name },
              { "auth.email": credentials!.user },
            ],
          });

          if (!user) throw new Error("User does not Exist");

          if (
            !(await bcrypt.compare(credentials?.password!, user.auth.password))
          )
            throw new Error("Password Incorrect");

          return user.toJSON();
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: google_client_id,
      clientSecret: google_client_secret,
    }),
    // FacebookProvider({
    //   clientId: facebook_client_id,
    //   clientSecret: facebook_client_secret,
    // }),
  ],
  secret,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const { email } = user;

        await dbConnect();
        const db_user = await User.findOne({ "contact.email": email });

        if (!db_user) {
          const new_user = new User({
            given_name: profile?.given_name,
            family_name: profile?.family_name,
            profile_pic: profile?.image,
            contact: {
              email,
            },
          });
          await new_user.save();
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      try {
        const { email } = token;
        await dbConnect();
        const db_user = await User.findOne({ "contact.email": email });

        session.user = db_user.toJSON();
        delete session.user._id;
        delete session.user.__v;
        session.user.id = db_user._id;
        return session;
      } catch (error) {
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };
