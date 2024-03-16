import LodgingTypes from "@/components/reusables/LodgingTypes";
import LodgingTypeCard from "../LodgingTypeCard";

export default function HostingWelcome() {
  const lodging_type = LodgingTypes();

  return (
    <main className="flex flex-col grow justify-evenly space-y-20 my-[10svh]">
      <h1 className=" text-3xl mx-auto">
        Welcome to{" "}
        <strong className="italic">
          Hanap-BH
          <sub className="text-sm text-muted-foreground">Hosting</sub>
        </strong>
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
