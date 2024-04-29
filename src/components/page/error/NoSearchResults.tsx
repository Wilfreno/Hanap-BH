import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function NoSearchResults() {
  return (
    <div className="self-center justify-self-center">
      <XMarkIcon className="h-[5rem] stroke-[4]" />
      <div>
        <p className="text-lg ">
          Seems like there&apos;s no lodgings nearby your location
        </p>
        <p className="text-sm">
          If you want too see lodging on specific places you can
          <span className="underline font-bold">search</span> or
          <span className="underline font-bold">browse</span> for places
        </p>
      </div>
    </div>
  );
}
