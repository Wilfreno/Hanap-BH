import React, { Suspense } from "react";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Provider from "@/components/page/auth/Provider";

import { SpeedInsights } from "@vercel/speed-insights/next";
const poppins = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
          {children}
          <Analytics />
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
