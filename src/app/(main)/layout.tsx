"use client";
import FetchNearbyLodging from "@/components/FetchNearbyLodgingsAPI";
import LocationAccesDenied from "@/components/LocationAccessDenied";
import Header from "@/components/layout/header/Header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function MainLayout({
  children,
  auth,
  lodging,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  lodging: React.ReactNode;
}) {
  const path_name = usePathname();

  return (
    <LocationAccesDenied>
      <FetchNearbyLodging />
      {children}
      {path_name.startsWith("/login") || path_name.startsWith("/signup")
        ? auth
        : null}
      {path_name.startsWith("/lodging") && lodging}
    </LocationAccesDenied>
  );
}

export default function layout({
  children,
  auth,
  lodging,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  lodging: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense>
        <MainLayout lodging={lodging} auth={auth}>
          {children}
        </MainLayout>
      </Suspense>
    </>
  );
}
