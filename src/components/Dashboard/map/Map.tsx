"use client";

import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import styles from "./Map.module.css";
import { GoogleMapPropType } from "@/lib/types/prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { PlaceDetailType } from "@/lib/types/places-details-types";

export default function Map({ center, options }: GoogleMapPropType) {
  const [selected, setelected] = useState<LatLngLiteral>();
  const [details, setDetails] = useState<PlaceDetailType[]>([]);
  const mapRef = useRef<MapType>();

  const onLoad = useCallback((map: MapType) => {
    mapRef.current = map;
  }, []);

  async function getNearbyPlace() {
    try {
      const response = await fetch("/api/map/nearby-places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(center),
      });

      const { results } = await response.json();

      setDetails(results);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getNearbyPlace();
    console.log("coordinates:", details);
  }, [center]);

  return (
    <>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName={styles.map}
        options={options}
        onLoad={onLoad}
      >
        <MarkerClusterer>
          {(clusterer) => (
            <div>
              {details?.map((place) =>
                place.photos && place.photos.length > 0 ? (
                  <Marker
                    key={place.place_id}
                    position={place.geometry.location}
                    clusterer={clusterer}
                    onClick={() =>
                      mapRef.current?.panTo(place.geometry.location)
                    }
                  />
                ) : null
              )}
            </div>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
}
