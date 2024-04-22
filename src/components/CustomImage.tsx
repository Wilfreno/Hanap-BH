import Image from "next/image";
import NoImageSvg from "./svg/NoImageSvg";
import { cn } from "@/lib/utils";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { CldImage } from "next-cloudinary";

export default function CustomImage({
  url,
  database,
  className,
  asBackground,
}: {
  asBackground?: boolean;
  className?: string;
  url?: string;
  database: LodgingDetailsType["database"];
}) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  return url ? (
    database === "GOOGLE" ? (
      <Image
        src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${url}&maxheight=1080&maxwidth=1920`}
        alt=""
        height={1080}
        width={1920}
        priority
        className={cn("w-full h-full", className)}
      />
    ) : (
      <CldImage
        width="1920"
        height="1080"
        src={url}
        alt={url}
        className="object-contain h-full w-full"
      />
    )
  ) : (
    !asBackground && (
      <div
        className={cn(
          "w-full h-full flex items-center bg-primary-foreground justify-center fill-secondary dark:fill-none"
        )}
      >
        <NoImageSvg className="w-1/3 h-full stroke-muted-foreground" />
      </div>
    )
  );
}
