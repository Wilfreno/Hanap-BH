import { PlaceDetailsType } from "@/lib/types/place-detail";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LodgingGoogleMessage({
  place,
}: {
  place: PlaceDetailsType;
}) {
  const { update } = useSession();
  return (
    <section className="text-center space-y-2 p-5 text-muted-foreground">
      <p className="">
        The information provided above is is gathered from the Google Maps
        Database; no more further information for this establishment
      </p>
      <p>
        If the place is yours, you can register it{" "}
        <Link
          href={`/hosting/claim/${place.place_id}`}
          className="text-primary font-bold"
        >
          here
        </Link>
      </p>
    </section>
  );
}
