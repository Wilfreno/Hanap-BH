import { LatLngLiteral, MapOptions } from "@/lib/types/google-maps-api-type";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { Map, useApiIsLoaded, useMap } from "@vis.gl/react-google-maps";
import UserMarker from "./markers/UserMarker";
import NearbyPlacesMarker from "./markers/NearbyPlacesMarker";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchMarker from "./markers/SearchMarker";
export default function MapSection({
  map_center,
  user_location,
  data,
}: {
  data: PlaceDetailsType[];
  map_center: LatLngLiteral;
  user_location: LatLngLiteral;
}) {
  const api_is_loaded = useApiIsLoaded();
  const search_params = useSearchParams();
  const map = useMap();
  const place_id = search_params.get("place_id");
  const [place_data, setPalceData] = useState<PlaceDetailsType>();
  async function getPlaceData() {
    try {
      const api_response = await fetch(
        `/api/place-detail/search?place_id=${place_id}`
      );
      const api_data = await api_response.json();
      setPalceData(api_data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    console.log(data);
    if (place_id !== null && data[0].place_id !== "") {
      const filter = data.filter((place) => place.place_id === place_id);
      if (filter.length <= 0) {
        getPlaceData();
      }
    }
  }, [place_id, data]);

  if (!place_id) map?.setZoom(15);
  if (
    api_is_loaded &&
    map_center?.lat !== undefined &&
    map_center?.lng !== undefined &&
    data
  ) {
    return user_location !== undefined &&
      map_center !== undefined &&
      data[0].place_id !== "" ? (
      <Map
        restriction={{
          latLngBounds: {
            north: 21.1321,
            south: 4.22599,
            west: 114.095,
            east: 128.604,
          },
          strictBounds: true,
        }}
        mapTypeControl={false}
        fullscreenControl={false}
        clickableIcons={false}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="671365b374be82"
        zoom={15}
        center={{ lat: map_center.lat, lng: map_center.lng }}
        className="w-full h-full"
      >
        <NearbyPlacesMarker datas={data} />
        {place_data?.place_id !== "" ? (
          <SearchMarker data={place_data!} />
        ) : null}
        <UserMarker user_location={user_location} />
      </Map>
    ) : null;
  }
}
