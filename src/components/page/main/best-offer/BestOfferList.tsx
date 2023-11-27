import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import noIMG from "../../../../../public/image-square-xmark-svgrepo-com.svg";
import Image from "next/image";
export default function BestOfferList({
  data,
  token,
}: {
  token: string;
  data: PlaceDetailsType[];
}) {
  if (data && data[0].place_id !== "") {
    return (
      <>
        {data?.map((details: PlaceDetailsType) => (
          <div
            className="flex flex-col my-5 p-1 shadow-lg w-full rounded-lg space-y-5 sm:w-[13rem] md:w-[18rem] md:mx-5 md:p-0 hover:scale-105 transform transition duration-300 ease-out"
            key={details.place_id}
          >
            <div className="relative aspect-square h-auto w-full rounded-lg flex items-center justify-center shadow-md">
              <Image
                src={noIMG}
                alt="No image"
                className="object-contain h-20 w-auto"
              />
            </div>
            <div className="relative group flex flex-col space-y-1 p-3 ">
              {details.name.length > 25 ? (
                <p className="hidden absolute -top-[20%] bg-white shadow-md  whitespace-nowrap text-xs rounded-lg p-1 font-semibold group-hover:flex transition duration-200 delay-200 ease-in-out">
                  {details.name}
                </p>
              ) : null}
              <strong className="text-xl text-gray-900 whitespace-nowrap">
                {details.name.length > 25
                  ? `${details.name.slice(0, 25)}...`
                  : details.name}
              </strong>
              <p className="text-md text-gray-700 truncate whitespace-nowrap">
                {details.location.vicinity.length > 30
                  ? `${details.location.vicinity.slice(0, 30)}...`
                  : details.location.vicinity}
              </p>
            </div>
            <div className="flex items-center justify-between font-semibold text-gray-900 p-3">
              <p>
                <strong>{details.distance?.toFixed(2)}</strong> km Away
              </p>
              <div className="flex items-center space-x-3 ">
                <p>{details.rating.average}</p>
                <StarIcon className="h-5" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
