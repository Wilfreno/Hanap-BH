"use client";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";

export default function FavoriteMark({
  lodging,
  ...props
}: {
  lodging: LodgingDetailsType;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  const [clicked, setClicked] = useState(false);
  return (
    <i {...props}>
      <HeartIcon
        className={cn(
          "h-full w-auto hover:fill-red-500 text-muted-foreground hover:text-red-500 hover:scale-125 cursor-pointer",
          clicked && "fill-red-500 text-red-500"
        )}
        onClick={() => setClicked((prev) => !prev)}
      />
    </i>
  );
}
