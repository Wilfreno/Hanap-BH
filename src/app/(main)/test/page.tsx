"use client";
export const dynamic = "force-dynamic";

import TopLoader from "@/components/reusables/TopLoader";
import img1 from "../../../../public/img/wallpaperflare.com_wallpaper (1).jpg";
import img2 from "../../../../public/img/wallpaperflare.com_wallpaper (2).jpg";
import img3 from "../../../../public/img/wallpaperflare.com_wallpaper (3).jpg";
import img4 from "../../../../public/img/wallpaperflare.com_wallpaper (4).jpg";
import img5 from "../../../../public/img/wallpaperflare.com_wallpaper.jpg";
import { useSession } from "next-auth/react";
import NoResult from "@/components/reusables/NoResult";
export default function page() {
  const images = [img1, img2, img3, img4, img5];
  const session = useSession();

  // return <TopLoader />;
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <NoResult />
    </section>
  );
}
