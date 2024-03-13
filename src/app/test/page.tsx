"use client";
import PhilippinesPlacesMenu from "@/components/reusables/PhilippinesPlacesMenu";

export default function page() {
  return (
    <section className="h-screen w-screen flex justify-center bg-background">
      <PhilippinesPlacesMenu selected={(e) => console.log(e)} />
    </section>
  );
}
