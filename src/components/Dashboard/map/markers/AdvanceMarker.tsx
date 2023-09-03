import { LatLngLiteral, MapType } from "@/lib/types/google-map-type";
import { useEffect, useRef } from "react";
import { Root, createRoot } from "react-dom/client";
export default function AdvanceMarker({
  map,
  position,
  children,
}: {
  map: MapType;
  position: LatLngLiteral;
  children: React.ReactNode;
}) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>();
  const rootRef = useRef<Root>();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.justifyContent = "center";
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
        zIndex: 5,
        
      });
    }
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, []);

  useEffect(() => {
    rootRef.current?.render(children);
    markerRef.current!.position = position;
    markerRef.current!.map = map;
  }, [map, position, children]);

  return null;
}
