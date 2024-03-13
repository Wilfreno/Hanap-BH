import { PlaceDetailsType } from "@/lib/types/place-detail";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";
import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";

export default function FavoriteMark({
  place,
  ...props
}: {
  place: PlaceDetailsType;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  const [clicked, setClicked] = useState(false);
  return (
    <i {...props}>
      <HeartIcon
        className={cn(
          "h-full w-auto hover:fill-red-500 text-muted-foreground hover:text-red-500 hover:scale-125",
          clicked && "fill-red-500 text-red-500"
        )}
        onClick={() => setClicked((prev) => !prev)}
      />
    </i>
  );
}
