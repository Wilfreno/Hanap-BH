import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LodgingGoogleMessage({
  lodging,
  className,
}: {
  lodging: LodgingDetailsType;
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
        If the lodging is yours, you can register it on{" "}
        <Link
          href={`/hosting/claim/${lodging.id}?url_callback=/hosting/claim/${lodging.id}&exit=${path_name}`}
          as={`/hosting/claim/${lodging.id}?url_callback=/hosting/claim/${lodging.id}&exit=${path_name}`}
          className="text-primary font-bold"
        >
          <span className="italic">Hanap BH</span>
          <sub>Hosting</sub>
        </Link>
      </p>
    </section>
  );
}
