"use client";
import quickSort from "@/lib/google-api/sort";
import { useAppSelector } from "@/lib/redux/store";
import { StarIcon } from "@heroicons/react/24/solid";

export default function NearbySection() {
  const nearby_places = useAppSelector(
    (state) => state.nearby_places_details_reducer
  );
  return (
    <section className="flex flex-col mx-auto my-10 space-y-5 ">
      <h1 className="text-2xl font-semibold my-5 mx-3">Closest to you</h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        {quickSort(nearby_places)?.map((details) => (
          <div
            className="flex flex-col mx-3 justify-between rounded-lg shadow-md"
            key={details.place_id}
          >
            <span className="aspect-video h-40 w-auto rounded-lg  bg-gray-900 hover:scale-105 sm:h-80"></span>
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
      </div>
    </section>
  );
}