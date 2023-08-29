"use client";

import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import styles from "./Map.module.css";
import { GoogleMapPropType } from "@/lib/types/prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { PlaceDetailType } from "@/lib/types/places-detail-types";
import { useAppSelector } from "@/lib/redux/store";
import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import { getGeocode } from "@/lib/google-api/geocode";

export default function Map({ center, options }: GoogleMapPropType) {
  const [selected, setSelected] = useState<AutocompleteType>();
  const [details, setDetails] = useState<PlaceDetailType[]>([]);

  const mapRef = useRef<MapType>();
  const onLoad = useCallback((map: MapType) => {
    mapRef.current = map;
  }, []);

  const searchResult = useAppSelector((state) => state.searchSelectedReducer);

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

  async function getSearchResult() {
    try {
      const geocode = await getGeocode(searchResult.place_id);

      setSelected({
        description: searchResult.description,
        place_id: searchResult.place_id,
        structured_formatting: {
          secondary_text: searchResult.structured_formatting.secondary_text,
        },
        geocode,
      });
      mapRef.current?.panTo(geocode);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    if (searchResult.description != "") {
      getSearchResult();
    }
  }, [searchResult]);

  useEffect(() => {
    getNearbyPlace();
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
              <Marker position={center} />

              {searchResult.description != "" ? (
                <Marker position={selected?.geocode!} />
              ) : null}

              {details?.map((place) =>
                place.photos && place.photos.length > 0 ? (
                  <Marker
                    key={place.place_id}
                    position={place.geometry!.location}
                    clusterer={clusterer}
                    onClick={() =>
                      mapRef.current?.panTo(place.geometry!.location)
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
