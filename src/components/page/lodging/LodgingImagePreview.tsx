import CustomImage from "@/components/CustomImage";
import { Button } from "@/components/ui/button";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LodgingImagePreview({
  photos,
  database,
}: {
  photos: LodgingDetailsType["photos"];
  database: LodgingDetailsType["database"];
}) {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-[70%] grid relative group">
      <Button
        className="hidden absolute top-1/2 -translate-y-1/2 left-7 rounded-full z-50 p-1 hover:left-6  group-hover:inline-flex"
        variant="ghost"
        size="lg"
      >
        <ChevronLeftIcon className="h-9  hover:text-primary" />
      </Button>
      <div className="aspect-video h-full w-auto max-w-full rounded-sm overflow-hidden justify-self-center self-center relative">
        <CustomImage
          database={database!}
          url={photos?.length! > 0 ? photos?.[0].photo_url : undefined}
          className="object-contain"
        />
      </div>
      <Button
        className="hidden  absolute top-1/2 -translate-y-1/2 right-7 rounded-full z-50 p-1 hover:right-6  group-hover:inline-flex "
        variant="ghost"
        size="lg"
      >
        <ChevronRightIcon className="h-9  hover:text-primary" />
      </Button>
    </div>
  );
}
