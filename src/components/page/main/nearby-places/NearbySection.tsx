import NearbyLoadingSkeleton from "./NearbyLoadingSkeleton";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useRouter } from "next/navigation";
import { MapIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NearbyPlacesListMain from "./NearbyPlacesListMain";
import NearbyPlaceListMobile from "./NearbyPlaceListMobile";
import NoResult from "@/components/reusables/NoResult";

export default function NearbySection({ data }: { data?: PlaceDetailsType[] }) {
  const router = useRouter();
  const [page_width, setPageWidth] = useState(0);
  useEffect(() => {
    function resizeHandler() {
      router.refresh();
      setPageWidth(window.innerWidth);
    }
    setPageWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div>
      <Link
        href="/map"
        as="/map"
        className="group flex items-center cursor-pointer rounded-lg md:justify-start lg:w-[40%] hover:underline hover:scale-105 transform transition duration-300 ease-out p-2"
      >
        <h1 className="text-3xl font-semibold my-3 mx-5 md:text-4xl lg:text-5xl whitespace-nowrap">
          Closest to you
        </h1>
        <MapIcon className="h-8 before:cursor-pointer text-gray-700 animate-bounce sm:group-hover:animate-bounce" />
      </Link>
      {data ? (
        page_width > 640 ? (
          <NearbyPlacesListMain page_width={page_width} data={data!} />
        ) : (
          <div className="flex overflow-x-auto scrollbar-hide">
            <NearbyPlaceListMobile data={data!} />
          </div>
        )
      ) : (
        <NearbyLoadingSkeleton />
      )}
    </div>
  );
}
