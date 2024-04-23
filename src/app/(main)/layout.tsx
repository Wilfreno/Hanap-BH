"use client";
import FetchNearbyLodging from "@/components/FetchNearbyLodgingsAPI";
import LocationAccesDenied from "@/components/LocationAccessDenied";
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
    <LocationAccesDenied>
      <FetchNearbyLodging />
      {children}
      {path_name.startsWith("/login") || path_name.startsWith("/signup")
        ? auth
        : null}
    </LocationAccesDenied>
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
