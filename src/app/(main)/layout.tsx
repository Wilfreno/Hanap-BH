"use client";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/mobile/Footer";
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
  const path_name = usePathname();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setTheme(theme!);
  }, []);
  return (
    <>
      <Header />
      <>
        {children}
        {path_name.startsWith("/login") || path_name.startsWith("/signup")
          ? auth
          : null}
      </>
      <Footer />
    </>
  );
}
