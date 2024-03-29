import { PlaceDetailsType } from "@/lib/types/google-places-api-type";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LodgingGoogleMessage({
  place,
  className,
}: {
  place: PlaceDetailsType;
  className?: string;
}) {
  const path_name = usePathname();
  return (
    <section
      className={cn("text-center space-y-2 text-muted-foreground", className)}
    >
      <p>
        The information provided above is is gathered from the Google Maps
        Database; no more further information for this establishment
      </p>
      <p>
        If the place is yours, you can register it on{" "}
        <Link
          href={`/hosting/claim/${place.place_id}?url_callback=/hosting/claim/${place.place_id}&exit=${path_name}`}
          as={`/hosting/claim/${place.place_id}?url_callback=/hosting/claim/${place.place_id}&exit=${path_name}`}
          className="text-primary font-bold"
        >
          <span className="italic">Hanap BH</span>
          <sub>Hosting</sub>
        </Link>
      </p>
    </section>
  );
}
