import styles from "./NearbyPlacesMarker.module.css";
import { NearbyPlaceAPIResponseType } from "@/lib/types/nearby-place-type";
import AdvanceMarker from "./AdvanceMarker";
import { MapType } from "@/lib/types/google-map-type";
import ImageNotSupportedSharpIcon from "@mui/icons-material/ImageNotSupportedSharp";
import Image from "next/image";
import { useState } from "react";
import { Marker } from "@react-google-maps/api";

export default function NearbyPlacesMarker({
  place,
  map,
}: {
  place: NearbyPlaceAPIResponseType;
  map: MapType;
}) {
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing");

  return (
    <>
      {viewDetails ? (
        <AdvanceMarker map={map} position={place.location}>
          <div
            className={styles.details}
            onClick={() => console.log("clicked")}
          >
            <div
              className={styles.close__button}
              onClick={(e) => console.log("clicked")}
            >
              <h3>x</h3>
            </div>
            {place.photo.height < place.photo.width ? (
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${place.photo.photo_reference}&maxwidth=${place.photo.width}`}
                alt="place_photo"
                width={1920}
                height={1080}
                quality={90}
                priority
                style={{
                  height: "auto",
                  width: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
            ) : (
              <ImageNotSupportedSharpIcon />
            )}
            <h3>{place.description}</h3>
          </div>
        </AdvanceMarker>
      ) : (
        <Marker
          key={place.place_id}
          position={place.location}
          onClick={() => {
            map.panTo(place.location);
            setViewDetails(true);
          }}
        />
      )}
    </>
  );
}
