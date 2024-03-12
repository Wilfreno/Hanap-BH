import Image from "next/image";
import noImg from "../../../../../public/icons/image-square-xmark-svgrepo-com.svg";
import { useState } from "react";
import { PlaceDetailsType } from "@/lib/types/place-detail";

export default function PlaceImagePreview({
  detail,
}: {
  detail: PlaceDetailsType;
}) {
  const [photo_index, setPhotoIndex] = useState<number>(0);
  return (
    <div className="grid grid-cols-[1fr_auto] items-center rounded-lg w-[70vw] mx-auto">
     
    </div>
  );
}
