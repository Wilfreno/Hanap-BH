import { useAppSelector } from "@/lib/redux/store";
import { PlaceDetailType } from "@/lib/types/places-detail-types";
import ImageNotSupportedSharpIcon from "@mui/icons-material/ImageNotSupportedSharp";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./DetailPopUp.module.css";
import CloseIcon from "@mui/icons-material/Close";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
export default function DetailPopUp() {
  const [view, setView] = useState<boolean>(false);
  const details: PlaceDetailType = useAppSelector(
    (state) => state.selectedDetailReducer
  );
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY missing");

  useEffect(() => {
    if (details.place_id != "") setView(true);
  }, [details]);

  return view ? (
    <div className={styles.container}>
      <div className={styles.close}>
        <CloseIcon className={styles.close__icon} />
      </div>
      <div className={styles.ratings}>
        <StarPurple500SharpIcon className={styles.star__ratings} />
        <p>{details.rating}</p>
      </div>
      <div className={styles.image__container}>
        {details.photo.height! < details.photo.width! ? (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photo_reference=${details.photo.photo_reference}&maxwidth=${details.photo.width}`}
            alt="place_photo"
            width={1920}
            height={1080}
            quality={90}
            priority
            className={styles.image}
          />
        ) : (
          <ImageNotSupportedSharpIcon className={styles.no__image} />
        )}
      </div>
      <div className={styles.details__container}>
        <div className={styles.description}>
          <h2>{details.description}</h2>
          <h3>{details.vicinity}</h3>
        </div>
        <div className={styles.other__information}>
          <div className={styles.owner}>
            <h3>Owner : </h3>
            {details.owner != undefined ? (
              <p>{details.owner}</p>
            ) : (
              <p style={{ color: "rgba(34, 34, 34, 0.5)" }}>Unknown</p>
            )}
          </div>
          <div className={styles.room__available}>
            <h3>Rooms available :</h3>
            {details.vacant_rooms === undefined ? (
              <p style={{ color: "rgba(34, 34, 34, 0.5)" }}>Unknown</p>
            ) : (
              <p>{details.vacant_rooms}</p>
            )}
          </div>
          <div className={styles.price}>
            <h3>Price :</h3>
            <p>
              {details.price.max != undefined ? (
                <p>
                  ₱ {details.price.min} ~ ₱ {details.price.max}
                </p>
              ) : details.price.min != undefined ? (
                <p>{details.price.min}</p>
              ) : (
                <p style={{ color: "rgba(34, 34, 34, 0.5)" }}>Unknown</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
