import styles from "./NearbyPlacesMarker.module.css";
import { NearbyPlaceAPIResponseType } from "@/lib/types/nearby-place-type";
import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { useEffect, useState } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { setSelectedDetail } from "@/lib/redux/slices/selected-detail-slice";
import { PlaceDetailType } from "@/lib/types/places-detail-types";
export default function NearbyPlacesMarker({
  user_location,
  map,
}: {
  user_location: LatLngLiteral;
  map: MapType;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [nearbyPlaces, setNearbyPlaces] = useState<PlaceDetailType[]>([]);

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
      {nearbyPlaces?.map((place) => (
        <Marker
          key={place.place_id}
          position={place.location!}
          onClick={() => {
            console.log("location: ", place.location);
            map?.panTo(place.location!);
            dispatch(
              setSelectedDetail({
                owner: place.owner,
                place_id: place.place_id,
                description: place.description,
                vicinity: place.vicinity,
                location: place.location,
                photo: place.photo,
                price: place.price,
                vacant_rooms: place.vacant_rooms,
                contact: place.contact,
                rating: place.rating,
              })
            );
          }}
        />
      ))}
    </>
  );
}
