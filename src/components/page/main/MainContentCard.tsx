import FavoriteMark from "@/components/reusables/FavoriteMark";
import GoogleMark from "@/components/reusables/GoogleMark";
import PlaceImage from "@/components/reusables/PlaceImage";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { StarIcon } from "@heroicons/react/24/outline";

export default function MainContentCard({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  return (
    <>
      <div className="aspect-square relative overflow-hidden w-full h-auto rounded-t-sm sm:rounded-lg">
        <PlaceImage
          photo={
            lodging?.photos?.length! > 0
              ? lodging?.photos?.[0].photo_url
              : undefined
          }
        />

        <GoogleMark database={lodging.database} />
        <FavoriteMark
          lodging={lodging}
          className="h-6 w-auto absolute top-2 right-2"
        />
      </div>
      <div className="my-2 space-y-5">
        <div>
          <h1 className="font-bold sm:text-sm truncate">{lodging.name}</h1>
          <h2 className="text-xs text-muted-foreground truncate">
            {lodging?.address}
          </h2>
        </div>
        <div className="flex items-center justify-between text-xs font-semibold p-1">
          <p>{lodging?.distance?.toFixed(2)} Km away</p>
          <p className="flex items-center space-x-2">
            {lodging?.ratings.reduce((a, b) => a + Number(b.value), 0)}
            <StarIcon className="h-4 w-auto" />
          </p>
        </div>
      </div>
    </>
  );
}
