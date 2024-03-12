import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import { LatLngLiteral } from "@/lib/types/google-maps-api-type";
import { PlaceDetailsType } from "@/lib/types/place-detail";
import {
  useDirectionsService,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Directions() {
  const { directionsService, directionsRenderer } = useDirectionsService();
  const { nearby_place } = useNearbyPlacesAPI();
  const search_params = useSearchParams();
  const place_id = search_params.get("place_id");
  const map = useMap();
  const [user_location, setUserLocation] = useState<LatLngLiteral>();
  const [place_location, setPlaceLocation] = useState<LatLngLiteral>();

  async function renderRoute() {
    const response = await directionsService?.route({
      origin: { lat: user_location?.lat!, lng: user_location?.lng! },
      destination: { lat: 0, lng: 0 },
      travelMode: google.maps.TravelMode.DRIVING,
    });
    directionsRenderer?.setDirections(response!);
  }
  async function getPlace() {}

  useEffect(() => {
    if (place_id) {
      const place_fil = nearby_place.filter(
        (place) => place_id === place.place_id
      )[0];
      if (place_fil) {
        setPlaceLocation(place_fil.location.coordinates);
        return;
      }
      getPlace();
    }
  }, [place_id]);
  //   const search_params = useSearchParams();
  //   const place_id = search_params.get("place_id");
  //   const map = useMap();
  //   const routes_library = useMapsLibrary("routes");

  //   const [route, setRoute] = useState<google.maps.DirectionsRoute[]>();
  //   const [user_position, setUserPosition] = useState<LatLngLiteral>();

  //   async function initializeServices() {
  //     if (!routes_library || !map) return;

  //     setDirectionsService(new routes_library.DirectionsService());
  //     setDirectionsRenderer(new routes_library.DirectionsRenderer({ map }));
  //   }
  //   async function getRoute() {
  //     if (!directions_renderer || !directions_service || !place_id || !place_data)
  //       return;

  //     try {
  //       const destination_coord = place_data!.filter(
  //         (place) => place.place_id === place_id
  //       );

  //       const response = await directions_service.route({
  //         origin: { lat: lat!, lng: lng! },
  //         destination: destination_coord[0].location.coordinates,
  //         travelMode: google.maps.TravelMode.DRIVING,
  //       });

  //       directions_renderer.setDirections(response);
  //       setRoute(response.routes);
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setUserPosition({
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           });
  //         },
  //         (error) => {
  //           toast(error.code, {
  //             description: error.message,
  //             action: { label: "ok", onClick: () => null },
  //           });
  //         }
  //       );
  //     }, 60000);

  //     clearInterval(interval);
  //   }, []);

  //   useEffect(() => {
  //     initializeServices();
  //   }, [map, routes_library]);

  //     useEffect(() => {
  //     getRoute();
  //   }, [directions_renderer, directions_service, place_id]);

  return null;
}
