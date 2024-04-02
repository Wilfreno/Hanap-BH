import useCurrentPosition from "@/components/hooks/useCurrentPosition";
import UserLocationIcon from "@/components/svg/UserLocationIcon";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
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
  destination: LatLngLiteral;
  children?: React.ReactNode;
}) {
  const { coordinates } = useCurrentPosition();
  const { theme } = useTheme();
  const map = useMap();
  const routes_library = useMapsLibrary("routes");

  const [direction_service, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [direction_renderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>();

  async function getDirection() {
    const direction_service_response = await direction_service?.route({
      origin: {
        lat: coordinates?.lat as number,
        lng: coordinates?.lng as number,
      },
      destination: {
        lat: destination.lat as number,
        lng: destination.lng as number,
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
          lat: coordinates?.lat as number,
          lng: coordinates?.lng as number,
        }}
      >
        <UserLocationIcon className="h-6 w-auto stroke-primary dark:stroke-background stroke-1" />
      </AdvancedMarker>
      <AdvancedMarker
        position={{
          lat: destination.lat as number,
          lng: destination.lng as number,
        }}
      >
        <MapPinIcon className="h-6 w-auto text-primary dark:text-background" />
      </AdvancedMarker>
    </>
  ) : null;
}
