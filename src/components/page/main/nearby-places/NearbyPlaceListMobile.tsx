"use client";
import quickSort from "@/lib/google-api/sort";
import { StarIcon } from "@heroicons/react/24/solid";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import CustomImage from "@/components/reusables/CustomImage";
import noIMG from "../../../../../public/icons/image-square-xmark-svgrepo-com.svg";
import Image from "next/image";
export default function NearbyPlaceListMobile({
  data,
}: {
  data: PlaceDetailsType[];
}) {
  return (
    data && (
      <>
        {quickSort(data)?.map((details) => (
          <div
            className="flex flex-col mx-3 justify-between rounded-lg shadow-xl bg-white"
            key={details.place_id}
          >
            <div className="aspect-video h-40 w-auto rounded-lg flex items-center justify-center shadow-lg sm:h-[12] lg:h-[15rem]">
              {details.photos.length > 0 ? (
                <CustomImage
                  photo_reference={details.photos[0]}
                  database={details.database}
                />
              ) : (
                <Image
                  src={noIMG}
                  alt="no Image"
                  className="object-contain h-20 w-auto  pointer-events-none"
                />
              )}
            </div>
            <div className="flex flex-col space-y-1 px-2">
              <strong className=" text-gray-900 text-lg">{details.name}</strong>
              <p className="text-gray-700 text-sm">
                {details.location.vicinity}
              </p>
            </div>
            <div className="flex items-center justify-between px-2 font-semibold text-gray-900">
              <p className="text-md font-semibold">
                <strong>{details.distance?.toFixed(2)}</strong> Km away
              </p>
              <div className="flex items-center space-x-1 p-3">
                <p>{details.rating.average}</p>
                <StarIcon className="h-3 text-gray-800" />
              </div>
            </div>
          </div>
        ))}
      </>
    )
  );
  return null;
}
