import CustomImage from "@/components/reusables/CustomImage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export default function LodgingImageList({
  photo_enhance,
  photo_index,
  setPhotoIndex,
  photos,
}: {
  photo_enhance: boolean;
  photos: LodgingDetailsType["photos"];
  photo_index: number;
  setPhotoIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <motion.div
      animate={photo_enhance ? { width: "90%" } : { width: "70%" }}
      className="grid grid-flow-col h-[10dvh] border-2 rounded-lg p-1 space-x-3"
    >
      {photos?.map((photo, index) => (
        <motion.span
          key={photo.id}
          whileHover={index !== photo_index ? { scale: 1.05 } : undefined}
          className={cn(
            "aspect-video h-full w-auto relative  overflow-hidden rounded-lg",
            index === photo_index
              ? "opacity-50"
              : "cursor-pointer hover:opacity-50"
          )}
          onClick={() => setPhotoIndex(index)}
        >
          <CustomImage photo={photo.photo_url!} />
        </motion.span>
      ))}
    </motion.div>
  );
}
