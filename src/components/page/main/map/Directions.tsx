import UserLocationIcon from "@/components/svg/UserLocationIcon";
import { useAppSelector } from "@/lib/redux/store";
import { LocationType } from "@/lib/types/user-detail-type";
import { MapPinIcon } from "@heroicons/react/24/outline";
import {
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function Directions({
  destination,
  route_index = 0,
  getRoutes,
  children,
}: {
  getRoutes: (r: google.maps.DirectionsRoute[]) => void;
  route_index?: number;
  destination: LocationType;
  children?: React.ReactNode;
}) {
  const { theme } = useTheme();
  const map = useMap();
  const routes_library = useMapsLibrary("routes");
  const user_location = useAppSelector((state) => state.user_location_reducer);

  const [direction_service, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [direction_renderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>();

  async function getDirection() {
    const direction_service_response = await direction_service?.route({
      origin: {
        lat: user_location?.latitude!,
        lng: user_location?.longitude!,
      },
      destination: {
        lat: destination.latitude!,
        lng: destination.longitude!,
      },
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });

    direction_renderer?.setDirections(direction_service_response!);
    setRoutes(direction_service_response?.routes);
  }

  useEffect(() => {
    if (routes) getRoutes(routes);
  }, [routes]);

  useEffect(() => {
    if (!map || !routes_library) return;

    setDirectionsService(new routes_library.DirectionsService());
    setDirectionsRenderer(
      new routes_library.DirectionsRenderer({
        map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor:
            theme === "dark" ? "hsl(var(--background))" : "hsl(var(--primary))",
          strokeOpacity: 3,
        },
      })
    );
  }, [map, routes_library]);

  useEffect(() => {
    if (!direction_renderer || !direction_service) return;
    getDirection();
  }, [direction_renderer, direction_service]);

  useEffect(() => {
    if (!direction_renderer) return;
    direction_renderer.setRouteIndex(route_index);
  }, [route_index, direction_renderer]);

  return routes?.[route_index].legs[0] ? (
    <>
      {children}
      <AdvancedMarker
        position={{
          lat: user_location?.latitude!,
          lng: user_location?.longitude!,
        }}
      >
        <UserLocationIcon className="h-6 w-auto stroke-primary dark:stroke-background stroke-1" />
      </AdvancedMarker>
      <AdvancedMarker
        position={{
          lat: destination.latitude!,
          lng: destination.longitude!,
        }}
      >
        <MapPinIcon className="h-6 w-auto text-primary dark:text-background" />
      </AdvancedMarker>
    </>
  ) : null;
}
