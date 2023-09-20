"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Content from "@/app/(dashboard)/dashboard/Content";
import LoadingBar from "@/components/loading/LoadingBar";
import { useAppSelector } from "@/lib/redux/store";
import { PlaceDetailType } from "@/lib/types/google-place-api-types";

export default function page() {
  const [details, setDetails] = useState<PlaceDetailType[]>([]);
  const userLocation = useAppSelector(
    (state) => state.userLocationReducer.coordinates
  );
  async function getNearbyPlace() {
    try {
      const response = await fetch("/api/map/nearby-places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLocation),
      });

      const {
        data: { results },
      } = await response.json();

      setDetails(results);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getNearbyPlace();
  }, []);
  return (
    <div className={styles.dashboard}>
      {details?.map((place, index) =>
        place.photos && place.photos.length > 0 ? (
          <div key={place.place_id} className={styles.content}>
            <Content
              place_vicinity={place.vicinity}
              place_name={place.name}
              photo_reference={place.photos[0].photo_reference}
              width={place.photos[0].width}
              height={place.photos[0].height}
            />
          </div>
        ) : (
          <div key={index} className={styles.content}>
            <LoadingBar />
          </div>
        )
      )}
    </div>
  );
}
