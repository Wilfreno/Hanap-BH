"use client";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/mobile/Footer";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function layout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing");
  const path_name = usePathname();
  const { setTheme, systemTheme } = useTheme();
  useEffect(() => {
    setTheme(systemTheme!);
  }, []);

  return (
    <>
      <Header />
      <>
        <APIProvider apiKey={api_key}>{children}</APIProvider>
        {path_name.startsWith("/login") || path_name.startsWith("/signup")
          ? auth
          : null}
      </>
      <Footer />
    </>
  );
}
