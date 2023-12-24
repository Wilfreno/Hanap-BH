"use client";

import { PlaceDetailsType } from "@/lib/types/place-detail";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import noImg from "../../../../../public/image-square-xmark-svgrepo-com.svg";
import Image from "next/image";
import UnderConstruction from "@/components/page/error/UnderConstruction";
export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <section className="mt-[10vh]">
        {/* <div className="aspect-video h-[50vh] w-auto bg-red-400">
          <Image
            src={noImg}
            alt="no image"
            className="object-contain w-1/2 h-auto"
          />
        </div> */}
        <UnderConstruction />
      </section>
    </>
  );
}
