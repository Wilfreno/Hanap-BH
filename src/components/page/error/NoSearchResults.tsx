import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function NoSearchResults() {
  return (
    <div className="self-center justify-self-center grid place-items-center">
      <XMarkIcon className="h-[5rem] stroke-[4] " />
      <p className="text-xl font-bold">No Result</p>
    </div>
  );
}
