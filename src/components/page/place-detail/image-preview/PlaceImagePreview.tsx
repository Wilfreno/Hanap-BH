import CustomImage from "@/components/reusables/CustomImage";
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
      <div className="relative flex items-center justify-center overflow-hidden aspect-video ">
        {detail!?.photos!.length > 0 ? (
          <CustomImage
            photo_reference={detail?.photos[photo_index]!}
            database={detail?.database!}
          />
        ) : (
          <Image
            src={noImg}
            alt="no image"
            className="object-contain w-[15vw] h-auto text-gray-900 "
            priority
          />
        )}
      </div>
      <div className="grid self-center grid-cols-2 h-fu-ll">
        {detail!?.photos!.length > 1 ? (
          detail?.photos.slice(1, 5).map((photo, index) => (
            <div
              onClick={() => setPhotoIndex((index + 1) % 4)}
              className="relative p-1 h-[26vh] cursor-pointer  overflow-hidden aspect-square hover:scale-110 duration-300 ease-out"
            >
              <CustomImage photo_reference={photo} database={detail.database} />
            </div>
          ))
        ) : (
          <div className="relative flex items-center justify-center p-1 h-[26vh] hoverflow-hidden aspect-square rounded-lg border-4 border-gray-900">
            <Image
              src={noImg}
              alt="no image"
              className="object-contain w-10 h-auto text-gray-900"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
