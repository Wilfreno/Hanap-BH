"use client";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import styles from "./Map.module.css";
import ImageNotSupportedSharpIcon from "@mui/icons-material/ImageNotSupportedSharp";
import { GoogleMapPropType } from "@/lib/types/prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { useAppSelector } from "@/lib/redux/store";
import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import { getGeocode } from "@/lib/google-api/geocode";
import {
  NearbyPlaceAPIResponseType,
  NearbyPlaceType,
} from "@/lib/types/nearby-place-type";
import Image from "next/image";

export default function Map({ center, options }: GoogleMapPropType) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing");

  const [selected, setSelected] = useState<AutocompleteType>();
  const [nearbyPlaces, setNearbyPlaces] = useState<
    NearbyPlaceAPIResponseType[]
  >([]);
  const [viewInfo, setViewInfo] = useState<boolean>(false);

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

      const { data } = await response.json();

      setNearbyPlaces(data);
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
        vicinity: searchResult.vicinity,
        location: geocode,
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
              <Marker position={center}></Marker>

              {selected?.location != undefined ? (
                <Marker position={selected?.location!}>
                  <InfoWindow position={selected?.location!}>
                    <section className={styles.info__window}>
                      <h1>{selected?.description}</h1>
                    </section>
                  </InfoWindow>
                </Marker>
              ) : null}

              {nearbyPlaces?.map((place) => (
                <Marker
                  key={place.place_id}
                  position={place.location}
                  clusterer={clusterer}
                  onClick={() => {
                    mapRef.current?.panTo(place.location);
                    setViewInfo(true);
                  }}
                >
                  <InfoWindow position={place.location} options={{maxWidth: 200}}>
                    <section className={styles.info__window}>
                     { place.photo.height < place.photo.width ?  <Image
                        src={`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${place.photo.photo_reference}&maxwidth=${place.photo.width}`}
                        alt="place_photo"
                        width={1920}
                        height={1080}
                        quality={90}
                        priority
                        style={{
                          height: "auto",
                          width: "100%",
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                      /> : <ImageNotSupportedSharpIcon/>}
                      <p>{place.description}</p>
                    </section>
                  </InfoWindow>
                </Marker>
              ))}
            </div>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
}
