"use client";
import { useEffect } from "react";
import NearbySection from "@/components/page/main/nearby-places/NearbySection";
import BestOfferSection from "@/components/page/main/best-offer/BestOfferSection";
import { useAppSelector } from "@/lib/redux/store";

export default function page() {
  const place_details = useAppSelector(
    (state) => state.nearby_places_details_reducer
  );
  const next_page_token = useAppSelector(
    (state) => state.next_page_token_reducer.next_page_token
  );
  return (
    <section className="dark:text-white text-gray-900 mb-20 mt-[10vh] space-y-5 md:mb-0 ">
      <NearbySection data={place_details} />
      <BestOfferSection token={next_page_token!} data={place_details!} />
    </section>
  );
}
