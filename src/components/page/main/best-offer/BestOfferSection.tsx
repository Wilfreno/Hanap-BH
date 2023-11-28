import { PlaceDetailsType } from "@/lib/types/place-detail";
import BestOfferLoadingSkeleton from "./BestOfferLoadingSkeleton";
import dynamic from "next/dynamic";
import { MapIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
const BestOfferList = dynamic(
  () => import("@/components/page/main/best-offer/BestOfferList"),
  {
    loading: () => <BestOfferLoadingSkeleton />,
  }
);
export default function BestOfferSection({
  data,
  token,
}: {
  token: string;
  data?: PlaceDetailsType[];
}) {
  return (
    <section className="flex flex-col space-y-5 mt-10">
      <Link
        href="/map"
        as="/map"
        className="group flex items-center cursor-pointer rounded-lg md:justify-center lg:w-[40%] hover:underline hover:scale-105 transform transition duration-300 ease-out p-2"
      >
        <h1 className="text-3xl font-semibold my-5 mx-3 md:mx-8 md:text-4xl lg:text-5xl whitespace-nowrap">
          Best Offers Nearby
        </h1>
        <MapIcon className="h-8 cursor-pointer text-gray-700 animate-bounce sm:group-hover:animate-bounce " />
      </Link>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center cursor-pointer">
        <BestOfferList token={token} data={data} />
      </div>
    </section>
  );
}
