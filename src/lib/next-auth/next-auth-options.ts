import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import exclude from "@/lib/prisma/exclude";
import { AuthOptions } from "next-auth";
import prisma from "@/lib/prisma/client";

const google_client_id = process.env.GOOGLE_CLIENT_ID;
if (!google_client_id) throw new Error("Missing GOOGLE_CLIENT_ID");
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
if (!google_client_secret) throw new Error("Missing GOOGLE_CLIENT_SECRET");

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) throw new Error("Missing NEXTAUTH_SECRET");

// const facebook_client_id = process.env.FACEBOOK_CLIENT_ID;
// if (!facebook_client_id) throw new Error("FACEBOOK_CLIENT_ID");
// const facebook_client_secret = process.env.FACEBOOK_CLIENT_SECRET;
// if (!facebook_client_secret) throw new Error("FACEBOOK_CLIENT_SECRET");

const auth_options: AuthOptions = {
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
          const prisma_client = prisma;

          const user = await prisma_client.user.findFirst({
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
          const prisma_client = prisma;
          const db_user = await prisma_client.user.findFirst({
            where: { email: { startsWith: email! } },
          });

          if (!db_user) {
            await prisma_client.user.create({
              data: {
                email: email!,
                first_name: profile.given_name,
                last_name: profile.family_name,
                photo: {
                  create: {
                    photo_url: profile.picture,
                  },
                },
                provider: "GOOGLE",
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.error("ISngUP::", error);
        return false;
      }
    },
    async jwt({ token, profile, user, trigger, session }) {
      if (trigger && session?.lodgings)
        return {
          ...token,
          lodgings: [...token.lodgings!, session.lodgings.data],
        };

      if (profile) {
        const prisma_client = prisma;
        const db_user = await prisma_client.user.findFirst({
          where: { email: { startsWith: profile.email } },
          include: {
            photo: true,
            lodgings: { include: { rooms: true } },
            rated: true,
            contacts: true,
          },
          relationLoadStrategy: "join",
        });

        const filtered_user = exclude(db_user, ["password"] as any);
        return { ...token, ...filtered_user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      try {
        session.user = token as any;
        return session;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default auth_options;
