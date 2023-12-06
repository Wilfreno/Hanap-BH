"use client";
import MainHosting from "@/components/page/hosting/MainHosting";
import PlaceHosting from "@/components/page/hosting/PlaceHosting";
import { useRouter, useSearchParams } from "next/navigation";
export default function page() {
  const router = useRouter();
  const search_params = useSearchParams();
  const page = search_params.get("page");
  if (!page) router.replace("/hosting?page=main");
  return (
    <section className="flex items-center justify-between w-screen flex-col text-gray-900 whitespace-nowrap">
      {page === "main" && <MainHosting />}
      {page === "place-detail" && <PlaceHosting />}
    </section>
  );
}
