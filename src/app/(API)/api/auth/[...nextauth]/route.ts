import User from "@/lib/database/model/User";
import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
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
      const { email } = token;
      await dbConnect();
      const db_user = await User.findOne({ "contact.email": email });

      delete token.name;
      delete token.email;
      delete token.image;
      token.id = db_user._id;
      token.given_name = db_user.given_name;
      token.middle_name = db_user.middle_anme;
      token.family_name = db_user.family_name;
      token.place_owned = db_user.place_owned;
      token.gender = db_user.gender;
      token.birth_date = db_user.birth_date;
      token.profile_pic = db_user.profile_pick;
      token.contact.email = db_user.contact.email;
      token.contact.phone_number = db_user.contact.phone_number;
      token.contact.social_media.facebook =
        db_user.contact.social_media.facebook;
      token.contact.social_media.twitter = db_user.contact.social_media.twitter;
      token.contact.social_media.instagram =
        db_user.contact.social_media.instagram;
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
