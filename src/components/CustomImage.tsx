import Image from "next/image";
import NoImageSvg from "./svg/NoImageSvg";
import { cn } from "@/lib/utils";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { CldImage } from "next-cloudinary";
import { Suspense, useState } from "react";

export default function CustomImage({
  url,
  database,
  className,
}: {
  className?: string;
  url?: string;
  database: LodgingDetailsType["database"];
}) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  const [loading, setLoading] = useState(true);
  return url ? (
    <Suspense
      fallback={
        <div className="w-full h-full rounded-full bg-muted-foreground animate-pulse"></div>
      }
    >
      {database === "GOOGLE" ? (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${url}&maxheight=1080&maxwidth=1920`}
          alt=""
          height={1080}
          width={1920}
          priority
          className={cn(
            "w-full h-full",
            className,
            loading && "bg-muted-foreground animate-pulse"
          )}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <CldImage
          width="1920"
          height="1080"
          src={url}
          alt={url}
          className={cn(
            "h-full w-full",
            className,
            loading && "bg-muted-foreground animate-pulse"
          )}
          onLoad={() => setLoading(false)}
        />
      )}
    </Suspense>
  ) : (
    <div
      className={cn(
        "w-full h-full grid place-items-center  bg-primary-foreground  fill-none",
        className
      )}
    >
      <NoImageSvg className="w-1/3 h-full stroke-muted-foreground" />
    </div>
  );
}
