import styles from "./Markers.module.css";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import NearbyPlacesMarker from "./NearbyPlacesMarker";
import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import { NearbyPlaceAPIResponseType } from "@/lib/types/nearby-place-type";
import { useAppSelector } from "@/lib/redux/store";
import { getGeocode } from "@/lib/google-api/geocode";
import UserMarker from "./UserMarker";

export default function Markers({
  map,
  user_location,
}: {
  map: MapType;
  user_location: LatLngLiteral;
}) {
  const [selected, setSelected] = useState<AutocompleteType>();
  const [nearbyPlaces, setNearbyPlaces] = useState<
    NearbyPlaceAPIResponseType[]
  >([]);
  const [viewInfo, setViewInfo] = useState<boolean>(false);

  const searchResult = useAppSelector((state) => state.searchSelectedReducer);

  async function getNearbyPlace() {
    try {
      const response = await fetch("/api/map/nearby-places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_location),
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
      map.panTo(geocode);
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
  }, [user_location]);
  
  const marker = new google.maps.Marker({
    position: user_location,
    map,
  });
  return (
    <div>
      {/* <UserMarker user_location={user_location} map={map} /> */}
      {selected?.location != undefined ? (
        <Marker position={selected?.location!}>
          <InfoWindow position={selected?.location!}>
            <section className={styles.info__window}>
              <h1>{selected?.description}</h1>
            </section>
          </InfoWindow>
        </Marker>
      ) : null}

      {/* {nearbyPlaces?.map((place) => (
        <NearbyPlacesMarker key={place.place_id} map={map} place={place} />
      ))} */}
    </div>
  );
}
