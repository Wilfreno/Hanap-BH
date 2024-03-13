"use client";
import Header from "@/components/layout/header/Header";
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
  const path_name = usePathname();
  const { setTheme, systemTheme } = useTheme();
  useEffect(() => {
    setTheme(systemTheme!);
  }, []);

  return (
    <>
      <Header />
      {children}
      {path_name.startsWith("/login") || path_name.startsWith("/signup")
        ? auth
        : null}
    </>
  );
}
