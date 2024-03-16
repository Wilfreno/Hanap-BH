"use client";
import Header from "@/components/layout/header/Header";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const cb = searchParams.get("callbackUrl");
  const router = useRouter();

  useEffect(() => {
    setTheme(systemTheme!);
  }, []);

  if (cb)
    router.replace(
      `${path_name}?redirect=${cb.replace(window.location.origin + "/", "")}`
    );

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
