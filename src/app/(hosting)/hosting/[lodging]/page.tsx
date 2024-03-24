"use client";
import HostingForm from "@/components/page/hosting/form/HostingForm";
import LodgingTypes from "@/components/reusables/LodgingTypes";

export default function page({ params }: { params: { lodging: string } }) {
  const lodging_type = LodgingTypes();
  const lodging = lodging_type.filter(
    (lodging) => lodging.link === params.lodging
  )[0];

  return (
    <main className="flex h-full w-full overflow-hidden">
      <section className="h-full w-full flex flex-col items-center p-[10svh] space-y-[10svh]">
        <h1 className="font-bold text-3xl">{lodging.name}</h1>
        <p className="my-auto">{lodging.description}</p>
      </section>
      <HostingForm />
    </main>
  );
}
