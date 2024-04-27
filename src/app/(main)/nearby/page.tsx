"use client";

import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useTransition } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import MainContentCard from "@/components/page/main/MainContentCard";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { motion } from "framer-motion";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";
import { getNearbyLodgings } from "@/lib/server/actions/getNearbyLodgings";
import MainListSkeleton from "@/components/loading-skeleton/PlaceCardSkeleton";

export default function Page() {
  const nearby_lodgings = useAppSelector(
    (state) => state.nearby_lodging_reducer
  );
  const user_location = useAppSelector((state) => state.user_location_reducer);
  const dispatch = useDispatch<AppDispatch>();
  const http_request = useHTTPRequest();
  const [fetching_nearby_lodging, startFetchingNearbyLodging] = useTransition();
  const [fetching_next_page, startFetchingNextPage] = useTransition();
  async function handleScroll() {
    let count = 0;

    if (count >= 1) return;
    if (!nearby_lodgings.next_page_token) return;

    startFetchingNextPage(async () => {
      count++;
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
          next_page_token: response.next_page_token!,
        })
      );
      count--;
    });
  }
  async function getNearbyPlace() {
    const response = await getNearbyLodgings({
      latitude: user_location?.latitude,
      longitude: user_location.longitude,
    });

    dispatch(
      setNearbyLodgings({
        data: response.data as LodgingDetailsType[],
        next_page_token: response.next_page_token!,
      })
    );
  }

  useEffect(() => {
    if (user_location.latitude && user_location.longitude) getNearbyPlace();
  }, [user_location]);

  const MotionLink = motion(Link);

  return (
    <main className="my-[10dvh] sm:mx-[10vw]">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-10">
        {fetching_nearby_lodging ? (
          <MainListSkeleton />
        ) : (
          [...nearby_lodgings.data]
            .sort((a, b) => a.distance! - b.distance!)
            .map((lodging, index) => (
              <MotionLink
                key={lodging.name}
                href={`/lodging/${lodging.id}`}
                as={`/lodging/${lodging.id}`}
                prefetch
                onViewportEnter={
                  index === nearby_lodgings.data.length - 1
                    ? handleScroll
                    : () => null
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ opacity: 0.5 }}
              >
                <Card
                  key={lodging.name}
                  className="cursor-pointer border-none shadow-none"
                >
                  <MainContentCard lodging={lodging} />
                </Card>
              </MotionLink>
            ))
        )}
      </section>
      {fetching_next_page && <FetchingSkeleton />}
    </main>
  );
}
