"use client";
export const dynamic = "force-dynamic";


import img1 from "../../../../public/img/wallpaperflare.com_wallpaper (1).jpg";
import img2 from "../../../../public/img/wallpaperflare.com_wallpaper (2).jpg";
import img3 from "../../../../public/img/wallpaperflare.com_wallpaper (3).jpg";
import img4 from "../../../../public/img/wallpaperflare.com_wallpaper (4).jpg";
import img5 from "../../../../public/img/wallpaperflare.com_wallpaper.jpg";
import { useSession } from "next-auth/react";
export default function page() {
  const images = [img1, img2, img3, img4, img5];
  const session = useSession();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="aspect-square h-20 w-auto bg-red-500 rounded-full">
        <span className="border-5 "></span>
      </div>
    </div>
  );
}
