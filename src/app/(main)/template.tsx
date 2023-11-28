"use client";

import useNavigatorGetCurrentPosition from "@/lib/hooks/useNavigatorGetCurrentPosition";
import useNearbyPlacesAPI from "@/lib/hooks/useNearbyPlacesAPI";
import { setNearbyPlaceDetails } from "@/lib/redux/slices/nearby-place-detail-slice";
import { setNextPageToken } from "@/lib/redux/slices/next-page-token-slice";
import { AppDispatch } from "@/lib/redux/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function Template({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const path_name = usePathname();
  const [coordinates, location_error] = useNavigatorGetCurrentPosition();
  const [data, next_page_token, api_error] = useNearbyPlacesAPI({
    lat: coordinates?.latitude,
    lng: coordinates?.longitude,
  });
  const search_param = useSearchParams();
  const error = search_param.get("error");
  useEffect(() => {
age    dispatch(setNearbyPlaceDetails(data!));
    dispatch(setNextPageToken(next_page_token!));
  }, [data, next_page_token]);
  if (location_error) router.push(`${path_name}?error=no_location`);
  if (api_error) router.push(`${path_name}?error=${api_error}`);
  // if (error === "408") return <Error408 />;
  // if (error === "offline") return <Offline />;
  return <div>{children}</div>;
}
