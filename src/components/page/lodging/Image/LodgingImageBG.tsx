import CustomImage from "@/components/CustomImage";
import { Photo } from "@prisma/client";
import { motion } from "framer-motion";

export default function LodgingImageBG({
  photo_enhance,
  photo,
}: {
  photo_enhance: boolean;
  photo: Photo;
}) {
  return (
    <motion.div
      animate={photo_enhance ? { opacity: 0.4 } : { opacity: 0.2 }}
      className="top-0 left-0 -z-10 overflow-hidden absolute h-full w-full"
    >
      <CustomImage
        asBackground
        photo={photo?.photo_url!}
        className="object-fit blur-sm"
      />
    </motion.div>
  );
}
