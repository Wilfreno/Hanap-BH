import FavoriteMark from "@/components/FavoriteMark";
import GoogleMark from "@/components/GoogleMark";
import CustomImage from "@/components/CustomImage";
import { Card, CardContent } from "@/components/ui/card";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { StarIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import Link from "next/link";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";

export default function LodgingCard({
  lodging,
  index,
  setFetching,
}: {
  lodging: LodgingDetailsType;
  index: number;
  setFetching?: Dispatch<SetStateAction<boolean>>;
}) {
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const dispatch = useDispatch<AppDispatch>();
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );

  const http_request = useHTTPRequest();

  const MotionLink = motion(Link);

  async function handleScroll() {
    let count = 0;

    if (count >= 1) return;
    if (!nearby_lodgings.next_page_token) return;

    count++;

    setFetching && setFetching(true);

    const response = await http_request.get("/api/lodging/nearby/next", {
      next_page_token: nearby_lodgings.next_page_token,
      latitude: user_location.latitude!,
      longitude: user_location.longitude!,
    });

    dispatch(
      setNearbyLodgings({
        data: [
          ...nearby_lodgings.data,
          ...(response.data as LodgingDetailsType[]),
        ],
        status: response.status,
        next_page_token: response.next_page_token!,
      })
    );
    setFetching && setFetching(false);
    count--;
  }

  return (
    <MotionLink
      key={lodging.name}
      href={`/lodging/${lodging.id}`}
      as={`/lodging/${lodging.id}`}
      prefetch
      onViewportEnter={
        index === nearby_lodgings.data.length - 1 ? handleScroll : () => null
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ opacity: 0.5 }}
    >
      <Card
        key={lodging.name}
        className="cursor-pointer border-none shadow-none w-[20rem]"
      >
        <CardContent>
          <div className="aspect-square relative overflow-hidden w-full h-auto rounded-t-sm sm:rounded-lg">
            <CustomImage
              database={lodging.database}
              url={
                lodging?.photos?.length! > 0
                  ? lodging?.photos?.[0].photo_url
                  : undefined
              }
            />

            <GoogleMark database={lodging.database} />
            <FavoriteMark
              lodging={lodging}
              className="h-6 w-auto absolute top-2 right-2"
            />
          </div>
          <div className="my-2 space-y-5">
            <div>
              <h1 className="font-bold sm:text-sm truncate">{lodging.name}</h1>
              <h2 className="text-xs text-muted-foreground truncate">
                {lodging?.location.address}
              </h2>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold p-1">
              <p>{lodging?.distance?.toFixed(2)} Km away</p>
              <p className="flex items-center space-x-2">
                {lodging?.ratings?.reduce((a, b) => a + Number(b.value), 0)}
                <StarIcon className="h-4 w-auto" />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionLink>
  );
}
