import { TabsContent } from "@/components/ui/tabs";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import LodgingGoogleMessage from "./LodgingGoogleMessage";

export default function LodgingRooms({
  lodging,
}: {
  lodging: LodgingDetailsType;
}) {
  return (
    <TabsContent value="rooms">
      {lodging?.database! === "GOOGLE" && (
        <div className="my-10">
          <LodgingGoogleMessage lodging={lodging} />
        </div>
      )}
    </TabsContent>
  );
}
