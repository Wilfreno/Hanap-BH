import FavoriteMark from "@/components/FavoriteMark";
import GoogleMark from "@/components/GoogleMark";
import CustomImage from "@/components/CustomImage";
import { Card, CardContent } from "@/components/ui/card";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { StarIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import Link from "next/link";
import { setNearbyLodgings } from "@/lib/redux/slice/nearby-lodgings";
import { cn } from "@/lib/utils";

type PriceList = {
  frequency: string;
  min?: number;
  max?: number;
};
export default function LodgingCard({
  lodging,
  index,
  setFetching,
}: {
  lodging: LodgingDetailsType;
  index: number;
  setFetching?: Dispatch<SetStateAction<boolean>>;
}) {
  const [prices_list_min_max, setPricesListMinMax] = useState<PriceList[]>([]);
  const [price_list_view_index, setPriceListViewindex] = useState(0);

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

  useEffect(() => {
    let per_month = {
      frequency: "month",
      min: lodging.rooms?.[0].price!.per_month,
      max: lodging.rooms?.[0].price!.per_month,
    };

    let per_night = {
      frequency: "night",
      min: lodging.rooms?.[0].price!.per_night,
      max: lodging.rooms?.[0].price!.per_night,
    };

    let per_12_hour = {
      frequency: "12 hours",
      min: lodging.rooms?.[0].price!.per_12_hours,
      max: lodging.rooms?.[0].price!.per_12_hours,
    };

    let per_six_hour = {
      frequency: "6 hours",
      min: lodging.rooms?.[0].price!.per_six_hour,
      max: lodging.rooms?.[0].price!.per_six_hour,
    };

    let per_hour = {
      frequency: "hour",
      min: lodging.rooms?.[0].price!.per_hour,
      max: lodging.rooms?.[0].price!.per_hour,
    };

    lodging.rooms?.forEach((room) => {
      per_month.min = Math.min(per_month.min!, room.price.per_month);
      per_month.max = Math.max(per_month.max!, room.price.per_month);

      per_night.max = Math.max(per_night.max!, room.price.per_night);
      per_night.min = Math.min(per_night.min!, room.price.per_night);

      per_12_hour.max = Math.max(per_12_hour.max!, room.price.per_12_hours);
      per_12_hour.min = Math.min(per_12_hour.min!, room.price.per_12_hours);

      per_six_hour.max = Math.max(per_six_hour.max!, room.price.per_six_hour);
      per_six_hour.min = Math.min(per_six_hour.min!, room.price.per_six_hour);

      per_hour.max = Math.max(per_hour.max!, room.price.per_hour);
      per_hour.min = Math.min(per_hour.min!, room.price.per_hour);
    });
    setPricesListMinMax([
      per_month,
      per_night,
      per_12_hour,
      per_six_hour,
      per_hour,
    ]);
  }, []);

  useEffect(() => {
    if (prices_list_min_max.length < 1) return;
    const id = setInterval(
      () =>
        setPriceListViewindex(
          (prev) => (prev + 1) % prices_list_min_max.length
        ),
      5000
    );

    return () => clearInterval(id);
  }, [prices_list_min_max]);

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
              className={cn(
                "h-6 w-auto absolute top-2 right-2",
                lodging.database === "GOOGLE" && "hidden"
              )}
            />
          </div>
          <div className="my-3 space-y-5">
            <div>
              <h1 className="font-bold text-base truncate">{lodging.name}</h1>
              <h2 className="text-sm text-muted-foreground truncate">
                {lodging?.location.address}
              </h2>
            </div>
            <div className="flex items-center justify-between p-1">
              <p className="text-sm">{lodging?.distance?.toFixed(2)} Km away</p>
              <p className="flex items-center space-x-2 font-bold ">
                {lodging?.ratings?.reduce((a, b) => a + Number(b.value), 0)}
                <StarIcon className="h-4 w-auto" />
              </p>
            </div>
            <div className="flex space-x-5">
              <AnimatePresence>
                <motion.p
                  className="flex space-x-3 items-center"
                  key={prices_list_min_max[price_list_view_index]?.min}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {prices_list_min_max[price_list_view_index]?.min! &&
                    prices_list_min_max[price_list_view_index].min}
                  ~
                  {prices_list_min_max[price_list_view_index]?.max! &&
                    prices_list_min_max[price_list_view_index].max}
                </motion.p>
                <motion.p
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={prices_list_min_max[price_list_view_index]?.frequency}
                >
                  {prices_list_min_max[price_list_view_index]?.frequency}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionLink>
  );
}
