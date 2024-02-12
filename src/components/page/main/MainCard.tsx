import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/outline";
import PlaceImage from "@/components/reusables/PlaceImage";

export default function MainCard({ place }: { place: PlaceDetailsType }) {
  return (
    <>
      <div className="relative overflow-hidden w-full h-auto rounded-t-sm sm:rounded-t-lg flex">
        <PlaceImage photo={place.photos[0]} />
      </div>
      <div className="p-1 h-[20vh] flex flex-col justify-between">
        <div className="space-y-1 px-1">
          <p className="font-bold sm:text-sm md:text-base lg:text-xl truncate">
            {/* {place?.name.length > 20
              ? `${place?.name.slice(0, 20)}...`
              : place?.name} */}
            {place.name}
          </p>
          <h2 className="text-xs text-muted-foreground">
            {place?.location.vicinity}
          </h2>
        </div>
        <div className="flex items-center justify-between text-xs font-semibold p-2">
          <p>{place?.distance.toFixed(2)} Km away</p>
          <p className="flex items-center space-x-2">
            {place?.rating.average}
            <StarIcon className="h-4 w-auto" />
          </p>
        </div>
      </div>
    </>
  );
}
