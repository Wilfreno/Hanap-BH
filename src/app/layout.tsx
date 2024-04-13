import React from "react";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextAuthProvider from "@/components/page/auth/NextAuthProvider";
import ReduxProvidex from "@/components/ReduxProvidex";
import { Toaster } from "@/components/ui/toaster";

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
      <body
        className={`${poppins.className} grid grid-rows-[auto_1fr] h-[100dvh]`}
      >
        <ReduxProvidex>
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
          </NextAuthProvider>
        </ReduxProvidex>
      </body>
    </html>
  );
}
