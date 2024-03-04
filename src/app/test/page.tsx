"use client";
import MainFecthMobileSkeleton from "@/components/loading-skeleton/MainFetchMobileSkeleton";
import PhilippinesPlacesMenu from "@/components/reusables/PhilippinesPlacesMenu";
import { useState } from "react";

export default function page() {
  return (
    <section className="h-screen w-screen flex justify-center bg-background">
      <PhilippinesPlacesMenu selected={(e) => console.log(e)} />
    </section>
  );
}
