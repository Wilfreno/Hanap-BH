"use client";
import NearbySection from "@/components/page/main/nearby-places/NearbySection";
import BestOfferSection from "@/components/page/main/best-offer/BestOfferSection";
import usePlaceSession from "@/lib/hooks/usePlaceSession";

export default function page() {
  const place_session = usePlaceSession();
  const data = place_session.get();
  return (
    <section className="dark:text-white text-gray-900 mb-20 mt-[10vh] space-y-5 md:mb-0 ">
      <NearbySection data={data} />
      <BestOfferSection data={data} />
    </section>
  );
}
