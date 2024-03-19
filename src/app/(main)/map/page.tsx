"use client";
import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Search from "@/components/page/search/Search";
import Map from "@/components/reusables/Map";
import UserLocationIcon from "@/components/svg/UserLocationIcon";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  AdvancedMarker,
  ControlPosition,
  MapControl,
} from "@vis.gl/react-google-maps";

export default function page() {
  const { coordinates: user_location } = useCurrentPosition();
  const { nearby_place } = useNearbyPlacesAPI();
  return (
    <main className="grid">
      <Map zoom={17}>
        <MapControl position={ControlPosition.TOP_LEFT}>
          <section className="mx-10">
            <Search />
          </section>
        </MapControl>
        <AdvancedMarker position={user_location}>
          <UserLocationIcon className="h-8 w-auto stroke-primary" />
        </AdvancedMarker>
        {nearby_place.map((place) => (
          <AdvancedMarker
            key={place.place_id}
            position={place.location.coordinates}
          >
            <HomeIcon className="h-8 w-auto " />
          </AdvancedMarker>
        ))}
      </Map>
    </main>
  );
}
