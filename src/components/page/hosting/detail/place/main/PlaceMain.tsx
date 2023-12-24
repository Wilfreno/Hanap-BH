"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function PlaceMain() {
  const search_params = useSearchParams();
  const page = search_params.get("page");
  return (
    <div className="flex flex-col self-start items-center my-10 space-y-10 ">
      <h1 className="text-6xl font-bold whitespace-nowrap">
        <i className="mx-2">Hanap-Bh</i> Hosting
      </h1>
      <h2 className="text-3xl text-center">
        Provide your Boarding / Lodging house details{" "}
      </h2>
      <div>
        <h3 className="text-2xl font-semibold italic">
          {page === "place-name" && "Name your place to make it easier to find"}
          {page === "address" &&
            "Provide the correct address so people can find your place easier"}
        </h3>
      </div>
    </div>
  );
}
