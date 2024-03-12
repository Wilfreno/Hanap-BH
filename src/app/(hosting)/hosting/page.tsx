"use client";
import LodgingTypeCard from "@/components/page/hosting/LodgingTypeCard";
import LodgingTypes from "@/components/reusables/LodgingTypes";

export default function page() {
  const lodging_type = LodgingTypes();

  return (
    <main className="flex flex-col grow justify-evenly space-y-20 my-[10svh]">
      <h1 className=" text-3xl mx-auto">
        Welcome to <span className="font-bold italic">Hanap-BH</span>
        <i className="mx-2 text-muted-foreground">Hosting</i>
      </h1>
      <section className="flex flex-col">
        <p className="mx-auto text-lg ">
          Choose the lodging type you want to host
        </p>
        <div className="grid grid-cols-5 gap-3 p-5 items-center">
          {lodging_type.map((lodging) => (
            <LodgingTypeCard key={lodging.name} lodging={lodging} />
          ))}
        </div>
      </section>
    </main>
  );
}
