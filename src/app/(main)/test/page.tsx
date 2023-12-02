"use client";
export const dynamic = "force-dynamic";

import Error408 from "@/components/page/error/Error408";
import img1 from "../../../public/img/wallpaperflare.com_wallpaper (1).jpg";
import img2 from "../../../public/img/wallpaperflare.com_wallpaper (2).jpg";
import img3 from "../../../public/img/wallpaperflare.com_wallpaper (3).jpg";
import img4 from "../../../public/img/wallpaperflare.com_wallpaper (4).jpg";
import img5 from "../../../public/img/wallpaperflare.com_wallpaper.jpg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function page() {
  const images = [img1, img2, img3, img4, img5];
  const [data, setData] = useState();
  const [errro_msg, setErrorMsg] = useState();
  const path_name = usePathname();
  const router = useRouter();
  const search_params = useSearchParams();
  const error = search_params.get("error");
  async function getData() {
    try {
      const api_response = await fetch(
        `/api/nearby-places?lat=8.229288434629954&lng=124.25523440548591`
      );
      const api_data = await api_response.json();

      if (api_response.status === 408) {
        router.push("/test?error=query_limit");
      }
    } catch (error) {
      throw error;
    }
  }
  //   useEffect(() => {
  // ;    for (let i = 0; i < 10; i++) {
  //       getData();
  //     }
  //   }, [])

  if (error) return <Error408 />;
  return null;
}
