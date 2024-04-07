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
