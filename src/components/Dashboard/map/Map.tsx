"use client";

import styles from "./Map.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "@/lib/redux/store";

import { GoogleMap } from "@react-google-maps/api";
import DetailPopUp from "./DetailPopUp";
import NearbyPlacesMarker from "./markers/NearbyPlacesMarker";
import { MapOptions, MapType } from "@/lib/types/google-maps-api-type";
export default function Map() {
  const [mapState, setMapState] = useState<MapType>();
  const userLocation = useAppSelector(
    (state) => state.userLocationReducer.coordinates
  );
  const { lat, lng } = userLocation;

  const onLoad = useCallback((map: MapType) => {
    setMapState(map);
  }, []);

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
    }),
    []
  );
  return (
    <>
      {lat !== undefined && lng !== undefined ? (
        <div className={styles.container}>
          <GoogleMap
            zoom={14}
            center={{ lat, lng }}
            mapContainerClassName={styles.map}
            options={options}
            onLoad={onLoad}
          >
            {mapState != undefined ? (
              <NearbyPlacesMarker
                map={mapState!}
                user_location={{ lat, lng }}
              />
            ) : null}
          </GoogleMap>
          {/* <DetailPopUp /> */}
        </div>
      ) : null}
    </>
  );
}
