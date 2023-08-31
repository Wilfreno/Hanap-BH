"use client";

import styles from "./Map.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapOptions, MapType } from "@/lib/types/google-map-type";
import { useAppSelector } from "@/lib/redux/store";

import Markers from "./markers/Markers";

export default function Map() {
  const [map, setMap] = useState<MapType>();
  const divRef = useRef<HTMLDivElement>(null);

  const userLocation = useAppSelector(
    (state) => state.userLocationReducer.coordinates
  );

  const options = useMemo<MapOptions>(
    () => ({
      restriction: {
        latLngBounds: {
          north: 21.1321,
          south: 4.22599,
          west: 114.095,
          east: 128.604,
        },
        strictBounds: true,
      },
      mapTypeControl: false,
      fullscreenControl: true,
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "671365b374be82",
      center: userLocation,
      zoom: 14
    }),
    []
  );

  useEffect(() => {
    if (divRef.current != undefined) {
      setMap(new window.google.maps.Map(divRef.current!, options));
    }
  }, [divRef.current]);

  return (
    <>
      <div ref={divRef} className={styles.map}>
        {map && <Markers map={map} user_location={userLocation} />}
      </div>
    </>
  );
}
