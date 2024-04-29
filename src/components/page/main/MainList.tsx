"use client";

import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useTransition } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import LodgingCard from "@/components/page/main/LodgingCard";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { motion } from "framer-motion";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";

export default function MainList({
  nearby_lodgings,
  next_page_token,
}: {
  nearby_lodgings: LodgingDetailsType[];
  next_page_token: string;
}) {
  const [fetching_next_page, startFetchingNextPage] = useTransition();
  const http_request = useHTTPRequest();
  const dispatch = useDispatch<AppDispatch>();
  const user_location = useAppSelector((state) => state.user_location_reducer);

  const MotionLink = motion(Link);

  async function handleScroll() {
    let count = 0;

    if (count >= 1) return;
    if (!next_page_token) return;

    startFetchingNextPage(async () => {
      count++;
      const response = await http_request.get("/api/lodging/nearby/next", {
        next_page_token,
        latitude: user_location.latitude!,
        longitude: user_location.longitude!,
      });

      dispatch(
        setNearbyLodgings({
          data: [
            ...nearby_lodgings,
            ...(response.data as LodgingDetailsType[]),
          ],
          next_page_token: response.next_page_token!,
        })
      );
      count--;
    });
  }

  useEffect(() => {
    dispatch(
      setNearbyLodgings({
        data: nearby_lodgings,
        next_page_token,
      })
    );
  }, [nearby_lodgings]);

  return (
    <main className="my-[10dvh] sm:mx-[10vw]">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-5">
        {[...nearby_lodgings]
          .sort((a, b) => a.distance! - b.distance!)
          .map((lodging, index) => (
            <MotionLink
              key={lodging.name}
              href={`/lodging/${lodging.id}`}
              as={`/lodging/${lodging.id}`}
              prefetch
              onViewportEnter={
                index === nearby_lodgings.length - 1 ? handleScroll : () => null
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ opacity: 0.5 }}
            >
              <Card
                key={lodging.name}
                className="cursor-pointer border-none shadow-none"
              >
                <LodgingCard lodging={lodging} />
              </Card>
            </MotionLink>
          ))}
      </section>
      {fetching_next_page && <FetchingSkeleton />}
    </main>
  );
}
