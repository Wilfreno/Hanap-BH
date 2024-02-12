"use client";
import Logo from "@/components/layout/header/logo/Logo";
import Map from "@/components/page/map/Map";
import MapPlaceList from "@/components/page/map/place-detail/MapPlaceList";

export default function page() {
  return (
    <section className="w-screen h-[100svh] flex">
      <nav className="fixed right-10 top-5 z-20">
        <Logo />
      </nav>
      <MapPlaceList />
      <Map />
    </section>
  );
}
