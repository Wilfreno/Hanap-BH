"use client";

import Error408 from "@/components/page/error/Error408";
import Offline from "@/components/page/error/Offline";
import useNearbyPlacesAPI from "@/lib/hooks/useNearbyPlacesAPI";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path_name = usePathname();
  const { error, location_error } = useNearbyPlacesAPI();
  const search_params = useSearchParams();
  const error_params = search_params.get("error");
  if (location_error) router.push(`${path_name}?error=no_location`);
  if (error) router.push(`${path_name}?error=${error}`);
  if (error_params === "408") return <Error408 />;
  if (error_params === "offline") return <Offline />;
  return <div>{children}</div>;
}
