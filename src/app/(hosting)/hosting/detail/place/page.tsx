"use client";
import PlaceDetailHosting from "@/components/page/hosting/detail/place/PlaceDetailHosting";
import PlaceMain from "@/components/page/hosting/detail/place/main/PlaceMain";
import { useSearchParams } from "next/navigation";

export default function page() {
  const search_params = useSearchParams();
  const page = search_params.get("page");
  return (
    <section className="flex items-center text-gray-900">
      {page === "verification" && <PlaceMain />}
      <PlaceDetailHosting />
    </section>
  );
}
