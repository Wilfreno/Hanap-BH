import Image from "next/image";
import NoImageSvg from "../svg/NoImageSvg";

export default function PlaceImage({ photo }: { photo?: string }) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");

  return photo ? (
    <Image
      src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${photo}&maxheight=1080&maxwidth=1920`}
      alt={photo}
      height={1080}
      width={1920}
      priority
      className="aspect-square w-full h-auto rounded-t-lg"
    />
  ) : (
    <span className="aspect-square w-full h-full flex items-center bg-primary-foreground rounded-t-sm sm:rounded-t-lg justify-center fill-secondary dark:fill-none">
      <NoImageSvg className="w-1/3 h-full stroke-muted-foreground" />
    </span>
  );
}
