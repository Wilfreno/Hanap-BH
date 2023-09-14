import styles from "./NearbyPlacesMarker.module.css";
import { useEffect, useState } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { setSelectedDetail } from "@/lib/redux/slices/selected-detail-slice";
import { LatLngLiteral, MapType } from "@/lib/types/google-maps-api-type";
import { PlaceDetailType } from "@/lib/types/google-place-api-types";
export default function NearbyPlacesMarker({
  user_location,
  map,
}: {
  user_location: LatLngLiteral;
  map: MapType;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [nearby_places, setNearbyPlaces] = useState<PlaceDetailType[]>([]);

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

  useEffect(() => {
    getNearbyPlace();
  }, [user_location]);
  return (
    <>
      {nearby_places?.map((place) => (
        <Marker
          key={place.place_id}
          position={place.location.coordinates}
          onClick={() => {
            map?.panTo(place.location.coordinates);
            dispatch(
              setSelectedDetail({
                place_id: place.place_id,
              })
            );
          }}
        />
      ))}
    </>
  );
}
