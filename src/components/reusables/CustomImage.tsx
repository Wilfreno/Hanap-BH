import Image from "next/image";

export default function CustomImage({
  photo_reference,
  database,
}: {
  photo_reference: string;
  database: string;
}) {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
  if (!api_key) throw new Error("NEXT_PUBLIC_GOOGLE_PLACE_API_KEY is missing");
  return (
    <>
      {database === "GOOGLE" ? (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?key=${api_key}&photo_reference=${photo_reference}&maxheight=1080&maxwidth=1920`}
          alt={photo_reference}
          className="object-cover w-full h-full duration-300 ease-in rounded-lg pointer-events-none"
          width={1920}
          height={1080}
          priority
        />
      ) : null}
    </>
  );
}
