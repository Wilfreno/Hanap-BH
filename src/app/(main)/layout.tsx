"use client";
import Header from "@/components/layout/header/Header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MainLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  const path_name = usePathname();
  const searchParams = useSearchParams();
  const cb = searchParams.get("callbackUrl");
  const router = useRouter();

  if (cb)
    router.replace(
      `${path_name}?redirect=${cb.replace(window.location.origin + "/", "")}`
    );

  return (
    <>
      {children}
      {path_name.startsWith("/login") || path_name.startsWith("/signup")
        ? auth
        : null}
    </>
  );
}

export default function layout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense>
        <MainLayout auth={auth}>{children}</MainLayout>
      </Suspense>
    </>
  );
}
