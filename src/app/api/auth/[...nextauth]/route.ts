import nextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import exclude from "@/lib/prisma/exclude";

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
          const prisma = new PrismaClient();

          const user = await prisma.user.findFirst({
            where: { email: { startsWith: credentials?.email } },
          });

          if (!user) throw new Error("User does not Exist");

          if (!(await bcrypt.compare(credentials?.password!, user.password!))) {
            throw new Error("Password is incorrect");
          }
          const filtered_user = exclude(user, ["password"]);
          return filtered_user as User;
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
  pages: {
    signIn: "/login",
    error: "/",
  },
  secret,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, profile }) {
      try {
        if (profile) {
          const { email } = user;
          const prisma = new PrismaClient();
          const db_user = await prisma.user.findFirst({
            where: { email: { startsWith: email! } },
          });

          if (!db_user) {
            const new_user = await prisma.user.create({
              data: {
                email: email!,
                first_name: profile.given_name,
                last_name: profile.family_name,
              },
            });

            const profile_photo = await prisma.photo.create({
              data: {
                photo_url: profile.image!,
                width: 0,
                heigth: 0,
                user_id: new_user.id,
              },
            });
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, profile, user }) {
      if (profile) {
        const prisma = new PrismaClient();
        const db_user = await prisma.user.findFirst({
          where: { email: { startsWith: profile.email } },
          include: { photo: true },
          relationLoadStrategy: "join",
        });

        const filtered_user = exclude(db_user, ["password"] as any);

        return { ...token, ...filtered_user };
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
