import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function Directions({
  origin,
  destination,
}: {
  origin: LatLngLiteral;
  destination: LatLngLiteral;
}) {
  const map = useMap();
  const routes_library = useMapsLibrary("routes");
  const [directions_service, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directions_renderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  function initializeServices() {
    if (!routes_library || !map) return;

    setDirectionsService(new routes_library.DirectionsService());
    setDirectionsRenderer(new routes_library.DirectionsRenderer({ map }));
  }
  function getRoute() {
    if (!directions_renderer || !directions_service) return;

    directions_service.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
  }
  useEffect(() => {
    initializeServices();
  }, [map, routes_library]);
  useEffect(() => {
    getRoute();
  }, [directions_renderer, directions_service]);
  return null;
}
