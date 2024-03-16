import FavoriteMark from "@/components/reusables/FavoriteMark";
import GoogleMark from "@/components/reusables/GoogleMark";
import PlaceImage from "@/components/reusables/PlaceImage";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon } from "@heroicons/react/24/outline";

export default function MainContentCard({
  place,
}: {
  place: PlaceDetailsType;
}) {
  return (
    <>
      <div className="aspect-square relative overflow-hidden w-full h-auto rounded-t-sm sm:rounded-lg">
        <PlaceImage photo={place.photos ? place.photos[0] : undefined} />

        <GoogleMark place={place} />
        <FavoriteMark
          place={place}
          className="h-6 w-auto absolute top-2 right-2"
        />
      </div>
      <div className="my-2 space-y-5">
        <div>
          <h1 className="font-bold sm:text-sm truncate">{place.name}</h1>
          <h2 className="text-xs text-muted-foreground truncate">
            {place?.location.vicinity}
          </h2>
          <div className="flex items-center space-x-2 mx-auto font-bold text-muted-foreground">
            <p>
              ₱
              {place.price?.min ? (
                place.price.min
              ) : (
                <span className=" font-normal mx-1">- -</span>
              )}
            </p>
            <p>~</p>
            <p>
              ₱
              {place.price?.max ? (
                place.price.max
              ) : (
                <span className=" font-normal mx-1">- -</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs font-semibold p-1">
          <p>{place?.distance?.toFixed(2)} Km away</p>
          <p className="flex items-center space-x-2">
            {place?.rating?.average!}
            <StarIcon className="h-4 w-auto" />
          </p>
        </div>
      </div>
    </>
  );
}
