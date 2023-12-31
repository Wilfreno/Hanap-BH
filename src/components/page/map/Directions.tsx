import useLocation from "@/lib/hooks/useLocation";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Directions({
  place_data,
}: {
  place_data: PlaceDetailsType[];
}) {
  const {
    location: { lat, lng },
  } = useLocation();
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const map = useMap();
  const routes_library = useMapsLibrary("routes");
  const [directions_service, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directions_renderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [route, setRoute] = useState<google.maps.DirectionsRoute[]>();
  async function initializeServices() {
    if (!routes_library || !map) return;

    setDirectionsService(new routes_library.DirectionsService());
    setDirectionsRenderer(new routes_library.DirectionsRenderer({ map }));
  }
  async function getRoute() {
    if (!directions_renderer || !directions_service || !place_id || !place_data)
      return;

    try {
      const destination_coord = place_data!.filter(
        (place) => place.place_id === place_id
      );

      const response = await directions_service.route({
        origin: { lat: lat!, lng: lng! },
        destination: destination_coord[0].location.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      directions_renderer.setDirections(response);
      setRoute(response.routes);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    initializeServices();
  }, [map, routes_library]);
  useEffect(() => {
    getRoute();
  }, [directions_renderer, directions_service, place_id]);
  return null;
}
