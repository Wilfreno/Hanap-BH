"use client";

import useNavigatorGetCurrentPosition from "@/lib/hooks/useNavigatorGetCurrentPosition";
import useNearbyPlacesAPI from "@/lib/hooks/useNearbyPlacesAPI";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path_name = usePathname();
  const [coordinates, location_error] = useNavigatorGetCurrentPosition();
  const [data, next_page_token, api_error] = useNearbyPlacesAPI({
    lat: coordinates?.latitude,
    lng: coordinates?.longitude,
  });
  const search_param = useSearchParams();
  const error = search_param.get("error");

  if (location_error) return
  if (api_error) router.push(`${path_name}?error=${api_error}`);
  // if (error === "408") return <Error408 />;
  // if (error === "offline") return <Offline />;
  return <div>{children}</div>;
}
