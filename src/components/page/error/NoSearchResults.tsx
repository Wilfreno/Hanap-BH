import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function NoSearchResults({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "grid",
        children
          ? "grid-rows-[auto_1fr]"
          : " place-self-center place-items-center"
      )}
    >
      {children}
      <XMarkIcon className="h-[5rem] stroke-[4]" />
      <div>
        <p className="text-lg ">
          Seems like there's no lodgings nearby your location
        </p>
        <p className="text-sm">
          If you want too see lodging on specific places you can{" "}
          <span className="underline font-bold">search</span> or{" "}
          <span className="underline font-bold">browse</span> for places
        </p>
      </div>
    </section>
  );
}
