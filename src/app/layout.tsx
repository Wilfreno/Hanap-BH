import React from "react";
import "./globals.css";
import { Manrope } from "next/font/google";
import ReduxProvider from "@/lib/redux/ReduxProvider";
import SessionProvider from "@/components/page/auth/SessionProvider";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
const poppins = Manrope({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata = {
  title: "Hanap BH",
  description:
    "A website utilizing google maps api to locate your nearby boadring houses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={poppins.className}>
          <SessionProvider session={session}>
            <NextTopLoader
              color="#222222"
              initialPosition={0.1}
              crawlSpeed={200}
              // crawl={true}
              showSpinner={false}
              height={3}
              easing="ease"
              speed={200}
            />
            {children}
            <Analytics />
          </SessionProvider>
      </body>
    </html>
  );
}
