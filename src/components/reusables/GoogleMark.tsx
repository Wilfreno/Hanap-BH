import { PlaceDetailsType } from "@/lib/types/place-detail";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import googleSvg from "../../../public/icons/social-media/google-color-svgrepo-com.svg";
import Image from "next/image";

export default function GoogleMark({ place }: { place: PlaceDetailsType }) {
  return (
    place.database === "GOOGLE" && (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="absolute aspect-square h-6 w-auto overflow-hidden right-1 bottom-1 z-20 cursor-pointer hover:scale-110">
            <Image src={googleSvg} alt="img" className="h-full w-auto" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="p-1 text-xs text-muted-foreground">
          This icon indicate that the information for this place is from the
          google maps database and the information is limited,
        </HoverCardContent>
      </HoverCard>
    )
  );
}
