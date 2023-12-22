import quickSort from "@/lib/google-api/sort";
import { LinkIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import noIMG from "../../../../../public/icons/image-square-xmark-svgrepo-com.svg";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/reusables/CustomImage";

export default function NearbyPlacesListMain({
  data,
  page_width,
}: {
  page_width: number;
  data: PlaceDetailsType[];
}) {
  const [width, setWidth] = useState(0);
  const div_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (div_ref.current) {
      setWidth(div_ref.current.scrollWidth - div_ref.current.offsetWidth);
    }
  }, [div_ref.current, page_width, data]);
  return (
    data && (
      <>
        <motion.div
          className="cursor-grab overflow-x-hidden bg-white"
          ref={div_ref}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex mx-5 space-x-5"
          >
            {quickSort(data)?.map((details) => (
              <div
                className="rounded-lg shadow-lg flex flex-col justify-between my-5 hover:scale-105 transform transition duration-300 ease-out"
                key={details.place_id}
              >
                <div className="aspect-video h-40 w-auto rounded-lg flex items-center justify-center shadow-md sm:h-[12] lg:h-[15rem]">
                  {details.photos.length > 0 ? (  
                    <CustomImage
                      photo_reference={details.photos[0]}
                      database={details.database}
                    />
                  ) : (
                    <Image
                      src={noIMG}
                      alt="No Image"
                      className="object-contain h-20 w-auto  pointer-events-none"
                    />
                  )}
                </div>
                <Link
                  href={`/place-detail/${details.place_id}`}
                  target="_blank"
                  className="flex flex-col space-y-1 px-2 group m-3"
                >
                  <strong className="group-hover:underline text-gray-900 text-lg flex items-center">
                    {details.name.length > 40
                      ? `${details.name.slice(0, 40)}...`
                      : details.name}
                    <LinkIcon className="hidden group-hover:flex h-4 mx-2" />
                  </strong>
                  <p className="text-gray-700 text-sm">
                    {details.location.vicinity.length > 45
                      ? `${details.location.vicinity.slice(0, 45)}...`
                      : details.location.vicinity}
                  </p>
                  <div className="flex items-center justify-between px-2 font-semibold text-gray-900">
                    <p className="text-md font-semibold">
                      <strong>{details.distance?.toFixed(2)}</strong> Km away
                    </p>
                    <div className="flex items-center space-x-1 m-2">
                      <p>{details.rating.average}</p>
                      <StarIcon className="h-3 text-gray-800" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </>
    )
  );
}
