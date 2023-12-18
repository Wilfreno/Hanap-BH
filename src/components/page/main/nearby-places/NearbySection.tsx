import NearbyLoadingSkeleton from "./NearbyLoadingSkeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useRouter } from "next/navigation";
import { MapIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
const NearbyPlaceListMain = dynamic(
  () => import("@/components/page/main/nearby-places/NearbyPlacesListMain"),
  { loading: () => <NearbyLoadingSkeleton /> }
);
const NearbyPlaceListMobile = dynamic(
  () => import("@/components/page/main/nearby-places/NearbyPlaceListMobile"),
  { loading: () => <NearbyLoadingSkeleton /> }
);
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
    <section className="flex flex-col space-y-5 py-5 lg:h-[85vh]">
      <Link
        href="/map"
        as="/map"
        className="group flex items-center cursor-pointer rounded-lg hover:underline hover:scale-105 transform transition duration-300 ease-out p-2"
      >
        <h1 className="text-3xl font-bold my-5 mx-8 md:text-4xl lg:text-5xl whitespace-nowrap">
          Closest to you
        </h1>
        <MapIcon className="h-8 before:cursor-pointer text-gray-700 animate-bounce sm:group-hover:animate-bounce" />
      </Link>
      {page_width > 640 ? (
        <NearbyPlaceListMain page_width={page_width} data={data!} />
      ) : (
        <div className="flex overflow-x-auto scrollbar-hide">
          <NearbyPlaceListMobile data={data} />
        </div>
      )}
    </section>
  );
}
