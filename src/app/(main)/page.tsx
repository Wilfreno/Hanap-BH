"use client";
import NearbySection from "@/components/page/main/nearby-places/NearbySection";
import BestOfferSection from "@/components/page/main/best-offer/BestOfferSection";
import useNearbyPlacesAPI from "@/lib/hooks/useNearbyPlacesAPI";

export default function page() {
  const { data } = useNearbyPlacesAPI();

  return (
    <section className="dark:text-white text-gray-900 mb-20 mt-[10vh] space-y-5 md:mb-0 ">
      <NearbySection data={data} />
      <BestOfferSection data={data} />
    </section>
  );
}
