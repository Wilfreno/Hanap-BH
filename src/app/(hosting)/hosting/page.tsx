"use client";
import MainHosting from "@/components/page/hosting/MainHosting";
import PlaceHosting from "@/components/page/hosting/place-hosting/PlaceHosting";
import { useRouter, useSearchParams } from "next/navigation";
export default function page() {
  const router = useRouter();
  const search_params = useSearchParams();
  const page = search_params.get("page");
  if (!page) router.replace("/hosting?page=main");
  return (
    <>
      {page === "main" && <MainHosting />}
      {page === "place-detail" && <PlaceHosting />}
    </>
  );
}
