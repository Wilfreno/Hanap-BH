"use client";
import HostingLodgingName from "./HostingLodgingName";
import HostingHouseRules from "./HostingLodgingHouseRules";
import HostingPhotos from "./photos/HostingLodgingPhotos";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/store";
import HostingLodgingType from "./HostingLodgingType";
import { useRef } from "react";
import HostingLodgingLocation from "./HostingLodgingLocation";

export default function HostingLodgingForm() {
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const form_ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={form_ref}
      className="grow grid py-5 px-10 space-y-[5rem]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (
          !new_lodging.name ||
          !new_lodging.lodging_type ||
          !new_lodging.photos ||
          !new_lodging.house_rules
        )
          return;
      }}
    >
      <HostingLodgingName />
      <HostingLodgingType />
      <HostingPhotos />
      <HostingHouseRules />
      <HostingLodgingLocation />
      <Button className="justify-self-end font-bold text-base">Save</Button>
    </form>
  );
}
