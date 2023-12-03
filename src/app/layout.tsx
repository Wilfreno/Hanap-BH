import React from "react";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/components/page/auth/Provider";
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
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          <NextTopLoader
            color="#222222"
            initialPosition={0.1}
            crawlSpeed={200}
            crawl={true}
            showSpinner={false}
            height={3}
            easing="ease"
            speed={200}
          />
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
