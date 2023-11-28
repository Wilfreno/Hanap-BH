"use client";
import quickSort from "@/lib/google-api/sort";
import { StarIcon } from "@heroicons/react/24/solid";
import { PlaceDetailsType } from "@/lib/types/place-detail";
export default function NearbyPlaceListMobile({
  data,
}: {
  data?: PlaceDetailsType[];
}) {
  if (data && data[0].place_id !== "") {
    return (
      <>
        {quickSort(data)?.map((details) => (
          <div
            className="flex flex-col mx-3 justify-between rounded-lg shadow-xl bg-white"
            key={details.place_id}
          >
            <div className="aspect-video h-40 w-auto rounded-lg bg-gray-900"></div>
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
    );
  }
  return null;
}
