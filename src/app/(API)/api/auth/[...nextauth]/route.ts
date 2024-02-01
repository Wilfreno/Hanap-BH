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
        email: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await User.findOne({
            $or: [
              { "auth.name": credentials?.email },
              { "auth.email": credentials!.email },
            ],
          });

          if (!user) throw new Error("User does not Exist");

          if (
            !(await bcrypt.compare(credentials?.password!, user.auth.password))
          ) {
            throw new Error("Password is incorrect");
          }
          const json_user = user.toJSON();
          delete json_user.auth.password;
          delete json_user.__v;
          return json_user;
        } catch (e) {
          throw e;
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
  session: {
    strategy: "jwt",
  },
  secret,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, profile }) {
      try {
        if (profile) {
          const { email } = user;

          await dbConnect();
          const db_user = await User.findOne({ "auth.email": email });

          if (!db_user) {
            const new_user = new User({
              given_name: profile?.given_name,
              family_name: profile?.family_name,
              profile_pic: profile?.image,
              auth: {
                email,
                name: email?.slice(0, email?.indexOf("@")),
              },
            });
            await new_user.save();
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, profile, user }) {
      if (profile) {
        console.log("PROFILE:::", profile);
        await dbConnect();
        const db_user = await User.findOne({ "auth.email": profile.email });
        const db_user_json = db_user.toJSON();
        if (db_user_json.profile_pic === "")
          db_user_json.profile_pic = profile.picture;
        delete db_user_json.auth.password;
        delete db_user_json.__v;
        delete token.name;
        delete token.picture;
        delete token.email;
        return { ...token, ...db_user_json };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      try {
        session.user = token;
        return session;
      } catch (error) {
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };
